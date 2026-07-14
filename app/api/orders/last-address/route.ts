import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getLastOrderByUser } from '@/server/db/queries';

// Returns the logged-in user's most recent delivery details for checkout autofill.
export async function GET(request: Request) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const last = await getLastOrderByUser(session.user.id);
  if (!last) return NextResponse.json({ address: null });
  return NextResponse.json({
    address: {
      name: last.name,
      phone: last.phone,
      city: last.city,
      address: last.address,
    },
  });
}
