import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, Users, CheckCircle, Calendar, ChevronRight, Home } from 'lucide-react';
import { getActivityBySlug } from '@/lib/data/activities';
import { ActivityInquiryForm } from '@/components/ActivityInquiryForm';

interface ActivityPageProps {
  params: Promise<{ tenant: string; slug: string }>;
}

/**
 * Generate SEO metadata for the activity detail page
 */
export async function generateMetadata({ params }: ActivityPageProps): Promise<Metadata> {
  const { tenant, slug } = await params;
  const activity = await getActivityBySlug(slug);

  if (!activity) {
    return { title: 'Activity Not Found' };
  }

  const description = activity.shortDescription || activity.description?.slice(0, 160) || '';

  return {
    title: `${activity.title} | Experiences | Not Just A Stay`,
    description,
    alternates: {
      canonical: `/${tenant}/activities/${slug}`,
    },
    openGraph: {
      title: activity.title,
      description,
      images: activity.featuredImage?.url ? [{ url: activity.featuredImage.url }] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: activity.title,
      images: activity.featuredImage?.url ? [activity.featuredImage.url] : [],
    },
  };
}

/**
 * Activity Detail Page
 * Server Component that fetches and displays a single activity with inquiry form
 */
export default async function ActivityDetailPage({ params }: ActivityPageProps) {
  const { tenant, slug } = await params;
  const activity = await getActivityBySlug(slug);

  if (!activity) {
    notFound();
  }

  const { title, shortDescription, description, highlights, duration, groupSize, price, currency = 'INR', includes, cancellationPolicy, featuredImage, gallery } = activity;

  // Get all images for gallery
  const allImages = [
    ...(featuredImage ? [featuredImage] : []),
    ...(gallery || []).map(img => ({ url: img.url, alt: img.alt })),
  ];

  // Format price
  const formattedPrice = `${currency} ${price.toLocaleString()} / person`;

  // Format group size
  const groupSizeText = groupSize
    ? groupSize.minGuests && groupSize.maxGuests
      ? `${groupSize.minGuests}-${groupSize.maxGuests} guests`
      : groupSize.maxGuests
        ? `Up to ${groupSize.maxGuests} guests`
        : groupSize.minGuests
          ? `Min ${groupSize.minGuests} guests`
          : null
    : null;

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
        <Link
          href={`/${tenant}/activities`}
          className="hover:text-gray-700 transition-colors"
        >
          Activities
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium truncate max-w-[200px]">{title}</span>
      </nav>

      {/* Hero Section */}
      {featuredImage?.url && (
        <div className="relative aspect-[21/9] rounded-lg overflow-hidden mb-8">
          <Image
            src={featuredImage.url}
            alt={featuredImage.alt || title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
            {shortDescription && (
              <p className="text-lg text-gray-600">{shortDescription}</p>
            )}
          </div>

          {/* Quick Info Badges */}
          <div className="flex flex-wrap gap-4">
            {duration && (
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="font-medium">{duration}</span>
              </div>
            )}
            {groupSizeText && (
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="font-medium">{groupSizeText}</span>
              </div>
            )}
          </div>

          {/* Description */}
          {description && (
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">About This Experience</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 whitespace-pre-wrap">{description}</p>
              </div>
            </section>
          )}

          {/* Highlights */}
          {highlights && highlights.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Highlights</h2>
              <ul className="space-y-2">
                {highlights.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{item.highlight}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* What's Included */}
          {includes && (
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">What&apos;s Included</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 whitespace-pre-wrap">{includes}</p>
              </div>
            </section>
          )}

          {/* Cancellation Policy */}
          {cancellationPolicy && (
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Cancellation Policy</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 whitespace-pre-wrap">{cancellationPolicy}</p>
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 space-y-6">
            {/* Price Card */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
              <div className="text-center mb-4">
                <span className="text-3xl font-bold text-gray-900">{currency}</span>
                <span className="text-2xl font-bold text-gray-900"> {price.toLocaleString()}</span>
              </div>
              <p className="text-center text-sm text-gray-500 mb-4">per person</p>
              <ActivityInquiryForm activityId={activity.id} activityTitle={title} />
            </div>
          </div>
        </div>
      </div>

      {/* Gallery */}
      {allImages.length > 1 && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Photo Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {allImages.map((image, index) => (
              <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src={image.url}
                  alt={image.alt || `${title} ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover hover:scale-105 transition-transform duration-200"
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
