---
name: strategic-compact
description: "Manual context compaction guidance: summarize, archive, and prune to manage token budgets."
version: 1.0.0
license: MIT
compatibility:
  - opencode: ">=1.0.0"
metadata:
  author: "AI Master Folder"
  category: "workflow"
  tags:
    - compaction
    - context
    - tokens
    - efficiency
allowed-tools:
  - read
---

# Strategic Compact

Guidance for manual context compaction when context limits are approaching.

## Compaction Strategies

### Strategy 1: Summarize Completed Work
Replace verbose tool outputs and discussion threads with a one-line summary:
```
✓ Implemented user authentication middleware (3 files modified)
```

### Strategy 2: Archive Reference Content
Content that can be compacted:
- Long error messages that have been resolved
- Verbose test output from passing test runs
- Documentation excerpts that were read and understood
- Completed code review comments

### Strategy 3: Prune Irrelevant Branches
- Remove discussions about approaches that were rejected
- Remove file contents that were read but not used
- Remove tool results from exploratory searches

### Strategy 4: Consolidate Repetitive Patterns
If you've done a read-edit-test cycle 5 times, the last 4 cycles' output is probably not needed.

## When to Compact
- After completing a major subtask
- When context is >70% full
- Before starting a complex new task
- When the system suggests compaction
- At natural breakpoints (test cycles completed)

## What NOT to Compact
- Active task requirements and constraints
- Current implementation plan
- Relevant error messages that haven't been resolved
- User-provided context and preferences
- Security-related findings

## Rationalizations

| Excuse | Rebuttal |
|--------|----------|
| "I'll compact when I run out of space" | Compact proactively to maintain output quality. |
| "Everything in context is important" | If everything is important, nothing is. Prune aggressively. |
| "Summarizing takes too much effort" | A one-line summary replaces 50 lines of verbose output. |
