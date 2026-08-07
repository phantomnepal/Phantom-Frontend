"use client";

import { useEffect, useId, useState } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";

/**
 * Quantity control, "Add to cart" and "Buy now", from the Figma.
 *
 * DELIBERATELY INERT. `main` has no cart, no checkout and no auth — those live
 * on the `ecommerce-phase1` branch, pending store.phantom.com.np. The control
 * keeps local state so it does not feel broken, but neither button submits
 * anything. The enquiry route in the closing strip is the only working path to
 * a human today.
 *
 * The quantity used to be a stepper and a read-only number, which meant 100
 * units cost 99 clicks. It is a real number field now:
 *
 * - type any quantity directly; focusing it selects what is there, so typing
 *   replaces rather than appends
 * - `inputMode="numeric"` brings up the digit keypad on a phone
 * - Up/Down arrows step, and Shift+Arrow (or Shift+click on the buttons) steps
 *   by 10 — the same convention as most design tools
 * - the bulk presets jump straight to the quantities people actually order
 *
 * Draft state is kept as a string rather than a number so the field can be
 * empty mid-edit. Clearing it and typing "50" must not fight you by snapping
 * back to 1 on the first keystroke; it settles on blur instead.
 */

const MIN = 1;
/** An arbitrary ceiling, but an unbounded field is a footgun: it lets someone
 *  type a number no one can fulfil and lets `Infinity` reach a future cart. */
const MAX = 9999;
const PRESETS = [10, 25, 50, 100];

const clamp = (value: number) => Math.min(MAX, Math.max(MIN, value));

export function BuyBox() {
  const [quantity, setQuantity] = useState(MIN);
  const [draft, setDraft] = useState(String(MIN));
  const inputId = useId();

  // Keep the visible text in step when the quantity changes from anywhere
  // other than typing — a preset, a stepper, an arrow key.
  useEffect(() => setDraft(String(quantity)), [quantity]);

  const step = (delta: number) => setQuantity((q) => clamp(q + delta));

  const commit = (text: string) => {
    const parsed = Number.parseInt(text, 10);
    // Anything unparseable — empty, "abc", a lone "-" — falls back to the last
    // good quantity rather than to MIN, so a stray keystroke does not discard
    // a number someone just typed.
    setQuantity(Number.isNaN(parsed) ? quantity : clamp(parsed));
    setDraft(String(Number.isNaN(parsed) ? quantity : clamp(parsed)));
  };

  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-stretch gap-3">
        <div className="flex items-center rounded-md border border-gray-300 focus-within:border-[#0f1e2e]">
          <button
            type="button"
            onClick={(event) => step(event.shiftKey ? -10 : -1)}
            disabled={quantity <= MIN}
            className="px-3 py-3 text-gray-500 transition hover:text-gray-900 disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#A10F1A]"
            aria-label="Decrease quantity"
          >
            <Minus className="h-4 w-4" />
          </button>

          {/* A real input, not a span: it is the whole point of this control.
              The label is visually hidden because the surrounding buttons and
              the presets below already name it on screen. */}
          <label htmlFor={inputId} className="sr-only">
            Quantity
          </label>
          <input
            id={inputId}
            type="text"
            inputMode="numeric"
            autoComplete="off"
            value={draft}
            onChange={(event) => {
              // Digits only, and never longer than MAX. Filtering on input
              // rather than validating on submit means the field can never
              // show a value the control would reject.
              const digits = event.target.value.replace(/\D/g, "").slice(0, 4);
              setDraft(digits);
              const parsed = Number.parseInt(digits, 10);
              if (!Number.isNaN(parsed) && parsed >= MIN) {
                setQuantity(clamp(parsed));
              }
            }}
            onFocus={(event) => event.target.select()}
            onBlur={(event) => commit(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "ArrowUp") {
                event.preventDefault();
                step(event.shiftKey ? 10 : 1);
              } else if (event.key === "ArrowDown") {
                event.preventDefault();
                step(event.shiftKey ? -10 : -1);
              } else if (event.key === "Enter") {
                commit(event.currentTarget.value);
              }
            }}
            className="w-14 border-0 bg-transparent py-3 text-center text-sm font-semibold text-gray-900 tabular-nums focus:outline-none"
          />

          <button
            type="button"
            onClick={(event) => step(event.shiftKey ? 10 : 1)}
            disabled={quantity >= MAX}
            className="px-3 py-3 text-gray-500 transition hover:text-gray-900 disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#A10F1A]"
            aria-label="Increase quantity"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <button
          type="button"
          className="flex flex-1 items-center justify-center gap-2 rounded-md bg-[#0f1e2e] px-8 py-3 text-sm font-semibold tracking-wide text-white transition hover:bg-[#1a3147] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f1e2e]"
        >
          <ShoppingCart className="h-4 w-4" />
          ADD TO CART
        </button>

        <button
          type="button"
          className="rounded-md border border-gray-300 px-8 py-3 text-sm font-semibold tracking-wide text-gray-900 transition hover:border-gray-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f1e2e]"
        >
          BUY NOW
        </button>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-[12px] text-gray-400">Bulk</span>
        {PRESETS.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => setQuantity(preset)}
            // The presets are a shortcut to a value the field also shows, so
            // aria-pressed carries the "this is the current quantity" state
            // that the ring conveys visually.
            aria-pressed={quantity === preset}
            aria-label={`Set quantity to ${preset}`}
            className={`min-h-8 rounded-md border px-2.5 text-[13px] font-medium tabular-nums transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A10F1A] ${
              quantity === preset
                ? "border-[#0f1e2e] bg-[#0f1e2e] text-white"
                : "border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-900"
            }`}
          >
            {preset}
          </button>
        ))}
        <span className="text-[12px] text-gray-400">
          or type a quantity — hold Shift to step by 10
        </span>
      </div>

      {/* The number lives in an input, which screen readers announce on change
          anyway; this covers the presets and the steppers moving it. */}
      <span role="status" className="sr-only">
        Quantity: {quantity}
      </span>
    </div>
  );
}
