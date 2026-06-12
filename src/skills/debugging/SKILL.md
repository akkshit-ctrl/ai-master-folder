---
name: debugging
description: "Systematic debugging methodology: root cause analysis, bisect, log analysis, hypothesis testing. Use when chasing a bug, a failing test, a crash, or unexpected behavior."
license: MIT
compatibility: "opencode >=1.0.0"
metadata:
  version: 1.1.0
  author: "AI Master Folder"
  category: "development"
  source_url: ".agents/skills/systematic-debugging (superpowers)"
  trust_level: reviewed
  tags:
    - debugging
    - troubleshooting
    - root-cause
    - analysis
allowed-tools: read bash glob grep edit
---

# Debugging

Systematic approach to finding and fixing bugs.

## The Iron Law

```
NO FIX WITHOUT A REPRODUCED ROOT CAUSE.
```

Symptom fixes are failures. If you have not reproduced the bug and traced it to
its source, you cannot propose a fix. This holds *especially* under time
pressure — systematic debugging is faster than guess-and-check thrashing
(typically 15-30 min vs. 2-3 hours, ~95% first-time fix rate vs. ~40%).

## The Four Phases

Complete each phase before moving to the next. Don't skip ahead.

### Phase 1 — Root Cause Investigation

- **Read the error carefully.** Full stack trace, line numbers, file paths,
  error codes. The message often contains the exact answer.
- **Reproduce consistently.** Exact steps; does it happen every time? If not
  reproducible → gather more data, don't guess.
- **Check recent changes.** `git diff`, recent commits, new deps, config or
  environment differences. When did this last work?
- **Instrument multi-component systems.** For systems with layers (CI → build →
  sign, API → service → DB), log data in/out at each boundary, verify env/config
  propagation, then run once to see *where* it breaks before investigating that
  component.
- **Trace data flow backward.** Where does the bad value originate? What passed
  it in? Keep tracing up to the source — fix there, not at the symptom.

### Phase 2 — Pattern Analysis

- **Find working examples.** Locate similar code in the same codebase that works.
- **Compare against references.** Read the reference implementation *completely*,
  not skimmed — understand it before applying.
- **List every difference** between working and broken, however small. Never
  assume "that can't matter."
- **Map dependencies** — config, environment, assumptions the code makes.

### Phase 3 — Hypothesis & Testing

- **State one hypothesis:** "I think X is the root cause because Y." Be specific;
  write it down.
- **Test minimally** — smallest possible change, one variable at a time. Don't
  fix multiple things at once.
- **Verify before continuing.** Worked → Phase 4. Didn't → form a *new*
  hypothesis; do not stack fixes on top.
- **When you don't know, say so.** Don't pretend; research or ask.

### Phase 4 — Fix with TDD

- **Write a failing test first.** Simplest reproduction; automated if possible.
  Required before fixing. (See `tdd-workflow`.)
- **Implement one fix** addressing the root cause. No "while I'm here" extras, no
  bundled refactoring.
- **Verify:** target test passes, no other tests broken, issue actually resolved.
  (See `verification-loop`.)
- **If the fix fails — STOP and count attempts.** < 3 → return to Phase 1 with new
  info. ≥ 3 → stop fixing and question the architecture (below).

### When 3+ Fixes Fail: Question the Architecture

Signs the architecture, not the bug, is the problem: each fix surfaces new
coupling/shared state elsewhere; fixes demand "massive refactoring"; each fix
spawns new symptoms. This is a wrong architecture, not a failed hypothesis —
discuss with the human before attempting fix #4.

## Common Bug Patterns

| Pattern | Symptoms | Approach |
|---------|----------|----------|
| Off-by-one | Wrong index, off-by-N results | Check loop boundaries, array lengths |
| Null/Undefined | TypeError: cannot read of null | Trace origin, check async timing |
| Race Condition | Intermittent failures | Check shared state, async ordering |
| State Mutation | Unexpected side effects | Check immutability, object references |
| Type Coercion | `"1" + 1 === "11"` | Check type conversion points |
| Stale Closure | Old values in callbacks | Check closure capture timing |

## Red Flags — STOP and Return to Phase 1

If you catch yourself thinking any of these, you are guessing:

- "Quick fix for now, investigate later"
- "Just try changing X and see if it works"
- "It's probably X, let me fix that"
- "I don't fully understand but this might work"
- Proposing solutions before tracing data flow
- "One more fix attempt" (after 2+ failures)
- Each fix reveals a new problem in a different place

Human signals you're off track: "Stop guessing", "Is that not happening?"
(you assumed without verifying), "Ultrathink this" (question fundamentals).

## "No Root Cause" Cases

If investigation genuinely shows the issue is environmental, timing-dependent, or
external: document what you checked, add appropriate handling (retry, timeout,
clear error), and add monitoring. But ~95% of "no root cause" verdicts are
incomplete investigation — be sure you finished Phase 1.

## Rationalizations

| Excuse | Rebuttal |
|--------|----------|
| "I can find the bug without reproducing it" | Reproducing is the fastest path to the root cause. Always reproduce first. |
| "I'll add a quick fix and move on" | Quick fixes without root cause analysis create recurring bugs. |
| "The error message tells me everything" | Error messages point at symptoms, not causes. Dig deeper. |
| "Emergency, no time for process" | Systematic debugging is FASTER than guess-and-check thrashing. |
| "I'll write the test after the fix works" | Untested fixes don't stick. The failing test first proves the fix. |
| "Multiple fixes at once saves time" | You can't isolate what worked, and it spawns new bugs. |
| "Reference is too long, I'll adapt the pattern" | Partial understanding guarantees bugs. Read it completely. |
| "One more fix attempt" (after 2+ failures) | 3+ failures = architectural problem. Question the pattern, don't fix again. |

## References

- `tdd-workflow` — write the failing test in Phase 4
- `verification-loop` — confirm the fix before claiming success
