---
name: audit
description: "Run a security audit: dependency CVE scan, OWASP review, secret detection."
agent: security-auditor
model: ""
subtask: true
---

# /audit

Run a comprehensive security audit. Delegates to @security-auditor.

## Arguments

| Argument | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `--type` | string | no | all | `deps`, `code`, `secrets`, `all` |

Examples:
```
/audit
/audit --type deps
/audit --type secrets --scope src/config
```
