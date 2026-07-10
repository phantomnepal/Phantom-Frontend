import type { Metadata } from "next";
import { getSiteContent } from "@/data/content";
import { ProjectsView } from "@/components/projects/projects-view";

export const metadata: Metadata = {
  title: "Projects – Phantom",
  description:
    "Selected engineering projects from Phantom: flight controllers, CubeSats, and educational kits built from concept to working prototype.",
};

export default function ProjectsPage() {
  const { projects } = getSiteContent();
  return <ProjectsView projects={projects} />;
}
