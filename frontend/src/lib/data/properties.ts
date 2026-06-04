import { cache } from 'react';
import { getPayload } from 'payload';
import configPromise from '../../../payload.config';
import type { PaginatedResponse, Property } from '@/types';

// Payload singleton for server-side use
let payloadInstance: Awaited<ReturnType<typeof getPayload>> | null = null;

async function getPayloadInstance() {
  if (!payloadInstance) {
    payloadInstance = await getPayload({ config: configPromise });
  }
  return payloadInstance;
}

/**
 * Fetch all published properties with pagination
 * Uses React cache() for deduplication during SSR
 */
export const getPublishedProperties = cache(async (options?: {
  limit?: number;
  page?: number;
}): Promise<PaginatedResponse<Property>> => {
  const limit = options?.limit ?? 20;
  const page = options?.page ?? 1;

  try {
    const payload = await getPayloadInstance();

    // For demo: show all properties regardless of status
    const result = await payload.find({
      collection: 'properties',
      limit,
      page,
      sort: '-createdAt',
    });

    return result as unknown as PaginatedResponse<Property>;
  } catch (error) {
    console.error('Error fetching properties from Payload:', error);
    // Return empty result on error
    return {
      docs: [],
      totalDocs: 0,
      limit,
      page,
      totalPages: 0,
      pagingCounter: 0,
      hasPrevPage: false,
      hasNextPage: false,
      prevPage: null,
      nextPage: null,
    };
  }
});

/**
 * Fetch featured properties for home page display
 * Limited to 6 properties for performance
 */
export const getFeaturedProperties = cache(async (): Promise<Property[]> => {
  try {
    const payload = await getPayloadInstance();

    // For demo: show all properties regardless of status
    const result = await payload.find({
      collection: 'properties',
      limit: 6,
      sort: '-createdAt',
    });

    return result.docs as unknown as Property[];
  } catch (error) {
    console.error('Error fetching featured properties:', error);
    return [];
  }
});

/**
 * Fetch a single property by slug
 * Note: Payload generates slug from title field
 */
export const getPropertyBySlug = cache(async (slug: string): Promise<Property | null> => {
  try {
    const payload = await getPayloadInstance();

    // Convert URL slug to title format (e.g., "luna-blanca" -> "Luna Blanca")
    const titleFromSlug = slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');

    const result = await payload.find({
      collection: 'properties',
      where: {
        or: [
          // Match by title (Payload generates slug from title)
          { title: { equals: titleFromSlug } },
          // Match by generated slug
          { slug: { equals: slug } },
          // Match by URL-safe version of title
          { title: { like: slug.replace(/-/g, ' ') } },
        ],
      },
      limit: 1,
    });

    if (result.docs.length === 0) {
      return null;
    }

    return result.docs[0] as unknown as Property;
  } catch (error) {
    console.error('Error fetching property by slug:', error);
    return null;
  }
});

/**
 * Fetch properties filtered by BHK type
 */
export const getPropertiesByBHKType = cache(async (bhkType: string): Promise<Property[]> => {
  try {
    const payload = await getPayloadInstance();

    const result = await payload.find({
      collection: 'properties',
      where: {
        and: [
          { bhkType: { equals: bhkType } },
          { status: { equals: 'published' } },
        ],
      },
      limit: 50,
      sort: '-createdAt',
    });

    return result.docs as unknown as Property[];
  } catch (error) {
    console.error('Error fetching properties by BHK type:', error);
    return [];
  }
});
