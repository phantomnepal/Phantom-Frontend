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

export interface Product {
  category: string;
  title: string;
  image: string;
  href: string;
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
  /** For productCatalog items: the store PDP slug this maps to (store.phantom.com.np/products/<slug>). */
  storeSlug?: string;
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
  storeUrl: string;
  navItems: NavItem[];
  searchableItems: SearchableItem[];
  footerQuickLinks: FooterLink[];
  footerEngineeringLinks: FooterLink[];
  footerProductLinks: FooterLink[];
  solutions: Solution[];
  capabilities: Capability[];
  products: Product[];
  logos: Logo[];
  faqLeft: FAQItem[];
  faqRight: FAQItem[];
  projects: Project[];
  productCatalog: Project[];
  coreValues: CoreValue[];
  roadmap: RoadmapItem[];
  contactInfo: ContactInfo[];
  socialLinks: SocialLink[];
  heroImages: HeroImage[];
}
