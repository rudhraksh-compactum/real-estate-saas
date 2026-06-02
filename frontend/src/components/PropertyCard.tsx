import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Wifi, Wind, Tv, Car, Star } from 'lucide-react';
import type { Property } from '@/types';
import { cn } from '@/lib/utils';

// Map BHK values to display labels
const BHK_LABELS: Record<string, string> = {
  '1_bhk': '1 BHK',
  '2_bhk': '2 BHK',
  '3_bhk': '3 BHK',
  '4_plus_bhk': '4+ BHK',
  studio: 'Studio',
  villa: 'Villa',
  penthouse: 'Penthouse',
};

// Amenity icons mapping
const AMENITY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  wifi: Wifi,
  ac: Wind,
  tv: Tv,
  parking: Car,
};

interface PropertyCardProps {
  property: Property;
  priority?: boolean;
  className?: string;
}

/**
 * Rich property card component for listings
 * Server Component - fetches data in parent
 */
export function PropertyCard({ property, priority = false, className }: PropertyCardProps) {
  const {
    slug,
    title,
    shortDescription,
    address,
    bhkType,
    nightlyPrice,
    currency = 'INR',
    amenities = [],
    featuredImage,
  } = property;

  const city = address?.city ?? 'Unknown City';
  const bhkLabel = bhkType ? BHK_LABELS[bhkType] || bhkType : null;
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(nightlyPrice);

  // Get first 4 amenities with icons
  const displayAmenities: string[] = amenities.slice(0, 4).filter((a: string) => AMENITY_ICONS[a]);
  const remainingCount = amenities.length - displayAmenities.length;

  return (
    <article
      className={cn(
        'border rounded-lg overflow-hidden bg-white hover:shadow-lg transition-shadow',
        className
      )}
    >
      {/* Image Section */}
      <Link href={`/properties/${slug}`} className="block">
        <div className="relative aspect-[4/3] bg-gray-100">
          {featuredImage?.url ? (
            <Image
              src={featuredImage.url}
              alt={featuredImage.alt || title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              priority={priority}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <span>No image available</span>
            </div>
          )}
          {/* BHK Badge */}
          {bhkLabel && (
            <span className="absolute top-3 left-3 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-md text-sm font-medium text-gray-900">
              {bhkLabel}
            </span>
          )}
          {/* Rating Badge */}
          <span className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-md text-sm">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">4.5</span>
          </span>
        </div>
      </Link>

      {/* Content Section */}
      <div className="p-4">
        {/* Title */}
        <Link href={`/properties/${slug}`} className="hover:text-blue-600">
          <h3 className="font-semibold text-gray-900 line-clamp-1">{title}</h3>
        </Link>

        {/* Location */}
        <div className="flex items-center gap-1 mt-1 text-sm text-gray-500">
          <MapPin className="w-4 h-4" />
          <span className="line-clamp-1">
            {address?.locality ? `${address.locality}, ` : ''}{city}
          </span>
        </div>

        {/* Short Description */}
        {shortDescription && (
          <p className="mt-2 text-sm text-gray-600 line-clamp-2">{shortDescription}</p>
        )}

        {/* Price */}
        <div className="mt-3 flex items-baseline gap-1">
          <span className="text-lg font-bold text-gray-900">{formattedPrice}</span>
          <span className="text-sm text-gray-500">/ night</span>
        </div>

        {/* Amenities */}
        {displayAmenities.length > 0 && (
          <div className="mt-3 flex items-center gap-3">
            {displayAmenities.map((amenity: string) => {
              const Icon = AMENITY_ICONS[amenity];
              return Icon ? (
                <Icon key={amenity} className="w-4 h-4 text-gray-400" />
              ) : null;
            })}
            {remainingCount > 0 && (
              <span className="text-xs text-gray-400">+{remainingCount} more</span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
