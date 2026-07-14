import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { Resend } from 'resend';
import { db } from '@/server/db';
import { orders, orderItems } from '@/server/db/schema';
import { getProductsByIds } from '@/server/db/queries';
import { auth } from '@/lib/auth';
import { formatNpr } from '@/lib/format';
import { MAX_QTY_PER_LINE } from '@/lib/cart-limits';

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'info@phantom.com.np';
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev';

interface IncomingItem {
  productId: number;
  qty: number;
}

function generateOrderId(): string {
  const t = Date.now().toString(36).toUpperCase().slice(-5);
  const r = Math.random().toString(36).toUpperCase().slice(2, 5);
  return `PH-${t}-${r}`;
}

/** Escape user-supplied text before interpolating into the notification email HTML. */
function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Best-effort in-memory per-IP rate limit (per server instance; not durable
// across serverless cold starts — a shared store would be needed at scale).
const RATE_LIMIT = 5; // orders
const RATE_WINDOW_MS = 60_000; // per minute
const orderHits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (orderHits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  hits.push(now);
  orderHits.set(ip, hits);
  return hits.length > RATE_LIMIT;
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';
    if (rateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many orders. Please wait a minute and try again.' },
        { status: 429 },
      );
    }

    const body = await request.json();
    const items: IncomingItem[] = Array.isArray(body.items) ? body.items : [];
    const c = body.customer ?? {};

    // --- Validate customer ---
    const name = String(c.name ?? '').trim();
    const phone = String(c.phone ?? '').trim();
    const city = String(c.city ?? '').trim();
    const address = String(c.address ?? '').trim();
    const notes = c.notes ? String(c.notes).trim() : null;

    if (!name || !phone || !city || !address) {
      return NextResponse.json(
        { error: 'Name, phone, city, and address are required.' },
        { status: 400 },
      );
    }
    if (!/^\d{10}$/.test(phone.replace(/[\s-]/g, ''))) {
      return NextResponse.json(
        { error: 'Enter a valid 10-digit phone number.' },
        { status: 400 },
      );
    }
    if (items.length === 0) {
      return NextResponse.json({ error: 'Your cart is empty.' }, { status: 400 });
    }

    // --- Recompute from DB (never trust client prices) ---
    const ids = [...new Set(items.map((i) => Number(i.productId)))];
    const dbProducts = await getProductsByIds(ids);
    const byId = new Map(dbProducts.map((p) => [p.id, p]));

    const lines: { productId: number; qty: number; unitPriceNpr: number }[] = [];
    for (const item of items) {
      const qty = Math.floor(Number(item.qty));
      const product = byId.get(Number(item.productId));
      if (!product) {
        return NextResponse.json(
          { error: 'One or more products are no longer available.' },
          { status: 400 },
        );
      }
      if (product.stock === 'out-of-stock') {
        return NextResponse.json(
          { error: `${product.title} is out of stock.` },
          { status: 400 },
        );
      }
      if (!Number.isFinite(qty) || qty <= 0) {
        return NextResponse.json(
          { error: 'Invalid quantity.' },
          { status: 400 },
        );
      }
      if (qty > MAX_QTY_PER_LINE) {
        return NextResponse.json(
          { error: `Maximum ${MAX_QTY_PER_LINE} per item. Contact us for bulk orders.` },
          { status: 400 },
        );
      }
      lines.push({ productId: product.id, qty, unitPriceNpr: product.priceNpr });
    }

    const totalNpr = lines.reduce((s, l) => s + l.unitPriceNpr * l.qty, 0);

    // --- Session (optional; guest allowed) ---
    const session = await auth.api.getSession({ headers: request.headers });
    const userId = session?.user.id ?? null;

    // --- Persist (neon-http has no interactive tx; insert order then items) ---
    const orderId = generateOrderId();
    const [orderRow] = await db
      .insert(orders)
      .values({
        orderId,
        userId,
        name,
        phone,
        city,
        address,
        notes,
        totalNpr,
        status: 'pending',
      })
      .returning({ id: orders.id });

    try {
      await db.insert(orderItems).values(
        lines.map((l) => ({
          orderId: orderRow.id,
          productId: l.productId,
          qty: l.qty,
          unitPriceNpr: l.unitPriceNpr,
        })),
      );
    } catch (itemsErr) {
      // neon-http has no transaction: if the items insert fails, roll back the
      // order row by hand so we don't leave an order with no line items.
      await db.delete(orders).where(eq(orders.id, orderRow.id)).catch(() => {});
      throw itemsErr;
    }

    // --- Notify (best-effort; don't fail the order if email fails) ---
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const rows = lines
        .map((l) => {
          const p = byId.get(l.productId)!;
          return `<tr><td>${esc(p.title)}</td><td>${l.qty}</td><td>${formatNpr(
            l.unitPriceNpr * l.qty,
          )}</td></tr>`;
        })
        .join('');
      await resend.emails.send({
        from: FROM_EMAIL,
        to: TO_EMAIL,
        subject: `[Phantom Store] New order ${orderId} — ${formatNpr(totalNpr)}`,
        html: `
          <h2>New Store Order — ${orderId}</h2>
          <p><strong>Customer:</strong> ${esc(name)} (${esc(phone)})</p>
          <p><strong>Deliver to:</strong> ${esc(address)}, ${esc(city)}</p>
          ${notes ? `<p><strong>Notes:</strong> ${esc(notes)}</p>` : ''}
          <p><strong>Account:</strong> ${userId ? esc(session!.user.email) : 'Guest'}</p>
          <table border="1" cellpadding="6" cellspacing="0">
            <tr><th>Product</th><th>Qty</th><th>Total</th></tr>
            ${rows}
          </table>
          <p><strong>Order total:</strong> ${formatNpr(totalNpr)} (Cash on Delivery)</p>
        `,
      });
    } catch (mailErr) {
      console.error('Order email failed:', mailErr);
    }

    return NextResponse.json({ ok: true, orderId });
  } catch (err) {
    console.error('POST /api/orders error:', err);
    return NextResponse.json(
      { error: 'Something went wrong placing your order.' },
      { status: 500 },
    );
  }
}
