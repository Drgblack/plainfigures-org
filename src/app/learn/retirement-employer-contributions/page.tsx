import type { Metadata } from 'next';
import GuideLayout from '@/components/learn/GuideLayout';

export const metadata: Metadata = {
  title: 'Retirement Savings: How Employer Contributions & Inflation Change Everything',
  description: 'Understand how employer pension contributions and inflation affect retirement projections. Includes real contribution tables, inflation-adjusted returns, and what-if scenarios.',
};

export default function Guide() {
  return (
    <GuideLayout
      number="G30"
      title="Retirement Savings: Employer Contributions & Inflation Impact"
      readTime="7 min"
      keywords={['employer pension contribution calculator', 'how inflation affects retirement savings', 'pension auto enrolment contribution rates', 'real vs nominal pension returns', 'retirement savings projection 2026']}
    >
      <p>
        A pension projection that ignores employer contributions underestimates your pot by 30–50%.
        One that ignores inflation overestimates what that pot will buy. Most online calculators get
        at least one of these wrong. This guide explains both mechanics, so your projection reflects reality.
      </p>

      <h2>Employer Contributions: The Free Money Most People Undervalue</h2>
      <p>
        Under UK auto-enrolment (2024), the minimum total contribution is 8% of qualifying earnings,
        split at least 3% employer and 5% employee. But many employers offer significantly more.
      </p>

      <h3>Auto-Enrolment Qualifying Earnings Band (2025/26)</h3>
      <table>
        <thead><tr><th>Band</th><th>Annual</th><th>Monthly</th></tr></thead>
        <tbody>
          <tr><td>Lower threshold</td><td>£6,240</td><td>£520</td></tr>
          <tr><td>Upper threshold</td><td>£50,270</td><td>£4,189</td></tr>
          <tr><td>Qualifying band (contributions apply on)</td><td>£44,030</td><td>£3,669</td></tr>
        </tbody>
      </table>
      <p>
        Note: contributions apply only to earnings <em>within</em> the band, not total salary.
        A £60,000 earner's qualifying earnings for minimum contribution purposes is £44,030.
      </p>

      <h3>Total Contribution Examples at Different Employer Rates</h3>
      <table>
        <thead><tr><th>Salary</th><th>Employer %</th><th>Employee %</th><th>Annual Total</th></tr></thead>
        <tbody>
          <tr><td>£35,000</td><td>3%</td><td>5%</td><td>£2,282</td></tr>
          <tr><td>£35,000</td><td>6%</td><td>5%</td><td>£3,423</td></tr>
          <tr><td>£35,000</td><td>10%</td><td>5%</td><td>£4,563</td></tr>
          <tr><td>£60,000</td><td>3%</td><td>5%</td><td>£3,522</td></tr>
          <tr><td>£60,000</td><td>8%</td><td>5%</td><td>£5,764</td></tr>
        </tbody>
      </table>

      <h2>Inflation: The Silent Reducer</h2>
      <p>
        A pension pot of £500,000 in 30 years sounds substantial. At 3% average inflation,
        its purchasing power in today's money is only £206,000. This is the difference between
        nominal returns (what the number says) and real returns (what it buys).
      </p>
      <pre className="formula-block">{
`Real Return = ((1 + Nominal Rate) ÷ (1 + Inflation Rate)) − 1

Example: 7% nominal, 3% inflation
Real Return = (1.07 ÷ 1.03) − 1 = 3.88%`
      }</pre>

      <h2>What-If Scenarios</h2>

      <h3>Scenario 1: Minimum vs matched employer contributions</h3>
      <p>Age 28, salary £38,000, retiring at 67 (39 years), 6% nominal growth</p>
      <table>
        <thead><tr><th>Employer Rate</th><th>Nominal Pot</th><th>Real Pot (3% inflation)</th></tr></thead>
        <tbody>
          <tr><td>3% (minimum)</td><td>£312,000</td><td>£102,000</td></tr>
          <tr><td>6% (matched)</td><td>£468,000</td><td>£153,000</td></tr>
          <tr><td>10% (generous)</td><td>£624,000</td><td>£204,000</td></tr>
        </tbody>
      </table>

      <h3>Scenario 2: Starting late vs starting early</h3>
      <p>Same £400/month total contributions, 6% nominal, retiring at 67</p>
      <table>
        <thead><tr><th>Start Age</th><th>Years Contributing</th><th>Nominal Pot</th></tr></thead>
        <tbody>
          <tr><td>22</td><td>45</td><td>£875,000</td></tr>
          <tr><td>32</td><td>35</td><td>£492,000</td></tr>
          <tr><td>42</td><td>25</td><td>£264,000</td></tr>
          <tr><td>52</td><td>15</td><td>£118,000</td></tr>
        </tbody>
      </table>
      <p>Starting at 22 vs 32 produces 78% more — a decade of compounding matters enormously.</p>

      <h3>Scenario 3: Inflation sensitivity</h3>
      <p>£600,000 nominal pot at retirement — real value at different inflation rates:</p>
      <table>
        <thead><tr><th>Avg Inflation</th><th>Real Value (30-year horizon)</th></tr></thead>
        <tbody>
          <tr><td>2%</td><td>£331,000</td></tr>
          <tr><td>3%</td><td>£247,000</td></tr>
          <tr><td>4%</td><td>£185,000</td></tr>
          <tr><td>5%</td><td>£139,000</td></tr>
        </tbody>
      </table>

      <h2>The 4% Withdrawal Rule (and Why It's a Starting Point)</h2>
      <p>
        A common retirement rule: withdraw 4% of your pot annually and it should last 30 years
        (assumes ~7% nominal return, ~3% inflation). At £300,000 real pot, that's £12,000/year
        — supplemented by State Pension (£11,502/year full rate, 2025/26).
      </p>

      <h2>Frequently Asked Questions</h2>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "How much does employer pension contribution affect my retirement pot?",
            "acceptedAnswer": { "@type": "Answer", "text": "Significantly. Doubling the employer contribution from 3% to 6% on a £38,000 salary over 39 years adds approximately £156,000 in nominal terms to the final pot, assuming 6% annual growth." }},
          { "@type": "Question", "name": "What is the difference between nominal and real pension returns?",
            "acceptedAnswer": { "@type": "Answer", "text": "Nominal returns are the raw percentage growth of your fund. Real returns subtract inflation, showing what that growth actually buys. A 7% nominal return at 3% inflation gives approximately 3.9% real return." }},
          { "@type": "Question", "name": "What are the auto-enrolment minimum pension contributions in 2025?",
            "acceptedAnswer": { "@type": "Answer", "text": "The minimum total contribution is 8% of qualifying earnings: at least 3% from the employer and at least 5% from the employee (including tax relief). Qualifying earnings for 2025/26 are between £6,240 and £50,270." }},
          { "@type": "Question", "name": "How does inflation reduce my pension pot value?",
            "acceptedAnswer": { "@type": "Answer", "text": "A £500,000 pension pot in 30 years has the purchasing power of only £206,000 in today's money at 3% average inflation. The formula is: Real Value = Nominal Value ÷ (1 + inflation)^years." }}
        ]
      })}} />

      <p className="tool-link">→ <a href="/retirement">Project your retirement pot with the Retirement Savings Calculator</a></p>
      <p className="disclaimer">Indicative only. Pension rules, tax relief rates, and employer contribution obligations change. Consult a regulated financial adviser or pension specialist before making contribution decisions.</p>
    </GuideLayout>
  );
}
