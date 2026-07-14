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
  const related = allProjects()
    .filter((p) => p.id !== project.id)
    .slice(0, 2);
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
            <p className="text-brand text-sm font-medium mb-1">Category</p>
            <p className="text-gray-900 font-medium">
              {project.category.trim()}
            </p>
          </div>
          <div>
            <p className="text-brand text-sm font-medium mb-1">Status</p>
            <p className={`font-medium ${statusStyles[project.badgeVariant]}`}>
              {project.badge}
            </p>
          </div>
          <div>
            <p className="text-brand text-sm font-medium mb-1">Focus</p>
            <p className="text-gray-900 font-medium">
              {project.tags.join(", ")}
            </p>
          </div>
        </div>

        {/* Title */}
        <h1 className="mt-8 text-[40px] sm:text-[52px] lg:text-[60px] font-bold text-gray-900 leading-[1.1] tracking-[-0.02em] ">
          {project.title}
        </h1>

        {/* Hero collage */}
        <div className="mt-8 grid grid-cols-3 grid-rows-2 gap-2 h-[300px] sm:h-[400px] lg:h-[500px]">
          <div className="col-span-3 sm:col-span-2 row-span-2 relative overflow-hidden rounded-xl bg-gray-100 shadow-md">
            <Image
              src={project.heroImage || project.image}
              alt={project.title}
              fill
              priority
              className="object-cover hover:scale-[1.02] transition-transform duration-700"
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 66vw, 800px"
            />
          </div>
          {project.gallery && project.gallery[0] && (
            <div className="hidden sm:block relative overflow-hidden rounded-xl bg-gray-100 shadow-sm">
              <Image
                src={project.gallery[0]}
                alt={`${project.title} gallery 1`}
                fill
                className="object-cover hover:scale-[1.02] transition-transform duration-700"
                sizes="33vw"
              />
            </div>
          )}
          {project.gallery && project.gallery[1] && (
            <div className="hidden sm:block relative overflow-hidden rounded-xl bg-gray-100 shadow-sm">
              <Image
                src={project.gallery[1]}
                alt={`${project.title} gallery 2`}
                fill
                className="object-cover hover:scale-[1.02] transition-transform duration-700"
                sizes="33vw"
              />
            </div>
          )}
        </div>

        {/* Overview */}
        <div className="mt-16 lg:mt-20 max-w-4xl">
          <p className="text-brand text-sm font-medium mb-4">
            Project Overview
          </p>
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
                <p className="text-brand text-sm font-medium mb-3">
                  The Challenge
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {content.challenge}
                </p>
              </div>
              <div>
                <p className="text-brand text-sm font-medium mb-3">
                  Our Approach
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {content.approach}
                </p>
              </div>
            </div>

            {/* Highlights */}
            <div className="mt-16 lg:mt-20">
              <p className="text-brand text-sm font-bold mb-6">
                Highlights
              </p>
              <div className="grid sm:grid-cols-2 gap-x-12">
                {content.highlights.map((highlight, i) => (
                  <div
                    key={highlight}
                    className="flex items-start gap-4 border-t border-gray-100 py-5"
                  >
                    <span className="font-mono text-sm text-[#0f1e2e] pt-0.5">
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
            <p className="text-brand text-sm font-medium mb-4">
              Design Impact
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-[1.2] tracking-tight max-w-4xl">
              {content.impact}
            </h2>
          </div>
        </section>
      )}
    </main>
  );
}
