---
name: postgres-patterns
description: "PostgreSQL patterns: query optimization, indexing, migrations, schema design, connection management."
version: 1.0.0
license: MIT
compatibility:
  - opencode: ">=1.0.0"
metadata:
  author: "AI Master Folder"
  category: "development"
  tags:
    - postgresql
    - database
    - sql
    - optimization
    - migrations
allowed-tools:
  - read
  - edit
  - bash
  - grep
---

# PostgreSQL Patterns

PostgreSQL best practices for schema design, queries, and operations.

## Indexing Strategy
```sql
-- B-tree for equality and range queries
CREATE INDEX idx_users_email ON users (email);

-- Composite index for multi-column queries
CREATE INDEX idx_orders_user_status ON orders (user_id, status);

-- Partial index for filtered queries
CREATE INDEX idx_active_orders ON orders (created_at) WHERE status = 'active';

-- Covering index for index-only scans
CREATE INDEX idx_users_email_name ON users (email) INCLUDE (name);
```

## Query Optimization
- Use `EXPLAIN ANALYZE` to identify slow queries
- Avoid `SELECT *` — name columns explicitly
- Use `LIMIT` with `OFFSET` for pagination (or cursor-based for large datasets)
- Use `JOIN` over correlated subqueries where possible
- Use `EXISTS` instead of `IN` for large subquery lists

## Migration Patterns
```sql
-- Always wrap in transaction
BEGIN;

-- Backward-compatible changes first
ALTER TABLE users ADD COLUMN phone VARCHAR(20);

-- Data migration (optional)
-- UPDATE users SET phone = '' WHERE phone IS NULL;

-- Then make non-nullable
ALTER TABLE users ALTER COLUMN phone SET NOT NULL;

COMMIT;
```

## Connection Management
- Use connection pooling (PgBouncer or built-in pooler)
- Set reasonable `pool_size` and `timeout` values
- Close connections in `finally` blocks or use `using`/`async with`
- Use `statement_timeout` to prevent runaway queries
- Monitor for idle-in-transaction connections

## Rationalizations

| Excuse | Rebuttal |
|--------|----------|
| "I'll add indexes when there's a performance problem" | Design indexes upfront. Query patterns dictate schema. |
| "My query works without EXPLAIN ANALYZE" | "Works" isn't the same as "works efficiently." Always profile. |
| "Migrations are overkill for schema changes" | Without migrations, you lose history and rollback capability. |
