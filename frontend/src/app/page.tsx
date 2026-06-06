import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getFeaturedProperties } from '@/lib/data/properties';
import { PropertyCard } from '@/components/PropertyCard';
import { getImageUrl, isRemoteImage } from '@/lib/media';

const heroImage = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=2200&q=85&auto=format&fit=crop';
const estateImage = 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1800&q=85&auto=format&fit=crop';
const poolImage = 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1800&q=85&auto=format&fit=crop';

export default async function HomePage() {
  const properties = await getFeaturedProperties();
  const leadProperty = properties[0];

  return (
    <main className="min-h-screen bg-ivory text-charcoal">
      <section className="relative min-h-[92vh] overflow-hidden">
        <Image
          src={heroImage}
          alt="Luxury villa estate in North Goa"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/20 to-charcoal/70" />

        <header className="absolute left-0 right-0 top-0 z-10 border-b border-ivory/25">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 text-ivory md:px-8">
            <Link href="/" className="font-display text-2xl">
              Not Just A Stay
            </Link>
            <div className="hidden items-center gap-8 text-xs font-medium uppercase md:flex">
              <Link href="/properties" className="hover:text-gold">Villas</Link>
              <a href="#experiences" className="hover:text-gold">Experiences</a>
              <a href="#locations" className="hover:text-gold">North Goa</a>
            </div>
          </nav>
        </header>

        <div className="absolute inset-x-0 bottom-0 px-5 pb-12 text-ivory md:px-8 md:pb-16">
          <div className="mx-auto max-w-7xl">
            <p className="label mb-5 text-ivory/85">Private villas and curated stays</p>
            <h1 className="max-w-5xl text-5xl leading-none text-ivory md:text-7xl lg:text-8xl">
              North Goa, held beautifully.
            </h1>
            <div className="mt-8 flex max-w-3xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <p className="text-lg leading-8 text-ivory/82 md:text-xl">
                A small collection of private villas shaped around quiet luxury, generous space, and the feeling that every day can unfold at its own pace.
              </p>
              <Link href="/properties" className="btn-primary shrink-0">
                Explore Villas
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-charcoal/10 bg-ivory">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-[1.1fr_0.9fr] md:px-8 md:py-24">
          <div>
            <p className="label mb-5">The Collection</p>
            <h2 className="max-w-3xl text-4xl leading-tight md:text-6xl">
              Villas selected for character, privacy, and a sense of occasion.
            </h2>
          </div>
          <div className="self-end text-base leading-8 text-charcoal/65 md:text-lg">
            Each stay is chosen for the things guests remember: poolside breakfasts, shaded gardens, thoughtful interiors, and locations that keep the best of North Goa close without giving away the calm.
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-10 flex flex-col justify-between gap-5 border-b border-charcoal/15 pb-6 md:flex-row md:items-end">
            <div>
              <p className="label mb-3">Featured Villas</p>
              <h2 className="text-4xl md:text-5xl">Stay somewhere with a story.</h2>
            </div>
            <Link href="/properties" className="inline-flex items-center gap-2 text-sm font-medium uppercase text-charcoal hover:text-gold">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {properties.slice(0, 3).map((property, index) => (
              <PropertyCard key={property.id} property={property} priority={index === 0} />
            ))}
          </div>
        </div>
      </section>

      {leadProperty && (
        <section className="grid bg-charcoal text-ivory md:grid-cols-2">
          <div className="relative min-h-[480px]">
            <Image
              src={getImageUrl(leadProperty.featuredImage?.url)}
              alt={leadProperty.featuredImage?.alt || leadProperty.title}
              fill
              className="object-cover"
              unoptimized={isRemoteImage(leadProperty.featuredImage?.url)}
            />
          </div>
          <div className="flex items-center px-5 py-16 md:px-16 md:py-24">
            <div className="max-w-xl">
              <p className="label mb-5 text-gold">Featured Stay</p>
              <h2 className="mb-6 text-4xl leading-tight text-ivory md:text-6xl">
                {leadProperty.title}
              </h2>
              <p className="mb-8 text-lg leading-8 text-ivory/70">
                {leadProperty.description}
              </p>
              <Link href={`/properties/${leadProperty.slug || leadProperty.id}`} className="btn-primary border border-ivory/25">
                View This Villa
              </Link>
            </div>
          </div>
        </section>
      )}

      <section id="experiences" className="bg-ivory py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 md:grid-cols-3 md:px-8">
          <div className="md:col-span-1">
            <p className="label mb-4">Beyond the Villa</p>
            <h2 className="text-4xl leading-tight md:text-5xl">Days shaped around you.</h2>
          </div>
          <div className="relative min-h-[360px] overflow-hidden md:col-span-2">
            <Image src={estateImage} alt="Elegant villa interiors" fill className="object-cover" unoptimized />
          </div>
          <div className="border-t border-charcoal/15 pt-6">
            <h3 className="mb-3 text-2xl">Private tables</h3>
            <p className="leading-7 text-charcoal/65">Local chefs, long lunches, and dinners that turn the villa into the destination.</p>
          </div>
          <div className="border-t border-charcoal/15 pt-6">
            <h3 className="mb-3 text-2xl">Quiet mornings</h3>
            <p className="leading-7 text-charcoal/65">Yoga, swims, slow breakfasts, and time that is deliberately unhurried.</p>
          </div>
          <div className="border-t border-charcoal/15 pt-6">
            <h3 className="mb-3 text-2xl">Goa close by</h3>
            <p className="leading-7 text-charcoal/65">Beaches, old villages, markets, and music within easy reach of the front gate.</p>
          </div>
        </div>
      </section>

      <section id="locations" className="relative min-h-[70vh]">
        <Image src={poolImage} alt="Poolside villa in North Goa" fill className="object-cover" unoptimized />
        <div className="absolute inset-0 bg-charcoal/55" />
        <div className="absolute inset-0 flex items-center px-5 md:px-8">
          <div className="mx-auto w-full max-w-7xl">
            <div className="max-w-2xl text-ivory">
              <p className="label mb-5 text-ivory/80">Assagao, Anjuna, Vagator, Siolim</p>
              <h2 className="mb-6 text-5xl leading-tight md:text-7xl">
                North Goa without the rush.
              </h2>
              <p className="text-lg leading-8 text-ivory/75">
                The best stays sit just off the obvious path: close to the beaches and old village lanes, but quiet enough to feel entirely your own.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-charcoal px-5 py-12 text-ivory md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 border-t border-ivory/15 pt-8 md:flex-row">
          <div>
            <h3 className="font-display text-3xl">Not Just A Stay</h3>
            <p className="mt-3 max-w-md text-sm leading-6 text-ivory/55">
              Luxury villa stays in North Goa.
            </p>
          </div>
          <div className="text-sm leading-7 text-ivory/60">
            <p>North Goa, India</p>
            <p>hello@notjustastay.com</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
