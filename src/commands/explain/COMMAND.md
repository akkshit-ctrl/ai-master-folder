---
name: explain
description: "Explain a code section in detail."
agent: ""
subtask: false
---

# /explain

Explain what a section of code does, including its context, inputs, outputs, and side effects.

## Arguments

| Argument | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `--target` | string | no | . | File, function, or line range to explain |
| `--depth` | string | no | standard | `brief`, `standard`, `deep` |

Examples:
```
/explain --target src/utils/parse.ts
/explain --target src/server.ts:42-67 --depth deep
/explain --target handleAuth --depth brief
```
