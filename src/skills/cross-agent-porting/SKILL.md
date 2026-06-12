---
name: cross-agent-porting
description: "Port a skill, command, agent, or rule between AI coding tools (OpenCode, Claude Code, Cursor): what is portable as-is, what needs an adapter, and how to convert SKILL.md, slash commands, subagents, and hooks. Use when targeting a second tool or asking 'will this work in Cursor/Claude Code?'."
license: MIT
compatibility: "opencode >=1.0.0; claude-code >=1.0.0"
allowed-tools: read write edit glob grep
metadata:
  version: 1.0.0
  author: "AI Master Folder"
  category: "meta"
  tags:
    - portability
    - adapters
    - skills
    - cursor
    - claude-code
---

# Cross-Agent Porting

How to take one canonical source (a `SKILL.md`, command, agent, or rule) and make it work
across OpenCode, Claude Code, and Cursor — keeping a single source of truth and converting
only the tool-specific edges. Full feature/format matrix: `references/tool-matrix.md`.

## When to Use
- You want the same skill to work in more than one tool.
- Someone asks "does this run in Cursor / Claude Code?"
- You're designing or extending an `adapters/` directory.

## Core Principle
**Author once to the open [Agent Skills spec](https://agentskills.io/specification); adapt at
the edges.** A spec-compliant `SKILL.md` (required `name` + `description`, `version` under
`metadata`, string `compatibility`/`allowed-tools`) ports to OpenCode and Claude Code with
near-zero changes. Cursor is the outlier — it does not read `SKILL.md` at all.

## Portability Cheat-Sheet

| Artifact | OpenCode | Claude Code | Cursor |
|---|---|---|---|
| `SKILL.md` | native (`.opencode/`, `.claude/`, `.agents/skills/`) | native (`.claude/skills/`) | ✗ — convert to a `.mdc` rule |
| Slash command (markdown) | native | native (commands ≈ skills) | ✗ — fold into a rule or `AGENTS.md` |
| Subagent (`AGENT.md`) | native | `.claude/agents/*.md` | no first-class subagents |
| Hook / "plugin" | OpenCode calls hooks **plugins** (`@opencode-ai/plugin`) | `.claude/settings.json` events | no lifecycle hooks |
| Custom tool | `@opencode-ai/plugin` TS | MCP server / different API | MCP only |

> Terminology trap: OpenCode "plugins" == Claude Code "hooks". Don't confuse either with the
> old OpenCode OAuth plugins this repo removed in v0.3.0.

## Converting a Skill → Cursor Rule
Cursor rules live in `.cursor/rules/*.mdc` (markdown + frontmatter). Map it:
1. `description` → `description` (drives Agent-Requested rules).
2. Add `globs: ["**/*.ts"]` for file-scoped rules, or `alwaysApply: true` for always-on.
3. Inline the body — Cursor has **no** progressive file-loading, so `references/`/`scripts/`
   won't be pulled in; keep always-on rules small to protect the context budget.
4. Drop tool-specific frontmatter (`allowed-tools`, `compatibility`).

```yaml
---
description: "Systematic code review covering correctness, security, performance."
globs: ["**/*.ts", "**/*.tsx"]
alwaysApply: false
---
(skill body here)
```

## Verification (always)
Porting is not done until you've **run it in the target tool**: deploy/copy, then confirm the
artifact is discovered and triggers (use the sentinel method in `tests/Verify-Runtime.md`).
Mark unconfirmed ports `[UA]`, not "supported".

## Rationalizations

| Excuse | Rebuttal |
|--------|----------|
| "It's all markdown, it'll just work" | Cursor ignores `SKILL.md`; hooks/tools are tool-specific. Check the matrix. |
| "I'll keep a separate copy per tool" | Drift guaranteed. One source + adapters; convert, don't fork. |
| "It loaded, so it's ported" | Loading ≠ triggering. Verify discovery and behavior in the target tool. |

## Related Skills
- `evidence-based-audit` — verify a port instead of assuming it.
- `skill-create` — author the canonical, spec-compliant source you port from.
- `mcp-builder` — the portable path for tools that must cross the Cursor/Claude boundary.
