/** Products in the `educational-kits` category. */
import type { Product } from "../../../types";

export const educationalKitsProducts: Product[] = [
  {
    slug: "electronics-starter-kit",
    title: "Electronics Starter Kit",
    category: "educational-kits",
    image: "/products/electronics-starter-kit/contents-flat-lay.jpg",
    gallery: [
      "/products/electronics-starter-kit/contents-angle.jpg",
      "/products/electronics-starter-kit/contents-detail.jpg",
    ],
    priceUsd: 21.3,
    status: "available",
    statusNote: "Ships in 2–4 days",
    // USER-AUTHORED from here down. Not draft placeholder — do not rewrite.
    description: "Learn electronics fundamentals",
    overview:
      "Go from a single LED to real circuits, step by step. The kit pairs an Arduino UNO with 30+ parts across sensors, actuators and passives, and every component is controlled through Arduino code you write yourself.",
    applications: [
      {
        iconName: "Lightbulb",
        title: "Learn by building",
        description: "Go from a single LED to real circuits, step by step.",
      },
      {
        iconName: "Gauge",
        title: "Sensors and actuators",
        description:
          "Work with motion, temperature, and light sensors, plus a servo and display.",
      },
      {
        iconName: "Terminal",
        title: "Programmable",
        description:
          "Every component is controlled through Arduino code you write yourself.",
      },
    ],
    specs: [
      { label: "Controller", value: "Arduino UNO" },
      { label: "Prototyping", value: "Full-size breadboard" },
      { label: "Display", value: "16x2 LCD" },
      {
        label: "Sensors",
        value: "DHT22 (temperature/humidity), PIR (motion), IR receiver",
      },
      { label: "Actuator", value: "9G micro servo" },
      { label: "Switching", value: "1-channel relay module" },
      { label: "Indicators", value: "5x LEDs (multiple colours)" },
      {
        label: "Passives",
        value: "Resistor assortment, capacitor assortment, diode, potentiometer",
      },
      {
        label: "Power",
        value: "9V battery with clip, jumper wires (M-M, M-F), USB cable",
      },
      { label: "Built for", value: "Beginners and self-learners" },
    ],
    highlights: [
      { label: "Controller", value: "Arduino UNO" },
      { label: "Components", value: "30+ parts across sensors, actuators, and passives" },
      { label: "Built for", value: "Beginners & self-learners" },
    ],
    faqs: [
      {
        question: "Do I need any prior electronics knowledge?",
        answer:
          "No, this kit is built for complete beginners starting from the basics.",
      },
      {
        question: "What can I build with this kit?",
        answer:
          "Projects like a motion-activated light, a temperature/humidity display, a servo-controlled gauge, and simple relay-switched circuits.",
      },
      {
        question: "Is coding required?",
        answer:
          "Yes, you'll write simple Arduino code to control each component, with guided examples to start from.",
      },
    ],
  },
  {
    slug: "embedded-systems-kit",
    title: "Embedded Systems Kit",
    category: "educational-kits",
    image: "/categories/educational-kits.png",
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
    // Real photographs of the Phantom boards, not the earlier AI render
    // (hero.png, kept in public/ but no longer referenced).
    image: "/products/educational-1u-cubesat/onboard-computer.jpg",
    gallery: [
      "/products/educational-1u-cubesat/eps-board.jpg",
      "/products/educational-1u-cubesat/eps-board-detail.jpg",
    ],
    priceUsd: 100,
    status: "in-development",
    statusNote: "In development — launch date coming soon",
    // USER-AUTHORED from here down. Not draft placeholder — do not rewrite.
    description: "Learn satellite systems with this 1U CubeSat platform",
    overview:
      "A 1U CubeSat platform built to be taken apart and understood: a 3D-printed frame carrying an on-board computer, an electrical power system and a solar board, so students can see how real satellite subsystems talk to each other.",
    applications: [
      {
        iconName: "Satellite",
        title: "Orbital systems",
        description: "Learn how real satellites work.",
      },
      {
        iconName: "GraduationCap",
        title: "Hands-on learning",
        description: "Designed for classrooms, clubs, and self-learners.",
      },
      {
        iconName: "RadioTower",
        title: "Telemetry",
        description:
          "Explore how OBC, EPS, and solar subsystems talk to each other.",
      },
    ],
    specs: [
      { label: "Form factor", value: "1U, 3D-printed frame" },
      { label: "EPS (electrical power system)", value: "Li-ion battery management" },
      {
        label: "OBC (on-board computer)",
        value:
          "STM32G-series MCU with onboard IMU, barometer and temperature sensor",
      },
      { label: "Connectivity", value: "BLE (Bluetooth) and RF" },
      {
        label: "Solar board",
        value: "Multi-panel solar input with individual current sensing per panel",
      },
      { label: "Programming interface", value: "SWD and USB-C" },
      { label: "Operating temperature", value: "0°C to 60°C" },
      { label: "Built for", value: "Students and self-learners" },
    ],
    highlights: [
      { label: "Form factor", value: "3D printed frame" },
      { label: "Subsystems", value: "OBC, EPS, Solar Board" },
      { label: "Built for", value: "Students & self-learners" },
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
          "Students and self-learners, plus classrooms and clubs that want to assemble, program and debug real satellite subsystems.",
      },
      {
        question: "Can I buy this today?",
        answer:
          "Not yet — it is still in development. Get in touch and we will tell you where it stands and when to expect it.",
      },
    ],
  },
  {
    // Moved out of _parked.ts at the user's request, and into educational-kits
    // rather than the parked `iot-robotics` category.
    slug: "4wd-robotics-kit",
    title: "4WD Robotics Kit",
    category: "educational-kits",
    image: "/products/4wd-robotics-kit/assembled.jpg",
    gallery: [
      "/products/4wd-robotics-kit/contents-flat-lay.jpg",
      "/products/4wd-robotics-kit/contents-angle.jpg",
    ],
    priceUsd: 23,
    status: "available",
    statusNote: "Ships in 2–4 days",
    // USER-AUTHORED from here down. Not draft placeholder — do not rewrite.
    description: "Build and program your own robot car",
    overview:
      "A 4WD robot car you build and program yourself. It detects obstacles and tracks lines with ultrasonic and IR sensors, teaches motor control and Arduino programming hands-on, and stays fully open to custom code.",
    applications: [
      {
        iconName: "Waypoints",
        title: "Sensing",
        description:
          "Detects obstacles and tracks lines with ultrasonic and IR sensors.",
      },
      {
        iconName: "GraduationCap",
        title: "Hands-on learning",
        description: "Learn motor control and Arduino programming, hands-on.",
      },
      {
        iconName: "Terminal",
        title: "Programmable",
        description: "Fully open to custom code.",
      },
    ],
    specs: [
      { label: "Controller", value: "Arduino UNO" },
      { label: "Motor driver", value: "L298N dual H-bridge" },
      { label: "Motors", value: "4x TT gear motors" },
      { label: "Wheels", value: "4x 65mm rubber wheels" },
      {
        label: "Sensors",
        value: "HC-SR04 ultrasonic, 2x IR obstacle/line sensors",
      },
      { label: "Actuator", value: "1x MG90S micro servo (sensor pan mount)" },
      { label: "Power", value: "3S 18650 Li-ion battery holder (3 cells)" },
      { label: "Chassis", value: "2-layer laser-cut MDF" },
      { label: "Indicators", value: "3x LED (red, green, blue)" },
    ],
    highlights: [
      { label: "Form factor", value: "4WD chassis, laser-cut MDF" },
      { label: "Controller", value: "Arduino UNO" },
      { label: "Built for", value: "Students & self-learners" },
    ],
    faqs: [
      {
        question: "Do I need prior experience to build this kit?",
        answer:
          "No, the kit is designed for beginners. If you can follow step-by-step instructions and do basic wiring, you can build and program this car.",
      },
      {
        question: "What do I need to program the car?",
        answer:
          "Just a computer with the Arduino IDE installed and the included USB cable. No extra software or hardware required.",
      },
      {
        question: "Are the batteries included?",
        answer: "No — the kit does not include batteries.",
      },
    ],
  },
];
