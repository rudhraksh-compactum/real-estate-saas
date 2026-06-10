import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import {
  ArrowLeft,
  Bath,
  Bed,
  CalendarDays,
  Car,
  Home,
  MapPin,
  Maximize2,
  ShieldCheck,
  Sparkles,
  Users,
  Waves,
  Wifi,
  Wind,
} from 'lucide-react';
import { getPropertyBySlug } from '@/lib/data/properties';
import { PropertyGallery } from '@/components/PropertyGallery';
import InquiryForm from '@/components/InquiryForm';
import { getStableImageUrl } from '@/lib/media';
import type { Property } from '@/types';

interface PropertyPageProps {
  params: Promise<{
    id: string;
  }>;
}

type GalleryImage = { url: string; alt?: string };

const amenityIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ac: Wind,
  parking: Car,
  pool: Waves,
  wifi: Wifi,
};

export async function generateMetadata({
  params,
}: PropertyPageProps): Promise<Metadata> {
  const { id } = await params;
  const property = await getPropertyBySlug(id);

  if (!property) {
    return { title: 'Property Not Found' };
  }

  return {
    title: `${property.title} | Not Just A Stay`,
    description: property.shortDescription || property.description.slice(0, 160),
    openGraph: {
      title: property.title,
      description: property.shortDescription || property.description.slice(0, 160),
      images: property.featuredImage ? [property.featuredImage.url] : [],
    },
  };
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
}

function getLocation(property: Property) {
  return [property.locality || property.address?.locality, property.address?.city, property.address?.state]
    .filter(Boolean)
    .join(', ');
}

function getGalleryImages(property: Property): GalleryImage[] {
  const featured = property.featuredImage?.url
    ? [{
        ...property.featuredImage,
        url: getStableImageUrl(property.featuredImage.url, property.title),
      }]
    : [];

  const gallery = (property.gallery || [])
    .filter((image) => image?.url)
    .map((image) => ({
      ...image,
      url: getStableImageUrl(image.url, property.title),
    }));

  const deduped = [...featured, ...gallery].filter((image, index, all) => (
    all.findIndex((candidate) => candidate.url === image.url) === index
  ));

  return deduped.length > 0 ? deduped : [{
    url: getStableImageUrl(null, property.title),
    alt: property.title,
  }];
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
}) {
  return (
    <div className="border-t border-black/10 pt-4">
      <Icon className="mb-3 h-4 w-4 text-[#A1834C]" />
      <p className="text-[11px] font-semibold uppercase text-[#8b8b8b]">{label}</p>
      <p className="mt-1 text-lg font-medium text-[#141414]">{value}</p>
    </div>
  );
}

function Amenity({ amenity }: { amenity: string }) {
  const key = amenity.toLowerCase();
  const Icon = amenityIconMap[key] || Sparkles;

  return (
    <div className="flex items-center gap-3 border-t border-black/10 py-4">
      <Icon className="h-4 w-4 text-[#A1834C]" />
      <span className="text-sm font-medium capitalize text-[#141414]">
        {amenity.replace(/[-_]/g, ' ')}
      </span>
    </div>
  );
}

export default async function PropertyPage({
  params,
}: PropertyPageProps) {
  const { id } = await params;
  const property = await getPropertyBySlug(id);

  if (!property) {
    notFound();
  }

  const images = getGalleryImages(property);
  const heroImage = images[0];
  const secondaryImage = images[1] || images[0];
  const location = getLocation(property);

  return (
    <main className="min-h-screen bg-[#F8F8F8] text-[#141414]">
      <header className="border-b border-black/10 bg-[#F8F8F8]/90 px-5 py-5 backdrop-blur-md md:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5">
          <Link href="/properties" className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase text-[#6f6f6f] transition-colors hover:text-[#141414]">
            <ArrowLeft className="h-4 w-4" />
            Villas
          </Link>
          <Link href="/" className="text-center text-2xl font-semibold leading-none tracking-tight">
            Not Just<br />A Stay
          </Link>
          <a href="#request" className="bg-[#141414] px-5 py-3 text-[12px] font-semibold uppercase tracking-wide text-white transition-colors hover:bg-[#A1834C]">
            Request
          </a>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-8 md:grid-cols-12 md:px-10 md:py-12">
        <div className="flex flex-col justify-between md:col-span-5">
          <div>
            <p className="mb-5 text-[12px] font-semibold uppercase text-[#A1834C]">Private villa in North Goa</p>
            <h1 className="max-w-xl text-5xl font-medium leading-[0.98] tracking-tight md:text-7xl">
              {property.title}
            </h1>
            {location && (
              <p className="mt-6 flex items-center gap-2 text-base text-[#6f6f6f]">
                <MapPin className="h-4 w-4 text-[#A1834C]" />
                {location}
              </p>
            )}
            <p className="mt-8 max-w-xl text-lg leading-8 text-[#6f6f6f]">
              {property.shortDescription || property.description}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-4">
            {property.bedrooms && <Stat icon={Bed} label="Bedrooms" value={property.bedrooms} />}
            {property.bathrooms && <Stat icon={Bath} label="Baths" value={property.bathrooms} />}
            {property.maxGuests && <Stat icon={Users} label="Guests" value={property.maxGuests} />}
            {property.minNights && (
              <Stat
                icon={CalendarDays}
                label="Min stay"
                value={`${property.minNights} night${property.minNights === 1 ? '' : 's'}`}
              />
            )}
          </div>
        </div>

        <div className="md:col-span-7">
          <div className="grid gap-3 md:grid-cols-[1fr_0.42fr]">
            <div className="group relative aspect-[4/3] overflow-hidden bg-neutral-200 md:aspect-[1.15/1]">
              <Image
                src={heroImage.url}
                alt={heroImage.alt || property.title}
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 58vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 bg-white/90 px-4 py-3 backdrop-blur-md">
                <p className="text-[11px] font-semibold uppercase text-[#8b8b8b]">From</p>
                <p className="text-2xl font-medium">{formatCurrency(property.nightlyPrice)}</p>
              </div>
            </div>
            <div className="hidden gap-3 md:grid">
              <div className="relative overflow-hidden bg-neutral-200">
                <Image
                  src={secondaryImage.url}
                  alt={secondaryImage.alt || property.title}
                  fill
                  className="object-cover"
                  sizes="22vw"
                />
              </div>
              <a href="#gallery" className="flex min-h-[160px] flex-col justify-between bg-[#141414] p-5 text-white transition-colors hover:bg-[#A1834C]">
                <Maximize2 className="h-5 w-5" />
                <span className="text-sm font-semibold uppercase tracking-wide">View gallery</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 pb-12 md:grid-cols-12 md:px-10">
        <div className="space-y-10 md:col-span-7">
          <section className="border-t border-black/10 pt-8">
            <div className="grid gap-6 md:grid-cols-12">
              <h2 className="text-3xl font-medium tracking-tight md:col-span-5 md:text-5xl">
                Designed for slow mornings and hosted evenings.
              </h2>
              <div className="space-y-5 text-base leading-8 text-[#6f6f6f] md:col-span-7">
                <p>{property.description}</p>
                <p>
                  Our team helps shape the stay around your group, from arrival timing and meal planning to local experiences across the quieter side of Goa.
                </p>
              </div>
            </div>
          </section>

          {property.amenities && property.amenities.length > 0 && (
            <section className="border-t border-black/10 pt-8">
              <div className="mb-6 flex items-end justify-between gap-5">
                <div>
                  <p className="text-[12px] font-semibold uppercase text-[#A1834C]">Amenities</p>
                  <h2 className="mt-2 text-3xl font-medium tracking-tight">What is included</h2>
                </div>
                <ShieldCheck className="hidden h-8 w-8 text-[#A1834C] md:block" />
              </div>
              <div className="grid gap-x-8 md:grid-cols-2">
                {property.amenities.map((amenity) => (
                  <Amenity key={amenity} amenity={amenity} />
                ))}
              </div>
            </section>
          )}

          <section className="grid gap-4 border-t border-black/10 pt-8 md:grid-cols-3">
            <div className="bg-white p-6">
              <p className="text-[12px] font-semibold uppercase text-[#8b8b8b]">Hosted stay</p>
              <p className="mt-4 text-3xl font-medium">24 hr</p>
              <p className="mt-2 text-sm leading-6 text-[#6f6f6f]">Local assistance for arrivals, housekeeping and special requests.</p>
            </div>
            <div className="bg-white p-6">
              <p className="text-[12px] font-semibold uppercase text-[#8b8b8b]">Best for</p>
              <p className="mt-4 text-3xl font-medium">Groups</p>
              <p className="mt-2 text-sm leading-6 text-[#6f6f6f]">Families, celebrations and long weekends with friends.</p>
            </div>
            <div className="bg-white p-6">
              <p className="text-[12px] font-semibold uppercase text-[#8b8b8b]">Location</p>
              <p className="mt-4 text-3xl font-medium">{property.locality || property.address?.city}</p>
              <p className="mt-2 text-sm leading-6 text-[#6f6f6f]">A calm North Goa base close to beaches, markets and village lanes.</p>
            </div>
          </section>

          <section id="gallery" className="border-t border-black/10 pt-8">
            <div className="mb-6">
              <p className="text-[12px] font-semibold uppercase text-[#A1834C]">Gallery</p>
              <h2 className="mt-2 text-3xl font-medium tracking-tight">A closer look</h2>
            </div>
            <PropertyGallery images={images} title={property.title} />
          </section>
        </div>

        <aside id="request" className="md:col-span-5 lg:col-span-4 lg:col-start-9">
          <div className="sticky top-6 space-y-4">
            <InquiryForm
              propertyId={String(property.id)}
              propertyTitle={property.title}
              nightlyPrice={property.nightlyPrice}
            />
            <div className="bg-white p-6 ring-1 ring-black/5">
              <p className="text-[12px] font-semibold uppercase text-[#8b8b8b]">How it works</p>
              <div className="mt-5 space-y-4 text-sm leading-6 text-[#6f6f6f]">
                <p><span className="font-semibold text-[#141414]">1.</span> Share dates, guests and preferences.</p>
                <p><span className="font-semibold text-[#141414]">2.</span> Our host confirms availability and options.</p>
                <p><span className="font-semibold text-[#141414]">3.</span> Finalize your stay directly with the team.</p>
              </div>
            </div>
          </div>
        </aside>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-white/95 p-3 backdrop-blur-md md:hidden">
        <a href="#request" className="flex items-center justify-between bg-[#141414] px-5 py-4 text-white">
          <span className="text-sm font-semibold uppercase tracking-wide">Request stay</span>
          <span className="text-sm">{formatCurrency(property.nightlyPrice)} / night</span>
        </a>
      </div>
    </main>
  );
}
