---
name: ci-cd-and-automation
description: "Design CI/CD pipelines and automation that catch issues early and ship reliably. Use when creating or fixing GitHub Actions/CI workflows, build/test/deploy automation, or release pipelines."
license: MIT
compatibility: "opencode >=1.0.0"
metadata:
  version: 1.0.0
  author: "AI Master Folder"
  category: "operations"
  tags:
    - ci
    - cd
    - automation
    - pipelines
allowed-tools: read write edit bash glob grep
---

# CI/CD & Automation

Design pipelines that fail fast, provide clear feedback, and ship reliably. Automation is not about eliminating humans — it's about eliminating human error.

## Pipeline Architecture

### Stage 1: Validation
Run on every push — fast (<2 min):
```
- Lint (formatting, style)
- Type check (strict mode)
- Unit tests (no integration)
- Dependency audit (vulnerabilities)
```

### Stage 2: Verification
Run on PR — moderate (<10 min):
```
- Integration tests
- Build / compile
- Test coverage report
- License check
- Secret scan
```

### Stage 3: Quality Gate
Block merge if:
- Tests fail
- Coverage drops below threshold
- Lint/type errors exist
- Security vulnerabilities are high/critical

### Stage 4: Deploy
Run on merge to main:
```
- Stage 3 passed
- Build artifacts
- Run migrations
- Deploy to staging
- Smoke tests
- Deploy to production (gated)
```

## Pipeline Principles

### Fail Fast
Validate cheap checks first. Don't run integration tests if lint fails.

### Idempotent Pipelines
Same commit + same config = same result. No external state dependencies.

### Reproducible Builds
Build artifacts are deterministic. No timestamps, no network-dependent resolution.

### Self-Service
Developers can run the same checks locally that CI runs. Use `act` or similar tools.

## CI/CD Checklist

- [ ] Pipeline runs in <10 min for standard PRs
- [ ] Failed pipeline sends notification with link
- [ ] Cache is configured for dependencies
- [ ] Secrets are injected via environment, not checked in
- [ ] Migration scripts are runnable in both directions
- [ ] Rollback is a one-click action
- [ ] Pipeline is versioned alongside the code (`.github/` or similar)
- [ ] Every stage has clear output (what passed, what failed, why)

## Branch Strategy Integration

| Branch | CI Stages | Deploy Target |
|--------|-----------|---------------|
| `feature/*` | Validation | None |
| `main` | Validation + Verification | Staging |
| `release/*` | Validation + Verification + Quality Gate | Staging → Prod (gated) |
| `hotfix/*` | Validation + Verification + Quality Gate | Prod (expedited) |

## Rationalizations

| Excuse | Rebuttal |
|--------|----------|
| "I'll add CI after the feature is done" | CI catches problems when they're cheapest to fix. Add it first. |
| "Local checks are good enough" | Local != CI. Environment drift causes non-reproducible failures. |
| "The pipeline takes too long" | Optimize the pipeline, don't skip it. Parallelize stages. |
