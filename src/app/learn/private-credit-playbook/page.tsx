import type { Metadata } from 'next';
import GuideLayout from '@/components/layout/GuideLayout';

export const metadata: Metadata = {
  title: 'Private Credit Playbook: Diversifying Beyond Equities | Plain Figures',
  description:
    'How private credit yields are constructed, how illiquidity premium is calculated, allocation sizing with a liquidity adequacy test, and what-if scenarios for advisors.',
};

export default function PrivateCreditGuide() {
  return (
    <GuideLayout
      title="Private Credit Playbook: Diversifying Beyond Equities"
      description="How private credit yields are built, how to size an allocation, and where the structural risks lie — without the marketing overlay."
      readTime="6 min"
      relatedCalc={{ href: '/compound', label: 'Compound Growth Calculator' }}
      relatedGuides={[
        { href: '/learn/tax-loss-harvesting', label: 'Tax-Loss Harvesting Strategies for Volatile Markets' },
        { href: '/learn/market-forecasts-rate-cuts', label: 'Market Forecasts: Impact of Rate Cuts & Geopolitics' },
        { href: '/learn/parametric-insurance-weather', label: 'Parametric Insurance: Instant-Payout Weather Triggers' },
      ]}
    >
      <div className="guide-content">
        <p>
          Private credit has grown from a niche institutional allocation to a multi-trillion-dollar
          asset class. For advisors serving high-net-worth clients, it offers a yield premium over
          public fixed income, low correlation to listed equities, and floating-rate structures that
          held up well in rising rate environments. Understanding the mechanics — how yields are
          constructed, how risk is priced, and where structural risks lie — is essential before
          recommending allocation.
        </p>

        <h2>Yield Construction</h2>
        <div className="formula-block">
          <span className="formula-label">Private Credit Yield Components</span>
          <pre>{`Private credit yield = Risk-free rate
                     + Credit spread
                     + Illiquidity premium
                     + Complexity / origination premium

Example (2025 context):
  Risk-free rate (EURIBOR 3M):      3.25%
  Credit spread (mid-market loan): +3.50%
  Illiquidity premium:             +2.00%
  Complexity premium:              +0.75%
                                   ──────
  Total indicative yield:           9.50%`}</pre>
        </div>

        <h2>Risk-Return Comparison</h2>
        <table>
          <thead>
            <tr><th>Asset class</th><th>Indicative yield</th><th>Liquidity</th><th>Volatility</th><th>Equity correlation</th></tr>
          </thead>
          <tbody>
            <tr><td>Government bonds (10yr EUR)</td><td>2.8–3.2%</td><td>High</td><td>Low–Med</td><td>Low / negative</td></tr>
            <tr><td>Investment grade corporate</td><td>3.5–4.5%</td><td>High</td><td>Low–Med</td><td>Low</td></tr>
            <tr><td>High yield bonds</td><td>6.5–8.5%</td><td>Medium</td><td>Med–High</td><td>Medium</td></tr>
            <tr><td>Private credit (direct lending)</td><td>8.0–11.0%</td><td>Low (3–7yr lock)</td><td>Low*</td><td>Low</td></tr>
            <tr><td>Equities (broad index)</td><td>7–10% total return</td><td>High</td><td>High</td><td>1.0</td></tr>
          </tbody>
        </table>
        <p><em>*Private credit volatility appears low due to infrequent mark-to-model valuation, not because underlying credit risk is absent.</em></p>

        <h2>Allocation Sizing</h2>
        <div className="formula-block">
          <span className="formula-label">Minimum Portfolio Size</span>
          <pre>{`Min investable AUM = Fund minimum subscription ÷ Target allocation %

Example: €250,000 minimum ÷ 10% target = €2,500,000 minimum portfolio`}</pre>
        </div>
        <div className="formula-block">
          <span className="formula-label">Liquidity Adequacy Test</span>
          <pre>{`Max private credit = (Total AUM − 3-yr liquidity reserve) × Illiquidity tolerance %

Example: €3M portfolio, €500K reserve, 40% tolerance:
Max = (€3M − €500K) × 40% = €1,000,000 (33% of total AUM)`}</pre>
        </div>

        <h2>What-If Scenarios</h2>
        <div className="example-block">
          <span className="example-label">Scenario A — Default rate rises from 2% to 5%</span>
          <p>In a mid-market fund with 30 loans, 5% default implies 1–2 defaults. With 40% recovery rate, net loss = ~3% of capital. Against a 9.5% gross yield, net yield compresses to ~6.5%. Still above public HY equivalents, but the cushion narrows in a recessionary environment.</p>
        </div>
        <div className="example-block">
          <span className="example-label">Scenario B — EURIBOR drops 200bp (rate cut cycle)</span>
          <p>Floating-rate private credit yields fall in tandem. A loan at EURIBOR + 550bp: at EURIBOR 3.25%, yield = 8.75%; at EURIBOR 1.25%, yield = 6.75%. Investors locked into long-duration commitments face falling income in a rate-cut environment.</p>
        </div>
        <div className="example-block">
          <span className="example-label">Scenario C — Client needs liquidity mid-lock-up</span>
          <p>Private credit funds typically have 5–7 year lock-up periods. Secondary market sales are possible but at discounts of 10–20% to NAV in stressed conditions. The allocation must not exceed the client&rsquo;s true illiquidity tolerance.</p>
        </div>

        <div className="warning-point">
          Private credit is illiquid and lightly regulated. Suitable only for sophisticated or
          professional investors. Consult fund documentation and qualified legal / financial advice
          before allocating.
        </div>
      </div>
    </GuideLayout>
  );
}
