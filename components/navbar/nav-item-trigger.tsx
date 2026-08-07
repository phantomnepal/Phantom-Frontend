"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import type { NavItem } from "@/data/types";

/** Shared between the trigger's aria-controls and the panel's id. */
export const MEGA_PANEL_ID = "mega-menu-panel";

/**
 * A top-level nav label on the desktop bar.
 *
 * Desktop only. The mobile branch this used to carry went away with the
 * accordion — the sheet in mobile-nav.tsx renders its own rows because a
 * drill-in row and a hover-plus-link trigger share nothing but their text.
 */
interface NavItemTriggerProps {
  item: NavItem;
  pathname: string;
  isExpanded: boolean;
}

export function NavItemTrigger({
  item,
  pathname,
  isExpanded,
}: NavItemTriggerProps) {
  if (!item.megaMenu && !item.dropdown) {
    return (
      <Link
        href={item.href!}
        className={`hover:text-black transition ${
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

  const className = `flex items-center gap-1 transition hover:text-black ${
    isActive ? `text-black${matchesPath ? " font-semibold" : ""}` : ""
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

  // The panel's open state belongs on whichever control reveals it, so screen
  // readers announce "collapsed"/"expanded" rather than leaving the panel's
  // appearance a purely visual event.
  const expandedProps = item.megaMenu
    ? { "aria-expanded": isExpanded, "aria-controls": MEGA_PANEL_ID }
    : {};

  /**
   * The label doubles as a link to the section landing page while hover opens
   * the panel — the panel is the only thing the pointer drives, so nothing
   * about the hover behaviour changes.
   */
  if (item.href) {
    return (
      <Link href={item.href} className={className} {...expandedProps}>
        {label}
      </Link>
    );
  }

  return (
    <button type="button" className={className} {...expandedProps}>
      {label}
    </button>
  );
}
