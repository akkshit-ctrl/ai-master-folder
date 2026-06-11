---
name: skill-create
description: "Meta-skill for bootstrapping new skills from observed patterns, git history, or user descriptions."
aliases:
  - skill-creator
version: 1.0.0
license: MIT
compatibility:
  - opencode: ">=1.0.0"
metadata:
  author: "AI Master Folder"
  category: "meta"
  tags:
    - skill-creation
    - meta
    - bootstrapping
    - scaffolding
allowed-tools:
  - read
  - write
  - edit
  - bash
  - glob
  - grep
---

# Skill Create

Meta-skill for creating new skills programmatically.

## When to Use
- You've identified a repeated workflow pattern that should be encoded as a skill
- You want to extract a skill from git history or session observations
- You need to scaffold a new skill with correct structure and frontmatter

## Skill Creation Process

### Step 1: Analyze the Pattern
- What triggers this skill? (specific commands, problems, contexts)
- What are the inputs and outputs?
- What tools does the skill need?
- What are the key steps?

### Step 2: Scaffold the Structure
```
src/skills/<skill-name>/
├── SKILL.md        # Required: skill definition
├── scripts/        # Required: helper scripts (can be empty)
└── references/     # Optional: reference docs
```

### Step 3: Write Frontmatter
```yaml
---
name: <kebab-case-name>
description: "One-sentence description of purpose."
version: 1.0.0
license: MIT
compatibility:
  - opencode: ">=1.0.0"
metadata:
  author: "AI Master Folder"
  category: "development|workflow|testing|content|security|meta"
  tags:
    - <tag1>
    - <tag2>
allowed-tools:
  - <tool1>
  - <tool2>
---
```

### Step 4: Write the Body
- **Title**: Human-readable name
- **Overview**: What this skill does and when to activate
- **Steps**: Clear, ordered instructions
- **Examples**: Concrete usage examples
- **Anti-Patterns**: What NOT to do
- **Related Skills**: Cross-references

## Validation Checklist
- [ ] Name matches kebab-case, ≤64 chars
- [ ] Directory name matches `name` field
- [ ] Has `scripts/` directory
- [ ] All `allowed-tools` are valid tool names
- [ ] Description is under 120 characters
- [ ] Tags are lowercase, kebab-case

## Rationalizations

| Excuse | Rebuttal |
|--------|----------|
| "I'll create the skill without frontmatter" | Frontmatter is required for auto-discovery. Always include it. |
| "This workflow is too specific to be a skill" | If you've done it twice, it's a candidate for a skill. |
| "I'll add tests later" | Scaffold the skill properly now. Later means never. |

## Note

This skill replaces the former `skill-creator` — all functionality consolidated here.
