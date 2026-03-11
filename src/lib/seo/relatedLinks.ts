import { ALL_TOOLS, getRelatedTools, getToolByHref } from '@/lib/siteData';

export type SeoLink = {
  href: string;
  label: string;
  description?: string;
};

export type BreadcrumbItem = {
  href?: string;
  label: string;
};

type ClusterConfig = {
  title: string;
  intro: string;
  calculatorHrefs: string[];
  guideLinks: SeoLink[];
  hubLinks: SeoLink[];
};

type ProgrammaticCategorySupport = {
  hubHref: string;
  guideSlugs: string[];
  relatedCategories: string[];
};

const GUIDE_LABELS: Record<string, string> = {
  '/learn/mortgage-repayment': 'How Mortgage Repayment Calculations Work',
  '/learn/mortgage-affordability': 'How Mortgage Affordability Is Assessed',
  '/learn/offset-mortgage': 'How Offset Mortgages Actually Work',
  '/learn/mortgage-overpayment': 'Mortgage Overpayment: How Much Does It Save?',
  '/learn/rent-vs-buy': 'Rent vs Buy: The Key Numbers to Compare',
  '/learn/compound-interest': 'Understanding Compound Interest',
  '/learn/save-for-goal': 'Save for a Goal: Time and Amount Basics',
  '/learn/retirement-savings': 'How Retirement Savings Projections Work',
  '/learn/emergency-fund-how-much': 'Emergency Fund: How Much Is Enough?',
  '/learn/subscription-drain': 'Subscription Drain: The True Long-Term Cost',
  '/learn/financial-crisis': 'How to Calculate Your Financial Runway',
  '/learn/salary-take-home': 'How Salary Take-Home Is Calculated',
  '/learn/salary-sacrifice': 'Salary Sacrifice: Tax and National Insurance Savings Explained',
  '/learn/freelance-rate': 'Freelance Rate: Working Backwards from Desired Salary',
  '/learn/loan-repayment': 'Loan Repayment: True APR Explained',
  '/learn/student-loan-repayment': 'Student Loan Repayment: Plan 1, Plan 2, and Plan 5 Compared',
  '/learn/business-interruption': 'Business Interruption Sum Insured: How It Works',
  '/learn/cyber-resilient-agency': 'Cyber-Resilient Agency: Protecting Client Data',
  '/learn/regtech-compliance-automation': 'RegTech Essentials: Automating Compliance',
  '/learn/private-credit-playbook': 'Private Credit Playbook: Diversifying Beyond Equities',
  '/learn/parametric-insurance-weather': 'Parametric Insurance: Instant-Payout Weather Triggers',
  '/learn/tdee': 'TDEE and Calorie Needs: How the Calculation Works',
  '/learn/human-life-value': 'Human Life Value: How Income Replacement Maths Works',
  '/learn/total-cost-of-risk': 'Total Cost of Risk: What TCOR Actually Measures',
  '/learn/risk-heatmap-explained': 'Risk Heat Maps: Likelihood, Impact, and Their Limits',
  '/learn/solvency-capital-requirement': 'Solvency Capital Requirement: Standard Formula Basics',
  '/learn/coverage-gap-analysis': 'Coverage Gap Analysis: Comparing Limits to Real Exposure',
  '/learn/loss-event-probability': 'Loss Event Probability: Expected Loss and Scenario Weighting',
  '/learn/cyber-insurance-limit': 'Cyber Insurance Limits: How Adequacy Is Estimated',
  '/learn/ltv-cac-explained': 'LTV to CAC: How Customer Economics Are Actually Calculated',
};

const CLUSTERS: Record<string, ClusterConfig> = {
  mortgage: {
    title: 'Mortgage Planning Cluster',
    intro:
      'Use this hub to move from the core repayment formula into affordability, offset, overpayment, and rent-versus-buy comparisons without leaving the mortgage cluster.',
    calculatorHrefs: ['/mortgage', '/affordability', '/offset', '/overpayment', '/rent-vs-buy'],
    guideLinks: [
      { href: '/learn/mortgage-repayment', label: GUIDE_LABELS['/learn/mortgage-repayment'], description: 'Understand the amortisation formula behind monthly mortgage payments.' },
      { href: '/learn/mortgage-affordability', label: GUIDE_LABELS['/learn/mortgage-affordability'], description: 'See how income multiples, outgoings, and stress tests shape borrowing power.' },
      { href: '/learn/offset-mortgage', label: GUIDE_LABELS['/learn/offset-mortgage'], description: 'Compare offset savings against standard mortgage interest charges.' },
      { href: '/learn/mortgage-overpayment', label: GUIDE_LABELS['/learn/mortgage-overpayment'], description: 'Measure how extra payments reduce lifetime interest and term length.' },
      { href: '/learn/rent-vs-buy', label: GUIDE_LABELS['/learn/rent-vs-buy'], description: 'Keep tenure and break-even reasoning inside the same housing cluster as repayment and affordability.' },
      { href: '/learn/lisa-help-to-buy', label: 'LISA vs Help to Buy ISA: When the Government Bonus Actually Helps', description: 'Add deposit-bonus and first-time buyer saving rules to the main mortgage decision path.' },
    ],
    hubLinks: [
      { href: '/mortgage-calculators', label: 'Open the mortgage calculators hub', description: 'Move through repayment, affordability, and buy-versus-rent pages from one cluster page.' },
      { href: '/overpayment-and-offset', label: 'Open the overpayment and offset hub', description: 'Compare spare-cash strategies once the base mortgage payment is clear.' },
    ],
  },
  savings: {
    title: 'Savings and Compounding Cluster',
    intro:
      'This cluster connects savings growth, compounding, savings goals, retirement projections, and emergency-fund planning so users can move from formula to decision path quickly.',
    calculatorHrefs: ['/savings', '/compound', '/save-goal', '/retirement', '/subscriptions', '/crisis'],
    guideLinks: [
      { href: '/learn/compound-interest', label: GUIDE_LABELS['/learn/compound-interest'], description: 'Learn how frequency and effective annual rate change the outcome.' },
      { href: '/learn/save-for-goal', label: GUIDE_LABELS['/learn/save-for-goal'], description: 'Translate a target amount and deadline into a monthly savings number.' },
      { href: '/learn/retirement-savings', label: GUIDE_LABELS['/learn/retirement-savings'], description: 'See how recurring contributions and inflation affect long-term projections.' },
      { href: '/learn/emergency-fund-how-much', label: GUIDE_LABELS['/learn/emergency-fund-how-much'], description: 'Set a buffer size that matches expenses and income stability.' },
      { href: '/learn/subscription-drain', label: GUIDE_LABELS['/learn/subscription-drain'], description: 'Reframe recurring spending as cumulative cost and foregone growth.' },
      { href: '/learn/retirement-employer-contributions', label: 'Retirement Savings: Employer Contributions and Inflation Impact', description: 'Keep matched contributions and real-value retirement framing inside the main savings cluster.' },
      { href: '/learn/financial-crisis', label: GUIDE_LABELS['/learn/financial-crisis'], description: 'Link emergency savings and burn-rate logic directly back to the broader savings plan.' },
    ],
    hubLinks: [
      { href: '/savings-and-compound-interest', label: 'Open the savings and compound hub', description: 'Group growth, goal, retirement, and emergency-fund pages under one savings path.' },
      { href: '/overpayment-and-offset', label: 'Open the overpayment and offset hub', description: 'Use the adjacent mortgage strategy hub when a cash question becomes a borrowing question.' },
    ],
  },
  income: {
    title: 'Income, Tax, and Borrowing Cluster',
    intro:
      'These pages work best as a connected cluster: calculate take-home pay, convert salary to freelance pricing, then pressure-test borrowing and repayment assumptions.',
    calculatorHrefs: ['/take-home', '/freelance', '/loan', '/affordability'],
    guideLinks: [
      { href: '/learn/salary-take-home', label: GUIDE_LABELS['/learn/salary-take-home'], description: 'Break down gross-to-net pay across tax and social contribution systems.' },
      { href: '/learn/salary-sacrifice', label: GUIDE_LABELS['/learn/salary-sacrifice'], description: 'See when pension and benefit salary sacrifice changes take-home outcomes.' },
      { href: '/learn/freelance-rate', label: GUIDE_LABELS['/learn/freelance-rate'], description: 'Convert target income into billable day-rate requirements.' },
      { href: '/learn/loan-repayment', label: GUIDE_LABELS['/learn/loan-repayment'], description: 'Understand repayment schedules, APR, and total borrowing cost.' },
      { href: '/learn/student-loan-repayment', label: GUIDE_LABELS['/learn/student-loan-repayment'], description: 'Keep graduate repayment deductions in the same income-to-borrowing path as salary and loan pages.' },
    ],
    hubLinks: [
      { href: '/income-tax-and-borrowing', label: 'Open the income, tax, and borrowing hub', description: 'Keep salary, freelance, loan, and affordability pages grouped within one commercial cluster.' },
      { href: '/property-tax-and-estate-planning', label: 'Open the property, tax, and estate hub', description: 'Use the adjacent planning hub when income questions turn into tax-aware property or wealth decisions.' },
    ],
  },
  risk: {
    title: 'Risk and Coverage Cluster',
    intro:
      'Professional users usually need to move between exposure sizing, limit adequacy, and scenario modelling. This cluster keeps those supporting paths shallow and crawlable.',
    calculatorHrefs: ['/bi', '/coverage-gap', '/tcor', '/risk-heatmap', '/cyber', '/cyber-limit', '/loss-probability', '/scr', '/hlv', '/ltv-cac'],
    guideLinks: [
      { href: '/learn/business-interruption', label: GUIDE_LABELS['/learn/business-interruption'], description: 'Work through BI sum-insured logic and indemnity-period sizing.' },
      { href: '/learn/human-life-value', label: GUIDE_LABELS['/learn/human-life-value'], description: 'Keep protection-gap and income-replacement framing attached to the broader coverage cluster.' },
      { href: '/learn/cyber-resilient-agency', label: GUIDE_LABELS['/learn/cyber-resilient-agency'], description: 'Connect breach exposure to control investment and coverage planning.' },
      { href: '/learn/cyber-insurance-limit', label: GUIDE_LABELS['/learn/cyber-insurance-limit'], description: 'Keep cyber-limit adequacy and the supporting exposure logic inside the same protection path.' },
      { href: '/learn/coverage-gap-analysis', label: GUIDE_LABELS['/learn/coverage-gap-analysis'], description: 'Compare policy limits to actual exposures before relying on headline sums insured.' },
      { href: '/learn/total-cost-of-risk', label: GUIDE_LABELS['/learn/total-cost-of-risk'], description: 'Tie retained losses, premiums, and control spending back to the rest of the risk toolset.' },
      { href: '/learn/risk-heatmap-explained', label: GUIDE_LABELS['/learn/risk-heatmap-explained'], description: 'Support register scoring and prioritisation with a clearer explainer on likelihood and impact.' },
      { href: '/learn/loss-event-probability', label: GUIDE_LABELS['/learn/loss-event-probability'], description: 'Keep expected-loss and scenario-weighting logic close to register and coverage work.' },
      { href: '/learn/solvency-capital-requirement', label: GUIDE_LABELS['/learn/solvency-capital-requirement'], description: 'Add capital framing where retained risk needs to be translated into solvency language.' },
      { href: '/learn/regtech-compliance-automation', label: GUIDE_LABELS['/learn/regtech-compliance-automation'], description: 'Model compliance cost, efficiency, and automation ROI.' },
      { href: '/learn/private-credit-playbook', label: GUIDE_LABELS['/learn/private-credit-playbook'], description: 'Use adjacent portfolio-risk content to support deeper professional research.' },
      { href: '/learn/parametric-insurance-weather', label: GUIDE_LABELS['/learn/parametric-insurance-weather'], description: 'Add trigger-based cover design and basis-risk framing to the professional risk cluster.' },
      { href: '/learn/ltv-cac-explained', label: GUIDE_LABELS['/learn/ltv-cac-explained'], description: 'Retain one economics explainer where risk work overlaps with acquisition cost and portfolio value models.' },
    ],
    hubLinks: [
      { href: '/risk-management-and-coverage', label: 'Open the risk management and coverage hub', description: 'Group exposure, coverage, limit, and capital tools within one professional cluster.' },
      { href: '/advisory-analytics-and-automation', label: 'Open the advisory analytics and automation hub', description: 'Keep adjacent professional guides and commercial tools connected in one organiser page.' },
    ],
  },
  wellbeing: {
    title: 'Energy and Lifestyle Cluster',
    intro:
      'TDEE sits outside the money clusters, but the page still benefits from direct links into the explanatory guide and a small surrounding support path.',
    calculatorHrefs: ['/tdee', '/subscriptions', '/lifestyle-inflation'],
    guideLinks: [
      { href: '/learn/tdee', label: GUIDE_LABELS['/learn/tdee'], description: 'Understand the BMR and activity formulas behind calorie estimates.' },
      { href: '/learn/subscription-drain', label: GUIDE_LABELS['/learn/subscription-drain'], description: 'Compare recurring lifestyle costs with longer-term opportunity cost.' },
      { href: '/learn/lifestyle-inflation', label: 'Lifestyle Inflation: Real Cost Over Time', description: 'Keep small spending upgrades and their long-run savings drag inside the same support cluster.' },
      { href: '/learn/financial-crisis', label: GUIDE_LABELS['/learn/financial-crisis'], description: 'Tie resilience, runway, and emergency planning back to recurring-cost decisions.' },
      { href: '/learn/financial-crisis-simulator', label: 'Financial Crisis Simulator: How Long Will Savings Last?', description: 'Keep the scenario-based runway explainer alongside the broader lifestyle and resilience support pages.' },
    ],
    hubLinks: [
      { href: '/lifestyle-and-runway', label: 'Open the lifestyle and runway hub', description: 'Group recurring-cost, runway, and lifestyle-pressure pages in one support cluster.' },
      { href: '/savings-and-compound-interest', label: 'Open the savings and compound hub', description: 'Use the adjacent savings hub when a lifestyle question turns into buffer-building or contribution planning.' },
    ],
  },
  advisory: {
    title: 'Advisory Strategy and Automation Cluster',
    intro:
      'These guides support the professional side of the site where workflow automation, client analytics, and advisory economics matter more than a single calculator output. The cluster keeps those pages discoverable without forcing them into the risk register bucket.',
    calculatorHrefs: ['/ltv-cac', '/loss-probability', '/cyber', '/tcor'],
    guideLinks: [
      { href: '/learn/agentic-advisor', label: 'The Agentic Advisor: AI-Driven Digital Co-Workers', description: 'Connect AI workflow delegation to measurable advisory-unit economics.' },
      { href: '/learn/automation-audit-2026', label: 'Automation Audit: Tasks to Delegate to AI in 2026', description: 'Map operational tasks into automation candidates and payback logic.' },
      { href: '/learn/predictive-analytics-portfolio', label: 'Beyond Chatbots: Predictive Analytics for Portfolio Reviews', description: 'Keep model-driven portfolio review thinking inside the professional strategy cluster.' },
      { href: '/learn/digital-client-experience-phygital', label: 'Digital Client Experience: Phygital Engagement Platforms', description: 'Tie service-delivery economics and adoption risk back to the adjacent commercial tools.' },
      { href: '/learn/inheritance-pivot-heirs', label: 'Inheritance Pivot: Onboarding Heirs as Clients', description: 'Keep client-transition and conversion economics grouped with advisory growth explainers.' },
      { href: '/learn/multigenerational-asset-retention', label: 'Multi-Generational Bridge: Retaining Assets Across Generations', description: 'Support longer-horizon retention and wealth-transfer economics within the same strategy cluster.' },
    ],
    hubLinks: [
      { href: '/advisory-analytics-and-automation', label: 'Open the advisory analytics and automation hub', description: 'Group advisory workflow, analytics, and growth explainers in one organiser page.' },
      { href: '/risk-management-and-coverage', label: 'Open the risk management and coverage hub', description: 'Use the adjacent risk hub when advisory workflow questions tie back to exposure, controls, or coverage design.' },
    ],
  },
  property: {
    title: 'Property, Tax, and Estate Cluster',
    intro:
      'These pages support housing and wealth-transfer decisions that sit between personal finance calculators and higher-stakes planning topics. The cluster groups property yield, tax, and estate explainers so they are not left as isolated articles.',
    calculatorHrefs: ['/rent-vs-buy', '/mortgage', '/take-home', '/retirement', '/savings'],
    guideLinks: [
      { href: '/learn/rent-vs-buy', label: GUIDE_LABELS['/learn/rent-vs-buy'], description: 'Keep the tenure decision explainer inside the same housing, property, and wealth-transfer cluster.' },
      { href: '/learn/buy-to-let-yield', label: 'Buy-to-Let Yield: Gross, Net, and Cash-on-Cash Return', description: 'Keep property-return definitions close to the broader housing and savings cluster.' },
      { href: '/learn/capital-gains-tax', label: 'Capital Gains Tax: How the Calculation Works (2025/26)', description: 'Tie disposal and gain mechanics back to the main tax-aware calculator paths.' },
      { href: '/learn/inheritance-tax', label: 'Inheritance Tax: Nil-Rate Band, Taper Relief, and How It Is Calculated', description: 'Keep estate tax and gifting rules within reach of retirement and long-term wealth pages.' },
      { href: '/learn/lisa-help-to-buy', label: 'LISA vs Help to Buy ISA: When the Government Bonus Actually Helps', description: 'Support first-time buyer and deposit-planning journeys with a clear savings-rule explainer.' },
      { href: '/learn/pension-drawdown', label: 'Pension Drawdown: Sustainable Withdrawal Rates Explained', description: 'Connect estate and transfer questions to the retirement-income decisions that often follow.' },
    ],
    hubLinks: [
      { href: '/property-tax-and-estate-planning', label: 'Open the property, tax, and estate hub', description: 'Group housing, tax, and wealth-transfer explainers under one supporting hub.' },
      { href: '/mortgage-calculators', label: 'Open the mortgage calculators hub', description: 'Return to the core repayment and affordability hub once the planning context is clear.' },
    ],
  },
  markets: {
    title: 'Markets, Investing, and Cross-Border Money Cluster',
    intro:
      'This cluster holds the more specialised investing, FX, and market-context explainers that support compound-growth and tax journeys without diluting the core calculator pages.',
    calculatorHrefs: ['/compound', '/savings', '/retirement', '/take-home', '/tcor'],
    guideLinks: [
      { href: '/learn/currency-exchange-fees', label: 'Currency Exchange: The Real Cost of FX Fees and Spread', description: 'Keep cross-border payment costs close to savings and return comparisons.' },
      { href: '/learn/dividend-vs-growth', label: 'Dividend Yield vs Growth Investing: Total Return Comparison', description: 'Connect income versus growth framing back to the main compounding cluster.' },
      { href: '/learn/market-forecasts-rate-cuts', label: 'Market Forecasts: Impact of Rate Cuts and Geopolitics', description: 'Provide market-context support for users comparing scenarios rather than looking for predictions.' },
      { href: '/learn/tax-loss-harvesting', label: 'Tax-Loss Harvesting Strategies for Volatile Markets', description: 'Keep after-tax portfolio mechanics attached to the broader tax and investing pathway.' },
      { href: '/learn/private-credit-playbook', label: GUIDE_LABELS['/learn/private-credit-playbook'], description: 'Add one higher-yield professional investing explainer to the same long-term return cluster.' },
      { href: '/learn/capital-gains-tax', label: 'Capital Gains Tax: How the Calculation Works (2025/26)', description: 'Keep disposal and after-tax proceeds close to the investing and return-comparison path.' },
    ],
    hubLinks: [
      { href: '/investing-markets-and-fx', label: 'Open the investing, markets, and FX hub', description: 'Group the investing and cross-border explainers that support long-term return questions.' },
      { href: '/savings-and-compound-interest', label: 'Open the savings and compound hub', description: 'Return to the main long-term savings cluster once the specialist market context is clear.' },
    ],
  },
};

const TOOL_TO_CLUSTER = new Map<string, string>([
  ['/mortgage', 'mortgage'],
  ['/affordability', 'mortgage'],
  ['/offset', 'mortgage'],
  ['/overpayment', 'mortgage'],
  ['/rent-vs-buy', 'mortgage'],
  ['/savings', 'savings'],
  ['/compound', 'savings'],
  ['/save-goal', 'savings'],
  ['/retirement', 'savings'],
  ['/subscriptions', 'savings'],
  ['/crisis', 'savings'],
  ['/take-home', 'income'],
  ['/freelance', 'income'],
  ['/loan', 'income'],
  ['/lifestyle-inflation', 'wellbeing'],
  ['/bi', 'risk'],
  ['/coverage-gap', 'risk'],
  ['/tcor', 'risk'],
  ['/risk-heatmap', 'risk'],
  ['/cyber', 'risk'],
  ['/cyber-limit', 'risk'],
  ['/loss-probability', 'risk'],
  ['/scr', 'risk'],
  ['/hlv', 'risk'],
  ['/ltv-cac', 'risk'],
  ['/tdee', 'wellbeing'],
]);

const PROGRAMMATIC_CATEGORY_SUPPORT: Record<string, ProgrammaticCategorySupport> = {
  'mortgage-repayment': { hubHref: '/mortgage', guideSlugs: ['mortgage-repayment', 'mortgage-affordability'], relatedCategories: ['offset-mortgage', 'mortgage-overpayment', 'mortgage-affordability'] },
  'savings-growth': { hubHref: '/savings', guideSlugs: ['compound-interest', 'save-for-goal'], relatedCategories: ['compound-interest', 'save-for-goal', 'retirement-savings'] },
  'rent-vs-buy': { hubHref: '/rent-vs-buy', guideSlugs: ['rent-vs-buy', 'mortgage-repayment'], relatedCategories: ['mortgage-repayment', 'mortgage-affordability', 'offset-mortgage'] },
  'compound-interest': { hubHref: '/compound', guideSlugs: ['compound-interest', 'retirement-savings'], relatedCategories: ['savings-growth', 'retirement-savings', 'save-for-goal'] },
  'loan-repayment': { hubHref: '/loan', guideSlugs: ['loan-repayment', 'salary-take-home'], relatedCategories: ['mortgage-repayment', 'salary-take-home', 'save-for-goal'] },
  'retirement-savings': { hubHref: '/retirement', guideSlugs: ['retirement-savings', 'retirement-employer-contributions'], relatedCategories: ['compound-interest', 'save-for-goal', 'pension-contribution-scenarios'] },
  'offset-mortgage': { hubHref: '/offset', guideSlugs: ['offset-mortgage', 'mortgage-overpayment'], relatedCategories: ['mortgage-repayment', 'mortgage-overpayment', 'mortgage-affordability'] },
  'mortgage-overpayment': { hubHref: '/overpayment', guideSlugs: ['mortgage-overpayment', 'offset-mortgage'], relatedCategories: ['mortgage-repayment', 'offset-mortgage', 'save-for-goal'] },
  'save-for-goal': { hubHref: '/save-goal', guideSlugs: ['save-for-goal', 'emergency-fund-how-much'], relatedCategories: ['savings-growth', 'compound-interest', 'retirement-savings'] },
  'salary-take-home': { hubHref: '/take-home', guideSlugs: ['salary-take-home', 'salary-sacrifice'], relatedCategories: ['tax', 'freelance-rate', 'mortgage-affordability'] },
  'mortgage-affordability': { hubHref: '/affordability', guideSlugs: ['mortgage-affordability', 'mortgage-repayment'], relatedCategories: ['mortgage-repayment', 'offset-mortgage', 'salary-take-home'] },
  'tdee-calorie': { hubHref: '/tdee', guideSlugs: ['tdee'], relatedCategories: ['subscription-drain', 'lifestyle-inflation', 'financial-crisis'] },
  'subscription-drain': { hubHref: '/subscriptions', guideSlugs: ['subscription-drain', 'save-for-goal'], relatedCategories: ['save-for-goal', 'compound-interest', 'lifestyle-inflation'] },
  'freelance-rate': { hubHref: '/freelance', guideSlugs: ['freelance-rate', 'salary-take-home'], relatedCategories: ['salary-take-home', 'tax', 'mortgage-affordability'] },
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
  tax: { hubHref: '/take-home', guideSlugs: ['salary-take-home', 'salary-sacrifice'], relatedCategories: ['salary-take-home', 'pension-contribution-scenarios', 'freelance-rate'] },
  wealth: { hubHref: '/savings', guideSlugs: ['compound-interest', 'save-for-goal'], relatedCategories: ['investing', 'compound-interest', 'retirement-savings'] },
  loans: { hubHref: '/loan', guideSlugs: ['loan-repayment', 'mortgage-repayment'], relatedCategories: ['loan-repayment', 'mortgage-repayment', 'salary-take-home'] },
  investing: { hubHref: '/compound', guideSlugs: ['compound-interest', 'retirement-savings'], relatedCategories: ['compound-interest', 'wealth', 'retirement'] },
  retirement: { hubHref: '/retirement', guideSlugs: ['retirement-savings', 'retirement-employer-contributions'], relatedCategories: ['retirement-savings', 'pension-contribution-scenarios', 'tax'] },
  'pension-contribution-scenarios': { hubHref: '/retirement', guideSlugs: ['retirement-savings', 'retirement-employer-contributions'], relatedCategories: ['retirement-savings', 'tax', 'save-for-goal'] },
};

function titleCaseSlug(slug: string): string {
  return slug
    .replace(/^\/learn\//, '')
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function isSeoLink(link: SeoLink | null): link is SeoLink {
  return link !== null;
}

export function getGuideLabel(href: string): string {
  return GUIDE_LABELS[href] ?? titleCaseSlug(href);
}

export function getCalculatorLinksForTool(toolHref: string, limit = 4): SeoLink[] {
  const clusterKey = TOOL_TO_CLUSTER.get(toolHref);
  const cluster = clusterKey ? CLUSTERS[clusterKey] : null;
  const clusterLinks = (cluster?.calculatorHrefs ?? []).flatMap((href) => {
    if (href === toolHref) {
      return [];
    }

    const tool = getToolByHref(href);
    if (!tool) {
      return [];
    }

    return [
      {
        href,
        label: `Use the ${tool.title}`,
        description: tool.description,
      },
    ];
  });

  if (clusterLinks.length > 0) {
    return clusterLinks.slice(0, limit);
  }

  return getRelatedTools(toolHref).map((tool) => ({
    href: tool.href,
    label: `Use the ${tool.title}`,
    description: tool.description,
  }));
}

export function getGuideLinksForTool(toolHref: string, limit = 4): SeoLink[] {
  const tool = getToolByHref(toolHref);
  const clusterKey = TOOL_TO_CLUSTER.get(toolHref);
  const cluster = clusterKey ? CLUSTERS[clusterKey] : null;
  const supportLinks = (tool?.supportGuideHrefs ?? []).map((href) => ({
    href,
    label: `Read ${getGuideLabel(href)}`,
  }));
  const clusterLinks = cluster?.guideLinks ?? [];
  const dedupedLinks = [...supportLinks, ...clusterLinks].filter(
    (link, index, allLinks) => allLinks.findIndex((candidate) => candidate.href === link.href) === index,
  );

  return dedupedLinks.slice(0, limit);
}

export function getClusterSummary(toolHref: string): { title: string; intro: string } | null {
  const clusterKey = TOOL_TO_CLUSTER.get(toolHref);
  const cluster = clusterKey ? CLUSTERS[clusterKey] : null;

  if (!cluster) {
    return null;
  }

  return {
    title: cluster.title,
    intro: cluster.intro,
  };
}

export function getClusterHubLinks(toolHref: string, limit = 3): SeoLink[] {
  const clusterKey = TOOL_TO_CLUSTER.get(toolHref);
  const cluster = clusterKey ? CLUSTERS[clusterKey] : null;

  return (cluster?.hubLinks ?? []).slice(0, limit);
}

export function buildProgrammaticRelatedCalculatorLinks(categorySlug: string, limit = 4): SeoLink[] {
  const support = PROGRAMMATIC_CATEGORY_SUPPORT[categorySlug];

  if (!support) {
    return [];
  }

  const links = support.relatedCategories.flatMap((relatedCategory) => {
    const related = PROGRAMMATIC_CATEGORY_SUPPORT[relatedCategory];
    const href = related?.hubHref;
    const tool = href ? getToolByHref(href) : null;

    if (!href || !tool || href === support.hubHref) {
      return [];
    }

    return [
      {
        href,
        label: `Use the ${tool.title}`,
        description: tool.description,
      },
    ];
  });

  return links.slice(0, limit);
}

export function buildProgrammaticRelatedGuideLinks(categorySlug: string): SeoLink[] {
  const support = PROGRAMMATIC_CATEGORY_SUPPORT[categorySlug];

  if (!support) {
    return [];
  }

  return support.guideSlugs.map((slug) => {
    const href = `/learn/${slug}`;
    return {
      href,
      label: `Read ${getGuideLabel(href)}`,
    };
  });
}

export function getProgrammaticHubHref(categorySlug: string): string {
  return PROGRAMMATIC_CATEGORY_SUPPORT[categorySlug]?.hubHref ?? '/learn';
}

export function buildCalculatorBreadcrumbs(title: string, toolHref?: string): BreadcrumbItem[] {
  const tool = toolHref ? getToolByHref(toolHref) : null;

  if (!tool || tool.href === toolHref) {
    return [
      { href: '/', label: 'Home' },
      { label: title },
    ];
  }

  return [
    { href: '/', label: 'Home' },
    { href: tool.href, label: tool.title },
    { label: title },
  ];
}

export function buildGuideBreadcrumbs(title: string): BreadcrumbItem[] {
  return [
    { href: '/', label: 'Home' },
    { href: '/learn', label: 'Learning Centre' },
    { label: title },
  ];
}

export function buildInfoBreadcrumbs(title: string): BreadcrumbItem[] {
  return [
    { href: '/', label: 'Home' },
    { label: title },
  ];
}

export function getLearnHubClusters() {
  return [
    {
      key: 'mortgage',
      title: CLUSTERS.mortgage.title,
      intro: CLUSTERS.mortgage.intro,
      calculators: CLUSTERS.mortgage.calculatorHrefs
        .map((href) => getToolByHref(href))
        .filter((tool): tool is NonNullable<ReturnType<typeof getToolByHref>> => Boolean(tool))
        .map((tool) => ({ href: tool.href, label: tool.title, description: tool.description })),
      guides: CLUSTERS.mortgage.guideLinks,
      hubs: CLUSTERS.mortgage.hubLinks,
    },
    {
      key: 'savings',
      title: CLUSTERS.savings.title,
      intro: CLUSTERS.savings.intro,
      calculators: CLUSTERS.savings.calculatorHrefs
        .map((href) => getToolByHref(href))
        .filter((tool): tool is NonNullable<ReturnType<typeof getToolByHref>> => Boolean(tool))
        .map((tool) => ({ href: tool.href, label: tool.title, description: tool.description })),
      guides: CLUSTERS.savings.guideLinks,
      hubs: CLUSTERS.savings.hubLinks,
    },
    {
      key: 'income',
      title: CLUSTERS.income.title,
      intro: CLUSTERS.income.intro,
      calculators: CLUSTERS.income.calculatorHrefs
        .map((href) => getToolByHref(href))
        .filter((tool): tool is NonNullable<ReturnType<typeof getToolByHref>> => Boolean(tool))
        .map((tool) => ({ href: tool.href, label: tool.title, description: tool.description })),
      guides: CLUSTERS.income.guideLinks,
      hubs: CLUSTERS.income.hubLinks,
    },
    {
      key: 'risk',
      title: CLUSTERS.risk.title,
      intro: CLUSTERS.risk.intro,
      calculators: CLUSTERS.risk.calculatorHrefs
        .map((href) => getToolByHref(href))
        .filter((tool): tool is NonNullable<ReturnType<typeof getToolByHref>> => Boolean(tool))
        .map((tool) => ({ href: tool.href, label: tool.title, description: tool.description })),
      guides: CLUSTERS.risk.guideLinks,
      hubs: CLUSTERS.risk.hubLinks,
    },
    {
      key: 'wellbeing',
      title: CLUSTERS.wellbeing.title,
      intro: CLUSTERS.wellbeing.intro,
      calculators: CLUSTERS.wellbeing.calculatorHrefs
        .map((href) => getToolByHref(href))
        .filter((tool): tool is NonNullable<ReturnType<typeof getToolByHref>> => Boolean(tool))
        .map((tool) => ({ href: tool.href, label: tool.title, description: tool.description })),
      guides: CLUSTERS.wellbeing.guideLinks,
      hubs: CLUSTERS.wellbeing.hubLinks,
    },
    {
      key: 'property',
      title: CLUSTERS.property.title,
      intro: CLUSTERS.property.intro,
      calculators: CLUSTERS.property.calculatorHrefs
        .map((href) => getToolByHref(href))
        .filter((tool): tool is NonNullable<ReturnType<typeof getToolByHref>> => Boolean(tool))
        .map((tool) => ({ href: tool.href, label: tool.title, description: tool.description })),
      guides: CLUSTERS.property.guideLinks,
      hubs: CLUSTERS.property.hubLinks,
    },
    {
      key: 'markets',
      title: CLUSTERS.markets.title,
      intro: CLUSTERS.markets.intro,
      calculators: CLUSTERS.markets.calculatorHrefs
        .map((href) => getToolByHref(href))
        .filter((tool): tool is NonNullable<ReturnType<typeof getToolByHref>> => Boolean(tool))
        .map((tool) => ({ href: tool.href, label: tool.title, description: tool.description })),
      guides: CLUSTERS.markets.guideLinks,
      hubs: CLUSTERS.markets.hubLinks,
    },
    {
      key: 'advisory',
      title: CLUSTERS.advisory.title,
      intro: CLUSTERS.advisory.intro,
      calculators: CLUSTERS.advisory.calculatorHrefs
        .map((href) => getToolByHref(href))
        .filter((tool): tool is NonNullable<ReturnType<typeof getToolByHref>> => Boolean(tool))
        .map((tool) => ({ href: tool.href, label: tool.title, description: tool.description })),
      guides: CLUSTERS.advisory.guideLinks,
      hubs: CLUSTERS.advisory.hubLinks,
    },
  ];
}

export function getAllToolLinks(): SeoLink[] {
  return ALL_TOOLS.map((tool) => ({
    href: tool.href,
    label: tool.title,
    description: tool.description,
  }));
}
