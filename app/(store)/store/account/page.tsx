import Link from 'next/link';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { getOrdersByUser } from '@/server/db/queries';
import { isAdmin } from '@/lib/admin';
import { formatNpr } from '@/lib/format';
import { SignOutButton } from '@/components/store/sign-out-button';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'My Account', robots: { index: false } };

export default async function AccountPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect('/login');

  const orders = await getOrdersByUser(session.user.id);
  const admin = await isAdmin(session.user.id);

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Account</h1>
          <p className="mt-1 text-sm text-gray-500">
            {session.user.name} · {session.user.email}
          </p>
        </div>
        <div className="flex items-center gap-4">
          {admin && (
            <Link
              href="/admin"
              className="rounded-lg bg-[#0f1e2e] px-3 py-1.5 text-sm font-medium text-white hover:bg-[#1a3147]"
            >
              Admin
            </Link>
          )}
          <SignOutButton />
        </div>
      </div>

      <h2 className="mb-4 mt-10 text-lg font-semibold">Order history</h2>
      {orders.length === 0 ? (
        <p className="text-sm text-gray-500">No orders yet.</p>
      ) : (
        <div className="space-y-3">
          {orders.map((o) => (
            <div
              key={o.id}
              className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3 text-sm"
            >
              <div>
                <span className="font-mono font-medium">{o.orderId}</span>
                <span className="ml-3 text-gray-500">
                  {new Date(o.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs capitalize text-gray-600">
                  {o.status}
                </span>
                <span className="font-medium">{formatNpr(o.totalNpr)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
