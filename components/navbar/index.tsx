"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, startTransition } from "react";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

import { useCommandSearch } from "./use-command-search";
import { SearchModal } from "./search-modal";
import { getSiteContent } from "@/data/content";

export default function Navbar() {
  const content = getSiteContent();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const {
    searchOpen,
    searchQuery,
    selectedIndex,
    filteredResults,
    groupedResults,
    setSearchQuery,
    setSelectedIndex,
    openSearch,
    closeSearch,
  } = useCommandSearch(content.searchableItems);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    startTransition(() => {
      setMobileOpen(false);
      setActiveDropdown(null);
    });
  }, [pathname]);

  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  return (
    <>
      <header
        className={`w-full bg-white sticky top-0 z-50 transition-shadow duration-300 ${
          scrolled ? "shadow-md" : "border-b border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.svg"
              alt="Phantom Logo"
              width={42}
              height={42}
              className="object-contain w-auto"
              priority
            />
            <span className="text-[18px] font-semibold tracking-wide text-gray-800">
              PHANTOM
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8 text-[15px] font-medium text-gray-700">
            {content.navItems.map((item) =>
              item.dropdown ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className={`flex items-center gap-1 transition hover:text-black ${
                      item.dropdown.some((d) => d.href === pathname)
                        ? "text-black font-semibold"
                        : ""
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        activeDropdown === item.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`absolute top-full left-0 mt-3 w-52 bg-white shadow-xl rounded-lg border border-gray-100 transition-all duration-200 origin-top ${
                      activeDropdown === item.label
                        ? "opacity-100 scale-100 visible"
                        : "opacity-0 scale-95 invisible"
                    }`}
                  >
                    <ul className="py-2 text-sm text-gray-600">
                      {item.dropdown.map((child) => (
                        <li key={child.href}>
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
                <Link
                  key={item.label}
                  href={item.href!}
                  className={`hover:text-black transition ${
                    pathname === item.href ? "text-black font-semibold" : ""
                  }`}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={openSearch}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700 transition group"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
              <span className="text-sm">Search...</span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 ml-2 px-1.5 py-0.5 text-[11px] font-medium text-gray-500 bg-gray-100 rounded border border-gray-200 group-hover:border-gray-300">
                ⌘K
              </kbd>
            </button>

            <Link
              href="/contact"
              className="bg-[#0f1e2e] text-white text-[14px] px-5 py-2.5 rounded-md hover:bg-[#1a3147] transition"
            >
              Get In Touch
            </Link>
          </div>

          <button
            className="lg:hidden p-1 rounded-md hover:bg-gray-100 transition"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            mobileOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="px-6 pb-6 space-y-1 text-gray-700 text-[15px] font-medium border-t border-gray-100">
            {content.navItems.map((item) =>
              item.dropdown ? (
                <div key={item.label} className="py-1">
                  <button
                    onClick={() => toggleDropdown(item.label)}
                    className="flex justify-between w-full items-center py-2 hover:text-black transition"
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        activeDropdown === item.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-200 ${
                      activeDropdown === item.label ? "max-h-48" : "max-h-0"
                    }`}
                  >
                    <div className="pl-4 pb-2 space-y-1 border-l-2 border-gray-100 ml-1">
                      {item.dropdown.map((child) => (
                        <Link
                          key={child.href}
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
                <Link
                  key={item.label}
                  href={item.href!}
                  className={`block py-2 hover:text-black transition ${
                    pathname === item.href ? "text-black font-semibold" : ""
                  }`}
                >
                  {item.label}
                </Link>
              ),
            )}

            <div className="flex items-center gap-3 pt-4 border-t border-gray-200 mt-2">
              <button
                onClick={() => {
                  setMobileOpen(false);
                  openSearch();
                }}
                className="flex items-center gap-2 px-3 py-2 rounded-md border border-gray-200 text-gray-500"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
              <Link
                href="/contact"
                className="bg-[#0f1e2e] text-white px-4 py-2.5 rounded-md flex-1 text-center text-sm hover:bg-[#1a3147] transition"
              >
                Get In Touch
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <SearchModal
        open={searchOpen}
        searchQuery={searchQuery}
        selectedIndex={selectedIndex}
        filteredResults={filteredResults}
        groupedResults={groupedResults}
        onQueryChange={setSearchQuery}
        onSelectIndex={setSelectedIndex}
        onClose={closeSearch}
      />
    </>
  );
}
