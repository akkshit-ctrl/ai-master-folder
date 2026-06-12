---
name: tdd-workflow
description: "Full TDD cycle: RED/GREEN/REFACTOR with a verification gate at each phase. Use when building a feature test-first or asked to follow TDD."
license: MIT
compatibility: "opencode >=1.0.0"
metadata:
  version: 1.1.0
  author: "AI Master Folder"
  category: "testing"
  tags:
    - tdd
    - testing
    - red-green-refactor
    - quality
  source_url: ".agents/skills/test-driven-development (superpowers)"
  trust_level: reviewed
allowed-tools: read edit bash glob grep
---

# TDD Workflow

Test-Driven Development with the RED/GREEN/REFACTOR cycle.

**Core principle:** If you didn't watch the test fail, you don't know if it tests the right thing.

## The Iron Law

```
NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST
```

Wrote code before the test? Delete it. Start over.
- Don't keep it as "reference" — you'll adapt it, and that's testing after.
- Don't look at it. Delete means delete.
- Implement fresh, driven by the tests.

**Violating the letter of the rule is violating the spirit of the rule.**

## When to Use

- **Always:** new features, bug fixes, refactoring, behavior changes.
- **Exceptions (ask first):** throwaway prototypes, generated code, config files.

Thinking "skip TDD just this once"? Stop — that's a rationalization.

## The Cycle

### 🔴 RED: Write a Failing Test
1. Write the smallest test expressing the desired behavior.
2. One behavior, clear name, real code (no mocks unless unavoidable).
3. The failure message should clearly describe what's missing.

**Verify RED (mandatory gate — never skip):**
- Run the test. It must **fail**, not error.
- It must fail because the feature is missing, not because of a typo.
- Passes immediately? You're testing existing behavior — fix the test.
- Errors instead of failing? Fix the error, re-run until it fails correctly.

### 🟢 GREEN: Make It Pass
1. Write the **minimum** code to pass the test. No extra features, no YAGNI options.
2. Don't refactor unrelated code or "improve" beyond the test.

**Verify GREEN (mandatory gate):**
- Run the test. It must **pass**.
- All existing tests must still pass.
- Output must be pristine — no errors, no warnings.
- Test fails? Fix the **code**, not the test.

### 🔵 REFACTOR: Improve Without Changing Behavior
1. Only after green. Remove duplication, improve names, extract helpers.
2. Keep all tests green after each step. Don't add behavior here.
3. Re-run the GREEN gate, then repeat: RED → GREEN → REFACTOR for the next behavior.

## Why Test-First (Order Matters)

Tests written **after** code pass immediately — and passing immediately proves nothing:
- Might test the wrong thing or test implementation, not behavior.
- Might miss edge cases you forgot; you never saw it catch a bug.

Tests-after answer "what does this do?" Tests-first answer "what *should* this do?" — forcing edge-case discovery before you implement.

## Test Quality Checklist
- [ ] Test names describe behavior: `it('returns X when given Y')`
- [ ] One behavior per test — "and" in the name? Split it.
- [ ] Tests are independent (no shared mutable state)
- [ ] Real code over mocks; mocks test the mock, not your code
- [ ] Cover happy path, error path, edge cases
- [ ] Fast (unit tests < 100ms each); don't test implementation details

## Coverage Targets
- Statements ≥80% · Branches ≥75% · Functions ≥90% · New code ≥90%

## Red Flags — STOP and Start Over
- Code written before the test, or tests added "later"
- Test passes immediately
- Can't explain why the test failed
- "I already manually tested it" / "keep it as reference" / "this is different because..."

**All of these mean: delete the code, restart with TDD.**

## Rationalizations

| Excuse | Rebuttal |
|--------|----------|
| "Tests slow me down" | Tests catch regressions immediately. Debugging is slower. |
| "I'll write tests after the code works" | Tests passing immediately prove nothing. Write the test first. |
| "80% coverage is good enough" | 80% is the floor, not the ceiling. New code should be ≥90%. |
| "Too simple to test" | Simple code breaks. The test takes 30 seconds. |
| "Already manually tested" | Ad-hoc ≠ systematic. No record, can't re-run. |
| "Deleting X hours is wasteful" | Sunk cost fallacy. Keeping unverified code is technical debt. |
| "TDD is dogmatic, I'm being pragmatic" | TDD *is* pragmatic — bugs caught before commit beat debugging in prod. |
| "Test is hard to write" | Hard to test = hard to use. Listen to the test; fix the design. |

## When Stuck
| Problem | Solution |
|---------|----------|
| Don't know how to test | Write the wished-for API and assertion first. |
| Test too complicated | Design too complicated. Simplify the interface. |
| Must mock everything | Code too coupled. Use dependency injection. |

## Debugging Integration

Bug found? Write a failing test that reproduces it, then follow the cycle (see `debugging`). The test proves the fix and prevents regression. Never fix bugs without a test.

## Verification Gate Before Done
Before claiming complete: every new function has a test, you watched each fail first for the right reason, minimal code made them pass, all tests green, output pristine. Can't check every box? You skipped TDD — start over. (See `verification-loop`.)

## Final Rule

```
Production code → a test exists and failed first
Otherwise → not TDD
```
