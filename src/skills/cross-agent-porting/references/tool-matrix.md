# Tool Compatibility Matrix

Loaded on demand by the `cross-agent-porting` skill. Verified against tool docs as of
2026-06 — re-check before relying on a row, since these tools move fast. Mark anything you
haven't re-confirmed `[UA]`.

## Discovery paths

| Tool | Skills read from | Config file | Instruction file |
|---|---|---|---|
| OpenCode | `.opencode/skills/`, `.claude/skills/`, `.agents/skills/` (+ global `~/.config/opencode`, `~/.claude`, `~/.agents`) | `opencode.json` | `AGENTS.md` (wins over `CLAUDE.md`) |
| Claude Code | `.claude/skills/` (+ `~/.claude/skills/`) | `.claude/settings.json` | `CLAUDE.md` |
| Cursor | does not read SKILL.md | `.cursor/rules/*.mdc` (Cursor 2.2+: rule folders with `RULE.md`) | `AGENTS.md` / legacy `.cursorrules` |

Because OpenCode also reads `.claude/skills/`, a Claude Code skill layout is largely a
drop-in for OpenCode.

## Frontmatter portability of SKILL.md

| Field | Portable? | Notes |
|---|---|---|
| `name`, `description` | ✅ all SKILL.md tools | required everywhere; must match dir name |
| `metadata.*` | ✅ | arbitrary string map; tolerated |
| `compatibility`, `license` | ✅ | strings |
| `allowed-tools` | ⚠️ | experimental; honored by some tools, ignored by others |
| `disable-model-invocation` and other Claude-only keys | ❌ | Claude Code only |

## Cursor rule modes (for skill → rule conversion)

| Mode | Set via | Behavior |
|---|---|---|
| Always | `alwaysApply: true` | injected into every request — keep small |
| Auto-Attached | `globs: [...]` | applies when editing matching files |
| Agent-Requested | `description` only | model decides when to pull it in |
| Manual | neither | only via `@rule-name` |

## Hooks / plugins / tools

| Concept | OpenCode | Claude Code | Cursor |
|---|---|---|---|
| Lifecycle automation | "plugins" via `@opencode-ai/plugin` (async fn → tools + hooks) | "hooks" in `settings.json` (event + matcher) | none |
| Custom tool | `@opencode-ai/plugin` TS tool | MCP server | MCP server |
| Subagent | `AGENT.md` | `.claude/agents/*.md` | none first-class |

## Practical port recipes

- **OpenCode ↔ Claude Code skill:** copy the folder; both read `.claude/skills/`. Strip any
  Claude-only frontmatter when targeting OpenCode. Hooks must be re-expressed
  (`@opencode-ai/plugin` ⇄ `settings.json` events).
- **Any skill → Cursor:** convert to `.mdc` (see SKILL.md recipe); inline content; pick a
  rule mode; you lose progressive disclosure and lifecycle hooks.
- **Custom tool → Cursor/Claude:** rewrite as an MCP server — the `@opencode-ai/plugin` tools
  in `src/tools/` are OpenCode-only.
