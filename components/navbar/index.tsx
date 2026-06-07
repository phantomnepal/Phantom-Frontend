"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, startTransition } from "react";
import { Menu, X, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import { useCommandSearch } from "./use-command-search";
import { useMegaPanel } from "./use-mega-panel";
import { SearchModal } from "./search-modal";
import { MegaMenuContent } from "./mega-menu";
import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile-nav";
import { getSiteContent } from "@/data/content";

export default function Navbar() {
  const content = getSiteContent();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const {
    activeLabel: activeMegaLabel,
    setActiveLabel: setActiveMegaLabel,
    getTriggerHandlers,
    getPanelHandlers,
  } = useMegaPanel(150);

  const currentMegaMenu =
    activeMegaLabel
      ? content.navItems.find((i) => i.label === activeMegaLabel)?.megaMenu ??
        null
      : null;

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
      setActiveMegaLabel(null);
    });
  }, [pathname, setActiveMegaLabel]);

  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  const toggleMegaMobile = (label: string) => {
    setActiveMegaLabel((prev) => (prev === label ? null : label));
    setActiveDropdown(null);
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

          <DesktopNav
            navItems={content.navItems}
            pathname={pathname}
            activeMegaLabel={activeMegaLabel}
            activeDropdown={activeDropdown}
            onSetActiveDropdown={setActiveDropdown}
            getTriggerHandlers={getTriggerHandlers}
          />

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

        {activeMegaLabel && (
          <div
            className="hidden lg:flex absolute left-0 right-0 z-50 justify-center"
            {...getPanelHandlers()}
          >
            <div className="w-full max-w-5xl">
              <AnimatePresence mode="popLayout">
                {currentMegaMenu && (
                  <motion.div
                    key={activeMegaLabel}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                  >
                    <MegaMenuContent menu={currentMegaMenu} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            mobileOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <MobileNav
            navItems={content.navItems}
            pathname={pathname}
            activeMegaLabel={activeMegaLabel}
            activeDropdown={activeDropdown}
            onToggleMega={toggleMegaMobile}
            onToggleDropdown={toggleDropdown}
            onSearch={openSearch}
            onMobileClose={() => setMobileOpen(false)}
          />
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
