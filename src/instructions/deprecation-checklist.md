---
name: deprecation-checklist
description: "Reference checklist for responsibly deprecating APIs, features, and code paths."
---

# Deprecation Checklist

## Phase 1: Announce
- [ ] Deprecation notice added to the feature's source (frontmatter or code comment)
- [ ] Sunset date documented (minimum 3 months for APIs)
- [ ] Replacement path documented
- [ ] CHANGELOG entry with `BREAKING CHANGE` prefix
- [ ] Migration guide with before/after examples
- [ ] Known consumers notified (@mention in the PR)

## Phase 2: Warn
- [ ] Runtime deprecation warning added (console.warn, log.warn)
- [ ] Warning includes: what is deprecated, what to use instead, sunset date
- [ ] Warning frequency is tracked via metrics
- [ ] Consumers can silence warnings via opt-in (env var or flag)
- [ ] Docs are updated to mark the feature as deprecated

## Phase 3: Remove
- [ ] All known consumers migrated (verify via metrics or search)
- [ ] Replacement has been stable for at least one release cycle
- [ ] Migration guide published and linked in deprecation notice
- [ ] Sunset date has passed
- [ ] Removal is a major version bump
- [ ] The Strangler Fig pattern used if applicable (route % traffic to new)

## Phase 4: Cleanup
- [ ] Migration shims and adapters removed
- [ ] Deprecation warnings removed from code
- [ ] Deprecated code paths deleted (not commented out)
- [ ] Documentation references updated
- [ ] ADR written for the removal decision

## Consumer Communication Template
```
[DEPRECATED] {feature} is deprecated as of {date}.
Replacement: {replacement}
Migrate by: {sunset date}
Migration guide: {link}
```
