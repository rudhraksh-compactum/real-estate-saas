import { Suspense } from 'react';
import { Metadata } from 'next';
import { getPublishedProperties } from '@/lib/data/properties';
import { FilterSidebar } from '@/components/search/FilterSidebar';
import { ActiveFilters } from '@/components/search/ActiveFilters';
import { PropertyCard } from '@/components/PropertyCard';
import { PropertyCardSkeleton } from '@/components/skeletons/PropertyCardSkeleton';

interface PropertiesPageProps {
  params: Promise<{
    tenant: string;
  }>;
  searchParams: Promise<{
    location?: string;
    guests?: string;
    page?: string;
  }>;
}

// Dynamic metadata for SEO
export async function generateMetadata({
  params,
}: PropertiesPageProps): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://notjustastay.com';
  return {
    title: 'Browse Properties | Not Just A Stay',
    description:
      'Find your perfect short-let property. Filter by BHK type, amenities, budget, and more.',
    openGraph: {
      title: 'Browse Properties | Not Just A Stay',
      type: 'website',
      url: `${baseUrl}/properties`,
    },
  };
}

// Properties list page with FilterSidebar and property grid
export default async function PropertiesPage({
  params,
  searchParams,
}: PropertiesPageProps) {
  const { tenant } = await params;
  const { location, guests, page } = await searchParams;

  // Fetch published properties
  const result = await getPublishedProperties({ limit: 20, page: Number(page) ?? 1 });
  const properties = result.docs;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Browse Properties</h1>
        <p className="text-gray-500 mt-1">
          {result.totalDocs} properties found
          {location && ` in ${location}`}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filter Sidebar - wrapped in Suspense for client component */}
        <aside className="lg:w-64 flex-shrink-0">
          <Suspense fallback={<FilterSidebarSkeleton />}>
            <FilterSidebar />
          </Suspense>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Active Filters */}
          <div className="mb-4">
            <ActiveFilters />
          </div>

          {/* Property Grid */}
          {properties.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {properties.map((property, index) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  priority={index < 3}
                />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}

          {/* Pagination */}
          {result.totalPages > 1 && (
            <Pagination currentPage={result.page} totalPages={result.totalPages} />
          )}
        </main>
      </div>
    </div>
  );
}

// Empty state component
function EmptyState() {
  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
        <svg
          className="w-8 h-8 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-1">No properties found</h3>
      <p className="text-gray-500">
        Try adjusting your filters or search criteria.
      </p>
    </div>
  );
}

// Filter sidebar skeleton during loading
function FilterSidebarSkeleton() {
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm space-y-4">
      <div className="h-6 bg-gray-200 rounded animate-pulse w-16" />
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
      </div>
    </div>
  );
}

// Simple pagination component
function Pagination({ currentPage, totalPages }: { currentPage: number; totalPages: number }) {
  return (
    <nav className="mt-8 flex justify-center gap-2" aria-label="Pagination">
      {currentPage > 1 && (
        <a
          href={`?page=${currentPage - 1}`}
          className="px-4 py-2 border rounded-md hover:bg-gray-50"
        >
          Previous
        </a>
      )}
      <span className="px-4 py-2">
        Page {currentPage} of {totalPages}
      </span>
      {currentPage < totalPages && (
        <a
          href={`?page=${currentPage + 1}`}
          className="px-4 py-2 border rounded-md hover:bg-gray-50"
        >
          Next
        </a>
      )}
    </nav>
  );
}
