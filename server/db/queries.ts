import 'server-only';
import { eq, inArray, desc } from 'drizzle-orm';
import { db } from './index';
import { user, products, orders, orderItems, type Product, type Order } from './schema';

/** The authorization role for a user id, or undefined if the user doesn't exist. */
export async function getUserRole(userId: string): Promise<string | undefined> {
  const rows = await db
    .select({ role: user.role })
    .from(user)
    .where(eq(user.id, userId))
    .limit(1);
  return rows[0]?.role;
}

export async function getAllProducts(): Promise<Product[]> {
  return db.select().from(products).orderBy(products.id);
}

export async function getProductBySlug(
  slug: string,
): Promise<Product | undefined> {
  const rows = await db
    .select()
    .from(products)
    .where(eq(products.slug, slug))
    .limit(1);
  return rows[0];
}

export async function getProductsByIds(ids: number[]): Promise<Product[]> {
  if (ids.length === 0) return [];
  return db.select().from(products).where(inArray(products.id, ids));
}

export async function getOrdersByUser(userId: string): Promise<Order[]> {
  return db
    .select()
    .from(orders)
    .where(eq(orders.userId, userId))
    .orderBy(desc(orders.createdAt));
}

export async function getLastOrderByUser(
  userId: string,
): Promise<Order | undefined> {
  const rows = await db
    .select()
    .from(orders)
    .where(eq(orders.userId, userId))
    .orderBy(desc(orders.createdAt))
    .limit(1);
  return rows[0];
}

export async function getOrderItems(orderRowId: number) {
  return db.select().from(orderItems).where(eq(orderItems.orderId, orderRowId));
}

// --- Admin / fulfillment ---
export const ORDER_STATUSES = [
  'pending',
  'shipped',
  'delivered',
  'cancelled',
] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export interface OrderWithItems extends Order {
  items: { title: string; qty: number; unitPriceNpr: number }[];
}

/** All orders (newest first) with their line items + product titles, for admin. */
export async function getAllOrdersWithItems(): Promise<OrderWithItems[]> {
  const os = await db.select().from(orders).orderBy(desc(orders.createdAt));
  if (os.length === 0) return [];

  const ids = os.map((o) => o.id);
  const items = await db
    .select({
      orderId: orderItems.orderId,
      qty: orderItems.qty,
      unitPriceNpr: orderItems.unitPriceNpr,
      title: products.title,
    })
    .from(orderItems)
    .innerJoin(products, eq(orderItems.productId, products.id))
    .where(inArray(orderItems.orderId, ids));

  const byOrder = new Map<number, OrderWithItems['items']>();
  for (const it of items) {
    const arr = byOrder.get(it.orderId) ?? [];
    arr.push({ title: it.title, qty: it.qty, unitPriceNpr: it.unitPriceNpr });
    byOrder.set(it.orderId, arr);
  }

  return os.map((o) => ({ ...o, items: byOrder.get(o.id) ?? [] }));
}

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus,
): Promise<void> {
  await db.update(orders).set({ status }).where(eq(orders.orderId, orderId));
}
