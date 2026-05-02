---
description: Design ER schema, indexes, and data ownership
argument-hint: "[spec-path or domain-name]"
---

# /design-data-model

## Purpose
Design the relational data model: entities, relationships, normalization, indexes, and constraints. Output is a schema diagram and migration template ready for implementation.

## When to Use
- Before any backend implementation
- Designing a new feature with persistent data
- Planning a major schema migration
- Data architecture review

## Inputs
- Feature spec or user stories
- Expected data volume and access patterns
- Retention policies (how long to keep data)
- Compliance requirements (GDPR, CCPA, etc.)

## Workflow
1. **database-engineer** identifies entities from spec: products, orders, users, payments, etc.
2. **lead-backend-engineer** defines relationships: 1:N, M:N, soft deletes?
3. **Decision point**: Normalization vs. denormalization? Should certain data be cached?
   - Document in ADR if choosing denormalization
4. **database-engineer** designs indexes for access patterns (search, filtering, sorting)
5. **database-engineer** adds constraints (unique, foreign keys, checks)
6. Schema diagram written to `docs/data-model/schema.md` with ER diagram
7. Initial migration template created in `backend/migrations/001_initial_schema.py`

## Outputs
- `docs/data-model/schema.md` — entities, relationships, constraints
- ER diagram (Mermaid or SVG)
- Index strategy: which columns to index and why
- Migration template: `backend/migrations/001_initial_schema.py` (Alembic/Django format)
- Data ownership matrix: which service writes which table

## Quality Gates
- All spec features have supporting tables
- Schema is normalized (no obvious redundancy)
- Indexes designed for expected query patterns
- Constraints prevent data corruption
- Migration is reversible and idempotent
- Column types chosen appropriately (text length limits, enums, etc.)

## Example
```
/design-data-model "E-commerce product listing"

Entities:
- users (id, email, name, created_at, deleted_at)
- products (id, name, description, price, seller_id, created_at)
- orders (id, user_id, total, status, created_at)
- order_items (id, order_id, product_id, qty, price)

Indexes:
- products (seller_id, name COLLATE, price) — search/filter
- orders (user_id, created_at DESC) — recent orders
- order_items (order_id, product_id) — UNIQUE constraint

Foreign Keys:
- products.seller_id → users.id (seller is a user)
- orders.user_id → users.id
- order_items.order_id → orders.id
- order_items.product_id → products.id

ER Diagram: docs/data-model/schema.mmd
Migration: backend/migrations/001_initial_schema.py
```
