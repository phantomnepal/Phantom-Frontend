/** Products in the `educational-kits` category. */
import type { Product } from "../../../types";

export const educationalKitsProducts: Product[] = [
  {
    slug: "electronics-starter-kit",
    title: "Electronics Starter Kit",
    category: "educational-kits",
    image: "/engineering-kits.png",
    priceUsd: 35,
    description: "Beginner-friendly kit for learning electronics fundamentals",
    status: "available",
    overview:
      "Learning electronics from theory alone rarely sticks — beginners need to build real circuits to understand them. This kit packages a curated set of components with guided projects that take someone from their first LED to working circuits.",
    applications: [
      {
        iconName: "Lightbulb",
        title: "First steps",
        description: "First steps into electronics.",
      },
      {
        iconName: "GraduationCap",
        title: "Classroom",
        description: "Classroom and workshop teaching.",
      },
      {
        iconName: "BookOpen",
        title: "Self-paced",
        description: "Self-paced learning at home.",
      },
    ],
    specs: [
      { label: "Contents", value: "Curated components covering the fundamentals" },
      { label: "Projects", value: "Guided and hands-on" },
      { label: "Level", value: "Beginner" },
      { label: "Format", value: "Built for self-paced learning" },
    ],
    faqs: [
      {
        question: "Do I need any experience?",
        answer:
          "No. The kit is built for people starting from their first LED.",
      },
      {
        question: "Is it suitable for a classroom?",
        answer:
          "Yes — it is used for both classroom teaching and self-paced learning.",
      },
      {
        question: "What do I need to supply?",
        answer:
          "Get in touch and we will confirm what is in the box for your intake.",
      },
    ],
  },
  {
    slug: "embedded-systems-kit",
    title: "Embedded Systems Kit",
    category: "educational-kits",
    image: "/engineering-kits.png",
    priceUsd: 79,
    description: "Advanced kit for embedded systems development",
    status: "available",
    overview:
      "Embedded development has a steep first step, from toolchains to hardware. This kit pairs industry-relevant hardware with a structured path into embedded programming and real-time systems.",
    applications: [
      {
        iconName: "Terminal",
        title: "Firmware",
        description: "Learning firmware and real-time systems.",
      },
      {
        iconName: "Layers",
        title: "Hobby to professional",
        description: "Bridging hobby work and professional practice.",
      },
      {
        iconName: "GraduationCap",
        title: "University",
        description: "University embedded coursework.",
      },
    ],
    specs: [
      { label: "Hardware", value: "Industry-relevant embedded hardware" },
      { label: "Path", value: "Structured, into firmware" },
      { label: "Topics", value: "Real-time systems fundamentals" },
      { label: "Level", value: "Bridges hobby and professional work" },
    ],
    faqs: [
      {
        question: "How is this different from the Starter Kit?",
        answer:
          "The Starter Kit teaches electronics fundamentals. This kit is a step up, into firmware and real-time systems.",
      },
      {
        question: "Do I need prior firmware experience?",
        answer:
          "It is built as an on-ramp, but assumes you are ready to go deeper than a first kit.",
      },
      {
        question: "Is it used professionally?",
        answer:
          "The hardware is industry-relevant and bridges hobby and professional practice.",
      },
    ],
  },
  {
    slug: "educational-1u-cubesat",
    title: "Educational 1U CubeSat",
    category: "educational-kits",
    image: "/products/cubesat.png",
    priceUsd: 349,
    description: "Learn satellite systems with this 1U CubeSat platform",
    status: "available",
    overview:
      "Teaching orbital systems is expensive and abstract, and students rarely touch real satellite hardware. This 1U platform mirrors a real CubeSat — structure, power, compute, and a communications link students can program end to end.",
    applications: [
      {
        iconName: "Satellite",
        title: "Orbital systems",
        description: "Teaching satellite and orbital systems.",
      },
      {
        iconName: "FlaskConical",
        title: "Aerospace labs",
        description: "University aerospace laboratories.",
      },
      {
        iconName: "RadioTower",
        title: "Telemetry",
        description: "Hands-on telemetry and ground-link exercises.",
      },
    ],
    specs: [
      { label: "Form factor", value: "1U aluminium frame, matching real CubeSat geometry" },
      { label: "Subsystems", value: "Modular power, compute and communications" },
      { label: "Telemetry", value: "Programmable, with a ground-link workflow" },
      { label: "Built for", value: "Classroom and lab use" },
    ],
    highlights: [
      { label: "Form factor", value: "1U aluminium" },
      { label: "Subsystems", value: "Power, compute, comms" },
      { label: "Built for", value: "Classroom and lab" },
    ],
    faqs: [
      {
        question: "Is this a flight-qualified CubeSat?",
        answer:
          "No. It is an educational platform that mirrors real CubeSat geometry and subsystems for teaching.",
      },
      {
        question: "Who is it for?",
        answer:
          "University aerospace labs and courses that want students to assemble, program and debug real satellite subsystems.",
      },
      {
        question: "Can students program it end to end?",
        answer:
          "Yes — power, compute and the communications link are all programmable.",
      },
    ],
  },
];
