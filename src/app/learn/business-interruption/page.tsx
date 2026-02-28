import type { Metadata } from 'next';
import GuideLayout from '@/components/layout/GuideLayout';

export const metadata: Metadata = {
  title: 'Business Interruption Sum Insured: How It Is Calculated — Plain Figures Learning Centre',
  description: 'How business interruption insurance sums insured are calculated on a gross profit basis. Indemnity period selection, under-insurance risk, and worked examples. Not insurance advice.',
};

export default function BusinessInterruptionGuide() {
  return (
    <GuideLayout
      title="Business Interruption Sum Insured: How It Works"
      description="How BI insurance sums insured are calculated on a gross profit basis — and why indemnity period selection and annual declaration updates matter so much. Indicative only."
      readTime="5 min"
      relatedCalc={{ href: '/bi', label: 'Business Interruption Calculator' }}
      relatedGuides={[
        { href: '/learn/financial-crisis', label: 'How to Calculate Your Financial Runway' },
        { href: '/learn/freelance-rate', label: 'Freelance Rate: Working Backwards from Desired Salary' },
      ]}
    >
      <div className="guide-content">
        <h2>What Business Interruption Insurance Covers</h2>
        <p>
          Business interruption (BI) insurance covers the financial losses a business sustains when it cannot trade normally following an insured event — typically a physical damage event such as a fire, flood, or equipment failure that is covered under the associated property policy. BI pays for lost profit and continuing fixed costs during the recovery period.
        </p>
        <p>
          BI does not typically cover losses from events that do not cause physical damage to the insured premises — although extensions exist for some scenarios. Policy wordings vary significantly. This guide explains the sum insured calculation methodology, not the coverage terms.
        </p>

        <h2>Key Concepts</h2>

        <h3>Gross Profit — Insurance Definition</h3>
        <p>
          For BI purposes, &ldquo;gross profit&rdquo; is <em>not</em> the accounting definition. It is defined in the policy, and typically means:
        </p>

        <div className="formula-block">
          <div className="formula-label">BI Gross Profit (typical definition)</div>
          BI Gross Profit = Turnover − Uninsured Working Expenses<br /><br />
          Uninsured Working Expenses = variable costs that cease when trading stops<br />
          (e.g. raw materials, goods for resale, trade discounts, commissions)<br /><br />
          Fixed costs (rent, salaries, loan repayments, utilities) are generally<br />
          included in BI Gross Profit because they continue during the interruption.
        </div>

        <div className="key-point">
          The BI gross profit figure will typically be significantly higher than the accounting gross profit for businesses with large variable cost bases. Check the specific policy definition — wordings differ between insurers.
        </div>

        <h3>Indemnity Period</h3>
        <p>
          The indemnity period is the maximum length of time for which the BI policy will pay out following an incident. It begins at the date of the insured event and continues until the business has returned to the same financial position it would have been in had the incident not occurred — subject to the maximum period selected.
        </p>
        <p>
          Common indemnity periods are 12, 18, 24, or 36 months. Selecting too short a period is the most common cause of under-insurance in BI — a business that takes 20 months to fully recover with an 18-month indemnity period has an uninsured gap of 2 months.
        </p>

        <h2>The Sum Insured Calculation</h2>

        <div className="formula-block">
          <div className="formula-label">BI Sum Insured</div>
          Sum Insured = Annual BI Gross Profit × (Indemnity Period in months ÷ 12)<br /><br />
          The annual BI gross profit should be the projected figure for the period<br />
          of insurance — not the prior year's actual (particularly if the business<br />
          is growing).
        </div>

        <div className="example-block">
          <div className="example-label">Worked example — manufacturing business</div>
          <div className="example-row"><span>Annual turnover</span><span>£2,000,000</span></div>
          <div className="example-row"><span>Variable (uninsured) costs</span><span>£600,000</span></div>
          <div className="example-row"><span>BI Gross Profit</span><span>£1,400,000</span></div>
          <div className="example-row"><span>Chosen indemnity period</span><span>18 months</span></div>
          <div className="example-row"><span>BI Sum Insured</span><span>£1,400,000 × 1.5 = £2,100,000</span></div>
        </div>

        <h2>Under-Insurance: The Average Clause</h2>
        <p>
          Most BI policies include an <strong>average clause</strong> (also called &ldquo;condition of average&rdquo; or &ldquo;proportional clause&rdquo;). If the sum insured is less than the actual BI gross profit for the indemnity period, the insurer will only pay a proportion of the loss — in the same ratio as the sum insured bears to the correct sum insured.
        </p>

        <div className="formula-block">
          <div className="formula-label">Average Clause — Claim Reduction Formula</div>
          Claim paid = Loss × (Sum Insured ÷ Correct Sum Insured)<br /><br />
          Example:<br />
          Correct sum insured: £2,100,000<br />
          Declared sum insured: £1,400,000 (67% of correct)<br />
          Loss incurred: £500,000<br />
          Claim paid: £500,000 × (£1,400,000 ÷ £2,100,000) = £333,333<br />
          Uninsured: £166,667
        </div>

        <div className="warning-point">
          Under-insurance is common and frequently only discovered at the point of claim. If turnover or cost structure has changed since the sum insured was last set, the declared figure may be materially wrong — in either direction.
        </div>

        <h2>What-If: Indemnity Period Too Short</h2>
        <p>
          If a business selects a 12-month indemnity period but actually takes 20 months to return to pre-incident trading levels, the policy stops paying at month 12. The remaining 8 months of losses are uninsured. For the example above, at £1,400,000 annual BI gross profit, 8 uninsured months represent approximately £933,000 of uncovered losses.
        </p>

        <h2>What-If: Turnover Grows and Sum Insured Is Not Updated</h2>
        <p>
          If the business in the example grows turnover from £2,000,000 to £2,400,000 in the following year but does not update its BI sum insured, the correct sum insured rises from £2,100,000 to approximately £2,520,000 (assuming cost structure unchanged). The under-insurance gap of £420,000 would trigger the average clause at any partial claim.
        </p>

        <h2>Factors That Affect Recovery Time (and Indemnity Period Selection)</h2>
        <table>
          <thead>
            <tr><th>Factor</th><th>Tends to lengthen recovery</th></tr>
          </thead>
          <tbody>
            <tr><td>Specialist equipment lead times</td><td>Bespoke machinery may have 6–18 month lead times</td></tr>
            <tr><td>Planning or regulatory approvals</td><td>Rebuilding may require planning permission</td></tr>
            <tr><td>Supply chain disruption</td><td>Key suppliers may also be affected by the same event</td></tr>
            <tr><td>Customer relationship recovery</td><td>Customers may have found alternative suppliers during the interruption</td></tr>
            <tr><td>Staff retention</td><td>Key staff may have left during extended closure</td></tr>
          </tbody>
        </table>

        <p>
          Most insurance market guidance suggests that businesses underestimate their recovery time. An 18–24 month indemnity period is commonly recommended as a minimum for businesses with any material complexity, unless a specific shorter recovery scenario can be demonstrated.
        </p>
      </div>
    </GuideLayout>
  );
}
