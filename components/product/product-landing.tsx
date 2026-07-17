import Image from "next/image";
import Link from "next/link";
import { allCategories, productsInCategory } from "@/lib/catalog";

export function ProductLanding() {
  const categories = allCategories();

  return (
    <main className="bg-white">
      <section className="pt-16 pb-12 md:pt-16 md:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Precision Engineering for the{" "}
            <span className="text-[#A10F1A]">Next Frontier</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed">
            PHANTOM is dedicated to pushing the boundaries of high-performance
            aerospace and robotics. Our systems are engineered for resilience,
            speed, and uncompromising reliability in mission-critical
            environments.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((category, index) => {
              const count = productsInCategory(category.slug).length;
              return (
                <Link
                  key={category.slug}
                  href={`/product/${category.slug}`}
                  className="group border border-gray-200 bg-white flex flex-col rounded-md overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-gray-50">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={index === 0}
                    />
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-baseline justify-between gap-4 mb-3">
                      <h2 className="text-xl font-bold text-gray-900">
                        {category.title}
                      </h2>
                      <span className="text-xs text-gray-500 shrink-0">
                        {count} {count === 1 ? "product" : "products"}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {category.description}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[#A10F1A]">
                      VIEW RANGE <span className="text-base">→</span>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
