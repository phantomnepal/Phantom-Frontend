/**
 * The hardcoded content adapter.
 *
 * This file only assembles `SiteContent` from the modules beside it — the copy
 * itself lives in those modules, one per area of the site. Nothing outside
 * `data/` should import from this directory; components call `getSiteContent()`
 * from `data/content.ts` so the source of content stays swappable.
 */

import type { SiteContent } from "../../types";
import { productCategories } from "./categories";
import { catalog } from "./products";
import { productPageContent } from "./product-page";
import { navItems, searchableItems } from "./navigation";
import {
  footerQuickLinks,
  footerEngineeringLinks,
  footerProductLinks,
  socialLinks,
} from "./footer";
import { solutions, capabilities, logos, heroImages } from "./marketing";
import { faqLeft, faqRight } from "./faq";
import { projects, coreValues, roadmap } from "./about";
import { contactInfo } from "./contact";

export const hardcodedContent: SiteContent = {
  navItems,
  searchableItems,

  footerQuickLinks,
  footerEngineeringLinks,
  footerProductLinks,

  solutions,
  capabilities,

  productCategories,
  catalog,
  productPageContent,

  logos,

  faqLeft,
  faqRight,

  projects,
  coreValues,
  roadmap,

  contactInfo,
  socialLinks,
  heroImages,
};
