/**
 * Every product Phantom sells or is building.
 *
 * The mega menu, /product/[category] and site search all derive from this list,
 * so a product added here appears everywhere at once. One file per category —
 * add a category file and compose it in below.
 *
 * Self-contained by design: product pages carry their own specs and never defer
 * to /projects. `specs: []` means nothing is published yet, and the page says so
 * rather than inventing detail.
 *
 * `overview`, `applications` and `faqs` are DRAFT placeholder copy — see
 * data/types.ts. Review before this ships publicly.
 *
 * `./_parked.ts` holds products kept for later. They are intentionally NOT
 * spread in here.
 */

import type { Product } from "../../../types";
import { embeddedSystemsProducts } from "./embedded-systems";
import { flightElectronicsProducts } from "./flight-electronics";
import { educationalKitsProducts } from "./educational-kits";

export const catalog: Product[] = [
  ...embeddedSystemsProducts,
  ...flightElectronicsProducts,
  ...educationalKitsProducts,
];
