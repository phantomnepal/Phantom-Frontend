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
      <article className="max-w-7xl mx-auto px-6 pt-16 lg:pt-20 pb-24">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-12"
        >
          <ArrowLeft className="h-4 w-4" />
          All projects
        </Link>

        {/* Meta row */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-3xl">
          <div>
            <p className="text-sm text-gray-400 mb-1">Category</p>
            <p className="text-gray-900 font-medium">{project.category.trim()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">Status</p>
            <p className={`font-medium ${statusStyles[project.badgeVariant]}`}>
              {project.badge}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">Focus</p>
            <p className="text-gray-900 font-medium">{project.tags.join(", ")}</p>
          </div>
        </div>

        {/* Title */}
        <h1 className="mt-10 text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-[1.05] max-w-4xl">
          {project.title}
        </h1>

        {/* Hero image */}
        <div className="mt-10 relative aspect-[16/9] overflow-hidden rounded-2xl bg-gray-100">
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
        <div className="mt-16 lg:mt-24 max-w-4xl">
          <p className="text-sm text-gray-400 mb-6">Project Overview</p>
          <p className="text-2xl md:text-3xl font-medium text-gray-900 leading-[1.35] tracking-tight">
            {project.description}
          </p>
        </div>

        {/* Focus tags */}
        <div className="mt-12 flex flex-wrap gap-2">
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
            <div className="mt-20 lg:mt-28 grid lg:grid-cols-2 gap-12 lg:gap-20">
              <div>
                <p className="text-sm text-gray-400 mb-4">The Challenge</p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {content.challenge}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-4">Our Approach</p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {content.approach}
                </p>
              </div>
            </div>

            {/* Highlights */}
            <div className="mt-20 lg:mt-28">
              <p className="text-sm text-gray-400 mb-8">Highlights</p>
              <div className="grid sm:grid-cols-2 gap-x-12">
                {content.highlights.map((highlight, i) => (
                  <div
                    key={highlight}
                    className="flex items-start gap-4 border-t border-gray-200 py-5"
                  >
                    <span className="font-mono text-sm text-[#A10F1A] pt-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-gray-800 leading-relaxed">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </article>

      {/* Design Impact */}
      {content && (
        <section className="bg-gray-50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
            <p className="text-sm text-gray-400 mb-6">Design Impact</p>
            <p className="text-3xl md:text-4xl lg:text-[2.6rem] font-medium text-gray-900 leading-[1.3] tracking-tight max-w-4xl">
              {content.impact}
            </p>
          </div>
        </section>
      )}

      {/* Related work */}
      {related.length > 0 && (
        <section className="border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6 py-20 lg:py-24">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-10">
              More projects
            </h2>
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-12">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/projects/${projectSlug(item)}`}
                  className="group block"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-gray-100">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      sizes="(max-width: 768px) 100vw, 46vw"
                    />
                  </div>
                  <div className="mt-5 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-[#A10F1A] mb-2">
                        {item.category.trim()}
                      </p>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight transition-colors group-hover:text-gray-600">
                        {item.title}
                      </h3>
                    </div>
                    <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-gray-300 transition-all duration-300 group-hover:text-gray-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Section CTA (not the global footer) */}
      <section className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              Building something like this?
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              We take embedded hardware, firmware, and mechanical design from
              concept to working prototype. Tell us what you are working on.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-[#0f1e2e] text-white px-7 py-3.5 rounded-md text-sm font-medium hover:bg-[#1a3147] transition active:translate-y-[1px] shrink-0"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </main>
  );
}
