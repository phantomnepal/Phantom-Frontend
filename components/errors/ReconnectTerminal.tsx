"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ReconnectTerminal() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="relative inline-block"
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link
        href="/"
        className="group relative inline-flex items-center gap-3 px-5 py-3 bg-[#A10F1A] text-white font-mono text-sm tracking-wider rounded-sm overflow-hidden transition-all duration-300 ease-out hover:shadow-lg hover:shadow-[#A10F1A]/20 focus:outline-none focus:ring-2 focus:ring-[#A10F1A] focus:ring-offset-2 focus:ring-offset-white"
      >
        {/* Static Fill Background */}
        <span className="absolute inset-0 bg-[#8A0D16] transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0" />

        {/* Button Content - Fixed width container */}
        <span className="relative z-10 flex items-center gap-2">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse flex-shrink-0" />

          {/* Text container with grid to prevent width change */}
          <span className="grid place-items-center min-w-[160px]">
            <span className="[grid-area:1/1] transition-opacity duration-300 group-hover:opacity-0 whitespace-nowrap">
              RETURN_TO_MAINFRAME
            </span>
            <span className="[grid-area:1/1] opacity-0 transition-opacity duration-300 group-hover:opacity-100 whitespace-nowrap">
              &gt; INITIATING...
            </span>
          </span>
        </span>

        {/* Corner accents */}
        <span className="absolute top-1 left-1 w-1 h-1 bg-white/30 transition-opacity duration-300 group-hover:opacity-100 opacity-70" />
        <span className="absolute top-1 right-1 w-1 h-1 bg-white/30 transition-opacity duration-300 group-hover:opacity-100 opacity-70" />
        <span className="absolute bottom-1 left-1 w-1 h-1 bg-white/30 transition-opacity duration-300 group-hover:opacity-100 opacity-70" />
        <span className="absolute bottom-1 right-1 w-1 h-1 bg-white/30 transition-opacity duration-300 group-hover:opacity-100 opacity-70" />
      </Link>

      {/* Status text beneath */}
      <div className="mt-3 text-center opacity-60 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-[10px] font-mono text-gray-400">
          NODE_ID: HOME_BASE | PROTOCOL: HTTPS
        </span>
      </div>
    </motion.div>
  );
}
