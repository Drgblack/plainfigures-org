import { PROGRAMMATIC_LEARN_TOPICS } from '@/lib/programmatic-learn-extensions';

export const STATIC_PAGE_URLS = [
  'https://www.plainfigures.org',
  'https://www.plainfigures.org/about',
  'https://www.plainfigures.org/methodology',
  'https://www.plainfigures.org/formula-library',
  'https://www.plainfigures.org/data-sources',
  'https://www.plainfigures.org/how-we-update-tax-rates',
  'https://www.plainfigures.org/editorial-policy',
  'https://www.plainfigures.org/authors-and-review',
  'https://www.plainfigures.org/privacy',
  'https://www.plainfigures.org/terms',
  'https://www.plainfigures.org/disclaimer',
  'https://www.plainfigures.org/learn',
  'https://www.plainfigures.org/mortgage-calculators',
  'https://www.plainfigures.org/overpayment-and-offset',
  'https://www.plainfigures.org/savings-and-compound-interest',
  'https://www.plainfigures.org/income-tax-and-borrowing',
];

export const CALCULATOR_HUB_URLS = [
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

export const PRO_TOOL_URLS = [
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

export const LEARN_GUIDE_URLS = [
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

export const LEARN_EXTENSION_URLS = PROGRAMMATIC_LEARN_TOPICS.map(
  (topic) => `https://www.plainfigures.org/learn/${topic.slug}`,
);

export function getStaticSitemapUrls(): string[] {
  return [
    ...STATIC_PAGE_URLS,
    ...CALCULATOR_HUB_URLS,
    ...PRO_TOOL_URLS,
    ...LEARN_GUIDE_URLS,
    ...LEARN_EXTENSION_URLS,
  ];
}
