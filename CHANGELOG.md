# Changelog

## [0.3.0] - Portability, Hardening & Polish

- **Model-agnostic**: Removed all 12 hardcoded `claude-sonnet-4-20250514` and `claude-opus-4-20250514` model references from commands and template
- **OAuth plugins removed**: Deleted all 6 stub OAuth plugins (antigravity-auth, gemini-auth, kilo-gateway-auth, omniroute-auth, openai-codex-auth, openhax-codex)
- **Default profile**: Changed deploy default from `lean` to `full`
- **Version bump**: VERSION, opencode.json, and CHANGELOG synced to 0.3.0
- **Branch detection**: Tools now respect `GIT_DEFAULT_BRANCH` env var; no longer hardcode `main`
- **`.gitignore` expanded**: Added `node_modules/`, `__pycache__/`, `.venv/`, `.vscode/`, `.idea/`, `*.log`, `Thumbs.db`, `dist/`, `.next/`, `*.tsbuildinfo`
- **Hook fixes**: `post-edit-validate` now blocks (exit 2) on failure, timeout 30s→60s; `session-end-save` version updated; `hooks.json` schema URL generic
- **`token-budget-advisor`**: Model-specific names replaced with generic tiers (Flash/Sonnet/Opus-class)
- **Skills expanded**: Added Common Pitfalls sections to 10 skills (artifact-builder, content-writing, document-processing, explain, iterative-retrieval, mcp-builder, prompt-optimizer, search-first, strategic-compact, token-budget-advisor)
- **Tool framework detection**: run-tests now detects Mocha, Cypress, Playwright, Ava, Go Test, Cargo Test; lint-check detects golangci-lint, Clippy; format-code detects gofmt, rustfmt; check-coverage detects Go, Cargo Tarpaulin, NYC
- **Model field convention**: Standardized — `model` field removed from commands with no agent delegation
- **Documentation**: README updated to reflect `full` default, removed plugin references, generic Claude Code mention
- **Tests updated**: Removed plugin checks (12), now 210/210 passing

## [0.2.0] - Restructure, Consolidate & Harden

- **Profiles**: Replaced base.json/web-dev.json with full.json (everything) and lean.json (minimal)
- **Missing files**: Created 7 agent AGENT.md files (architect, build-error-resolver, comparator, grader, performance-optimizer, refactor-cleaner, security-reviewer)
- **Missing files**: Created 7 skill SKILL.md files (architecture-decision-records, artifact-builder, error-handling, mcp-builder, prompt-optimizer, token-budget-advisor)
- **Missing files**: Created 5 command COMMAND.md files (checkpoint, refactor-cmd, security-scan, sessions, skill-create)
- **Consolidation**: Merged skill-creator into skill-create; removed duplicate ADR content across documentation-and-adrs and architecture-decision-records
- **Empty scaffolding**: Removed 36 empty scripts/ directories from skills
- **Empty directories**: Removed empty architect command dir and skill-creator directory
- **Discovery**: Created root opencode.json exposing all agents, commands, and skills
- **Deployment**: Hardened Deploy-OpenCode.ps1 with dry-run default, backup, and verification
- **Testing**: Created Invoke-StructureCheck.ps1 with 222 validation checks
- **Documentation**: Updated README, AGENTS.md, and CHANGELOG
- **Safety**: Created zip backup before changes; git init with first commit as rollback point

## [0.1.0] - Initial Release

- Scaffolded core architecture and canonical registry (`src/`).
- Added deployment profiles (`profiles/`).
- Implemented `Deploy-OpenCode.ps1` for copy-based deployment with preview mode.
- Created `AGENTS.md` light-templating system.
- Added foundational templates and documentation.
