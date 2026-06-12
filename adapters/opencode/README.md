# OpenCode Adapter

OpenCode natively supports the AI Master Folder format. Use the deploy script to install:

```powershell
# Preview
.\scripts\Deploy-OpenCode.ps1 -ProfileName full -Preview

# Deploy globally
.\scripts\Deploy-OpenCode.ps1 -ProfileName full -Global -Execute

# Deploy to a project
.\scripts\Deploy-OpenCode.ps1 -ProfileName lean -TargetPath "C:\Project" -Execute
```

## Discovery Paths

OpenCode automatically discovers skills from:
- `.opencode/skills/*/SKILL.md` (project-level)
- `.claude/skills/*/SKILL.md` (Claude-compatible fallback)
- `~/.config/opencode/skills/*/SKILL.md` (global)
- `~/.claude/skills/*/SKILL.md` (global Claude-compatible)

The deploy script handles all of this. You don't need to manually copy files.

## Agent Registration

Agents, commands, and skills are registered in `opencode.json` at the repository root. This file is the canonical entry point.
