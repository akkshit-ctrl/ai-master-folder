---
name: code-review
description: "Systematic code review covering correctness, security, style, performance, and edge cases. Use when reviewing a diff or PR, or asked to check code quality before merge."
license: MIT
compatibility: "opencode >=1.0.0"
metadata:
  version: 1.0.0
  author: "AI Master Folder"
  category: "development"
  tags:
    - review
    - quality
    - security
    - best-practices
allowed-tools: read glob grep bash
---

# Code Review

When asked to review code, follow this systematic framework:

## Review Dimensions

### 1. Correctness
- Does the code do what it claims?
- Are there off-by-one, null-pointer, or type errors?
- Are error paths handled (network failures, invalid input, edge cases)?
- Are there race conditions or concurrency bugs?

### 2. Security
- Are inputs validated and sanitized?
- Are secrets / credentials exposed anywhere?
- Does the code follow OWASP Top 10 guidelines?
- Is there proper authentication and authorization?

### 3. Style & Readability
- Does the code follow the project's style guide?
- Are names meaningful and consistent?
- Is the code self-documenting? Are complex sections commented?
- Are functions/pure functions too long or doing too much?

### 4. Performance
- Are there N+1 queries or unnecessary loops?
- Could caching improve this code?
- Are resources (file handles, DB connections) properly released?
- Is there memory allocation in hot paths?

### 5. Edge Cases
- Empty states (null, undefined, empty array/string)
- Boundary values (max/min, 0, negative)
- What happens when dependencies fail?
- What happens with unexpected input types?

## Output Format

Provide review results as:

```
## Review Summary
**Overall**: ✅ Approve | ⚠️ Changes requested | ❌ Blocked
**Severity**: Critical | Major | Minor | Nit

### Findings
1. **Critical**: [description] — [file:line]
2. **Major**: [description] — [file:line]
...
```

## Rationalizations

| Excuse | Rebuttal |
|--------|----------|
| "My code is clean enough" | Review catches blind spots — you're too close to your own code. |
| "There's no time for review" | Bugs in production cost more time than the review. |
| "Only I work on this code" | Future you will thank present you for the review. |
