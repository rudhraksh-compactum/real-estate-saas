import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { collections } from './payload-src/collections';

// Payload config for Vercel deployment
export default buildConfig({
  admin: {
    meta: {
      titleSuffix: 'Not Just A Stay - Admin',
    },
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
      connectionTimeoutMillis: 20000,
      idleTimeoutMillis: 30000,
      max: 10,
    },
  }),
  collections: collections,
  secret: process.env.PAYLOAD_SECRET || 'fallback-secret-change-in-production',
});
