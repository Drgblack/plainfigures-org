'use client';

import { useState, useMemo } from 'react';
import { useCurrency } from '@/lib/CurrencyContext';
import { calculateTCOR, TCORScenario } from '@/lib/insurance-calculations';
import { formatCurrency, formatNumber } from '@/lib/formatting';
import { InputField, ResultCard, Section } from '@/components/ui';
import SaveCalcButton from '@/components/ui/SaveCalcButton';

const SCENARIO_COLORS = ['#3b82c4', '#e05252', '#2ec88a', '#d4a843'];
const SCENARIO_BORDER = ['rgba(59,130,196,0.4)', 'rgba(224,82,82,0.4)', 'rgba(46,200,138,0.4)', 'rgba(212,168,67,0.4)'];

function ScenarioBar({ label, value, max, color, index }: { label: string; value: number; max: number; color: string; index: number }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr 90px', gap: '0.75rem', alignItems: 'center' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-secondary)', letterSpacing: '0.02em' }}>{label}</div>
      <div style={{ height: '10px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: color, opacity: 0.75, transition: 'width 0.4s ease' }} />
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color, textAlign: 'right' }}>{label}</div>
    </div>
  );
}

function StackedBar({ scenario, fmt, maxTCOR }: { scenario: TCORScenario; fmt: (v: number) => string; maxTCOR: number }) {
  const bars = [
    { label: 'Premiums', value: scenario.premiums, color: '#3b82c4' },
    { label: 'Retained Losses', value: scenario.retainedLosses, color: '#e05252' },
    { label: 'Admin', value: scenario.adminCosts, color: '#d4a843' },
    { label: 'Risk Controls', value: scenario.riskControlCosts, color: '#2ec88a' },
  ];
  const total = scenario.tcor;
  return (
    <div style={{ display: 'flex', height: '40px', borderRadius: '3px', overflow: 'hidden', gap: '1px' }}>
      {bars.map(b => (
        <div key={b.label} style={{ flex: b.value / total, background: b.color, opacity: 0.75, transition: 'flex 0.4s ease', minWidth: b.value > 0 ? '2px' : '0' }} title={`${b.label}: ${fmt(b.value)}`} />
      ))}
    </div>
  );
}

export default function TCORCalc() {
  const { currency } = useCurrency();
  const [premiums, setPremiums] = useState(450000);
  const [retainedLosses, setRetainedLosses] = useState(120000);
  const [adminCosts, setAdminCosts] = useState(65000);
  const [riskControlCosts, setRiskControlCosts] = useState(45000);
  const [revenue, setRevenue] = useState(10000000);
  const [activeScenario, setActiveScenario] = useState(0);

  const result = useMemo(
    () => calculateTCOR({ premiums, retainedLosses, adminCosts, riskControlCosts, revenue }),
    [premiums, retainedLosses, adminCosts, riskControlCosts, revenue]
  );

  const fmt = (v: number) => formatCurrency(v, currency);
  const maxTCOR = Math.max(...result.scenarios.map(s => s.tcor));
  const current = result.scenarios[activeScenario];

  const costComponents = [
    { label: 'Insurance Premiums', value: current.premiums, color: '#3b82c4' },
    { label: 'Retained Losses', value: current.retainedLosses, color: '#e05252' },
    { label: 'Administrative Costs', value: current.adminCosts, color: '#d4a843' },
    { label: 'Risk Control Costs', value: current.riskControlCosts, color: '#2ec88a' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
        {/* Inputs */}
        <div className="sticky-inputs" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <Section title="Risk Cost Inputs">
            <InputField label="Annual Insurance Premiums" value={premiums} onChange={setPremiums} min={0} max={10000000} step={5000} prefix={currency.symbol} />
            <InputField label="Retained Losses (self-insured)" value={retainedLosses} onChange={setRetainedLosses} min={0} max={5000000} step={5000} prefix={currency.symbol}
              hint="Claims within deductible / excess" />
            <InputField label="Risk Administration Costs" value={adminCosts} onChange={setAdminCosts} min={0} max={1000000} step={1000} prefix={currency.symbol}
              hint="Broker fees, loss adjusters, internal risk staff" />
            <InputField label="Risk Control / Prevention Costs" value={riskControlCosts} onChange={setRiskControlCosts} min={0} max={1000000} step={1000} prefix={currency.symbol}
              hint="Training, inspections, safety systems" />
          </Section>
          <Section title="Context">
            <InputField label="Annual Revenue (for TCOR Rate)" value={revenue} onChange={setRevenue} min={100000} max={1000000000} step={100000} prefix={currency.symbol}
              hint="Used to calculate TCOR per £1,000 revenue" />
          </Section>
        </div>

        {/* Base results */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <SaveCalcButton
              toolHref="/tcor"
              toolTitle="Total Cost of Risk"
              summary={`TCOR analysis`}
              keyResults={[
                { label: 'Base TCOR', value: fmt(result.base.tcor) },
                { label: 'TCOR Rate', value: `${formatNumber(result.base.tcorRate, 2)} per £1k revenue` },
              ]}
            />
          </div>
          <Section title="Base Case">
            <ResultCard label="Total Cost of Risk (TCOR)" value={fmt(result.base.tcor)} size="large" color="warning" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <ResultCard label="TCOR Rate" value={`${formatNumber(result.base.tcorRate, 2)}`} sub="per £1,000 revenue" color="warning" />
              <ResultCard label="TCOR as % Revenue" value={`${formatNumber((result.base.tcor / revenue) * 100, 2)}%`} />
            </div>
          </Section>

          {/* Component breakdown */}
          <Section title="Cost Breakdown">
            <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden' }}>
              {costComponents.map(({ label, value, color }) => {
                const pct = result.base.tcor > 0 ? (value / result.base.tcor) * 100 : 0;
                return (
                  <div key={label} style={{ display: 'grid', gridTemplateColumns: '12px 1fr 80px 60px', gap: '0.75rem', padding: '0.7rem 1rem', borderBottom: '1px solid var(--border)', alignItems: 'center' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: color, opacity: 0.8 }} />
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>{label}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-primary)', textAlign: 'right' }}>{fmt(value)}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', textAlign: 'right' }}>{pct.toFixed(1)}%</div>
                  </div>
                );
              })}
              <div style={{ padding: '0.4rem 1rem', display: 'flex', gap: '1px', height: '8px' }}>
                {costComponents.map(({ label, value, color }) => (
                  <div key={label} style={{ flex: value / result.base.tcor, background: color, opacity: 0.65 }} />
                ))}
              </div>
            </div>
          </Section>
        </div>
      </div>

      {/* Scenario comparison */}
      <Section title="Scenario Comparison">
        {/* Scenario tabs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {result.scenarios.map((s, i) => (
            <button key={i} onClick={() => setActiveScenario(i)} style={{ padding: '0.65rem 0.5rem', background: activeScenario === i ? `${SCENARIO_COLORS[i]}18` : 'var(--bg)', border: `1px solid ${activeScenario === i ? SCENARIO_BORDER[i] : 'var(--border)'}`, borderRadius: '4px', color: activeScenario === i ? SCENARIO_COLORS[i] : 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.68rem', cursor: 'pointer', transition: 'all 0.15s ease', textAlign: 'center', lineHeight: 1.3 }}>
              {s.label}
            </button>
          ))}
        </div>

        {/* Visual bars — all scenarios */}
        <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '6px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {result.scenarios.map((s, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: i === activeScenario ? SCENARIO_COLORS[i] : 'var(--text-muted)' }}>{s.label}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: i === activeScenario ? SCENARIO_COLORS[i] : 'var(--text-secondary)' }}>
                  {fmt(s.tcor)}
                  {i !== 0 && (
                    <span style={{ marginLeft: '0.5rem', fontSize: '0.65rem', color: s.tcor > result.base.tcor ? '#e05252' : '#2ec88a' }}>
                      {s.tcor > result.base.tcor ? '+' : ''}{formatNumber(((s.tcor - result.base.tcor) / result.base.tcor) * 100, 1)}%
                    </span>
                  )}
                </div>
              </div>
              <StackedBar scenario={s} fmt={fmt} maxTCOR={maxTCOR} />
            </div>
          ))}
          {/* Legend */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', paddingTop: '0.5rem', borderTop: '1px solid var(--border)' }}>
            {[{ l: 'Premiums', c: '#3b82c4' }, { l: 'Retained Losses', c: '#e05252' }, { l: 'Admin', c: '#d4a843' }, { l: 'Risk Controls', c: '#2ec88a' }].map(({ l, c }) => (
              <div key={l} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)' }}>
                <div style={{ width: '8px', height: '8px', background: c, opacity: 0.75, borderRadius: '1px' }} />{l}
              </div>
            ))}
          </div>
        </div>

        {/* Selected scenario detail */}
        <div style={{ marginTop: '1rem', padding: '1.25rem', background: `${SCENARIO_COLORS[activeScenario]}08`, border: `1px solid ${SCENARIO_BORDER[activeScenario]}`, borderRadius: '6px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: SCENARIO_COLORS[activeScenario], letterSpacing: '0.1em', marginBottom: '1rem', textTransform: 'uppercase' }}>
            {current.label} — Detail
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
            <ResultCard label="TCOR" value={fmt(current.tcor)} color={activeScenario === 0 ? 'default' : current.tcor > result.base.tcor ? 'negative' : 'positive'} />
            <ResultCard label="TCOR Rate /£1k revenue" value={formatNumber(current.tcorRate, 2)} />
            <ResultCard label="vs Base" value={activeScenario === 0 ? '—' : `${current.tcor > result.base.tcor ? '+' : ''}${fmt(current.tcor - result.base.tcor)}`}
              color={activeScenario === 0 ? 'default' : current.tcor > result.base.tcor ? 'negative' : 'positive'} />
          </div>
        </div>
      </Section>

      {/* Disclaimer */}
      <div style={{ padding: '0.75rem 1rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
        INDICATIVE ONLY — TCOR calculations are illustrative and depend on accurate loss data, policy terms, and organisational context. Scenarios are modelled approximations. Consult your risk manager, actuary, or insurance adviser before using results for decision-making.
      </div>
    </div>
  );
}
