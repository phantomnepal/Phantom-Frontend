import Link from 'next/link';

export function StoreFooter() {
  return (
    <footer className="mt-24 border-t border-gray-200 bg-[#0f1e2e] text-gray-300">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <div className="text-lg font-bold text-white">PHANTOM Store</div>
          <p className="mt-2 text-sm text-gray-400">
            Embedded systems, UAV avionics, and educational kits — engineered in
            Kathmandu, Nepal.
          </p>
        </div>
        <div>
          <div className="mb-3 text-sm font-semibold text-white">Shop</div>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-white">All Products</Link></li>
            <li><Link href="/cart" className="hover:text-white">Cart</Link></li>
            <li><Link href="/account" className="hover:text-white">My Orders</Link></li>
          </ul>
        </div>
        <div>
          <div className="mb-3 text-sm font-semibold text-white">Info</div>
          <ul className="space-y-2 text-sm">
            <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
            <li><a href="https://phantom.com.np/contact" className="hover:text-white">Contact</a></li>
            <li><a href="https://phantom.com.np" className="hover:text-white">About Phantom</a></li>
          </ul>
        </div>
        <div>
          <div className="mb-3 text-sm font-semibold text-white">Contact</div>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Kathmandu, Nepal</li>
            <li>info@phantom.com.np</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Phantom. All rights reserved.
      </div>
    </footer>
  );
}
