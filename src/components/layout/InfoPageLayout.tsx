import Link from 'next/link';
import { ReactNode } from 'react';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import { buildInfoBreadcrumbs } from '@/lib/seo/relatedLinks';

interface InfoPageLayoutProps {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}

export default function InfoPageLayout({ eyebrow, title, description, children }: InfoPageLayoutProps) {
  return (
    <div style={{ maxWidth: '820px', margin: '0 auto', padding: '3rem 2rem' }}>
      <Breadcrumbs items={buildInfoBreadcrumbs(title)} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: '1.25rem' }}>
        <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>PLAIN FIGURES</Link>
        <span>/</span>
        <span style={{ color: 'var(--accent)' }}>{eyebrow.toUpperCase()}</span>
      </div>

      <div style={{ marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', color: 'var(--accent)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
          {eyebrow}
        </div>
        <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(1.65rem, 3.6vw, 2.4rem)', fontWeight: 400, color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: '1rem' }}>
          {title}
        </h1>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7, fontWeight: 300 }}>
          {description}
        </p>
      </div>

      <div className="guide-content">
        {children}
      </div>
    </div>
  );
}
