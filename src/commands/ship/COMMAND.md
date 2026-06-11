---
name: ship
description: "Run the shipping checklist: code readiness, docs, operations, launch readiness."
agent: qa-agent
subtask: true
---

# /ship

Run the full shipping and launch checklist. Delegates to @qa-agent with shipping-and-launch skill.

## Workflow

1. Verify code readiness (tests, lint, coverage, secrets)
2. Verify documentation (changelog, migration guide, env vars)
3. Verify operations (migrations, feature flags, rollback plan, monitoring)
4. Execute launch steps (staging → canary → ramp → tag)
5. Present results with pass/fail per item

## Arguments

| Argument | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `--grade` | string | no | ga | `internal`, `beta`, `ga`, `critical` |
| `--skip` | string | no | none | Comma-separated stages to skip |

Examples:
```
/ship
/ship --grade beta
/ship --grade critical --skip docs
```
