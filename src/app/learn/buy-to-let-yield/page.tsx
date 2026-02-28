import type { Metadata } from 'next';
import GuideLayout from '@/components/learn/GuideLayout';

export const metadata: Metadata = {
  title: 'Buy-to-Let Yield: Gross vs Net vs Cash-on-Cash Return',
  description: 'Understand the three types of buy-to-let yield: gross, net, and cash-on-cash. Includes a full cost breakdown and worked examples for UK landlords.',
};

export default function Guide() {
  return (
    <GuideLayout
      number="G32"
      title="Buy-to-Let Yield: Gross, Net, and Cash-on-Cash Return Explained"
      readTime="6 min"
      keywords={['buy to let yield calculator UK', 'gross vs net rental yield', 'cash on cash return property', 'buy to let return calculation 2026', 'rental yield how to calculate']}
    >
      <p>
        Rental yield is the annual return on a property investment expressed as a percentage of its value.
        There are three versions — gross, net, and cash-on-cash — and they can differ by 3–5 percentage points
        on the same property. Using the wrong one produces dangerously misleading comparisons.
      </p>

      <h2>Gross Yield</h2>
      <pre className="formula-block">{
`Gross Yield = (Annual Rent ÷ Property Value) × 100

Example: £14,400 annual rent ÷ £220,000 property = 6.5% gross yield`
      }</pre>
      <p>Gross yield is useful for quick comparison between properties. It ignores all costs.</p>

      <h2>Net Yield</h2>
      <pre className="formula-block">{
`Net Yield = ((Annual Rent − Annual Costs) ÷ Property Value) × 100

Annual Costs typically include:
- Letting agent fees (8–15% of rent)
- Maintenance and repairs (estimate 1% of property value/year)
- Landlord insurance
- Void periods (1–2 months/year)
- Gas safety, EPC, EICR certificates
- Accountancy fees`
      }</pre>

      <h3>Example Net Yield Calculation</h3>
      <table>
        <thead><tr><th>Item</th><th>Annual Amount</th></tr></thead>
        <tbody>
          <tr><td>Gross rent (£1,200/month)</td><td>£14,400</td></tr>
          <tr><td>Letting agent (10%)</td><td>−£1,440</td></tr>
          <tr><td>Maintenance (1% of £220k)</td><td>−£2,200</td></tr>
          <tr><td>Insurance</td><td>−£400</td></tr>
          <tr><td>Void (1 month)</td><td>−£1,200</td></tr>
          <tr><td>Certificates + misc</td><td>−£350</td></tr>
          <tr><td><strong>Net income</strong></td><td><strong>£8,810</strong></td></tr>
          <tr><td><strong>Net yield</strong></td><td><strong>4.0%</strong></td></tr>
        </tbody>
      </table>

      <h2>Cash-on-Cash Return</h2>
      <pre className="formula-block">{
`Cash-on-Cash Return = (Annual Net Cash Flow ÷ Cash Invested) × 100

Cash Invested = Deposit + Stamp Duty + Legal Fees + Renovation

This metric measures return on YOUR money, not the total property value.
Leverage amplifies both gains and losses.`
      }</pre>

      <h3>Cash-on-Cash Example (75% LTV Mortgage)</h3>
      <table>
        <thead><tr><th>Item</th><th>Amount</th></tr></thead>
        <tbody>
          <tr><td>Property value</td><td>£220,000</td></tr>
          <tr><td>Deposit (25%)</td><td>£55,000</td></tr>
          <tr><td>Stamp duty (additional property)</td><td>£8,850</td></tr>
          <tr><td>Legal fees + survey</td><td>£2,500</td></tr>
          <tr><td><strong>Total cash invested</strong></td><td><strong>£66,350</strong></td></tr>
          <tr><td>Net rental income</td><td>£8,810</td></tr>
          <tr><td>Mortgage interest (5.5% on £165k)</td><td>−£9,075</td></tr>
          <tr><td><strong>Net cash flow</strong></td><td><strong>−£265/year</strong></td></tr>
          <tr><td><strong>Cash-on-cash return</strong></td><td><strong>−0.4%</strong></td></tr>
        </tbody>
      </table>
      <p>This property looks viable on gross yield (6.5%) but produces negative cash flow at current mortgage rates. Capital growth assumptions are separate.</p>

      <h2>What-If Scenarios</h2>

      <h3>Scenario 1: Northern city at £120k vs London at £500k</h3>
      <table>
        <thead><tr><th>Metric</th><th>Northern city (£120k)</th><th>London (£500k)</th></tr></thead>
        <tbody>
          <tr><td>Monthly rent</td><td>£750</td><td>£2,200</td></tr>
          <tr><td>Gross yield</td><td>7.5%</td><td>5.3%</td></tr>
          <tr><td>Est. net yield</td><td>4.8%</td><td>3.1%</td></tr>
        </tbody>
      </table>

      <h3>Scenario 2: Impact of mortgage rate on cash flow</h3>
      <p>£220k property, 75% LTV, £8,810 net rental income:</p>
      <table>
        <thead><tr><th>Mortgage Rate</th><th>Annual Interest</th><th>Annual Cash Flow</th></tr></thead>
        <tbody>
          <tr><td>2.5%</td><td>£4,125</td><td>+£4,685</td></tr>
          <tr><td>4.0%</td><td>£6,600</td><td>+£2,210</td></tr>
          <tr><td>5.5%</td><td>£9,075</td><td>−£265</td></tr>
          <tr><td>6.5%</td><td>£10,725</td><td>−£1,915</td></tr>
        </tbody>
      </table>

      <h2>Frequently Asked Questions</h2>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "What is a good rental yield in the UK?",
            "acceptedAnswer": { "@type": "Answer", "text": "A gross yield of 6–8% is generally considered good in the UK. Net yields of 4–5% after costs are typical for well-managed properties. Cash-on-cash return depends heavily on mortgage rates and leverage." }},
          { "@type": "Question", "name": "What is the difference between gross and net rental yield?",
            "acceptedAnswer": { "@type": "Answer", "text": "Gross yield divides annual rent by property value. Net yield subtracts all annual costs (agent fees, maintenance, insurance, voids) before dividing by property value. Net yield is the more realistic measure." }},
          { "@type": "Question", "name": "How does the 2025 stamp duty change affect buy-to-let returns?",
            "acceptedAnswer": { "@type": "Answer", "text": "From April 2025, the additional dwelling surcharge increased to 5% (from 3%), raising the upfront cost of purchasing a buy-to-let property and reducing the cash-on-cash return, particularly on lower-value properties where stamp duty is proportionally higher." }}
        ]
      })}} />

      <p className="tool-link">→ <a href="/savings">Model your investment returns with the Savings Growth Calculator</a></p>
      <p className="disclaimer">Indicative only. Tax treatment of rental income (Section 24 mortgage interest restriction, capital gains tax) is not included in these calculations. Consult a property accountant or financial adviser.</p>
    </GuideLayout>
  );
}
