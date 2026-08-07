# public/ — image layout

Everything here is served from the site root: `public/site/hero-1.png` is
`/site/hero-1.png`. Paths are referenced from `data/adapters/hardcoded/`, so
**renaming a file here means updating the adapter**, not just the file.

## Folders

| Folder | What goes in it |
|--------|-----------------|
| `products/<product-slug>/` | Real photos and renders of one product. The folder name **is** the product's `slug` in the catalog. |
| `categories/` | The four category card images. These double as the placeholder for products that have no photo yet. |
| `site/` | Page furniture: hero, about, section backgrounds. Not tied to any product. |
| `tools/` | Third-party toolchain logos for the marquee (KiCad, Altium, MATLAB…). Not Phantom's marks. |
| `unsorted/` | Unreferenced files nobody has decided about yet. Nothing here is on the site. |
| `logo.svg` | The Phantom mark. Stays at the root; the navbar, footer and error pages all point at `/logo.svg`. |

## Naming inside `products/<slug>/`

Name a file for the **view**, not a number:

```
products/phantom-f722/top.png
products/phantom-f722/bottom.png
products/phantom-f722/angle.png
```

Use `hero.png` when a product has only one image. The catalog's `image` field
takes the main shot and `gallery` takes the rest — the thumbnail strip only
appears when `gallery` is non-empty, so never pad it with duplicates.

This replaced a flat `project1.png … project9.png` scheme where the numbers
meant nothing, three files were byte-identical duplicates of three others, and
two sibling folders (`project/` and `products/`) both held files called
`projectN` with different extensions.

## Adding an image

1. Drop it in the right folder under a descriptive name.
2. Point the catalog entry at it (`data/adapters/hardcoded/products/<category>.ts`).
3. Compress it — see below.

## Compression

Source files are resized to **1600px on the long edge** and re-encoded before
being committed. Nothing on this site renders wider than ~800 CSS px, so a
4096px source is pure download weight. Current settings:

- JPEG — `mozjpeg`, quality 80
- PNG — palette quantisation, quality 90, effort 10

The board renders are flat-shaded, so palette quantisation is visually
lossless on them: the F722 silkscreen (`STM32F722RETx`, `ICM-42688`) stays
legible going from 1795 KB to 241 KB. Check fine text and gradients by eye
after compressing, not just the byte count.

This pass took the served images from 26.5 MB to 4.8 MB. `categories/embedded-systems.jpg`
alone was 8.7 MB at 4096×2730, rendering into a ~400px card.

## A caution about what an image claims

An image is a specification. `categories/flight-electronics.png` and
`products/educational-1u-cubesat/hero.png` are generic renders, not photographs
of Phantom hardware; the silkscreen on the former is nonsense text. `hero.png`
is kept on disk but is **no longer referenced** — the CubeSat now shows the real
board photos.

Real Phantom hardware — renders made from Phantom's own board files, or
photographs of Phantom's own hardware:

- `products/phantom-f722/{top,bottom,angle}.png`
- `products/advance-usb-c-power-supply/{top,bottom,angle}.png`
- `products/phantom-f405/top.png`
- `products/sensor-modules/{top,bottom,angle}.png` — the Phantom BEC. The
  bottom render's silkscreen reads `PHANTOM BEC / INPUT: 3.8V-32V / OUTPUT 5V`.
- `products/educational-1u-cubesat/{onboard-computer,eps-board,eps-board-detail}.jpg`
- `products/electronics-starter-kit/contents-{flat-lay,angle,detail}.jpg` —
  the same shoot as `unsorted/project3.jpg`, which an earlier version of this
  file wrongly called a stock Arduino photo. It is Phantom's own kit.
- `products/robotics-kit/{assembled,contents-flat-lay,contents-angle}.jpg` —
  placed but **unreferenced**: the `robotics-kit` product is parked (commented
  out in `products/_parked.ts`).

`site/drone-*.jpg` and `site/fpv-quad-outdoor.jpg` are Unsplash stock and every
one of them shows **a competitor's aircraft** — DJI Mavic, Parrot Anafi (logo
legible), an iFlight quad with a Caddx camera. They are placed but unreferenced;
using them on a Phantom page implies Phantom built that airframe.

Same rule as the specs in CLAUDE.md: don't let an image assert something the
hardware doesn't.
