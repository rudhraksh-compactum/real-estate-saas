import type { Metadata } from 'next';
import './globals.css';

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
      <body className="min-h-screen bg-gray-50 antialiased">
        {children}
      </body>
    </html>
  );
}
