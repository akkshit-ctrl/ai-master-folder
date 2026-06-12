# Changelog

## [0.5.1] - New Skills

- **3 new skills** (46 → 49), spec-compliant with progressive-disclosure `references/`:
  - `react-best-practices` — React/Next.js performance patterns (Vercel Engineering).
  - `subagent-orchestration` — parallel fan-out + subagent-driven task execution (superpowers).
  - `ui-ux-pro-max` — UI/UX design intelligence (styles, palettes, font pairings, components).
- Refreshed several existing skills (code-review, debugging, plan, skill-create, tdd-workflow).
- Registered in `profiles/full.json` and the validation harness (363/363 passing).

## [0.5.0] - Make It Actually Work in OpenCode

Verified the deployed system against real OpenCode 1.17.3 and fixed everything that did not
actually load. Before this release, only skills/agents/commands/AGENTS.md worked; MCP, tools,
and hooks were inert.

- **Root `opencode.json` is now valid.** The old registry shape (`name`/`agents`/`commands`/
  `skills` keys) was rejected by OpenCode (`Unrecognized keys`), breaking `opencode` inside the
  repo. Replaced with a minimal valid config; the registry of record is `profiles/full.json`.
- **MCP servers now load.** Deploy converts each `src/mcp/<n>/mcp.json` into the `mcp` key of a
  generated `.opencode/opencode.json` (the only place OpenCode reads MCP). Previously the
  `.opencode/mcp/` files were ignored.
- **MCP package names corrected.** `@anthropic/mcp-playwright`, `@anthropic/mcp-supabase`, and
  `@context7/mcp-server` were 404 placeholders; replaced with the real published packages
  (`@playwright/mcp`, `@supabase/mcp-server-supabase`, `@upstash/context7-mcp`) and the hosted
  Sentry MCP. GitHub token env var corrected to `GITHUB_PERSONAL_ACCESS_TOKEN`.
- **Custom tools rewritten** to the current `@opencode-ai/plugin` `tool({...})` API (the old
  `tool(name, desc, schema).args()` form is obsolete) and deployed as flat `.opencode/tools/<n>.ts`
  (the old `<n>/index.ts` folders would all collide as the tool name `index`). `node:` import prefixes.
- **Hooks rewritten as a native plugin.** The old `hooks.json` + `ECC_*` env `.js` scripts were a
  Claude-Code convention that OpenCode never runs. Replaced with one `src/plugins/ai-master-hooks.ts`
  using real OpenCode events (`tool.execute.before` to block secrets, `file.edited` to validate,
  `session.created`/`session.idle` to persist, `experimental.session.compacting`). **Requires bun.**
- **Dead weight removed.** Deleted `src/hooks/` (replaced) and `src/contexts/` (never loaded).
  `src/rules/common/*` are now wired — injected into the deployed `AGENTS.md` at deploy time.
- **AGENTS.md** stale references fixed; rules + profile instructions inject via markers.
- **Deploy** warns if bun is missing when a profile includes plugins.
- **Validation** updated for the new layout (plugin presence, tool API, config validity,
  registry cross-ref against `profiles/full.json`): 351/351 passing.
- **Docs** `README` + `tests/Verify-Runtime.md` updated with the real deploy→OpenCode mapping
  and the bun requirement.

## [0.4.0] - Audit, Spec Compliance & Hardening

- **Security fix**: `post-edit-validate` hook no longer interpolates `ECC_TOOL_TARGET_FILES`
  into the shell unescaped — filenames are now allowlisted (`/^[\w.\-/\\@]+$/`) and quoted,
  closing a shell-injection path. Verified: malicious entries like `a;rm -rf x.ts` are dropped.
- **Skill spec compliance**: normalized all 44 existing `SKILL.md` files (and the skill
  template) to the [Agent Skills spec](https://agentskills.io/specification) — `version` moved
  under `metadata`, `compatibility` and `allowed-tools` changed from YAML lists to strings.
  Bodies untouched.
- **Validation enforces the spec**: `Invoke-StructureCheck.ps1` now checks every skill for
  nested `metadata.version` and string `compatibility`/`allowed-tools`, so the format can't
  silently regress. Suite grew 298 → 350 checks, all passing.
- **Two new skills**: `evidence-based-audit` (verify-before-trust / rollback-first audit
  methodology) and `cross-agent-porting` (OpenCode ↔ Claude Code ↔ Cursor porting guide).
  Each ships a `references/` file as the repo's first progressive-disclosure examples.
  Skill count 44 → 46.
- **Discovery descriptions**: every skill description now states *what it does AND when to use
  it* with trigger keywords, improving auto-invocation.
- **Self-CI**: added `.github/workflows/validate.yml` running the structure/spec harness on push.
- **Honest status labeling**: `core/` and `adapters/` (incl. Cursor) marked as roadmap /
  not-yet-functional; README gained a Status & Portability note; `skill-create` doc corrected
  (the `scripts/` dir is optional progressive-disclosure, not required).
- **Runtime verification**: added `tests/Verify-Runtime.md` — a manual sentinel-marker protocol
  to check OpenCode + DeepSeek actually discover skills and fire hooks.
- **Corrected stale claim**: prior "210/210 passing" note was outdated; actual harness is 350/350.
- **Version bump**: VERSION + opencode.json synced to 0.4.0.

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
