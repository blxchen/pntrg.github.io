import type { Metadata } from 'next';
import './globals.css';
import Motion from './motion';
import SiteIntro from './site-intro';

const siteUrl = process.env.SITE_URL ?? 'https://blxchen.github.io/pntrg.github.io';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'PNTL — Positioning, Navigation & Timing Laboratory',
  description: 'PNTL is an independent research group building resilient positioning, navigation, sensing, and timing systems.',
  openGraph: {
    title: 'PNTL — Certainty for a world in motion.',
    description: 'Independent research in positioning, navigation, sensing, and timing.',
    url: siteUrl,
    siteName: 'PNTL',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'PNTL — Certainty for a world in motion.' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PNTL — Certainty for a world in motion.',
    description: 'Independent research in positioning, navigation, sensing, and timing.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SiteIntro />{children}<Motion /></body></html>;
}
