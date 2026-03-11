import { ReactNode } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import RelatedCalculators from '@/components/seo/RelatedCalculators';
import RelatedGuides from '@/components/seo/RelatedGuides';
import type { BreadcrumbItem, SeoLink } from '@/lib/seo/relatedLinks';
import {
  buildCalculatorBreadcrumbs,
  getCalculatorLinksForTool,
  getClusterHubLinks,
  getClusterSummary,
  getGuideLinksForTool,
} from '@/lib/seo/relatedLinks';

interface CalcPageWrapperProps {
  code: string;
  title: string;
  description?: string;
  professional?: boolean;
  learnHref?: string;
  learnLabel?: string;
  toolHref?: string;
  rateContext?: string;
  methodologyNote?: string;
  breadcrumbItems?: BreadcrumbItem[];
  relatedCalculatorLinks?: SeoLink[];
  relatedGuideLinks?: SeoLink[];
  hideClusterNavigation?: boolean;
  children: ReactNode;
}

export default function CalcPageWrapper({
  code,
  title,
  description,
  professional,
  learnHref,
  learnLabel,
  toolHref,
  rateContext,
  methodologyNote,
  breadcrumbItems,
  relatedCalculatorLinks,
  relatedGuideLinks,
  hideClusterNavigation,
  children,
}: CalcPageWrapperProps) {
  const accent = professional ? '#d4a843' : 'var(--accent)';
  const breadcrumbs = breadcrumbItems ?? buildCalculatorBreadcrumbs(title, toolHref);
  const clusterSummary = toolHref ? getClusterSummary(toolHref) : null;
  const calculators = relatedCalculatorLinks ?? (toolHref ? getCalculatorLinksForTool(toolHref) : []);
  const guides = relatedGuideLinks ?? (toolHref ? getGuideLinksForTool(toolHref) : []);
  const hubLinks = toolHref ? getClusterHubLinks(toolHref) : [];

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2.5rem 2rem' }}>
      <Breadcrumbs items={breadcrumbs} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', fontFamily: 'var(--font-mono)', fontSize: '0.64rem', color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: '1rem' }}>
        <span style={{ color: accent, letterSpacing: '0.04em' }}>{code}</span>
        {professional ? (
          <span style={{ padding: '0.12rem 0.45rem', background: 'rgba(212,168,67,0.1)', border: '1px solid rgba(212,168,67,0.25)', borderRadius: '3px', fontSize: '0.6rem', color: '#d4a843', letterSpacing: '0.1em' }}>
            PROFESSIONAL TOOL
          </span>
        ) : null}
        {methodologyNote ? (
          <span style={{ padding: '0.12rem 0.45rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '3px', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
            {methodologyNote}
          </span>
        ) : null}
      </div>

      <div style={{ marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 400, color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: description ? '0.75rem' : 0 }}>
              {title}
            </h1>
            {description ? (
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.65, fontWeight: 300, maxWidth: '680px', margin: 0 }}>
                {description}
              </p>
            ) : null}
          </div>

          {learnHref ? (
            <Link href={learnHref} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.9rem', background: 'rgba(46,200,138,0.06)', border: '1px solid rgba(46,200,138,0.2)', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#2ec88a', textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
              <span style={{ fontSize: '0.7rem', opacity: 0.8 }}>Guide</span>
              {learnLabel ?? 'How this calculator works'}
            </Link>
          ) : null}
        </div>
      </div>

      {!hideClusterNavigation && clusterSummary ? (
        <section style={{ marginBottom: '1.5rem', padding: '1rem 1.15rem', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '6px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.64rem', color: accent, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.45rem' }}>
            {clusterSummary.title}
          </div>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>
            {clusterSummary.intro}
          </p>
        </section>
      ) : null}

      <div aria-live="polite" aria-atomic="false">
        {children}
      </div>

      {rateContext ? (
        <div style={{ marginTop: '1.5rem', padding: '0.75rem 1rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', lineHeight: 1.6, letterSpacing: '0.02em' }}>
          ⟳ {rateContext}
        </div>
      ) : null}

      {!hideClusterNavigation ? (
        <>
          <RelatedGuides
            title="Cluster Hubs"
            intro="Use these organising pages when you want the main calculators and supporting guides for this topic grouped in one place."
            links={hubLinks}
          />
          <RelatedCalculators
            links={calculators}
            intro="Move sideways to closely related calculators without leaving the same topic cluster."
          />
          <RelatedGuides
            links={guides}
            intro="Use these supporting explainers when you need the formula, assumptions, or decision framing behind the numbers."
          />
        </>
      ) : null}
    </div>
  );
}
