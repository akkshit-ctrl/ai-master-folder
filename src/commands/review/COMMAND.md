---
name: review
description: "Trigger a code review on recent changes."
agent: code-reviewer
model: ""
subtask: true
---

# /review

Review code changes. Delegates to @code-reviewer.

## Arguments

| Argument | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `--scope` | string | no | unstaged | `unstaged`, `staged`, `branch`, or path |
| `--depth` | string | no | standard | `quick`, `standard`, `full` |

Examples:
```
/review
/review --scope staged
/review --scope src/components --depth full
```
