import type { Metadata } from 'next';
import GuideLayout from '@/components/layout/GuideLayout';

export const metadata: Metadata = {
  title: 'How Mortgage Affordability Is Assessed — Plain Figures Learning Centre',
  description: 'How lenders calculate maximum borrowing — income multiples, debt-to-income ratios, stress tests, LTV thresholds, and what reduces your borrowing power.',
};

export default function AffordabilityGuide() {
  return (
    <GuideLayout
      title="How Mortgage Affordability Is Assessed"
      description="How lenders decide what you can borrow — income multiples, debt-to-income ratios, stress tests, and LTV thresholds — and what reduces your borrowing power."
      readTime="5 min"
      relatedCalc={{ href: '/affordability', label: 'Mortgage Affordability Calculator' }}
      relatedGuides={[
        { href: '/learn/mortgage-repayment', label: 'How Mortgage Repayment Calculations Work' },
        { href: '/learn/rent-vs-buy', label: 'Rent vs Buy: The Key Numbers to Compare' },
        { href: '/learn/offset-mortgage', label: 'How Offset Mortgages Actually Work' },
      ]}
    >
      <div className="guide-content">
        <h2>The Two Constraints Lenders Apply</h2>
        <p>
          Mortgage lenders apply two parallel limits and lend the lower of the two: an <strong>income multiple cap</strong> and a <strong>payment affordability check</strong>. Both must be satisfied.
        </p>

        <h2>Income Multiple</h2>
        <p>
          The most commonly cited limit. Most UK lenders cap lending at 4–4.5× gross annual income for single applicants and joint applications. Some lenders — particularly for high earners in specific professions — will lend up to 5× or 5.5×. In 2023 the Bank of England relaxed its 15% flow limit on lending above 4.5× income, but individual lenders still apply their own caps.
        </p>

        <div className="example-block">
          <div className="example-label">Income multiple examples — 4.5× cap</div>
          <div className="example-row"><span>£40,000 salary</span><span>Max loan: £180,000</span></div>
          <div className="example-row"><span>£60,000 salary</span><span>Max loan: £270,000</span></div>
          <div className="example-row"><span>£40,000 + £35,000 joint</span><span>Max loan: £337,500</span></div>
          <div className="example-row"><span>£100,000 salary</span><span>Max loan: £450,000</span></div>
        </div>

        <h2>Affordability Assessment (Payment Check)</h2>
        <p>
          Since the Mortgage Market Review (2014), lenders are required to assess whether borrowers can afford repayments — not just whether the income multiple is satisfied. This involves:
        </p>
        <ul>
          <li><strong>Net income after tax</strong> — not gross</li>
          <li><strong>Committed expenditure</strong> — existing loans, credit cards, car finance, maintenance payments</li>
          <li><strong>Living costs</strong> — either declared or estimated using statistical benchmarks</li>
          <li><strong>Remaining disposable income</strong> — must comfortably cover the mortgage payment</li>
        </ul>
        <p>
          A general rule: lenders want mortgage payments to represent no more than 35–40% of net monthly income after committed debts. This is why existing debt commitments significantly reduce borrowing power — each £100/month of existing debt typically reduces maximum mortgage by £20,000–£25,000.
        </p>

        <h2>The Stress Test</h2>
        <p>
          Following FCA guidelines, lenders must verify that borrowers could still afford payments if interest rates rose by approximately 3 percentage points above the product's initial rate. This is the standard stress test since the Bank of England revised guidance in 2022 (removing the specific 3% test as mandatory, but most lenders retained it).
        </p>

        <div className="key-point">
          A mortgage affordable at 4.5% may fail the stress test at 7.5%. This is particularly relevant for large multiples — a £400,000 mortgage at 4.5% over 25 years is £2,222/month; at 7.5% it's £2,958/month. The stress test asks: can the borrower afford £2,958?
        </div>

        <h2>Loan to Value (LTV)</h2>
        <p>
          LTV is the loan amount as a percentage of the property's value. Higher LTVs mean higher risk for the lender, which translates into:
        </p>
        <table>
          <thead><tr><th>LTV</th><th>Typical effect</th></tr></thead>
          <tbody>
            <tr><td>≤60%</td><td>Best available rates</td></tr>
            <tr><td>61–75%</td><td>Good rates</td></tr>
            <tr><td>76–85%</td><td>Higher rates, most products available</td></tr>
            <tr><td>86–90%</td><td>Significantly higher rates</td></tr>
            <tr><td>91–95%</td><td>Limited products; highest rates</td></tr>
            <tr><td>Over 95%</td><td>Very few products; government schemes often required</td></tr>
          </tbody>
        </table>

        <h2>What Reduces Borrowing Power</h2>
        <ul>
          <li>Existing debt commitments (loans, credit cards, buy now pay later)</li>
          <li>Self-employment or irregular income (lenders typically average 2–3 years of accounts)</li>
          <li>Recent credit events (missed payments, defaults, CCJs)</li>
          <li>High LTV (reduces available products and increases rate)</li>
          <li>Multiple dependants (increases estimated living costs)</li>
          <li>Bonus/commission income (often counted at only 50% or excluded entirely)</li>
        </ul>

        <div className="warning-point">
          The maximum a lender will offer and the amount that is prudent to borrow are not the same number. Borrowing at 4.5× income leaves limited headroom for rate rises, income disruption, or major expenses. Many financial planners suggest targeting 3–3.5× where possible.
        </div>
      </div>
    </GuideLayout>
  );
}
