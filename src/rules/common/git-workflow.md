---
name: git-workflow
description: "Git conventions: commit format, branch naming, PR process, conflict resolution."
category: workflow
priority: high
---

# Git Workflow

## Commit Messages
Follow Conventional Commits format:

```
<type>(<scope>): <description>

[optional body with motivation and rationale]

[optional footer]
```

Types: `feat`, `fix`, `chore`, `docs`, `style`, `refactor`, `perf`, `test`, `ci`, `build`, `revert`.

The description must use imperative present tense: "add" not "added" or "adds".

## Branch Naming
- `feature/<issue-or-description>` — New features
- `fix/<issue-or-description>` — Bug fixes
- `chore/<description>` — Maintenance tasks
- `docs/<description>` — Documentation changes

Use kebab-case for descriptions. Include issue tracker ID where applicable.

## PR Readiness Checklist
Before marking a PR ready:
- Commits follow Conventional Commits format
- Branch is rebased on latest target branch
- All tests pass
- No debug code, console.log, or commented-out code
- Documentation updated if applicable
- CHANGELOG entry added if relevant

## Conflict Resolution
- Rebase feature branches onto target branch before PR
- Never force-push to shared or protected branches
- Resolve conflicts by understanding both sides' intent, not by picking one side arbitrarily
- After resolving conflicts, verify with a full test run
