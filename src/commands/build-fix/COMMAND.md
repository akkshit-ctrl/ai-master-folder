---
name: build-fix
description: "Diagnose and resolve build errors."
agent: build-resolver
model: claude-sonnet-4-20250514
subtask: true
---

# /build-fix

Diagnose and fix build errors. Delegates to @build-resolver.

## Arguments

| Argument | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `--target` | string | no | . | Target directory or module to build |

Examples:
```
/build-fix
/build-fix --target src/server
```
