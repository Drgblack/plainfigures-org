import type { Metadata } from 'next';
import GuideLayout from '@/components/layout/GuideLayout';

export const metadata: Metadata = {
  title: 'Save for a Goal: Time & Amount Calculations — Plain Figures Learning Centre',
  description: 'How to calculate how long it takes to reach a savings target, or how much to save each month. The formula behind savings goals — with house deposit, emergency fund, and holiday examples.',
};

export default function SaveForGoalGuide() {
  return (
    <GuideLayout
      title="Save for a Goal: Time & Amount Basics"
      description="The maths behind savings goals — how to calculate the time needed to reach a target, or the monthly saving required, with and without interest."
      readTime="4 min"
      relatedCalc={{ href: '/save-goal', label: 'Savings Goal Calculator' }}
      relatedGuides={[
        { href: '/learn/compound-interest', label: 'Understanding Compound Interest' },
        { href: '/learn/lifestyle-inflation', label: 'Lifestyle Inflation: Real Cost Over Time' },
        { href: '/learn/retirement-savings', label: 'How Retirement Savings Projections Work' },
      ]}
    >
      <div className="guide-content">
        <h2>Two Questions, One Framework</h2>
        <p>
          A savings goal calculation answers one of two questions: <strong>(1) how long will it take</strong> to reach a target at a given monthly saving rate, or <strong>(2) how much must I save each month</strong> to reach a target by a given date. The same formula rearranges to answer either.
        </p>

        <h2>Without Interest (Cash, No Return)</h2>
        <p>
          The simplest case — money accumulating in a current account or under a mattress:
        </p>

        <div className="formula-block">
          <div className="formula-label">No-Interest Savings Formulas</div>
          Time to goal: n = G ÷ M   [months]<br /><br />
          Required monthly saving: M = G ÷ n<br /><br />
          Where:<br />
          G = goal amount<br />
          M = monthly saving<br />
          n = months
        </div>

        <div className="example-block">
          <div className="example-label">Example — £5,000 emergency fund, saving £250/month (no interest)</div>
          <div className="example-row"><span>Goal (G)</span><span>£5,000</span></div>
          <div className="example-row"><span>Monthly saving (M)</span><span>£250</span></div>
          <div className="example-row"><span>Time to goal</span><span>20 months (1 year 8 months)</span></div>
        </div>

        <h2>With Interest (Savings Account or ISA)</h2>
        <p>
          When savings earn interest, the formula accounts for compound growth. Interest earned each month is added to the pot, reducing the time needed to reach the target:
        </p>

        <div className="formula-block">
          <div className="formula-label">Time to Goal Formula (with interest)</div>
          n = log(1 + (G × r) / M) ÷ log(1 + r)   [months]<br /><br />
          Where:<br />
          G = goal amount<br />
          M = monthly saving<br />
          r = monthly interest rate = annual rate ÷ 12<br />
          n = months to reach goal
        </div>

        <div className="example-block">
          <div className="example-label">Example — £25,000 house deposit, £400/month, 4.5% AER</div>
          <div className="example-row"><span>Goal (G)</span><span>£25,000</span></div>
          <div className="example-row"><span>Monthly saving (M)</span><span>£400</span></div>
          <div className="example-row"><span>Monthly rate (r)</span><span>0.375% (4.5% ÷ 12)</span></div>
          <div className="example-row"><span>Months to goal (n)</span><span>~54 months (4 years 6 months)</span></div>
          <div className="example-row"><span>Total deposited</span><span>£21,600</span></div>
          <div className="example-row"><span>Interest earned</span><span>~£3,400</span></div>
        </div>

        <h2>How Interest Rate Affects the Timeline</h2>
        <table>
          <thead>
            <tr><th>Annual rate</th><th>Monthly saving</th><th>Goal: £25,000</th><th>Months needed</th></tr>
          </thead>
          <tbody>
            <tr><td>0% (cash)</td><td>£400</td><td>£25,000</td><td>62.5 months</td></tr>
            <tr><td>2.0% AER</td><td>£400</td><td>£25,000</td><td>~59 months</td></tr>
            <tr><td>4.5% AER</td><td>£400</td><td>£25,000</td><td>~54 months</td></tr>
            <tr><td>5.5% AER</td><td>£400</td><td>£25,000</td><td>~52 months</td></tr>
          </tbody>
        </table>

        <p>
          At typical savings rates, interest materially shortens the timeline but does not transform it. The monthly saving rate remains the dominant variable for goals with horizons under 5 years.
        </p>

        <h2>What-If: Increasing the Monthly Saving</h2>
        <p>
          For the £25,000 goal at 4.5% AER, increasing the monthly saving from £400 to £600 reduces the timeline from approximately 54 months to approximately 39 months — saving 15 months. The relationship is roughly linear for modest rate changes.
        </p>

        <div className="key-point">
          For short-to-medium term goals (under 5 years), the interest rate has modest impact compared to the monthly saving amount. A higher savings rate compresses the timeline far more than chasing a marginally better interest rate.
        </div>

        <h2>Starting with a Lump Sum</h2>
        <p>
          If you already have some savings toward the goal, the formula adjusts. The existing savings (S) grow with interest while you continue adding monthly:
        </p>

        <div className="formula-block">
          <div className="formula-label">With Existing Savings (S)</div>
          Future value after n months = S × (1+r)^n + M × [(1+r)^n − 1] / r<br /><br />
          Solve for n when this equals G.
        </div>

        <div className="example-block">
          <div className="example-label">£10,000 already saved, adding £400/month at 4.5%, goal £25,000</div>
          <div className="example-row"><span>Existing savings</span><span>£10,000</span></div>
          <div className="example-row"><span>Remaining gap</span><span>£15,000</span></div>
          <div className="example-row"><span>Time to goal</span><span>~31 months (~2 years 7 months)</span></div>
        </div>

        <h2>Inflation and Real Goals</h2>
        <p>
          If the goal amount itself will rise with inflation — for example, a house deposit where property prices are increasing — the nominal target grows over time. A goal of £25,000 today at 3% annual house price inflation becomes approximately £28,200 in four years. Savings projections that assume a fixed target may understate the real gap.
        </p>
      </div>
    </GuideLayout>
  );
}
