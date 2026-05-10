import { Cpu, Layers, Rocket, ArrowRight, type LucideIcon } from "lucide-react";

interface Solution {
  layer: string;
  icon: LucideIcon;
  title: string;
  description: string;
  tags: string[];
}

const solutions: Solution[] = [
  {
    layer: "CORE LAYER",
    icon: Cpu,
    title: "Embedded Systems",
    description:
      "We design and build complete embedded systems from schematics and PCB design to firmware and integration delivering production-ready solutions.",
    tags: ["Project Specific", "Reliable", "Industrial Grade"],
  },
  {
    layer: "PLATFORM LAYER",
    icon: Layers,
    title: "IoT & Robotics Engineering",
    description:
      "We build intelligent connected systems  combining hardware, sensors, and mechanical design to deliver autonomous and remote-ready solutions.",
    tags: ["Project Specific", "Reliable", "Industrial Grade"],
  },
  {
    layer: "SYSTEM LAYER",
    icon: Rocket,
    title: "UAV System Development",
    description:
      "We engineer unmanned aerial systems by integrating aerodynamics, avionics, propulsion, and communication systems.",
    tags: ["Project Specific", "Reliable", "Industrial Grade"],
  },
];

export default function EngineeringSolutions() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[#A10F1A] font-semibold text-sm tracking-wider mb-3">
            OUR ENGINEERING SOLUTIONS
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            From Components to Complete Embedded Systems
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Phantom provides a structured ecosystem of embedded engineering
            hardware from foundational components to advanced system platforms.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {solutions.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 hover:shadow-md transition-shadow"
              >
                <p className="text-gray-400 text-sm font-medium tracking-wider mb-4">
                  {item.layer}
                </p>

                <div className="text-[#A10F1A] mb-5">
                  <Icon className="w-10 h-10" strokeWidth={1.5} />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>

                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {item.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-[#A10F1A] font-semibold text-sm hover:gap-3 transition-all"
                >
                  Explore More <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
