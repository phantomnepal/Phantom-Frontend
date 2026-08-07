/** Home-page FAQ, split into the two rendered columns. */

import type {
  FAQItem,
} from "../../types";

export const faqLeft: FAQItem[] = [
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
];

export const faqRight: FAQItem[] = [
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
];
