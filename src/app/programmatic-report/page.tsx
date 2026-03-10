import Link from 'next/link';
import type { Metadata } from 'next';
import { getProgrammaticReportingSnapshot } from '@/lib/programmatic-reporting';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Programmatic SEO Report | Plain Figures',
  description: 'Category-level reporting surface for programmatic calculator clusters, prerender batches, and learn-topic extensions.',
  robots: {
    index: false,
    follow: false,
  },
};

export const revalidate = 86400;

export default function ProgrammaticReportPage() {
  const report = getProgrammaticReportingSnapshot();

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.eyebrow}>Programmatic Reporting</div>
        <h1>Category and Batch Tracking</h1>
        <p>
          This page groups the programmatic SEO rollout by category and by batch so GSC, indexing checks,
          and RPM monitoring can be handled at cluster level instead of URL by URL.
        </p>
        <Link href="/programmatic-report.json" className={styles.download}>
          Download JSON snapshot
        </Link>
      </div>

      <section className={styles.summaryGrid}>
        <div className={styles.card}>
          <div className={styles.label}>Indexable URLs</div>
          <div className={styles.value}>{report.totals.indexableUrls}</div>
        </div>
        <div className={styles.card}>
          <div className={styles.label}>Prerendered URLs</div>
          <div className={styles.value}>{report.totals.prerenderedUrls}</div>
        </div>
        <div className={styles.card}>
          <div className={styles.label}>Programmatic Categories</div>
          <div className={styles.value}>{report.totals.categories}</div>
        </div>
        <div className={styles.card}>
          <div className={styles.label}>Learn Extensions</div>
          <div className={styles.value}>{report.totals.learnExtensions}</div>
        </div>
      </section>

      {report.batches.map((batch) => (
        <section key={batch.key} className={styles.section}>
          <h2>{batch.title}</h2>
          <p>{batch.summary}</p>
          <div className={styles.batchMeta}>
            <span>{batch.indexableUrls} indexable URLs</span>
            <span>{batch.prerenderedUrls} prerendered URLs</span>
            <span>Monitor: {batch.monitorFor.join(' · ')}</span>
          </div>
          <div className={styles.table}>
            <div className={styles.rowHeader}>
              <span>Category</span>
              <span>Coverage</span>
              <span>GSC Filter</span>
              <span>Samples</span>
            </div>
            {batch.categories.map((category) => (
              <div key={category.slug} className={styles.row}>
                <div className={styles.categoryCell}>
                  <strong>{category.label}</strong>
                  <div className={styles.links}>
                    <Link href={category.calculatorHref}>Calculator</Link>
                    {category.learnHref ? <Link href={category.learnHref}>Guide</Link> : null}
                    {category.extensionHref ? <Link href={category.extensionHref}>Extension</Link> : null}
                  </div>
                </div>
                <div>
                  <div>{category.prerenderedUrls} prerendered</div>
                  <div>{category.indexableUrls} indexable</div>
                </div>
                <code className={styles.code}>{category.gscPathPrefix}</code>
                <div className={styles.sampleList}>
                  {category.samplePaths.map((path) => (
                    <Link key={path} href={path}>
                      {path}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
