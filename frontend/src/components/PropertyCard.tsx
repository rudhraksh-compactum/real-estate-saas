import Image from 'next/image';
import Link from 'next/link';
import type { Property } from '@/types';

interface PropertyCardProps {
  property: Property;
  priority?: boolean;
  className?: string;
}

export function PropertyCard({ property, priority = false, className }: PropertyCardProps) {
  return (
    <Link
      href={`/properties/${property.id}`}
      className={`group block ${className || ''}`}
    >
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden mb-6">
        <Image
          src={property.featuredImage.url}
          alt={property.featuredImage.alt || property.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority={priority}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <p className="label text-xs mb-2">
        {property.address?.locality || property.address?.city}
</p>
      <h3 className="text-xl text-charcoal mb-2 group-hover:text-gold transition-colors">
        {property.title}
      </h3>
      <p className="text-charcoal/60 text-sm line-clamp-2 mb-4">
        {property.shortDescription}
      </p>
      <p className="text-gold font-medium">
        ₹{property.nightlyPrice.toLocaleString()}{' '}
        <span className="text-charcoal/50 text-sm">/ night</span>
      </p>
    </Link>
  );
}
