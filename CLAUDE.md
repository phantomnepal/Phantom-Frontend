@AGENTS.md

# CLAUDE.md

Guidance for Claude Code working in this repository.

## Standing instructions from the user

- **Deploy is the LAST step.** Never deploy unless explicitly asked.
- **Do not use git worktrees.** Work in place, in the working directory. This has
  been stated repeatedly — do not call EnterWorktree, and do not let a skill
  (e.g. clone-website) talk you into dispatching builders into worktrees.
- **Do not merge the ecommerce work into `main`.** See "Branches" below.
- **Never invent product specifications.** See "Content rules" below.

## Commands

Run from `phantom/`.

| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build |
| `npm test` / `npx vitest run` | Vitest suite (32 tests) |
| `npx tsc --noEmit` | Typecheck |
| `npm run lint` | Bare `eslint` — **sweeps the whole repo including `.claude/worktrees`**, so it reports ~185 unrelated files. Not a useful signal as configured. |

**Port 3000 is usually occupied by an unrelated Flowcove dev server.** Verify what
is answering before trusting a 404 — start Phantom on another port (e.g.
`npx next start -p 3457`) when checking routes.

Vitest excludes `.claude/**`; without it, a worktree's copy of the tests gets
collected and run against this tree.

## Architecture

Next.js 16 App Router + React 19 + Tailwind v4. Path alias `@/*` → project root.
No `src/`; `app/` is at the root. Brand colour `#A10F1A`, dark `#0f1e2e`, tinted
section background `#F5F6F8`. Font: Geist.

### Content-adapter data layer (`data/`)
All copy is decoupled behind one interface. `data/types.ts` defines `SiteContent`;
`data/adapters/hardcoded/` holds the content; `data/content.ts` exposes
`getSiteContent()`. Components call `getSiteContent()` — never import the adapter
directly, and nothing outside `data/` imports from inside the adapter directory.
`data/icons.ts` maps `iconName` strings to Lucide components so content stays
plain data.

The adapter was one 1383-line `hardcoded.ts`; it is now one module per area of
the site, with `hardcoded/index.ts` doing nothing but assembling `SiteContent`
from them:

| File | Holds |
|------|-------|
| `categories.ts` | `productCategories` (incl. the parked `iot-robotics` block) |
| `products/{embedded-systems,flight-electronics,educational-kits}.ts` | one file per category |
| `products/_parked.ts` | products kept for later, commented out verbatim |
| `products/index.ts` | composes `catalog` from the category files |
| `product-page.ts` | site-level `productPageContent` |
| `navigation.ts` | `navItems`, `searchableItems`, and the two derived lists |
| `footer.ts` / `marketing.ts` / `faq.ts` / `about.ts` / `contact.ts` | the rest |

### Product catalog — the single source of truth
`catalog: Product[]` (6 products) and `productCategories: ProductCategory[]`
(3 categories). **The product mega menu and site search derive from the catalog**
(`productMegaMenuColumns`, `catalogSearchItems` in `navigation.ts`) — add a
product and it appears in nav, category page, and search at once. Do not
hand-maintain those lists again; they used to be hardcoded, and all 12 nav links
pointed at a dead `/product`.

**Parked products are not dead code.** The user keeps `custom-dev-board`,
`4-dof-robotic-arm`, `smart-sensor`, `industrial-monitoring-devices`,
`phantom-f405` and `esc-stack` commented out for later use, along with the
`iot-robotics` category three of them belong to — category and products must
stay parked together, since a product pointing at a missing category fails the
catalog test. Do not delete them and do not uncomment one without its category.

The old parked `robotics-kit` placeholder was **deleted**, not kept: it is now
live as `4wd-robotics-kit` in `educational-kits` with user-authored content that
supersedes every field it held.

Helpers live in `lib/catalog.ts`. `Product` carries `priceUsd` only; NPR is
derived at render time (`lib/currency.ts`), never stored.

### Product routing (`app/product/[[...slug]]/page.tsx`)
One optional catch-all serves three shapes:
- `/product` → category landing
- `/product/{category}` → category listing
- `/product/{product}` → product detail (**flat, not nested under category**)

This is a catch-all because Next.js cannot host `[category]` and `[slug]` at the
same level — it throws *"You cannot use different slug names for the same dynamic
path"* (`sorted-routes.js:128`). Categories and products therefore **share a slug
namespace**; `slugCollisions()` is asserted in `lib/__tests__/catalog.test.ts`.
Resolution order is category → product, so a collision would silently shadow a
product page.

### Products vs projects — deliberately independent
`/product` is **self-contained** and never links to `/projects`. `/projects` holds
the 2 real prototypes (F722-Analog, Type-C Power Supply) with their own
`projectContent` narrative in `lib/projects.ts`. The F722 exists in both trees and
states its specs separately in each — accepted duplication, decided deliberately.

A test asserts no `projectContent` entry is orphaned; five entries were dead code
for a long time (keyed to slugs no project generated), which is how their content
went unrendered.

### Product page anatomy
Cloned from `jlcpcb.com/pcb-fabrication/fr4-pcb` (structure only, Phantom's UI).
See `docs/research/PRODUCT_PAGE_TOPOLOGY.md`. Sections, in order, alternating
white / `#F5F6F8`: hero → What is it → Applications → Specifications table
(`Feature | Specification`) → Why Choose Phantom → How to Order → FAQ (accordion,
closed by default) → Related products → CTA.

**Omitted on purpose:** customer testimonials (Phantom has no reviews) and the
resources/blog grid (no blog). Both would require fabrication.

The closing CTA's layout follows `sequencehq.com` — a bordered `rounded-2xl` card
on flat `#F5F6F8` with a centred stack and a pill button, not a full-bleed band.

## Content rules — important

**Never source product specifications from the web.** Searching for e.g. "F722"
returns DYS, GEPRC, Diatone, Rotor Riot boards that share an STM32 part. Their
specs describe *their* hardware. Publishing them under Phantom's name would be a
false claim on a commercial page selling hardware, and is their copy. This was
asked for and declined; the decision stands.

`phantom.com.np` is this same codebase — fetching it returns the strings already
in `data/adapters/hardcoded/`. There is no external source of Phantom product content.

### Current content state (user is supplying the rest)
The user will provide real **content and images later**. Until then:

- `overview`, `applications`, `faqs` are **DRAFT PLACEHOLDER** on only 1 of the 6
  live products now — Phantom F722 — marked as such in `data/types.ts`. Written
  to make no performance, dimensional, or component claims. Unreviewed — it
  speaks for the company if shipped. The other five are **user-authored and
  real**: Advance USB-C Power Supply, Advance BEC Power Module, Educational 1U
  CubeSat, 4WD Robotics Kit, Electronics Starter Kit. Their entries are marked
  `USER-AUTHORED` — do not rewrite them.
- `specs` are real. **Every live product now publishes a specs table**; the
  `specs: []` products were either filled in by the user (BEC) or parked (ESC
  Stack, and the three `iot-robotics` entries). The "In development" fallback
  block still exists and `lib/catalog.ts`'s `hasSpecs` is still tested, but
  nothing in the catalog currently triggers it.
- ⚠ **The BEC's PCB layer count is unresolved.** The supplied copy said
  "PCB GRADE 2-Layer" in the summary row and "PCB DESIGN 4-Layer Power
  Optimized" in the table. Both were omitted rather than publishing a guess;
  efficiency takes the third highlight slot. Restore the row once confirmed.
- `orderSteps` (`productPageContent`) is site-level and now describes the
  **store** — "Choose your quantity" → "Add to cart and check out" → "We build
  and ship". **`main` has a quantity field but no cart and no checkout**; the
  product CTA is "Enquire now" → `/contact`, and the store is on
  `ecommerce-phase1` pending `store.phantom.com.np`. So every product page
  currently describes a purchase flow the site cannot perform. This was raised
  and the user chose it deliberately — **do not "fix" it back.** It resolves
  itself when the store ships. The bulk-pricing threshold is still unspecified,
  so the copy claims tiered pricing without a number — and the buy box now
  offers 10/25/50/100 presets against that unspecified threshold.
- `whyChoose` is site-level with an **optional per-product override**
  (`Product.whyChoose`). Only the power supply overrides it, because "Built for
  real power demands" would read as nonsense on the Robotics Kit or CubeSat.
- **Real Phantom imagery now covers 6 of the 7 live products** — F722, Advance
  USB-C Power Supply, Advance BEC (renders) and CubeSat, Starter Kit, 4WD kit
  (photographs). Only the Embedded Systems Kit still uses a category
  placeholder. See `public/README.md` for the folder convention and the full
  list. `/products/phantom-f405/top.png` is kept though that product is parked.

  Two Unsplash drone shots are now **in use at the user's explicit direction**,
  both showing a competitor's aircraft: `site/hero.jpg` (DJI Mavic) is the
  landing hero, and `categories/flight-electronics.jpg` (an iFlight quad with a
  Caddx camera, both logos legible) is the Flight Electronics category card.
  This was flagged before they chose the files and reaffirmed — do not
  "fix" it back. Two more Parrot/Mavic shots remain unreferenced in
  `public/site/`.

  A previous version of this note was **wrong** and worth not repeating:
  it listed `/products/flight-controller.png` as the F722. It is not — it is a
  generic green PCB render whose silkscreen is garbled nonsense text, now at
  `/categories/flight-electronics.png` and used as the category card and the ESC
  placeholder. It also called `cubesat.png` a real photo; it is a render.
  An image makes claims the same way a spec row does — check what one actually
  shows before attaching it to a product.
- **"Development Boards" no longer exists.** It was a placeholder SKU; the user
  replaced it with the Advance USB-C Power Supply (`advance-usb-c-power-supply`,
  `embedded-systems`, `prototype`). Its specs were restructured from the
  authored highlights on the `/projects` entry for the same board — no new
  claims, and `/product` still does not link to `/projects`.
- **"Sensor Modules" no longer exists either.** Same story: a placeholder SKU
  the user replaced with the **Advance BEC Power Module**
  (`advance-bec-power-module`, `embedded-systems`, `prototype`, $6). The slug and
  the `public/products/` folder were both renamed, so `/product/sensor-modules`
  now 404s.
- **Statuses**: the user confirmed BEC `prototype`, CubeSat `in-development`,
  4WD kit and Starter Kit `available`, each with a `statusNote` giving the real
  lead time. F722 is still `prototype` on the strength of its `/projects` badge,
  and the Embedded Systems Kit is still `available` on the strength of the
  ecommerce branch's prices — those two remain unconfirmed guesses.
- **The green "IN STOCK" pill was removed** from `ProductGallery` at the user's
  request. It came from the Figma and asserted stock on every product including
  ones still in development, with no inventory system behind it. Availability is
  carried by `StatusBadge` + `statusNote` instead. Do not reinstate it.

## Branches

- `main` — marketing site. Current work lives here, uncommitted.
- `ecommerce-phase1` — full Phase 1 store (`store.phantom.com.np`, Better Auth,
  Neon/Drizzle, cart, orders, admin). Pushed and **held**; the subdomain does not
  exist yet. **Do not merge to main.** Security audit done there; UX audit open.
- `worktree-product-route` — a **locked worktree** at `.claude/worktrees/product-route`
  with 3 unmerged commits (a QA fix for an About-page 404, `/projects` hero
  rewording, hero CTA removal). Not created by this work. Untouched. Worth
  reviewing before further `/product` or `/projects` changes.

`.env.local` holds secrets and is gitignored. Never commit it.

## Navbar and buy box controls

`components/ui/dropdown.tsx` is the shared anchored menu — ARIA menu-button
pattern, roving arrow keys, Escape/Tab handling, focus return. Both navbar
menus use it; don't hand-roll a third.

- **Currency** (`currency-toggle.tsx`) was a two-button segmented control and is
  a dropdown now. The extra room states **which rate a converted price used**:
  the provider exposes `rateIsLive`, so the panel says "Live rate" or "Offline
  rate" and gives the figure. Before this, `Rs 3,200` looked equally
  authoritative whether it came from today's rate or the constant baked into the
  bundle. In the mobile sheet it opens **upward** (`side="top"`) — its trigger is
  in the pinned bottom bar.
- **Account** (`navbar/account-menu.tsx`) deliberately has **no "Sign in" and no
  "My orders"** — there is no auth on `main`. It offers the routes that work
  (`/contact`, `/product`) and an "On this device" block that shows and clears
  the stored currency preference, which is the only state this site keeps about
  a visitor. When the store ships, the top block becomes the session.
- Account now sits **beside Cart in the mobile bar** at the user's request. The
  `PHANTOM` wordmark is hidden below `sm` to pay for it — three 44px targets
  plus the full lockup overflowed a 320px bar, which is why Account was left out
  originally. Verified at 320px.
- **Buy box quantity is a real number field**, not a stepper alone: 100 units
  used to cost 99 clicks. Type any quantity, `inputMode="numeric"`, Up/Down to
  step, Shift for ±10, and bulk presets (10/25/50/100). Draft state is a string
  so the field can be empty mid-edit and settles on blur. Still inert — no cart
  on `main`.
- **The product lead time is no longer hardcoded.** `product-detail.tsx` printed
  "Ships in 2-4 Weeks" from the Figma on every product; it now renders
  `Product.statusNote`, and a product without one shows no lead time rather than
  a false one.
- **The specs grid no longer pads with empty cells.** It used filler divs to
  close its rectangle when the spec count was not a multiple of three, which
  rendered as blank cells — and only ran at `lg`, so the `sm` two-column
  breakpoint had the same open edge with nothing filling it. The container
  carries the border now, so any count closes cleanly at any breakpoint.

## Hero and mega menu

`components/Hero.tsx` is **deliberately static and a server component**. It was
a Framer Motion carousel — two backgrounds cross-fading on a 6s interval with an
8s scale drift, staggered entrance animations on every text block, and indicator
pills whose active state was the brand red. All removed at the user's request,
which is why `heroImages` holds exactly one entry and the background is
`next/image` with `priority` (it is the LCP element). Do not reinstate the
carousel or the pills.

`MegaMenu.footer` is the optional "browse all" row. The Product menu declares
one; **Engineering deliberately declares none.** This used to be inferred in the
component from `columns.length === 4`, which broke silently when parking
`iot-robotics` took the product menu to three columns — the *products* menu
started offering "Browse all engineering services" and linking to
`/engineering`. Pinned in `data/__tests__/content.test.ts`.

## Known open items

- `/engineering`'s 12 mega-menu items all fall through to one "Check back soon"
  placeholder (`app/engineering/[[...slug]]`, noindex) — the same dead-link
  problem `/product` had. The user asked about giving it the catalog treatment;
  unanswered.
- Hero CTAs "Explore Products" and "Engineering Solutions" are still bare
  `<button>`s with no link or handler.
- `components/EngineeringCapabilities.tsx` still has its own auto-advancing
  carousel with indicator pills. The hero de-animation request was scoped to the
  hero; this one was left alone.
- The user was asking to change the enquire CTA layout when it was redirected to
  the Sequence clone; only the closing CTA was restyled.

## Debugging note

Browser automation via a **backgrounded tab reports false failures**:
`requestAnimationFrame` never fires, so Framer Motion elements stay at their
`initial` values (`opacity: 0`, `height: 0`) and CDP screenshots fail. This looked
exactly like a broken FAQ accordion and an invisible hero. Check
`document.visibilityState` before concluding anything is broken.
