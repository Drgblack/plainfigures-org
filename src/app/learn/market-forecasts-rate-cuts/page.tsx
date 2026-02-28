import type { Metadata } from 'next';
import GuideLayout from '@/components/layout/GuideLayout';

export const metadata: Metadata = {
  title: 'Market Forecasts: Impact of Rate Cuts & Geopolitics on Portfolios | Plain Figures',
  description:
    'How interest rate cuts and geopolitical events mathematically affect portfolio values — duration risk, Gordon Growth Model equity sensitivity, scenario analysis, and what-if scenarios.',
};

export default function MarketForecastsGuide() {
  return (
    <GuideLayout
      title="Market Forecasts: Impact of Rate Cuts & Geopolitics"
      description="The mechanical effect of rate changes on bond prices and equity valuations — plus a scenario analysis framework for geopolitical risk. No market commentary."
      readTime="6 min"
      relatedCalc={{ href: '/compound', label: 'Compound Growth Calculator' }}
      relatedGuides={[
        { href: '/learn/private-credit-playbook', label: 'Private Credit Playbook: Diversifying Beyond Equities' },
        { href: '/learn/tax-loss-harvesting', label: 'Tax-Loss Harvesting Strategies for Volatile Markets' },
        { href: '/learn/retirement-savings', label: 'How Retirement Savings Projections Work' },
      ]}
    >
      <div className="guide-content">
        <p>
          Rate cycles and geopolitical events are the two most common catalysts for client portfolio
          questions. Neither can be predicted with precision. Both can be modelled: quantifying the
          mechanical effect of a rate change on bond duration, the sensitivity of equity valuations to
          discount rate shifts, and the historical volatility patterns around geopolitical disruptions
          provides a structured basis for client conversations — without market commentary.
        </p>

        <h2>Interest Rate Effects: Duration Framework</h2>
        <div className="formula-block">
          <span className="formula-label">Bond Price Sensitivity</span>
          <pre>{`Approximate price change (%) ≈ −Modified Duration × Δyield

Modified Duration = Macaulay Duration ÷ (1 + yield / n)
Where n = coupon payments per year`}</pre>
        </div>

        <table>
          <thead>
            <tr><th>Bond type</th><th>Approx. modified duration</th><th>Price change per 100bp cut</th></tr>
          </thead>
          <tbody>
            <tr><td>2-year government bond</td><td>~1.9</td><td>+1.9%</td></tr>
            <tr><td>5-year government bond</td><td>~4.5</td><td>+4.5%</td></tr>
            <tr><td>10-year government bond</td><td>~8.5</td><td>+8.5%</td></tr>
            <tr><td>30-year government bond</td><td>~18–20</td><td>+18–20%</td></tr>
            <tr><td>Investment grade corporate (5yr)</td><td>~4.2</td><td>+4.2%</td></tr>
          </tbody>
        </table>

        <h2>Equity Valuation Sensitivity to Rate Cuts</h2>
        <div className="formula-block">
          <span className="formula-label">Gordon Growth Model</span>
          <pre>{`P = D₁ ÷ (r − g)

Where:
  P  = fair value estimate
  D₁ = next period's expected dividend
  r  = discount rate (risk-free + equity risk premium)
  g  = long-term growth rate

If r falls from 6.5% to 5.5%, g = 2.5%:
  Before: P = D₁ ÷ 0.040
  After:  P = D₁ ÷ 0.030
  Change: +33% in theoretical fair value`}</pre>
        </div>
        <p><em>This is a mechanical illustration, not a forecast. Real equity prices incorporate many other factors.</em></p>

        <h2>Geopolitical Risk: Scenario Framework</h2>
        <table>
          <thead>
            <tr><th>Scenario</th><th>Prob. (illustrative)</th><th>Global equities</th><th>EUR bonds</th><th>Energy prices</th></tr>
          </thead>
          <tbody>
            <tr><td>Base case</td><td>55%</td><td>+5 to +8%</td><td>+2 to +3%</td><td>±5%</td></tr>
            <tr><td>Regional trade disruption</td><td>25%</td><td>−5 to −10%</td><td>+1 to +4%</td><td>+10 to +20%</td></tr>
            <tr><td>Major geopolitical shock</td><td>15%</td><td>−15 to −25%</td><td>+3 to +8%</td><td>+25 to +50%</td></tr>
            <tr><td>Systemic financial contagion</td><td>5%</td><td>−30 to −50%</td><td>Variable</td><td>−10 to +30%</td></tr>
          </tbody>
        </table>

        <div className="formula-block">
          <span className="formula-label">Probability-Weighted Expected Return (60/40 portfolio example)</span>
          <pre>{`Expected return = Σ (Scenario probability × Portfolio return)

Base case:       55% × +6.5% = +3.6%
Trade disruption: 25% × −2.0% = −0.5%
Major shock:     15% × −12.0% = −1.8%
Systemic:         5% × −25.0% = −1.3%
                              ──────
Expected:                      +0.0%`}</pre>
        </div>

        <h2>What-If Scenarios</h2>
        <div className="example-block">
          <span className="example-label">Scenario A — ECB cuts 200bp over 18 months</span>
          <p>A 10-year bond with modified duration 8.5 would gain approximately 17% in price terms. Equity growth stocks with long-duration earnings profiles could see re-rating gains of 20–40% (all else equal). If cuts reignite inflation, this scenario partially reverses.</p>
        </div>
        <div className="example-block">
          <span className="example-label">Scenario B — Rates rise 1% unexpectedly</span>
          <p>The same 10-year bond loses approximately 8.5%. A €1M portfolio with 40% bond allocation (€400K) loses ~€34,000. Clients with near-term liquidity needs should not hold high-duration positions — the same sensitivity that creates rate-cut gains creates losses on unexpected rises.</p>
        </div>
        <div className="example-block">
          <span className="example-label">Scenario C — Geopolitical shock with flight to quality</span>
          <p>During a major shock, government bond yields typically fall (prices rise) as investors seek safety, while equities and corporate credit fall. A balanced 60/40 portfolio experiences partial natural hedging — the degree of offset depends on shock severity and speed of policy response.</p>
        </div>
      </div>
    </GuideLayout>
  );
}
