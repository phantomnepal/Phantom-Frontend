"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/data/types";

const badgeStyles: Record<Project["badgeVariant"], string> = {
  prototype: "border-amber-500 text-amber-700",
  "in-development": "border-[#0096c7] text-gray-600",
  available: "border-green-600 text-green-700",
};

type Filter = {
  label: string;
  match: (project: Project) => boolean;
};

const filters: Filter[] = [
  { label: "All work", match: () => true },
  {
    label: "Aerospace",
    match: (p) => p.category.toUpperCase().includes("AEROSPACE"),
  },
  {
    label: "Flight Controllers",
    match: (p) => p.category.toUpperCase().includes("FLIGHT CONTROLLER"),
  },
  {
    label: "Educational",
    match: (p) => p.category.toUpperCase().includes("EDUCATIONAL PRODUCTS"),
  },
];

export function ProjectsView({ projects }: { projects: Project[] }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  const visible = useMemo(
    () => projects.filter(filters[active].match),
    [projects, active],
  );

  return (
    <main className="bg-white">
      {/* Intro */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-12 lg:pt-24">
        <div className="max-w-3xl">
          <p className="text-[#A10F1A] text-sm font-semibold tracking-wide mb-4">
            Selected work
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-[1.05]">
            Engineering projects built to fly, sense, and teach.
          </h1>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-[60ch]">
            A look at what we have designed and shipped, from flight controllers
            and CubeSats to hands-on kits that put embedded systems in more
            hands.
          </p>
        </div>

        {/* Filters */}
        <div className="mt-10 flex flex-wrap gap-2">
          {filters.map((filter, index) => {
            const isActive = index === active;
            return (
              <button
                key={filter.label}
                onClick={() => setActive(index)}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors active:translate-y-[1px] ${
                  isActive
                    ? "border-[#0f1e2e] bg-[#0f1e2e] text-white"
                    : "border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-900"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {visible.map((project, index) => (
              <motion.article
                key={project.id}
                layout
                initial={reduce ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.98 }}
                transition={{
                  duration: 0.4,
                  delay: reduce ? 0 : Math.min(index * 0.05, 0.3),
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group border border-gray-200 bg-white flex flex-col rounded-md overflow-hidden transition-shadow duration-300 hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <span className="text-xs font-bold tracking-widest text-[#A10F1A] uppercase">
                      {project.category.trim()}
                    </span>
                    <span
                      className={`shrink-0 text-[10px] font-semibold tracking-wider border px-2 py-0.5 ${badgeStyles[project.badgeVariant]}`}
                    >
                      {project.badge}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-gray-900 mb-3">
                    {project.title}
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>

                  <div className="mt-auto flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-sm uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {visible.length === 0 && (
          <p className="text-center text-gray-500 py-20">
            No projects in this category yet.
          </p>
        )}
      </section>

      {/* CTA */}
      <section className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              Have a system that needs building?
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              We take embedded hardware, firmware, and mechanical design from
              concept to working prototype. Tell us what you are working on.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#0f1e2e] text-white px-7 py-3.5 rounded-md text-sm font-medium hover:bg-[#1a3147] transition active:translate-y-[1px] shrink-0"
          >
            Get in touch
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
