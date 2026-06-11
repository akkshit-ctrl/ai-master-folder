---
name: prompt-optimizer
description: "Analyze and improve prompts for clarity, specificity, token efficiency, and expected output quality."
version: 1.0.0
license: MIT
compatibility:
  - opencode: ">=1.0.0"
metadata:
  author: "AI Master Folder"
  category: "meta"
  tags:
    - prompts
    - optimization
    - tokens
    - quality
allowed-tools:
  - read
  - edit
  - grep
---

# Prompt Optimizer

Analyze and improve prompts for better AI responses.

## Optimization Dimensions

### 1. Clarity
- Is the goal stated explicitly and unambiguously?
- Are there implicit assumptions that should be made explicit?
- Would a different phrasing reduce misinterpretation risk?

### 2. Specificity
- Are output format and constraints clearly specified?
- Are examples provided for complex requests?
- Are success criteria defined?

### 3. Token Efficiency
- Can redundant context be removed?
- Can verbose instructions be condensed without losing meaning?
- Are examples minimal but sufficient?

### 4. Structure
- Is the prompt organized from most to least important?
- Are instructions separated from context?
- Are constraints called out before creative sections?

## Optimization Checklist

- [ ] Goal stated in first sentence
- [ ] Output format specified (if relevant)
- [ ] Constraints listed separately
- [ ] Examples provided for complex tasks
- [ ] No contradictory instructions
- [ ] Minimal verbosity for the complexity level
- [ ] Edge cases or failure modes addressed

## Common Pitfalls
- Optimizing for token count at expense of clarity → ambiguous prompts waste more tokens
- Removing all examples → the model lacks guidance on output format
- Writing prompts from the model's perspective instead of your own → unnatural phrasing
- Not testing optimized prompts → the shorter version may be less effective

## Related
- See `strategic-compact` skill for context compression guidance
- See `context-engineering` skill for broader context management

## Rationalizations

| Excuse | Rebuttal |
|--------|----------|
| "The AI should understand what I mean" | Clear prompts get better results. Ambiguity is expensive. |
| "I don't have time to optimize prompts" | 2 minutes of optimization saves 10 minutes of iteration. |
| "Longer prompts are more thorough" | Longer is not better. Every token should earn its place. |
