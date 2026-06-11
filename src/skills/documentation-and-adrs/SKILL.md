---
name: documentation-and-adrs
description: "Write architecture decision records and maintainable documentation that stays current."
version: 1.0.0
license: MIT
compatibility:
  - opencode: ">=1.0.0"
metadata:
  author: "AI Master Folder"
  category: "development"
  tags:
    - documentation
    - adr
    - architecture
    - decisions
allowed-tools:
  - read
  - write
  - edit
  - bash
  - glob
  - grep
---

# Documentation & ADRs

Document decisions and systems so that future developers (including your future self) understand why things are the way they are.

## Architecture Decision Records (ADRs)

### When to Write an ADR
- Architectural or design decisions
- Technology choices (libraries, frameworks, databases)
- Policy decisions that affect the codebase
- Any decision with significant cost to reverse

### ADR Format (MADR)
```
# ADR-001: Use Cursor-Based Pagination

## Status
Accepted

## Context
The user list API currently returns all users at once.
As the user base grew to 500K, the endpoint times out.

## Decision
Implement cursor-based pagination using opaque cursor tokens
encoded as base64 JSON.

## Consequences
- (+) Consistent performance regardless of dataset size
- (+) No phantom row issues (vs offset pagination)
- (-) Cannot jump to arbitrary pages
- (-) More complex client implementation

## Compliance
- [ ] All list endpoints use cursor pagination
- [ ] Responses include `nextCursor` and `hasMore` fields
```

### ADR Lifecycle
```
Proposed → Accepted → Deprecated → Superseded
```
Each transition should reference the ADR that caused it.

## Documentation Rules

### Code Proximity
- Document as close to the code as possible
- README in each module, not one giant README at the root
- Types and interfaces are preferred over prose documentation

### Living Documentation
- If it can be generated from code (API docs, type docs), generate it
- If it must be written manually, put it with the code and review it in PRs
- Documentation that cannot be kept current should be removed

### The README Standard
Every module should answer:
1. What is this? (one sentence)
2. Why does it exist? (context)
3. How do I use it? (quick example)
4. Where is the source? (entry point)
5. Who maintains it? (team or owner)

## Documentation Checklist

- [ ] Every module has a README
- [ ] Every decision has an ADR
- [ ] ADRs are linked from the code they affect
- [ ] Deprecated features have sunset dates documented
- [ ] Onboarding docs cover setup, not concepts
- [ ] Troubleshooting guide exists for common issues

## Rationalizations

| Excuse | Rebuttal |
|--------|----------|
| "The code is self-documenting" | Code explains WHAT. Documentation explains WHY. |
| "ADRs are bureaucratic overhead" | ADRs save days of "why did we do this" discussions. |
| "I'll document it after the deadline" | Document as you go. Post-deadline documentation never happens. |
| "Nobody reads documentation anyway" | They will when something breaks. Make it worth reading. |
