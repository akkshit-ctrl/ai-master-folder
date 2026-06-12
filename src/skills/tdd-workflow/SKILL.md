---
name: tdd-workflow
description: "Full TDD cycle: RED/GREEN/REFACTOR with a verification gate at each phase. Use when building a feature test-first or asked to follow TDD."
license: MIT
compatibility: "opencode >=1.0.0"
metadata:
  version: 1.0.0
  author: "AI Master Folder"
  category: "testing"
  tags:
    - tdd
    - testing
    - red-green-refactor
    - quality
allowed-tools: read edit bash glob grep
---

# TDD Workflow

Test-Driven Development with the RED/GREEN/REFACTOR cycle.

## The Cycle

### 🔴 RED: Write a Failing Test
1. Understand the requirement or behavior needed
2. Write the smallest possible test that expresses the desired behavior
3. Run the test — it must fail (this validates the test works)
4. The failure message should clearly describe what's missing

### 🟢 GREEN: Make It Pass
1. Write the minimum code to pass the test
2. Do not optimize, refactor, or add unrelated functionality
3. Run the test — it must pass
4. Run existing tests — they must still pass

### 🔵 REFACTOR: Improve Without Changing Behavior
1. Improve code quality while keeping all tests green
2. Extract duplication, rename variables, simplify logic
3. Run all tests after each refactor step
4. Repeat: RED → GREEN → REFACTOR for each requirement

## Test Quality Checklist
- [ ] Test names describe behavior: `it('returns X when given Y')`
- [ ] Tests are independent (no shared mutable state)
- [ ] Each test covers exactly one behavior
- [ ] Tests cover: happy path, error path, edge cases
- [ ] Tests are fast (unit tests < 100ms each)
- [ ] Tests don't test implementation details

## Coverage Targets
- Statements: ≥80%
- Branches: ≥75%
- Functions: ≥90%
- New code: ≥90%

## Rationalizations

| Excuse | Rebuttal |
|--------|----------|
| "Tests slow me down" | Tests catch regressions immediately. Debugging is slower. |
| "I'll write tests after the code works" | TDD produces better design. Write the test first. |
| "80% coverage is good enough" | 80% is the floor, not the ceiling. New code should be ≥90%. |
