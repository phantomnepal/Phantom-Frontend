import { describe, expect, it } from 'vitest';
import {
  FALLBACK_NPR_PER_USD,
  formatPrice,
  isCurrency,
  readNprRate,
  usdToNpr,
} from '../currency';
import { getSiteContent } from '@/data/content';

const RATE = 152.4;

describe('usdToNpr', () => {
  it('rounds to the nearest 100', () => {
    // 99 * 152.4 = 15087.6
    expect(usdToNpr(99, RATE)).toBe(15100);
    // 49 * 152.4 = 7467.6
    expect(usdToNpr(49, RATE)).toBe(7500);
    // 349 * 152.4 = 53187.6
    expect(usdToNpr(349, RATE)).toBe(53200);
  });

  it('always lands on a multiple of 100, within 50 of the exact figure', () => {
    for (const usd of [24, 35, 49, 59, 79, 89, 99, 129, 149, 349, 399]) {
      for (const rate of [138, 150, 152.4, 160]) {
        const rounded = usdToNpr(usd, rate);
        expect(rounded % 100).toBe(0);
        expect(Math.abs(rounded - usd * rate)).toBeLessThanOrEqual(50);
      }
    }
  });

  it('does NOT hold prices steady against a live rate', () => {
    // ⚠ Pinned because the opposite was claimed when this was specced, and the
    // claim was the stated reason for choosing 100 over exact rupees.
    //
    // Rounding to 100 only absorbs a rate move smaller than 50/price. At
    // catalog prices that is roughly 0.15 rupees, which a daily rate clears
    // easily — so a visitor genuinely does see different NPR figures week to
    // week. Measured over the 11 distinct catalog prices:
    //
    //   rate +0.10 ->  0/11 change
    //   rate +0.25 ->  3/11
    //   rate +0.50 ->  5/11
    //   rate +1.00 ->  9/11
    //
    // Rounding to 500 would give 3/11 at +1.00. That is the trade if price
    // stability turns out to matter more than precision.
    const prices = [24, 35, 49, 59, 79, 89, 99, 129, 149, 349, 399];
    const changed = (drift: number) =>
      prices.filter((p) => usdToNpr(p, 152.4) !== usdToNpr(p, 152.4 + drift))
        .length;

    expect(changed(0.1)).toBe(0);
    expect(changed(1)).toBe(9);
  });
});

describe('formatPrice', () => {
  it('keeps cents in USD and drops them in NPR', () => {
    expect(formatPrice(99, 'USD', RATE)).toBe('$99.00');
    expect(formatPrice(99, 'NPR', RATE)).toBe('Rs 15,100');
  });

  it('ignores the rate entirely when showing USD', () => {
    // USD is the authored figure; no conversion may touch it.
    expect(formatPrice(49, 'USD', 1)).toBe('$49.00');
    expect(formatPrice(49, 'USD', 999)).toBe('$49.00');
  });
});

describe('readNprRate', () => {
  it('reads the rate from a well-formed payload', () => {
    expect(readNprRate({ rates: { NPR: 152.4, EUR: 0.9 } })).toBe(152.4);
  });

  it('returns null rather than throwing on anything unexpected', () => {
    // A bad response must leave the baked-in fallback in place, not break a
    // product page.
    for (const bad of [
      null,
      undefined,
      'oops',
      {},
      { rates: null },
      { rates: {} },
      { rates: { NPR: '152.4' } },
      { rates: { NPR: 0 } },
      { rates: { NPR: -1 } },
      { rates: { NPR: Number.NaN } },
    ]) {
      expect(readNprRate(bad)).toBeNull();
    }
  });
});

describe('isCurrency', () => {
  it('accepts only the two supported codes', () => {
    expect(isCurrency('USD')).toBe(true);
    expect(isCurrency('NPR')).toBe(true);
    // Guards a stored preference, which is attacker-writable and can also
    // simply be stale after a rename.
    expect(isCurrency('EUR')).toBe(false);
    expect(isCurrency(null)).toBe(false);
    expect(isCurrency('')).toBe(false);
  });
});

describe('catalog pricing', () => {
  it('prices every product in whole USD, never a formatted string', () => {
    for (const product of getSiteContent().catalog) {
      if (product.priceUsd === undefined) continue;
      expect(typeof product.priceUsd).toBe('number');
      expect(product.priceUsd).toBeGreaterThan(0);
    }
  });

  it('renders a sane NPR figure for every priced product', () => {
    for (const product of getSiteContent().catalog) {
      if (product.priceUsd === undefined) continue;
      const npr = formatPrice(product.priceUsd, 'NPR', FALLBACK_NPR_PER_USD);
      expect(npr).toMatch(/^Rs [\d,]+$/);
      // Rounding to 100 must never round a real price down to nothing.
      expect(usdToNpr(product.priceUsd, FALLBACK_NPR_PER_USD)).toBeGreaterThan(
        0,
      );
    }
  });
});
