---
name: learn
description: "Extract patterns from current session and save as reusable knowledge."
agent: ""
subtask: false
---

# /learn

Extract repeated patterns from the current session and encode them as reusable skills or heuristics.

## Arguments

| Argument | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `--target` | string | no | session | `session`, `git-log`, `manual` |

Workflow:
1. Analyze the current session or git history for repeated patterns
2. Identify the trigger, steps, and tools used
3. Propose a new skill or rule for user approval
4. Scaffold the skill using the skill-create meta-skill

Examples:
```
/learn
/learn --target git-log
```
