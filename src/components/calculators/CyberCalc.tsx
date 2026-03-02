'use client';

import { useState, useMemo, useEffect } from 'react';
import { useCurrency } from '@/lib/CurrencyContext';
import { calculateCyberRisk } from '@/lib/insurance-calculations';
import { formatCurrency } from '@/lib/formatting';
import { exportToCsv } from '@/lib/exportCsv';
import { InputField, ResultCard, Section } from '@/components/ui';
import DownloadCsvButton from '@/components/ui/DownloadCsvButton';

const INDUSTRIES = [
  { label: 'Low Risk', description: 'Manufacturing, Construction, Agriculture', value: 1 },
  { label: 'Medium', description: 'Retail, Hospitality, Professional Services', value: 2 },
  { label: 'Elevated', description: 'Education, Legal, Accountancy', value: 3 },
  { label: 'High Risk', description: 'Financial Services, Insurance, Payments', value: 4 },
  { label: 'Critical', description: 'Healthcare, CNI, Government, Defence', value: 5 },
];

const RISK_COLORS = {
  Low: 'var(--positive)',
  Medium: 'var(--warning)',
  High: '#e07a2e',
  Critical: 'var(--negative)',
};

interface Control { key: string; label: string; description: string }

const CONTROLS: Control[] = [
  { key: 'mfa', label: 'Multi-Factor Authentication', description: 'MFA enforced for all users' },
  { key: 'backups', label: 'Offline / Immutable Backups', description: 'Regular tested backups, air-gapped' },
  { key: 'ir', label: 'Incident Response Plan', description: 'Documented and tested IR plan' },
  { key: 'training', label: 'Security Awareness Training', description: 'Regular staff phishing/security training' },
  { key: 'encryption', label: 'Data Encryption at Rest', description: 'Customer and sensitive data encrypted' },
];

export default function CyberCalc() {
  const { currency } = useCurrency();
  const [revenue, setRevenue] = useState(5000000);
  const [employees, setEmployees] = useState(50);
  const [records, setRecords] = useState(10000);
  const [industryRisk, setIndustryRisk] = useState(2);
  const [controls, setControls] = useState({ mfa: false, backups: false, ir: false, training: false, encryption: false });

  const toggle = (key: string) => setControls(c => ({ ...c, [key]: !c[key as keyof typeof c] }));

  const result = useMemo(() => calculateCyberRisk(
    revenue, employees, records, industryRisk,
    controls.mfa, controls.backups, controls.ir, controls.training, controls.encryption
  ), [revenue, employees, records, industryRisk, controls]);

  const riskColor = RISK_COLORS[result.riskLevel];
  const fmt = (v: number) => formatCurrency(v, currency);

  useEffect(() => {
    console.log('CSV button rendered [CSV-DEBUG-v1] - CyberCalc');
  }, []);

  const downloadCsv = () => {
    const breakdownRows = result.breakdown.map((item) => ({
      Section: 'Cost Breakdown',
      Category: item.category,
      Cost: fmt(item.cost),
      Description: item.description,
    }));

    const controlRows = CONTROLS.map((control) => ({
      Section: 'Security Controls',
      Category: control.label,
      Cost: controls[control.key as keyof typeof controls] ? 'Enabled' : 'Not enabled',
      Description: control.description,
    }));

    exportToCsv({
      fileName: 'plainfigures-cyber-risk-results',
      metadata: [
        { key: 'Calculator', value: 'Cyber Risk Exposure Calculator' },
        { key: 'Currency', value: `${currency.code} (${currency.symbol})` },
        { key: 'Annual Revenue', value: fmt(revenue) },
        { key: 'Employees', value: employees },
        { key: 'Data Records', value: records },
        { key: 'Industry Risk Tier', value: INDUSTRIES.find((item) => item.value === industryRisk)?.label ?? industryRisk },
        { key: 'Risk Score', value: `${result.riskScore}` },
        { key: 'Risk Level', value: result.riskLevel },
        { key: 'Estimated Breach Cost', value: fmt(result.estimatedBreachCost) },
        { key: 'Recommended Cover Limit', value: fmt(result.recommendedCoverLimit) },
        { key: 'Estimated Premium (Low)', value: fmt(result.annualPremiumEstimate.low) },
        { key: 'Estimated Premium (High)', value: fmt(result.annualPremiumEstimate.high) },
      ],
      rows: [...breakdownRows, ...controlRows],
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Inputs */}
        <div className="sticky-inputs" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <Section title="Business Profile">
            <InputField label="Annual Revenue" value={revenue} onChange={setRevenue} min={100000} max={500000000} step={100000} prefix={currency.symbol} />
            <InputField label="Number of Employees" value={employees} onChange={setEmployees} min={1} max={50000} step={1} suffix="staff" />
            <InputField label="Customer / Data Records Held" value={records} onChange={setRecords} min={0} max={10000000} step={1000} suffix="records" />
          </Section>

          <Section title="Industry Risk Profile">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {INDUSTRIES.map(ind => (
                <button key={ind.value} onClick={() => setIndustryRisk(ind.value)} style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr',
                  gap: '0.75rem',
                  padding: '0.6rem 0.75rem',
                  background: industryRisk === ind.value ? 'rgba(212,168,67,0.1)' : 'var(--bg)',
                  border: `1px solid ${industryRisk === ind.value ? 'rgba(212,168,67,0.4)' : 'var(--border)'}`,
                  borderRadius: '4px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease',
                }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: industryRisk === ind.value ? '#d4a843' : 'var(--text-secondary)' }}>
                    {ind.label}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                    {ind.description}
                  </span>
                </button>
              ))}
            </div>
          </Section>
        </div>

        {/* Results */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <DownloadCsvButton onDownload={downloadCsv} debugTag="CSV-DEBUG-v1" />
          </div>
          {/* Risk Score */}
          <Section title="Risk Score">
            <div style={{ background: 'var(--bg-elevated)', border: `1px solid ${riskColor}40`, borderRadius: '6px', padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '4rem', fontWeight: 300, color: riskColor, lineHeight: 1, marginBottom: '0.5rem' }}>
                {result.riskScore}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: riskColor, letterSpacing: '0.12em', marginBottom: '1rem' }}>
                {result.riskLevel.toUpperCase()} RISK
              </div>
              <div style={{ height: '6px', background: 'var(--border)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${result.riskScore}%`, background: riskColor, transition: 'width 0.3s ease' }} />
              </div>
            </div>
          </Section>

          <ResultCard label="Estimated Total Breach Cost" value={fmt(result.estimatedBreachCost)} size="large" color="negative" />
          <ResultCard label="Recommended Cover Limit" value={fmt(result.recommendedCoverLimit)} color="warning"
            sub={`Est. premium: ${fmt(result.annualPremiumEstimate.low)}–${fmt(result.annualPremiumEstimate.high)} p.a.`} />
        </div>
      </div>

      {/* Security Controls */}
      <Section title="Security Controls — Toggle What's in Place">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
          {CONTROLS.map(({ key, label, description }) => {
            const active = controls[key as keyof typeof controls];
            return (
              <button key={key} onClick={() => toggle(key)} style={{
                display: 'grid',
                gridTemplateColumns: '20px 1fr',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                background: active ? 'rgba(46,204,138,0.08)' : 'var(--bg)',
                border: `1px solid ${active ? 'rgba(46,204,138,0.3)' : 'var(--border)'}`,
                borderRadius: '4px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease',
                alignItems: 'center',
              }}>
                <div style={{
                  width: '14px', height: '14px', borderRadius: '3px',
                  background: active ? 'var(--positive)' : 'transparent',
                  border: `1px solid ${active ? 'var(--positive)' : 'var(--border)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  {active && <span style={{ color: 'var(--bg)', fontSize: '0.6rem', fontWeight: 700 }}>✓</span>}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: active ? 'var(--positive)' : 'var(--text-secondary)', marginBottom: '0.15rem' }}>{label}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)' }}>{description}</div>
                </div>
              </button>
            );
          })}
        </div>
      </Section>

      {/* Cost breakdown */}
      <Section title="Estimated Breach Cost Breakdown">
        <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden' }}>
          {result.breakdown.map(({ category, cost, description }, i) => (
            <div key={category} style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr auto',
              gap: '1rem', padding: '0.85rem 1.1rem',
              borderBottom: i < result.breakdown.length - 1 ? '1px solid var(--border)' : 'none',
              alignItems: 'center',
            }}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-primary)', marginBottom: '0.15rem' }}>{category}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)' }}>{description}</div>
              </div>
              <div style={{ height: '8px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${(cost / result.estimatedBreachCost) * 100}%`, background: 'var(--negative)', opacity: 0.7 }} />
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--negative)', textAlign: 'right', minWidth: '80px' }}>{fmt(cost)}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: '0.75rem 1rem', background: 'rgba(224,82,82,0.05)', border: '1px solid rgba(224,82,82,0.2)', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
          Estimates based on industry averages. Actual costs vary significantly. This tool is for risk awareness only — not a substitute for a formal cyber risk assessment or broker consultation.
        </div>
      </Section>
    </div>
  );
}
