'use client';

import { useState, useMemo } from 'react';
import { useCurrency } from '@/lib/CurrencyContext';
import { calculateOffset } from '@/lib/calculations';
import { formatCurrency, formatNumber } from '@/lib/formatting';
import { InputField, ResultCard, Section } from '@/components/ui';

export default function OffsetCalc() {
  const { currency } = useCurrency();
  const [balance, setBalance] = useState(250000);
  const [savings, setSavings] = useState(30000);
  const [rate, setRate] = useState(4.5);
  const [term, setTerm] = useState(25);

  const result = useMemo(() => calculateOffset(balance, savings, rate, term), [balance, savings, rate, term]);
  const fmt = (v: number) => formatCurrency(v, currency);

  const termReductionYears = Math.floor(result.termReductionMonths / 12);
  const termReductionRemainingMonths = result.termReductionMonths % 12;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
      <div className="sticky-inputs" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <Section title="Mortgage Details">
          <InputField label="Mortgage Balance" value={balance} onChange={setBalance} min={10000} max={2000000} step={5000} prefix={currency.symbol} />
          <InputField label="Offset Savings Balance" value={savings} onChange={setSavings} min={0} max={balance} step={1000} prefix={currency.symbol}
            hint={`${formatNumber((savings / balance) * 100, 0)}% of mortgage`} />
          <InputField label="Annual Interest Rate" value={rate} onChange={setRate} min={0.5} max={15} step={0.05} suffix="%" />
          <InputField label="Remaining Term" value={term} onChange={setTerm} min={1} max={35} step={1} suffix="years" />
        </Section>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Section title="Results">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <ResultCard label="Effective Mortgage Balance" value={fmt(result.effectiveBalance)}
              sub={`${fmt(savings)} offset`} />
            <ResultCard label="Monthly Payment" value={fmt(result.standardMonthlyPayment)} />
          </div>
          <ResultCard label="Total Interest Saved" value={fmt(result.interestSavedTotal)} size="large" color="positive"
            sub="by holding savings in offset account" />
          <ResultCard
            label="Term Reduction"
            value={termReductionYears > 0 || termReductionRemainingMonths > 0
              ? `${termReductionYears > 0 ? `${termReductionYears}y ` : ''}${termReductionRemainingMonths > 0 ? `${termReductionRemainingMonths}m` : ''}`
              : 'No reduction'}
            color="positive"
            sub="mortgage paid off earlier"
          />
        </Section>

        <Section title="Cumulative Interest Saved by Year">
          <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '6px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {result.yearlyComparison.filter((_, i) => {
              const total = result.yearlyComparison.length;
              if (total <= 8) return true;
              const step = Math.ceil(total / 8);
              return i % step === 0 || i === total - 1;
            }).map(({ year, standardInterest, offsetInterest, saving }) => {
              const pct = (saving / (standardInterest || 1)) * 100;
              return (
                <div key={year} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '32px', fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textAlign: 'right', flexShrink: 0 }}>Y{year}</div>
                  <div style={{ flex: 1, height: '14px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${Math.min(100, pct)}%`, background: 'var(--positive)', opacity: 0.8 }} />
                  </div>
                  <div style={{ width: '80px', fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--positive)', textAlign: 'right', flexShrink: 0 }}>{fmt(saving)}</div>
                </div>
              );
            })}
            <div style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginTop: '0.4rem', paddingTop: '0.4rem', borderTop: '1px solid var(--border)' }}>
              Cumulative interest saved compared to standard mortgage
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
