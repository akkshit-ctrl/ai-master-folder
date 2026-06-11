---
name: launch-checklist
description: "Reference checklist for shipping features and releases with confidence."
---

# Launch Checklist

## Code Readiness
- [ ] All tests pass (unit, integration, e2e)
- [ ] Linter passes with zero warnings
- [ ] Type checker passes with strict mode
- [ ] No `TODO`, `FIXME`, `DEBUG`, or `console.log` in production code
- [ ] New code has ≥90% test coverage
- [ ] No secrets committed (API keys, tokens, passwords)
- [ ] All merge conflicts resolved
- [ ] Branch is up to date with target (main/release)

## Documentation
- [ ] CHANGELOG updated with user-facing changes
- [ ] Breaking changes documented with migration guide
- [ ] API docs updated (if applicable)
- [ ] Environment variables documented
- [ ] Onboarding guide updated (if applicable)

## Operations
- [ ] Migration scripts are reversible (up/down)
- [ ] Feature flag in place for gated rollout
- [ ] Rollback plan documented
- [ ] Monitoring alerts configured for key metrics
- [ ] Runbook exists for common failure modes
- [ ] Dependency updates verified (no breaking changes)
- [ ] Database migrations tested against staging data

## Launch Execution
- [ ] Deploy to staging and run smoke tests
- [ ] Verify logs are flowing and structured correctly
- [ ] Run load test if performance-sensitive
- [ ] Deploy to canary (10% of traffic)
- [ ] Monitor errors, latency, and business metrics for 30 min
- [ ] Ramp to 50%, monitor for 30 min
- [ ] Ramp to 100%
- [ ] Tag release in git

## Post-Launch
- [ ] Verify metrics are stable after 24 hours
- [ ] Confirm no regression in error budget
- [ ] Update status page if customer-facing
- [ ] Announce to stakeholders
- [ ] Retrospective scheduled (if major launch)
