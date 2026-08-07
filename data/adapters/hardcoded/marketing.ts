/** Home-page marketing sections: solutions, capabilities, logos, hero. */

import type {
  Capability,
  HeroImage,
  Logo,
  Solution,
} from "../../types";

export const solutions: Solution[] = [
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
];

export const capabilities: Capability[] = [
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
];

export const logos: Logo[] = [
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
];

export const heroImages: HeroImage[] = [{ src: "/images/hero1.png" }, { src: "/images/hero2.png" }];
