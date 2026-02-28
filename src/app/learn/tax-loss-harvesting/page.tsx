import type { Metadata } from 'next';
import GuideLayout from '@/components/layout/GuideLayout';

export const metadata: Metadata = {
  title: 'Tax-Loss Harvesting Strategies for Volatile Markets | Plain Figures',
  description:
    'How tax-loss harvesting works — after-tax alpha formula, German Abgeltungsteuer mechanics, harvest thresholds, replacement security selection, and what-if scenarios.',
};

export default function TaxLossHarvestingGuide() {
  return (
    <GuideLayout
      title="Tax-Loss Harvesting Strategies for Volatile Markets"
      description="How to convert portfolio drawdowns into measurable tax savings — the after-tax alpha formula, minimum harvest thresholds, and replacement security rules."
      readTime="5 min"
      relatedCalc={{ href: '/take-home', label: 'Take-Home Pay Calculator' }}
      relatedGuides={[
        { href: '/learn/private-credit-playbook', label: 'Private Credit Playbook: Diversifying Beyond Equities' },
        { href: '/learn/market-forecasts-rate-cuts', label: 'Market Forecasts: Impact of Rate Cuts & Geopolitics' },
      ]}
    >
      <div className="guide-content">
        <p>
          Tax-loss harvesting converts portfolio volatility into a tax efficiency tool. In markets with
          elevated drawdowns, positions temporarily below their cost basis create an opportunity to
          realise capital losses that offset gains elsewhere — reducing the current tax liability while
          maintaining equivalent market exposure through a replacement position. The strategy&rsquo;s value
          is a function of the tax rate, the size of available losses, transaction costs, and the
          quality of the replacement security.
        </p>

        <h2>The Core Formulae</h2>
        <div className="formula-block">
          <span className="formula-label">Tax Saving & After-Tax Alpha</span>
          <pre>{`Tax saving (€) = Realised loss (€) × Marginal CGT rate (%)

After-tax alpha (%) = Tax saving ÷ Portfolio value × 100

Net benefit = Tax saving − Transaction costs − Tracking error cost`}</pre>
        </div>

        <h3>German Abgeltungsteuer context</h3>
        <p>
          Germany applies a 25% flat capital gains tax plus 5.5% solidarity surcharge, giving an
          effective rate of approximately 26.375% for most investors. Losses within the same asset
          class pool (Verlustverrechnungstopf) can be carried forward and offset against future gains
          within the same custodian.
        </p>

        <h2>Worked Example</h2>
        <div className="example-block">
          <span className="example-label">€500,000 portfolio — position in drawdown</span>
          <div className="example-row"><span>Position cost basis</span><span>€40,000</span></div>
          <div className="example-row"><span>Current market value</span><span>€25,000</span></div>
          <div className="example-row"><span>Unrealised loss available</span><span>€15,000</span></div>
          <div className="example-row"><span>CGT rate (Germany)</span><span>26.375%</span></div>
          <div className="example-row"><span>Tax saving if harvested</span><span>€3,956</span></div>
          <div className="example-row"><span>Transaction costs (0.1% of €25K)</span><span>−€25</span></div>
          <div className="example-row"><span><strong>Net benefit</strong></span><span><strong>€3,931</strong></span></div>
          <div className="example-row"><span><strong>After-tax alpha</strong></span><span><strong>0.79%</strong></span></div>
        </div>

        <h2>Minimum Harvest Threshold</h2>
        <p>Not every loss is worth harvesting. The break-even minimum:</p>
        <div className="formula-block">
          <span className="formula-label">Minimum Harvestable Loss</span>
          <pre>{`Minimum loss = Transaction cost ÷ CGT rate

Example: €50 transaction cost ÷ 26.375% = €189.60
→ Only harvest losses above ~€190 to avoid a net negative outcome`}</pre>
        </div>

        <h2>Replacement Security Rules</h2>
        <ul>
          <li>Replace a single-country ETF with a broader regional equivalent (e.g. DAX ETF → Euro Stoxx 50 ETF)</li>
          <li>Replace a sector fund with a diversified equity index in the same broad category</li>
          <li>For bonds: replace a specific maturity with an adjacent maturity in the same credit quality band</li>
          <li>Hold the replacement for a minimum period before reconsidering the original (30+ days is common practice regardless of formal rules)</li>
        </ul>

        <h2>What-If Scenarios</h2>
        <div className="example-block">
          <span className="example-label">Scenario A — Market recovers before harvest is executed</span>
          <p>If a €15,000 unrealised loss recovers to €5,000 before action, the harvestable tax saving shrinks from €3,956 to €1,319. Pre-defined automated harvest triggers (e.g. alert at −10% drawdown per position) are more reliable than manual monitoring.</p>
        </div>
        <div className="example-block">
          <span className="example-label">Scenario B — Client has no gains to offset</span>
          <p>Harvested losses are carried forward to future years. At a 5% discount rate, a €3,956 saving deferred 3 years is worth ~€3,417 in today&rsquo;s terms — still beneficial, but reduced.</p>
        </div>
        <div className="example-block">
          <span className="example-label">Scenario C — Transaction costs higher at 0.50%</span>
          <p>On a €25,000 position, costs = €125. Net benefit = €3,956 − €125 = €3,831. Still positive. For smaller positions (e.g. €5,000), the same cost structure consumes a larger proportion — harvest thresholds should scale with position size.</p>
        </div>

        <div className="warning-point">
          Germany does not have a direct equivalent of the US wash-sale rule, but the Bundesfinanzhof
          has scrutinised transactions lacking economic substance. Repurchasing identical securities on
          the same day has been challenged. Legal advice specific to jurisdiction is essential.
        </div>
      </div>
    </GuideLayout>
  );
}
