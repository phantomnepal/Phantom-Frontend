import Image from "next/image";
import Link from "next/link";
import type { Product, ProductCategory, ProductPageContent } from "@/data/types";
import { hasSpecs } from "@/lib/catalog";
import { StatusBadge } from "./status-badge";
import {
  ApplicationsSection,
  CapabilitiesSection,
  OrderStepsSection,
  OverviewSection,
  ProductCtaSection,
  ProductFaqSection,
  RelatedProductsSection,
  WhyChooseSection,
} from "./product-sections";

/**
 * Product detail page, following the anatomy of jlcpcb.com's FR4 page in
 * Phantom's own UI. See docs/research/PRODUCT_PAGE_TOPOLOGY.md.
 *
 * Two source sections are deliberately omitted: customer testimonials (Phantom
 * has no reviews, and inventing them is not an option) and the resources/blog
 * grid (there is no blog to link to).
 */
export function ProductDetail({
  product,
  category,
  related,
  pageContent,
}: {
  product: Product;
  category: ProductCategory;
  related: Product[];
  pageContent: ProductPageContent;
}) {
  return (
    <main>
      {/* Section 1 — hero */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
          <nav aria-label="Breadcrumb" className="mb-8">
            <Link
              href={`/product/${category.slug}`}
              className="text-sm text-gray-500 hover:text-[#A10F1A] transition-colors"
            >
              ← {category.title}
            </Link>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-gray-50">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-xs font-bold tracking-widest text-[#A10F1A]">
                  {category.title}
                </span>
                <StatusBadge status={product.status} />
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4">
                {product.title}
              </h1>

              <p className="text-lg text-gray-600 leading-relaxed">
                {product.description}
              </p>

              {product.statusNote && (
                <p className="mt-4 text-sm text-gray-500 leading-relaxed">
                  {product.statusNote}
                </p>
              )}

              {!hasSpecs(product) && (
                <div className="mt-8 border border-gray-200 rounded-md p-6 bg-gray-50">
                  <p className="font-semibold text-gray-900 mb-2">
                    In development
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    This product is still being engineered, so we haven&apos;t
                    published specifications yet. If you have a requirement in
                    mind, talk to us about it — early conversations shape what
                    we build.
                  </p>
                </div>
              )}

              <div className="mt-8">
                <Link
                  href="/contact"
                  className="inline-block bg-[#0f1e2e] text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-[#1a3147] transition-colors"
                >
                  Enquire about this product
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <OverviewSection product={product} />
      <ApplicationsSection product={product} />
      {hasSpecs(product) && (
        <CapabilitiesSection product={product} specs={product.specs} />
      )}
      {/* A product may override the site-level reasons where they would read as
          nonsense on the rest of the catalog. */}
      <WhyChooseSection content={product.whyChoose ?? pageContent.whyChoose} />
      <OrderStepsSection product={product} steps={pageContent.orderSteps} />
      <ProductFaqSection product={product} />
      <RelatedProductsSection
        products={related}
        categoryTitle={category.title}
      />
      <ProductCtaSection product={product} />
    </main>
  );
}
