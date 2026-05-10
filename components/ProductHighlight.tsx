import Image from "next/image";
import Link from "next/link";

interface Product {
  category: string;
  title: string;
  image: string;
  href: string;
}

const products: Product[] = [
  {
    category: "Instrumentation",
    title: "Embedded Systems",
    image: "/embedded-systems.jpg", //
    href: "/products/embedded-systems",
  },
  {
    category: "Aerospace",
    title: "Engineering Kits",
    image: "/engineering-kits.png", //
    href: "/products/engineering-kits",
  },
  {
    category: "Development",
    title: "IoT & Robotics",
    image: "/iot-robotics.jpg", //
    href: "/products/iot-robotics",
  },
];

export default function ProductHighlight() {
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
            href="/products"
            className="self-start md:self-auto px-6 py-3 border border-gray-300 rounded-md text-gray-900 font-medium hover:bg-gray-900 hover:text-white transition-colors duration-300"
          >
            View All Products
          </Link>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product, idx) => (
            <Link key={idx} href={product.href} className="group block">
              {/* Image Container */}
              <div className="relative w-full aspect-square overflow-hidden rounded-md">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 ease-in-out group-hover:scale-105"
                />

                {/* Category Tag */}
                <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-gray-900 text-sm font-medium px-4 py-2 rounded-full shadow-sm">
                  {product.category}
                </span>
              </div>

              {/* Title */}
              <h3 className="mt-4 text-lg font-bold text-gray-900 group-hover:text-[#A10F1A] transition-colors">
                {product.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
