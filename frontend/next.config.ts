import { withPayload } from '@payloadcms/next';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable standalone output for Docker
  output: 'standalone',

  // Transpile Payload packages
  transpilePackages: ['payload', '@payloadcms/next'],

  // Image optimization
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
};

export default withPayload(nextConfig);
