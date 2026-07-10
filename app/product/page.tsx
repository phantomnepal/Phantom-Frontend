import type { Metadata } from "next";
import Image from "next/image";
import { getSiteContent } from "@/data/content";

export const metadata: Metadata = {
  title: "Products – Phantom",
  description:
    "Explore Phantom's high-performance aerospace and robotics systems, engineered for resilience, speed, and mission-critical reliability.",
};

const badgeStyles = {
  prototype: "border-amber-500 text-amber-700",
  "in-development": "border-[#0096c7] text-gray-600",
  available: "border-green-600 text-green-700",
};

export default function ProductPage() {
  const content = getSiteContent();
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="pt-16 pb-12 md:pt-16 md:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Precision Engineering for the{" "}
            <span className="text-[#A10F1A]">Next Frontier</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed">
            PHANTOM is dedicated to pushing the boundaries of high-performance
            aerospace and robotics. Our systems are engineered for resilience,
            speed, and uncompromising reliability in mission-critical
            environments.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.projects.map((project, index) => (
              <div
                key={project.id}
                className="group border border-gray-200 bg-white flex flex-col rounded-md overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index === 0}
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-3 gap-4">
                    <span className="text-xs font-bold tracking-widest text-[#A10F1A]">
                      {project.category}
                    </span>
                    <span
                      className={`shrink-0 text-[10px] font-semibold tracking-wider border px-2 py-0.5 ${badgeStyles[project.badgeVariant]}`}
                    >
                      {project.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {project.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>

                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-block bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-sm uppercase"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <a
                      href="#"
                      className="inline-flex items-center gap-1 text-sm font-semibold text-[#A10F1A] hover:text-[#A10F1A] transition-colors"
                    >
                      VIEW DETAILS <span className="text-base">→</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
