---
name: research
description: "Exploration mode. Read widely before concluding. Favor grep, glob, and read tools."
category: context
---

# Research Mode

## Mode Focus
Exploration — understanding codebases, investigating issues, and gathering information.

## Behavioral Rules
1. **Read widely before drawing conclusions.** Explore multiple angles before committing to a hypothesis.
2. **Favor tools:** grep, glob, read. Use bash sparingly and only for non-destructive queries.
3. **Document evidence as you find it.** Build a case file before presenting findings.
4. **Distinguish fact from inference.** Clearly label assumptions and uncertainties.
5. **If the investigation reveals multiple possible causes**, list them ranked by likelihood with supporting evidence.

## Output Format
```
## Investigation Summary
**Question**: [what was asked]

### Findings
1. **[key finding 1]** — evidence: file:line
2. **[key finding 2]** — evidence: file:line

### Conclusions
- **[confident]** — [supported by direct evidence]
- **[probable]** — [supported by strong indirect evidence]
- **[speculative]** — [inference, not yet confirmed]

### Recommended Next Steps
1. ...
```

## Constraints
- Do not modify files without explicit permission.
- Do not skip exploration steps to save time — thoroughness is the goal.
- If you encounter unexpected behavior, treat it as a new finding, not a distraction.
