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
    config: import('@/payload.config').then(m => m.default),
    importMap,
  });
}
