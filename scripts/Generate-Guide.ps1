<#
.SYNOPSIS
    Generate docs/GUIDE.md from the actual contents of src/.
.DESCRIPTION
    Reads commands, agents, skills, tools, and MCP servers (their frontmatter/descriptions)
    and writes an always-current usage guide. Run after adding/changing anything in src/.
    Wired to run automatically via the git pre-commit hook (.githooks/pre-commit) and checked
    in CI. Do not hand-edit docs/GUIDE.md - edit this generator instead.
.EXAMPLE
    .\scripts\Generate-Guide.ps1
#>

$RepoRoot = $PSScriptRoot | Split-Path -Parent
$SrcDir = Join-Path $RepoRoot "src"
$q = [char]96  # backtick, for markdown inline code

function Get-Field($content, $field) {
    $m = [regex]::Match($content, "(?m)^${field}:\s*[`"']?(.*?)[`"']?\s*$")
    if ($m.Success) { return $m.Groups[1].Value.Trim() }
    return ""
}
function Get-Frontmatter($path) {
    if (!(Test-Path $path)) { return "" }
    $raw = Get-Content $path -Raw
    $m = [regex]::Match($raw, '^---\s*\r?\n(.*?)\r?\n---', 'Singleline')
    if ($m.Success) { return $m.Groups[1].Value }
    return ""
}
function Get-IndentedField($fm, $field) {
    $m = [regex]::Match($fm, "(?m)^\s+${field}:\s*[`"']?(.*?)[`"']?\s*$")
    if ($m.Success) { return $m.Groups[1].Value.Trim() }
    return ""
}
function Code($s) { return "$q$s$q" }

# --- Commands ---
$commands = @()
Get-ChildItem (Join-Path $SrcDir "commands") -Directory | Sort-Object Name | ForEach-Object {
    $fm = Get-Frontmatter (Join-Path $_.FullName "COMMAND.md")
    $commands += [pscustomobject]@{ name = $_.Name; desc = (Get-Field $fm "description"); agent = (Get-Field $fm "agent") }
}

# --- Agents (with permission) ---
$agents = @()
Get-ChildItem (Join-Path $SrcDir "agents") -Directory | Sort-Object Name | ForEach-Object {
    $fm = Get-Frontmatter (Join-Path $_.FullName "AGENT.md")
    $agents += [pscustomobject]@{
        name = $_.Name; desc = (Get-Field $fm "description")
        edit = (Get-IndentedField $fm "edit"); bash = (Get-IndentedField $fm "bash")
    }
}
$agentToCmd = @{}
foreach ($c in $commands) { if ($c.agent) { $agentToCmd[$c.agent] = "/$($c.name)" } }

# --- Skills (grouped by category) ---
$skills = @()
Get-ChildItem (Join-Path $SrcDir "skills") -Directory | Sort-Object Name | ForEach-Object {
    $fm = Get-Frontmatter (Join-Path $_.FullName "SKILL.md")
    $desc = (Get-Field $fm "description")
    if ($desc.Length -gt 200) { $desc = $desc.Substring(0, 197) + "..." }
    $cat = Get-IndentedField $fm "category"
    if (!$cat) { $cat = "other" }
    $skills += [pscustomobject]@{ name = $_.Name; desc = $desc; category = $cat }
}

# --- Tools + MCP ---
$tools = @()
Get-ChildItem (Join-Path $SrcDir "tools") -Directory | Sort-Object Name | ForEach-Object {
    $raw = Get-Content (Join-Path $_.FullName "index.ts") -Raw
    $m = [regex]::Match($raw, 'description:\s*"(.*?)"')
    $d = ""
    if ($m.Success) { $d = $m.Groups[1].Value }
    $tools += [pscustomobject]@{ name = $_.Name; desc = $d }
}
$mcps = @()
Get-ChildItem (Join-Path $SrcDir "mcp") -Directory | Sort-Object Name | ForEach-Object {
    $j = Get-Content (Join-Path $_.FullName "mcp.json") -Raw | ConvertFrom-Json
    $mcps += [pscustomobject]@{ name = $_.Name; desc = $j.description }
}

# --- Build markdown ---
$lines = New-Object System.Collections.Generic.List[string]
function W($t) { $lines.Add([string]$t) }

W "# AI Master Folder - Usage Guide"
W ""
W "> **Auto-generated** by $(Code 'scripts/Generate-Guide.ps1') from the contents of $(Code 'src/')."
W "> Do not edit by hand - it is regenerated on every commit. To change it, edit the generator."
W ""
W "## The only things you trigger manually"
W ""
W "Everything else activates **automatically**. You only ever do two things by hand:"
W ""
W "1. **Slash commands** - type $(Code '/name') (e.g. $(Code '/review'))."
W "2. **@mention agents** - type $(Code '@name <request>') (e.g. $(Code '@architect design a cache layer'))."
W ""
W "Skills, tools, MCP servers, and the background plugin trigger themselves when relevant."
W ""
W "---"
W ""
W "## Slash commands ($($commands.Count)) - manual"
W ""
W "Type $(Code '/name'). Most delegate to a specialist agent."
W ""
W "| Command | What it does | Delegates to |"
W "| --- | --- | --- |"
foreach ($c in $commands) {
    $to = "-"
    if ($c.agent) { $to = Code "@$($c.agent)" }
    W "| $(Code "/$($c.name)") | $($c.desc) | $to |"
}
W ""
W "## Agents ($($agents.Count)) - @mention"
W ""
W "Call a specialist directly with $(Code '@name'). **edit/bash** = what each may do."
W ""
W "| Agent | What it does | edit | bash | Also via |"
W "| --- | --- | :---: | :---: | --- |"
foreach ($a in $agents) {
    $e = "-"; if ($a.edit -eq "allow") { $e = "yes" } elseif ($a.edit) { $e = "no" }
    $b = "-"; if ($a.bash -eq "allow") { $b = "yes" } elseif ($a.bash) { $b = "no" }
    $via = "@ only"; if ($agentToCmd.ContainsKey($a.name)) { $via = Code $agentToCmd[$a.name] }
    W "| $(Code "@$($a.name)") | $($a.desc) | $e | $b | $via |"
}
W ""
W "## Skills ($($skills.Count)) - automatic"
W ""
W "You never call these; they load when your request matches. Listed by category for reference."
W ""
foreach ($cat in ($skills | Select-Object -ExpandProperty category -Unique | Sort-Object)) {
    W "**$cat**"
    W ""
    foreach ($s in ($skills | Where-Object { $_.category -eq $cat })) {
        W "- $(Code $s.name) - $($s.desc)"
    }
    W ""
}
W "## Tools ($($tools.Count)) - automatic"
W ""
W "The model runs these itself when needed."
W ""
foreach ($t in $tools) { W "- $(Code $t.name) - $($t.desc)" }
W ""
W "## MCP servers ($($mcps.Count)) - automatic"
W ""
W "Available to the model when relevant (some require a token/login first)."
W ""
foreach ($m in $mcps) { W "- $(Code $m.name) - $($m.desc)" }
W ""
W "## Background plugin - automatic"
W ""
W "$(Code 'ai-master-hooks') runs silently: blocks writing secrets, lint-checks files after edits,"
W "remembers your last session per project, and notices context compaction."

$DocsDir = Join-Path $RepoRoot "docs"
if (!(Test-Path $DocsDir)) { New-Item -ItemType Directory -Force -Path $DocsDir | Out-Null }
$outPath = Join-Path $DocsDir "GUIDE.md"
[System.IO.File]::WriteAllText($outPath, ($lines -join "`n") + "`n")
Write-Host "Generated docs/GUIDE.md ($($commands.Count) commands, $($agents.Count) agents, $($skills.Count) skills, $($tools.Count) tools, $($mcps.Count) mcp)"
