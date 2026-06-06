import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Property } from '@/types';
import { PropertyCard } from './PropertyCard';

interface FeaturedPropertiesProps {
  properties: Property[];
  className?: string;
}

export function FeaturedProperties({ properties, className }: FeaturedPropertiesProps) {
  if (properties.length === 0) {
    return null;
  }

  return (
    <section className={`section-spacing bg-white ${className || ''}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="label mb-4">Our Collection</p>
          <h2 className="text-3xl md:text-4xl text-charcoal">
            Featured Villas
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.slice(0, 3).map((property, index) => (
            <PropertyCard
              key={property.id}
              property={property}
              priority={index < 3}
            />
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 text-charcoal hover:text-gold transition-colors group"
          >
            <span className="text-sm uppercase">View All Properties</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
