import { withPayload } from '@payloadcms/next/withPayload';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable standalone output for Docker
  output: 'standalone',

  // Transpile Payload packages used by the admin route
  transpilePackages: ['@payloadcms/next', '@payloadcms/ui'],

  // Image optimization
  images: {
    dangerouslyAllowSVG: false,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: 'images.ctfassets.net' },
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: '**.supabase.co' },
    ],
  },
};

export default withPayload(nextConfig);
