---
name: plan
description: "Create an implementation plan from requirements."
agent: planner
model: claude-opus-4-20250514
subtask: true
---

# /plan

Create a structured implementation plan. Delegates to @planner.

## Arguments

| Argument | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `--scope` | string | no | all | Scope of the plan (e.g., feature name) |
| `--depth` | string | no | standard | `brief`, `standard`, `detailed` |

Examples:
```
/plan Build user authentication system
/plan --depth detailed Add password reset flow
/plan --scope payment --depth brief
```
