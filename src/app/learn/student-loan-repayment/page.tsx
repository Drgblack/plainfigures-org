import type { Metadata } from 'next';
import GuideLayout from '@/components/learn/GuideLayout';

export const metadata: Metadata = {
  title: 'Student Loan Repayment: Plan 1 vs Plan 2 vs Plan 5 Explained',
  description: 'Understand how UK student loan repayments work across Plan 1, Plan 2, and Plan 5. Covers repayment thresholds, interest rates, and total cost comparisons for 2025/26.',
};

export default function Guide() {
  return (
    <GuideLayout
      number="G36"
      title="Student Loan Repayment: Plan 1, Plan 2, and Plan 5 Compared"
      readTime="6 min"
      keywords={['student loan repayment calculator UK 2025', 'plan 1 vs plan 2 student loan', 'plan 5 student loan threshold', 'student loan interest rate 2025', 'when do student loans get written off UK']}
    >
      <p>
        UK student loans work more like a graduate tax than a conventional debt. Repayments are
        income-contingent — you pay a percentage of earnings above a threshold, not a fixed monthly
        amount. Whether you repay in full, partially, or never depends on your income trajectory
        over the loan term.
      </p>

      <h2>The Three Plans at a Glance (2025/26)</h2>
      <table>
        <thead><tr><th>Feature</th><th>Plan 1</th><th>Plan 2</th><th>Plan 5</th></tr></thead>
        <tbody>
          <tr><td>Who has it</td><td>Pre-2012 England/Wales; Scotland; NI</td><td>England/Wales 2012–2023</td><td>England 2023 onwards</td></tr>
          <tr><td>Repayment threshold</td><td>£26,065/year</td><td>£27,295/year</td><td>£25,000/year</td></tr>
          <tr><td>Repayment rate</td><td>9% above threshold</td><td>9% above threshold</td><td>9% above threshold</td></tr>
          <tr><td>Interest rate</td><td>RPI or BoE base + 1% (lower of)</td><td>RPI to RPI+3% (income-linked)</td><td>RPI only</td></tr>
          <tr><td>Write-off</td><td>25 years or age 65</td><td>30 years</td><td>40 years</td></tr>
        </tbody>
      </table>

      <h2>The Repayment Formula</h2>
      <pre className="formula-block">{
`Monthly Repayment = (Annual Salary − Threshold) × 9% ÷ 12

Plan 2 example, salary £40,000:
Monthly = (£40,000 − £27,295) × 0.09 ÷ 12 = £95.29/month

Plan 5 example, same salary:
Monthly = (£40,000 − £25,000) × 0.09 ÷ 12 = £112.50/month`
      }</pre>

      <h2>What-If Scenarios</h2>

      <h3>Scenario 1: Moderate earner — will they repay in full?</h3>
      <p>Plan 2, starting salary £28,000, growing 3%/year, debt £50,000</p>
      <table>
        <thead><tr><th>Year</th><th>Salary</th><th>Annual Repayment</th><th>Balance (approx)</th></tr></thead>
        <tbody>
          <tr><td>1</td><td>£28,000</td><td>£63</td><td>£52,400</td></tr>
          <tr><td>5</td><td>£32,440</td><td>£460</td><td>£57,200</td></tr>
          <tr><td>15</td><td>£43,590</td><td>£1,464</td><td>£58,100</td></tr>
          <tr><td>30</td><td>£65,840</td><td>£3,472</td><td>Written off: ~£42,000 remaining</td></tr>
        </tbody>
      </table>
      <p>This borrower never repays in full. Total repaid: ~£28,000 of a £50,000 debt.</p>

      <h3>Scenario 2: High earner — overpays early?</h3>
      <p>Plan 2, salary quickly reaching £70,000+. Could repay in full within 10–15 years.
      Voluntary overpayments reduce balance but attract no interest benefit if you'd repay anyway.
      If likely to clear within 30 years, overpayment may make sense; otherwise, the write-off is free.</p>

      <h3>Scenario 3: Plan 5 — the 40-year trap</h3>
      <p>
        Plan 5's 40-year term means many graduates will be repaying into their 60s. On a £60,000
        starting debt with modest salary growth, total repayments can exceed the original debt —
        yet significant balances may still be written off. High earners repay more in total.
      </p>

      <h2>Should You Make Voluntary Overpayments?</h2>
      <p>Voluntary repayments make sense only if:</p>
      <ul>
        <li>You are confident you will repay the full balance within the write-off period anyway</li>
        <li>The interest rate exceeds what you could earn saving or investing</li>
        <li>Your income projections are high enough to clear the debt before write-off</li>
      </ul>
      <p>For most Plan 2 and Plan 5 borrowers, voluntary overpayments are not recommended.</p>

      <h2>Frequently Asked Questions</h2>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "What is the student loan repayment threshold for 2025/26?",
            "acceptedAnswer": { "@type": "Answer", "text": "Plan 1: £26,065/year. Plan 2: £27,295/year. Plan 5 (post-2023 England): £25,000/year. You pay 9% of earnings above the relevant threshold." }},
          { "@type": "Question", "name": "When do UK student loans get written off?",
            "acceptedAnswer": { "@type": "Answer", "text": "Plan 1 loans are written off after 25 years or when you turn 65. Plan 2 loans are written off after 30 years. Plan 5 loans are written off after 40 years. Scottish loans have their own write-off schedule." }},
          { "@type": "Question", "name": "Should I overpay my student loan?",
            "acceptedAnswer": { "@type": "Answer", "text": "Only if you are confident you will repay the entire balance before the write-off date. Otherwise, any remaining balance is written off regardless, making overpayment unnecessary. High earners are more likely to benefit from overpaying." }}
        ]
      })}} />

      <p className="tool-link">→ <a href="/take-home">See how student loan deductions affect your take-home with the Salary Calculator</a></p>
      <p className="disclaimer">Indicative only. Student loan rules, interest rates, and thresholds change annually. Check the official Student Loans Company for current figures.</p>
    </GuideLayout>
  );
}
