'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { getRelatedTools } from '@/lib/siteData';
import RelatedTools from '@/components/ui/RelatedTools';

interface CalcPageWrapperProps {
  code: string;
  title: string;
  description?: string;
  professional?: boolean;
  learnHref?: string;
  learnLabel?: string;
  toolHref?: string;          // for related tools lookup
  rateContext?: string;       // contextual note below calculator
  methodologyNote?: string;   // e.g. "ISO 31000" for pro tools
  children: ReactNode;
}

export default function CalcPageWrapper({
  code, title, description, professional, learnHref, learnLabel,
  toolHref, rateContext, methodologyNote, children
}: CalcPageWrapperProps) {
  const accent = professional ? '#d4a843' : 'var(--accent)';

  // Derive related tools from toolHref if provided
  const relatedTools = toolHref ? getRelatedTools(toolHref) : [];

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2.5rem 2rem' }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: '2rem' }}>
        <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>HOME</Link>
        <span>/</span>
        {professional && (
          <>
            <span style={{ color: '#d4a843' }}>PROFESSIONAL TOOLS</span>
            <span>/</span>
          </>
        )}
        <span style={{ color: accent, letterSpacing: '0.04em' }}>{code}</span>
        {professional && (
          <span style={{ marginLeft: '0.5rem', padding: '0.12rem 0.45rem', background: 'rgba(212,168,67,0.1)', border: '1px solid rgba(212,168,67,0.25)', borderRadius: '3px', fontSize: '0.6rem', color: '#d4a843', letterSpacing: '0.1em' }}>
            PROFESSIONAL TOOL
          </span>
        )}
        {methodologyNote && (
          <span style={{ marginLeft: '0.25rem', padding: '0.12rem 0.45rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '3px', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
            {methodologyNote}
          </span>
        )}
      </div>

      {/* Header row */}
      <div style={{ marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 400, color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: description ? '0.75rem' : 0 }}>
              {title}
            </h1>
            {description && (
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.65, fontWeight: 300, maxWidth: '620px', margin: 0 }}>
                {description}
              </p>
            )}
          </div>

          {/* Learn more link */}
          {learnHref && (
            <Link href={learnHref} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.9rem', background: 'rgba(46,200,138,0.06)', border: '1px solid rgba(46,200,138,0.2)', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#2ec88a', textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0, transition: 'all 0.15s ease' }}>
              <span style={{ fontSize: '0.7rem', opacity: 0.8 }}>📖</span>
              {learnLabel || 'How this works'}
            </Link>
          )}
        </div>
      </div>

      {/* Calculator — aria-live wraps results area */}
      <div aria-live="polite" aria-atomic="false">
        {children}
      </div>

      {/* Rate context note */}
      {rateContext && (
        <div style={{ marginTop: '1.5rem', padding: '0.75rem 1rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', lineHeight: 1.6, letterSpacing: '0.02em' }}>
          ⟳ {rateContext}
        </div>
      )}

      {/* Related tools */}
      {relatedTools.length > 0 && (
        <RelatedTools tools={relatedTools} currentHref={toolHref || ''} />
      )}
    </div>
  );
}
