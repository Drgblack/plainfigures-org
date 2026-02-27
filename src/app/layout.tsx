import type { Metadata } from 'next';
import './globals.css';
import { CurrencyProvider } from '@/lib/CurrencyContext';
import Navbar from '@/components/layout/Navbar';

export const metadata: Metadata = {
  title: 'Plain Figures — Financial Calculators',
  description: 'Clear, accurate financial calculators for everyday high-stakes decisions. No advice, no opinions. Just the maths.',
  metadataBase: new URL('https://plainfigures.org'),
  openGraph: {
    title: 'Plain Figures — Financial Calculators',
    description: 'Neutral numbers you can trust.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CurrencyProvider>
          <Navbar />
          <main style={{ minHeight: 'calc(100vh - 60px)', paddingBottom: '4rem' }}>
            {children}
          </main>
          <footer style={{
            borderTop: '1px solid var(--border)',
            padding: '2rem',
            textAlign: 'center',
            color: 'var(--text-muted)',
            fontSize: '0.8rem',
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.03em',
          }}>
            PLAIN FIGURES — Numbers without noise. Not financial advice.
          </footer>
        </CurrencyProvider>
      </body>
    </html>
  );
}
