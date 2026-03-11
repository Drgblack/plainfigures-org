import type { Metadata } from 'next';
import Link from 'next/link';
import InfoPageLayout from '@/components/layout/InfoPageLayout';
import { buildStaticMetadata } from '@/lib/seo/metadata';
import { getSearchConsoleReportSnapshot } from '@/lib/seo/searchConsoleReport';

export const metadata: Metadata = buildStaticMetadata({
  title: 'Search Console Report - Plain Figures',
  description: 'Internal Search Console reporting surface for route-group performance, CTR opportunities, and indexation checks.',
  path: '/search-console-report',
  noindex: true,
});

export const revalidate = 86400;

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div style={{ padding: '1rem 1.1rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '6px' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
        {label}
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: 'var(--text-primary)' }}>{value}</div>
    </div>
  );
}

function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div style={{ padding: '1rem 1.1rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '6px' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-primary)', marginBottom: '0.45rem' }}>{title}</div>
      <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{body}</div>
    </div>
  );
}

export default function SearchConsoleReportPage() {
  const report = getSearchConsoleReportSnapshot();

  return (
    <InfoPageLayout
      eyebrow="Internal Audit"
      title="Search Console Report"
      description="Internal reporting surface for GSC page and query exports. Use it to cross-check route groups, CTR opportunities, and noindex/indexation behavior against the structural SEO reports."
    >
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', marginBottom: '2.5rem' }}>
        <StatCard label="Page Rows" value={report.totals.pageRows} />
        <StatCard label="Query Rows" value={report.totals.queryRows} />
        <StatCard label="Clicks" value={report.totals.clicks} />
        <StatCard label="Impressions" value={report.totals.impressions} />
        <StatCard label="CTR" value={`${report.totals.ctr}%`} />
        <StatCard label="Avg Position" value={report.totals.position || '0'} />
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2>Snapshot Source</h2>
        <p>
          This report reads from{' '}
          <code>src/lib/seo/searchConsoleSnapshot.ts</code>. It is meant for manual exports or a later API bridge, not for a browser-time dependency on Search Console.
        </p>
        <div style={{ display: 'grid', gap: '0.65rem' }}>
          <div style={{ padding: '0.9rem 1rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '6px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
              property {report.snapshot.property} · source {report.snapshot.source} · exported{' '}
              {report.snapshot.exportedAt ?? 'not loaded'}
            </div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {report.snapshot.dateRange
                ? `Date range ${report.snapshot.dateRange.start} to ${report.snapshot.dateRange.end}.`
                : 'No date range has been loaded yet.'}
            </div>
          </div>
          {report.snapshot.notes.map((note) => (
            <div key={note} style={{ padding: '0.85rem 1rem', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '6px', fontFamily: 'var(--font-sans)', fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {note}
            </div>
          ))}
        </div>
      </section>

      {!report.hasData ? (
        <section style={{ marginBottom: '2.5rem' }}>
          <h2>Next Step</h2>
          <EmptyState
            title="No Search Console snapshot loaded"
            body="Paste page-level and query-level exports into src/lib/seo/searchConsoleSnapshot.ts. Once rows are present, this page will classify them by route group and surface CTR, position, and noindex watchlists automatically."
          />
        </section>
      ) : null}

      <section style={{ marginBottom: '2.5rem' }}>
        <h2>Architecture Cross-Check</h2>
        <p>
          These numbers come from the internal structural reports, not from Search Console. They are here so you can see whether performance issues are likely to be
          routing and linking problems or just snippet and template quality problems.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
          <StatCard label="Weak Calculators" value={report.currentArchitecture.weakCalculators} />
          <StatCard label="Weak Guides" value={report.currentArchitecture.weakGuides} />
          <StatCard label="Remaining SEO Flags" value={report.currentArchitecture.remainingSeoFlags} />
        </div>
        <p style={{ marginTop: '1rem', marginBottom: 0 }}>
          Cross-check with{' '}
          <Link href="/crawl-audit" style={{ color: 'var(--accent)' }}>
            Crawl Audit
          </Link>{' '}
          and{' '}
          <Link href="/seo-opportunities" style={{ color: 'var(--accent)' }}>
            SEO Opportunities
          </Link>{' '}
          before changing cluster architecture.
        </p>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2>Route Group Performance</h2>
        <p>Use this table to decide whether issues are concentrated in hubs, guides, static pages, or the programmatic calculator surface.</p>
        <div style={{ display: 'grid', gap: '0.65rem' }}>
          {report.routeGroups.length > 0 ? (
            report.routeGroups.map((group) => (
              <div key={group.key} style={{ padding: '0.9rem 1rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.35rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-primary)' }}>{group.label}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', color: 'var(--text-muted)' }}>
                    pages {group.pages} · CTR {group.ctr}% · avg position {group.position}
                  </span>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', color: 'var(--text-muted)' }}>
                  clicks {group.clicks} · impressions {group.impressions}
                </div>
              </div>
            ))
          ) : (
            <EmptyState title="No grouped performance yet" body="Once page rows are loaded, this section will show how clicks and impressions break down across calculators, guides, hubs, and utility surfaces." />
          )}
        </div>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2>CTR Quick Wins</h2>
        <p>These pages already rank within reach. If CTR is weak here, test titles, descriptions, and intro alignment before touching architecture.</p>
        <div style={{ display: 'grid', gap: '0.65rem' }}>
          {report.ctrQuickWins.length > 0 ? (
            report.ctrQuickWins.map((row) => (
              <div key={row.path} style={{ padding: '0.9rem 1rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.35rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-primary)' }}>{row.path}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', color: 'var(--text-muted)' }}>
                    {row.group} · CTR {row.ctr}% · pos {row.position}
                  </span>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                  clicks {row.clicks} · impressions {row.impressions}
                </div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{row.recommendation}</div>
              </div>
            ))
          ) : (
            <EmptyState title="No CTR quick wins currently flagged" body="This section populates from page rows with meaningful impressions, middling first-page positions, and weak CTR." />
          )}
        </div>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2>Query Quick Wins</h2>
        <p>Use query-level rows to see whether the page is ranking close enough that a better title, heading, or intro can lift clicks without expanding the cluster.</p>
        <div style={{ display: 'grid', gap: '0.65rem' }}>
          {report.queryQuickWins.length > 0 ? (
            report.queryQuickWins.map((row) => (
              <div key={`${row.query}-${row.pagePath ?? 'none'}`} style={{ padding: '0.9rem 1rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.35rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-primary)' }}>{row.query}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', color: 'var(--text-muted)' }}>
                    CTR {row.ctr}% · pos {row.position}
                  </span>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                  {row.pagePath ?? 'no page mapped'} · clicks {row.clicks} · impressions {row.impressions}
                </div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{row.recommendation}</div>
              </div>
            ))
          ) : (
            <EmptyState title="No query-level quick wins yet" body="Load query rows into the snapshot file to surface close-range ranking opportunities here." />
          )}
        </div>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2>Utility / Noindex Watchlist</h2>
        <p>These are pages that should not be traffic targets. If they are getting search exposure, verify canonical, robots, and sitemap handling before doing anything else.</p>
        <div style={{ display: 'grid', gap: '0.65rem' }}>
          {report.utilityLeakPages.length > 0 ? (
            report.utilityLeakPages.map((row) => (
              <div key={row.path} style={{ padding: '0.9rem 1rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.35rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-primary)' }}>{row.path}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', color: 'var(--text-muted)' }}>
                    CTR {row.ctr}% · pos {row.position}
                  </span>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                  clicks {row.clicks} · impressions {row.impressions}
                </div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{row.recommendation}</div>
              </div>
            ))
          ) : (
            <EmptyState title="No utility leaks currently visible" body="Once GSC rows are loaded, any impressions on noindex or utility pages will be listed here." />
          )}
        </div>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2>Unknown Paths</h2>
        <p>These URLs were not recognised against the current route registry. Classify them before deciding whether to improve, merge, or suppress them.</p>
        <div style={{ display: 'grid', gap: '0.65rem' }}>
          {report.unknownPages.length > 0 ? (
            report.unknownPages.map((row) => (
              <div key={row.path} style={{ padding: '0.9rem 1rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.35rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-primary)' }}>{row.path}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', color: 'var(--text-muted)' }}>
                    CTR {row.ctr}% · pos {row.position}
                  </span>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                  clicks {row.clicks} · impressions {row.impressions}
                </div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{row.recommendation}</div>
              </div>
            ))
          ) : (
            <EmptyState title="No unknown paths in the snapshot" body="Recognised rows will be classified into calculators, guides, hubs, trust pages, or utility routes." />
          )}
        </div>
      </section>

      <section>
        <h2>Export and Cross-Checks</h2>
        <p>
          Download the current internal JSON view at{' '}
          <Link href="/search-console-report.json" style={{ color: 'var(--accent)' }}>
            /search-console-report.json
          </Link>{' '}
          and compare it with{' '}
          <Link href="/programmatic-report" style={{ color: 'var(--accent)' }}>
            Programmatic Report
          </Link>{' '}
          when you want to inspect performance by category family rather than by page.
        </p>
      </section>
    </InfoPageLayout>
  );
}
