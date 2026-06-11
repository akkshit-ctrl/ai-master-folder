---
name: security-standards
description: "Mandatory security checks: secret detection, OWASP, injection prevention, CVE scanning."
category: security
priority: mandatory
---

# Security Standards

## Secret Detection
- Never hardcode secrets, tokens, passwords, API keys, or certificates in source code.
- Use environment variables or secret management services for all sensitive values.
- If a secret is detected in code, flag immediately and suggest environment variable replacement.
- Scan all files for potential secrets before committing: `*.env*`, `*secret*`, `*key*`, `*token*`, `*password*`, `*credential*`.

## OWASP Top 10 Must-Checks
Every code review must check for:
1. **Broken Access Control** — Are permissions checked on every request?
2. **Cryptographic Failures** — Are secrets and PII properly encrypted?
3. **Injection** — Are all inputs sanitized (SQL, NoSQL, OS command, LDAP)?
4. **Insecure Design** — Are security controls part of the design, not bolted on?
5. **Security Misconfiguration** — Are defaults secure? Debug mode off?
6. **Vulnerable Components** — Are dependencies up to date without known CVEs?
7. **Authentication Failures** — Are auth checks consistent and complete?
8. **Data Integrity Failures** — Are software updates and CI/CD pipelines signed/verified?
9. **Logging & Monitoring** — Are security-relevant events logged without exposing secrets?
10. **SSRF** — Are server-side request URLs validated and restricted?

## Input Validation
- Validate all external input: API requests, file uploads, user input, serialized data.
- Use allowlists (valid values) over denylists (blocked values).
- Sanitize output to prevent XSS in web contexts.

## Dependency Security
- Check dependencies against known CVEs before adding or updating.
- Pin dependency versions in lockfiles; avoid floating versions.
- Prefer maintained, widely-used libraries over niche or abandoned ones.

## Secure Defaults
- Opt for the most secure configuration by default.
- Disable debug and verbose error modes in production.
- Use least-privilege principle for all service accounts and API tokens.
