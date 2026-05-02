---
description: Add token-bucket rate limiting with per-user and per-route policies
argument-hint: "[rate-limit-config]"
---

# /add-rate-limiting

## Purpose
Implement rate limiting: token-bucket algorithm, per-user and per-route limits, clear error messages, and graceful degradation. Prevent API abuse and protect service.

## When to Use
- Public API with auth-optional endpoints
- Expensive operations (payments, search)
- Preventing denial-of-service attacks

## Inputs
- Global rate limit (e.g., 100 req/min per user)
- Per-endpoint limits (e.g., /auth/login 5 req/min, /search 50 req/min)
- Anonymous user limit (if allowed, e.g., 10 req/min)

## Workflow
1. **security-engineer** designs rate limit policy: global, per-endpoint, per-user
2. **backend-engineer** implements token-bucket algorithm in Redis
3. **Decision point**: Redis or in-memory? Per-user or per-IP? Sliding window or fixed window?
4. **backend-engineer** adds rate limit middleware or decorator
5. **lead-backend-engineer** applies limits to endpoints
6. **test-engineer** writes rate limit tests: within limit (200), exceeded (429)
7. Monitoring: rate limit violations per endpoint

## Outputs
- Rate limit middleware: `app/middleware/rate_limit.py`
- Token-bucket implementation in Redis
- Per-endpoint rate limit configuration
- 429 Too Many Requests response with Retry-After header
- Rate limit tests: under limit, at limit, over limit

## Quality Gates
- Requests within limit succeed (200)
- Requests exceeding limit rejected (429)
- Retry-After header provided
- Rate limits configurable per endpoint
- No false positives (legitimate traffic not blocked)

## Example
```
/add-rate-limiting

Rate Limit Configuration:
- Global: 100 req/min per user, 30 req/min per anonymous IP
- POST /auth/login: 5 req/min per IP (brute force protection)
- GET /search: 50 req/min per user
- POST /orders: 10 req/min per user

Middleware:
@app.middleware("http")
async def rate_limit_middleware(request: Request, call_next):
  user_id = request.user.id if request.user else request.client.ip
  key = f"rate_limit::{user_id}"
  
  count = redis.incr(key)
  if count == 1:
    redis.expire(key, 60)  # 1 minute window
  
  if count > limit:
    return JSONResponse(
      status_code=429,
      headers={"Retry-After": str(60 - (time.time() % 60))},
      content={"error": "Rate limit exceeded"}
    )
  
  return await call_next(request)

Per-endpoint override:
@app.post("/auth/login", dependencies=[Depends(rate_limit(5))])
async def login(credentials: LoginRequest):
  ...

Tests:
- test_rate_limit_allows_requests_within_limit (200)
- test_rate_limit_rejects_excess_requests (429)
- test_retry_after_header_present
```
