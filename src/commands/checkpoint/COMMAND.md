---
name: checkpoint
description: "Save or restore session checkpoints for context management."
agent: ""
subtask: false
---

# /checkpoint

Save the current session state or restore from a previous checkpoint.

## Arguments

| Argument | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `--action` | string | no | save | `save`, `restore`, `list` |
| `--name` | string | no | auto | Checkpoint name or label |

Examples:
```
/checkpoint
/checkpoint --action save --name before-refactor
/checkpoint --action list
/checkpoint --action restore --name before-refactor
```
