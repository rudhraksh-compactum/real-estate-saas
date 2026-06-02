import { cache } from 'react';
import type { PaginatedResponse, Property } from '@/types';

// Real properties from Not Just A Stay - North Goa Luxury Villas
const demoProperties: Property[] = [
  {
    id: 'villa-solace',
    title: 'Villa Solace',
    slug: 'villa-solace',
    description: 'A stunning 4-bedroom luxury villa nestled in the heart of Assagao, North Goa. Villa Solace offers the perfect blend of modern amenities and traditional Goan charm. Wake up to lush green views, cool off in your private pool, and enjoy sunsets from the rooftop terrace. Just minutes from world-famous beaches like Ashwem and Morjim.',
    shortDescription: 'Luxurious 4BR pool villa in peaceful Assagao, perfect for families and groups seeking privacy and comfort.',
    address: {
      street: 'H. No. 596, Village Road',
      locality: 'Assagao',
      city: 'Mapusa',
      state: 'Goa',
      zipCode: '403507',
      country: 'India',
    },
    geolocation: { lat: 15.6128, lng: 73.8389 },
    bhkType: '4_bhk',
    nightlyPrice: 18000,
    currency: 'INR',
    maxGuests: 12,
    bedrooms: 4,
    bathrooms: 4,
    amenities: ['private-pool', 'wifi', 'ac', 'kitchen', 'parking', 'tv', 'air-conditioning', 'hot-water', 'linens', 'towels', 'toiletries', 'coffee-machine', 'bbq', 'rooftop-terrace', 'garden', 'security', 'daily-housekeeping'],
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200',
      alt: 'Villa Solace - Private Pool',
    },
    gallery: [
      { url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200', alt: 'Villa Solace - Private Pool' },
      { url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200', alt: 'Living Room' },
      { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200', alt: 'Master Bedroom' },
      { url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200', alt: 'Modern Kitchen' },
      { url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200', alt: 'Bathroom' },
    ],
    status: 'published',
  },
  {
    id: 'rosa-blanca',
    title: 'Rosa Blanca',
    slug: 'rosa-blanca',
    description: 'An exquisite 5-bedroom Portuguese-style villa in the serene village of Anjuna. Rosa Blanca seamlessly blends colonial architecture with contemporary luxury. The property features a massive garden, stunning infinity pool, and breathtaking views of the Goan countryside. Perfect for celebrations, retreats, or a memorable family vacation.',
    shortDescription: 'Stunning 5BR Portuguese villa with infinity pool and lush gardens in charming Anjuna.',
    address: {
      street: 'H. No. 1234, St. Anthony Colony',
      locality: 'Anjuna',
      city: 'Mapusa',
      state: 'Goa',
      zipCode: '403509',
      country: 'India',
    },
    geolocation: { lat: 15.6561, lng: 73.7432 },
    bhkType: '5_bhk',
    nightlyPrice: 25000,
    currency: 'INR',
    maxGuests: 15,
    bedrooms: 5,
    bathrooms: 5,
    amenities: ['infinity-pool', 'wifi', 'ac', 'kitchen', 'parking', 'tv', 'air-conditioning', 'hot-water', 'linens', 'towels', 'toiletries', 'coffee-machine', 'bbq', 'garden', 'security', 'daily-housekeeping', 'chef', 'pool-table', 'outdoor-dining'],
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200',
      alt: 'Rosa Blanca - Villa Exterior',
    },
    gallery: [
      { url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200', alt: 'Rosa Blanca - Villa Exterior' },
      { url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200', alt: 'Infinity Pool' },
      { url: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200', alt: 'Grand Living Room' },
      { url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200', alt: 'Bedroom with Balcony' },
      { url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200', alt: 'Luxury Bathroom' },
    ],
    status: 'published',
  },
  {
    id: 'nova-solace',
    title: 'Nova Solace',
    slug: 'nova-solace',
    description: 'A contemporary 3-bedroom villa in the trending locale of Chapora. Nova Solace offers sleek modern design with floor-to-ceiling windows that flood the space with natural light. The open-plan living area flows seamlessly to a private garden and plunge pool. Walking distance to the famous Chapora Fort and Vagator beach.',
    shortDescription: 'Modern 3BR villa with plunge pool near Chapora Fort and Vagator Beach.',
    address: {
      street: 'H. No. 789, Chapora Fort Road',
      locality: 'Vagator',
      city: 'Mapusa',
      state: 'Goa',
      zipCode: '403516',
      country: 'India',
    },
    geolocation: { lat: 15.5933, lng: 73.7435 },
    bhkType: '3_bhk',
    nightlyPrice: 14000,
    currency: 'INR',
    maxGuests: 8,
    bedrooms: 3,
    bathrooms: 3,
    amenities: ['plunge-pool', 'wifi', 'ac', 'kitchen', 'parking', 'tv', 'air-conditioning', 'hot-water', 'linens', 'towels', 'toiletries', 'coffee-machine', 'garden', 'security'],
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200',
      alt: 'Nova Solace - Modern Exterior',
    },
    gallery: [
      { url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200', alt: 'Nova Solace - Modern Exterior' },
      { url: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200', alt: 'Open Living Space' },
      { url: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200', alt: 'Bedroom' },
      { url: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200', alt: 'Garden Area' },
    ],
    status: 'published',
  },
  {
    id: 'luna-blanca',
    title: 'Luna Blanca',
    slug: 'luna-blanca',
    description: 'A magnificent 4-bedroom luxury retreat in the peaceful village of Siolim. Luna Blanca features a stunning rectangular pool, traditional Goan architecture with modern interiors, and a serene atmosphere perfect for relaxation. The villa is staffed with a cook and housekeeper for a truly carefree experience. Close to both beach towns and local markets.',
    shortDescription: 'Elegant 4BR villa with private pool, cook, and housekeeper in tranquil Siolim.',
    address: {
      street: 'H. No. 456, Main Market Road',
      locality: 'Siolim',
      city: 'Mapusa',
      state: 'Goa',
      zipCode: '403517',
      country: 'India',
    },
    geolocation: { lat: 15.6289, lng: 73.7896 },
    bhkType: '4_bhk',
    nightlyPrice: 16500,
    currency: 'INR',
    maxGuests: 10,
    bedrooms: 4,
    bathrooms: 4,
    amenities: ['private-pool', 'wifi', 'ac', 'kitchen', 'parking', 'tv', 'air-conditioning', 'hot-water', 'linens', 'towels', 'toiletries', 'coffee-machine', 'bbq', 'garden', 'security', 'daily-housekeeping', 'cook', 'outdoor-shower'],
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200',
      alt: 'Luna Blanca - Pool View',
    },
    gallery: [
      { url: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200', alt: 'Luna Blanca - Pool View' },
      { url: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200', alt: 'Living Room' },
      { url: 'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=1200', alt: 'Bedroom' },
      { url: 'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=1200', alt: 'Poolside' },
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
  return demoProperties.slice(0, 6);
});

/**
 * Fetch a single property by slug
 */
export const getPropertyBySlug = cache(async (slug: string): Promise<Property | null> => {
  const property = demoProperties.find(
    p => p.id === slug || p.slug === slug ||
         p.title.toLowerCase().replace(/\s+/g, '-').includes(slug.toLowerCase())
  );
  return property ?? null;
});

/**
 * Fetch properties filtered by BHK type
 */
export const getPropertiesByBHKType = cache(async (bhkType: string): Promise<Property[]> => {
  return demoProperties.filter(p => p.bhkType === bhkType);
});
