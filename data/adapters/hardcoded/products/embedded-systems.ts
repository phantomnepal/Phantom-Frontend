/** Products in the `embedded-systems` category. */
import type { Product } from "../../../types";

export const embeddedSystemsProducts: Product[] = [
  {
    slug: "advance-usb-c-power-supply",
    title: "Advance USB-C Power Supply",
    category: "embedded-systems",
    // Real photograph of this board, shared with the /projects entry for the
    // same hardware. Replace if a dedicated product shot is taken.
    image: "/products/advance-usb-c-power-supply/top.png",
    // Further real shots of the same board, shared with its /projects entry.
    gallery: ["/products/advance-usb-c-power-supply/bottom.png", "/products/advance-usb-c-power-supply/angle.png"],
    priceUsd: 49,
    description:
      "A custom power supply for selectable, high-current voltage output.",
    status: "prototype",
    statusNote:
      "This product has completed its final design phase and has entered the prototype stage for testing and manufacturing.",
    overview:
      "The Advance USB-C Power Supply is a custom STM32G0-based power supply built for high-power embedded and robotics projects. It delivers selectable, high-current voltage rails in an ultra-compact PCB, giving students, researchers, and engineers clean, reliable power without the bulk of a traditional bench supply.",
    applications: [
      // Authored — taken verbatim from the design for this board.
      {
        iconName: "Zap",
        title: "Dynamic power",
        description: "5V-20V switching for variable power needs.",
      },
      {
        iconName: "Bot",
        title: "High-current actuators",
        description: "Powers multiple actuators without sag.",
      },
      {
        iconName: "Vibrate",
        title: "Sensitive electronics",
        description: "Low-noise delivery for MCU/RF signals.",
      },
    ],
    // Restructured from the authored highlights on the /projects entry for this
    // same board — no new claims.
    // Nine rows, filling the design's 3x3 grid exactly. Values are terse for
    // the same reason. The previous tenth row ("Power delivery: Low-noise, for
    // reduced EMI") left an orphan cell on a fourth row and is already said by
    // the "Sensitive electronics" application card, so it was dropped rather
    // than reworded.
    //
    // "Form factor" deliberately keeps its original wording: the design reads
    // "Ultra-compact 45x25mm", and that dimension is not in the authored specs.
    specs: [
      { label: "MCU", value: "STM32G030K6Tx" },
      { label: "PD controller", value: "STUSB4500QTR" },
      {
        label: "Power path",
        value: "High-efficiency STL6P3LLH6 P-MOSFETs",
      },
      { label: "Selectable output", value: "5V, 9V, 12V, 20V" },
      { label: "Continuous current", value: "Up to 3A" },
      { label: "Input interface", value: "USB-C 2.0" },
      {
        label: "Voltage selection",
        value: "Push-button w/ onboard LEDs",
      },
      { label: "PCB design", value: "4-layer, power optimized" },
      {
        label: "Form factor",
        value: "Ultra-compact",
      },
    ],
    // Terse summary for the hero strip — every value restates a spec above.
    highlights: [
      { label: "Input source", value: "USB-C 2.0" },
      { label: "Max output", value: "20V / 3A" },
      { label: "PCB grade", value: "4-Layer" },
    ],
    whyChoose: [
      {
        title: "Designed and assembled in Nepal",
        description:
          "Our hardware is engineered here, not rebadged. That means the people who designed the board are the people who answer when you ask about it.",
      },
      {
        title: "Disciplined design",
        description:
          "We follow rigorous engineering standards so every PCB and firmware module is deterministic and reliable.",
      },
      {
        title: "Built for real power demands",
        description:
          "From motor drivers to flight controllers, we design around actual current draw and thermal load, not just datasheet best-case numbers.",
      },
      {
        title: "Built to be understood",
        description:
          "Our kits and platforms are made to be taken apart, programmed, and debugged — not treated as a black box.",
      },
    ],
    faqs: [
      {
        question: "Is the output regulated and safe for sensitive components?",
        answer:
          "Yes. Voltage output is regulated through high-efficiency P-channel MOSFET switching.",
      },
      {
        question:
          "Can I use it with a standard USB-C charger, or does it need a specific PD adapter?",
        answer: "It works with any USB-C PD-compliant charger or power source.",
      },
      {
        question: "Are specifications available?",
        answer: "Yes — see the specifications table above.",
      },
    ],
  },
  {
    slug: "sensor-modules",
    title: "Phantom BEC",
    category: "embedded-systems",
    image: "/categories/embedded-systems.jpg",
    priceUsd: 24,
    description:
      "Integrated sensor solutions for high-precision data acquisition and industrial monitoring.",
    status: "in-development",
    overview:
      "Sensor modules handle the analog front end, power, and interface so your application code only deals with clean data. Each module is designed to drop into an existing project without redesigning the board around it.",
    applications: [
      {
        iconName: "Database",
        title: "Data logging",
        description: "Data acquisition and logging.",
      },
      {
        iconName: "Gauge",
        title: "Condition monitoring",
        description: "Environmental and condition monitoring.",
      },
      {
        iconName: "Puzzle",
        title: "Retrofit",
        description: "Adding sensing to an existing system.",
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
