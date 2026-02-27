import type { Metadata } from 'next';
import GuideLayout from '@/components/layout/GuideLayout';

export const metadata: Metadata = {
  title: 'Understanding Compound Interest — Plain Figures Learning Centre',
  description: 'How compounding frequency affects your effective return — nominal vs effective annual rate, daily vs monthly vs annual compounding explained with formulas.',
};

export default function CompoundGuide() {
  return (
    <GuideLayout
      title="Understanding Compound Interest"
      description="How compounding frequency changes your effective return — and why the same nominal rate produces different results depending on how often interest is applied."
      readTime="4 min"
      relatedCalc={{ href: '/compound', label: 'Compound Interest Calculator' }}
      relatedGuides={[
        { href: '/learn/retirement-savings', label: 'How Retirement Savings Projections Work' },
        { href: '/learn/mortgage-repayment', label: 'How Mortgage Repayment Calculations Work' },
      ]}
    >
      <div className="guide-content">
        <h2>Simple vs Compound Interest</h2>
        <p>
          Simple interest is calculated only on the original principal. Compound interest is calculated on the principal <em>plus</em> any interest already earned. Over time, this difference becomes substantial — the compounding effect accelerates growth as the interest base grows.
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
          The key variable is <strong>n</strong> — the compounding frequency. Annual compounding uses n=1, monthly uses n=12, daily uses n=365. Higher frequency means interest is added to the base more often, which means each subsequent interest calculation uses a slightly larger base.
        </p>

        <h2>Nominal Rate vs Effective Annual Rate (EAR)</h2>
        <p>
          The <strong>nominal rate</strong> is the stated annual percentage. The <strong>Effective Annual Rate (EAR)</strong> — sometimes called AER (Annual Equivalent Rate) in the UK — is the rate that produces the same result with annual compounding. It accounts for within-year compounding.
        </p>

        <div className="formula-block">
          <div className="formula-label">Effective Annual Rate Formula</div>
          EAR = (1 + r/n)^n − 1<br /><br />
          Example: 5% nominal, monthly compounding (n=12):<br />
          EAR = (1 + 0.05/12)^12 − 1 = 5.116%
        </div>

        <div className="key-point">
          When comparing savings accounts or investment products, always compare the EAR/AER — not the nominal rate. A 5% account with monthly compounding beats a 5.1% account with annual compounding.
        </div>

        <h2>How Frequency Affects the EAR</h2>
        <table>
          <thead>
            <tr><th>Compounding Frequency</th><th>n</th><th>EAR at 5% nominal</th></tr>
          </thead>
          <tbody>
            <tr><td>Annual</td><td>1</td><td>5.000%</td></tr>
            <tr><td>Quarterly</td><td>4</td><td>5.095%</td></tr>
            <tr><td>Monthly</td><td>12</td><td>5.116%</td></tr>
            <tr><td>Daily</td><td>365</td><td>5.127%</td></tr>
            <tr><td>Continuous (theoretical)</td><td>∞</td><td>5.127%</td></tr>
          </tbody>
        </table>

        <p>
          The difference between monthly and daily compounding is small — around 0.01% EAR at typical savings rates. The bigger difference is between annual and monthly, which is why advertised AER/EAR figures matter more than nominal rates.
        </p>

        <h2>The Rule of 72</h2>
        <p>
          A quick mental shortcut: divide 72 by the annual interest rate to estimate how many years it takes to double your money with compound interest. At 6%, money doubles in roughly 72 ÷ 6 = 12 years. At 4%, roughly 18 years. It's an approximation, but accurate to within 1–2% for rates between 2% and 15%.
        </p>

        <div className="warning-point">
          Compound interest works for you in savings and investments — but against you in debt. Credit card debt at 20% APR compounds monthly, meaning unpaid balances grow significantly faster than most people expect.
        </div>

        <h2>Inflation and Real Returns</h2>
        <p>
          Nominal returns don't account for inflation. The <strong>real return</strong> is calculated as: (1 + nominal rate) / (1 + inflation rate) − 1. At 5% nominal and 2.5% inflation, the real return is approximately 2.44%. Long-term projections should always consider real returns — especially for retirement planning, where the 20–30 year time horizon means inflation erodes purchasing power substantially.
        </p>
      </div>
    </GuideLayout>
  );
}
