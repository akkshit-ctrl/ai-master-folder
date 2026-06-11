---
name: security-checklist
description: "Reference checklist for security review of code and infrastructure."
---

# Security Checklist

## Authentication & Authorization
- [ ] Authentication is required for all protected endpoints
- [ ] Authorization is checked at every layer (not just UI hiding)
- [ ] Tokens/sessions expire and can be revoked
- [ ] Password policies meet OWASP guidelines (bcrypt/argon2, min 12 chars)
- [ ] API keys are scoped to minimum necessary permissions

## Input Validation
- [ ] All user input is validated (type, length, range, format)
- [ ] File uploads are restricted by type, size, and content inspection
- [ ] SQL queries use parameterized statements or an ORM
- [ ] Redirect URLs are validated against an allowlist
- [ ] No eval(), exec(), or dynamic code execution from user input

## Data Protection
- [ ] Secrets, keys, and tokens are never hardcoded or committed
- [ ] PII is encrypted at rest (AES-256) and in transit (TLS 1.3)
- [ ] Logs exclude sensitive data (passwords, tokens, PII)
- [ ] Database backups are encrypted
- [ ] Data retention and deletion policies exist and are enforced

## Infrastructure
- [ ] Dependencies are scanned for CVEs (npm audit, trivy, etc.)
- [ ] Containers run as non-root user
- [ ] Network ports are restricted (least-privilege firewall rules)
- [ ] HTTPS is enforced with HSTS headers
- [ ] Rate limiting is configured for public endpoints

## Incident Response
- [ ] Error messages don't leak stack traces or internal paths
- [ ] Monitoring alerts for auth failures, rate limit hits, 5xx spikes
- [ ] Rollback plan exists for every deploy
- [ ] Security contacts are documented and monitored
