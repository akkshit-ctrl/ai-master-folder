---
name: performance-audit
description: "Performance analysis: profiling, load testing, optimization, bottleneck identification. Use when something is slow, profiling, or optimizing latency, throughput, or memory."
license: MIT
compatibility: "opencode >=1.0.0"
metadata:
  version: 1.0.0
  author: "AI Master Folder"
  category: "development"
  tags:
    - performance
    - profiling
    - optimization
    - benchmarking
allowed-tools: read bash grep glob
---

# Performance Audit

Systematic performance analysis and optimization.

## Audit Dimensions

### 1. Runtime Performance
- CPU profiling: Identify hot functions and slow algorithms
- Memory profiling: Detect leaks, excessive allocation, GC pressure
- I/O profiling: Database queries, file operations, network calls
- Concurrency: Thread contention, lock contention, async bottlenecks

### 2. Database Performance
- Slow query identification: `EXPLAIN ANALYZE`, pg_stat_statements
- Missing indexes: Sequential scans on large tables
- N+1 queries: ORM patterns that cause excessive queries
- Connection pool saturation

### 3. Frontend Performance (Web)
- Bundle size analysis: `webpack-bundle-analyzer` or `vite --analyze`
- Lighthouse scores: Performance, accessibility, best practices
- Core Web Vitals: LCP, FID, CLS
- Render optimization: Avoiding layout thrashing, reducing re-renders

### 4. Infrastructure Performance
- CDN and caching strategy
- Database read replicas and connection pooling
- Horizontal vs vertical scaling assessment
- Queue depth and processing latency

## Optimization Process
1. **Measure first**: Profile before assuming what's slow
2. **Identify bottleneck**: Find the single biggest contributor
3. **Propose fix**: Suggest the smallest change with the biggest impact
4. **Verify**: Re-profile after the fix to confirm improvement
5. **Repeat**: Move to the next bottleneck

## Anti-Patterns
- Premature optimization before profiling
- Optimizing code that runs <1% of execution time
- Caching without invalidation strategy
- Micro-optimizations that reduce readability

## Rationalizations

| Excuse | Rebuttal |
|--------|----------|
| "I know where the bottleneck is" | Measure first. Intuition about performance is wrong half the time. |
| "This is fast enough already" | "Fast enough" today is tomorrow's bottleneck. |
| "Caching will fix it" | Caching without invalidation is technical debt. |
