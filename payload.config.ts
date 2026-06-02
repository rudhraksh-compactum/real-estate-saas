import { buildConfig } from 'payload';
import { nextPlugin } from '@payloadcms/next';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { collections } from './payload/src/collections';

export default buildConfig({
  admin: {
    user: 'users',
    meta: {
      titleSuffix: 'Not Just A Stay - Admin',
    },
  },
  plugins: [
    nextPlugin({
      nextConfig: './next.config.ts',
    }),
  ],
  db: postgresAdapter({}),
  collections: collections,
  secret: process.env.PAYLOAD_SECRET,
  types: {
    autofill: true,
  },
});
