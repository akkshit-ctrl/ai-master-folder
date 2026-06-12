---
name: git-workflow
description: "Standardized git conventions: commit messages, branching, PR hygiene, conflict resolution. Use when committing, branching, resolving conflicts, or cleaning up git history."
license: MIT
compatibility: "opencode >=1.0.0"
metadata:
  version: 1.0.0
  author: "AI Master Folder"
  category: "workflow"
  tags:
    - git
    - version-control
    - conventions
    - pr
allowed-tools: bash read
---

# Git Workflow

Provides conventions and automation for git operations.

## Commit Message Format

Follow Conventional Commits:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

Types: `feat`, `fix`, `chore`, `docs`, `style`, `refactor`, `perf`, `test`, `ci`, `build`, `revert`

## Branch Naming

- `feature/<issue>-<kebab-description>`
- `fix/<issue>-<kebab-description>`
- `chore/<issue>-<kebab-description>`
- `docs/<description>`

## PR Readiness Checklist

Before marking a PR ready:
- [ ] Commits follow Conventional Commits
- [ ] Branch is rebased on latest target branch
- [ ] Tests pass (`/test`)
- [ ] No debug code, console.log, or commented-out code
- [ ] Documentation updated if applicable
- [ ] CHANGELOG entry added if applicable

## Conflict Resolution

1. Never force-push to shared branches
2. Use `git rebase` for feature branches, `git merge` for shared
3. Resolve conflicts by understanding intent, not just merging blindly
4. After resolution, verify with tests

## Rationalizations

| Excuse | Rebuttal |
|--------|----------|
| "I'll fix the commit message later" | Commit messages are documentation. Fix them before pushing. |
| "It's just a small change, I don't need a branch" | Every change goes on a branch. No exceptions. |
| "I'll rebase after the PR" | Rebase before the PR to catch conflicts early. |
