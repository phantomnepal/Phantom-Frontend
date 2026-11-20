import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Engineering – Phantom",
  description: "Explore Phantom's engineering capabilities in embedded hardware, software, and mechanical design.",
  robots: { index: false, follow: true },
};

export default function EngineeringPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center max-w-lg mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Engineering
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          We are preparing detailed information about our engineering capabilities
          including embedded hardware, software development, and 3D mechanical design.
          Check back soon.
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
