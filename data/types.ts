export interface NavItem {
  label: string;
  href?: string;
  dropdown?: { label: string; href: string }[];
  megaMenu?: MegaMenu;
}

export interface MegaMenuItem {
  label: string;
  href: string;
  description?: string;
}

export interface MegaMenuColumn {
  title: string;
  items: MegaMenuItem[];
}

export interface MegaMenu {
  columns: MegaMenuColumn[];
  /**
   * Optional "browse all" row across the bottom of the panel. Omit it and the
   * row is not rendered — the Engineering menu does exactly that.
   *
   * This is explicit because it used to be inferred from `columns.length === 4`,
   * which silently broke: parking the `iot-robotics` category took the product
   * menu down to three columns, so it started offering "Browse all engineering
   * services" and linking to /engineering.
   */
  footer?: { label: string; href: string };
}

export interface SearchableItem {
  title: string;
  href: string;
  category: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface Solution {
  layer: string;
  title: string;
  description: string;
  tags: string[];
  iconName: string;
}

export interface Capability {
  category: string;
  title: string;
  subtitle: string;
  features: string[];
  image: string;
}

/** Lifecycle stage of a product. Mirrors Project['badgeVariant']. */
export type ProductStatus = 'prototype' | 'in-development' | 'available';

/** One row of a product's capabilities table. */
export interface SpecRow {
  label: string;
  value: string;
}

export interface ProductFaq {
  question: string;
  answer: string;
}

/**
 * One card in the applications band: an icon, a short all-caps label and the
 * sentence describing the use case.
 *
 * `iconName` is a key into `applicationIcons` in data/icons.ts, so content
 * stays plain data. Only the Advance USB-C Power Supply's three entries are
 * user-authored — the rest are DRAFT PLACEHOLDER, with the `description`
 * carrying the previously written sentence unchanged and `title` added purely
 * as a label. No new claims about any hardware.
 */
export interface ProductApplication {
  iconName: string;
  title: string;
  description: string;
}

/** One "Why Choose Phantom?" panel. */
export interface WhyChooseItem {
  title: string;
  description: string;
}

/**
 * Defaults for every product page.
 *
 * `whyChoose` and `orderSteps` are currently UNRENDERED: the product page was
 * rebuilt to the Figma design, which has no "Why Choose Phantom" or "How to
 * Order" section. The content is kept rather than deleted so those sections can
 * return without being rewritten.
 */
export interface ProductPageContent {
  whyChoose: WhyChooseItem[];
  orderSteps: { title: string; description: string }[];
  /**
   * Closing enquiry strip above the footer. Site-level and deliberately
   * generic: it renders on all 13 products, so it must be true of a CubeSat
   * and a robotics kit as well as a power supply.
   */
  enquire: { title: string; subtitle: string; cta: string };
}

/**
 * A product Phantom sells or is building. The catalog is the single source of
 * truth for the product nav, the category pages, and site search — derive,
 * don't duplicate.
 *
 */
export interface Product {
  slug: string;
  title: string;
  /** Slug of the owning ProductCategory. */
  category: string;
  image: string;
  /**
   * Extra real photographs of this hardware, shown as a thumbnail strip beside
   * the hero image. Real shots only — never pad this to fill the strip; a
   * product with nothing more to show simply renders no thumbnails.
   */
  gallery?: string[];
  /**
   * DRAFT PLACEHOLDER PRICING — the price in whole US dollars.
   *
   * ⚠ USD is the only authored currency. NPR is derived from this at display
   * time (see `lib/currency.ts`) and is never stored, so the two cannot drift.
   * Do not add an NPR field: `main` and the store branch previously carried
   * separate USD and NPR numbers for the same six products and disagreed by up
   * to 6x.
   *
   * ⚠ A number, not a formatted string — it used to be `"$49.00"`, which
   * nothing could convert. Formatting belongs to `formatPrice`.
   *
   * These are USD design-mock figures, not quotes: three come from the Figma,
   * the rest were filled in to match. Replace with real numbers before this
   * ships publicly — and note the currency switch now presents them in two
   * denominations, which makes draft pricing look considerably more official
   * than one number did. A priced card still leads to an "Enquire now" CTA;
   * main has no checkout.
   *
   * Omit for products with nothing to publish; the card leaves the slot empty.
   */
  priceUsd?: number;
  /** One-line summary. Used on cards, in the mega menu, and as meta description. */
  description: string;
  status: ProductStatus;
  /**
   * Optional detail on what `status` means for this product specifically —
   * e.g. how far through prototyping it is. Rendered beside the badge.
   */
  statusNote?: string;
  /**
   * DRAFT PLACEHOLDER COPY — not reviewed, not true of any specific hardware.
   * Written to shape the page layout; replace before this ships publicly.
   */
  overview: string;
  /** See ProductApplication — only the power supply's entries are authored. */
  applications: ProductApplication[];
  /** DRAFT PLACEHOLDER COPY — see `overview`. */
  faqs: ProductFaq[];
  /**
   * Capabilities table rows. Restructured from the previously authored
   * highlights — no new claims. Empty means nothing is published yet, and the
   * page says so rather than inventing detail.
   */
  specs: SpecRow[];
  /**
   * The three short figures shown beside the buy box.
   *
   * Curated rather than derived: taking the first three `specs` rows produced
   * part numbers and full sentences that wrapped over several lines, where the
   * design wants terse values ("USB-C 2.0", "20V / 3A", "4-Layer"). Every value
   * must restate something already in `specs` — this is a summary, never a
   * place for a new claim. Falls back to the first three spec rows when unset.
   */
  highlights?: SpecRow[];
  /**
   * Overrides the site-level `whyChoose` for this product only. Use when a
   * reason to choose Phantom is specific to this hardware and would read as
   * nonsense on the rest of the catalog. Omit to inherit the site default.
   */
  whyChoose?: WhyChooseItem[];
}

/** A product line. Groups the catalog and backs /product/[category]. */
export interface ProductCategory {
  slug: string;
  title: string;
  description: string;
  image: string;
}

export interface Logo {
  src: string;
  alt: string;
}

export interface FAQItem {
  value: string;
  question: string;
  answer: string | null;
  list?: string[];
}

export interface Project {
  id: number;
  heroImage?: string;
  image: string;
  gallery?: string[];
  category: string;
  badge: string;
  badgeVariant: 'prototype' | 'in-development' | 'available';
  title: string;
  description: string;
  tags: string[];
}

export interface CoreValue {
  number: string;
  title: string;
  description: string;
}

export interface RoadmapItem {
  year: string;
  phase: string;
  title: string;
  description: string;
  isCurrent: boolean;
}

export interface ContactInfo {
  iconName: string;
  label: string;
  value: string;
  href: string;
}

export interface SocialLink {
  iconName: string;
  href: string;
  label: string;
}

export interface HeroImage {
  src: string;
}

export interface SiteContent {
  navItems: NavItem[];
  searchableItems: SearchableItem[];
  footerQuickLinks: FooterLink[];
  footerEngineeringLinks: FooterLink[];
  footerProductLinks: FooterLink[];
  solutions: Solution[];
  capabilities: Capability[];
  productCategories: ProductCategory[];
  catalog: Product[];
  productPageContent: ProductPageContent;
  logos: Logo[];
  faqLeft: FAQItem[];
  faqRight: FAQItem[];
  projects: Project[];
  coreValues: CoreValue[];
  roadmap: RoadmapItem[];
  contactInfo: ContactInfo[];
  socialLinks: SocialLink[];
  heroImages: HeroImage[];
}
