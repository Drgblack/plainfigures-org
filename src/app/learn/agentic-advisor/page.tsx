import type { Metadata } from 'next';
import GuideLayout from '@/components/layout/GuideLayout';

export const metadata: Metadata = {
  title: 'The Agentic Advisor: AI-Driven Digital Co-Workers | Plain Figures',
  description:
    'How agentic AI systems act as digital co-workers for financial advisors — task delegation, ROI modelling, workflow math, and what-if scenarios for 2026.',
};

export default function AgenticAdvisorGuide() {
  return (
    <GuideLayout
      title="The Agentic Advisor: AI-Driven Digital Co-Workers"
      description="How agentic AI systems execute multi-step workflows autonomously — and how to calculate whether deploying one makes financial sense."
      readTime="6 min"
      relatedCalc={{ href: '/ltv-cac', label: 'ROI / LTV Calculator' }}
      relatedGuides={[
        { href: '/learn/automation-audit-2026', label: 'Automation Audit: Tasks to Delegate to AI in 2026' },
        { href: '/learn/predictive-analytics-portfolio', label: 'Beyond Chatbots: Predictive Analytics for Portfolio Reviews' },
        { href: '/learn/regtech-compliance-automation', label: 'RegTech Essentials: Automating Compliance' },
      ]}
    >
      <div className="guide-content">
        <p>
          Agentic AI systems — software that executes multi-step workflows autonomously — are moving from
          pilot projects into mainstream financial advisory practice. Unlike single-turn chatbots, agents
          plan, act, and iterate: pulling client data from a CRM, drafting a suitability note, flagging a
          compliance gap, and scheduling a review call within a single triggered workflow. This guide
          explains the underlying mechanics, quantifies the economics, and outlines where human oversight
          remains essential.
        </p>

        <h2>What &ldquo;Agentic&rdquo; Means in Practice</h2>
        <p>
          An agent has four components: a <strong>perception layer</strong> (reads inputs — emails, CRM
          records, market feeds), a <strong>planning module</strong> (determines action sequence using an
          LLM), an <strong>execution layer</strong> (calls APIs, fills forms, sends drafts), and a{' '}
          <strong>memory store</strong> (retains context across sessions). The critical distinction from
          traditional automation is that the planning module handles ambiguity — it can interpret an
          unstructured client email and decide which downstream tool to invoke.
        </p>
        <p>
          RPA (robotic process automation) follows fixed rule-based scripts and breaks when interfaces
          change. Agentic AI adapts to variation and chains reasoning steps. Agentic systems handle
          ambiguous inputs; RPA requires deterministic, structured ones.
        </p>

        <h2>The Delegation ROI Formula</h2>
        <div className="formula-block">
          <span className="formula-label">ROI Formula</span>
          <pre>{`ROI (%) = [(Hours_saved × Hourly_rate × Working_weeks) − Platform_cost]
           ÷ Platform_cost × 100`}</pre>
        </div>

        <table>
          <thead>
            <tr>
              <th>Variable</th>
              <th>Conservative</th>
              <th>Moderate</th>
              <th>Optimistic</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Hours saved per week</td><td>4</td><td>8</td><td>14</td></tr>
            <tr><td>Advisor hourly rate (€)</td><td>75</td><td>75</td><td>75</td></tr>
            <tr><td>Working weeks</td><td>46</td><td>46</td><td>46</td></tr>
            <tr><td>Gross annual saving (€)</td><td>13,800</td><td>27,600</td><td>48,300</td></tr>
            <tr><td>Platform cost / year (€)</td><td>8,400</td><td>8,400</td><td>8,400</td></tr>
            <tr><td><strong>Net ROI (%)</strong></td><td><strong>64%</strong></td><td><strong>229%</strong></td><td><strong>475%</strong></td></tr>
          </tbody>
        </table>

        <h2>Task Taxonomy: Delegate vs. Retain</h2>
        <h3>High-delegation candidates</h3>
        <ul>
          <li>Portfolio rebalancing alerts and trade instruction drafts</li>
          <li>Meeting preparation summaries from CRM history</li>
          <li>Regulatory document pre-population (KYC, AML questionnaires)</li>
          <li>Client birthday / review-date reminders with personalised draft messages</li>
          <li>Data reconciliation across custodian feeds</li>
        </ul>
        <h3>Retain human judgement</h3>
        <ul>
          <li>Suitability assessments and fiduciary sign-off</li>
          <li>Estate planning strategy recommendations</li>
          <li>Client conversations involving grief, divorce, or health events</li>
          <li>Any output constituting regulated advice under MiFID II or local frameworks</li>
        </ul>

        <h2>What-If Scenarios</h2>
        <div className="example-block">
          <span className="example-label">Scenario A — Platform cost doubles</span>
          <p>
            If annual cost rises from €8,400 to €16,800, the moderate-case ROI falls from 229% to 64%.
            The investment remains positive but narrows the business case for solo practitioners.
          </p>
        </div>
        <div className="example-block">
          <span className="example-label">Scenario B — Advisor hourly rate is lower (€45/hr)</span>
          <p>
            At €45/hr and 8 hours/week saved, gross saving drops to €16,560. Net ROI against €8,400
            platform cost = 97%. Still positive; payback period extends to approximately 6 months.
          </p>
        </div>
        <div className="example-block">
          <span className="example-label">Scenario C — Regulatory penalty for non-logged agent action</span>
          <p>
            A single MiFID II breach fine can range from €50,000 to several hundred thousand euros.
            One incident erases years of efficiency gains. Audit logging is not optional overhead — it
            is insurance.
          </p>
        </div>

        <h2>Implementation Checklist</h2>
        <ul>
          <li>Map current workflows by task type, volume, and hourly cost</li>
          <li>Identify integration points (CRM, portfolio management, calendar)</li>
          <li>Define human-in-the-loop checkpoints for client-facing outputs</li>
          <li>Establish audit log requirements before deployment</li>
          <li>Run a 60-day pilot on non-client-facing tasks first</li>
          <li>Review regulatory classification of agent outputs with compliance officer</li>
        </ul>

        <div className="key-point">
          <strong>Key formula:</strong> ROI (%) = [(Hours saved × Rate × Weeks) − Platform cost] ÷
          Platform cost × 100. At 8 hrs/week saved and €75/hr over 46 weeks versus €8,400 platform
          cost, ROI = 229%.
        </div>
      </div>
    </GuideLayout>
  );
}
