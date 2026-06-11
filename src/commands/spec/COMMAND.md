---
name: spec
description: "Write a specification covering objectives, structure, constraints, and acceptance criteria."
agent: planner
subtask: true
---

# /spec

Write a spec-driven development specification. Delegates to @planner with spec-driven-development skill.

## Workflow

1. Gather requirements from the user's request
2. Generate a PRD covering: Objective, Requirements, Out of Scope, Structure, Constraints, Testing Strategy
3. Write to `specs/<feature-name>.md`
4. Present for approval — no code until spec is approved

## Arguments

| Argument | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `--scope` | string | no | all | Feature area to spec |
| `--depth` | string | no | standard | `brief`, `standard`, `detailed` |
| `--out` | string | no | specs/ | Output directory |

Examples:
```
/spec Build user authentication system
/spec --depth brief Add password reset
/spec --scope payment --out docs/specs
```
