import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';
import { isAdmin } from '@/lib/admin';
import {
  getAllOrdersWithItems,
  updateOrderStatus,
  ORDER_STATUSES,
  type OrderStatus,
} from '@/server/db/queries';
import { formatNpr } from '@/lib/format';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Admin · Orders', robots: { index: false } };

const STATUS_STYLES: Record<OrderStatus, string> = {
  pending: 'bg-amber-100 text-amber-800',
  shipped: 'bg-blue-100 text-blue-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-gray-200 text-gray-600',
};

async function setStatus(formData: FormData) {
  'use server';
  const session = await auth.api.getSession({ headers: await headers() });
  if (!(await isAdmin(session?.user.id))) throw new Error('Forbidden');

  const orderId = String(formData.get('orderId') ?? '');
  const status = String(formData.get('status') ?? '') as OrderStatus;
  if (!orderId || !ORDER_STATUSES.includes(status)) {
    throw new Error('Invalid status update');
  }
  await updateOrderStatus(orderId, status);
  revalidatePath('/store/admin');
}

export default async function AdminOrdersPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect('/login');
  if (!(await isAdmin(session.user.id))) redirect('/');

  const orders = await getAllOrdersWithItems();
  const openCount = orders.filter(
    (o) => o.status === 'pending' || o.status === 'shipped',
  ).length;

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold">Orders</h1>
          <p className="mt-1 text-sm text-gray-500">
            {orders.length} total · {openCount} open
          </p>
        </div>
      </div>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => (
            <div
              key={o.id}
              className="rounded-xl border border-gray-200 p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-semibold">{o.orderId}</span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${STATUS_STYLES[o.status as OrderStatus] ?? 'bg-gray-100 text-gray-600'}`}
                    >
                      {o.status}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(o.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-700">
                    {o.name} · {o.phone}
                  </p>
                  <p className="text-sm text-gray-500">
                    {o.address}, {o.city}
                  </p>
                  {o.notes && (
                    <p className="mt-1 text-sm italic text-gray-500">
                      “{o.notes}”
                    </p>
                  )}
                </div>

                <form action={setStatus} className="flex items-center gap-2">
                  <input type="hidden" name="orderId" value={o.orderId} />
                  <select
                    name="status"
                    defaultValue={o.status}
                    className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm"
                  >
                    {ORDER_STATUSES.map((s) => (
                      <option key={s} value={s} className="capitalize">
                        {s}
                      </option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    className="rounded-lg bg-[#0f1e2e] px-3 py-1.5 text-sm font-medium text-white hover:bg-[#1a3147]"
                  >
                    Update
                  </button>
                </form>
              </div>

              <div className="mt-4 border-t border-gray-100 pt-3">
                <table className="w-full text-sm">
                  <tbody>
                    {o.items.map((it, i) => (
                      <tr key={i} className="text-gray-600">
                        <td className="py-1">{it.title}</td>
                        <td className="py-1 text-center">× {it.qty}</td>
                        <td className="py-1 text-right">
                          {formatNpr(it.unitPriceNpr * it.qty)}
                        </td>
                      </tr>
                    ))}
                    <tr className="border-t border-gray-100 font-semibold">
                      <td className="py-1.5">Total</td>
                      <td />
                      <td className="py-1.5 text-right">
                        {formatNpr(o.totalNpr)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
