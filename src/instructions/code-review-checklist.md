---
name: code-review-checklist
description: "Reference checklist for conducting thorough code reviews."
---

# Code Review Checklist

## Correctness
- [ ] Does the code do what it claims to do?
- [ ] Are edge cases handled (empty states, null, zero, overflow)?
- [ ] Are error paths tested, not just happy paths?
- [ ] Are there any race conditions or TOCTOU issues?

## Design
- [ ] Does the change fit the existing architecture?
- [ ] Are abstractions appropriate (not over- or under-engineered)?
- [ ] Is the public API minimal and coherent?
- [ ] Are side effects obvious and documented?

## Maintainability
- [ ] Is the code readable without comments explaining WHAT (only WHY)?
- [ ] Are names meaningful and consistent with the codebase?
- [ ] Are functions small (≤60 lines) with single responsibility?
- [ ] Is duplication eliminated?

## Security
- [ ] Are all inputs validated and sanitized?
- [ ] Are secrets/tokens handled safely (never logged, never committed)?
- [ ] Is authorization checked at every layer, not just the UI?
- [ ] Are there any SQL injection, XSS, or CSRF vectors?

## Testing
- [ ] Does new code have ≥90% coverage?
- [ ] Are there integration tests for the changed paths?
- [ ] Do tests fail meaningfully (clear assertion messages)?
- [ ] Are there no snapshot-only tests (assert behavior, not output)?

## Performance
- [ ] Are N+1 queries avoided?
- [ ] Are expensive operations cached or deferred?
- [ ] Are large payloads paginated?
- [ ] Is the change benchmarked if performance-sensitive?
