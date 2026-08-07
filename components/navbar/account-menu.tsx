"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Boxes,
  MessageSquare,
  RotateCcw,
  User,
} from "lucide-react";
import { Dropdown, useDropdownClose } from "@/components/ui/dropdown";
import { useCurrency } from "@/components/currency/currency-provider";

/**
 * The account button's menu.
 *
 * ⚠ There is no auth on `main` — it lives on `ecommerce-phase1`, pending
 * store.phantom.com.np. So this menu deliberately does **not** pretend: no
 * "Sign in", no "My orders", no "Order history", nothing that would open a
 * form leading nowhere. It says plainly that accounts arrive with the store.
 *
 * What it does offer is real:
 *
 * - the working route to a human (`/contact`), which is the only thing that
 *   actually completes a purchase intent today
 * - the two pages someone poking at an account button is usually after
 * - the visitor's own stored state. The currency preference is the only thing
 *   this site keeps about anyone, and it lives in localStorage where nothing
 *   else offers to clear it, so "On this device" is a genuine account panel in
 *   miniature rather than a placeholder.
 *
 * When the store ships, the top block becomes the session and this block stays.
 */
export function AccountMenu({
  className = "",
}: {
  className?: string;
}) {
  const { currency, resetCurrency } = useCurrency();
  const stored = currency !== "USD";

  return (
    <Dropdown
      label="Account"
      menuLabel="Account and preferences"
      panelClassName="w-[292px] max-w-[calc(100vw-2.5rem)]"
      triggerClassName={`rounded-md p-2 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A10F1A] ${className}`}
      trigger={() => <User aria-hidden="true" className="h-5 w-5" />}
    >
      <div className="flex items-start gap-3 border-b border-gray-100 px-4 py-3.5">
        <span
          aria-hidden="true"
          className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0f1e2e] text-white"
        >
          <User className="h-4 w-4" />
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-semibold text-gray-900">
            Not signed in
          </span>
          <span className="mt-0.5 block text-[12px] leading-snug text-gray-500">
            Accounts and order history arrive with the Phantom store. Until
            then, talk to us directly.
          </span>
        </span>
      </div>

      <div className="p-1.5">
        <MenuLink
          href="/contact"
          icon={<MessageSquare className="h-4 w-4" />}
          title="Tell us what you need"
          hint="Quantities, lead times and bulk pricing"
          accent
        />
        <MenuLink
          href="/product"
          icon={<Boxes className="h-4 w-4" />}
          title="Browse products"
          hint="Six live boards and kits"
        />
      </div>

      <div className="border-t border-gray-100 bg-[#F5F6F8] px-4 py-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-gray-500">
          On this device
        </p>
        <div className="mt-1.5 flex items-center justify-between gap-3">
          <p className="text-[12px] leading-snug text-gray-500">
            Showing prices in{" "}
            <span className="font-semibold text-gray-700">{currency}</span>
            {stored ? ", saved in this browser." : ". Nothing saved yet."}
          </p>
          <ResetPreferences disabled={!stored} onReset={resetCurrency} />
        </div>
      </div>
    </Dropdown>
  );
}

function MenuLink({
  href,
  icon,
  title,
  hint,
  accent = false,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  hint: string;
  accent?: boolean;
}) {
  const close = useDropdownClose();

  return (
    <Link
      href={href}
      role="menuitem"
      onClick={() => close(false)}
      className="group flex items-center gap-3 rounded-lg px-2.5 py-2 transition hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#A10F1A]"
    >
      <span
        aria-hidden="true"
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${
          accent ? "bg-[#A10F1A]/10 text-[#A10F1A]" : "bg-gray-100 text-gray-500"
        }`}
      >
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium text-gray-900">{title}</span>
        <span className="block text-[12px] leading-snug text-gray-500">
          {hint}
        </span>
      </span>
      <ArrowUpRight
        aria-hidden="true"
        className="h-3.5 w-3.5 shrink-0 text-gray-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gray-500"
      />
    </Link>
  );
}

function ResetPreferences({
  disabled,
  onReset,
}: {
  disabled: boolean;
  onReset: () => void;
}) {
  const close = useDropdownClose();

  return (
    <button
      type="button"
      role="menuitem"
      // Native `disabled` rather than aria-disabled: there is nothing to
      // explain and nothing to focus for when no preference is stored, so the
      // Dropdown's roving ring should skip it entirely.
      disabled={disabled}
      onClick={() => {
        onReset();
        close(true);
      }}
      className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-gray-200 bg-white px-2 py-1 text-[12px] font-medium text-gray-600 transition hover:border-gray-300 hover:text-gray-900 disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A10F1A]"
    >
      <RotateCcw aria-hidden="true" className="h-3 w-3" />
      Reset
    </button>
  );
}
