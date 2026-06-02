import { buildConfig } from 'payload';
import { withPayload } from '@payloadcms/next/withPayload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { collections } from './payload-src/collections';

export default buildConfig({
  admin: {
    user: 'users',
    meta: {
      titleSuffix: 'Not Just A Stay - Admin',
    },
  },
  plugins: [
    withPayload({
      nextConfig: './next.config.mjs',
    }),
  ],
  db: postgresAdapter({
    pooled: true,
    connectionString: process.env.DATABASE_URL,
  }),
  collections: collections,
  secret: process.env.PAYLOAD_SECRET,
  types: {
    autofill: true,
  },
});
