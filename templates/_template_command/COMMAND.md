---
name: example-command
description: "Triggers a specific workflow."
agent: orchestrator
model: ""
subtask: false
---

# Example Command

When the user runs `/example-command`, follow these exact steps:
1. Understand the context.
2. Formulate a plan.
3. Execute the workflow.

## Arguments

This command accepts the following arguments passed via `$ARGUMENTS`:

| Argument | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `--target` | string | no | `.` | Target path or scope |

Example invocation:
```
/example-command --target src/components
```

Access arguments in agent prompts as `$ARGUMENTS` (space-separated string after the command name).