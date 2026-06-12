# Adapters

Tool-specific configurations and instructions for using the AI Master Folder with different AI coding assistants.

> **Status: OpenCode is the only functional adapter.** The Cursor adapter is **roadmap** —
> a documented, manual conversion snippet that is not yet wired into the deploy flow or
> tested end-to-end. See the `cross-agent-porting` skill for the intended porting model.

| Adapter | Tool | Config Format | Status |
|---------|------|---------------|--------|
| `opencode/` | OpenCode | `opencode.json` + `SKILL.md` | ✅ Functional — use `scripts/Deploy-OpenCode.ps1` |
| `cursor/` | Cursor | `.cursor/rules/*.mdc` | 🚧 Roadmap — manual snippet, not yet wired/tested |

## Usage

Each adapter subdirectory contains a README with setup instructions for that tool.

## Adding a New Adapter

1. Create `adapters/<tool-name>/`
2. Add a README explaining the mapping
3. Add any conversion scripts if needed
4. Update this file
