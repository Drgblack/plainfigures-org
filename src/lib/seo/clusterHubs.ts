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
      'Use this hub when you need the main mortgage pages grouped by job: cost, borrowing power, and buy-versus-rent comparison. It keeps the core calculator pages, deposit-planning explainers, and repayment context within a shallow crawl path instead of spreading the housing journey across separate directories.',
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
        href: '/calculators',
        label: 'Open the full calculators directory',
        description: 'Move back to the main calculator directory when the question shifts out of housing and borrowing.',
      },
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
  'savings-calculators': {
    slug: 'savings-calculators',
    title: 'Savings Calculators and Guides',
    eyebrow: 'Savings Category Hub',
    description:
      'A category hub for savings growth, savings goals, emergency funds, and recurring-cost calculators, with direct HTML links into the supporting guides that explain the underlying maths.',
    intro:
      'Use this page as the main entry point for savings decisions where the user cares about contribution pace, target balances, short-term resilience, or whether current spending habits are crowding out future flexibility. It is deliberately stronger than a flat directory and keeps the highest-intent savings pages in one crawlable cluster.',
    summary:
      'Start with savings growth when the contribution pattern is already known, move to save-for-goal when the target date or amount is fixed, and use crisis or subscription pages when the savings problem is really about resilience or recurring cash leakage.',
    calculatorHrefs: ['/savings', '/save-goal', '/crisis', '/subscriptions', '/lifestyle-inflation'],
    guideLinks: [
      {
        href: '/learn/save-for-goal',
        label: 'Read the save-for-goal guide',
        description: 'Translate a deadline and target balance into a realistic contribution plan.',
      },
      {
        href: '/learn/emergency-fund-how-much',
        label: 'Read the emergency fund guide',
        description: 'Work out the right cash buffer before choosing the growth path for the rest of your savings.',
      },
      {
        href: '/learn/subscription-drain',
        label: 'Read the subscription drain guide',
        description: 'Measure how recurring spending erodes the same savings goals this hub is designed to support.',
      },
      {
        href: '/learn/financial-crisis',
        label: 'Read the financial runway guide',
        description: 'Keep resilience planning close to the main savings calculators instead of treating it as a separate topic.',
      },
      {
        href: '/learn/lifestyle-inflation',
        label: 'Read the lifestyle inflation guide',
        description: 'Connect small spending upgrades with long-run savings drag and opportunity cost.',
      },
    ],
    relatedHubs: [
      {
        href: '/calculators',
        label: 'Open the full calculators directory',
        description: 'Return to the main calculator directory to move into mortgages, retirement, or income pages.',
      },
      {
        href: '/savings-and-compound-interest',
        label: 'Open the savings and compound hub',
        description: 'Move into the deeper compounding and retirement support hub once the core savings path is clear.',
      },
      {
        href: '/investing-calculators',
        label: 'Open the investing calculators hub',
        description: 'Use the adjacent investing hub when the savings question turns into return comparison or compounding analysis.',
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
      'This hub sits one layer below the main mortgage cluster. It is for borrowers comparing whether spare cash works harder as a permanent overpayment, a flexible offset balance, or a separate savings pot, with the surrounding guides kept close enough to support the decision without creating a separate research detour.',
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
      'This hub organises the main savings pages by question: how fast money grows, how much to contribute, how to size a target, and how to connect short-term buffers with long-term compounding. It is designed to keep both the evergreen savings formulas and the practical resilience guides inside the same crawlable cluster.',
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
        href: '/savings-calculators',
        label: 'Open the savings calculators hub',
        description: 'Return to the core savings category hub when the question is more practical than investment-oriented.',
      },
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
  'investing-calculators': {
    slug: 'investing-calculators',
    title: 'Investing and Compound Interest Calculators',
    eyebrow: 'Investing Category Hub',
    description:
      'A category hub for compound growth, future value, and long-term return planning, with supporting market and after-tax guides kept close to the core investing calculators.',
    intro:
      'This hub exists for users who are beyond simple cash saving and want to compare long-term return paths, compounding assumptions, retirement accumulation, or after-tax investing trade-offs. It keeps the strongest investing calculators and the most relevant support guides within one HTML pathway rather than making the user jump between editorial and tool directories.',
    summary:
      'Start with compound interest for rate and frequency comparisons, use savings growth when contributions are recurring, then move to retirement when the problem is long-horizon income planning rather than standalone return maths.',
    calculatorHrefs: ['/compound', '/savings', '/retirement', '/take-home'],
    guideLinks: [
      {
        href: '/learn/compound-interest',
        label: 'Read the compound interest guide',
        description: 'Understand how compounding frequency and effective rate change long-run outcomes.',
      },
      {
        href: '/learn/dividend-vs-growth',
        label: 'Read the dividend vs growth guide',
        description: 'Compare income-style and capital-growth investing inside the same long-term return cluster.',
      },
      {
        href: '/learn/tax-loss-harvesting',
        label: 'Read the tax-loss harvesting guide',
        description: 'Keep after-tax portfolio mechanics close to the core investing calculators.',
      },
      {
        href: '/learn/currency-exchange-fees',
        label: 'Read the currency exchange fees guide',
        description: 'Add cross-border transfer and FX friction to the investing decision path when needed.',
      },
      {
        href: '/learn/market-forecasts-rate-cuts',
        label: 'Read the market forecasts guide',
        description: 'Use market-context support without turning the calculator site into a prediction surface.',
      },
    ],
    relatedHubs: [
      {
        href: '/calculators',
        label: 'Open the full calculators directory',
        description: 'Return to the full calculator directory when the journey moves back into income, mortgages, or tax.',
      },
      {
        href: '/savings-and-compound-interest',
        label: 'Open the savings and compound hub',
        description: 'Use the adjacent savings hub for buffers, emergency funds, and more practical contribution questions.',
      },
      {
        href: '/investing-markets-and-fx',
        label: 'Open the investing, markets, and FX hub',
        description: 'Move into the specialist markets hub when the user needs more context around returns or FX costs.',
      },
    ],
  },
  'retirement-calculators': {
    slug: 'retirement-calculators',
    title: 'Retirement Calculators and Guides',
    eyebrow: 'Retirement Category Hub',
    description:
      'A retirement hub linking pension growth, savings accumulation, take-home pay context, and the guides that explain employer contributions, drawdown, and retirement-income assumptions.',
    intro:
      'Use this page when the question is specifically retirement rather than general saving. It keeps pension growth, contribution planning, and drawdown support within one shallow crawl path, which is useful both for users and for signalling the importance of the site’s long-horizon money pages.',
    summary:
      'Start with retirement savings when the goal is pension-pot growth, keep savings and compound calculators nearby for contribution comparisons, and use take-home pay when net-income constraints shape what can realistically be invested.',
    calculatorHrefs: ['/retirement', '/savings', '/compound', '/take-home'],
    guideLinks: [
      {
        href: '/learn/retirement-savings',
        label: 'Read the retirement savings guide',
        description: 'Understand how contributions, return assumptions, and inflation shape the long-term outcome.',
      },
      {
        href: '/learn/retirement-employer-contributions',
        label: 'Read the employer contributions guide',
        description: 'Measure how matched contributions alter the pension path before changing your own rate.',
      },
      {
        href: '/learn/pension-drawdown',
        label: 'Read the pension drawdown guide',
        description: 'Keep sustainable withdrawal questions connected to the accumulation phase rather than splitting the journey.',
      },
      {
        href: '/learn/salary-sacrifice',
        label: 'Read the salary sacrifice guide',
        description: 'Use the salary sacrifice explainer when gross-to-net tax treatment changes pension affordability.',
      },
      {
        href: '/learn/inheritance-tax',
        label: 'Read the inheritance tax guide',
        description: 'Retain estate-planning context next to retirement decisions where later transfer questions often arise.',
      },
    ],
    relatedHubs: [
      {
        href: '/calculators',
        label: 'Open the full calculators directory',
        description: 'Return to the main calculator directory when the user needs broader money pages beyond retirement.',
      },
      {
        href: '/savings-calculators',
        label: 'Open the savings calculators hub',
        description: 'Move into general savings planning when the question is still pre-retirement accumulation.',
      },
      {
        href: '/investing-calculators',
        label: 'Open the investing calculators hub',
        description: 'Use the investing hub for broader compounding and after-tax return comparisons.',
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
      'This hub is for users working backwards from income into decisions. It connects pay after tax, freelance pricing, debt cost, borrowing capacity, and the nearby property-planning explainers so the same commercial journey stays within a shallow internal-link path even when the question moves from wages into housing or tax-aware planning.',
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
        href: '/learn/human-life-value',
        label: 'Read the human life value guide',
        description: 'Keep income-replacement and protection-gap framing inside the same coverage workflow.',
      },
      {
        href: '/learn/cyber-resilient-agency',
        label: 'Read the cyber-resilience guide',
        description: 'Connect cyber exposure, control quality, and incident-cost framing to the calculator outputs.',
      },
      {
        href: '/learn/cyber-insurance-limit',
        label: 'Read the cyber limit adequacy guide',
        description: 'Support limit selection with a dedicated explainer on what adequate cyber cover is trying to capture.',
      },
      {
        href: '/learn/coverage-gap-analysis',
        label: 'Read the coverage gap analysis guide',
        description: 'Keep policy-limit comparison logic close to the calculators that surface under-insurance risk.',
      },
      {
        href: '/learn/total-cost-of-risk',
        label: 'Read the total cost of risk guide',
        description: 'Connect premiums, retained losses, and control spend back to the broader risk programme economics.',
      },
      {
        href: '/learn/risk-heatmap-explained',
        label: 'Read the risk heat map guide',
        description: 'Support register design, prioritisation, and mitigation sequencing with a dedicated explainer.',
      },
      {
        href: '/learn/loss-event-probability',
        label: 'Read the loss probability guide',
        description: 'Bring scenario-weighted expected-loss thinking into the same organiser page as the register tools.',
      },
      {
        href: '/learn/solvency-capital-requirement',
        label: 'Read the solvency capital requirement guide',
        description: 'Retain capital and solvency framing when operational risk questions move beyond simple scoring.',
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
  'property-tax-and-estate-planning': {
    slug: 'property-tax-and-estate-planning',
    title: 'Property, Tax, and Estate Planning Hub',
    eyebrow: 'Property and Estate Hub',
    description:
      'A supporting hub for buy-to-let yield, capital gains, inheritance tax, and first-time buyer saving rules, tied back to the main mortgage, savings, and retirement calculators.',
    intro:
      'This hub exists for the pages that sit between housing maths and longer-term wealth planning. It keeps property yield, tax, and estate explainers within the main site architecture instead of leaving them as isolated edge articles.',
    summary:
      'Use it when the question is not just monthly affordability but the return, tax treatment, or transfer consequences around property and longer-horizon assets.',
    calculatorHrefs: ['/rent-vs-buy', '/mortgage', '/take-home', '/retirement', '/savings'],
    guideLinks: [
      {
        href: '/learn/buy-to-let-yield',
        label: 'Read the buy-to-let yield guide',
        description: 'Keep gross, net, and cash-on-cash property return measures close to the housing decision path.',
      },
      {
        href: '/learn/capital-gains-tax',
        label: 'Read the capital gains tax guide',
        description: 'Support asset-sale and net-proceeds questions with a direct tax explainer.',
      },
      {
        href: '/learn/inheritance-tax',
        label: 'Read the inheritance tax guide',
        description: 'Keep estate thresholds, gifting timelines, and transfer-tax framing linked to retirement and wealth pages.',
      },
      {
        href: '/learn/lisa-help-to-buy',
        label: 'Read the LISA and Help to Buy ISA guide',
        description: 'Tie first-time buyer bonus rules back to deposit-building and mortgage planning.',
      },
      {
        href: '/learn/pension-drawdown',
        label: 'Read the pension drawdown guide',
        description: 'Retain the retirement-income explainer near estate and transfer questions that often follow.',
      },
    ],
    relatedHubs: [
      {
        href: '/mortgage-calculators',
        label: 'Open the mortgage calculators hub',
        description: 'Return to the core housing calculators once the property tax or yield question is clear.',
      },
      {
        href: '/income-tax-and-borrowing',
        label: 'Open the income, tax, and borrowing hub',
        description: 'Move back to salary, loan, and net-pay pages when the planning question becomes more cash-flow oriented.',
      },
    ],
  },
  'investing-markets-and-fx': {
    slug: 'investing-markets-and-fx',
    title: 'Investing, Markets, and FX Hub',
    eyebrow: 'Investing Hub',
    description:
      'A hub for investing style, market-context, FX-cost, and after-tax market guides that support compound growth and retirement journeys.',
    intro:
      'This hub gives the more specialised market and investing explainers a real home in the crawl path. It keeps them tied to compound growth, retirement, and tax-aware decision pages rather than letting them sit as disconnected editorial edges.',
    summary:
      'Use it when the user is comparing investing styles, cross-border costs, or tax-aware market mechanics rather than simply asking for a savings projection.',
    calculatorHrefs: ['/compound', '/savings', '/retirement', '/take-home', '/tcor'],
    guideLinks: [
      {
        href: '/learn/currency-exchange-fees',
        label: 'Read the currency exchange fees guide',
        description: 'Keep FX spread and transfer-cost framing close to savings and international money questions.',
      },
      {
        href: '/learn/dividend-vs-growth',
        label: 'Read the dividend vs growth guide',
        description: 'Support total-return comparisons inside the main compounding cluster.',
      },
      {
        href: '/learn/market-forecasts-rate-cuts',
        label: 'Read the market forecasts guide',
        description: 'Provide scenario-oriented market context without treating the article as a prediction surface.',
      },
      {
        href: '/learn/tax-loss-harvesting',
        label: 'Read the tax-loss harvesting guide',
        description: 'Keep after-tax portfolio mechanics linked to the broader investing and tax pathway.',
      },
      {
        href: '/learn/private-credit-playbook',
        label: 'Read the private credit guide',
        description: 'Retain one higher-yield professional investing explainer inside the same long-term return hub.',
      },
    ],
    relatedHubs: [
      {
        href: '/savings-and-compound-interest',
        label: 'Open the savings and compound hub',
        description: 'Return to the main savings calculators after using the specialist market explainers for context.',
      },
      {
        href: '/advisory-analytics-and-automation',
        label: 'Open the advisory analytics and automation hub',
        description: 'Move into the adjacent professional strategy cluster when market research overlaps with commercial or advisory workflows.',
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
    { href: '/calculators', label: 'Calculators' },
    { label: title },
  ];
}
