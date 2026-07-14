"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { NavItemTrigger } from "./nav-item-trigger";
import { getSiteContent } from "@/data/content";
import type { NavItem } from "@/data/types";

interface MobileNavProps {
  navItems: NavItem[];
  pathname: string;
  activeMegaLabel: string | null;
  activeDropdown: string | null;
  onToggleMega: (label: string) => void;
  onToggleDropdown: (label: string) => void;
  onSearch: () => void;
  onMobileClose: () => void;
}

export function MobileNav({
  navItems,
  pathname,
  activeMegaLabel,
  activeDropdown,
  onToggleMega,
  onToggleDropdown,
  onSearch,
  onMobileClose,
}: MobileNavProps) {
  return (
    <nav className="px-6 pb-6 space-y-1 text-gray-700 text-[15px] font-medium border-t border-gray-100">
      {navItems.map((item) =>
        item.megaMenu ? (
          <div key={item.label} className="py-1">
            <NavItemTrigger
              item={item}
              variant="mobile"
              pathname={pathname}
              isExpanded={activeMegaLabel === item.label}
              onTrigger={() => onToggleMega(item.label)}
            />

            <div
              className={`overflow-hidden transition-all duration-200 ${
                activeMegaLabel === item.label ? "max-h-[600px]" : "max-h-0"
              }`}
            >
              <div className="pl-4 pb-2 space-y-4 border-l-2 border-gray-100 ml-1 mt-2">
                {item.megaMenu.columns.map((column) => (
                  <div key={column.title}>
                    <h4 className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      {column.title}
                    </h4>
                    <div className="space-y-1">
                      {column.items.map((child, index) => (
                        <Link
                          key={index}
                          href={child.href}
                          className={`block py-1.5 text-sm hover:text-black transition ${
                            pathname === child.href
                              ? "text-black font-medium"
                              : "text-gray-500"
                          }`}
                        >
                          {child.label}
                          {child.description && (
                            <p className="text-xs text-gray-500 mt-0.5">
                              {child.description}
                            </p>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : item.dropdown ? (
          <div key={item.label} className="py-1">
            <NavItemTrigger
              item={item}
              variant="mobile"
              pathname={pathname}
              isExpanded={activeDropdown === item.label}
              onTrigger={() => onToggleDropdown(item.label)}
            />

            <div
              className={`overflow-hidden transition-all duration-200 ${
                activeDropdown === item.label ? "max-h-48" : "max-h-0"
              }`}
            >
              <div className="pl-4 pb-2 space-y-1 border-l-2 border-gray-100 ml-1">
                {item.dropdown.map((child, index) => (
                  <Link
                    key={index}
                    href={child.href}
                    className={`block py-1.5 text-sm hover:text-black transition ${
                      pathname === child.href
                        ? "text-black font-medium"
                        : "text-gray-500"
                    }`}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <NavItemTrigger
            key={item.label}
            item={item}
            variant="mobile"
            pathname={pathname}
            isExpanded={false}
          />
        ),
      )}

      <div className="flex items-center gap-3 pt-4 border-t border-gray-200 mt-2">
        <button
          onClick={() => {
            onMobileClose();
            onSearch();
          }}
          className="flex items-center gap-2 px-3 py-2 rounded-md border border-gray-200 text-gray-500"
          aria-label="Search"
        >
          <Search className="w-4 h-4" />
        </button>
        <a
          href={getSiteContent().storeUrl}
          className="border border-[#0f1e2e] text-[#0f1e2e] px-4 py-2.5 rounded-md flex-1 text-center text-sm hover:bg-gray-50 transition"
        >
          Go to Store
        </a>
        <Link
          href="/contact"
          className="bg-[#0f1e2e] text-white px-4 py-2.5 rounded-md flex-1 text-center text-sm hover:bg-[#1a3147] transition"
        >
          Get In Touch
        </Link>
      </div>
    </nav>
  );
}
