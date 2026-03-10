import {
  getProgrammaticCategory,
  getProgrammaticPath,
  PROGRAMMATIC_INDEX_CANDIDATES,
  PROGRAMMATIC_PRERENDER_TARGETS,
} from '@/lib/finance-calculator-templates';
import { getProgrammaticLearnTopic, PROGRAMMATIC_LEARN_TOPICS } from '@/lib/programmatic-learn-extensions';

type BatchKey =
  | 'batch-1-housing-debt'
  | 'batch-2-wealth-planning'
  | 'batch-3-income-cashflow'
  | 'batch-4-support-models';

interface BatchDefinition {
  key: BatchKey;
  title: string;
  summary: string;
  categories: string[];
  monitorFor: string[];
}

export interface ProgrammaticCategoryReport {
  slug: string;
  label: string;
  calculatorHref: string;
  learnHref?: string;
  extensionHref?: string;
  batchKey: BatchKey;
  indexableUrls: number;
  prerenderedUrls: number;
  samplePaths: string[];
  gscPathPrefix: string;
}

export interface ProgrammaticBatchReport {
  key: BatchKey;
  title: string;
  summary: string;
  categories: ProgrammaticCategoryReport[];
  indexableUrls: number;
  prerenderedUrls: number;
  monitorFor: string[];
}

export interface ProgrammaticReportingSnapshot {
  totals: {
    categories: number;
    learnExtensions: number;
    indexableUrls: number;
    prerenderedUrls: number;
  };
  batches: ProgrammaticBatchReport[];
  categories: ProgrammaticCategoryReport[];
}

const BATCHES: BatchDefinition[] = [
  {
    key: 'batch-1-housing-debt',
    title: 'Batch 1: Housing & Debt',
    summary: 'Highest-CPC mortgage and loan pages. Watch impressions, CTR, and RPM first here.',
    categories: ['mortgage-repayment', 'loan-repayment', 'offset-mortgage'],
    monitorFor: ['Mortgage RPM', 'Loan CTR', 'Mortgage impression growth', 'Top converting expressions'],
  },
  {
    key: 'batch-2-wealth-planning',
    title: 'Batch 2: Wealth & Planning',
    summary: 'Compounding, retirement, and goal-led savings clusters that support high-intent financial planning searches.',
    categories: ['compound-interest', 'retirement-savings', 'save-for-goal', 'subscription-drain'],
    monitorFor: ['Return-query CTR', 'Retirement RPM', 'Savings-goal conversion to calculator opens'],
  },
  {
    key: 'batch-3-income-cashflow',
    title: 'Batch 3: Income & Cash Flow',
    summary: 'Take-home and freelance pricing clusters that tend to win via practical calculator intent.',
    categories: ['salary-take-home', 'freelance-rate'],
    monitorFor: ['Gross-to-net query growth', 'Bonus query wins', 'Freelance pricing calculator engagement'],
  },
  {
    key: 'batch-4-support-models',
    title: 'Batch 4: Support Models',
    summary: 'Lower-priority support topics and pro tools. Keep them indexed, but evaluate mainly on qualified impressions.',
    categories: ['tdee-calorie', 'ltv-cac', 'cyber-risk-exposure', 'total-cost-risk'],
    monitorFor: ['Qualified impressions', 'Support-link assists', 'B2B query share'],
  },
];

function countByCategory(targets: { category: string }[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const target of targets) {
    counts.set(target.category, (counts.get(target.category) ?? 0) + 1);
  }
  return counts;
}

function samplePaths(category: string, limit = 3): string[] {
  return PROGRAMMATIC_INDEX_CANDIDATES
    .filter((target) => target.category === category)
    .slice(0, limit)
    .map((target) => getProgrammaticPath(target.category, target.expression));
}

export function getProgrammaticReportingSnapshot(): ProgrammaticReportingSnapshot {
  const indexCounts = countByCategory(PROGRAMMATIC_INDEX_CANDIDATES);
  const prerenderCounts = countByCategory(PROGRAMMATIC_PRERENDER_TARGETS);

  const categories: ProgrammaticCategoryReport[] = BATCHES.flatMap((batch) =>
    batch.categories.map((slug) => {
      const template = getProgrammaticCategory(slug);
      if (!template) {
        throw new Error(`Unknown programmatic category: ${slug}`);
      }

      const extension = PROGRAMMATIC_LEARN_TOPICS.find((topic) => topic.categorySlug === slug);

      return {
        slug,
        label: template.label,
        calculatorHref: template.toolHref,
        learnHref: template.learnHref,
        extensionHref: extension ? `/learn/${extension.slug}` : undefined,
        batchKey: batch.key,
        indexableUrls: indexCounts.get(slug) ?? 0,
        prerenderedUrls: prerenderCounts.get(slug) ?? 0,
        samplePaths: samplePaths(slug),
        gscPathPrefix: `/calculators/${slug}/`,
      };
    })
  );

  const batches: ProgrammaticBatchReport[] = BATCHES.map((batch) => {
    const batchCategories = categories.filter((category) => category.batchKey === batch.key);
    return {
      key: batch.key,
      title: batch.title,
      summary: batch.summary,
      categories: batchCategories,
      indexableUrls: batchCategories.reduce((sum, category) => sum + category.indexableUrls, 0),
      prerenderedUrls: batchCategories.reduce((sum, category) => sum + category.prerenderedUrls, 0),
      monitorFor: batch.monitorFor,
    };
  });

  return {
    totals: {
      categories: categories.length,
      learnExtensions: PROGRAMMATIC_LEARN_TOPICS.length,
      indexableUrls: PROGRAMMATIC_INDEX_CANDIDATES.length,
      prerenderedUrls: PROGRAMMATIC_PRERENDER_TARGETS.length,
    },
    batches,
    categories,
  };
}

export function getProgrammaticExtensionByCategory(categorySlug: string) {
  return PROGRAMMATIC_LEARN_TOPICS.find((topic) => topic.categorySlug === categorySlug) ?? null;
}

export function getProgrammaticExtension(slug: string) {
  return getProgrammaticLearnTopic(slug);
}
