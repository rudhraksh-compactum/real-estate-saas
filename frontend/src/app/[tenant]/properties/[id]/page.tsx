import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getPropertyBySlug, getPublishedProperties } from '@/lib/data/properties';
import { PropertyGallery } from '@/components/PropertyGallery';
import InquiryForm from '@/components/InquiryForm';

interface PropertyPageProps {
  params: Promise<{
    tenant: string;
    id: string;
  }>;
}

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

export async function generateStaticParams() {
  const { docs } = await getPublishedProperties({ limit: 100 });

  return docs.map((property) => ({
    id: property.id,
  }));
}

export default async function PropertyPage({
  params,
}: PropertyPageProps) {
  const { id } = await params;
  const property = await getPropertyBySlug(id);

  if (!property) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Image Gallery */}
      <div className="relative">
        <PropertyGallery
          images={[
            property.featuredImage,
            ...(property.gallery || []),
          ]}
          title={property.title}
        />
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {property.title}
              </h1>
              <p className="text-gray-600">
                {property.address.street}, {property.address.city}, {property.address.state}
              </p>
            </div>

            {/* Quick Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-wrap gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Type:</span>{' '}
                  <span className="font-medium">{property.bhkType.replace('_', ' ').toUpperCase()}</span>
                </div>
                <div>
                  <span className="text-gray-500">Price:</span>{' '}
                  <span className="font-medium text-xl text-emerald-600">
                    ₹{property.nightlyPrice.toLocaleString()}/night
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">About this property</h2>
              <p className="text-gray-700 whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Amenities */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Amenities</h2>
                <div className="flex flex-wrap gap-2">
                  {property.amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm capitalize"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Location */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Location</h2>
              <p className="text-gray-700">
                {property.address.street}
                <br />
                {property.address.city}, {property.address.state} {property.address.zipCode}
                <br />
                {property.address.country}
              </p>
              {property.geolocation && (
                <div className="mt-4 h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Map: {property.geolocation.lat}, {property.geolocation.lng}</span>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <div className="text-center mb-6">
                <span className="text-3xl font-bold text-emerald-600">
                  ₹{property.nightlyPrice.toLocaleString()}
                </span>
                <span className="text-gray-500"> / night</span>
              </div>

              <InquiryForm propertyId={property.id} propertyTitle={property.title} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
