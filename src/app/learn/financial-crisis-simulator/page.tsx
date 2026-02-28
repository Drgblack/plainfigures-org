import type { Metadata } from 'next';
import GuideLayout from '@/components/learn/GuideLayout';

export const metadata: Metadata = {
  title: 'Financial Crisis Simulator: How Long Will Your Savings Last?',
  description: 'Learn how to calculate how long savings last during a financial crisis. Covers burn rate, survival runway, and emergency fund sizing with real examples.',
};

export default function Guide() {
  return (
    <GuideLayout
      number="G29"
      title="Financial Crisis Simulator: How Long Will Your Savings Last?"
      readTime="6 min"
      keywords={['financial crisis calculator', 'how long will savings last', 'emergency fund burn rate', 'financial runway calculator 2026', 'savings survival months']}
    >
      <p>
        A job loss, business failure, or unexpected medical bill can drain savings fast. The financial crisis simulator
        answers one question: given your current savings and monthly outgoings, how many months can you survive without income?
        The maths is straightforward — but most people have never run the numbers.
      </p>

      <h2>The Core Formula</h2>
      <p>Survival runway is determined by two variables: liquid savings and net monthly burn rate.</p>
      <pre className="formula-block">{
`Runway (months) = Liquid Savings ÷ Monthly Burn Rate

Monthly Burn Rate = Essential Expenses − Passive/Reduced Income`
      }</pre>

      <h3>What Counts as Liquid Savings?</h3>
      <ul>
        <li>Current accounts and instant-access savings</li>
        <li>Premium Bonds (accessible within days)</li>
        <li>Easy-access ISAs</li>
        <li><strong>Not:</strong> pension funds (before age 55/57), fixed-term bonds with penalty, property equity</li>
      </ul>

      <h3>What Counts as Essential Monthly Burn?</h3>
      <table>
        <thead><tr><th>Category</th><th>Example Monthly Cost</th><th>Reducible?</th></tr></thead>
        <tbody>
          <tr><td>Rent / mortgage</td><td>£1,200</td><td>Partially (mortgage holidays)</td></tr>
          <tr><td>Utilities + council tax</td><td>£280</td><td>Slightly</td></tr>
          <tr><td>Food</td><td>£350</td><td>Yes — down to ~£200</td></tr>
          <tr><td>Transport</td><td>£180</td><td>Yes</td></tr>
          <tr><td>Insurance (health, home)</td><td>£90</td><td>Minimal</td></tr>
          <tr><td>Debt minimums</td><td>£150</td><td>No</td></tr>
          <tr><td><strong>Total</strong></td><td><strong>£2,250</strong></td><td></td></tr>
        </tbody>
      </table>

      <h2>What-If Scenarios</h2>

      <h3>Scenario 1: Typical UK household</h3>
      <p>Savings: £8,000 | Monthly burn: £2,250 | Universal Credit: £700/month</p>
      <p>Net burn: £1,550/month → <strong>Runway: 5.2 months</strong></p>

      <h3>Scenario 2: Aggressive cost-cutter</h3>
      <p>Same savings, but reduces burn to £1,400 (cuts subscriptions, food, transport)</p>
      <p>Net burn: £700/month → <strong>Runway: 11.4 months</strong></p>
      <p>Lesson: reducing monthly outgoings has a bigger impact than increasing savings when time is short.</p>

      <h3>Scenario 3: High earner, low savings</h3>
      <p>Savings: £3,000 | Burn: £4,200/month | No benefits eligible</p>
      <p><strong>Runway: 0.7 months</strong> — under 3 weeks. Common profile: high income, lifestyle inflation, no buffer.</p>

      <h2>The 3-6-9 Month Framework</h2>
      <table>
        <thead><tr><th>Runway</th><th>Risk Level</th><th>Recommended Action</th></tr></thead>
        <tbody>
          <tr><td>Under 1 month</td><td>Critical</td><td>Immediate cost cuts + seek income urgently</td></tr>
          <tr><td>1–3 months</td><td>High</td><td>Cut discretionary spend, activate benefits</td></tr>
          <tr><td>3–6 months</td><td>Moderate</td><td>Job search runway is adequate for most roles</td></tr>
          <tr><td>6–12 months</td><td>Comfortable</td><td>Time to be selective; rebuild while searching</td></tr>
          <tr><td>12+ months</td><td>Resilient</td><td>Can weather most crisis scenarios</td></tr>
        </tbody>
      </table>

      <h2>Building Your Buffer</h2>
      <p>
        The standard advice is 3–6 months of expenses in liquid savings. For freelancers, contractors,
        or anyone with variable income, 6–12 months is more appropriate. The simulator helps you find
        your specific number — not a rule of thumb.
      </p>

      <h2>Frequently Asked Questions</h2>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "How do I calculate how long my savings will last?",
            "acceptedAnswer": { "@type": "Answer", "text": "Divide your total liquid savings by your monthly burn rate (essential expenses minus any passive income). The result is your survival runway in months." }},
          { "@type": "Question", "name": "What is a financial runway?",
            "acceptedAnswer": { "@type": "Answer", "text": "Financial runway is the number of months you can maintain your essential expenses using existing savings, without any employment income." }},
          { "@type": "Question", "name": "Does Universal Credit affect my financial runway calculation?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes. Any benefits, partner income, or rental income should be subtracted from your monthly burn rate before calculating runway. UC payments of £300–700/month can add 1–3 months to a typical runway." }},
          { "@type": "Question", "name": "Should I include my pension in emergency savings?",
            "acceptedAnswer": { "@type": "Answer", "text": "No. Pension funds are not accessible before age 55 (rising to 57 in 2028) without significant tax penalties. Only include genuinely liquid assets in runway calculations." }}
        ]
      })}} />

      <p className="tool-link">→ <a href="/crisis">Run your crisis simulation with the Financial Crisis Calculator</a></p>
      <p className="disclaimer">Indicative only. Does not account for all benefit entitlements, tax implications, or individual circumstances. Consult a financial adviser for personal guidance.</p>
    </GuideLayout>
  );
}
