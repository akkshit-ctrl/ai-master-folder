---
name: skill-create
description: "Meta-skill for bootstrapping new skills from observed patterns, git history, or user descriptions. Use when creating a new skill or scaffolding skill structure and frontmatter."
aliases:
  - skill-creator
license: MIT
compatibility: "opencode >=1.0.0"
metadata:
  version: 1.1.0
  author: "AI Master Folder"
  category: "meta"
  source_url: ".agents/skills/{skill-creator, writing-skills} (superpowers)"
  trust_level: reviewed
  tags:
    - skill-creation
    - meta
    - bootstrapping
    - scaffolding
allowed-tools: read write edit bash glob grep
---

# Skill Create

Meta-skill for creating new skills programmatically.

**Core principle:** Writing a skill IS test-driven development applied to process documentation. If you didn't watch an agent fail *without* the skill, you don't know whether the skill teaches the right thing.

## When to Use
- You've identified a repeated workflow pattern that should be encoded as a skill
- You want to extract a skill from git history or session observations
- You need to scaffold a new skill with correct structure and frontmatter

## The TDD-for-Skills Loop

Follow RED → GREEN → REFACTOR, the same as `tdd-workflow` but applied to docs.

| TDD concept | Skill creation |
|-------------|----------------|
| Write test first | Run the baseline scenario BEFORE writing the skill |
| Test fails (RED) | Agent violates the rule / botches the task with no skill present |
| Minimal code | Write the smallest skill addressing those exact failures |
| Test passes (GREEN) | Agent now complies / succeeds with the skill present |
| Refactor | Close rationalization loopholes while keeping compliance |

### RED — write a failing baseline test
Pick 2-3 realistic prompts a real user would actually type. Run them on a fresh agent **without** the skill and record verbatim:
- What choices it made and where it went wrong
- The exact rationalizations it used (these become your rationalization table)
- Which pressures (time, sunk cost, authority, exhaustion) triggered violations

You must SEE the failure first. A skill written before observing baseline behavior is guessing.

### GREEN — draft the minimal skill
Write only enough to address the specific failures you observed. Do not pad with content for hypothetical cases. Re-run the same prompts with the skill present and confirm the agent now does the right thing.

### REFACTOR — close loopholes
The agent found a new rationalization? Add an explicit counter and re-test until bulletproof. For discipline skills, forbid specific workarounds rather than restating the rule:

> Write code before the test? Delete it. Start over. Don't keep it as "reference", don't "adapt" it. Delete means delete.

State the foundational principle early: *violating the letter of the rules is violating the spirit of the rules* — this cuts off a whole class of "I'm following the spirit" excuses. Capture every excuse you saw in the Rationalizations table below.

> Keep this skill single-file and light. Port the *methodology* above; do NOT build eval-runner / benchmark scripts into the skill itself. Manual baseline-vs-skill runs are enough here.

## Skill Creation Process

### Step 1: Analyze the Pattern
- What triggers this skill? (specific commands, problems, contexts)
- What are the inputs and outputs?
- What tools does the skill need? What are the key steps?

### Step 2: Scaffold the Structure
Keep `SKILL.md` small and load detail on demand (progressive disclosure). Supporting directories are **optional** — add them only when content would otherwise bloat `SKILL.md`:

```
src/skills/<skill-name>/
├── SKILL.md        # Required: skill definition (keep under ~500 lines)
├── references/     # Optional: long reference prose, loaded only when needed
├── scripts/        # Optional: helper scripts the skill runs
└── assets/         # Optional: templates/fixtures the skill copies
```

If 3 baseline runs all independently wrote the same helper script, that's a strong signal to bundle it once in `scripts/` rather than making every future invocation reinvent it.

### Step 3: Write Frontmatter
Follow the [Agent Skills spec](https://agentskills.io/specification): only `name` and `description` are required; `version` is nested under `metadata`; `compatibility` and `allowed-tools` are **strings**, not lists.

```yaml
---
name: <kebab-case-name>          # must equal the directory name
description: "What it does AND when to use it — pack trigger keywords for discovery."
license: MIT
compatibility: "opencode >=1.0.0"
allowed-tools: read edit bash    # space-separated, not a list
metadata:
  version: 1.0.0
  author: "AI Master Folder"
  category: "development|workflow|testing|content|security|meta"
  tags:
    - <tag1>
    - <tag2>
---
```

### Step 4: Write the Body
- **Title**: human-readable name
- **Overview**: what this skill does and when to activate
- **Steps**: clear, ordered, imperative instructions — explain the *why*, not heavy-handed MUSTs
- **Examples**: concrete usage examples
- **Anti-Patterns**: what NOT to do
- **Related Skills**: cross-references

Today's models are smart and have good theory of mind. Explain the reasoning behind each instruction so the agent can generalize rather than follow rote rules. If you catch yourself writing ALWAYS/NEVER in all caps or rigid structures, that's a yellow flag — reframe and explain why instead.

## Claude Search Optimization (CSO)

The `description` field is the **primary** mechanism deciding whether the skill ever triggers. Future Claude reads only the name + description to decide whether to load the skill, so optimize for being found.

- **Say what it does AND when to use it.** All "when to use" info lives in the description, not the body.
- **Pack trigger keywords:** error messages, symptoms ("flaky", "hanging", "race condition"), synonyms ("timeout/hang/freeze"), tool and file-type names. Use the words a user would actually type.
- **Be a little pushy.** Claude tends to *under*-trigger. Prefer "Use whenever the user mentions dashboards, data visualization, or internal metrics, even if they don't say 'dashboard'" over a bare "Builds a dashboard."
- **Describe the problem, not language-specific symptoms** (say "race conditions", not "setTimeout"), unless the skill itself is technology-specific — then make that explicit.
- **Test triggering with near-misses.** When tuning a description, check it against tricky should-NOT-trigger queries that share keywords but need a different tool — not obviously-irrelevant ones, which test nothing.
- **Name by what you DO.** Active, verb-first names trigger better: `creating-skills` > `skill-creation`.

Note: simple one-step queries ("read this file") may not trigger any skill because the agent handles them directly. Skills reliably trigger on substantive, multi-step, or specialized tasks.

## Validation Checklist
- [ ] Ran a baseline (no-skill) test and recorded the failure before writing the skill
- [ ] Name matches kebab-case, ≤64 chars; directory name matches `name` field
- [ ] `version` is nested under `metadata` (not a top-level field)
- [ ] `compatibility` and `allowed-tools` are strings, not YAML lists
- [ ] Description says what it does AND when to use it, with trigger keywords (≤1024 chars)
- [ ] Tags are lowercase, kebab-case
- [ ] `SKILL.md` stays focused; long prose/scripts moved to `references/`/`scripts/`
- [ ] Re-ran the test WITH the skill and confirmed the agent now complies
- [ ] Passes `tests/Invoke-StructureCheck.ps1` (and `skills-ref validate` if installed)

## Rationalizations

| Excuse | Rebuttal |
|--------|----------|
| "I'll create the skill without frontmatter" | Frontmatter is required for auto-discovery. Always include it. |
| "This workflow is too specific to be a skill" | If you've done it twice, it's a candidate for a skill. |
| "I'll add tests later" | Scaffold the skill properly now. Later means never. |
| "It's just a docs update, no need to test" | Editing a skill without a baseline test is the same violation as writing one without it. |
| "It's obviously clear" | Clear to you ≠ clear to other agents. Run the baseline. |
| "Testing is overkill / no time" | 15 min of baseline testing saves hours debugging a bad skill in production. |

## References
- `tdd-workflow` — the RED-GREEN-REFACTOR cycle this skill adapts
- `verification-loop` — verify the skill works before claiming it's done
- [Agent Skills Specification](https://agentskills.io/specification)

## Note

This skill replaces the former `skill-creator` — all functionality consolidated here.
