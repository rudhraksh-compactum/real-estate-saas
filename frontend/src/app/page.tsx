import Link from 'next/link';
import Image from 'next/image';
import { getFeaturedProperties } from '@/lib/data/properties';
import { PropertyCard } from '@/components/PropertyCard';

export default async function HomePage() {
  const properties = await getFeaturedProperties();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen">
        <Image
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80"
          alt="Luxury Villa in North Goa"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/30 via-transparent to-charcoal/60" />

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <p className="label mb-4 text-ivory">Luxury Villa Stays</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl text-ivory mb-6 max-w-4xl">
            Not Just A Stay
          </h1>
          <p className="text-lg md:text-xl text-ivory/80 mb-10 max-w-2xl">
            Experience the finest private villas in North Goa. Where every moment becomes a cherished memory.
          </p>
          <Link href="/properties" className="btn-primary">
            View Our Villas
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-ivory/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-ivory/50 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="section-spacing bg-ivory">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="label mb-4">Our Story</p>
            <h2 className="text-3xl md:text-4xl text-charcoal mb-6">
              Curated Luxury,<br />Unforgettable Experiences
            </h2>
            <p className="text-charcoal/70 text-lg leading-relaxed">
              Nestled in the heart of North Goa, we offer an exclusive collection of private villas
              designed for those who seek more than just accommodation. Each property is handpicked
              for its character, privacy, and proximity to pristine beaches.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="label mb-4">Our Collection</p>
            <h2 className="text-3xl md:text-4xl text-charcoal">
              Featured Villas
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.slice(0, 3).map((property) => (
              <Link
                key={property.id}
                href={`/properties/${property.id}`}
                className="group block"
              >
                <div className="relative aspect-[4/5] overflow-hidden mb-6">
                  <Image
                    src={property.featuredImage.url}
                    alt={property.featuredImage.alt || property.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />
                </div>
                <p className="label text-xs mb-2">{property.address?.locality || property.address?.city}</p>
                <h3 className="text-xl text-charcoal mb-2 group-hover:text-gold transition-colors">
                  {property.title}
                </h3>
                <p className="text-charcoal/60 text-sm line-clamp-2 mb-4">
                  {property.shortDescription}
                </p>
                <p className="text-gold font-medium">
                  ₹{property.nightlyPrice.toLocaleString()} <span className="text-charcoal/50 text-sm">/ night</span>
                </p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/properties" className="btn-secondary">
              View All Properties
            </Link>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="relative h-[70vh]">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
          alt="Private Pool Experience"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/50" />

        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div className="max-w-2xl">
            <p className="label mb-4 text-ivory">The Experience</p>
            <h2 className="text-3xl md:text-5xl text-ivory mb-6">
              Your Private Paradise Awaits
            </h2>
            <p className="text-lg text-ivory/80 mb-10">
              Private pools, dedicated staff, and breathtaking sunsets.
              Create memories that last a lifetime in our exclusive villas.
            </p>
            <Link href="/properties" className="btn-primary">
              Explore Villas
            </Link>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="section-spacing bg-ivory">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <p className="label text-xs mb-2">Location</p>
              <h3 className="text-2xl text-charcoal mb-4">Assagao</h3>
              <p className="text-charcoal/60">
                The cultural heart of North Goa. Quiet villages, Portuguese architecture,
                and some of the best beaches just minutes away.
              </p>
            </div>
            <div>
              <p className="label text-xs mb-2">Location</p>
              <h3 className="text-2xl text-charcoal mb-4">Anjuna & Vagator</h3>
              <p className="text-charcoal/60">
                Famous for its legendary beach parties, cliff-top views, and vibrant nightlife.
                Yet our villas offer peaceful retreats.
              </p>
            </div>
            <div>
              <p className="label text-xs mb-2">Location</p>
              <h3 className="text-2xl text-charcoal mb-4">Siolim</h3>
              <p className="text-charcoal/60">
                A serene village surrounded by lush greenery. Perfect for those seeking
                tranquility while being close to everything.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <h3 className="text-2xl text-ivory mb-4">Not Just A Stay</h3>
              <p className="text-ivory/60 max-w-md">
                Luxury villa stays in North Goa. Private pools, stunning locations,
                and unforgettable experiences.
              </p>
            </div>
            <div>
              <h4 className="text-ivory font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/properties" className="text-ivory/60 hover:text-gold transition-colors">
                    Our Villas
                  </Link>
                </li>
                <li>
                  <Link href="/activities" className="text-ivory/60 hover:text-gold transition-colors">
                    Experiences
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-ivory font-medium mb-4">Contact</h4>
              <ul className="space-y-2 text-ivory/60">
                <li>North Goa, India</li>
                <li>hello@notjustastay.com</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-ivory/10 pt-8 text-center">
            <p className="text-ivory/40 text-sm">
              © 2024 Not Just A Stay. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}