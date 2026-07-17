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

/**
 * Longer-form, authored narrative for a project's detail page.
 *
 * Independent of the product catalog: /product carries its own specs and never
 * links here. Where a product and a project cover the same hardware (the F722),
 * each states its specs separately.
 */
export type ProjectContent = {
  challenge: string;
  approach: string;
  highlights: string[];
  impact: string;
};

const projectContent: Record<string, ProjectContent> = {
  "phantom-advance-type-c-power-supply": {
    challenge:
      "Variable power supplies with high current output in a compact form factor are hard to find. Most students and researchers end up relying on battery packs paired with separate buck converter modules, an inefficient, bulky, and error-prone setup for powering high-current projects like flight controllers, motor drivers, and other embedded systems.",
    approach:
      "Phantom was engineered around one goal: an ultra-compact USB-C power supply that lets users select from four voltage outputs on demand, tailored to their project's specific power requirements, all while maintaining low-noise, high-efficiency delivery through P-channel MOSFET switching.",
    highlights: [
      "Built around the STM32G030K6Tx microcontroller",
      "STUSB4500QTR USB-PD controller for precise, negotiated voltage selection",
      "High-efficiency STL6P3LLH6 P-channel MOSFETs for the power path",
      "Selectable output: 5V, 9V, 12V, and 20V",
      "Ultra-compact form factor, purpose-built for space-constrained projects",
      "4-layer PCB for robust power integrity and thermal performance",
      "Low-noise power delivery for reduced EMI",
      "Push-button voltage selection with onboard LED indicators",
      "USB-C 2.0 input",
      "Supports up to 3A continuous current draw",
    ],
    impact:
      "Clean, selectable high-current power in a pocket-sized board, so embedded and robotics projects can leave the bulky bench supply behind.",
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
};

export function getProjectContent(slug: string): ProjectContent | undefined {
  return projectContent[slug];
}

/** Slugs with authored narrative. Each must belong to a project that renders. */
export function projectContentSlugs(): string[] {
  return Object.keys(projectContent);
}
