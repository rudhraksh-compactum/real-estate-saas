import { cache } from 'react';
import { getPayloadInstance } from '@/lib/payload';
import type { PaginatedResponse, Property } from '@/types';

/**
 * Fetch all published properties with pagination
 * Uses React cache() for deduplication during SSR
 */
export const getPublishedProperties = cache(async (options?: {
  limit?: number;
  page?: number;
}): Promise<PaginatedResponse<Property>> => {
  const payload = await getPayloadInstance();
  const result = await payload.find({
    collection: 'properties',
    where: { status: { equals: 'published' } },
    limit: options?.limit ?? 20,
    page: options?.page ?? 1,
    depth: 2,
  });
  return result as unknown as PaginatedResponse<Property>;
});

/**
 * Fetch featured properties for home page display
 * Limited to 6 properties for performance
 */
export const getFeaturedProperties = cache(async (): Promise<Property[]> => {
  const payload = await getPayloadInstance();
  const result = await payload.find({
    collection: 'properties',
    where: { status: { equals: 'published' } },
    limit: 6,
    depth: 2,
  });
  return result.docs as unknown as Property[];
});

/**
 * Fetch a single property by slug
 */
export const getPropertyBySlug = cache(async (slug: string): Promise<Property | null> => {
  const payload = await getPayloadInstance();
  const result = await payload.find({
    collection: 'properties',
    where: { slug: { equals: slug }, status: { equals: 'published' } },
    limit: 1,
    depth: 3,
  });
  return (result.docs[0] as unknown as Property) ?? null;
});

/**
 * Fetch properties filtered by BHK type
 */
export const getPropertiesByBHKType = cache(async (bhkType: string): Promise<Property[]> => {
  const payload = await getPayloadInstance();
  const result = await payload.find({
    collection: 'properties',
    where: {
      status: { equals: 'published' },
      bhkType: { equals: bhkType },
    },
    limit: 20,
    depth: 2,
  });
  return result.docs as unknown as Property[];
});
