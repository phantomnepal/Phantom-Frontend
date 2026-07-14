import { NextResponse } from 'next/server';
import { getAllProducts } from '@/server/db/queries';

// Public catalog for client-side cart/checkout rendering. Prices here are for
// display only; the order API always recomputes from the DB server-side.
export async function GET() {
  try {
    const rows = await getAllProducts();
    const data = rows.map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      priceNpr: p.priceNpr,
      stock: p.stock,
      image: p.images[0] ?? null,
    }));
    return NextResponse.json({ products: data });
  } catch (err) {
    console.error('GET /api/products error:', err);
    return NextResponse.json(
      { error: 'Failed to load products' },
      { status: 500 },
    );
  }
}
