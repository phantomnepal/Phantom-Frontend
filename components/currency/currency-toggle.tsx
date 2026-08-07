"use client";

import { Check, ChevronDown } from "lucide-react";
import { Dropdown, useDropdownClose } from "@/components/ui/dropdown";
import { CURRENCIES, formatPrice, type Currency } from "@/lib/currency";
import { useCurrency } from "./currency-provider";

const CURRENCY_NAMES: Record<Currency, string> = {
  USD: "US dollars",
  NPR: "Nepalese rupees",
};

const CURRENCY_META: Record<Currency, { symbol: string; blurb: string }> = {
  USD: { symbol: "$", blurb: "Prices as authored" },
  NPR: { symbol: "Rs", blurb: "Converted, rounded to Rs 100" },
};

/**
 * USD / NPR switcher.
 *
 * This was a two-button segmented control. It is a dropdown now at the user's
 * request, and the extra room is spent on the thing the segmented control could
 * never say: **which rate a converted price is using**.
 *
 * The site already fetches a live USD→NPR rate and silently falls back to a
 * constant baked into the bundle (see lib/currency.ts). Until now nothing on
 * the page distinguished the two, so "Rs 3,200" looked equally authoritative
 * whether it came from today's rate or from one hardcoded months ago. The panel
 * states the rate, where it came from, and that NPR is rounded — all of which
 * were already true and merely invisible.
 */
export function CurrencyToggle({
  className = "",
  size = "sm",
}: {
  className?: string;
  /** `lg` gets 44px targets for the mobile sheet; `sm` fits the desktop bar. */
  size?: "sm" | "lg";
}) {
  const { currency, rate, rateIsLive } = useCurrency();

  const trigger =
    size === "lg"
      ? "min-h-11 w-full px-3 text-sm"
      : "min-h-8 px-2.5 text-[13px]";

  return (
    <>
      <Dropdown
        label="Currency"
        menuLabel="Display currency"
        align="right"
        // In the mobile sheet this control sits in the pinned bottom bar, so a
        // downward panel would open past the end of the sheet.
        side={size === "lg" ? "top" : "bottom"}
        triggerClassName={`inline-flex items-center justify-between gap-1.5 rounded-md border border-gray-200 font-semibold text-gray-700 transition hover:border-gray-300 hover:text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A10F1A] ${trigger} ${className}`}
        panelClassName="w-[268px] max-w-[calc(100vw-2.5rem)]"
        trigger={(open) => (
          <>
            <span className="flex items-center gap-1.5">
              <span className="text-gray-400">
                {CURRENCY_META[currency].symbol}
              </span>
              {currency}
            </span>
            <ChevronDown
              aria-hidden="true"
              className={`h-3.5 w-3.5 text-gray-400 transition-transform duration-150 ${
                open ? "rotate-180" : ""
              }`}
            />
          </>
        )}
      >
        <div className="p-1.5">
          {CURRENCIES.map((option) => (
            <CurrencyOption key={option} option={option} />
          ))}
        </div>

        <div className="border-t border-gray-100 bg-[#F5F6F8] px-3.5 py-2.5">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-gray-500">
            <span
              aria-hidden="true"
              className={`h-1.5 w-1.5 rounded-full ${
                rateIsLive ? "bg-green-500" : "bg-amber-400"
              }`}
            />
            {rateIsLive ? "Live rate" : "Offline rate"}
          </p>
          <p className="mt-1 text-[12px] leading-snug text-gray-500">
            $1 = Rs {rate.toFixed(2)}.{" "}
            {rateIsLive
              ? "Updated daily."
              : "Live rate unavailable, using our stored rate."}{" "}
            Rupee prices are converted and rounded, not quotes.
          </p>
        </div>
      </Dropdown>

      {/* One announcement for the whole page. Every price on screen changes at
          once, and marking each of them would fire an announcement per price. */}
      <span role="status" className="sr-only">
        Prices shown in {CURRENCY_NAMES[currency]}
      </span>
    </>
  );
}

function CurrencyOption({ option }: { option: Currency }) {
  const { currency, setCurrency, rate } = useCurrency();
  const close = useDropdownClose();
  const selected = option === currency;

  return (
    <button
      type="button"
      role="menuitemradio"
      aria-checked={selected}
      aria-label={`Show prices in ${CURRENCY_NAMES[option]}`}
      onClick={() => {
        setCurrency(option);
        close(true);
      }}
      className={`flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left transition focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#A10F1A] ${
        selected ? "bg-[#0f1e2e]/[0.04]" : "hover:bg-gray-50"
      }`}
    >
      <span
        aria-hidden="true"
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-[13px] font-semibold ${
          selected
            ? "bg-[#0f1e2e] text-white"
            : "bg-gray-100 text-gray-500"
        }`}
      >
        {CURRENCY_META[option].symbol}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-baseline gap-1.5">
          <span className="text-sm font-semibold text-gray-900">{option}</span>
          {/* A worked example beats a rate: "$100 → Rs 15,200" is the thing a
              reader is actually trying to work out. Only on the converted
              currency — "$100.00 for $100" is noise. */}
          {option !== "USD" && (
            <span className="truncate text-[11px] text-gray-400">
              {formatPrice(100, option, rate)} for $100
            </span>
          )}
        </span>
        <span className="mt-0.5 block text-[12px] leading-snug text-gray-500">
          {CURRENCY_META[option].blurb}
        </span>
      </span>
      {/* Selection is otherwise carried by background colour alone. */}
      {selected && (
        <Check aria-hidden="true" className="h-4 w-4 shrink-0 text-[#A10F1A]" />
      )}
    </button>
  );
}
