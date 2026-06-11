---
name: debug
description: "Start a debugging session."
agent: debug-agent
model: ""
subtask: true
---

# /debug

Start a systematic debugging session. Delegates to @debug-agent.

## Arguments

| Argument | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `--target` | string | no | . | File or module to debug |
| `--repro` | string | no | "" | Reproduction steps or test command |

Examples:
```
/debug
/debug --target src/server.ts
/debug --repro "npm test -- --grep 'login fails'"
```
