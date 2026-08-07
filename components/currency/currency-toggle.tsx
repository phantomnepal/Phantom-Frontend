"use client";

import { CURRENCIES, type Currency } from "@/lib/currency";
import { useCurrency } from "./currency-provider";

const CURRENCY_NAMES: Record<Currency, string> = {
  USD: "US dollars",
  NPR: "Nepalese rupees",
};

/**
 * USD / NPR switch.
 *
 * A segmented control rather than a dropdown: with exactly two options a select
 * costs an extra click and an extra keyboard mode to reach a state that is
 * already visible. `aria-pressed` carries the selection, since the selected
 * segment is otherwise distinguished only by colour.
 */
export function CurrencyToggle({
  className = "",
  size = "sm",
}: {
  className?: string;
  /** `lg` gets 44px targets for the mobile sheet; `sm` fits the desktop bar. */
  size?: "sm" | "lg";
}) {
  const { currency, setCurrency } = useCurrency();

  const segment =
    size === "lg"
      ? "min-h-11 flex-1 px-4 text-sm"
      : "min-h-8 px-2.5 text-[13px]";

  return (
    <>
      <div
        role="group"
        aria-label="Currency"
        className={`inline-flex items-center rounded-md border border-gray-200 p-0.5 ${className}`}
      >
        {CURRENCIES.map((option) => {
          const selected = option === currency;
          return (
            <button
              key={option}
              type="button"
              onClick={() => setCurrency(option)}
              aria-pressed={selected}
              aria-label={`Show prices in ${CURRENCY_NAMES[option]}`}
              className={`rounded font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A10F1A] ${segment} ${
                selected
                  ? "bg-[#0f1e2e] text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
      {/* One announcement for the whole page. Every price on screen changes at
          once, and marking each of them would fire an announcement per price. */}
      <span role="status" className="sr-only">
        Prices shown in {CURRENCY_NAMES[currency]}
      </span>
    </>
  );
}
