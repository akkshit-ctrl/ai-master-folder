---
name: refactor-cmd
description: "Run code refactoring: rename, extract, simplify, and restructure."
agent: refactor-cleaner
subtask: true
---

# /refactor-cmd

Perform code refactoring and cleanup. Delegates to @refactor-cleaner.

## Arguments

| Argument | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `--target` | string | no | . | File or directory to refactor |
| `--type` | string | no | all | `rename`, `extract`, `simplify`, `restructure`, `all` |

Examples:
```
/refactor-cmd
/refactor-cmd --target src/utils/parse.ts --type simplify
/refactor-cmd --type rename --target src/components/
```
