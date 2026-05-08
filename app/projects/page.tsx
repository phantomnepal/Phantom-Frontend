import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Terminal, Shield, AlertTriangle } from "lucide-react";

export default function EngineeringMaturityPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <p className="text-[#A10F1A] font-medium mb-3 tracking-wide text-sm uppercase">
            Our Projects
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Engineering <span className="text-[#A10F1A]">Maturity</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl">
            A clinical approach to hardware lifecycle management. We bridge the
            gap between theoretical precision and deployable reliability through
            surgical execution.
          </p>
        </div>
      </section>

      {/* Project Alpha-01: CubeSat */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Column */}
          <div className="relative">
            <div className="aspect-[4/5] relative bg-gray-100 overflow-hidden rounded-sm">
              {/* Replace with your CubeSat image */}
              <Image
                src="/projects/cubesat.png"
                alt="Educational CubeSat Platform with solar panels"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute top-6 left-6">
                <span className="bg-red-700 text-white px-4 py-2 text-xs font-bold tracking-widest uppercase">
                  Active Research
                </span>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className="lg:pl-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-red-700"></div>
              <p className="text-[#A10F1A] font-bold text-xs tracking-widest uppercase">
                Project Alpha-01
              </p>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">
              Educational CubeSat Platform
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                  Problem Statement
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Educational satellite programs often lack standardized,
                  space-grade hardware entry points, leading to high failure
                  rates in low earth orbit testing.
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                  Outcome
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Developed a modular 1U platform with integrated power
                  management and standardized telemetry protocols for rapid
                  prototyping.
                </p>
              </div>
            </div>

            <div className="mt-10 flex items-center justify-between pt-8 border-t border-gray-200">
              <div>
                <p className="text-4xl font-bold text-gray-900">3 Teams</p>
                <p className="text-xs text-gray-500 uppercase tracking-widest mt-1 font-medium">
                  Active Research
                </p>
              </div>
              <Link
                href="#"
                className="group flex items-center gap-2 text-[#A10F1A] font-bold text-sm uppercase tracking-wider hover:gap-3 transition-all duration-200"
              >
                Case Study
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Project Beta-04: Flight Controller */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content Column - First on mobile, second on desktop */}
          <div className="lg:pr-8 order-2 lg:order-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-red-700"></div>
              <p className="text-[#A10F1A] font-bold text-xs tracking-widest uppercase">
                Project Beta-04
              </p>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">
              High-Reliability Flight Controller
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                  Problem Statement
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Mission-critical UAV systems required a flight controller
                  capable of handling sub-millisecond corrections without
                  thermal throttling.
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                  Outcome
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Implementation of STM32H7 dual-core architecture with
                  redundant IMU arrays, achieving extreme stability in turbulent
                  conditions.
                </p>
              </div>
            </div>

            <div className="mt-10 flex items-center justify-between pt-8 border-t border-gray-200">
              <div>
                <p className="text-4xl font-bold text-gray-900">99.9%</p>
                <p className="text-xs text-gray-500 uppercase tracking-widest mt-1 font-medium">
                  Uptime Metric
                </p>
              </div>
              <Link
                href="#"
                className="group flex items-center gap-2 text-[#A10F1A] font-bold text-sm uppercase tracking-wider hover:gap-3 transition-all duration-200"
              >
                Case Study
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Image Column - Second on mobile, first on desktop */}
          <div className="relative order-1 lg:order-2">
            <div className="aspect-[4/3] relative bg-gray-100 overflow-hidden rounded-sm">
              {/* Replace with your PCB image */}
              <Image
                src="/projects/flight-controller.png"
                alt="High-Reliability Flight Controller PCB with STM32H7 processor"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-6 right-6">
                <span className="bg-white/95 backdrop-blur text-gray-900 px-4 py-2 text-xs font-bold tracking-widest uppercase shadow-sm">
                  Certified Hardware
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Protocol & Process Section */}
      <section className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
            {/* 01 Protocol */}
            <div>
              <div className="flex items-baseline gap-4 mb-10">
                <span className="text-7xl font-bold text-red-200/80">01</span>
                <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-wider">
                  Protocol
                </h2>
              </div>

              <div className="space-y-6">
                <div className="bg-white p-8 shadow-sm border-l-4 border-red-700 rounded-r-lg">
                  <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider">
                    Redundancy Audit
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Every mission-critical trace undergoes triple-point
                    verification for thermal and electrical resilience.
                  </p>
                </div>

                <div className="bg-white p-8 shadow-sm border-l-4 border-gray-300 rounded-r-lg">
                  <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider">
                    Signal Integrity
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Utilizing advanced impedance matching techniques for
                    multi-gigahertz communication buses.
                  </p>
                </div>
              </div>
            </div>

            {/* 02 Process */}
            <div>
              <div className="flex items-baseline gap-4 mb-10">
                <span className="text-7xl font-bold text-red-200/80">02</span>
                <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-wider">
                  Process
                </h2>
              </div>

              <div className="space-y-8">
                <div className="flex gap-5">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center border border-red-100">
                      <Terminal className="w-5 h-5 text-[#A10F1A]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-sm uppercase tracking-wider">
                      Automated Validation
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      CI/CD pipelines for hardware firmware testing across
                      distributed test benches.
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center border border-red-100">
                      <Shield className="w-5 h-5 text-[#A10F1A]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-sm uppercase tracking-wider">
                      Clinical Fabrication
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      ISO-certified clean-room assembly for aerospace and
                      medical grade components.
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center border border-red-100">
                      <AlertTriangle className="w-5 h-5 text-[#A10F1A]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-sm uppercase tracking-wider">
                      Failure Analysis
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Deep-dive root cause analysis using X-ray and acoustic
                      microscopy for iterative refinement.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
