---
description: Add OAuth2, JWT, or session-based authentication
argument-hint: "[auth-type]"
---

# /add-auth

## Purpose
Implement authentication: OAuth2 with JWT (stateless), or session+CSRF (stateful). Includes password hashing (Argon2), MFA hooks, and protected endpoints.

## When to Use
- Adding user accounts and login
- Securing all protected endpoints
- Multi-tenant or permission-based access needed

## Inputs
- Auth type: oauth2 (JWT) or session (default oauth2)
- Password hashing: Argon2 (default)
- MFA support: yes/no (default yes, with hooks only)
- Third-party providers: Google, GitHub, etc. (optional)

## Workflow
1. **authentication-engineer** designs auth flow: login → token → request with auth header
2. **security-engineer** chooses secure defaults: Argon2 hashing, secure cookie flags, CSRF tokens
3. **Decision point**: Stateless (JWT) or stateful (session)? Single provider or multiple?
4. **fastapi-specialist** or **django-specialist** implements auth endpoints: register, login, refresh
5. **authentication-engineer** adds JWT validation middleware/decorator
6. **security-engineer** adds CSRF protection (if session-based)
7. **test-engineer** writes auth tests: login, invalid credentials, expired token
8. OpenAPI updated with Bearer token scheme

## Outputs
- Auth endpoints: POST /auth/register, POST /auth/login, POST /auth/refresh
- Password hashing with Argon2
- JWT token generation and validation
- Protected endpoint decorator/dependency (requires auth)
- CSRF middleware (if session-based)
- MFA hooks (optional, for future implementation)
- OpenAPI schema with Bearer token
- Auth tests: valid login, invalid password, expired token

## Quality Gates
- Login endpoint returns access + refresh tokens
- Protected endpoints require Bearer token
- Invalid tokens rejected (401)
- Passwords hashed with Argon2 (never plain text)
- CSRF protection enabled (if session-based)
- Refresh token extends session
- Tests cover happy path and error cases

## Example
```
/add-auth oauth2

Auth endpoints created:
- POST /auth/register: { email, password } → { user_id, access_token, refresh_token }
- POST /auth/login: { email, password } → { access_token, refresh_token }
- POST /auth/refresh: { refresh_token } → { access_token }

JWT scheme:
- Header: Authorization: Bearer <token>
- Payload: { user_id, email, role, exp }

Protected endpoint example:
@app.get("/me", dependencies=[Depends(get_current_user)])
async def get_profile(user = Depends(get_current_user)):
  return user

Password hashing: Argon2
Token expiry: 15min access, 7 days refresh

Tests: tests/test_auth.py
- test_register_success
- test_login_success
- test_login_invalid_password
- test_protected_endpoint_no_auth (401)
- test_refresh_token_success
```
