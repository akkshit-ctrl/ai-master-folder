# AI Master Folder

Welcome to your **AI Operating System**. This repository acts as the canonical source of truth for your AI coding assistant configurations, optimized for OpenCode, designed for broad portability across any AI coding agent.

> **Status & portability (v0.4.0).** OpenCode is the only **functional** deployment target
> today (`Deploy-OpenCode.ps1` → `.opencode`). Skill metadata follows the
> [Agent Skills standard](https://agentskills.io/specification), so the same `SKILL.md`
> files are designed to port cleanly to Claude Code and Cursor — but the `adapters/` for
> those tools are **documented roadmap, not yet functional**. Custom `src/tools/` are
> OpenCode-specific (`@opencode-ai/plugin`). Treat the cross-agent vision as the direction,
> and OpenCode as what works now.

## Philosophy

- **Registry Layer:** `src/` contains your complete inventory of agents, skills, tools, commands, hooks, MCP servers, plugins, instructions, rules, and context modes. Edit these files as the source of truth.
- **Package Layer:** `profiles/` groups items into deployable packages: `full` (everything enabled) or `lean` (minimal, low-token, high-signal).
- **Deployment Layer:** `scripts/Deploy-OpenCode.ps1` compiles a profile into a target `.opencode` directory. Dry-run by default; pass `-Execute` to write.

## Quick Start

```powershell
# Preview what a profile would deploy (no files written)
.\scripts\Deploy-OpenCode.ps1 -ProfileName full -Preview

# Deploy globally to ~/.config/opencode (defaults to "full" profile)
.\scripts\Deploy-OpenCode.ps1 -Global -Execute

# Deploy to a specific project
.\scripts\Deploy-OpenCode.ps1 -ProfileName lean -TargetPath "C:\Path\To\Project" -Execute
```

## Profiles

| Profile | Description |
|---------|-------------|
| `lean` | Minimal essentials: core skills, 7 agents, 7 commands. Low token overhead. |
| `full` | Everything: all 44 skills, 17 agents, 20 commands, 6 tools, 7 MCP servers. |

## Tool Building

Custom TypeScript tools in `src/tools/` use `@opencode-ai/plugin` and Zod schemas. The deploy script auto-builds them with `bun build --target=node` if bun is available. To build manually:

```powershell
bun build --target=node --outdir=. src/tools/<name>/index.ts
```

## Structure

```
ai_master_folder/
├── opencode.json          # Discovery config for OpenCode
├── core/                  # Universal, tool-agnostic rules & instructions
├── adapters/              # Tool-specific configs (opencode, cursor, ...)
├── src/
│   ├── AGENTS.md          # Master system prompt (source of truth)
│   ├── agents/            # Subagent definitions (17 agents)
│   ├── commands/          # Slash command definitions (20 commands)
│   ├── skills/            # Skill definitions (44 skills)
│   ├── tools/             # Custom TypeScript tools (6 tools)
│   ├── hooks/             # Lifecycle hook scripts + hooks.json
│   ├── mcp/               # MCP server configurations (7 servers)
│   ├── instructions/      # Injectable checklist snippets
│   ├── rules/             # Rule files (defense, security, coding, git)
│   └── contexts/          # Context modes: dev, research, review
├── profiles/              # Deployment profiles: full.json, lean.json
├── scripts/               # Deploy-OpenCode.ps1
├── tests/                 # Invoke-StructureCheck.ps1 validation
└── templates/             # Scaffolding templates for new items
```

## Adding New Content

See `docs/CONTRIBUTING.md` for naming conventions. Use templates from `templates/` to scaffold new agents, commands, skills, instructions, or profiles.

## Running Validation

```powershell
.\tests\Invoke-StructureCheck.ps1
```
