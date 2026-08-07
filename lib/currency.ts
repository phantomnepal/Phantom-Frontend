/**
 * Currency display for the catalog.
 *
 * ⚠ USD is the only authored figure. `Product.priceUsd` is the number someone
 * decided; NPR is always computed from it and is never stored, so the two can
 * never drift apart. This replaced a state where `main` carried USD strings and
 * the store branch carried NPR integers for the same six products, disagreeing
 * by as much as 6x — they were not one price in two currencies, they were two
 * unrelated guesses.
 *
 * ⚠ The USD figures themselves are still DRAFT PLACEHOLDERS. See
 * `Product.priceUsd`. A currency toggle makes draft pricing look twice as
 * official as a single number did; replace them before this is public.
 */

export const CURRENCIES = ["USD", "NPR"] as const;
export type Currency = (typeof CURRENCIES)[number];

export function isCurrency(value: unknown): value is Currency {
  return CURRENCIES.includes(value as Currency);
}

/**
 * Fallback USD→NPR rate, baked into the bundle.
 *
 * This is what renders before — and instead of, when the network is unavailable
 * — the live rate. It is not decoration: without it the NPR option would be
 * dead offline and every price on a category grid would visibly reflow when the
 * fetch landed.
 *
 * Rate observed 2026-08-07. Update by hand when it drifts far enough to move a
 * price across a rounding boundary; at NPR_ROUND = 100 that takes a while.
 */
export const FALLBACK_NPR_PER_USD = 152.4;

/** Where the live rate comes from. No API key, `access-control-allow-origin: *`,
 *  daily updates, and a one-hour browser cache. */
export const RATE_ENDPOINT = "https://open.er-api.com/v6/latest/USD";

/**
 * NPR is rounded to the nearest 100.
 *
 * A converted price is an approximation, and `Rs 15,088` reads as a quote to
 * the rupee that Phantom never made.
 *
 * ⚠ It does NOT hold prices steady against the live rate, which was the other
 * reason given for choosing it. Rounding to 100 only absorbs a rate move under
 * 50/price — about 0.15 rupees at catalog prices, which a daily rate clears
 * easily. A +1.00 move changes 9 of the 11 distinct catalog prices. Measured
 * and pinned in `lib/__tests__/currency.test.ts`; rounding to 500 would give
 * 3 of 11 if that ever matters more than precision.
 */
const NPR_ROUND = 100;

export function usdToNpr(usd: number, rate: number): number {
  return Math.round((usd * rate) / NPR_ROUND) * NPR_ROUND;
}

const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const nprFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});

/** The string shown to the reader. USD keeps its cents; NPR never has any. */
export function formatPrice(
  usd: number,
  currency: Currency,
  rate: number,
): string {
  if (currency === "USD") return usdFormatter.format(usd);
  return `Rs ${nprFormatter.format(usdToNpr(usd, rate))}`;
}

/** Parse a live-rate payload. Returns null rather than throwing — a bad or
 *  changed response must leave the fallback in place, not break the page. */
export function readNprRate(payload: unknown): number | null {
  if (typeof payload !== "object" || payload === null) return null;
  const rates = (payload as { rates?: unknown }).rates;
  if (typeof rates !== "object" || rates === null) return null;
  const npr = (rates as { NPR?: unknown }).NPR;
  if (typeof npr !== "number" || !Number.isFinite(npr) || npr <= 0) return null;
  return npr;
}
