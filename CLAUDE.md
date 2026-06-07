@AGENTS.md

# zabio-track — Project Rules

## Stack
- Next.js 15 App Router (Server Components, Server Actions, Route Handlers)
- MongoDB + Mongoose
- Better Auth
- TypeScript, Tailwind, shadcn/ui, Zod
- TanStack Query (client-side only, for blockchain balance polling)

## Architecture
- `lib/` — shared infrastructure (DB, auth, blockchain, validations). Server-only.
- `features/` — business logic by domain (actions, queries, components). Feature-based.
- `app/` — Next.js routing only.
- Every `features/<domain>/components/` must have an `index.ts` barrel export file.
- `lib/db/models/` has an `index.ts` barrel export file.

## Notifications
- Use Sonner (`toast` from `"sonner"`) for all user feedback after actions
- `toast.success()` after successful mutations
- `toast.error()` after failed mutations
- Keep inline form errors only for field-level validation (Zod errors)
- Use `text-destructive` and `bg-destructive/10` for inline error styling (never `text-red-500`)

## Colors & Styling
- NEVER use hardcoded Tailwind colors: `gray-900`, `gray-500`, `gray-50`, etc.
- ALWAYS use shadcn semantic tokens:
  - `text-foreground` instead of `text-gray-900`
  - `text-muted-foreground` instead of `text-gray-500`
  - `bg-background` instead of `bg-gray-50`
  - `bg-sidebar` instead of `bg-gray-900`
  - `hover:bg-sidebar-accent` instead of `hover:bg-gray-700`
  - `border-border` instead of `border-gray-200`
- Design must support light and dark mode (next-themes already configured).
- Use `tracking-tight` on main headings.

## Routing
- All protected routes live under `/dashboard/*`
- The `(dashboard)` route group does NOT add a URL segment — pages must be nested inside `(dashboard)/dashboard/`
- Middleware protects `/dashboard/:path*`, `/login`, `/register`

## Constants
- All app routes live in `src/lib/constants/routes.ts` as the `ROUTES` object — never hardcode route strings
- Static data arrays (countries, networks, currencies) live in `constants.ts` within their feature folder
- Global constants shared across features live in `src/lib/constants/`

## File Organization
- Static data (arrays, maps, enums) go in `constants.ts` within the feature folder, never inside a component file.
- Types and interfaces go in `types.ts` within the feature folder.

## UI Components
- Always prefer shadcn/ui components over native HTML elements when available — install if needed
- Examples: use `<Select>` not `<select>`, use `<Checkbox>` not `<input type="checkbox">`

## After every large change
- Always run `npx tsc --noEmit` after large refactors to catch TypeScript errors before moving on

## Auth helpers
- Always use `requireAuth()` from `@/lib/auth/require-auth` in Server Components and Server Actions instead of calling `auth.api.getSession()` directly

## Server Actions
- When using react-hook-form, pass the typed data object directly to the Server Action — never convert back to FormData
- `FormData` as action parameter only makes sense for `<form action={fn}>` (no-JS progressive enhancement)
- Always re-validate with Zod inside the action even when the client already validated

## Route Handlers
- Route Handlers must not contain direct DB logic (no `connectDB`, no model imports)
- All DB access goes through `queries.ts` or `actions.ts` functions
- Always check session with `auth.api.getSession` at the top of every Route Handler

## Conventions
- Barrel exports via `index.ts` in every components or models folder
- Do not mix Server Components and Client Components in the same barrel export
- Server Actions always have `"use server"` at the top of the file
- Client Components always have `"use client"` at the top of the file
- Validate with Zod in Server Actions before touching the DB
- Call `revalidatePath()` after mutations
- Use `lean()` on read-only Mongoose queries
- Always call `connectDB()` before any Mongoose query
- Import models from `@/lib/db/models` (barrel)

## Project URLs
- `/login` — login page
- `/register` — register page
- `/dashboard` — overview
- `/dashboard/wallets` — wallet list
- `/dashboard/wallets/new` — add wallet
- `/dashboard/wallets/[walletId]` — wallet detail
- `/dashboard/ledger` — internal ledger
