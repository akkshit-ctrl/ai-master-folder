---
name: security-scan
description: "Run quick security scan: secret detection, dependency audit, OWASP checks."
agent: security-reviewer
subtask: true
---

# /security-scan

Run a focused security scan on the current project. Delegates to @security-reviewer.

## Arguments

| Argument | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `--type` | string | no | all | `secrets`, `deps`, `code`, `all` |

Examples:
```
/security-scan
/security-scan --type secrets
/security-scan --type deps
```
