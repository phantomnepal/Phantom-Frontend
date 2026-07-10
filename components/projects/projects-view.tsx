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
      <section className="max-w-7xl mx-auto px-6 pt-8 lg:pt-10 pb-16 lg:pb-20 text-center">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[#A10F1A] text-sm font-medium mb-4"
        >
          Our Work
        </motion.p>
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto max-w-4xl text-[40px] sm:text-[52px] lg:text-[60px] font-bold text-gray-900 leading-[1.1] tracking-[-0.02em]"
        >
          Precision engineering, from first sketch to first flight.
        </motion.h1>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto mt-5 max-w-xl text-gray-600 text-base leading-relaxed"
        >
          The systems we have designed, built, and shipped, from flight
          controllers and CubeSats to hands-on kits.
        </motion.p>
      </section>

      {/* Project grid */}
      <section className="max-w-7xl mx-auto px-6 pb-20 lg:pb-24">
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={reduce ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: reduce ? 0 : (index % 2) * 0.1 }}
            >
              <Link href={`/projects/${projectSlug(project)}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-100">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-all duration-500 ease-in-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 46vw"
                  />
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[#A10F1A] text-sm font-medium mb-2">
                      {project.category.trim()}
                    </p>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight transition-colors group-hover:text-gray-600">
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
