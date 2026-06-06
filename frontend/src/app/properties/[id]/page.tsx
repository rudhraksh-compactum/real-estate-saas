import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, Users, Bed, Bath, MapPin } from 'lucide-react';
import { getPropertyBySlug, getPublishedProperties } from '@/lib/data/properties';
import InquiryForm from '@/components/InquiryForm';
import { getImageUrl, isRemoteImage } from '@/lib/media';

interface PropertyPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PropertyPageProps): Promise<Metadata> {
  const { id } = await params;
  const property = await getPropertyBySlug(id);

  if (!property) {
    return { title: 'Property Not Found' };
  }

  return {
    title: `${property.title} | Not Just A Stay`,
    description: property.shortDescription || property.description.slice(0, 160),
  };
}

export async function generateStaticParams() {
  const { docs } = await getPublishedProperties({ limit: 100 });
  return docs.map((property) => ({ id: property.id }));
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { id } = await params;
  const property = await getPropertyBySlug(id);

  if (!property) {
    notFound();
  }

  const allImages = [
    property.featuredImage || { url: '/placeholder.jpg', alt: property.title },
    ...(property.gallery || []),
  ].map((image) => ({
    ...image,
    url: getImageUrl(image.url),
  }));

  return (
    <div className="min-h-screen bg-ivory">
      {/* Hero Gallery */}
      <section className="relative h-[70vh]">
        <Image
          src={allImages[0]?.url}
          alt={property.title}
          fill
          className="object-cover"
          priority
          unoptimized={isRemoteImage(allImages[0]?.url)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />

        {/* Back button */}
        <Link
          href="/properties"
          className="absolute top-8 left-8 flex items-center gap-2 text-ivory hover:text-gold transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm uppercase">Back to Villas</span>
        </Link>

        {/* Property Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="container mx-auto">
            <p className="label text-ivory mb-2">
              {property.address?.locality || property.address?.city}, {property.address?.state}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-ivory">
              {property.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Image Gallery Thumbnails */}
      {allImages.length > 1 && (
        <section className="bg-charcoal py-4">
          <div className="container mx-auto px-4">
            <div className="flex gap-4 overflow-x-auto pb-2">
              {allImages.slice(0, 5).map((image, index) => (
                <div key={index} className="relative w-32 h-24 flex-shrink-0 overflow-hidden">
                  <Image
                    src={image.url}
                    alt={image.alt || `${property.title} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                    unoptimized={isRemoteImage(image.url)}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Property Details */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-16">
              {/* Quick Info */}
              <div className="flex flex-wrap gap-8 py-8 border-b border-ivory-200">
                {property.bedrooms && (
                  <div className="flex items-center gap-3">
                    <Bed className="w-5 h-5 text-gold" />
                    <div>
                      <p className="text-xs text-charcoal/50 uppercase">Bedrooms</p>
                      <p className="text-lg text-charcoal font-medium">{property.bedrooms}</p>
                    </div>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="flex items-center gap-3">
                    <Bath className="w-5 h-5 text-gold" />
                    <div>
                      <p className="text-xs text-charcoal/50 uppercase">Bathrooms</p>
                      <p className="text-lg text-charcoal font-medium">{property.bathrooms}</p>
                    </div>
                  </div>
                )}
                {property.maxGuests && (
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-gold" />
                    <div>
                      <p className="text-xs text-charcoal/50 uppercase">Max Guests</p>
                      <p className="text-lg text-charcoal font-medium">{property.maxGuests}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <h2 className="text-2xl text-charcoal mb-6 gold-underline">About This Villa</h2>
                <p className="text-charcoal/70 text-lg leading-relaxed whitespace-pre-line">
                  {property.description}
                </p>
              </div>

              {/* Amenities */}
              {property.amenities && property.amenities.length > 0 && (
                <div>
                  <h2 className="text-2xl text-charcoal mb-6 gold-underline">Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {property.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-gold rounded-full" />
                        <span className="text-charcoal/70 capitalize">
                          {amenity.replace(/-/g, ' ')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Location */}
              <div>
                <h2 className="text-2xl text-charcoal mb-6 gold-underline">Location</h2>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gold mt-1" />
                  <div>
                    <p className="text-charcoal font-medium">
                      {property.address?.street}
                    </p>
                    <p className="text-charcoal/60">
                      {property.address?.locality && `${property.address.locality}, `}
                      {property.address?.city}, {property.address?.state} {property.address?.zipCode}
                    </p>
                    <p className="text-charcoal/60">{property.address?.country}</p>
                  </div>
                </div>
                {property.geolocation && (
                  <div className="mt-6 h-64 bg-ivory-200 rounded-lg flex items-center justify-center">
                    <p className="text-charcoal/40 text-sm">
                      Map: {property.geolocation.lat.toFixed(4)}, {property.geolocation.lng.toFixed(4)}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar - Booking Card */}
            <div className="lg:col-span-1">
              <div className="bg-charcoal p-8 sticky top-8">
                <div className="text-center mb-8">
                  <p className="text-4xl font-display text-ivory">
                    ₹{property.nightlyPrice.toLocaleString()}
                  </p>
                  <p className="text-ivory/50 text-sm">per night</p>
                </div>

                <InquiryForm propertyId={property.id} propertyTitle={property.title} />

                <div className="mt-8 pt-8 border-t border-ivory/10">
                  <p className="text-ivory/40 text-xs text-center">
                    Free cancellation up to 7 days before check-in
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More Properties */}
      <section className="section-spacing bg-ivory">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl text-charcoal">Explore More Villas</h2>
          </div>
          <div className="text-center">
            <Link href="/properties" className="btn-secondary">
              View All Properties
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal py-12">
        <div className="container mx-auto px-4 text-center">
          <Link href="/properties" className="text-ivory hover:text-gold transition-colors">
            ← Back to all villas
          </Link>
        </div>
      </footer>
    </div>
  );
}
