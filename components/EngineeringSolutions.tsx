import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getSiteContent } from "@/data/content";
import { solutionIcons } from "@/data/icons";

export default function EngineeringSolutions() {
  const content = getSiteContent();
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-brand font-semibold text-sm tracking-wider mb-3">
            OUR ENGINEERING SOLUTIONS
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            From Components to Complete Embedded Systems
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Phantom provides a structured ecosystem of embedded engineering
            hardware from foundational components to advanced system platforms.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {content.solutions.map((item, idx) => {
            const Icon = solutionIcons[item.iconName];
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 hover:shadow-md transition-shadow"
              >
                <p className="text-gray-500 text-sm font-medium tracking-wider mb-4">
                  {item.layer}
                </p>

                <div className="text-brand mb-5">
                  <Icon className="w-10 h-10" strokeWidth={1.5} />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>

                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {item.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href="/engineering"
                  className="inline-flex items-center gap-2 text-brand font-semibold text-sm hover:gap-3 transition-all"
                >
                  Explore More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
