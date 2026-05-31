"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef, startTransition } from "react";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" }, // ✅ Direct link, no dropdown
  {
    label: "Product",
    dropdown: [
      { label: "Embedded Systems", href: "/product/features" },
      { label: "IOT & Robotics", href: "/product/pricing" },
      { label: "UAV", href: "/product/changelog" },
      { label: "Educational Kits", href: "/product/educational-kits" },
    ],
  },
  {
    label: "Engineering",
    dropdown: [
      { label: "Embedded Hardware Development", href: "/engineering/blog" },
      { label: "Embedded Software Development", href: "/engineering/oss" },
      { label: "3D & Mechanical Development", href: "/engineering/docs" },
    ],
  },
  { label: "Projects", href: "/projects" },
];

// ✅ Updated search data
const SEARCHABLE_ITEMS = [
  { title: "Home", href: "/", category: "Page" },
  { title: "About Us", href: "/about", category: "Page" },
  { title: "Features", href: "/product/features", category: "Product" },
  { title: "Pricing", href: "/product/pricing", category: "Product" },
  { title: "Changelog", href: "/product/changelog", category: "Product" },
  { title: "Blog", href: "/engineering/blog", category: "Engineering" },
  { title: "Open Source", href: "/engineering/oss", category: "Engineering" },
  { title: "API Docs", href: "/engineering/docs", category: "Engineering" },
  { title: "Projects", href: "/projects", category: "Page" },
  { title: "Contact Us", href: "/contact", category: "Page" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const pathname = usePathname();
  const searchInputRef = useRef<HTMLInputElement>(null);

  // ✅ Scroll shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Close menus on route change
  useEffect(() => {
    startTransition(() => {
      setMobileOpen(false);
      setActiveDropdown(null);
      setSearchOpen(false);
      setSearchQuery("");
    });
  }, [pathname]);

  // ✅ ⌘K / Ctrl+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setSearchQuery("");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // ✅ Focus input when modal opens
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
      startTransition(() => setSelectedIndex(0));
    }
  }, [searchOpen]);

  // ✅ Filter results
  const filteredResults = SEARCHABLE_ITEMS.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // ✅ Group results
  const groupedResults = filteredResults.reduce(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, typeof SEARCHABLE_ITEMS>,
  );

  // ✅ Arrow key navigation
  useEffect(() => {
    if (!searchOpen) return;

    const handleNav = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredResults.length - 1 ? prev + 1 : 0,
        );
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredResults.length - 1,
        );
      }
      if (e.key === "Enter" && filteredResults[selectedIndex]) {
        window.location.href = filteredResults[selectedIndex].href;
        setSearchOpen(false);
        setSearchQuery("");
      }
    };

    window.addEventListener("keydown", handleNav);
    return () => window.removeEventListener("keydown", handleNav);
  }, [searchOpen, selectedIndex, filteredResults]);

  useEffect(() => {
    startTransition(() => setSelectedIndex(0));
  }, [searchQuery]);

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
          {/* LOGO */}
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

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-8 text-[15px] font-medium text-gray-700">
            {NAV_ITEMS.map((item) =>
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

          {/* RIGHT SECTION — Search + Get In Touch */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700 transition group"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
              <span className="text-sm">Search...</span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 ml-2 px-1.5 py-0.5 text-[11px] font-medium text-gray-400 bg-gray-100 rounded border border-gray-200 group-hover:border-gray-300">
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

          {/* MOBILE MENU BUTTON */}
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

        {/* MOBILE MENU */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            mobileOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="px-6 pb-6 space-y-1 text-gray-700 text-[15px] font-medium border-t border-gray-100">
            {NAV_ITEMS.map((item) =>
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

            {/* MOBILE BOTTOM */}
            <div className="flex items-center gap-3 pt-4 border-t border-gray-200 mt-2">
              <button
                onClick={() => {
                  setMobileOpen(false);
                  setSearchOpen(true);
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

      {/* SEARCH MODAL (⌘K) */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]"
          onClick={() => {
            setSearchOpen(false);
            setSearchQuery("");
          }}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

          <div
            className="relative w-full max-w-lg mx-4 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200">
              <Search className="w-5 h-5 text-gray-400 shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search pages, docs, features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 text-[15px] text-gray-800 placeholder:text-gray-400 outline-none bg-transparent"
              />
              <kbd
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery("");
                }}
                className="px-2 py-0.5 text-[11px] font-medium text-gray-400 bg-gray-100 rounded border border-gray-200 cursor-pointer hover:bg-gray-200 transition"
              >
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-[320px] overflow-y-auto">
              {searchQuery === "" ? (
                <div className="px-4 py-8 text-center text-sm text-gray-400">
                  Start typing to search...
                </div>
              ) : filteredResults.length === 0 ? (
                <div className="px-4 py-8 text-center">
                  <p className="text-sm text-gray-400">
                    No results for &quot;{searchQuery}&quot;
                  </p>
                  <p className="text-xs text-gray-300 mt-1">
                    Try a different search term
                  </p>
                </div>
              ) : (
                <div className="py-2">
                  {Object.entries(groupedResults).map(([category, items]) => (
                    <div key={category}>
                      <div className="px-4 py-1.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                        {category}
                      </div>
                      {items.map((item) => {
                        const globalIndex = filteredResults.indexOf(item);
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => {
                              setSearchOpen(false);
                              setSearchQuery("");
                            }}
                            className={`flex items-center gap-3 px-4 py-2.5 text-sm transition ${
                              selectedIndex === globalIndex
                                ? "bg-[#0f1e2e] text-white"
                                : "text-gray-700 hover:bg-gray-50"
                            }`}
                            onMouseEnter={() => setSelectedIndex(globalIndex)}
                          >
                            <Search
                              className={`w-4 h-4 shrink-0 ${
                                selectedIndex === globalIndex
                                  ? "text-gray-300"
                                  : "text-gray-400"
                              }`}
                            />
                            <span>{item.title}</span>
                            {selectedIndex === globalIndex && (
                              <span className="ml-auto text-[11px] text-gray-300">
                                ↵ Enter
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-2 border-t border-gray-100 bg-gray-50 text-[11px] text-gray-400">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 bg-white border border-gray-200 rounded text-[10px]">
                    ↑
                  </kbd>
                  <kbd className="px-1 py-0.5 bg-white border border-gray-200 rounded text-[10px]">
                    ↓
                  </kbd>
                  Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 bg-white border border-gray-200 rounded text-[10px]">
                    ↵
                  </kbd>
                  Open
                </span>
              </div>
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 bg-white border border-gray-200 rounded text-[10px]">
                  esc
                </kbd>
                Close
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
