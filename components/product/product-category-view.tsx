import Image from "next/image";
import Link from "next/link";
import type { Product, ProductCategory } from "@/data/types";
import { StatusBadge } from "./status-badge";
import { Price } from "@/components/currency/price";

export function ProductCategoryView({
  category,
  products,
}: {
  category: ProductCategory;
  products: Product[];
}) {
  return (
    <main className="bg-[#F5F6F8]">
      <section className="pt-12 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-widest uppercase">
              <li>
                <Link
                  href="/"
                  className="text-gray-500 hover:text-[#A10F1A] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-gray-300">
                /
              </li>
              <li>
                <Link
                  href="/product"
                  className="text-gray-500 hover:text-[#A10F1A] transition-colors"
                >
                  Products
                </Link>
              </li>
              <li aria-hidden="true" className="text-gray-300">
                /
              </li>
              <li className="text-[#A10F1A]" aria-current="page">
                {category.title}
              </li>
            </ol>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            {category.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-600 leading-relaxed">
            {category.description}
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <Link
                key={product.slug}
                href={`/product/${product.slug}`}
                className="group border border-gray-200 bg-white flex flex-col rounded-md overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index === 0}
                  />
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-3 gap-4">
                    <span className="text-xs font-bold tracking-widest text-[#A10F1A]">
                      {category.title}
                    </span>
                    <StatusBadge status={product.status} />
                  </div>

                  <h2 className="text-xl font-bold text-gray-900 mb-3">
                    {product.title}
                  </h2>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {product.description}
                  </p>

                  {/* Draft placeholder pricing — see Product['price']. Omitted
                      entirely when unset, so the slot collapses rather than
                      leaving a gap. */}
                  {product.priceUsd !== undefined && (
                    <p className="mt-6 text-lg text-gray-900">
                      <Price usd={product.priceUsd} />
                    </p>
                  )}

                  <span className="mt-auto pt-6 inline-flex items-center gap-1 text-sm font-semibold text-[#A10F1A]">
                    VIEW DETAILS <span className="text-base">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
