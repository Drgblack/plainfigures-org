import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Learning Centre — How Financial Calculations Work — Plain Figures',
  description: 'Formula-first guides explaining how mortgage repayments, compound interest, salary take-home, overpayments, subscriptions, freelance rates, and other financial calculations work. No advice. Just the maths.',
};

const GUIDES = [
  {
    href: '/learn/mortgage-repayment',
    code: 'G01',
    title: 'How Mortgage Repayment Calculations Work',
    description: 'The amortisation formula explained — why your early payments are mostly interest, and how banks calculate what you owe each month.',
    readTime: '5 min',
    calcHref: '/mortgage',
    calcLabel: 'Mortgage Calculator',
    tags: ['Amortisation', 'Interest', 'Loan Formula'],
  },
  {
    href: '/learn/compound-interest',
    code: 'G02',
    title: 'Understanding Compound Interest',
    description: 'How compounding frequency changes your effective return — and why daily compounding beats annual even at the same nominal rate.',
    readTime: '4 min',
    calcHref: '/compound',
    calcLabel: 'Compound Interest Calculator',
    tags: ['EAR', 'Nominal vs Effective', 'Frequency'],
  },
  {
    href: '/learn/rent-vs-buy',
    code: 'G03',
    title: 'Rent vs Buy: The Key Numbers to Compare',
    description: 'What a fair financial comparison between renting and buying actually involves — including opportunity cost, equity, and the costs people forget.',
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
    description: 'How lenders decide what you can borrow — income multiples, debt-to-income ratios, stress tests, and LTV thresholds explained.',
    readTime: '5 min',
    calcHref: '/affordability',
    calcLabel: 'Affordability Calculator',
    tags: ['Income Multiple', 'LTV', 'Stress Test'],
  },
  {
    href: '/learn/offset-mortgage',
    code: 'G06',
    title: 'How Offset Mortgages Actually Work',
    description: 'Why linking savings to a mortgage reduces interest — and the exact maths behind term reduction and interest saved.',
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
    description: 'The maths behind emergency fund sufficiency — monthly burn rate, runway calculation, and what financial advisers mean by "3–6 months expenses".',
    readTime: '4 min',
    calcHref: '/crisis',
    calcLabel: 'Crisis Simulator',
    tags: ['Emergency Fund', 'Burn Rate', 'Runway'],
  },
  {
    href: '/learn/mortgage-overpayment',
    code: 'G09',
    title: 'Mortgage Overpayment: How Much Does It Save?',
    description: 'How extra payments reduce total interest and shorten the term — and why overpaying in year 1 saves significantly more than the same amount in year 20.',
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
    description: 'How recurring monthly subscriptions accumulate into significant multi-year sums — and what the same money produces if invested instead.',
    readTime: '4 min',
    calcHref: '/subscriptions',
    calcLabel: 'Subscription Calculator',
    tags: ['Opportunity Cost', 'Recurring Costs', 'Price Increases'],
  },
  {
    href: '/learn/freelance-rate',
    code: 'G12',
    title: 'Freelance Rate: Working Backwards from Desired Salary',
    description: 'How to calculate the day rate needed to match a target take-home — accounting for billable days, tax, NI, pension, and overheads.',
    readTime: '5 min',
    calcHref: '/freelance',
    calcLabel: 'Freelance Rate Calculator',
    tags: ['Day Rate', 'Self-Employed', 'Utilisation'],
  },
  {
    href: '/learn/lifestyle-inflation',
    code: 'G13',
    title: 'Lifestyle Inflation: Real Cost Over Time',
    description: 'How spending that rises with income compounds into a large long-run wealth gap — and the maths behind two identical salaries, two different outcomes.',
    readTime: '5 min',
    calcHref: '/lifestyle-inflation',
    calcLabel: 'Lifestyle Inflation Calculator',
    tags: ['Lifestyle Creep', 'Compounding', 'Wealth Gap'],
  },
  {
    href: '/learn/business-interruption',
    code: 'G14',
    title: 'Business Interruption Sum Insured: How It Works',
    description: 'How BI insurance sums insured are calculated on a gross profit basis — indemnity period selection, the average clause, and under-insurance risk.',
    readTime: '5 min',
    calcHref: '/bi',
    calcLabel: 'BI Calculator',
    tags: ['Gross Profit', 'Indemnity Period', 'Average Clause'],
  },
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
          Formula-first guides explaining the calculations behind each tool. No opinions, no advice — just the numbers and the logic behind them.
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
                <span style={{ color: 'var(--border)', fontSize: '0.7rem' }}>·</span>
                {tags.map(tag => (
                  <span key={tag} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)', border: '1px solid var(--border)', borderRadius: '3px', padding: '0.12rem 0.45rem', letterSpacing: '0.04em' }}>{tag}</span>
                ))}
              </div>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: 'var(--text-muted)', flexShrink: 0 }}>→</div>
          </Link>
        ))}
      </div>

      {/* SEO footer note */}
      <div style={{ padding: '1.25rem 1.5rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
        These guides explain how calculations work — they are not financial advice. Plain Figures does not recommend any financial product, investment, or course of action. Always consult a qualified financial adviser before making decisions.
      </div>
    </div>
  );
}
