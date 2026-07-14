'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useCart } from '@/components/store/cart-context';
import { useProducts } from '@/components/store/use-products';
import { useSession } from '@/lib/auth-client';
import { formatNpr } from '@/lib/format';

interface Customer {
  name: string;
  phone: string;
  city: string;
  address: string;
  notes: string;
}

const EMPTY: Customer = { name: '', phone: '', city: '', address: '', notes: '' };

export default function CheckoutPage() {
  const { lines, clear, hydrated } = useCart();
  const { byId, loading } = useProducts();
  const { data: session } = useSession();

  const [form, setForm] = useState<Customer>(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  // Saved-address autofill for logged-in users.
  useEffect(() => {
    if (!session) return;
    fetch('/api/orders/last-address')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d?.address) {
          setForm((f) => ({
            ...f,
            name: d.address.name ?? session.user.name ?? '',
            phone: d.address.phone ?? '',
            city: d.address.city ?? '',
            address: d.address.address ?? '',
          }));
        } else {
          setForm((f) => ({ ...f, name: session.user.name ?? '' }));
        }
      })
      .catch(() => {});
  }, [session]);

  const items = lines
    .map((l) => ({ line: l, product: byId.get(l.productId) }))
    .filter((x) => x.product);
  const total = items.reduce(
    (s, x) => s + x.product!.priceNpr * x.line.qty,
    0,
  );

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: lines.map((l) => ({ productId: l.productId, qty: l.qty })),
          customer: form,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Something went wrong.');
        return;
      }
      clear();
      setOrderId(data.orderId);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (orderId) {
    return (
      <div className="mx-auto max-w-lg px-6 py-24 text-center">
        <h1 className="text-2xl font-bold">Order placed 🎉</h1>
        <p className="mt-4 text-gray-600">
          Your order ID is{' '}
          <span className="font-mono font-semibold">{orderId}</span>. We&apos;ll
          call to confirm delivery. Payment is Cash on Delivery.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-full bg-[#0f1e2e] px-6 py-3 text-sm font-medium text-white hover:bg-[#1a3147]"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  if (!hydrated || loading) {
    return <div className="mx-auto max-w-4xl px-6 py-16 text-gray-500">Loading…</div>;
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-6 py-24 text-center">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <Link href="/" className="mt-6 inline-block text-[#0f1e2e] underline">
          Browse products
        </Link>
      </div>
    );
  }

  const field =
    'w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#0f1e2e] focus:outline-none';

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="mb-8 text-2xl font-bold">Checkout</h1>
      {!session && (
        <p className="mb-6 rounded-lg bg-gray-50 px-4 py-3 text-sm text-gray-600">
          Checking out as guest.{' '}
          <Link href="/login" className="text-[#0f1e2e] underline">
            Sign in
          </Link>{' '}
          to save your details for next time.
        </p>
      )}

      <div className="grid gap-10 md:grid-cols-[1fr_360px]">
        {/* Delivery form */}
        <form onSubmit={submit} className="space-y-4">
          <h2 className="font-semibold">Delivery details (Cash on Delivery)</h2>
          <input
            required
            aria-label="Full name"
            placeholder="Full name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={field}
          />
          <input
            required
            type="tel"
            aria-label="Phone number"
            placeholder="Phone number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className={field}
          />
          <input
            required
            aria-label="City"
            placeholder="City"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            className={field}
          />
          <textarea
            required
            aria-label="Delivery address"
            placeholder="Delivery address"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className={field}
            rows={3}
          />
          <textarea
            aria-label="Order notes (optional)"
            placeholder="Order notes (optional)"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            className={field}
            rows={2}
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-[#0f1e2e] px-6 py-3 text-sm font-medium text-white hover:bg-[#1a3147] disabled:opacity-60"
          >
            {submitting ? 'Placing order…' : `Place order · ${formatNpr(total)}`}
          </button>
        </form>

        {/* Summary */}
        <div className="h-fit rounded-xl border border-gray-200 p-6">
          <h2 className="mb-4 font-semibold">Order summary</h2>
          <div className="space-y-3">
            {items.map(({ line, product }) => (
              <div key={line.productId} className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {product!.title} × {line.qty}
                </span>
                <span>{formatNpr(product!.priceNpr * line.qty)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between border-t border-gray-200 pt-4 font-bold">
            <span>Total</span>
            <span>{formatNpr(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
