import { RootPage } from '@payloadcms/next/views';
import { importMap } from '@/app/importMap';

type PageProps = {
  params: Promise<{ segments: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] }>;
};

export async function generateMetadata({ params, searchParams }: PageProps) {
  const { segments } = await params;
  const resolvedSearchParams = await searchParams;
  const collection = segments?.[0];
  const id = segments?.[1];

  return {
    title: `Payload CMS - ${collection || 'Admin'}${id ? ` / ${id}` : ''}`,
  };
}

export default async function AdminPage(props: PageProps) {
  return RootPage({
    ...props,
    config: (await import('../../../../payload.config')).default,
    importMap,
  });
}
