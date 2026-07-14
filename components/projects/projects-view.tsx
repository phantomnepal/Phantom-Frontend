"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
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
          className="text-brand text-sm font-medium mb-4"
        >
          Our Work
        </motion.p>
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto max-w-4xl text-[40px] sm:text-[52px] lg:text-[60px] font-bold text-gray-900 leading-[1.1] tracking-[-0.02em]"
        >
          The hardware we have built to work in the field.
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

      {/* Project row list */}
      <section className="max-w-6xl mx-auto px-6 pb-20 lg:pb-24">
        <div className="border-t border-gray-200">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={reduce ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: reduce ? 0 : 0.05 }}
            >
              <Link
                href={`/projects/${projectSlug(project)}`}
                className="group grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-10 items-start border-b border-gray-200 py-10 lg:py-12"
              >
                {/* Image */}
                <div className="md:col-span-2 relative aspect-[3/2] overflow-hidden rounded-xl bg-gray-100">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                </div>

                {/* Text */}
                <div className="md:col-span-3 relative pr-10">
                  <ArrowDownRight className="absolute right-0 top-0 h-6 w-6 shrink-0 text-gray-300 transition-all duration-300 group-hover:text-gray-900 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                  <p className="text-brand text-sm font-medium mb-2">
                    {project.category.trim()}
                  </p>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight transition-colors group-hover:text-gray-600">
                    {project.title}
                  </h2>
                  <p className="mt-3 text-gray-600 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block border border-gray-200 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
