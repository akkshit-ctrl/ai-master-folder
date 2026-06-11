---
name: security-review
description: "OWASP-based security audit: vulnerability scanning, CVE dependency check, threat modeling."
version: 1.0.0
license: MIT
compatibility:
  - opencode: ">=1.0.0"
metadata:
  author: "AI Master Folder"
  category: "security"
  tags:
    - security
    - audit
    - owasp
    - cve
    - vulnerability
allowed-tools:
  - read
  - grep
  - glob
  - bash
---

# Security Review

Security audit following OWASP methodology.

## Audit Process

### Phase 1: Dependency Scan
Check all dependencies against known CVEs:
- Node: `npm audit` or `yarn audit`
- Python: `pip-audit` or `safety check`
- Rust: `cargo audit`
- Go: `govulncheck`

### Phase 2: Static Analysis
Run security-focused static analysis:
- Node: `eslint-plugin-security`
- Python: `bandit`
- Rust: `cargo audit`
- General: `semgrep` or `codeql`

### Phase 3: Manual Review
Check each OWASP Top 10 category:

| Category | What to Check |
|---|---|
| Broken Access Control | Are permissions checked on every endpoint? |
| Cryptographic Failures | Are secrets encrypted? HTTPS enforced? |
| Injection | Are all inputs parameterized/sanitized? |
| Insecure Design | Is security part of the architecture? |
| Security Misconfiguration | Are defaults secure? Debug off? |
| Vulnerable Components | Are all deps up to date? |
| Auth Failures | Is auth consistent across all routes? |
| Data Integrity | Are CI/CD pipelines secure? |
| Logging & Monitoring | Are events logged without secrets? |
| SSRF | Are outbound URLs validated? |

### Phase 4: Report Generation
```yaml
findings:
  - severity: critical|high|medium|low
    category: owasp-category
    file: path/to/file
    line: 42
    description: What the issue is
    remediation: How to fix it
    cve: CVE-2026-XXXX (if applicable)
```

## Rationalizations

| Excuse | Rebuttal |
|--------|----------|
| "This code isn't security-critical" | Every line is security-critical. Attackers think differently. |
| "We'll fix security in the next sprint" | Vulnerabilities don't wait for sprints. |
| "Nobody will exploit this" | Famous last words. Assume compromise. |
