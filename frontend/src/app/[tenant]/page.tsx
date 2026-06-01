import { Metadata } from 'next';

// This page will be enhanced in Phase 3 with tenant resolution
// and Phase 6 with SSR and property listings

interface TenantPageProps {
  params: Promise<{
    tenant: string;
  }>;
}

// Dynamic metadata for SEO
export async function generateMetadata({
  params,
}: TenantPageProps): Promise<Metadata> {
  const { tenant } = await params;
  return {
    title: `${tenant} | Real Estate SaaS`,
    description: `Browse properties on ${tenant}'s branded platform`,
  };
}

// Placeholder - will fetch tenant data in Phase 3
export default async function TenantHomePage({
  params,
}: TenantPageProps) {
  const { tenant } = await params;

  return (
    <main className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {tenant.charAt(0).toUpperCase() + tenant.slice(1)}
        </h1>
        <p className="text-gray-600">
          Welcome to your branded property platform
        </p>
      </header>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Property cards will be added in Phase 6 */}
          <div className="border rounded-lg p-4 bg-white shadow-sm">
            <p className="text-gray-500">
              Property listings will appear here...
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">Phase 1 Status</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>[x] Infrastructure setup</li>
          <li>[ ] Tenant routing (Phase 3)</li>
          <li>[ ] Property listings (Phase 6)</li>
          <li>[ ] Property details (Phase 6)</li>
        </ul>
      </section>
    </main>
  );
}
