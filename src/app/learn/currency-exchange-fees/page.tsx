import type { Metadata } from 'next';
import GuideLayout from '@/components/learn/GuideLayout';

export const metadata: Metadata = {
  title: 'Currency Exchange: Real Cost of FX Fees and Spread Over Time',
  description: 'Calculate the true cost of currency exchange fees, spread markup, and poor rates. Compares providers and shows how small margins compound over time for regular transfers.',
};

export default function Guide() {
  return (
    <GuideLayout
      number="G39"
      title="Currency Exchange: The Real Cost of FX Fees and Spread"
      readTime="5 min"
      keywords={['currency exchange fee calculator', 'real cost of FX fees', 'bank vs specialist FX provider', 'currency exchange spread explained', 'best way to transfer money abroad UK 2025']}
    >
      <p>
        When you exchange currency, you rarely see the full cost. The headline exchange rate shown by
        banks includes a markup above the interbank (mid-market) rate. Add fixed transaction fees
        and the actual cost can reach 3–5% of the transfer value — far more than advertised "no fee" services imply.
      </p>

      <h2>How the Hidden Cost Works</h2>
      <pre className="formula-block">{
`True FX Cost = (Spread × Transfer Amount) + Fixed Fees

Spread = (Mid-market rate − Provider rate) ÷ Mid-market rate × 100

Example: Mid-market rate £1 = €1.1850
Bank rate offered: £1 = €1.1500
Spread: (1.1850 − 1.1500) ÷ 1.1850 × 100 = 2.95%

On £10,000 transfer: Hidden cost = £295 + any fixed fees`
      }</pre>

      <h2>Provider Comparison (Illustrative, not real-time)</h2>
      <table>
        <thead><tr><th>Provider Type</th><th>Typical Spread</th><th>Fixed Fee</th><th>Cost on £10,000</th></tr></thead>
        <tbody>
          <tr><td>High street bank</td><td>2.5–4%</td><td>£0–£25</td><td>£250–£425</td></tr>
          <tr><td>Post Office / travel money</td><td>2–3.5%</td><td>£0</td><td>£200–£350</td></tr>
          <tr><td>Specialist FX broker</td><td>0.3–1%</td><td>£0–£10</td><td>£30–£110</td></tr>
          <tr><td>Multi-currency card (Wise etc.)</td><td>0.4–0.7%</td><td>Small</td><td>£40–£75</td></tr>
          <tr><td>Crypto exchange</td><td>0.5–2% + volatility</td><td>Variable</td><td>Variable</td></tr>
        </tbody>
      </table>
      <p>Rates are illustrative. Always compare live rates before transferring.</p>

      <h2>What-If Scenarios</h2>

      <h3>Scenario 1: Annual overseas property maintenance</h3>
      <p>Regular transfers of £2,000/month (£24,000/year) to eurozone property costs</p>
      <table>
        <thead><tr><th>Provider</th><th>Spread</th><th>Annual Cost</th></tr></thead>
        <tbody>
          <tr><td>Bank (3%)</td><td>3%</td><td>£720</td></tr>
          <tr><td>Specialist broker (0.5%)</td><td>0.5%</td><td>£120</td></tr>
          <tr><td><strong>Saving</strong></td><td></td><td><strong>£600/year</strong></td></tr>
        </tbody>
      </table>

      <h3>Scenario 2: One-off large transfer (buying property abroad)</h3>
      <p>£200,000 transfer. Bank at 2.5% spread = £5,000 hidden cost. Specialist at 0.4% = £800. Saving: £4,200.</p>

      <h3>Scenario 3: Holiday money — when spread matters less</h3>
      <p>
        £1,000 holiday money. At 3% spread vs 0.5%: difference = £25. For small amounts,
        convenience may outweigh the saving. The calculation matters most for large or regular transfers.
      </p>

      <h2>Frequently Asked Questions</h2>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "What is the mid-market exchange rate?",
            "acceptedAnswer": { "@type": "Answer", "text": "The mid-market rate (or interbank rate) is the midpoint between buy and sell rates on global currency markets. It is the 'real' rate shown on Reuters or Google. Retail providers mark up from this rate to generate profit — the difference is the spread." }},
          { "@type": "Question", "name": "Why do banks charge more for currency exchange than specialist providers?",
            "acceptedAnswer": { "@type": "Answer", "text": "Banks bundle FX revenue into their spread rather than charging explicit fees. Specialist FX providers operate with higher volumes and lower margins, passing savings to customers. On large transfers, the difference can be thousands of pounds." }},
          { "@type": "Question", "name": "When is it worth using a specialist FX broker?",
            "acceptedAnswer": { "@type": "Answer", "text": "Specialist brokers are worth using for transfers above approximately £2,000–£5,000. Below that, the absolute saving is small. For regular overseas transfers or property purchases, the saving compounds significantly over time." }}
        ]
      })}} />

      <p className="tool-link">→ <a href="/savings">Model regular overseas costs with the Savings Growth Calculator</a></p>
      <p className="disclaimer">Indicative only. FX rates change by the second. Always get live quotes from multiple providers before transferring. This guide does not recommend specific providers.</p>
    </GuideLayout>
  );
}
