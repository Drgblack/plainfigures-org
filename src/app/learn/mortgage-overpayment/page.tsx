import type { Metadata } from 'next';
import GuideLayout from '@/components/layout/GuideLayout';

export const metadata: Metadata = {
  title: 'Mortgage Overpayment: How Much Does It Save? — Plain Figures Learning Centre',
  description: 'How extra mortgage payments reduce interest and shorten the term. The amortisation maths behind overpayments, what early vs late overpayments do differently, and break-even vs investing.',
};

export default function MortgageOverpaymentGuide() {
  return (
    <GuideLayout
      title="Mortgage Overpayment: How Much Does It Save?"
      description="How extra payments reduce interest and shorten your term — and why the same overpayment made in year 1 saves significantly more than the same amount made in year 20."
      readTime="5 min"
      relatedCalc={{ href: '/overpayment', label: 'Overpayment Calculator' }}
      relatedGuides={[
        { href: '/learn/mortgage-repayment', label: 'How Mortgage Repayment Calculations Work' },
        { href: '/learn/offset-mortgage', label: 'How Offset Mortgages Actually Work' },
        { href: '/learn/mortgage-affordability', label: 'How Mortgage Affordability Is Assessed' },
      ]}
    >
      <div className="guide-content">
        <h2>How Overpayments Actually Work</h2>
        <p>
          When you make an overpayment, lenders typically apply the extra amount directly to the outstanding principal. This reduces the balance on which next month's interest is calculated. Lower interest means more of each subsequent standard payment reduces the principal — which reduces the interest the month after that. The effect compounds forward through every remaining payment.
        </p>
        <p>
          This is why overpaying early in a mortgage term produces a disproportionately large saving: you are eliminating principal that would otherwise have attracted interest for decades.
        </p>

        <div className="formula-block">
          <div className="formula-label">Monthly Interest Calculation</div>
          Interest this month = Outstanding balance × (Annual rate ÷ 12)<br /><br />
          After an overpayment of X:<br />
          New balance = Previous balance − Regular principal reduction − X<br />
          Next month's interest = New balance × monthly rate
        </div>

        <h2>Worked Example — £200,000 at 4.5%, 25 Years</h2>

        <div className="example-block">
          <div className="example-label">Standard repayment vs +£200/month overpayment</div>
          <div className="example-row"><span>Standard monthly payment</span><span>£1,111</span></div>
          <div className="example-row"><span>Overpayment monthly payment</span><span>£1,311</span></div>
          <div className="example-row"><span>Standard total paid (25 yrs)</span><span>£333,300</span></div>
          <div className="example-row"><span>Overpayment total paid (est.)</span><span>~£290,500</span></div>
          <div className="example-row"><span>Interest saved</span><span>~£42,800</span></div>
          <div className="example-row"><span>Term reduction</span><span>~5 years</span></div>
        </div>

        <h2>Early vs Late: Why Timing Matters</h2>
        <p>
          The interest saving from an overpayment depends on how many months remain when it is made. A £10,000 lump sum paid in year 1 of a 25-year mortgage will save significantly more total interest than the same £10,000 paid in year 20 — because in year 1, that £10,000 would have attracted interest for 24 more years, whereas in year 20 it only attracts interest for 5 more years.
        </p>

        <table>
          <thead>
            <tr><th>Year of lump sum (£10,000)</th><th>Approx. interest saved</th><th>Approx. term reduction</th></tr>
          </thead>
          <tbody>
            <tr><td>Year 1</td><td>~£15,000–£18,000</td><td>~1.5–2 years</td></tr>
            <tr><td>Year 5</td><td>~£11,000–£13,000</td><td>~1.2–1.5 years</td></tr>
            <tr><td>Year 10</td><td>~£7,000–£9,000</td><td>~1 year</td></tr>
            <tr><td>Year 20</td><td>~£1,500–£2,500</td><td>~3–4 months</td></tr>
          </tbody>
        </table>

        <div className="key-point">
          Figures above are illustrative for a £200,000 mortgage at 4.5%. Exact savings depend on the lender's calculation method and any fees. Use the overpayment calculator to model your specific mortgage.
        </div>

        <h2>Regular Monthly Overpayments vs Lump Sums</h2>
        <p>
          Both approaches reduce total interest, but they work slightly differently. Regular monthly overpayments reduce the balance incrementally each month, with each small reduction feeding into lower interest the following month. A lump sum creates a larger immediate step-down in the balance.
        </p>
        <p>
          For the same total extra money paid, a lump sum paid today saves more than the equivalent amount paid monthly over a year — because the full lump sum starts reducing interest immediately. The difference is modest at low rates but grows with rate.
        </p>

        <h2>Early Repayment Charges</h2>
        <p>
          Most fixed-rate mortgages allow overpayments of up to <strong>10% of the outstanding balance per calendar year</strong> without penalty. Exceeding this threshold during a fixed-rate period typically triggers an Early Repayment Charge (ERC) — usually 1–5% of the amount overpaid above the limit. ERCs generally expire when the fixed period ends.
        </p>

        <div className="warning-point">
          Always check your mortgage terms before overpaying. If you are within a fixed-rate period, confirm the annual overpayment allowance. ERCs can easily exceed the interest saved if the lump sum is large enough.
        </div>

        <h2>Overpayment vs Investing the Difference</h2>
        <p>
          Whether overpaying a mortgage or investing produces a better financial outcome depends on: the mortgage interest rate, expected investment return, tax treatment of investment gains, and individual risk tolerance. The mortgage saving is guaranteed and tax-free (it reduces interest, not earnings). Investment returns are variable and may be subject to capital gains or income tax.
        </p>
        <p>
          At mortgage rates below expected investment returns (after tax), the investment case is mathematically stronger. At mortgage rates above expected after-tax returns, overpaying is the higher-certainty outcome. This is a comparison of figures — not a recommendation either way.
        </p>

        <table>
          <thead>
            <tr><th>Scenario</th><th>£200/month over 20 years</th><th>Result</th></tr>
          </thead>
          <tbody>
            <tr><td>Overpay mortgage (4.5%)</td><td>Guaranteed 4.5% effective return</td><td>~£42,800 interest saved</td></tr>
            <tr><td>Invest at 6% gross</td><td>Variable, pre-tax</td><td>~£92,400 future value</td></tr>
            <tr><td>Invest at 4% gross</td><td>Variable, pre-tax</td><td>~£73,600 future value</td></tr>
          </tbody>
        </table>

        <p>
          Investment returns above are future values, not net gains. Tax, charges, and return variability are not modelled. The overpayment saving is the net interest reduction — certain and immediate.
        </p>
      </div>
    </GuideLayout>
  );
}
