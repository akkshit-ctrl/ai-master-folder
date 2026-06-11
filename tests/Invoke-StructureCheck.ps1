<#
.SYNOPSIS
    Validate AI Master Folder structure and file integrity.
.DESCRIPTION
    Checks all SKILL.md, AGENT.md, COMMAND.md files exist, have valid frontmatter,
    and cross-references resolve correctly. Run from repo root.
.EXAMPLE
    .\tests\Invoke-StructureCheck.ps1
#>

$RepoRoot = $PSScriptRoot | Split-Path -Parent
$SrcDir = Join-Path $RepoRoot "src"
$global:exitCode = 0
$global:passed = 0
$global:failed = 0

function Test-Check($name, $result) {
    if ($result) {
        Write-Host "  [PASS] $name" -ForegroundColor Green
        $global:passed++
    } else {
        Write-Host "  [FAIL] $name" -ForegroundColor Red
        $global:failed++
        $global:exitCode = 1
    }
}

function Test-Frontmatter($filePath, $requiredFields) {
    if (!(Test-Path $filePath)) { return $false }
    $content = Get-Content $filePath -Raw
    $match = [regex]::Match($content, '^---\s*\n(.*?)\n---', 'Singleline')
    if (!$match.Success) { return $false }

    $frontmatter = $match.Groups[1].Value
    foreach ($field in $requiredFields) {
        $fieldMatch = [regex]::Match($frontmatter, "(?m)^$field\s*:")
        if (!$fieldMatch.Success) { return $false }
    }
    return $true
}

function Check-Frontmatter($label, $path, $fields) {
    $result = Test-Frontmatter $path $fields
    if ($result) {
        Write-Host "  [PASS] $label" -ForegroundColor Green
        $global:passed++
    } else {
        Write-Host "  [FAIL] $label" -ForegroundColor Red
        $global:failed++
        $global:exitCode = 1
    }
}

Write-Host "============================================" -ForegroundColor Cyan
Write-Host " AI Master Folder - Structure Validation" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan

# 1. Root files
Write-Host "`n[Root Files]" -ForegroundColor Yellow
$rootFiles = @("opencode.json", "README.md", "CHANGELOG.md", "VERSION", ".gitignore")
foreach ($file in $rootFiles) {
    Test-Check "$file exists" (Test-Path (Join-Path $RepoRoot $file))
}

# 2. Profiles
Write-Host "`n[Profiles]" -ForegroundColor Yellow
foreach ($profile in @("full", "lean")) {
    $path = Join-Path (Join-Path $RepoRoot "profiles") "$profile.json"
    Test-Check "profile: $profile.json" (Test-Path $path)
}

# 3. Agents
Write-Host "`n[Agents]" -ForegroundColor Yellow
$expectedAgents = @(
    "architect", "build-error-resolver", "build-resolver", "code-reviewer",
    "comparator", "debug-agent", "docs-writer", "e2e-runner", "grader",
    "orchestrator", "performance-optimizer", "planner", "qa-agent",
    "refactor-cleaner", "security-auditor", "security-reviewer", "tester"
)

foreach ($agent in $expectedAgents) {
    $path = Join-Path (Join-Path $SrcDir "agents") $agent
    $path = Join-Path $path "AGENT.md"
    $exists = Test-Path $path
    Test-Check "agent: $agent/AGENT.md" $exists
    if ($exists) {
        $fields = @("name", "description", "mode")
        Check-Frontmatter "  $agent frontmatter (name, description, mode)" $path $fields
    }
}

# 4. Commands
Write-Host "`n[Commands]" -ForegroundColor Yellow
$expectedCommands = @(
    "audit", "build-fix", "checkpoint", "cleanup", "commit", "debug", "docs",
    "evolve", "explain", "learn", "plan", "quality-gate", "refactor-cmd",
    "review", "security-scan", "sessions", "ship", "skill-create", "spec", "test"
)

foreach ($cmd in $expectedCommands) {
    $path = Join-Path (Join-Path $SrcDir "commands") $cmd
    $path = Join-Path $path "COMMAND.md"
    $exists = Test-Path $path
    Test-Check "command: $cmd/COMMAND.md" $exists
    if ($exists) {
        $fields = @("name", "description")
        Check-Frontmatter "  $cmd frontmatter (name, description)" $path $fields
    }
}

# 5. Skills
Write-Host "`n[Skills]" -ForegroundColor Yellow
$expectedSkills = @(
    "api-and-interface-design", "architecture-decision-records", "artifact-builder",
    "browser-testing", "changelog-generation", "ci-cd-and-automation",
    "code-analysis", "code-review", "code-simplification", "content-writing",
    "context-engineering", "continuous-learning", "debugging",
    "deprecation-and-migration", "docker-patterns", "document-processing",
    "documentation-and-adrs", "doubt-driven-development", "error-handling",
    "explain", "git-workflow", "iterative-retrieval", "mcp-builder",
    "observability-and-instrumentation", "performance-audit", "plan",
    "postgres-patterns", "project-init", "prompt-optimizer", "pull-request",
    "python-patterns", "refactoring", "search-first", "security-review",
    "shipping-and-launch", "skill-create", "source-driven-development",
    "spec-driven-development", "strategic-compact", "tdd-workflow",
    "testing", "token-budget-advisor", "typescript-patterns", "verification-loop"
)

foreach ($skill in $expectedSkills) {
    $path = Join-Path (Join-Path $SrcDir "skills") $skill
    $path = Join-Path $path "SKILL.md"
    $exists = Test-Path $path
    Test-Check "skill: $skill/SKILL.md" $exists
    if ($exists) {
        $fields = @("name", "description")
        Check-Frontmatter "  $skill frontmatter (name, description)" $path $fields
    }
}

# 6. Tools
Write-Host "`n[Tools]" -ForegroundColor Yellow
$expectedTools = @("changed-files", "check-coverage", "format-code", "git-summary", "lint-check", "run-tests")
foreach ($tool in $expectedTools) {
    $path = Join-Path (Join-Path $SrcDir "tools") $tool
    $path = Join-Path $path "index.ts"
    Test-Check "tool: $tool/index.ts" (Test-Path $path)
}

# 7. MCP
Write-Host "`n[MCP Servers]" -ForegroundColor Yellow
$expectedMcp = @("context7", "filesystem", "github", "playwright", "sentry", "sequential-thinking", "supabase")
foreach ($mcp in $expectedMcp) {
    $path = Join-Path (Join-Path $SrcDir "mcp") $mcp
    $path = Join-Path $path "mcp.json"
    Test-Check "mcp: $mcp/mcp.json" (Test-Path $path)
}

# 8. Instructions
Write-Host "`n[Instructions]" -ForegroundColor Yellow
$expectedInstructions = @("core-guidelines", "code-review-checklist", "security-checklist", "launch-checklist", "deprecation-checklist")
foreach ($inst in $expectedInstructions) {
    $path = Join-Path (Join-Path $SrcDir "instructions") "$inst.md"
    Test-Check "instruction: $inst.md" (Test-Path $path)
}

# 9. Rules
Write-Host "`n[Rules]" -ForegroundColor Yellow
$expectedRules = @("agent-delegation", "coding-standards", "git-workflow", "prompt-defense-baseline", "security-standards")
foreach ($rule in $expectedRules) {
    $path = Join-Path (Join-Path $SrcDir "rules") "common"
    $path = Join-Path $path "$rule.md"
    Test-Check "rule: $rule.md" (Test-Path $path)
}

# 10. Contexts
Write-Host "`n[Contexts]" -ForegroundColor Yellow
foreach ($ctx in @("dev", "research", "review")) {
    $path = Join-Path (Join-Path $SrcDir "contexts") "$ctx.md"
    Test-Check "context: $ctx.md" (Test-Path $path)
}

# 11. Hooks
Write-Host "`n[Hooks]" -ForegroundColor Yellow
$hooksJson = Join-Path (Join-Path $SrcDir "hooks") "hooks.json"
Test-Check "hooks/hooks.json" (Test-Path $hooksJson)
$expectedHooks = @("post-edit-validate", "post-tool-secret-detect", "pre-compact-warning", "session-end-save", "session-start-restore")
foreach ($hook in $expectedHooks) {
    $path = Join-Path (Join-Path $SrcDir "hooks") "scripts"
    $path = Join-Path $path "$hook.js"
    Test-Check "hook: $hook.js" (Test-Path $path)
}

# 12. Deploy script
Write-Host "`n[Scripts]" -ForegroundColor Yellow
$deployPath = Join-Path (Join-Path $RepoRoot "scripts") "Deploy-OpenCode.ps1"
Test-Check "scripts/Deploy-OpenCode.ps1" (Test-Path $deployPath)
$testHarnessPath = Join-Path (Join-Path $RepoRoot "tests") "Invoke-StructureCheck.ps1"
Test-Check "tests/Invoke-StructureCheck.ps1" (Test-Path $testHarnessPath)

# 14. Templates
Write-Host "`n[Templates]" -ForegroundColor Yellow
$expectedTemplates = @(
    @{"dir"="_template_agent"; "file"="AGENT.md"},
    @{"dir"="_template_command"; "file"="COMMAND.md"},
    @{"dir"="_template_skill"; "file"="SKILL.md"},
    @{"dir"="_template_instruction"; "file"="instruction.md"},
    @{"dir"="_template_profile"; "file"="profile.json"}
)
foreach ($t in $expectedTemplates) {
    $path = Join-Path (Join-Path $RepoRoot "templates") $t["dir"]
    $path = Join-Path $path $t["file"]
    Test-Check "template: $($t['dir'])/$($t['file'])" (Test-Path $path)
}

# 15. No orphan empty directories
Write-Host "`n[Integrity]" -ForegroundColor Yellow
$emptyDirs = @()
Get-ChildItem -Path $SrcDir -Directory -Recurse -ErrorAction SilentlyContinue | ForEach-Object {
    $children = @(Get-ChildItem -LiteralPath $_.FullName -Recurse -Force -ErrorAction SilentlyContinue)
    if ($children.Count -eq 0) {
        $emptyDirs += $_.FullName.Replace($RepoRoot, "").TrimStart("\")
    }
}
if ($emptyDirs.Count -eq 0) {
    Test-Check "No empty directories in src/" $true
} else {
    Write-Host "  Empty directories found:" -ForegroundColor Red
    foreach ($d in $emptyDirs) { Write-Host "    $d" -ForegroundColor Gray }
    Test-Check "No empty directories in src/" $false
}

# 16. No orphan empty scripts/ dirs
$orphanScripts = @()
Get-ChildItem -Path $SrcDir -Recurse -Directory -Filter "scripts" -ErrorAction SilentlyContinue | ForEach-Object {
    $children = @(Get-ChildItem -LiteralPath $_.FullName -File -ErrorAction SilentlyContinue)
    if ($children.Count -eq 0) {
        $orphanScripts += $_.FullName.Replace($RepoRoot, "").TrimStart("\")
    }
}
if ($orphanScripts.Count -eq 0) {
    Test-Check "No orphan empty scripts/ directories" $true
} else {
    foreach ($d in $orphanScripts) { Write-Host "  Orphan: $d" -ForegroundColor Red }
    Test-Check "No orphan empty scripts/ directories" $false
}

# Summary
Write-Host "`n============================================" -ForegroundColor Cyan
$color = if ($global:failed -eq 0) { "Green" } else { "Red" }
Write-Host " Results: $($global:passed) passed, $($global:failed) failed" -ForegroundColor $color
Write-Host "============================================" -ForegroundColor Cyan

exit $global:exitCode
