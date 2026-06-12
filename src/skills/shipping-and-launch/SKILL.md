---
name: shipping-and-launch
description: "Checklist-driven process for shipping features, deployments, and releases. Use when preparing to ship, deploy, or release and you want a pre-launch checklist."
license: MIT
compatibility: "opencode >=1.0.0"
metadata:
  version: 1.0.0
  author: "AI Master Folder"
  category: "workflow"
  tags:
    - shipping
    - launch
    - release
    - deployment
allowed-tools: read write edit bash glob grep
---

# Shipping & Launch

A repeatable, checklist-driven process for shipping features and releases. Confidence comes from verification, not hope.

## Pre-Flight Checklist

### Code Readiness
- [ ] All tests pass (unit, integration, e2e)
- [ ] Linter passes with zero warnings
- [ ] Type checker passes with strict mode
- [ ] No `TODO`, `FIXME`, `DEBUG`, or `console.log` in production code
- [ ] New code has ≥90% test coverage
- [ ] No secrets committed (API keys, tokens, passwords)

### Documentation
- [ ] CHANGELOG updated with user-facing changes
- [ ] Breaking changes documented with migration guide
- [ ] API docs updated (if applicable)
- [ ] Environment variables documented

### Operations
- [ ] Migration scripts are reversible (up/down)
- [ ] Feature flag in place for gated rollout
- [ ] Rollback plan documented
- [ ] Monitoring alerts configured for key metrics

### Launch Steps
- [ ] Deploy to staging and run smoke tests
- [ ] Verify logs are flowing and structured correctly
- [ ] Run load test if performance-sensitive
- [ ] Deploy to canary (10% of traffic)
- [ ] Monitor errors, latency, and business metrics for 30 min
- [ ] Ramp to 50%, monitor for 30 min
- [ ] Ramp to 100%
- [ ] Tag release in git

## Rollback Protocol

### Trigger Conditions
- Error rate increases by >5%
- p95 latency increases by >50%
- Any 500 error affecting paying users
- Business metric (signups, orders) drops >10%

### Steps
1. Revert the deploy (not the code — the deploy)
2. Stabilize — verify the rollback succeeded
3. Investigate root cause
4. Fix, test, repeat the launch process

## Launch Grades

| Grade | Use Case | Requirements |
|-------|----------|-------------|
| **Internal** | Dogfooding, internal tools | Tests pass, basic logging |
| **Beta** | Limited external access | Pre-flight checklist, feature flag, monitoring |
| **GA** | General availability | Full checklist, canary deploy, rollback plan, runbook |
| **Critical** | Core infrastructure, payments | GA + load test + security audit + exec sign-off |

## Rationalizations

| Excuse | Rebuttal |
|--------|----------|
| "I'll skip the checklist, it's a small change" | Small changes cause big outages. Follow the checklist. |
| "We'll fix issues after launch" | Fixing post-launch is more expensive and damages trust. |
| "Canary deploys take too long" | A 30-minute canary saves a 3-hour incident response. |
