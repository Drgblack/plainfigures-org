import Breadcrumbs from '@/components/seo/Breadcrumbs';
import RelatedCalculators from '@/components/seo/RelatedCalculators';
import RelatedGuides from '@/components/seo/RelatedGuides';
import {
  buildClusterHubBreadcrumbs,
  getCalculatorLinksForClusterHub,
  getClusterHub,
} from '@/lib/seo/clusterHubs';

type ClusterHubPageProps = {
  slug: string;
};

export default function ClusterHubPage({ slug }: ClusterHubPageProps) {
  const hub = getClusterHub(slug);

  if (!hub) {
    return null;
  }

  const calculators = getCalculatorLinksForClusterHub(slug);

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 2rem' }}>
      <Breadcrumbs items={buildClusterHubBreadcrumbs(hub.title)} />

      <div style={{ marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', color: 'var(--accent)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
          {hub.eyebrow}
        </div>
        <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(1.7rem, 3.8vw, 2.55rem)', fontWeight: 400, color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1.12, marginBottom: '1rem' }}>
          {hub.title}
        </h1>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.75, fontWeight: 300, maxWidth: '700px', margin: '0 0 1rem' }}>
          {hub.intro}
        </p>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7, fontWeight: 300, maxWidth: '720px', margin: 0 }}>
          {hub.summary}
        </p>
      </div>

      <div style={{ marginBottom: '2rem', padding: '1rem 1.1rem', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '6px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.64rem', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.45rem' }}>
          Why This Hub Exists
        </div>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>
          Large calculator sites need more than a flat directory. These hub pages keep the strongest calculator and guide relationships crawlable, descriptive, and one or two clicks apart.
        </p>
      </div>

      <RelatedCalculators
        title="Core Calculators"
        intro="Use these calculators as the main action pages in this cluster. Each link leads to a primary money page rather than a thin navigational step."
        links={calculators}
      />

      <RelatedGuides
        title="Supporting Guides"
        intro="These explainers sit alongside the calculators and help clarify formulas, assumptions, and comparison logic before users rerun the numbers."
        links={hub.guideLinks}
      />

      <RelatedGuides
        title="Nearby Hubs"
        intro="Move into adjacent sub-hubs when the question shifts from basic repayment to cash allocation, compounding, or housing trade-offs."
        links={hub.relatedHubs}
      />
    </div>
  );
}
