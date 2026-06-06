import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/animate-ui/primitives/radix/accordion";
import { getSiteContent } from "@/data/content";
import type { FAQItem } from "@/data/types";

type FAQAccordionProps = {
  items: FAQItem[];
};

function FAQAccordion({ items }: FAQAccordionProps) {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full overflow-hidden rounded-md border border-gray-200 bg-white shadow-md"
    >
      {items.map(({ value, question, answer, list }, index) => (
        <AccordionItem
          key={value}
          value={value}
          className={`px-5 ${
            index !== items.length - 1 ? "border-b border-gray-100" : ""
          }`}
        >
          <AccordionTrigger
            className="w-full py-5 text-left text-sm font-semibold
                text-gray-800 transition-colors duration-200
                hover:text-[#A10F1A] md:text-base"
          >
            {question}
          </AccordionTrigger>

          <AccordionContent className="pb-5 text-sm leading-relaxed text-gray-600 md:text-base">
            {answer && <p>{answer}</p>}

            {list && (
              <ul className="mt-2 space-y-2">
                {list.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#A10F1A]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default function HomeAccordion() {
  const content = getSiteContent();
  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 flex flex-col items-start gap-2">
          <span className=" px-2 py-1 text-md font-semibold uppercase tracking-widest text-[#A10F1A]">
            FAQ
          </span>

          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Frequently Asked Questions
          </h2>

          <p className="max-w-xl text-sm text-gray-500 md:text-base">
            Have questions? We&apos;ve got answers. If you don&apos;t find what
            you&apos;re looking for, feel free to{" "}
            <a
              href="/contact"
              className="font-medium text-[#A10F1A] underline underline-offset-2 hover:opacity-80"
            >
              contact us
            </a>
            .
          </p>
        </div>

        {/* Accordion Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <FAQAccordion items={content.faqLeft} />
          <FAQAccordion items={content.faqRight} />
        </div>
      </div>
    </section>
  );
}
