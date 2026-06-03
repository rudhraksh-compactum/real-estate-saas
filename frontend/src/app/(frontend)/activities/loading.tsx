/**
 * Loading skeleton for Activities list page
 * Displays placeholder content while data is being fetched
 */
export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs skeleton */}
      <div className="flex items-center gap-2 mb-6">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-4" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
      </div>

      {/* Page Header skeleton */}
      <div className="mb-8 space-y-3">
        <div className="h-8 bg-gray-200 rounded animate-pulse w-64" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-96" />
      </div>

      {/* Grid skeleton */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="border border-gray-200 rounded-lg overflow-hidden bg-white">
            <div className="aspect-[4/3] bg-gray-200 animate-pulse" />
            <div className="p-4 space-y-3">
              <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
              </div>
              <div className="flex gap-4 pt-2">
                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
