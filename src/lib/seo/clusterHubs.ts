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
