'use client';

import SaveCalcButton from '@/components/ui/SaveCalcButton';
import ToolPreview from '@/components/ui/ToolPreview';

import { useState, useMemo } from 'react';
import { calculateTakeHome, COUNTRY_CONFIG, CountryCode } from '@/lib/tax-calculations';
import { ResultCard, Section } from '@/components/ui';

const COUNTRIES: CountryCode[] = ['UK', 'DE', 'US', 'FR', 'NL', 'AU'];

function fmt(v: number, symbol: string) {
  return `${symbol}${Math.abs(v).toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

export default function TakeHomeCalc() {
  const [country, setCountry] = useState<CountryCode>('UK');
  const [gross, setGross] = useState(45000);
  const cfg = COUNTRY_CONFIG[country];

  const result = useMemo(() => calculateTakeHome(gross, country), [gross, country]);
  const incomeTax = Math.abs(result.breakdown.find(item => item.label.toLowerCase().includes('income tax'))?.amount ?? 0);

  const handleCountryChange = (c: CountryCode) => {
    setCountry(c);
    setGross(COUNTRY_CONFIG[c].defaultGross);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <ToolPreview id="take-home" />
      {/* Country selector */}
      <Section title="Select Country">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.5rem' }}>
          {COUNTRIES.map(c => {
            const cc = COUNTRY_CONFIG[c];
            return (
              <button key={c} onClick={() => handleCountryChange(c)} style={{
                padding: '0.6rem 0.4rem',
                background: country === c ? 'var(--accent-dim)' : 'var(--bg)',
                border: `1px solid ${country === c ? 'var(--accent)' : 'var(--border)'}`,
                borderRadius: '4px',
                color: country === c ? 'var(--text-primary)' : 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem',
              }}>
                <span style={{ fontSize: '1.2rem' }}>{cc.flag}</span>
                <span style={{ letterSpacing: '0.04em' }}>{c}</span>
              </button>
            );
          })}
        </div>
      </Section>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
        {/* Input */}
        <Section title={`Gross Annual Salary — ${cfg.name}`}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg)', border: '1px solid var(--border-light)', borderRadius: '4px', overflow: 'hidden' }}>
              <span style={{ padding: '0 0.75rem', fontFamily: 'var(--font-mono)', fontSize: '1rem', color: 'var(--text-muted)', borderRight: '1px solid var(--border)', background: 'var(--bg-surface)', lineHeight: '52px' }}>{cfg.symbol}</span>
              <input
                type="number"
                value={gross}
                onChange={e => setGross(parseFloat(e.target.value) || 0)}
                style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontSize: '1.4rem', padding: '0.6rem 0.75rem' }}
              />
            </div>
            <input type="range" min={10000} max={country === 'AU' ? 300000 : 250000} step={1000} value={Math.min(gross, country === 'AU' ? 300000 : 250000)} onChange={e => setGross(parseFloat(e.target.value))} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)' }}>
              <span>{cfg.symbol}10,000</span>
              <span>{cfg.symbol}{country === 'AU' ? '300,000' : '250,000'}</span>
            </div>
          </div>

          {/* Tax breakdown table */}
          <div style={{ marginTop: '1rem', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden' }}>
            {result.breakdown.map(({ label, amount, rate }, i) => {
              const isTotal = label === 'Net Take-Home' || label.includes('Net Take');
              const isPositive = amount > 0 && label !== 'Gross Salary';
              return (
                <div key={label} style={{
                  display: 'grid', gridTemplateColumns: '1fr auto auto',
                  gap: '0.75rem', padding: '0.75rem 1rem',
                  borderBottom: i < result.breakdown.length - 1 ? '1px solid var(--border)' : 'none',
                  background: isTotal ? 'var(--bg)' : 'transparent',
                  alignItems: 'center',
                }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: isTotal ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{label}</div>
                  {rate !== undefined ? (
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', textAlign: 'right' }}>{rate.toFixed(1)}%</div>
                  ) : <div />}
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: isTotal ? '0.95rem' : '0.8rem', color: isTotal ? 'var(--positive)' : amount < 0 ? 'var(--negative)' : isPositive ? 'var(--positive)' : 'var(--text-primary)', fontWeight: isTotal ? 500 : 400, textAlign: 'right', minWidth: '90px' }}>
                    {amount < 0 ? `(${fmt(amount, cfg.symbol)})` : fmt(amount, cfg.symbol)}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ padding: '0.6rem 0.75rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            Estimates based on {new Date().getFullYear()} tax rates. Does not account for pension contributions, student loans, or other deductions. For guidance only.
          </div>
        </Section>

        {/* Results */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Section title="Results">
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.75rem' }}>
        <SaveCalcButton
          toolHref="/take-home"
          toolTitle="Salary Take-Home"
          summary={`${cfg.symbol}${gross.toLocaleString()} gross (${country})`}
          keyResults={[
              { label: 'Monthly Take-Home', value: fmt(result.netMonthly, cfg.symbol) },
              { label: 'Income Tax', value: fmt(incomeTax, cfg.symbol) },
              { label: 'Net Annual', value: fmt(result.netAnnual, cfg.symbol) },
          ]}
        />

            </div>

            <ResultCard label="Monthly Take-Home" value={fmt(result.netMonthly, cfg.symbol)} size="large" color="positive" />
            <ResultCard label="Annual Take-Home" value={fmt(result.netAnnual, cfg.symbol)} color="positive"
              sub={`${fmt(result.netMonthly, cfg.symbol)}/month · ${fmt(result.netMonthly / 4.33, cfg.symbol)}/week`} />
            <ResultCard label="Effective Tax Rate" value={`${result.effectiveTaxRate.toFixed(1)}%`}
              color={result.effectiveTaxRate > 40 ? 'negative' : result.effectiveTaxRate > 25 ? 'warning' : 'default'}
              sub={`${fmt(result.grossAnnual - result.netAnnual, cfg.symbol)} total deductions per year`} />
          </Section>

          {/* Visual tax burden */}
          <Section title="Income Breakdown">
            <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '6px', padding: '1.25rem' }}>
              <div style={{ height: '24px', borderRadius: '4px', overflow: 'hidden', display: 'flex', marginBottom: '0.75rem' }}>
                <div style={{ width: `${100 - result.effectiveTaxRate}%`, background: 'var(--positive)', opacity: 0.8 }} />
                <div style={{ flex: 1, background: 'var(--negative)', opacity: 0.6 }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--positive)' }}>
                  You keep {(100 - result.effectiveTaxRate).toFixed(1)}%
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--negative)' }}>
                  Tax & NI {result.effectiveTaxRate.toFixed(1)}%
                </div>
              </div>
            </div>
          </Section>

          {/* Daily/hourly */}
          <Section title="Equivalent Rates">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <ResultCard label="Daily (260 days)" value={fmt(result.netAnnual / 260, cfg.symbol)} />
              <ResultCard label="Hourly (40hr week)" value={fmt(result.netAnnual / 2080, cfg.symbol)} />
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
