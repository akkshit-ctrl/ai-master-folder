---
name: deprecation-and-migration
description: "Plan and execute API/feature deprecations and migrations with backward compatibility."
version: 1.0.0
license: MIT
compatibility:
  - opencode: ">=1.0.0"
metadata:
  author: "AI Master Folder"
  category: "development"
  tags:
    - deprecation
    - migration
    - lifecycle
    - breaking-changes
allowed-tools:
  - read
  - write
  - edit
  - bash
  - glob
  - grep
---

# Deprecation & Migration

Deprecate APIs and features responsibly. Every removal breaks someone's workflow — plan for it.

## Deprecation Lifecycle

```
Phase 1: Announce   → Add deprecation notice, set sunset date
Phase 2: Warn       → Add runtime warnings, update docs
Phase 3: Remove     → Delete old code, verify consumers migrated
Phase 4: Cleanup    → Remove migration shims, update references
```

## Phase 1: Announce

### Frontmatter for Deprecated Features
- Document the deprecation in the feature's source
- Set a clear sunset date (minimum 3 months for APIs)
- Document the replacement path

```
---
status: deprecated
deprecated_at: 2026-06-01
sunset: 2026-09-01
replacement: /api/v2/users
---
```

### Communication
- CHANGELOG entry with `BREAKING CHANGE` prefix
- Migration guide with before/after examples
- @-mention known consumers in the PR

## Phase 2: Warn

### Runtime Warnings
```typescript
// Add a warning that triggers on usage
console.warn(
  '[DEPRECATED] api/v1/users is deprecated. ' +
  'Migrate to api/v2/users by 2026-09-01. ' +
  'See docs/migrations/v1-to-v2.md'
);
```

### Metrics
- Track deprecation warning frequency
- Alert when warnings drop below threshold (all consumers migrated)

## Phase 3: Remove

### Removal Checklist
- [ ] All consumers migrated (verify via metrics or search)
- [ ] Replacement has been stable for at least one release cycle
- [ ] Migration guide published and linked in deprecation notice
- [ ] Sunset date has passed
- [ ] Removal is a major version bump

### The Strangler Fig Pattern
Replace incrementally:
1. Add new path alongside old
2. Route a percentage of traffic to new
3. Monitor for regressions
4. Increase percentage
5. Remove old path

## Phase 4: Cleanup

Remove:
- Migration shims and adapters
- Deprecation warnings
- Documented sunset dates that have passed

## Rationalizations

| Excuse | Rebuttal |
|--------|----------|
| "I'll just remove it, nobody uses it" | Verify first. Silent removals erode trust. |
| "Deprecation takes too many releases" | Proper deprecation is respect for your consumers. |
| "I added a comment, that's enough" | Comments are invisible. Add runtime warnings and changelog entries. |
| "Breaking changes are fine in a major version" | Even major versions should provide migration paths. |
