import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { renderToString } from 'katex';
import 'katex/dist/katex.min.css';
import CalcPageWrapper from '@/components/layout/CalcPageWrapper';
import ProgrammaticCalculatorExplorer from '@/components/calculators/ProgrammaticCalculatorExplorer';
import {
  calculators,
  CalculatorConfig,
  findGeneratedSlug,
  generateStaticProgrammaticPaths,
} from '@/lib/calculators/config';
import { generateUniquePageContent } from '@/lib/calculators/generator';
import {
  buildProgrammaticRelatedCalculatorLinks,
  buildProgrammaticRelatedGuideLinks,
  getProgrammaticHubHref,
} from '@/lib/seo/relatedLinks';
import { SITE_ORIGIN } from '@/lib/siteConfig';
import styles from './page.module.css';

export const revalidate = 86400;
export const dynamicParams = true;
const PROGRAMMATIC_PRERENDER_LIMIT = 24;

type PageProps = {
  params: Promise<{
    category: string;
    expression: string;
  }>;
};

type Variant = {
  categorySlug: string;
  slug: string;
  params: Record<string, number | string>;
};

const CONFIG_BY_CATEGORY = new Map(calculators.map((config) => [config.categorySlug, config]));

const PROFESSIONAL_CATEGORIES = new Set([
  'business-interruption',
  'human-life-value',
  'cyber-risk-exposure',
  'total-cost-risk',
  'risk-heatmap',
  'scr-estimator',
  'coverage-gap',
  'ltv-cac',
  'loss-probability',
  'cyber-limit',
]);

function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-GB', {
    maximumFractionDigits: Number.isInteger(value) ? 0 : 2,
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
  }).format(value);
}

function formatValue(value: number | string, prefix?: string): string {
  if (typeof value === 'number') {
    if (prefix === '%' || prefix === 'pct') {
      return `${formatNumber(value)}%`;
    }

    if (prefix) {
      return `${prefix}${formatNumber(value)}`;
    }

    return formatNumber(value);
  }

  return String(value)
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function renderTemplate(template: string, params: Record<string, number | string>, config: CalculatorConfig): string {
  return config.params.reduce((output, param) => {
    const rawValue = params[param.key];
    return output.replaceAll(`{{${param.key}}}`, formatValue(rawValue, param.prefix));
  }, template);
}

function resolveVariant(category: string, expression: string): { config: CalculatorConfig; variant: Variant } | null {
  const config = CONFIG_BY_CATEGORY.get(category);
  const variant = findGeneratedSlug(category, expression);

  if (!config || !variant) {
    return null;
  }

  return { config, variant };
}

function categoryCode(config: CalculatorConfig): string {
  return config.categorySlug.replace(/-/g, ' ').toUpperCase();
}

function formulaMarkup(formula: string) {
  const compact = formula.replace(/\b[A-Z]\b/g, '');
  const hasLongWords = /[A-Za-z]{2,}/.test(compact);
  const expression = hasLongWords
    ? `\\text{${formula.replace(/[{}\\]/g, '').replace(/%/g, '\\%')}}`
    : formula
        .replace(/×/g, '\\times ')
        .replace(/−/g, '-')
        .replace(/÷/g, '\\div ')
        .replace(/\[/g, '(')
        .replace(/\]/g, ')');

  return renderToString(expression, {
    displayMode: true,
    throwOnError: false,
    output: 'html',
    strict: 'ignore',
  });
}

export async function generateStaticParams() {
  return generateStaticProgrammaticPaths(PROGRAMMATIC_PRERENDER_LIMIT).map((variant) => ({
    category: variant.categorySlug,
    expression: variant.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, expression } = await params;
  const resolved = resolveVariant(category, expression);

  if (!resolved) {
    return {};
  }

  const { config, variant } = resolved;
  const title = renderTemplate(config.seoTemplate.title, variant.params, config);
  const description = renderTemplate(config.seoTemplate.description, variant.params, config);
  const canonical = `${SITE_ORIGIN}/calculators/${category}/${expression}`;

  return {
    title,
    description,
    alternates: { canonical },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'article',
    },
  };
}

export default async function ProgrammaticCalculatorPage({ params }: PageProps) {
  const { category, expression } = await params;
  const resolved = resolveVariant(category, expression);

  if (!resolved) {
    notFound();
  }

  const { config, variant } = resolved;
  const hubHref = getProgrammaticHubHref(category);
  const heading = renderTemplate(config.seoTemplate.h1, variant.params, config);
  const description = renderTemplate(config.seoTemplate.description, variant.params, config);
  const content = generateUniquePageContent(variant.params, config);
  const relatedCalculatorLinks = buildProgrammaticRelatedCalculatorLinks(category);
  const relatedGuideLinks = buildProgrammaticRelatedGuideLinks(category);
  const formulaHtml = formulaMarkup(config.formula);
  const primaryGuide = relatedGuideLinks[0];
  const breadcrumbItems = [
    { href: '/', label: 'Home' },
    { href: hubHref, label: config.name.replace(/ Calculator 2026$/, '') },
    { label: heading },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(content.schema) }} />
      <CalcPageWrapper
        code={categoryCode(config)}
        title={heading}
        description={description}
        professional={PROFESSIONAL_CATEGORIES.has(category)}
        toolHref={hubHref}
        breadcrumbItems={breadcrumbItems}
        relatedCalculatorLinks={relatedCalculatorLinks}
        relatedGuideLinks={relatedGuideLinks}
        learnHref={primaryGuide?.href}
        learnLabel={primaryGuide?.label}
        rateContext="Formula-first page. Numbers and worked assumptions for illustration only, not financial, tax, nutrition, insurance, or legal advice."
      >
        <div className={styles.page}>
          <ProgrammaticCalculatorExplorer config={config} initialParams={variant.params} />

          <section className={styles.notice}>
            <p className={styles.noticeText}>
              Plain Figures publishes this page as a formula-first reference. No advice, no opinions, no products, and no attempt to turn a worked example into a personal recommendation.
            </p>
            <p className={styles.noticeText}>
              The local calculator is there so you can test nearby scenarios without leaving the page. The indexed copy below is tied to the exact slug values you searched for.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Formula</h2>
            <div className={styles.card}>
              <div className={styles.formulaLabel}>Formula Used</div>
              <div className={styles.formulaMarkup} dangerouslySetInnerHTML={{ __html: formulaHtml }} />
              <p className={styles.paragraph}>
                The page title, introduction, and FAQ all reflect the exact values in this slug. That keeps the indexed page specific to the query instead of recycling one generic calculator description across thousands of URLs.
              </p>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Why These Numbers Matter</h2>
            {content.intro.split('\n\n').map((paragraph) => (
              <p key={paragraph} className={styles.paragraph}>
                {paragraph}
              </p>
            ))}
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Interpretation</h2>
            {content.interpretation.split('\n\n').map((paragraph) => (
              <p key={paragraph} className={styles.paragraph}>
                {paragraph}
              </p>
            ))}
          </section>

          <section className={styles.detailGrid}>
            <div className={styles.disclaimerCard}>
              <div className={styles.detailLabel}>Disclaimers</div>
              <p className={styles.paragraph}>
                Not financial advice, tax advice, investment advice, insurance advice, nutrition advice, or legal advice. This page is an illustration built from the values inside the URL and a simplified formula-based model.
              </p>
              <p className={styles.paragraph}>
                Real outcomes can change because of fees, underwriting rules, taxes, market conditions, employer policy, product terms, or personal circumstances not modeled here. Use the output as a benchmark, not as a substitute for judgment.
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.detailLabel}>Cluster Position</div>
              <p className={styles.paragraph}>
                This URL sits one click beneath the main {config.name.replace(/ Calculator 2026$/, '')} hub so nearby examples, the core calculator, and supporting guides remain shallow and crawlable.
              </p>
              <p className={styles.paragraph}>
                Use the calculator hub for broader scenarios, then follow the related guides for the formula and assumption context behind this exact example page.
              </p>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>FAQ</h2>
            <div className={styles.faqList}>
              {content.faqs.map((faq) => (
                <details key={faq.q} className={styles.card}>
                  <summary className={styles.summary}>{faq.q}</summary>
                  <p className={styles.paragraph}>{faq.a}</p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </CalcPageWrapper>
    </>
  );
}
