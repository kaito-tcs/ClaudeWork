---
description: Django 5 + DRF + PostgreSQL + Celery + pytest scaffold
argument-hint: "[project-name]"
---

# /scaffold-django

## Purpose
Create a production-ready Django project: Django Rest Framework, async views, PostgreSQL, Celery background tasks, pytest, Docker, and GitHub Actions.

## When to Use
- Django ecosystem preferred
- Complex ORM queries and admin interface needed
- Mature project with legacy Django experience

## Inputs
- Project name
- Create Django super-user — default no
- Include Celery tasks — default yes
- Include Docker setup — default yes

## Workflow
1. **django-specialist** creates project and apps: `backend/`, manage Django structure
2. **database-engineer** configures PostgreSQL connection, async support
3. **api-designer** sets up Django Rest Framework serializers and viewsets
4. **task-queue-engineer** adds Celery with Redis broker
5. **test-engineer** adds pytest-django fixtures and tests
6. **docker-engineer** creates Dockerfile and docker-compose.yml
7. **ci-cd-engineer** adds GitHub Actions workflows
8. Project initialized with README, API docs, and admin interface

## Outputs
- Django project at `backend/` with DRF apps
- `manage.py` — Django management
- `<project>/settings.py` — configuration (12-factor, environment-based)
- `<project>/urls.py` — URL routing
- `<app>/models.py` — ORM models
- `<app>/serializers.py` — DRF serializers (Pydantic-like)
- `<app>/views.py` or `<app>/viewsets.py` — API views
- `<app>/tasks.py` — Celery tasks
- `tests/test_*.py` — pytest suite
- `Dockerfile` and `docker-compose.yml`
- `.env.example`
- GitHub Actions: lint, test, deploy

## Quality Gates
- `ruff check .` passes
- `mypy .` passes
- `pytest` all tests pass with >80% coverage
- `python manage.py makemigrations --check` no missing migrations
- `docker build .` succeeds
- Admin interface accessible

## Example
```
/scaffold-django "ecommerce-api"

Project created: backend/

Key files:
- ecommerce/settings.py (env-based config)
- ecommerce/urls.py (main router)
- users/models.py, serializers.py, views.py
- products/models.py, serializers.py, viewsets.py
- orders/models.py, serializers.py, viewsets.py
- orders/tasks.py (Celery tasks)
- tests/test_users.py, test_products.py

Commands:
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
celery -A ecommerce worker
pytest

Docker:
docker-compose up

Admin: http://localhost:8000/admin
API: http://localhost:8000/api
```
