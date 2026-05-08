import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/animate-ui/components/radix/accordion";

const faqLeft = [
  {
    value: "item-1",
    question: "What is Phantom?",
    answer:
      "Phantom is an engineering-focused company developing embedded systems, robotics, IoT platforms, UAV technologies, and educational electronics products designed for real-world applications.",
  },
  {
    value: "item-2",
    question: "What products does Phantom offer?",
    answer: null,
    list: [
      "Electronics starter kits",
      "Embedded systems kits",
      "Robotics and IoT learning kits",
      "UAV and flight controller development projects",
    ],
  },
  {
    value: "item-3",
    question: "Who are Phantom products designed for?",
    answer: null,
    list: [
      "Students and beginners",
      "STEM learners",
      "Engineering enthusiasts",
      "Educational institutions",
      "Developers and hobby makers",
    ],
  },
  {
    value: "item-4",
    question: "Why are Phantom kits different from typical electronics kits?",
    answer:
      "Instead of including excessive unused components, Phantom focuses on carefully selected, practical components that are widely used in real-world electronics, embedded systems, robotics, and IoT projects.",
  },
  {
    value: "item-5",
    question: "Do I need prior experience to use the kits?",
    answer:
      "No. Our starter kits are designed to be beginner-friendly while still being expandable for advanced learning and future projects.",
  },
];

const faqRight = [
  {
    value: "item-1",
    question: "What can I build using the Phantom Electronics Starter Kit?",
    answer: null,
    list: [
      "LED control systems",
      "Sensor-based automation",
      "LCD display systems",
      "Motion detection alarms",
      "Servo control projects",
      "Basic smart automation systems",
    ],
  },
  {
    value: "item-2",
    question: "Does Phantom provide tutorials or documentation?",
    answer:
      "Yes. We provide project documentation, example codes, circuit references, and learning resources to help users build and understand projects effectively.",
  },
  {
    value: "item-3",
    question: "Are Phantom products future-proof?",
    answer:
      "Yes. We focus on components and platforms that are commonly used across embedded systems, robotics, IoT, and automation projects, allowing users to continue expanding beyond beginner-level learning.",
  },
  {
    value: "item-4",
    question: "Do you deliver all over Nepal?",
    answer:
      "Yes. Phantom products are available with nationwide delivery across Nepal.",
  },
  {
    value: "item-5",
    question: "Can institutions or schools collaborate with Phantom?",
    answer:
      "Absolutely. We are open to educational collaborations, workshops, training programs, and project-based partnerships with schools, colleges, and organizations.",
  },
];

function FAQAccordion({ items }) {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md transition-all"
    >
      {items.map(({ value, question, answer, list }) => (
        <AccordionItem
          key={value}
          value={value}
          className="group px-5 transition-colors duration-200 hover:bg-gray-50 data-[state=open]:bg-[#fff5f5]"
        >
          <AccordionTrigger className="flex w-full items-center justify-between gap-4 py-5 text-left text-sm font-semibold text-gray-800 transition-colors duration-200 group-hover:text-[#A10F1A] data-[state=open]:text-[#A10F1A] md:text-base [&>svg]:text-[#A10F1A] [&>svg]:transition-transform [&>svg]:duration-300">
            {question}
          </AccordionTrigger>

          <AccordionContent className="pb-5 text-sm leading-relaxed text-gray-600 md:text-base">
            {answer && <p>{answer}</p>}
            {list && (
              <ul className="mt-2 space-y-2">
                {list.map((item, i) => (
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
  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 flex flex-col items-start gap-2">
          <span className="rounded-full bg-[#A10F1A]/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#A10F1A]">
            FAQ
          </span>
          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Frequently Asked Questions
          </h2>
          <p className="max-w-xl text-sm text-gray-500 md:text-base">
            Have questions? We've got answers. If you don't find what you're
            looking for, feel free to{" "}
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
          <FAQAccordion items={faqLeft} />
          <FAQAccordion items={faqRight} />
        </div>
      </div>
    </section>
  );
}
