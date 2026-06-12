---
name: changelog-generation
description: "Generate CHANGELOG.md from Conventional Commits history with version grouping and categorization. Use when cutting a release, updating the changelog, or summarizing what changed since the last tag."
license: MIT
compatibility: "opencode >=1.0.0"
metadata:
  version: 1.0.0
  author: "AI Master Folder"
  category: "workflow"
  tags:
    - changelog
    - release
    - conventional-commits
    - versioning
allowed-tools: bash read edit
---

# Changelog Generation

Generate structured CHANGELOG.md files from git history using Conventional Commits.

## Process

### Step 1: Analyze Commit History
Parse commits since the last release tag using `git log`:

```bash
git log --oneline --format="%s" <last-tag>..HEAD
```

### Step 2: Categorize by Type
| Commit Type | Changelog Section |
|---|---|
| `feat` | Added |
| `fix` | Fixed |
| `perf` | Changed |
| `refactor` | Changed |
| `docs` | Documentation |
| `style` | Changed |
| `test` | Testing |
| `chore` | Maintenance |
| `ci` | CI/CD |
| `build` | Build System |
| `revert` | Reverted |

### Step 3: Group by Version
If no version tag exists, group by semantic version increment:
- Breaking changes → Major version bump
- `feat` commits → Minor version bump
- Everything else → Patch version bump

### Step 4: Generate Output
```markdown
# Changelog

## [1.2.0] - 2026-06-12

### Added
- New feature description (PR #123)

### Fixed
- Bug fix description (PR #122)

### Changed
- Performance improvement for module X (PR #121)

### Documentation
- Updated README with setup instructions (PR #120)
```

## Rationalizations

| Excuse | Rebuttal |
|--------|----------|
| "Nobody reads changelogs" | Users and future maintainers depend on them. |
| "I'll update it during the release" | By then you've forgotten what changed. Do it now. |
| "The commits tell the story" | Commits are noisy. Changelogs are curated. |
