import { config } from 'dotenv';

// Loaded first (before ./index) so DATABASE_URL is present when the db client
// module is evaluated. Import this at the very top of standalone scripts.
config({ path: '.env.local' });
