'use client';

import { useState, useMemo } from 'react';
import { useCurrency } from '@/lib/CurrencyContext';
import { calculateCyberLimit } from '@/lib/insurance-calculations';
import { formatCurrency, formatNumber } from '@/lib/formatting';
import { InputField, ResultCard, Section } from '@/components/ui';

const RISK_BAND_CONFIG = {
  low:      { label: 'Low',      color: '#2ec88a', bg: 'rgba(46,200,138,0.08)',  border: 'rgba(46,200,138,0.2)' },
  moderate: { label: 'Moderate', color: '#3b82c4', bg: 'rgba(59,130,196,0.08)', border: 'rgba(59,130,196,0.2)' },
  elevated: { label: 'Elevated', color: '#d4a843', bg: 'rgba(212,168,67,0.08)', border: 'rgba(212,168,67,0.2)' },
  high:     { label: 'High',     color: '#e07a2e', bg: 'rgba(224,122,46,0.08)', border: 'rgba(224,122,46,0.2)' },
  critical: { label: 'Critical', color: '#e05252', bg: 'rgba(224,82,82,0.08)',  border: 'rgba(224,82,82,0.2)' },
};

const INDUSTRIES = [
  { label: 'Financial Services', value: 2.5 },
  { label: 'Healthcare', value: 2.3 },
  { label: 'Professional Services', value: 1.6 },
  { label: 'Retail / E-commerce', value: 1.5 },
  { label: 'Manufacturing', value: 1.3 },
  { label: 'Technology', value: 1.8 },
  { label: 'Education', value: 1.4 },
  { label: 'General Business', value: 1.0 },
];

function RiskGauge({ score, size = 140 }: { score: number; size?: number }) {
  const pct = score / 100;
  const r = size * 0.38;
  const cx = size / 2;
  const cy = size * 0.55;
  const startA = -180 * (Math.PI / 180);
  const endA = 0;
  const needleA = (-180 + pct * 180) * (Math.PI / 180);

  const arcX1 = cx + r * Math.cos(startA);
  const arcY1 = cy + r * Math.sin(startA);
  const arcX2 = cx + r * Math.cos(endA);
  const arcY2 = cy + r * Math.sin(endA);

  const nx = cx + r * 0.7 * Math.cos(needleA);
  const ny = cy + r * 0.7 * Math.sin(needleA);

  const color = score < 30 ? '#2ec88a' : score < 50 ? '#3b82c4' : score < 65 ? '#d4a843' : score < 80 ? '#e07a2e' : '#e05252';

  // Zone arcs
  const zones = [
    { from: 0, to: 0.3, color: '#2ec88a' },
    { from: 0.3, to: 0.5, color: '#3b82c4' },
    { from: 0.5, to: 0.65, color: '#d4a843' },
    { from: 0.65, to: 0.8, color: '#e07a2e' },
    { from: 0.8, to: 1, color: '#e05252' },
  ];

  return (
    <svg width={size} height={size * 0.65} viewBox={`0 0 ${size} ${size * 0.65}`}>
      {/* Zone tracks */}
      {zones.map(z => {
        const sa = (-180 + z.from * 180) * (Math.PI / 180);
        const ea = (-180 + z.to * 180) * (Math.PI / 180);
        const x1 = cx + r * Math.cos(sa);
        const y1 = cy + r * Math.sin(sa);
        const x2 = cx + r * Math.cos(ea);
        const y2 = cy + r * Math.sin(ea);
        const large = (z.to - z.from) > 0.5 ? 1 : 0;
        return <path key={z.from} d={`M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`} fill="none" stroke={z.color} strokeWidth="6" strokeOpacity="0.3" />;
      })}
      {/* Track bg */}
      <path d={`M ${arcX1} ${arcY1} A ${r} ${r} 0 0 1 ${arcX2} ${arcY2}`} fill="none" stroke="var(--border)" strokeWidth="1" />
      {/* Needle */}
      <line x1={cx} y1={cy} x2={nx} y2={ny} stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="4" fill={color} />
      {/* Score text */}
      <text x={cx} y={cy + 18} textAnchor="middle" fill={color} fontFamily="var(--font-mono)" fontSize={size * 0.13} fontWeight="300">{score}</text>
      <text x={cx} y={cy + 30} textAnchor="middle" fill="var(--text-muted)" fontFamily="var(--font-mono)" fontSize={size * 0.075}>risk score</text>
    </svg>
  );
}

function ScoreSlider({ label, value, onChange, max = 5, invert = false, hint }: {
  label: string; value: number; onChange: (v: number) => void; max?: number; invert?: boolean; hint?: string;
}) {
  const displayVal = invert ? (max + 1 - value) : value;
  const quality = invert
    ? (value >= 4 ? 'Excellent' : value >= 3 ? 'Good' : value >= 2 ? 'Fair' : 'Poor')
    : (value >= 4 ? 'High' : value >= 3 ? 'Medium' : value >= 2 ? 'Low-Medium' : 'Low');
  const qualColor = invert
    ? (value >= 4 ? '#2ec88a' : value >= 3 ? '#d4a843' : value >= 2 ? '#e07a2e' : '#e05252')
    : (value >= 4 ? '#e07a2e' : value >= 3 ? '#d4a843' : '#2ec88a');

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>{label}</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: qualColor }}>{quality}</div>
      </div>
      <input type="range" min="1" max={max} step="1" value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{ width: '100%', accentColor: qualColor }} />
      {hint && <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{hint}</div>}
    </div>
  );
}

export default function CyberLimitCalc() {
  const { currency } = useCurrency();
  const [annualRevenue, setAnnualRevenue] = useState(15000000);
  const [recordCount, setRecordCount] = useState(50000);
  const [industry, setIndustry] = useState(1.0);
  const [cloudDependency, setCloudDependency] = useState(3);
  const [mfaAdoption, setMfaAdoption] = useState(3);
  const [patchingScore, setPatchingScore] = useState(3);
  const [incidentResponsePlan, setIncidentResponsePlan] = useState(true);
  const [thirdPartyVendors, setThirdPartyVendors] = useState(15);
  const [priorBreaches, setPriorBreaches] = useState(0);

  const result = useMemo(() => calculateCyberLimit({
    annualRevenue, recordCount, industryRiskMultiplier: industry,
    cloudDependency, mfaAdoption, patchingScore, incidentResponsePlan,
    thirdPartyVendors, priorBreaches,
  }), [annualRevenue, recordCount, industry, cloudDependency, mfaAdoption, patchingScore, incidentResponsePlan, thirdPartyVendors, priorBreaches]);

  const fmt = (v: number) => formatCurrency(v, currency);
  const bandCfg = RISK_BAND_CONFIG[result.riskBand];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
        {/* Inputs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <Section title="Business Profile">
            <InputField label="Annual Revenue" value={annualRevenue} onChange={setAnnualRevenue} min={100000} max={1000000000} step={100000} prefix={currency.symbol} />
            <InputField label="PII / Sensitive Records Held" value={recordCount} onChange={setRecordCount} min={0} max={100000000} step={1000}
              hint="Customer, employee, patient, or financial records" />
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-secondary)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Industry Sector</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                {INDUSTRIES.map(ind => (
                  <button key={ind.label} onClick={() => setIndustry(ind.value)} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0.7rem', background: industry === ind.value ? 'rgba(212,168,67,0.1)' : 'var(--bg)', border: `1px solid ${industry === ind.value ? '#d4a843' : 'var(--border)'}`, borderRadius: '4px', cursor: 'pointer', transition: 'all 0.15s ease' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: industry === ind.value ? '#d4a843' : 'var(--text-secondary)' }}>{ind.label}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)' }}>{ind.value}×</span>
                  </button>
                ))}
              </div>
            </div>
          </Section>

          <Section title="Cyber Security Controls">
            <ScoreSlider label="MFA Adoption" value={mfaAdoption} onChange={setMfaAdoption} invert hint="1 = No MFA · 5 = Fully deployed across all systems" />
            <ScoreSlider label="Patch Management" value={patchingScore} onChange={setPatchingScore} invert hint="1 = Ad-hoc · 5 = Automated, <30 day cycle" />
            <ScoreSlider label="Cloud Dependency" value={cloudDependency} onChange={setCloudDependency} hint="1 = On-premises · 5 = Cloud-native / SaaS-heavy" />
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Third-Party Vendors with Data Access</div>
              <InputField label="" value={thirdPartyVendors} onChange={setThirdPartyVendors} min={0} max={500} step={1} hint="Suppliers, processors, SaaS tools with access to your data" />
            </div>
            <InputField label="Prior Breaches (last 3 years)" value={priorBreaches} onChange={setPriorBreaches} min={0} max={10} step={1} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button onClick={() => setIncidentResponsePlan(!incidentResponsePlan)} style={{ width: '42px', height: '22px', borderRadius: '11px', border: 'none', background: incidentResponsePlan ? '#2ec88a' : 'var(--border)', cursor: 'pointer', position: 'relative', transition: 'background 0.2s ease', flexShrink: 0 }}>
                <div style={{ position: 'absolute', top: '3px', left: incidentResponsePlan ? '22px' : '3px', width: '16px', height: '16px', borderRadius: '50%', background: 'white', transition: 'left 0.2s ease' }} />
              </button>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                Incident Response Plan in place
              </span>
            </div>
          </Section>
        </div>

        {/* Results */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Section title="Risk Profile">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0.5rem 0', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '6px' }}>
              <RiskGauge score={result.riskScore} size={180} />
              <div style={{ padding: '0.4rem 1rem', background: bandCfg.bg, border: `1px solid ${bandCfg.border}`, borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: bandCfg.color, letterSpacing: '0.08em' }}>
                {bandCfg.label.toUpperCase()} RISK
              </div>
            </div>
          </Section>

          <Section title="Recommended Cover">
            <ResultCard label="Recommended Cyber Limit" value={fmt(result.recommendedLimit)} size="large" color="warning" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <ResultCard label="Base Exposure" value={fmt(result.baseExposure)} sub="Before sector/risk adjustments" />
              <ResultCard label="Adjusted Exposure" value={fmt(result.adjustedExposure)} sub={`${formatNumber(industry, 1)}× sector × risk factor`} color="warning" />
            </div>
          </Section>

          <Section title="Exposure Breakdown">
            <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden' }}>
              {result.breakdownItems.map(({ label, value, weight }) => (
                <div key={label} style={{ padding: '0.65rem 1rem', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{label}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-primary)' }}>{fmt(value)}</div>
                  </div>
                  <div style={{ height: '4px', borderRadius: '2px', background: 'var(--border)', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${weight * 100}%`, background: '#d4a843', opacity: 0.65 }} />
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </div>

      {/* Scenario limits */}
      <Section title="Threat Scenario Limits">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
          {result.scenarioLimits.map((s, i) => {
            const colors = ['#3b82c4', '#d4a843', '#e07a2e', '#e05252'];
            const c = colors[i];
            return (
              <div key={s.label} style={{ padding: '1rem', background: `${c}08`, border: `1px solid ${c}30`, borderRadius: '6px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: c, letterSpacing: '0.06em', marginBottom: '0.5rem' }}>{s.label}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: c, fontWeight: 300, marginBottom: '0.4rem' }}>{fmt(s.limit)}</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.68rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{s.rationale}</div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Per-record context */}
      <Section title="Data Breach Cost Reference">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
          <ResultCard label="Notification Cost" value={fmt(result.notificationCost)} sub={`${formatNumber(result.perRecordCost, 0)} per record × ${recordCount.toLocaleString()} records`} />
          <ResultCard label="BI Exposure" value={fmt(result.businessInterruptionExposure)} sub="Revenue × cloud dependency factor" />
          <ResultCard label="Regulatory Fine Exposure" value={fmt(result.regulatoryFineExposure)} sub="GDPR 4% revenue cap estimate" />
        </div>
      </Section>

      <div style={{ padding: '0.75rem 1rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
        INDICATIVE ONLY — Cyber insurance limit recommendations are mathematical approximations based on simplified exposure modelling. Per-record costs use industry averages and will vary significantly. GDPR fine estimates are maximums — actual fines depend on regulatory discretion. This tool is for orientation only. Engage a specialist cyber insurance broker for a full risk and limit adequacy assessment.
      </div>
    </div>
  );
}
