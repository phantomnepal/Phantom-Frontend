'use client';

import { useState } from 'react';
import { useCart } from './cart-context';
import { MAX_QTY_PER_LINE } from '@/lib/cart-limits';

interface Props {
  productId: number;
  stock: string;
}

export function ProductPurchase({ productId, stock }: Props) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const outOfStock = stock === 'out-of-stock';

  if (outOfStock) {
    return (
      <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-500">
        This product is currently out of stock.
      </div>
    );
  }

  return (
    <div className="mt-8 flex flex-wrap items-center gap-4">
      <div className="flex items-center rounded-full border border-gray-300">
        <button
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="px-4 py-2 text-lg text-gray-600 hover:text-black"
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="w-10 text-center text-sm">{qty}</span>
        <button
          onClick={() => setQty((q) => Math.min(MAX_QTY_PER_LINE, q + 1))}
          disabled={qty >= MAX_QTY_PER_LINE}
          className="px-4 py-2 text-lg text-gray-600 hover:text-black disabled:cursor-not-allowed disabled:text-gray-300"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
      <button
        onClick={() => {
          add(productId, qty);
          setAdded(true);
          setTimeout(() => setAdded(false), 1500);
        }}
        className="rounded-full bg-[#0f1e2e] px-8 py-3 text-sm font-medium text-white transition hover:bg-[#1a3147]"
      >
        {added ? 'Added ✓' : stock === 'preorder' ? 'Pre-order' : 'Add to cart'}
      </button>
    </div>
  );
}
