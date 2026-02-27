'use client';

import { useState, useMemo } from 'react';
import { useCurrency } from '@/lib/CurrencyContext';
import { calculateCoverageGap, CoverageItem } from '@/lib/insurance-calculations';
import { formatCurrency, formatNumber } from '@/lib/formatting';
import { InputField, ResultCard, Section } from '@/components/ui';

const STATUS_CONFIG = {
  adequate:    { label: 'Adequate',    color: '#2ec88a', bg: 'rgba(46,200,138,0.08)',  border: 'rgba(46,200,138,0.2)',  barColor: '#2ec88a' },
  partial:     { label: 'Partial Gap', color: '#d4a843', bg: 'rgba(212,168,67,0.08)', border: 'rgba(212,168,67,0.2)',  barColor: '#d4a843' },
  significant: { label: 'Significant', color: '#e07a2e', bg: 'rgba(224,122,46,0.08)', border: 'rgba(224,122,46,0.2)',  barColor: '#e07a2e' },
  critical:    { label: 'Critical Gap', color: '#e05252', bg: 'rgba(224,82,82,0.08)', border: 'rgba(224,82,82,0.2)',  barColor: '#e05252' },
};

const EXPOSURE_SCENARIOS = [
  { label: 'Base Exposure', multiplier: 1 },
  { label: '+20% Growth', multiplier: 1.2 },
  { label: '+50% Expansion', multiplier: 1.5 },
];

function CoverageBar({ item, fmt }: { item: CoverageItem; fmt: (v: number) => string }) {
  const cfg = STATUS_CONFIG[item.status];
  const limitPct = item.exposure > 0 ? Math.min((item.limit / item.exposure) * 100, 100) : 100;
  const gapPct = Math.max(0, 100 - limitPct);
  return (
    <div style={{ background: 'var(--bg-elevated)', border: `1px solid ${cfg.border}`, borderLeft: `3px solid ${cfg.color}`, borderRadius: '4px', padding: '0.85rem 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-primary)' }}>{item.name}</div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: cfg.color, padding: '0.1rem 0.4rem', background: cfg.bg, border: `1px solid ${cfg.border}`, borderRadius: '3px' }}>{cfg.label}</span>
        </div>
      </div>
      {/* Stacked bar: covered + gap */}
      <div style={{ height: '12px', borderRadius: '2px', overflow: 'hidden', background: 'var(--border)', marginBottom: '0.5rem', display: 'flex' }}>
        <div style={{ width: `${limitPct}%`, background: '#3b82c4', opacity: 0.7, transition: 'width 0.4s ease' }} />
        {gapPct > 0 && <div style={{ width: `${gapPct}%`, background: cfg.barColor, opacity: 0.5 }} />}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>EXPOSURE</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{fmt(item.exposure)}</div>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>LIMIT</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#3b82c4' }}>{fmt(item.limit)}</div>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>GAP</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: item.gap > 0 ? cfg.color : '#2ec88a' }}>
            {item.gap > 0 ? fmt(item.gap) : '—'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CoverageGapCalc() {
  const { currency } = useCurrency();
  const [propertyValue, setPropertyValue] = useState(2500000);
  const [contentValue, setContentValue] = useState(500000);
  const [liabilityExposure, setLiabilityExposure] = useState(5000000);
  const [biExposure, setBiExposure] = useState(1200000);
  const [cyberExposure, setCyberExposure] = useState(800000);

  const [propertyLimit, setPropertyLimit] = useState(2000000);
  const [contentLimit, setContentLimit] = useState(500000);
  const [liabilityLimit, setLiabilityLimit] = useState(5000000);
  const [biLimit, setBiLimit] = useState(750000);
  const [cyberLimit, setCyberLimit] = useState(500000);

  const [coinsuranceRate, setCoinsuranceRate] = useState(80);
  const [activeScenario, setActiveScenario] = useState(0);

  const inputs = useMemo(() => ({
    propertyValue, contentValue, liabilityExposure, biExposure, cyberExposure,
    propertyLimit, contentLimit, liabilityLimit, biLimit, cyberLimit, coinsuranceRate,
  }), [propertyValue, contentValue, liabilityExposure, biExposure, cyberExposure,
       propertyLimit, contentLimit, liabilityLimit, biLimit, cyberLimit, coinsuranceRate]);

  const results = useMemo(() =>
    EXPOSURE_SCENARIOS.map(s => calculateCoverageGap(inputs, s.multiplier)),
    [inputs]
  );

  const current = results[activeScenario];
  const fmt = (v: number) => formatCurrency(v, currency);

  const criticalCount = current.items.filter(i => i.status === 'critical').length;
  const significantCount = current.items.filter(i => i.status === 'significant').length;

  const overallStatus =
    criticalCount > 0 ? 'critical' :
    significantCount > 0 ? 'significant' :
    current.items.some(i => i.status === 'partial') ? 'partial' : 'adequate';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Scenario tabs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
        {EXPOSURE_SCENARIOS.map((s, i) => (
          <button key={i} onClick={() => setActiveScenario(i)} style={{
            padding: '0.65rem', background: activeScenario === i ? 'rgba(212,168,67,0.1)' : 'var(--bg)',
            border: `1px solid ${activeScenario === i ? '#d4a843' : 'var(--border)'}`,
            borderRadius: '4px', color: activeScenario === i ? '#d4a843' : 'var(--text-muted)',
            fontFamily: 'var(--font-mono)', fontSize: '0.72rem', cursor: 'pointer', transition: 'all 0.15s ease',
          }}>{s.label}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
        {/* Inputs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <Section title="Exposure Values">
            <InputField label="Property Value" value={propertyValue} onChange={setPropertyValue} min={0} max={100000000} step={50000} prefix={currency.symbol} />
            <InputField label="Contents Value" value={contentValue} onChange={setContentValue} min={0} max={20000000} step={10000} prefix={currency.symbol} />
            <InputField label="Liability Exposure" value={liabilityExposure} onChange={setLiabilityExposure} min={0} max={100000000} step={100000} prefix={currency.symbol} />
            <InputField label="Business Interruption Exposure" value={biExposure} onChange={setBiExposure} min={0} max={20000000} step={50000} prefix={currency.symbol}
              hint="Max gross profit loss in indemnity period" />
            <InputField label="Cyber Exposure" value={cyberExposure} onChange={setCyberExposure} min={0} max={20000000} step={50000} prefix={currency.symbol} />
          </Section>

          <Section title="Current Policy Limits">
            <InputField label="Property Limit" value={propertyLimit} onChange={setPropertyLimit} min={0} max={100000000} step={50000} prefix={currency.symbol} />
            <InputField label="Contents Limit" value={contentLimit} onChange={setContentLimit} min={0} max={20000000} step={10000} prefix={currency.symbol} />
            <InputField label="Liability Limit" value={liabilityLimit} onChange={setLiabilityLimit} min={0} max={100000000} step={100000} prefix={currency.symbol} />
            <InputField label="BI Limit" value={biLimit} onChange={setBiLimit} min={0} max={20000000} step={50000} prefix={currency.symbol} />
            <InputField label="Cyber Limit" value={cyberLimit} onChange={setCyberLimit} min={0} max={20000000} step={50000} prefix={currency.symbol} />
          </Section>

          <Section title="Policy Conditions">
            <InputField label="Coinsurance Requirement" value={coinsuranceRate} onChange={setCoinsuranceRate} min={70} max={100} step={5} suffix="%"
              hint="Minimum insured-to-value ratio required by policy" />
          </Section>
        </div>

        {/* Results */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Section title="Coverage Summary">
            <div style={{ padding: '1rem', background: STATUS_CONFIG[overallStatus].bg, border: `1px solid ${STATUS_CONFIG[overallStatus].border}`, borderRadius: '6px', marginBottom: '0.5rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: STATUS_CONFIG[overallStatus].color, letterSpacing: '0.1em', marginBottom: '0.4rem' }}>OVERALL COVERAGE POSITION</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', color: STATUS_CONFIG[overallStatus].color, fontWeight: 300 }}>{STATUS_CONFIG[overallStatus].label}</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <ResultCard label="Total Exposure" value={fmt(current.totalExposure)} />
              <ResultCard label="Total Cover" value={fmt(current.totalLimit)} color="default" />
            </div>
            <ResultCard
              label="Total Uninsured Gap"
              value={fmt(current.totalGap)}
              sub={`${formatNumber(current.overallGapPct, 1)}% of total exposure`}
              color={current.totalGap > 0 ? 'negative' : 'positive'}
              size="large"
            />
            {current.totalCoinsurancePenalty > 0 && (
              <ResultCard
                label="Coinsurance Penalty Exposure"
                value={fmt(current.totalCoinsurancePenalty)}
                sub={`Potential claim reduction from under-insurance`}
                color="negative"
              />
            )}
          </Section>

          {/* Cover vs gap visual */}
          <Section title="Exposure vs Limit (All Lines)">
            <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '6px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {current.items.map(item => {
                const limitPct = item.exposure > 0 ? Math.min((item.limit / item.exposure) * 100, 100) : 100;
                const gapPct = Math.max(0, 100 - limitPct);
                const cfg = STATUS_CONFIG[item.status];
                return (
                  <div key={item.name} style={{ display: 'grid', gridTemplateColumns: '120px 1fr 60px', gap: '0.6rem', alignItems: 'center' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-secondary)' }}>{item.name}</div>
                    <div style={{ height: '10px', borderRadius: '2px', overflow: 'hidden', background: 'var(--border)', display: 'flex' }}>
                      <div style={{ width: `${limitPct}%`, background: '#3b82c4', opacity: 0.65, transition: 'width 0.4s ease' }} />
                      {gapPct > 0 && <div style={{ width: `${gapPct}%`, background: cfg.barColor, opacity: 0.5 }} />}
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: item.gap > 0 ? cfg.color : '#2ec88a', textAlign: 'right' }}>
                      {item.gap > 0 ? `${formatNumber(item.gapPct, 0)}% gap` : '✓'}
                    </div>
                  </div>
                );
              })}
              <div style={{ display: 'flex', gap: '1rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)' }}>
                  <div style={{ width: '8px', height: '8px', background: '#3b82c4', opacity: 0.65, borderRadius: '1px' }} /> Covered
                </div>
                <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)' }}>
                  <div style={{ width: '8px', height: '8px', background: '#e05252', opacity: 0.5, borderRadius: '1px' }} /> Uninsured gap
                </div>
              </div>
            </div>
          </Section>
        </div>
      </div>

      {/* Per-line detail */}
      <Section title="Line-by-Line Coverage Analysis">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {current.items.map(item => <CoverageBar key={item.name} item={item} fmt={fmt} />)}
        </div>
      </Section>

      {/* Scenario comparison table */}
      <Section title="Exposure Growth Scenario Comparison">
        <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr repeat(3, 120px)', gap: '0', borderBottom: '1px solid var(--border)' }}>
            {['Metric', ...EXPOSURE_SCENARIOS.map(s => s.label)].map((h, i) => (
              <div key={h} style={{ padding: '0.6rem 0.9rem', fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: i === activeScenario + 1 ? '#d4a843' : 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', background: i === activeScenario + 1 ? 'rgba(212,168,67,0.05)' : 'transparent' }}>{h}</div>
            ))}
          </div>
          {[
            { label: 'Total Exposure', values: results.map(r => fmt(r.totalExposure)) },
            { label: 'Total Limit', values: results.map(r => fmt(r.totalLimit)) },
            { label: 'Total Gap', values: results.map(r => fmt(r.totalGap)) },
            { label: 'Gap %', values: results.map(r => `${formatNumber(r.overallGapPct, 1)}%`) },
            { label: 'Coinsurance Risk', values: results.map(r => r.totalCoinsurancePenalty > 0 ? fmt(r.totalCoinsurancePenalty) : '—') },
          ].map(({ label, values }) => (
            <div key={label} style={{ display: 'grid', gridTemplateColumns: '1fr repeat(3, 120px)', borderBottom: '1px solid var(--border)' }}>
              <div style={{ padding: '0.6rem 0.9rem', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>{label}</div>
              {values.map((v, i) => (
                <div key={i} style={{ padding: '0.6rem 0.9rem', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: i === activeScenario ? '#d4a843' : 'var(--text-secondary)', background: i === activeScenario ? 'rgba(212,168,67,0.05)' : 'transparent' }}>{v}</div>
              ))}
            </div>
          ))}
        </div>
      </Section>

      <div style={{ padding: '0.75rem 1rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
        INDICATIVE ONLY — Exposure estimates and coverage gaps are illustrative. Actual policy wordings, exclusions, endorsements, and claims conditions will determine recoverable amounts. Coinsurance penalties are approximate. Consult your insurance broker before relying on this analysis for coverage decisions.
      </div>
    </div>
  );
}
