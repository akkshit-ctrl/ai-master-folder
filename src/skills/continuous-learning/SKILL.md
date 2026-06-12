---
name: continuous-learning
description: "Session-to-skill evolution pipeline: extract patterns, build instincts, evolve into reusable skills. Use when capturing a repeated workflow as a skill or turning session learnings into reusable guidance."
license: MIT
compatibility: "opencode >=1.0.0"
metadata:
  version: 1.0.0
  author: "AI Master Folder"
  category: "meta"
  tags:
    - learning
    - evolution
    - patterns
    - instincts
allowed-tools: read write edit grep glob
---

# Continuous Learning

Extract repeated patterns from session activity and evolve them into reusable skills, rules, or heuristics.

## Learning Pipeline

### Phase 1: Observe (Session-Level)
During each session, hooks capture:
- Repeated tool use patterns (e.g., same 3 commands every time you debug)
- Common fixes applied to similar issues
- Project-specific conventions discovered
- Workflows that required multiple corrections

### Phase 2: Extract (via /learn)
Run `/learn` to analyze the current session or git history:
1. Identify patterns that appeared 2+ times
2. Extract the trigger, steps, tools, and expected outcome
3. Propose a new skill or rule
4. Get user approval before creating

### Phase 3: Scaffold (via skill-create)
Once a pattern is approved:
1. Generate the SKILL.md with frontmatter
2. Create the skill directory structure
3. Add usage examples from real session data
4. Register in the active profile

### Phase 4: Evolve (via /evolve)
Periodically review accumulated patterns:
1. Cluster related observations into skill candidates
2. Assess confidence (frequency × consistency × user approval)
3. Promote high-confidence patterns to skills
4. Archive low-confidence or superseded patterns

## Storage
Observations are stored in:
```
~/.opencode/learn/
├── observations/       # Raw session observations (JSONL)
├── instincts/          # Extracted patterns with confidence scores
├── evolved/            # Promoted skills, agents, commands
└── archive/            # Superseded patterns
```

## Confidence Scoring
| Score | Meaning | Action |
|-------|---------|--------|
| 0.0-0.3 | Tentative | Flag for review |
| 0.3-0.6 | Plausible | Suggest when relevant |
| 0.6-0.8 | Reliable | Auto-apply with notification |
| 0.8-1.0 | Established | Bake into defaults |

## Rationalizations

| Excuse | Rebuttal |
|--------|----------|
| "I'll extract patterns next time" | Extract patterns while they're fresh. Memory fades fast. |
| "This pattern is too specific to generalize" | Even specific patterns contain reusable insights. |
| "I don't have enough data yet" | Start with what you have. Patterns accumulate over time. |
