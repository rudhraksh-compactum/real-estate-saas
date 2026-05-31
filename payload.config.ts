import { buildConfig } from 'payload';
import { nextPlugin } from '@payloadcms/next';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { TenantsStub } from './payload/src/collections/TenantsStub';
import { PropertiesStub } from './payload/src/collections/PropertiesStub';

export default buildConfig({
  admin: {
    user: 'users',
    meta: {
      titleSuffix: '- Real Estate SaaS',
    },
  },
  plugins: [
    nextPlugin({
      nextConfig: './next.config.ts',
    }),
  ],
  db: postgresAdapter({}),
  collections: [TenantsStub, PropertiesStub],
  secret: process.env.PAYLOAD_SECRET,
  types: {
    autofill: true,
  },
});
