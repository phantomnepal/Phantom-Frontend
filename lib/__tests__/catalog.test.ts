import { describe, expect, it } from "vitest";
import {
  allCategories,
  allProducts,
  getProductBySlug,
  hasSpecs,
  productsInCategory,
  slugCollisions,
} from "@/lib/catalog";
import { getProjectBySlug, projectContentSlugs } from "@/lib/projects";

describe("catalog", () => {
  it("keeps product and category slugs disjoint", () => {
    // /product/[[...slug]] resolves categories before products, so a shared
    // slug would silently shadow the product page.
    expect(slugCollisions()).toEqual([]);
  });

  it("has unique product slugs", () => {
    const slugs = allProducts().map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("assigns every product to a real category", () => {
    const categorySlugs = new Set(allCategories().map((c) => c.slug));
    for (const product of allProducts()) {
      expect(categorySlugs).toContain(product.category);
    }
  });

  it("leaves no category empty", () => {
    for (const category of allCategories()) {
      expect(productsInCategory(category.slug).length).toBeGreaterThan(0);
    }
  });

  it("treats a product with no specs as having none", () => {
    // Not pinned to a slug any more: this used to name `esc-stack`, which was
    // parked, and every live product now publishes specs. What matters is that
    // an empty table is reported as empty so the page renders the "In
    // development" block instead of an empty table.
    const template = allProducts()[0];
    expect(hasSpecs({ ...template, specs: [] })).toBe(false);
    expect(hasSpecs(template)).toBe(true);
  });

  it("carries product specs on the product itself", () => {
    // The catalog is self-contained: no product page defers to /projects.
    const f722 = getProductBySlug("phantom-f722");
    expect(hasSpecs(f722!)).toBe(true);
    expect(f722!.specs).toContainEqual({
      label: "MCU",
      value: "STM32F722RETx",
    });
  });

  it("gives every product answerable FAQs", () => {
    for (const product of allProducts()) {
      expect(product.faqs.length, `no faqs for ${product.slug}`).toBeGreaterThan(0);
      for (const faq of product.faqs) {
        expect(faq.question.endsWith("?")).toBe(true);
        expect(faq.answer.length).toBeGreaterThan(0);
      }
    }
  });
});

describe("projects", () => {
  it("leaves no projectContent entry orphaned", () => {
    // Narrative keyed to a slug no project generates renders nowhere. Five
    // entries were dead this way before their specs moved into the catalog.
    for (const slug of projectContentSlugs()) {
      expect(getProjectBySlug(slug), `orphaned content: ${slug}`).toBeDefined();
    }
  });
});
