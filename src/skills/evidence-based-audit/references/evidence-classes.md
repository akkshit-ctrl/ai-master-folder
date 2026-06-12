# Evidence Classes — Full Rubric

Loaded on demand by the `evidence-based-audit` skill. Use these labels in audit output so a
reader can tell proof from guesswork at a glance.

## [VF] Verified Fact
You directly observed it this session.
- Read the exact file/lines, **or**
- Ran the command and saw the output, **or**
- Reproduced the behavior.

Examples: "Ran `Invoke-StructureCheck.ps1` → `342 passed, 0 failed`." / "Read
`post-edit-validate.js:92`; the filename is interpolated unescaped."

Bar: another person could re-run your exact step and see the same thing.

## [HCI] High-Confidence Inference
Strongly implied by verified facts, but not directly observed.
- "All 44 skills share one template, so the 3 I didn't open almost certainly match" —
  reasonable, but say [HCI], and verify if the cost of being wrong is high.

Bar: you can name the verified facts it rests on.

## [UA] Unverified Assumption
Plausible but unchecked — environmental, runtime, or third-party behavior you couldn't observe.
- "OpenCode probably tolerates this frontmatter" before you've loaded it.
- "DeepSeek auto-invokes skills from descriptions" before running the runtime test.

Rule: **never silently upgrade a [UA] to a fact.** Either verify it, or ship it labeled with
the exact step needed to resolve it.

## Reporting pattern
Use a claim table for the headline findings:

| Claim | Reality | Verdict |
|---|---|---|
| (what was asserted) | (what you found) | ✓ verified / ✗ stale / [UA] unknown |

And a closing **Open risks / unknowns** section listing every remaining [UA] with how to
resolve it. The goal is that a reader never mistakes "I assumed" for "I checked".

## Anti-rationalization checks
Before concluding, ask:
- Did I actually run/read this, or am I pattern-matching?
- What would prove me wrong, and did I look for it?
- Am I calling something "done/working" without observing it?
- Is there a rollback path if my change is wrong?
