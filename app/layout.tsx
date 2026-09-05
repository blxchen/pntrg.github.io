import type { Metadata } from 'next';
import './globals.css';
import Motion from './motion';
import SiteIntro from './site-intro';

const siteUrl = process.env.SITE_URL ?? 'https://pntl-nsslglobal.chen-brandon1213.chatgpt.site';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'PNTL — Positioning, Navigation & Timing Laboratory',
  description: 'PNTL at NSSLGlobal builds resilient positioning, navigation, sensing, and timing systems.',
  openGraph: {
    title: 'PNTL — Certainty for a world in motion.',
    description: 'Positioning, navigation, sensing, and timing research at NSSLGlobal.',
    url: siteUrl,
    siteName: 'PNTL',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'PNTL — Certainty for a world in motion.' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PNTL — Certainty for a world in motion.',
    description: 'Positioning, navigation, sensing, and timing research at NSSLGlobal.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SiteIntro />{children}<Motion /></body></html>;
}
