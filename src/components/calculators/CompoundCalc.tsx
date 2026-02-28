'use client';

import SaveCalcButton from '@/components/ui/SaveCalcButton';
import ToolPreview from '@/components/ui/ToolPreview';

import { useState, useMemo } from 'react';
import { useCurrency } from '@/lib/CurrencyContext';
import { calculateCompound } from '@/lib/calculations';
import { formatCurrency, formatPercent, formatNumber } from '@/lib/formatting';
import { InputField, ResultCard, Section } from '@/components/ui';
import AdSlot from '@/components/ui/AdSlot';

const FREQUENCIES = [
  { label: 'Annual', value: 1 },
  { label: 'Quarterly', value: 4 },
  { label: 'Monthly', value: 12 },
  { label: 'Daily', value: 365 },
];

export default function CompoundCalc() {
  const { currency } = useCurrency();
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(5.0);
  const [years, setYears] = useState(10);
  const [freq, setFreq] = useState(12);

  const result = useMemo(() => calculateCompound(principal, rate, years, freq), [principal, rate, years, freq]);
  const fmt = (v: number) => formatCurrency(v, currency);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
      <ToolPreview id="compound" />
      <div className="sticky-inputs" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <Section title="Parameters">
          <InputField label="Principal" value={principal} onChange={setPrincipal} min={100} max={1000000} step={500} prefix={currency.symbol} />
          <InputField label="Annual Interest Rate" value={rate} onChange={setRate} min={0.1} max={30} step={0.1} suffix="%" />
          <InputField label="Time Period" value={years} onChange={setYears} min={1} max={50} step={1} suffix="years" />
        </Section>
        <Section title="Compounding Frequency">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            {FREQUENCIES.map(f => (
              <button key={f.value} onClick={() => setFreq(f.value)} style={{
                padding: '0.6rem',
                background: freq === f.value ? 'var(--accent-dim)' : 'var(--bg)',
                border: `1px solid ${freq === f.value ? 'var(--accent)' : 'var(--border)'}`,
                borderRadius: '4px',
                color: freq === f.value ? 'var(--text-primary)' : 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                cursor: 'pointer',
                letterSpacing: '0.04em',
                transition: 'all 0.15s ease',
              }}>
                {f.label}
              </button>
            ))}
          </div>
        </Section>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Section title="Results">
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.75rem' }}>
        <SaveCalcButton
          toolHref="/compound"
          toolTitle="Compound Interest"
          summary={`${fmt(principal)} at ${rate}% over ${years} years`}
          keyResults={[
              { label: 'Final Amount', value: fmt(result.finalAmount) },
              { label: 'Total Interest', value: fmt(result.totalInterest) },
              { label: 'Effective Rate', value: `${result.effectiveRate?.toFixed(3) ?? rate}%` },
          ]}
        />

          </div>

          <ResultCard label="Final Amount" value={fmt(result.finalAmount)} size="large" color="positive" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <ResultCard label="Principal" value={fmt(principal)} />
            <ResultCard label="Interest Earned" value={fmt(result.totalInterest)} color="positive"
              sub={`${formatNumber((result.totalInterest / principal) * 100, 0)}% gain`} />
          </div>
          <ResultCard label="Effective Annual Rate (EAR)" value={formatPercent(result.effectiveRate)}
            sub="accounts for compounding frequency" />
        </Section>

        <Section title="Growth Over Time">
          <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '6px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {result.yearlyBreakdown.filter((_, i) => {
              const total = result.yearlyBreakdown.length;
              if (total <= 8) return true;
              const step = Math.ceil(total / 8);
              return i % step === 0 || i === total - 1;
            }).map(({ year, balance }) => {
              const pct = (balance / result.finalAmount) * 100;
              const principalPct = (principal / result.finalAmount) * 100;
              return (
                <div key={year} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '32px', fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textAlign: 'right', flexShrink: 0 }}>Y{year}</div>
                  <div style={{ flex: 1, height: '14px', background: 'var(--border)', borderRadius: '2px', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${principalPct}%`, background: 'var(--accent)', opacity: 0.4 }} />
                    <div style={{ position: 'absolute', left: `${principalPct}%`, top: 0, height: '100%', width: `${pct - principalPct}%`, background: 'var(--positive)', opacity: 0.8 }} />
                  </div>
                  <div style={{ width: '80px', fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', textAlign: 'right', flexShrink: 0 }}>{fmt(balance)}</div>
                </div>
              );
            })}
          </div>
        </Section>
      </div>

      {/* Ad slot — renders only when NEXT_PUBLIC_ADS_ENABLED=true */}

      <AdSlot slot="below-results" />

    </div>
  );
}
