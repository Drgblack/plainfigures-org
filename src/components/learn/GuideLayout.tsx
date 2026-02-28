import Link from 'next/link';
import { ReactNode } from 'react';

interface GuideLayoutProps {
  number?: string;
  title: string;
  readTime: string;
  keywords?: string[];
  children: ReactNode;
}

export default function GuideLayout({ number, title, readTime, keywords, children }: GuideLayoutProps) {
  return (
    <div style={{ maxWidth: '780px', margin: '0 auto', padding: '3rem 2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: '2.5rem' }}>
        <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>PLAIN FIGURES</Link>
        <span>/</span>
        <Link href="/learn" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>LEARNING CENTRE</Link>
        {number && (
          <>
            <span>/</span>
            <span style={{ color: 'var(--accent)' }}>{number}</span>
          </>
        )}
      </div>

      <div style={{ marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem', flexWrap: 'wrap' }}>
          {number && (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.08em', border: '1px solid var(--accent)', borderRadius: '3px', padding: '0.18rem 0.45rem' }}>
              {number}
            </span>
          )}
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.1em', border: '1px solid var(--border)', borderRadius: '3px', padding: '0.18rem 0.45rem' }}>
            {readTime} read
          </span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(1.55rem, 3.4vw, 2.35rem)', fontWeight: 400, color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: keywords && keywords.length ? '1rem' : 0 }}>
          {title}
        </h1>
        {keywords && keywords.length > 0 && (
          <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
            {keywords.slice(0, 6).map(keyword => (
              <span key={keyword} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)', border: '1px solid var(--border)', borderRadius: '3px', padding: '0.12rem 0.4rem' }}>
                {keyword}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="guide-content">
        {children}
      </div>

      <div style={{ marginTop: '2.5rem', padding: '1rem 1.25rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
        This guide is for general information only. Plain Figures does not provide financial advice.
      </div>
    </div>
  );
}
