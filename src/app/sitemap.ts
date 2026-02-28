import { MetadataRoute } from 'next';

// Calculator pages — high priority, weekly change
const CALCULATORS = [
  'mortgage', 'savings', 'compound', 'rent-vs-buy', 'loan',
  'retirement', 'offset', 'overpayment', 'take-home', 'affordability',
  'tdee', 'subscriptions', 'freelance', 'lifestyle-inflation',
  'crisis', 'save-goal',
];

// Professional tools — high priority, monthly change
const PRO_TOOLS = [
  'business-interruption', 'life-insurance', 'cyber-risk',
  'tcor', 'risk-heatmap', 'scr', 'coverage-gap', 'ltv-cac',
  'loss-probability', 'cyber-limit',
];

// Learning Centre guides — medium priority, monthly change
const GUIDES = [
  'mortgage-repayment', 'compound-interest', 'savings-growth',
  'rent-vs-buy', 'salary-take-home', 'retirement-savings',
  'offset-mortgage', 'mortgage-overpayment', 'mortgage-affordability',
  'loan-repayment', 'financial-crisis-simulator', 'buy-to-let-yield',
  'capital-gains-tax-2026', 'pension-drawdown', 'salary-sacrifice',
  'student-loan-repayment', 'lisa-vs-help-to-buy', 'inheritance-tax-uk',
  'currency-exchange-costs', 'dividend-yield-vs-growth',
  'agentic-advisor-ai', 'predictive-analytics-portfolios',
  'automation-audit-2026', 'multigenerational-wealth-transfer',
  'tax-loss-harvesting', 'private-credit-playbook',
  'parametric-insurance-weather', 'cyber-resilient-agency',
  'regtech-compliance-automation', 'market-forecasts-rate-cuts',
  'digital-client-experience',
];

// Static pages
const STATIC = ['', 'about', 'privacy', 'terms', 'disclaimer', 'contact', 'cookies', 'saved', 'learn'];

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

  return [...staticPages, ...calcPages, ...proPages, ...guidePages];
}
