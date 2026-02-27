import type { Metadata } from 'next';
import GuideLayout from '@/components/layout/GuideLayout';

export const metadata: Metadata = {
  title: 'How to Calculate Your Financial Runway — Plain Figures Learning Centre',
  description: 'The maths behind emergency fund sufficiency — monthly burn rate, runway calculation, the 3–6 month rule, and how expense cuts extend your runway.',
};

export default function FinancialCrisisGuide() {
  return (
    <GuideLayout
      title="How to Calculate Your Financial Runway"
      description="The maths behind emergency fund sufficiency — monthly burn rate, runway months, the 3–6 month rule explained, and how cutting expenses extends your runway non-linearly."
      readTime="4 min"
      relatedCalc={{ href: '/crisis', label: 'Financial Crisis Simulator' }}
      relatedGuides={[
        { href: '/learn/retirement-savings', label: 'How Retirement Savings Projections Work' },
        { href: '/learn/compound-interest', label: 'Understanding Compound Interest' },
        { href: '/learn/salary-take-home', label: 'How Salary Take-Home Is Calculated' },
      ]}
    >
      <div className="guide-content">
        <h2>What "Financial Runway" Means</h2>
        <p>
          Financial runway is the number of months your liquid savings can sustain your life if your income stopped today. It's the most direct measure of financial resilience — not net worth, not total savings, but specifically how long you could survive a crisis without borrowing.
        </p>
        <p>
          The calculation is straightforward in principle but depends heavily on which costs you include and whether you model emergency cost reductions.
        </p>

        <h2>The Basic Calculation</h2>

        <div className="formula-block">
          <div className="formula-label">Basic Runway Formula</div>
          Monthly Burn Rate = Monthly Expenses − Monthly Income (during crisis)<br />
          Runway (months) = Liquid Savings ÷ Monthly Burn Rate<br /><br />
          Example: £18,000 savings, £2,800/month expenses, zero income<br />
          Monthly Burn = £2,800<br />
          Runway = £18,000 ÷ £2,800 = 6.4 months
        </div>

        <p>
          "Liquid savings" means cash or near-cash you can access within a few days — current accounts, instant-access savings, cash ISAs. It excludes pension pots (penalties and tax charges make these expensive to access early), property equity (illiquid), investments in volatile assets, or Premium Bonds with slow redemption.
        </p>

        <h2>The "3–6 Month" Rule — Where It Comes From</h2>
        <p>
          The conventional advice to hold 3–6 months of expenses as an emergency fund is a heuristic derived from average unemployment durations in developed economies. In the UK, the median time to re-employment after job loss is approximately 3–4 months. Six months covers the 75th–80th percentile of unemployment spells.
        </p>
        <p>
          The right number for any individual depends on income stability (employed vs self-employed), number of dependants, sector cyclicality, ability to cut costs quickly, and access to credit as a temporary backstop.
        </p>

        <div className="key-point">
          Self-employed people, contractors, and those in cyclical industries (construction, finance, hospitality) typically need 6–12 months. Dual-income households with stable employment may be adequately covered by 3 months.
        </div>

        <h2>How a Cost-of-Living Shock Changes the Equation</h2>
        <p>
          Financial crises don't always mean zero income — they often mean a combination of income reduction and cost increases simultaneously. Redundancy may come with reduced income (statutory redundancy pay, then benefits), while inflation or healthcare costs increase expenses.
        </p>

        <div className="example-block">
          <div className="example-label">Scenario: job loss + inflation shock (costs ×1.5)</div>
          <div className="example-row"><span>Liquid savings</span><span>£18,000</span></div>
          <div className="example-row"><span>Normal monthly expenses</span><span>£2,800</span></div>
          <div className="example-row"><span>Inflated expenses (×1.5)</span><span>£4,200</span></div>
          <div className="example-row"><span>Emergency income (benefits est.)</span><span>£700/month</span></div>
          <div className="example-row"><span>Net monthly burn</span><span>£3,500</span></div>
          <div className="example-row"><span>Runway</span><span>5.1 months (vs 6.4 at normal costs)</span></div>
        </div>

        <h2>How Expense Cuts Extend Runway Non-Linearly</h2>
        <p>
          Emergency expense cuts (cancelling subscriptions, reducing dining, deferring non-essential purchases) typically reduce monthly outgoings by 20–35% for most households. The runway extension is proportionally significant:
        </p>

        <table>
          <thead><tr><th>Expense cut</th><th>Monthly burn (from £2,800)</th><th>Runway on £18,000</th></tr></thead>
          <tbody>
            <tr><td>0% (no cuts)</td><td>£2,800</td><td>6.4 months</td></tr>
            <tr><td>15% cuts</td><td>£2,380</td><td>7.6 months (+1.2)</td></tr>
            <tr><td>25% cuts</td><td>£2,100</td><td>8.6 months (+2.2)</td></tr>
            <tr><td>35% cuts</td><td>£1,820</td><td>9.9 months (+3.5)</td></tr>
          </tbody>
        </table>

        <p>
          A 35% expense reduction extends the runway by 55% — the relationship is non-linear because the same fixed savings pool is divided by a smaller burn rate. This is why financial advisers emphasise having an identified list of cuttable expenses before a crisis, not during one.
        </p>

        <h2>What Counts as Liquid</h2>
        <ul>
          <li><strong>Include:</strong> Current accounts, instant-access savings, easy-access cash ISAs, Premium Bonds (allow 3–5 days redemption)</li>
          <li><strong>Exclude with caution:</strong> Notice accounts (30–180 day notice period), fixed-term bonds (penalties), S&amp;S ISAs (liquid but volatile — selling in a downturn crystallises losses)</li>
          <li><strong>Exclude entirely:</strong> Pension pots (55+ access; 25% tax-free, remainder taxed as income), property equity (months to access), business assets</li>
        </ul>

        <div className="warning-point">
          Using a stocks and shares ISA as an emergency fund is risky — a crisis often coincides with a market downturn, forcing you to sell assets at depressed prices. Ideally, emergency savings are in cash and kept separate from investment portfolios.
        </div>

        <h2>Beyond the Number: What the Runway Tells You</h2>
        <p>
          Runway is a risk metric, not a target. A 6-month runway doesn't mean the goal is achieved — it means there's 6 months to find a solution. The relevant questions: how long would re-employment realistically take in your sector, at your seniority level, in current market conditions? What are the minimum expenses that cannot be cut (rent, utilities, food, debt service)? Is there a credit facility (0% overdraft, credit card) that buys additional time without catastrophic cost?
        </p>
        <p>
          The Plain Figures Crisis Simulator models the burndown graphically — showing exactly when savings hit zero under different expense-cut and income-replacement scenarios. The goal is clarity before the situation arises.
        </p>
      </div>
    </GuideLayout>
  );
}
