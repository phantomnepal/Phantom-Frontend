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
    image: "/site/hardware.png",
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
    image: "/site/software.jpg",
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
    image: "/site/mechanical.jpg",
  },
];

export const logos: Logo[] = [
  { src: "/tools/matlab.svg", alt: "MATLAB" },
  { src: "/tools/LT.svg", alt: "LTspice" },
  { src: "/tools/aws-freertos.svg", alt: "FreeRTOS" },
  { src: "/tools/blender.svg", alt: "Blender" },
  { src: "/tools/Altium.png", alt: "Altium Designer" },
  { src: "/tools/platformio.svg", alt: "PlatformIO" },
  { src: "/tools/visual-studio-code.svg", alt: "VS Code" },
  { src: "/tools/arduino.svg", alt: "Arduino" },
  { src: "/tools/OpenVSP.png", alt: "OpenVSP" },
  { src: "/tools/kicad.svg", alt: "KiCad" },
  { src: "/tools/fusion.svg", alt: "Fusion" },
  { src: "/tools/stmicroelectronics.svg", alt: "STM32CubeIDE" },
];

/**
 * The hero background. One image, by choice: the rotating carousel and its
 * indicator pills were removed, so anything past the first entry would never
 * render. `hero-1.png` and `hero-2.png` are still in public/site/.
 */
export const heroImages: HeroImage[] = [{ src: "/site/hero.jpg" }];
