---
description: Vite + React + TypeScript SPA scaffold with testing
argument-hint: "[project-name]"
---

# /scaffold-react-spa

## Purpose
Create a Vite + React 19 SPA scaffold: TypeScript, Tailwind CSS, routing (TanStack Router), state management hooks, Vitest, Playwright, and CI/CD. Best for non-Next.js projects.

## When to Use
- Need client-only SPA (no server rendering)
- Decoupled FE + API architecture
- Lightweight alternative to Next.js

## Inputs
- Project name
- Package manager (npm, pnpm, yarn) — default pnpm
- Include routing (TanStack Router) — default yes
- Include state management setup — default yes

## Workflow
1. **react-engineer** scaffolds with Vite: `npm create vite@latest -- --template react-ts`
2. **typescript-specialist** configures TypeScript strict mode, path aliases
3. **css-engineer** adds Tailwind CSS via PostCSS
4. **nextjs-engineer** (or react-engineer) adds TanStack Router for SPA routing
5. **state-management-specialist** sets up Zustand hooks for state
6. **test-engineer** adds Vitest + RTL + Playwright
7. **ci-cd-engineer** adds GitHub Actions (lint, test, build, deploy to static host)

## Outputs
- Vite + React 19 SPA at `frontend/`
- `vite.config.ts` with optimizations
- `tsconfig.json` (strict)
- `tailwind.config.js`
- `vitest.config.ts`
- `playwright.config.ts`
- Router setup: `src/router.tsx` (TanStack Router)
- State management: `src/store.ts` (Zustand)
- GitHub Actions: lint, test, build, deploy workflows
- `.env.example` with API URL

## Quality Gates
- `npm run lint` passes
- `npm run type-check` passes
- `npm run test` all tests pass
- `npm run build` succeeds
- `npm run preview` runs built app correctly
- GitHub Actions workflow defined

## Example
```
/scaffold-react-spa "dashboard-app"

Project created: frontend/

Key files:
- src/main.tsx (entry point)
- src/App.tsx (root component)
- src/router.tsx (TanStack Router setup)
- src/store.ts (Zustand state)
- tsconfig.json (strict)
- vite.config.ts

Scripts:
npm run dev           (Vite dev server)
npm run build        (Vite build)
npm run preview      (local preview)
npm run lint
npm run type-check
npm run test
npm run e2e

Deploy to: Vercel, Netlify, or S3 via GitHub Actions
```
