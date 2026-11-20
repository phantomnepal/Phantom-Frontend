"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef, startTransition } from "react";
import { Menu, X, Search, ShoppingCart } from "lucide-react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import { MEGA_PANEL_ID } from "./nav-item-trigger";
import { useCommandSearch } from "./use-command-search";
import { useMegaPanel } from "./use-mega-panel";
import { SearchModal } from "./search-modal";
import { MegaMenuContent } from "./mega-menu";
import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile-nav";
import { getSiteContent } from "@/data/content";
import { CurrencyToggle } from "@/components/currency/currency-toggle";
import { AccountMenu } from "./account-menu";

export default function Navbar() {
  const content = getSiteContent();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

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

  // Escape closes the mobile sheet, as it does the mega panel and search, and
  // puts focus back on the button that opened it.
  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMobileOpen(false);
      menuBtnRef.current?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  // The sheet covers the viewport, so the page behind it must not scroll.
  // `overscroll-contain` on the list stops the chaining; this stops a touch
  // that starts on the sheet's own padding from moving the page.
  //
  // ⚠ <html> as well as <body>. A body-only lock is ignored in several iOS
  // Safari cases.
  useEffect(() => {
    if (!mobileOpen) return;
    const root = document.documentElement;
    const previousBody = document.body.style.overflow;
    const previousRoot = root.style.overflow;
    document.body.style.overflow = "hidden";
    root.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousBody;
      root.style.overflow = previousRoot;
    };
  }, [mobileOpen]);

  // ⚠ Without this, widening past `lg` with the sheet open leaves the body
  // scroll-locked by a panel `lg:hidden` has just made invisible — the page
  // looks frozen with nothing on screen to explain it.
  useEffect(() => {
    if (!mobileOpen) return;
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (mq.matches) setMobileOpen(false);
    };
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [mobileOpen]);

  useEffect(() => {
    startTransition(() => {
      setMobileOpen(false);
      setActiveDropdown(null);
      setActiveMegaLabel(null);
    });
  }, [pathname, setActiveMegaLabel]);

  // ⚠ Solid while the sheet is open, not only while scrolled — and this is
  // load-bearing, not cosmetic. The sheet is `top-full`, and `top:100%`
  // resolves against the header's PADDING box, which excludes the 1px bottom
  // border. With the border on, the sheet starts at 71px and `100dvh - 72px`
  // pushes its last pixel past the bottom of the viewport. Dropping the border
  // whenever the sheet is open keeps the two numbers in step.
  const solid = scrolled || mobileOpen;

  return (
    <>
      <header
        className={`w-full bg-white fixed top-0 z-50 transition-shadow duration-300 ${
          solid ? "shadow-md" : "border-b border-gray-200"
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
            {/* Hidden below `sm` so Cart, Account and the menu button all keep
                44px targets on a 320px bar. The link is still named: the logo
                image carries the alt text. */}
            <span className="hidden sm:inline text-[18px] font-semibold tracking-wide text-gray-800">
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

            <CurrencyToggle />

            {/* Cart is still inert: main has no cart — that lives on
                ecommerce-phase1, pending store.phantom.com.np. Account is not:
                see AccountMenu, which offers only what actually works today. */}
            <button
              type="button"
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A10F1A]"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
            <AccountMenu />
          </div>

          {/* Account sits beside Cart here at the user's request. It was left
              out while it was an inert icon, because three 44px targets plus
              the logo lockup overflowed a 320px bar; the wordmark now hides
              below `sm` to pay for it, which is what makes all three fit. */}
          <div className="lg:hidden flex items-center gap-1">
            {/* Inert, unlike Account — main has no cart. */}
            <button
              type="button"
              className="flex size-11 shrink-0 items-center justify-center rounded-md text-gray-600 hover:bg-gray-100 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A10F1A]"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
            <AccountMenu className="flex size-11 shrink-0 items-center justify-center p-0" />
            {/* `shrink-0` is what keeps this a 44px target — the flex row
                squeezed it to 34px wide at 320px without it. */}
            <button
              ref={menuBtnRef}
              type="button"
              className="flex size-11 shrink-0 items-center justify-center rounded-md hover:bg-gray-100 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A10F1A]"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-panel"
            >
              {mobileOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {activeMegaLabel && (
          <div className="hidden lg:flex absolute left-0  right-0 z-50 justify-center pointer-events-none">
            {/* Hover handlers belong on the panel itself, not the full-width
                wrapper: the wrapper spans the viewport, so its onMouseLeave
                only fires far outside the visible menu. */}
            <div
              id={MEGA_PANEL_ID}
              className="w-full max-w-5xl pointer-events-auto"
              {...getPanelHandlers()}
            >
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

        {/* Full-height sheet, not a max-height drawer.
            ⚠ The clamp it replaces (`max-h-[800px] overflow-hidden`) was
            hiding ~1100px of a 1917px menu with no way to reach it.
            `h-`, not `max-h-`: a content-height sheet leaves the page showing
            through underneath with the actions floating mid-screen, and a
            fixed sheet keeps them pinned to the real bottom of the viewport at
            every level.
            `inert` also matters — `hidden` alone would be enough, but the two
            together keep the links out of both the tab order and the a11y
            tree regardless of how the sheet is animated later. */}
        <div
          id="mobile-nav-panel"
          inert={!mobileOpen}
          className={`lg:hidden fixed inset-x-0 top-[72px]  h-full bg-white ${
            mobileOpen ? "" : "hidden"
          }`}
        >
          <MobileNav
            open={mobileOpen}
            navItems={content.navItems}
            pathname={pathname}
            onSearch={openSearch}
            onClose={() => setMobileOpen(false)}
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
