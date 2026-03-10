import { MetadataRoute } from 'next';
import { getProgrammaticPath, getProgrammaticSitemapTargets } from '@/lib/finance-calculator-templates';
import { PROGRAMMATIC_LEARN_TOPICS } from '@/lib/programmatic-learn-extensions';

// Calculator pages — high priority, weekly change
const CALCULATORS = [
  'mortgage', 'savings', 'compound', 'rent-vs-buy', 'loan',
  'retirement', 'offset', 'overpayment', 'take-home', 'affordability',
  'tdee', 'subscriptions', 'freelance', 'lifestyle-inflation',
  'crisis', 'save-goal',
];

// Professional tools — high priority, monthly change
const PRO_TOOLS = [
  'bi', 'hlv', 'cyber', 'tcor', 'risk-heatmap',
  'scr', 'coverage-gap', 'ltv-cac', 'loss-probability', 'cyber-limit',
];

// Learning Centre guides — medium priority, monthly change
const GUIDES = [
  'mortgage-repayment', 'compound-interest', 'rent-vs-buy',
  'salary-take-home', 'mortgage-affordability', 'offset-mortgage',
  'retirement-savings', 'financial-crisis', 'mortgage-overpayment',
  'save-for-goal', 'subscription-drain', 'freelance-rate',
  'lifestyle-inflation', 'business-interruption', 'tdee',
  'loan-repayment', 'agentic-advisor', 'predictive-analytics-portfolio',
  'automation-audit-2026', 'multigenerational-asset-retention',
  'inheritance-pivot-heirs', 'tax-loss-harvesting', 'private-credit-playbook',
  'parametric-insurance-weather', 'cyber-resilient-agency',
  'regtech-compliance-automation', 'market-forecasts-rate-cuts',
  'digital-client-experience-phygital', 'financial-crisis-simulator',
  'retirement-employer-contributions', 'emergency-fund-how-much',
  'buy-to-let-yield', 'capital-gains-tax', 'pension-drawdown',
  'salary-sacrifice', 'student-loan-repayment', 'lisa-help-to-buy',
  'inheritance-tax', 'currency-exchange-fees', 'dividend-vs-growth',
];

// Static pages
const STATIC = ['', 'about', 'privacy', 'terms', 'disclaimer', 'contact', 'cookies', 'learn'];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticPages = STATIC.map(slug => ({
    url: slug ? `https://plainfigures.org/${slug}` : 'https://plainfigures.org',
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: slug === '' ? 1.0 : 0.6,
  }));

  const calcPages = CALCULATORS.map(slug => ({
    url: `https://plainfigures.org/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const proPages = PRO_TOOLS.map(slug => ({
    url: `https://plainfigures.org/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

  const guidePages = GUIDES.map(slug => ({
    url: `https://plainfigures.org/learn/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));

  const programmaticPages = getProgrammaticSitemapTargets().map(({ category, expression }) => ({
    url: `https://plainfigures.org${getProgrammaticPath(category, expression)}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const learnExtensionPages = PROGRAMMATIC_LEARN_TOPICS.map((topic) => ({
    url: `https://plainfigures.org/learn/${topic.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.72,
  }));

  return [...staticPages, ...calcPages, ...proPages, ...guidePages, ...programmaticPages, ...learnExtensionPages];
}
