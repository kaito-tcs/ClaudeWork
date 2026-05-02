---
description: Add App Router routing with nested layouts and intercepting routes
argument-hint: "[route-structure]"
---

# /add-routing

## Purpose
Set up Next.js App Router structure: nested routes, layouts, route groups, parallel routes, and intercepting routes. Organize codebase for scalability.

## When to Use
- Organizing route structure for complex apps
- Adding modal routes (intercepting routes)
- Shared layouts across route groups
- Large app needing clear route organization

## Inputs
- Desired route structure (list of routes/pages)
- Layout hierarchy (shared vs. isolated layouts)
- Any modal or intercepting routes needed

## Workflow
1. **nextjs-engineer** designs route structure from spec
2. **lead-frontend-engineer** determines layout hierarchy and shared components
3. **Decision point**: Are there modal routes, parallel routes, or route groups needed?
4. **nextjs-engineer** creates directory structure: `app/`, `app/(marketing)/`, `app/(dashboard)/`, etc.
5. **nextjs-engineer** implements layouts, intercepting routes, and default pages
6. Documentation updated: routing map in README or docs

## Outputs
- Route structure documented in tree format
- All pages (page.tsx), layouts (layout.tsx), and error boundaries created
- Route groups defined (e.g., `(marketing)`, `(dashboard)`)
- Intercepting routes set up (if modals needed)
- README with routing explanation

## Quality Gates
- All spec routes implemented
- Layouts are properly nested
- Navigation works end-to-end
- Type-safe routing params
- No unused pages or orphaned routes

## Example
```
/add-routing

Route structure:
app/
  layout.tsx (root)
  page.tsx (home)
  (marketing)/
    layout.tsx
    about/page.tsx
    contact/page.tsx
  (dashboard)/
    layout.tsx (auth required)
    profile/page.tsx
    products/page.tsx
    products/[id]/page.tsx
  admin/
    layout.tsx
    users/page.tsx

Intercepting routes:
  @modal/(.)products/[id]/modal.tsx (product quick-view)

Route map: docs/routing.md
```
