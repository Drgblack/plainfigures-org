import type { Metadata } from 'next';
import GuideLayout from '@/components/layout/GuideLayout';

export const metadata: Metadata = {
  title: 'Automation Audit: Tasks to Delegate to AI in 2026 | Plain Figures',
  description:
    'A practical automation audit framework for financial advisors — task scoring matrix, time-value analysis, payback period formula, and what-if scenarios.',
};

export default function AutomationAuditGuide() {
  return (
    <GuideLayout
      title="Automation Audit: Tasks to Delegate to AI in 2026"
      description="A scoring matrix and payback formula to identify which advisory tasks deliver the highest ROI when automated."
      readTime="5 min"
      relatedCalc={{ href: '/ltv-cac', label: 'ROI / LTV Calculator' }}
      relatedGuides={[
        { href: '/learn/agentic-advisor', label: 'The Agentic Advisor: AI-Driven Digital Co-Workers' },
        { href: '/learn/regtech-compliance-automation', label: 'RegTech Essentials: Automating Compliance' },
      ]}
    >
      <div className="guide-content">
        <p>
          A structured automation audit — scoring each task by repetitiveness, rules-based clarity, and
          judgement requirement — typically reveals that 30–50% of non-client-facing advisory time
          involves work suitable for AI or rule-based automation. This guide provides the scoring
          framework, time-value calculations, and a decision matrix to prioritise where to start.
        </p>

        <h2>The Automation Scoring Matrix</h2>
        <p>Rate each task on three axes, each scored 1 (low) to 5 (high):</p>
        <table>
          <thead>
            <tr><th>Dimension</th><th>Scoring guidance</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Repetitiveness</strong></td><td>Daily = 5 · Weekly = 4 · Monthly = 3 · Quarterly = 2 · Ad hoc = 1</td></tr>
            <tr><td><strong>Rules-based clarity</strong></td><td>Fully rules-based = 5 · Mostly = 4 · Partially = 3 · Rarely = 2 · Never = 1</td></tr>
            <tr><td><strong>Judgement (inverted)</strong></td><td>No judgement needed = 5 · Expert judgement always required = 1</td></tr>
          </tbody>
        </table>
        <div className="formula-block">
          <span className="formula-label">Priority Score</span>
          <pre>{`Score = Repetitiveness + Rules clarity + (6 − Judgement)

12–15: Automate immediately
 8–11: Evaluate case by case
Below 8: Retain human ownership`}</pre>
        </div>

        <h2>Task Inventory with Scores</h2>
        <table>
          <thead>
            <tr><th>Task</th><th>Rep.</th><th>Rules</th><th>Judg. (inv.)</th><th>Total</th><th>Decision</th></tr>
          </thead>
          <tbody>
            <tr><td>Meeting transcript → CRM entry</td><td>5</td><td>4</td><td>5</td><td>14</td><td>✅ Automate</td></tr>
            <tr><td>Portfolio drift alert generation</td><td>5</td><td>5</td><td>5</td><td>15</td><td>✅ Automate</td></tr>
            <tr><td>KYC document pre-population</td><td>4</td><td>5</td><td>5</td><td>14</td><td>✅ Automate</td></tr>
            <tr><td>Client review reminders</td><td>5</td><td>5</td><td>5</td><td>15</td><td>✅ Automate</td></tr>
            <tr><td>Performance report generation</td><td>4</td><td>4</td><td>4</td><td>12</td><td>✅ Automate</td></tr>
            <tr><td>Suitability letter drafting</td><td>3</td><td>3</td><td>3</td><td>9</td><td>⚠️ Evaluate</td></tr>
            <tr><td>Investment recommendation</td><td>3</td><td>2</td><td>1</td><td>6</td><td>🚫 Retain</td></tr>
            <tr><td>Complaint resolution</td><td>2</td><td>1</td><td>1</td><td>4</td><td>🚫 Retain</td></tr>
          </tbody>
        </table>

        <h2>Time-Value and Payback Calculation</h2>
        <div className="formula-block">
          <span className="formula-label">Annual Saving & Payback</span>
          <pre>{`Annual saving (€) = Σ [Hours saved per task × Advisor rate × Weeks]

Payback period (months) = Implementation cost
                          ÷ (Monthly hours saved × Hourly rate)`}</pre>
        </div>

        <div className="example-block">
          <span className="example-label">Worked example — 4-advisor practice at €75/hr</span>
          <div className="example-row"><span>Meeting notes → CRM (48 hrs/advisor/yr)</span><span>€3,600</span></div>
          <div className="example-row"><span>Portfolio drift alerts (24 hrs)</span><span>€1,800</span></div>
          <div className="example-row"><span>Performance reports (30 hrs)</span><span>€2,250</span></div>
          <div className="example-row"><span>KYC pre-population (20 hrs)</span><span>€1,500</span></div>
          <div className="example-row"><span><strong>Total per advisor (122 hrs)</strong></span><span><strong>€9,150</strong></span></div>
          <div className="example-row"><span><strong>Total (4 advisors, 488 hrs)</strong></span><span><strong>€36,600</strong></span></div>
          <p style={{ marginTop: '0.75rem' }}>
            At €18,000 implementation cost: payback = 18,000 ÷ (36,600 ÷ 12) = <strong>5.9 months</strong>.
          </p>
        </div>

        <h2>What-If Scenarios</h2>
        <div className="example-block">
          <span className="example-label">Scenario A — Advisor rate is €45/hr</span>
          <p>Total saving drops to €21,960. Payback extends to ~9.8 months. Compelling, but more sensitive to platform cost.</p>
        </div>
        <div className="example-block">
          <span className="example-label">Scenario B — Solo practice (1 advisor)</span>
          <p>Annual saving = €9,150. Against a €6,000 platform cost, net benefit = €3,150/yr. ROI = 52.5%. Time freed may have strategic value beyond the monetary figure.</p>
        </div>
        <div className="example-block">
          <span className="example-label">Scenario C — 20% of outputs require rework</span>
          <p>If 1 in 5 automated drafts requires significant correction (avg. 30 min each), effective time saving reduces by ~25%. Quality thresholds in tooling are as important as the automation itself.</p>
        </div>
      </div>
    </GuideLayout>
  );
}
