import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/animate-ui/primitives/radix/accordion";
import type { Product, ProductCategory, ProductPageContent } from "@/data/types";
import { applicationIcons } from "@/data/icons";
import { getCategoryBySlug } from "@/lib/catalog";
import { Price } from "@/components/currency/price";

/**
 * Product page sections, following the Figma product page.
 *
 * Order: hero (see product-detail) → applications band → technical
 * specifications on dark → FAQ → Complete Your Build → closing enquiry strip.
 *
 * The previous JLCPCB-derived anatomy (docs/research/PRODUCT_PAGE_TOPOLOGY.md)
 * had three sections the design drops: the "What is it" overview prose, "Why
 * Choose Phantom", and "How to Order". Their content survives in
 * `productPageContent` and `Product.overview`, unrendered.
 */

export function SectionShell({
  tinted = false,
  children,
}: {
  tinted?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className={tinted ? "bg-[#F5F6F8]" : "bg-white"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        {children}
      </div>
    </section>
  );
}

/**
 * Applications band — icon, all-caps label and sentence per card.
 *
 * Only the power supply's three entries are authored copy; the rest carry the
 * previously written sentence unchanged with a label added. See
 * ProductApplication.
 */
export function ApplicationsBand({ product }: { product: Product }) {
  if (product.applications.length === 0) return null;
  return (
    <section className="bg-[#F5F6F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {product.applications.map((application) => {
            const Icon = applicationIcons[application.iconName];
            return (
              <div
                key={application.title}
                className="flex items-start gap-5 rounded-md bg-white px-6 py-6 shadow-sm"
              >
                {Icon && (
                  <span className="shrink-0 rounded border border-gray-200 p-2.5 text-[#A10F1A]">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                )}
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-600">
                    {application.title}
                  </p>
                  <p className="mt-1.5 leading-relaxed text-gray-900">
                    {application.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/**
 * Technical specifications, on dark.
 *
 * Rendered only when the product has specs — the five in-development SKUs show
 * the "In development" note in the hero instead, rather than an empty grid.
 */
export function TechnicalSpecsSection({ product }: { product: Product }) {
  return (
    <section className="bg-[#0f1e2e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-3">
              Architecture &amp; Performance
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
              Technical Specifications
            </h2>
          </div>
          {/* Inert: there is no datasheet PDF in the repo for any product. */}
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md border border-white/25 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition hover:border-white/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Get Full Datasheet
            <Download className="h-3.5 w-3.5" />
          </button>
        </div>

        <dl className="grid border-t border-l border-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {product.specs.map((spec) => (
            <div
              key={spec.label}
              className="border-b border-r border-white/10 px-6 py-6"
            >
              <dt className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-400">
                {spec.label}
              </dt>
              <dd className="mt-2 text-sm font-medium text-white">
                {spec.value}
              </dd>
            </div>
          ))}
          {/* Close the rectangle. A spec count that is not a multiple of three
              would otherwise leave the last row unbordered on the right, which
              reads as a rendering fault rather than a datasheet. */}
          {Array.from({
            length: (3 - (product.specs.length % 3)) % 3,
          }).map((_, i) => (
            <div
              key={`filler-${i}`}
              aria-hidden="true"
              className="hidden border-b border-r border-white/10 lg:block"
            />
          ))}
        </dl>
      </div>
    </section>
  );
}

/** FAQ — accordion, closed by default, centred heading per the design. */
export function ProductFaqSection({ product }: { product: Product }) {
  return (
    <SectionShell tinted>
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h2 className="text-lg font-semibold text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Technical and operational inquiries regarding the {product.title}.
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full space-y-3">
          {product.faqs.map((faq) => (
            <AccordionItem
              key={faq.question}
              value={faq.question}
              className="overflow-hidden rounded-md border border-gray-200 bg-white px-5"
            >
              <AccordionTrigger className="w-full py-5 text-left text-sm font-semibold text-gray-900">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-sm leading-relaxed text-gray-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </SectionShell>
  );
}

/**
 * Per-card action in the companion rail.
 *
 * Derived from status rather than hardcoded: the Figma mixes "Add to cart",
 * "Notify me" and "View details" across four cards with no stated rule. Both
 * buttons are inert for the same reason as the hero buy box.
 */
function cardCta(status: Product["status"]): string {
  return status === "available" ? "ADD TO CART" : "NOTIFY ME";
}

/** "Complete Your Build" — companion products. */
export function CompleteYourBuildSection({
  products,
  category,
}: {
  products: Product[];
  category: ProductCategory;
}) {
  if (products.length === 0) return null;
  return (
    <SectionShell>
      <div className="mb-10 flex items-end justify-between gap-6">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
          Complete Your Build
        </h2>
        <Link
          href={`/product/${category.slug}`}
          className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-[#A10F1A] hover:underline"
        >
          View All <span className="text-base">→</span>
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => {
          const productCategory = getCategoryBySlug(product.category);
          return (
            <div
              key={product.slug}
              className="flex flex-col rounded-md border border-gray-200 bg-white p-4 transition hover:shadow-lg"
            >
              <Link
                href={`/product/${product.slug}`}
                className="group relative block aspect-[4/3] overflow-hidden rounded bg-[#F5F6F8]"
              >
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </Link>

              <p className="mt-4 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                {productCategory?.title ?? product.category}
              </p>
              <Link
                href={`/product/${product.slug}`}
                className="mt-1 font-semibold text-gray-900 hover:text-[#A10F1A] transition-colors"
              >
                {product.title}
              </Link>
              {product.priceUsd !== undefined && (
                <p className="mt-2 text-lg font-semibold text-[#A10F1A]">
                  <Price usd={product.priceUsd} />
                </p>
              )}

              <button
                type="button"
                className="mt-auto w-full rounded border border-gray-300 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-gray-900 transition hover:border-gray-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f1e2e]"
              >
                {cardCta(product.status)}
              </button>
            </div>
          );
        })}
      </div>
    </SectionShell>
  );
}

/**
 * Closing enquiry strip.
 *
 * Site-level copy, deliberately generic — the Figma's subline is specific to
 * the power supply and would be false on the other twelve products. This is the
 * only working call to action on the page.
 */
export function EnquireStrip({
  content,
}: {
  content: ProductPageContent["enquire"];
}) {
  return (
    <section className="bg-[#0f1e2e] border-b border-white/10">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-6 px-4 sm:px-6 lg:px-8 py-10">
        <div>
          <h2 className="text-lg font-semibold text-white">{content.title}</h2>
          <p className="mt-1 text-sm text-gray-400">{content.subtitle}</p>
        </div>
        <Link
          href="/contact"
          className="inline-flex shrink-0 items-center rounded bg-white px-7 py-3 text-xs font-semibold uppercase tracking-wider text-[#0f1e2e] transition hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {content.cta}
        </Link>
      </div>
    </section>
  );
}
