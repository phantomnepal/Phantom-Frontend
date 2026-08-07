"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  FALLBACK_NPR_PER_USD,
  RATE_ENDPOINT,
  isCurrency,
  readNprRate,
  type Currency,
} from "@/lib/currency";

const STORAGE_KEY = "phantom:currency";

type CurrencyState = {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  /** USD→NPR. Starts at the baked-in fallback and is replaced if the live
   *  rate arrives; never null, so no consumer has to handle "no rate yet". */
  rate: number;
  /**
   * Whether `rate` came from the network or is still the baked-in fallback.
   *
   * Exposed so the currency menu can say which one a reader is looking at. A
   * converted price is an approximation either way, but "today's rate" and "a
   * rate we hardcoded in August" are different claims and should not look
   * identical.
   */
  rateIsLive: boolean;
  /**
   * Forget the stored preference and go back to USD.
   *
   * The currency choice is the only thing this site keeps about a visitor, so
   * the account menu offers to clear it — that menu has nothing else truthful
   * to manage until the store ships auth.
   */
  resetCurrency: () => void;
};

const CurrencyContext = createContext<CurrencyState | null>(null);

/**
 * Site-wide currency preference.
 *
 * ⚠ The initial state is USD and the initial rate is the fallback constant,
 * deliberately: every product page is prerendered as static HTML, so the server
 * cannot know the visitor's stored choice. Reading localStorage during render
 * would produce markup that disagrees with the server's and break hydration, so
 * it is read in an effect instead — which means a visitor who chose NPR sees
 * one frame of USD before it corrects. That flash is inherent to a
 * client-side preference over static pages, and was accepted when this was
 * specced.
 */
export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("USD");
  const [rate, setRate] = useState(FALLBACK_NPR_PER_USD);
  const [rateIsLive, setRateIsLive] = useState(false);

  // Restore the stored preference. localStorage throws in Safari's private
  // mode rather than returning null, so this cannot go unguarded.
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (isCurrency(stored)) setCurrencyState(stored);
    } catch {
      // No storage available — the session just starts at USD every time.
    }
  }, []);

  // Upgrade the fallback to the live rate. Any failure is silent by design:
  // the fallback is already rendered and correct enough, so a dead endpoint
  // must not surface an error to someone reading a product page.
  useEffect(() => {
    const controller = new AbortController();
    fetch(RATE_ENDPOINT, { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((payload) => {
        const live = readNprRate(payload);
        if (live !== null) {
          setRate(live);
          setRateIsLive(true);
        }
      })
      .catch(() => {
        // Offline, blocked, rate-limited, or the shape changed. Keep the
        // fallback.
      });
    return () => controller.abort();
  }, []);

  const setCurrency = useCallback((next: Currency) => {
    setCurrencyState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Preference just does not survive the page, which is not worth failing
      // the click over.
    }
  }, []);

  const resetCurrency = useCallback(() => {
    setCurrencyState("USD");
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Nothing was stored to begin with.
    }
  }, []);

  return (
    <CurrencyContext.Provider
      value={{ currency, setCurrency, rate, rateIsLive, resetCurrency }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency(): CurrencyState {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
