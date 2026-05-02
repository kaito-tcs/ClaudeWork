---
description: Write integration tests (DB + HTTP) for endpoints and workflows
argument-hint: "[feature-or-endpoint]"
---

# /write-integration-tests

## Purpose
Write integration tests that use real database, HTTP client, and dependencies. Test end-to-end request/response, database state changes, and error flows. Slower than unit tests but more realistic.

## When to Use
- Testing API endpoints
- Testing workflows spanning multiple services
- Database interactions (queries, migrations)
- Before merge/deployment

## Inputs
- Endpoint or workflow to test (e.g., POST /api/orders)
- Test database setup (fixtures)
- Known edge cases (payment failures, stock limits)

## Workflow
1. **test-engineer** sets up test database and fixtures
2. **test-engineer** writes tests using test client (TestClient for FastAPI, Django TestCase)
3. **test-engineer** tests happy path, error cases, side effects (DB changes)
4. **test-engineer** uses transaction rollback to isolate tests
5. All tests pass and database state is clean
6. Coverage measured end-to-end

## Outputs
- Integration test file: `tests/integration/test_<feature>.py`
- Test fixtures for setup (users, products, etc.)
- Tests cover: happy path, validation errors, auth errors, DB state changes
- Test database isolation (transaction rollback per test)
- All tests passing

## Quality Gates
- All integration tests pass
- Database state is correct after test (verify rows inserted/updated)
- Tests are independent (can run in any order)
- Test data is realistic (mimics production scenarios)
- Tests complete in < 2s each (acceptable for integration tests)

## Example
```
/write-integration-tests "POST /api/v1/orders"

Integration tests written: tests/integration/test_orders.py

Test fixtures:
- create_test_user(): generates test user in DB
- create_test_products(): generates test products
- auth_client(): HTTP client with auth token

Test cases:
1. test_create_order_success
   - Setup: create user, 2 products
   - Action: POST /orders with user's products
   - Verify: order created in DB, correct total, status = "pending"

2. test_create_order_invalid_product
   - Setup: create user
   - Action: POST /orders with non-existent product_id
   - Verify: 400 Bad Request, no order created

3. test_create_order_no_auth
   - Setup: none
   - Action: POST /orders without auth token
   - Verify: 401 Unauthorized

4. test_create_order_updates_inventory
   - Setup: create user, product with qty=10
   - Action: POST /orders with qty=3
   - Verify: product.qty = 7 in DB

All tests passing: 4/4
Run time: 1.2s (includes DB operations)
DB state clean: all data rolled back after each test
```
