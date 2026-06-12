---
name: doubt-driven-development
description: "Surface uncertainty, document unknowns, and make reversible decisions. Use when requirements are unclear, you're unsure of an approach, or you want to de-risk a decision."
license: MIT
compatibility: "opencode >=1.0.0"
metadata:
  version: 1.0.0
  author: "AI Master Folder"
  category: "workflow"
  tags:
    - doubt
    - uncertainty
    - decisions
    - risk
allowed-tools: read write edit
---

# Doubt-Driven Development

Surface uncertainty explicitly. When you're not 100% confident, document the doubt, assess the impact, and prefer reversible decisions.

## When to Use
- Making architectural decisions
- Choosing between approaches
- Implementing in unfamiliar code
- Estimating timelines
- Code review

## The Doubt Matrix

| Certainty | Action |
|-----------|--------|
| High (90-100%) | Proceed. Document the decision. |
| Medium (60-90%) | Proceed with reversibility. Add TODO for validation. |
| Low (30-60%) | Spike first. Build a prototype to validate the approach. |
| Very Low (<30%) | Do not proceed. Research until certainty improves. |

## Techniques

### 1. Doubt Logging
Annotate uncertain spots with a structured comment:
```
// TODO(doubt): Is this the right data structure?
// Options considered: Array, Set, Map
// Chosen: Set because O(1) lookup
// Risk: Memory overhead for large collections
// Reversal: Trivial — change Set to Array
```

### 2. Reversibility Check
Before making a decision, ask:
- How hard is it to undo this?
- What's the cost of being wrong?
- What would tell us we're wrong? (put a metric on it)

### 3. Bet Sizing
Allocate effort proportional to confidence:
- High certainty → full investment
- Medium certainty → prototype, then invest
- Low certainty → time-boxed research
- Very low certainty → don't commit resources

### 4. Pre-Mortem
Assume the decision failed. Why? Write the post-mortem now, then address the risks.

## Decision Record Template
```
## Decision: [title]
- **Certainty**: [High/Medium/Low/Very Low]
- **Reversible**: [Yes/No — explain]
- **Evidence**: [sources, data]
- **Risks**: [what could go wrong]
- **Signal**: [what tells us we're wrong]
```

## Rationalizations

| Excuse | Rebuttal |
|--------|----------|
| "I'm confident enough to proceed" | Confidence without evidence is a bias. Document what you don't know. |
| "Doubt slows us down" | Undetected doubt causes rework. Surface it early. |
| "Asking questions shows weakness" | Not asking questions ships broken decisions. |
| "We'll figure it out if it breaks" | Fixing broken decisions costs 10x more than getting them right. |
