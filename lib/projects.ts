import { getSiteContent } from "@/data/content";
import type { Project } from "@/data/types";

/** Slugify a project title into a URL segment. Titles are unique, so slugs are too. */
export function projectSlug(project: Project): string {
  return project.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function allProjects(): Project[] {
  return getSiteContent().projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return allProjects().find((project) => projectSlug(project) === slug);
}

/** Longer-form, authored narrative for a project's detail page. */
export type ProjectContent = {
  challenge: string;
  approach: string;
  highlights: string[];
  impact: string;
};

const projectContent: Record<string, ProjectContent> = {
  "educational-1u-cubesat": {
    challenge:
      "Teaching orbital systems is expensive and abstract. Students rarely touch real satellite hardware, so power budgets, attitude control, and telemetry stay theoretical.",
    approach:
      "We built a 1U platform that mirrors a real CubeSat: a structural frame, a power subsystem, an onboard computer, and a communications link that students can program end to end.",
    highlights: [
      "1U aluminium frame that matches real CubeSat geometry",
      "Modular power, compute, and communications subsystems",
      "Programmable telemetry and ground-link workflow",
      "Built for classroom and lab use",
    ],
    impact:
      "The platform turns satellite engineering from a lecture topic into something students can assemble, program, and debug on their own bench.",
  },
  "phantom-f722-analog-pure-analog-fpv-flight-controller": {
    challenge:
      "Most FPV flight controllers on the market today are compromised by poor PCB routing, overcrowded boards trying to do everything at once, and corners cut on component quality.",
    approach:
      "The F722-Analog was engineered around one goal: an ultra-precise IMU, fully isolated on its own power rail. It's built with premium, gold-standard components to minimise EMI and keep power delivery clean and efficient, nothing else competing for board space or signal integrity.",
    highlights: [
      "Built around the STM32F722RETx MCU",
      "ICM42688-P IMU with dedicated LDO for noise isolation",
      "BMP280 barometer for precise altitude hold",
      "2S–6S battery support",
      "Purpose-built for ultra-clean analog systems only",
      "6-layer PCB for signal and power integrity",
      "Ultra-low-noise buck converter for reduced EMI",
      "DShot600 on all four motor channels via Timer8",
      "Plug-and-play with soldering pads",
      "5 UARTs for peripheral flexibility",
    ],
    impact:
      "A flight controller we trust in the field, engineered to hold its line when conditions are least forgiving.",
  },
  "phantom-f405-flight-controller": {
    challenge:
      "Most builders want serious flight performance without industrial pricing or complexity.",
    approach:
      "The F405 pairs the proven STM32F405 with a compact, resilient design that covers the majority of FPV and light UAV work.",
    highlights: [
      "STM32F405 core, proven and widely supported",
      "Compact layout for tight builds",
      "Balanced for FPV and light UAV use",
      "Designed and assembled in Nepal",
    ],
    impact:
      "Dependable flight control for the builds most people are actually flying.",
  },
  "phantom-electronics-starter-kit": {
    challenge:
      "Learning electronics from theory alone rarely sticks. Beginners need to build real circuits to understand them.",
    approach:
      "We packaged a curated set of components with guided projects that take someone from their first LED to working circuits.",
    highlights: [
      "Curated components for the fundamentals",
      "Guided, hands-on projects",
      "A beginner-friendly path",
      "Built for self-paced learning",
    ],
    impact:
      "A first step into electronics that rewards curiosity with working hardware.",
  },
  "phantom-robotics-kit": {
    challenge:
      "Robotics ties together mechanics, electronics, and code, which is where most learners get stuck.",
    approach:
      "The kit walks builders through motion control, sensors, and actuators with projects that assemble into a working robot.",
    highlights: [
      "Motion control, sensors, and actuators",
      "A project-based robotics path",
      "Combines mechanics, electronics, and code",
      "Program your own behaviours",
    ],
    impact:
      "Robotics made approachable, from the first motor to autonomous behaviour.",
  },
  "phantom-embedded-systems-kit": {
    challenge:
      "Embedded development has a steep first step, from toolchains to hardware.",
    approach:
      "The kit pairs industry-relevant hardware with a structured path into embedded programming and real-time systems.",
    highlights: [
      "Industry-relevant embedded hardware",
      "A structured path into firmware",
      "Real-time systems fundamentals",
      "Bridges hobby and professional work",
    ],
    impact:
      "A serious on-ramp to embedded systems for people ready to go deeper.",
  },
};

export function getProjectContent(slug: string): ProjectContent | undefined {
  return projectContent[slug];
}
