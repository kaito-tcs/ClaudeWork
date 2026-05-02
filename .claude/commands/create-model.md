---
description: Create ORM model, migration, CRUD, admin, and tests
argument-hint: "[model-name]"
---

# /create-model

## Purpose
Create a database model: SQLAlchemy/Django ORM class, Alembic/Django migration, CRUD operations, admin interface, Pydantic/serializer, and tests.

## When to Use
- Adding new entity to data model
- Every story with new persistent data
- Before creating endpoints that need the model

## Inputs
- Model name (PascalCase, e.g., Product)
- Fields with types (name: str, price: float, etc.)
- Relationships to other models (optional)
- Unique/required constraints
- Optional: soft delete, timestamps, audit fields

## Workflow
1. **database-engineer** designs model fields and relationships
2. **lead-backend-engineer** determines indexes and constraints
3. **Decision point**: Need soft deletes, timestamps, or other base fields?
4. **python-engineer** or **django-specialist** implements ORM model
5. **database-engineer** creates migration (Alembic/Django)
6. **lead-backend-engineer** implements CRUD helpers or viewsets
7. **test-engineer** writes model tests (validation, relationships, queries)
8. **admin-contributor** adds Django admin (if applicable)

## Outputs
- ORM model: `app/models/<model>.py` (FastAPI) or `<app>/models.py` (Django)
- Pydantic schema: `app/schemas/<model>.py` (FastAPI) or DRF serializer
- Migration: `migrations/xxx_create_<model>.py`
- CRUD helpers or viewset: `app/crud/<model>.py` or viewset
- Admin interface: registered in `admin.py` (Django)
- Tests: `tests/test_models.py` and `tests/test_crud.py`

## Quality Gates
- Model creation migration is reversible
- Migration applies cleanly on fresh DB
- CRUD operations tested (create, read, update, delete)
- Relationships work correctly
- Validation works (required fields, type checking)
- Admin interface shows model data
- No N+1 queries in CRUD operations

## Example
```
/create-model "Product"

Model created: app/models/product.py
  class Product(Base):
    id: int
    name: str
    description: str
    price: float
    seller_id: int (FK → User)
    status: str = "active"
    created_at: datetime
    updated_at: datetime

Migration: migrations/002_create_product.py
Pydantic schema: app/schemas/product.py
  ProductResponse: { id, name, price, seller_id, status }

CRUD: app/crud/product.py
  - create_product(db, name, price, seller_id)
  - get_product(db, id)
  - update_product(db, id, **updates)
  - delete_product(db, id)

Admin: products/admin.py registered
Tests: tests/test_product_model.py (validation, relationships)
Coverage: 82%
```
