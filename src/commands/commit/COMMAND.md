---
name: commit
description: "Create a well-formatted git commit with Conventional Commits."
agent: ""
subtask: false
---

# /commit

Stage changes and create a Conventional Commits message.

## Arguments

| Argument | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `--type` | string | no | auto | `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `perf` |
| `--scope` | string | no | auto | Scope of change (e.g., `api`, `ui`) |
| `--message` | string | no | auto | Override the commit message |

Workflow:
1. Show `git diff --staged` or prompt to stage files
2. Generate a Conventional Commits message based on changes
3. Confirm with user before executing
4. Run `git commit`

Examples:
```
/commit
/commit --type fix --scope auth
/commit --message "fix(auth): handle token refresh race condition"
```
