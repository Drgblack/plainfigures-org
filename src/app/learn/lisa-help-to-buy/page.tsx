import type { Metadata } from 'next';
import GuideLayout from '@/components/learn/GuideLayout';

export const metadata: Metadata = {
  title: 'Help to Buy ISA and LISA: When the Bonus Actually Helps',
  description: 'Compare the Lifetime ISA and Help to Buy ISA government bonuses for first-time buyers. Covers contribution limits, property price caps, withdrawal penalties, and worked examples.',
};

export default function Guide() {
  return (
    <GuideLayout
      number="G37"
      title="LISA vs Help to Buy ISA: When the Government Bonus Actually Helps"
      readTime="5 min"
      keywords={['lifetime ISA calculator UK', 'LISA vs help to buy ISA', 'lifetime ISA property purchase bonus', 'first time buyer government bonus 2025', 'LISA withdrawal penalty how it works']}
    >
      <p>
        The Lifetime ISA (LISA) and its predecessor the Help to Buy ISA both offer a 25% government
        bonus on savings for a first home. The Help to Buy ISA closed to new applicants in 2019
        (existing accounts run until 2030), so the LISA is the current option. The bonus sounds
        straightforward — but the withdrawal penalty structure can make it punishing if circumstances change.
      </p>

      <h2>LISA at a Glance (2025/26)</h2>
      <table>
        <thead><tr><th>Feature</th><th>Detail</th></tr></thead>
        <tbody>
          <tr><td>Annual contribution limit</td><td>£4,000</td></tr>
          <tr><td>Government bonus</td><td>25% (max £1,000/year)</td></tr>
          <tr><td>Eligibility age</td><td>18–39 (open by 39th birthday)</td></tr>
          <tr><td>Property price cap</td><td>£450,000</td></tr>
          <tr><td>Earliest property use</td><td>12 months after first contribution</td></tr>
          <tr><td>Withdrawal penalty (non-qualifying)</td><td>25% of withdrawal amount</td></tr>
          <tr><td>Effective penalty on contributions</td><td>6.25% of your own money</td></tr>
        </tbody>
      </table>

      <h2>The 25% Penalty Explained</h2>
      <p>The penalty appears to be 25%, but it's applied to the total (contributions + bonus), which means:</p>
      <pre className="formula-block">{
`You put in: £4,000
Bonus added: £1,000
Total: £5,000

Penalty (25% of £5,000): £1,250

You receive: £5,000 − £1,250 = £3,750
You lose: £250 of your own contributions (6.25% effective penalty)`
      }</pre>

      <h2>What-If Scenarios</h2>

      <h3>Scenario 1: Maximum LISA benefit over 5 years</h3>
      <p>Open at 25, contribute £4,000/year for 5 years before buying:</p>
      <table>
        <thead><tr><th>Item</th><th>Amount</th></tr></thead>
        <tbody>
          <tr><td>Total contributions</td><td>£20,000</td></tr>
          <tr><td>Government bonuses received</td><td>£5,000</td></tr>
          <tr><td>Growth (est. 4% stocks & shares)</td><td>~£5,400</td></tr>
          <tr><td><strong>Total available for deposit</strong></td><td><strong>~£30,400</strong></td></tr>
        </tbody>
      </table>

      <h3>Scenario 2: Property over £450,000 — LISA becomes unusable</h3>
      <p>
        In London and the South East, many first-time buyers target properties above £450,000.
        The LISA cannot be used for these purchases. You'd face the 25% withdrawal penalty — or
        leave the money locked until age 60. Consider a Stocks & Shares ISA instead for flexibility.
      </p>

      <h3>Scenario 3: Buying within 12 months</h3>
      <p>
        The LISA requires 12 months to pass after the first contribution before it can be used
        for a property purchase. If you're planning to buy within a year, the bonus is inaccessible
        in time — a regular cash ISA or savings account may be more practical.
      </p>

      <h2>Frequently Asked Questions</h2>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "What is the Lifetime ISA property price limit?",
            "acceptedAnswer": { "@type": "Answer", "text": "The Lifetime ISA can only be used for a first property purchase priced at £450,000 or less. If your property costs more, you cannot use the LISA and will face a 25% withdrawal penalty on any withdrawals." }},
          { "@type": "Question", "name": "What is the real penalty for withdrawing from a LISA early?",
            "acceptedAnswer": { "@type": "Answer", "text": "The 25% withdrawal charge applies to the full balance (your contributions plus the government bonus). This means you effectively lose 6.25% of your own contributions — not just the bonus." }},
          { "@type": "Question", "name": "Is a LISA better than a Help to Buy ISA?",
            "acceptedAnswer": { "@type": "Answer", "text": "The Help to Buy ISA is closed to new applicants. For new savers, the LISA offers a higher annual contribution (£4,000 vs £200/month for HtB ISA) and a larger potential bonus (£1,000/year vs £3,000 lifetime). The property price cap is £450,000 for both." }}
        ]
      })}} />

      <p className="tool-link">→ <a href="/savings">Model your savings growth with the Savings Calculator</a></p>
      <p className="disclaimer">Indicative only. LISA rules, bonuses, and penalties may change. Always check HMRC guidance before opening a LISA for property purchase.</p>
    </GuideLayout>
  );
}
