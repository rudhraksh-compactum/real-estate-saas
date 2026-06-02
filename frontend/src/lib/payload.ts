import { getPayload } from 'payload';
import configPromise from '../../payload.config';

// Payload singleton for server-side usage
// Client-side should use REST API directly

let cachedPayload: ReturnType<typeof getPayload> | null = null;

export const getPayloadInstance = async () => {
  if (cachedPayload) {
    return cachedPayload;
  }

  // Always pass config for Next.js integration
  cachedPayload = getPayload({
    config: await configPromise,
  });

  return cachedPayload;
};

// Helper for server components and API routes
export const getServerPayload = async () => {
  return getPayloadInstance();
};
