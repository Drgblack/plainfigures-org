import type { Metadata } from 'next';
import Link from 'next/link';
import InfoPageLayout from '@/components/layout/InfoPageLayout';
import { buildStaticMetadata } from '@/lib/seo/metadata';
import { getCrawlAuditSnapshot } from '@/lib/seo/crawlAudit';

export const metadata: Metadata = buildStaticMetadata({
  title: 'Crawl Audit - Plain Figures',
  description: 'Internal crawl-health report for hub coverage, weakly linked calculators, and guide support depth.',
  path: '/crawl-audit',
  noindex: true,
});

export const revalidate = 86400;

export default function CrawlAuditPage() {
  const audit = getCrawlAuditSnapshot();

  return (
    <InfoPageLayout
      eyebrow="Internal Audit"
      title="Crawl Audit"
      description="Internal crawl-health report for the main calculator and guide architecture. This page is intentionally noindex and is meant for maintenance rather than search traffic."
    >
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', marginBottom: '2.5rem' }}>
        {[
          { label: 'Calculators', value: audit.totals.calculators },
          { label: 'Static Guides', value: audit.totals.staticGuides },
          { label: 'Cluster Hubs', value: audit.totals.clusterHubs },
          { label: 'Weak Calculators', value: audit.totals.weakCalculators },
          { label: 'Weak Guides', value: audit.totals.weakGuides },
        ].map((item) => (
          <div key={item.label} style={{ padding: '1rem 1.1rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '6px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
              {item.label}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', color: 'var(--text-primary)' }}>{item.value}</div>
          </div>
        ))}
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2>Weak Calculator Coverage</h2>
        <p>These calculators are missing either a dedicated explainer or a cluster-hub path. They are the first candidates for stronger internal linking in the next pass.</p>
        <div style={{ display: 'grid', gap: '0.65rem' }}>
          {audit.weakCalculators.map((tool) => (
            <div key={tool.href} style={{ padding: '0.9rem 1rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.35rem' }}>
                <Link href={tool.href} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-primary)', textDecoration: 'none' }}>
                  {tool.title}
                </Link>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', color: 'var(--text-muted)' }}>
                  guide: {tool.hasGuide ? 'yes' : 'no'} · hubs: {tool.hubCount}
                </span>
              </div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{tool.note}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2>Weak Guide Coverage</h2>
        <p>Support score is a simple count of direct calculator ownership, learn-hub references, and cluster-hub references. Guides at one or below are the easiest orphan-risk wins.</p>
        <div style={{ display: 'grid', gap: '0.65rem' }}>
          {audit.weakGuides.map((guide) => (
            <div key={guide.href} style={{ padding: '0.9rem 1rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.35rem' }}>
                <Link href={guide.href} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-primary)', textDecoration: 'none' }}>
                  {guide.title}
                </Link>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', color: 'var(--text-muted)' }}>score: {guide.score}</span>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                tool links {guide.toolLinks} · learn hub {guide.learnHubLinks} · cluster hubs {guide.clusterHubLinks}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2>Hub Coverage</h2>
        <p>This is the current organiser layer for the highest-intent clusters. Every hub should stay compact, unique, and obviously useful to both users and crawlers.</p>
        <div style={{ display: 'grid', gap: '0.65rem' }}>
          {audit.hubCoverage.map((hub) => (
            <div key={hub.href} style={{ padding: '0.9rem 1rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                <Link href={hub.href} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-primary)', textDecoration: 'none' }}>
                  {hub.title}
                </Link>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', color: 'var(--text-muted)' }}>
                  calculators {hub.calculatorCount} · guides {hub.guideCount} · related hubs {hub.relatedHubCount}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Utility Noindex Decisions</h2>
        <p>These pages should remain accessible, but they are not primary search-entry targets and should stay out of the index and out of the XML sitemap where applicable.</p>
        <div style={{ display: 'grid', gap: '0.65rem' }}>
          {audit.utilityNoindex.map((item) => (
            <div key={item.href} style={{ padding: '0.9rem 1rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '6px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-primary)', marginBottom: '0.3rem' }}>{item.href}</div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.reason}</div>
            </div>
          ))}
        </div>
      </section>
    </InfoPageLayout>
  );
}
