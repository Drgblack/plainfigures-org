import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { renderToString } from 'katex';
import 'katex/dist/katex.min.css';
import CalcPageWrapper from '@/components/layout/CalcPageWrapper';
import ProgrammaticCalculatorExplorer from '@/components/calculators/ProgrammaticCalculatorExplorer';
import { calculators, CalculatorConfig, generateAllSlugs } from '@/lib/calculators/config';
import { generateUniquePageContent } from '@/lib/calculators/generator';
import styles from './page.module.css';

export const revalidate = 86400;
export const dynamicParams = true;

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

type CategorySupport = {
  hubHref: string;
  guideSlugs: string[];
  relatedCategories: string[];
};

const ALL_VARIANTS = generateAllSlugs();
const CONFIG_BY_CATEGORY = new Map(calculators.map((config) => [config.categorySlug, config]));
const VARIANT_BY_KEY = new Map(ALL_VARIANTS.map((variant) => [`${variant.categorySlug}/${variant.slug}`, variant]));
const FIRST_VARIANT_BY_CATEGORY = new Map<string, Variant>();
ALL_VARIANTS.forEach((variant) => {
  if (!FIRST_VARIANT_BY_CATEGORY.has(variant.categorySlug)) {
    FIRST_VARIANT_BY_CATEGORY.set(variant.categorySlug, variant);
  }
});

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

const CATEGORY_SUPPORT: Record<string, CategorySupport> = {
  'mortgage-repayment': { hubHref: '/mortgage', guideSlugs: ['mortgage-repayment', 'mortgage-affordability'], relatedCategories: ['offset-mortgage', 'mortgage-overpayment', 'mortgage-affordability'] },
  'savings-growth': { hubHref: '/savings', guideSlugs: ['compound-interest', 'save-for-goal'], relatedCategories: ['compound-interest', 'save-for-goal', 'retirement-savings'] },
  'rent-vs-buy': { hubHref: '/rent-vs-buy', guideSlugs: ['rent-vs-buy', 'mortgage-repayment'], relatedCategories: ['mortgage-repayment', 'mortgage-affordability', 'offset-mortgage'] },
  'compound-interest': { hubHref: '/compound', guideSlugs: ['compound-interest', 'retirement-savings'], relatedCategories: ['savings-growth', 'retirement-savings', 'save-for-goal'] },
  'loan-repayment': { hubHref: '/loan', guideSlugs: ['loan-repayment', 'salary-take-home'], relatedCategories: ['mortgage-repayment', 'salary-take-home', 'save-for-goal'] },
  'retirement-savings': { hubHref: '/retirement', guideSlugs: ['retirement-savings', 'retirement-employer-contributions'], relatedCategories: ['compound-interest', 'save-for-goal', 'pension-contribution-scenarios'] },
  'offset-mortgage': { hubHref: '/offset', guideSlugs: ['offset-mortgage', 'mortgage-overpayment'], relatedCategories: ['mortgage-repayment', 'mortgage-overpayment', 'mortgage-affordability'] },
  'mortgage-overpayment': { hubHref: '/overpayment', guideSlugs: ['mortgage-overpayment', 'offset-mortgage'], relatedCategories: ['mortgage-repayment', 'offset-mortgage', 'save-for-goal'] },
  'save-for-goal': { hubHref: '/save-goal', guideSlugs: ['save-for-goal', 'emergency-fund-how-much'], relatedCategories: ['savings-growth', 'compound-interest', 'retirement-savings'] },
  'salary-take-home': { hubHref: '/take-home', guideSlugs: ['salary-take-home', 'salary-sacrifice'], relatedCategories: ['uk-tax-take-home', 'freelance-rate', 'mortgage-affordability'] },
  'mortgage-affordability': { hubHref: '/affordability', guideSlugs: ['mortgage-affordability', 'mortgage-repayment'], relatedCategories: ['mortgage-repayment', 'offset-mortgage', 'salary-take-home'] },
  'tdee-calorie': { hubHref: '/tdee', guideSlugs: ['tdee'], relatedCategories: ['subscription-drain', 'lifestyle-inflation', 'financial-crisis'] },
  'subscription-drain': { hubHref: '/subscriptions', guideSlugs: ['subscription-drain', 'save-for-goal'], relatedCategories: ['save-for-goal', 'compound-interest', 'lifestyle-inflation'] },
  'freelance-rate': { hubHref: '/freelance', guideSlugs: ['freelance-rate', 'salary-take-home'], relatedCategories: ['salary-take-home', 'uk-tax-take-home', 'mortgage-affordability'] },
  'lifestyle-inflation': { hubHref: '/lifestyle-inflation', guideSlugs: ['lifestyle-inflation', 'save-for-goal'], relatedCategories: ['subscription-drain', 'financial-crisis', 'retirement-savings'] },
  'financial-crisis': { hubHref: '/crisis', guideSlugs: ['financial-crisis', 'emergency-fund-how-much'], relatedCategories: ['save-for-goal', 'subscription-drain', 'lifestyle-inflation'] },
  'business-interruption': { hubHref: '/bi', guideSlugs: ['business-interruption'], relatedCategories: ['coverage-gap', 'total-cost-risk', 'risk-heatmap'] },
  'human-life-value': { hubHref: '/hlv', guideSlugs: ['retirement-savings', 'inheritance-tax'], relatedCategories: ['mortgage-affordability', 'retirement-savings', 'salary-take-home'] },
  'cyber-risk-exposure': { hubHref: '/cyber', guideSlugs: ['cyber-resilient-agency'], relatedCategories: ['cyber-limit', 'coverage-gap', 'total-cost-risk'] },
  'total-cost-risk': { hubHref: '/tcor', guideSlugs: ['business-interruption', 'cyber-resilient-agency'], relatedCategories: ['business-interruption', 'coverage-gap', 'risk-heatmap'] },
  'risk-heatmap': { hubHref: '/risk-heatmap', guideSlugs: ['business-interruption'], relatedCategories: ['coverage-gap', 'total-cost-risk', 'loss-probability'] },
  'scr-estimator': { hubHref: '/scr', guideSlugs: ['regtech-compliance-automation'], relatedCategories: ['total-cost-risk', 'coverage-gap', 'risk-heatmap'] },
  'coverage-gap': { hubHref: '/coverage-gap', guideSlugs: ['business-interruption', 'cyber-resilient-agency'], relatedCategories: ['business-interruption', 'total-cost-risk', 'cyber-limit'] },
  'ltv-cac': { hubHref: '/ltv-cac', guideSlugs: ['private-credit-playbook'], relatedCategories: ['freelance-rate', 'salary-take-home', 'loss-probability'] },
  'loss-probability': { hubHref: '/loss-probability', guideSlugs: ['financial-crisis', 'business-interruption'], relatedCategories: ['risk-heatmap', 'coverage-gap', 'total-cost-risk'] },
  'cyber-limit': { hubHref: '/cyber-limit', guideSlugs: ['cyber-resilient-agency'], relatedCategories: ['cyber-risk-exposure', 'coverage-gap', 'total-cost-risk'] },
  'uk-tax-take-home': { hubHref: '/take-home', guideSlugs: ['salary-take-home', 'salary-sacrifice'], relatedCategories: ['salary-take-home', 'pension-contribution-scenarios', 'freelance-rate'] },
  'pension-contribution-scenarios': { hubHref: '/retirement', guideSlugs: ['retirement-savings', 'retirement-employer-contributions'], relatedCategories: ['retirement-savings', 'uk-tax-take-home', 'save-for-goal'] },
};

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
  const variant = VARIANT_BY_KEY.get(`${category}/${expression}`);

  if (!config || !variant) {
    return null;
  }

  return { config, variant };
}

function categoryCode(config: CalculatorConfig): string {
  return config.categorySlug.replace(/-/g, ' ').toUpperCase();
}

function categorySupport(categorySlug: string): CategorySupport {
  return CATEGORY_SUPPORT[categorySlug] ?? {
    hubHref: '/learn',
    guideSlugs: [],
    relatedCategories: [],
  };
}

function buildRelatedCalculatorLinks(categorySlug: string) {
  const support = categorySupport(categorySlug);

  return support.relatedCategories
    .map((relatedCategory) => {
      const variant = FIRST_VARIANT_BY_CATEGORY.get(relatedCategory);
      const config = CONFIG_BY_CATEGORY.get(relatedCategory);

      if (!variant || !config) {
        return null;
      }

      return {
        href: `/calculators/${variant.categorySlug}/${variant.slug}`,
        label: config.name,
      };
    })
    .filter((link): link is { href: string; label: string } => Boolean(link))
    .slice(0, 4);
}

function buildRelatedGuideLinks(categorySlug: string) {
  return categorySupport(categorySlug).guideSlugs.map((slug) => ({
    href: `/learn/${slug}`,
    label: slug
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' '),
  }));
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
  return ALL_VARIANTS.slice(0, 1200).map((variant) => ({
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
  const canonical = `https://www.plainfigures.org/calculators/${category}/${expression}`;

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
  const support = categorySupport(category);
  const heading = renderTemplate(config.seoTemplate.h1, variant.params, config);
  const description = renderTemplate(config.seoTemplate.description, variant.params, config);
  const content = generateUniquePageContent(variant.params, config);
  const relatedCalculatorLinks = buildRelatedCalculatorLinks(category);
  const relatedGuideLinks = buildRelatedGuideLinks(category);
  const formulaHtml = formulaMarkup(config.formula);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(content.schema) }} />
      <CalcPageWrapper
        code={categoryCode(config)}
        title={heading}
        description={description}
        professional={PROFESSIONAL_CATEGORIES.has(category)}
        toolHref={support.hubHref}
        learnHref={relatedGuideLinks[0]?.href}
        learnLabel={relatedGuideLinks[0] ? `Read: ${relatedGuideLinks[0].label}` : undefined}
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
                The page title, summary text, and FAQ all reflect the exact inputs in this slug. That keeps the page specific to the query rather than recycling generic calculator copy across thousands of URLs.
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
              <div className={styles.detailLabel}>Internal Links</div>
              <div className={styles.linkGroup}>
                <div className={styles.linkLabel}>Related guides</div>
                <div className={styles.linkList}>
                  {relatedGuideLinks.map((link) => (
                    <Link key={link.href} href={link.href} className={styles.link}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div className={styles.linkGroup}>
                <div className={styles.linkLabel}>Other calculators</div>
                <div className={styles.linkList}>
                  {relatedCalculatorLinks.map((link) => (
                    <Link key={link.href} href={link.href} className={styles.link}>
                      {link.label}
                    </Link>
                  ))}
                  <Link href={support.hubHref} className={styles.link}>
                    Browse {config.name}
                  </Link>
                </div>
              </div>
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
