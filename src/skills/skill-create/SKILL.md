---
name: skill-create
description: "Meta-skill for bootstrapping new skills from observed patterns, git history, or user descriptions. Use when creating a new skill or scaffolding skill structure and frontmatter."
aliases:
  - skill-creator
license: MIT
compatibility: "opencode >=1.0.0"
metadata:
  version: 1.0.0
  author: "AI Master Folder"
  category: "meta"
  tags:
    - skill-creation
    - meta
    - bootstrapping
    - scaffolding
allowed-tools: read write edit bash glob grep
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

Keep `SKILL.md` small and load detail on demand (progressive disclosure). Supporting
directories are **optional** — add them only when content would otherwise bloat `SKILL.md`:

```
src/skills/<skill-name>/
├── SKILL.md        # Required: skill definition (keep under ~500 lines)
├── references/     # Optional: long reference prose, loaded only when needed
├── scripts/        # Optional: helper scripts the skill runs
└── assets/         # Optional: templates/fixtures the skill copies
```

### Step 3: Write Frontmatter

Follow the [Agent Skills spec](https://agentskills.io/specification): only `name` and
`description` are required; `version` is nested under `metadata`; `compatibility` and
`allowed-tools` are **strings**, not lists.

```yaml
---
name: <kebab-case-name>          # must equal the directory name
description: "What it does AND when to use it — include trigger keywords for discovery."
license: MIT
compatibility: "opencode >=1.0.0"
allowed-tools: read edit bash    # space-separated, not a list
metadata:
  version: 1.0.0
  author: "AI Master Folder"
  category: "development|workflow|testing|content|security|meta"
  tags:
    - <tag1>
    - <tag2>
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
- [ ] `version` is nested under `metadata` (not a top-level field)
- [ ] `compatibility` and `allowed-tools` are strings, not YAML lists
- [ ] Description says what it does AND when to use it, with trigger keywords (≤1024 chars)
- [ ] Tags are lowercase, kebab-case
- [ ] `SKILL.md` stays focused; long prose/scripts moved to `references/`/`scripts/`
- [ ] Passes `tests/Invoke-StructureCheck.ps1` (and `skills-ref validate` if installed)

## Rationalizations

| Excuse | Rebuttal |
|--------|----------|
| "I'll create the skill without frontmatter" | Frontmatter is required for auto-discovery. Always include it. |
| "This workflow is too specific to be a skill" | If you've done it twice, it's a candidate for a skill. |
| "I'll add tests later" | Scaffold the skill properly now. Later means never. |

## Note

This skill replaces the former `skill-creator` — all functionality consolidated here.
