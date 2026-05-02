---
description: Generate release notes from commits and PRs
argument-hint: "[version-tag]"
---

# /release-notes

## Purpose
Create release notes from git commits and pull request metadata: summarize features, fixes, security updates, and breaking changes. Share with customers and team.

## When to Use
- Before releasing new version
- Every sprint or milestone
- Documenting historical changes

## Inputs
- Version tag (e.g., v2.1.0)
- Previous version tag (for diff)
- Optional: custom highlights or known issues

## Workflow
1. **product-director** or **engineering-manager** determines scope (what features/fixes included)
2. **devops-engineer** generates commit log: `git log v2.0.0..v2.1.0`
3. **devops-engineer** or **automation** parses PR titles and links
4. **product-director** writes summary: theme, highlights, migration notes
5. **tech-director** adds breaking changes and upgrade instructions
6. **product-director** writes customer-friendly language (no jargon)
7. Release notes published to GitHub, website, email

## Outputs
- Release notes file: `CHANGELOG.md` or `docs/releases/v2.1.0.md`
- GitHub release with notes
- Customer email announcement (if major release)
- Migration guide (if breaking changes)

## Quality Gates
- All significant changes included
- Grouped by category: features, fixes, security, breaking changes
- Clear language (non-technical customers can understand)
- Upgrade path documented
- Known issues called out

## Example
```
/release-notes v2.1.0

Release Notes Generated:

Version 2.1.0 - May 2, 2026

Highlights:
- Product search with AI recommendations
- Real-time inventory sync
- Improved checkout experience
- Performance improvements (40% faster page loads)

Features:
- [#82] Full-text search with filters (price, rating, category)
- [#91] AI-powered product recommendations
- [#104] Wishlist feature (save products for later)
- [#112] Real-time inventory updates (WebSocket)
- [#125] Mobile app deep linking support

Fixes:
- [#88] Fix checkout page timeout on slow networks
- [#95] Fix cart not updating after login
- [#108] Fix email confirmation not sending for some users
- [#119] Fix product images not loading in Firefox

Security Updates:
- [#116] Upgrade Django to 4.2.8 (CVE-2024-XXXXX patch)
- [#117] Add CSRF token validation to all forms

Performance:
- [#100] Code-split checkout (saved 50KB)
- [#107] Cache product recommendations (90% hit rate)
- [#118] Optimize database queries (N+1 fix)
- Page load time: 3.2s → 1.9s (40% faster)
- LCP: green on Lighthouse

Breaking Changes:
- API `/api/v1/search` now requires `?limit` param (max 100)
  Old: GET /api/v1/search?q=laptop
  New: GET /api/v1/search?q=laptop&limit=20
  Deprecation: v1.0 deprecated 2026-01-01, removed in v2.1.0

Migration Guide:
- If using /api/v1/search: add &limit=20 to requests
- Database: run `manage.py migrate` (schema change for recommendations)
- Configuration: see UPGRADE.md for new env variables

Known Issues:
- Recommendations feature has latency on first request (cold start)
  Workaround: feature disabled by default, opt-in in settings

Contributors:
- Alice (lead product)
- Bob (backend)
- Charlie (frontend)
- Diana (QA)

Download v2.1.0:
- Docker: docker pull myapp:v2.1.0
- GitHub: releases/tag/v2.1.0
- npm: npm install @myapp/client@2.1.0

Changelog: CHANGELOG.md (full history)
```
