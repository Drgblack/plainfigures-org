import type { Metadata } from 'next';
import GuideLayout from '@/components/learn/GuideLayout';

export const metadata: Metadata = {
  title: 'Emergency Fund: How Much Is Enough?',
  description: 'Calculate the right emergency fund size for your situation. Covers the 3-6 month rule, variable income adjustments, and where to keep your buffer.',
};

export default function Guide() {
  return (
    <GuideLayout
      number="G31"
      title="Emergency Fund: How Much Is Enough?"
      readTime="5 min"
      keywords={['emergency fund calculator UK', 'how much emergency fund do I need', 'emergency savings 3 6 months rule', 'how to calculate emergency fund 2026', 'emergency fund self employed']}
    >
      <p>
        An emergency fund is liquid savings reserved for unplanned essential expenses — job loss,
        boiler failure, car breakdown, or medical cost. The standard advice is "3 to 6 months of expenses,"
        but that range is wide enough to be unhelpful. The right number depends on your income stability,
        dependants, and fixed obligations.
      </p>

      <h2>The Baseline Calculation</h2>
      <pre className="formula-block">{
`Target Emergency Fund = Monthly Essential Expenses × Safety Months

Safety Months:
- Employed, dual income household: 3 months
- Employed, single income: 4–5 months
- Freelance / contractor: 6–9 months
- Business owner / highly variable income: 9–12 months`
      }</pre>

      <h2>Essential vs Total Expenses</h2>
      <p>The fund covers <em>essential</em> spending only — not your current lifestyle.</p>
      <table>
        <thead><tr><th>Category</th><th>Include?</th><th>Note</th></tr></thead>
        <tbody>
          <tr><td>Rent/mortgage</td><td>Yes</td><td>Core obligation</td></tr>
          <tr><td>Council tax</td><td>Yes</td><td>Legal requirement</td></tr>
          <tr><td>Utilities</td><td>Yes</td><td>Gas, electric, water</td></tr>
          <tr><td>Food</td><td>Yes</td><td>Budget amount, not current spend</td></tr>
          <tr><td>Insurance</td><td>Yes</td><td>Health, home, car</td></tr>
          <tr><td>Debt minimums</td><td>Yes</td><td>Avoid default</td></tr>
          <tr><td>Subscriptions</td><td>No</td><td>Cancel in crisis</td></tr>
          <tr><td>Dining out</td><td>No</td><td>Discretionary</td></tr>
          <tr><td>Holidays</td><td>No</td><td>Discretionary</td></tr>
        </tbody>
      </table>

      <h2>What-If Scenarios</h2>

      <h3>Scenario 1: Dual-income employed couple, no children</h3>
      <p>Essential monthly: £2,100 | Target: 3 months → <strong>£6,300</strong></p>

      <h3>Scenario 2: Single parent, one income, two children</h3>
      <p>Essential monthly: £2,800 | Target: 5 months → <strong>£14,000</strong></p>
      <p>Children increase both the essential spend and the risk of needing the fund (illness, school costs).</p>

      <h3>Scenario 3: Freelance designer, irregular income</h3>
      <p>Essential monthly: £1,900 | Target: 9 months → <strong>£17,100</strong></p>
      <p>
        Freelancers should also hold a separate tax reserve (roughly 25–30% of gross income)
        — this is not part of the emergency fund.
      </p>

      <h2>Where to Keep It</h2>
      <table>
        <thead><tr><th>Account Type</th><th>Access</th><th>2025 Rate Range</th><th>Suitable?</th></tr></thead>
        <tbody>
          <tr><td>Easy-access savings</td><td>Same day</td><td>4.5–5.1%</td><td>Yes — ideal</td></tr>
          <tr><td>Cash ISA (easy access)</td><td>Same day</td><td>4.2–4.8%</td><td>Yes</td></tr>
          <tr><td>Premium Bonds</td><td>1–3 days</td><td>~4.4% prize rate</td><td>Yes</td></tr>
          <tr><td>Fixed-term bond</td><td>At term end only</td><td>4.8–5.3%</td><td>No — too illiquid</td></tr>
          <tr><td>Stocks & Shares ISA</td><td>Days but value varies</td><td>Variable</td><td>No — not for emergency</td></tr>
        </tbody>
      </table>

      <h2>Frequently Asked Questions</h2>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "How much emergency fund do I need in the UK?",
            "acceptedAnswer": { "@type": "Answer", "text": "Multiply your monthly essential expenses by your safety buffer: 3 months for dual-income employed households, 5–6 months for single-income, and 6–12 months for freelancers or business owners." }},
          { "@type": "Question", "name": "Should an emergency fund include rent or mortgage?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes. Rent and mortgage are your largest essential obligations and must be included in the emergency fund target calculation." }},
          { "@type": "Question", "name": "Is Premium Bonds a good place for an emergency fund?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes, with caveats. Premium Bonds are fully accessible (1–3 day withdrawal), FSCS-backed via NS&I, and offer a prize rate currently around 4.4%. The downside is variable returns — you might earn less than a high-interest savings account in a given month." }}
        ]
      })}} />

      <p className="tool-link">→ <a href="/crisis">Use the Financial Crisis Simulator to check your current runway</a></p>
      <p className="disclaimer">Indicative only. Savings rates change frequently. Consult a financial adviser for personalised guidance.</p>
    </GuideLayout>
  );
}
