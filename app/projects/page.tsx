import Image from "next/image";

type Project = {
  id: number;
  image: string;
  category: string;
  badge: string;
  badgeVariant: "prototype" | "in-development" | "available";
  title: string;
  description: string;
  tags: string[];
};

const projects: Project[] = [
  {
    id: 1,
    image: "/projects/project1.jpg",
    category: "AEROSPACE EDUCATION",
    badge: "PROTOTYPE",
    badgeVariant: "prototype",
    title: "Educational 1U CubeSat",
    description:
      "Modular research platform designed for university-level aerospace engineering, featuring high-precision telemetry and solar energy management systems.",
    tags: ["LO-EARTH", "MODULAR", "RF-SYNC"],
  },
  {
    id: 2,
    image: "/projects/project2.jpg",
    category: "UAV SYSTEMS",
    badge: "IN DEVELOPMENT",
    badgeVariant: "in-development",
    title: "Phantom F722 Flight Controller",
    description:
      "A custom STM32F722-based flight controller designed for high-end FPV drones and industrial UAV applications requiring millisecond precision.",
    tags: ["STM32F7", "6S LIPO", "BLACKBOX"],
  },
  {
    id: 3,
    image: "/projects/project1.jpg",
    category: "AEROSPACE EDUCATION",
    badge: "PROTOTYPE",
    badgeVariant: "prototype",
    title: "Phantom F405 Flight Controller",
    description:
      "Modular research platform designed for university-level aerospace engineering, featuring high-precision telemetry and solar energy management systems.",
    tags: ["LO-EARTH", "MODULAR", "RF-SYNC"],
  },
  {
    id: 4,
    image: "/projects/project3.jpg",
    category: "Educational Products",
    badge: "AVAILABLE",
    badgeVariant: "available",
    title: "Phantom Electronics Starter Kit",
    description:
      "Comprehensive training hardware for embedded software development, including industrial-grade sensors and robust microcontroller boards.",
    tags: ["LEARNING", "SENSORS", "MCU-X1"],
  },
  {
    id: 5,
    image: "/projects/project4.jpg",
    category: "Educational Products",
    badge: "AVAILABLE",
    badgeVariant: "available",
    title: "Phantom Robotics Kit",
    description:
      "A high-precision mobile platform with aluminum chassis and integrated ROS support, ideal for autonomous navigation development.",
    tags: ["ROS READY", "AUTONOMY", "AL-FRAME"],
  },
  {
    id: 6,
    image: "/projects/project5.jpg",
    category: "Educational Products",
    badge: "IN DEVELOPMENT",
    badgeVariant: "in-development",
    title: "Phantom Embedded Systems Kit",
    description:
      "Modular research platform designed for university-level aerospace engineering, featuring high-precision telemetry and solar energy management systems.",
    tags: ["ROS READY", "AUTONOMY", "AL-FRAME"],
  },
];

const badgeStyles = {
  prototype: "border-amber-500 text-amber-700",
  "in-development": "border-gray-400 text-gray-600",
  available: "border-green-600 text-green-700",
};

export default function ProjectsPage() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Precision Engineering for the{" "}
            <span className="text-[#A10F1A]">Next Frontier</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed">
            PHANTOM is dedicated to pushing the boundaries of high-performance
            aerospace and robotics. Our systems are engineered for resilience,
            speed, and uncompromising reliability in mission-critical
            environments.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="border border-gray-200 bg-white flex flex-col rounded-md overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-3 gap-4">
                    <span className="text-xs font-bold tracking-widest text-[#A10F1A]">
                      {project.category}
                    </span>
                    <span
                      className={`shrink-0 text-[10px] font-semibold tracking-wider border px-2 py-0.5 ${badgeStyles[project.badgeVariant]}`}
                    >
                      {project.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {project.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>

                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-block bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <a
                      href="#"
                      className="inline-flex items-center gap-1 text-sm font-semibold text-[#A10F1A] hover:text-[#A10F1A] transition-colors"
                    >
                      VIEW DETAILS <span className="text-base">→</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
