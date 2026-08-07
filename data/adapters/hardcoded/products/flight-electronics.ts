/** Products in the `uav-systems` category (titled Flight Electronics).
 *
 * The slug stays `uav-systems`: renaming it would break every existing
 * /product/uav-systems link without a redirect. */
import type { Product } from "../../../types";

export const flightElectronicsProducts: Product[] = [
  {
    slug: "phantom-f405",
    title: "Phantom F405",
    category: "uav-systems",
    image: "/products/phantom-f405.png",
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
    slug: "phantom-f722",
    title: "Phantom F722 Analog",
    category: "uav-systems",
    image: "/project/project1.png",
    // Real shots of the F722-Analog, shared with its /projects entry.
    gallery: ["/project/project2.png", "/project/projects3.png"],
    priceUsd: 99,
    description: "High-performance F722 flight controller for industrial UAVs",
    status: "prototype",
    overview:
      "The F722-Analog was engineered around one goal: an ultra-precise IMU, fully isolated on its own power rail. It is built with premium components to minimise EMI and keep power delivery clean, with nothing else competing for board space or signal integrity.",
    applications: [
      {
        iconName: "Gamepad2",
        title: "Analog FPV",
        description: "High-performance analog FPV builds.",
      },
      {
        iconName: "Plane",
        title: "Inspection UAV",
        description: "Industrial and inspection UAVs.",
      },
      {
        iconName: "Timer",
        title: "Control precision",
        description: "Platforms where control-loop precision matters most.",
      },
    ],
    specs: [
      { label: "MCU", value: "STM32F722RETx" },
      { label: "IMU", value: "ICM42688-P, isolated on a dedicated LDO" },
      { label: "Barometer", value: "BMP280" },
      { label: "Battery input", value: "2S–6S" },
      { label: "PCB", value: "6-layer, for signal and power integrity" },
      { label: "Power", value: "Ultra-low-noise buck converter, for reduced EMI" },
      { label: "Motor outputs", value: "DShot600 on all four channels, via Timer8" },
      { label: "UARTs", value: "5" },
      { label: "Mounting", value: "Plug-and-play with soldering pads" },
    ],
    // Terse summary for the hero strip — the leading spec rows are part
    // numbers and a sentence, which wrap over several lines there.
    highlights: [
      { label: "MCU", value: "STM32F722RETx" },
      { label: "Battery input", value: "2S–6S" },
      { label: "PCB", value: "6-layer" },
    ],
    faqs: [
      {
        question: "Is the F722 available to buy?",
        answer:
          "It is a prototype. Talk to us about your build and we will tell you where it stands.",
      },
      {
        question: "Does it support digital VTX systems?",
        answer:
          "It is purpose-built for analog systems only. Get in touch if you need a digital-capable board.",
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
    image: "/products/flight-controller.png",
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
  },
];
