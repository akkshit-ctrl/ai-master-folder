---
name: cleanup
description: "Clean up workspace, remove dead code, organize imports."
agent: ""
subtask: false
---

# /cleanup

Clean up the workspace by identifying and fixing common issues.

## Arguments

| Argument | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `--scope` | string | no | all | `all`, `imports`, `dead-code`, `whitespace`, `deps` |
| `--dry-run` | flag | no | false | Show what would be changed without modifying |

Checks performed:
- Unused imports and variables
- Trailing whitespace and missing trailing newlines
- Dead/commented-out code blocks
- Unused dependencies (if package.json or equivalent exists)
- Inconsistent indentation

Examples:
```
/cleanup
/cleanup --scope imports
/cleanup --dry-run
```
