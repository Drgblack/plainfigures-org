import { generateAllSlugs } from '@/lib/calculators/config';
import { MetadataRoute } from 'next';

export const revalidate = 86400;
export const dynamic = 'force-static';

const STATIC_PAGE_URLS = [
  'https://www.plainfigures.org',
  'https://www.plainfigures.org/about',
  'https://www.plainfigures.org/privacy',
  'https://www.plainfigures.org/terms',
  'https://www.plainfigures.org/disclaimer',
  'https://www.plainfigures.org/contact',
  'https://www.plainfigures.org/cookies',
  'https://www.plainfigures.org/learn',
];

const CALCULATOR_HUB_URLS = [
  'https://www.plainfigures.org/mortgage',
  'https://www.plainfigures.org/savings',
  'https://www.plainfigures.org/rent-vs-buy',
  'https://www.plainfigures.org/compound',
  'https://www.plainfigures.org/loan',
  'https://www.plainfigures.org/retirement',
  'https://www.plainfigures.org/offset',
  'https://www.plainfigures.org/overpayment',
  'https://www.plainfigures.org/save-goal',
  'https://www.plainfigures.org/take-home',
  'https://www.plainfigures.org/affordability',
  'https://www.plainfigures.org/tdee',
  'https://www.plainfigures.org/subscriptions',
  'https://www.plainfigures.org/freelance',
  'https://www.plainfigures.org/lifestyle-inflation',
  'https://www.plainfigures.org/crisis',
];

const PRO_TOOL_URLS = [
  'https://www.plainfigures.org/bi',
  'https://www.plainfigures.org/hlv',
  'https://www.plainfigures.org/cyber',
  'https://www.plainfigures.org/tcor',
  'https://www.plainfigures.org/risk-heatmap',
  'https://www.plainfigures.org/scr',
  'https://www.plainfigures.org/coverage-gap',
  'https://www.plainfigures.org/ltv-cac',
  'https://www.plainfigures.org/loss-probability',
  'https://www.plainfigures.org/cyber-limit',
];

const LEARN_GUIDE_URLS = [
  'https://www.plainfigures.org/learn/mortgage-repayment',
  'https://www.plainfigures.org/learn/compound-interest',
  'https://www.plainfigures.org/learn/rent-vs-buy',
  'https://www.plainfigures.org/learn/salary-take-home',
  'https://www.plainfigures.org/learn/mortgage-affordability',
  'https://www.plainfigures.org/learn/offset-mortgage',
  'https://www.plainfigures.org/learn/retirement-savings',
  'https://www.plainfigures.org/learn/financial-crisis',
  'https://www.plainfigures.org/learn/mortgage-overpayment',
  'https://www.plainfigures.org/learn/save-for-goal',
  'https://www.plainfigures.org/learn/subscription-drain',
  'https://www.plainfigures.org/learn/freelance-rate',
  'https://www.plainfigures.org/learn/lifestyle-inflation',
  'https://www.plainfigures.org/learn/business-interruption',
  'https://www.plainfigures.org/learn/tdee',
  'https://www.plainfigures.org/learn/loan-repayment',
  'https://www.plainfigures.org/learn/agentic-advisor',
  'https://www.plainfigures.org/learn/predictive-analytics-portfolio',
  'https://www.plainfigures.org/learn/automation-audit-2026',
  'https://www.plainfigures.org/learn/multigenerational-asset-retention',
  'https://www.plainfigures.org/learn/inheritance-pivot-heirs',
  'https://www.plainfigures.org/learn/tax-loss-harvesting',
  'https://www.plainfigures.org/learn/private-credit-playbook',
  'https://www.plainfigures.org/learn/parametric-insurance-weather',
  'https://www.plainfigures.org/learn/cyber-resilient-agency',
  'https://www.plainfigures.org/learn/regtech-compliance-automation',
  'https://www.plainfigures.org/learn/market-forecasts-rate-cuts',
  'https://www.plainfigures.org/learn/digital-client-experience-phygital',
  'https://www.plainfigures.org/learn/financial-crisis-simulator',
  'https://www.plainfigures.org/learn/retirement-employer-contributions',
  'https://www.plainfigures.org/learn/emergency-fund-how-much',
  'https://www.plainfigures.org/learn/buy-to-let-yield',
  'https://www.plainfigures.org/learn/capital-gains-tax',
  'https://www.plainfigures.org/learn/pension-drawdown',
  'https://www.plainfigures.org/learn/salary-sacrifice',
  'https://www.plainfigures.org/learn/student-loan-repayment',
  'https://www.plainfigures.org/learn/lisa-help-to-buy',
  'https://www.plainfigures.org/learn/inheritance-tax',
  'https://www.plainfigures.org/learn/currency-exchange-fees',
  'https://www.plainfigures.org/learn/dividend-vs-growth',
];

const LEARN_EXTENSION_URLS = [
  'https://www.plainfigures.org/learn/mortgage-payment-examples',
  'https://www.plainfigures.org/learn/mortgage-rate-vs-term',
  'https://www.plainfigures.org/learn/compound-interest-by-frequency',
  'https://www.plainfigures.org/learn/simple-vs-compound-interest',
  'https://www.plainfigures.org/learn/loan-apr-vs-interest-rate',
  'https://www.plainfigures.org/learn/retirement-pot-targets',
  'https://www.plainfigures.org/learn/salary-bonus-take-home',
  'https://www.plainfigures.org/learn/offset-vs-overpayment',
  'https://www.plainfigures.org/learn/savings-goal-deadline',
  'https://www.plainfigures.org/learn/subscription-opportunity-cost',
  'https://www.plainfigures.org/learn/freelance-day-rate-from-salary',
];

function createEntries(
  urls: string[],
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'],
  priority: number,
  now: Date
): MetadataRoute.Sitemap {
  return urls.map((url) => ({
    url,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages = [
    ...createEntries(STATIC_PAGE_URLS, 'monthly', 0.6, now),
    ...createEntries(CALCULATOR_HUB_URLS, 'weekly', 0.9, now),
    ...createEntries(PRO_TOOL_URLS, 'monthly', 0.85, now),
    ...createEntries(LEARN_GUIDE_URLS, 'monthly', 0.75, now),
    ...createEntries(LEARN_EXTENSION_URLS, 'monthly', 0.72, now),
  ];

  staticPages[0] = {
    ...staticPages[0],
    priority: 1,
  };

  const programmatic = generateAllSlugs().map((page) => ({
    url: `https://www.plainfigures.org/calculators/${page.categorySlug}/${page.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  console.log(`Total URLs: ${staticPages.length + programmatic.length}`);

  return [...staticPages, ...programmatic];
}
