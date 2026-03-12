import { PROGRAMMATIC_LEARN_TOPICS } from '@/lib/programmatic-learn-extensions';
import { getIndexableSitemapUrls } from '@/lib/seo/indexation';

export const STATIC_PAGE_PATHS = [
  '/',
  '/about',
  '/calculators',
  '/methodology',
  '/formula-library',
  '/data-sources',
  '/how-we-update-tax-rates',
  '/editorial-policy',
  '/authors-and-review',
  '/privacy',
  '/terms',
  '/disclaimer',
  '/learn',
  '/mortgage-calculators',
  '/savings-calculators',
  '/investing-calculators',
  '/retirement-calculators',
  '/overpayment-and-offset',
  '/savings-and-compound-interest',
  '/income-tax-and-borrowing',
  '/risk-management-and-coverage',
  '/advisory-analytics-and-automation',
  '/lifestyle-and-runway',
  '/property-tax-and-estate-planning',
  '/investing-markets-and-fx',
];

export const CALCULATOR_HUB_PATHS = [
  '/mortgage',
  '/savings',
  '/rent-vs-buy',
  '/compound',
  '/loan',
  '/retirement',
  '/offset',
  '/overpayment',
  '/save-goal',
  '/take-home',
  '/affordability',
  '/tdee',
  '/subscriptions',
  '/freelance',
  '/lifestyle-inflation',
  '/crisis',
];

export const PRO_TOOL_PATHS = [
  '/bi',
  '/hlv',
  '/cyber',
  '/tcor',
  '/risk-heatmap',
  '/scr',
  '/coverage-gap',
  '/ltv-cac',
  '/loss-probability',
  '/cyber-limit',
];

export const LEARN_GUIDE_PATHS = [
  '/learn/mortgage-repayment',
  '/learn/compound-interest',
  '/learn/rent-vs-buy',
  '/learn/salary-take-home',
  '/learn/mortgage-affordability',
  '/learn/offset-mortgage',
  '/learn/retirement-savings',
  '/learn/financial-crisis',
  '/learn/mortgage-overpayment',
  '/learn/save-for-goal',
  '/learn/subscription-drain',
  '/learn/freelance-rate',
  '/learn/lifestyle-inflation',
  '/learn/business-interruption',
  '/learn/tdee',
  '/learn/loan-repayment',
  '/learn/agentic-advisor',
  '/learn/predictive-analytics-portfolio',
  '/learn/automation-audit-2026',
  '/learn/multigenerational-asset-retention',
  '/learn/inheritance-pivot-heirs',
  '/learn/tax-loss-harvesting',
  '/learn/private-credit-playbook',
  '/learn/parametric-insurance-weather',
  '/learn/cyber-resilient-agency',
  '/learn/regtech-compliance-automation',
  '/learn/market-forecasts-rate-cuts',
  '/learn/digital-client-experience-phygital',
  '/learn/financial-crisis-simulator',
  '/learn/retirement-employer-contributions',
  '/learn/emergency-fund-how-much',
  '/learn/buy-to-let-yield',
  '/learn/capital-gains-tax',
  '/learn/pension-drawdown',
  '/learn/salary-sacrifice',
  '/learn/student-loan-repayment',
  '/learn/lisa-help-to-buy',
  '/learn/inheritance-tax',
  '/learn/currency-exchange-fees',
  '/learn/dividend-vs-growth',
];

export const STATIC_PAGE_URLS = getIndexableSitemapUrls(STATIC_PAGE_PATHS);
export const CALCULATOR_HUB_URLS = getIndexableSitemapUrls(CALCULATOR_HUB_PATHS);
export const PRO_TOOL_URLS = getIndexableSitemapUrls(PRO_TOOL_PATHS);
export const LEARN_GUIDE_URLS = getIndexableSitemapUrls(LEARN_GUIDE_PATHS);
export const LEARN_EXTENSION_URLS = getIndexableSitemapUrls(
  PROGRAMMATIC_LEARN_TOPICS.map((topic) => `/learn/${topic.slug}`),
);

export function getStaticSitemapUrls(): string[] {
  return getIndexableSitemapUrls([
    ...STATIC_PAGE_PATHS,
    ...CALCULATOR_HUB_PATHS,
    ...PRO_TOOL_PATHS,
    ...LEARN_GUIDE_PATHS,
    ...PROGRAMMATIC_LEARN_TOPICS.map((topic) => `/learn/${topic.slug}`),
  ]);
}
