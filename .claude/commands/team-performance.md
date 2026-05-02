---
description: Performance optimization (FE + BE + DB coordinated)
argument-hint: "[target-metric]"
---

# /team-performance

## Purpose
Coordinated performance improvement: frontend-performance-engineer optimizes bundle/rendering, backend-performance-engineer optimizes API/queries, database-engineer optimizes indexes/queries. Measure impact end-to-end.

## When to Use
- User reports slow app
- Performance regression detected
- Before major feature launch
- Quarterly performance review

## Inputs
- Metric to improve (LCP, latency, throughput, cost)
- Baseline measurement
- Target (e.g., LCP < 2.5s)

## Workflow
1. **frontend-performance-engineer** measures bundle size, render time, Core Web Vitals
2. **backend-performance-engineer** profiles API endpoints (latency, throughput)
3. **database-engineer** analyzes slow queries (EXPLAIN, indexes)
4. **team** identifies bottlenecks (client, server, or DB)
5. **team** implements optimizations in parallel
6. **team** measures improvement and validates targets met

## Outputs
- Performance baseline (before metrics)
- Bottleneck analysis (where time is spent)
- Optimization plan (FE, BE, DB changes)
- Results (after metrics and improvement %)
- Ongoing monitoring

## Quality Gates
- Baseline measurements taken
- Bottlenecks identified
- Improvements measured
- Target metric achieved
- No new performance regressions

## Example
```
/team-performance "product search latency"

Baseline Measurements:

Frontend:
  - Bundle size: 450KB (gzip 120KB)
  - Search page LCP: 3.8s
  - Time to Interactive: 4.2s

Backend:
  - GET /api/v1/products?q=... latency: 850ms (p95)
  - API throughput: 10 req/sec
  - DB queries per request: 5

Database:
  - Search query: 450ms (sequential scan on 1M rows)
  - No index on product name/description

Target Metrics:
  - Search page LCP: 2.5s (target)
  - API latency: 200ms (target)
  - DB query: 50ms (target)

Optimization Plan:

Frontend (1 day):
  - Code-split search components (lazy load)
  - Defer non-critical JS
  - Optimize hero image (WebP, responsive)
  Expected: LCP 3.8s → 2.8s

Backend (1 day):
  - Add pagination (limit 20, offset)
  - Cache frequent queries (Redis)
  - Add rate limiting
  Expected: API latency 850ms → 150ms

Database (0.5 day):
  - Create index on (product_name, created_at)
  - Analyze query plan
  Expected: Search query 450ms → 30ms

Implementation:

Frontend:
  ✓ Code-split ProductSearch component
  ✓ Image optimization (WebP, srcset)
  ✓ Defer non-critical JS
  Result: LCP 3.8s → 2.2s ✓

Backend:
  ✓ Add pagination to /api/products
  ✓ Cache results in Redis (TTL 1h)
  ✓ Add rate limiting (50 req/min)
  Result: API latency 850ms → 120ms ✓

Database:
  ✓ Create index idx_products_name_created
  ✓ Verify index usage (EXPLAIN shows index scan)
  Result: Query time 450ms → 25ms ✓

Final Measurements:

Frontend:
  - Bundle size: 450KB → 350KB (-22%)
  - Search page LCP: 3.8s → 2.2s (-42%) ✓ TARGET MET
  - Time to Interactive: 4.2s → 2.8s

Backend:
  - API latency: 850ms → 120ms (-86%) ✓ TARGET MET
  - Throughput: 10 req/sec → 50 req/sec (+400%)
  - Cache hit rate: 85%

Database:
  - Search query: 450ms → 25ms (-94%) ✓ TARGET MET
  - Index size: 45MB
  - Query plan: now uses index

Monitoring:

Added alerts:
  - Search page LCP > 3s (warn)
  - API latency > 300ms (alert)
  - Cache hit rate < 70% (warn)

Results Summary:

Overall page load improvement:
  - Before: 3.8s
  - After: 2.2s
  - Improvement: 42% faster ✓

User impact:
  - Reduced bounce rate (faster pages = better engagement)
  - Improved conversion (checkout faster)
  - Better search experience

Status: PERFORMANCE OPTIMIZED ✓
```
