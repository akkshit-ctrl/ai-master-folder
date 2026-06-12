---
name: code-review
description: "Systematic code review covering correctness, security, style, performance, and edge cases — plus the two-sided workflow for requesting a review (crafting reviewer context, triaging Critical/Important/Minor) and receiving review feedback (verify before implementing, push back with technical rigor). Use when reviewing a diff or PR, checking code quality before merge, requesting a review, or responding to review feedback."
license: MIT
compatibility: "opencode >=1.0.0"
metadata:
  version: 1.1.0
  author: "AI Master Folder"
  category: "development"
  source_url: ".agents/skills/{requesting-code-review, receiving-code-review} (superpowers)"
  trust_level: reviewed
  tags:
    - review
    - quality
    - security
    - best-practices
allowed-tools: read glob grep bash
---

# Code Review

When asked to review code, follow this systematic framework.

## Review Dimensions

### 1. Correctness
- Does the code do what it claims?
- Are there off-by-one, null-pointer, or type errors?
- Are error paths handled (network failures, invalid input, edge cases)?
- Are there race conditions or concurrency bugs?

### 2. Security
- Are inputs validated and sanitized?
- Are secrets / credentials exposed anywhere?
- Does the code follow OWASP Top 10 guidelines?
- Is there proper authentication and authorization?

### 3. Style & Readability
- Does the code follow the project's style guide?
- Are names meaningful and consistent?
- Is the code self-documenting? Are complex sections commented?
- Are functions/pure functions too long or doing too much?

### 4. Performance
- Are there N+1 queries or unnecessary loops?
- Could caching improve this code?
- Are resources (file handles, DB connections) properly released?
- Is there memory allocation in hot paths?

### 5. Edge Cases
- Empty states (null, undefined, empty array/string)
- Boundary values (max/min, 0, negative)
- What happens when dependencies fail?
- What happens with unexpected input types?

## Output Format

Provide review results as:

```
## Review Summary
**Overall**: ✅ Approve | ⚠️ Changes requested | ❌ Blocked
**Severity**: Critical | Important | Minor

### Findings
1. **Critical**: [description] — [file:line]
2. **Important**: [description] — [file:line]
...
```

## Requesting a Review

Review early, review often. Dispatch a fresh reviewer to catch issues before they cascade. Give the reviewer crafted context about the **work product**, not your session history — this keeps them focused and preserves your own context.

**When to request:**
- Mandatory: after a major feature, after each task in subagent-driven work, before merge to main.
- Valuable: when stuck (fresh perspective), before a refactor (baseline), after a complex bug fix.

**Context to provide the reviewer:**
- What was implemented (the work product).
- What it should do (plan or requirements).
- Base and head git SHAs to scope the diff (`git rev-parse HEAD~1` / `HEAD`).
- A brief description / summary.

**Triage the findings:**

| Severity | Action |
|----------|--------|
| Critical | Fix immediately — breaks, security, data loss. |
| Important | Fix before proceeding to the next task / merge. |
| Minor | Note for later; don't block on it. |

If the reviewer is wrong, push back with reasoning (see below) — don't argue with valid feedback, and never skip review because "it's simple."

## Receiving Review Feedback

Code review requires technical evaluation, not emotional performance. **Verify before implementing. Ask before assuming. Technical correctness over social comfort.**

**Response pattern:**
1. READ the complete feedback without reacting.
2. UNDERSTAND — restate the requirement in your own words, or ask.
3. VERIFY against codebase reality (grep, run, check).
4. EVALUATE — is it technically sound for *this* codebase?
5. RESPOND with a technical acknowledgment or reasoned pushback.
6. IMPLEMENT one item at a time, testing each.

**Verify before implementing.** Before acting on external feedback, check: Is it correct for this codebase? Does it break existing functionality? Is there a reason for the current implementation? Does it hold across platforms/versions? Does the reviewer have full context? If you can't verify, say so: "I can't verify this without [X] — should I investigate, ask, or proceed?"

**Push back when** a suggestion breaks functionality, the reviewer lacks context, it violates YAGNI (grep — if the code is unused, propose removing it), it's wrong for this stack, legacy/compat reasons exist, or it conflicts with prior architectural decisions. Push back with technical reasoning and references to working tests/code — not defensiveness.

**Clarify all unclear items first.** If any item is ambiguous, stop and ask before implementing anything — items may be related, and partial understanding yields wrong implementation.

**No performative agreement.** Don't write "You're absolutely right!", "Great point!", or "Thanks for catching that!" Just state the fix: "Fixed — [what changed]" or "Good catch ([issue]). Fixed in [location]." Actions speak; the code shows you heard.

**If you pushed back and were wrong**, correct factually and move on: "You were right — checked [X], it does [Y]. Implementing now." No long apology, no defending the pushback.

> External feedback = suggestions to evaluate, not orders to follow. Verify. Question. Then implement.

## Rationalizations

| Excuse | Rebuttal |
|--------|----------|
| "My code is clean enough" | Review catches blind spots — you're too close to your own code. |
| "There's no time for review" | Bugs in production cost more time than the review. |
| "Only I work on this code" | Future you will thank present you for the review. |
| "The reviewer's right, let me just do it" | Verify first — blind implementation propagates wrong suggestions. |
| "I'll skip review, it's simple" | Simple changes still cascade; review early, review often. |

## References

- `tdd-workflow` — write tests before implementation so review has something to verify against.
- `verification-loop` — confirm fixes actually work before claiming done.
- `debugging` — systematic approach when a review surfaces a bug.
- `shipping-and-launch` — finishing a development branch after review passes.
