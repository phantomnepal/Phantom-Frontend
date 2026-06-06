import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Products – Phantom",
  description: "Explore Phantom's embedded systems, IoT, UAV, and educational products.",
  robots: { index: false, follow: true },
};

export default function ProductPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center max-w-lg mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Product
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          We are developing detailed product information for our embedded systems,
          IoT platforms, UAV solutions, and educational kits. Check back soon.
        </p>
        <Link
          href="/"
          className="inline-block bg-[#0f1e2e] text-white px-6 py-3 rounded-md hover:bg-[#1a3147] transition"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
