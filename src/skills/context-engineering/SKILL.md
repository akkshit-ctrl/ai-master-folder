---
name: context-engineering
description: "Craft, prune, and structure AI context windows for maximum output quality. Use when assembling prompts or context, deciding what to include, or improving an agent's relevance."
license: MIT
compatibility: "opencode >=1.0.0"
metadata:
  version: 1.0.0
  author: "AI Master Folder"
  category: "workflow"
  tags:
    - context
    - prompt
    - quality
    - tokens
allowed-tools: read write edit bash glob grep
---

# Context Engineering

Structure the context window to maximize relevance and minimize noise. Every token competes for attention — make each one earn its place.

## Principles

### Top-Load Intent
Put the most important information first. The AI model's attention is strongest at the beginning and end of context.

### Progressive Disclosure
Start with the goal, then reveal details on demand. Don't dump everything at once.

### Signal vs. Noise Ratio
Every piece of context should either answer a question or constrain the output. If it does neither, remove it.

## Techniques

### 1. The Funnel
Start broad, narrow to specifics:
```
Goal: [one sentence]
Constraints: [3-5 boundaries]
Context: [relevant files, errors, history]
Request: [specific ask]
```

### 2. Context Budgets
Allocate tokens by importance:
```
- Goal & Constraints: 20%
- Relevant Code: 50%
- Error / Test Output: 20%
- Preferences & History: 10%
```

### 3. Pruning Heuristics
Before sending, remove:
- Files not referenced in the request
- Output from irrelevant commands
- Historical context from unrelated sessions
- Boilerplate that doesn't change (node_modules, build artifacts)

### 4. Anchoring
Reference prior decisions explicitly:
```
Based on [decision X from session Y], we chose approach Z.
```

## Anti-Patterns

- Dumping entire files when one function suffices
- Including stack traces without the relevant frames
- Repeating the same information in different formats
- Leaving stale context from previous tasks

## Rationalizations

| Excuse | Rebuttal |
|--------|----------|
| "More context is always better" | More context dilutes attention. Be surgical. |
| "I'll include the whole file just in case" | Include only what's relevant. The model can ask for more. |
| "Context engineering is for prompt engineers, not developers" | Every developer communicates with AI. Engineer it well. |
