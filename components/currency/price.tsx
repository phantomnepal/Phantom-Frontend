"use client";

import { formatPrice } from "@/lib/currency";
import { useCurrency } from "./currency-provider";

/**
 * A catalog price in the reader's chosen currency.
 *
 * Client-side because the currency is a client preference — the three places
 * prices appear (category grid, detail hero, related rail) are otherwise server
 * components, and this is the only part of them that has to react.
 */
export function Price({
  usd,
  className,
}: {
  usd: number;
  className?: string;
}) {
  const { currency, rate } = useCurrency();
  // ⚠ Deliberately NOT a live region. A category grid renders six of these, so
  // marking each one would fire six announcements for a single toggle click.
  // The switch announces the change once instead — see CurrencyToggle.
  return <span className={className}>{formatPrice(usd, currency, rate)}</span>;
}
