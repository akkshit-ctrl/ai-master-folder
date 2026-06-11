# Changelog

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
