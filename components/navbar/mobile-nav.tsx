"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import type { NavItem } from "@/data/types";
import { CurrencyToggle } from "@/components/currency/currency-toggle";

/**
 * Mobile navigation sheet — a drill-in, not an accordion.
 *
 * ⚠ The accordion this replaces was unusable, and measurably so: expanded, its
 * content ran to 1917px inside a `max-h-[800px] overflow-hidden` wrapper, so
 * roughly 1100px of it — most of the 28 links — could not be reached by any
 * means. Nesting is the cause, not the clamp: Product alone carries 4 columns
 * of links with descriptions, and stacking that inside the root list makes a
 * wall of text you must scroll past to reach Projects.
 *
 * So each section replaces the view instead of expanding inside it, and the
 * sheet is a fixed-height flex column: the list scrolls, the actions below it
 * do not. Pattern follows the Flowcove header.
 */

/** A section that can be drilled into: mega menu columns, or a flat dropdown. */
type Section = {
  label: string;
  href?: string;
  columns: { title: string | null; items: NavItemLink[] }[];
};

type NavItemLink = { label: string; href: string; description?: string };

function toSection(item: NavItem): Section | null {
  if (item.megaMenu) {
    return {
      label: item.label,
      href: item.href,
      columns: item.megaMenu.columns.map((column) => ({
        title: column.title,
        items: column.items,
      })),
    };
  }
  if (item.dropdown) {
    return {
      label: item.label,
      href: item.href,
      columns: [{ title: null, items: item.dropdown }],
    };
  }
  return null;
}

interface MobileNavProps {
  /** Drives focus handling and the reset back to the root list on close. */
  open: boolean;
  navItems: NavItem[];
  pathname: string;
  onSearch: () => void;
  onClose: () => void;
}

export function MobileNav({
  open,
  navItems,
  pathname,
  onSearch,
  onClose,
}: MobileNavProps) {
  // `null` is the root list; otherwise the label of the section drilled into.
  const [view, setView] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLButtonElement>(null);
  const rowRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  // Drilling in and going back swap the whole view, so the button that had
  // focus unmounts. Without placing focus by hand it falls to <body>.
  const pendingFocus = useRef<"back" | string | null>(null);

  // Reopening into a sub-list drilled into two visits ago is disorienting.
  useEffect(() => {
    if (!open) setView(null);
  }, [open]);

  useEffect(() => {
    const target = pendingFocus.current;
    pendingFocus.current = null;
    if (target === "back") backRef.current?.focus();
    else if (target) rowRefs.current[target]?.focus();
    // A drilled-in list starts at its own top, not where the root was left.
    scrollRef.current?.scrollTo({ top: 0 });
  }, [view]);

  const sections = navItems.map(toSection);
  const activeSection = sections.find((s) => s && s.label === view) ?? null;

  return (
    <div className="flex h-full flex-col">
      {/* The LIST scrolls. `min-h-0` is what lets it shrink below its content
          inside the flex column — without it the column refuses to compress and
          the last links overflow the sheet instead of scrolling inside it.
          `overscroll-contain` stops the scroll chaining to the page. */}
      <div
        ref={scrollRef}
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-2"
      >
        {activeSection ? (
          <div
            key={activeSection.label}
            className="animate-in fade-in slide-in-from-right-3 duration-200"
          >
            <button
              ref={backRef}
              type="button"
              onClick={() => {
                pendingFocus.current = activeSection.label;
                setView(null);
              }}
              className="-ml-2 flex min-h-11 items-center gap-1 rounded-md px-2 text-[15px] font-medium text-gray-900 transition hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A10F1A]"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              Back
            </button>

            {activeSection.href && (
              <Link
                href={activeSection.href}
                onClick={onClose}
                className="flex min-h-12 items-center border-b border-gray-200 text-[15px] font-semibold text-[#A10F1A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A10F1A]"
              >
                All {activeSection.label}
              </Link>
            )}

            {activeSection.columns.map((column) => (
              <div key={column.title ?? "items"} className="mt-4">
                {column.title && (
                  <h2 className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                    {column.title}
                  </h2>
                )}
                <ul className="flex flex-col">
                  {column.items.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        onClick={onClose}
                        aria-current={
                          pathname === child.href ? "page" : undefined
                        }
                        className={`block min-h-12 border-b border-gray-100 py-3 transition hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#A10F1A] ${
                          pathname === child.href
                            ? "text-black"
                            : "text-gray-700"
                        }`}
                      >
                        <span className="block text-[15px] font-medium leading-5">
                          {child.label}
                        </span>
                        {child.description && (
                          <span className="mt-0.5 block text-[13px] leading-[18px] text-gray-500">
                            {child.description}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <ul
            key="root"
            className="flex flex-col animate-in fade-in slide-in-from-left-3 duration-200"
          >
            {navItems.map((item, index) => {
              const section = sections[index];
              if (!section) {
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href!}
                      onClick={onClose}
                      aria-current={pathname === item.href ? "page" : undefined}
                      className={`flex min-h-12 items-center border-b border-gray-200 text-[15px] font-medium transition hover:text-black focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#A10F1A] ${
                        pathname === item.href
                          ? "font-semibold text-black"
                          : "text-gray-700"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              }
              return (
                <li key={item.label}>
                  {/* ⚠ No `aria-expanded` here. It would be a lie: this does not
                      expand a region in place, it replaces the view — nothing
                      stays on screen to be "expanded". The chevron is
                      decorative and the label carries the meaning. */}
                  <button
                    ref={(el) => {
                      rowRefs.current[item.label] = el;
                    }}
                    type="button"
                    onClick={() => {
                      pendingFocus.current = "back";
                      setView(item.label);
                    }}
                    className="flex min-h-12 w-full items-center justify-between border-b border-gray-200 text-left text-[15px] font-medium text-gray-700 transition hover:text-black focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#A10F1A]"
                  >
                    {item.label}
                    <ChevronRight
                      className="h-4 w-4 text-gray-400"
                      aria-hidden="true"
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* ⚠ Outside the scroller on purpose. Inside it, on a short viewport,
          both actions sat below the fold of a scroll area with nothing saying
          so. `shrink-0` pins them: the links scroll, search and contact never
          move. */}
      <div className="flex shrink-0 flex-col gap-2 border-t border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Currency</span>
          <CurrencyToggle size="lg" className="w-40" />
        </div>
        <button
          type="button"
          onClick={() => {
            onClose();
            onSearch();
          }}
          className="flex min-h-11 items-center justify-center gap-2 rounded-md border border-gray-200 text-sm text-gray-500 transition hover:border-gray-300 hover:text-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A10F1A]"
        >
          <Search className="h-4 w-4" aria-hidden="true" />
          Search...
        </button>
        <Link
          href="/contact"
          onClick={onClose}
          className="flex min-h-11 items-center justify-center rounded-md bg-[#A10F1A] text-sm font-semibold text-white transition hover:bg-[#8a0d16] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A10F1A]"
        >
          Get In Touch
        </Link>
      </div>
    </div>
  );
}
