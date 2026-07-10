"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/data/types";

type Chapter = {
  index: string;
  kicker: string;
  title: string;
  story: string;
  match: (p: Project) => boolean;
};

// The six projects are grouped into three narrative chapters. Copy is
// authored per chapter; images and the "in this chapter" list come from data.
const chapters: Chapter[] = [
  {
    index: "01",
    kicker: "Aerospace, in a classroom",
    title: "We put a satellite on a student's desk.",
    story:
      "The 1U CubeSat began as a question: how do you teach orbital systems without a launch budget? The answer became a working platform for satellite structures, power, and communications that students can hold, program, and break.",
    match: (p) => p.category.toUpperCase().includes("AEROSPACE"),
  },
  {
    index: "02",
    kicker: "Where milliseconds matter",
    title: "Flight controllers built to hold their line.",
    story:
      "The F722 and F405 are our answer to flight hardware that has to stay precise under load. Designed in Nepal around STM32 silicon, they run everything from FPV drones to industrial UAVs where a dropped cycle is not an option.",
    match: (p) => p.category.toUpperCase().includes("FLIGHT CONTROLLER"),
  },
  {
    index: "03",
    kicker: "Embedded systems, in more hands",
    title: "Kits that turn curiosity into hardware.",
    story:
      "Not every project starts in a lab. Our electronics, robotics, and embedded kits take the same rigor we ship in flight hardware and package it for people learning to build their first working system.",
    match: (p) => p.category.toUpperCase().includes("EDUCATIONAL PRODUCTS"),
  },
];

export function ProjectsView({ projects }: { projects: Project[] }) {
  const reduce = useReducedMotion();
  const hero = projects.find((p) => p.title.includes("F722")) ?? projects[0];

  return (
    <main className="bg-white">
      {/* Cinematic hero (brand navy) */}
      <section className="bg-[#0f1e2e] text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <p className="text-[#e0625f] text-sm font-semibold tracking-wide mb-5">
              Our work
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
              Precision, from first sketch to first flight.
            </h1>
            <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-[48ch]">
              Phantom designs embedded hardware, firmware, and mechanical
              systems that have to work the first time. These are the builds
              that got us here, and where we are taking them next.
            </p>
          </div>
          <div className="relative aspect-[4/3] lg:aspect-square rounded-xl overflow-hidden">
            {hero && (
              <Image
                src={hero.image}
                alt={hero.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 46vw"
              />
            )}
          </div>
        </div>
      </section>

      {/* Brand statement */}
      <section className="max-w-4xl mx-auto px-6 py-24 lg:py-32">
        <p className="text-2xl md:text-3xl lg:text-[2.4rem] font-medium text-gray-900 leading-[1.35] tracking-tight">
          We are a small engineering team that treats every board, mount, and
          line of firmware as something a person will one day depend on. The
          projects below are not a catalog.{" "}
          <span className="text-gray-400">
            They are the story of how we learned to build.
          </span>
        </p>
      </section>

      {/* Chapters */}
      <div className="border-t border-gray-100">
        {chapters.map((chapter, i) => {
          const items = projects.filter(chapter.match);
          const image = items[0]?.image;
          const imageLeft = i % 2 === 0;
          return (
            <section key={chapter.index} className="border-b border-gray-100">
              <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                <motion.div
                  initial={reduce ? false : { opacity: 0, x: imageLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-50 ${
                    imageLeft ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  {image && (
                    <Image
                      src={image}
                      alt={chapter.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  )}
                </motion.div>

                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className={imageLeft ? "lg:order-2" : "lg:order-1"}
                >
                  <div className="flex items-baseline gap-4 mb-5">
                    <span className="font-mono text-sm text-[#A10F1A]">
                      {chapter.index}
                    </span>
                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-widest">
                      {chapter.kicker}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight leading-tight mb-5">
                    {chapter.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed max-w-[52ch] mb-8">
                    {chapter.story}
                  </p>
                  <ul className="flex flex-col gap-2 border-t border-gray-200 pt-5">
                    {items.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-center justify-between gap-4 text-sm"
                      >
                        <span className="font-medium text-gray-900">
                          {item.title}
                        </span>
                        <span className="text-gray-400 uppercase tracking-wider text-xs shrink-0">
                          {item.badge}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </section>
          );
        })}
      </div>

      {/* By the numbers */}
      <section className="max-w-7xl mx-auto px-6 py-20 lg:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">
          {[
            { value: String(projects.length), label: "Systems designed and built" },
            { value: "3", label: "Domains: aerospace, avionics, education" },
            { value: "STM32", label: "Silicon at the core of our flight hardware" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
                {stat.value}
              </p>
              <p className="mt-3 text-gray-500 leading-relaxed max-w-[28ch]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Forward + CTA */}
      <section className="bg-[#0f1e2e] text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 lg:py-28">
          <p className="text-[#e0625f] text-sm font-semibold tracking-wide mb-5">
            What is next
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight max-w-3xl">
            The kits and boards you have read about are coming to a store of
            their own.
          </h2>
          <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#0f1e2e] px-7 py-3.5 rounded-md text-sm font-semibold hover:bg-gray-100 transition active:translate-y-[1px]"
            >
              Get in touch
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/product"
              className="inline-flex items-center justify-center gap-2 border border-white/25 text-white px-7 py-3.5 rounded-md text-sm font-semibold hover:bg-white/10 transition"
            >
              See the products
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
