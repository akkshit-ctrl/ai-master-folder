---
name: debugging
description: "Systematic debugging methodology: root cause analysis, bisect, log analysis, hypothesis testing. Use when chasing a bug, a failing test, a crash, or unexpected behavior."
license: MIT
compatibility: "opencode >=1.0.0"
metadata:
  version: 1.0.0
  author: "AI Master Folder"
  category: "development"
  tags:
    - debugging
    - troubleshooting
    - root-cause
    - analysis
allowed-tools: read bash glob grep edit
---

# Debugging

Systematic approach to finding and fixing bugs.

## Debugging Methodology

### Step 1: Gather Information
- What is the expected behavior?
- What is the actual behavior?
- What are the reproduction steps?
- When did this last work? What changed?

### Step 2: Form Hypotheses
List possible root causes ranked by likelihood:

```
H1: [most likely cause]
Evidence: [what supports this]
Test: [how to verify or falsify]

H2: [next likely cause]
...
```

### Step 3: Isolate with Binary Search
- Comment out / disable half the code paths
- If bug persists, the cause is in the active half
- If bug disappears, the cause is in the disabled half
- Repeat until narrow scope is found

### Step 4: Add Observability
- Insert targeted log statements (not console.log spray)
- Use debugger where available
- Add assertions at key boundaries

### Step 5: Fix & Verify
- Apply the minimal fix
- Verify the fix reproduces the expected behavior
- Add a regression test
- Run all existing tests

## Common Bug Patterns

| Pattern | Symptoms | Approach |
|---------|----------|----------|
| Off-by-one | Wrong index, off-by-N results | Check loop boundaries, array lengths |
| Null/Undefined | TypeError: cannot read of null | Trace origin, check async timing |
| Race Condition | Intermittent failures | Check shared state, async ordering |
| State Mutation | Unexpected side effects | Check immutability, object references |
| Type Coercion | `"1" + 1 === "11"` | Check type conversion points |
| Stale Closure | Old values in callbacks | Check closure capture timing |

## Rationalizations

| Excuse | Rebuttal |
|--------|----------|
| "I can find the bug without reproducing it" | Reproducing is the fastest path to the root cause. Always reproduce first. |
| "I'll add a quick fix and move on" | Quick fixes without root cause analysis create recurring bugs. |
| "The error message tells me everything" | Error messages point at symptoms, not causes. Dig deeper. |
