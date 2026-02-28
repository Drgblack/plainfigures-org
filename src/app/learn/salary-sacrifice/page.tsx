import type { Metadata } from 'next';
import GuideLayout from '@/components/learn/GuideLayout';

export const metadata: Metadata = {
  title: 'Salary Sacrifice: Tax and National Insurance Savings Explained',
  description: 'Understand how salary sacrifice works for pensions, cycle to work, and EV cars. Includes tax and NI saving calculations for 2025/26 UK employees.',
};

export default function Guide() {
  return (
    <GuideLayout
      number="G35"
      title="Salary Sacrifice: Tax and National Insurance Savings Explained"
      readTime="5 min"
      keywords={['salary sacrifice pension calculator UK', 'salary sacrifice tax saving 2025', 'salary sacrifice NI saving how it works', 'cycle to work salary sacrifice', 'electric car salary sacrifice UK']}
    >
      <p>
        Salary sacrifice is an agreement to reduce your gross salary in exchange for a non-cash
        benefit of equal value. Because National Insurance and income tax apply to your new lower
        salary, you save on both — typically 32–42p per £1 sacrificed, depending on your tax band.
        Employers also save employer NI (13.8%), and often share part of that saving with you.
      </p>

      <h2>How the Saving Works</h2>
      <pre className="formula-block">{
`Saving per £1 sacrificed:

Basic rate taxpayer (20% IT + 8% NI* = 28% combined):
  Save: £0.28 per £1 sacrificed

Higher rate taxpayer (40% IT + 2% NI = 42% combined):
  Save: £0.42 per £1 sacrificed

*Employee NI rates from 2024/25: 8% on earnings £12,570–£50,270; 2% above

Employer NI saving: 13.8% on the sacrificed amount
(often shared with employee as enhanced pension contribution)`
      }</pre>

      <h2>Common Salary Sacrifice Schemes</h2>
      <table>
        <thead><tr><th>Scheme</th><th>What You Get</th><th>Annual Limit</th><th>Typical Saving</th></tr></thead>
        <tbody>
          <tr><td>Pension</td><td>Higher pension contribution</td><td>£60,000 (annual allowance)</td><td>28–42% of sacrificed amount</td></tr>
          <tr><td>Cycle to Work</td><td>Bike + equipment</td><td>No cap (employer sets)</td><td>28–42% of bike cost</td></tr>
          <tr><td>Electric vehicle</td><td>EV via lease</td><td>P11D value × BIK%</td><td>Varies — see below</td></tr>
          <tr><td>Childcare vouchers</td><td>Now closed to new entrants</td><td>—</td><td>—</td></tr>
          <tr><td>Tech scheme</td><td>Laptops, phones</td><td>Employer-set</td><td>28–42%</td></tr>
        </tbody>
      </table>

      <h2>What-If Scenarios</h2>

      <h3>Scenario 1: Additional pension contribution via salary sacrifice</h3>
      <p>Higher rate taxpayer, £5,000 additional annual pension sacrifice</p>
      <table>
        <thead><tr><th>Item</th><th>Amount</th></tr></thead>
        <tbody>
          <tr><td>Gross salary reduction</td><td>£5,000</td></tr>
          <tr><td>Income tax saved (40%)</td><td>£2,000</td></tr>
          <tr><td>Employee NI saved (2%)</td><td>£100</td></tr>
          <tr><td><strong>Net cost to you</strong></td><td><strong>£2,900</strong></td></tr>
          <tr><td><strong>Pension receives</strong></td><td><strong>£5,000</strong></td></tr>
          <tr><td>Employer NI saved (13.8%)</td><td>£690 (may add to pension)</td></tr>
        </tbody>
      </table>

      <h3>Scenario 2: Electric vehicle lease</h3>
      <p>EV list price £45,000, BIK rate 3% (2025/26), basic rate taxpayer</p>
      <table>
        <thead><tr><th>Item</th><th>Amount</th></tr></thead>
        <tbody>
          <tr><td>Lease cost per month</td><td>£650</td></tr>
          <tr><td>Salary sacrificed per month</td><td>£650</td></tr>
          <tr><td>Tax + NI saved (28%)</td><td>£182/month</td></tr>
          <tr><td>BIK tax liability (£45k × 3% × 20% ÷ 12)</td><td>£22.50/month</td></tr>
          <tr><td><strong>Effective monthly cost</strong></td><td><strong>£490.50</strong></td></tr>
        </tbody>
      </table>

      <h3>Scenario 3: Impact on mortgage affordability</h3>
      <p>
        Salary sacrifice reduces your gross salary — lenders assess affordability on the sacrificed
        amount. A £40,000 salary with £5,000 pension sacrifice may be assessed as £35,000 for
        mortgage purposes. Plan accordingly before applying.
      </p>

      <h2>Frequently Asked Questions</h2>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "How much does salary sacrifice save in tax and NI?",
            "acceptedAnswer": { "@type": "Answer", "text": "A basic rate taxpayer saves approximately 28p per £1 sacrificed (20% income tax + 8% NI). A higher rate taxpayer saves approximately 42p per £1 (40% income tax + 2% NI). Employers also save 13.8% employer NI." }},
          { "@type": "Question", "name": "Does salary sacrifice affect my State Pension?",
            "acceptedAnswer": { "@type": "Answer", "text": "Potentially yes. If salary sacrifice reduces your earnings below the Lower Earnings Limit (£6,396 in 2025/26), it could affect your qualifying year for State Pension. Most employees earning above this are unaffected." }},
          { "@type": "Question", "name": "Does salary sacrifice affect mortgage applications?",
            "acceptedAnswer": { "@type": "Answer", "text": "Some lenders assess affordability based on your reduced salary after sacrifice. Others add it back. Check with your lender before significantly increasing salary sacrifice if you plan to apply for a mortgage." }}
        ]
      })}} />

      <p className="tool-link">→ <a href="/take-home">Calculate your take-home pay with the Salary Take-Home Calculator</a></p>
      <p className="disclaimer">Indicative only. Tax treatment of salary sacrifice depends on scheme structure and individual circumstances. Consult your employer's HR or a tax adviser.</p>
    </GuideLayout>
  );
}
