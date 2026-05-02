---
description: Set up state management (Zustand, Redux Toolkit, TanStack Query)
argument-hint: "[strategy]"
---

# /add-state-management

## Purpose
Configure global state management for the FE app: choose between Zustand (simple), Redux Toolkit (complex), or TanStack Query (async data). Includes setup, examples, and best practices.

## When to Use
- App needs shared state across components
- Complex state with lots of mutations
- Async data fetching and caching (TanStack Query)
- Before building features that need state

## Inputs
- State management choice: zustand | redux | tanstack-query
- Initial state shape (what data needs to be shared)
- Use cases (user auth, theme, form state, API cache, etc.)

## Workflow
1. **state-management-specialist** recommends strategy based on app complexity
2. **react-engineer** installs and configures chosen library
3. **Decision point**: Zustand (simple store), Redux (thunks + slices), or TanStack Query (just async)?
4. **state-management-specialist** creates store structure and hooks
5. **react-engineer** integrates into root component and example usage
6. **test-engineer** adds store tests and hook tests

## Outputs
- `src/store/` directory with store setup
- Example store hooks: `useAuth`, `useTheme`, `useProducts`, etc.
- Store tests: `src/store/__tests__/`
- Integration in root layout or context provider
- Documentation: when to use which hook

## Quality Gates
- Store initializes without errors
- Hooks work in components
- Store state persists (localStorage if needed)
- Tests cover store mutations
- TypeScript: full typing for store and hooks

## Example
```
/add-state-management zustand

Store created: src/store/authStore.ts
  export const useAuth = create((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    logout: () => set({ user: null })
  }))

Usage in component:
  const { user, logout } = useAuth();

Store tests: src/store/__tests__/authStore.test.ts
Root setup: app/layout.tsx wraps with provider if needed
```
