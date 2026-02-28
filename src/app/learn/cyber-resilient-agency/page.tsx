import type { Metadata } from 'next';
import GuideLayout from '@/components/layout/GuideLayout';

export const metadata: Metadata = {
  title: 'Cyber-Resilient Agency: Protecting Client Data | Plain Figures',
  description:
    'How financial advisors quantify and manage cyber risk — FAIR model, ALE calculation, GDPR fine exposure formula, control investment ROI, and what-if scenarios.',
};

export default function CyberResilientAgencyGuide() {
  return (
    <GuideLayout
      title="Cyber-Resilient Agency: Protecting Client Data"
      description="The FAIR risk model applied to financial advisory firms — quantifying breach exposure, GDPR fine risk, and the ROI of specific security controls."
      readTime="6 min"
      relatedCalc={{ href: '/cyber', label: 'Cyber Risk Calculator' }}
      relatedGuides={[
        { href: '/learn/regtech-compliance-automation', label: 'RegTech Essentials: Automating Compliance' },
        { href: '/learn/cyber-limit', label: 'Cyber Limit: How Much Cover Is Enough?' },
        { href: '/learn/parametric-insurance-weather', label: 'Parametric Insurance: Instant-Payout Weather Triggers' },
      ]}
    >
      <div className="guide-content">
        <p>
          Financial advisory firms hold some of the most sensitive personal and financial data in the
          economy: full identity records, asset holdings, estate plans, family structures, and banking
          details. This concentration makes advisory firms disproportionately attractive targets for
          cybercriminals. This guide quantifies the exposure using the FAIR framework, calculates GDPR
          fine risk, and provides a cost-benefit analysis for the most impactful security controls.
        </p>

        <h2>The FAIR Risk Framework</h2>
        <div className="formula-block">
          <span className="formula-label">Annualised Loss Expectancy</span>
          <pre>{`ALE = ARO × SLE

Where:
  ARO = Annualised Rate of Occurrence (annual probability)
  SLE = Single Loss Expectancy (total cost of one incident)
  SLE = Direct costs + Regulatory fines + Reputational loss + Business interruption`}</pre>
        </div>

        <table>
          <thead>
            <tr><th>Threat type</th><th>ARO (est.)</th><th>SLE (€)</th><th>ALE (€/yr)</th></tr>
          </thead>
          <tbody>
            <tr><td>Ransomware (small firm)</td><td>0.15</td><td>180,000</td><td>27,000</td></tr>
            <tr><td>Phishing → account takeover</td><td>0.30</td><td>45,000</td><td>13,500</td></tr>
            <tr><td>Insider data leak</td><td>0.08</td><td>120,000</td><td>9,600</td></tr>
            <tr><td>Third-party vendor breach</td><td>0.12</td><td>90,000</td><td>10,800</td></tr>
            <tr><td><strong>Total ALE estimate</strong></td><td>—</td><td>—</td><td><strong>€60,900</strong></td></tr>
          </tbody>
        </table>

        <h2>GDPR Fine Exposure</h2>
        <div className="formula-block">
          <span className="formula-label">Maximum GDPR Fine</span>
          <pre>{`Maximum fine = MAX(€20,000,000 ; 4% × Global annual turnover)

For a firm with €800,000 annual turnover:
  4% × €800,000 = €32,000 (lower-tier infringements)
  Higher-tier maximum: €20,000,000 (serious violations)

Notification failure: up to €10,000,000 or 2% of turnover`}</pre>
        </div>
        <div className="key-point">
          Under GDPR Article 33, data controllers must notify the supervisory authority (e.g. BfDI in
          Germany) within <strong>72 hours</strong> of becoming aware of a personal data breach.
          Failure to notify is itself a separate infringement.
        </div>

        <h2>Control Investment ROI</h2>
        <div className="formula-block">
          <span className="formula-label">Risk-Justified Control Spend</span>
          <pre>{`Max justified spend = ALE × Control effectiveness (%)

Example — MFA deployment:
  Phishing ALE = €13,500 × 70% effectiveness = €9,450 justified spend
  MFA cost (5 users) = €1,200/yr
  Net benefit = €8,250/yr   ROI = 688%`}</pre>
        </div>

        <table>
          <thead>
            <tr><th>Control</th><th>Threat mitigated</th><th>Annual cost (5 users)</th><th>ALE reduction</th></tr>
          </thead>
          <tbody>
            <tr><td>Multi-factor authentication</td><td>Account takeover</td><td>€600–1,500</td><td>60–80%</td></tr>
            <tr><td>Encrypted backup (offsite)</td><td>Ransomware</td><td>€1,200–3,600</td><td>50–70%</td></tr>
            <tr><td>Endpoint detection & response</td><td>Malware</td><td>€2,400–6,000</td><td>40–60%</td></tr>
            <tr><td>Phishing simulation training</td><td>Phishing</td><td>€500–1,500</td><td>30–50%</td></tr>
            <tr><td>Cyber insurance (€1M limit)</td><td>Financial transfer</td><td>€3,000–8,000</td><td>N/A (transfer)</td></tr>
          </tbody>
        </table>

        <h2>What-If Scenarios</h2>
        <div className="example-block">
          <span className="example-label">Scenario A — Ransomware attack, no backup</span>
          <p>Without an offline backup, recovery requires paying ransom (€25,000–€150,000) or rebuilding from paper records (150+ hours at €75/hr = €11,250+). Total incident cost: €80,000–€200,000. A €1,500/year backup solution eliminates this exposure.</p>
        </div>
        <div className="example-block">
          <span className="example-label">Scenario B — GDPR notification missed (72-hour window)</span>
          <p>A phishing-induced breach exposing 300 client records discovered on Monday: if reported Wednesday, the supervisory authority may treat it as a minor infringement. If reported the following Monday, the firm faces a separate violation for late notification — compounding fine risk even if the original breach was minor.</p>
        </div>
        <div className="example-block">
          <span className="example-label">Scenario C — Third-party CRM provider breached</span>
          <p>Under GDPR, the advisory firm (data controller) remains liable for appropriate vendor oversight (Article 28 processor agreement). Firms without current Data Processing Agreements with their software vendors face direct regulatory exposure for third-party incidents.</p>
        </div>
      </div>
    </GuideLayout>
  );
}
