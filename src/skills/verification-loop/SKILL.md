---
name: verification-loop
description: "Post-edit quality verification: run lint, typecheck, and tests after every change."
version: 1.0.0
license: MIT
compatibility:
  - opencode: ">=1.0.0"
metadata:
  author: "AI Master Folder"
  category: "workflow"
  tags:
    - verification
    - quality
    - lint
    - typecheck
    - testing
allowed-tools:
  - bash
  - read
---

# Verification Loop

Run automated quality checks after every code change.

## Verification Sequence

After every `edit` or `write` operation, run in order:

### 1. Lint
Run the project's linter on the modified files:
```
eslint --fix <changed-files>
# or: ruff check <changed-files>
# or: golangci-lint run <changed-files>
```

Fix all lint errors. Warnings should be reviewed.

### 2. Type Check
Run the type checker if applicable:
```
tsc --noEmit
# or: mypy .
# or: cargo check
```

Fix all type errors.

### 3. Test
Run the relevant test suite:
```
# Unit tests only (fast)
npx vitest run --changed
# or: pytest --changed
# or: cargo test
```

### 4. Build
Run a build check:
```
npm run build
# or: python -m build
# or: cargo build
```

## Error Handling
If any step fails:
- Read the error message carefully
- Fix the issue
- Re-run the verification loop from step 1
- Do not skip verification for "trivial" changes

## When to Skip
- Documentation-only changes
- Config file changes (review carefully)
- When user explicitly requests no verification

## Rationalizations

| Excuse | Rebuttal |
|--------|----------|
| "It's just a small change, I don't need to verify" | Small changes cause big production bugs. Always verify. |
| "I'll run tests later" | Run them now while the change is fresh in your mind. |
| "The linter is too strict" | Linter rules exist for a reason. Fix the issues, don't skip them. |
