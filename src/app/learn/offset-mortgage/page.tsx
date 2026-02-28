import type { Metadata } from 'next';
import GuideLayout from '@/components/layout/GuideLayout';

export const metadata: Metadata = {
  title: 'How Offset Mortgages Reduce Interest — Calculation & Tax Efficiency — Plain Figures',
  description: 'The maths behind offset mortgages — how savings reduce the effective balance, term reduction, interest saved, tax efficiency for higher-rate taxpayers, and when an offset makes sense.',
};

export default function OffsetGuide() {
  return (
    <GuideLayout
      title="How Offset Mortgages Actually Work"
      description="Why linking savings to a mortgage reduces interest — the exact maths behind effective balance, term reduction, the tax efficiency angle, and when an offset beats a standard product."
      readTime="5 min"
      relatedCalc={{ href: '/offset', label: 'Offset Mortgage Calculator' }}
      relatedGuides={[
        { href: '/learn/mortgage-repayment', label: 'How Mortgage Repayment Calculations Work' },
        { href: '/learn/mortgage-overpayment', label: 'Mortgage Overpayment: How Much Does It Save?' },
        { href: '/learn/mortgage-affordability', label: 'How Mortgage Affordability Is Assessed' },
      ]}
    >
      <div className="guide-content">
        <h2>The Core Mechanism</h2>
        <p>
          An offset mortgage links one or more savings accounts to a mortgage account. The lender calculates daily interest not on the full mortgage balance, but on the <strong>mortgage balance minus the offset savings balance</strong>. The savings are not used to repay the mortgage — they remain accessible and fully owned — but they reduce the balance on which interest is charged each day.
        </p>

        <div className="formula-block">
          <div className="formula-label">Effective Balance Calculation</div>
          Effective Balance = Mortgage Balance − Offset Savings<br /><br />
          Daily interest = Effective Balance × (Annual Rate ÷ 365)<br /><br />
          Example: £250,000 mortgage, £40,000 savings, 4.5% rate:<br />
          Effective Balance = £250,000 − £40,000 = £210,000<br />
          Annual interest on £210,000 at 4.5% = £9,450<br />
          Annual interest without offset = £11,250<br />
          Annual saving = £1,800
        </div>

        <h2>Why It Reduces the Term</h2>
        <p>
          With a standard repayment mortgage, the monthly payment is fixed. When offset savings reduce the interest charged each month, the same fixed payment covers a larger principal reduction. The balance falls faster, which reduces the interest charged the following month — which increases the principal reduction again. The effect compounds forward.
        </p>
        <p>
          On the example above (£250,000, 4.5%, 25 years, £40,000 offset held constant), the term reduction is approximately <strong>4.5 years</strong> and the total interest saving over the life of the mortgage is approximately <strong>£38,000</strong> — without touching the savings.
        </p>

        <h2>What-If: Different Savings Levels</h2>
        <p>
          On the same £250,000 mortgage at 4.5% over 25 years, the impact scales with offset savings:
        </p>
        <table>
          <thead>
            <tr><th>Offset savings</th><th>Effective balance</th><th>Annual interest saving</th><th>Approx. term reduction</th></tr>
          </thead>
          <tbody>
            <tr><td>£10,000</td><td>£240,000</td><td>~£450</td><td>~1.1 years</td></tr>
            <tr><td>£25,000</td><td>£225,000</td><td>~£1,125</td><td>~2.8 years</td></tr>
            <tr><td>£40,000</td><td>£210,000</td><td>~£1,800</td><td>~4.5 years</td></tr>
            <tr><td>£60,000</td><td>£190,000</td><td>~£2,700</td><td>~6.7 years</td></tr>
          </tbody>
        </table>
        <p>
          The relationship is approximately linear for savings well below the mortgage balance. Below roughly £15,000 in savings, the annual benefit may not justify the rate premium typically charged for offset products.
        </p>

        <h2>Savings Remain Accessible</h2>
        <p>
          This is the key distinction from making a lump sum overpayment. With an overpayment, the money permanently reduces the principal. With an offset, the savings remain in the linked account — available for emergencies, large purchases, or any other use. The trade-off: if you withdraw savings, the offset balance falls and interest charges rise proportionally.
        </p>

        <div className="key-point">
          An offset account is an effective home for emergency funds or money earmarked for a near-term purpose. The savings earn no explicit interest — but they save you the mortgage rate (4.5% in the example), tax-free.
        </div>

        <h2>The Tax Efficiency Angle</h2>
        <p>
          Savings interest is taxable income above the Personal Savings Allowance (£500/year for higher-rate taxpayers, £1,000 for basic-rate in the UK). The interest "saved" on an offset is not income — it is a reduction in a debt cost — so it is effectively tax-free. This asymmetry makes offset mortgages particularly attractive for higher earners:
        </p>
        <table>
          <thead>
            <tr><th>Tax band</th><th>4.5% offset = equivalent gross savings rate</th></tr>
          </thead>
          <tbody>
            <tr><td>Basic rate (20%)</td><td>5.63% gross</td></tr>
            <tr><td>Higher rate (40%)</td><td>7.50% gross</td></tr>
            <tr><td>Additional rate (45%)</td><td>8.18% gross</td></tr>
          </tbody>
        </table>
        <p>
          For a higher-rate taxpayer to beat the effective return of offsetting at 4.5%, they would need to find a savings account paying 7.5% gross — considerably higher than standard market rates in most environments.
        </p>

        <h2>What-If: Offset vs Overpayment</h2>
        <p>
          If you have £40,000 spare and your mortgage rate is 4.5%, the comparison between offsetting and overpaying is:
        </p>
        <ul>
          <li><strong>Offset:</strong> ~£38,000 total interest saving, £40,000 retained and accessible</li>
          <li><strong>Overpayment:</strong> Similar interest saving (slightly higher as the principal is permanently reduced), but the £40,000 is gone from your liquid assets</li>
        </ul>
        <p>
          Where access to the capital matters — for an emergency fund, planned expenditure, or investment flexibility — the offset preserves optionality at minimal cost. Where access is not needed, overpayment produces a marginally higher saving by eliminating the rate premium typically charged for offset products.
        </p>

        <h2>When an Offset Makes Sense</h2>
        <ul>
          <li>You hold significant accessible savings (typically £20,000+)</li>
          <li>The savings are not required for a specific near-term purpose</li>
          <li>The after-tax benefit of offsetting exceeds available savings rates elsewhere</li>
          <li>You are a higher-rate taxpayer (the tax efficiency is most pronounced)</li>
          <li>You want to preserve capital access while reducing interest costs</li>
        </ul>

        <h2>When an Offset May Not Make Sense</h2>
        <ul>
          <li>Offset rates are typically 0.1–0.3% higher than equivalent standard products — below ~£15,000 savings, the premium may exceed the saving</li>
          <li>If Premium Bond or ISA rates reliably exceed the after-tax mortgage rate equivalent</li>
          <li>If you are likely to need the savings in the short term</li>
          <li>If you are a basic-rate taxpayer with savings well within the Personal Savings Allowance — the tax efficiency argument is weaker</li>
        </ul>

        <div className="warning-point">
          Offset mortgages are available from a smaller number of lenders than standard products. Always compare the offset rate against a cheaper standard product using the calculator to verify the benefit for your specific savings level and tax position.
        </div>

        <h2>Frequently Asked Questions</h2>

        <h3>Can multiple accounts be linked to an offset?</h3>
        <p>
          Many offset products allow multiple accounts — for example, separate accounts for different family members or saving pots — all offsetting the same mortgage. The effective balance calculation uses the combined total of all linked accounts.
        </p>

        <h3>Does an offset mortgage affect my savings rate?</h3>
        <p>
          Your savings earn no explicit interest in the linked account — instead, they reduce the mortgage interest you pay. This is not the same as earning the mortgage rate on savings; it is the equivalent of earning that rate, tax-free, on the portion of the mortgage offset by those savings.
        </p>

        <h3>What happens if I fully offset the mortgage?</h3>
        <p>
          If savings equal or exceed the outstanding mortgage balance, the effective balance is zero — no daily interest accrues. The mortgage is not automatically repaid, but each monthly payment reduces only principal. The mortgage can be cleared very quickly in this scenario or the savings balance managed tactically.
        </p>
        <h3>Can I use an offset mortgage to hold business funds?</h3>
        <p>
          Some offset mortgage products allow a business current account to be linked alongside personal savings, reducing the mortgage balance on which interest is charged. This can be tax-efficient for self-employed sole traders who hold business reserves. Not all lenders permit this — check specific product terms. HMRC may scrutinise arrangements where business funds are used to offset personal mortgage interest.
        </p>
      </div>
    </GuideLayout>
  );
}
