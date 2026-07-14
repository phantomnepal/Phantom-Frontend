'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import { useCart } from '@/components/store/cart-context';
import { useProducts } from '@/components/store/use-products';
import { formatNpr } from '@/lib/format';
import { MAX_QTY_PER_LINE } from '@/lib/cart-limits';

export default function CartPage() {
  const { lines, setQty, remove, hydrated } = useCart();
  const { byId, loading } = useProducts();

  // Drop lines whose product no longer exists once data has loaded.
  useEffect(() => {
    if (loading) return;
    for (const line of lines) {
      if (!byId.has(line.productId)) remove(line.productId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  if (!hydrated || loading) {
    return <div className="mx-auto max-w-4xl px-6 py-16 text-gray-500">Loading cart…</div>;
  }

  const items = lines
    .map((l) => ({ line: l, product: byId.get(l.productId) }))
    .filter((x) => x.product);

  const subtotal = items.reduce(
    (sum, x) => sum + (x.product!.priceNpr * x.line.qty),
    0,
  );

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-24 text-center">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-[#0f1e2e] px-6 py-3 text-sm font-medium text-white hover:bg-[#1a3147]"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-8 text-2xl font-bold">Shopping Cart ({items.length})</h1>

      <div className="space-y-4">
        {items.map(({ line, product }) => (
          <div
            key={line.productId}
            className="flex items-center gap-4 rounded-xl border border-gray-200 p-4"
          >
            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-50">
              {product!.image && (
                <Image
                  src={product!.image}
                  alt={product!.title}
                  fill
                  sizes="80px"
                  className="object-contain p-2"
                />
              )}
            </div>
            <div className="flex-1">
              <Link
                href={`/products/${product!.slug}`}
                className="font-medium hover:underline"
              >
                {product!.title}
              </Link>
              <p className="text-sm text-gray-500">
                {formatNpr(product!.priceNpr)}
              </p>
            </div>
            <div className="flex items-center rounded-full border border-gray-300">
              <button
                onClick={() => setQty(line.productId, line.qty - 1)}
                className="px-3 py-1.5 text-gray-600 hover:text-black"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-8 text-center text-sm">{line.qty}</span>
              <button
                onClick={() =>
                  setQty(
                    line.productId,
                    Math.min(MAX_QTY_PER_LINE, line.qty + 1),
                  )
                }
                disabled={line.qty >= MAX_QTY_PER_LINE}
                className="px-3 py-1.5 text-gray-600 hover:text-black disabled:cursor-not-allowed disabled:text-gray-300"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <div className="w-24 text-right text-sm font-medium">
              {formatNpr(product!.priceNpr * line.qty)}
            </div>
            <button
              onClick={() => remove(line.productId)}
              className="text-sm text-gray-400 hover:text-red-500"
              aria-label="Remove item"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-end gap-4 border-t border-gray-200 pt-6">
        <div className="text-lg">
          Subtotal:{' '}
          <span className="font-bold">{formatNpr(subtotal)}</span>
        </div>
        <p className="text-xs text-gray-500">
          Delivery calculated at checkout · Cash on Delivery
        </p>
        <Link
          href="/checkout"
          className="rounded-full bg-[#0f1e2e] px-8 py-3 text-sm font-medium text-white hover:bg-[#1a3147]"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
