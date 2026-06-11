---
name: skill-create
description: "Bootstrap a new skill directory with proper structure and frontmatter."
agent: ""
subtask: false
---

# /skill-create

Create a new skill with the correct directory structure and frontmatter template.

## Arguments

| Argument | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `--name` | string | yes | - | Skill name in kebab-case |
| `--category` | string | no | development | `development`, `workflow`, `testing`, `content`, `security`, `meta` |

Examples:
```
/skill-create --name my-new-skill
/skill-create --name api-testing --category testing
```

See the `skill-create` skill for detailed guidance on writing skill content.
