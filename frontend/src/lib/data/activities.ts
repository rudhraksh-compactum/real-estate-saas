import { cache } from 'react';
import { getPayloadInstance } from '@/lib/payload';
import type { PaginatedResponse } from '@/types';

/**
 * Activity type based on Payload Activities collection
 */
interface Activity {
  id: string;
  title: string;
  slug?: string;
  shortDescription?: string;
  description?: string;
  highlights?: Array<{ highlight: string }>;
  duration?: string;
  groupSize?: { minGuests?: number; maxGuests?: number };
  price: number;
  currency?: string;
  includes?: string;
  cancellationPolicy?: string;
  featuredImage?: { url: string; alt?: string };
  gallery?: Array<{ url: string; alt?: string }>;
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  updatedAt: string;
}

/**
 * Fetch all published activities
 * Uses React cache() to deduplicate requests during SSR
 */
export const getPublishedActivities = cache(async (): Promise<Activity[]> => {
  const payload = await getPayloadInstance();
  const result = await payload.find({
    collection: 'activities',
    where: { status: { equals: 'published' } },
    limit: 50,
    depth: 2,
  });
  return result.docs as unknown as Activity[];
});

/**
 * Fetch a single activity by slug
 * Uses React cache() to deduplicate requests during SSR
 */
export const getActivityBySlug = cache(async (slug: string): Promise<Activity | null> => {
  const payload = await getPayloadInstance();
  const result = await payload.find({
    collection: 'activities',
    where: {
      and: [
        { slug: { equals: slug } },
        { status: { equals: 'published' } },
      ],
    },
    limit: 1,
    depth: 2,
  });
  return (result.docs[0] as unknown as Activity) ?? null;
});

export type { Activity };
