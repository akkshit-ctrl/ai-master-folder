param (
    [string]$ProfileName = "full",
    [string]$TargetPath,
    [switch]$Preview,
    [switch]$Global,
    [switch]$Execute
)

<#
.SYNOPSIS
    Deploy AI Master Folder profile to an OpenCode environment.
.DESCRIPTION
    Compiles a profile (full or lean) from src/ into a target .opencode directory in the
    exact shapes OpenCode actually loads:
      - skills   -> .opencode/skills/<name>/SKILL.md      (folder, auto-discovered)
      - agents   -> .opencode/agents/<name>/AGENT.md      (folder, auto-discovered)
      - commands -> .opencode/commands/<name>/COMMAND.md  (folder, auto-discovered)
      - tools    -> .opencode/tools/<name>.ts             (flat file = tool name)
      - plugins  -> .opencode/plugins/<name>.ts           (lifecycle hooks, auto-loaded)
      - mcp      -> wired into .opencode/opencode.json under the "mcp" key
      - AGENTS.md with universal rules + profile instructions injected
    By default runs in dry-run mode. Pass -Execute to actually write.
.PARAMETER ProfileName
    Which profile to deploy: "full" (default) or "lean".
.PARAMETER TargetPath
    Deploy to a specific project directory (creates a .opencode subfolder).
.PARAMETER Preview
    Deploy to build/preview/.opencode for inspection.
.PARAMETER Global
    Deploy to $env:USERPROFILE\.config\opencode for system-wide use.
.PARAMETER Execute
    Actually write files. Without this flag, runs in dry-run mode.
.EXAMPLE
    .\scripts\Deploy-OpenCode.ps1 -ProfileName lean -Preview
    .\scripts\Deploy-OpenCode.ps1 -ProfileName full -Global -Execute
    .\scripts\Deploy-OpenCode.ps1 -ProfileName lean -TargetPath "C:\Project" -Execute
#>

$RepoRoot = $PSScriptRoot | Split-Path -Parent
$SrcDir = Join-Path $RepoRoot "src"
$ProfilesDir = Join-Path $RepoRoot "profiles"
$BuildDir = Join-Path $RepoRoot "build\preview\.opencode"

if ($Preview) {
    $DestDir = $BuildDir
    Write-Host "[Deploy] Running in PREVIEW mode." -ForegroundColor Cyan
} elseif ($Global) {
    $DestDir = Join-Path $env:USERPROFILE ".config\opencode"
    Write-Host "[Deploy] Running in GLOBAL mode." -ForegroundColor Green
} elseif ($TargetPath) {
    $DestDir = Join-Path $TargetPath ".opencode"
    Write-Host "[Deploy] Running in PROJECT mode." -ForegroundColor Yellow
} else {
    Write-Error "You must specify -Preview, -Global, or -TargetPath."
    exit 1
}

Write-Host "Target Directory: $DestDir"

$ProfilePath = Join-Path $ProfilesDir "$ProfileName.json"
if (!(Test-Path $ProfilePath)) {
    Write-Error "Profile '$ProfileName' not found at $ProfilePath`nAvailable profiles: full, lean"
    exit 1
}

Write-Host "Loading Profile: $ProfileName"
$Profile = Get-Content $ProfilePath -Raw | ConvertFrom-Json

# Convert a src/mcp/<name>/mcp.json (stdio/http) into OpenCode's mcp entry (local/remote).
function Convert-McpConfig($srcJson) {
    $m = Get-Content $srcJson -Raw | ConvertFrom-Json
    $out = [ordered]@{}
    if ($m.type -eq 'stdio') {
        $out.type = 'local'
        $out.command = @($m.command) + @($m.args)
        $out.enabled = $true
        if ($m.env) {
            $envHash = [ordered]@{}
            $m.env.PSObject.Properties | ForEach-Object { $envHash[$_.Name] = $_.Value }
            $out.environment = $envHash
        }
    } elseif ($m.type -in @('http', 'remote', 'sse')) {
        $out.type = 'remote'
        $out.url = $m.url
        $out.enabled = $true
        if ($m.headers) {
            $h = [ordered]@{}
            $m.headers.PSObject.Properties | ForEach-Object { $h[$_.Name] = $_.Value }
            $out.headers = $h
        }
    } else {
        Write-Warning "Unknown MCP type '$($m.type)' in $srcJson - skipping."
        return $null
    }
    return $out
}

# Dry-run mode
if (!$Execute) {
    Write-Host "[Deploy] DRY-RUN - use -Execute to actually write files." -ForegroundColor Yellow
    Write-Host "[Deploy] Would deploy profile '$ProfileName' to: $DestDir" -ForegroundColor Yellow
    if ($Profile.instructions) {
        Write-Host "[Deploy]   Instructions: $($Profile.instructions -join ', ')" -ForegroundColor Gray
    }
    foreach ($Cat in @("agents", "commands", "skills", "tools", "plugins", "mcp")) {
        if ($Profile.$Cat -and $Profile.$Cat.Count -gt 0) {
            Write-Host "[Deploy]   $Cat : $($Profile.$Cat -join ', ')" -ForegroundColor Gray
        }
    }
    Write-Host "[Deploy]   Would generate .opencode/opencode.json (mcp wired) and inject rules into AGENTS.md." -ForegroundColor Gray
    Write-Host 'Dry-run complete. Pass -Execute to deploy.' -ForegroundColor Yellow
    exit 0
}

# Backup existing target
if (Test-Path $DestDir) {
    $backupDir = Join-Path $RepoRoot "build\backup\$([DateTime]::Now.ToString('yyyyMMdd-HHmmss'))"
    Write-Host "[Deploy] Backing up existing target to $backupDir" -ForegroundColor DarkYellow
    New-Item -ItemType Directory -Force -Path $backupDir | Out-Null
    Copy-Item -Path "$DestDir\*" -Destination $backupDir -Recurse -Force -ErrorAction SilentlyContinue
}
if (!(Test-Path $DestDir)) {
    New-Item -ItemType Directory -Force -Path $DestDir | Out-Null
}

# 1. AGENTS.md: inject universal rules + profile instructions (literal replace; content may contain '$').
$SourceAgentsFile = Join-Path $SrcDir "AGENTS.md"
$DestAgentsFile = Join-Path $DestDir "AGENTS.md"
if (Test-Path $SourceAgentsFile) {
    $AgentsContent = Get-Content $SourceAgentsFile -Raw

    $RulesInject = ""
    $RulesDir = Join-Path $SrcDir "rules\common"
    if (Test-Path $RulesDir) {
        Get-ChildItem $RulesDir -Filter *.md | Sort-Object Name | ForEach-Object {
            $RulesInject += "`n### Rule: $($_.BaseName)`n" + (Get-Content $_.FullName -Raw) + "`n"
        }
    }

    $InstructionsInject = ""
    if ($Profile.instructions) {
        foreach ($inst in $Profile.instructions) {
            $InstPath = Join-Path $SrcDir "instructions\$inst"
            if (Test-Path $InstPath) {
                $InstructionsInject += "`n### Profile Instruction: $inst`n" + (Get-Content $InstPath -Raw) + "`n"
            } else {
                Write-Warning "Instruction snippet not found: $InstPath"
            }
        }
    }

    $AgentsContent = $AgentsContent.Replace('<!-- RULES_INJECT -->', $RulesInject)
    $AgentsContent = $AgentsContent.Replace('<!-- PROFILE_INSTRUCTIONS_INJECT -->', $InstructionsInject)
    Set-Content -Path $DestAgentsFile -Value $AgentsContent
    Write-Host "  -> Compiled AGENTS.md (rules + instructions injected)"
}

# 2. Folder-based artifacts OpenCode auto-discovers (copied verbatim).
foreach ($Cat in @("skills", "commands", "agents")) {
    if ($Profile.$Cat -and $Profile.$Cat.Count -gt 0) {
        $CatDestDir = Join-Path $DestDir $Cat
        if (!(Test-Path $CatDestDir)) { New-Item -ItemType Directory -Force -Path $CatDestDir | Out-Null }
        foreach ($Item in $Profile.$Cat) {
            $ItemSrcPath = Join-Path $SrcDir "$Cat\$Item"
            if (Test-Path $ItemSrcPath) {
                Copy-Item -Path $ItemSrcPath -Destination $CatDestDir -Recurse -Force
                Write-Host "  -> Copied $Cat / $Item"
            } else {
                Write-Warning "Item not found in registry: $ItemSrcPath"
            }
        }
    }
}

# 3. Tools: flatten src/tools/<name>/index.ts -> .opencode/tools/<name>.ts (filename = tool name).
if ($Profile.tools -and $Profile.tools.Count -gt 0) {
    $ToolsDestDir = Join-Path $DestDir "tools"
    if (!(Test-Path $ToolsDestDir)) { New-Item -ItemType Directory -Force -Path $ToolsDestDir | Out-Null }
    foreach ($tool in $Profile.tools) {
        $srcTs = Join-Path $SrcDir "tools\$tool\index.ts"
        if (Test-Path $srcTs) {
            Copy-Item -Path $srcTs -Destination (Join-Path $ToolsDestDir "$tool.ts") -Force
            Write-Host "  -> Installed tool / $tool.ts"
        } else {
            Write-Warning "Tool source not found: $srcTs"
        }
    }
}

# 4. Plugins: copy src/plugins/<name>.ts -> .opencode/plugins/<name>.ts (auto-loaded lifecycle hooks).
if ($Profile.plugins -and $Profile.plugins.Count -gt 0) {
    $PluginsDestDir = Join-Path $DestDir "plugins"
    if (!(Test-Path $PluginsDestDir)) { New-Item -ItemType Directory -Force -Path $PluginsDestDir | Out-Null }
    foreach ($plugin in $Profile.plugins) {
        $srcTs = Join-Path $SrcDir "plugins\$plugin.ts"
        if (Test-Path $srcTs) {
            Copy-Item -Path $srcTs -Destination (Join-Path $PluginsDestDir "$plugin.ts") -Force
            Write-Host "  -> Installed plugin / $plugin.ts"
        } else {
            Write-Warning "Plugin source not found: $srcTs"
        }
    }
    # OpenCode needs bun to load plugins; without it, startup stalls. Warn early.
    if ($null -eq (Get-Command "bun" -ErrorAction SilentlyContinue)) {
        Write-Warning "  bun is not installed. OpenCode requires bun to load the lifecycle plugin -"
        Write-Warning "  without it, 'opencode' will stall on startup. Install from https://bun.sh,"
        Write-Warning "  or deploy a plugin-free profile if you don't need lifecycle hooks."
    }
}

# 5. Generate a VALID .opencode/opencode.json (wires MCP; agents/commands/skills/tools/plugins auto-discover).
$McpConfig = [ordered]@{}
if ($Profile.mcp) {
    foreach ($mcp in $Profile.mcp) {
        $srcJson = Join-Path $SrcDir "mcp\$mcp\mcp.json"
        if (Test-Path $srcJson) {
            $conv = Convert-McpConfig $srcJson
            if ($conv) { $McpConfig[$mcp] = $conv; Write-Host "  -> Wired MCP / $mcp" }
        } else {
            Write-Warning "MCP config not found: $srcJson"
        }
    }
}
$Config = [ordered]@{ '$schema' = "https://opencode.ai/config.json" }
if ($McpConfig.Count -gt 0) { $Config.mcp = $McpConfig }
$ConfigPath = Join-Path $DestDir "opencode.json"
$Config | ConvertTo-Json -Depth 12 | Set-Content -Path $ConfigPath
Write-Host "  -> Generated $ConfigPath"

# 6. Verification
Write-Host "[Deploy] Verification:" -ForegroundColor Cyan
$actualFiles = @(Get-ChildItem -Path $DestDir -Recurse -File -ErrorAction SilentlyContinue).Count
$expectedMin = $Profile.agents.Count + $Profile.commands.Count + $Profile.skills.Count + $Profile.tools.Count
Write-Host "  Files in target: $actualFiles (expected at least $expectedMin + AGENTS.md + opencode.json)" -ForegroundColor Gray
if ($actualFiles -eq 0) {
    Write-Warning "  No files found in target directory - deployment may be empty."
} else {
    Write-Host "Deployment completed successfully." -ForegroundColor Green
}
