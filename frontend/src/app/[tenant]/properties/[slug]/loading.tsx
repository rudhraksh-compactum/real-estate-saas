/**
 * Loading skeleton for property detail page
 * Displays while the page data is being fetched
 */
export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs Skeleton */}
      <div className="flex items-center gap-2 mb-6">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-4" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-4" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-32" />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Gallery Skeleton */}
          <div className="space-y-4">
            <div className="aspect-[16/9] bg-gray-200 rounded-lg animate-pulse" />
            <div className="flex gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-20 h-15 bg-gray-200 rounded-md animate-pulse" />
              ))}
            </div>
          </div>

          {/* Header Skeleton */}
          <div className="space-y-3">
            <div className="h-9 bg-gray-200 rounded w-3/4 animate-pulse" />
            <div className="flex items-center gap-3">
              <div className="h-5 bg-gray-200 rounded w-40 animate-pulse" />
              <div className="h-6 bg-blue-100 rounded-full w-20 animate-pulse" />
              <div className="h-5 bg-gray-200 rounded w-24 animate-pulse" />
            </div>
          </div>

          {/* Pricing Skeleton */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="h-10 bg-gray-200 rounded w-48 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-32 mt-2 animate-pulse" />
          </div>

          {/* Description Skeleton */}
          <div className="space-y-3">
            <div className="h-6 bg-gray-200 rounded w-40 animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
            </div>
          </div>

          {/* Amenities Skeleton */}
          <div className="space-y-3">
            <div className="h-6 bg-gray-200 rounded w-24 animate-pulse" />
            <div className="flex flex-wrap gap-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-8 bg-gray-200 rounded-full w-24 animate-pulse" />
              ))}
            </div>
          </div>

          {/* Details Grid Skeleton */}
          <div className="space-y-3">
            <div className="h-6 bg-gray-200 rounded w-32 animate-pulse" />
            <div className="grid grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 rounded-lg animate-pulse" />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Inquiry Form Skeleton */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 space-y-4">
            <div className="h-6 bg-gray-200 rounded w-40 animate-pulse" />
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-1">
                <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
                <div className="h-10 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
            <div className="h-10 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* POI Overlay Skeleton */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 space-y-4">
            <div className="h-5 bg-gray-200 rounded w-28 animate-pulse" />
            <div className="flex gap-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-8 bg-gray-200 rounded-full w-16 animate-pulse" />
              ))}
            </div>
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 rounded-lg animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
