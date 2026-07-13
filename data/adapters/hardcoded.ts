import type { SiteContent } from "../types";

export const hardcodedContent: SiteContent = {
  navItems: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    {
      label: "Product",
      megaMenu: {
        columns: [
          {
            title: "Embedded Systems",
            items: [
              {
                label: "Development Boards",
                href: "/product",
                description: "Custom PCBs and dev boards for rapid prototyping",
              },
              {
                label: "Sensor Modules",
                href: "/product",
                description: "Integrated sensor solutions for data acquisition",
              },
            ],
          },
          {
            title: "IoT & Robotics",
            items: [
              {
                label: "4-DOF Robotic Arm",
                href: "/product",
                description:
                  "Programmable robotic arm for education and automation",
              },
              {
                label: "Smart Sensor",
                href: "/product",
                description:
                  "Intelligent sensing platform with wireless connectivity",
              },
              {
                label: "Industrial Monitoring Devices",
                href: "/product",
                description:
                  "Real-time industrial monitoring and control hardware",
              },
            ],
          },
          {
            title: "UAV Systems",
            items: [
              {
                label: "Phantom F405",
                href: "/product",
                description: "STM32F405-based flight controller for FPV drones",
              },
              {
                label: "Phantom F722",
                href: "/product",
                description:
                  "High-performance F722 flight controller for industrial UAVs",
              },
              {
                label: "ESC Stack",
                href: "/product",
                description:
                  "High-current ESC modules for multirotor platforms",
              },
            ],
          },
          {
            title: "Educational Kits",
            items: [
              {
                label: "Electronics Starter Kit",
                href: "/product",
                description:
                  "Beginner-friendly kit for learning electronics fundamentals",
              },
              {
                label: "Embedded Systems Kit",
                href: "/product",
                description: "Advanced kit for embedded systems development",
              },
              {
                label: "Robotics Kit",
                href: "/product",
                description: "Build and program your own robots",
              },
              {
                label: "Educational 1U CubeSat",
                href: "/product",
                description:
                  "Learn satellite systems with this 1U CubeSat platform",
              },
            ],
          },
        ],
      },
    },
    {
      label: "Engineering",
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
    {
      title: "Development Boards",
      href: "/product",
      category: "Embedded Systems",
    },
    {
      title: "Sensor Modules",
      href: "/product",
      category: "Embedded Systems",
    },
    {
      title: "4-DOF Robotic Arm",
      href: "/product",
      category: "IoT & Robotics",
    },
    {
      title: "Smart Sensor",
      href: "/product",
      category: "IoT & Robotics",
    },
    {
      title: "Industrial Monitoring Devices",
      href: "/product",
      category: "IoT & Robotics",
    },
    {
      title: "Phantom F405",
      href: "/product",
      category: "UAV Systems",
    },
    {
      title: "Phantom F722",
      href: "/product",
      category: "UAV Systems",
    },
    {
      title: "ESC Stack",
      href: "/product",
      category: "UAV Systems",
    },
    {
      title: "Electronics Starter Kit",
      href: "/product",
      category: "Educational Kits",
    },
    {
      title: "Embedded Systems Kit",
      href: "/product",
      category: "Educational Kits",
    },
    {
      title: "Robotics Kit",
      href: "/product",
      category: "Educational Kits",
    },
    {
      title: "Educational 1U CubeSat",
      href: "/product",
      category: "Educational Kits",
    },
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

  products: [
    {
      category: "Instrumentation",
      title: "Embedded Systems",
      image: "/embedded-systems.jpg",
      href: "/product",
    },
    {
      category: "Aerospace",
      title: "Engineering Kits",
      image: "/engineering-kits.png",
      href: "/product",
    },
    {
      category: "Development",
      title: "IoT & Robotics",
      image: "/iot-robotics.jpg",
      href: "/product",
    },
  ],

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
