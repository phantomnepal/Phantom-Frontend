"use client";

import Link from "next/link";
import { NavItemTrigger } from "./nav-item-trigger";
import type { NavItem } from "@/data/types";

interface DesktopNavProps {
  navItems: NavItem[];
  pathname: string;
  activeMegaLabel: string | null;
  activeDropdown: string | null;
  onSetActiveDropdown: (label: string | null) => void;
  getTriggerHandlers: (label: string) => {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  };
}

export function DesktopNav({
  navItems,
  pathname,
  activeMegaLabel,
  activeDropdown,
  onSetActiveDropdown,
  getTriggerHandlers,
}: DesktopNavProps) {
  return (
    <nav className="hidden lg:flex items-center gap-8 text-[15px] font-medium text-gray-700">
      {navItems.map((item) =>
        item.megaMenu ? (
          <div
            key={item.label}
            {...getTriggerHandlers(item.label)}
          >
            <NavItemTrigger
              item={item}
              variant="desktop"
              pathname={pathname}
              isExpanded={activeMegaLabel === item.label}
            />
          </div>
        ) : item.dropdown ? (
          <div
            key={item.label}
            className="relative"
            onMouseEnter={() => onSetActiveDropdown(item.label)}
            onMouseLeave={() => onSetActiveDropdown(null)}
          >
            <NavItemTrigger
              item={item}
              variant="desktop"
              pathname={pathname}
              isExpanded={activeDropdown === item.label}
            />

            <div
              className={`absolute top-full left-0 mt-3 w-52 bg-white shadow-xl rounded-lg border border-gray-100 transition-all duration-200 origin-top ${
                activeDropdown === item.label
                  ? "opacity-100 scale-100 visible"
                  : "opacity-0 scale-95 invisible"
              }`}
            >
              <ul className="py-2 text-sm text-gray-600">
                {item.dropdown.map((child, index) => (
                  <li key={index}>
                    <Link
                      href={child.href}
                      className={`block px-4 py-2.5 hover:bg-gray-50 hover:text-black transition ${
                        pathname === child.href
                          ? "text-black font-medium bg-gray-50"
                          : ""
                      }`}
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <NavItemTrigger
            key={item.label}
            item={item}
            variant="desktop"
            pathname={pathname}
            isExpanded={false}
          />
        ),
      )}
    </nav>
  );
}
