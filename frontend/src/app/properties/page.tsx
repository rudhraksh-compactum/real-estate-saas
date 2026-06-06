import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getPublishedProperties } from '@/lib/data/properties';
import { PropertyCard } from '@/components/PropertyCard';

interface PropertiesPageProps {
  searchParams: Promise<{
    location?: string;
    guests?: string;
    page?: string;
  }>;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Our Villas | Not Just A Stay',
    description: 'Browse our collection of luxury private villas in North Goa. Private pools, stunning locations, and unforgettable experiences.',
  };
}

export default async function PropertiesPage({
  searchParams,
}: PropertiesPageProps) {
  const { location, guests, page } = await searchParams;
  const result = await getPublishedProperties({ limit: 20, page: Number(page) ?? 1 });
  const properties = result.docs;

  return (
    <div className="min-h-screen bg-ivory">
      {/* Hero */}
      <section className="relative h-[50vh]">
        <Image
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80"
          alt="Luxury Villas"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-charcoal/40" />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div>
            <p className="label text-ivory mb-4">Our Collection</p>
            <h1 className="text-4xl md:text-5xl text-ivory">
              Private Villas
            </h1>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <p className="text-charcoal/60">
              {result.totalDocs} villas available
              {location && ` in ${location}`}
            </p>
          </div>

          {properties.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((property, index) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  priority={index < 3}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl text-charcoal mb-4">No villas found</h2>
              <p className="text-charcoal/60">Please check back soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal py-12">
        <div className="container mx-auto px-4 text-center">
          <Link href="/" className="text-ivory hover:text-gold transition-colors">
            ← Back to Home
          </Link>
        </div>
      </footer>
    </div>
  );
}