---
description: Core Web Vitals audit and optimization plan
argument-hint: "[url]"
---

# /audit-cwv

## Purpose
Audit Core Web Vitals (LCP, FID, CLS) using Lighthouse CI and Web Vitals, identify bottlenecks, and create optimization plan. Target: all green (good) on Lighthouse.

## When to Use
- Before production release
- Performance regression noticed
- Quarterly performance audit
- Meeting SLA requirements

## Inputs
- Production or staging URL
- Device type (mobile, desktop, or both)
- Network throttling (default: 4G)

## Workflow
1. **frontend-performance-engineer** runs Lighthouse CI on URL
2. **frontend-performance-engineer** profiles with Chrome DevTools (Network, Performance)
3. **Decision point**: Which metric is worst (LCP, FID, CLS)? What's the root cause?
4. **frontend-performance-engineer** creates optimization plan per metric
5. **react-engineer** and **nextjs-engineer** implement fixes (images, fonts, rendering)
6. **frontend-performance-engineer** re-measures and confirms improvement
7. Report written to `docs/cwv-audit.md`

## Outputs
- `docs/cwv-audit.md` — baseline metrics, bottlenecks, fixes applied, new metrics
- Lighthouse report (HTML) saved to docs/
- Performance optimization plan with before/after numbers
- Recommendations for ongoing monitoring

## Quality Gates
- LCP < 2.5s
- FID < 100ms (or INP < 200ms for newer metric)
- CLS < 0.1
- All three metrics in "green" (Lighthouse)
- All optimizations have measurable impact

## Example
```
/audit-cwv https://myapp.example.com

Baseline (Mobile):
- LCP: 4.2s (needs fix, target < 2.5s)
- FID: 145ms (needs fix, target < 100ms)
- CLS: 0.18 (needs fix, target < 0.1)
- Lighthouse Score: 42/100

Bottlenecks Found:
- Hero image 850KB (not optimized) → LCP issue
- JavaScript bundle 450KB blocks rendering → FID issue
- No layout shift prevention → CLS issue

Fixes Applied:
1. Optimize hero image (WebP, responsive) → LCP now 2.1s
2. Code-split heavy routes → FID now 85ms
3. Add size attributes to images → CLS now 0.05

After Optimization (Mobile):
- LCP: 2.1s (green)
- FID: 85ms (green)
- CLS: 0.05 (green)
- Lighthouse Score: 92/100

Recommendations:
- Monitor with Web Vitals API in production
- Set performance budget in CI
- Re-audit quarterly
```
