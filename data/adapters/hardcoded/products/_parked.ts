/**
 * Products the user parked for later, kept commented out verbatim at their
 * request — this is a holding pen, not dead code to delete.
 *
 * They are not in the catalog, so they do not appear in nav, search, category
 * pages or the prerendered routes. The `iot-robotics` category they belonged to
 * is parked alongside them in ../categories.ts; a product pointing at a missing
 * category fails the catalog test.
 *
 * To bring one back: uncomment it here, uncomment its category if needed, and
 * add it to ./index.ts.
 */
import type { Product } from "../../../types";

export const parkedProducts: Product[] = [
  /*{
    slug: "custom-dev-board",
    title: "Custom Dev Board",
    category: "embedded-systems",
    image: "/categories/embedded-systems.jpg",
    priceUsd: 89,
    description:
      "Versatile development platforms for various microcontroller and FPGA architectures.",
    // Badged in-development, not "available" as the design mock shows: nothing
    // is published about this board yet, so the detail page renders the
    // "In development" block. Flip to "available" once specs exist.
    status: "in-development",
    // DRAFT PLACEHOLDER — the user is authoring the real copy for this product.
    overview:
      "A development board built around whichever architecture your project actually targets, rather than forcing the project to fit a board. We handle the layout, power, and programming interface so you can start writing firmware against real hardware instead of a breadboard.",
    applications: [
      {
        iconName: "Cpu",
        title: "Firmware bring-up",
        description: "Bringing up firmware for a new architecture.",
      },
      {
        iconName: "GraduationCap",
        title: "Teaching and labs",
        description: "Teaching and lab work on real hardware.",
      },
      {
        iconName: "FlaskConical",
        title: "Design evaluation",
        description: "Evaluating a design before committing to a custom board.",
      },
    ],
    specs: [],
    faqs: [
      {
        question: "Can I buy this today?",
        answer:
          "Not yet — it is still in development. Get in touch and we will tell you where it stands and when to expect it.",
      },
      {
        question: "Which architectures will it support?",
        answer:
          "That depends on what you need it to do. Tell us the target and we will tell you whether it is something we can build.",
      },
      {
        question: "Are specifications available?",
        answer:
          "Not yet. We publish specifications once the hardware is real enough for us to stand behind them.",
      },
    ],
  }*/
  /*{
    slug: "4-dof-robotic-arm",
    title: "4-DOF Robotic Arm",
    category: "iot-robotics",
    image: "/categories/iot-robotics.jpg",
    priceUsd: 149,
    description: "Programmable robotic arm for education and automation",
    status: "in-development",
    overview:
      "A four-degree-of-freedom arm is enough to teach the fundamentals of kinematics, motion planning, and control without the cost and complexity of an industrial cell. It is built to be programmed, taken apart, and understood.",
    applications: [
      {
        iconName: "Waypoints",
        title: "Kinematics",
        description: "Teaching kinematics and motion control.",
      },
      {
        iconName: "Grab",
        title: "Pick and place",
        description: "Automation demonstrations and pick-and-place.",
      },
      {
        iconName: "Trophy",
        title: "Coursework",
        description: "Robotics coursework and competitions.",
      },
    ],
    specs: [],
    faqs: [
      {
        question: "Can I buy this today?",
        answer:
          "Not yet — it is still in development. Get in touch and we will tell you where it stands and when to expect it.",
      },
      {
        question: "Can I influence the design?",
        answer:
          "Yes. Early conversations shape what we build, so tell us what you need it to do.",
      },
      {
        question: "Are specifications available?",
        answer:
          "Not yet. We publish specifications once the hardware is real enough for us to stand behind them.",
      },
    ],
  },
  {
    slug: "smart-sensor",
    title: "Smart Sensor",
    category: "iot-robotics",
    image: "/categories/iot-robotics.jpg",
    priceUsd: 59,
    description: "Intelligent sensing platform with wireless connectivity",
    status: "in-development",
    overview:
      "A sensing platform with the processing and connectivity already on board, so readings arrive somewhere useful instead of stopping at a pin. Designed for deployments where running a wire is not practical.",
    applications: [
      {
        iconName: "Wifi",
        title: "Wireless monitoring",
        description: "Wireless condition monitoring.",
      },
      {
        iconName: "Network",
        title: "Distributed sensing",
        description: "Distributed sensing deployments.",
      },
      {
        iconName: "FlaskConical",
        title: "Field trials",
        description: "IoT prototypes and field trials.",
      },
    ],
    specs: [],
    faqs: [
      {
        question: "Can I buy this today?",
        answer:
          "Not yet — it is still in development. Get in touch and we will tell you where it stands and when to expect it.",
      },
      {
        question: "Can I influence the design?",
        answer:
          "Yes. Early conversations shape what we build, so tell us what you need it to do.",
      },
      {
        question: "Are specifications available?",
        answer:
          "Not yet. We publish specifications once the hardware is real enough for us to stand behind them.",
      },
    ],
  },
  {
    slug: "industrial-monitoring-devices",
    title: "Industrial Monitoring Devices",
    category: "iot-robotics",
    image: "/categories/iot-robotics.jpg",
    priceUsd: 399,
    description: "Real-time industrial monitoring and control hardware",
    status: "in-development",
    overview:
      "Monitoring hardware built for environments that are noisier, hotter, and less forgiving than a bench. The focus is on getting a reliable reading out of a plant and into a system that can act on it.",
    applications: [
      {
        iconName: "Factory",
        title: "Plant monitoring",
        description: "Plant and equipment monitoring.",
      },
      {
        iconName: "BellRing",
        title: "Telemetry and alerts",
        description: "Process telemetry and alerting.",
      },
      {
        iconName: "Wrench",
        title: "Retrofit",
        description: "Retrofitting instrumentation to existing machinery.",
      },
    ],
    specs: [],
    faqs: [
      {
        question: "Can I buy this today?",
        answer:
          "Not yet — it is still in development. Get in touch and we will tell you where it stands and when to expect it.",
      },
      {
        question: "Can I influence the design?",
        answer:
          "Yes. Early conversations shape what we build, so tell us what you need it to do.",
      },
      {
        question: "Are specifications available?",
        answer:
          "Not yet. We publish specifications once the hardware is real enough for us to stand behind them.",
      },
    ],
  },*/
  // The parked "Robotics Kit" placeholder was removed rather than kept: it is
  // now live as `4wd-robotics-kit` in ./educational-kits.ts, with user-authored
  // content that supersedes every field the placeholder held.

  /* Parked 2026-08-08 at the user's request. Both are real Phantom products
     with nothing published about them yet; the F405 has one real render at
     /products/phantom-f405/top.png, which stays in public/.
  {
    slug: "phantom-f405",
    title: "Phantom F405",
    category: "uav-systems",
    image: "/products/phantom-f405/top.png",
    priceUsd: 79,
    description: "STM32F405-based flight controller for FPV drones",
    status: "available",
    overview:
      "The F405 pairs a proven, widely supported flight controller core with a compact, resilient layout that covers the majority of FPV and light UAV work. Designed and assembled in Nepal.",
    applications: [
      {
        iconName: "Gamepad2",
        title: "FPV builds",
        description: "FPV freestyle and racing builds.",
      },
      {
        iconName: "Plane",
        title: "Light UAV",
        description: "Light UAV and fixed-wing platforms.",
      },
      {
        iconName: "GraduationCap",
        title: "Coursework",
        description: "Flight control coursework and experimentation.",
      },
    ],
    specs: [
      { label: "MCU", value: "STM32F405" },
      { label: "Layout", value: "Compact, for tight builds" },
      { label: "Suited to", value: "FPV and light UAV platforms" },
      { label: "Origin", value: "Designed and assembled in Nepal" },
    ],
    faqs: [
      {
        question: "How does the F405 differ from the F722?",
        answer:
          "The F405 covers the majority of FPV and light UAV work. The F722 targets builds where control-loop precision matters most.",
      },
      {
        question: "Is firmware support available?",
        answer:
          "The STM32F405 core is proven and widely supported. Contact us about your setup.",
      },
      {
        question: "Where is it made?",
        answer:
          "Designed and assembled in Nepal.",
      },
    ],
  },
  {
    slug: "esc-stack",
    title: "ESC",
    category: "uav-systems",
    image: "/categories/flight-electronics.png",
    priceUsd: 79,
    description: "High-current ESC modules for multirotor platforms",
    status: "in-development",
    overview:
      "An ESC stack handles the power side of a multirotor, turning control signals into motor drive without becoming the weak link in the build. Designed to pair cleanly with our flight controllers.",
    applications: [
      {
        iconName: "Zap",
        title: "Power trains",
        description: "Multirotor and FPV power trains.",
      },
      {
        iconName: "Plane",
        title: "High-current UAV",
        description: "Higher-current UAV platforms.",
      },
      {
        iconName: "Layers",
        title: "Stacked builds",
        description: "Paired flight controller and ESC builds.",
      },
    ],
    specs: [],
    faqs: [
      {
        question: "Can I buy this today?",
        answer:
          "Not yet — it is still in development. Get in touch and we will tell you where it stands and when to expect it.",
      },
      {
        question: "Can I influence the design?",
        answer:
          "Yes. Early conversations shape what we build, so tell us what you need it to do.",
      },
      {
        question: "Are specifications available?",
        answer:
          "Not yet. We publish specifications once the hardware is real enough for us to stand behind them.",
      },
    ],
  },*/
];
