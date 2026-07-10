import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/types";
import { allProjects, getProjectContent, projectSlug } from "@/lib/projects";

const statusStyles: Record<Project["badgeVariant"], string> = {
  prototype: "text-amber-700",
  "in-development": "text-[#0096c7]",
  available: "text-green-700",
};

export function ProjectDetail({ project }: { project: Project }) {
  const related = allProjects().filter((p) => p.id !== project.id).slice(0, 2);
  const content = getProjectContent(projectSlug(project));

  return (
    <main className="bg-white">
      <article className="max-w-7xl mx-auto px-6 pt-8 lg:pt-10 pb-16 lg:pb-20">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-10"
        >
          <ArrowLeft className="h-4 w-4" />
          All projects
        </Link>

        {/* Meta row */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-3xl">
          <div>
            <p className="text-[#A10F1A] text-sm font-medium mb-1">Category</p>
            <p className="text-gray-900 font-medium">{project.category.trim()}</p>
          </div>
          <div>
            <p className="text-[#A10F1A] text-sm font-medium mb-1">Status</p>
            <p className={`font-medium ${statusStyles[project.badgeVariant]}`}>
              {project.badge}
            </p>
          </div>
          <div>
            <p className="text-[#A10F1A] text-sm font-medium mb-1">Focus</p>
            <p className="text-gray-900 font-medium">{project.tags.join(", ")}</p>
          </div>
        </div>

        {/* Title */}
        <h1 className="mt-8 text-[40px] sm:text-[52px] lg:text-[60px] font-bold text-gray-900 leading-[1.1] tracking-[-0.02em] max-w-4xl">
          {project.title}
        </h1>

        {/* Hero image */}
        <div className="mt-8 relative aspect-[16/9] overflow-hidden rounded-xl bg-gray-100">
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 1216px"
          />
        </div>

        {/* Overview */}
        <div className="mt-16 lg:mt-20 max-w-4xl">
          <p className="text-[#A10F1A] text-sm font-medium mb-4">Project Overview</p>
          <p className="text-2xl md:text-3xl font-bold text-gray-900 leading-[1.3] tracking-tight">
            {project.description}
          </p>
        </div>

        {/* Focus tags */}
        <div className="mt-10 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block border border-gray-200 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wide"
            >
              {tag}
            </span>
          ))}
        </div>

        {content && (
          <>
            {/* Challenge + Approach */}
            <div className="mt-16 lg:mt-20 grid lg:grid-cols-2 gap-12 lg:gap-16">
              <div>
                <p className="text-[#A10F1A] text-sm font-medium mb-3">
                  The Challenge
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {content.challenge}
                </p>
              </div>
              <div>
                <p className="text-[#A10F1A] text-sm font-medium mb-3">
                  Our Approach
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {content.approach}
                </p>
              </div>
            </div>

            {/* Highlights */}
            <div className="mt-16 lg:mt-20">
              <p className="text-[#A10F1A] text-sm font-medium mb-6">Highlights</p>
              <div className="grid sm:grid-cols-2 gap-x-12">
                {content.highlights.map((highlight, i) => (
                  <div
                    key={highlight}
                    className="flex items-start gap-4 border-t border-gray-100 py-5"
                  >
                    <span className="font-mono text-sm text-[#A10F1A] pt-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-gray-700 leading-relaxed">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </article>

      {/* Design Impact */}
      {content && (
        <section className="bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
            <p className="text-[#A10F1A] text-sm font-medium mb-4">Design Impact</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-[1.2] tracking-tight max-w-4xl">
              {content.impact}
            </h2>
          </div>
        </section>
      )}

      {/* Related work */}
      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-10">
            More projects
          </h2>
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-12">
            {related.map((item) => (
              <Link
                key={item.id}
                href={`/projects/${projectSlug(item)}`}
                className="group block"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-all duration-500 ease-in-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 46vw"
                  />
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[#A10F1A] text-sm font-medium mb-2">
                      {item.category.trim()}
                    </p>
                    <h3 className="text-2xl font-bold text-gray-900 tracking-tight transition-colors group-hover:text-gray-600">
                      {item.title}
                    </h3>
                  </div>
                  <ArrowUpRight className="mt-1 h-6 w-6 shrink-0 text-gray-300 transition-all duration-300 group-hover:text-gray-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Section CTA (not the global footer) */}
      <section className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
              Building something like this?
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              We take embedded hardware, firmware, and mechanical design from
              concept to working prototype. Tell us what you are working on.
            </p>
          </div>
          <Link
            href="/contact"
            className="bg-[#0f1e2e] text-white px-7 py-3.5 rounded-md text-sm font-medium hover:bg-[#1a3147] transition shrink-0"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </main>
  );
}
