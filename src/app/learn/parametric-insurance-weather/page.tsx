import type { Metadata } from 'next';
import GuideLayout from '@/components/layout/GuideLayout';

export const metadata: Metadata = {
  title: 'Parametric Insurance: Instant-Payout Weather Triggers | Plain Figures',
  description:
    'How parametric insurance works — trigger design, premium calculation, basis risk quantification, and what-if scenarios for advisors considering weather-indexed products.',
};

export default function ParametricInsuranceGuide() {
  return (
    <GuideLayout
      title="Parametric Insurance: Instant-Payout Weather Triggers"
      description="How parametric triggers, premiums, and basis risk work — the maths behind instant-payout climate and weather insurance products."
      readTime="5 min"
      relatedCalc={{ href: '/tcor', label: 'Total Cost of Risk Calculator' }}
      relatedGuides={[
        { href: '/learn/cyber-resilient-agency', label: 'Cyber-Resilient Agency: Protecting Client Data' },
        { href: '/learn/private-credit-playbook', label: 'Private Credit Playbook: Diversifying Beyond Equities' },
        { href: '/learn/business-interruption', label: 'Business Interruption Sum Insured: How It Works' },
      ]}
    >
      <div className="guide-content">
        <p>
          Parametric insurance pays a pre-agreed amount when a defined index — wind speed, rainfall,
          temperature — crosses a threshold, regardless of actual loss. Unlike traditional indemnity
          insurance, there is no claims adjustment: the trigger fires, the payment is made, often
          within days. The trade-off is basis risk: the possibility that the index payment does not
          match actual loss. This guide explains the mechanics, premium construction, and how to
          quantify basis risk.
        </p>

        <h2>How Parametric Triggers Work</h2>
        <div className="formula-block">
          <span className="formula-label">Trigger Logic</span>
          <pre>{`IF index_value ≥ trigger_threshold THEN pay fixed_amount
ELSE pay 0

Tiered structure (common for agriculture):
  rainfall < 20mm in 30 days  →  pay 100% of sum insured
  rainfall 20–40mm            →  pay 60% of sum insured
  rainfall > 40mm             →  pay 0`}</pre>
        </div>

        <h2>Premium Calculation</h2>
        <div className="formula-block">
          <span className="formula-label">Technical Premium</span>
          <pre>{`Technical premium = Sum insured × Trigger probability × (1 + Loading factor)

Where:
  Trigger probability = Historical frequency of index breaching threshold
  Loading factor      = Typically 30–60% of pure premium`}</pre>
        </div>

        <div className="example-block">
          <span className="example-label">Two worked examples</span>
          <table>
            <thead>
              <tr><th>Parameter</th><th>Wind cover</th><th>Drought cover</th></tr>
            </thead>
            <tbody>
              <tr><td>Sum insured</td><td>€200,000</td><td>€80,000</td></tr>
              <tr><td>Trigger</td><td>Wind ≥ 90 km/h</td><td>Rainfall &lt;25mm in 60 days</td></tr>
              <tr><td>Trigger probability</td><td>6% p.a.</td><td>12% p.a.</td></tr>
              <tr><td>Pure premium</td><td>€12,000</td><td>€9,600</td></tr>
              <tr><td>Loading (40%)</td><td>€4,800</td><td>€3,840</td></tr>
              <tr><td><strong>Annual premium</strong></td><td><strong>€16,800</strong></td><td><strong>€13,440</strong></td></tr>
            </tbody>
          </table>
        </div>

        <h2>Basis Risk: Quantification</h2>
        <p>Basis risk has two components:</p>
        <ul>
          <li><strong>Spatial basis risk:</strong> The measurement station is not co-located with the insured asset — wind at the station may not equal wind at the farm 30km away.</li>
          <li><strong>Product basis risk:</strong> The index parameter does not fully capture all loss drivers.</li>
        </ul>
        <div className="formula-block">
          <span className="formula-label">Basis Risk Assessment</span>
          <pre>{`Correlation (r) between index and actual loss:

r ≥ 0.90   →  Low basis risk (parametric suitable)
r 0.70–0.89 →  Moderate risk (tiered / hybrid structure recommended)
r < 0.70   →  High basis risk (indemnity may be more appropriate)`}</pre>
        </div>

        <h2>What-If Scenarios</h2>
        <div className="example-block">
          <span className="example-label">Scenario A — Trigger fires but no actual loss occurs</span>
          <p>Wind reaches 92 km/h at the station but the venue sustains no damage after recent reinforcement. Insured receives €200,000 on zero actual loss. Basis risk cuts both ways — over-insurance is one outcome, under-insurance is the other.</p>
        </div>
        <div className="example-block">
          <span className="example-label">Scenario B — Significant loss, trigger not breached</span>
          <p>A vineyard suffers €60,000 frost damage but the sensor recorded −5.8°C vs. the trigger of −6.0°C. Payout: €0. This is the worst-case basis risk scenario. Trigger design and station selection are critical structuring decisions.</p>
        </div>
        <div className="example-block">
          <span className="example-label">Scenario C — Climate change shifts trigger frequency</span>
          <p>A product designed on 1990–2020 data assigned 6% trigger probability. By 2030, climate trends may increase this to 10–12% annually. Insurer reprices at renewal: premium increases 67–100%. Parametric products require periodic recalibration against updated climate data.</p>
        </div>
      </div>
    </GuideLayout>
  );
}
