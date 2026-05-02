---
description: Add Redis caching with stampede protection and invalidation
argument-hint: "[cache-strategy]"
---

# /add-caching

## Purpose
Implement Redis caching for hot data: cache-aside pattern, cache stampede protection (locks), TTL settings, and cache invalidation strategy. Reduce database load.

## When to Use
- Frequently accessed, slow queries (e.g., product list with filters)
- User profile data
- Session storage
- API responses that don't change often

## Inputs
- Data to cache (e.g., products list, user profile)
- Cache TTL (e.g., 1 hour for products, 15 min for user)
- Cache strategy: cache-aside or write-through

## Workflow
1. **caching-engineer** identifies cacheable data and access patterns
2. **database-engineer** measures query performance (identify bottlenecks)
3. **Decision point**: Cache-aside (lazy) or write-through (eager)? Single key or nested?
4. **caching-engineer** implements cache helper: get_or_fetch, set_cache, invalidate
5. **backend-engineer** applies caching to hotspots (product list, user profile)
6. **caching-engineer** adds stampede protection: use locks on cache misses
7. **test-engineer** writes cache tests: hit, miss, expiry, invalidation
8. Monitoring: cache hit rate, evictions

## Outputs
- Cache utility: `app/cache.py` with get_or_fetch, set_cache, invalidate
- Stampede protection: distributed lock on cache misses
- Cache invalidation triggers: on data update, delete endpoints
- Cache monitoring: hit rate, eviction count
- Cache tests: hit/miss, TTL expiry, invalidation

## Quality Gates
- Cache reduces query count (measure before/after)
- Cache stampede handled (no thundering herd on key expiry)
- Cache invalidation correct (update user → invalidate user cache)
- No stale data served (TTL appropriate)
- Cache misses don't break the app (fallback to DB query)

## Example
```
/add-caching cache-aside

Cache setup:
- Redis connection pool initialized
- Cache key pattern: product::<id>, user::<id>, products::search::<query_hash>

Stampede protection:
- Use distributed lock on cache miss
- Only one worker fetches from DB
- Others wait for lock or timeout to DB

Example implementation:
def get_product_cached(product_id: str):
  cache_key = f"product::{product_id}"
  
  # Try cache first
  cached = redis.get(cache_key)
  if cached:
    return json.loads(cached)
  
  # Cache miss: acquire lock, fetch from DB, cache
  with redis.lock(f"{cache_key}::lock", timeout=5):
    # Double-check pattern
    cached = redis.get(cache_key)
    if cached:
      return json.loads(cached)
    
    product = db.query(Product).filter(id=product_id).first()
    if product:
      redis.setex(cache_key, 3600, json.dumps(product.dict()))
    return product

Cache invalidation:
- On PUT /products/{id}: invalidate product::{id}
- On DELETE /products/{id}: invalidate product::{id} and products::search::*

Metrics: cache hit rate, evictions, avg TTL
```
