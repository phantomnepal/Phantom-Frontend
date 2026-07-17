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

/** A product is only detailed enough for a capabilities table once it has specs. */
export function hasSpecs(product: Product): boolean {
  return product.specs.length > 0;
}
