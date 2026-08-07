/** About-page content: projects, values, roadmap. */

import type {
  CoreValue,
  Project,
  RoadmapItem,
} from "../../types";

export const projects: Project[] = [
  {
    id: 1,
    heroImage: "/products/phantom-f722/top.png",
    image: "/products/phantom-f722/top.png",
    gallery: ["/products/phantom-f722/bottom.png", "/products/phantom-f722/angle.png"],
    category: "FPV FLIGHT CONTROLLER",
    badge: "PROTOTYPE",
    badgeVariant: "prototype",
    title: "Phantom F722-Analog: Pure Analog FPV Flight Controller",
    description:
      "A custom STM32F722 based analog only flight controller built for high-end FPV drones where every millisecond of control loop matters.",
    tags: ["Pure Analog FPV", "High-Speed Flight Control"],
  },
  {
    id: 2,
    heroImage: "/products/advance-usb-c-power-supply/top.png",
    image: "/products/advance-usb-c-power-supply/top.png",
    gallery: ["/products/advance-usb-c-power-supply/bottom.png", "/products/advance-usb-c-power-supply/angle.png"],
    category: "VARIABLE POWER SUPPLY",
    badge: "PROTOTYPE",
    badgeVariant: "prototype",
    title: "Phantom - Advance Type C Power Supply",
    description:
      "A custom STM32G0-based advanced power supply for high-power embedded and robotics projects, delivering selectable high-current voltage rails in an ultra-compact design for clean, reliable power.",
    tags: ["Embedded System", "Power Supply"],
  },
];

export const coreValues: CoreValue[] = [
  {
    number: "01",
    title: "Disciplined Design",
    description:
      "We follow rigorous engineering standards to ensure every PCB and firmware module is deterministic and reliable.",
  },
  {
    number: "02",
    title: "Local Innovation",
    description:
      "By building advanced systems in Nepal, we aim to inspire and empower the next generation of hardware engineers.",
  },
  {
    number: "03",
    title: "Mission Focused",
    description:
      "Whether it's a simple sensor node or a complex CubeSat, we design with the end-mission success as our primary metric.",
  },
];

export const roadmap: RoadmapItem[] = [
  {
    year: "2026",
    phase: "CURRENT PHASE",
    title: "Foundation & Product Launch",
    description:
      "Building a strong foundation through educational platforms, embedded systems kits, and initial product releases. Focused on developing reliable hardware, validating designs, and establishing Phantom as a trusted engineering brand in Nepal.",
    isCurrent: true,
  },
  {
    year: "2028",
    phase: "",
    title: "Industrial Autonomy",
    description:
      "Scaling edge-computing solutions for sovereign manufacturing hubs.",
    isCurrent: false,
  },
  {
    year: "2029",
    phase: "",
    title: "Avionics Integration",
    description:
      "Certification for safety-critical flight systems and data links.",
    isCurrent: false,
  },
  {
    year: "2030",
    phase: "",
    title: "Aerospace Grade",
    description:
      "Deep space telemetry modules for private lunar infrastructure.",
    isCurrent: false,
  },
];
