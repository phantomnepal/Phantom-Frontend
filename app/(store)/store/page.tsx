import Link from 'next/link';
import { getAllProducts } from '@/server/db/queries';
import { ProductCard } from '@/components/store/product-card';

export const dynamic = 'force-dynamic';

export default async function StoreHome() {
  const products = await getAllProducts();

  return (
    <>
      {/* Hero */}
      <section className="bg-[#0f1e2e] text-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h1 className="max-w-2xl text-4xl font-bold leading-tight sm:text-5xl">
            Engineered in Nepal. Built to fly, sense, and teach.
          </h1>
          <p className="mt-4 max-w-xl text-gray-300">
            Flight controllers, embedded hardware, and educational kits from
            Phantom. Cash on Delivery, nationwide.
          </p>
          <Link
            href="#catalog"
            className="mt-8 inline-block rounded-full bg-white px-6 py-3 font-medium text-[#0f1e2e] transition hover:bg-gray-100"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Catalog */}
      <section id="catalog" className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-bold">All Products</h2>
          <span className="text-sm text-gray-500">{products.length} items</span>
        </div>

        {products.length === 0 ? (
          <p className="text-gray-500">
            No products yet. Seed the catalog with{' '}
            <code>npm run db:seed</code>.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
