import Link from 'next/link';
import { ReactNode } from 'react';

interface GuideLayoutProps {
  title: string;
  description: string;
  readTime: string;
  relatedCalc: { href: string; label: string };
  relatedGuides?: { href: string; label: string }[];
  children: ReactNode;
}

export default function GuideLayout({ title, description, readTime, relatedCalc, relatedGuides, children }: GuideLayoutProps) {
  return (
    <div style={{ maxWidth: '780px', margin: '0 auto', padding: '3rem 2rem' }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: '2.5rem' }}>
        <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>PLAIN FIGURES</Link>
        <span>/</span>
        <Link href="/learn" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>LEARNING CENTRE</Link>
        <span>/</span>
        <span style={{ color: 'var(--accent)' }}>{title.toUpperCase()}</span>
      </div>

      {/* Header */}
      <div style={{ marginBottom: '3rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.1em', border: '1px solid var(--border)', borderRadius: '3px', padding: '0.2rem 0.5rem' }}>
            {readTime} read
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
            Numbers only. No advice.
          </span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 400, color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: '1rem' }}>
          {title}
        </h1>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7, fontWeight: 300 }}>
          {description}
        </p>
      </div>

      {/* Try the calculator CTA — top */}
      <div style={{ marginBottom: '2.5rem', padding: '1rem 1.25rem', background: 'var(--bg-elevated)', border: '1px solid var(--accent)', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
          Ready to run your own numbers?
        </div>
        <Link href={relatedCalc.href} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--accent)', textDecoration: 'none', border: '1px solid var(--accent)', borderRadius: '4px', padding: '0.4rem 0.9rem', whiteSpace: 'nowrap', transition: 'all 0.15s ease' }}>
          Open {relatedCalc.label} →
        </Link>
      </div>

      {/* Guide content */}
      <div className="guide-content">
        {children}
      </div>

      {/* Bottom CTA */}
      <div style={{ marginTop: '3rem', padding: '1.5rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '8px', textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>PUT THESE NUMBERS TO WORK</div>
        <Link href={relatedCalc.href} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', color: 'var(--accent)', textDecoration: 'none' }}>
          Open the {relatedCalc.label} →
        </Link>
        <div style={{ marginTop: '0.5rem', fontFamily: 'var(--font-sans)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          Free. No login. No ads on the calculator itself.
        </div>
      </div>

      {/* Related guides */}
      {relatedGuides && relatedGuides.length > 0 && (
        <div style={{ marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Related Guides
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {relatedGuides.map(g => (
              <Link key={g.href} href={g.href} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--text-secondary)', textDecoration: 'none', padding: '0.6rem 0.9rem', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>{g.label}</span>
                <span style={{ color: 'var(--text-muted)' }}>→</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div style={{ marginTop: '2.5rem', padding: '1rem 1.25rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
        This guide is for general information only. Plain Figures does not provide financial advice. All figures are illustrative. Formulas and tax rules change — always verify current rates and consult a qualified adviser before making financial decisions.
      </div>
    </div>
  );
}
