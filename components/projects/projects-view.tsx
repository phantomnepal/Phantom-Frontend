"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
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
  const [hovered, setHovered] = useState<number | null>(null);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const previewX = useSpring(pointerX, { stiffness: 350, damping: 30, mass: 0.5 });
  const previewY = useSpring(pointerY, { stiffness: 350, damping: 30, mass: 0.5 });

  // The floating preview follows the pointer; clear it on scroll so it does
  // not linger over later sections (scroll does not fire mouseleave).
  useEffect(() => {
    if (hovered === null) return;
    const clear = () => setHovered(null);
    window.addEventListener("scroll", clear, { passive: true });
    return () => window.removeEventListener("scroll", clear);
  }, [hovered]);

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

      {/* Work index */}
      {rest.length > 0 && (
        <section
          className="max-w-7xl mx-auto px-6 pt-20 lg:pt-28 pb-24"
          onMouseMove={(e) => {
            pointerX.set(e.clientX + 24);
            pointerY.set(e.clientY - 120);
          }}
          onMouseLeave={() => setHovered(null)}
        >
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">
            More projects
          </h3>
          <ul className="border-t border-gray-200">
            {rest.map((project, index) => (
              <li key={project.id}>
                <div
                  onMouseEnter={() => setHovered(project.id)}
                  className="group relative grid grid-cols-12 items-center gap-4 border-b border-gray-200 py-6 md:py-7 transition-colors"
                >
                  <span className="col-span-2 md:col-span-1 font-mono text-sm text-gray-400 group-hover:text-[#A10F1A] transition-colors">
                    {String(index + 2).padStart(2, "0")}
                  </span>

                  {/* Mobile thumbnail */}
                  <div className="col-span-3 lg:hidden relative aspect-[4/3] rounded overflow-hidden bg-gray-50">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="30vw"
                    />
                  </div>

                  <span className="col-span-7 md:col-span-6 lg:col-span-6 text-lg md:text-2xl font-bold text-gray-900 md:group-hover:translate-x-2 transition-transform duration-300">
                    {project.title}
                  </span>
                  <span className="hidden md:block md:col-span-3 text-sm text-gray-500 uppercase tracking-wide">
                    {project.category.trim()}
                  </span>
                  <span
                    className={`hidden md:flex md:col-span-2 items-center justify-end gap-2 text-xs font-semibold uppercase tracking-wider ${statusStyles[project.badgeVariant]}`}
                  >
                    {project.badge}
                    <ArrowUpRight className="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 group-hover:text-gray-600 transition -translate-x-1 group-hover:translate-x-0" />
                  </span>
                </div>
              </li>
            ))}
          </ul>

          {/* Cursor-following preview (desktop only) */}
          {!reduce && (
            <motion.div
              aria-hidden
              style={{ x: previewX, y: previewY }}
              className="pointer-events-none fixed left-0 top-0 z-40 hidden lg:block w-[280px] aspect-[4/3] rounded-lg overflow-hidden shadow-2xl"
              animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.92 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {rest.map((project) => (
                <Image
                  key={project.id}
                  src={project.image}
                  alt=""
                  fill
                  className={`object-cover transition-opacity duration-200 ${
                    hovered === project.id ? "opacity-100" : "opacity-0"
                  }`}
                  sizes="280px"
                />
              ))}
            </motion.div>
          )}
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
