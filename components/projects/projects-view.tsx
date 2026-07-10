"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/types";
import { projectSlug } from "@/lib/projects";

export function ProjectsView({ projects }: { projects: Project[] }) {
  const reduce = useReducedMotion();

  return (
    <main className="bg-white">
      {/* Centered hero */}
      <section className="max-w-7xl mx-auto px-6 pt-20 lg:pt-24 pb-16 lg:pb-24 text-center">
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-4xl text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight leading-[1.03]"
        >
          Precision engineering, from first sketch to first flight.
        </motion.h1>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-6 max-w-xl text-lg text-gray-500 leading-relaxed"
        >
          The systems we have designed, built, and shipped, from flight
          controllers and CubeSats to hands-on kits.
        </motion.p>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-9"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-7 py-3.5 text-sm font-semibold text-gray-900 transition-colors hover:border-gray-900 active:translate-y-[1px]"
          >
            Get in touch
          </Link>
        </motion.div>
      </section>

      {/* Project grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24 lg:pb-32">
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-14 lg:gap-y-20">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={reduce ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.6,
                delay: reduce ? 0 : (index % 2) * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Link href={`/projects/${projectSlug(project)}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-gray-100">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 46vw"
                  />
                </div>
                <div className="mt-6 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#A10F1A] mb-2">
                      {project.category.trim()}
                    </p>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight transition-colors group-hover:text-gray-600">
                      {project.title}
                    </h2>
                  </div>
                  <ArrowUpRight className="mt-1 h-6 w-6 shrink-0 text-gray-300 transition-all duration-300 group-hover:text-gray-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
