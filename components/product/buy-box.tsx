"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";

/**
 * Quantity stepper, "Add to cart" and "Buy now", from the Figma.
 *
 * DELIBERATELY INERT. `main` has no cart, no checkout and no auth — those live
 * on the `ecommerce-phase1` branch, pending store.phantom.com.np. The stepper
 * keeps local state so the control does not feel broken, but neither button
 * submits anything. Wire these up when the store ships; the enquiry route in
 * the closing strip is the only working path to a human today.
 */
export function BuyBox() {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="mt-8 flex flex-wrap items-stretch gap-3">
      <div className="flex items-center rounded-md border border-gray-300">
        <button
          type="button"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          disabled={quantity === 1}
          className="px-3 py-3 text-gray-500 hover:text-gray-900 disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#A10F1A]"
          aria-label="Decrease quantity"
        >
          <Minus className="h-4 w-4" />
        </button>
        {/* A bare span takes no accessible name, so aria-label on it is
            unreliable; the hidden word carries the meaning and the live region
            announces the number as it changes. */}
        <span
          role="status"
          className="w-10 text-center text-sm font-medium text-gray-900"
        >
          <span className="sr-only">Quantity: </span>
          {quantity}
        </span>
        <button
          type="button"
          onClick={() => setQuantity((q) => q + 1)}
          className="px-3 py-3 text-gray-500 hover:text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#A10F1A]"
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
  );
}
