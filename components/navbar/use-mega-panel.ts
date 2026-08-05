"use client";

import { useState, useRef, useEffect, useCallback } from "react";

/**
 * Open/close state for the desktop mega menu.
 *
 * Pointer users open it by hovering. Keyboard users open it by focusing the
 * trigger — without that the panel was pointer-only, so tabbing through the
 * header never revealed the product or engineering links at all. Escape closes
 * it, as it does for any transient overlay.
 */
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

  const close = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveLabel(null);
  }, []);

  useEffect(() => {
    if (!activeLabel) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [activeLabel, close]);

  const open = useCallback(
    (label: string) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setActiveLabel(label);
    },
    [],
  );

  return {
    activeLabel,
    setActiveLabel,
    close,
    getTriggerHandlers: (label: string) => ({
      onMouseEnter: () => open(label),
      onMouseLeave: scheduleClear,
      // React's onFocus/onBlur map to focusin/focusout, so these fire for the
      // link inside the wrapper and for anything focused within the panel.
      onFocus: () => open(label),
      onBlur: scheduleClear,
    }),
    getPanelHandlers: () => ({
      onMouseEnter: cancelClear,
      onMouseLeave: scheduleClear,
      onFocus: cancelClear,
      onBlur: scheduleClear,
    }),
  };
}
