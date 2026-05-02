---
description: Create a typed REST endpoint with validation, tests, OpenAPI
argument-hint: "[endpoint-path and method]"
---

# /create-endpoint

## Purpose
Implement a single REST endpoint: FastAPI/Django route, Pydantic/serializer request/response schema, database query, error handling, and test. Endpoint is validated, documented, and tested.

## When to Use
- Implementing user story with API requirement
- Adding new endpoint to existing API
- FE needs new endpoint to proceed

## Inputs
- Endpoint path and HTTP method (e.g., POST /api/v1/orders)
- Request body schema (if POST/PUT)
- Response schema (success and error cases)
- Database dependencies (which models to query)
- Authentication required (optional, default yes)

## Workflow
1. **api-designer** defines endpoint contract: request/response shapes
2. **lead-backend-engineer** designs database query and error cases
3. **Decision point**: Need DB transaction? Rate limiting? Async task?
4. **fastapi-specialist** or **django-specialist** implements endpoint with validation
5. **database-engineer** ensures efficient queries (no N+1)
6. **test-engineer** writes unit and integration tests
7. **code-reviewer** reviews for security (injection, validation, auth)
8. Endpoint documented in OpenAPI spec (auto-generated)

## Outputs
- Endpoint handler: `app/api/routes/<resource>.py` (FastAPI) or `<app>/views.py` (Django)
- Request schema: Pydantic model or DRF serializer
- Response schema: Pydantic model or DRF serializer
- Database queries optimized and tested
- Unit tests: test schema validation, edge cases
- Integration tests: test HTTP request/response cycle
- OpenAPI documentation auto-generated

## Quality Gates
- Endpoint accepts valid request and returns correct response
- Validation errors return 400 with clear message
- Authorization checked (401 if not auth, 403 if forbidden)
- No N+1 queries (check with explain/profile)
- Tests cover happy path, validation errors, auth errors
- Type-safe (no any types, full Pydantic/serializer usage)
- OpenAPI spec updated

## Example
```
/create-endpoint "POST /api/v1/orders"

Endpoint created: app/api/routes/orders.py

Request schema:
class CreateOrderRequest(BaseModel):
  user_id: str
  items: list[OrderItem]  # product_id, qty

Response schema (201):
class OrderResponse(BaseModel):
  id: str
  user_id: str
  total: float
  status: str = "pending"

Error cases:
- 400: invalid items or user_id
- 401: not authenticated
- 403: user_id not own user
- 500: payment failed

Tests: tests/test_orders.py
- test_create_order_success (200 created)
- test_create_order_invalid_items (400)
- test_create_order_no_auth (401)

Coverage: 87%
OpenAPI: /docs
```
