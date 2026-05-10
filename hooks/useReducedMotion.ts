"use client";

import { useEffect, useState, startTransition } from "react";

export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    startTransition(() => {
      setMounted(true);
      setPrefersReducedMotion(mediaQuery.matches);
    });

    const handler = (event: MediaQueryListEvent) => {
      startTransition(() => setPrefersReducedMotion(event.matches));
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Return false during SSR, true value only after mount
  return mounted ? prefersReducedMotion : false;
}
