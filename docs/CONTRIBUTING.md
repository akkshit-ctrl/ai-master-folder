# Contribution Guidelines

To maintain order as this "AI OS" grows, follow these rules when adding new items.

## 1. Naming Conventions
- **Profiles:** `kebab-case.json` (e.g., `data-science.json`, `web-dev.json`)
- **Skills:** `kebab-case` folder name. Must contain a `SKILL.md` (all caps).
- **Agents:** `kebab-case` folder or `.md` file depending on complexity.
- **Commands:** `kebab-case.md` for workflow slash commands.

## 2. Adding Third-Party Content
- Currently, custom and imported content live side-by-side in `src/`.
- **Requirement:** Any imported skill/agent *must* include a YAML frontmatter or inline comment denoting its `source_url`, `version`, and `trust_level`.

Example for an imported SKILL.md:
```markdown
---
name: imported-skill
source_url: https://github.com/example/repo
trust_level: reviewed
---
```

## 3. Creating New Items
Always use the `templates/` directory to start a new item. Copy the template into `src/` to ensure you maintain standard structures.