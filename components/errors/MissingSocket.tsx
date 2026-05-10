"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function MissingSocket() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="relative w-32 h-32 md:w-40 md:h-40 mx-auto"
      initial={prefersReducedMotion ? {} : { scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Simplified socket - no large 404 watermark since we have it above */}
      <div className=" inset-0 border-2 border-dashed border-[#D0D0D0] bg-[#F8F8F8] rounded-lg relative overflow-hidden">
        {/* Corner pads */}
        <div className="absolute top-1.5 left-1.5 w-2 h-2 rounded-full bg-[#E8E8E8]" />
        <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#E8E8E8]" />
        <div className="absolute bottom-1.5 left-1.5 w-2 h-2 rounded-full bg-[#E8E8E8]" />
        <div className="absolute bottom-1.5 right-1.5 w-2 h-2 rounded-full bg-[#A10F1A]" />

        {/* Icon representation instead of text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={prefersReducedMotion ? {} : { x: 0 }}
            animate={{ x: [0, -1, 1, -1, 1, 0] }}
            transition={{
              delay: 0.8,
              duration: 0.4,
              times: [0, 0.2, 0.4, 0.6, 0.8, 1],
            }}
            className="text-center"
          >
            <div className="w-12 h-12 mx-auto mb-2 relative">
              {/* Broken connection icon */}
              <svg viewBox="0 0 24 24" className="w-full h-full text-[#A10F1A]">
                <path
                  fill="currentColor"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"
                />
                <line
                  x1="4"
                  y1="4"
                  x2="8"
                  y2="8"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <line
                  x1="16"
                  y1="16"
                  x2="20"
                  y2="20"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <p className="text-[#A10F1A] font-mono text-[10px] tracking-wider font-bold">
              OPEN_CIRCUIT
            </p>
          </motion.div>
        </div>

        {/* Broken traces */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <line
            x1="0"
            y1="50%"
            x2="30%"
            y2="50%"
            stroke="#E8E8E8"
            strokeWidth="1"
            strokeDasharray="3 2"
          />
          <line
            x1="70%"
            y1="50%"
            x2="100%"
            y2="50%"
            stroke="#E8E8E8"
            strokeWidth="1"
            strokeDasharray="3 2"
          />
        </svg>
      </div>

      {/* Label */}
      <div className="absolute -bottom-5 left-0 right-0 text-center">
        <span className="text-[9px] font-mono text-gray-400">SOCKET_404</span>
      </div>
    </motion.div>
  );
}
