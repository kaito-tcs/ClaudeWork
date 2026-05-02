---
description: Optimize slow query with EXPLAIN ANALYZE and indexes
argument-hint: "[query-description]"
---

# /optimize-query

## Purpose
Profile and optimize a slow database query: use EXPLAIN ANALYZE to understand execution plan, identify missing indexes, add computed columns if needed, and verify improvement.

## When to Use
- User reports slow page load
- Monitoring alerts on slow endpoint
- Code review identifies potential N+1 query
- Before shipping feature with complex queries

## Inputs
- Slow endpoint or query (SQL or ORM)
- Current execution time
- Expected performance target

## Workflow
1. **database-engineer** runs EXPLAIN ANALYZE to see execution plan
2. **database-engineer** identifies: sequential scans, missing indexes, large sorts
3. **Decision point**: Add index? Refactor query? Add computed column?
4. **database-engineer** implements optimization (index, query rewrite, etc.)
5. **database-engineer** re-runs EXPLAIN ANALYZE to verify
6. **test-engineer** benchmarks before/after on realistic data
7. **devops-engineer** deploys index (minimal downtime)

## Outputs
- EXPLAIN ANALYZE output (before and after)
- Index creation migration (if needed)
- Optimized query (with comments explaining changes)
- Performance improvement report (query time, row count improvements)
- Monitoring alert to catch regressions

## Quality Gates
- Query execution time reduced (target 10x improvement or < 100ms)
- EXPLAIN shows index usage (not sequential scan)
- No new N+1 queries introduced
- Tested on production-sized data
- Rollback plan documented (drop index if needed)

## Example
```
/optimize-query "GET /api/v1/users/:id/orders endpoint slow"

Before Optimization:

EXPLAIN ANALYZE SELECT o.* FROM orders o 
  WHERE o.user_id = $1 
  ORDER BY o.created_at DESC 
  LIMIT 20;

Result:
  Seq Scan on orders o (cost=0.00..50000.00 rows=1000)
  Planning Time: 0.2ms
  Execution Time: 234ms  ← SLOW

Issues Found:
- Sequential scan on 1M row table
- No index on (user_id, created_at)

Optimization:
CREATE INDEX idx_orders_user_created 
  ON orders(user_id, created_at DESC);

After Optimization:

EXPLAIN ANALYZE [same query]

Result:
  Index Scan using idx_orders_user_created (cost=0.42..10.50 rows=20)
  Planning Time: 0.2ms
  Execution Time: 2ms  ← 117x faster

Performance Improvement:
- Query time: 234ms → 2ms (99% improvement)
- Index size: 45MB (acceptable)
- Write impact: negligible

Deployment:
1. Add index in migration (non-blocking on PostgreSQL)
2. Monitor query performance for 1 hour
3. Confirm no regressions
```
