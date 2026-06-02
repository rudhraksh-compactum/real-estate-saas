import { cache } from 'react';
import type { PaginatedResponse, Property } from '@/types';

// Demo properties for local development without database
const demoProperties: Property[] = [
  {
    id: '1',
    title: 'Cozy Beachside Apartment',
    description: 'A beautiful apartment with stunning ocean views, perfect for a relaxing getaway. Features modern amenities and easy beach access.',
    shortDescription: 'Beautiful beachfront apartment with modern amenities',
    address: {
      street: '123 Ocean Drive',
      city: 'Goa',
      state: 'Maharashtra',
      zipCode: '403001',
      country: 'India',
    },
    geolocation: { lat: 15.4989, lng: 73.8318 },
    bhkType: '2_bhk',
    nightlyPrice: 3500,
    currency: 'INR',
    amenities: ['wifi', 'ac', 'kitchen', 'parking', 'tv'],
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      alt: 'Beachside apartment',
    },
    gallery: [
      { url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800', alt: 'Living room' },
      { url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800', alt: 'Bedroom' },
      { url: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800', alt: 'Kitchen' },
    ],
    status: 'published',
  },
  {
    id: '2',
    title: 'Mountain View Villa',
    description: 'Escape to this serene villa nestled in the hills. Perfect for nature lovers seeking tranquility and adventure.',
    shortDescription: 'Serene hilltop villa with panoramic mountain views',
    address: {
      street: '456 Hill Road',
      city: 'Mussoorie',
      state: 'Uttarakhand',
      zipCode: '248179',
      country: 'India',
    },
    geolocation: { lat: 30.4710, lng: 78.0767 },
    bhkType: '4_plus_bhk',
    nightlyPrice: 8500,
    currency: 'INR',
    amenities: ['wifi', 'ac', 'pool', 'kitchen', 'parking', 'tv', 'gym'],
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
      alt: 'Mountain villa',
    },
    gallery: [
      { url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800', alt: 'Villa exterior' },
      { url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800', alt: 'Living area' },
    ],
    status: 'published',
  },
  {
    id: '3',
    title: 'Urban Studio Apartment',
    description: 'Modern studio in the heart of the city. Ideal for business travelers and urban explorers.',
    shortDescription: 'Modern city-center studio with excellent connectivity',
    address: {
      street: '789 Business Park',
      city: 'Bangalore',
      state: 'Karnataka',
      zipCode: '560001',
      country: 'India',
    },
    geolocation: { lat: 12.9716, lng: 77.5946 },
    bhkType: 'studio',
    nightlyPrice: 2500,
    currency: 'INR',
    amenities: ['wifi', 'ac', 'tv', 'parking'],
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      alt: 'Studio apartment',
    },
    gallery: [
      { url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800', alt: 'Studio' },
    ],
    status: 'published',
  },
];

/**
 * Fetch all published properties with pagination
 * Uses React cache() for deduplication during SSR
 */
export const getPublishedProperties = cache(async (options?: {
  limit?: number;
  page?: number;
}): Promise<PaginatedResponse<Property>> => {
  // Return demo data for local development
  const limit = options?.limit ?? 20;
  const page = options?.page ?? 1;
  const start = (page - 1) * limit;
  const end = start + limit;
  const docs = demoProperties.slice(start, end);

  return {
    docs,
    totalDocs: demoProperties.length,
    limit,
    page,
    totalPages: Math.ceil(demoProperties.length / limit),
    pagingCounter: start + 1,
    hasPrevPage: page > 1,
    hasNextPage: end < demoProperties.length,
    prevPage: page > 1 ? page - 1 : null,
    nextPage: end < demoProperties.length ? page + 1 : null,
  } as unknown as PaginatedResponse<Property>;
});

/**
 * Fetch featured properties for home page display
 * Limited to 6 properties for performance
 */
export const getFeaturedProperties = cache(async (): Promise<Property[]> => {
  // Return demo data for local development
  return demoProperties.slice(0, 6);
});

/**
 * Fetch a single property by slug
 */
export const getPropertyBySlug = cache(async (slug: string): Promise<Property | null> => {
  // Simple slug to title conversion for demo
  const titleFromSlug = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const property = demoProperties.find(
    p => p.title.toLowerCase().replace(/\s+/g, '-') === slug ||
         p.title.toLowerCase().includes(titleFromSlug.toLowerCase()) ||
         p.id === slug
  );

  return property ?? null;
});

/**
 * Fetch properties filtered by BHK type
 */
export const getPropertiesByBHKType = cache(async (bhkType: string): Promise<Property[]> => {
  return demoProperties.filter(p => p.bhkType === bhkType);
});
