param (
    [string]$ProfileName = "lean",
    [string]$TargetPath,
    [switch]$Preview,
    [switch]$Global,
    [switch]$Execute,
    [switch]$GenerateConfig
)

<#
.SYNOPSIS
    Deploy AI Master Folder profile to an OpenCode environment.
.DESCRIPTION
    Compiles a profile (full or lean) from src/ into a target .opencode directory.
    By default runs in dry-run mode (shows what would happen without writing).
    Pass -Execute to actually perform the deployment.
    Pass -Preview to write to build/preview/.opencode for inspection.
    Pass -Global to deploy to ~/.config/opencode.
    Pass -TargetPath to deploy to a specific project's .opencode.
.PARAMETER ProfileName
    Which profile to deploy: "lean" (default) or "full".
.PARAMETER TargetPath
    Deploy to a specific project directory (creates .opencode subfolder).
.PARAMETER Preview
    Deploy to build/preview/.opencode for inspection (no real targets touched).
.PARAMETER Global
    Deploy to $env:USERPROFILE\.config\opencode for system-wide use.
.PARAMETER Execute
    Actually write files. Without this flag, runs in dry-run mode.
.PARAMETER GenerateConfig
    Also generate an opencode.json in the target directory.
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

$DeployedItems = @{
    agents   = @()
    commands = @()
    skills   = @()
    tools    = @()
    mcp      = @()
    plugins  = @()
}

# Dry-run mode
if (!$Execute) {
    Write-Host "[Deploy] DRY-RUN — use -Execute to actually write files." -ForegroundColor Yellow
    Write-Host "[Deploy] Would deploy profile '$ProfileName' to: $DestDir" -ForegroundColor Yellow

    if ($Profile.instructions) {
        Write-Host "[Deploy]   Instructions: $($Profile.instructions -join ', ')" -ForegroundColor Gray
    }
    foreach ($Cat in @("agents", "commands", "skills", "tools", "mcp", "plugins")) {
        if ($Profile.$Cat -and $Profile.$Cat.Count -gt 0) {
            Write-Host "[Deploy]   $Cat : $($Profile.$Cat -join ', ')" -ForegroundColor Gray
        }
    }

    if ($GenerateConfig) {
        Write-Host "[Deploy]   Would also generate opencode.json" -ForegroundColor Gray
    }

    Write-Host "[Deploy] Dry-run complete. Pass -Execute to deploy." -ForegroundColor Yellow
    exit 0
}

# Backup existing target
if (Test-Path $DestDir) {
    $backupDir = Join-Path $RepoRoot "build\backup\$([DateTime]::Now.ToString('yyyyMMdd-HHmmss'))"
    Write-Host "[Deploy] Backing up existing target to $backupDir" -ForegroundColor DarkYellow
    New-Item -ItemType Directory -Force -Path $backupDir | Out-Null
    Copy-Item -Path "$DestDir\*" -Destination $backupDir -Recurse -Force
}

# Ensure target directory exists
if (!(Test-Path $DestDir)) {
    New-Item -ItemType Directory -Force -Path $DestDir | Out-Null
}

# 1. Handle AGENTS.md Light Templating
$SourceAgentsFile = Join-Path $SrcDir "AGENTS.md"
$DestAgentsFile = Join-Path $DestDir "AGENTS.md"

if (Test-Path $SourceAgentsFile) {
    $AgentsContent = Get-Content $SourceAgentsFile -Raw
    $InjectedInstructions = ""

    if ($Profile.instructions) {
        foreach ($inst in $Profile.instructions) {
            $InstPath = Join-Path $SrcDir "instructions\$inst"
            if (Test-Path $InstPath) {
                $InjectedInstructions += "`n### Profile Instruction: $inst`n"
                $InjectedInstructions += Get-Content $InstPath -Raw
                $InjectedInstructions += "`n"
            } else {
                Write-Warning "Instruction snippet not found: $InstPath"
            }
        }
    }

    $AgentsContent = $AgentsContent -replace '(?i)<!--\s*PROFILE_INSTRUCTIONS_INJECT\s*-->', $InjectedInstructions
    Set-Content -Path $DestAgentsFile -Value $AgentsContent
    Write-Host "  -> Compiled and injected AGENTS.md"
}

# 2. Handle Directory-Based Registry Items
$Categories = @("skills", "commands", "agents", "mcp", "tools", "plugins")

foreach ($Cat in $Categories) {
    $CatDestDir = Join-Path $DestDir $Cat

    if ($Profile.$Cat -and $Profile.$Cat.Count -gt 0) {
        if (!(Test-Path $CatDestDir)) {
            New-Item -ItemType Directory -Force -Path $CatDestDir | Out-Null
        }

        foreach ($Item in $Profile.$Cat) {
            $ItemSrcPath = Join-Path $SrcDir "$Cat\$Item"
            if (Test-Path $ItemSrcPath) {
                Copy-Item -Path $ItemSrcPath -Destination $CatDestDir -Recurse -Force
                Write-Host "  -> Copied $Cat / $Item"
                $DeployedItems[$Cat] += $Item

                # Build .ts tools if bun is available
                if ($Cat -eq "tools") {
                    $TsFiles = Get-ChildItem -Path $ItemSrcPath -Filter "*.ts" -Recurse -ErrorAction SilentlyContinue
                    if ($TsFiles) {
                        $ToolDestDir = Join-Path $CatDestDir $Item
                        $BuiltJs = Join-Path $ToolDestDir "index.js"
                        if (!(Test-Path $BuiltJs)) {
                            $BunAvailable = $null -ne (Get-Command "bun" -ErrorAction SilentlyContinue)
                            if ($BunAvailable) {
                                Write-Host "       -> Building TypeScript tool '$Item'..."
                                Push-Location $ToolDestDir
                                & bun build --target=node --outdir=. $TsFiles[0].Name 2>&1 | Out-Null
                                Pop-Location
                            } else {
                                Write-Warning "       -> 'bun' not found; skipping TypeScript build for '$Item'"
                            }
                        }
                    }
                }
            } else {
                Write-Warning "Item not found in registry: $ItemSrcPath"
            }
        }
    }
}

# 3. Generate opencode.json if requested
if ($GenerateConfig) {
    $Config = @{
        name = "ai-master-folder-$ProfileName"
        agents = @{}
        commands = @{}
        skills = $DeployedItems.skills
        tools = @{}
    }

    foreach ($agent in $DeployedItems.agents) {
        $AgentConfigPath = Join-Path $DestDir "agents\$agent\AGENT.md"
        if (Test-Path $AgentConfigPath) {
            $Config.agents[$agent] = @{
                config = "agents/$agent/AGENT.md"
            }
        }
    }

    foreach ($cmd in $DeployedItems.commands) {
        $CmdConfigPath = Join-Path $DestDir "commands\$cmd\COMMAND.md"
        if (Test-Path $CmdConfigPath) {
            $Config.commands[$cmd] = @{
                config = "commands/$cmd/COMMAND.md"
            }
        }
    }

    $ConfigPath = Join-Path $DestDir "opencode.json"
    $Config | ConvertTo-Json -Depth 10 | Set-Content -Path $ConfigPath
    Write-Host "  -> Generated opencode.json at $ConfigPath"
}

# Verification
Write-Host "[Deploy] Verification:" -ForegroundColor Cyan
$errors = 0
$expectedCount = ($Profile.agents.Count + $Profile.commands.Count + $Profile.skills.Count + $Profile.tools.Count + $Profile.mcp.Count + $Profile.plugins.Count)

if ($Profile.instructions) {
    $expectedCount++ # AGENTS.md
}

$actualFiles = @(Get-ChildItem -Path $DestDir -Recurse -File -ErrorAction SilentlyContinue).Count
Write-Host "  Expected items: $expectedCount | Files in target: $actualFiles" -ForegroundColor Gray

if ($actualFiles -eq 0) {
    Write-Warning "  No files found in target directory — deployment may be empty."
    $errors++
}

if ($errors -eq 0) {
    Write-Host "Deployment completed successfully." -ForegroundColor Green
} else {
    Write-Warning "Deployment completed with $errors verification warnings."
}
