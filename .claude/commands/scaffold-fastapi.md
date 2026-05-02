---
description: FastAPI + Pydantic v2 + async SQLAlchemy + Alembic scaffold
argument-hint: "[project-name]"
---

# /scaffold-fastapi

## Purpose
Create a production-ready FastAPI project: async SQLAlchemy, Pydantic v2 validation, Alembic migrations, pytest suite, Docker, environment config, and GitHub Actions.

## When to Use
- Starting new FastAPI backend
- Modern async Python API needed
- Full-stack project requiring async BE

## Inputs
- Project name
- Database: postgres (default) or mysql
- Include Docker setup — default yes
- Include authentication stub — default yes

## Workflow
1. **fastapi-specialist** creates project structure: `backend/`, `app/`, `models/`, `schemas/`, `migrations/`
2. **python-engineer** sets up FastAPI app, async SQLAlchemy, Pydantic v2
3. **database-engineer** configures Alembic for migrations
4. **authentication-engineer** adds OAuth2/JWT stubs
5. **test-engineer** adds pytest fixtures and example tests
6. **docker-engineer** creates Dockerfile and docker-compose.yml
7. **ci-cd-engineer** adds GitHub Actions for lint, type-check, test
8. Project initialized with README, API docs at /docs, and environment template

## Outputs
- FastAPI project at `backend/` with full structure
- `app/main.py` — FastAPI app initialization
- `app/models/` — SQLAlchemy ORM models
- `app/schemas/` — Pydantic v2 request/response schemas
- `app/api/routes/` — API endpoint modules
- `migrations/` — Alembic migration files
- `tests/` — pytest test suite
- `Dockerfile` — multi-stage build
- `docker-compose.yml` — app + postgres + redis
- `.env.example` — required environment variables
- `pyproject.toml` — dependencies and config
- GitHub Actions: lint, test, deploy workflows

## Quality Gates
- `ruff check .` passes (linting)
- `pyright .` passes (type-checking)
- `pytest` all tests pass
- `docker build .` succeeds
- `docker-compose up` runs without errors
- OpenAPI docs accessible at /docs

## Example
```
/scaffold-fastapi "ecommerce-api"

Project created: backend/

Key files:
- app/main.py (FastAPI initialization)
- app/models/user.py, product.py, order.py
- app/schemas/user.py (Pydantic v2)
- app/api/routes/products.py, orders.py
- migrations/ (Alembic)
- tests/test_products.py
- Dockerfile (multi-stage)
- docker-compose.yml (app + postgres + redis)

Commands ready:
pip install -e .
alembic upgrade head
pytest
docker-compose up

API docs: http://localhost:8000/docs
```
