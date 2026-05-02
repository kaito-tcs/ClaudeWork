---
description: Next.js 15 App Router scaffold with TypeScript, Tailwind, testing
argument-hint: "[project-name]"
---

# /scaffold-nextjs

## Purpose
Create a production-ready Next.js 15 (App Router) project scaffold: TypeScript, Tailwind CSS, ESLint, Prettier, Vitest, Playwright, and GitHub Actions. Ready for immediate feature work.

## When to Use
- Starting a new Next.js project
- FE team needs modern baseline
- Full-stack project needing FE scaffold

## Inputs
- Project name
- Package manager preference (npm, pnpm, yarn) — default pnpm
- Additional integrations (Auth0, next-intl, etc.) — optional

## Workflow
1. **nextjs-engineer** runs `create-next-app@latest` with:
   - App Router (default)
   - TypeScript: yes
   - Tailwind: yes
   - ESLint: yes
   - Next.js examples: no
2. **typescript-specialist** adds strict tsconfig, prettier config, import aliases
3. **test-engineer** adds Vitest + React Testing Library + Playwright setup
4. **css-engineer** adds Tailwind plugins (forms, typography, dark mode)
5. **ci-cd-engineer** adds GitHub Actions for lint, type-check, test, build
6. Project initialized with README, contributing guide, and environment template

## Outputs
- Next.js 15 project at `frontend/` with full config
- `next.config.js` (optimized)
- `.env.example` with required vars
- `vitest.config.ts` for unit testing
- `playwright.config.ts` for E2E testing
- `tsconfig.json` with strict mode
- GitHub Actions workflows: lint, test, deploy
- README with setup, development, deployment instructions

## Quality Gates
- `npm run lint` passes (eslint + prettier)
- `npm run type-check` passes (TypeScript strict)
- `npm run test` runs all unit tests
- `npm run e2e` runs Playwright tests
- `npm run build` succeeds with no errors or warnings
- GitHub Actions workflow defined and tested

## Example
```
/scaffold-nextjs "product-discovery"

Project created at: frontend/

Config files:
- tsconfig.json (strict)
- tailwind.config.ts (with plugins)
- vitest.config.ts
- playwright.config.ts
- .eslintrc.json
- .prettierrc

Scripts ready:
npm run dev          (next dev)
npm run build        (next build)
npm run lint         (eslint + prettier)
npm run type-check   (tsc)
npm run test         (vitest)
npm run e2e          (playwright test)

GitHub Actions: .github/workflows/ci.yml
```
