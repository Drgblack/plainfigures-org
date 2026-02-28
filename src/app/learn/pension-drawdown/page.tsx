import type { Metadata } from 'next';
import GuideLayout from '@/components/learn/GuideLayout';

export const metadata: Metadata = {
  title: 'Pension Drawdown: Sustainable Withdrawal Rates Explained',
  description: 'Understand how to calculate a sustainable pension withdrawal rate. Covers the 4% rule, sequence of returns risk, and safe withdrawal strategies for UK retirees.',
};

export default function Guide() {
  return (
    <GuideLayout
      number="G34"
      title="Pension Drawdown: Sustainable Withdrawal Rates Explained"
      readTime="6 min"
      keywords={['pension drawdown calculator UK', 'sustainable withdrawal rate pension', '4 percent rule UK', 'how much can I take from pension drawdown', 'sequence of returns risk pension']}
    >
      <p>
        Pension drawdown lets you take flexible income from your pension pot while the remainder
        stays invested. The central challenge: withdrawing too much too early depletes the fund;
        too little leaves money unspent. The question is — what rate is sustainable over 20–30 years?
      </p>

      <h2>The 4% Rule</h2>
      <p>
        The 4% rule, derived from the 1994 Bengen study on US equity/bond portfolios, states that
        withdrawing 4% of your pot in year one — and adjusting for inflation each subsequent year —
        has historically lasted 30 years in 96% of scenarios.
      </p>
      <pre className="formula-block">{
`Year 1 Withdrawal = Pot × 4%
Year 2 Withdrawal = Year 1 amount × (1 + inflation)
...and so on

Example: £400,000 pot
Year 1: £16,000
Year 2 (3% inflation): £16,480
Year 10: approximately £20,900`
      }</pre>

      <h2>UK Adjustments to the 4% Rule</h2>
      <p>The original rule was calibrated on US data. UK considerations:</p>
      <ul>
        <li>State Pension (up to £11,502/year) reduces the drawdown required from your pot</li>
        <li>UK equity returns have historically been slightly lower than US — some advisers suggest 3.5%</li>
        <li>Longer life expectancies may require planning to age 95+</li>
        <li>Income tax applies to drawdown above the 25% tax-free lump sum</li>
      </ul>

      <h2>Sequence of Returns Risk</h2>
      <p>
        A retiree who encounters a major market downturn in the first 5 years of drawdown is far
        more exposed than one who encounters it later. Selling units to fund withdrawals during a
        downturn locks in losses — the portfolio has fewer units to recover with.
      </p>
      <table>
        <thead><tr><th>Drawdown start year</th><th>Market crash in year</th><th>Portfolio survival (30y)</th></tr></thead>
        <tbody>
          <tr><td>2000 (dot-com)</td><td>1</td><td>Severely impacted</td></tr>
          <tr><td>2008 (GFC)</td><td>8</td><td>Less impacted</td></tr>
          <tr><td>2020 (COVID)</td><td>20</td><td>Minimal impact</td></tr>
        </tbody>
      </table>

      <h2>What-If Scenarios</h2>

      <h3>Scenario 1: State Pension reduces drawdown pressure</h3>
      <p>
        Target income: £30,000/year. State Pension: £11,502/year.
        Required from drawdown: £18,498 → on £400,000 pot, this is 4.6%.
        With State Pension deferral to age 70, State Pension rises to ~£14,600 → drawdown need falls to £15,400 (3.85%).
      </p>

      <h3>Scenario 2: Fixed annuity for base income + drawdown for discretionary</h3>
      <p>
        £200,000 buys annuity at ~£10,000/year (level) or ~£8,000/year (inflation-linked).
        Remaining £200,000 in drawdown at 4% = £8,000/year.
        Total income: ~£18,000 from pot + State Pension. Eliminates longevity risk on base spending.
      </p>

      <h3>Scenario 3: Bucket strategy</h3>
      <p>
        Bucket 1 (1–3 years cash): £60,000 in savings. Bucket 2 (4–10 years bonds/cautious): £140,000.
        Bucket 3 (10+ years equities): £200,000. Cash bucket insulates against early sequence of returns risk.
      </p>

      <h2>Frequently Asked Questions</h2>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "What is a safe pension withdrawal rate in the UK?",
            "acceptedAnswer": { "@type": "Answer", "text": "Many UK financial planners suggest 3.5–4% as a sustainable annual withdrawal rate from a balanced pension portfolio, adjusted for inflation each year. The State Pension reduces the amount you need to draw from your pot." }},
          { "@type": "Question", "name": "What is sequence of returns risk in pension drawdown?",
            "acceptedAnswer": { "@type": "Answer", "text": "Sequence of returns risk is the danger of encountering poor investment returns in the early years of drawdown. Selling units in a falling market to fund withdrawals reduces the portfolio's ability to recover, potentially depleting the fund prematurely." }},
          { "@type": "Question", "name": "How much pension pot do I need to retire on £30,000 a year?",
            "acceptedAnswer": { "@type": "Answer", "text": "With the full State Pension at £11,502 (2025/26), you need approximately £18,500/year from your pot. At a 4% withdrawal rate, this requires a pot of roughly £462,500. At 3.5%, it requires £528,500." }}
        ]
      })}} />

      <p className="tool-link">→ <a href="/retirement">Model your retirement pot with the Retirement Savings Calculator</a></p>
      <p className="disclaimer">Indicative only. Drawdown involves investment risk and is not suitable for everyone. The 4% rule is a heuristic, not a guarantee. Consult a regulated financial adviser before entering drawdown.</p>
    </GuideLayout>
  );
}
