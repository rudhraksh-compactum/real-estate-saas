import Image from 'next/image';
import Link from 'next/link';
import { Clock, Users } from 'lucide-react';
import type { Activity } from '@/lib/data/activities';

interface ActivityCardProps {
  activity: Activity;
  priority?: boolean;
}

/**
 * Activity Card Component
 * Displays a single activity with image, title, description, and key details.
 * Used in the activities list page.
 */
export function ActivityCard({ activity, priority = false }: ActivityCardProps) {
  const { slug, title, shortDescription, duration, groupSize, price, currency = 'INR', featuredImage } = activity;

  // Format price display
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
    <article className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200 bg-white">
      {/* Featured Image */}
      {featuredImage?.url && (
        <Link href={`/activities/${slug || activity.id}`} className="block relative aspect-[4/3]">
          <Image
            src={featuredImage.url}
            alt={featuredImage.alt || title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            priority={priority}
          />
        </Link>
      )}

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <Link href={`/activities/${slug || activity.id}`}>
          <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-1">
            {title}
          </h3>
        </Link>

        {/* Short Description */}
        {shortDescription && (
          <p className="text-sm text-gray-600 line-clamp-2">
            {shortDescription}
          </p>
        )}

        {/* Details Row */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          {/* Duration */}
          {duration && (
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{duration}</span>
            </div>
          )}

          {/* Group Size */}
          {groupSizeText && (
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              <span>{groupSizeText}</span>
            </div>
          )}
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <span className="text-lg font-semibold text-gray-900">
            {formattedPrice}
          </span>
          <Link
            href={`/activities/${slug || activity.id}`}
            className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
