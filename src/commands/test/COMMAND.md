---
name: test
description: "Run tests with context-aware configuration."
agent: tester
model: claude-sonnet-4-20250514
subtask: true
---

# /test

Run tests in the current project. Delegates to @tester.

## Arguments

| Argument | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `--file` | string | no | all | Specific test file to run |
| `--watch` | flag | no | false | Run in watch mode |
| `--coverage` | flag | no | false | Generate coverage report |

Examples:
```
/test
/test --file src/utils/__tests__/parse.test.ts
/test --watch --coverage
```
