import type { Metadata } from 'next';
import GuideLayout from '@/components/layout/GuideLayout';

export const metadata: Metadata = {
  title: 'Freelance Day Rate: Working Backwards from Desired Salary — Plain Figures Learning Centre',
  description: 'How to calculate the freelance or contractor day rate needed to match a target take-home salary — accounting for billable days, tax, National Insurance, and overheads. UK 2026.',
};

export default function FreelanceRateGuide() {
  return (
    <GuideLayout
      title="Freelance Rate: Working Backwards from Desired Salary"
      description="How to calculate the day rate or hourly rate a freelancer or contractor needs to charge — working backwards from a target take-home, accounting for non-billable time, tax, and costs."
      readTime="5 min"
      relatedCalc={{ href: '/freelance', label: 'Freelance Rate Calculator' }}
      relatedGuides={[
        { href: '/learn/salary-take-home', label: 'How Salary Take-Home Is Calculated' },
        { href: '/learn/lifestyle-inflation', label: 'Lifestyle Inflation: Real Cost Over Time' },
        { href: '/learn/subscription-drain', label: 'Subscription Drain: The True Long-Term Cost' },
      ]}
    >
      <div className="guide-content">
        <h2>Why Freelance Rates Must Be Higher Than Equivalent Salaries</h2>
        <p>
          A freelance or contractor rate cannot be directly compared to an equivalent salaried gross salary. Several costs borne by employers in employment are absent in self-employment — and must therefore be covered by the rate charged:
        </p>
        <ul>
          <li>Employer's National Insurance Contributions (13.8% on earnings above the secondary threshold)</li>
          <li>Paid annual leave (statutory minimum 28 days including bank holidays)</li>
          <li>Sick pay (no statutory sick pay for self-employed sole traders)</li>
          <li>Employer pension contributions (minimum 3% of qualifying earnings)</li>
          <li>Equipment, software, insurance, and workspace costs</li>
          <li>Non-billable time: administration, business development, accounting, learning</li>
        </ul>

        <h2>Step 1 — Calculate Billable Days</h2>
        <p>
          Not all working days are billable. A realistic annual billable day estimate:
        </p>

        <div className="example-block">
          <div className="example-label">Estimated billable days — typical UK freelancer</div>
          <div className="example-row"><span>Working days in year</span><span>260 (52 × 5)</span></div>
          <div className="example-row"><span>Less: holidays (estimate)</span><span>−25 days</span></div>
          <div className="example-row"><span>Less: bank holidays</span><span>−8 days</span></div>
          <div className="example-row"><span>Less: illness / gaps</span><span>−10 days</span></div>
          <div className="example-row"><span>Less: non-billable admin</span><span>−15 days</span></div>
          <div className="example-row"><span>Estimated billable days</span><span>~202 days</span></div>
        </div>

        <div className="key-point">
          202 billable days assumes consistent work. At lower utilisation (e.g., 70%), billable days fall to ~141 — which significantly increases the required day rate to achieve the same income.
        </div>

        <h2>Step 2 — Required Gross Income</h2>
        <p>
          Working backwards from a target net take-home requires reversing the tax calculation. For a sole trader in England (2025/26 rates, simplified):
        </p>

        <div className="formula-block">
          <div className="formula-label">Approximate Gross from Net (Basic Rate Sole Trader, UK)</div>
          Net take-home ≈ Gross − Income Tax − Class 4 NI − Class 2 NI<br /><br />
          Rough approximation for earnings in the basic rate band:<br />
          Gross ≈ Net ÷ 0.68   (accounts for ~20% tax + ~9% Class 4 NI above Small Profits Threshold)<br /><br />
          Note: This simplification does not account for the Personal Allowance offset,<br />
          exact NI thresholds, or any expenses claimed. Use the calculator for precise figures.
        </div>

        <div className="example-block">
          <div className="example-label">Target net take-home: £40,000</div>
          <div className="example-row"><span>Approximate required gross</span><span>~£58,800</span></div>
          <div className="example-row"><span>Add: business overheads (est.)</span><span>£4,000</span></div>
          <div className="example-row"><span>Total required billing</span><span>~£62,800</span></div>
          <div className="example-row"><span>Billable days</span><span>202</span></div>
          <div className="example-row"><span>Required day rate</span><span>~£311/day</span></div>
        </div>

        <h2>Step 3 — Comparable Salaried Equivalent</h2>
        <p>
          The salaried equivalent of a £311/day freelance rate is not simply £311 × 260 days = £80,860 gross. The correct comparison includes what the employer would pay on top: employer NI, pension, and benefits. A rough total employer cost for an equivalent salaried employee is the gross salary plus approximately 15–20% in employer-side costs.
        </p>

        <table>
          <thead>
            <tr><th>Freelance day rate</th><th>Approx. gross (202 days)</th><th>Approx. net take-home</th><th>Equiv. salaried gross</th></tr>
          </thead>
          <tbody>
            <tr><td>£200/day</td><td>£40,400</td><td>~£28,000</td><td>~£35,000–£38,000</td></tr>
            <tr><td>£311/day</td><td>£62,800</td><td>~£40,000</td><td>~£52,000–£58,000</td></tr>
            <tr><td>£450/day</td><td>£90,900</td><td>~£55,000</td><td>~£75,000–£82,000</td></tr>
            <tr><td>£600/day</td><td>£121,200</td><td>~£68,000</td><td>~£95,000–£105,000</td></tr>
          </tbody>
        </table>

        <div className="warning-point">
          The figures above are illustrative only. Tax treatment varies significantly based on business structure (sole trader vs limited company), profit level, pension contributions, allowable expenses, and individual circumstances. Consult an accountant for your specific situation.
        </div>

        <h2>Utilisation: The Most Sensitive Variable</h2>
        <p>
          The required day rate is highly sensitive to utilisation — the percentage of available days that are actually billed. At 100% utilisation (unrealistic), 260 days are billable. At 70%, approximately 182 days are billable. The required rate to achieve the same income increases proportionally.
        </p>

        <div className="formula-block">
          <div className="formula-label">Effect of Utilisation on Day Rate</div>
          Required day rate = Total annual billing ÷ Billable days<br /><br />
          At £62,800 required billing:<br />
          100% utilisation (260 days): £242/day<br />
          78% utilisation (202 days): £311/day<br />
          70% utilisation (182 days): £345/day<br />
          60% utilisation (156 days): £403/day
        </div>

        <p>
          New freelancers typically experience utilisation below 70% in the first 12–18 months while building a client base. Setting rates based on an optimistic utilisation assumption is a common source of income shortfall.
        </p>

        <h2>Hourly Rate Conversion</h2>
        <p>
          If clients require an hourly rate rather than a day rate, the convention is typically: hourly rate = day rate ÷ 8. For a £311/day rate, that is approximately £38.90/hour. Some sectors use 6-hour billing days — in that case, hourly rate = day rate ÷ 6 (£51.83/hour at the same income target).
        </p>
      </div>
    </GuideLayout>
  );
}
