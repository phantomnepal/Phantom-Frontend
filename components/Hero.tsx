"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getSiteContent } from "@/data/content";

export default function Hero() {
  const content = getSiteContent();
  const images = content.heroImages.map((img) => img.src);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="relative w-full min-h-[65vh] flex items-start overflow-hidden bg-white">
      {/* Background Image Overlay Animation */}
      <div className="absolute  inset-0 z-0">
        <AnimatePresence>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.2, ease: "easeInOut" },
              scale: { duration: 8, ease: "linear" },
            }}
            className="absolute inset-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[currentIndex]}
              alt="Hero background"
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Gradient - adjusted to fade earlier so hardware shows on right */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />

      {/* Content - aligned to top with padding instead of centered */}
      <div className="flex items-start max-w-7xl mx-auto w-full px-6 relative z-20 pt-8 sm:pt-12 pb-16">
        <div className="max-w-[650px]">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-[#58595A] mb-4 font-medium tracking-wide"
          >
            Trusted by Aerospace, Robotics & Embedded systems
          </motion.p>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[40px] sm:text-[52px] lg:text-[60px] font-bold text-gray-900 leading-[1.1] tracking-[-0.02em] mb-5"
          >
            Creating Systems <br />
            with <span className="text-[#A10F1A]">Purpose.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-600 text-base leading-relaxed max-w-md mb-8"
          >
            Designing reliable Embedded Systems, IoT & Robotics & Avionics
            Platforms.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center gap-4"
          >
            <button className="bg-[#0f172a] text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-[#1e293b] transition-colors">
              Explore Products
            </button>

            <button className="border border-gray-300 bg-white/80 backdrop-blur-sm text-gray-700 px-6 py-3 rounded-md text-sm font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors">
              Engineering Solutions
            </button>
          </motion.div>
        </div>
      </div>

      {/* Progress Indicators - positioned at bottom */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-3 w-3 rounded-full transition-all duration-500 ${
              idx === currentIndex ? "w-8 bg-[#A10F1A]" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
