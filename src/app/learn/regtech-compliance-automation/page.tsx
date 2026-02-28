import type { Metadata } from 'next';
import GuideLayout from '@/components/layout/GuideLayout';

export const metadata: Metadata = {
  title: 'RegTech Essentials: Automating Compliance | Plain Figures',
  description:
    'How RegTech tools reduce compliance costs for financial advisors — KYC automation savings, MiFID II suitability workflows, fine exposure calculation, and what-if scenarios.',
};

export default function RegtechComplianceGuide() {
  return (
    <GuideLayout
      title="RegTech Essentials: Automating Compliance"
      description="Compliance cost baseline for a 100-client advisory firm, automation efficiency ratios by task type, and the MiFID II fine exposure that makes audit trails essential."
      readTime="6 min"
      relatedCalc={{ href: '/ltv-cac', label: 'ROI / LTV Calculator' }}
      relatedGuides={[
        { href: '/learn/cyber-resilient-agency', label: 'Cyber-Resilient Agency: Protecting Client Data' },
        { href: '/learn/automation-audit-2026', label: 'Automation Audit: Tasks to Delegate to AI in 2026' },
        { href: '/learn/agentic-advisor', label: 'The Agentic Advisor: AI-Driven Digital Co-Workers' },
      ]}
    >
      <div className="guide-content">
        <p>
          In EU-regulated markets, MiFID II documentation, AML/KYC obligations, GDPR consent management,
          and periodic reporting generate a compliance burden that many small advisory firms struggle to
          absorb without dedicated staff. RegTech automates these tasks — not reducing compliance
          obligations, but executing them faster, cheaper, and with better audit trails. This guide
          quantifies the cost reduction and identifies where automation adds most value.
        </p>

        <h2>Compliance Cost Baseline — 100-Client Firm</h2>
        <table>
          <thead>
            <tr><th>Task</th><th>Manual time / instance</th><th>Annual hours</th><th>Annual cost @ €50/hr</th></tr>
          </thead>
          <tbody>
            <tr><td>KYC onboarding (40 new/yr)</td><td>75 min</td><td>50 hrs</td><td>€2,500</td></tr>
            <tr><td>Annual KYC refresh</td><td>30 min</td><td>50 hrs</td><td>€2,500</td></tr>
            <tr><td>Suitability documentation</td><td>60 min</td><td>100 hrs</td><td>€5,000</td></tr>
            <tr><td>MiFID cost/charge disclosures</td><td>20 min</td><td>33 hrs</td><td>€1,667</td></tr>
            <tr><td>Periodic review scheduling</td><td>15 min</td><td>25 hrs</td><td>€1,250</td></tr>
            <tr><td><strong>Total baseline</strong></td><td>—</td><td><strong>258 hrs</strong></td><td><strong>€12,917</strong></td></tr>
          </tbody>
        </table>

        <h2>RegTech Automation Savings</h2>
        <div className="formula-block">
          <span className="formula-label">Automation Saving Formula</span>
          <pre>{`Annual saving = Manual hours × Automation efficiency ratio × Hourly rate

Typical efficiency ratios:
  eKYC onboarding:           75–85% time reduction
  Suitability documentation: 50–65% time reduction
  Cost/charge disclosures:   80–90% time reduction
  Periodic review triggers:  90–95% time reduction`}</pre>
        </div>

        <div className="example-block">
          <span className="example-label">Net saving — same 100-client firm</span>
          <div className="example-row"><span>KYC onboarding (80% automation)</span><span>€2,000</span></div>
          <div className="example-row"><span>Annual KYC refresh (75%)</span><span>€1,875</span></div>
          <div className="example-row"><span>Suitability documentation (55%)</span><span>€2,750</span></div>
          <div className="example-row"><span>Cost/charge disclosures (85%)</span><span>€1,400</span></div>
          <div className="example-row"><span>Review scheduling (90%)</span><span>€1,125</span></div>
          <div className="example-row"><span><strong>Total saving (183 hrs)</strong></span><span><strong>€9,150</strong></span></div>
          <p style={{ marginTop: '0.75rem' }}>At €4,800/year platform cost: net saving = €4,350. Payback = 6.3 months.</p>
        </div>

        <h2>MiFID II Fine Exposure</h2>
        <div className="formula-block">
          <span className="formula-label">Maximum MiFID II Fine</span>
          <pre>{`Maximum fine (legal person) = MAX(€5,000,000 ; 10% of annual turnover)

Probability-weighted expected fine:
  = Fine amount × P(enforcement over 5 years)
  Example: €500,000 × 3% = €15,000 expected value of risk`}</pre>
        </div>
        <p>
          RegTech creates documented, timestamped audit trails that are invaluable in supervisory
          review or client complaint scenarios. A manual process producing inconsistent documentation
          creates regulatory risk that is difficult to quantify but easy to crystallise.
        </p>

        <h2>What-If Scenarios</h2>
        <div className="example-block">
          <span className="example-label">Scenario A — Client book doubles to 200 clients</span>
          <p>Manual compliance hours scale roughly linearly: annual cost rises to ~€25,800. RegTech saving scales to ~€18,300. Platform cost remains fixed at €4,800. Net benefit nearly doubles — the ROI case strengthens significantly with scale.</p>
        </div>
        <div className="example-block">
          <span className="example-label">Scenario B — Supervisory audit triggered</span>
          <p>A competent authority requests documentation for 20 client suitability assessments across 3 years. With manual records, retrieval may take 40–80 hours (€2,000–€4,000). A RegTech system with centralised, exportable records reduces this to 2–4 hours.</p>
        </div>
        <div className="example-block">
          <span className="example-label">Scenario C — New ESG disclosure requirements under MiFID II</span>
          <p>ESMA&rsquo;s sustainability preference requirements add new suitability dimensions. Firms using manual processes must retrain staff and rebuild documentation. RegTech platforms with configurable rule sets can update without rebuilding the entire workflow.</p>
        </div>

        <div className="key-point">
          The break-even analysis is straightforward: €12,917 manual compliance cost, €9,150 saving
          from automation, against a €4,800 platform cost = €4,350 net annual benefit on a 100-client
          book. Every additional client improves the ROI.
        </div>
      </div>
    </GuideLayout>
  );
}
