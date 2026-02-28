import type { Metadata } from 'next';
import GuideLayout from '@/components/layout/GuideLayout';

export const metadata: Metadata = {
  title: 'How Mortgage Affordability Is Calculated UK 2026 — Plain Figures',
  description: 'How UK lenders calculate maximum mortgage borrowing in 2026 — income multiples, affordability stress tests, LTV bands, and what reduces borrowing power. With worked examples.',
};

export default function AffordabilityGuide() {
  return (
    <GuideLayout
      title="How Mortgage Affordability Is Assessed"
      description="How lenders calculate what you can borrow — income multiples, payment affordability checks, stress tests, and LTV thresholds — with worked examples and what-if scenarios."
      readTime="6 min"
      relatedCalc={{ href: '/affordability', label: 'Mortgage Affordability Calculator' }}
      relatedGuides={[
        { href: '/learn/mortgage-repayment', label: 'How Mortgage Repayment Calculations Work' },
        { href: '/learn/mortgage-overpayment', label: 'Mortgage Overpayment: How Much Does It Save?' },
        { href: '/learn/rent-vs-buy', label: 'Rent vs Buy: The Key Numbers to Compare' },
      ]}
    >
      <div className="guide-content">
        <h2>The Two Constraints Lenders Apply</h2>
        <p>
          Mortgage lenders apply two parallel limits and lend the lower of the two: an <strong>income multiple cap</strong> and a <strong>payment affordability check</strong>. Both must be satisfied. A borrower who passes the income multiple test may still be declined if the affordability assessment finds insufficient disposable income after existing commitments.
        </p>

        <h2>Income Multiple</h2>
        <p>
          The most commonly cited limit. Most UK lenders cap lending at 4–4.5× gross annual income for single applicants and joint applications. Some lenders — particularly for high earners in specific professions or for first-time buyers using specific schemes — will lend up to 5× or 5.5×.
        </p>

        <div className="example-block">
          <div className="example-label">Income multiple examples — 4.5× cap</div>
          <div className="example-row"><span>£35,000 salary</span><span>Max loan: £157,500</span></div>
          <div className="example-row"><span>£50,000 salary</span><span>Max loan: £225,000</span></div>
          <div className="example-row"><span>£70,000 salary</span><span>Max loan: £315,000</span></div>
          <div className="example-row"><span>£40,000 + £35,000 joint</span><span>Max loan: £337,500</span></div>
          <div className="example-row"><span>£100,000 salary</span><span>Max loan: £450,000–£550,000 (lender-dependent)</span></div>
        </div>

        <h2>Affordability Assessment (Payment Check)</h2>
        <p>
          Since the Mortgage Market Review (2014), lenders are required to assess whether borrowers can afford repayments — not just whether the income multiple is satisfied. This involves:
        </p>
        <ul>
          <li><strong>Net income after tax</strong> — not gross</li>
          <li><strong>Committed expenditure</strong> — existing loans, credit cards, car finance, maintenance payments</li>
          <li><strong>Living costs</strong> — either declared or estimated using statistical benchmarks (ONS expenditure data)</li>
          <li><strong>Remaining disposable income</strong> — must comfortably cover the mortgage payment</li>
        </ul>
        <p>
          A general rule: lenders want mortgage payments to represent no more than 35–40% of net monthly income after committed debts. This is why existing debt commitments significantly reduce borrowing power — each £100/month of existing debt typically reduces maximum mortgage by £20,000–£25,000.
        </p>

        <h2>The Stress Test</h2>
        <p>
          Following FCA guidelines, lenders verify that borrowers could still afford payments if interest rates rose substantially above the product's initial rate. Most lenders apply a stress rate of approximately 3 percentage points above their reversion (standard variable) rate.
        </p>

        <div className="formula-block">
          <div className="formula-label">Stress Test — Worked Example</div>
          Mortgage: £250,000, 25-year term<br /><br />
          At 4.5% (contract rate):&nbsp;&nbsp; monthly payment = £1,389<br />
          At 7.5% (stress rate):&nbsp;&nbsp;&nbsp;&nbsp; monthly payment = £1,848<br /><br />
          The lender asks: can this borrower afford £1,848/month?<br />
          If net income after debts and living costs leaves less than this,<br />
          the loan may be declined or offered at a lower amount.
        </div>

        <h2>Loan to Value (LTV)</h2>
        <p>
          LTV is the loan amount as a percentage of the property value. Higher LTVs mean higher risk for the lender, which affects product availability and rates:
        </p>
        <table>
          <thead><tr><th>LTV</th><th>Typical rate effect</th><th>Product availability</th></tr></thead>
          <tbody>
            <tr><td>≤60%</td><td>Best available rates</td><td>Widest choice</td></tr>
            <tr><td>61–75%</td><td>Good rates</td><td>Full market</td></tr>
            <tr><td>76–85%</td><td>Moderately higher rates</td><td>Most products</td></tr>
            <tr><td>86–90%</td><td>Significantly higher rates</td><td>Narrower choice</td></tr>
            <tr><td>91–95%</td><td>Highest rates</td><td>Limited; government schemes often used</td></tr>
          </tbody>
        </table>

        <h2>What-If Scenarios</h2>

        <h3>What if existing debt is cleared before applying?</h3>
        <p>
          A borrower with £350/month in car finance commitments has their disposable income reduced by that amount in the affordability assessment. At a stress rate of 7.5% over 25 years, each £100/month of supportable repayment capacity corresponds to approximately £13,500 in loan. Clearing £350/month of commitments before applying could increase borrowing capacity by approximately <strong>£47,000</strong> — significantly more than the remaining car finance balance in many cases.
        </p>

        <h3>What if the applicant is self-employed?</h3>
        <p>
          Lenders typically require 2–3 years of self-employed accounts. Income is assessed on the lower of: average of the last 2–3 years' net profit (sole trader) or salary plus dividends (limited company director). A highly profitable final year following a loss-making earlier year will often be averaged down. Fluctuating income reduces the assessed figure compared to equivalent PAYE earnings.
        </p>

        <h2>What Reduces Borrowing Power</h2>
        <ul>
          <li>Existing debt commitments (loans, credit cards, buy now pay later, student loan)</li>
          <li>Self-employment or irregular income (averaged over 2–3 years of accounts)</li>
          <li>Recent credit events (missed payments, defaults, County Court Judgements)</li>
          <li>High LTV (fewer products, higher rates)</li>
          <li>Multiple dependants (increases estimated living costs in the affordability model)</li>
          <li>Bonus or commission income (often counted at only 50% or excluded entirely)</li>
          <li>Probationary employment (many lenders require 3–6 months in current role)</li>
        </ul>

        <div className="warning-point">
          The maximum a lender will offer and the amount that is prudent to borrow are not the same number. Borrowing at the maximum income multiple leaves limited headroom for rate rises, income disruption, or major expenses. The affordability check is a minimum threshold — not a recommended level.
        </div>

        <h2>Frequently Asked Questions</h2>

        <h3>Do lenders use gross or net income for income multiples?</h3>
        <p>
          Income multiples are typically applied to gross (pre-tax) income. The affordability payment check uses net income. Both assessments happen, and the lower resulting loan amount prevails.
        </p>

        <h3>Does a larger deposit increase how much I can borrow?</h3>
        <p>
          A larger deposit reduces LTV, which may unlock lower rates — and a lower rate produces a lower monthly payment, which may pass a stress test that a higher-rate loan would fail. So yes, indirectly: a larger deposit can increase borrowing capacity by reducing the required rate and improving affordability. But it does not directly increase the income multiple limit.
        </p>

        <h3>What is the Bank of England's 4.5× income limit?</h3>
        <p>
          The Bank of England previously required that no more than 15% of new mortgage lending could exceed 4.5× income (the "flow limit"). This restriction was removed in August 2023. Individual lenders still set their own caps — most have retained similar limits — but the regulatory constraint no longer applies.
        </p>
      </div>
    </GuideLayout>
  );
}
