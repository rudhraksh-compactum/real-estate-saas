import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPropertyBySlug } from '@/lib/data/properties';
import { generatePropertyJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo/json-ld';
import { PropertyDetail } from '@/components/PropertyDetail';

interface PropertyPageProps {
  params: Promise<{ tenant: string; slug: string }>;
}

/**
 * Generate SEO metadata for the property detail page
 */
export async function generateMetadata({ params }: PropertyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    return {
      title: 'Property Not Found | Not Just A Stay',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://notjustastay.com';
  const description = property.shortDescription || property.description?.slice(0, 160);

  return {
    title: `${property.title} | Not Just A Stay`,
    description,
    alternates: {
      canonical: `/properties/${slug}`,
    },
    openGraph: {
      title: property.title,
      description,
      images: property.featuredImage?.url ? [{ url: property.featuredImage.url }] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: property.title,
      description,
      images: property.featuredImage?.url ? [property.featuredImage.url] : [],
    },
  };
}

/**
 * Breadcrumbs Component
 */
function Breadcrumbs({
  items,
}: {
  items: Array<{ label: string; href?: string }>;
}) {
  return (
    <nav className="text-sm mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center flex-wrap gap-1">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <span className="mx-2 text-gray-400">/</span>}
            {item.href ? (
              <a
                href={item.href}
                className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                {item.label}
              </a>
            ) : (
              <span className="text-gray-500">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * Property Detail Page
 * Server-side rendered page with JSON-LD structured data
 */
export default async function PropertyPage({ params }: PropertyPageProps) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  // Return 404 if property not found
  if (!property) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://notjustastay.com';

  // Generate JSON-LD schemas
  const propertyJsonLd = generatePropertyJsonLd({ property, baseUrl });
  const breadcrumbJsonLd = generateBreadcrumbJsonLd({ property, baseUrl });

  return (
    <>
      {/* RealEstateListing JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(propertyJsonLd) }}
      />

      {/* BreadcrumbList JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Properties', href: '/properties' },
            { label: property.title },
          ]}
        />

        {/* Property Detail Component */}
        <PropertyDetail property={property} />
      </div>
    </>
  );
}
