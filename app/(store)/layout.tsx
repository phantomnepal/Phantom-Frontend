import type { Metadata } from 'next';
import { CartProvider } from '@/components/store/cart-context';
import { StoreHeader } from '@/components/store/store-header';
import { StoreFooter } from '@/components/store/store-footer';

export const metadata: Metadata = {
  title: {
    default: 'Phantom Store — Embedded, UAV & Educational Kits',
    template: '%s — Phantom Store',
  },
  description:
    'Buy Phantom flight controllers, educational electronics kits, and embedded hardware. Cash on Delivery across Nepal.',
  metadataBase: new URL('https://store.phantom.com.np'),
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
};

export default function StoreLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col bg-white text-gray-900">
        <StoreHeader />
        <main className="flex-1">{children}</main>
        <StoreFooter />
      </div>
    </CartProvider>
  );
}
