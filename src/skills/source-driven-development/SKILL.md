---
name: source-driven-development
description: "Treat source material as the single source of truth. Derive decisions from primary sources, not assumptions."
version: 1.0.0
license: MIT
compatibility:
  - opencode: ">=1.0.0"
metadata:
  author: "AI Master Folder"
  category: "workflow"
  tags:
    - source
    - research
    - decisions
    - documentation
allowed-tools:
  - read
  - write
  - edit
  - bash
  - glob
  - grep
  - webfetch
  - websearch
---

# Source-Driven Development

Base every decision on primary sources — code, documentation, RFCs, and data — rather than assumptions, memory, or hearsay.

## When to Use
- When implementing against a specification
- When debugging unexpected behavior
- When choosing a library or dependency
- When reviewing code you didn't write
- When estimating effort or complexity

## Process

### Step 1: Identify the Source
Determine the authoritative source:
- **Code behavior** → the actual source code, not the comment
- **API contract** → the type definition, not the docs
- **Business rule** → the spec or requirement document
- **Dependency** → the npm/crates.io/pypi package, not a blog post

### Step 2: Read the Source
Read the actual source material. Not a summary, not a Stack Overflow answer, not what you remember.

### Step 3: Quote the Source
When communicating findings, quote the source directly:
```
Source: src/lib/validator.ts:42-48
Rule: "Email addresses must be unique per tenant"
```

### Step 4: Derive the Decision
Make the decision based on what the source says. If the source is ambiguous, note the ambiguity and flag it.

## Techniques

### Source Traceability
Annotate decisions with source references:
```
# Decision: Use cursor-based pagination
# Source: api-spec-v3.md §4.2
# Rationale: Offset pagination breaks when rows are inserted/deleted
```

### Assumption Audit
Whenever you hear "I think", "probably", "should", ask:
- What is the primary source for this assumption?
- Can we verify it in under 5 minutes?
- If we can't verify it, can we make the decision reversible?

## Anti-Patterns
- "I remember how this works" — memory is unreliable
- "The docs say X, but I think Y" — verify before deviating
- "Everyone knows that Z is true" — consensus is not a source
- Using outdated sources without checking the timestamp

## Rationalizations

| Excuse | Rebuttal |
|--------|----------|
| "I know how this works from memory" | Memory is the most unreliable source. Verify in the code. |
| "The docs should be correct" | Docs and code diverge. Code is truth. |
| "It's faster to guess than to look it up" | Guessing is faster until it produces a wrong decision. |
| "I checked this last month" | Code changes. Check the current state. |
