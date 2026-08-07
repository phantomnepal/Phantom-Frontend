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
`catalog: Product[]` (8 products) and `productCategories: ProductCategory[]`
(3 categories). **The product mega menu and site search derive from the catalog**
(`productMegaMenuColumns`, `catalogSearchItems` in `navigation.ts`) — add a
product and it appears in nav, category page, and search at once. Do not
hand-maintain those lists again; they used to be hardcoded, and all 12 nav links
pointed at a dead `/product`.

**Parked products are not dead code.** The user keeps `custom-dev-board`,
`4-dof-robotic-arm`, `smart-sensor`, `industrial-monitoring-devices` and
`robotics-kit` commented out for later use, along with the `iot-robotics`
category they belong to — category and products must stay parked together, since
a product pointing at a missing category fails the catalog test. Do not delete
them and do not uncomment one without its category.

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

- `overview`, `applications`, `faqs` are **DRAFT PLACEHOLDER** on 11 of the 12
  products, marked as such in `data/types.ts`. Written to make no performance,
  dimensional, or component claims. Unreviewed — they speak for the company if
  shipped. **Advance USB-C Power Supply is the exception: user-authored, real.**
- `specs` are real, restructured from previously authored highlights into
  param/value rows. **5 products have `specs: []`** — Sensor Modules, 4-DOF
  Robotic Arm, Smart Sensor, Industrial Monitoring Devices, ESC Stack. They
  render an honest "In development" block instead of a table, and have no photos.
- `orderSteps` (`productPageContent`) is site-level and now describes the
  **store** — "Choose your quantity" → "Add to cart and check out" → "We build
  and ship". **`main` has no cart, no quantity selector and no checkout**; the
  product CTA is "Enquire now" → `/contact`, and the store is on
  `ecommerce-phase1` pending `store.phantom.com.np`. So every product page
  currently describes a purchase flow the site cannot perform, including for the
  five `specs: []` products that are not orderable at all. This was raised and
  the user chose it deliberately — **do not "fix" it back.** It resolves itself
  when the store ships. The bulk-pricing threshold is still unspecified, so the
  copy claims tiered pricing without a number.
- `whyChoose` is site-level with an **optional per-product override**
  (`Product.whyChoose`). Only the power supply overrides it, because "Built for
  real power demands" would read as nonsense on the Robotics Kit or CubeSat.
- **Real photos exist for 4 products**: `/products/cubesat.png`,
  `/products/phantom-f405.png`, `/products/flight-controller.png` (F722), and
  `/project/project7.png` (power supply — shared with its `/projects` entry;
  swap if a dedicated product shot is taken). The kits and the 5 aspirational
  SKUs use category placeholder images.
- **"Development Boards" no longer exists.** It was a placeholder SKU; the user
  replaced it with the Advance USB-C Power Supply (`advance-usb-c-power-supply`,
  `embedded-systems`, `prototype`). Its specs were restructured from the
  authored highlights on the `/projects` entry for the same board — no new
  claims, and `/product` still does not link to `/projects`.
- **Statuses are partly guessed and unconfirmed.** F722 is `prototype` because
  `projects` badges it so, but the ecommerce branch prices it at NPR 18,000, which
  implies sellable. CubeSat / F405 / kits were set `available` on the strength of
  that branch's prices.

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

## Known open items

- `/engineering`'s 12 mega-menu items all fall through to one "Check back soon"
  placeholder (`app/engineering/[[...slug]]`, noindex) — the same dead-link
  problem `/product` had. The user asked about giving it the catalog treatment;
  unanswered.
- Hero (`components/Hero.tsx`) CTAs "Explore Products" and "Engineering Solutions"
  are bare `<button>`s with no link or handler. Hero background uses a raw `<img>`
  with no `priority`, hurting LCP.
- The user was asking to change the enquire CTA layout when it was redirected to
  the Sequence clone; only the closing CTA was restyled.

## Debugging note

Browser automation via a **backgrounded tab reports false failures**:
`requestAnimationFrame` never fires, so Framer Motion elements stay at their
`initial` values (`opacity: 0`, `height: 0`) and CDP screenshots fail. This looked
exactly like a broken FAQ accordion and an invisible hero. Check
`document.visibilityState` before concluding anything is broken.
