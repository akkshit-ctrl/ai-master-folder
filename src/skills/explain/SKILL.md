---
name: explain
description: "Code explanation at multiple depths: brief overview, standard analysis, deep dive."
version: 1.0.0
license: MIT
compatibility:
  - opencode: ">=1.0.0"
metadata:
  author: "AI Master Folder"
  category: "development"
  tags:
    - explanation
    - learning
    - documentation
    - onboarding
allowed-tools:
  - read
  - glob
  - grep
---

# Explain

Explain code at configurable depth levels.

## Depth Levels

### Brief (1-2 sentences)
What the code does at a high level, its inputs and outputs. Suitable for quick understanding.

### Standard (paragraph + key details)
- Purpose and context
- Inputs, outputs, and types
- Key logic flow (2-3 sentences)
- Notable trade-offs or design decisions

### Deep (full analysis)
- **Purpose**: Why this code exists and what problem it solves
- **Context**: How it fits into the larger system
- **Flow**: Step-by-step execution walkthrough
- **Inputs/Outputs**: Full type signatures and contracts
- **Edge Cases**: What happens with invalid/empty/unexpected input
- **Dependencies**: What this code depends on and what depends on it
- **Design Notes**: Why certain approaches were chosen
- **Risks**: Potential issues or maintenance concerns

## Usage
```
/explain --target src/server.ts:42-67 --depth deep
/explain --target handleAuth --depth brief
/explain --target src/utils/parse.ts --depth standard
```

## Rationalizations

| Excuse | Rebuttal |
|--------|----------|
| "The code is self-explanatory" | What's obvious to you isn't obvious to others. |
| "I don't have time for deep explanations" | A brief explanation is better than none. |
