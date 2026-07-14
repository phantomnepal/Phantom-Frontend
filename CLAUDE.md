# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## This is NOT the Next.js you know

This project uses **Next.js 16** — APIs, conventions, and file structure may differ
from training data. Before writing framework code, read the relevant guide in
`node_modules/next/dist/docs/` and heed deprecation notices.

## Commands

Run all commands from the `phantom/` directory.

| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server (Turbopack) on http://localhost:3000 |
| `npm run build` | Production build |
| `npm run lint` | ESLint (Next core-web-vitals + TS config) |
| `npm test` | Run Vitest suite once |
| `npm run test:watch` | Vitest watch mode |
| `npm run test:coverage` | Coverage report |

Run a single test file: `npx vitest run path/to/file.test.ts`
Filter by test name: `npx vitest run -t "test name"`

Tests use `happy-dom`, `globals: true`, and the `@` → project-root path alias
(mirroring `tsconfig`). Test files live in `__tests__/` folders next to source.

## Architecture

Marketing/info site for Phantom (a Nepal embedded-systems company). Stack: Next.js 16
App Router, React 19, Tailwind CSS v4, Framer Motion / `motion`, Radix UI + shadcn.

### Content-adapter data layer (`data/`)
All site copy is decoupled from components behind a single interface:
- `data/types.ts` — the `SiteContent` interface and all content types (nav, solutions,
  capabilities, products, projects, FAQ, footer, etc.).
- `data/adapters/hardcoded.ts` — the only current adapter; all real content lives here.
- `data/content.ts` — `getSiteContent()` returns the active adapter. Swap the adapter
  here to change the content source; do not import an adapter directly elsewhere.
- `data/icons.ts` — maps `iconName` strings (used in content) to Lucide components, so
  content stays serializable plain data.

Components call `getSiteContent()` for their data rather than hardcoding copy.

### Routing (`app/`)
App Router pages: `/` (home), `/about`, `/product`, `/projects`,
`/projects/[slug]`, `/contact`, plus a catch-all `/engineering/[[...slug]]`
(placeholder, `robots: noindex`). Custom `not-found.tsx`.

### Contact flow
- Client: `lib/submit-contact.ts` — `submitContact()` POSTs to `/api/contact` and
  returns `{ ok, error? }`.
- Server: `app/api/contact/route.ts` — validates fields and sends email via **Resend**.
  Env: `RESEND_API_KEY` (required), plus `CONTACT_TO_EMAIL` / `CONTACT_FROM_EMAIL`
  (both have fallbacks).

### Navbar (`components/navbar/`)
Composed of `desktop-nav`, `mobile-nav`, a Stripe-style `mega-menu` (`use-mega-panel`
hook), `nav-item-trigger`, and a command-palette `search-modal` (`use-command-search`).

### Other conventions
- `lib/utils.ts` — `cn()` (clsx + tailwind-merge); use it for conditional classes.
- `lib/get-strict-context.tsx` — typed React context helper.
- Path alias `@/*` resolves to the project root (`phantom/`).

## Launch order (per user)
Deploy is the LAST step — do not deploy or scaffold deploy until everything else is done.
Prices set (seed.ts + live Neon). `#` stub links fixed. Better Auth infra/dash plugin
removed. Store links are env-driven via `NEXT_PUBLIC_STORE_URL` (local: `http://store.localhost:3000`;
prod: set to `https://store.phantom.com.np` at deploy). At deploy also set prod
`BETTER_AUTH_URL` + `BETTER_AUTH_TRUSTED_ORIGINS` (store + marketing origins) + Google
OAuth redirect URIs. Remaining before deploy: real product photos + specs
(currently reuse `/products/project*.jpg`, all `specs: []`).

## Admin / auth
- Admin is gated by a DB `role` column on `user` (default 'user'). Signup can NEVER
  self-grant admin. Promote: `UPDATE "user" SET role='admin' WHERE email='<email>';`
  Current admins: ayushshah447@gmail.com, phantomnepal25@gmail.com.
- `lib/admin.ts` `isAdmin(userId)` is async (reads role by id). Admin UI at `/admin`
  (store subdomain), gated in page + server action.

## Security audit — DONE (all fixed)
Admin privesc (email allowlist → DB role), order rate-limit (5/min per IP),
order-email HTML escaping, qty cap = 5 (shared `lib/cart-limits.ts`, enforced server +
cart reducer + steppers), orphan-order rollback, noindex on login/cart/checkout/account,
form aria-labels, cart localStorage shape validation.

## UX audit — OPEN (from live browser walkthrough)
HIGH: (1) store header has NO mobile nav/hamburger (`store-header.tsx` nav is
`hidden md:flex`) — mobile-first market. (2) PDPs thin: empty `specs`, single image,
big empty right column, no delivery/trust info. (3) Cart says "Delivery calculated at
checkout" but no fee/ETA ever shown (copy is misleading).
MED: (4) customer gets no order confirmation email (only store does). (5) "Bulk Enquiry"
header link → dead `/#bulk` anchor. (6) cart/checkout flash blank "Loading…" (block on
client `/api/products` fetch). (7) no forgot-password on login. (8) placeholder-only
form labels + no phone-format hint.
LOW: generic stock photos, empty hero right half, no related products, no store
search/sort, no trust row near checkout.

## Notes
- The README references a `docs/` directory that does not currently exist.
