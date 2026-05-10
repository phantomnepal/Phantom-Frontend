"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function PhantomLogo() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative w-20 h-20 md:w-24 md:h-24">
      {/* Circuit Lines - Contained within bounds */}
      <svg
        className="absolute inset-0 w-full h-full overflow-visible"
        viewBox="0 0 128 128"
      >
        {/* Top trace - short */}
        <motion.path
          d="M 64 0 L 64 -30"
          stroke="rgba(161, 15, 26, 0.3)"
          strokeWidth="1.5"
          fill="none"
          initial={prefersReducedMotion ? {} : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "linear" }}
        />

        {/* Bottom trace - shortened to not clash with text */}
        <motion.path
          d="M 64 128 L 64 140"
          stroke="rgba(161, 15, 26, 0.3)"
          strokeWidth="1.5"
          fill="none"
          initial={prefersReducedMotion ? {} : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "linear" }}
        />

        {/* Top node */}
        <motion.circle
          cx="64"
          cy="-30"
          r="2"
          fill="#A10F1A"
          initial={prefersReducedMotion ? {} : { scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.2, duration: 0.2 }}
        />
      </svg>

      {/* Logo Container */}
      <motion.div
        className="w-full h-full relative flex items-center justify-center"
        initial={prefersReducedMotion ? {} : { scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="w-full h-full relative drop-shadow-md shadow-gray-200/50">
          <Image
            src="/logo.svg"
            alt="PHANTOM Systems Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </motion.div>

      {/* Label - Moved inside with padding to avoid trace clash */}
      <motion.div
        className="absolute -bottom-8 left-0 right-0 text-center"
        initial={prefersReducedMotion ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <span className="text-[9px] font-mono text-gray-400 tracking-[0.2em] bg-white px-2">
          PHANTOM
        </span>
      </motion.div>
    </div>
  );
}
