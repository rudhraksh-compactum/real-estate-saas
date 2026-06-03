import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { collections } from './payload-src/collections';

export default buildConfig({
  admin: {
    user: 'users',
    meta: {
      titleSuffix: 'Not Just A Stay - Admin',
    },
  },
  db: postgresAdapter({
    pool: {
      connectionTimeoutMillis: 20000,
      idleTimeoutMillis: 30000,
      max: 10,
    },
    push: process.env.NODE_ENV === 'development',
  }),
  collections: collections,
  secret: process.env.PAYLOAD_SECRET || 'fallback-secret-change-in-production',
});
