import Image from 'next/image';
import Link from 'next/link';
import { CalendarDays, MapPin } from 'lucide-react';
import { getFeaturedProperties } from '@/lib/data/properties';
import type { Property } from '@/types';
import { getPropertyImageUrl } from '@/lib/media';

const heroImage = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=2400&q=85&auto=format&fit=crop';
const storyImage = 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1800&q=85&auto=format&fit=crop';
const diningImage = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800&q=85&auto=format&fit=crop';
const wellnessImage = 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1400&q=85&auto=format&fit=crop';
const poolImage = 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1800&q=85&auto=format&fit=crop';

const fallbackProperties: Property[] = [
  {
    id: 'villa-solace',
    slug: 'villa-solace',
    title: 'Villa Solace',
    description: 'A private pool villa in peaceful Assagao with generous living spaces and garden views.',
    shortDescription: 'A private pool villa in peaceful Assagao with generous living spaces and garden views.',
    address: { city: 'Mapusa', state: 'Goa', locality: 'Assagao', country: 'India' },
    nightlyPrice: 18000,
    currency: 'INR',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1400&q=85&auto=format&fit=crop',
      alt: 'Villa Solace private pool',
    },
  },
  {
    id: 'rosa-blanca',
    slug: 'rosa-blanca',
    title: 'Rosa Blanca',
    description: 'A Portuguese-style Anjuna villa with an infinity pool, gardens, and grand gathering spaces.',
    shortDescription: 'A Portuguese-style Anjuna villa with an infinity pool, gardens, and grand gathering spaces.',
    address: { city: 'Mapusa', state: 'Goa', locality: 'Anjuna', country: 'India' },
    nightlyPrice: 25000,
    currency: 'INR',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&q=85&auto=format&fit=crop',
      alt: 'Rosa Blanca villa exterior',
    },
  },
  {
    id: 'nova-solace',
    slug: 'nova-solace',
    title: 'Nova Solace',
    description: 'A modern Chapora villa with a plunge pool near Vagator beach and the fort.',
    shortDescription: 'A modern Chapora villa with a plunge pool near Vagator beach and the fort.',
    address: { city: 'Mapusa', state: 'Goa', locality: 'Vagator', country: 'India' },
    nightlyPrice: 14000,
    currency: 'INR',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1400&q=85&auto=format&fit=crop',
      alt: 'Nova Solace modern exterior',
    },
  },
];

function imageFor(property?: Property) {
  return getPropertyImageUrl(property) || poolImage;
}

function hrefFor(property: Property) {
  return `/properties/${property.slug || property.id}`;
}

export default async function HomePage() {
  const payloadProperties = await getFeaturedProperties();
  const properties = payloadProperties.length > 0 ? payloadProperties : fallbackProperties;

  const estateCards = [
    {
      title: 'Villas',
      text: 'Private homes across Assagao, Anjuna, Vagator and Siolim.',
      href: '/properties',
      image: imageFor(properties[0]),
      alt: properties[0]?.featuredImage?.alt || 'Private villa in North Goa',
    },
    {
      title: 'Experiences',
      text: 'Poolside meals, slow mornings, local hosts and coastal days.',
      href: '#experiences',
      image: diningImage,
      alt: 'Villa dining experience',
    },
    {
      title: 'Visit, Eat, Stay',
      text: 'Old village lanes, beaches, markets and calm corners.',
      href: '#estate',
      image: poolImage,
      alt: 'North Goa villa pool',
    },
  ];

  return (
    <main className="min-h-screen bg-white text-neutral-950">
      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="grid grid-cols-3 items-center border-b border-neutral-200 px-5 py-4 md:px-10">
          <button className="justify-self-start text-sm font-semibold uppercase">
            Menu
          </button>
          <Link href="/" className="justify-self-center text-center text-3xl font-semibold leading-none md:text-4xl">
            Not Just<br className="md:hidden" /> A Stay
          </Link>
          <Link href="/properties" className="justify-self-end bg-neutral-950 px-5 py-3 text-sm font-semibold uppercase text-white hover:bg-[#b99b63] hover:text-neutral-950">
            Book
          </Link>
        </div>
        <nav className="mx-auto hidden max-w-5xl justify-center gap-10 px-5 py-4 text-sm font-semibold uppercase md:flex">
          <Link href="/properties" className="hover:text-[#a1834c]">Villas</Link>
          <a href="#experiences" className="hover:text-[#a1834c]">Experiences</a>
          <a href="#estate" className="hover:text-[#a1834c]">Visit, Eat, Stay</a>
          <a href="#stories" className="hover:text-[#a1834c]">Stories</a>
          <a href="#contact" className="hover:text-[#a1834c]">About</a>
        </nav>
      </header>

      <section className="relative min-h-[78vh]">
        <Image src={heroImage} alt="Private villa estate in North Goa" fill priority className="object-cover" unoptimized />
        <div className="absolute inset-0 bg-neutral-950/35" />
        <div className="absolute inset-x-0 bottom-0 px-5 pb-12 text-center text-white md:px-10 md:pb-16">
          <p className="mb-4 text-sm font-semibold uppercase">North Goa</p>
          <h1 className="mx-auto max-w-5xl text-5xl font-medium leading-none md:text-7xl lg:text-8xl">
            A Goan estate like no other
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/85">
            Private villas, hosted experiences and considered stays across the quieter side of North Goa.
          </p>
        </div>
      </section>

      <section className="bg-white px-5 py-16 text-center md:px-10 md:py-24">
        <p className="estate-kicker mb-4">Welcome to Not Just A Stay</p>
        <h2 className="mx-auto max-w-5xl text-4xl font-medium leading-tight md:text-6xl">
          Set among village lanes, garden pools and coastal light, our collection brings together the best ways to stay, gather and slow down in North Goa.
        </h2>
      </section>

      <section className="grid border-y border-neutral-200 md:grid-cols-3">
        {estateCards.map((card) => (
          <Link key={card.title} href={card.href} className="group border-b border-neutral-200 md:border-b-0 md:border-r md:last:border-r-0">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={card.image}
                alt={card.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                unoptimized
              />
            </div>
            <div className="p-6 md:p-8">
              <p className="estate-kicker mb-2">Explore</p>
              <h3 className="mb-3 text-3xl font-medium">{card.title}</h3>
              <p className="leading-7 text-neutral-600">{card.text}</p>
            </div>
          </Link>
        ))}
      </section>

      <section id="estate" className="grid bg-[#f3f0ea] md:grid-cols-2">
        <div className="relative min-h-[460px]">
          <Image src={storyImage} alt="Elegant villa interior" fill className="object-cover" unoptimized />
        </div>
        <div className="flex items-center px-5 py-16 md:px-16">
          <div className="max-w-xl">
            <p className="estate-kicker mb-4">Visit, Eat, Stay</p>
            <h2 className="mb-6 text-4xl font-medium leading-tight md:text-6xl">A place for long weekends and longer memories.</h2>
            <p className="mb-8 text-lg leading-8 text-neutral-700">
              From chef-led dinners and poolside mornings to village walks and beach evenings, every stay is built around the shape of your group.
            </p>
            <Link href="/properties" className="estate-button">
              Plan your stay
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-5 border-b border-neutral-200 pb-5 md:flex-row md:items-end">
            <div>
              <p className="estate-kicker mb-3">What&apos;s on</p>
              <h2 className="text-4xl font-medium md:text-6xl">Upcoming stays</h2>
            </div>
            <Link href="/properties" className="text-sm font-semibold uppercase hover:text-[#a1834c]">View all villas</Link>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {properties.slice(0, 3).map((property) => (
              <Link key={property.id} href={hrefFor(property)} className="group">
                <div className="relative mb-5 aspect-[4/3] overflow-hidden">
                  <Image
                    src={imageFor(property)}
                    alt={property.featuredImage?.alt || property.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    unoptimized
                  />
                </div>
                <h3 className="mb-4 text-3xl font-medium leading-tight group-hover:text-[#a1834c]">{property.title}</h3>
                <div className="mb-4 space-y-2 text-sm text-neutral-600">
                  <p className="flex items-center gap-2"><CalendarDays className="h-4 w-4" /> From ₹{property.nightlyPrice.toLocaleString()} per night</p>
                  <p className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {property.address?.locality || property.locality || property.address?.city}</p>
                </div>
                <p className="leading-7 text-neutral-600">{property.shortDescription}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="experiences" className="grid bg-neutral-950 text-white md:grid-cols-[0.9fr_1.1fr]">
        <div className="flex items-center px-5 py-16 md:px-16">
          <div className="max-w-xl">
            <p className="mb-4 text-sm font-semibold uppercase text-[#b99b63]">Dining, wellness and more</p>
            <h2 className="mb-6 text-4xl font-medium leading-tight md:text-6xl">Unforgettable experiences</h2>
            <p className="mb-8 text-lg leading-8 text-white/70">
              Arrange a private table, a wellness morning, a market visit or a day exploring the coast. The villa is only the beginning.
            </p>
            <a href="#contact" className="estate-button-light">
              Enquire
            </a>
          </div>
        </div>
        <div className="relative min-h-[520px]">
          <Image src={wellnessImage} alt="Wellbeing experience" fill className="object-cover" unoptimized />
        </div>
      </section>

      <section id="stories" className="bg-white px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 border-b border-neutral-200 pb-5">
            <p className="estate-kicker mb-3">Latest News</p>
            <h2 className="text-4xl font-medium md:text-6xl">Stories from the estate</h2>
            <p className="mt-4 max-w-2xl leading-7 text-neutral-600">Highlights, notes and seasonal ideas from our corner of North Goa.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              ['A season of renewal in Assagao', 'Village lanes, shaded courtyards and villas ready for the monsoon light.'],
              ['How to spend a slow weekend in Siolim', 'Markets, river views and long dinners without hurrying back.'],
              ['What makes a villa stay feel hosted', 'The details that turn a private house into a complete experience.'],
            ].map(([title, text]) => (
              <article key={title} className="border-t border-neutral-200 pt-5">
                <p className="mb-3 text-sm text-neutral-500">June 2026</p>
                <h3 className="mb-3 text-2xl font-medium leading-tight">{title}</h3>
                <p className="leading-7 text-neutral-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer id="contact" className="bg-neutral-950 px-5 py-12 text-white md:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 border-t border-white/15 pt-8 md:grid-cols-3">
          <div>
            <h3 className="text-3xl font-medium">Not Just A Stay</h3>
            <p className="mt-3 text-white/55">A North Goa estate of private villas and hosted experiences.</p>
          </div>
          <div className="text-sm leading-7 text-white/65">
            <p>North Goa, India</p>
            <p>hello@notjustastay.com</p>
          </div>
          <div className="text-sm leading-7 text-white/65 md:text-right">
            <Link href="/properties" className="hover:text-[#b99b63]">Book a villa</Link>
            <p>© 2026 Not Just A Stay</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
