import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { CurrencyProvider } from '@/lib/CurrencyContext';
import Navbar from '@/components/layout/Navbar';

export const metadata: Metadata = {
  title: 'Plain Figures — Financial Calculators & Learning Centre',
  description: 'Accurate financial and insurance calculators plus formula-first guides. Mortgage, compound interest, salary, retirement, and more. No advice. No noise. Just the maths.',
  metadataBase: new URL('https://plainfigures.org'),
  openGraph: {
    title: 'Plain Figures — Financial Calculators & Learning Centre',
    description: 'Neutral numbers you can trust. 26 calculators and 8 formula-first guides.',
    type: 'website',
    images: [{ url: '/lockup-dark@2x.png', width: 528, height: 80 }],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
    other: [
      { rel: 'mask-icon', url: '/favicon.svg', color: '#3b82c4' },
    ],
  },
  manifest: '/site.webmanifest',
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
    <html lang="en">
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <CurrencyProvider>
          <Navbar />
          <main style={{ minHeight: 'calc(100vh - 60px)', paddingBottom: '4rem' }}>
            {children}
          </main>
          <footer style={{
            borderTop: '1px solid var(--border)',
            padding: '1.5rem 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.03em' }}>
              PLAIN FIGURES — Numbers without noise. Not financial advice.
            </span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>
              Updated Feb 2026 — 2025/26 UK tax bands
            </span>
          </footer>
        </CurrencyProvider>
      </body>
    </html>
  );
}
