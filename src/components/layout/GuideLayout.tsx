import Link from 'next/link';
import { ReactNode } from 'react';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import RelatedCalculators from '@/components/seo/RelatedCalculators';
import RelatedGuides from '@/components/seo/RelatedGuides';
import { buildGuideBreadcrumbs, type SeoLink } from '@/lib/seo/relatedLinks';

interface GuideLayoutProps {
  title: string;
  description: string;
  readTime: string;
  relatedCalc: { href: string; label: string };
  relatedGuides?: { href: string; label: string }[];
  children: ReactNode;
}

export default function GuideLayout({
  title,
  description,
  readTime,
  relatedCalc,
  relatedGuides,
  children,
}: GuideLayoutProps) {
  const relatedCalculatorLinks: SeoLink[] = [
    {
      href: relatedCalc.href,
      label: `Use the ${relatedCalc.label}`,
      description: 'Run your own numbers with the linked calculator after reading the formula-first explanation.',
    },
  ];

  return (
    <div style={{ maxWidth: '780px', margin: '0 auto', padding: '3rem 2rem' }}>
      <Breadcrumbs items={buildGuideBreadcrumbs(title)} />

      <div style={{ marginBottom: '3rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
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
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7, fontWeight: 300, margin: 0 }}>
          {description}
        </p>
      </div>

      <div style={{ marginBottom: '2.5rem', padding: '1rem 1.25rem', background: 'var(--bg-elevated)', border: '1px solid var(--accent)', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
          Read the formula, then test the same idea with your own inputs.
        </div>
        <Link href={relatedCalc.href} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--accent)', textDecoration: 'none', border: '1px solid var(--accent)', borderRadius: '4px', padding: '0.4rem 0.9rem', whiteSpace: 'nowrap' }}>
          Use the {relatedCalc.label}
        </Link>
      </div>

      <div className="guide-content">
        {children}
      </div>

      <RelatedCalculators
        title="Use This Calculator"
        intro="Open the matching calculator to apply the guide to your own numbers."
        links={relatedCalculatorLinks}
      />

      <div style={{ marginTop: '1.5rem', padding: '1rem 1.25rem', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '6px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.64rem', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.55rem' }}>
          Attribution and Review
        </div>
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.7, fontWeight: 300 }}>
          Published by the Plain Figures editorial team. Review on this site focuses on formula accuracy, assumption clarity, and threshold freshness where current-year rules matter.
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.55rem', marginTop: '0.8rem' }}>
          <Link href="/methodology" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-secondary)', textDecoration: 'none', border: '1px solid var(--border)', borderRadius: '4px', padding: '0.35rem 0.6rem' }}>Methodology</Link>
          <Link href="/authors-and-review" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-secondary)', textDecoration: 'none', border: '1px solid var(--border)', borderRadius: '4px', padding: '0.35rem 0.6rem' }}>Authors and Review</Link>
          <Link href="/editorial-policy" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-secondary)', textDecoration: 'none', border: '1px solid var(--border)', borderRadius: '4px', padding: '0.35rem 0.6rem' }}>Editorial Policy</Link>
        </div>
      </div>

      <RelatedGuides
        links={(relatedGuides ?? []).map((guide) => ({ href: guide.href, label: `Read ${guide.label}` }))}
        intro="Keep moving through the same topical cluster with nearby explainers that support the calculator."
      />

      <div style={{ marginTop: '2.5rem', padding: '1rem 1.25rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
        This guide is for general information only. Plain Figures does not provide financial advice. All figures are illustrative. Formulas and tax rules change, so verify current rates and consult a qualified adviser before making decisions.
      </div>
    </div>
  );
}
