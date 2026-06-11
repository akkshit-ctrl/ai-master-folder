---
name: docs
description: "Generate or update documentation."
agent: docs-writer
model: claude-sonnet-4-20250514
subtask: true
---

# /docs

Generate or update documentation. Delegates to @docs-writer.

## Arguments

| Argument | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `--target` | string | no | README.md | File or directory to document |
| `--type` | string | no | auto | `readme`, `api`, `contributing`, `inline` |
| `--update` | flag | no | false | Update existing docs instead of creating new |

Examples:
```
/docs
/docs --target src/utils/parse.ts
/docs --type api --target src/
/docs --update --target README.md
```
