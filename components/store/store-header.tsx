'use client';

import Link from 'next/link';
import { ShoppingCart, User } from 'lucide-react';
import { useCart } from './cart-context';
import { useSession } from '@/lib/auth-client';

export function StoreHeader() {
  const { count, hydrated } = useCart();
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white">
      <div className="bg-[#0f1e2e] py-2 text-center text-xs text-white">
        Nationwide delivery across Nepal · Cash on Delivery
      </div>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="text-xl font-bold tracking-tight text-[#0f1e2e]">
          PHANTOM<span className="text-gray-400"> Store</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-gray-700 md:flex">
          <Link href="/" className="hover:text-[#0f1e2e]">
            Shop
          </Link>
          <Link href="/#bulk" className="hover:text-[#0f1e2e]">
            Bulk Enquiry
          </Link>
          <Link href="/faq" className="hover:text-[#0f1e2e]">
            FAQ
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href={session ? '/account' : '/login'}
            className="flex items-center gap-1.5 text-sm text-gray-700 hover:text-[#0f1e2e]"
          >
            <User className="h-5 w-5" />
            <span className="hidden sm:inline">
              {session ? 'Account' : 'Sign in'}
            </span>
          </Link>
          <Link
            href="/cart"
            className="relative flex items-center gap-1.5 text-sm text-gray-700 hover:text-[#0f1e2e]"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="hidden sm:inline">Cart</span>
            {hydrated && count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#0f1e2e] px-1 text-xs text-white">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
