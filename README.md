# AI Master Folder

Welcome to your **AI Operating System**. This repository acts as the canonical source of truth for your AI coding assistant configurations, optimized for OpenCode, designed for broad portability across any AI coding agent.

> **Status & portability (v0.5.0).** OpenCode is the fully **functional** target — skills,
> agents, commands, tools, the lifecycle plugin, and MCP servers all load and work
> (verified against OpenCode 1.17.3). Skill metadata follows the
> [Agent Skills standard](https://agentskills.io/specification), so the same `SKILL.md`
> files port cleanly to Claude Code; Cursor needs conversion. The `adapters/` for Claude
> Code and Cursor remain **documented roadmap**. Custom tools/plugin are OpenCode-specific
> (`@opencode-ai/plugin`). See `tests/Verify-Runtime.md` to re-verify on your machine.

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
| `full` | Everything: all 49 skills, 17 agents, 20 commands, 6 tools, 7 MCP servers, lifecycle plugin. |

## How deployment maps to OpenCode

`Deploy-OpenCode.ps1` compiles a profile into the exact shapes OpenCode loads:

| Source (`src/`) | Deployed (`.opencode/`) | How OpenCode uses it |
|---|---|---|
| `skills/<n>/SKILL.md` | `skills/<n>/SKILL.md` | auto-discovered skill |
| `agents/<n>/AGENT.md` | `agents/<n>/AGENT.md` | auto-discovered subagent |
| `commands/<n>/COMMAND.md` | `commands/<n>/COMMAND.md` | auto-discovered slash command |
| `tools/<n>/index.ts` | `tools/<n>.ts` | custom tool (`@opencode-ai/plugin`, loaded as `.ts`) |
| `plugins/<n>.ts` | `plugins/<n>.ts` | lifecycle hooks (auto-loaded plugin) |
| `mcp/<n>/mcp.json` | wired into `opencode.json` `mcp` key | MCP server |
| `rules/common/*` + profile `instructions` | injected into `AGENTS.md` | project rules |

Custom tools and the plugin are TypeScript and load directly — no build step. **[bun](https://bun.sh)
must be installed** for the lifecycle plugin: OpenCode loads plugins via bun, and without it
`opencode` stalls on startup. If you don't want the plugin, deploy a profile with no `plugins` key.

## Structure

```
ai_master_folder/
├── opencode.json          # Minimal valid OpenCode config (repo opens cleanly)
├── core/                  # Pointer/index to universal rules (roadmap)
├── adapters/              # Tool-specific configs (opencode functional; cursor roadmap)
├── src/
│   ├── AGENTS.md          # Master system prompt (rules + instructions inject at deploy)
│   ├── agents/            # Subagent definitions (17 agents)
│   ├── commands/          # Slash command definitions (20 commands)
│   ├── skills/            # Skill definitions (49 skills)
│   ├── tools/             # Custom TypeScript tools (6 tools)
│   ├── plugins/           # Native OpenCode lifecycle-hook plugin
│   ├── mcp/               # MCP server configurations (7 servers)
│   ├── instructions/      # Injectable checklist snippets
│   └── rules/             # Universal rules (injected into AGENTS.md at deploy)
├── profiles/              # Deployment profiles: full.json, lean.json
├── scripts/               # Deploy-OpenCode.ps1, Generate-Guide.ps1
├── tests/                 # Invoke-StructureCheck.ps1 + Verify-Runtime.md
├── docs/                  # GUIDE.md (auto-generated usage reference), CONTRIBUTING.md
├── .githooks/             # pre-commit hook that keeps GUIDE.md current
└── templates/             # Scaffolding templates for new items
```

## Adding New Content

See `docs/CONTRIBUTING.md` for naming conventions. Use templates from `templates/` to scaffold new agents, commands, skills, instructions, or profiles.

**`docs/GUIDE.md` is auto-generated** from `src/` by `scripts/Generate-Guide.ps1`. A git
pre-commit hook regenerates it on every commit so it never goes stale — enable it once per
clone with `git config core.hooksPath .githooks`. CI also fails if the guide is out of date.

### Importing a skill (from a folder or git repo)
One command copies it into `src/`, registers it in `profiles/full.json`, and validates:
```powershell
.\scripts\Import-Skill.ps1 -Path "C:\path\to\skill"
.\scripts\Import-Skill.ps1 -GitUrl "https://github.com/user/repo" -SubPath "skills/cool-skill"
```
Then commit + redeploy (steps 3-4 below). The harness derives its skill list from disk, so
nothing else needs editing.

### The update loop (after changing anything in `src/`)
1. Edit/add in `src/` (for skills, `Import-Skill.ps1` does this + registration for you).
2. `.\tests\Invoke-StructureCheck.ps1` → must pass.
3. `git commit` (the hook refreshes `docs/GUIDE.md` automatically) and `git push`.
4. `.\scripts\Deploy-OpenCode.ps1 -ProfileName full -Global -Execute`, then restart OpenCode.

## Running Validation

```powershell
.\tests\Invoke-StructureCheck.ps1
```
