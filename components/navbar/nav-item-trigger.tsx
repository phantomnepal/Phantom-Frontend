"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import type { NavItem } from "@/data/types";

/** Shared between the trigger's aria-controls and the panel's id. */
export const MEGA_PANEL_ID = "mega-menu-panel";

interface NavItemTriggerProps {
  item: NavItem;
  variant: "desktop" | "mobile";
  pathname: string;
  isExpanded: boolean;
  onTrigger?: () => void;
  desktopHandlers?: {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  };
}

export function NavItemTrigger({
  item,
  variant,
  pathname,
  isExpanded,
  onTrigger,
  desktopHandlers,
}: NavItemTriggerProps) {
  if (!item.megaMenu && !item.dropdown) {
    return (
      <Link
        href={item.href!}
        className={`${
          variant === "desktop" ? "" : "block py-2"
        } hover:text-black transition ${
          pathname === item.href ? "text-black font-semibold" : ""
        }`}
      >
        {item.label}
      </Link>
    );
  }

  const matchesPath = item.megaMenu
    ? pathname === item.href ||
      item.megaMenu.columns.some((column) =>
        column.items.some((menuItem) => menuItem.href === pathname),
      )
    : item.dropdown?.some((d) => d.href === pathname);

  const isActive = item.megaMenu ? isExpanded || matchesPath : matchesPath;

  const handlers =
    variant === "desktop" && desktopHandlers
      ? {
          onMouseEnter: desktopHandlers.onMouseEnter,
          onMouseLeave: desktopHandlers.onMouseLeave,
        }
      : {};

  const className = `${
    variant === "desktop"
      ? "flex items-center gap-1 transition hover:text-black"
      : "flex justify-between w-full items-center py-2 hover:text-black transition"
  } ${
    isActive && variant === "desktop"
      ? `text-black${matchesPath ? " font-semibold" : ""}`
      : ""
  }`;

  const label = (
    <>
      {item.label}
      <ChevronDown
        className={`w-4 h-4 transition-transform duration-200 ${
          isExpanded ? "rotate-180" : ""
        }`}
      />
    </>
  );

  /**
   * On desktop the label doubles as a link to the section landing page while
   * hover still opens the panel — the panel is the only thing the pointer
   * drives, so nothing about the hover behaviour changes.
   *
   * Mobile stays a button: there is no hover there, so the tap has to be what
   * expands the submenu.
   */
  // The panel's open state belongs on whichever control reveals it, so screen
  // readers announce "collapsed"/"expanded" rather than leaving the panel's
  // appearance a purely visual event.
  const expandedProps = item.megaMenu
    ? { "aria-expanded": isExpanded, "aria-controls": MEGA_PANEL_ID }
    : {};

  if (variant === "desktop" && item.href) {
    return (
      <Link
        href={item.href}
        className={className}
        {...expandedProps}
        {...handlers}
      >
        {label}
      </Link>
    );
  }

  return (
    <button
      className={className}
      onClick={variant === "mobile" ? onTrigger : undefined}
      {...expandedProps}
      {...handlers}
    >
      {label}
    </button>
  );
}
