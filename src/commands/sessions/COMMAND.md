---
name: sessions
description: "Manage AI coding sessions: list, inspect, resume, and clean up."
agent: ""
subtask: false
---

# /sessions

Manage session history and state across AI coding sessions.

## Arguments

| Argument | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `--action` | string | no | list | `list`, `show`, `clean` |
| `--id` | string | no | last | Session ID to inspect or resume |

Examples:
```
/sessions
/sessions --action list
/sessions --action show --id last
/sessions --action clean
```
