import Link from "next/link";
import type { Product, ProductCategory, ProductPageContent } from "@/data/types";
import { hasSpecs } from "@/lib/catalog";
import { StatusBadge } from "./status-badge";
import { BuyBox } from "./buy-box";
import { ProductGallery } from "./product-gallery";
import { Price } from "@/components/currency/price";
import {
  ApplicationsBand,
  CompleteYourBuildSection,
  EnquireStrip,
  ProductFaqSection,
  TechnicalSpecsSection,
} from "./product-sections";

/**
 * Product detail page, built to the Figma product page design.
 *
 * Two things on this page do not work, and both are deliberate:
 *
 *  - The cart controls (quantity, add to cart, buy now, and the companion
 *    cards' buttons) are inert. `main` has no cart or checkout; the store is on
 *    `ecommerce-phase1`, pending store.phantom.com.np.
 *  - "Get full datasheet" is inert. No product has a datasheet file yet.
 *
 * The stock pill and lead time in the hero are shown on every product at the
 * user's explicit instruction, including products still in development. Nothing
 * in the repo backs either claim — there is no inventory or fulfilment system.
 *
 * The enquiry strip above the footer is the only working call to action.
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
  // Three short figures beside the buy box. Curated per product where the
  // leading spec rows are part numbers or full sentences that wrap badly; falls
  // back to the top of the spec table otherwise. See Product['highlights'].
  const highlights = product.highlights ?? product.specs.slice(0, 3);

  return (
    <main>
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
          <nav aria-label="Breadcrumb" className="mb-8">
            <Link
              href={`/product/${category.slug}`}
              className="text-sm text-gray-500 hover:text-[#A10F1A] transition-colors"
            >
              ← {category.title}
            </Link>
          </nav>

          {/* The gallery column stretches so its hero ends flush with the buy
              box; the headline specs sit in the right column below the buy
              box, so they don't affect the hero height. */}
          <div className="grid lg:grid-cols-[467px_608px] gap-0 lg:gap-12">
            <ProductGallery product={product} />

            <div className="flex flex-col">
              <div className="mb-4">
                <StatusBadge status={product.status} />
              </div>

              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4">
                {product.title}
              </h1>

              <p className="text-base leading-relaxed text-gray-600">
                {product.description}
              </p>

              {product.priceUsd !== undefined && (
                <div className="mt-8 flex flex-wrap items-baseline gap-4">
                  <Price
                    usd={product.priceUsd}
                    className="text-3xl font-semibold text-gray-900"
                  />
                  {/* The lead time here was hardcoded "Ships in 2-4 Weeks" from
                      the Figma, which nothing backed. It now comes from the
                      product, and a product with no `statusNote` shows no lead
                      time at all rather than a made-up one — the 4WD kit and
                      the Starter Kit ship in 2-4 *days*, and the CubeSat does
                      not ship at all yet. */}
                  {product.statusNote && (
                    <span className="text-sm text-gray-500">
                      {product.statusNote}
                    </span>
                  )}
                </div>
              )}

              <BuyBox />

              {highlights.length > 0 && (
                <dl className="mt-8 grid grid-cols-1 gap-6 border-t border-gray-200 pt-6 sm:grid-cols-3">
                  {highlights.map((spec) => (
                    <div key={spec.label}>
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500">
                        {spec.label}
                      </dt>
                      <dd className="mt-1 text-sm font-medium text-gray-900">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          </div>

          {!hasSpecs(product) && (
            <div className="mt-8 rounded-md border border-gray-200 bg-gray-50 p-6">
              <p className="mb-2 font-semibold text-gray-900">
                In development
              </p>
              <p className="text-sm leading-relaxed text-gray-600">
                This product is still being engineered, so we haven&apos;t
                published specifications yet. If you have a requirement in
                mind, talk to us about it — early conversations shape what
                we build.
              </p>
            </div>
          )}
        </div>
      </section>

      <ApplicationsBand product={product} />
      {hasSpecs(product) && <TechnicalSpecsSection product={product} />}
      <ProductFaqSection product={product} />
      <CompleteYourBuildSection products={related} category={category} />
      <EnquireStrip content={pageContent.enquire} />
    </main>
  );
}
