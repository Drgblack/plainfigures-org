import type { Metadata } from 'next';
import Link from 'next/link';
import InfoPageLayout from '@/components/layout/InfoPageLayout';
import { buildStaticMetadata } from '@/lib/seo/metadata';
import { getSeoOpportunitySnapshot } from '@/lib/seo/opportunitiesReport';

export const metadata: Metadata = buildStaticMetadata({
  title: 'SEO Opportunities - Plain Figures',
  description: 'Internal SEO-opportunities report for the next layer of internal-linking, hub-enrichment, and consolidation work.',
  path: '/seo-opportunities',
  noindex: true,
});

export const revalidate = 86400;

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div style={{ padding: '1rem 1.1rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '6px' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
        {label}
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', color: 'var(--text-primary)' }}>{value}</div>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div style={{ padding: '0.9rem 1rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '6px', fontFamily: 'var(--font-sans)', fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
      {message}
    </div>
  );
}

export default function SeoOpportunitiesPage() {
  const report = getSeoOpportunitySnapshot();

  return (
    <InfoPageLayout
      eyebrow="Internal Audit"
      title="SEO Opportunities"
      description="Internal prioritisation report for the next layer of SEO work after crawl hygiene: richer cluster support, stronger CTA ownership, and selective consolidation review. This page is intentionally noindex."
    >
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', marginBottom: '2.5rem' }}>
        <StatCard label="Missing Guide CTAs" value={report.totals.calculatorsMissingGuides} />
        <StatCard label="Single-Hub Tools" value={report.totals.calculatorsWithSingleHubPath} />
        <StatCard label="Limited-Support Guides" value={report.totals.limitedSupportGuides} />
        <StatCard label="Consolidation Watchlist" value={report.totals.consolidationCandidates} />
        <StatCard label="Hub Enrichment Candidates" value={report.totals.hubEnrichmentCandidates} />
        <StatCard label="Learn Cluster Expansion" value={report.totals.learnClusterExpansionCandidates} />
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2>Immediate Follow-Up</h2>
        <p>
          The crawl-audit page tracks outright weak coverage. This report starts one step later: pages that are now reachable, but still deserve a better second path,
          stronger calculator ownership, or a clearer hub distinction.
        </p>
        <p style={{ marginBottom: 0 }}>
          Cross-check with{' '}
          <Link href="/crawl-audit" style={{ color: 'var(--accent)' }}>
            Crawl Audit
          </Link>{' '}
          when deciding whether to add links, expand a hub intro, or leave a niche article as-is.
        </p>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2>Calculator CTA Gaps</h2>
        <p>These calculators still do not own a dedicated explainer from the tool registry. They are the cleanest candidates for a stronger “use this calculator” support loop.</p>
        <div style={{ display: 'grid', gap: '0.65rem' }}>
          {report.calculatorGuideGaps.length > 0 ? (
            report.calculatorGuideGaps.map((tool) => (
              <div key={tool.href} style={{ padding: '0.9rem 1rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                  <Link href={tool.href} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-primary)', textDecoration: 'none' }}>
                    {tool.title}
                  </Link>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', color: 'var(--text-muted)' }}>hub paths: {tool.hubCount}</span>
                </div>
              </div>
            ))
          ) : (
            <EmptyState message="No current calculator CTA gaps. The registry now gives every calculator a dedicated guide path." />
          )}
        </div>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2>Single-Hub Calculator Paths</h2>
        <p>These calculators have a guide CTA, but only one organiser path above them. They are good candidates when you want a second supporting route without creating new content.</p>
        <div style={{ display: 'grid', gap: '0.65rem' }}>
          {report.calculatorsWithSingleHubPath.length > 0 ? (
            report.calculatorsWithSingleHubPath.map((tool) => (
              <div key={tool.href} style={{ padding: '0.9rem 1rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.35rem' }}>
                  <Link href={tool.href} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-primary)', textDecoration: 'none' }}>
                    {tool.title}
                  </Link>
                  <Link href={tool.hubHref} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', color: 'var(--accent)', textDecoration: 'none' }}>
                    organiser path
                  </Link>
                </div>
                <Link href={tool.guideHref} style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', color: 'var(--text-secondary)', textDecoration: 'none', lineHeight: 1.6 }}>
                  Existing guide support
                </Link>
              </div>
            ))
          ) : (
            <EmptyState message="No single-hub calculator paths remain. Each calculator is supported from multiple organiser layers." />
          )}
        </div>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2>Limited-Support Guides</h2>
        <p>These guides are no longer orphan-risk pages, but they still only have two support points across calculator ownership, the learn hub, and cluster hubs.</p>
        <div style={{ display: 'grid', gap: '0.65rem' }}>
          {report.limitedSupportGuides.length > 0 ? (
            report.limitedSupportGuides.map((guide) => (
              <div key={guide.href} style={{ padding: '0.9rem 1rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.35rem' }}>
                  <Link href={guide.href} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-primary)', textDecoration: 'none' }}>
                    {guide.title}
                  </Link>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', color: 'var(--text-muted)' }}>support score: {guide.score}</span>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  tool links {guide.toolLinks} · learn hub {guide.learnHubLinks} · cluster hubs {guide.clusterHubLinks}
                </div>
              </div>
            ))
          ) : (
            <EmptyState message="No limited-support guides remain. Every static guide now has at least three support points." />
          )}
        </div>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2>Hub Enrichment Candidates</h2>
        <p>These hubs are already useful, but their breadth or copy signals suggest where an intro refresh, stronger differentiation, or another adjacent path would be worthwhile.</p>
        <div style={{ display: 'grid', gap: '0.65rem' }}>
          {report.hubEnrichmentCandidates.length > 0 ? (
            report.hubEnrichmentCandidates.map((hub) => (
              <div key={hub.href} style={{ padding: '0.9rem 1rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.35rem' }}>
                  <Link href={hub.href} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-primary)', textDecoration: 'none' }}>
                    {hub.title}
                  </Link>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', color: 'var(--text-muted)' }}>priority: {hub.opportunityScore}</span>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '0.35rem' }}>
                  calculators {hub.calculatorCount} · guides {hub.guideCount} · related hubs {hub.relatedHubCount} · intro {hub.introWords}w · summary {hub.summaryWords}w
                </div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{hub.note}</div>
              </div>
            ))
          ) : (
            <EmptyState message="No hub-enrichment candidates are currently flagged by the report heuristics." />
          )}
        </div>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2>Learn-Hub Expansion Candidates</h2>
        <p>These are the clusters where the learn hub still has the lightest organiser layer relative to the content breadth behind it.</p>
        <div style={{ display: 'grid', gap: '0.65rem' }}>
          {report.learnClusterExpansionCandidates.length > 0 ? (
            report.learnClusterExpansionCandidates.map((cluster) => (
              <div key={cluster.key} style={{ padding: '0.9rem 1rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.35rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-primary)' }}>{cluster.title}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', color: 'var(--text-muted)' }}>
                    calculators {cluster.calculatorCount} · guides {cluster.guideCount} · hubs {cluster.hubCount}
                  </span>
                </div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{cluster.note}</div>
              </div>
            ))
          ) : (
            <EmptyState message="No learn-hub expansion candidates are currently flagged by the report heuristics." />
          )}
        </div>
      </section>

      <section>
        <h2>Consolidation Watchlist</h2>
        <p>These pages are reachable, but they do not currently belong to a specific calculator CTA. Review them before expanding them further; some may deserve a tighter landing-page role instead.</p>
        <div style={{ display: 'grid', gap: '0.65rem' }}>
          {report.consolidationCandidates.length > 0 ? (
            report.consolidationCandidates.map((guide) => (
              <div key={guide.href} style={{ padding: '0.9rem 1rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.35rem' }}>
                  <Link href={guide.href} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-primary)', textDecoration: 'none' }}>
                    {guide.title}
                  </Link>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', color: 'var(--text-muted)' }}>support score: {guide.score}</span>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  learn hub {guide.learnHubLinks} · cluster hubs {guide.clusterHubLinks}
                </div>
              </div>
            ))
          ) : (
            <EmptyState message="No consolidation candidates are currently flagged by the report heuristics." />
          )}
        </div>
      </section>
    </InfoPageLayout>
  );
}
