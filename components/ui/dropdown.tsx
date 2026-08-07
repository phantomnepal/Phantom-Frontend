"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";

const DropdownCloseContext = createContext<(returnFocus: boolean) => void>(
  () => {},
);

/** Dismiss the enclosing Dropdown — call after acting on an item. */
export function useDropdownClose() {
  return useContext(DropdownCloseContext);
}

/**
 * A small anchored popover menu.
 *
 * Shared by the currency switcher and the account menu so the keyboard and
 * focus behaviour is written once. It follows the ARIA menu button pattern:
 *
 * - the trigger carries `aria-haspopup="menu"`, `aria-expanded` and
 *   `aria-controls`
 * - Enter, Space and ArrowDown open it and focus the first item; ArrowUp opens
 *   it and focuses the last
 * - once open, ArrowUp/ArrowDown roam, Home/End jump, Escape closes
 * - closing for any reason returns focus to the trigger, except when focus has
 *   already moved somewhere else deliberately (a click outside, or Tab)
 *
 * Items are found by query rather than by registration so callers can write
 * ordinary JSX inside `children` — anything with `role="menuitem"`,
 * `menuitemradio` or `menuitemcheckbox` joins the ring.
 */
export function Dropdown({
  label,
  trigger,
  children,
  align = "right",
  side = "bottom",
  panelClassName = "",
  triggerClassName = "",
  menuLabel,
}: {
  /** Accessible name for the trigger. */
  label: string;
  /** Trigger contents. Receives the open state so it can rotate a chevron. */
  trigger: (open: boolean) => ReactNode;
  children: ReactNode;
  align?: "left" | "right";
  /**
   * Which way the panel opens. `top` is for triggers pinned to the bottom of
   * something — the mobile sheet's currency row would otherwise drop its panel
   * straight off the end of the sheet.
   */
  side?: "top" | "bottom";
  panelClassName?: string;
  triggerClassName?: string;
  /** Accessible name for the panel. Defaults to `label`. */
  menuLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  const items = useCallback(
    () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(
          '[role="menuitem"],[role="menuitemradio"],[role="menuitemcheckbox"]',
        ) ?? [],
      ).filter((el) => !el.hasAttribute("disabled")),
    [],
  );

  const close = useCallback((returnFocus: boolean) => {
    setOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  }, []);

  // Focus the requested end of the list once the panel has actually mounted.
  const pendingFocus = useRef<"first" | "last" | null>(null);
  useEffect(() => {
    if (!open || pendingFocus.current === null) return;
    const list = items();
    const target =
      pendingFocus.current === "first" ? list[0] : list[list.length - 1];
    pendingFocus.current = null;
    target?.focus();
  }, [open, items]);

  // A pointer press anywhere outside dismisses. `mousedown` rather than
  // `click`, so pressing a link outside does not first fire a click that the
  // now-unmounted panel was covering.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) close(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, [open, close]);

  const onTriggerKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      pendingFocus.current = event.key === "ArrowDown" ? "first" : "last";
      setOpen(true);
    }
  };

  const onPanelKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      close(true);
      return;
    }
    // Tab out is a deliberate exit; let it through and just dismiss, without
    // yanking focus back to the trigger.
    if (event.key === "Tab") {
      close(false);
      return;
    }
    const list = items();
    if (list.length === 0) return;
    const index = list.indexOf(document.activeElement as HTMLElement);

    if (event.key === "ArrowDown") {
      event.preventDefault();
      list[(index + 1) % list.length]?.focus();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      list[(index - 1 + list.length) % list.length]?.focus();
    } else if (event.key === "Home") {
      event.preventDefault();
      list[0]?.focus();
    } else if (event.key === "End") {
      event.preventDefault();
      list[list.length - 1]?.focus();
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onTriggerKeyDown}
        className={triggerClassName}
      >
        {trigger(open)}
      </button>

      {open && (
        <div
          ref={panelRef}
          id={panelId}
          role="menu"
          aria-label={menuLabel ?? label}
          onKeyDown={onPanelKeyDown}
          className={`absolute z-50 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl ${
            side === "top"
              ? "bottom-[calc(100%+8px)]"
              : "top-[calc(100%+8px)]"
          } ${align === "right" ? "right-0" : "left-0"} ${panelClassName}`}
        >
          {/* Callers close the menu after acting on an item. */}
          <DropdownCloseContext.Provider value={close}>
            {children}
          </DropdownCloseContext.Provider>
        </div>
      )}
    </div>
  );
}
