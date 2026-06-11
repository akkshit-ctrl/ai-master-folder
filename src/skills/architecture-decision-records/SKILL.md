---
name: architecture-decision-records
description: "Create and maintain Architecture Decision Records (ADRs) for significant technical decisions."
version: 1.0.0
license: MIT
compatibility:
  - opencode: ">=1.0.0"
metadata:
  author: "AI Master Folder"
  category: "documentation"
  tags:
    - adr
    - architecture
    - decisions
    - documentation
allowed-tools:
  - read
  - write
  - edit
  - glob
  - grep
---

# Architecture Decision Records

Document significant architectural decisions using lightweight ADRs.

## When to Write an ADR

- Introducing a new technology, framework, or service
- Changing a significant architectural pattern
- Making a decision with long-term consequences
- Adopting a new external dependency
- Changing data models, API contracts, or deployment topology

## ADR Format

Each ADR is a short markdown file in `docs/adr/`:

```markdown
# ADR-{NNNN}: {Title}

**Status**: [Proposed | Accepted | Deprecated | Superseded]
**Date**: {YYYY-MM-DD}
**Deciders**: {list of decision-makers}

## Context
What is the problem or opportunity? What constraints exist?

## Decision
What was decided? Why this option over others?

## Consequences
What becomes easier or harder? What trade-offs were accepted?

## Alternatives Considered
- **Option A**: pros/cons
- **Option B**: pros/cons
```

## ADR Workflow

1. **Propose** — Write the ADR with status "Proposed"
2. **Review** — Stakeholders review and discuss
3. **Accept/Reject** — Update status accordingly
4. **Supersede** — If a later ADR replaces this one, link both ways

## Related

- See `documentation-and-adrs` for broader documentation practices and general doc standards
- The `architect` agent uses this skill for structured architecture decision-making
- Combine with `code-review` to validate ADR quality

## Rationalizations

| Excuse | Rebuttal |
|--------|----------|
| "I'll remember why I chose this" | Six months from now, you won't. Write it down. |
| "ADRs are too formal for our team" | A 5-minute ADR saves hours of re-explaining later. |
| "We use Slack for decisions" | Slack is searchable but not structured. ADRs are both. |
