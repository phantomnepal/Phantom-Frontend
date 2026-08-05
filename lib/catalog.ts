import { getSiteContent } from "@/data/content";
import type { Product, ProductCategory } from "@/data/types";

export function allProducts(): Product[] {
  return getSiteContent().catalog;
}

export function allCategories(): ProductCategory[] {
  return getSiteContent().productCategories;
}

export function getProductBySlug(slug: string): Product | undefined {
  return allProducts().find((product) => product.slug === slug);
}

export function getCategoryBySlug(slug: string): ProductCategory | undefined {
  return allCategories().find((category) => category.slug === slug);
}

export function productsInCategory(categorySlug: string): Product[] {
  return allProducts().filter((product) => product.category === categorySlug);
}

/**
 * Products and categories share the /product/[…slug] namespace, so their slugs
 * must never collide. Guarded by a test.
 */
export function slugCollisions(): string[] {
  const categorySlugs = new Set(allCategories().map((c) => c.slug));
  return allProducts()
    .map((p) => p.slug)
    .filter((slug) => categorySlugs.has(slug));
}

/**
 * Companions for the "Complete Your Build" rail.
 *
 * Category siblings first, then the rest of the catalog in order, so the grid
 * always fills even for a category with only two other products. Relevance
 * degrades gracefully rather than the layout breaking.
 */
export function relatedProducts(product: Product, limit = 4): Product[] {
  const others = allProducts().filter((p) => p.slug !== product.slug);
  const siblings = others.filter((p) => p.category === product.category);
  const rest = others.filter((p) => p.category !== product.category);
  return [...siblings, ...rest].slice(0, limit);
}

/** A product is only detailed enough for a capabilities table once it has specs. */
export function hasSpecs(product: Product): boolean {
  return product.specs.length > 0;
}
