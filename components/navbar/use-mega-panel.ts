"use client";

import { useState, useRef, useEffect, useCallback } from "react";

export function useMegaPanel(delay = 150) {
  const [activeLabel, setActiveLabel] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const scheduleClear = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setActiveLabel(null), delay);
  }, [delay]);

  const cancelClear = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  return {
    activeLabel,
    setActiveLabel,
    getTriggerHandlers: (label: string) => ({
      onMouseEnter: () => {
        cancelClear();
        setActiveLabel(label);
      },
      onMouseLeave: scheduleClear,
    }),
    getPanelHandlers: () => ({
      onMouseEnter: cancelClear,
      onMouseLeave: scheduleClear,
    }),
  };
}
