"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";

interface Capability {
  category: string;
  title: string;
  subtitle: string;
  features: string[];
  image: string;
}

const capabilities: Capability[] = [
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

export default function EngineeringCapabilities() {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = capabilities.length;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  const current = capabilities[activeIndex];

  return (
    <section className="relative py-16 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto relative">
        {/* Navigation Buttons - Top Right Aligned */}
        <div className="absolute top-0 right-12 flex items-center gap-2 z-10">
          <button
            onClick={handlePrev}
            aria-label="Previous"
            className="w-10 h-10 rounded-full bg-[#D6E1E1] hover:bg-[#A10F1A] text-white flex items-center justify-center transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next"
            className="w-10 h-10 rounded-full bg-[#D6E1E1] hover:bg-[#A10F1A] text-white flex items-center justify-center transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Main Content - 5/12 + 7/12 split for wider image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center px-8 md:px-12 ">
          {/* Left Content - 5 columns */}
          <div
            key={`text-${activeIndex}`}
            className="lg:col-span-5 animate-fadeIn"
          >
            <p className="text-[#A10F1A] font-semibold text-sm tracking-wider mb-4">
              {current.category}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5 leading-tight">
              {current.title}
            </h2>
            <p className="text-gray-600 font-medium mb-7">{current.subtitle}</p>

            {/* Feature List */}
            <ul className="space-y-4">
              {current.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#A10F1A]/10 border flex items-center justify-center flex-shrink-0">
                    <Check
                      className="w-3.5 h-3.5 text-[#A10F1A]"
                      strokeWidth={3}
                    />
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Image - 7 columns (larger/wider) */}
          <div
            key={`img-${activeIndex}`}
            className="lg:col-span-7 mt-14 relative w-full aspect-[3/2] rounded-md overflow-hidden shadow-md animate-fadeIn"
          >
            <Image
              src={current.image}
              alt={current.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>

        {/* Pagination Indicators - aligned under image on desktop */}
        <div className="flex items-center justify-center lg:justify-end gap-2 mt-8 lg:pr-[8%]">
          {capabilities.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === activeIndex
                  ? "w-12 bg-red-700"
                  : "w-12 bg-gray-200 hover:bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
