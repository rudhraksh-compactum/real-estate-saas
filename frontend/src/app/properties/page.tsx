import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getPublishedProperties } from '@/lib/data/properties';
import { PropertyCard } from '@/components/PropertyCard';

interface PropertiesPageProps {
  searchParams: Promise<{
    location?: string;
    page?: string;
  }>;
}

const heroImage = 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=2200&q=85&auto=format&fit=crop';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Private Villas | Not Just A Stay',
    description: 'Browse our collection of luxury private villas in North Goa.',
  };
}

export default async function PropertiesPage({ searchParams }: PropertiesPageProps) {
  const { location, page } = await searchParams;
  const result = await getPublishedProperties({ limit: 20, page: Number(page) || 1 });
  const properties = result.docs;

  return (
    <main className="min-h-screen bg-ivory text-charcoal">
      <section className="relative min-h-[62vh]">
        <Image
          src={heroImage}
          alt="Luxury villas in North Goa"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/65 via-charcoal/20 to-charcoal/70" />
        <header className="absolute left-0 right-0 top-0 z-10 border-b border-ivory/20">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 text-ivory md:px-8">
            <Link href="/" className="font-display text-2xl">
              Not Just A Stay
            </Link>
            <Link href="/" className="text-xs font-medium uppercase hover:text-gold">
              Home
            </Link>
          </nav>
        </header>
        <div className="absolute inset-x-0 bottom-0 px-5 pb-12 text-ivory md:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="label mb-4 text-ivory/85">Our Collection</p>
            <h1 className="max-w-4xl text-5xl leading-none text-ivory md:text-7xl">
              Private villas, quietly exceptional.
            </h1>
          </div>
        </div>
      </section>

      <section className="border-b border-charcoal/10 bg-ivory">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-5 py-10 md:flex-row md:items-end md:px-8">
          <div>
            <p className="label mb-3">Available Stays</p>
            <p className="text-2xl md:text-3xl">
              {result.totalDocs} villas available{location ? ` in ${location}` : ''}
            </p>
          </div>
          <p className="max-w-xl leading-7 text-charcoal/60">
            Each home is selected for atmosphere, privacy, and the way it connects you to North Goa without putting you in the middle of the rush.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          {properties.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {properties.map((property, index) => (
                <PropertyCard key={property.id} property={property} priority={index < 3} />
              ))}
            </div>
          ) : (
            <div className="border-y border-charcoal/15 py-20 text-center">
              <h2 className="mb-4 text-3xl">No villas found</h2>
              <p className="text-charcoal/60">Please check back soon.</p>
            </div>
          )}
        </div>
      </section>

      <footer className="bg-charcoal px-5 py-12 text-center text-ivory md:px-8">
        <Link href="/" className="text-sm uppercase text-ivory/70 hover:text-gold">
          Back to home
        </Link>
      </footer>
    </main>
  );
}
