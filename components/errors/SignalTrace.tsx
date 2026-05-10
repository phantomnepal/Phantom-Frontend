"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface SignalTraceProps {
  d: string;
  delay?: number;
  duration?: number;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
}

export function SignalTrace({
  d,
  delay = 0,
  duration = 1.5,
  className = "",
  variant = "secondary",
}: SignalTraceProps) {
  const prefersReducedMotion = useReducedMotion();

  const colors = {
    primary: "#A10F1A",
    secondary: "#E8E8E8",
    ghost: "rgba(161, 15, 26, 0.15)",
  };

  if (prefersReducedMotion) {
    return (
      <path
        d={d}
        stroke={colors[variant]}
        strokeWidth="1"
        fill="none"
        className={className}
      />
    );
  }

  return (
    <motion.path
      d={d}
      stroke={colors[variant]}
      strokeWidth="1"
      fill="none"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{
        pathLength: { duration, delay, ease: "linear" },
        opacity: { duration: 0.3, delay },
      }}
      className={className}
    />
  );
}
