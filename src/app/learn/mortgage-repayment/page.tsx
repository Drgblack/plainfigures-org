import type { Metadata } from 'next';
import GuideLayout from '@/components/layout/GuideLayout';

export const metadata: Metadata = {
  title: 'How Mortgage Repayment Calculations Work — Plain Figures Learning Centre',
  description: 'The amortisation formula explained — why early payments are mostly interest, how monthly payments are calculated, and how overpayments reduce the term.',
};

export default function MortgageGuide() {
  return (
    <GuideLayout
      title="How Mortgage Repayment Calculations Work"
      description="The amortisation formula explained — why your early payments are mostly interest, how banks calculate your monthly payment, and what changes when you overpay."
      readTime="5 min"
      relatedCalc={{ href: '/mortgage', label: 'Mortgage Repayment Calculator' }}
      relatedGuides={[
        { href: '/learn/mortgage-affordability', label: 'How Mortgage Affordability Is Assessed' },
        { href: '/learn/offset-mortgage', label: 'How Offset Mortgages Actually Work' },
        { href: '/learn/rent-vs-buy', label: 'Rent vs Buy: The Key Numbers to Compare' },
      ]}
    >
      <div className="guide-content">
        <h2>The Core Formula</h2>
        <p>
          A standard repayment mortgage uses a formula called <strong>amortisation</strong>. Each month you make a fixed payment that covers both interest on the outstanding balance and a portion of the principal. The payment amount stays constant, but the split between interest and principal shifts over time.
        </p>

        <div className="formula-block">
          <div className="formula-label">Monthly Payment Formula</div>
          M = P × [r(1 + r)ⁿ] / [(1 + r)ⁿ − 1]<br /><br />
          Where:<br />
          M = monthly payment<br />
          P = principal (loan amount)<br />
          r = monthly interest rate (annual rate ÷ 12)<br />
          n = total number of payments (years × 12)
        </div>

        <div className="example-block">
          <div className="example-label">Worked Example — £250,000 mortgage at 4.5% over 25 years</div>
          <div className="example-row"><span>Principal (P)</span><span>£250,000</span></div>
          <div className="example-row"><span>Annual rate</span><span>4.5%</span></div>
          <div className="example-row"><span>Monthly rate (r)</span><span>0.045 ÷ 12 = 0.00375</span></div>
          <div className="example-row"><span>Term (n)</span><span>25 × 12 = 300 months</span></div>
          <div className="example-row"><span>Monthly payment (M)</span><span>£1,389.35</span></div>
        </div>

        <h2>Why Early Payments Are Mostly Interest</h2>
        <p>
          In month 1, your interest charge is: £250,000 × 0.00375 = <strong>£937.50</strong>. Your total payment is £1,389.35, so only £451.85 reduces the principal. By month 300, the balance is tiny, so almost the entire payment is principal.
        </p>
        <p>
          This is why paying an extra £200/month in year 1 has dramatically more impact than the same £200 in year 20 — you're removing principal earlier, which eliminates future interest charges on that amount for every remaining month.
        </p>

        <div className="key-point">
          The total interest paid over 25 years at 4.5% on a £250,000 mortgage is approximately <strong>£166,805</strong> — more than 66% of the original loan amount on top.
        </div>

        <h2>What Affects the Monthly Payment</h2>
        <table>
          <thead>
            <tr><th>Variable</th><th>Increase means</th><th>Effect on payment</th></tr>
          </thead>
          <tbody>
            <tr><td>Loan amount (P)</td><td>Higher</td><td>Higher payment — proportionally</td></tr>
            <tr><td>Interest rate (r)</td><td>Higher</td><td>Higher payment — non-linearly</td></tr>
            <tr><td>Term (n)</td><td>Longer</td><td>Lower monthly payment, more total interest</td></tr>
            <tr><td>Deposit</td><td>Higher</td><td>Lower P → lower payment; often lower rate (LTV)</td></tr>
          </tbody>
        </table>

        <h2>Interest-Only vs Repayment</h2>
        <p>
          On an interest-only mortgage, you pay <em>only</em> the monthly interest — no principal is repaid. For the example above, that's just £937.50/month. But after 25 years, you still owe the full £250,000. Interest-only mortgages require a separate repayment vehicle (ISA, pension, endowment) to clear the capital at term.
        </p>

        <div className="warning-point">
          Interest-only payments are lower month-to-month but the total cost is higher over the full term if the capital repayment vehicle underperforms. A repayment mortgage guarantees the debt is cleared.
        </div>

        <h2>What "APR" vs "Interest Rate" Means</h2>
        <p>
          The headline mortgage rate is the nominal annual rate used in the formula. The <strong>APR (Annual Percentage Rate)</strong> is a broader figure that includes arrangement fees, broker fees, and other costs — it's designed to make products comparable. APR is almost always higher than the stated rate and more useful when comparing deals.
        </p>

        <h2>How Overpayments Work</h2>
        <p>
          When you overpay, lenders typically apply the extra amount directly to the principal. This reduces the base on which next month's interest is calculated — which means every subsequent payment has a higher principal-reduction component. The effect compounds: a £200/month overpayment on the example above saves approximately <strong>£23,000 in interest</strong> and removes around <strong>4 years</strong> from the term.
        </p>
        <p>
          Most lenders allow up to 10% of the outstanding balance as annual overpayments without early repayment charges (ERCs). Above that threshold, ERCs — typically 1–5% of the excess — may apply during fixed-rate periods.
        </p>

        <h2>Fixed vs Variable Rates</h2>
        <p>
          The formula above assumes a constant rate throughout. In practice, most mortgages have an initial fixed period (2, 3, or 5 years) after which they revert to the lender's Standard Variable Rate (SVR). Calculators that show the full 25-year picture using today's fixed rate are illustrative — the actual cost depends on what rate is available at each remortgage point.
        </p>
      </div>
    </GuideLayout>
  );
}
