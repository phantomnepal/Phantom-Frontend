import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSiteContent } from "@/data/content";
import { ProductLanding } from "@/components/product/product-landing";
import { ProductCategoryView } from "@/components/product/product-category-view";
import { ProductDetail } from "@/components/product/product-detail";
import {
  allCategories,
  allProducts,
  getCategoryBySlug,
  getProductBySlug,
  productsInCategory,
} from "@/lib/catalog";

/**
 * One catch-all serves three shapes, because Next.js cannot host two
 * differently-named dynamic segments at the same level:
 *
 *   /product                    → category landing
 *   /product/uav-systems        → category listing
 *   /product/phantom-f722       → product detail
 *
 * Categories and products therefore share a slug namespace; lib/catalog's
 * slugCollisions() is asserted in tests to keep them disjoint.
 */
type Params = { slug?: string[] };

type Resolved =
  | { kind: "landing" }
  | { kind: "category"; slug: string }
  | { kind: "product"; slug: string }
  | { kind: "missing" };

function resolve(slug: string[] | undefined): Resolved {
  if (!slug || slug.length === 0) return { kind: "landing" };
  if (slug.length > 1) return { kind: "missing" };

  const [segment] = slug;
  if (getCategoryBySlug(segment)) return { kind: "category", slug: segment };
  if (getProductBySlug(segment)) return { kind: "product", slug: segment };
  return { kind: "missing" };
}

export function generateStaticParams(): Params[] {
  return [
    { slug: [] },
    ...allCategories().map((category) => ({ slug: [category.slug] })),
    ...allProducts().map((product) => ({ slug: [product.slug] })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resolved = resolve(slug);

  if (resolved.kind === "category") {
    const category = getCategoryBySlug(resolved.slug)!;
    return {
      title: `${category.title} – Phantom`,
      description: category.description,
    };
  }

  if (resolved.kind === "product") {
    const product = getProductBySlug(resolved.slug)!;
    return {
      title: `${product.title} – Phantom`,
      description: product.description,
    };
  }

  if (resolved.kind === "missing") return { title: "Not found – Phantom" };

  return {
    title: "Products – Phantom",
    description:
      "Explore Phantom's high-performance aerospace and robotics systems, engineered for resilience, speed, and mission-critical reliability.",
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const resolved = resolve(slug);

  switch (resolved.kind) {
    case "landing":
      return <ProductLanding />;

    case "category": {
      const category = getCategoryBySlug(resolved.slug)!;
      return (
        <ProductCategoryView
          category={category}
          products={productsInCategory(category.slug)}
        />
      );
    }

    case "product": {
      const product = getProductBySlug(resolved.slug)!;
      const category = getCategoryBySlug(product.category);
      if (!category) notFound();
      const related = productsInCategory(category.slug).filter(
        (p) => p.slug !== product.slug,
      );
      return (
        <ProductDetail
          product={product}
          category={category}
          related={related}
          pageContent={getSiteContent().productPageContent}
        />
      );
    }

    default:
      notFound();
  }
}
