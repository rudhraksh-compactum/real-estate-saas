import { Metadata } from 'next';
import { getFeaturedProperties } from '@/lib/data/properties';
import { HeroSearch } from '@/components/HeroSearch';
import { FeaturedProperties } from '@/components/FeaturedProperties';

interface TenantPageProps {
  params: Promise<{
    tenant: string;
  }>;
}

// Dynamic metadata for SEO
export async function generateMetadata({
  params,
}: TenantPageProps): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://notjustastay.com';
  return {
    title: 'Not Just A Stay | Find Your Perfect Short-Let Property',
    description:
      'Discover unique short-let properties for your next getaway. Book directly with local hosts for authentic experiences.',
    openGraph: {
      title: 'Not Just A Stay',
      description: 'Discover unique short-let properties for your next getaway',
      type: 'website',
      url: baseUrl,
    },
  };
}

// Home page with hero search and featured properties
export default async function TenantHomePage({
  params,
}: TenantPageProps) {
  const { tenant } = await params;

  // Fetch featured properties for display
  const properties = await getFeaturedProperties();

  return (
    <>
      {/* Hero Section with Search */}
      <HeroSearch />

      {/* Featured Properties Section */}
      <FeaturedProperties properties={properties} className="py-12 bg-gray-50" />
    </>
  );
}
