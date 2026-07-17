# Product page topology — cloned from jlcpcb.com/pcb-fabrication/fr4-pcb

Reference: https://jlcpcb.com/pcb-fabrication/fr4-pcb (inspected via browser).

**Scope:** anatomy only. Per the request ("i want the products page same as this just my
UI"), we clone JLCPCB's *section structure and interaction models*, not their CSS,
colours, fonts, or copy. Phantom's design system stays: `#A10F1A`, Geist,
`max-w-7xl` containers, existing card/badge idioms.

## Source anatomy (measured)

| # | Section | Height | Structure |
|---|---------|--------|-----------|
| 0 | What is an FR4 PCB? | 2399px | Prose + 12 tables + 16 accordions |
| 1 | Common Applications | 761px | 3 image cards |
| 2 | Manufacturing Capabilities | 1512px | Sticky `Features \| Capabilities` header + 21 param/value rows, bg `#F5F6F8` |
| 3 | Why Choose JLCPCB | 585px | 4 value props |
| 4 | How to Order in 3 Steps | 772px | 3 numbered steps + images, bg `#F5F6F8` |
| 5 | FAQ | 779px | 6 accordions, all closed by default |
| 6 | What Customers Say | 833px | 4 testimonials |
| 7 | Explore Resources | 700px | 4 blog cards |
| 8 | Unlock More Possibilities | 830px | 8 related-solution cards |
| 9 | CTA banner | 233px | Headline + quote button |

**Page rhythm:** alternating `#FFFFFF` / `#F5F6F8` section backgrounds.
**Interaction models:** all static except FAQ (click-to-expand accordion, none open
by default). No scroll-driven behaviour, no tabs, no carousels on this page.

## Phantom's adaptation

| Source | Phantom | Notes |
|--------|---------|-------|
| Hero + instant-quote widget | Hero + Enquire CTA | No quote engine; Phantom quotes by conversation |
| What is an FR4 PCB? | What is the {product}? | Built; DRAFT copy |
| Common Applications | Applications | Built; DRAFT copy |
| Manufacturing Capabilities | Capabilities table | `Product.specs` — param/value, derived from existing highlights |
| Why Choose JLCPCB | Why Choose Phantom | Site-level, shared across products |
| How to Order in 3 Steps | How to Order in 3 Steps | Site-level; Phantom's real flow is enquire → spec → build |
| FAQ | FAQ | `Product.faqs` — DRAFT copy |
| **What Customers Say** | **OMITTED** | Phantom has no reviews. Fabricating testimonials is not an option. |
| **Explore Resources** | **OMITTED** | Phantom has no blog. Nothing to link. |
| Unlock More Possibilities | Related products | Derived free from the catalog (same category) |
| CTA banner | CTA banner | |

## Content provenance

- `overview`, `applications`, `faqs` — DRAFT placeholder, unreviewed.
- `specs` — restructured from previously authored `highlights` into param/value
  pairs. No new claims; wording reshaped.
- Why Choose / order steps — site-level, written from real Phantom facts.
- Nothing sourced from JLCPCB or any other vendor's copy.
