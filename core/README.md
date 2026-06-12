# Core

Universal, tool-agnostic rules and instructions. These files are safe to use with any AI coding assistant (OpenCode, Claude Code, Cursor, Codex, etc.).

> **Status: pointer/index only.** This directory is a logical map, not a second copy — the
> real files live under `src/`. Cross-tool conversion (e.g. to Cursor) is **roadmap**, not
> an automated, tested pipeline yet.

## What's Here

This directory is a **logical grouping** — the actual source files live under `src/`:

| Area | Location | Purpose |
|------|----------|---------|
| Master prompt | `src/AGENTS.md` | System-wide directives for the AI agent |
| Rules | `src/rules/common/` | Security, coding, git, delegation rules |
| Instructions | `src/instructions/` | Reusable checklists (code review, security, launch) |
| Contexts | `src/contexts/` | Mode definitions (dev, research, review) |

## Portability

These files contain no tool-specific syntax. You can:
- Copy `src/AGENTS.md` to any project root for basic agent guidance
- Convert rules to `.cursor/rules/*.mdc` for Cursor (see `adapters/cursor/`)
- Use `src/instructions/` checklists in any tool
