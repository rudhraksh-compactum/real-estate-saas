export const fallbackVillaImage =
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=85&auto=format&fit=crop';

export function getImageUrl(url?: string | null): string {
  if (!url) return fallbackVillaImage;

  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/')) {
    return url;
  }

  return `/${url.replace(/^\/+/, '')}`;
}

export function isRemoteImage(url?: string | null): boolean {
  return Boolean(url?.startsWith('http://') || url?.startsWith('https://'));
}
