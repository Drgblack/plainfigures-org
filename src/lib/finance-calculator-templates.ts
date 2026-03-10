import { calculateCompound, calculateLoan, calculateMortgage, calculateOffset, calculateRetirement, calculateSaveGoal } from '@/lib/calculations';
import { CurrencyKey } from '@/lib/currencies';
import { formatCurrency, formatNumber } from '@/lib/formatting';
import { calculateCyberRisk, calculateLTVCAC, calculateTCOR } from '@/lib/insurance-calculations';
import { calculateFreelanceRate, calculateSubscriptionDrain, calculateTDEE } from '@/lib/lifestyle-calculations';
import { calculateTakeHome, COUNTRY_CONFIG, CountryCode } from '@/lib/tax-calculations';

export const PROGRAMMATIC_ROUTE_BASE = '/calculators';
export const PROGRAMMATIC_REVALIDATE_SECONDS = 86400;
export const PROGRAMMATIC_PRERENDER_LIMIT = 1080;
export const PROGRAMMATIC_SITEMAP_LIMIT = 3600;

type CalculatorKind =
  | 'mortgage'
  | 'compound'
  | 'loan'
  | 'retirement'
  | 'salary'
  | 'offset'
  | 'goal'
  | 'tdee'
  | 'subscription'
  | 'freelance'
  | 'ltvcac'
  | 'cyber'
  | 'tcor';

export interface ProgrammaticStat {
  label: string;
  value: string;
  sub?: string;
  tone?: 'default' | 'positive' | 'negative' | 'warning';
}

export interface ProgrammaticFaq {
  question: string;
  answer: string;
}

export interface ProgrammaticFormula {
  label: string;
  expression: string;
  variables: string[];
  explanation: string[];
}

export interface ProgrammaticSection {
  heading: string;
  paragraphs: string[];
}

export interface ProgrammaticScenario {
  title: string;
  body: string;
}

export interface ProgrammaticCalculatorConfig {
  kind: CalculatorKind;
  displayCurrency?: CurrencyKey;
  initialValues: Record<string, boolean | number | string>;
}

export interface ProgrammaticTemplate {
  slug: string;
  code: string;
  toolHref: string;
  label: string;
  baseTitle: string;
  learnHref?: string;
  learnLabel?: string;
  relatedCalcHrefs: string[];
  relatedGuideHrefs: string[];
  defaultCurrency?: CurrencyKey;
  rateContext?: string;
}

export interface ProgrammaticPageData {
  category: ProgrammaticTemplate;
  categorySlug: string;
  expression: string;
  path: string;
  title: string;
  heading: string;
  description: string;
  deck: string;
  formula: ProgrammaticFormula;
  stats: ProgrammaticStat[];
  steps: string[];
  sections: ProgrammaticSection[];
  scenarios: ProgrammaticScenario[];
  faqs: ProgrammaticFaq[];
  disclaimers: string[];
  calculator: ProgrammaticCalculatorConfig;
}

export interface ProgrammaticStaticTarget {
  category: string;
  expression: string;
}

export interface ProgrammaticCatalogTarget extends ProgrammaticStaticTarget {
  priority: number;
  bucket: 'core' | 'expansion' | 'support';
}

const ACTIVITY_LEVELS = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  'very-active': 1.9,
} as const;

const ACTIVITY_LABELS = {
  sedentary: 'sedentary',
  light: 'light activity',
  moderate: 'moderate activity',
  active: 'active training',
  'very-active': 'very active training',
} as const;

const COMPOUND_FREQUENCIES = {
  annual: 1,
  quarterly: 4,
  monthly: 12,
  daily: 365,
} as const;

const CYBER_RISK_LEVELS = {
  low: 1,
  medium: 2,
  elevated: 3,
  high: 4,
  critical: 5,
} as const;

const COUNTRY_TO_CURRENCY: Record<CountryCode, CurrencyKey> = {
  UK: 'gbp',
  DE: 'eur',
  US: 'usd',
  FR: 'eur',
  NL: 'eur',
  AU: 'aud',
};

const PROGRAMMATIC_TEMPLATES: Record<string, ProgrammaticTemplate> = {
  'mortgage-repayment': {
    slug: 'mortgage-repayment',
    code: 'PSEO / MORTGAGE',
    toolHref: '/mortgage',
    label: 'Mortgage Repayment',
    baseTitle: 'Mortgage Repayment Calculator',
    learnHref: '/learn/mortgage-repayment',
    learnLabel: 'How mortgage repayments are calculated',
    relatedCalcHrefs: ['/mortgage', '/overpayment', '/offset', '/affordability'],
    relatedGuideHrefs: ['/learn/mortgage-repayment', '/learn/mortgage-overpayment', '/learn/mortgage-affordability'],
    defaultCurrency: 'usd',
    rateContext: 'Formula-first estimate only. Real mortgage deals include fees, insurance, taxes, and rate resets that are not advice or product recommendations.',
  },
  'compound-interest': {
    slug: 'compound-interest',
    code: 'PSEO / COMPOUND',
    toolHref: '/compound',
    label: 'Compound Interest',
    baseTitle: 'Compound Interest Calculator',
    learnHref: '/learn/compound-interest',
    learnLabel: 'How compound growth works',
    relatedCalcHrefs: ['/compound', '/savings', '/retirement', '/save-goal'],
    relatedGuideHrefs: ['/learn/compound-interest', '/learn/retirement-savings', '/learn/save-for-goal'],
    defaultCurrency: 'usd',
    rateContext: 'Illustrative compounding only. Market returns, taxes, fees, and sequence risk change real outcomes.',
  },
  'loan-repayment': {
    slug: 'loan-repayment',
    code: 'PSEO / LOAN',
    toolHref: '/loan',
    label: 'Loan Repayment',
    baseTitle: 'Loan Repayment Calculator',
    learnHref: '/learn/loan-repayment',
    learnLabel: 'How loan repayments work',
    relatedCalcHrefs: ['/loan', '/mortgage', '/subscriptions'],
    relatedGuideHrefs: ['/learn/loan-repayment', '/learn/student-loan-repayment', '/learn/compound-interest'],
    defaultCurrency: 'usd',
    rateContext: 'Payments shown here are principal-and-interest math only. Origination fees, penalties, insurance, and lender underwriting are outside scope.',
  },
  'retirement-savings': {
    slug: 'retirement-savings',
    code: 'PSEO / RETIREMENT',
    toolHref: '/retirement',
    label: 'Retirement Savings',
    baseTitle: 'Retirement Savings Calculator',
    learnHref: '/learn/retirement-savings',
    learnLabel: 'How retirement projections work',
    relatedCalcHrefs: ['/retirement', '/compound', '/take-home', '/save-goal'],
    relatedGuideHrefs: ['/learn/retirement-savings', '/learn/pension-drawdown', '/learn/salary-sacrifice'],
    defaultCurrency: 'usd',
    rateContext: 'Projection only. Investment returns, inflation, tax wrappers, employer policy, and withdrawal rules all change real retirement outcomes.',
  },
  'salary-take-home': {
    slug: 'salary-take-home',
    code: 'PSEO / TAKE-HOME',
    toolHref: '/take-home',
    label: 'Salary Take-Home',
    baseTitle: 'Salary Take-Home Calculator',
    learnHref: '/learn/salary-take-home',
    learnLabel: 'How take-home pay is estimated',
    relatedCalcHrefs: ['/take-home', '/freelance', '/retirement'],
    relatedGuideHrefs: ['/learn/salary-take-home', '/learn/salary-sacrifice', '/learn/capital-gains-tax'],
    rateContext: 'Illustrative tax estimate only. Local allowances, pension deductions, benefits, filing status, and payroll timing can materially change take-home pay.',
  },
  'offset-mortgage': {
    slug: 'offset-mortgage',
    code: 'PSEO / OFFSET',
    toolHref: '/offset',
    label: 'Offset Mortgage',
    baseTitle: 'Offset Mortgage Calculator',
    learnHref: '/learn/offset-mortgage',
    learnLabel: 'How offset mortgages work',
    relatedCalcHrefs: ['/offset', '/mortgage', '/overpayment', '/savings'],
    relatedGuideHrefs: ['/learn/offset-mortgage', '/learn/mortgage-repayment', '/learn/save-for-goal'],
    defaultCurrency: 'usd',
    rateContext: 'Offset savings are treated as a pure balance reducer for illustration. Product rules differ by lender and are not financial advice.',
  },
  'save-for-goal': {
    slug: 'save-for-goal',
    code: 'PSEO / GOAL',
    toolHref: '/save-goal',
    label: 'Save for a Goal',
    baseTitle: 'Save for a Goal Calculator',
    learnHref: '/learn/save-for-goal',
    learnLabel: 'How savings target maths works',
    relatedCalcHrefs: ['/save-goal', '/savings', '/compound', '/subscriptions'],
    relatedGuideHrefs: ['/learn/save-for-goal', '/learn/compound-interest', '/learn/subscription-drain'],
    defaultCurrency: 'usd',
    rateContext: 'Savings projections assume steady deposits and steady returns. Real cash rates, taxes, and behaviour vary over time.',
  },
  'tdee-calorie': {
    slug: 'tdee-calorie',
    code: 'PSEO / TDEE',
    toolHref: '/tdee',
    label: 'TDEE & Calorie',
    baseTitle: 'TDEE & Calorie Calculator',
    learnHref: '/learn/tdee',
    learnLabel: 'How TDEE is estimated',
    relatedCalcHrefs: ['/tdee', '/subscriptions'],
    relatedGuideHrefs: ['/learn/tdee'],
    rateContext: 'Energy expenditure models are directional only. They are not medical advice, diagnosis, or personalised nutrition planning.',
  },
  'subscription-drain': {
    slug: 'subscription-drain',
    code: 'PSEO / SUBSCRIPTIONS',
    toolHref: '/subscriptions',
    label: 'Subscription Drain',
    baseTitle: 'Subscription Drain Calculator',
    learnHref: '/learn/subscription-drain',
    learnLabel: 'How recurring costs compound',
    relatedCalcHrefs: ['/subscriptions', '/save-goal', '/lifestyle-inflation'],
    relatedGuideHrefs: ['/learn/subscription-drain', '/learn/save-for-goal', '/learn/lifestyle-inflation'],
    defaultCurrency: 'usd',
    rateContext: 'Opportunity-cost maths is deterministic here. Real investment returns and spending choices are uncertain.',
  },
  'freelance-rate': {
    slug: 'freelance-rate',
    code: 'PSEO / FREELANCE',
    toolHref: '/freelance',
    label: 'Freelance Rate',
    baseTitle: 'Freelance Rate Calculator',
    learnHref: '/learn/freelance-rate',
    learnLabel: 'How freelance pricing works',
    relatedCalcHrefs: ['/freelance', '/take-home', '/subscriptions'],
    relatedGuideHrefs: ['/learn/freelance-rate', '/learn/salary-take-home', '/learn/lifestyle-inflation'],
    defaultCurrency: 'usd',
    rateContext: 'Illustrative pricing only. Real freelance rates depend on market positioning, utilisation, contracts, taxes, and collection risk.',
  },
  'ltv-cac': {
    slug: 'ltv-cac',
    code: 'PSEO / LTV:CAC',
    toolHref: '/ltv-cac',
    label: 'LTV & CAC',
    baseTitle: 'LTV & CAC Calculator',
    learnHref: '/learn',
    learnLabel: 'Learning Centre',
    relatedCalcHrefs: ['/ltv-cac', '/freelance'],
    relatedGuideHrefs: ['/learn/private-credit-playbook', '/learn/predictive-analytics-portfolio'],
    defaultCurrency: 'usd',
    rateContext: 'Board-style unit economics model only. Churn, margin, CAC attribution, and discount rate assumptions are opinion-free inputs, not recommendations.',
  },
  'cyber-risk-exposure': {
    slug: 'cyber-risk-exposure',
    code: 'PSEO / CYBER',
    toolHref: '/cyber',
    label: 'Cyber Risk Exposure',
    baseTitle: 'Cyber Risk Exposure Calculator',
    learnHref: '/learn/cyber-resilient-agency',
    learnLabel: 'Cyber risk context',
    relatedCalcHrefs: ['/cyber', '/cyber-limit', '/coverage-gap', '/risk-heatmap'],
    relatedGuideHrefs: ['/learn/cyber-resilient-agency', '/learn/regtech-compliance-automation'],
    defaultCurrency: 'usd',
    rateContext: 'Exposure model only. It is not underwriting, broker advice, incident response guidance, or a formal security assessment.',
  },
  'total-cost-risk': {
    slug: 'total-cost-risk',
    code: 'PSEO / TCOR',
    toolHref: '/tcor',
    label: 'Total Cost of Risk',
    baseTitle: 'Total Cost of Risk Calculator',
    learnHref: '/learn/business-interruption',
    learnLabel: 'Risk cost context',
    relatedCalcHrefs: ['/tcor', '/coverage-gap', '/risk-heatmap', '/loss-probability'],
    relatedGuideHrefs: ['/learn/business-interruption', '/learn/financial-crisis'],
    defaultCurrency: 'usd',
    rateContext: 'TCOR outputs are modelling figures only. Insurance structure, claims volatility, finance policy, and operational controls can move real costs materially.',
  },
};

function hashSeed(value: string): number {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hash;
}

function pickVariant<T>(seed: string, items: readonly T[]): T {
  return items[hashSeed(seed) % items.length];
}

function money(value: number, currency: CurrencyKey = 'usd', digits = 0): string {
  return formatCurrency(value, currency, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

function yearText(years: number): string {
  return `${formatNumber(years, Number.isInteger(years) ? 0 : 1)} year${years === 1 ? '' : 's'}`;
}

function monthText(months: number): string {
  return `${formatNumber(months, Number.isInteger(months) ? 0 : 1)} month${months === 1 ? '' : 's'}`;
}

function percentText(value: number, digits = 1): string {
  return `${formatNumber(value, digits)}%`;
}

function titleCase(value: string): string {
  return value.replace(/\b\w/g, (char) => char.toUpperCase());
}

function uniqueTargets(targets: ProgrammaticStaticTarget[]): ProgrammaticStaticTarget[] {
  const seen = new Set<string>();
  return targets.filter((target) => {
    const key = `${target.category}:${target.expression}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function uniqueCatalogTargets(targets: ProgrammaticCatalogTarget[]): ProgrammaticCatalogTarget[] {
  const seen = new Set<string>();
  return targets.filter((target) => {
    const key = `${target.category}:${target.expression}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function scoreByPreference<T extends number | string>(value: T, order: readonly T[]): number {
  const index = order.indexOf(value);
  return index === -1 ? 0 : order.length - index;
}

function catalogPriority(categoryWeight: number, ...signals: number[]): number {
  return signals.reduce((total, signal, index) => total + signal * (index === 0 ? 18 : index === 1 ? 12 : 6), categoryWeight);
}

function toStaticTarget(target: ProgrammaticCatalogTarget): ProgrammaticStaticTarget {
  return {
    category: target.category,
    expression: target.expression,
  };
}

function financeDisclaimers(topic: string): string[] {
  return [
    `Plain Figures keeps every ${topic} page formula-first: no products, no upsells, and no opinionated “best option” framing. The numbers are here to make the mechanics visible.`,
    'Not financial advice. These pages are for illustration only and do not account for lender policy, taxation, fees, legal structure, personal circumstances, or changing market conditions.',
  ];
}

function operatingDisclaimers(topic: string): string[] {
  return [
    `This ${topic} page is intentionally model-driven. It isolates the calculation so operators can stress test assumptions without sales language or policy recommendations.`,
    'Illustrative only. These figures are not underwriting advice, broker advice, accounting advice, legal advice, security advice, or a substitute for a formal review.',
  ];
}

function healthDisclaimers(): string[] {
  return [
    'Plain Figures uses the published formula without coaching language, supplements, or meal-plan advice. The goal is to show the arithmetic behind the estimate.',
    'Not medical advice. TDEE, calorie, and macro outputs are illustration-only estimates and should not replace clinical, nutritional, or personal health guidance.',
  ];
}

function buildPath(category: string, expression: string): string {
  return `${PROGRAMMATIC_ROUTE_BASE}/${category}/${expression}`;
}

function asNumber(value: string): number {
  return Number.parseFloat(value);
}

type ParsedState = Record<string, boolean | number | string>;

function parseMortgage(expression: string): ParsedState | null {
  const match = expression.match(/^mortgage-payment-(\d+)-(\d+(?:\.\d+)?)-(\d+)-years$/);
  if (!match) return null;
  const [, principal, rate, termYears] = match;
  return {
    principal: asNumber(principal),
    rate: asNumber(rate),
    termYears: asNumber(termYears),
  };
}

function parseCompound(expression: string): ParsedState | null {
  const match = expression.match(/^compound-interest-(\d+)-(\d+(?:\.\d+)?)-(\d+)-compounded-(annual|quarterly|monthly|daily)$/);
  if (!match) return null;
  const [, principal, rate, years, frequency] = match;
  return {
    principal: asNumber(principal),
    rate: asNumber(rate),
    years: asNumber(years),
    frequency,
  };
}

function parseLoan(expression: string): ParsedState | null {
  const match = expression.match(/^loan-repayment-(\d+)-(\d+(?:\.\d+)?)-(\d+)-months$/);
  if (!match) return null;
  const [, amount, rate, termMonths] = match;
  return {
    amount: asNumber(amount),
    rate: asNumber(rate),
    termMonths: asNumber(termMonths),
  };
}

function parseRetirement(expression: string): ParsedState | null {
  const match = expression.match(/^retirement-savings-(\d+)-month-(\d+(?:\.\d+)?)-(\d+)-years$/);
  if (!match) return null;
  const [, monthlyContribution, growthRate, years] = match;
  return {
    currentAge: 35,
    retirementAge: 35 + asNumber(years),
    currentSavings: 25000,
    monthlyContribution: asNumber(monthlyContribution),
    employerContribution: Math.round(asNumber(monthlyContribution) * 0.4),
    growthRate: asNumber(growthRate),
    inflationRate: 2.5,
  };
}

function parseSalary(expression: string): ParsedState | null {
  const match = expression.match(/^salary-take-home-(uk|de|us|fr|nl|au)-(\d+)$/);
  if (!match) return null;
  const [, country, gross] = match;
  return {
    country: country.toUpperCase(),
    gross: asNumber(gross),
  };
}

function parseOffset(expression: string): ParsedState | null {
  const match = expression.match(/^offset-mortgage-(\d+)-balance-(\d+)-savings-(\d+(?:\.\d+)?)-(\d+)-years$/);
  if (!match) return null;
  const [, balance, savings, rate, termYears] = match;
  return {
    balance: asNumber(balance),
    savings: asNumber(savings),
    rate: asNumber(rate),
    termYears: asNumber(termYears),
  };
}

function parseGoal(expression: string): ParsedState | null {
  const match = expression.match(/^save-for-goal-(\d+)-target-(\d+)-month-(\d+(?:\.\d+)?)-(\d+)-years$/);
  if (!match) return null;
  const [, targetAmount, monthlyContribution, annualRate, years] = match;
  return {
    targetAmount: asNumber(targetAmount),
    currentSavings: Math.round(asNumber(targetAmount) * 0.1),
    monthlyContribution: asNumber(monthlyContribution),
    annualRate: asNumber(annualRate),
    targetMonths: asNumber(years) * 12,
  };
}

function parseTdee(expression: string): ParsedState | null {
  const match = expression.match(/^tdee-calorie-(\d+)kg-(\d+)cm-(\d+)-(male|female)-(sedentary|light|moderate|active|very-active)$/);
  if (!match) return null;
  const [, weightKg, heightCm, age, sex, activity] = match;
  return {
    weightKg: asNumber(weightKg),
    heightCm: asNumber(heightCm),
    age: asNumber(age),
    sex,
    activity,
  };
}

function parseSubscription(expression: string): ParsedState | null {
  const match = expression.match(/^subscription-drain-(\d+)-monthly-(\d+(?:\.\d+)?)-return$/);
  if (!match) return null;
  const [, monthlySpend, investmentReturn] = match;
  return {
    monthlySpend: asNumber(monthlySpend),
    investmentReturn: asNumber(investmentReturn),
    hourlyWage: 35,
  };
}

function parseFreelance(expression: string): ParsedState | null {
  const match = expression.match(/^freelance-rate-(\d+)-target-(\d+)-expenses-(\d+)-tax-(\d+)-weeks$/);
  if (!match) return null;
  const [, desiredTakeHome, annualExpenses, taxRate, billableWeeks] = match;
  return {
    desiredTakeHome: asNumber(desiredTakeHome),
    annualExpenses: asNumber(annualExpenses),
    taxRate: asNumber(taxRate),
    billableWeeks: asNumber(billableWeeks),
    hoursPerDay: 6,
    unpaidHoursPerDay: 2,
  };
}

function parseLtvcac(expression: string): ParsedState | null {
  const match = expression.match(/^ltv-cac-(\d+)-arpu-(\d+)-margin-(\d+(?:\.\d+)?)-churn-(\d+(?:\.\d+)?)-cac$/);
  if (!match) return null;
  const [, arpu, grossMarginPct, churnRatePct, cacPerCustomer] = match;
  return {
    arpu: asNumber(arpu),
    grossMarginPct: asNumber(grossMarginPct),
    churnRatePct: asNumber(churnRatePct),
    cacPerCustomer: asNumber(cacPerCustomer),
    monthlyNewCustomers: 120,
    discountRatePct: 10,
  };
}

function parseCyber(expression: string): ParsedState | null {
  const match = expression.match(/^cyber-risk-exposure-(\d+)-revenue-(\d+)-employees-(\d+)-records-(low|medium|elevated|high|critical)-risk$/);
  if (!match) return null;
  const [, annualRevenue, employeeCount, customerRecords, risk] = match;
  return {
    annualRevenue: asNumber(annualRevenue),
    employeeCount: asNumber(employeeCount),
    customerRecords: asNumber(customerRecords),
    industryRisk: risk,
  };
}

function parseTcor(expression: string): ParsedState | null {
  const match = expression.match(/^total-cost-risk-(\d+)-premiums-(\d+)-losses-(\d+)-admin-(\d+)-control-(\d+)-revenue$/);
  if (!match) return null;
  const [, premiums, retainedLosses, adminCosts, riskControlCosts, revenue] = match;
  return {
    premiums: asNumber(premiums),
    retainedLosses: asNumber(retainedLosses),
    adminCosts: asNumber(adminCosts),
    riskControlCosts: asNumber(riskControlCosts),
    revenue: asNumber(revenue),
  };
}

const PARSERS: Record<string, (expression: string) => ParsedState | null> = {
  'mortgage-repayment': parseMortgage,
  'compound-interest': parseCompound,
  'loan-repayment': parseLoan,
  'retirement-savings': parseRetirement,
  'salary-take-home': parseSalary,
  'offset-mortgage': parseOffset,
  'save-for-goal': parseGoal,
  'tdee-calorie': parseTdee,
  'subscription-drain': parseSubscription,
  'freelance-rate': parseFreelance,
  'ltv-cac': parseLtvcac,
  'cyber-risk-exposure': parseCyber,
  'total-cost-risk': parseTcor,
};

function withTemplate(categorySlug: string): ProgrammaticTemplate | null {
  return PROGRAMMATIC_TEMPLATES[categorySlug] ?? null;
}

export function getProgrammaticCategory(categorySlug: string): ProgrammaticTemplate | null {
  return withTemplate(categorySlug);
}

export function parseProgrammaticExpression(categorySlug: string, expression: string): ParsedState | null {
  const parser = PARSERS[categorySlug];
  return parser ? parser(expression) : null;
}

function introParagraph(topic: string, query: string, expression: string): string {
  return pickVariant(expression, [
    `This page answers a very narrow query: ${query}. That is deliberate. Plain Figures is built for long-tail searches where the user wants the formula, the worked numbers, and the assumptions laid out without broker language, product nudges, or generic “what should I do?” filler.`,
    `Programmatic pages only work if they stay useful. For ${topic.toLowerCase()} queries like ${query}, the goal is not to publish a thin doorway page. The goal is to show the exact arithmetic, explain what each variable is doing, and let you change the inputs locally in the embedded calculator.`,
    `The long-tail phrase ${query} sounds specific because it is. People searching it usually want the answer fast: what the calculation is, which assumptions sit underneath it, and how sensitive the output is if one variable changes. That is the frame for this page.`,
  ]);
}

function methodologyParagraph(topic: string): string {
  return `Plain Figures keeps the ${topic.toLowerCase()} methodology formula-first. The copy below describes the mechanics, the calculator runs fully client-side, and the disclaimers stay explicit. Nothing here is personalised advice, a recommendation, or a product comparison. It is a transparent model for checking the numbers.`;
}

function formulaSection(topic: string, outcome: string): string[] {
  return [
    `The core question in ${topic.toLowerCase()} is always the same: how do a small number of variables translate into a single output such as ${outcome}? Once the inputs are defined cleanly, the arithmetic itself is straightforward. Most confusion comes from hidden assumptions, not from the formula.`,
    `That is why this page separates the inputs, the equation, and the interpretation. You can see the exact expression used, what each symbol means, and where the estimate stops being a neutral calculation and starts becoming a judgment call that belongs to you or to a professional adviser.`,
  ];
}

function assumptionsSection(topic: string, domain: 'finance' | 'ops' | 'health'): string[] {
  const tail =
    domain === 'health'
      ? 'Sleep, training volume, medication, body composition, and health conditions can move real calorie needs away from the estimate.'
      : domain === 'ops'
        ? 'Operational controls, vendor terms, policy wording, incident severity, and accounting treatment all change real-world results.'
        : 'Taxes, fees, behavioural changes, rate resets, employer policy, and legal structure all move the real-world answer.';

  return [
    `${topic} pages are most useful when assumptions are obvious. This model assumes the inputs remain stable over the period shown and that the formula is the correct abstraction for the question being asked. That makes it good for comparison, but not sufficient for a final decision.`,
    tail,
  ];
}

function buildTargets(): ProgrammaticCatalogTarget[] {
  const targets: ProgrammaticCatalogTarget[] = [];

  const mortgagePrincipals = [300000, 250000, 400000, 200000, 500000, 150000, 750000] as const;
  const mortgageRates = [4.5, 5, 4, 5.5, 3.5, 6] as const;
  const mortgageTerms = [25, 30, 20, 15, 35] as const;
  for (const principal of mortgagePrincipals) {
    for (const rate of mortgageRates) {
      for (const term of mortgageTerms) {
        targets.push({
          category: 'mortgage-repayment',
          expression: `mortgage-payment-${principal}-${rate}-${term}-years`,
          priority: catalogPriority(
            1200,
            scoreByPreference(principal, mortgagePrincipals),
            scoreByPreference(rate, mortgageRates),
            scoreByPreference(term, mortgageTerms)
          ),
          bucket: 'core',
        });
      }
    }
  }

  const compoundPrincipals = [10000, 25000, 50000, 100000, 5000, 250000] as const;
  const compoundRates = [5, 7, 6, 4, 8] as const;
  const compoundYears = [10, 15, 20, 30, 5] as const;
  const compoundFrequencies = ['monthly', 'quarterly', 'annual', 'daily'] as const;
  for (const principal of compoundPrincipals) {
    for (const rate of compoundRates) {
      for (const years of compoundYears) {
        for (const frequency of compoundFrequencies) {
          targets.push({
            category: 'compound-interest',
            expression: `compound-interest-${principal}-${rate}-${years}-compounded-${frequency}`,
            priority: catalogPriority(
              1160,
              scoreByPreference(principal, compoundPrincipals),
              scoreByPreference(rate, compoundRates),
              scoreByPreference(years, compoundYears),
              scoreByPreference(frequency, compoundFrequencies)
            ),
            bucket: 'core',
          });
        }
      }
    }
  }

  const loanAmounts = [10000, 15000, 25000, 5000, 50000, 75000] as const;
  const loanRates = [6.9, 8.9, 4.9, 12.9, 18.9] as const;
  const loanTerms = [36, 48, 60, 24, 72] as const;
  for (const amount of loanAmounts) {
    for (const rate of loanRates) {
      for (const months of loanTerms) {
        targets.push({
          category: 'loan-repayment',
          expression: `loan-repayment-${amount}-${rate}-${months}-months`,
          priority: catalogPriority(
            1120,
            scoreByPreference(amount, loanAmounts),
            scoreByPreference(rate, loanRates),
            scoreByPreference(months, loanTerms)
          ),
          bucket: 'core',
        });
      }
    }
  }

  const retirementMonthly = [500, 1000, 750, 1500, 250, 2000, 3000] as const;
  const retirementGrowth = [7, 8, 6, 5, 9] as const;
  const retirementYears = [20, 25, 30, 35, 40] as const;
  for (const monthly of retirementMonthly) {
    for (const growth of retirementGrowth) {
      for (const years of retirementYears) {
        targets.push({
          category: 'retirement-savings',
          expression: `retirement-savings-${monthly}-month-${growth}-${years}-years`,
          priority: catalogPriority(
            1100,
            scoreByPreference(monthly, retirementMonthly),
            scoreByPreference(growth, retirementGrowth),
            scoreByPreference(years, retirementYears)
          ),
          bucket: 'core',
        });
      }
    }
  }

  const salaryCountries = ['us', 'uk', 'de', 'au', 'fr', 'nl'] as const;
  const salaryGrosses = [50000, 75000, 100000, 60000, 120000, 150000, 200000, 30000, 250000, 400000] as const;
  for (const country of salaryCountries) {
    for (const gross of salaryGrosses) {
      targets.push({
        category: 'salary-take-home',
        expression: `salary-take-home-${country}-${gross}`,
        priority: catalogPriority(
          1080,
          scoreByPreference(country, salaryCountries),
          scoreByPreference(gross, salaryGrosses)
        ),
        bucket: 'core',
      });
    }
  }

  const offsetBalances = [250000, 350000, 500000, 150000, 750000] as const;
  const offsetSavings = [25000, 50000, 100000, 10000] as const;
  const offsetRates = [4.5, 5, 4, 3.5] as const;
  const offsetYears = [20, 25, 30, 15] as const;
  for (const balance of offsetBalances) {
    for (const savings of offsetSavings) {
      for (const rate of offsetRates) {
        for (const years of offsetYears) {
          targets.push({
            category: 'offset-mortgage',
            expression: `offset-mortgage-${balance}-balance-${savings}-savings-${rate}-${years}-years`,
            priority: catalogPriority(
              1060,
              scoreByPreference(balance, offsetBalances),
              scoreByPreference(savings, offsetSavings),
              scoreByPreference(rate, offsetRates),
              scoreByPreference(years, offsetYears)
            ),
            bucket: 'core',
          });
        }
      }
    }
  }

  const goalTargets = [25000, 50000, 100000, 200000, 10000] as const;
  const goalMonthly = [500, 750, 1000, 250, 1500] as const;
  const goalRates = [5, 4, 6, 3] as const;
  const goalYears = [3, 5, 7, 2] as const;
  for (const targetAmount of goalTargets) {
    for (const monthlyContribution of goalMonthly) {
      for (const annualRate of goalRates) {
        for (const years of goalYears) {
          targets.push({
            category: 'save-for-goal',
            expression: `save-for-goal-${targetAmount}-target-${monthlyContribution}-month-${annualRate}-${years}-years`,
            priority: catalogPriority(
              1040,
              scoreByPreference(targetAmount, goalTargets),
              scoreByPreference(monthlyContribution, goalMonthly),
              scoreByPreference(annualRate, goalRates),
              scoreByPreference(years, goalYears)
            ),
            bucket: 'core',
          });
        }
      }
    }
  }

  const tdeeWeights = [65, 75, 85] as const;
  const tdeeHeights = [170, 175, 180, 190] as const;
  const tdeeAges = [30, 40, 25] as const;
  const tdeeSexes = ['male', 'female'] as const;
  const tdeeActivity = ['moderate', 'active', 'light', 'sedentary'] as const;
  for (const weightKg of tdeeWeights) {
    for (const heightCm of tdeeHeights) {
      for (const age of tdeeAges) {
        for (const sex of tdeeSexes) {
          for (const activity of tdeeActivity) {
            targets.push({
              category: 'tdee-calorie',
              expression: `tdee-calorie-${weightKg}kg-${heightCm}cm-${age}-${sex}-${activity}`,
              priority: catalogPriority(
                700,
                scoreByPreference(weightKg, tdeeWeights),
                scoreByPreference(heightCm, tdeeHeights),
                scoreByPreference(age, tdeeAges),
                scoreByPreference(activity, tdeeActivity)
              ),
              bucket: 'support',
            });
          }
        }
      }
    }
  }

  const subscriptionSpend = [50, 100, 150, 200, 25, 300, 500, 750] as const;
  const subscriptionReturns = [5, 7, 0, 3, 9] as const;
  for (const monthlySpend of subscriptionSpend) {
    for (const investmentReturn of subscriptionReturns) {
      targets.push({
        category: 'subscription-drain',
        expression: `subscription-drain-${monthlySpend}-monthly-${investmentReturn}-return`,
        priority: catalogPriority(
          760,
          scoreByPreference(monthlySpend, subscriptionSpend),
          scoreByPreference(investmentReturn, subscriptionReturns)
        ),
        bucket: 'expansion',
      });
    }
  }

  const freelanceTakeHome = [60000, 80000, 100000, 40000, 150000] as const;
  const freelanceExpenses = [10000, 15000, 25000, 5000] as const;
  const freelanceTax = [30, 35, 40, 25] as const;
  const freelanceWeeks = [44, 46, 42, 40] as const;
  for (const desiredTakeHome of freelanceTakeHome) {
    for (const annualExpenses of freelanceExpenses) {
      for (const taxRate of freelanceTax) {
        for (const billableWeeks of freelanceWeeks) {
          targets.push({
            category: 'freelance-rate',
            expression: `freelance-rate-${desiredTakeHome}-target-${annualExpenses}-expenses-${taxRate}-tax-${billableWeeks}-weeks`,
            priority: catalogPriority(
              780,
              scoreByPreference(desiredTakeHome, freelanceTakeHome),
              scoreByPreference(annualExpenses, freelanceExpenses),
              scoreByPreference(taxRate, freelanceTax),
              scoreByPreference(billableWeeks, freelanceWeeks)
            ),
            bucket: 'expansion',
          });
        }
      }
    }
  }

  const ltvArpu = [99, 149, 249, 49] as const;
  const ltvMargins = [80, 70, 85, 60] as const;
  const ltvChurn = [2.5, 3.5, 1.5, 5] as const;
  const ltvCacs = [500, 850, 1250, 250] as const;
  for (const arpu of ltvArpu) {
    for (const margin of ltvMargins) {
      for (const churn of ltvChurn) {
        for (const cac of ltvCacs) {
          targets.push({
            category: 'ltv-cac',
            expression: `ltv-cac-${arpu}-arpu-${margin}-margin-${churn}-churn-${cac}-cac`,
            priority: catalogPriority(
              740,
              scoreByPreference(arpu, ltvArpu),
              scoreByPreference(margin, ltvMargins),
              scoreByPreference(churn, ltvChurn),
              scoreByPreference(cac, ltvCacs)
            ),
            bucket: 'support',
          });
        }
      }
    }
  }

  const cyberRevenue = [5000000, 10000000, 25000000, 1000000] as const;
  const cyberEmployees = [25, 50, 100, 10] as const;
  const cyberRecords = [10000, 50000, 100000, 1000] as const;
  const cyberRisk = ['medium', 'elevated', 'high', 'low'] as const;
  for (const revenue of cyberRevenue) {
    for (const employees of cyberEmployees) {
      for (const records of cyberRecords) {
        for (const risk of cyberRisk) {
          targets.push({
            category: 'cyber-risk-exposure',
            expression: `cyber-risk-exposure-${revenue}-revenue-${employees}-employees-${records}-records-${risk}-risk`,
            priority: catalogPriority(
              720,
              scoreByPreference(revenue, cyberRevenue),
              scoreByPreference(employees, cyberEmployees),
              scoreByPreference(records, cyberRecords),
              scoreByPreference(risk, cyberRisk)
            ),
            bucket: 'support',
          });
        }
      }
    }
  }

  const tcorPremiums = [250000, 450000, 750000, 100000] as const;
  const tcorLosses = [120000, 250000, 400000, 50000] as const;
  const tcorAdmin = [65000, 100000, 25000] as const;
  const tcorControl = [45000, 80000, 15000] as const;
  const tcorRevenue = [10000000, 25000000, 50000000, 5000000] as const;
  for (const premiums of tcorPremiums) {
    for (const losses of tcorLosses) {
      for (const admin of tcorAdmin) {
        for (const control of tcorControl) {
          for (const revenue of tcorRevenue) {
            targets.push({
              category: 'total-cost-risk',
              expression: `total-cost-risk-${premiums}-premiums-${losses}-losses-${admin}-admin-${control}-control-${revenue}-revenue`,
              priority: catalogPriority(
                680,
                scoreByPreference(premiums, tcorPremiums),
                scoreByPreference(losses, tcorLosses),
                scoreByPreference(admin, tcorAdmin),
                scoreByPreference(control, tcorControl),
                scoreByPreference(revenue, tcorRevenue)
              ),
              bucket: 'support',
            });
          }
        }
      }
    }
  }

  return uniqueCatalogTargets(targets).sort((left, right) => {
    if (right.priority !== left.priority) {
      return right.priority - left.priority;
    }

    if (left.category !== right.category) {
      return left.category.localeCompare(right.category);
    }

    return left.expression.localeCompare(right.expression);
  });
}

export const PROGRAMMATIC_TARGET_CATALOG = buildTargets();
export const PROGRAMMATIC_INDEX_CANDIDATES = uniqueTargets(
  PROGRAMMATIC_TARGET_CATALOG.slice(0, PROGRAMMATIC_SITEMAP_LIMIT).map(toStaticTarget)
);
export const PROGRAMMATIC_PRERENDER_TARGETS = PROGRAMMATIC_INDEX_CANDIDATES.slice(0, PROGRAMMATIC_PRERENDER_LIMIT);

export function getProgrammaticStaticParams(limit = PROGRAMMATIC_PRERENDER_LIMIT): ProgrammaticStaticTarget[] {
  return PROGRAMMATIC_PRERENDER_TARGETS.slice(0, limit);
}

export function getProgrammaticSitemapTargets(limit = PROGRAMMATIC_SITEMAP_LIMIT): ProgrammaticStaticTarget[] {
  return PROGRAMMATIC_INDEX_CANDIDATES.slice(0, limit);
}

export function getProgrammaticPath(category: string, expression: string): string {
  return buildPath(category, expression);
}

function createPageData(input: Omit<ProgrammaticPageData, 'path'>): ProgrammaticPageData {
  return {
    ...input,
    path: buildPath(input.categorySlug, input.expression),
  };
}

function buildFaqs(topic: string, custom: ProgrammaticFaq[]): ProgrammaticFaq[] {
  return custom.map((faq) => ({
    ...faq,
    answer: `${faq.answer} Plain Figures provides the formula and the maths only, not personalised ${topic.toLowerCase()} advice.`,
  }));
}

export function resolveProgrammaticPage(categorySlug: string, expression: string): ProgrammaticPageData | null {
  const category = withTemplate(categorySlug);
  const parsed = parseProgrammaticExpression(categorySlug, expression);

  if (!category || !parsed) {
    return null;
  }

  switch (categorySlug) {
    case 'mortgage-repayment': {
      const principal = parsed.principal as number;
      const rate = parsed.rate as number;
      const termYears = parsed.termYears as number;
      const result = calculateMortgage(principal, rate, termYears);
      const currency = category.defaultCurrency ?? 'usd';
      const downRate = Math.max(0.5, rate - 1);
      const upRate = rate + 1;
      const shorter = Math.max(10, termYears - 5);
      const downResult = calculateMortgage(principal, downRate, termYears);
      const upResult = calculateMortgage(principal, upRate, termYears);
      const shorterResult = calculateMortgage(principal, rate, shorter);
      const query = `${money(principal, currency)} at ${rate}% over ${termYears} years`;
      const heading = `Mortgage Repayment Calculator – ${query}`;

      return createPageData({
        category,
        categorySlug,
        expression,
        title: `${heading} | Plain Figures`,
        heading,
        description: `See the monthly payment, total interest, formula, and worked example for ${query}. Not financial advice; illustration only.`,
        deck: `Exact amortisation maths for a ${money(principal, currency)} mortgage at ${percentText(rate)} over ${termYears} years, with step-by-step explanation and scenario checks.`,
        formula: {
          label: 'Standard amortisation formula',
          expression: 'M = P × [r(1 + r)^n] / [(1 + r)^n − 1]',
          variables: [
            `M = monthly payment = ${money(result.monthlyPayment, currency)}`,
            `P = loan principal = ${money(principal, currency)}`,
            `r = monthly rate = ${formatNumber(rate / 1200, 5)}`,
            `n = total payments = ${termYears * 12}`,
          ],
          explanation: [
            ...formulaSection('Mortgage Repayment', 'the monthly payment'),
            `Because the payment is level, the interest share is front-loaded. On this example, the model estimates total interest of ${money(result.totalInterest, currency)} and total repayment of ${money(result.totalPayment, currency)}.`,
          ],
        },
        stats: [
          { label: 'Monthly payment', value: money(result.monthlyPayment, currency), tone: 'warning', sub: `${money(principal, currency)} principal` },
          { label: 'Total interest', value: money(result.totalInterest, currency), tone: 'negative', sub: `${percentText((result.totalInterest / principal) * 100)} of the loan` },
          { label: 'Total repaid', value: money(result.totalPayment, currency), tone: 'default', sub: `${termYears * 12} instalments` },
        ],
        steps: [
          `Convert the annual rate to a monthly rate: ${rate}% ÷ 12 = ${formatNumber(rate / 12, 3)}% per month.`,
          `Set the payment count to ${termYears} × 12 = ${termYears * 12} monthly payments.`,
          `Apply the amortisation formula to the ${money(principal, currency)} balance.`,
          `That produces an estimated monthly repayment of ${money(result.monthlyPayment, currency)} and total interest of ${money(result.totalInterest, currency)}.`,
        ],
        sections: [
          {
            heading: 'What this page calculates',
            paragraphs: [
              introParagraph('Mortgage Repayment', query, expression),
              methodologyParagraph('Mortgage Repayment'),
              `For a ${money(principal, currency)} balance at ${percentText(rate)} over ${termYears} years, the payment estimate lands at ${money(result.monthlyPayment, currency)} per month. That is the principal-and-interest portion only. It is useful for comparing rate and term combinations because the formula stays consistent even when product features do not.`,
            ],
          },
          {
            heading: 'Reading the result',
            paragraphs: [
              `The important number is not just the monthly payment. The second-order effect is the total interest bill. On this expression, interest adds ${money(result.totalInterest, currency)} on top of the original principal, which means the financing cost is material even if the monthly instalment still feels manageable.`,
              `Mortgage searches often focus on the monthly figure because that is what affordability conversations anchor on. The trade-off is that a longer term can suppress the monthly outflow while increasing lifetime interest by a very large absolute amount. This page keeps both numbers side by side so the trade-off is visible.`,
            ],
          },
          {
            heading: 'Assumptions and limits',
            paragraphs: assumptionsSection('Mortgage repayment', 'finance'),
          },
        ],
        scenarios: [
          { title: `If the rate falls to ${downRate}%`, body: `Monthly payment would move to about ${money(downResult.monthlyPayment, currency)}, or ${money(result.monthlyPayment - downResult.monthlyPayment, currency)} lower each month. Total interest would fall by roughly ${money(result.totalInterest - downResult.totalInterest, currency)}.` },
          { title: `If the rate rises to ${upRate}%`, body: `Monthly payment would increase to about ${money(upResult.monthlyPayment, currency)}. That is roughly ${money(upResult.monthlyPayment - result.monthlyPayment, currency)} more each month and about ${money(upResult.totalInterest - result.totalInterest, currency)} more interest over the full term.` },
          { title: `If the term shortens to ${shorter} years`, body: `The payment jumps to about ${money(shorterResult.monthlyPayment, currency)}, but lifetime interest drops by around ${money(result.totalInterest - shorterResult.totalInterest, currency)}. This is the classic payment-versus-total-cost trade-off.` },
        ],
        faqs: buildFaqs('financial', [
          { question: 'Does this mortgage payment include taxes, insurance, or fees?', answer: 'No. It shows the principal-and-interest schedule only. Property taxes, insurance, servicing fees, and closing costs sit outside the formula.' },
          { question: 'Why does interest dominate the early years?', answer: 'Because interest is charged on the highest outstanding balance at the start of the loan. As principal falls, the interest portion shrinks and the principal portion rises.' },
          { question: 'Can I use the same maths for a fixed and variable mortgage?', answer: 'Yes for a single-rate snapshot. If the rate changes later, you recalculate the remaining balance using the new rate and remaining term.' },
        ]),
        disclaimers: financeDisclaimers('mortgage repayment'),
        calculator: {
          kind: 'mortgage',
          displayCurrency: currency,
          initialValues: { principal, rate, termYears },
        },
      });
    }

    case 'compound-interest': {
      const principal = parsed.principal as number;
      const rate = parsed.rate as number;
      const years = parsed.years as number;
      const frequency = parsed.frequency as keyof typeof COMPOUND_FREQUENCIES;
      const compoundingFrequency = COMPOUND_FREQUENCIES[frequency];
      const currency = category.defaultCurrency ?? 'usd';
      const result = calculateCompound(principal, rate, years, compoundingFrequency);
      const monthlyResult = calculateCompound(principal, rate, years, 12);
      const lowerRate = Math.max(1, rate - 2);
      const lowerRateResult = calculateCompound(principal, lowerRate, years, compoundingFrequency);
      const longerTerm = years + 5;
      const longerTermResult = calculateCompound(principal, rate, longerTerm, compoundingFrequency);
      const query = `${money(principal, currency)} at ${rate}% for ${years} years compounded ${frequency}`;
      const heading = `Compound Interest Calculator – ${query}`;

      return createPageData({
        category,
        categorySlug,
        expression,
        title: `${heading} | Plain Figures`,
        heading,
        description: `Formula-first compound growth for ${query}, including effective annual rate, scenarios, FAQs, and a local interactive calculator.`,
        deck: `See how ${money(principal, currency)} compounds at ${percentText(rate)} for ${years} years with ${frequency} compounding, plus worked maths and scenario checks.`,
        formula: {
          label: 'Compound growth formula',
          expression: 'A = P × (1 + r / n)^(n × t)',
          variables: [
            `A = ending balance = ${money(result.finalAmount, currency)}`,
            `P = starting principal = ${money(principal, currency)}`,
            `r = annual nominal rate = ${percentText(rate)}`,
            `n = compounds per year = ${compoundingFrequency}`,
            `t = years invested = ${years}`,
          ],
          explanation: [
            ...formulaSection('Compound Interest', 'the ending balance'),
            `At ${frequency} compounding, the effective annual rate is ${percentText(result.effectiveRate, 3)}. That difference versus the headline nominal rate is why two savings products with the same nominal figure can still produce slightly different results.`,
          ],
        },
        stats: [
          { label: 'Final amount', value: money(result.finalAmount, currency), tone: 'positive', sub: `${yearText(years)} horizon` },
          { label: 'Interest earned', value: money(result.totalInterest, currency), tone: 'positive', sub: `${percentText((result.totalInterest / principal) * 100)} gain` },
          { label: 'Effective rate', value: percentText(result.effectiveRate, 3), tone: 'default', sub: `${titleCase(frequency)} compounding` },
        ],
        steps: [
          `Convert the nominal annual rate to a per-period rate: ${rate}% ÷ ${compoundingFrequency}.`,
          `Raise the growth factor to the total number of compounding periods: ${compoundingFrequency} × ${years}.`,
          `Multiply the starting balance of ${money(principal, currency)} by that growth factor.`,
          `The model ends at ${money(result.finalAmount, currency)}, with ${money(result.totalInterest, currency)} of compound growth.`,
        ],
        sections: [
          {
            heading: 'Why this long-tail query matters',
            paragraphs: [
              introParagraph('Compound Interest', query, expression),
              methodologyParagraph('Compound Interest'),
              `In this example the formula turns ${money(principal, currency)} into ${money(result.finalAmount, currency)} over ${yearText(years)}. That is not a forecast of a guaranteed product return. It is the clean mathematical answer to the rate, term, and compounding frequency supplied in the URL.`,
            ],
          },
          {
            heading: 'How to interpret the output',
            paragraphs: [
              `The ending balance is only one part of the story. The effective annual rate matters because compounding frequency changes the true yearly yield. Monthly or daily crediting nudges the result above annual crediting, even when the nominal rate is unchanged.`,
              `This is why compound-interest searches are high intent. The user is often comparing a savings account illustration, an investment projection, or a finance article claim and wants to know whether the mechanics are sound. A formula-first page is useful precisely because it keeps the moving parts visible.`,
            ],
          },
          {
            heading: 'Assumptions and limits',
            paragraphs: assumptionsSection('Compound interest', 'finance'),
          },
        ],
        scenarios: [
          { title: 'If the rate drops by 2 points', body: `At ${lowerRate}% instead of ${rate}%, the ending balance falls to about ${money(lowerRateResult.finalAmount, currency)}. That is roughly ${money(result.finalAmount - lowerRateResult.finalAmount, currency)} less by year ${years}.` },
          { title: 'If you keep the same rate for 5 extra years', body: `Extending the horizon to ${longerTerm} years pushes the balance to about ${money(longerTermResult.finalAmount, currency)}. Time usually dominates small differences in compounding frequency.` },
          { title: 'If you compare this with monthly compounding', body: `Monthly compounding on the same rate and term lands at about ${money(monthlyResult.finalAmount, currency)}. The gap versus ${frequency} compounding is usually smaller than the gap created by changing the rate or the time horizon.` },
        ],
        faqs: buildFaqs('financial', [
          { question: 'Is compound interest the same as AER or APY?', answer: 'Not exactly. AER and APY are annualised expressions of compounding, while the formula itself works from the nominal rate and compounding frequency supplied.' },
          { question: 'Why does time matter more than frequency?', answer: 'Because the exponent in the formula grows with time. Frequency changes the per-period mechanics, but long horizons give compounding more rounds to build on itself.' },
          { question: 'Does this include monthly contributions?', answer: 'No. This expression models a lump sum only. Savings goals and retirement projections use the annuity-style formula that adds recurring deposits.' },
        ]),
        disclaimers: financeDisclaimers('compound growth'),
        calculator: {
          kind: 'compound',
          displayCurrency: currency,
          initialValues: { principal, rate, years, frequency },
        },
      });
    }

    case 'loan-repayment': {
      const amount = parsed.amount as number;
      const rate = parsed.rate as number;
      const termMonths = parsed.termMonths as number;
      const currency = category.defaultCurrency ?? 'usd';
      const result = calculateLoan(amount, rate, termMonths);
      const shorterMonths = Math.max(12, termMonths - 12);
      const cheaperRate = Math.max(1, rate - 2);
      const shorterResult = calculateLoan(amount, rate, shorterMonths);
      const cheaperResult = calculateLoan(amount, cheaperRate, termMonths);
      const heading = `Loan Repayment Calculator – ${money(amount, currency)} at ${rate}% over ${termMonths} Months`;

      return createPageData({
        category,
        categorySlug,
        expression,
        title: `${heading} | Plain Figures`,
        heading,
        description: `Monthly payment, total repaid, and APR-style repayment maths for ${money(amount, currency)} at ${rate}% over ${termMonths} months.`,
        deck: `See the payment formula, total interest, and repayment trade-offs for a ${money(amount, currency)} loan at ${percentText(rate)} over ${monthText(termMonths)}.`,
        formula: {
          label: 'Level-payment loan formula',
          expression: 'PMT = L × [r(1 + r)^n] / [(1 + r)^n − 1]',
          variables: [
            `PMT = monthly payment = ${money(result.monthlyPayment, currency)}`,
            `L = loan amount = ${money(amount, currency)}`,
            `r = monthly rate = ${formatNumber(rate / 1200, 5)}`,
            `n = payment count = ${termMonths}`,
          ],
          explanation: [
            ...formulaSection('Loan Repayment', 'the instalment amount'),
            `For this expression, the model produces a monthly repayment of ${money(result.monthlyPayment, currency)} and an effective annualised rate of ${percentText(result.apr)}.`,
          ],
        },
        stats: [
          { label: 'Monthly payment', value: money(result.monthlyPayment, currency), tone: 'warning', sub: `${monthText(termMonths)} term` },
          { label: 'Total interest', value: money(result.totalInterest, currency), tone: 'negative', sub: `${percentText((result.totalInterest / amount) * 100)} of principal` },
          { label: 'Total repaid', value: money(result.totalPayment, currency), tone: 'default', sub: `APR-style annualised cost ${percentText(result.apr)}` },
        ],
        steps: [
          `Use the stated loan amount of ${money(amount, currency)} as the opening principal.`,
          `Convert ${rate}% APR-style pricing into a monthly periodic rate.`,
          `Spread the balance across ${termMonths} equal payments using the amortisation formula.`,
          `That yields ${money(result.monthlyPayment, currency)} per month and ${money(result.totalInterest, currency)} of total interest.`,
        ],
        sections: [
          {
            heading: 'What this repayment page is doing',
            paragraphs: [
              introParagraph('Loan Repayment', `${money(amount, currency)} at ${rate}% over ${termMonths} months`, expression),
              methodologyParagraph('Loan Repayment'),
              `The result is intentionally mechanical. It does not try to guess which lender is “best”, whether an extra fee is worth paying, or how your credit profile affects pricing. It simply answers the narrow arithmetic question implied by the expression.`,
            ],
          },
          {
            heading: 'Where the cost really sits',
            paragraphs: [
              `With shorter unsecured loans, the headline payment can look reasonable while the interest load stays hidden in the background. That is why this page shows both the monthly number and the full repayment total. On this example, the borrowing cost is ${money(result.totalInterest, currency)} beyond the amount originally borrowed.`,
              `Loan maths also makes term selection explicit. Stretching the term reduces monthly strain but lengthens the period during which interest accrues. Compressing the term does the reverse. That trade-off is often more important than small differences in advertised APR.`,
            ],
          },
          {
            heading: 'Assumptions and limits',
            paragraphs: assumptionsSection('Loan repayment', 'finance'),
          },
        ],
        scenarios: [
          { title: `Shorten the term to ${shorterMonths} months`, body: `The payment rises to roughly ${money(shorterResult.monthlyPayment, currency)}, but total interest falls by about ${money(result.totalInterest - shorterResult.totalInterest, currency)}.` },
          { title: `Reduce the rate to ${cheaperRate}%`, body: `Keeping the same term but lowering the rate drops the payment to roughly ${money(cheaperResult.monthlyPayment, currency)} and saves about ${money(result.totalInterest - cheaperResult.totalInterest, currency)} in interest.` },
          { title: 'Why APR still needs context', body: `The annualised rate of ${percentText(result.apr)} here comes purely from compounding. Real consumer credit comparisons also need fee timing, prepayment rules, and penalties, which this expression does not infer.` },
        ],
        faqs: buildFaqs('financial', [
          { question: 'Is this the same formula as a mortgage?', answer: 'Yes. A fixed-rate amortising loan uses the same core repayment formula. The differences in practice are security, term length, fees, and lender policy.' },
          { question: 'Why can a lower monthly payment still be expensive?', answer: 'Because a longer term keeps the principal outstanding for longer. Interest has more periods in which to accrue, so lifetime cost increases.' },
          { question: 'Does the model handle balloon payments?', answer: 'No. This expression assumes a standard fully amortising repayment loan with equal instalments.' },
        ]),
        disclaimers: financeDisclaimers('loan repayment'),
        calculator: {
          kind: 'loan',
          displayCurrency: currency,
          initialValues: { amount, rate, termMonths },
        },
      });
    }

    case 'retirement-savings': {
      const currentAge = parsed.currentAge as number;
      const retirementAge = parsed.retirementAge as number;
      const currentSavings = parsed.currentSavings as number;
      const monthlyContribution = parsed.monthlyContribution as number;
      const employerContribution = parsed.employerContribution as number;
      const growthRate = parsed.growthRate as number;
      const inflationRate = parsed.inflationRate as number;
      const currency = category.defaultCurrency ?? 'usd';
      const result = calculateRetirement(currentAge, retirementAge, currentSavings, monthlyContribution, employerContribution, growthRate, inflationRate);
      const richerContribution = calculateRetirement(currentAge, retirementAge, currentSavings, monthlyContribution + 200, employerContribution, growthRate, inflationRate);
      const richerReturn = calculateRetirement(currentAge, retirementAge, currentSavings, monthlyContribution, employerContribution, growthRate + 1, inflationRate);
      const years = retirementAge - currentAge;
      const heading = `Retirement Savings Calculator – ${money(monthlyContribution, currency)}/Month at ${growthRate}% for ${years} Years`;

      return createPageData({
        category,
        categorySlug,
        expression,
        title: `${heading} | Plain Figures`,
        heading,
        description: `Retirement projection for ${money(monthlyContribution, currency)} monthly savings, ${growthRate}% growth, and a ${years}-year horizon, with formula-first explanation.`,
        deck: `Inflation-adjusted retirement maths for ${money(monthlyContribution, currency)} monthly contributions, employer support, and ${percentText(growthRate)} annual growth over ${yearText(years)}.`,
        formula: {
          label: 'Future value of a funded retirement pot',
          expression: 'FV = PV(1 + r)^n + PMT × [((1 + r)^n − 1) / r]',
          variables: [
            `FV = projected pot = ${money(result.projectedPot, currency)}`,
            `PV = current savings = ${money(currentSavings, currency)}`,
            `PMT = total monthly contribution = ${money(monthlyContribution + employerContribution, currency)}`,
            `r = real monthly rate after inflation`,
            `n = ${years * 12} months to retirement`,
          ],
          explanation: [
            ...formulaSection('Retirement Savings', 'the projected pension pot'),
            `This page adjusts the growth rate for inflation before compounding. With ${money(monthlyContribution + employerContribution, currency)} going in each month, the model projects roughly ${money(result.projectedPot, currency)} in today's-money terms.`,
          ],
        },
        stats: [
          { label: 'Projected pot', value: money(result.projectedPot, currency), tone: 'positive', sub: `at age ${retirementAge}` },
          { label: 'Monthly income at 4%', value: money(result.monthlyIncomeFrom, currency), tone: 'warning', sub: 'simple withdrawal heuristic' },
          { label: 'Total growth', value: money(result.totalGrowth, currency), tone: 'positive', sub: `${money(result.totalContributions, currency)} contributed` },
        ],
        steps: [
          `Start with current savings of ${money(currentSavings, currency)} at age ${currentAge}.`,
          `Add monthly contributions of ${money(monthlyContribution, currency)} plus ${money(employerContribution, currency)} from the employer.`,
          `Convert the nominal return and inflation assumptions into a real monthly growth rate.`,
          `Project the balance forward ${years} years to a pot of about ${money(result.projectedPot, currency)}.`,
        ],
        sections: [
          {
            heading: 'Why retirement pages need explicit assumptions',
            paragraphs: [
              introParagraph('Retirement Savings', `${money(monthlyContribution, currency)}/month at ${growthRate}% for ${years} years`, expression),
              methodologyParagraph('Retirement Savings'),
              `The expression behind this page is intentionally modest: keep the contributions, growth, inflation, and starting balance explicit. A retirement projection becomes misleading when any of those variables are hidden or folded into a vague “recommended target” message.`,
            ],
          },
          {
            heading: 'How to read the projection',
            paragraphs: [
              `This projection lands at about ${money(result.projectedPot, currency)} in inflation-adjusted terms, with a simple 4% withdrawal heuristic of ${money(result.monthlyIncomeFrom, currency)} per month. Neither number is a promise. They are a disciplined way to translate savings behaviour into a planning range.`,
              `The value of a projection page is not certainty. It is sensitivity. A small change in monthly contribution or expected return can move the end pot by six figures over long horizons, which is exactly why long-tail retirement searches exist: the user is checking the scale of the effect, not looking for generic lifestyle copy.`,
            ],
          },
          {
            heading: 'Assumptions and limits',
            paragraphs: assumptionsSection('Retirement savings', 'finance'),
          },
        ],
        scenarios: [
          { title: 'Add another $200 per month', body: `Increasing the personal contribution to ${money(monthlyContribution + 200, currency)} lifts the projected pot to about ${money(richerContribution.projectedPot, currency)}, roughly ${money(richerContribution.projectedPot - result.projectedPot, currency)} higher.` },
          { title: 'Earn 1 point more annual growth', body: `At ${growthRate + 1}% instead of ${growthRate}%, the projected pot grows to about ${money(richerReturn.projectedPot, currency)}. Long horizons make modest return changes look large in absolute dollars.` },
          { title: 'Why inflation is separated', body: 'This model treats inflation separately so the output stays in today\'s money. That keeps the interpretation cleaner than showing a large nominal figure with no explanation of future purchasing power.' },
        ],
        faqs: buildFaqs('financial', [
          { question: 'Why include employer contributions?', answer: 'Because they are part of the cash flow funding the pot. Ignoring them would understate the future value of total retirement saving.' },
          { question: 'Is the 4% rule guaranteed?', answer: 'No. It is a rough heuristic based on historical research, not a promise about any future market path or retirement length.' },
          { question: 'Why are results shown in today’s money?', answer: 'Because inflation-adjusted figures are easier to interpret. They answer what the future pot may be worth in current purchasing-power terms.' },
        ]),
        disclaimers: financeDisclaimers('retirement savings'),
        calculator: {
          kind: 'retirement',
          displayCurrency: currency,
          initialValues: { currentAge, retirementAge, currentSavings, monthlyContribution, employerContribution, growthRate, inflationRate },
        },
      });
    }

    case 'salary-take-home': {
      const country = parsed.country as CountryCode;
      const gross = parsed.gross as number;
      const countryConfig = COUNTRY_CONFIG[country];
      const currency = COUNTRY_TO_CURRENCY[country];
      const result = calculateTakeHome(gross, country);
      const higherGross = Math.round(gross * 1.1);
      const lowerGross = Math.round(gross * 0.9);
      const higher = calculateTakeHome(higherGross, country);
      const lower = calculateTakeHome(lowerGross, country);
      const heading = `Salary Take-Home Calculator – ${countryConfig.symbol}${gross.toLocaleString('en-US')} in ${countryConfig.name}`;

      return createPageData({
        category,
        categorySlug,
        expression,
        title: `${heading} | Plain Figures`,
        heading,
        description: `Formula-first salary take-home estimate for ${countryConfig.name}: gross ${countryConfig.symbol}${gross.toLocaleString('en-US')} with tax-band explanation and a local interactive calculator.`,
        deck: `See estimated net annual pay, monthly pay, and effective tax rate for ${countryConfig.symbol}${gross.toLocaleString('en-US')} in ${countryConfig.name}.`,
        formula: {
          label: 'Band-based payroll estimate',
          expression: 'Net pay = Gross pay − income tax − social contributions ± credits',
          variables: [
            `Gross salary = ${countryConfig.symbol}${gross.toLocaleString('en-US')}`,
            `Estimated net annual pay = ${money(result.netAnnual, currency)}`,
            `Estimated net monthly pay = ${money(result.netMonthly, currency)}`,
            `Effective tax rate = ${percentText(result.effectiveTaxRate)}`,
          ],
          explanation: [
            ...formulaSection('Salary Take-Home', 'net pay'),
            `Unlike a closed-form compound-interest equation, take-home pay is banded. The logic still stays formula-first: each tax band and payroll deduction applies in order, and the calculator shows the result without pretending to replace payroll software.`,
          ],
        },
        stats: [
          { label: 'Net annual pay', value: money(result.netAnnual, currency), tone: 'positive', sub: `${countryConfig.name}` },
          { label: 'Net monthly pay', value: money(result.netMonthly, currency), tone: 'positive', sub: `${countryConfig.symbol}${gross.toLocaleString('en-US')} gross` },
          { label: 'Effective tax rate', value: percentText(result.effectiveTaxRate), tone: result.effectiveTaxRate > 35 ? 'warning' : 'default', sub: money(result.grossAnnual - result.netAnnual, currency) + ' deductions' },
        ],
        steps: [
          `Start with gross annual salary of ${countryConfig.symbol}${gross.toLocaleString('en-US')}.`,
          `Apply the country-specific tax and payroll bands in sequence.`,
          `Subtract estimated social contributions and add any simplified credits included in the model.`,
          `The result is about ${money(result.netAnnual, currency)} per year, or ${money(result.netMonthly, currency)} per month.`,
        ],
        sections: [
          {
            heading: 'Why a formula-first take-home page is useful',
            paragraphs: [
              introParagraph('Salary Take-Home', `${countryConfig.symbol}${gross.toLocaleString('en-US')} in ${countryConfig.name}`, expression),
              methodologyParagraph('Salary Take-Home'),
              `Country-specific take-home searches are high intent because the user usually wants a quick payroll estimate before an interview, offer negotiation, relocation, or contract comparison. A clear band-based calculation is more useful than generic commentary about salary “benchmarks”.`,
            ],
          },
          {
            heading: 'What the estimate means',
            paragraphs: [
              `For this page, the calculator estimates about ${money(result.netMonthly, currency)} per month after tax and payroll deductions. The effective tax rate comes out at ${percentText(result.effectiveTaxRate)}, which is more informative than a single marginal-band headline because it captures the whole pay packet.`,
              `The limitation is also important: take-home pay is rarely a single universal formula. Pension deductions, local surcharges, family status, student loans, and employer benefits can all move the answer. That is why the page stays explicit that it is an estimate rather than a payroll guarantee.`,
            ],
          },
          {
            heading: 'Assumptions and limits',
            paragraphs: assumptionsSection('Salary take-home', 'finance'),
          },
        ],
        scenarios: [
          { title: 'If gross salary rises by 10%', body: `At ${countryConfig.symbol}${higherGross.toLocaleString('en-US')}, estimated net monthly pay becomes about ${money(higher.netMonthly, currency)}. The change in net pay is smaller than the gross increase because higher portions of income can sit in higher bands.` },
          { title: 'If gross salary falls by 10%', body: `At ${countryConfig.symbol}${lowerGross.toLocaleString('en-US')}, estimated net monthly pay drops to about ${money(lower.netMonthly, currency)}. The difference illustrates how progressive bands soften and then accelerate changes in take-home pay.` },
          { title: 'Why effective tax rate matters', body: `The effective rate of ${percentText(result.effectiveTaxRate)} gives a faster reality check than quoting a single top band. It answers the practical question most users actually ask: how much of gross pay do I keep?` },
        ],
        faqs: buildFaqs('financial', [
          { question: 'Does this calculator include pension or retirement deductions?', answer: 'Only where the simplified country model explicitly includes them. Optional salary sacrifice, pension top-ups, and employer-specific payroll items are usually outside scope.' },
          { question: 'Why can two people on the same salary take home different amounts?', answer: 'Because filing status, region, tax class, payroll cycle, benefits, and deductions can differ even when gross pay matches.' },
          { question: 'Is the monthly number exact payroll?', answer: 'No. It is an estimate from published band logic, useful for comparison but not a substitute for payslip or payroll software validation.' },
        ]),
        disclaimers: financeDisclaimers('salary take-home'),
        calculator: {
          kind: 'salary',
          displayCurrency: currency,
          initialValues: { country, gross },
        },
      });
    }

    case 'offset-mortgage': {
      const balance = parsed.balance as number;
      const savings = parsed.savings as number;
      const rate = parsed.rate as number;
      const termYears = parsed.termYears as number;
      const currency = category.defaultCurrency ?? 'usd';
      const result = calculateOffset(balance, savings, rate, termYears);
      const doubledSavings = calculateOffset(balance, savings * 2, rate, termYears);
      const higherRate = calculateOffset(balance, savings, rate + 1, termYears);
      const heading = `Offset Mortgage Calculator – ${money(balance, currency)} Balance with ${money(savings, currency)} Savings`;

      return createPageData({
        category,
        categorySlug,
        expression,
        title: `${heading} | Plain Figures`,
        heading,
        description: `Offset mortgage maths for a ${money(balance, currency)} balance, ${money(savings, currency)} offset pot, and ${rate}% rate, including interest saved and term reduction.`,
        deck: `See how ${money(savings, currency)} of offset savings changes the effective mortgage balance, total interest, and payoff timing.`,
        formula: {
          label: 'Offset balance logic',
          expression: 'Interest each month = (Mortgage balance − Offset savings) × monthly rate',
          variables: [
            `Mortgage balance = ${money(balance, currency)}`,
            `Offset savings = ${money(savings, currency)}`,
            `Effective balance = ${money(result.effectiveBalance, currency)}`,
            `Estimated interest saved = ${money(result.interestSavedTotal, currency)}`,
          ],
          explanation: [
            ...formulaSection('Offset Mortgage', 'interest charged'),
            `This page keeps the repayment amount constant and reduces the balance on which interest is charged. That produces an estimated saving of ${money(result.interestSavedTotal, currency)} and a term reduction of ${monthText(result.termReductionMonths)}.`,
          ],
        },
        stats: [
          { label: 'Effective balance', value: money(result.effectiveBalance, currency), tone: 'default', sub: `${money(savings, currency)} offset` },
          { label: 'Interest saved', value: money(result.interestSavedTotal, currency), tone: 'positive', sub: `${yearText(termYears)} horizon` },
          { label: 'Term reduction', value: monthText(result.termReductionMonths), tone: 'positive', sub: money(result.standardMonthlyPayment, currency) + ' standard payment' },
        ],
        steps: [
          `Start with a mortgage balance of ${money(balance, currency)} and offset savings of ${money(savings, currency)}.`,
          `Reduce the balance exposed to interest each month by the savings held in the offset account.`,
          `Keep the repayment schedule anchored to the original mortgage payment.`,
          `That produces an effective balance of ${money(result.effectiveBalance, currency)} and estimated interest savings of ${money(result.interestSavedTotal, currency)}.`,
        ],
        sections: [
          {
            heading: 'What the offset calculation is doing',
            paragraphs: [
              introParagraph('Offset Mortgage', `${money(balance, currency)} balance with ${money(savings, currency)} savings`, expression),
              methodologyParagraph('Offset Mortgage'),
              `Offset mortgages are often described in marketing terms that blur the underlying arithmetic. The useful question is simpler: if the lender charges interest on a lower effective balance while keeping the mortgage payment fixed, how much interest disappears and how much sooner does the loan end?`,
            ],
          },
          {
            heading: 'Reading the savings correctly',
            paragraphs: [
              `This example estimates ${money(result.interestSavedTotal, currency)} of lifetime interest saved. That is meaningful because offset savings work like a tax-efficient return equal to the mortgage rate, but only inside the assumptions of the product. If the savings balance changes materially, the benefit changes too.`,
              `The second output is payoff speed. A term reduction of ${monthText(result.termReductionMonths)} matters because it converts an abstract interest saving into time. Users often find the “years earlier” framing more tangible than the total interest number alone.`,
            ],
          },
          {
            heading: 'Assumptions and limits',
            paragraphs: assumptionsSection('Offset mortgage', 'finance'),
          },
        ],
        scenarios: [
          { title: 'If savings doubled', body: `Doubling the offset pot to ${money(savings * 2, currency)} increases the estimated interest saving to about ${money(doubledSavings.interestSavedTotal, currency)} and shortens the term by roughly ${monthText(doubledSavings.termReductionMonths)}.` },
          { title: 'If the mortgage rate rises by 1 point', body: `At ${rate + 1}%, the offset effect becomes more valuable. Estimated savings rise to about ${money(higherRate.interestSavedTotal, currency)} because each dollar of offset avoids more interest.` },
          { title: 'Offset versus cashflow choice', body: 'Offset structures do not “earn” interest in the usual savings-account sense. The economic benefit comes from reducing mortgage interest, which is why the formula is best read as avoided cost rather than investment return.' },
        ],
        faqs: buildFaqs('financial', [
          { question: 'Is an offset always better than using the cash to overpay?', answer: 'Not automatically. Offset keeps the cash liquid while reducing interest, whereas overpayment locks money into the mortgage balance. The arithmetic and liquidity trade-off both matter.' },
          { question: 'Why keep the standard mortgage payment fixed?', answer: 'That mirrors the common structure where the lender charges less interest but keeps the scheduled payment unchanged, causing the loan to amortise faster.' },
          { question: 'Does this include taxes on savings interest?', answer: 'No. This page focuses on avoided mortgage interest, not tax treatment of alternative savings products.' },
        ]),
        disclaimers: financeDisclaimers('offset mortgage'),
        calculator: {
          kind: 'offset',
          displayCurrency: currency,
          initialValues: { balance, savings, rate, termYears },
        },
      });
    }

    case 'save-for-goal': {
      const targetAmount = parsed.targetAmount as number;
      const currentSavings = parsed.currentSavings as number;
      const monthlyContribution = parsed.monthlyContribution as number;
      const annualRate = parsed.annualRate as number;
      const targetMonths = parsed.targetMonths as number;
      const currency = category.defaultCurrency ?? 'usd';
      const result = calculateSaveGoal(targetAmount, currentSavings, monthlyContribution, annualRate, targetMonths);
      const fasterContribution = calculateSaveGoal(targetAmount, currentSavings, monthlyContribution + 200, annualRate, targetMonths);
      const lowerRateResult = calculateSaveGoal(targetAmount, currentSavings, monthlyContribution, Math.max(0, annualRate - 2), targetMonths);
      const heading = `Save for a Goal Calculator – ${money(targetAmount, currency)} Target with ${money(monthlyContribution, currency)}/Month`;

      return createPageData({
        category,
        categorySlug,
        expression,
        title: `${heading} | Plain Figures`,
        heading,
        description: `Goal-savings maths for a ${money(targetAmount, currency)} target, ${money(monthlyContribution, currency)} monthly contribution, and ${annualRate}% return assumption.`,
        deck: `Calculate time to target, projected balance by deadline, and the monthly saving required to hit ${money(targetAmount, currency)}.`,
        formula: {
          label: 'Future value of a savings stream',
          expression: 'FV = PV(1 + r)^n + PMT × [((1 + r)^n − 1) / r]',
          variables: [
            `FV = projected balance = ${money(result.projectedBalance, currency)}`,
            `PV = current savings = ${money(currentSavings, currency)}`,
            `PMT = monthly saving = ${money(monthlyContribution, currency)}`,
            `n = target months = ${targetMonths}`,
          ],
          explanation: [
            ...formulaSection('Save for a Goal', 'the balance by a deadline'),
            `For this page, the question is dual: how long the current savings rate takes, and what monthly contribution would hit the target by the chosen deadline. The model therefore shows both the natural time to goal and the required monthly saving.`,
          ],
        },
        stats: [
          { label: 'Projected by deadline', value: money(result.projectedBalance, currency), tone: result.projectedBalance >= targetAmount ? 'positive' : 'warning', sub: `${yearText(targetMonths / 12)} horizon` },
          { label: 'Monthly required', value: money(result.requiredMonthly, currency), tone: 'warning', sub: `to hit ${money(targetAmount, currency)}` },
          { label: 'Time at current pace', value: monthText(result.monthsNeeded), tone: 'default', sub: `${money(monthlyContribution, currency)} per month` },
        ],
        steps: [
          `Set the target at ${money(targetAmount, currency)} with current savings of ${money(currentSavings, currency)}.`,
          `Assume ${money(monthlyContribution, currency)} is added every month and the balance earns ${annualRate}% per year.`,
          `Project the balance over ${targetMonths} months and compare it with the target.`,
          `The model estimates ${money(result.projectedBalance, currency)} by the deadline and a required monthly saving of ${money(result.requiredMonthly, currency)}.`,
        ],
        sections: [
          {
            heading: 'Why goal pages work well programmatically',
            paragraphs: [
              introParagraph('Save for a Goal', `${money(targetAmount, currency)} target with ${money(monthlyContribution, currency)}/month`, expression),
              methodologyParagraph('Save for a Goal'),
              `A long-tail goal query is usually not philosophical. It is a gap-analysis question: if I want a specific figure by a specific date, am I on track? That is why the cleanest page structure is target, contribution, rate assumption, time, and the implied shortfall or surplus.`,
            ],
          },
          {
            heading: 'What to look at first',
            paragraphs: [
              `The most practical output here is the monthly required figure. If ${money(result.requiredMonthly, currency)} is materially above the current ${money(monthlyContribution, currency)}, the target-date assumption needs to move. If it is below the current saving rate, the plan has slack.`,
              `The natural time-to-goal estimate is also valuable because it shows what the existing behaviour achieves without forcing the deadline. That helps users distinguish between a savings problem and a timing problem.`,
            ],
          },
          {
            heading: 'Assumptions and limits',
            paragraphs: assumptionsSection('Goal savings', 'finance'),
          },
        ],
        scenarios: [
          { title: 'Add another $200 per month', body: `Increasing monthly saving to ${money(monthlyContribution + 200, currency)} pushes the projected balance to about ${money(fasterContribution.projectedBalance, currency)} by the same deadline.` },
          { title: 'Use a lower return assumption', body: `At ${Math.max(0, annualRate - 2)}% rather than ${annualRate}%, the projected balance falls to about ${money(lowerRateResult.projectedBalance, currency)}. Conservative assumptions are usually more useful than optimistic ones.` },
          { title: 'Why the required monthly figure matters', body: 'The required monthly figure turns the abstract target into a budget input. It is often the fastest way to test whether the target, the timeline, or the rate assumption is the variable that needs to move.' },
        ],
        faqs: buildFaqs('financial', [
          { question: 'Does this assume deposits happen at the start or end of the month?', answer: 'It uses a simple end-of-period contribution assumption. The difference is usually small for planning purposes.' },
          { question: 'Why show both projected balance and required monthly saving?', answer: 'Because they answer different questions: what your current behaviour achieves, and what behaviour would be needed to hit the deadline.' },
          { question: 'Can I use this for an emergency fund or house deposit?', answer: 'Yes. The maths is the same whenever the target is a future cash amount rather than a recommendation for a financial product.' },
        ]),
        disclaimers: financeDisclaimers('goal savings'),
        calculator: {
          kind: 'goal',
          displayCurrency: currency,
          initialValues: { targetAmount, currentSavings, monthlyContribution, annualRate, targetMonths },
        },
      });
    }

    case 'tdee-calorie': {
      const weightKg = parsed.weightKg as number;
      const heightCm = parsed.heightCm as number;
      const age = parsed.age as number;
      const sex = parsed.sex as 'male' | 'female';
      const activity = parsed.activity as keyof typeof ACTIVITY_LEVELS;
      const result = calculateTDEE(weightKg, heightCm, age, sex, ACTIVITY_LEVELS[activity]);
      const moreActive = calculateTDEE(weightKg, heightCm, age, sex, Math.min(1.9, ACTIVITY_LEVELS[activity] + 0.175));
      const lighter = calculateTDEE(Math.max(40, weightKg - 5), heightCm, age, sex, ACTIVITY_LEVELS[activity]);
      const heading = `TDEE & Calorie Calculator – ${weightKg}kg, ${heightCm}cm, Age ${age}, ${titleCase(sex)}`;

      return createPageData({
        category,
        categorySlug,
        expression,
        title: `${heading} | Plain Figures`,
        heading,
        description: `Mifflin-St Jeor TDEE estimate for ${weightKg}kg, ${heightCm}cm, age ${age}, ${sex}, and ${ACTIVITY_LABELS[activity]}, with formula breakdown and FAQs.`,
        deck: `Formula-first calorie estimate for ${weightKg}kg, ${heightCm}cm, age ${age}, ${sex}, and ${ACTIVITY_LABELS[activity]}.`,
        formula: {
          label: 'Mifflin-St Jeor TDEE estimate',
          expression: 'TDEE = BMR × activity multiplier',
          variables: [
            `BMR = ${result.bmr.toLocaleString('en-US')} kcal/day`,
            `TDEE = ${result.tdee.toLocaleString('en-US')} kcal/day`,
            `Activity multiplier = ${formatNumber(ACTIVITY_LEVELS[activity], 3)}`,
            `BMI = ${formatNumber(result.bmi, 1)} (${result.bmiCategory})`,
          ],
          explanation: [
            ...formulaSection('TDEE & Calorie', 'daily maintenance calories'),
            `The base metabolic rate comes from the Mifflin-St Jeor equation, then activity scales it to a full-day expenditure estimate. For this profile, maintenance lands around ${result.tdee.toLocaleString('en-US')} kcal/day.`,
          ],
        },
        stats: [
          { label: 'TDEE', value: `${result.tdee.toLocaleString('en-US')} kcal`, tone: 'default', sub: ACTIVITY_LABELS[activity] },
          { label: 'Weight-loss target', value: `${result.weightLoss.toLocaleString('en-US')} kcal`, tone: 'positive', sub: 'simple 500 kcal deficit' },
          { label: 'BMR', value: `${result.bmr.toLocaleString('en-US')} kcal`, tone: 'default', sub: `BMI ${formatNumber(result.bmi, 1)}` },
        ],
        steps: [
          `Estimate BMR from weight, height, age, and sex using Mifflin-St Jeor.`,
          `Apply the ${ACTIVITY_LABELS[activity]} multiplier of ${formatNumber(ACTIVITY_LEVELS[activity], 3)}.`,
          `That yields maintenance energy of about ${result.tdee.toLocaleString('en-US')} kcal/day.`,
          `The page then shows simple deficit and surplus variants for comparison.`,
        ],
        sections: [
          {
            heading: 'What this calorie page is doing',
            paragraphs: [
              introParagraph('TDEE & Calorie', `${weightKg}kg ${sex} age ${age} ${ACTIVITY_LABELS[activity]}`, expression),
              methodologyParagraph('TDEE & Calorie'),
              `Unlike the finance pages, the output here is not money but energy. The same principle applies, though: show the formula, state the multiplier, expose the assumptions, and avoid pretending an estimate is a diagnosis.`,
            ],
          },
          {
            heading: 'How to read the estimate',
            paragraphs: [
              `A TDEE number is best treated as a starting point. This page estimates maintenance at ${result.tdee.toLocaleString('en-US')} kcal/day, but day-to-day expenditure moves with steps, training, sleep, stress, and non-exercise activity.`,
              `The value of the formula-first view is that it explains why the estimate changes. Weight, height, age, sex, and activity are the visible levers. If the result looks off, those are the first places to check before making any practical decisions.`,
            ],
          },
          {
            heading: 'Assumptions and limits',
            paragraphs: assumptionsSection('TDEE estimate', 'health'),
          },
        ],
        scenarios: [
          { title: 'If activity increases one notch', body: `A higher activity multiplier pushes the estimate to roughly ${moreActive.tdee.toLocaleString('en-US')} kcal/day. Activity assumptions can change the result more than small body-size changes.` },
          { title: 'If body weight is 5kg lower', body: `At ${Math.max(40, weightKg - 5)}kg with all else unchanged, TDEE falls to about ${lighter.tdee.toLocaleString('en-US')} kcal/day.` },
          { title: 'Why maintenance is not a guarantee', body: 'TDEE models produce averages, not exact daily requirements. They are useful for setting a starting intake and then adjusting based on actual trend data.' },
        ],
        faqs: [
          { question: 'Is TDEE the same as BMR?', answer: 'No. BMR estimates energy at complete rest, while TDEE adds activity on top of BMR.' },
          { question: 'Why does the calculator show weight-loss and weight-gain calories?', answer: 'They are simple directional targets built from the maintenance estimate so users can see the relative size of a common deficit or surplus.' },
          { question: 'Can this replace medical or diet advice?', answer: 'No. It is a general estimate only and should not replace medical, nutritional, or personal health guidance.' },
        ],
        disclaimers: healthDisclaimers(),
        calculator: {
          kind: 'tdee',
          initialValues: { weightKg, heightCm, age, sex, activity },
        },
      });
    }

    case 'subscription-drain': {
      const monthlySpend = parsed.monthlySpend as number;
      const investmentReturn = parsed.investmentReturn as number;
      const hourlyWage = parsed.hourlyWage as number;
      const currency = category.defaultCurrency ?? 'usd';
      const result = calculateSubscriptionDrain([{ name: 'Subscription stack', monthly: monthlySpend, enabled: true }], hourlyWage, investmentReturn);
      const higherSpend = calculateSubscriptionDrain([{ name: 'Subscription stack', monthly: monthlySpend + 50, enabled: true }], hourlyWage, investmentReturn);
      const noReturn = calculateSubscriptionDrain([{ name: 'Subscription stack', monthly: monthlySpend, enabled: true }], hourlyWage, 0);
      const heading = `Subscription Drain Calculator – ${money(monthlySpend, currency)}/Month at ${investmentReturn}% Opportunity Cost`;

      return createPageData({
        category,
        categorySlug,
        expression,
        title: `${heading} | Plain Figures`,
        heading,
        description: `See the annual, 10-year, and opportunity-cost view of ${money(monthlySpend, currency)} per month in subscriptions at a ${investmentReturn}% return assumption.`,
        deck: `Formula-first view of recurring subscription spend, long-run cost, and invest-instead opportunity cost.`,
        formula: {
          label: 'Recurring-spend opportunity-cost formula',
          expression: 'FV = PMT × [((1 + r)^n − 1) / r]',
          variables: [
            `PMT = monthly spend = ${money(monthlySpend, currency)}`,
            `r = monthly investment return`,
            `n = 120 months for the 10-year view`,
            `Invest-instead value = ${money(result.withInvestment10Year, currency)}`,
          ],
          explanation: [
            ...formulaSection('Subscription Drain', 'the long-run cost of recurring spend'),
            `At ${money(monthlySpend, currency)} per month, the direct 10-year cash outflow is ${money(result.total10Year, currency)}. If the same amount compounded instead at ${investmentReturn}%, the future-value comparison reaches ${money(result.withInvestment10Year, currency)}.`,
          ],
        },
        stats: [
          { label: 'Annual cost', value: money(result.totalAnnual, currency), tone: 'negative', sub: `${money(monthlySpend, currency)} monthly` },
          { label: '10-year cash cost', value: money(result.total10Year, currency), tone: 'negative', sub: 'without any return assumption' },
          { label: 'Invest-instead value', value: money(result.withInvestment10Year, currency), tone: 'warning', sub: `${investmentReturn}% annual return` },
        ],
        steps: [
          `Convert ${money(monthlySpend, currency)} per month into an annual outflow of ${money(result.totalAnnual, currency)}.`,
          `Multiply that recurring spend over 10 years for the cash-cost view.`,
          `Then treat the same monthly amount as a contribution stream invested at ${investmentReturn}% per year.`,
          `That produces a future-value comparison of about ${money(result.withInvestment10Year, currency)}.`,
        ],
        sections: [
          {
            heading: 'Why subscription pages rank',
            paragraphs: [
              introParagraph('Subscription Drain', `${money(monthlySpend, currency)} per month at ${investmentReturn}%`, expression),
              methodologyParagraph('Subscription Drain'),
              `Users searching this kind of query usually do not need a lecture about budgeting. They want to translate a small recurring outflow into a multi-year number they can feel. That is why the formula-first framing works especially well for recurring-cost searches.`,
            ],
          },
          {
            heading: 'What the comparison is really showing',
            paragraphs: [
              `The direct 10-year cash cost is ${money(result.total10Year, currency)}, but the more revealing figure is the invest-instead view of ${money(result.withInvestment10Year, currency)}. That is not saying a subscription is “bad”. It is simply making the opportunity cost visible in a comparable unit.`,
              `This kind of page also helps with prioritisation. A small monthly amount often feels harmless because it is frictionless. When the same amount is annualised and then compounded, the real economic footprint becomes easier to compare against a savings goal or investment plan.`,
            ],
          },
          {
            heading: 'Assumptions and limits',
            paragraphs: assumptionsSection('Subscription drain', 'finance'),
          },
        ],
        scenarios: [
          { title: 'If spend rises by $50 per month', body: `The 10-year cash cost climbs to about ${money(higherSpend.total10Year, currency)}. Small increases in recurring spend compound into large absolute numbers over time.` },
          { title: 'If you assume 0% return', body: `With no investment return, the opportunity-cost comparison collapses back to the direct outflow logic. The 10-year total remains ${money(noReturn.total10Year, currency)}.` },
          { title: 'Why this page stays neutral', body: 'Some subscriptions are worth paying for. The point of the page is not to moralise the spend; it is to quantify the trade-off in a clean, reproducible way.' },
        ],
        faqs: buildFaqs('financial', [
          { question: 'Why compare spend with investing instead?', answer: 'Because recurring costs have an opportunity cost. The comparison shows what the same cash flow could become if redirected.' },
          { question: 'Does this include price rises?', answer: 'No. This expression keeps the monthly spend constant so the effect of the recurring amount is easy to isolate.' },
          { question: 'Is the investment return realistic?', answer: 'It is just an assumption input. Lower or higher long-run returns will materially change the opportunity-cost number.' },
        ]),
        disclaimers: financeDisclaimers('recurring subscription spend'),
        calculator: {
          kind: 'subscription',
          displayCurrency: currency,
          initialValues: { monthlySpend, investmentReturn, hourlyWage },
        },
      });
    }

    case 'freelance-rate': {
      const desiredTakeHome = parsed.desiredTakeHome as number;
      const annualExpenses = parsed.annualExpenses as number;
      const taxRate = parsed.taxRate as number;
      const billableWeeks = parsed.billableWeeks as number;
      const hoursPerDay = parsed.hoursPerDay as number;
      const unpaidHoursPerDay = parsed.unpaidHoursPerDay as number;
      const currency = category.defaultCurrency ?? 'usd';
      const result = calculateFreelanceRate(desiredTakeHome, annualExpenses, taxRate, billableWeeks, hoursPerDay, unpaidHoursPerDay);
      const higherTax = calculateFreelanceRate(desiredTakeHome, annualExpenses, taxRate + 5, billableWeeks, hoursPerDay, unpaidHoursPerDay);
      const lowerUtilisation = calculateFreelanceRate(desiredTakeHome, annualExpenses, taxRate, Math.max(36, billableWeeks - 4), hoursPerDay, unpaidHoursPerDay);
      const heading = `Freelance Rate Calculator – ${money(desiredTakeHome, currency)} Target, ${taxRate}% Tax, ${billableWeeks} Billable Weeks`;

      return createPageData({
        category,
        categorySlug,
        expression,
        title: `${heading} | Plain Figures`,
        heading,
        description: `Work-backwards freelance pricing for a ${money(desiredTakeHome, currency)} take-home target, ${money(annualExpenses, currency)} expenses, ${taxRate}% tax provision, and ${billableWeeks} billable weeks.`,
        deck: `Turn an income target into a required hourly and day rate using explicit tax, expense, and utilisation assumptions.`,
        formula: {
          label: 'Required gross-rate logic',
          expression: 'Required gross = (Target take-home + Expenses) / (1 − tax rate)',
          variables: [
            `Target take-home = ${money(desiredTakeHome, currency)}`,
            `Annual expenses = ${money(annualExpenses, currency)}`,
            `Tax provision = ${percentText(taxRate)}`,
            `Required day rate = ${money(result.dayRate, currency)}`,
          ],
          explanation: [
            ...formulaSection('Freelance Rate', 'the required selling rate'),
            `The equation works backwards from the income you want to keep. Once the gross revenue requirement is known, the model divides it across realistically billable time rather than theoretical full-year working hours.`,
          ],
        },
        stats: [
          { label: 'Day rate', value: money(result.dayRate, currency), tone: 'warning', sub: `${hoursPerDay} billable hours/day` },
          { label: 'Hourly rate', value: money(result.hourlyRate, currency), tone: 'warning', sub: `${billableWeeks} billable weeks/year` },
          { label: 'Monthly gross required', value: money(result.monthlyRequired, currency), tone: 'default', sub: `${percentText(taxRate)} tax provision` },
        ],
        steps: [
          `Start with desired take-home of ${money(desiredTakeHome, currency)} plus ${money(annualExpenses, currency)} of annual business costs.`,
          `Gross up the total for a ${taxRate}% tax provision.`,
          `Spread the gross revenue requirement across ${billableWeeks} billable weeks and ${hoursPerDay} billable hours per day.`,
          `That implies around ${money(result.hourlyRate, currency)} per hour or ${money(result.dayRate, currency)} per day.`,
        ],
        sections: [
          {
            heading: 'Why rate pages need utilisation in the formula',
            paragraphs: [
              introParagraph('Freelance Rate', `${money(desiredTakeHome, currency)} target with ${billableWeeks} billable weeks`, expression),
              methodologyParagraph('Freelance Rate'),
              `Freelancers often underprice because they divide target income by every working day in the year. This page does not. It separates billable time from admin, sales, downtime, and tax provision so the rate is anchored to actual utilisation.`,
            ],
          },
          {
            heading: 'How to interpret the rate',
            paragraphs: [
              `The output is not a market recommendation; it is a floor implied by your assumptions. If the required rate of ${money(result.dayRate, currency)} is far above what the market will bear, the tension is not in the calculator. It is in utilisation, scope, positioning, or the income target.`,
              `That is why long-tail freelance searches are useful programmatic targets. Users are usually testing the arithmetic behind a pricing decision. A clean formula does more work than pages filled with generic negotiation advice.`,
            ],
          },
          {
            heading: 'Assumptions and limits',
            paragraphs: assumptionsSection('Freelance rate', 'finance'),
          },
        ],
        scenarios: [
          { title: 'If tax provision rises by 5 points', body: `At ${taxRate + 5}% tax provision, the required day rate becomes about ${money(higherTax.dayRate, currency)}.` },
          { title: 'If billable weeks drop by 4', body: `Reducing billable availability to ${Math.max(36, billableWeeks - 4)} weeks pushes the required day rate to roughly ${money(lowerUtilisation.dayRate, currency)}.` },
          { title: 'Why the floor matters', body: 'A required rate is most useful as a floor. Quoting below it may still win work, but it means the business is no longer funding the target income and operating assumptions supplied.' },
        ],
        faqs: buildFaqs('financial', [
          { question: 'Why include unpaid hours?', answer: 'Because freelancers spend time on admin, proposals, sales, and operations that clients do not directly pay for. Ignoring that time understates the required rate.' },
          { question: 'Is this a market rate recommendation?', answer: 'No. It is a bottom-up economic requirement based on your own targets and utilisation assumptions.' },
          { question: 'Can I use this for hourly, day, or project pricing?', answer: 'Yes. The page outputs hourly and day rates that can be used as anchors when scoping project work.' },
        ]),
        disclaimers: financeDisclaimers('freelance pricing'),
        calculator: {
          kind: 'freelance',
          displayCurrency: currency,
          initialValues: { desiredTakeHome, annualExpenses, taxRate, billableWeeks, hoursPerDay, unpaidHoursPerDay },
        },
      });
    }

    case 'ltv-cac': {
      const arpu = parsed.arpu as number;
      const grossMarginPct = parsed.grossMarginPct as number;
      const churnRatePct = parsed.churnRatePct as number;
      const cacPerCustomer = parsed.cacPerCustomer as number;
      const monthlyNewCustomers = parsed.monthlyNewCustomers as number;
      const discountRatePct = parsed.discountRatePct as number;
      const currency = category.defaultCurrency ?? 'usd';
      const result = calculateLTVCAC({ arpu, grossMarginPct, churnRatePct, cacPerCustomer, salesCycleDays: 30, monthlyNewCustomers, discountRatePct });
      const lowerChurn = calculateLTVCAC({ arpu, grossMarginPct, churnRatePct: Math.max(0.5, churnRatePct - 1), cacPerCustomer, salesCycleDays: 30, monthlyNewCustomers, discountRatePct });
      const higherCac = calculateLTVCAC({ arpu, grossMarginPct, churnRatePct, cacPerCustomer: cacPerCustomer * 1.2, salesCycleDays: 30, monthlyNewCustomers, discountRatePct });
      const heading = `LTV:CAC Calculator – ${money(arpu, currency)}/Month ARPU, ${grossMarginPct}% Margin, ${churnRatePct}% Churn`;

      return createPageData({
        category,
        categorySlug,
        expression,
        title: `${heading} | Plain Figures`,
        heading,
        description: `Unit-economics model for ${money(arpu, currency)} ARPU, ${grossMarginPct}% gross margin, ${churnRatePct}% churn, and ${money(cacPerCustomer, currency)} CAC.`,
        deck: `Formula-first SaaS unit economics for ARPU, margin, churn, CAC, payback, and cohort value.`,
        formula: {
          label: 'Core LTV:CAC relationships',
          expression: 'Lifetime = 1 / churn, LTV = ARPU × gross margin × lifetime, LTV:CAC = LTV / CAC',
          variables: [
            `ARPU = ${money(arpu, currency)} per month`,
            `Gross margin = ${percentText(grossMarginPct)}`,
            `Monthly churn = ${percentText(churnRatePct)}`,
            `LTV:CAC ratio = ${formatNumber(result.ltvcacRatio, 2)}x`,
          ],
          explanation: [
            ...formulaSection('LTV & CAC', 'customer economics'),
            `This page uses both a simple lifetime formula and a discounted-cash-flow version. The simple view is faster to reason about; the DCF view is better when survival and discounting matter to board-level planning.`,
          ],
        },
        stats: [
          { label: 'LTV:CAC ratio', value: `${formatNumber(result.ltvcacRatio, 2)}x`, tone: result.ltvcacRatio >= 3 ? 'positive' : result.ltvcacRatio >= 1.5 ? 'warning' : 'negative', sub: result.rating },
          { label: 'Simple LTV', value: money(result.simpleLTV, currency), tone: 'default', sub: `${formatNumber(result.avgLifetimeMonths, 1)} months lifetime` },
          { label: 'Payback', value: monthText(result.paybackMonths), tone: 'warning', sub: money(cacPerCustomer, currency) + ' CAC' },
        ],
        steps: [
          `Estimate customer lifetime from churn: 1 ÷ ${formatNumber(churnRatePct / 100, 3)}.`,
          `Turn ARPU into monthly gross profit using ${grossMarginPct}% margin.`,
          `Multiply monthly gross profit by average lifetime to get simple LTV.`,
          `Compare the resulting customer value with CAC of ${money(cacPerCustomer, currency)} to get the ratio and payback period.`,
        ],
        sections: [
          {
            heading: 'Why formula-first unit economics matter',
            paragraphs: [
              introParagraph('LTV & CAC', `${money(arpu, currency)} ARPU, ${grossMarginPct}% margin, ${churnRatePct}% churn`, expression),
              methodologyParagraph('LTV & CAC'),
              `LTV:CAC pages become misleading when they skip churn mechanics or hide the margin assumption. This page keeps those levers explicit. That makes it useful for operators, investors, and founders checking whether a growth story survives contact with basic unit-economics arithmetic.`,
            ],
          },
          {
            heading: 'What the ratio is saying',
            paragraphs: [
              `On this input set, the simple LTV:CAC ratio lands at ${formatNumber(result.ltvcacRatio, 2)}x with payback around ${monthText(result.paybackMonths)}. A high ratio can still be weak if payback is slow or if churn is unstable, which is why the page shows more than a single headline metric.`,
              `The real value of programmatic pages here is specificity. A user searching this exact combination is often comparing a budget model, investor memo, or SaaS dashboard claim. What they need is not motivational copy. They need the formula and the consequence of each assumption.`,
            ],
          },
          {
            heading: 'Assumptions and limits',
            paragraphs: assumptionsSection('LTV and CAC', 'ops'),
          },
        ],
        scenarios: [
          { title: 'If churn improves by 1 point', body: `Reducing churn to ${Math.max(0.5, churnRatePct - 1)}% lifts the ratio to about ${formatNumber(lowerChurn.ltvcacRatio, 2)}x and improves payback materially.` },
          { title: 'If CAC rises by 20%', body: `Higher acquisition cost pushes the ratio down to about ${formatNumber(higherCac.ltvcacRatio, 2)}x. CAC inflation can erase healthy unit economics quickly if retention does not improve alongside it.` },
          { title: 'Why DCF is still useful', body: 'The simple ratio is a strong screening tool, but discounted cash flow helps when investors care about timing, survival probability, and cost of capital rather than just raw lifetime arithmetic.' },
        ],
        faqs: [
          { question: 'Why use churn to estimate lifetime?', answer: 'In subscription businesses, churn is the simplest observable way to turn retention into an expected customer life. Lower churn lengthens lifetime and lifts LTV.' },
          { question: 'Why show both simple and DCF LTV?', answer: 'Because the simple model is easier to reason about, while DCF better reflects the timing of future gross profit.' },
          { question: 'Is a 3x ratio always healthy?', answer: 'Not always. The answer depends on payback, cash burn, sales-cycle length, and whether the churn and margin assumptions are actually durable.' },
        ],
        disclaimers: operatingDisclaimers('unit economics'),
        calculator: {
          kind: 'ltvcac',
          displayCurrency: currency,
          initialValues: { arpu, grossMarginPct, churnRatePct, cacPerCustomer, monthlyNewCustomers, discountRatePct },
        },
      });
    }

    case 'cyber-risk-exposure': {
      const annualRevenue = parsed.annualRevenue as number;
      const employeeCount = parsed.employeeCount as number;
      const customerRecords = parsed.customerRecords as number;
      const risk = parsed.industryRisk as keyof typeof CYBER_RISK_LEVELS;
      const industryRisk = CYBER_RISK_LEVELS[risk];
      const currency = category.defaultCurrency ?? 'usd';
      const result = calculateCyberRisk(annualRevenue, employeeCount, customerRecords, industryRisk, false, false, false, false, false);
      const controlsImproved = calculateCyberRisk(annualRevenue, employeeCount, customerRecords, industryRisk, true, true, true, true, true);
      const higherRisk = calculateCyberRisk(annualRevenue, employeeCount, customerRecords, Math.min(5, industryRisk + 1), false, false, false, false, false);
      const heading = `Cyber Risk Exposure Calculator – ${money(annualRevenue, currency)} Revenue, ${customerRecords.toLocaleString('en-US')} Records, ${titleCase(risk)} Risk`;

      return createPageData({
        category,
        categorySlug,
        expression,
        title: `${heading} | Plain Figures`,
        heading,
        description: `Cyber exposure model for ${money(annualRevenue, currency)} revenue, ${employeeCount} employees, ${customerRecords.toLocaleString('en-US')} records, and ${titleCase(risk)} sector risk.`,
        deck: `Estimate breach-cost exposure, risk score, and cover-limit range from simple business-profile inputs.`,
        formula: {
          label: 'Exposure-based cyber estimate',
          expression: 'Estimated cost = breach, interruption, ransom, legal, fine, and reputation components adjusted by control quality',
          variables: [
            `Estimated breach cost = ${money(result.estimatedBreachCost, currency)}`,
            `Risk score = ${result.riskScore}/100`,
            `Recommended cover limit = ${money(result.recommendedCoverLimit, currency)}`,
            `Industry risk tier = ${titleCase(risk)}`,
          ],
          explanation: [
            ...formulaSection('Cyber Risk Exposure', 'estimated loss severity'),
            `This model is not pretending cyber risk is a single closed-form equation. Instead it turns a handful of measurable inputs into a structured exposure estimate so the contribution of each cost bucket is visible.`,
          ],
        },
        stats: [
          { label: 'Estimated breach cost', value: money(result.estimatedBreachCost, currency), tone: 'negative', sub: `${result.riskLevel} risk` },
          { label: 'Risk score', value: `${result.riskScore}/100`, tone: result.riskScore > 70 ? 'negative' : 'warning', sub: `${titleCase(risk)} sector` },
          { label: 'Suggested cover limit', value: money(result.recommendedCoverLimit, currency), tone: 'warning', sub: money(result.annualPremiumEstimate.low, currency) + '–' + money(result.annualPremiumEstimate.high, currency) + ' premium range' },
        ],
        steps: [
          `Estimate record-driven breach cost from ${customerRecords.toLocaleString('en-US')} records.`,
          `Add business interruption, ransom, legal, regulatory, and reputation components.`,
          `Score the exposure using sector risk plus control posture assumptions.`,
          `That produces an estimated loss severity of ${money(result.estimatedBreachCost, currency)} and a recommended cover anchor of ${money(result.recommendedCoverLimit, currency)}.`,
        ],
        sections: [
          {
            heading: 'Why exposure pages need explicit structure',
            paragraphs: [
              introParagraph('Cyber Risk Exposure', `${money(annualRevenue, currency)} revenue and ${customerRecords.toLocaleString('en-US')} records`, expression),
              methodologyParagraph('Cyber Risk Exposure'),
              `Cyber pages become noise when they are written as fear-based commentary. A useful page shows the cost buckets, the risk tier, and the implied scale. That is what this expression is designed to do: convert sector profile and data footprint into a transparent exposure estimate.`,
            ],
          },
          {
            heading: 'How to interpret the exposure figure',
            paragraphs: [
              `The estimate of ${money(result.estimatedBreachCost, currency)} is not a forecast of what will happen next year. It is a severity model based on the profile in the URL. The key output is often the order of magnitude rather than the exact dollar.`,
              `This matters because long-tail cyber queries usually come from operators checking whether an insurance limit, vendor requirement, or board discussion is directionally sane. A formula-first page is useful when it shows the moving parts without pretending to replace an incident-response or underwriting process.`,
            ],
          },
          {
            heading: 'Assumptions and limits',
            paragraphs: assumptionsSection('Cyber risk exposure', 'ops'),
          },
        ],
        scenarios: [
          { title: 'If core controls are in place', body: `Switching on MFA, tested backups, response planning, training, and encryption reduces the estimated exposure to about ${money(controlsImproved.estimatedBreachCost, currency)} in this model.` },
          { title: 'If sector risk is one tier higher', body: `Moving from ${titleCase(risk)} to a higher risk tier pushes estimated exposure to roughly ${money(higherRisk.estimatedBreachCost, currency)} and raises the suggested cover anchor accordingly.` },
          { title: 'Why this is a model, not a verdict', body: 'Cyber losses are fat-tailed and event-driven. The page is best used as a structured comparison tool, not as a prediction that any one specific incident will cost the modelled amount.' },
        ],
        faqs: [
          { question: 'Is this an insurance recommendation?', answer: 'No. It is an exposure estimate only. Insurance structure, sublimits, retention, and policy wording require separate review.' },
          { question: 'Why use record count so heavily?', answer: 'Because notification, legal, and remediation costs often scale with the number of affected records, making record volume a useful first-order input.' },
          { question: 'Can strong controls really change the output that much?', answer: 'Yes in the model, because better controls reduce both the risk score and the discount applied to expected severity.' },
        ],
        disclaimers: operatingDisclaimers('cyber exposure'),
        calculator: {
          kind: 'cyber',
          displayCurrency: currency,
          initialValues: { annualRevenue, employeeCount, customerRecords, industryRisk: risk },
        },
      });
    }

    case 'total-cost-risk': {
      const premiums = parsed.premiums as number;
      const retainedLosses = parsed.retainedLosses as number;
      const adminCosts = parsed.adminCosts as number;
      const riskControlCosts = parsed.riskControlCosts as number;
      const revenue = parsed.revenue as number;
      const currency = category.defaultCurrency ?? 'usd';
      const result = calculateTCOR({ premiums, retainedLosses, adminCosts, riskControlCosts, revenue });
      const heading = `Total Cost of Risk Calculator – ${money(premiums, currency)} Premiums, ${money(retainedLosses, currency)} Losses`;

      return createPageData({
        category,
        categorySlug,
        expression,
        title: `${heading} | Plain Figures`,
        heading,
        description: `TCOR model for premiums, retained losses, admin, and control spend against ${money(revenue, currency)} revenue, with scenario comparison.`,
        deck: `Formula-first total-cost-of-risk model showing TCOR, rate per revenue, and scenario stress tests.`,
        formula: {
          label: 'TCOR identity',
          expression: 'TCOR = premiums + retained losses + admin costs + risk-control costs',
          variables: [
            `Premiums = ${money(premiums, currency)}`,
            `Retained losses = ${money(retainedLosses, currency)}`,
            `Admin costs = ${money(adminCosts, currency)}`,
            `Risk control costs = ${money(riskControlCosts, currency)}`,
          ],
          explanation: [
            ...formulaSection('Total Cost of Risk', 'the all-in risk cost'),
            `The formula is intentionally simple because TCOR is an accounting-style aggregation. The nuance comes from what sits inside each bucket and how scenario shifts alter the mix, which is why this page includes modelled scenarios alongside the base case.`,
          ],
        },
        stats: [
          { label: 'Base TCOR', value: money(result.base.tcor, currency), tone: 'warning', sub: `${percentText((result.base.tcor / revenue) * 100, 2)} of revenue` },
          { label: 'TCOR rate', value: formatNumber(result.base.tcorRate, 2), tone: 'default', sub: `per ${money(1000, currency)} revenue` },
          { label: 'Improved-risk scenario', value: money(result.scenarios[2].tcor, currency), tone: 'positive', sub: result.scenarios[2].label },
        ],
        steps: [
          `Aggregate premiums of ${money(premiums, currency)}, retained losses of ${money(retainedLosses, currency)}, admin of ${money(adminCosts, currency)}, and control spend of ${money(riskControlCosts, currency)}.`,
          `That produces a base TCOR of ${money(result.base.tcor, currency)}.`,
          `Normalise TCOR by revenue of ${money(revenue, currency)} to get a rate-per-revenue view.`,
          `Then stress the inputs across bad-year, improved-control, and self-insurance style scenarios.`,
        ],
        sections: [
          {
            heading: 'Why TCOR pages are useful',
            paragraphs: [
              introParagraph('Total Cost of Risk', `${money(premiums, currency)} premiums and ${money(retainedLosses, currency)} retained losses`, expression),
              methodologyParagraph('Total Cost of Risk'),
              `TCOR is one of the cleaner programmatic subjects because the identity is transparent. The difficulty is rarely the formula itself. The difficulty is remembering to count all the buckets consistently. A formula-first page helps by making the checklist explicit.`,
            ],
          },
          {
            heading: 'Reading the risk cost mix',
            paragraphs: [
              `This base case lands at ${money(result.base.tcor, currency)}. The useful interpretation is not just the total; it is the composition. If retained losses dominate, risk financing is one problem. If premiums dominate, market pricing or programme structure may be the bigger lever. If admin is high, operational friction may be the hidden cost centre.`,
              `Scenario views matter because TCOR is not static. A bad claims year, a heavier self-insurance posture, or better risk controls can all move the mix materially. That makes the scenario table more decision-useful than a single static total.`,
            ],
          },
          {
            heading: 'Assumptions and limits',
            paragraphs: assumptionsSection('Total cost of risk', 'ops'),
          },
        ],
        scenarios: result.scenarios.map((scenario) => ({
          title: scenario.label,
          body: `${scenario.label} produces total cost of risk of about ${money(scenario.tcor, currency)} and a TCOR rate of ${formatNumber(scenario.tcorRate, 2)} per ${money(1000, currency)} of revenue.`,
        })),
        faqs: [
          { question: 'Why include risk-control spending in TCOR?', answer: 'Because risk management is not free. Training, inspections, systems, and prevention activity are part of the economic cost of carrying risk.' },
          { question: 'What is the benefit of the TCOR rate?', answer: 'Normalising by revenue makes trend and peer comparison easier than looking at the absolute total alone.' },
          { question: 'Is a lower TCOR always better?', answer: 'Not automatically. A lower total can come from under-investment in controls or under-buying cover, so the composition and scenario resilience still matter.' },
        ],
        disclaimers: operatingDisclaimers('total cost of risk'),
        calculator: {
          kind: 'tcor',
          displayCurrency: currency,
          initialValues: { premiums, retainedLosses, adminCosts, riskControlCosts, revenue },
        },
      });
    }

    default:
      return null;
  }
}
