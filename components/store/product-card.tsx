import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/server/db/schema';
import { formatNpr } from '@/lib/format';
import { AddToCart } from './add-to-cart';

const STOCK_LABEL: Record<string, string> = {
  'in-stock': 'Available',
  'out-of-stock': 'Out of stock',
  preorder: 'Pre-order',
};

export function ProductCard({ product }: { product: Product }) {
  const outOfStock = product.stock === 'out-of-stock';
  return (
    <div className="group flex flex-col rounded-xl border border-gray-200 p-4 transition hover:shadow-md">
      <Link href={`/products/${product.slug}`} className="relative block">
        <span className="absolute left-2 top-2 z-10 rounded-full bg-[#0f1e2e]/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
          {STOCK_LABEL[product.stock] ?? product.stock}
        </span>
        <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-50">
          {product.images[0] && (
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-contain p-4 transition group-hover:scale-105"
            />
          )}
        </div>
      </Link>
      <div className="mt-4 flex flex-1 flex-col">
        <p className="text-xs uppercase tracking-wide text-gray-400">
          {product.category}
        </p>
        <Link
          href={`/products/${product.slug}`}
          className="mt-1 font-medium text-gray-900 hover:underline"
        >
          {product.title}
        </Link>
        <p className="mt-1 text-sm text-gray-700">{formatNpr(product.priceNpr)}</p>
        <div className="mt-4">
          <AddToCart
            productId={product.id}
            disabled={outOfStock}
            className="w-full"
            label={product.stock === 'preorder' ? 'Pre-order' : 'Add to cart'}
          />
        </div>
      </div>
    </div>
  );
}
