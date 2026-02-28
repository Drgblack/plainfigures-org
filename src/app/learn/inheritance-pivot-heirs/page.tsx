import type { Metadata } from 'next';
import GuideLayout from '@/components/layout/GuideLayout';

export const metadata: Metadata = {
  title: 'Inheritance Pivot: Onboarding Heirs as Clients | Plain Figures',
  description:
    'How to convert heirs into long-term advisory clients — LTV calculation, heir profiling, regulatory onboarding requirements, and what-if scenarios for wealth transfer events.',
};

export default function InheritancePivotGuide() {
  return (
    <GuideLayout
      title="Inheritance Pivot: Onboarding Heirs as Clients"
      description="The economics of converting an inheritance event into a new long-term client relationship — LTV modelling, heir profiling, and regulatory requirements."
      readTime="6 min"
      relatedCalc={{ href: '/compound', label: 'Compound Growth Calculator' }}
      relatedGuides={[
        { href: '/learn/multigenerational-asset-retention', label: 'Multi-Generational Bridge: Retaining Assets Across Generations' },
        { href: '/learn/digital-client-experience-phygital', label: 'Digital Client Experience: Phygital Engagement Platforms' },
      ]}
    >
      <div className="guide-content">
        <p>
          Advisors who approach a wealth transfer passively — waiting to see whether the heir continues
          the relationship — typically lose the majority of transferred assets. Those who treat the
          inheritance event as the culmination of a deliberate heir engagement strategy convert it into
          a long-duration client relationship. This guide addresses the mechanics: what heir onboarding
          costs, what it yields, and how to structure the initial engagement to maximise conversion.
        </p>

        <h2>Heir Lifetime Value Calculation</h2>
        <div className="formula-block">
          <span className="formula-label">Heir LTV</span>
          <pre>{`Heir acquisition cost = Engagement cost (pre-transfer) + Onboarding cost (post-transfer)

Heir LTV = (Inherited AUM + Own wealth trajectory) × Fee rate × Relationship years

Conversion ROI = (Heir LTV − Acquisition cost) ÷ Acquisition cost × 100`}</pre>
        </div>

        <table>
          <thead>
            <tr><th>Heir profile</th><th>Inherited AUM</th><th>Own wealth (yr 20)</th><th>Fee rate</th><th>Duration</th><th>Gross LTV</th></tr>
          </thead>
          <tbody>
            <tr><td>Young professional (30s)</td><td>€300,000</td><td>€600,000</td><td>0.80%</td><td>35 yrs</td><td>~€175,000</td></tr>
            <tr><td>Mid-career (40s)</td><td>€800,000</td><td>€1,200,000</td><td>0.75%</td><td>25 yrs</td><td>~€187,500</td></tr>
            <tr><td>Near-retirement (50s)</td><td>€1,500,000</td><td>€1,800,000</td><td>0.70%</td><td>20 yrs</td><td>~€231,000</td></tr>
          </tbody>
        </table>

        <h2>Heir Profiling: Key Differences from the Parent</h2>
        <p>Treating the heir as a carbon copy of the parent is one of the most common onboarding errors. Heirs typically differ across:</p>
        <ul>
          <li><strong>Risk tolerance:</strong> Heirs in their 30s–40s often have higher risk capacity but not always higher tolerance, particularly if the inheritance is their primary financial safety net.</li>
          <li><strong>Product preferences:</strong> Younger heirs frequently express stronger ESG preferences, digital platform expectations, and interest in alternative assets.</li>
          <li><strong>Financial complexity:</strong> The heir may have own pension arrangements, mortgage debt, business interests, or equity compensation that interact with inherited wealth.</li>
          <li><strong>Advisor expectations:</strong> Digital accessibility, faster response times, and fee transparency are more prominent expectations among younger wealth holders.</li>
        </ul>

        <h2>Regulatory Requirements: Heirs Are New Clients</h2>
        <p>
          Under MiFID II and equivalent national frameworks, heirs must be treated as new clients,
          requiring:
        </p>
        <ul>
          <li>Full KYC / AML verification independent of parent&rsquo;s file</li>
          <li>Fresh suitability assessment and documented risk profile</li>
          <li>New client agreement and fee disclosure (PRIIPs KID where applicable)</li>
          <li>Data processing consent under GDPR</li>
          <li>Best execution and conflicts of interest disclosure</li>
        </ul>
        <div className="key-point">
          Digital onboarding tools can compress this process to 60–90 minutes for straightforward
          cases, versus 3–5 hours through paper-based workflows.
        </div>

        <h2>What-If Scenarios</h2>
        <div className="example-block">
          <span className="example-label">Scenario A — Heir negotiates a lower fee (0.55% vs. 0.80%)</span>
          <p>On €800K AUM over 25 years, gross revenue falls from €160,000 to €110,000. Still a significant relationship; fee negotiation should be anticipated and modelled in advance.</p>
        </div>
        <div className="example-block">
          <span className="example-label">Scenario B — Heir distributes inherited wealth across three advisors</span>
          <p>If the heir places only €300K with the original advisor (out of €900K total), the remaining €600K generates zero revenue. A consolidation pitch — simplifying the heir&rsquo;s financial life — has clear value beyond relationship continuity.</p>
        </div>
        <div className="example-block">
          <span className="example-label">Scenario C — Heir has a pre-existing advisor</span>
          <p>Conversion rate drops to 15–25% vs. 50–65% where no prior relationship exists. Displacing an incumbent is significantly harder than being the first relationship established.</p>
        </div>
      </div>
    </GuideLayout>
  );
}
