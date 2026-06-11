---
name: token-budget-advisor
description: "Advises on token usage, context limits, and strategies for staying within budget."
version: 1.0.0
license: MIT
compatibility:
  - opencode: ">=1.0.0"
metadata:
  author: "AI Master Folder"
  category: "workflow"
  tags:
    - tokens
    - context
    - budget
    - efficiency
allowed-tools:
  - read
---

# Token Budget Advisor

Advises on token consumption and strategies for staying within model context limits.

## Context Sizing by Model

| Model Class | Typical Limit | Strategy |
|---|---|---|
| Flash-class models | ~128K tokens | Keep active context under 80K for headroom |
| Sonnet-class models | ~200K tokens | Generous but still budget-conscious |
| Opus-class models | ~128K-200K | Use full context but prioritize relevance |

## Token Budget Rules of Thumb

- **System prompts / instructions**: 2K-5K tokens (keep lean)
- **Skill files**: 0.5K-2K tokens each (load only relevant ones)
- **Agent definitions**: 0.3K-1K tokens each
- **Code context per file**: 0.1K-1K tokens (summarize when >20 files)
- **Tool outputs**: truncate or summarize verbose output

## Compression Strategies

1. **Summarize completed work** — replace verbose diffs with one-line summaries
2. **Remove resolved discussions** — prune conversation threads after resolution
3. **Prefer references over inline content** — "see config.ts:42" instead of pasting the config
4. **Use the strategic-compact skill** for manual context compaction
5. **Monitor the pre-compact-warning hook** at 75% and 90% thresholds

## When to Take Action

- Context >70% full → start compaction planning
- Context >85% full → compact immediately
- Before starting a complex new task → compact proactively
- After each major milestone → compact as part of the workflow

## Rationalizations

| Excuse | Rebuttal |
|--------|----------|
| "I have plenty of context left" | Running near the limit degrades output quality. Stay under 70%. |
| "Compacting loses information" | Smart compaction keeps requirements and decisions, removes verbose noise. |
| "My model has a huge context window" | Larger windows mean more noise-to-signal risk. Be disciplined. |
