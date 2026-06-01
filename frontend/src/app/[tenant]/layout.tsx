interface TenantLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    tenant: string;
  }>;
}

export default async function TenantLayout({
  children,
  params,
}: TenantLayoutProps) {
  const { tenant } = await params;

  // TODO: Fetch tenant branding in Phase 3
  // const tenantData = await getTenant(tenant);

  return (
    <div className="min-h-screen">
      <nav className="border-b bg-white px-4 py-3">
        <div className="container mx-auto flex items-center justify-between">
          <span className="font-semibold">
            {tenant.charAt(0).toUpperCase() + tenant.slice(1)}
          </span>
          <span className="text-sm text-gray-500">Admin</span>
        </div>
      </nav>
      {children}
    </div>
  );
}
