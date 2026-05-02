---
description: Add role-based access control (RBAC) with decorators
argument-hint: "[role-list]"
---

# /add-rbac

## Purpose
Implement role-based access control: define roles (admin, seller, buyer), assign permissions, and protect endpoints with role checks. Enable fine-grained authorization.

## When to Use
- Multi-role system (admin, user, moderator, etc.)
- Different users have different permissions
- Before shipping feature with multiple user types

## Inputs
- List of roles (e.g., admin, seller, buyer, support)
- Permissions per role (or let authorization-engineer define)
- Database model for roles (or use enum)

## Workflow
1. **lead-architect** defines roles and permissions matrix
2. **security-engineer** maps permissions to endpoints
3. **Decision point**: Role inheritance (admin includes user)? Or flat?
4. **python-engineer** or **django-specialist** creates role/permission models
5. **authentication-engineer** adds role check middleware or decorator
6. **lead-backend-engineer** applies @require_role decorator to endpoints
7. **test-engineer** writes RBAC tests: user with role can access, without role gets 403
8. Admin interface updated to assign roles

## Outputs
- Role/Permission models in database
- Decorator or dependency: @require_role('admin') or Depends(check_role('seller'))
- Role assignment endpoint: POST /admin/users/{id}/role
- Admin interface to manage roles
- RBAC tests: valid role (200), invalid role (403), no auth (401)

## Quality Gates
- All protected endpoints have role checks
- Role-protected endpoints return 403 (not 401) when role missing
- Admin can assign/revoke roles
- Tests verify role permissions
- No privilege escalation vulnerabilities

## Example
```
/add-rbac admin seller buyer

Roles created:
- admin: all permissions
- seller: create products, manage orders, view analytics
- buyer: search products, create orders, view own orders
- support: view all orders, respond to tickets

Permission checks:
@app.post("/api/v1/products")
@require_role("seller")
async def create_product(product: ProductCreate, user = Depends(get_current_user)):
  ...

@app.get("/api/v1/admin/users")
@require_role("admin")
async def list_users():
  ...

Decorator behavior:
- Role matches: proceed (200)
- Role missing: return 403 Forbidden
- Not authenticated: return 401 Unauthorized

Tests: tests/test_rbac.py
- test_seller_can_create_product (200)
- test_buyer_cannot_create_product (403)
- test_anonymous_cannot_create_product (401)
```
