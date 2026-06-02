// POI cache management utilities
// Server-side only - uses Payload CMS API

import { getPayloadInstance } from '@/lib/payload';
import { fetchNearbyPOIs, isCacheExpired } from './client';
import type { POICategory, POIResult } from './types';

const CACHE_TTL_DAYS = 7;

/**
 * Get cached POI data or fetch from Google Places
 *
 * @param propertyId - Property ID to cache POIs for
 * @param lat - Property latitude
 * @param lng - Property longitude
 * @param category - POI category
 * @param radiusMeters - Search radius in meters
 * @returns Array of POI results (from cache or fresh)
 */
export async function getPOIs(
  propertyId: string,
  lat: number,
  lng: number,
  category: POICategory,
  radiusMeters: number = 5000
): Promise<POIResult[]> {
  const payload = await getPayloadInstance();

  // Check cache first
  const cacheEntry = await payload.find({
    collection: 'poi-cache',
    where: {
      property: {
        equals: propertyId,
      },
      poiType: {
        equals: category,
      },
    },
    limit: 1,
  });

  const cached = cacheEntry.docs[0];

  // Return cached data if valid
  if (cached && !isCacheExpired(cached.expiresAt as string)) {
    console.log(`POI cache hit for ${propertyId}/${category}`);
    return (cached.data as POIResult[]) || [];
  }

  // Fetch fresh data from Google Places
  console.log(`POI cache miss for ${propertyId}/${category}, fetching...`);
  const freshData = await fetchNearbyPOIs(lat, lng, category, radiusMeters);

  // Update or create cache entry
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + CACHE_TTL_DAYS);

  if (cached) {
    // Update existing entry
    await payload.update({
      collection: 'poi-cache',
      id: cached.id,
      data: {
        data: freshData,
        centerLat: lat,
        centerLng: lng,
        expiresAt: expiresAt.toISOString(),
      },
    });
  } else {
    // Create new entry
    await payload.create({
      collection: 'poi-cache',
      data: {
        property: propertyId,
        poiType: category,
        centerLat: lat,
        centerLng: lng,
        data: freshData,
        expiresAt: expiresAt.toISOString(),
      },
    });
  }

  return freshData;
}

/**
 * Invalidate POI cache for a property
 * Called when property geolocation changes
 *
 * @param propertyId - Property ID to invalidate
 */
export async function invalidatePOICache(propertyId: string): Promise<void> {
  const payload = await getPayloadInstance();

  await payload.delete({
    collection: 'poi-cache',
    where: {
      property: {
        equals: propertyId,
      },
    },
  });

  console.log(`POI cache invalidated for property ${propertyId}`);
}

/**
 * Get all POI categories for a property
 *
 * @param propertyId - Property ID
 * @param lat - Property latitude
 * @param lng - Property longitude
 * @param radiusMeters - Search radius in meters
 * @returns Object with POIs by category
 */
export async function getAllPOIs(
  propertyId: string,
  lat: number,
  lng: number,
  radiusMeters: number = 5000
): Promise<Record<POICategory, POIResult[]>> {
  const categories: POICategory[] = ['restaurant', 'bar', 'park', 'beach'];

  const results = await Promise.all(
    categories.map((category) => getPOIs(propertyId, lat, lng, category, radiusMeters))
  );

  return {
    restaurant: results[0],
    bar: results[1],
    park: results[2],
    beach: results[3],
  };
}

/**
 * Clean up expired POI cache entries
 * Can be called periodically or via cron job
 */
export async function cleanupExpiredCache(): Promise<number> {
  const payload = await getPayloadInstance();
  const now = new Date().toISOString();

  // Delete all expired entries
  const result = await payload.delete({
    collection: 'poi-cache',
    where: {
      expiresAt: {
        less_than: now,
      },
    },
  });

  console.log(`Cleaned up ${result.docs.length} expired POI cache entries`);
  return result.docs.length;
}
