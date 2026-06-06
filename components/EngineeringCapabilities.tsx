"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { getSiteContent } from "@/data/content";

export default function EngineeringCapabilities() {
  const content = getSiteContent();
  const capabilities = content.capabilities;
  const [activeIndex, setActiveIndex] = useState(0);
  const total = capabilities.length;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  const current = capabilities[activeIndex];

  const touchX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
  };

  return (
    <section className="relative py-16 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto relative">
        {/* Navigation Buttons - Desktop only (top right) */}
        <div className="hidden lg:flex absolute top-0 right-12 items-center gap-2 z-10">
          <button
            onClick={handlePrev}
            aria-label="Previous"
            className="w-10 h-10 rounded-full bg-[#D6E1E1] hover:bg-[#A10F1A] active:bg-[#A10F1A] text-[#0f172a] hover:text-white active:text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next"
            className="w-10 h-10 rounded-full bg-[#D6E1E1] hover:bg-[#A10F1A] active:bg-[#A10F1A] text-[#0f172a] hover:text-white active:text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Main Content - 5/12 + 7/12 split for wider image */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center px-8 md:px-12"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
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
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Mobile Nav Buttons + Pagination */}
        <div className="flex flex-col items-center gap-4 mt-8 lg:mt-8">
          {/* Mobile prev/next buttons */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={handlePrev}
              aria-label="Previous"
              className="w-10 h-10 rounded-full bg-[#D6E1E1] hover:bg-[#A10F1A] active:bg-[#A10F1A] text-[#0f172a] hover:text-white active:text-white flex items-center justify-center transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next"
              className="w-10 h-10 rounded-full bg-[#D6E1E1] hover:bg-[#A10F1A] active:bg-[#A10F1A] text-[#0f172a] hover:text-white active:text-white flex items-center justify-center transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Pagination Indicators */}
          <div className="flex items-center gap-2">
            {capabilities.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === activeIndex
                    ? "w-12 bg-red-700"
                    : "w-8 bg-gray-200 hover:bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
