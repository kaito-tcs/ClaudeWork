---
description: Create a Next.js page with metadata, layout, and data fetching
argument-hint: "[page-route]"
---

# /create-page

## Purpose
Create a Next.js App Router page: route structure, metadata, server/client components, data fetching, error boundary, and loading state. Page is SEO-ready and follows best practices.

## When to Use
- Adding a new route/page to Next.js app
- Building new feature pages (product detail, user profile, etc.)
- Integrating with API backend

## Inputs
- Page route (e.g., `/products`, `/products/[id]`, `/admin/dashboard`)
- Data source (API, database query, etc.)
- Page type (server-rendered, client-side, ISR, etc.)
- Optional: parent layout if new

## Workflow
1. **nextjs-engineer** creates route structure: `app/<route>/page.tsx`
2. **lead-frontend-engineer** designs page layout and data requirements
3. **Decision point**: Server component or client? ISR or dynamic?
4. **nextjs-engineer** implements page with metadata, error.tsx, loading.tsx
5. **lead-frontend-engineer** integrates child components and state
6. **test-engineer** writes tests for page and data fetching
7. Page added to routes documentation

## Outputs
- `app/<route>/page.tsx` — main page component with metadata
- `app/<route>/layout.tsx` — layout (if new route)
- `app/<route>/error.tsx` — error boundary
- `app/<route>/loading.tsx` — loading skeleton
- `app/<route>/page.test.tsx` — page tests
- Metadata exported (title, description, OG tags)

## Quality Gates
- Page renders without errors
- Metadata is set (title, description, OG)
- Data fetching works (no hydration mismatch)
- Error states handled (error.tsx exists)
- Loading state shown (loading.tsx exists)
- TypeScript strict: no any types
- Tests cover happy path and error cases

## Example
```
/create-page "/products/[id]"

Files created:
- app/products/[id]/page.tsx
  export const metadata: Metadata = {
    title: "Product Details",
    description: "View product info"
  }
  
  export default async function ProductPage({ params }) {
    const product = await getProduct(params.id);
    return <ProductDetail product={product} />
  }

- app/products/[id]/error.tsx (error boundary)
- app/products/[id]/loading.tsx (skeleton loader)
- app/products/[id]/page.test.tsx (tests)

Page ready at: /products/123
```
