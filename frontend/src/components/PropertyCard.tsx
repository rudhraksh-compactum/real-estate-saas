import Image from 'next/image';
import Link from 'next/link';
import type { Property } from '@/types';
import { getImageUrl, isRemoteImage } from '@/lib/media';

interface PropertyCardProps {
  property: Property;
  priority?: boolean;
  className?: string;
}

export function PropertyCard({ property, priority = false, className }: PropertyCardProps) {
  const imageUrl = getImageUrl(property.featuredImage?.url);
  const href = `/properties/${property.slug || property.id}`;

  return (
    <Link
      href={href}
      className={`group block ${className || ''}`}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-charcoal">
        <Image
          src={imageUrl}
          alt={property.featuredImage?.alt || property.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover opacity-95 transition-transform duration-700 group-hover:scale-105"
          priority={priority}
          unoptimized={isRemoteImage(imageUrl)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5 text-ivory">
          <p className="label mb-2 text-ivory/80">
            {property.address?.locality || property.locality || property.address?.city}
          </p>
          <h3 className="text-2xl leading-tight text-ivory transition-colors group-hover:text-gold">
            {property.title}
          </h3>
        </div>
      </div>

      <div className="border-b border-charcoal/15 py-5">
      <p className="mb-4 min-h-10 text-sm leading-6 text-charcoal/65 line-clamp-2">
        {property.shortDescription}
      </p>
      <p className="text-sm font-medium text-charcoal">
        ₹{property.nightlyPrice.toLocaleString()}{' '}
        <span className="text-charcoal/50">per night</span>
      </p>
      </div>
    </Link>
  );
}
