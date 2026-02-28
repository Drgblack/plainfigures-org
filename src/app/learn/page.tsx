import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Learning Centre â€” How Financial Calculations Work â€” Plain Figures',
  description: '16 formula-first guides explaining how financial calculations work â€” mortgage, compound interest, salary, retirement, APR, TDEE, and more. No advice. Just the maths.',
};

const GUIDES = [
  {
    href: '/learn/mortgage-repayment',
    code: 'G01',
    title: 'How Mortgage Repayment Calculations Work',
    description: 'The amortisation formula explained â€” why your early payments are mostly interest, and how banks calculate what you owe each month.',
    readTime: '5 min',
    calcHref: '/mortgage',
    calcLabel: 'Mortgage Calculator',
    tags: ['Amortisation', 'Interest', 'Loan Formula'],
  },
  {
    href: '/learn/compound-interest',
    code: 'G02',
    title: 'Understanding Compound Interest',
    description: 'How compounding frequency changes your effective return â€” and why daily compounding beats annual even at the same nominal rate.',
    readTime: '4 min',
    calcHref: '/compound',
    calcLabel: 'Compound Interest Calculator',
    tags: ['EAR', 'Nominal vs Effective', 'Frequency'],
  },
  {
    href: '/learn/rent-vs-buy',
    code: 'G03',
    title: 'Rent vs Buy: The Key Numbers to Compare',
    description: 'What a fair financial comparison between renting and buying actually involves â€” including opportunity cost, equity, and the costs people forget.',
    readTime: '6 min',
    calcHref: '/rent-vs-buy',
    calcLabel: 'Rent vs Buy Calculator',
    tags: ['Opportunity Cost', 'Equity', 'Net Worth'],
  },
  {
    href: '/learn/salary-take-home',
    code: 'G04',
    title: 'How Salary Take-Home Is Calculated',
    description: 'Gross to net: how income tax, national insurance, and social contributions work in the UK, Germany, USA, France, Netherlands, and Australia.',
    readTime: '7 min',
    calcHref: '/take-home',
    calcLabel: 'Take-Home Calculator',
    tags: ['Income Tax', 'NI / Social', '6 Countries'],
  },
  {
    href: '/learn/mortgage-affordability',
    code: 'G05',
    title: 'How Mortgage Affordability Is Assessed',
    description: 'How lenders decide what you can borrow â€” income multiples, debt-to-income ratios, stress tests, and LTV thresholds explained.',
    readTime: '5 min',
    calcHref: '/affordability',
    calcLabel: 'Affordability Calculator',
    tags: ['Income Multiple', 'LTV', 'Stress Test'],
  },
  {
    href: '/learn/offset-mortgage',
    code: 'G06',
    title: 'How Offset Mortgages Actually Work',
    description: 'Why linking savings to a mortgage reduces interest â€” and the exact maths behind term reduction and interest saved.',
    readTime: '4 min',
    calcHref: '/offset',
    calcLabel: 'Offset Mortgage Calculator',
    tags: ['Offset', 'Interest Saving', 'Effective Rate'],
  },
  {
    href: '/learn/retirement-savings',
    code: 'G07',
    title: 'How Retirement Savings Projections Work',
    description: 'Future value of regular contributions, the role of inflation adjustment, and why the 4% withdrawal rule is used as a benchmark.',
    readTime: '5 min',
    calcHref: '/retirement',
    calcLabel: 'Retirement Calculator',
    tags: ['FV Formula', 'Real Returns', '4% Rule'],
  },
  {
    href: '/learn/financial-crisis',
    code: 'G08',
    title: 'How to Calculate Your Financial Runway',
    description: 'The maths behind emergency fund sufficiency â€” monthly burn rate, runway calculation, and what financial advisers mean by "3â€“6 months expenses".',
    readTime: '4 min',
    calcHref: '/crisis',
    calcLabel: 'Crisis Simulator',
    tags: ['Emergency Fund', 'Burn Rate', 'Runway'],
  },
  {
    href: '/learn/mortgage-overpayment',
    code: 'G09',
    title: 'Mortgage Overpayment: How Much Does It Save?',
    description: 'How extra payments reduce total interest and shorten the term â€” and why overpaying in year 1 saves significantly more than the same amount in year 20.',
    readTime: '5 min',
    calcHref: '/overpayment',
    calcLabel: 'Overpayment Calculator',
    tags: ['Overpayment', 'Term Reduction', 'ERC'],
  },
  {
    href: '/learn/save-for-goal',
    code: 'G10',
    title: 'Save for a Goal: Time & Amount Basics',
    description: 'How to calculate how long it takes to reach a savings target, or how much to save each month to hit a deadline. Formula, examples, and what-if scenarios.',
    readTime: '4 min',
    calcHref: '/save-goal',
    calcLabel: 'Savings Goal Calculator',
    tags: ['Savings Target', 'Timeline', 'Deposit'],
  },
  {
    href: '/learn/subscription-drain',
    code: 'G11',
    title: 'Subscription Drain: The True Long-Term Cost',
    description: 'How recurring monthly subscriptions accumulate into significant multi-year sums â€” and what the same money produces if invested instead.',
    readTime: '4 min',
    calcHref: '/subscriptions',
    calcLabel: 'Subscription Calculator',
    tags: ['Opportunity Cost', 'Recurring Costs', 'Price Increases'],
  },
  {
    href: '/learn/freelance-rate',
    code: 'G12',
    title: 'Freelance Rate: Working Backwards from Desired Salary',
    description: 'How to calculate the day rate needed to match a target take-home â€” accounting for billable days, tax, NI, pension, and overheads.',
    readTime: '5 min',
    calcHref: '/freelance',
    calcLabel: 'Freelance Rate Calculator',
    tags: ['Day Rate', 'Self-Employed', 'Utilisation'],
  },
  {
    href: '/learn/lifestyle-inflation',
    code: 'G13',
    title: 'Lifestyle Inflation: Real Cost Over Time',
    description: 'How spending that rises with income compounds into a large long-run wealth gap â€” and the maths behind two identical salaries, two different outcomes.',
    readTime: '5 min',
    calcHref: '/lifestyle-inflation',
    calcLabel: 'Lifestyle Inflation Calculator',
    tags: ['Lifestyle Creep', 'Compounding', 'Wealth Gap'],
  },
  {
    href: '/learn/business-interruption',
    code: 'G14',
    title: 'Business Interruption Sum Insured: How It Works',
    description: 'How BI insurance sums insured are calculated on a gross profit basis â€” indemnity period selection, the average clause, and under-insurance risk.',
    readTime: '5 min',
    calcHref: '/bi',
    calcLabel: 'BI Calculator',
    tags: ['Gross Profit', 'Indemnity Period', 'Average Clause'],
  },
  {
    href: '/learn/tdee',
    code: 'G15',
    title: 'TDEE & Calorie Needs: How the Calculation Works',
    description: 'How Total Daily Energy Expenditure is calculated â€” the Mifflin-St Jeor BMR formula, activity multipliers, and what the resulting numbers mean for calorie targets.',
    readTime: '5 min',
    calcHref: '/tdee',
    calcLabel: 'TDEE Calculator',
    tags: ['BMR', 'Activity Multiplier', 'Mifflin-St Jeor'],
  },
  {
    href: '/learn/loan-repayment',
    code: 'G16',
    title: 'Loan Repayment: True APR Explained',
    description: 'How monthly loan repayments are calculated, what APR actually measures versus the stated interest rate, and how fees change the true cost of borrowing.',
    readTime: '5 min',
    calcHref: '/loan',
    calcLabel: 'Loan Repayment Calculator',
    tags: ['APR', 'Amortisation', 'Flat vs Reducing'],
  },
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// ADD THESE 12 ENTRIES TO THE GUIDES ARRAY IN src/app/learn/page.tsx
// Insert after the last existing entry (G16 â€” Loan Repayment / APR).
// Each entry follows the exact same shape as existing guides.
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  {
    code: 'G17',
    href: '/learn/agentic-advisor',
    title: 'The Agentic Advisor: AI-Driven Digital Co-Workers',
    description:
      'How agentic AI executes multi-step advisory workflows autonomously â€” delegation ROI formula, task taxonomy, and audit trail requirements.',
    readTime: '6 min read',
    calcHref: '/ltv-cac',
    calcLabel: 'ROI / LTV Calculator',
    tags: ['AI', 'Automation', 'Workflows'],
  },
  {
    code: 'G18',
    href: '/learn/predictive-analytics-portfolio',
    title: 'Beyond Chatbots: Predictive Analytics for Portfolio Reviews',
    description:
      'Churn scoring with logistic regression, drift detection maths, and model evaluation metrics â€” when predictive models mislead.',
    readTime: '6 min read',
    calcHref: '/loss-probability',
    calcLabel: 'Loss Probability Model',
    tags: ['AI', 'Analytics', 'Portfolio'],
  },
  {
    code: 'G19',
    href: '/learn/automation-audit-2026',
    title: 'Automation Audit: Tasks to Delegate to AI in 2026',
    description:
      'A scoring matrix and payback formula to identify which advisory tasks deliver the highest ROI when automated â€” worked example for a 4-advisor practice.',
    readTime: '5 min read',
    calcHref: '/ltv-cac',
    calcLabel: 'ROI / LTV Calculator',
    tags: ['AI', 'Automation', 'Efficiency'],
  },
  {
    code: 'G20',
    href: '/learn/multigenerational-asset-retention',
    title: 'Multi-Generational Bridge: Retaining Assets Across Generations',
    description:
      'AUM attrition formula, three-horizon engagement framework, and retention value equation â€” quantifying the â‚¬70 trillion generational transfer challenge.',
    readTime: '6 min read',
    calcHref: '/compound',
    calcLabel: 'Compound Growth Calculator',
    tags: ['Wealth Transfer', 'Retention', 'Succession'],
  },
  {
    code: 'G21',
    href: '/learn/inheritance-pivot-heirs',
    title: 'Inheritance Pivot: Onboarding Heirs as Clients',
    description:
      'Heir LTV calculation, conversion ROI modelling, regulatory onboarding requirements under MiFID II, and heir profiling differences from the parent.',
    readTime: '6 min read',
    calcHref: '/compound',
    calcLabel: 'Compound Growth Calculator',
    tags: ['Inheritance', 'Onboarding', 'LTV'],
  },
  {
    code: 'G22',
    href: '/learn/tax-loss-harvesting',
    title: 'Tax-Loss Harvesting Strategies for Volatile Markets',
    description:
      'After-tax alpha formula, German Abgeltungsteuer mechanics, minimum harvest thresholds, and replacement security selection rules.',
    readTime: '5 min read',
    calcHref: '/take-home',
    calcLabel: 'Take-Home Pay Calculator',
    tags: ['Tax', 'Portfolio', 'Germany'],
  },
  {
    code: 'G23',
    href: '/learn/private-credit-playbook',
    title: 'Private Credit Playbook: Diversifying Beyond Equities',
    description:
      'Yield construction components, illiquidity premium calculation, allocation sizing with a liquidity adequacy test, and default scenario modelling.',
    readTime: '6 min read',
    calcHref: '/compound',
    calcLabel: 'Compound Growth Calculator',
    tags: ['Alternatives', 'Private Credit', 'Yield'],
  },
  {
    code: 'G24',
    href: '/learn/parametric-insurance-weather',
    title: 'Parametric Insurance: Instant-Payout Weather Triggers',
    description:
      'Trigger design, premium calculation, basis risk quantification â€” and when parametric cover is more appropriate than traditional indemnity insurance.',
    readTime: '5 min read',
    calcHref: '/tcor',
    calcLabel: 'Total Cost of Risk Calculator',
    tags: ['Insurance', 'Climate', 'Parametric'],
  },
  {
    code: 'G25',
    href: '/learn/cyber-resilient-agency',
    title: 'Cyber-Resilient Agency: Protecting Client Data',
    description:
      'FAIR risk model, ALE calculation, GDPR fine exposure formula, and control investment ROI â€” priority security stack for advisory firms.',
    readTime: '6 min read',
    calcHref: '/cyber',
    calcLabel: 'Cyber Risk Calculator',
    tags: ['Cyber', 'GDPR', 'Risk'],
  },
  {
    code: 'G26',
    href: '/learn/regtech-compliance-automation',
    title: 'RegTech Essentials: Automating Compliance',
    description:
      'Compliance cost baseline for a 100-client firm, automation efficiency ratios by task type, and MiFID II fine exposure calculation.',
    readTime: '6 min read',
    calcHref: '/ltv-cac',
    calcLabel: 'ROI / LTV Calculator',
    tags: ['RegTech', 'MiFID II', 'KYC'],
  },
  {
    code: 'G27',
    href: '/learn/market-forecasts-rate-cuts',
    title: 'Market Forecasts: Impact of Rate Cuts & Geopolitics',
    description:
      'Duration maths, Gordon Growth Model equity sensitivity, and a geopolitical scenario analysis framework with probability-weighted portfolio returns.',
    readTime: '6 min read',
    calcHref: '/compound',
    calcLabel: 'Compound Growth Calculator',
    tags: ['Markets', 'Rates', 'Geopolitics'],
  },
  {
    code: 'G28',
    href: '/learn/digital-client-experience-phygital',
    title: 'Digital Client Experience: Phygital Engagement Platforms',
    description:
      'NPS financial value calculation, phygital CX ROI model, digital touchpoint time savings, and adoption failure modes.',
    readTime: '5 min read',
    calcHref: '/ltv-cac',
    calcLabel: 'LTV / CAC Calculator',
    tags: ['Digital CX', 'NPS', 'Engagement'],
  },

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// PART A: 12 NEW GUIDES â€” add after G28 in src/app/learn/page.tsx
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  {
    number: 'G29',
    title: 'Financial Crisis Simulator: How Long Will Savings Last?',
    slug: 'financial-crisis-simulator',
    excerpt: 'Given your savings and monthly burn rate, how many months can you survive without income? The maths most people have never run.',
    readTime: '6 min',
    tags: ['savings', 'emergency fund', 'financial runway', 'crisis planning'],
    professional: false,
    keywords: ['financial crisis calculator', 'savings runway', 'emergency fund burn rate'],
  },
  {
    number: 'G30',
    title: 'Retirement Savings: Employer Contributions & Inflation Impact',
    slug: 'retirement-employer-contributions',
    excerpt: 'A pension projection that ignores employer contributions underestimates your pot by 30â€“50%. One that ignores inflation overestimates what it buys.',
    readTime: '7 min',
    tags: ['pension', 'retirement', 'employer contributions', 'inflation'],
    professional: false,
    keywords: ['employer pension contribution', 'inflation pension impact', 'auto enrolment rates'],
  },
  {
    number: 'G31',
    title: 'Emergency Fund: How Much Is Enough?',
    slug: 'emergency-fund-how-much',
    excerpt: 'The 3â€“6 month rule is a wide range. The right buffer depends on income stability, dependants, and fixed obligations. Here is how to find your number.',
    readTime: '5 min',
    tags: ['savings', 'emergency fund', 'financial planning'],
    professional: false,
    keywords: ['emergency fund calculator', 'how much emergency savings', 'financial buffer'],
  },
  {
    number: 'G32',
    title: 'Buy-to-Let Yield: Gross, Net, and Cash-on-Cash Return',
    slug: 'buy-to-let-yield',
    excerpt: 'Gross, net, and cash-on-cash returns can differ by 3â€“5 percentage points on the same property. Using the wrong measure produces dangerously misleading comparisons.',
    readTime: '6 min',
    tags: ['property', 'buy to let', 'rental yield', 'investment'],
    professional: false,
    keywords: ['buy to let yield calculator', 'gross net rental yield', 'cash on cash return'],
  },
  {
    number: 'G33',
    title: 'Capital Gains Tax: How the Calculation Works (2025/26)',
    slug: 'capital-gains-tax',
    excerpt: 'CGT applies when you dispose of an asset for more than you paid. The rate, exemptions, and reporting rules changed in October 2024. Here is how it works now.',
    readTime: '7 min',
    tags: ['tax', 'capital gains', 'investment', 'property'],
    professional: false,
    keywords: ['capital gains tax calculator UK', 'CGT rates 2025', 'annual CGT allowance'],
  },
  {
    number: 'G34',
    title: 'Pension Drawdown: Sustainable Withdrawal Rates Explained',
    slug: 'pension-drawdown',
    excerpt: 'Withdraw too much too early and the fund depletes. Too little leaves money unspent. The 4% rule is a starting point â€” here is what it means for UK retirees.',
    readTime: '6 min',
    tags: ['pension', 'retirement', 'drawdown', 'withdrawal rate'],
    professional: false,
    keywords: ['pension drawdown calculator', 'sustainable withdrawal rate', '4 percent rule UK'],
  },
  {
    number: 'G35',
    title: 'Salary Sacrifice: Tax and National Insurance Savings Explained',
    slug: 'salary-sacrifice',
    excerpt: 'Salary sacrifice saves 28â€“42p per Â£1 depending on your tax band â€” plus your employer saves NI too. Here is how the numbers work for pensions, EVs, and cycle to work.',
    readTime: '5 min',
    tags: ['salary', 'tax', 'pension', 'benefits', 'NI savings'],
    professional: false,
    keywords: ['salary sacrifice calculator', 'salary sacrifice tax saving', 'salary sacrifice NI'],
  },
  {
    number: 'G36',
    title: 'Student Loan Repayment: Plan 1, Plan 2, and Plan 5 Compared',
    slug: 'student-loan-repayment',
    excerpt: 'Student loans work more like a graduate tax than a debt. Whether you repay in full, partially, or never depends on your income over the loan term.',
    readTime: '6 min',
    tags: ['student loan', 'repayment', 'salary', 'tax'],
    professional: false,
    keywords: ['student loan repayment calculator', 'plan 2 vs plan 5 student loan', 'student loan write off'],
  },
  {
    number: 'G37',
    title: 'LISA vs Help to Buy ISA: When the Government Bonus Actually Helps',
    slug: 'lisa-help-to-buy',
    excerpt: 'The 25% LISA bonus sounds generous. But the withdrawal penalty, Â£450k property cap, and 12-month wait mean it is not always the right choice.',
    readTime: '5 min',
    tags: ['ISA', 'first time buyer', 'LISA', 'savings', 'property'],
    professional: false,
    keywords: ['lifetime ISA calculator', 'LISA vs help to buy ISA', 'first time buyer bonus'],
  },
  {
    number: 'G38',
    title: 'Inheritance Tax: Nil-Rate Band, Taper Relief, and How It Is Calculated',
    slug: 'inheritance-tax',
    excerpt: 'IHT affects fewer than 4% of estates â€” but rising house prices and frozen thresholds are changing that. Here is how the calculation, exemptions, and 7-year rule work.',
    readTime: '7 min',
    tags: ['inheritance tax', 'IHT', 'estate planning', 'gifting'],
    professional: false,
    keywords: ['inheritance tax calculator UK', 'nil rate band 2025', 'IHT taper relief'],
  },
  {
    number: 'G39',
    title: 'Currency Exchange: The Real Cost of FX Fees and Spread',
    slug: 'currency-exchange-fees',
    excerpt: 'Banks include a spread markup in the exchange rate â€” making "no fee" transfers misleading. The real cost on a Â£10,000 transfer can reach Â£250â€“Â£400.',
    readTime: '5 min',
    tags: ['currency', 'FX', 'international transfer', 'fees'],
    professional: false,
    keywords: ['currency exchange fee calculator', 'real cost FX fees', 'bank vs FX broker'],
  },
  {
    number: 'G40',
    title: 'Dividend Yield vs Growth Investing: Total Return Comparison',
    slug: 'dividend-vs-growth',
    excerpt: 'Dividend and growth strategies can produce identical total returns. The difference is timing, tax treatment, and cashflow profile â€” here is how to compare them properly.',
    readTime: '6 min',
    tags: ['investing', 'dividends', 'growth', 'ISA', 'total return'],
    professional: false,
    keywords: ['dividend vs growth investing', 'total return calculator', 'dividend reinvestment explained'],
  },

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// PART B: EXPANDED GUIDES â€” these replace existing entries (G02, G05)
// Update these in place in the GUIDES array by finding G02 and G05 entries
// and replacing their excerpt/keywords with the expanded versions below:
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

// G02 updated excerpt:
// 'Compounding frequency changes your effective return â€” and why the EAR differs from the nominal rate. Includes frequency comparison table, Rule of 72, and debt examples.'

// G05 updated excerpt:
// 'Lenders run income multiples, stress tests, and outgoings analysis. Understanding all three helps you predict approval, optimise your application, and know your realistic ceiling.'

];

export default function LearnIndexPage() {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 2rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '4rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: '1.5rem' }}>
          <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>PLAIN FIGURES</Link>
          <span>/</span>
          <span style={{ color: 'var(--accent)' }}>LEARNING CENTRE</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(1.8rem, 4vw, 2.75rem)', fontWeight: 300, color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1.25rem' }}>
          How the maths works.
        </h1>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '560px', fontWeight: 300, marginBottom: '1rem' }}>
          Formula-first guides explaining the calculations behind each tool. No opinions, no advice â€” just the numbers and the logic behind them.
        </p>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.04em' }}>
          Each guide links directly to the relevant calculator. Read the formula, then run your own numbers.
        </div>
      </div>

      {/* Guide list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border)', marginBottom: '3rem' }}>
        {GUIDES.map(({ href, code, title, description, readTime, calcHref, calcLabel, tags }) => (
          <Link key={href} href={href} className="calc-link">
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.06em', flexShrink: 0 }}>{code}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: 500, marginBottom: '0.3rem', letterSpacing: '-0.01em' }}>{title}</div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, fontWeight: 300, marginBottom: '0.6rem' }}>{description}</div>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)', letterSpacing: '0.04em' }}>{readTime} read</span>
                <span style={{ color: 'var(--border)', fontSize: '0.7rem' }}>Â·</span>
                {tags.map(tag => (
                  <span key={tag} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)', border: '1px solid var(--border)', borderRadius: '3px', padding: '0.12rem 0.45rem', letterSpacing: '0.04em' }}>{tag}</span>
                ))}
              </div>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: 'var(--text-muted)', flexShrink: 0 }}>â†’</div>
          </Link>
        ))}
      </div>

      {/* SEO footer note */}
      <div style={{ padding: '1.25rem 1.5rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
        These guides explain how calculations work â€” they are not financial advice. Plain Figures does not recommend any financial product, investment, or course of action. Always consult a qualified financial adviser before making decisions.
      </div>
    </div>
  );
}


