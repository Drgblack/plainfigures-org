import type { Metadata } from 'next';
import GuideLayout from '@/components/learn/GuideLayout';

export const metadata: Metadata = {
  title: 'Dividend Yield vs Growth Investing: Total Return Comparison',
  description: 'Compare dividend yield and growth investing strategies using total return calculations. Covers dividend reinvestment, capital growth, tax efficiency, and which approach suits different goals.',
};

export default function Guide() {
  return (
    <GuideLayout
      number="G40"
      title="Dividend Yield vs Growth Investing: Total Return Comparison"
      readTime="6 min"
      keywords={['dividend yield vs growth investing', 'total return investing explained', 'dividend reinvestment calculator UK', 'income vs growth portfolio comparison', 'DRIP investing explained']}
    >
      <p>
        Dividend investors prioritise regular income — a share of company profits paid out quarterly
        or annually. Growth investors prefer companies that reinvest profits to expand, expecting
        capital appreciation instead. Both can produce identical total returns; the difference is
        timing, tax treatment, and cashflow profile.
      </p>

      <h2>Total Return: The Unified Metric</h2>
      <pre className="formula-block">{
`Total Return = Capital Gain + Dividends Received

Example A (Dividend):
  Share price: £10 → £11 (+10%) + £0.50 dividend = 15% total return

Example B (Growth):
  Share price: £10 → £11.50 (+15%) + £0 dividend = 15% total return

Both produce 15% — but the profile and tax treatment differ.`
      }</pre>

      <h2>Tax Treatment (UK, 2025/26)</h2>
      <table>
        <thead><tr><th>Tax</th><th>Dividend Income</th><th>Capital Growth</th></tr></thead>
        <tbody>
          <tr><td>Annual tax-free allowance</td><td>£500 dividend allowance</td><td>£3,000 CGT exempt amount</td></tr>
          <tr><td>Basic rate (above allowance)</td><td>8.75%</td><td>18%</td></tr>
          <tr><td>Higher rate</td><td>33.75%</td><td>24%</td></tr>
          <tr><td>Additional rate</td><td>39.35%</td><td>24%</td></tr>
          <tr><td>Inside ISA/pension</td><td>0%</td><td>0%</td></tr>
          <tr><td>Control of timing</td><td>No</td><td>Yes</td></tr>
        </tbody>
      </table>
      <p>
        Growth investors have more control — they choose when to sell and realise gains, potentially
        staying within the CGT exemption each year. Dividend income is taxed when received, regardless.
      </p>

      <h2>Dividend Reinvestment (DRIP)</h2>
      <p>
        Reinvesting dividends rather than taking income accelerates compounding significantly.
        Over long periods, reinvested dividends account for 40–60% of total equity returns
        (depending on era and market).
      </p>
      <pre className="formula-block">{
`DRIP Formula: Same as compound interest
FV = PV × (1 + r)^n   where r includes reinvested dividend yield

£10,000 in fund yielding 3.5% dividend + 4% capital growth = 7.5% total
After 20 years: £10,000 × (1.075)^20 = £42,480 (DRIP)
Without DRIP (take dividends): capital portion only = £10,000 × (1.04)^20 = £21,910`
      }</pre>

      <h2>What-If Scenarios</h2>

      <h3>Scenario 1: Retirement income investor</h3>
      <p>
        £300,000 portfolio, 4% dividend yield = £12,000/year income. No need to sell shares.
        Suitable for someone needing predictable cashflow without managing drawdown.
        Tax consideration: if income exceeds £500 dividend allowance, tax applies at 33.75% (higher rate).
        Inside ISA: tax-free.
      </p>

      <h3>Scenario 2: Long-term growth investor, 25 years</h3>
      <p>£50,000 invested, 7.5% total return (DRIP vs income):</p>
      <table>
        <thead><tr><th>Strategy</th><th>After 25 years</th></tr></thead>
        <tbody>
          <tr><td>Full DRIP (reinvest all dividends)</td><td>£308,000</td></tr>
          <tr><td>Take dividends as income</td><td>£171,000 capital + £3,750/year income</td></tr>
        </tbody>
      </table>

      <h3>Scenario 3: Tax efficiency inside ISA</h3>
      <p>
        Inside a Stocks & Shares ISA, dividend tax and CGT are both zero. The choice between
        dividend and growth funds becomes purely one of preference — income need vs capital accumulation.
        Outside ISA, growth investors often have a marginal tax advantage through CGT timing control.
      </p>

      <h2>Frequently Asked Questions</h2>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "Is dividend investing better than growth investing?",
            "acceptedAnswer": { "@type": "Answer", "text": "Neither is universally better. Total returns can be identical. Dividend investing suits those needing regular income (e.g., retirees). Growth investing suits long-term accumulators who prefer to control when gains are realised. Tax treatment differs outside an ISA." }},
          { "@type": "Question", "name": "What is the dividend tax allowance for 2025/26?",
            "acceptedAnswer": { "@type": "Answer", "text": "The dividend allowance for 2025/26 is £500. Dividends above this are taxed at 8.75% (basic rate), 33.75% (higher rate), or 39.35% (additional rate). Dividends inside an ISA or pension are tax-free." }},
          { "@type": "Question", "name": "What is dividend reinvestment and does it improve returns?",
            "acceptedAnswer": { "@type": "Answer", "text": "Dividend reinvestment (DRIP) means using dividend payments to purchase additional shares rather than taking cash. Over 20+ years, reinvested dividends can account for the majority of total return due to compounding." }}
        ]
      })}} />

      <p className="tool-link">→ <a href="/savings">Model long-term investment growth with the Savings Calculator</a></p>
      <p className="disclaimer">Indicative only. Past investment returns are not a guide to future performance. Tax rules may change. Consult a financial adviser before making investment decisions.</p>
    </GuideLayout>
  );
}
