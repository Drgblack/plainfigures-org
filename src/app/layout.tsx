import type { Metadata } from 'next';
import AdSlot from '@/components/ui/AdSlot';
import Script from 'next/script';
import './globals.css';
import { CurrencyProvider } from '@/lib/CurrencyContext';
import Navbar from '@/components/layout/Navbar';
import LangSwitcher, { LangProvider } from '@/components/ui/LangSwitcher';

export const metadata: Metadata = {
  title: {
    default: 'Plain Figures — Financial Calculators & Learning Centre',
    template: '%s — Plain Figures',
  },
  description: 'Accurate financial and insurance calculators plus formula-first guides. Mortgage, compound interest, salary, retirement, and more. No advice. No noise. Just the maths.',
  metadataBase: new URL('https://plainfigures.org'),
  keywords: [
    'financial calculator', 'mortgage calculator', 'compound interest calculator',
    'salary take-home calculator', 'retirement calculator', 'rent vs buy calculator',
    'UK financial tools', 'no advice financial maths',
  ],
  authors: [{ name: 'Plain Figures', url: 'https://plainfigures.org' }],
  creator: 'Plain Figures',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Plain Figures — Financial Calculators & Learning Centre',
    description: 'Neutral numbers you can trust. 26 calculators and 16 formula-first guides. No advice. No noise.',
    type: 'website',
    url: 'https://plainfigures.org',
    siteName: 'Plain Figures',
    locale: 'en_GB',
    images: [{
      url: '/lockup-dark@2x.png',
      width: 528,
      height: 80,
      alt: 'Plain Figures — Financial Calculators',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Plain Figures — Financial Calculators',
    description: 'Neutral numbers. No advice. No noise. 26 calculators and 16 guides.',
    images: ['/lockup-dark@2x.png'],
  },
  alternates: {
    canonical: 'https://plainfigures.org',
    languages: {
      'en-GB': 'https://plainfigures.org',
      'en-US': 'https://plainfigures.org',
      'de': 'https://plainfigures.org/?lang=de',
      'fr': 'https://plainfigures.org/?lang=fr',
      'es': 'https://plainfigures.org/?lang=es',
      'zh': 'https://plainfigures.org/?lang=zh',
    },
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    other: [{ rel: 'mask-icon', url: '/favicon.svg', color: '#3b82c4' }],
  },
  manifest: '/site.webmanifest',
};

// JSON-LD structured data — WebSite + Organization
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://plainfigures.org/#website',
      'url': 'https://plainfigures.org',
      'name': 'Plain Figures',
      'description': 'Neutral financial calculators. No advice. No noise.',
      'inLanguage': ['en-GB', 'en-US', 'de', 'fr', 'es', 'zh'],
      'potentialAction': {
        '@type': 'SearchAction',
        'target': {
          '@type': 'EntryPoint',
          'urlTemplate': 'https://plainfigures.org/?q={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'Organization',
      '@id': 'https://plainfigures.org/#organization',
      'url': 'https://plainfigures.org',
      'name': 'Plain Figures',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://plainfigures.org/lockup-dark@2x.png',
        'width': 528,
        'height': 80,
      },
    },
  ],
};

// Inline script prevents theme flash before React hydrates
const themeScript = `
  try {
    var t = localStorage.getItem('pf_theme_v1') || 'dark';
    document.documentElement.setAttribute('data-theme', t);
  } catch(e) {}
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <CurrencyProvider>
          <LangProvider>
          {/* Skip-to-content accessibility link */}
          <a
            href="#main-content"
            className="skip-to-content"
          >
            Skip to content
          </a>

          <Navbar />
          <main
            id="main-content"
            tabIndex={-1}
            style={{ minHeight: 'calc(100vh - 60px)', paddingBottom: '4rem', outline: 'none' }}
          >
            {children}
          </main>
          {/* Footer leaderboard — renders only when NEXT_PUBLIC_ADS_ENABLED=true */}

          <AdSlot slot="footer-leaderboard" />

          <footer
            role="contentinfo"
            aria-label="Site footer"
            style={{
              borderTop: '1px solid var(--border)',
              padding: '1.5rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.03em' }}>
                PLAIN FIGURES — Numbers without noise. Not financial advice.
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <LangSwitcher />
                <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>
                  Updated Feb 2026 — 2025/26 UK tax bands
                </span>
              </div>
            </div>
            <nav aria-label="Footer navigation">
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                {([
                  ['/about', 'About'],
                  ['/privacy', 'Privacy'],
                  ['/terms', 'Terms'],
                  ['/disclaimer', 'Disclaimer'],
                  ['/contact', 'Contact'],
                ] as [string, string][]).map(([href, label]) => (
                  <a key={href} href={href} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', textDecoration: 'none', letterSpacing: '0.06em' }}>
                    {label}
                  </a>
                ))}
              </div>
            </nav>
          </footer>
          </LangProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
