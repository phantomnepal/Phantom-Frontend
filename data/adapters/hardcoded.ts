import type {
  MegaMenuColumn,
  Product,
  ProductCategory,
  ProductPageContent,
  SearchableItem,
  SiteContent,
} from "../types";

const productCategories: ProductCategory[] = [
  {
    slug: "embedded-systems",
    title: "Embedded Systems",
    description:
      "Custom PCBs, dev boards and sensor hardware for rapid prototyping.",
    image: "/embedded-systems.jpg",
  },
  {
    slug: "iot-robotics",
    title: "IoT & Robotics",
    description:
      "Connected sensing, monitoring and programmable robotic platforms.",
    image: "/iot-robotics.jpg",
  },
  {
    slug: "uav-systems",
    title: "UAV Systems",
    description:
      "Flight controllers and power electronics for FPV and light UAVs.",
    image: "/products/flight-controller.png",
  },
  {
    slug: "educational-kits",
    title: "Educational Kits",
    description:
      "Hands-on kits that take learners from first circuit to working system.",
    image: "/engineering-kits.png",
  },
];

/**
 * Every product Phantom sells or is building.
 *
 * The mega menu, /product/[category] and site search all derive from this list,
 * so a product added here appears everywhere at once.
 *
 * Self-contained by design: product pages carry their own specs and never defer
 * to /projects. `specs: []` means nothing is published yet, and the page says so
 * rather than inventing detail.
 *
 * `overview`, `applications` and `faqs` are DRAFT placeholder copy — see
 * data/types.ts. Review before this ships publicly.
 */
const catalog: Product[] = [
  {
    slug: "advance-usb-c-power-supply",
    title: "Advance USB-C Power Supply",
    category: "embedded-systems",
    // Real photograph of this board, shared with the /projects entry for the
    // same hardware. Replace if a dedicated product shot is taken.
    image: "/project/project7.png",
    // Further real shots of the same board, shared with its /projects entry.
    gallery: ["/project/project8.png", "/project/project9.png"],
    price: "$49.00",
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
    title: "Sensor Modules",
    category: "embedded-systems",
    image: "/embedded-systems.jpg",
    price: "$24.00",
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
  {
    slug: "custom-dev-board",
    title: "Custom Dev Board",
    category: "embedded-systems",
    image: "/embedded-systems.jpg",
    price: "$89.00",
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
  },
  {
    slug: "4-dof-robotic-arm",
    title: "4-DOF Robotic Arm",
    category: "iot-robotics",
    image: "/iot-robotics.jpg",
    price: "$149.00",
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
    image: "/iot-robotics.jpg",
    price: "$59.00",
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
    image: "/iot-robotics.jpg",
    price: "$399.00",
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
  },
  {
    slug: "phantom-f405",
    title: "Phantom F405",
    category: "uav-systems",
    image: "/products/phantom-f405.png",
    price: "$79.00",
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
    title: "Phantom F722",
    category: "uav-systems",
    image: "/products/flight-controller.png",
    // Real shots of the F722-Analog, shared with its /projects entry.
    gallery: ["/project/project2.png", "/project/projects3.png"],
    price: "$99.00",
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
      { label: "Designed for", value: "Ultra-clean analog systems only" },
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
    title: "ESC Stack",
    category: "uav-systems",
    image: "/products/flight-controller.png",
    price: "$79.00",
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
  {
    slug: "electronics-starter-kit",
    title: "Electronics Starter Kit",
    category: "educational-kits",
    image: "/engineering-kits.png",
    price: "$35.00",
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
    price: "$79.00",
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
    slug: "robotics-kit",
    title: "Robotics Kit",
    category: "educational-kits",
    image: "/engineering-kits.png",
    price: "$129.00",
    description: "Build and program your own robots",
    status: "available",
    overview:
      "Robotics ties together mechanics, electronics, and code, which is where most learners get stuck. This kit walks builders through motion control, sensors, and actuators with projects that assemble into a working robot.",
    applications: [
      {
        iconName: "Bot",
        title: "Project-based",
        description: "Project-based robotics learning.",
      },
      {
        iconName: "Waypoints",
        title: "Sensors and control",
        description: "Teaching sensors, actuators, and control together.",
      },
      {
        iconName: "Trophy",
        title: "Clubs and competitions",
        description: "Clubs, workshops, and competitions.",
      },
    ],
    specs: [
      { label: "Covers", value: "Motion control, sensors and actuators" },
      { label: "Format", value: "Project-based" },
      { label: "Disciplines", value: "Mechanics, electronics and code" },
      { label: "Outcome", value: "Program your own behaviours" },
    ],
    faqs: [
      {
        question: "What will I build?",
        answer:
          "Projects assemble into a working robot you program yourself.",
      },
      {
        question: "Do I need to know how to code?",
        answer:
          "The kit walks through motion control, sensors and actuators together, so the code comes with the build.",
      },
      {
        question: "Is it suitable for a club or competition?",
        answer:
          "Yes — it is used for clubs, workshops and competitions.",
      },
    ],
  },
  {
    slug: "educational-1u-cubesat",
    title: "Educational 1U CubeSat",
    category: "educational-kits",
    image: "/products/cubesat.png",
    price: "$349.00",
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

/**
 * Shared by every product page. Site-level claims only — nothing here is
 * specific to a product, so it stays true as the catalog changes.
 */
const productPageContent: ProductPageContent = {
  /**
   * The Figma's closing strip pitches "custom power management for industrial
   * fleets" — true of the power supply, false of the other twelve products.
   * This line is deliberately generic instead, because the strip renders on
   * every product page.
   */
  enquire: {
    title: "Talk to us about your needs",
    subtitle:
      "Our engineers can adapt this hardware to your requirements, or design something new around them.",
    cta: "Enquire now",
  },
  /** UNRENDERED — the product page has no "Why Choose Phantom" section. */
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
      title: "Mission focused",
      description:
        "Whether it is a sensor node or a CubeSat, we design with end-mission success as the primary metric.",
    },
    {
      title: "Built to be understood",
      description:
        "Our kits and platforms are made to be taken apart, programmed, and debugged — not treated as a black box.",
    },
  ],
  /**
   * UNRENDERED — the product page has no "How to Order" section. These steps
   * describe a store (quantity, cart, checkout) that does not exist on `main`;
   * the page now shows the cart controls from the Figma instead, and they are
   * inert for the same reason. Kept for when the store ships.
   */
  orderSteps: [
    {
      title: "Choose your quantity",
      description:
        "Select unit quantity on the product page — single units for individual use, or bulk tiers for labs, classrooms, and production runs.",
    },
    {
      title: "Add to cart and check out",
      description:
        "Confirm your shipping details and complete payment securely online. Bulk orders get tiered pricing automatically.",
    },
    {
      title: "We build and ship",
      description:
        "Orders are fulfilled from stock or current production batch, tested, and shipped to your address with tracking.",
    },
  ],
};

/** Mega-menu columns, one per category, derived from the catalog. */
const productMegaMenuColumns: MegaMenuColumn[] = productCategories.map(
  (category) => ({
    title: category.title,
    items: catalog
      .filter((product) => product.category === category.slug)
      .map((product) => ({
        label: product.title,
        href: `/product/${product.slug}`,
        description: product.description,
      })),
  }),
);

/** Search entries for every product and category, derived from the catalog. */
const catalogSearchItems: SearchableItem[] = [
  ...productCategories.map((category) => ({
    title: category.title,
    href: `/product/${category.slug}`,
    category: "Product Line",
  })),
  ...catalog.map((product) => ({
    title: product.title,
    href: `/product/${product.slug}`,
    category:
      productCategories.find((c) => c.slug === product.category)?.title ??
      "Products",
  })),
];

export const hardcodedContent: SiteContent = {
  navItems: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    // Mega-menu items carry an href as well: hovering opens the panel, and
    // clicking the label goes to the section landing page. Without this the
    // nav had no route to /product at all.
    {
      label: "Product",
      href: "/product",
      megaMenu: { columns: productMegaMenuColumns },
    },
    {
      label: "Engineering",
      href: "/engineering",
      megaMenu: {
        columns: [
          {
            title: "Embedded Hardware Development",
            items: [
              {
                label: "Schematic & PCB Design",
                href: "/engineering/hardware/schematic-pcb-design",
                description:
                  "Multi-layer PCB layout with signal integrity analysis",
              },
              {
                label: "Component Selection & BOM",
                href: "/engineering/hardware/component-selection",
                description: "Optimized BOM with obsolescence-aware sourcing",
              },
              {
                label: "Prototyping & Hardware Bring-up",
                href: "/engineering/hardware/prototyping",
                description:
                  "Rapid prototyping with systematic bring-up procedures",
              },
              {
                label: "Testing & Validation",
                href: "/engineering/hardware/testing",
                description:
                  "Compliance testing, thermal and environmental validation",
              },
            ],
          },
          {
            title: "Embedded Software Development",
            items: [
              {
                label: "Bare-metal & RTOS Firmware",
                href: "/engineering/software/bare-metal-rtos",
                description:
                  "Deterministic firmware on FreeRTOS and bare-metal targets",
              },
              {
                label: "Peripheral & Driver Development",
                href: "/engineering/software/peripheral-drivers",
                description:
                  "Custom drivers for sensors, actuators and communication ICs",
              },
              {
                label: "Communication Protocols",
                href: "/engineering/software/communication-protocols",
                description:
                  "I2C, SPI, UART, CAN, Ethernet and wireless stack integration",
              },
              {
                label: "Real-Time Control Systems",
                href: "/engineering/software/real-time-control",
                description:
                  "PID, state-space and model-predictive control implementation",
              },
            ],
          },
          {
            title: "3D & Mechanical Development",
            items: [
              {
                label: "CAD Modelling & Design",
                href: "/engineering/mechanical/cad-modelling",
                description:
                  "Parametric 3D modelling with DFM/DFA optimisation",
              },
              {
                label: "Structural & Thermal Analysis",
                href: "/engineering/mechanical/structural-thermal",
                description: "FEA-driven structural and thermal simulation",
              },
              {
                label: "Enclosure & Mounting Design",
                href: "/engineering/mechanical/enclosure-design",
                description:
                  "Custom enclosures with IP rating and fitment validation",
              },
              {
                label: "Production-Ready Design",
                href: "/engineering/mechanical/production-ready",
                description:
                  "Design for injection moulding, CNC and additive manufacturing",
              },
            ],
          },
        ],
      },
    },
    { label: "Projects", href: "/projects" },
  ],

  searchableItems: [
    { title: "Home", href: "/", category: "Page" },
    { title: "About Us", href: "/about", category: "Page" },
    ...catalogSearchItems,
    {
      title: "Schematic & PCB Design",
      href: "/engineering/hardware/schematic-pcb-design",
      category: "Embedded Hardware",
    },
    {
      title: "Component Selection & BOM",
      href: "/engineering/hardware/component-selection",
      category: "Embedded Hardware",
    },
    {
      title: "Prototyping & Hardware Bring-up",
      href: "/engineering/hardware/prototyping",
      category: "Embedded Hardware",
    },
    {
      title: "Testing & Validation",
      href: "/engineering/hardware/testing",
      category: "Embedded Hardware",
    },
    {
      title: "Bare-metal & RTOS Firmware",
      href: "/engineering/software/bare-metal-rtos",
      category: "Embedded Software",
    },
    {
      title: "Peripheral & Driver Development",
      href: "/engineering/software/peripheral-drivers",
      category: "Embedded Software",
    },
    {
      title: "Communication Protocols",
      href: "/engineering/software/communication-protocols",
      category: "Embedded Software",
    },
    {
      title: "Real-Time Control Systems",
      href: "/engineering/software/real-time-control",
      category: "Embedded Software",
    },
    {
      title: "CAD Modelling & Design",
      href: "/engineering/mechanical/cad-modelling",
      category: "3D & Mechanical",
    },
    {
      title: "Structural & Thermal Analysis",
      href: "/engineering/mechanical/structural-thermal",
      category: "3D & Mechanical",
    },
    {
      title: "Enclosure & Mounting Design",
      href: "/engineering/mechanical/enclosure-design",
      category: "3D & Mechanical",
    },
    {
      title: "Production-Ready Design",
      href: "/engineering/mechanical/production-ready",
      category: "3D & Mechanical",
    },
    { title: "Projects", href: "/projects", category: "Page" },
    { title: "Contact Us", href: "/contact", category: "Page" },
  ],

  footerQuickLinks: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Product", href: "/product" },
    { label: "Engineering", href: "/engineering" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
  ],

  footerEngineeringLinks: [
    { label: "Embedded Hardware Development", href: "#" },
    { label: "Embedded Software Development", href: "#" },
    { label: "3D & Mechanical Development", href: "#" },
  ],

  footerProductLinks: [
    { label: "Embedded Systems", href: "#" },
    { label: "IOT & Robotics", href: "#" },
    { label: "UAV", href: "#" },
    { label: "Educational Kits", href: "#" },
  ],

  solutions: [
    {
      layer: "CORE LAYER",
      title: "Embedded Systems",
      description:
        "We design and build complete embedded systems from schematics and PCB design to firmware and integration delivering production-ready solutions.",
      tags: ["Project Specific", "Reliable", "Industrial Grade"],
      iconName: "Cpu",
    },
    {
      layer: "PLATFORM LAYER",
      title: "IoT & Robotics Engineering",
      description:
        "We build intelligent connected systems combining hardware, sensors, and mechanical design to deliver autonomous and remote-ready solutions.",
      tags: ["Project Specific", "Reliable", "Industrial Grade"],
      iconName: "Layers",
    },
    {
      layer: "SYSTEM LAYER",
      title: "UAV System Development",
      description:
        "We engineer unmanned aerial systems by integrating aerodynamics, avionics, propulsion, and communication systems.",
      tags: ["Project Specific", "Reliable", "Industrial Grade"],
      iconName: "Rocket",
    },
  ],

  capabilities: [
    {
      category: "ENGINEERING CAPABILITIES",
      title: "Embedded Hardware Development",
      subtitle: "Hardware Development Lifecycle",
      features: [
        "Requirements & System Architecture",
        "Component Selection & Schematic Design",
        "Multi-layer PCB Layout",
        "Power, Signal & Thermal Integrity",
        "EMI/EMC Design Considerations",
        "Prototyping & Hardware Bring-up",
        "Testing, Validation & Debugging",
        "Optimisation & Production Readiness",
      ],
      image: "/hardware2.png",
    },
    {
      category: "ENGINEERING CAPABILITIES",
      title: "Embedded Software Development",
      subtitle: "Software Development Lifecycle",
      features: [
        "Requirements & System Architecture",
        "Bare-metal / RTOS Firmware Development",
        "Peripheral & Driver Development",
        "Communication Protocols",
        "Real-Time Control Systems",
        "Testing, Debugging & Validation",
        "Performance & Power Optimisation",
        "Deployment & Field Updates",
      ],
      image: "/software.jpg",
    },
    {
      category: "ENGINEERING CAPABILITIES",
      title: "3D Design & Mechanical Development",
      subtitle: "Mechanical Development Lifecycle",
      features: [
        "Requirements & Form Factor Definition",
        "Concept Design & CAD Modelling",
        "Structural Design & Material Selection",
        "Load, Stress & Vibration Considerations",
        "Thermal & Environmental Design",
        "Enclosure & Mounting Design",
        "Testing & Design Iteration",
        "Production-Ready Design",
      ],
      image: "/mechanical.jpg",
    },
  ],

  productCategories,
  catalog,
  productPageContent,

  logos: [
    { src: "/logos/matlab.svg", alt: "MATLAB" },
    { src: "/logos/LT.svg", alt: "LTspice" },
    { src: "/logos/aws-freertos.svg", alt: "FreeRTOS" },
    { src: "/logos/blender.svg", alt: "Blender" },
    { src: "/logos/Altium.png", alt: "Altium Designer" },
    { src: "/logos/platformio.svg", alt: "PlatformIO" },
    { src: "/logos/visual-studio-code.svg", alt: "VS Code" },
    { src: "/logos/arduino.svg", alt: "Arduino" },
    { src: "/logos/OpenVSP.png", alt: "OpenVSP" },
    { src: "/logos/kicad.svg", alt: "KiCad" },
    { src: "/logos/fusion.svg", alt: "Fusion" },
    { src: "/logos/stmicroelectronics.svg", alt: "STM32CubeIDE" },
  ],

  faqLeft: [
    {
      value: "item-1",
      question: "What is Phantom?",
      answer:
        "Phantom is an engineering-focused company developing embedded systems, robotics, IoT platforms, UAV technologies, and educational electronics products designed for real-world applications.",
    },
    {
      value: "item-2",
      question: "What products does Phantom offer?",
      answer: null,
      list: [
        "Electronics starter kits",
        "Embedded systems kits",
        "Robotics and IoT learning kits",
        "UAV and flight controller development projects",
      ],
    },
    {
      value: "item-3",
      question: "Who are Phantom products designed for?",
      answer: null,
      list: [
        "Students and beginners",
        "STEM learners",
        "Engineering enthusiasts",
        "Educational institutions",
        "Developers and hobby makers",
      ],
    },
    {
      value: "item-4",
      question: "Why are Phantom kits different from typical electronics kits?",
      answer:
        "Instead of including excessive unused components, Phantom focuses on carefully selected, practical components that are widely used in real-world electronics, embedded systems, robotics, and IoT projects.",
    },
    {
      value: "item-5",
      question: "Do I need prior experience to use the kits?",
      answer:
        "No. Our starter kits are designed to be beginner-friendly while still being expandable for advanced learning and future projects.",
    },
  ],

  faqRight: [
    {
      value: "item-1",
      question: "What can I build using the Phantom Electronics Starter Kit?",
      answer: null,
      list: [
        "LED control systems",
        "Sensor-based automation",
        "LCD display systems",
        "Motion detection alarms",
        "Servo control projects",
        "Basic smart automation systems",
      ],
    },
    {
      value: "item-2",
      question: "Does Phantom provide tutorials or documentation?",
      answer:
        "Yes. We provide project documentation, example codes, circuit references, and learning resources to help users build and understand projects effectively.",
    },
    {
      value: "item-3",
      question: "Are Phantom products future-proof?",
      answer:
        "Yes. We focus on components and platforms that are commonly used across embedded systems, robotics, IoT, and automation projects, allowing users to continue expanding beyond beginner-level learning.",
    },
    {
      value: "item-4",
      question: "Do you deliver all over Nepal?",
      answer:
        "Yes. Phantom products are available with nationwide delivery across Nepal.",
    },
    {
      value: "item-5",
      question: "Can institutions or schools collaborate with Phantom?",
      answer:
        "Absolutely. We are open to educational collaborations, workshops, training programs, and project-based partnerships with schools, colleges, and organizations.",
    },
  ],

  projects: [
    {
      id: 1,
      heroImage: "/project/project1.png",
      image: "/project/project1.png",
      gallery: ["/project/project2.png", "/project/projects3.png"],
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
      heroImage: "/project/project7.png",
      image: "/project/project7.png",
      gallery: ["/project/project8.png", "/project/project9.png"],
      category: "VARIABLE POWER SUPPLY",
      badge: "PROTOTYPE",
      badgeVariant: "prototype",
      title: "Phantom - Advance Type C Power Supply",
      description:
        "A custom STM32G0-based advanced power supply for high-power embedded and robotics projects, delivering selectable high-current voltage rails in an ultra-compact design for clean, reliable power.",
      tags: ["Embedded System", "Power Supply"],
    },
  ],

  coreValues: [
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
  ],

  roadmap: [
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
  ],

  contactInfo: [
    {
      iconName: "Mail",
      label: "Email",
      value: "info@phantom.com.np",
      href: "mailto:info@phantom.com.np",
    },
    {
      iconName: "Phone",
      label: "Phone",
      value: "+977 (986)3942274",
      href: "tel:+9779863942274",
    },
    {
      iconName: "MapPin",
      label: "Location",
      value: "Kathmandu, Nepal",
      href: "https://maps.app.goo.gl/MC1qoKfJvkrohWAd6",
    },
  ],

  socialLinks: [
    {
      iconName: "FaTiktok",
      href: "https://www.tiktok.com/@phantom_technology02?is_from_webapp=1&sender_device=pc",
      label: "Tiktok",
    },
    {
      iconName: "FaLinkedinIn",
      href: "https://www.linkedin.com/company/phantom_technologies/",
      label: "LinkedIn",
    },
    {
      iconName: "FaInstagram",
      href: "https://www.instagram.com/phantom.nepal?igsh=MTN5aGg2YmpwNDJhZg==",
      label: "Instagram",
    },
  ],

  heroImages: [{ src: "/images/hero1.png" }, { src: "/images/hero2.png" }],
};
