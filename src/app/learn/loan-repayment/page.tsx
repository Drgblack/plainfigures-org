import type { Metadata } from 'next';
import GuideLayout from '@/components/layout/GuideLayout';

export const metadata: Metadata = {
  title: 'Loan Repayment & True APR Explained — Plain Figures Learning Centre',
  description: 'How loan repayments are calculated, what APR actually measures, how fees affect the true cost of borrowing, and why two loans with the same interest rate can have different APRs.',
};

export default function LoanRepaymentGuide() {
  return (
    <GuideLayout
      title="Loan Repayment: True APR Explained"
      description="How monthly loan repayments are calculated, what APR actually measures versus the stated interest rate, and how fees and timing change the true cost of borrowing."
      readTime="5 min"
      relatedCalc={{ href: '/loan', label: 'Loan Repayment Calculator' }}
      relatedGuides={[
        { href: '/learn/mortgage-repayment', label: 'How Mortgage Repayment Calculations Work' },
        { href: '/learn/mortgage-affordability', label: 'How Mortgage Affordability Is Assessed' },
        { href: '/learn/compound-interest', label: 'Understanding Compound Interest' },
      ]}
    >
      <div className="guide-content">
        <h2>Monthly Repayment — The Core Formula</h2>
        <p>
          A standard personal loan uses the same amortisation formula as a repayment mortgage. Each monthly payment covers the interest accrued on the outstanding balance plus a portion of the principal. The payment amount stays constant; the interest/principal split shifts as the balance falls.
        </p>

        <div className="formula-block">
          <div className="formula-label">Monthly Loan Repayment Formula</div>
          M = P × [r(1 + r)^n] / [(1 + r)^n − 1]<br /><br />
          Where:<br />
          M = monthly payment<br />
          P = loan principal<br />
          r = monthly interest rate = annual rate ÷ 12<br />
          n = total number of monthly payments = term in years × 12
        </div>

        <div className="example-block">
          <div className="example-label">Example — £10,000 loan at 6.9% over 3 years</div>
          <div className="example-row"><span>Principal (P)</span><span>£10,000</span></div>
          <div className="example-row"><span>Monthly rate (r)</span><span>6.9% ÷ 12 = 0.575%</span></div>
          <div className="example-row"><span>Payments (n)</span><span>36</span></div>
          <div className="example-row"><span>Monthly payment (M)</span><span>£308.77</span></div>
          <div className="example-row"><span>Total repaid</span><span>£11,115.72</span></div>
          <div className="example-row"><span>Total interest</span><span>£1,115.72</span></div>
        </div>

        <h2>Interest Rate vs APR — the Critical Difference</h2>
        <p>
          The <strong>interest rate</strong> (sometimes called the nominal rate or contractual rate) is the percentage used to calculate interest charges on the outstanding balance. The <strong>Annual Percentage Rate (APR)</strong> is a broader figure that includes the interest rate <em>plus</em> mandatory fees and charges, expressed as an equivalent annual rate.
        </p>
        <p>
          APR was introduced (under the Consumer Credit Act in the UK, and similar legislation elsewhere) specifically to make loan products comparable. Two loans with the same interest rate but different fees will have different APRs — and the APR comparison reveals the true cost difference.
        </p>

        <div className="formula-block">
          <div className="formula-label">APR — Conceptual Definition</div>
          APR is the discount rate r that makes the present value of all repayments<br />
          equal to the loan amount net of fees:<br /><br />
          P_net = Σ [M_t / (1 + r/12)^t]   for t = 1 to n<br /><br />
          Where P_net = loan amount minus any upfront fees deducted at origination.<br />
          r is solved numerically (no closed-form solution exists for most real loans).
        </div>

        <div className="example-block">
          <div className="example-label">How a £300 arrangement fee affects APR on a £10,000 loan at 6.9%</div>
          <div className="example-row"><span>Stated interest rate</span><span>6.9%</span></div>
          <div className="example-row"><span>Arrangement fee</span><span>£300</span></div>
          <div className="example-row"><span>Effective net advance</span><span>£9,700</span></div>
          <div className="example-row"><span>Monthly payment (unchanged)</span><span>£308.77</span></div>
          <div className="example-row"><span>Effective APR (with fee)</span><span>~9.9%</span></div>
          <div className="example-row"><span>vs no-fee loan at stated rate</span><span>6.9% APR</span></div>
        </div>

        <div className="key-point">
          A loan with a lower headline rate but a large arrangement fee can be more expensive than a higher-rate no-fee loan, particularly over short terms. APR captures this — the headline rate alone does not.
        </div>

        <h2>Representative APR vs Your APR</h2>
        <p>
          Lenders are required to advertise a <strong>representative APR</strong> — the rate that at least 51% of approved applicants actually receive. The rate offered to any individual may be higher, based on credit score, income, existing debts, and the lender's risk model. The representative APR is useful for comparison; the personal APR is what determines actual cost.
        </p>

        <h2>What-If Scenarios</h2>

        <h3>What if the term is 5 years instead of 3?</h3>
        <p>
          Extending the term on the £10,000 loan at 6.9%:
        </p>
        <table>
          <thead>
            <tr><th>Term</th><th>Monthly payment</th><th>Total repaid</th><th>Total interest</th></tr>
          </thead>
          <tbody>
            <tr><td>2 years</td><td>£447.46</td><td>£10,738.82</td><td>£738.82</td></tr>
            <tr><td>3 years</td><td>£308.77</td><td>£11,115.72</td><td>£1,115.72</td></tr>
            <tr><td>4 years</td><td>£238.62</td><td>£11,453.76</td><td>£1,453.76</td></tr>
            <tr><td>5 years</td><td>£197.40</td><td>£11,844.00</td><td>£1,844.00</td></tr>
          </tbody>
        </table>
        <p>
          Extending from 3 to 5 years reduces the monthly payment by £111 but increases total interest by £728. The choice trades monthly affordability against total cost.
        </p>

        <h3>What if the rate differs by 2%?</h3>
        <p>
          On a £10,000 loan over 3 years:
        </p>
        <table>
          <thead>
            <tr><th>Annual rate</th><th>Monthly payment</th><th>Total interest</th><th>Extra vs 4.9%</th></tr>
          </thead>
          <tbody>
            <tr><td>4.9%</td><td>£299.14</td><td>£769.04</td><td>—</td></tr>
            <tr><td>6.9%</td><td>£308.77</td><td>£1,115.72</td><td>+£346.68</td></tr>
            <tr><td>8.9%</td><td>£318.55</td><td>£1,467.80</td><td>+£698.76</td></tr>
            <tr><td>14.9%</td><td>£346.29</td><td>£2,466.44</td><td>+£1,697.40</td></tr>
          </tbody>
        </table>
        <p>
          A 2% rate difference costs approximately £350 in total interest on a £10,000 three-year loan — modest at this scale. The cost grows significantly for larger loans or longer terms.
        </p>

        <h2>Early Repayment</h2>
        <p>
          Most UK personal loans allow early repayment but may charge an <strong>early repayment charge (ERC)</strong> of 1–2 months' interest on the outstanding balance. Whether early repayment makes financial sense depends on the ERC, the remaining interest, and what alternative use exists for the repayment funds. The saving from clearing a 6.9% loan early is equivalent to earning 6.9% risk-free — which currently exceeds most instant-access savings rates.
        </p>

        <h2>Flat Rate vs Reducing Balance</h2>
        <p>
          Some older or less regulated loan products (particularly hire purchase, informal lending) quote a <strong>flat rate</strong> — interest calculated on the original principal throughout the term, not the reducing balance. A 6% flat rate on a £10,000 3-year loan means 6% × £10,000 × 3 = £1,800 interest, regardless of how much principal has been repaid. The equivalent APR is approximately <strong>11–12%</strong> — nearly double the stated flat rate. UK consumer credit regulations require APR disclosure, but flat rates remain common in other contexts and can be misleading if taken at face value.
        </p>

        <h2>Frequently Asked Questions</h2>

        <h3>Why is APR higher than the interest rate?</h3>
        <p>
          APR includes fees and charges that the interest rate does not. Even with no fees, APR typically equals the interest rate (or is very close to it) for standard monthly-repayment loans. For products with daily compounding and monthly billing, APR will be marginally higher than the nominal annual rate due to the compounding effect.
        </p>

        <h3>What is EAR (Effective Annual Rate)?</h3>
        <p>
          EAR (also called the Annual Effective Rate) is most commonly used for overdrafts and credit cards rather than loans. Like APR, it expresses a compounded rate — but EAR assumes the debt is rolled over for a full year. For a monthly-repayment loan that reduces to zero, APR and EAR are essentially equivalent concepts applied to different product structures.
        </p>

        <h3>Does a lower monthly payment mean a cheaper loan?</h3>
        <p>
          Not necessarily. A lower monthly payment usually means a longer term, which increases total interest paid. The cheapest loan (lowest total cost) is generally the highest monthly payment you can comfortably afford over the shortest term — provided there is no ERC preventing early repayment if circumstances allow.
        </p>

        <div className="warning-point">
          All loan calculations on this page are illustrative only. Actual loan costs depend on your credit profile, the lender's current rates, and specific product terms. APR figures are indicative. Always read the full loan agreement and confirm the total amount repayable before signing. This is not financial advice.
        </div>
      </div>
    </GuideLayout>
  );
}
