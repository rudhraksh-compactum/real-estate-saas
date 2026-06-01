import { getPayload } from 'payload';

// Payload singleton for server-side usage
// Client-side should use REST API directly

let cachedPayload: ReturnType<typeof getPayload> | null = null;

export const getPayloadInstance = async () => {
  if (cachedPayload) {
    return cachedPayload;
  }

  cachedPayload = getPayload({
    // Payload will read config from payload.config.ts at project root
    // Next.js uses process.env.NODE_ENV (not import.meta.env.MODE which is Vite-specific)
    config: process.env.NODE_ENV === 'production'
      ? (await import('@/../../payload.config')).default
      : undefined,
  });

  return cachedPayload;
};

// Helper for server components and API routes
export const getServerPayload = async () => {
  return getPayloadInstance();
};
