# Adapters

Tool-specific configurations and instructions for using the AI Master Folder with different AI coding assistants.

| Adapter | Tool | Config Format | Status |
|---------|------|---------------|--------|
| `opencode/` | OpenCode | `opencode.json` + `SKILL.md` | Native — use deploy script |
| `cursor/` | Cursor | `.cursor/rules/*.mdc` | Generated from core rules |

## Usage

Each adapter subdirectory contains a README with setup instructions for that tool.

## Adding a New Adapter

1. Create `adapters/<tool-name>/`
2. Add a README explaining the mapping
3. Add any conversion scripts if needed
4. Update this file
