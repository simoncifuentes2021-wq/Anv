import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://nuestro-universo-cinco-anos.gpt-sjsp.chatgpt.site'),
  title: 'Nuestro Universo · Cinco años contigo',
  description: 'Una historia de amor contada entre estrellas, recuerdos y cinco constelaciones.',
  openGraph: {
    title: 'Nuestro Universo · Cinco años contigo',
    description: 'Cinco años. Una historia infinita.',
    type: 'website',
    images: [{ url: '/og.png', width: 1672, height: 940, alt: 'Nuestro Universo — Cinco años. Una historia infinita.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nuestro Universo · Cinco años contigo',
    description: 'Cinco años. Una historia infinita.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
