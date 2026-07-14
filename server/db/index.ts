import { drizzle, type NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

export { schema };

type DB = NeonHttpDatabase<typeof schema>;

let _db: DB | null = null;

function getDb(): DB {
  if (_db) return _db;
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL is not set');
  }
  _db = drizzle(neon(connectionString), { schema });
  return _db;
}

// Lazy proxy: the Neon client is only created on first query, so importing this
// module (e.g. during `next build`) never requires DATABASE_URL to be present.
export const db = new Proxy({} as DB, {
  get(_target, prop) {
    const instance = getDb();
    const value = instance[prop as keyof DB];
    return typeof value === 'function' ? value.bind(instance) : value;
  },
});
