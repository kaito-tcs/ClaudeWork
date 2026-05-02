---
description: Design REST/GraphQL API schema, error models, versioning
argument-hint: "[endpoint-list or spec-path]"
---

# /design-api

## Purpose
Design the API contract: endpoints, request/response shapes, error handling, and versioning strategy. Output is an OpenAPI spec (for REST) or GraphQL schema, ready to be implemented.

## When to Use
- Before building any API endpoints
- Defining FE/BE contract
- API-first development approach
- Planning API versioning strategy

## Inputs
- List of features needing API endpoints (from spec or stories)
- Frontend technology (REST or GraphQL preference)
- Expected scale and API rate limits
- Auth requirements (JWT, OAuth2, API key)

## Workflow
1. **api-designer** lists all endpoints from spec: GET /products, POST /orders, etc.
2. **lead-frontend-engineer** confirms request/response shapes match FE expectations
3. **Decision point**: REST or GraphQL? Versioning: URL path (/v1/) or header?
   - Document decision in ADR
4. **api-designer** writes OpenAPI spec (YAML) with all endpoints, request/response schemas, error codes
5. **authentication-engineer** adds auth scheme (Bearer JWT, OAuth2 scopes)
6. Spec written to `backend/openapi.yaml` or `backend/schema.graphql`
7. Generate mock server or SDK stubs for FE integration

## Outputs
- `backend/openapi.yaml` — complete REST API spec (or GraphQL schema)
- Error model documented: 400, 401, 403, 404, 429, 500 with example payloads
- Request/response examples for each endpoint
- Authentication scheme documented
- Rate limiting policy (if applicable)
- API versioning strategy documented

## Quality Gates
- All spec features have supporting endpoints
- Request/response shapes are concrete (no vague "object" types)
- Error responses include error code, message, and recovery hint
- Auth scheme defined (no endpoints without auth)
- Pagination documented (if applicable)
- OpenAPI spec validates against OpenAPI 3.1 schema

## Example
```
/design-api docs/spec/SPEC-2026-05-02.md

API Design: REST + OpenAPI 3.1, Bearer JWT auth

Endpoints:
- GET /api/v1/products?q=&limit=20&offset=0
  Response: { data: [{ id, name, price, rating }], total }
  
- POST /api/v1/orders
  Request: { user_id, items: [{ product_id, qty }] }
  Response: { id, total, status, created_at }
  Errors: 400 (validation), 401 (auth), 402 (payment)

Auth: Bearer JWT (user claims: user_id, role)
Rate Limit: 100 req/min per user

OpenAPI spec: backend/openapi.yaml
```
