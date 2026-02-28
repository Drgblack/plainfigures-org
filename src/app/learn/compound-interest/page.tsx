import type { Metadata } from 'next';
import GuideLayout from '@/components/layout/GuideLayout';

export const metadata: Metadata = {
  title: 'Compound Interest: Frequency, Effective Rate & Projections — Plain Figures',
  description: 'How compounding frequency affects your effective annual return, the difference between nominal and EAR/AER, the Rule of 72, and how compounding works against you in debt.',
};

export default function CompoundGuide() {
  return (
    <GuideLayout
      title="Understanding Compound Interest"
      description="How compounding frequency changes your effective return — and why daily compounding beats annual even at the same nominal rate. Includes EAR, Rule of 72, and debt applications."
      readTime="5 min"
      relatedCalc={{ href: '/compound', label: 'Compound Interest Calculator' }}
      relatedGuides={[
        { href: '/learn/retirement-savings', label: 'How Retirement Savings Projections Work' },
        { href: '/learn/save-for-goal', label: 'Save for a Goal: Time & Amount Basics' },
        { href: '/learn/lifestyle-inflation', label: 'Lifestyle Inflation: Real Cost Over Time' },
      ]}
    >
      <div className="guide-content">
        <h2>Simple vs Compound Interest</h2>
        <p>
          Simple interest is calculated only on the original principal. Compound interest is calculated on the principal <em>plus</em> any interest already earned. Over time, this difference becomes substantial — the compounding effect accelerates growth because the interest base grows with each period.
        </p>

        <div className="example-block">
          <div className="example-label">£10,000 at 5% over 10 years — Simple vs Compound</div>
          <div className="example-row"><span>Simple interest (annual)</span><span>£15,000</span></div>
          <div className="example-row"><span>Compound interest (annual)</span><span>£16,289</span></div>
          <div className="example-row"><span>Compound interest (monthly)</span><span>£16,470</span></div>
          <div className="example-row"><span>Compound interest (daily)</span><span>£16,487</span></div>
        </div>

        <h2>The Compound Interest Formula</h2>

        <div className="formula-block">
          <div className="formula-label">Compound Interest Formula</div>
          A = P × (1 + r/n)^(n×t)<br /><br />
          Where:<br />
          A = final amount<br />
          P = principal<br />
          r = annual interest rate (as decimal)<br />
          n = compounding frequency per year<br />
          t = time in years
        </div>

        <p>
          The key variable is <strong>n</strong> — the compounding frequency. Annual compounding uses n=1, monthly uses n=12, daily uses n=365. Higher frequency means interest is added to the base more often, so each subsequent calculation uses a slightly larger base.
        </p>

        <h2>Nominal Rate vs Effective Annual Rate (EAR / AER)</h2>
        <p>
          The <strong>nominal rate</strong> is the stated annual percentage. The <strong>Effective Annual Rate (EAR)</strong> — called AER (Annual Equivalent Rate) on UK savings products — is the rate that produces the same result as the compounding arrangement with annual compounding. It is the correct figure for comparing different products.
        </p>

        <div className="formula-block">
          <div className="formula-label">Effective Annual Rate (EAR) Formula</div>
          EAR = (1 + r/n)^n − 1<br /><br />
          Example: 5% nominal, monthly compounding (n=12):<br />
          EAR = (1 + 0.05/12)^12 − 1 = 5.116%<br /><br />
          A 5% account with monthly compounding beats a 5.1% account with annual compounding:<br />
          5.116% EAR &gt; 5.100% EAR
        </div>

        <h2>How Frequency Affects the EAR</h2>
        <table>
          <thead>
            <tr><th>Compounding frequency</th><th>n</th><th>EAR at 5% nominal</th><th>£10,000 after 10yr</th></tr>
          </thead>
          <tbody>
            <tr><td>Annual</td><td>1</td><td>5.000%</td><td>£16,289</td></tr>
            <tr><td>Quarterly</td><td>4</td><td>5.095%</td><td>£16,436</td></tr>
            <tr><td>Monthly</td><td>12</td><td>5.116%</td><td>£16,470</td></tr>
            <tr><td>Daily</td><td>365</td><td>5.127%</td><td>£16,487</td></tr>
            <tr><td>Continuous (e^r − 1)</td><td>∞</td><td>5.127%</td><td>£16,487</td></tr>
          </tbody>
        </table>
        <p>
          The marginal benefit of moving from monthly to daily compounding is tiny — about £17 on £10,000 over 10 years. The bigger difference is between annual and monthly (£181). This is why advertised AER figures matter more than nominal rates when comparing savings products.
        </p>

        <h2>What-If: Starting 10 Years Earlier</h2>
        <p>
          £10,000 invested at 5% monthly compounding — the effect of time:
        </p>
        <table>
          <thead>
            <tr><th>Investment horizon</th><th>Final amount</th><th>Gain</th></tr>
          </thead>
          <tbody>
            <tr><td>10 years</td><td>£16,470</td><td>£6,470</td></tr>
            <tr><td>20 years</td><td>£27,126</td><td>£17,126</td></tr>
            <tr><td>30 years</td><td>£44,677</td><td>£34,677</td></tr>
            <tr><td>40 years</td><td>£73,584</td><td>£63,584</td></tr>
          </tbody>
        </table>
        <p>
          Doubling the horizon from 20 to 40 years more than doubles the gain — from £17,126 to £63,584. Later years generate more absolute interest than earlier years because the base is larger.
        </p>

        <h2>What-If: Rate Sensitivity Over 30 Years</h2>
        <table>
          <thead>
            <tr><th>Rate</th><th>£10,000 after 30yr</th><th>Total gain</th></tr>
          </thead>
          <tbody>
            <tr><td>3%</td><td>£24,568</td><td>£14,568</td></tr>
            <tr><td>5%</td><td>£44,677</td><td>£34,677</td></tr>
            <tr><td>7%</td><td>£81,165</td><td>£71,165</td></tr>
          </tbody>
        </table>
        <p>
          A 2 percentage point difference compounds dramatically over long periods. Pension projections are highly sensitive to return assumptions for this reason — small rate differences produce very large outcome differences over decades.
        </p>

        <h2>The Rule of 72</h2>
        <p>
          A quick mental shortcut: divide 72 by the annual rate to estimate doubling time. At 6%, money doubles in roughly 12 years. At 4%, roughly 18 years. Accurate to within 1–2% for rates between 2% and 15%.
        </p>
        <table>
          <thead>
            <tr><th>Rate</th><th>Rule of 72 estimate</th><th>Exact doubling time</th></tr>
          </thead>
          <tbody>
            <tr><td>2%</td><td>36 years</td><td>35.0 years</td></tr>
            <tr><td>4%</td><td>18 years</td><td>17.7 years</td></tr>
            <tr><td>6%</td><td>12 years</td><td>11.9 years</td></tr>
            <tr><td>8%</td><td>9 years</td><td>9.0 years</td></tr>
            <tr><td>10%</td><td>7.2 years</td><td>7.3 years</td></tr>
          </tbody>
        </table>

        <h2>Compound Interest Working Against You — Debt</h2>
        <p>
          Compound interest works for you in savings and investments — but against you in debt. Credit card debt at 20% APR (monthly compounding) means a £2,000 balance that is never repaid grows to approximately £12,383 in 10 years. Minimum payments on high-rate revolving debt can take decades to clear because each payment is consumed largely by compounding interest, leaving little to reduce principal.
        </p>

        <h2>Inflation and Real Returns</h2>
        <p>
          Nominal returns don't account for inflation. Real return ≈ (1 + nominal) ÷ (1 + inflation) − 1. At 5% nominal and 2.5% inflation, the real return is approximately 2.44%. Long-term projections should use real returns — particularly for retirement planning where 20–30 year horizons mean inflation materially erodes purchasing power.
        </p>

        <h2>Frequently Asked Questions</h2>

        <h3>What is the difference between AER and APR?</h3>
        <p>
          AER (Annual Equivalent Rate) is used for savings — it shows the effective annual return including compounding. APR (Annual Percentage Rate) is used for borrowing — it shows the effective annual cost including fees and compounding. Both standardise comparison across products with different compounding frequencies and fee structures.
        </p>

        <h3>Does compounding frequency matter for ISAs?</h3>
        <p>
          Yes, but the effect is small at typical savings rates. Always compare AER figures directly — the AER already normalises for compounding frequency, so a 4.5% AER account is comparable regardless of whether it compounds daily or monthly.
        </p>

        <h3>How does continuous compounding work?</h3>
        <p>
          Continuous compounding is the mathematical limit of increasing compounding frequency to infinity. The formula is A = P × e^(r×t), where e ≈ 2.718. It produces the maximum possible return for a given nominal rate, differing only fractionally from daily compounding in practice. It is used in options pricing and theoretical finance rather than retail savings products.
        </p>

        <h3>Why does the Rule of 72 use 72 and not 70?</h3>
        <p>
          72 is used because it has more integer divisors (1, 2, 3, 4, 6, 8, 9, 12) than 70, making mental arithmetic easier. Both give similar approximations. The Rule of 70 (using 70) is slightly more accurate at low rates such as 2–3%; the Rule of 72 is slightly more accurate at higher rates such as 8–10%.
        </p>

        <div className="warning-point">
          All projections on this page are illustrative only and assume constant rates that real investments do not provide. Past returns do not guarantee future results. Compound interest calculations do not account for tax on interest or investment gains. This is not financial advice — consult a qualified adviser before making investment decisions.
        </div>
      </div>
    </GuideLayout>
  );
}
