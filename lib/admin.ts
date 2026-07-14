import 'server-only';
import { getUserRole } from '@/server/db/queries';

/**
 * True if the given user id has the 'admin' role in the DB.
 *
 * Admin is authorized by a role column set directly in the database — NOT by
 * email — so signing up with an "admin-looking" email grants nothing. Promote a
 * user with:  UPDATE "user" SET role = 'admin' WHERE email = '<email>';
 */
export async function isAdmin(userId?: string | null): Promise<boolean> {
  if (!userId) return false;
  return (await getUserRole(userId)) === 'admin';
}
