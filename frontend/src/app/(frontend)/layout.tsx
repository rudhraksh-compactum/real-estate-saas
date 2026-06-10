import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import '../globals.css';

const display = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
});

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Not Just A Stay - Luxury Villa Stays in North Goa',
  description: 'Discover our handpicked collection of luxury villas in North Goa. Private pools, stunning locations, and unforgettable experiences await you.',
  openGraph: {
    title: 'Not Just A Stay - Luxury Villa Stays in North Goa',
    description: 'Discover our handpicked collection of luxury villas in North Goa.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${sans.variable} min-h-screen bg-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
