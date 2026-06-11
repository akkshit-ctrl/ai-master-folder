param (
    [string]$ProfileName = "base",
    [string]$TargetPath,
    [switch]$Preview,
    [switch]$Global,
    [switch]$GenerateConfig
)

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

if (!(Test-Path $DestDir)) {
    New-Item -ItemType Directory -Force -Path $DestDir | Out-Null
}

$ProfilePath = Join-Path $ProfilesDir "$ProfileName.json"
if (!(Test-Path $ProfilePath)) {
    Write-Error "Profile '$ProfileName' not found at $ProfilePath"
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

Write-Host "Deployment completed successfully." -ForegroundColor Green
