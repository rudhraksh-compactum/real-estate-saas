import { buildConfig } from 'payload';
import { withPayload } from '@payloadcms/next/withPayload';
import { sqliteAdapter } from '@payloadcms/db-sqlite';
import { collections } from './payload/src/collections';

export default buildConfig({
  admin: {
    user: 'users',
    meta: {
      titleSuffix: 'Not Just A Stay - Admin',
    },
  },
  plugins: [
    withPayload({
      nextConfig: './frontend/next.config.mjs',
    }),
  ],
  db: sqliteAdapter({
    client: {
      url: 'file:./payload-data.db',
    },
  }),
  collections: collections,
  secret: process.env.PAYLOAD_SECRET || 'fallback-secret-for-dev',
  types: {
    autofill: true,
  },
});
