---
name: observability-and-instrumentation
description: "Add structured logging, metrics, tracing, and monitoring. Use when instrumenting code, debugging production behavior, or adding logs, metrics, or traces."
license: MIT
compatibility: "opencode >=1.0.0"
metadata:
  version: 1.0.0
  author: "AI Master Folder"
  category: "operations"
  tags:
    - observability
    - monitoring
    - logging
    - tracing
    - metrics
allowed-tools: read write edit bash glob grep
---

# Observability & Instrumentation

Build systems that tell you what's wrong without needing to reproduce the issue locally.

## Three Pillars

### 1. Structured Logging
Log machine-readable events, not human-readable sentences:
```json
{ "level": "error", "event": "payment_failed", "user_id": "abc", "amount": 42.00, "error": "insufficient_funds", "duration_ms": 320 }
```

**Rules:**
- Use structured JSON — no string interpolation in log messages
- Include request-id and span-id in every log line
- Log at the right level: debug < info < warn < error
- Don't log secrets, PII, or full request bodies

### 2. Metrics
Count and measure things that matter:
- **RED method**: Rate, Errors, Duration (for every service)
- **USE method**: Utilization, Saturation, Errors (for every resource)
- Business metrics: signups, orders, revenue, churn

### 3. Distributed Tracing
Trace requests across service boundaries:
- Each request gets a `trace_id` propagated via headers
- Each service adds spans with duration and metadata
- Errors include trace context for correlation

## What to Instrument

### Request Layer
- [ ] Request rate, latency (p50/p95/p99), error rate
- [ ] Status codes by endpoint
- [ ] Payload sizes

### Database Layer
- [ ] Query duration (by query pattern, not parameterized)
- [ ] Connection pool utilization
- [ ] Slow query log (>100ms)

### External Dependencies
- [ ] API call duration and error rate
- [ ] Retry count and backoff wait
- [ ] Circuit breaker state changes

### Business Events
- [ ] User signups, logins, key actions
- [ ] Feature adoption (opt-in, usage frequency)
- [ ] Error rates by feature area

## Instrumentation Checklist

- [ ] Every external call has a timeout
- [ ] Every external call has a circuit breaker
- [ ] Every handler has structured error logging
- [ ] Every handler has a duration metric
- [ ] Every entry point has request-id generation
- [ ] Health check endpoint returns dependency status
- [ ] Startup logs version and config hash

## Rationalizations

| Excuse | Rebuttal |
|--------|----------|
| "We can add observability later" | You can't add what you didn't collect. Instrument now. |
| "Logs are enough to debug issues" | Logs without metrics and traces are blind. You need all three. |
| "These metrics will never be looked at" | You look at them when prod breaks. That's exactly when they matter. |
