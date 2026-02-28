import type { Metadata } from 'next';
import GuideLayout from '@/components/layout/GuideLayout';

export const metadata: Metadata = {
  title: 'Lifestyle Inflation: The Real Long-Term Cost — Plain Figures Learning Centre',
  description: 'How lifestyle inflation (spending rising with income) compounds over time. The calculation behind the wealth gap between two identical incomes with different spending behaviours.',
};

export default function LifestyleInflationGuide() {
  return (
    <GuideLayout
      title="Lifestyle Inflation: Real Cost Over Time"
      description="How rising spending as income grows — sometimes called lifestyle creep — compounds into a significant long-run wealth gap. The maths behind two identical incomes, two different outcomes."
      readTime="5 min"
      relatedCalc={{ href: '/lifestyle-inflation', label: 'Lifestyle Inflation Calculator' }}
      relatedGuides={[
        { href: '/learn/compound-interest', label: 'Understanding Compound Interest' },
        { href: '/learn/subscription-drain', label: 'Subscription Drain: The True Long-Term Cost' },
        { href: '/learn/retirement-savings', label: 'How Retirement Savings Projections Work' },
      ]}
    >
      <div className="guide-content">
        <h2>What Lifestyle Inflation Is</h2>
        <p>
          Lifestyle inflation describes the tendency for spending to increase proportionally as income rises. A pay rise of £5,000 that is fully absorbed by higher spending — a better car, a more expensive flat, more frequent restaurants — produces no improvement in long-run financial position. The income went up; the savings rate did not.
        </p>
        <p>
          The financial cost of this pattern is not the spending itself — it is the compounding return that money would have generated if saved or invested instead.
        </p>

        <h2>The Core Calculation</h2>
        <p>
          Consider two people with identical salaries and identical pay rises, differing only in the fraction of each pay rise they save:
        </p>

        <div className="example-block">
          <div className="example-label">Setup — 20-year projection</div>
          <div className="example-row"><span>Starting salary</span><span>£35,000</span></div>
          <div className="example-row"><span>Annual pay rise</span><span>3%</span></div>
          <div className="example-row"><span>Person A: saves of each raise</span><span>80%</span></div>
          <div className="example-row"><span>Person B: saves of each raise</span><span>10%</span></div>
          <div className="example-row"><span>Investment return assumption</span><span>6% per year</span></div>
        </div>

        <p>
          In year 1, the pay rise is £35,000 × 3% = £1,050. Person A saves £840/year (£70/month) of this. Person B saves £105/year (£8.75/month). Both figures are modest — the divergence compounds over two decades.
        </p>

        <table>
          <thead>
            <tr><th>Year</th><th>Person A accumulated savings</th><th>Person B accumulated savings</th><th>Gap</th></tr>
          </thead>
          <tbody>
            <tr><td>5</td><td>~£28,000</td><td>~£3,500</td><td>~£24,500</td></tr>
            <tr><td>10</td><td>~£73,000</td><td>~£9,100</td><td>~£63,900</td></tr>
            <tr><td>15</td><td>~£142,000</td><td>~£17,800</td><td>~£124,200</td></tr>
            <tr><td>20</td><td>~£243,000</td><td>~£30,400</td><td>~£212,600</td></tr>
          </tbody>
        </table>

        <div className="key-point">
          Figures assume a 6% annual investment return on accumulated savings, with each year's new saving added at the start of that year. These are illustrative projections, not guaranteed outcomes. Tax on investment gains is not modelled.
        </div>

        <h2>Why the Gap Grows Non-Linearly</h2>
        <p>
          The gap between Person A and Person B grows faster over time than the raw saving difference would suggest. This is because Person A's earlier savings have been compounding for longer. Money saved in year 1 at 6% doubles approximately every 12 years. Each year of delay therefore loses not just one year of growth — it loses all the compounded growth that year would have generated.
        </p>

        <div className="formula-block">
          <div className="formula-label">Future Value of a Lump Sum</div>
          FV = PV × (1 + r)^t<br /><br />
          £1,000 saved at age 30 at 6%:<br />
          By age 50: £1,000 × (1.06)^20 = £3,207<br />
          By age 60: £1,000 × (1.06)^30 = £5,743<br /><br />
          The same £1,000 not saved at 30 costs £3,207–£5,743 in future value.
        </div>

        <h2>What-If: Lower Return Assumption</h2>
        <p>
          At a 4% annual return instead of 6%, Person A's 20-year total falls to approximately £192,000 and Person B's to approximately £24,000 — a gap of ~£168,000. The direction of the effect does not change; the magnitude is sensitive to return assumptions.
        </p>

        <h2>What-If: Lifestyle Inflation on Fixed Expenses vs Luxuries</h2>
        <p>
          Not all lifestyle inflation is equal. Committing to a higher rent or a larger mortgage locks in the spending increase permanently — it cannot easily be reversed. Spending increases on discretionary items (restaurants, holidays, subscriptions) are more easily adjusted. The permanent vs discretionary distinction is relevant to assessing the long-run cost of any given spending increase, though this calculator does not model that distinction.
        </p>

        <h2>Distinguishing Lifestyle Inflation from Genuine Need</h2>
        <p>
          This guide does not suggest that all spending increases as income grows are financially damaging. Moving to a safer area, buying better quality goods that last longer, or improving work-life balance through paid services may represent genuine value. The calculation simply quantifies the long-run cost of a given spending rate — the value judgement is not part of the maths.
        </p>

        <div className="warning-point">
          This guide is for general information only. The projection figures are illustrative and assume constant returns that real investments do not provide. Tax on investment gains is not modelled. This is not financial advice.
        </div>
      </div>
    </GuideLayout>
  );
}
