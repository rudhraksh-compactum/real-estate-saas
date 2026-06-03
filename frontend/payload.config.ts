import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { collections } from './payload-src/collections';

// Pool config type from pg
interface PoolConfig {
  connectionString?: string;
  connectionTimeoutMillis?: number;
  idleTimeoutMillis?: number;
  max?: number;
  [key: string]: unknown;
}

// Minimal Payload config for Vercel deployment
export default buildConfig({
  admin: {
    meta: {
      titleSuffix: 'Not Just A Stay - Admin',
    },
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
      max: 10,
    } as PoolConfig,
  }),
  collections: collections,
  secret: process.env.PAYLOAD_SECRET || 'fallback-secret-change-in-production',
});
