---
description: Bundle analysis, code-splitting plan, and optimizations
argument-hint: "[size-target]"
---

# /optimize-bundle

## Purpose
Analyze bundle size, identify large imports, plan code-splitting, and implement tree-shaking. Reduce initial JS and improve Core Web Vitals (LCP, FID).

## When to Use
- Bundle size > 300KB (uncompressed)
- Slow initial page load
- Before production release
- Regular performance audits (quarterly)

## Inputs
- Target bundle size (default 300KB)
- Entry points (pages, lazy routes)
- Performance budget (max KB per route)

## Workflow
1. **frontend-performance-engineer** runs bundle analysis: `next/bundle-analyzer` or `vite-plugin-visualizer`
2. **frontend-performance-engineer** identifies large dependencies and unused code
3. **Decision point**: Code-split by route, vendor chunks, or both?
4. **nextjs-engineer** or **react-engineer** implements dynamic imports for routes and heavy components
5. **frontend-performance-engineer** re-measures and confirms improvements
6. Performance budget added to CI (fail on overage)

## Outputs
- Bundle analysis report: `docs/bundle-analysis.md`
- Code-splitting plan: which routes lazy-load, which dependencies tree-shake
- Updated build config with performance optimizations
- CI check: bundle size limit enforced
- Before/after metrics (KB, gzip, time to interactive)

## Quality Gates
- Initial JS bundle < 300KB (gzipped)
- Dynamic imports reduce initial load by 30%+
- No critical dependencies missed in code-split
- Performance budget enforced in CI
- Lighthouse score improved (FID, LCP, CLS)

## Example
```
/optimize-bundle

Bundle Analysis:
Initial: 520 KB → Target: 250 KB (gzipped)

Large deps found:
- lodash (45 KB) → replace with lodash-es
- moment (67 KB) → replace with date-fns
- unused Material-UI components (89 KB)

Code-splitting plan:
- Route /dashboard lazy-loads (saves 120 KB initial)
- ProductDetail component lazy-loads (saves 45 KB)
- Dynamic imports for heavy libs (charts, editors)

After optimization: 250 KB gzipped

Performance gains:
- LCP: 3.2s → 2.1s
- FID: 120ms → 60ms
- Bundle size check added to CI
```
