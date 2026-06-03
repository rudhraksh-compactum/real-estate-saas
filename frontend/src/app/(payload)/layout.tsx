import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts';
import configPromise from '../../../payload.config';
import { importMap } from '@/app/importMap';

export default function PayloadLayout({ children }: { children: React.ReactNode }) {
  return RootLayout({
    children,
    config: Promise.resolve(configPromise),
    importMap,
    serverFunction: async (args) => {
      'use server';

      return handleServerFunctions({
        ...args,
        config: Promise.resolve(configPromise),
        importMap,
      });
    },
  });
}
