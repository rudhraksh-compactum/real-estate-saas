import type { MetadataRoute } from 'next';
import { getPayloadInstance } from '@/lib/payload';

/**
 * Dynamic sitemap generation
 * Fetches all published properties and activities from Payload CMS
 * and generates URLs for search engine indexing
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://notjustastay.com';

  const payload = await getPayloadInstance();

  // Fetch all published properties and activities in parallel
  const [propertiesResult, activitiesResult] = await Promise.all([
    payload.find({
      collection: 'properties',
      where: { status: { equals: 'published' } },
      select: { slug: true, updatedAt: true },
      limit: 1000,
    }),
    payload.find({
      collection: 'activities',
      where: { status: { equals: 'published' } },
      select: { slug: true, updatedAt: true },
      limit: 1000,
    }),
  ]);

  // Generate property URLs
  const propertyUrls: MetadataRoute.Sitemap = propertiesResult.docs.map((p) => ({
    url: `${baseUrl}/properties/${p.slug as string}`,
    lastModified: new Date(p.updatedAt as string),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Generate activity URLs
  const activityUrls: MetadataRoute.Sitemap = activitiesResult.docs.map((a) => ({
    url: `${baseUrl}/activities/${a.slug as string}`,
    lastModified: new Date(a.updatedAt as string),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/properties`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/activities`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  return [...staticPages, ...propertyUrls, ...activityUrls];
}
