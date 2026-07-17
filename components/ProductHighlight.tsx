import Image from "next/image";
import Link from "next/link";
import { getSiteContent } from "@/data/content";

export default function ProductHighlight() {
  const content = getSiteContent();
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <p className="text-[#A10F1A] font-semibold mb-2">
              Featured Systems
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Product Highlight
            </h2>
          </div>

          <Link
            href="/product"
            className="self-start md:self-auto px-6 py-3 border border-gray-300 rounded-md text-gray-900 font-medium hover:bg-gray-900 hover:text-white transition-colors duration-300"
          >
            View All Products
          </Link>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.productCategories.map((category) => (
            <Link
              key={category.slug}
              href={`/product/${category.slug}`}
              className="group block"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-square overflow-hidden rounded-md">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 ease-in-out group-hover:scale-105"
                />
              </div>

              {/* Title */}
              <h3 className="mt-4 text-lg font-bold text-gray-900 group-hover:text-[#A10F1A] transition-colors">
                {category.title}
              </h3>
              <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
