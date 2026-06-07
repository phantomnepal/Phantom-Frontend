import type { Metadata } from "next";
import Link from "next/link";
import { getSiteContent } from "@/data/content";

export const metadata: Metadata = {
  title: "Products – Phantom",
  description: "Explore Phantom's embedded systems, IoT, UAV, and educational products.",
  robots: { index: false, follow: true },
};

export default function ProductPage() {
  const content = getSiteContent();
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Our Products
        </h1>
        <p className="text-lg text-gray-600 mb-12">
          Explore our range of embedded systems, engineering kits, and IoT platforms.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {content.products.map((product) => (
            <div
              key={product.href}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition"
            >
              <div className="h-48 bg-gray-100" />
              <div className="p-6">
                <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">
                  {product.category}
                </p>
                <h2 className="text-xl font-semibold text-gray-900">
                  {product.title}
                </h2>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-block bg-[#0f1e2e] text-white px-6 py-3 rounded-md hover:bg-[#1a3147] transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
