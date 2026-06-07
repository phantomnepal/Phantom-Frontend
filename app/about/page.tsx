import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { getSiteContent } from "@/data/content";

export default function AboutPage() {
  const content = getSiteContent();
  return (
    <main className="w-full bg-white">
      {/* ========== HERO SECTION ========== */}
      <section className="max-w-7xl mx-auto px-6 py-16 lg:py-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT — Text */}
          <div>
            <p className="text-[#9b1c1c] text-sm font-medium mb-4">
              About - Company
            </p>
            <h1 className="text-[40px] sm:text-[52px] lg:text-[60px] font-bold text-gray-900 leading-[1.1] mb-5">
              Building reliable technology from the ground up.
            </h1>

            <div className="space-y-5 text-gray-500 text-[15px] leading-relaxed mb-10 max-w-xl">
              <p>
                Phantom is focused on developing embedded systems, UAV
                platforms, and advanced electronics in Nepal. We design and
                build complete systems from PCB and firmware to integrated
                platforms focused on reliability, performance, and practical
                deployment.
              </p>
              <p>
                We believe strong engineering is built through discipline,
                iteration, and validation. Our goal is to create technology that
                is not only functional, but dependable in real-world
                environments.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/capabilities"
                className="bg-[#0f1e2e] text-white px-7 py-3.5 rounded-md text-sm font-medium hover:bg-[#1a3147] transition"
              >
                Our Capabilities
              </Link>
              <Link href="https://www.instagram.com/reel/DYh_tqxIIjM/?utm_source=ig_web_button_share_sheet">
                <button className="flex items-center gap-2 border border-gray-300 text-gray-800 px-7 py-3.5 rounded-md text-sm font-medium hover:border-gray-400 hover:bg-gray-50 transition">
                  <Play className="w-4 h-4 fill-current" />
                  Watch reel
                </button>
              </Link>
            </div>
          </div>

          {/* RIGHT — Image with decorative corners */}
          <div className="relative">
            {/* Top-right corner decoration */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-[#9b1c1c] z-10" />
            {/* Bottom-left corner decoration */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-[#9b1c1c] z-10" />

            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-md">
              <Image
                src="/about-hero.png"
                alt="Engineering blueprints"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-500 ease-in-out hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========== CORE VALUES SECTION ========== */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-14">
            <p className="text-[#9b1c1c] text-sm font-medium mb-3">
              Our Core Value
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              The principles that guide us.
            </h2>
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.coreValues.map((value) => (
              <div
                key={value.number}
                className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition border border-gray-100"
              >
                <h3 className="text-4xl font-bold text-[#9b1c1c] mb-6">
                  {value.number}
                </h3>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">
                  {value.title}
                </h4>
                <p className="text-gray-500 text-[14px] leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== ROADMAP SECTION ========== */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        {/* Heading */}
        <div className="mb-16">
          <p className="text-[#9b1c1c] text-sm font-semibold tracking-wider mb-3">
            ROADMAP
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            5-Year Directional Plan.
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Horizontal line - perfectly aligned with dot centers */}
          <div
            className="hidden lg:block absolute left-0 right-0 bg-gray-200"
            style={{ top: "84px", height: "1px" }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
            {content.roadmap.map((item) => (
              <div key={item.year} className="relative">
                {/* Year */}
                <p
                  className={`text-4xl font-bold mb-2 leading-none ${
                    item.isCurrent ? "text-[#9b1c1c]" : "text-[#e8b4b4]"
                  }`}
                >
                  {item.year}
                </p>

                {/* Phase label */}
                <p className="text-xs font-semibold text-gray-700 tracking-wider h-4 mb-4">
                  {item.phase}
                </p>

                {/* Dot on timeline - with halo ring */}
                <div className="relative mb-5 h-4 flex items-center">
                  <div className="relative flex items-center justify-center">
                    {/* Outer halo ring */}
                    <div
                      className={`absolute w-4 h-4 rounded-full ${
                        item.isCurrent ? "bg-[#9b1c1c]/15" : "bg-gray-200"
                      }`}
                    />
                    {/* Inner solid dot */}
                    <div
                      className={`w-2 h-2 rounded-full relative z-10 ${
                        item.isCurrent ? "bg-[#9b1c1c]" : "bg-gray-400"
                      }`}
                    />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-[14px] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
