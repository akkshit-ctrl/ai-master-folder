---
name: plan
description: "Implementation planning: requirements decomposition, task breakdown, estimation. Use when breaking down a feature or task before coding, or asked for a plan."
license: MIT
compatibility: "opencode >=1.0.0"
metadata:
  version: 1.0.0
  author: "AI Master Folder"
  category: "workflow"
  tags:
    - planning
    - architecture
    - decomposition
    - estimation
allowed-tools: read glob grep
---

# Plan

Create structured implementation plans from requirements or problem descriptions.

## Planning Process

### Phase 1: Requirements Analysis
- Identify core requirements and acceptance criteria
- Surface ambiguous or missing requirements
- Identify constraints (time, technology, compatibility)
- Document assumptions

### Phase 2: Decomposition
Break the work into independent, ordered steps:

1. **Foundation** — Setup, configuration, scaffolding
2. **Core Logic** — The primary algorithm or flow
3. **Integration** — Connecting to existing systems
4. **Verification** — Tests, validation, edge cases
5. **Polish** — Documentation, cleanup, optimization

### Phase 3: Each Task
For each task, specify:
- **What**: Description of the change
- **Files**: Files to create or modify
- **Dependencies**: Tasks that must precede this one
- **Risk**: Low / Medium / High
- **Effort**: Small (<1hr) / Medium (1-4hr) / Large (4hr+)

### Phase 4: Risk Assessment
- Identify integration points with highest risk
- Flag decisions that are hard to reverse
- Suggest validation checkpoints

## Output Format
```
## Implementation Plan

### Summary
[Brief one-paragraph overview of the approach]

### Steps
1. **Step name** (effort, risk)
   - What: ...
   - Files: ...
   - Depends on: ...
2. ...

### Risks
- [risk] — [mitigation]

### Checkpoints
- [x] After step 2: verify with [test/check]
```

## Rationalizations

| Excuse | Rebuttal |
|--------|----------|
| "I'll figure it out as I go" | Planning reduces rework by 10x. Invest the 5 minutes. |
| "The task is too simple for a plan" | Even simple plans catch hidden dependencies. |
| "Plans go out of date immediately" | A dated plan is still better than no plan. |
