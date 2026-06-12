---
name: evidence-based-audit
description: "Audit a repo, config, or claim safely and verifiably: classify every claim as verified/inferred/assumed, verify before trusting, analyze before mutating, and keep a rollback path. Use for audits, 'is this actually working?', pre-refactor reviews, or any 'verify everything' request."
license: MIT
compatibility: "opencode >=1.0.0; claude-code >=1.0.0"
allowed-tools: read glob grep bash
metadata:
  version: 1.0.0
  author: "AI Master Folder"
  category: "meta"
  tags:
    - audit
    - verification
    - safety
    - evidence
    - rollback
---

# Evidence-Based Audit

A discipline for auditing systems without breaking them and without fabricating confidence.
Core rule: **verify before you trust, analyze before you mutate, and never present an
assumption as a fact.**

## When to Use
- "Audit / review / harden this repo" or "is X actually working the way I think?"
- Before any large refactor, migration, or delete.
- Whenever a request says "verify everything", "triple-check", or "don't assume".

## The Five Gates (in order)
1. **Analysis before modification** — map the system before changing it.
2. **Evidence before conclusion** — read it or run it; don't infer from filenames.
3. **Safety before convenience** — prefer dry-run, preview, archive-over-delete.
4. **Rollback before mutation** — commit/branch/snapshot first, so any change is reversible.
5. **Verification before trust** — re-run checks and confirm the change did what you claimed.

## Evidence Classes
Tag every important statement. See `references/evidence-classes.md` for the full rubric.
- **[VF] Verified fact** — you read the file or ran the command and saw the result.
- **[HCI] High-confidence inference** — strongly implied but not directly observed.
- **[UA] Unverified assumption** — plausible, not checked. Must be labeled, never hidden.

## Workflow
1. **Restate the claims.** Build a claim → reality → verdict table. Treat the prompt's own
   "facts" (counts, "all passing", "already hardened") as claims to verify.
2. **Inventory.** Recursively map the system; read meaningful files, don't guess from names.
3. **Verify each claim.** Run the test, read the config, count the items. Record [VF]/[HCI]/[UA].
4. **Find the real risks.** Destructive ops, shell injection, network calls, silent overwrites,
   self-modifying automation, secrets, missing rollback.
5. **Establish rollback**, then make the **smallest reversible change** that fixes a verified issue.
6. **Re-verify.** Re-run the harness; diff to confirm only intended files changed.
7. **Report honestly** — separate what you proved from what remains unknown.

## Examples
- "All 210 tests pass" → run them → `298 passed, 0 failed` → verdict: claim stale [VF].
- "Hooks are active" → don't assert it; trigger one and look for its log line, else mark [UA].

## Rationalizations

| Excuse | Rebuttal |
|--------|----------|
| "The filename says what it does" | Filenames lie. Read the file or run it. |
| "It looks unused, I'll delete it" | Looks ≠ proof. Archive, don't delete, until verified. |
| "I'm confident, no need to label" | Confidence isn't evidence. Tag it [HCI] and move on. |
| "Re-running the check is overkill" | A change you didn't verify is a change you can't trust. |
| "Rollback takes too long" | One commit now is cheaper than an unrecoverable mistake later. |

## Related Skills
- `verification-loop` — tight build/observe/fix cycles.
- `doubt-driven-development` — surfacing and testing your own uncertainty.
- `security-review` — the risk-class checklist this audit draws on.
