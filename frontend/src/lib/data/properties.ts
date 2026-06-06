import { cache } from 'react';
import { getPayload } from 'payload';
import configPromise from '../../../payload.config';
import type { PaginatedResponse, Property } from '@/types';
import type { PropertyMedia } from '@/types';
import { fallbackVillaImage, getImageUrl } from '@/lib/media';

const demoProperties: Property[] = [
  {
    id: 'villa-solace',
    title: 'Villa Solace',
    slug: 'villa-solace',
    description:
      'A refined 4-bedroom private villa in Assagao, made for slow mornings, long lunches, and poolside evenings. The home pairs contemporary comfort with a quiet Goan village setting close to Ashwem, Morjim, and Vagator.',
    shortDescription: 'A private pool villa in peaceful Assagao with generous living spaces and garden views.',
    address: {
      street: 'H. No. 596, Village Road',
      locality: 'Assagao',
      city: 'Mapusa',
      state: 'Goa',
      zipCode: '403507',
      country: 'India',
    },
    geolocation: { lat: 15.6128, lng: 73.8389 },
    bhkType: '4_plus_bhk',
    propertyType: 'villa',
    furnishingStatus: 'furnished',
    nightlyPrice: 18000,
    currency: 'INR',
    maxGuests: 12,
    bedrooms: 4,
    bathrooms: 4,
    amenities: ['pool', 'wifi', 'ac', 'kitchen', 'parking', 'tv', 'garden', 'security', 'terrace'],
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1400&q=85&auto=format&fit=crop',
      alt: 'Villa Solace private pool',
    },
    gallery: [
      { url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1400&q=85&auto=format&fit=crop', alt: 'Private pool' },
      { url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&q=85&auto=format&fit=crop', alt: 'Villa exterior' },
      { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=85&auto=format&fit=crop', alt: 'Living spaces' },
    ],
    status: 'published',
  },
  {
    id: 'rosa-blanca',
    title: 'Rosa Blanca',
    slug: 'rosa-blanca',
    description:
      'A Portuguese-inspired 5-bedroom villa in Anjuna with a large garden, pool, and elegant indoor-outdoor gathering spaces. Designed for families, retreats, and celebrations that need privacy without losing touch with North Goa.',
    shortDescription: 'A Portuguese-style Anjuna villa with an infinity pool, gardens, and grand gathering spaces.',
    address: {
      street: 'H. No. 1234, St. Anthony Colony',
      locality: 'Anjuna',
      city: 'Mapusa',
      state: 'Goa',
      zipCode: '403509',
      country: 'India',
    },
    geolocation: { lat: 15.6561, lng: 73.7432 },
    bhkType: '4_plus_bhk',
    propertyType: 'villa',
    furnishingStatus: 'furnished',
    nightlyPrice: 25000,
    currency: 'INR',
    maxGuests: 15,
    bedrooms: 5,
    bathrooms: 5,
    amenities: ['pool', 'wifi', 'ac', 'kitchen', 'parking', 'tv', 'garden', 'security'],
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&q=85&auto=format&fit=crop',
      alt: 'Rosa Blanca villa exterior',
    },
    gallery: [
      { url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&q=85&auto=format&fit=crop', alt: 'Villa exterior' },
      { url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&q=85&auto=format&fit=crop', alt: 'Pool and terrace' },
      { url: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1400&q=85&auto=format&fit=crop', alt: 'Grand living room' },
    ],
    status: 'published',
  },
  {
    id: 'nova-solace',
    title: 'Nova Solace',
    slug: 'nova-solace',
    description:
      'A modern 3-bedroom villa near Chapora and Vagator, with clean architectural lines, sunlit living spaces, a plunge pool, and a private garden made for easy coastal days.',
    shortDescription: 'A modern Chapora villa with a plunge pool near Vagator beach and the fort.',
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
    propertyType: 'villa',
    furnishingStatus: 'furnished',
    nightlyPrice: 14000,
    currency: 'INR',
    maxGuests: 8,
    bedrooms: 3,
    bathrooms: 3,
    amenities: ['pool', 'wifi', 'ac', 'kitchen', 'parking', 'tv', 'garden'],
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1400&q=85&auto=format&fit=crop',
      alt: 'Nova Solace modern exterior',
    },
    gallery: [
      { url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1400&q=85&auto=format&fit=crop', alt: 'Modern exterior' },
      { url: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1400&q=85&auto=format&fit=crop', alt: 'Open living space' },
      { url: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1400&q=85&auto=format&fit=crop', alt: 'Garden area' },
    ],
    status: 'published',
  },
  {
    id: 'luna-blanca',
    title: 'Luna Blanca',
    slug: 'luna-blanca',
    description:
      'A calm 4-bedroom retreat in Siolim with a rectangular pool, warm interiors, and staff support for a slower, more cared-for stay. Close enough to the beach towns, quiet enough to fully switch off.',
    shortDescription: 'An elegant Siolim villa with a private pool, warm interiors, and a quieter village setting.',
    address: {
      street: 'H. No. 456, Main Market Road',
      locality: 'Siolim',
      city: 'Mapusa',
      state: 'Goa',
      zipCode: '403517',
      country: 'India',
    },
    geolocation: { lat: 15.6289, lng: 73.7896 },
    bhkType: '4_plus_bhk',
    propertyType: 'villa',
    furnishingStatus: 'furnished',
    nightlyPrice: 16500,
    currency: 'INR',
    maxGuests: 10,
    bedrooms: 4,
    bathrooms: 4,
    amenities: ['pool', 'wifi', 'ac', 'kitchen', 'parking', 'tv', 'garden'],
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1400&q=85&auto=format&fit=crop',
      alt: 'Luna Blanca pool view',
    },
    gallery: [
      { url: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1400&q=85&auto=format&fit=crop', alt: 'Pool view' },
      { url: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1400&q=85&auto=format&fit=crop', alt: 'Living room' },
      { url: 'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=1400&q=85&auto=format&fit=crop', alt: 'Bedroom' },
    ],
    status: 'published',
  },
];

let payloadInstance: Awaited<ReturnType<typeof getPayload>> | null = null;

async function getPayloadInstance() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not configured.');
  }

  if (!payloadInstance) {
    payloadInstance = await getPayload({ config: configPromise });
  }

  return payloadInstance;
}

function slugFor(property: Property): string {
  return property.slug || String(property.id);
}

function normalizeMedia(media: unknown): Property['featuredImage'] {
  if (!media || typeof media !== 'object') return undefined;
  const item = media as { id?: string | number; url?: string; alt?: string; filename?: string };
  return {
    id: item.id ? String(item.id) : undefined,
    url: getImageUrl(item.url),
    alt: item.alt,
    filename: item.filename,
  };
}

function isPropertyMedia(media: Property['featuredImage']): media is PropertyMedia {
  return Boolean(media?.url);
}

function normalizeProperty(doc: unknown): Property {
  const property = doc as Property & {
    id: string | number;
    featuredImage?: unknown;
    gallery?: unknown[];
  };

  return {
    ...property,
    id: String(property.id),
    slug: slugFor({ ...property, id: String(property.id) }),
    featuredImage: normalizeMedia(property.featuredImage) || {
      url: fallbackVillaImage,
      alt: property.title,
    },
    gallery: Array.isArray(property.gallery)
      ? property.gallery.map(normalizeMedia).filter(isPropertyMedia)
      : [],
  };
}

function fallbackPage(limit: number, page: number): PaginatedResponse<Property> {
  const start = (page - 1) * limit;
  const docs = demoProperties.slice(start, start + limit);

  return {
    docs,
    totalDocs: demoProperties.length,
    limit,
    page,
    totalPages: Math.ceil(demoProperties.length / limit),
    pagingCounter: start + 1,
    hasPrevPage: page > 1,
    hasNextPage: start + limit < demoProperties.length,
    prevPage: page > 1 ? page - 1 : null,
    nextPage: start + limit < demoProperties.length ? page + 1 : null,
  };
}

export const getPublishedProperties = cache(async (options?: {
  limit?: number;
  page?: number;
}): Promise<PaginatedResponse<Property>> => {
  const limit = options?.limit ?? 20;
  const page = options?.page ?? 1;

  if (!process.env.DATABASE_URL) {
    return fallbackPage(limit, page);
  }

  try {
    const payload = await getPayloadInstance();
    const result = await payload.find({
      collection: 'properties',
      limit,
      page,
      sort: '-createdAt',
      depth: 2,
    });

    if (!result.docs.length) return fallbackPage(limit, page);

    return {
      ...(result as unknown as PaginatedResponse<Property>),
      docs: result.docs.map(normalizeProperty),
    };
  } catch (error) {
    console.error('Error fetching properties from Payload:', error);
    return fallbackPage(limit, page);
  }
});

export const getFeaturedProperties = cache(async (): Promise<Property[]> => {
  const result = await getPublishedProperties({ limit: 6, page: 1 });
  return result.docs;
});

export const getPropertyBySlug = cache(async (slug: string): Promise<Property | null> => {
  if (!process.env.DATABASE_URL) {
    return (
      demoProperties.find(
        (property) =>
          property.id === slug ||
          property.slug === slug ||
          property.title.toLowerCase().replace(/\s+/g, '-') === slug.toLowerCase(),
      ) ?? null
    );
  }

  try {
    const payload = await getPayloadInstance();
    const isNumericId = /^\d+$/.test(slug);
    const result = await payload.find({
      collection: 'properties',
      where: isNumericId
        ? { id: { equals: Number(slug) } }
        : { title: { like: slug.replace(/-/g, ' ') } },
      limit: 1,
      depth: 2,
    });

    if (result.docs[0]) return normalizeProperty(result.docs[0]);
  } catch (error) {
    console.error('Error fetching property by slug:', error);
  }

  return (
    demoProperties.find(
      (property) =>
        property.id === slug ||
        property.slug === slug ||
        property.title.toLowerCase().replace(/\s+/g, '-') === slug.toLowerCase(),
    ) ?? null
  );
});

export const getPropertiesByBHKType = cache(async (bhkType: string): Promise<Property[]> => {
  const result = await getPublishedProperties({ limit: 100, page: 1 });
  return result.docs.filter((property) => property.bhkType === bhkType);
});
