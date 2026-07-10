"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/data/types";

const statusStyles: Record<Project["badgeVariant"], string> = {
  prototype: "text-amber-700",
  "in-development": "text-[#0096c7]",
  available: "text-green-700",
};

type Filter = { label: string; match: (project: Project) => boolean };

const filters: Filter[] = [
  { label: "All work", match: () => true },
  { label: "Aerospace", match: (p) => p.category.toUpperCase().includes("AEROSPACE") },
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

  const visible = useMemo(() => projects.filter(filters[active].match), [projects, active]);
  const [featured, ...rest] = visible;

  return (
    <main className="bg-white">
      {/* Intro */}
      <section className="max-w-7xl mx-auto px-6 pt-20 lg:pt-24">
        <p className="text-[#A10F1A] text-sm font-semibold tracking-wide mb-4">
          Selected work
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-[1.05] max-w-4xl">
          Engineering projects built to fly, sense, and teach.
        </h1>
        <div className="mt-8 flex flex-col gap-6 border-b border-gray-200 pb-6 md:flex-row md:items-end md:justify-between">
          <p className="text-lg text-gray-600 leading-relaxed max-w-[52ch]">
            A look at what we have designed and shipped, from flight controllers
            and CubeSats to hands-on kits that put embedded systems in more hands.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 md:justify-end">
            {filters.map((filter, index) => (
              <button
                key={filter.label}
                onClick={() => setActive(index)}
                className={`text-sm font-medium transition-colors ${
                  index === active
                    ? "text-gray-900 underline decoration-[#A10F1A] decoration-2 underline-offset-[6px]"
                    : "text-gray-400 hover:text-gray-700"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured case study */}
      {featured && (
        <section className="max-w-7xl mx-auto px-6 pt-12 lg:pt-16">
          <motion.div
            key={featured.id}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          >
            <div className="lg:col-span-7">
              <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-gray-50 group">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                />
                <span className="absolute top-4 left-4 text-xs font-mono text-white/90 bg-black/40 backdrop-blur px-2 py-1 rounded">
                  Featured
                </span>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 text-xs font-bold tracking-widest uppercase mb-4">
                <span className="text-[#A10F1A]">{featured.category.trim()}</span>
                <span className="text-gray-300">/</span>
                <span className={statusStyles[featured.badgeVariant]}>
                  {featured.badge}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4">
                {featured.title}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6 max-w-[46ch]">
                {featured.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {featured.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block border border-gray-200 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-full uppercase tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* Story gallery */}
      {rest.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 pt-24 lg:pt-32 pb-24">
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-16 lg:gap-y-24">
            {rest.map((project, index) => (
              <motion.article
                key={project.id}
                initial={reduce ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.6,
                  delay: reduce ? 0 : (index % 2) * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-50">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 46vw"
                  />
                </div>
                <div className="mt-5 flex items-center gap-3 text-xs font-bold tracking-widest uppercase">
                  <span className="text-[#A10F1A]">{project.category.trim()}</span>
                  <span className="text-gray-300">/</span>
                  <span className={statusStyles[project.badgeVariant]}>
                    {project.badge}
                  </span>
                </div>
                <h3 className="mt-2 text-2xl font-bold text-gray-900 tracking-tight">
                  {project.title}
                </h3>
                <p className="mt-2 text-gray-600 leading-relaxed max-w-[48ch] line-clamp-2">
                  {project.description}
                </p>
              </motion.article>
            ))}
          </div>
        </section>
      )}

      {visible.length === 0 && (
        <section className="max-w-7xl mx-auto px-6 py-24">
          <p className="text-center text-gray-500">No projects in this category yet.</p>
        </section>
      )}

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
