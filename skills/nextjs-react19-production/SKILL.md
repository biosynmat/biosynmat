---
name: nextjs-react19-production
description: Production-grade guidance for TypeScript apps built with Next.js App Router and React 19. Use when implementing or reviewing Next.js 15+ features that require server-first component design, Server Actions, route-handler boundaries, caching/revalidation strategy, security hardening, accessibility, testing, observability, and deployment readiness.
---

# Next.js + React 19 Production

Implement and review Next.js code to be secure, maintainable, and production-ready.

## Apply This Workflow

1. Identify the task type: new feature, bug fix, refactor, or production hardening.
2. Default to Server Components and add `"use client"` only for interactivity, effects, or browser APIs.
3. Choose mutation surface:
- Use Server Actions for in-app forms and optimistic updates.
- Use Route Handlers for public APIs, webhooks, or cross-app consumption.
4. Define cache policy explicitly:
- Static data: set `revalidate` values.
- Dynamic/private data: use `cache: "no-store"`.
5. Validate boundaries:
- Keep secrets and `process.env` access server-only.
- Validate untrusted inputs with Zod or Valibot.
6. Verify production quality:
- Check accessibility, performance, hydration safety, and test coverage.

## TypeScript Rules

- Enable strict mode and safety flags:
```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noPropertyAccessFromIndexSignature": true,
    "exactOptionalPropertyTypes": true
  }
}
```
- Prefer inference for locals and annotate public APIs explicitly.
- Avoid `any`; use `unknown` plus type guards or schema validation.
- Model variants with discriminated unions, not enums.
- Co-locate feature-level types with the feature.

## Architecture Rules

- Organize by feature slices, not by technology layers.
- Keep domain logic pure and framework-agnostic when possible.
- Keep boundaries explicit:
- `server/` for server-only code.
- `components/` for shared UI primitives.
- `lib/` for pure shared logic.
- Co-locate tests with features.

## Data Fetching and Revalidation

- Fetch in Server Components by default.
- Use explicit cache/revalidation policies:
```ts
// Static-ish content
export const revalidate = 3600;
const staticData = await fetch(url, { next: { revalidate: 3600 } }).then((r) => r.json());

// Dynamic or private content
const dynamicData = await fetch(url, { cache: "no-store" }).then((r) => r.json());
```
- Prefer on-demand revalidation for CMS-driven content.
- Revalidate paths after mutations instead of managing bespoke client caches.

## Component and State Rules

- Keep components small and focused.
- Keep complex logic in pure functions or server utilities.
- Use React built-ins first: `useTransition`, `useOptimistic`, `useActionState`.
- Avoid duplicate derived state.
- Evaluate extracting `.map(...)` fragments into dedicated components for readability and tests.

## Routing Rules

- Use App Router conventions (`app/`, nested `layout.tsx`, route groups).
- Keep prefetch defaults on `<Link>` unless there is a measured reason to change behavior.

## Performance Rules

- Minimize client JavaScript by preferring Server Components.
- Use streaming with `loading.tsx` where useful.
- Use `next/image` for images with `alt` and sizing (`width`/`height` or `fill`).
- Use `next/font` for font loading and CLS reduction.
- Fix hydration warnings immediately.

## Security Rules

- Configure strict headers centrally:
- `Content-Security-Policy`
- `Strict-Transport-Security`
- `X-Content-Type-Options`
- `Referrer-Policy`
- Avoid `'unsafe-inline'` in CSP and use nonces where inline scripts are unavoidable.
- Keep auth/session tokens in `httpOnly` cookies.
- Validate and sanitize all untrusted input and output.
- Avoid `dangerouslySetInnerHTML`; sanitize if unavoidable.

## Accessibility Rules

- Use semantic HTML and correct ARIA.
- Keep all interactive elements keyboard-accessible.
- Keep visible focus styles.
- Validate with automated and manual checks.

## Testing and Observability Rules

- Cover critical paths with unit/integration and E2E tests.
- Include linting and type checks in CI.
- Capture server-side structured logs.
- Capture web vitals and error telemetry.
- Monitor cache hit/miss and revalidation behavior.

## Route Handlers vs Server Actions

- Use Server Actions for in-app form handling.
- Use Server Actions for optimistic mutation flows.
- Use Route Handlers for public APIs.
- Use Route Handlers for webhooks and cross-app clients.

## Production Checklist

- Resolve all hydration warnings.
- Use `next/image` for all images with explicit sizing and `alt`.
- Use `next/font` for font loading.
- Define caching and revalidation behavior explicitly.
- Keep secrets out of client bundles.
- Enforce security headers and CSP.
- Keep Lighthouse performance, accessibility, and SEO in target range.
