import type { Metadata } from 'next';
import GuideLayout from '@/components/layout/GuideLayout';

export const metadata: Metadata = {
  title: 'How Offset Mortgages Actually Work — Plain Figures Learning Centre',
  description: 'Why linking savings to a mortgage reduces interest — the maths behind effective balance, term reduction, interest saved, and when an offset makes sense.',
};

export default function OffsetGuide() {
  return (
    <GuideLayout
      title="How Offset Mortgages Actually Work"
      description="Why linking savings to a mortgage reduces interest — and the exact maths behind term reduction and the interest saved over the life of the loan."
      readTime="4 min"
      relatedCalc={{ href: '/offset', label: 'Offset Mortgage Calculator' }}
      relatedGuides={[
        { href: '/learn/mortgage-repayment', label: 'How Mortgage Repayment Calculations Work' },
        { href: '/learn/mortgage-affordability', label: 'How Mortgage Affordability Is Assessed' },
      ]}
    >
      <div className="guide-content">
        <h2>The Core Mechanism</h2>
        <p>
          An offset mortgage links a savings account to a mortgage account. The lender calculates daily interest not on the full mortgage balance, but on the <strong>mortgage balance minus the offset savings balance</strong>. The savings are not used to repay the mortgage — they remain accessible — but they reduce the balance on which interest is charged.
        </p>

        <div className="formula-block">
          <div className="formula-label">Effective Balance Calculation</div>
          Effective Balance = Mortgage Balance − Offset Savings<br /><br />
          Daily interest = Effective Balance × (Annual Rate / 365)<br /><br />
          Example: £250,000 mortgage, £40,000 savings, 4.5% rate<br />
          Effective Balance = £250,000 − £40,000 = £210,000<br />
          Annual interest on £210,000 = £9,450 vs £11,250 on full balance<br />
          Annual saving = £1,800
        </div>

        <h2>Why It Reduces the Term</h2>
        <p>
          With a standard repayment mortgage, the monthly payment is fixed. When offset savings reduce the interest charged each month, the same fixed payment covers a larger principal reduction. This accelerates paydown — the outstanding balance falls faster, which means the mortgage is cleared earlier.
        </p>
        <p>
          On the example above (£250,000, 4.5%, 25 years, £40,000 offset), the term reduction is approximately <strong>4.5 years</strong> and the total interest saving over the life of the mortgage is approximately <strong>£38,000</strong> — without touching the savings.
        </p>

        <h2>Savings Remain Accessible</h2>
        <p>
          This is the key distinction from making a lump sum overpayment. With an overpayment, the money is gone — it reduces the principal permanently. With an offset, the £40,000 remains in the savings account, available for emergencies or opportunities. The trade-off: if you withdraw savings, the offset balance falls and interest charges rise.
        </p>

        <div className="key-point">
          An offset works best as a home for an emergency fund or money you might need. It earns no explicit interest — but it saves you the mortgage rate (4.5% in the example), which is often higher than achievable savings rates, tax-free.
        </div>

        <h2>The Tax Efficiency Angle</h2>
        <p>
          Savings interest is subject to income tax (above the Personal Savings Allowance of £500/£1,000 in the UK). The interest "saved" on an offset mortgage is not income — it's a reduction in a debt cost — so it is effectively tax-free. For higher-rate taxpayers, a 4.5% mortgage rate offset is worth the equivalent of a 7.5% gross savings rate after 40% tax. This makes offset mortgages particularly attractive for higher earners with large savings balances.
        </p>

        <table>
          <thead><tr><th>Tax rate</th><th>4.5% offset equivalent (gross savings rate needed)</th></tr></thead>
          <tbody>
            <tr><td>Basic rate (20%)</td><td>5.6% gross savings rate</td></tr>
            <tr><td>Higher rate (40%)</td><td>7.5% gross savings rate</td></tr>
            <tr><td>Additional rate (45%)</td><td>8.2% gross savings rate</td></tr>
          </tbody>
        </table>

        <h2>When an Offset Makes Sense</h2>
        <ul>
          <li>You hold significant accessible savings (typically £20,000+)</li>
          <li>The savings are not needed for a specific purpose in the near term</li>
          <li>The mortgage rate is higher than achievable after-tax savings rates</li>
          <li>You're a higher-rate taxpayer (the tax efficiency is most valuable)</li>
          <li>You want to preserve access to capital while reducing interest costs</li>
        </ul>

        <h2>When an Offset May Not Make Sense</h2>
        <ul>
          <li>Offset mortgage rates are typically 0.1–0.3% higher than equivalent standard products</li>
          <li>If savings are below ~£15,000, the interest saving may not justify the rate premium</li>
          <li>If savings rates available elsewhere (ISAs, Premium Bonds) exceed the after-tax equivalent of the mortgage rate</li>
          <li>If you're likely to need the savings in the short term — market volatility aside, the offset benefit requires the savings to stay in the account</li>
        </ul>

        <div className="warning-point">
          Offset mortgages are offered by a smaller number of lenders than standard products and often have slightly higher headline rates. Run the numbers with both the offset rate and a cheaper standard product to verify whether the offset is genuinely beneficial for your specific savings level.
        </div>
      </div>
    </GuideLayout>
  );
}
