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

/** One "Why Choose Phantom?" panel. */
export interface WhyChooseItem {
  title: string;
  description: string;
}

/**
 * Defaults for every product page. A product may override `whyChoose` with its
 * own list; `orderSteps` is site-level only, because how you order does not
 * vary by product.
 */
export interface ProductPageContent {
  whyChoose: WhyChooseItem[];
  orderSteps: { title: string; description: string }[];
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
   * DRAFT PLACEHOLDER PRICING — display label only, rendered verbatim on
   * product cards (category grids and related-product rails), never on the
   * detail page. Fixed figures only — no "from" or "starting at" prefixes.
   *
   * These are USD design-mock figures, not quotes: three come from the Figma,
   * the rest were filled in to match. The store branch prices in NPR. Replace
   * with real numbers before this ships publicly, and note that a priced card
   * still leads to an "Enquire now" CTA — main has no checkout.
   *
   * Omit for products with nothing to publish; the card leaves the slot empty.
   */
  price?: string;
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
  /** DRAFT PLACEHOLDER COPY — see `overview`. */
  applications: string[];
  /** DRAFT PLACEHOLDER COPY — see `overview`. */
  faqs: ProductFaq[];
  /**
   * Capabilities table rows. Restructured from the previously authored
   * highlights — no new claims. Empty means nothing is published yet, and the
   * page says so rather than inventing detail.
   */
  specs: SpecRow[];
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
