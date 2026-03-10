import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProgrammaticCalculatorClient from '@/components/calculators/ProgrammaticCalculatorClient';
import CalcPageWrapper from '@/components/layout/CalcPageWrapper';
import { calcPageJsonLd } from '@/lib/structuredData';
import {
  getProgrammaticPath,
  getProgrammaticStaticParams,
  resolveProgrammaticPage,
} from '@/lib/finance-calculator-templates';
import { getToolByHref } from '@/lib/siteData';
import styles from './page.module.css';

export const revalidate = 86400;
export const dynamicParams = true;

type PageProps = {
  params: Promise<{
    category: string;
    expression: string;
  }>;
};

function labelFromHref(href: string) {
  const slug = href.split('/').filter(Boolean).pop() ?? href;
  return slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export async function generateStaticParams() {
  return getProgrammaticStaticParams().map((target) => ({
    category: target.category,
    expression: target.expression,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, expression } = await params;
  const page = resolveProgrammaticPage(category, expression);

  if (!page) {
    return {};
  }

  const canonical = `https://plainfigures.org${getProgrammaticPath(category, expression)}`;

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: canonical,
      type: 'website',
    },
  };
}

export default async function ProgrammaticCalculatorPage({ params }: PageProps) {
  const { category, expression } = await params;
  const page = resolveProgrammaticPage(category, expression);

  if (!page) {
    notFound();
  }

  const jsonLd = calcPageJsonLd({
    name: page.heading,
    description: page.description,
    url: getProgrammaticPath(category, expression),
    faqs: page.faqs,
  });

  const relatedCalcLinks = page.category.relatedCalcHrefs
    .map((href) => ({ href, label: getToolByHref(href)?.title ?? labelFromHref(href) }))
    .slice(0, 4);

  const relatedGuideLinks = page.category.relatedGuideHrefs
    .map((href) => ({ href, label: labelFromHref(href) }))
    .slice(0, 4);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CalcPageWrapper
        code={page.category.code}
        title={page.heading}
        description={page.deck}
        toolHref={page.category.toolHref}
        learnHref={page.category.learnHref}
        learnLabel={page.category.learnLabel}
        rateContext={page.category.rateContext}
      >
        <div className={styles.page}>
          <ProgrammaticCalculatorClient config={page.calculator} />

          <div className={styles.notice}>
            <p className={styles.noticeText}>
              Plain Figures publishes this page as a formula-first reference: no product recommendations, no “best deal” claims, and no attempt to turn a worked example into personalised advice.
            </p>
            <p className={styles.noticeText}>
              The calculator runs locally in your browser, the assumptions stay visible, and the disclaimers stay explicit. That is deliberate: illustration only, not advice.
            </p>
          </div>

          <section className={styles.statGrid}>
            {page.stats.map((stat) => (
              <div key={stat.label} className={styles.card}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.45rem' }}>{stat.label}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.35rem', color: stat.tone === 'positive' ? 'var(--positive)' : stat.tone === 'negative' ? 'var(--negative)' : stat.tone === 'warning' ? 'var(--warning)' : 'var(--text-primary)' }}>
                  {stat.value}
                </div>
                {stat.sub ? <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>{stat.sub}</div> : null}
              </div>
            ))}
          </section>

          <section className={styles.section}>
            <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', fontWeight: 400, margin: 0 }}>Formula</h2>
            <div className={styles.card}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>{page.formula.label}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: 'var(--accent)', marginBottom: '0.9rem' }}>{page.formula.expression}</div>
              <ul style={{ margin: 0, paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)', lineHeight: 1.65 }}>
                {page.formula.variables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {page.formula.explanation.map((paragraph) => (
                  <p key={paragraph} style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.75 }}>{paragraph}</p>
                ))}
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', fontWeight: 400, margin: 0 }}>Worked Steps</h2>
            <ol style={{ margin: 0, paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.7rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>
              {page.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>

          {page.sections.map((section) => (
            <section key={section.heading} className={styles.section}>
              <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', fontWeight: 400, margin: 0 }}>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.85 }}>{paragraph}</p>
              ))}
            </section>
          ))}

          <section className={styles.section}>
            <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', fontWeight: 400, margin: 0 }}>Scenario Checks</h2>
            <div className={styles.scenarioGrid}>
              {page.scenarios.map((scenario) => (
                <div key={scenario.title} className={styles.card}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent)', marginBottom: '0.55rem' }}>{scenario.title}</div>
                  <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.75 }}>{scenario.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.detailGrid}>
            <div className={styles.disclaimerCard}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--negative)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Disclaimers</div>
              {page.disclaimers.map((item) => (
                <p key={item} style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.75 }}>{item}</p>
              ))}
            </div>
            <div className={styles.card}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Internal Links</div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Related calculators</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {relatedCalcLinks.map((link) => (
                    <Link key={link.href} href={link.href} style={{ color: 'var(--accent)', textDecoration: 'none' }}>{link.label}</Link>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Learning Centre</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {relatedGuideLinks.map((link) => (
                    <Link key={link.href} href={link.href} style={{ color: 'var(--accent)', textDecoration: 'none' }}>{link.label}</Link>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', fontWeight: 400, margin: 0 }}>FAQ</h2>
            <div className={styles.faqList}>
              {page.faqs.map((faq) => (
                <details key={faq.question} className={styles.card}>
                  <summary style={{ cursor: 'pointer', fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>{faq.question}</summary>
                  <p style={{ margin: '0.8rem 0 0 0', color: 'var(--text-secondary)', lineHeight: 1.75 }}>{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </CalcPageWrapper>
    </>
  );
}
