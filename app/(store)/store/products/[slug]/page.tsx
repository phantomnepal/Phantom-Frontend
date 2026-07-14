import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProductBySlug } from '@/server/db/queries';
import { formatNpr } from '@/lib/format';
import { ProductPurchase } from '@/components/store/product-purchase';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: 'Product not found' };
  return {
    title: product.title,
    description: product.description,
  };
}

export default async function ProductDetail({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <nav className="mb-8 text-sm text-gray-500">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">{product.title}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2">
        {/* Gallery */}
        <div>
          <div className="relative aspect-square overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
            {product.images[0] && (
              <Image
                src={product.images[0]}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain p-6"
                priority
              />
            )}
          </div>
          {product.images.length > 1 && (
            <div className="mt-4 grid grid-cols-4 gap-3">
              {product.images.slice(0, 4).map((src) => (
                <div
                  key={src}
                  className="relative aspect-square overflow-hidden rounded-lg border border-gray-200 bg-gray-50"
                >
                  <Image
                    src={src}
                    alt={product.title}
                    fill
                    sizes="120px"
                    className="object-contain p-2"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-400">
            {product.category}
          </p>
          <h1 className="mt-1 text-3xl font-bold">{product.title}</h1>
          <p className="mt-4 text-2xl font-semibold text-[#0f1e2e]">
            {formatNpr(product.priceNpr)}
          </p>
          <p className="mt-6 leading-relaxed text-gray-700">
            {product.description}
          </p>

          {product.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {product.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          {product.specs && product.specs.length > 0 && (
            <dl className="mt-8 divide-y divide-gray-100 border-t border-gray-100">
              {product.specs.map((s) => (
                <div key={s.label} className="flex justify-between py-2 text-sm">
                  <dt className="text-gray-500">{s.label}</dt>
                  <dd className="font-medium text-gray-900">{s.value}</dd>
                </div>
              ))}
            </dl>
          )}

          <ProductPurchase productId={product.id} stock={product.stock} />
        </div>
      </div>
    </div>
  );
}
