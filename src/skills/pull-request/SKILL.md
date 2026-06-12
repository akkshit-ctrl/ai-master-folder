---
name: pull-request
description: "PR description generation, changelog linking, reviewer guidance, and merge readiness. Use when opening a PR or writing a PR description or summary."
license: MIT
compatibility: "opencode >=1.0.0"
metadata:
  version: 1.0.0
  author: "AI Master Folder"
  category: "workflow"
  tags:
    - pull-request
    - pr
    - review
    - changelog
allowed-tools: read bash grep glob
---

# Pull Request

Generate comprehensive pull request descriptions and assess merge readiness.

## PR Description Generation

Generate a PR description covering:

```markdown
## Summary
[One-paragraph description of what this PR does and why]

## Changes
### Added
- [feature or file] — [why]

### Changed
- [modification] — [rationale]

### Fixed
- [bug fix] — [root cause]

### Removed
- [deletion] — [reason]

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests pass
- [ ] Manual testing performed

## Related
- Closes #[issue]
- Related to #[issue]
```

## Merge Readiness Checklist
- [ ] Commits follow Conventional Commits
- [ ] Branch rebased on target
- [ ] All CI checks pass
- [ ] Reviewed by at least one peer
- [ ] CHANGELOG updated
- [ ] Documentation updated
- [ ] No debug code or console.log
- [ ] Breaking changes noted with migration guide

## Review Guidance
When creating a PR, also suggest:
- Which areas need closest review
- What testing was done
- What edge cases were considered
- Deployment or rollback considerations

## Rationalizations

| Excuse | Rebuttal |
|--------|----------|
| "The reviewer can figure out what changed" | Good PR descriptions speed up reviews and catch issues earlier. |
| "I'll write the description after approval" | Write it now while the context is fresh. |
| "The diff speaks for itself" | The diff tells what changed, not why. The *why* is critical. |
