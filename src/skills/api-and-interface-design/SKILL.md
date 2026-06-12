---
name: api-and-interface-design
description: "Design consistent, predictable, self-documenting APIs and interfaces. Use when designing or reviewing a REST/GraphQL/library API, naming endpoints, versioning, or shaping function/module signatures."
license: MIT
compatibility: "opencode >=1.0.0"
metadata:
  version: 1.0.0
  author: "AI Master Folder"
  category: "development"
  tags:
    - api
    - design
    - contracts
    - types
allowed-tools: read write edit bash glob grep
---

# API & Interface Design

Design APIs and interfaces that are consistent, predictable, and self-documenting. A good interface makes correct usage obvious and incorrect usage impossible.

## Principles

### Consistency
- Same patterns for similar operations
- Same naming conventions across the codebase
- Same error shapes for every endpoint

### Predictability
- Do the least surprising thing
- Follow the Principle of Least Astonishment
- Expose implementation details only when necessary

### Self-Documenting
- Types are documentation
- Bad naming cannot be fixed with comments
- If the interface needs a paragraph to explain, redesign it

## Design Checklist

### Naming
- [ ] Names reveal intent without reading the body
- [ ] Boolean parameters use prefixes: `isEnabled`, `hasAccess`, `shouldRetry`
- [ ] Functions are verbs (`createUser`), types are nouns (`User`)
- [ ] No abbreviations unless universally understood (`id`, `url`, `html`)

### Parameters
- [ ] ≤3 parameters; use an options object for more
- [ ] Required params come first, optional params in an object
- [ ] Destructure option objects with defaults
- [ ] No boolean flags as positional parameters

### Return Values
- [ ] Return types are consistent (don't return `User | null` in one method and `User | undefined` in another)
- [ ] Errors are typed and structured, not raw strings
- [ ] Paginated endpoints return `{ data, nextCursor, hasMore }` or similar

### Errors
- [ ] Error types are exported and documented
- [ ] Same error shape across all endpoints
- [ ] Error messages are actionable, not just descriptive

## Contract Patterns

### Input Validation
```
function createUser(input: {
  name: string;          // validated, sanitized
  email: EmailString;    // branded type
  role: 'admin' | 'user' | 'viewer';
}): Result<User, ValidationError>
```

### Result Types
```
type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E }
```

## Rationalizations

| Excuse | Rebuttal |
|--------|----------|
| "I'll clean up the API later" | Every consumer couples to the current API. Breaking changes get exponentially harder. |
| "Boolean flags are fine for now" | Boolean flags are a code smell. Use an options object or separate functions. |
| "The interface is just for internal use" | Internal interfaces become external ones. Design them properly. |
