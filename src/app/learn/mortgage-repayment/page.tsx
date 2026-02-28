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

        <h2>What-If: Rate Change Scenarios</h2>
        <p>
          On the £250,000, 25-year mortgage — the sensitivity of monthly payment to rate:
        </p>
        <table>
          <thead>
            <tr><th>Rate</th><th>Monthly payment</th><th>Total interest (25yr)</th><th>vs 4.5% baseline</th></tr>
          </thead>
          <tbody>
            <tr><td>3.0%</td><td>£1,185</td><td>~£105,500</td><td>−£61,300</td></tr>
            <tr><td>4.5%</td><td>£1,389</td><td>~£166,800</td><td>—</td></tr>
            <tr><td>5.5%</td><td>£1,531</td><td>~£209,300</td><td>+£42,500</td></tr>
            <tr><td>7.0%</td><td>£1,767</td><td>~£280,100</td><td>+£113,300</td></tr>
          </tbody>
        </table>
        <p>
          A 2.5 percentage point rate rise on a £250,000 mortgage adds £378/month and £113,000 in total interest over 25 years. This is the scale of exposure when a fixed-rate period ends and a borrower reverts to a higher rate without remortgaging.
        </p>

        <h2>What-If: Term Comparison</h2>
        <table>
          <thead>
            <tr><th>Term</th><th>Monthly payment (4.5%)</th><th>Total interest</th><th>Monthly saving vs 20yr</th></tr>
          </thead>
          <tbody>
            <tr><td>20 years</td><td>£1,582</td><td>~£129,800</td><td>—</td></tr>
            <tr><td>25 years</td><td>£1,389</td><td>~£166,800</td><td>+£193/month cheaper</td></tr>
            <tr><td>30 years</td><td>£1,267</td><td>~£206,100</td><td>+£315/month cheaper</td></tr>
            <tr><td>35 years</td><td>£1,193</td><td>~£250,900</td><td>+£389/month cheaper</td></tr>
          </tbody>
        </table>

        <h2>Frequently Asked Questions</h2>

        <h3>Why is the monthly payment the same throughout even though the interest/principal split changes?</h3>
        <p>
          The amortisation formula is designed so the payment stays constant while the split shifts. In early months, the outstanding balance is high — so interest consumes most of the payment. As the balance falls, less of each payment goes to interest and more to principal. The algebra works out so the payment covers both interest and a gradually increasing principal reduction each month, arriving at zero balance on exactly the final payment.
        </p>

        <h3>How is a mortgage different from a personal loan?</h3>
        <p>
          Mathematically, they use the same amortisation formula. The differences are: mortgages are secured against property (lower rates due to lower lender risk), have much longer terms (25–35 years vs 1–7 for personal loans), and typically have an LTV constraint. Both can be prepaid; mortgages are more likely to have early repayment charges during fixed-rate periods.
        </p>

        <h3>Does it matter whether interest is calculated daily or monthly?</h3>
        <p>
          Yes, slightly. Most UK mortgage lenders calculate interest daily rather than monthly. Daily calculation means any overpayment immediately reduces the balance and the next day's interest charge. Monthly calculation only applies the overpayment benefit at the month end. The difference is small in absolute terms but daily calculation is marginally more favourable for overpayers.
        </p>

        <h3>What happens to the monthly payment when I remortgage?</h3>
        <p>
          When you remortgage, the new payment is calculated on the outstanding balance at the time, at the new rate, over the remaining term. If rates have risen and the term has stayed the same, the payment will be higher. The amortisation resets with the new inputs — there is no memory of the original deal.
        </p>
      </div>
    </GuideLayout>
  );
}
