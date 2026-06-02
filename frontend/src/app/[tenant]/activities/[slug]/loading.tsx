/**
 * Loading skeleton for Activity detail page
 * Displays placeholder content while data is being fetched
 */
export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs skeleton */}
      <div className="flex items-center gap-2 mb-6">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-4" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-4" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-32" />
      </div>

      {/* Hero skeleton */}
      <div className="aspect-[21/9] bg-gray-200 rounded-lg animate-pulse mb-8" />

      {/* Content grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="h-10 bg-gray-200 rounded animate-pulse w-3/4 mb-3" />
            <div className="h-6 bg-gray-200 rounded animate-pulse w-full" />
          </div>

          <div className="flex gap-4">
            <div className="h-10 bg-gray-200 rounded-full animate-pulse w-24" />
            <div className="h-10 bg-gray-200 rounded-full animate-pulse w-32" />
          </div>

          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
          </div>

          <div className="space-y-3 pt-4">
            <div className="h-6 bg-gray-200 rounded animate-pulse w-1/3" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="h-10 bg-gray-200 rounded animate-pulse w-1/2 mx-auto mb-4" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-full mb-6" />
              <div className="space-y-4">
                <div className="h-10 bg-gray-200 rounded animate-pulse w-full" />
                <div className="h-10 bg-gray-200 rounded animate-pulse w-full" />
                <div className="h-24 bg-gray-200 rounded animate-pulse w-full" />
                <div className="h-10 bg-gray-200 rounded animate-pulse w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
