# AI Master Folder - Usage Guide

> **Auto-generated** by `scripts/Generate-Guide.ps1` from the contents of `src/`.
> Do not edit by hand - it is regenerated on every commit. To change it, edit the generator.

## The only things you trigger manually

Everything else activates **automatically**. You only ever do two things by hand:

1. **Slash commands** - type `/name` (e.g. `/review`).
2. **@mention agents** - type `@name <request>` (e.g. `@architect design a cache layer`).

Skills, tools, MCP servers, and the background plugin trigger themselves when relevant.

---

## Slash commands (20) - manual

Type `/name`. Most delegate to a specialist agent.

| Command | What it does | Delegates to |
| --- | --- | --- |
| `/audit` | Run a security audit: dependency CVE scan, OWASP review, secret detection. | `@security-auditor` |
| `/build-fix` | Diagnose and resolve build errors. | `@build-resolver` |
| `/checkpoint` | Save or restore session checkpoints for context management. | - |
| `/cleanup` | Clean up workspace, remove dead code, organize imports. | - |
| `/commit` | Create a well-formatted git commit with Conventional Commits. | - |
| `/debug` | Start a debugging session. | `@debug-agent` |
| `/docs` | Generate or update documentation. | `@docs-writer` |
| `/evolve` | Cluster observations into reusable skill patterns. | - |
| `/explain` | Explain a code section in detail. | - |
| `/learn` | Extract patterns from current session and save as reusable knowledge. | - |
| `/plan` | Create an implementation plan from requirements. | `@planner` |
| `/quality-gate` | Run verification checks before merge: lint, typecheck, tests, build. | `@qa-agent` |
| `/refactor-cmd` | Run code refactoring: rename, extract, simplify, and restructure. | `@refactor-cleaner` |
| `/review` | Trigger a code review on recent changes. | `@code-reviewer` |
| `/security-scan` | Run quick security scan: secret detection, dependency audit, OWASP checks. | `@security-reviewer` |
| `/sessions` | Manage AI coding sessions: list, inspect, resume, and clean up. | - |
| `/ship` | Run the shipping checklist: code readiness, docs, operations, launch readiness. | `@qa-agent` |
| `/skill-create` | Bootstrap a new skill directory with proper structure and frontmatter. | - |
| `/spec` | Write a specification covering objectives, structure, constraints, and acceptance criteria. | `@planner` |
| `/test` | Run tests with context-aware configuration. | `@tester` |

## Agents (17) - @mention

Call a specialist directly with `@name`. **edit/bash** = what each may do.

| Agent | What it does | edit | bash | Also via |
| --- | --- | :---: | :---: | --- |
| `@architect` | Designs system architecture, evaluates trade-offs, and produces structured ADRs. | yes | no | @ only |
| `@build-error-resolver` | Diagnoses and resolves build and compilation errors across languages. | yes | yes | @ only |
| `@build-resolver` | Diagnoses and resolves build errors across languages and toolchains. | yes | yes | `/build-fix` |
| `@code-reviewer` | Reviews code for correctness, security, style, performance, and edge cases. | no | yes | `/review` |
| `@comparator` | Compares files, branches, configurations, or outputs to identify meaningful differences. | no | yes | @ only |
| `@debug-agent` | Systematic debugging using hypothesis-driven root cause analysis. | yes | yes | `/debug` |
| `@docs-writer` | Generates and updates documentation from code context. | yes | no | `/docs` |
| `@e2e-runner` | Runs and manages end-to-end browser tests using Playwright. | yes | yes | @ only |
| `@grader` | Evaluates code quality, completeness, and adherence to standards against defined criteria. | no | yes | @ only |
| `@orchestrator` | Coordinates sub-agents for complex multi-step tasks. | yes | yes | @ only |
| `@performance-optimizer` | Identifies performance bottlenecks and suggests targeted optimizations. | no | yes | @ only |
| `@planner` | Creates structured implementation plans from requirements using deep reasoning. | no | no | `/spec` |
| `@qa-agent` | Runs quality verification gates: lint, typecheck, test, build, security scan. | no | yes | `/ship` |
| `@refactor-cleaner` | Performs code cleanup and refactoring: removes dead code, simplifies logic, improves structure. | yes | yes | `/refactor-cmd` |
| `@security-auditor` | Audits code for security vulnerabilities and compliance issues. | no | yes | `/audit` |
| `@security-reviewer` | Lightweight security review focused on common vulnerabilities and secret detection. | no | yes | `/security-scan` |
| `@tester` | Generates and runs tests following TDD methodology. | yes | yes | `/test` |

## Skills (51) - automatic

You never call these; they load when your request matches. Listed by category for reference.

**content**

- `content-writing` - Long-form writing with tone guidelines, research citation, and structural templates. Use when drafting documentation, articles, blog posts, or other prose.
- `document-processing` - Create and transform documents: docx, pdf, pptx, xlsx generation and editing. Use when generating or editing Office or PDF files programmatically.

**development**

- `api-and-interface-design` - Design consistent, predictable, self-documenting APIs and interfaces. Use when designing or reviewing a REST/GraphQL/library API, naming endpoints, versioning, or shaping function/module signatures.
- `artifact-builder` - Build, package, and verify distribution artifacts across languages and platforms. Use when producing a release build, packaging a binary/wheel/container, or debugging a broken build or packaging step.
- `code-analysis` - Static analysis patterns: lint interpretation, complexity measurement, dependency analysis. Use when interpreting linter output, assessing code complexity and hotspots, or analyzing dependencies.
- `code-review` - Systematic code review covering correctness, security, style, performance, and edge cases â€” plus the two-sided workflow for requesting a review (crafting reviewer context, triaging Critical/Impor...
- `code-simplification` - Simplify complex code while preserving behavior: Chesterton's Fence, Rule of 500, complexity reduction. Use when refactoring for clarity, reducing nesting or duplication, or cleaning up overly comp...
- `debugging` - Systematic debugging methodology: root cause analysis, bisect, log analysis, hypothesis testing. Use when chasing a bug, a failing test, a crash, or unexpected behavior.
- `deprecation-and-migration` - Plan and execute API/feature deprecations and migrations with backward compatibility. Use when removing or renaming an API, migrating callers, or rolling out a breaking change safely.
- `documentation-and-adrs` - Write architecture decision records and maintainable documentation that stays current. Use when writing or restructuring project docs, READMEs, or decision records.
- `error-handling` - Patterns for robust error handling across languages and paradigms. Use when designing error/exception handling, result types, retries, or failure recovery.
- `explain` - Code explanation at multiple depths: brief overview, standard analysis, deep dive. Use when asked to explain code, a function, or how a system works.
- `mcp-builder` - Create, test, and configure MCP (Model Context Protocol) servers for tool integration. Use when building or debugging an MCP server or exposing tools to an agent.
- `performance-audit` - Performance analysis: profiling, load testing, optimization, bottleneck identification. Use when something is slow, profiling, or optimizing latency, throughput, or memory.
- `postgres-patterns` - PostgreSQL patterns: query optimization, indexing, migrations, schema design, connection management. Use when writing SQL or migrations, tuning a slow query, or designing a Postgres schema.
- `python-patterns` - Python idioms: type hints, PEP 8, pytest, async patterns, project structure. Use when writing or reviewing Python code.
- `react-best-practices` - React and Next.js performance optimization guidelines from Vercel Engineering. Use when writing, reviewing, or refactoring React/Next.js code to ensure optimal performance patterns. Triggers on tas...
- `refactoring` - Safe code restructuring with pre/post condition checks, migration patterns, and deprecation. Use when restructuring code without changing its behavior.
- `testing` - TDD methodology, test plan generation, coverage analysis, and boundary testing. Use when writing tests, planning test coverage, or improving a test suite.
- `typescript-patterns` - TypeScript strict-mode patterns: generics, discriminated unions, branded types, async patterns. Use when writing or reviewing TypeScript.
- `ui-ux-pro-max` - UI/UX design intelligence for web and mobile. Includes 50+ styles, 161 color palettes, 57 font pairings, 161 product types, 99 UX guidelines, and 25 chart types across 10 stacks (React, Next.js, Vu...

**devops**

- `docker-patterns` - Docker patterns: multi-stage builds, Compose, security, networking, optimization. Use when writing or fixing a Dockerfile or docker-compose, shrinking images, or containerizing an app.

**documentation**

- `architecture-decision-records` - Create and maintain Architecture Decision Records (ADRs) for significant technical decisions. Use when choosing between technical options, recording why a decision was made, or someone asks for an ...

**meta**

- `continuous-learning` - Session-to-skill evolution pipeline: extract patterns, build instincts, evolve into reusable skills. Use when capturing a repeated workflow as a skill or turning session learnings into reusable gui...
- `cross-agent-porting` - Port a skill, command, agent, or rule between AI coding tools (OpenCode, Claude Code, Cursor): what is portable as-is, what needs an adapter, and how to convert SKILL.md, slash commands, subagents,...
- `evidence-based-audit` - Audit a repo, config, or claim safely and verifiably: classify every claim as verified/inferred/assumed, verify before trusting, analyze before mutating, and keep a rollback path. Use for audits, '...
- `prompt-optimizer` - Analyze and improve prompts for clarity, specificity, token efficiency, and output quality. Use when a prompt underperforms or you want to refine prompt or instruction wording.
- `skill-create` - Meta-skill for bootstrapping new skills from observed patterns, git history, or user descriptions. Use when creating a new skill or scaffolding skill structure and frontmatter.

**operations**

- `ci-cd-and-automation` - Design CI/CD pipelines and automation that catch issues early and ship reliably. Use when creating or fixing GitHub Actions/CI workflows, build/test/deploy automation, or release pipelines.
- `observability-and-instrumentation` - Add structured logging, metrics, tracing, and monitoring. Use when instrumenting code, debugging production behavior, or adding logs, metrics, or traces.

**other**

- `supabase` - Use when doing ANY task involving Supabase. Triggers: Supabase products (Database, Auth, Edge Functions, Realtime, Storage, Vectors, Cron, Queues); client libraries and SSR integrations (supabase-j...
- `supabase-postgres-best-practices` - Postgres performance optimization and best practices from Supabase. Use this skill when writing, reviewing, or optimizing Postgres queries, schema designs, or database configurations.

**security**

- `security-review` - OWASP-based security audit: vulnerability scanning, CVE dependency check, threat modeling. Use when reviewing code for security issues or auditing for vulnerabilities.

**testing**

- `browser-testing` - Playwright E2E testing with Page Object Model, fixtures, and CI integration. Use when writing or fixing end-to-end/browser tests, automating UI flows, or setting up Playwright.
- `tdd-workflow` - Full TDD cycle: RED/GREEN/REFACTOR with a verification gate at each phase. Use when building a feature test-first or asked to follow TDD.

**workflow**

- `changelog-generation` - Generate CHANGELOG.md from Conventional Commits history with version grouping and categorization. Use when cutting a release, updating the changelog, or summarizing what changed since the last tag.
- `context-engineering` - Craft, prune, and structure AI context windows for maximum output quality. Use when assembling prompts or context, deciding what to include, or improving an agent's relevance.
- `doubt-driven-development` - Surface uncertainty, document unknowns, and make reversible decisions. Use when requirements are unclear, you're unsure of an approach, or you want to de-risk a decision.
- `git-workflow` - Standardized git conventions: commit messages, branching, PR hygiene, conflict resolution. Use when committing, branching, resolving conflicts, or cleaning up git history.
- `iterative-retrieval` - Progressive context refinement: retrieve information in stages, broad to specific. Use when searching a large codebase or corpus where one query won't surface everything.
- `plan` - Implementation planning: requirements decomposition, task breakdown, estimation. Use when breaking down a feature or task before coding, or asked for a plan.
- `project-init` - Scaffold new projects with consistent structure, config, and best-practice conventions. Use when starting a new project or repo, or setting up boilerplate.
- `pull-request` - PR description generation, changelog linking, reviewer guidance, and merge readiness. Use when opening a PR or writing a PR description or summary.
- `search-first` - Research-before-coding workflow: search codebase and docs before implementing. Use before writing new code, to find existing patterns or utilities to reuse.
- `shipping-and-launch` - Checklist-driven process for shipping features, deployments, and releases. Use when preparing to ship, deploy, or release and you want a pre-launch checklist.
- `source-driven-development` - Treat source material as the single source of truth; derive decisions from primary sources, not assumptions. Use when implementing from a spec, doc, or API reference where accuracy to the source ma...
- `spec-driven-development` - Write a PRD covering objectives, structure, constraints, and acceptance criteria before any code. Use when starting a non-trivial feature that needs a spec first.
- `strategic-compact` - Manual context compaction guidance: summarize, archive, and prune to manage token budgets. Use when the context window is filling up and you need to compact safely.
- `subagent-orchestration` - Delegate work to subagents with isolated context â€” two modes. Parallel fan-out: dispatch one agent per independent problem domain (different test files, subsystems, bugs) to run concurrently. Sub...
- `token-budget-advisor` - Advises on token usage, context limits, and strategies for staying within budget. Use when worried about context size, cost, or hitting token limits.
- `verification-loop` - Post-edit quality verification: run lint, typecheck, and tests after every change. Use after editing code to confirm nothing broke.

## Tools (6) - automatic

The model runs these itself when needed.

- `changed-files` - Get list of changed files from git (staged, unstaged, branch, or all).
- `check-coverage` - Run the project's coverage tool against a threshold with detection (vitest, jest, pytest, go, cargo-tarpaulin, nyc).
- `format-code` - Format code using the project's formatter with detection (prettier, ruff, gofmt, rustfmt). Set check:true to verify without writing.
- `git-summary` - Generate a summary of git changes (diffstat + recent commits) for commit messages.
- `lint-check` - Run the project's linter with framework detection (eslint, ruff, golangci-lint, clippy). Optional auto-fix.
- `run-tests` - Run project tests with automatic framework detection (vitest, jest, pytest, mocha, cypress, playwright, ava, go, cargo).

## MCP servers (7) - automatic

Available to the model when relevant (some require a token/login first).

- `context7` - Live documentation lookup for libraries, frameworks, and APIs (Context7 by Upstash)
- `filesystem` - Filesystem access with configurable allowed directories
- `github` - GitHub API integration for PRs, issues, repositories, and code search
- `playwright` - Playwright browser automation for E2E testing and web scraping (official Microsoft Playwright MCP)
- `sentry` - Sentry error tracking and performance monitoring (hosted MCP; authenticates via OAuth on first use)
- `sequential-thinking` - Structured chain-of-thought reasoning for complex problem solving
- `supabase` - Supabase project management (hosted MCP; authenticates via OAuth on first use)

## Background plugin - automatic

`ai-master-hooks` runs silently: blocks writing secrets, lint-checks files after edits,
remembers your last session per project, and notices context compaction.
