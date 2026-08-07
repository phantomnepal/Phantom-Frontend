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
    // Was `sensor-modules`, a placeholder SKU titled "Phantom BEC" with no
    // published specs. The user supplied the real product; the slug follows the
    // real name.
    slug: "advance-bec-power-module",
    title: "Advance BEC Power Module",
    category: "embedded-systems",
    image: "/products/advance-bec-power-module/top.png",
    gallery: [
      "/products/advance-bec-power-module/bottom.png",
      "/products/advance-bec-power-module/angle.png",
    ],
    priceUsd: 6,
    status: "prototype",
    statusNote: "Ships in 2–4 weeks",
    // USER-AUTHORED. Not draft placeholder — do not rewrite.
    description:
      "High-efficiency AP63205WU synchronous buck converter for reliable regulated power delivery.",
    overview:
      "High-efficiency AP63205WU synchronous buck converter for reliable regulated power delivery. Designed for drones, robotics, embedded systems, and industrial electronics.",
    // The three cards restate the four markets named in the overview; no new claim.
    applications: [
      {
        iconName: "Plane",
        title: "Drones",
        description: "Regulated 5V for flight controllers, cameras and RF links.",
      },
      {
        iconName: "Bot",
        title: "Robotics",
        description: "Clean logic-side power alongside high-current actuators.",
      },
      {
        iconName: "Factory",
        title: "Embedded and industrial",
        description: "Embedded systems and industrial electronics.",
      },
    ],
    specs: [
      { label: "Buck converter", value: "AP63205WU" },
      { label: "Input voltage", value: "3.8V–32V DC" },
      { label: "Output voltage", value: "Fixed 5V" },
      { label: "Output current", value: "Up to 2A continuous" },
      { label: "Switching frequency", value: "1.1MHz" },
      { label: "Conversion efficiency", value: "Up to 95%" },
      { label: "Output ripple", value: "Low-ripple design" },
      {
        label: "Protection",
        value: "Over-current, thermal shutdown, short-circuit protection",
      },
      { label: "Form factor", value: "Ultra-compact, 25×20mm" },
    ],
    // ⚠ The supplied copy gave the PCB two different values — "PCB GRADE
    // 2-Layer" in the summary row and "PCB DESIGN 4-Layer Power Optimized" in
    // the table. Both are omitted rather than publishing a guess; efficiency
    // takes the third slot. Restore the row once the layer count is confirmed.
    highlights: [
      { label: "Input voltage", value: "3.8V–32V DC" },
      { label: "Max output", value: "5V / 2A continuous" },
      { label: "Efficiency", value: "Up to 95%" },
    ],
    faqs: [
      {
        question: "Is the output regulated and safe for sensitive electronics?",
        answer:
          "Yes. The Advance BEC provides a stable 5V regulated output with low ripple and high conversion efficiency. It is suitable for powering microcontrollers, flight controllers, sensors, RF modules, cameras, and other sensitive embedded electronics.",
      },
      {
        question: "Does the module require any external components?",
        answer:
          "No. The Advance BEC is a fully assembled module with all required passive components integrated. Simply connect a supported DC input and your 5V load for immediate operation.",
      },
      {
        question: "Can the Advance BEC operate continuously at full load?",
        answer:
          "Yes. The Advance BEC is designed for continuous operation up to 2A under recommended input voltage and thermal conditions. For optimal performance, ensure adequate airflow and proper PCB mounting in high-temperature environments.",
      },
    ],
  },
];
