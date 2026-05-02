---
description: Create a safe DB migration (online schema change pattern)
argument-hint: "[migration-description]"
---

# /create-migration

## Purpose
Design and execute a database migration safely: use online schema change patterns, test reversibility, handle data backfills, and verify no downtime.

## When to Use
- Adding columns or indexes
- Renaming columns
- Changing column types
- Dropping columns (with care)
- Adding constraints or foreign keys

## Inputs
- Migration description (e.g., "add status column to orders")
- Current schema state
- Target schema state
- Data backfill requirements (optional)

## Workflow
1. **database-engineer** designs migration: forward and reverse operations
2. **lead-backend-engineer** identifies data dependencies or backfills needed
3. **Decision point**: Can this migrate without downtime? Need feature flag?
   - If risky, create feature flag to switch between old/new code
4. **database-engineer** writes migration: add column, backfill data, update constraints
5. **test-engineer** tests migration: forward and rollback on staging
6. **database-engineer** documents rollback procedure
7. Migration added to source control and ready for deploy

## Outputs
- Migration file: `migrations/xxx_<description>.py` (Alembic) or `migrations/<app>/xxx_<description>.py` (Django)
- Migration includes: forward operation, reverse operation, data backfill
- Rollback procedure documented
- Tested on staging database

## Quality Gates
- Migration runs without errors
- Reverse operation is tested (rollback works)
- No data loss (test with backup first)
- No production downtime (use online schema change if possible)
- Backward compatible with old code during deploy
- Indexes added for new queried columns

## Example
```
/create-migration "add status column to orders"

Migration: migrations/003_add_status_to_orders.py

Forward:
1. ALTER TABLE orders ADD COLUMN status VARCHAR(20)
2. UPDATE orders SET status = 'completed' WHERE fulfilled_at IS NOT NULL
3. UPDATE orders SET status = 'pending' WHERE fulfilled_at IS NULL
4. ALTER TABLE orders MODIFY status VARCHAR(20) NOT NULL DEFAULT 'pending'
5. CREATE INDEX idx_orders_status ON orders(status)

Reverse:
1. DROP INDEX idx_orders_status
2. ALTER TABLE orders DROP COLUMN status

Test Results:
- Forward on staging: OK (2.3s)
- Reverse on staging: OK (1.1s)
- Data integrity check: 100% match
- No lock conflicts on production-sized data (1M rows)

Rollback procedure: migrate down to previous version
```
