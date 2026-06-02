import { NextRequest, NextResponse } from 'next/server';
import { getPayloadInstance } from '@/lib/payload';
import { buildPropertyQuery } from '@/lib/search/filters';
import { buildRadiusWhere, isValidCoordinates } from '@/lib/map/useGeolocationFilter';
import type { FilterState } from '@/lib/stores/filterStore';

interface SearchQuery {
  bhk?: string;
  type?: string;
  price_min?: string;
  price_max?: string;
  furnishing?: string;
  amenities?: string;
  locality?: string;
  pet?: string;
  tenant?: string;
  sort?: 'price_asc' | 'price_desc' | 'newest';
  radius?: string;
  center_lat?: string;
  center_lng?: string;
  limit?: string;
  page?: string;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const payload = await getPayloadInstance();

  // Parse query parameters
  const query: SearchQuery = {
    bhk: searchParams.get('bhk') ?? undefined,
    type: searchParams.get('type') ?? undefined,
    price_min: searchParams.get('price_min') ?? undefined,
    price_max: searchParams.get('price_max') ?? undefined,
    furnishing: searchParams.get('furnishing') ?? undefined,
    amenities: searchParams.get('amenities') ?? undefined,
    locality: searchParams.get('locality') ?? undefined,
    pet: searchParams.get('pet') ?? undefined,
    tenant: searchParams.get('tenant') ?? undefined,
    sort: (searchParams.get('sort') as SearchQuery['sort']) ?? undefined,
    radius: searchParams.get('radius') ?? undefined,
    center_lat: searchParams.get('center_lat') ?? undefined,
    center_lng: searchParams.get('center_lng') ?? undefined,
    limit: searchParams.get('limit') ?? undefined,
    page: searchParams.get('page') ?? undefined,
  };

  // Build filter state from query params
  const filterState: Partial<FilterState> = {
    bhkTypes: query.bhk?.split(',').filter(Boolean) ?? [],
    propertyTypes: query.type?.split(',').filter(Boolean) ?? [],
    priceMin: query.price_min ? parseInt(query.price_min) : null,
    priceMax: query.price_max ? parseInt(query.price_max) : null,
    furnishing: query.furnishing ?? null,
    amenities: query.amenities?.split(',').filter(Boolean) ?? [],
    locality: query.locality ?? null,
    petPolicy: query.pet ?? null,
    tenantPreference: query.tenant ?? null,
    sortBy: query.sort ?? 'newest',
    radius: query.radius ? parseFloat(query.radius) : null,
    centerLat: query.center_lat ? parseFloat(query.center_lat) : null,
    centerLng: query.center_lng ? parseFloat(query.center_lng) : null,
  };

  // Build base query
  const baseQuery = buildPropertyQuery(filterState as FilterState);

  // Add radius filter if specified and coordinates are valid
  if (
    filterState.radius !== null &&
    filterState.centerLat !== null &&
    filterState.centerLng !== null &&
    isValidCoordinates(filterState.centerLat, filterState.centerLng)
  ) {
    const radiusWhere = buildRadiusWhere(
      filterState.centerLat,
      filterState.centerLng,
      filterState.radius
    );

    // Merge with existing where clause
    baseQuery.where = {
      and: [
        ...(Array.isArray(baseQuery.where) ? baseQuery.where : [baseQuery.where]),
        radiusWhere,
      ].flat(),
    };
  }

  // Pagination
  const limit = query.limit ? parseInt(query.limit) : 20;
  const page = query.page ? parseInt(query.page) : 1;

  try {
    const results = await payload.find({
      collection: 'properties',
      where: baseQuery.where,
      page,
      limit,
      sort: baseQuery.sort as string | string[] | undefined,
      order: baseQuery.order as 'asc' | 'desc' | undefined,
    });

    return NextResponse.json({
      docs: results.docs,
      totalDocs: results.totalDocs,
      page: results.page,
      totalPages: results.totalPages,
      hasNextPage: results.hasNextPage,
      hasPrevPage: results.hasPrevPage,
    });
  } catch (error) {
    console.error('Property search error:', error);
    return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 });
  }
}
