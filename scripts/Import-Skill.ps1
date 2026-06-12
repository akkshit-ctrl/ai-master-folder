<#
.SYNOPSIS
    Import a skill into the master folder in one step.
.DESCRIPTION
    Copies a skill (from a local folder or a git repo) into src/skills/<name>/, registers it in
    profiles/full.json, and validates. The skill's directory name is taken from its SKILL.md
    `name:` field (the spec requires name == directory). After this, just commit + redeploy.

    The harness derives the skill list from disk, so no test file needs editing.
.PARAMETER Path
    Local folder that contains a SKILL.md (or a parent folder to search).
.PARAMETER GitUrl
    Git repository URL to clone and import from.
.PARAMETER SubPath
    Path within the folder/repo to the skill directory (the one containing SKILL.md).
.PARAMETER Force
    Overwrite an existing skill of the same name.
.EXAMPLE
    .\scripts\Import-Skill.ps1 -Path "C:\Downloads\my-skill"
    .\scripts\Import-Skill.ps1 -GitUrl "https://github.com/user/repo" -SubPath "skills/cool-skill"
#>
param(
    [string]$Path,
    [string]$GitUrl,
    [string]$SubPath,
    [switch]$Force
)
$ErrorActionPreference = "Stop"
$RepoRoot = $PSScriptRoot | Split-Path -Parent
$SkillsDir = Join-Path $RepoRoot "src\skills"
$FullProfile = Join-Path $RepoRoot "profiles\full.json"

function Fail($m) { Write-Error $m; exit 1 }

# 1. Resolve the source folder.
$tmp = $null
if ($GitUrl) {
    $tmp = Join-Path ([System.IO.Path]::GetTempPath()) ("skillimport-" + [System.IO.Path]::GetRandomFileName())
    Write-Host "Cloning $GitUrl ..."
    git clone --depth 1 $GitUrl $tmp 2>&1 | Out-Null
    if ($LASTEXITCODE -ne 0) { Fail "git clone failed." }
    $base = $tmp
} elseif ($Path) {
    if (!(Test-Path $Path)) { Fail "Path not found: $Path" }
    $base = (Resolve-Path $Path).Path
} else {
    Fail "Provide -Path <folder> or -GitUrl <url>."
}
if ($SubPath) { $base = Join-Path $base $SubPath }

# 2. Locate the SKILL.md.
$skillMd = $null
if (Test-Path (Join-Path $base "SKILL.md")) {
    $skillMd = Join-Path $base "SKILL.md"
} else {
    $found = @(Get-ChildItem $base -Recurse -Filter "SKILL.md" -ErrorAction SilentlyContinue)
    if ($found.Count -eq 1) { $skillMd = $found[0].FullName }
    elseif ($found.Count -gt 1) { Fail "Multiple SKILL.md found - narrow it with -SubPath. Found: `n  " + (($found | ForEach-Object { $_.FullName }) -join "`n  ") }
    else { Fail "No SKILL.md found under $base" }
}
$srcSkillDir = Split-Path $skillMd -Parent

# 3. Read the skill name from frontmatter.
$content = Get-Content $skillMd -Raw
$nm = [regex]::Match($content, "(?m)^name:\s*[`"']?([a-z0-9-]+)[`"']?\s*$")
if (!$nm.Success) { Fail "Could not read a valid 'name:' (lowercase kebab-case) from $skillMd" }
$name = $nm.Groups[1].Value
Write-Host "Skill name: $name"

# 4. Copy into src/skills/<name>/.
$dest = Join-Path $SkillsDir $name
if ((Test-Path $dest) -and !$Force) { Fail "Skill '$name' already exists. Use -Force to overwrite." }
if (Test-Path $dest) { Remove-Item $dest -Recurse -Force }
Copy-Item $srcSkillDir $dest -Recurse -Force
# strip junk that some repos ship
foreach ($junk in @(".git", "node_modules")) {
    $jp = Join-Path $dest $junk
    if (Test-Path $jp) { Remove-Item $jp -Recurse -Force }
}
Write-Host "Copied -> src/skills/$name"
if ($tmp -and (Test-Path $tmp)) { Remove-Item $tmp -Recurse -Force }

# 5. Register in profiles/full.json (textual array insert, keeps file formatting).
$raw = Get-Content $FullProfile -Raw
$m = [regex]::Match($raw, "(?s)(`"skills`"\s*:\s*\[)(.*?)(\s*\])")
if (!$m.Success) { Fail "Could not find skills array in full.json" }
$entries = [regex]::Matches($m.Groups[2].Value, '"([^"]+)"') | ForEach-Object { $_.Groups[1].Value }
if ($entries -notcontains $name) {
    $all = @($entries + $name) | Sort-Object -Unique
    $newInner = "`n" + (($all | ForEach-Object { "    `"$_`"" }) -join ",`n") + "`n  "
    $raw = $raw.Substring(0, $m.Index) + $m.Groups[1].Value + $newInner + "]" + $raw.Substring($m.Index + $m.Length)
    [System.IO.File]::WriteAllText($FullProfile, $raw)
    Write-Host "Registered '$name' in profiles/full.json"
} else {
    Write-Host "'$name' already in profiles/full.json"
}

# 6. Validate.
Write-Host "`nValidating..."
& (Join-Path $RepoRoot "tests\Invoke-StructureCheck.ps1") | Select-Object -Last 1

Write-Host "`nNext steps:" -ForegroundColor Cyan
Write-Host "  1. Review src/skills/$name (trust the source!)"
Write-Host "  2. git add -A && git commit -m `"feat: import $name skill`"   (guide auto-updates)"
Write-Host "  3. git push origin main"
Write-Host "  4. .\scripts\Deploy-OpenCode.ps1 -ProfileName full -Global -Execute   (then restart OpenCode)"
