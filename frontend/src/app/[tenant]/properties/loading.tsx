import { PropertyCardSkeleton } from '@/components/skeletons/PropertyCardSkeleton';

/**
 * Loading state for properties list page
 * Shown while data is being fetched
 */
export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header Skeleton */}
      <div className="mb-6">
        <div className="h-9 bg-gray-200 rounded animate-pulse w-64 mb-2" />
        <div className="h-5 bg-gray-200 rounded animate-pulse w-48" />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filter Sidebar Skeleton */}
        <aside className="lg:w-64 flex-shrink-0">
          <div className="p-4 bg-white rounded-lg shadow-sm space-y-4">
            <div className="h-6 bg-gray-200 rounded animate-pulse w-16" />
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
            </div>
          </div>
        </aside>

        {/* Property Grid Skeleton */}
        <main className="flex-1">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <PropertyCardSkeleton key={i} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
