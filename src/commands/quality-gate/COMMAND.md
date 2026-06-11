---
name: quality-gate
description: "Run verification checks before merge: lint, typecheck, tests, build."
agent: qa-agent
model: claude-sonnet-4-20250514
subtask: true
---

# /quality-gate

Run all quality checks before merge. Delegates to @qa-agent.

## Arguments

| Argument | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `--checks` | string | no | all | `lint`, `typecheck`, `test`, `build`, `security`, or comma-separated |

Examples:
```
/quality-gate
/quality-gate --checks lint,test
/quality-gate --checks security
```
