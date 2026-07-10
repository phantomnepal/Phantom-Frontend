"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import type { NavItem } from "@/data/types";

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
    ? item.megaMenu.columns.some((column) =>
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

  return (
    <button
      className={`${
        variant === "desktop"
          ? "flex items-center gap-1 transition hover:text-black"
          : "flex justify-between w-full items-center py-2 hover:text-black transition"
      } ${
        isActive && variant === "desktop"
          ? `text-black${matchesPath ? " font-semibold" : ""}`
          : ""
      }`}
      onClick={variant === "mobile" ? onTrigger : undefined}
      {...handlers}
    >
      {item.label}
      <ChevronDown
        className={`w-4 h-4 transition-transform duration-200 ${
          isExpanded ? "rotate-180" : ""
        }`}
      />
    </button>
  );
}
