'use client';

import { useState } from 'react';
import { useCart } from './cart-context';

interface Props {
  productId: number;
  disabled?: boolean;
  qty?: number;
  className?: string;
  label?: string;
}

export function AddToCart({
  productId,
  disabled,
  qty = 1,
  className = '',
  label = 'Add to cart',
}: Props) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  if (disabled) {
    return (
      <button
        disabled
        className={`cursor-not-allowed rounded-full border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-400 ${className}`}
      >
        Out of stock
      </button>
    );
  }

  return (
    <button
      onClick={() => {
        add(productId, qty);
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
      }}
      className={`rounded-full bg-[#0f1e2e] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#1a3147] ${className}`}
    >
      {added ? 'Added ✓' : label}
    </button>
  );
}
