import { buildConfig } from 'payload';
import { nextPlugin } from '@payloadcms/next';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { TenantsStub } from './payload/src/collections/TenantsStub';
import { PropertiesStub } from './payload/src/collections/PropertiesStub';
import { Media } from './payload/src/collections/Media';
import { Leads } from './payload/src/collections/Leads';

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
  collections: [TenantsStub, PropertiesStub, Media, Leads],
  secret: process.env.PAYLOAD_SECRET,
  types: {
    autofill: true,
  },
});
