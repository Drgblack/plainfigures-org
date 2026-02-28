import type { Metadata } from 'next';
import GuideLayout from '@/components/layout/GuideLayout';

export const metadata: Metadata = {
  title: 'Digital Client Experience: Phygital Engagement Platforms | Plain Figures',
  description:
    'How phygital client engagement works — NPS financial value formula, digital touchpoint ROI, churn rate by NPS segment, adoption failure modes, and what-if scenarios.',
};

export default function DigitalClientExperienceGuide() {
  return (
    <GuideLayout
      title="Digital Client Experience: Phygital Engagement Platforms"
      description="The economics of combining digital and in-person advisory engagement — NPS financial value, CX ROI formula, and why adoption rate is the leading failure mode."
      readTime="5 min"
      relatedCalc={{ href: '/ltv-cac', label: 'LTV / CAC Calculator' }}
      relatedGuides={[
        { href: '/learn/multigenerational-asset-retention', label: 'Multi-Generational Bridge: Retaining Assets Across Generations' },
        { href: '/learn/inheritance-pivot-heirs', label: 'Inheritance Pivot: Onboarding Heirs as Clients' },
        { href: '/learn/regtech-compliance-automation', label: 'RegTech Essentials: Automating Compliance' },
      ]}
    >
      <div className="guide-content">
        <p>
          &ldquo;Phygital&rdquo; — combining physical and digital engagement — describes the operational reality
          most advisory firms are navigating: clients expect 24/7 portfolio access and instant document
          signing alongside the human relationship quality that justifies advisory fees. Firms that
          execute this combination well report measurably better NPS scores, lower churn, and higher
          referral rates. This guide quantifies the CX investment case.
        </p>

        <h2>The CX Investment ROI Formula</h2>
        <div className="formula-block">
          <span className="formula-label">CX ROI</span>
          <pre>{`CX ROI = (Retention saving + Referral value + Efficiency saving)
          ÷ Platform cost × 100

Where:
  Retention saving  = Churn rate reduction × Clients × Avg. annual revenue
  Referral value    = New referrals × Client LTV
  Efficiency saving = Hours saved per client × Advisor rate × Clients`}</pre>
        </div>

        <div className="example-block">
          <span className="example-label">Worked example — 100-client firm</span>
          <div className="example-row"><span>Efficiency: self-service queries (2 hrs/client/yr × €75 × 100)</span><span>€15,000</span></div>
          <div className="example-row"><span>Retention: 1% churn reduction (1 client × €8,000 avg. revenue)</span><span>€8,000</span></div>
          <div className="example-row"><span>Referrals: +3/yr (LTV basis: 3 × €8,000 × 8yr ÷ 8)</span><span>€24,000</span></div>
          <div className="example-row"><span><strong>Total annual benefit</strong></span><span><strong>€47,000</strong></span></div>
          <div className="example-row"><span>Platform cost (mid-tier)</span><span>€9,600/yr</span></div>
          <div className="example-row"><span><strong>Net benefit</strong></span><span><strong>€37,400</strong></span></div>
          <div className="example-row"><span><strong>ROI</strong></span><span><strong>390%</strong></span></div>
        </div>

        <h2>NPS: The Financial Value Calculation</h2>
        <div className="formula-block">
          <span className="formula-label">Net Promoter Score</span>
          <pre>{`NPS = % Promoters (9–10) − % Detractors (0–6)
Scale: −100 to +100

Churn rate by NPS segment (illustrative):
  Promoters (9–10):   1–2% annual churn
  Passives (7–8):     5–8% annual churn
  Detractors (0–6):  20–35% annual churn`}</pre>
        </div>
        <p>
          Moving a client from passive to promoter reduces their annual churn probability by 3–6
          percentage points. On a book of 100 clients averaging €8,000 annual revenue, a 3-point
          churn reduction is worth €24,000/year in retained revenue.
        </p>

        <h2>Digital Touchpoint Design</h2>
        <table>
          <thead>
            <tr><th>Touchpoint</th><th>Client preference</th><th>Advisor time saved</th><th>Delivery</th></tr>
          </thead>
          <tbody>
            <tr><td>Portfolio performance view</td><td>Daily / on-demand</td><td>2+ hrs/client/yr</td><td>Client portal / app</td></tr>
            <tr><td>Document signing</td><td>Same-day digital</td><td>45–60 min/event</td><td>eSign platform</td></tr>
            <tr><td>Meeting booking</td><td>Self-service calendar</td><td>15–30 min/meeting</td><td>Integrated scheduler</td></tr>
            <tr><td>Annual review meeting</td><td>Video or in-person</td><td>No saving (essential)</td><td>Hybrid</td></tr>
            <tr><td>Market update comms</td><td>Push / email</td><td>Batch automation</td><td>CRM module</td></tr>
            <tr><td>Ad hoc queries</td><td>Messaging / chat</td><td>Reduced calls</td><td>Secure messaging</td></tr>
          </tbody>
        </table>

        <h2>What-If Scenarios</h2>
        <div className="example-block">
          <span className="example-label">Scenario A — Platform adoption rate is 40% (not 80%)</span>
          <p>If only 40 of 100 clients actively use the portal, efficiency savings halve to €7,500 and referral lift is muted. Low adoption is the primary failure mode for CX technology investments. Onboarding guidance at review meetings is as important as the platform itself.</p>
        </div>
        <div className="example-block">
          <span className="example-label">Scenario B — Portal reduces perceived advisor value</span>
          <p>If clients with full digital access begin questioning whether they need an advisor (&ldquo;I can see my portfolio anytime&rdquo;), fee-compression pressure increases. Mitigation: ensure the portal surfaces complexity and prompts advisor conversations — planning tools that generate questions, not just data displays.</p>
        </div>
        <div className="example-block">
          <span className="example-label">Scenario C — Younger heir segment has higher digital expectations</span>
          <p>As firms onboard heirs (see related guides), this segment has materially higher digital expectations than the parent generation. A platform adequate for 65-year-olds may score poorly with 40-year-olds. A single platform serving both generations strengthens the investment case further.</p>
        </div>

        <div className="key-point">
          Financial services industry median NPS is ~30–40. High-performing advisory firms achieve
          +50 to +70. The revenue value of that gap — modelled through churn rate differences across
          NPS segments — is typically far larger than the cost of the technology that drives it.
        </div>
      </div>
    </GuideLayout>
  );
}
