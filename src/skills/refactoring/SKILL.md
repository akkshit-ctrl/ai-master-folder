---
name: refactoring
description: "Safe code restructuring with pre/post condition checks, migration patterns, and deprecation."
version: 1.0.0
license: MIT
compatibility:
  - opencode: ">=1.0.0"
metadata:
  author: "AI Master Folder"
  category: "development"
  tags:
    - refactoring
    - cleanup
    - migration
    - quality
allowed-tools:
  - read
  - edit
  - bash
  - glob
  - grep
---

# Refactoring

Safe, systematic approach to code restructuring.

## Golden Rules

1. **Never refactor and add features in the same step**
2. **Tests must pass before and after each refactor step**
3. **Each step must be small enough to revert independently**
4. **Behavior must be preserved exactly — no observable changes**

## Refactoring Workflow

### Phase 1: Preparation
- Verify all existing tests pass
- Identify the code boundary (what stays, what changes, what moves)
- Document the current behavior contract (inputs, outputs, side effects)

### Phase 2: Transform (small steps)
Apply one pattern at a time:
- Extract method / function
- Rename symbol (across all references)
- Move to new module
- Simplify conditional logic
- Replace magic values with constants

### Phase 3: Verification
- Run tests — all must pass
- Check for behavioral equivalence
- Run linter and type checker

### Phase 4: Cleanup
- Remove deprecated wrappers
- Update imports across the codebase
- Remove dead code identified during refactoring

## Common Patterns

| Pattern | Description | When to Use |
|---------|-------------|-------------|
| Extract Function | Move logic to named function | Duplicate or complex inline code |
| Rename Symbol | Give better names | Unclear or misleading names |
| Inline Variable | Remove unnecessary indirection | Variable only used once |
| Split Loop | Separate concerns in single loop | Loop doing multiple things |
| Replace Conditional with Polymorphism | Type-based dispatch instead of if/else | Many conditionals on type |

## Rationalizations

| Excuse | Rebuttal |
|--------|----------|
| "It works, don't touch it" | Working code with poor structure is technical debt. Fix it now. |
| "Refactoring might introduce bugs" | That's why tests must pass before AND after. |
| "I'll refactor when I add the next feature" | Never mix refactoring with feature work. Do it separately. |
