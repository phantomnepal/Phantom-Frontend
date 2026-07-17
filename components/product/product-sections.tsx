import Image from "next/image";
import Link from "next/link";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/animate-ui/primitives/radix/accordion";
import type { Product, ProductPageContent, SpecRow } from "@/data/types";
import { StatusBadge } from "./status-badge";

/**
 * Product page sections, following the anatomy of
 * jlcpcb.com/pcb-fabrication/fr4-pcb (see docs/research/PRODUCT_PAGE_TOPOLOGY.md)
 * rendered in Phantom's own UI.
 *
 * Sections are separated by an alternating white / #F5F6F8 rhythm, as on the
 * source page.
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

export function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow?: string;
  title: string;
}) {
  return (
    <div className="mb-10">
      {eyebrow && (
        <p className="text-[#A10F1A] font-semibold text-sm tracking-wider mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
        {title}
      </h2>
    </div>
  );
}

/** Section 2 — "What is the {product}?" */
export function OverviewSection({ product }: { product: Product }) {
  return (
    <SectionShell>
      <div className="max-w-3xl">
        <SectionHeading title={`What is the ${product.title}?`} />
        <p className="text-gray-600 leading-relaxed text-lg">
          {product.overview}
        </p>
      </div>
    </SectionShell>
  );
}

/** Section 3 — Applications. Source uses 3 image cards; we use numbered cards. */
export function ApplicationsSection({ product }: { product: Product }) {
  return (
    <SectionShell tinted>
      <SectionHeading title={`Common Applications of the ${product.title}`} />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {product.applications.map((application, i) => (
          <div
            key={application}
            className="bg-white border border-gray-200 rounded-md p-6"
          >
            <span className="font-mono text-sm text-[#A10F1A]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="mt-3 text-gray-700 leading-relaxed">{application}</p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

/** Section 6 — Capabilities table. Mirrors the source's Features|Capabilities grid. */
export function CapabilitiesSection({
  product,
  specs,
}: {
  product: Product;
  specs: SpecRow[];
}) {
  return (
    <SectionShell>
      <SectionHeading title={`${product.title} Specifications`} />
      <div className="overflow-x-auto border border-gray-200 rounded-md">
        <table className="w-full text-left border-collapse min-w-[520px]">
          <thead>
            <tr className="bg-[#0f1e2e] text-white">
              <th className="py-4 px-6 text-sm font-semibold w-1/3">Feature</th>
              <th className="py-4 px-6 text-sm font-semibold">Specification</th>
            </tr>
          </thead>
          <tbody>
            {specs.map((spec, i) => (
              <tr
                key={spec.label}
                className={i % 2 === 1 ? "bg-[#F5F6F8]" : "bg-white"}
              >
                <th
                  scope="row"
                  className="py-4 px-6 text-sm font-medium text-gray-900 align-top border-t border-gray-200"
                >
                  {spec.label}
                </th>
                <td className="py-4 px-6 text-sm text-gray-700 border-t border-gray-200">
                  {spec.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionShell>
  );
}

/** Section 7 — Why Choose Phantom. Site-level, shared across products. */
export function WhyChooseSection({
  content,
}: {
  content: ProductPageContent["whyChoose"];
}) {
  return (
    <SectionShell tinted>
      <SectionHeading title="Why Choose Phantom?" />
      <div className="grid gap-8 sm:grid-cols-2">
        {content.map((item) => (
          <div key={item.title} className="border-t border-gray-300 pt-5">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {item.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

/** Section 8 — How to order, in 3 steps. */
export function OrderStepsSection({
  product,
  steps,
}: {
  product: Product;
  steps: ProductPageContent["orderSteps"];
}) {
  return (
    <SectionShell>
      <SectionHeading title={`How to Order the ${product.title}`} />
      <div className="grid gap-8 md:grid-cols-3">
        {steps.map((step, i) => (
          <div key={step.title}>
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#A10F1A] text-white font-mono text-sm">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 text-lg font-bold text-gray-900 mb-2">
              {step.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

/** Section 9 — FAQ. Source: accordion, none open by default. */
export function ProductFaqSection({ product }: { product: Product }) {
  return (
    <SectionShell tinted>
      <div className="max-w-3xl">
        <SectionHeading
          title={`Frequently Asked Questions About the ${product.title}`}
        />
        <Accordion
          type="single"
          collapsible
          className="w-full overflow-hidden rounded-md border border-gray-200 bg-white"
        >
          {product.faqs.map((faq, index) => (
            <AccordionItem
              key={faq.question}
              value={faq.question}
              className={`px-5 ${
                index !== product.faqs.length - 1
                  ? "border-b border-gray-100"
                  : ""
              }`}
            >
              <AccordionTrigger className="w-full py-5 text-left text-sm font-semibold text-gray-900">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-sm text-gray-600 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </SectionShell>
  );
}

/** Section 11 — Related products. Derived from the catalog, same category. */
export function RelatedProductsSection({
  products,
  categoryTitle,
}: {
  products: Product[];
  categoryTitle: string;
}) {
  if (products.length === 0) return null;
  return (
    <SectionShell>
      <SectionHeading title={`More in ${categoryTitle}`} />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Link
            key={product.slug}
            href={`/product/${product.slug}`}
            className="group border border-gray-200 bg-white rounded-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="font-bold text-gray-900 group-hover:text-[#A10F1A] transition-colors">
                  {product.title}
                </h3>
                <StatusBadge status={product.status} />
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                {product.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </SectionShell>
  );
}

/**
 * Section 12 — Closing CTA.
 *
 * Layout follows sequencehq.com's closing CTA: a bordered, rounded card
 * floating on the page rather than a full-bleed band — a centred stack of
 * heading, subline and a pill button. Rendered in Phantom's own UI, on the
 * same #F5F6F8 the tinted sections use.
 */
export function ProductCtaSection({ product }: { product: Product }) {
  return (
    <section className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-2xl border border-gray-200 shadow-sm bg-[#F5F6F8] px-6 py-[52px] flex flex-col items-center gap-12 text-center">
          <div className="flex flex-col items-center gap-4">
            <h2 className="max-w-[420px] text-3xl md:text-4xl font-bold leading-tight tracking-tight text-gray-900">
              Talk to us about the {product.title}
            </h2>
            <p className="max-w-[280px] text-sm leading-relaxed text-gray-500">
              Tell us what you need it to do, and we will tell you where it
              stands.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center whitespace-nowrap rounded-full bg-[#0f1e2e] px-5 py-3 text-sm leading-none text-white transition-colors duration-150 hover:bg-[#A10F1A]"
          >
            Enquire now
          </Link>
        </div>
      </div>
    </section>
  );
}
