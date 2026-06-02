import { RootPage, generatePageMetadata } from '@payloadcms/next/views';
import { importMap } from '@/app/importMap';

type Args = {
  params: Promise<{
    segments: string[];
  }>;
  searchParams: Promise<{
    [key: string]: string;
  }>;
};

export const generateMetadata = generatePageMetadata;

export default async function AdminPage(props: Args) {
  return RootPage({
    ...props,
    config: (await import('../../payload.config')).default,
    importMap,
  });
}
