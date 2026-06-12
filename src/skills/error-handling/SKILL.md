---
name: error-handling
description: "Patterns for robust error handling across languages and paradigms. Use when designing error/exception handling, result types, retries, or failure recovery."
license: MIT
compatibility: "opencode >=1.0.0"
metadata:
  version: 1.0.0
  author: "AI Master Folder"
  category: "development"
  tags:
    - error-handling
    - exceptions
    - robustness
    - resilience
allowed-tools: read edit grep
---

# Error Handling

Standard patterns for robust error handling across languages.

## Principles

1. **Never silently swallow errors** — every caught error should be logged, rethrown, or handled
2. **Fail fast and clearly** — surface errors at the earliest meaningful point
3. **Distinguish recoverable from unrecoverable** — handle recoverable errors gracefully, crash on unrecoverable ones
4. **Provide actionable messages** — error messages should tell the reader what happened and how to fix it

## By Language

### TypeScript / JavaScript
- Use typed errors (custom Error subclasses with `cause` property)
- Prefer `Result` types for expected failure modes over exceptions
- Use `try/catch` only for unexpected errors at boundaries

### Python
- Use custom exception classes inheriting from `Exception`
- Use `try/except/else/finally` correctly (else for success path)
- Prefer early returns over deep try/catch nesting

### Rust
- Use `Result<T, E>` for recoverable errors
- Use `anyhow` for application code, `thiserror` for library code
- Propagate errors with context using `.context()` or `.with_context()`

## Anti-Patterns

| Anti-Pattern | Why It Is Bad |
|---|---|
| Empty catch block (`catch {}`) | Hides failures, makes debugging impossible |
| Catching `Exception` broadly | Masks unexpected bugs, makes recovery unclear |
| Error as string | Cannot be programmatically handled, no structure |
| Log and rethrow | Creates noise — log at the handler level instead |

## Rationalizations

| Excuse | Rebuttal |
|--------|----------|
| "This error will never happen" | It will. At 3 AM. On a holiday. |
| "I will add error handling later" | Later is when the unhandled error hits production. |
| "The default error is good enough" | Default errors lack context specific to your application. |
