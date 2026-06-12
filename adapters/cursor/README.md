# Cursor Adapter

> **Status: 🚧 Roadmap (not yet functional).** The snippet below is a documented starting
> point, not a tested or deploy-integrated generator. Run it manually at your own risk and
> verify the output. Tracked as future work; see the `cross-agent-porting` skill.

Cursor uses `.cursor/rules/*.mdc` files. The AI Master Folder's core rules can be converted to this format.

## Quick Start

Copy core rules to Cursor's format:

```powershell
# Create Cursor rules directory
New-Item -ItemType Directory -Force -Path ".cursor\rules"

# Convert each core rule
$rules = @{
    "prompt-defense-baseline" = "Always"
    "security-standards" = "Always"
    "coding-standards" = "Always"
    "git-workflow" = "Always"
    "agent-delegation" = "Always"
}

foreach ($rule in $rules.Keys) {
    $src = "src\rules\common\$rule.md"
    $dst = ".cursor\rules\$rule.mdc"
    if (Test-Path $src) {
        $content = Get-Content $src -Raw
        # Extract body after frontmatter
        if ($content -match '^---.*?---\s*\n(.*)' ) {
            $body = $Matches[1]
        } else {
            $body = $content
        }
        @"
---
description: "$rule core rule"
alwaysApply: `$true
---
$body
"@ | Set-Content -Path $dst
    }
}
```

## Format Reference

Each `.mdc` file uses YAML frontmatter:

```yaml
---
description: "What this rule does"
globs: ["src/**/*.ts"]  # optional, file patterns
alwaysApply: true       # optional, default false
---
```

- `alwaysApply: true` — rule applies to every conversation
- `globs: ["pattern"]` — rule applies only when editing matching files
- No `alwaysApply` + no `globs` — agent decides when to apply

## Notes

- The legacy `.cursorrules` file in the project root still works but is deprecated
- Cursor also supports `AGENTS.md` in the project root for simple always-on instructions
- The AI Master Folder's `src/AGENTS.md` can be copied as `.cursor/AGENTS.md` for basic coverage
