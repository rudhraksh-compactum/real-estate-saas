import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { getPublishedActivities } from '@/lib/data/activities';
import { ActivityCard } from '@/components/ActivityCard';

interface ActivitiesPageProps {
  params: Promise<{ tenant: string }>;
}

/**
 * Generate SEO metadata for the activities list page
 */
export async function generateMetadata({ params }: ActivitiesPageProps): Promise<Metadata> {
  const { tenant } = await params;

  return {
    title: 'Experiences & Activities | Not Just A Stay',
    description: 'Discover unique local experiences and activities. From cooking classes to guided tours, find unforgettable adventures.',
    alternates: {
      canonical: `/${tenant}/activities`,
    },
    openGraph: {
      title: 'Experiences & Activities | Not Just A Stay',
      description: 'Discover unique local experiences and activities.',
      type: 'website',
    },
  };
}

/**
 * Activities List Page
 * Server Component that fetches and displays all published activities
 */
export default async function ActivitiesPage({ params }: ActivitiesPageProps) {
  const { tenant } = await params;
  const activities = await getPublishedActivities();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link
          href={`/${tenant}`}
          className="flex items-center gap-1 hover:text-gray-700 transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium">Activities</span>
      </nav>

      {/* Page Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Experiences & Activities
        </h1>
        <p className="text-gray-600">
          Discover unique local experiences and activities during your stay.
        </p>
      </header>

      {/* Activities Grid */}
      {activities.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {activities.map((activity, index) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              priority={index < 3} // Prioritize loading for above-fold images
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            No Activities Available
          </h2>
          <p className="text-gray-500">
            No activities are available at the moment. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}
