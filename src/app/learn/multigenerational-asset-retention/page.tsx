import type { Metadata } from 'next';
import GuideLayout from '@/components/layout/GuideLayout';

export const metadata: Metadata = {
  title: 'Multi-Generational Bridge: Retaining Assets Across Generations | Plain Figures',
  description:
    'How financial advisors quantify and reduce AUM attrition at generational wealth transfers — the retention value equation, three-horizon engagement framework, and what-if scenarios.',
};

export default function MultigenerationalRetentionGuide() {
  return (
    <GuideLayout
      title="Multi-Generational Bridge: Retaining Assets Across Generations"
      description="The maths behind generational AUM attrition — and the retention value equation that makes heir engagement a quantifiable investment."
      readTime="6 min"
      relatedCalc={{ href: '/compound', label: 'Compound Growth Calculator' }}
      relatedGuides={[
        { href: '/learn/inheritance-pivot-heirs', label: 'Inheritance Pivot: Onboarding Heirs as Clients' },
        { href: '/learn/digital-client-experience-phygital', label: 'Digital Client Experience: Phygital Engagement Platforms' },
      ]}
    >
      <div className="guide-content">
        <p>
          An estimated €70 trillion in wealth is projected to transfer between generations globally over
          the next two decades. Research consistently shows that 70–80% of heirs switch advisors within
          one year of receiving an inheritance — not because of poor performance, but because no prior
          relationship exists. This guide quantifies the revenue at risk, models the retention
          economics, and outlines engagement strategies with measurable outcomes.
        </p>

        <h2>The Attrition Formula</h2>
        <div className="formula-block">
          <span className="formula-label">AUM at Risk</span>
          <pre>{`AUM at risk = Client AUM × Transfer probability × Heir attrition rate

Annual revenue at risk = AUM at risk × Advisory fee rate (%)`}</pre>
        </div>

        <table>
          <thead>
            <tr><th>Client AUM (€)</th><th>Transfer prob.</th><th>Attrition rate</th><th>AUM at risk (€)</th><th>Revenue at risk @ 0.75%</th></tr>
          </thead>
          <tbody>
            <tr><td>500,000</td><td>80%</td><td>75%</td><td>300,000</td><td>€2,250/yr</td></tr>
            <tr><td>2,000,000</td><td>80%</td><td>75%</td><td>1,200,000</td><td>€9,000/yr</td></tr>
            <tr><td>5,000,000</td><td>80%</td><td>75%</td><td>3,000,000</td><td>€22,500/yr</td></tr>
            <tr><td>10,000,000</td><td>80%</td><td>75%</td><td>6,000,000</td><td>€45,000/yr</td></tr>
          </tbody>
        </table>

        <h2>The Retention Value Equation</h2>
        <div className="formula-block">
          <span className="formula-label">Net Retention Value</span>
          <pre>{`Net retention value = (AUM retained × Fee rate × Relationship years)
                      − Heir engagement cost`}</pre>
        </div>
        <div className="example-block">
          <span className="example-label">Worked example — €2M estate, 20-year horizon</span>
          <div className="example-row"><span>Gross revenue (€2M × 0.75% × 20 yr)</span><span>€300,000</span></div>
          <div className="example-row"><span>Engagement cost (€2,000/yr × 10 pre-transfer years)</span><span>−€20,000</span></div>
          <div className="example-row"><span><strong>Net retention value</strong></span><span><strong>~€280,000</strong></span></div>
        </div>

        <h2>The Three-Horizon Engagement Framework</h2>
        <h3>Horizon 1: Foundation (10–15 years pre-transfer)</h3>
        <ul>
          <li>Map the full family structure and identify primary heirs</li>
          <li>Introduce the firm to adult heirs in an educational, non-sales context</li>
          <li>Offer financial literacy resources tailored to heir life stage</li>
        </ul>
        <h3>Horizon 2: Integration (3–9 years pre-transfer)</h3>
        <ul>
          <li>Include heirs in annual family financial review meetings (with client consent)</li>
          <li>Begin relationship-building with heirs as prospective clients in their own right</li>
          <li>Document family wealth structure in an accessible format</li>
        </ul>
        <h3>Horizon 3: Transition (0–2 years, transfer event)</h3>
        <ul>
          <li>Execute proactive outreach immediately upon transfer trigger</li>
          <li>Offer a dedicated heir onboarding process distinct from the parent&rsquo;s file</li>
          <li>Assign a relationship manager familiar with the family context</li>
        </ul>

        <h2>What-If Scenarios</h2>
        <div className="example-block">
          <span className="example-label">Scenario A — Attrition reduced from 75% to 40% through engagement</span>
          <p>On a €2M estate, AUM retained increases from €400K to €1.2M. Additional annual revenue (at 0.75%) = €6,000. Over 20 years, this represents ~€120,000 in additional gross revenue per client relationship.</p>
        </div>
        <div className="example-block">
          <span className="example-label">Scenario B — Programme costs €5,000/client/year</span>
          <p>For 20 high-value clients (avg. €3M AUM), total cost = €100,000/year. If the programme retains 50% of otherwise-lost AUM across 5 transitioning estates per year, retained AUM ≈ €3.75M/yr, generating €28,125 additional annual revenue. Payback ~3.5 years.</p>
        </div>
        <div className="example-block">
          <span className="example-label">Scenario C — Heir already has an existing advisor</span>
          <p>Conversion rate drops markedly to 15–25% vs. 50–65% where no prior relationship exists. Early engagement — before the heir has established their own advisory relationship — is significantly more effective than post-transfer outreach.</p>
        </div>

        <div className="key-point">
          The primary driver of heir attrition is the absence of a pre-existing relationship — not
          dissatisfaction with investment performance. Early, non-sales engagement is the highest-ROI
          retention strategy available to most advisory firms.
        </div>
      </div>
    </GuideLayout>
  );
}
