---
name: evolve
description: "Cluster observations into reusable skill patterns."
agent: ""
subtask: false
---

# /evolve

Analyze accumulated observations and evolve them into skills, rules, or heuristics.

## Arguments

| Argument | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `--min-confidence` | number | no | 0.3 | Minimum confidence threshold (0-1) |
| `--source` | string | no | all | `observations`, `instincts`, `git-log`, `all` |

Workflow:
1. Scan the learning store for patterns meeting the confidence threshold
2. Group related observations into clusters
3. For each cluster, propose a skill or rule candidate
4. Show the evidence (frequency, trigger, steps) for each candidate
5. On user approval, scaffold the new skill

Examples:
```
/evolve
/evolve --min-confidence 0.5
/evolve --source git-log
```
