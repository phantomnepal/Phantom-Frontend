import type { Metadata } from "next";
import Link from "next/link";
import { getSiteContent } from "@/data/content";
import type { MegaMenuItem } from "@/data/types";

type Params = { slug: string[] };

/** Look up a product's megamenu entry by its /product/<slug> href. */
function findMenuItem(href: string): MegaMenuItem | undefined {
  const content = getSiteContent();
  for (const nav of content.navItems) {
    for (const column of nav.megaMenu?.columns ?? []) {
      const match = column.items.find((item) => item.href === href);
      if (match) return match;
    }
  }
  return undefined;
}

/** Fall back to a title derived from the last slug segment. */
function titleFromSlug(slug: string[]): string {
  const last = slug[slug.length - 1] ?? "";
  return last
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const href = `/product/${slug.join("/")}`;
  const item = findMenuItem(href);
  const name = item?.label ?? titleFromSlug(slug);
  return {
    title: `${name} – Phantom`,
    description: item?.description ?? `Product details for ${name}.`,
    robots: { index: false, follow: true },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const href = `/product/${slug.join("/")}`;
  const item = findMenuItem(href);
  const name = item?.label ?? titleFromSlug(slug);

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center max-w-lg mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{name}</h1>
        <p className="text-lg text-gray-600 mb-8">
          {item?.description ?? "Product details are on the way."} We are
          preparing a detailed page for this product. Check back soon.
        </p>
        <Link
          href="/product"
          className="inline-block bg-[#0f1e2e] text-white px-6 py-3 rounded-md hover:bg-[#1a3147] transition"
        >
          Back to Products
        </Link>
      </div>
    </main>
  );
}
