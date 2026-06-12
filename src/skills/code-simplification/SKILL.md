---
name: code-simplification
description: "Simplify complex code while preserving behavior: Chesterton's Fence, Rule of 500, complexity reduction. Use when refactoring for clarity, reducing nesting or duplication, or cleaning up overly complex code."
license: MIT
compatibility: "opencode >=1.0.0"
metadata:
  version: 1.0.0
  author: "AI Master Folder"
  category: "development"
  tags:
    - simplification
    - refactoring
    - complexity
    - cleanup
allowed-tools: read edit bash glob grep
---

# Code Simplification

Reduce complexity while preserving exact behavior. Not refactoring — simplification is specifically about making code easier to read and maintain.

## Principles

### Chesterton's Fence
Before removing or simplifying something, understand why it exists. If you can't explain it, don't remove it until you can.

### Rule of 500
If a file exceeds 500 lines, it should be split. Long files hide duplication and make reasoning harder.

### Complexity Budget
Every function has a complexity budget:
- Cyclomatic complexity: ≤10
- Nesting depth: ≤4
- Parameters: ≤3 (use an object for more)
- Lines: ≤60

## Process

### Step 1: Identify Complexity
Look for:
- Deeply nested conditionals (extract to early returns or guard clauses)
- Long parameter lists (extract to parameter object)
- Boolean flags controlling behavior (replace with strategy/state pattern)
- Duplicated logic (extract to shared function)
- Comments explaining what instead of why (simplify the code)
- Switch/if chains on type (replace with polymorphism)

### Step 2: Verify Behavior
Before simplifying:
- Tests must pass
- Understand the current contract (inputs, outputs, side effects)
- Document any behavior that seems incorrect but intentional

### Step 3: Simplify
Apply one change at a time:
1. Extract repeated logic to a named function
2. Replace conditionals with early returns
3. Inline variables used only once
4. Split monolith functions into focused helpers
5. Remove dead code and unused parameters
6. Rename for clarity

### Step 4: Verify
After each change:
- Tests pass
- Behavior is preserved
- The change actually improves readability (if not, revert)

## Anti-Patterns to Avoid
- Simplifying by removing error handling
- Replacing a clear implementation with a "clever" shorter one
- Over-abstracting (one-use interfaces, unnecessary generics)
- Removing comments that explain WHY (keep those, remove comments that explain WHAT)

## Rationalizations

| Excuse | Rebuttal |
|--------|----------|
| "It works, don't touch it" | Working but complex code is technical debt. Pay it down. |
| "I might break something" | That's why you verify after every small change. |
| "This is the standard pattern in our codebase" | A bad standard is still bad. Improve the codebase. |
| "I'll simplify it when I add the next feature" | Never simplify and add features in the same step. Do it now. |
