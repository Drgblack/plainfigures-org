import { getToolByHref } from '@/lib/siteData';
import { getGuideLabel, type BreadcrumbItem, type SeoLink } from '@/lib/seo/relatedLinks';

export type ClusterHubDefinition = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  intro: string;
  summary: string;
  calculatorHrefs: string[];
  guideLinks: SeoLink[];
  relatedHubs: SeoLink[];
};

type ClusterHubConfig = Omit<ClusterHubDefinition, 'guideLinks'> & {
  guideLinks: Array<SeoLink & { href: string }>;
};

const HUBS: Record<string, ClusterHubConfig> = {
  'mortgage-calculators': {
    slug: 'mortgage-calculators',
    title: 'Mortgage Calculators and Guides',
    eyebrow: 'Mortgage Hub',
    description:
      'A focused mortgage hub linking repayment, affordability, rent-vs-buy, and the supporting guides that explain how the core borrowing maths works.',
    intro:
      'Use this hub when you need the main mortgage pages grouped by job: cost, borrowing power, and buy-versus-rent comparison. It keeps the core calculator pages and the supporting explainers within a shallow crawl path.',
    summary:
      'Start with repayment if you already know the loan size, move to affordability if you are setting a budget ceiling, then use rent vs buy when the question is tenure rather than monthly cost.',
    calculatorHrefs: ['/mortgage', '/affordability', '/rent-vs-buy', '/loan'],
    guideLinks: [
      {
        href: '/learn/mortgage-repayment',
        label: 'Read how mortgage repayment calculations work',
        description: 'Break down amortisation, monthly payments, and why early years are interest-heavy.',
      },
      {
        href: '/learn/mortgage-affordability',
        label: 'Read how mortgage affordability is assessed',
        description: 'See how income multiples, outgoings, and stress testing shape borrowing ceilings.',
      },
      {
        href: '/learn/rent-vs-buy',
        label: 'Read the rent vs buy comparison guide',
        description: 'Use the break-even framework when the housing question is tenure rather than loan size.',
      },
      {
        href: '/learn/loan-repayment',
        label: 'Read the loan repayment explainer',
        description: 'Compare mortgage-style amortisation with shorter-term borrowing and APR logic.',
      },
      {
        href: '/learn/lisa-help-to-buy',
        label: 'Read the LISA vs Help to Buy ISA guide',
        description: 'Keep deposit-bonus and first-time buyer saving rules close to the housing calculator path.',
      },
    ],
    relatedHubs: [
      {
        href: '/overpayment-and-offset',
        label: 'Open the overpayment and offset hub',
        description: 'Move deeper into mortgage interest-reduction options once the core payment is clear.',
      },
      {
        href: '/savings-and-compound-interest',
        label: 'Open the savings and compound hub',
        description: 'Compare deposit-building and cash-buffer paths against borrowing decisions.',
      },
    ],
  },
  'overpayment-and-offset': {
    slug: 'overpayment-and-offset',
    title: 'Overpayment and Offset Mortgage Hub',
    eyebrow: 'Mortgage Strategy Hub',
    description:
      'A sub-hub for overpayment, offset, and linked savings decisions, with direct paths into the calculators and guides that explain each interest-saving method.',
    intro:
      'This hub sits one layer below the main mortgage cluster. It is for borrowers comparing whether spare cash works harder as a permanent overpayment, a flexible offset balance, or a separate savings pot.',
    summary:
      'Use overpayment when reducing term and interest is the priority. Use offset when liquidity matters. Keep a savings comparison nearby so the cash alternative stays visible.',
    calculatorHrefs: ['/overpayment', '/offset', '/savings', '/save-goal'],
    guideLinks: [
      {
        href: '/learn/mortgage-overpayment',
        label: 'Read the mortgage overpayment guide',
        description: 'See how extra monthly payments change term length and lifetime interest.',
      },
      {
        href: '/learn/offset-mortgage',
        label: 'Read how offset mortgages actually work',
        description: 'Understand how linked savings reduce charged interest while keeping access to cash.',
      },
      {
        href: '/learn/save-for-goal',
        label: 'Read the savings-goal guide',
        description: 'Use a deadline-based savings framework when the money should stay ring-fenced.',
      },
      {
        href: '/learn/compound-interest',
        label: 'Read the compound interest explainer',
        description: 'Compare mortgage interest saved with investment or savings growth over the same period.',
      },
    ],
    relatedHubs: [
      {
        href: '/mortgage-calculators',
        label: 'Return to the main mortgage hub',
        description: 'Go back to repayment, affordability, and rent-vs-buy comparisons.',
      },
      {
        href: '/savings-and-compound-interest',
        label: 'Open the savings and compound hub',
        description: 'Keep the cash-allocation decision anchored to savings growth and emergency-fund trade-offs.',
      },
    ],
  },
  'savings-and-compound-interest': {
    slug: 'savings-and-compound-interest',
    title: 'Savings and Compound Interest Hub',
    eyebrow: 'Savings Hub',
    description:
      'A savings cluster hub linking growth, compounding, goal planning, retirement projections, and cash-buffer guides for high-intent saving journeys.',
    intro:
      'This hub organises the main savings pages by question: how fast money grows, how much to contribute, how to size a target, and how to connect short-term buffers with long-term compounding.',
    summary:
      'Start with savings growth for recurring contributions, move to compound interest for rate and frequency comparisons, then branch into goal timelines, retirement projections, or emergency-fund sizing.',
    calculatorHrefs: ['/savings', '/compound', '/save-goal', '/retirement', '/crisis', '/subscriptions'],
    guideLinks: [
      {
        href: '/learn/compound-interest',
        label: 'Read the compound interest guide',
        description: 'Understand nominal versus effective rate and why frequency changes the outcome.',
      },
      {
        href: '/learn/save-for-goal',
        label: 'Read the savings-goal guide',
        description: 'Translate a target balance and deadline into a monthly contribution plan.',
      },
      {
        href: '/learn/retirement-savings',
        label: 'Read the retirement savings guide',
        description: 'Connect recurring saving with inflation, employer contributions, and real-value framing.',
      },
      {
        href: '/learn/emergency-fund-how-much',
        label: 'Read the emergency fund guide',
        description: 'Size the buffer that supports the rest of the savings plan without relying on rules of thumb.',
      },
      {
        href: '/learn/pension-drawdown',
        label: 'Read the pension drawdown guide',
        description: 'Connect retirement-pot growth to sustainable withdrawal decisions later in the journey.',
      },
      {
        href: '/learn/retirement-employer-contributions',
        label: 'Read the employer contribution guide',
        description: 'Show how matched contributions and inflation alter long-horizon savings projections.',
      },
      {
        href: '/learn/dividend-vs-growth',
        label: 'Read the dividend vs growth guide',
        description: 'Compare income-style and total-return style investing within the same long-term compounding cluster.',
      },
    ],
    relatedHubs: [
      {
        href: '/mortgage-calculators',
        label: 'Open the main mortgage hub',
        description: 'Compare cash-saving decisions with repayment and affordability trade-offs.',
      },
      {
        href: '/overpayment-and-offset',
        label: 'Open the overpayment and offset hub',
        description: 'Use it when the savings question is really about mortgage interest reduction.',
      },
    ],
  },
  'income-tax-and-borrowing': {
    slug: 'income-tax-and-borrowing',
    title: 'Income, Tax, and Borrowing Hub',
    eyebrow: 'Income Hub',
    description:
      'A focused hub for salary take-home, freelance rate, loan repayment, and affordability pages, plus the guides that explain how gross-to-net and borrowing maths connect.',
    intro:
      'This hub is for users working backwards from income into decisions. It connects pay after tax, freelance pricing, debt cost, and borrowing capacity so the same commercial journey stays within a shallow internal-link path.',
    summary:
      'Start with take-home pay when gross income is the known input, move to freelance rate if you need to reverse-engineer pricing, then use loan and affordability pages when the question shifts into repayment or borrowing capacity.',
    calculatorHrefs: ['/take-home', '/freelance', '/loan', '/affordability', '/retirement'],
    guideLinks: [
      {
        href: '/learn/salary-take-home',
        label: 'Read how salary take-home is calculated',
        description: 'Break down gross pay into tax, social contributions, and net income across the main salary markets on the site.',
      },
      {
        href: '/learn/salary-sacrifice',
        label: 'Read the salary sacrifice guide',
        description: 'Use the guide when pension and benefit deductions change the net-pay path.',
      },
      {
        href: '/learn/freelance-rate',
        label: 'Read the freelance rate guide',
        description: 'Convert a target salary into a workable day rate once billable time and overheads are visible.',
      },
      {
        href: '/learn/loan-repayment',
        label: 'Read the loan repayment guide',
        description: 'Compare APR, repayment schedules, and total borrowing cost before committing to consumer debt.',
      },
      {
        href: '/learn/student-loan-repayment',
        label: 'Read the student loan repayment guide',
        description: 'Keep graduate deductions in the income model when take-home and affordability are both sensitive to plan type.',
      },
      {
        href: '/learn/capital-gains-tax',
        label: 'Read the capital gains tax guide',
        description: 'Keep current-year tax mechanics close to salary and net-income journeys where disposal proceeds matter.',
      },
    ],
    relatedHubs: [
      {
        href: '/mortgage-calculators',
        label: 'Open the mortgage calculators hub',
        description: 'Move into repayment and housing comparisons once income has been translated into borrowing power.',
      },
      {
        href: '/savings-and-compound-interest',
        label: 'Open the savings and compound hub',
        description: 'Shift from income into saving, emergency-fund sizing, and long-term compounding without leaving the main finance architecture.',
      },
    ],
  },
  'risk-management-and-coverage': {
    slug: 'risk-management-and-coverage',
    title: 'Risk Management and Coverage Hub',
    eyebrow: 'Risk Hub',
    description:
      'A professional hub for exposure sizing, coverage adequacy, cyber limits, capital, and risk-register workflows, with direct links into the calculators and explainers that support each step.',
    intro:
      'This hub groups the core professional risk pages by job: identify the exposure, map it to limits, compare retained cost, and pressure-test controls. It is meant to keep the strongest commercial and operational pages within a shallow crawl path.',
    summary:
      'Start with exposure or register tools when the problem is measurement, move into coverage-gap or cyber-limit pages when the question is adequacy, and use TCOR or SCR when the work shifts into aggregate cost or capital framing.',
    calculatorHrefs: ['/cyber', '/cyber-limit', '/coverage-gap', '/risk-heatmap', '/tcor', '/scr', '/hlv', '/loss-probability'],
    guideLinks: [
      {
        href: '/learn/business-interruption',
        label: 'Read the business interruption guide',
        description: 'Anchor sum-insured logic and indemnity-period assumptions before comparing broader coverage gaps.',
      },
      {
        href: '/learn/cyber-resilient-agency',
        label: 'Read the cyber-resilience guide',
        description: 'Connect cyber exposure, control quality, and incident-cost framing to the calculator outputs.',
      },
      {
        href: '/learn/regtech-compliance-automation',
        label: 'Read the RegTech automation guide',
        description: 'Keep compliance-cost and control-efficiency thinking close to the operational risk toolset.',
      },
      {
        href: '/learn/parametric-insurance-weather',
        label: 'Read the parametric insurance guide',
        description: 'Broaden the protection cluster with trigger design and basis-risk framing where alternative structures matter.',
      },
      {
        href: '/learn/private-credit-playbook',
        label: 'Read the private credit guide',
        description: 'Keep portfolio-risk and yield-construction context linked from the broader professional research cluster.',
      },
    ],
    relatedHubs: [
      {
        href: '/advisory-analytics-and-automation',
        label: 'Open the advisory analytics and automation hub',
        description: 'Move into adjacent professional guides covering automation, client workflows, and growth economics.',
      },
      {
        href: '/income-tax-and-borrowing',
        label: 'Open the income, tax, and borrowing hub',
        description: 'Return to the main personal-finance commercial cluster when risk work overlaps with borrowing or cash-flow decisions.',
      },
    ],
  },
  'advisory-analytics-and-automation': {
    slug: 'advisory-analytics-and-automation',
    title: 'Advisory Analytics and Automation Hub',
    eyebrow: 'Professional Strategy Hub',
    description:
      'A hub for advisory automation, predictive analytics, client-experience, and commercial-efficiency guides that support the professional side of Plain Figures.',
    intro:
      'This organiser page exists for the weaker professional guides that do not fit neatly inside pure protection or tax clusters. It keeps operational, automation, and client-economics content linked to the nearby tools instead of leaving those guides semi-orphaned.',
    summary:
      'Use this hub when the question is workflow efficiency, client economics, analytics, or automation rather than a single risk metric. It complements the harder coverage tools without diluting them.',
    calculatorHrefs: ['/ltv-cac', '/loss-probability', '/cyber', '/tcor'],
    guideLinks: [
      {
        href: '/learn/agentic-advisor',
        label: 'Read the agentic advisor guide',
        description: 'Frame AI task delegation as a measurable workflow and ROI problem rather than a generic trend story.',
      },
      {
        href: '/learn/automation-audit-2026',
        label: 'Read the automation audit guide',
        description: 'Map advisory tasks into automation candidates and payback logic for current-year operations.',
      },
      {
        href: '/learn/predictive-analytics-portfolio',
        label: 'Read the predictive analytics guide',
        description: 'Keep churn, scoring, and portfolio-review model logic attached to the professional toolset.',
      },
      {
        href: '/learn/digital-client-experience-phygital',
        label: 'Read the digital client experience guide',
        description: 'Connect adoption, NPS, and service-delivery economics to the broader advisory cluster.',
      },
      {
        href: '/learn/inheritance-pivot-heirs',
        label: 'Read the inheritance pivot guide',
        description: 'Keep wealth-transfer client economics and onboarding logic attached to the adjacent commercial tools.',
      },
      {
        href: '/learn/multigenerational-asset-retention',
        label: 'Read the multi-generational asset retention guide',
        description: 'Support longer-horizon client-value modelling with a dedicated wealth-retention explainer.',
      },
    ],
    relatedHubs: [
      {
        href: '/risk-management-and-coverage',
        label: 'Open the risk management and coverage hub',
        description: 'Move back into exposure, limits, and coverage workflows when the operational question becomes a risk question.',
      },
      {
        href: '/savings-and-compound-interest',
        label: 'Open the savings and compound hub',
        description: 'Return to the main personal-wealth cluster when professional research overlaps with retirement or investment framing.',
      },
    ],
  },
  'lifestyle-and-runway': {
    slug: 'lifestyle-and-runway',
    title: 'Lifestyle and Runway Hub',
    eyebrow: 'Cashflow Hub',
    description:
      'A compact hub for recurring-cost, lifestyle inflation, financial-runway, and TDEE-adjacent pages that support day-to-day budgeting and resilience questions.',
    intro:
      'This hub keeps smaller but still useful support topics from drifting into isolation. It groups recurring spend, runway resilience, and lifestyle-pressure pages so users can move through those decisions without falling back to the homepage directory.',
    summary:
      'Use it when the problem is not a mortgage or investment decision but a question about recurring costs, emergency endurance, or whether current habits are crowding out future flexibility.',
    calculatorHrefs: ['/subscriptions', '/lifestyle-inflation', '/crisis', '/tdee'],
    guideLinks: [
      {
        href: '/learn/subscription-drain',
        label: 'Read the subscription drain guide',
        description: 'See how recurring monthly spend turns into long-run direct cost and opportunity cost.',
      },
      {
        href: '/learn/lifestyle-inflation',
        label: 'Read the lifestyle inflation guide',
        description: 'Compare current spending against earlier baselines and surface the long-run wealth trade-off.',
      },
      {
        href: '/learn/financial-crisis',
        label: 'Read the financial runway guide',
        description: 'Work through cash burn, emergency reserves, and survival timelines under income stress.',
      },
      {
        href: '/learn/financial-crisis-simulator',
        label: 'Read the savings-last guide',
        description: 'Keep the specific survival-timeline explainer close to the main crisis calculator journey.',
      },
      {
        href: '/learn/tdee',
        label: 'Read the TDEE guide',
        description: 'Retain the explanatory calorie-estimation page within the same lightweight support cluster.',
      },
    ],
    relatedHubs: [
      {
        href: '/savings-and-compound-interest',
        label: 'Open the savings and compound hub',
        description: 'Move into goal saving, compounding, and emergency-fund planning once the recurring-cost question becomes a savings question.',
      },
      {
        href: '/income-tax-and-borrowing',
        label: 'Open the income, tax, and borrowing hub',
        description: 'Return to take-home and affordability pages when lifestyle pressure is really an income-allocation problem.',
      },
    ],
  },
};

function toolLink(href: string): SeoLink | null {
  const tool = getToolByHref(href);

  if (!tool) {
    return null;
  }

  return {
    href,
    label: `Use the ${tool.title}`,
    description: tool.description,
  };
}

function isSeoLink(link: SeoLink | null): link is SeoLink {
  return link !== null;
}

export function getClusterHub(slug: string): ClusterHubDefinition | null {
  const hub = HUBS[slug];

  if (!hub) {
    return null;
  }

  return {
    ...hub,
    guideLinks: hub.guideLinks.map((guide) => ({
      ...guide,
      label: guide.label || `Read ${getGuideLabel(guide.href)}`,
    })),
  };
}

export function getAllClusterHubs(): ClusterHubDefinition[] {
  return Object.values(HUBS).map((hub) => ({
    ...hub,
    guideLinks: hub.guideLinks.map((guide) => ({
      ...guide,
      label: guide.label || `Read ${getGuideLabel(guide.href)}`,
    })),
  }));
}

export function getCalculatorLinksForClusterHub(slug: string): SeoLink[] {
  const hub = HUBS[slug];

  if (!hub) {
    return [];
  }

  return hub.calculatorHrefs.map(toolLink).filter(isSeoLink);
}

export function buildClusterHubBreadcrumbs(title: string): BreadcrumbItem[] {
  return [
    { href: '/', label: 'Home' },
    { href: '/learn', label: 'Learning Centre' },
    { label: title },
  ];
}
