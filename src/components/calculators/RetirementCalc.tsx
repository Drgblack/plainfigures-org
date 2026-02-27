'use client';

import { useState, useMemo } from 'react';
import { useCurrency } from '@/lib/CurrencyContext';
import { calculateRetirement } from '@/lib/calculations';
import { formatCurrency, formatNumber } from '@/lib/formatting';
import { InputField, ResultCard, Section } from '@/components/ui';
import SaveCalcButton from '@/components/ui/SaveCalcButton';

export default function RetirementCalc() {
  const { currency } = useCurrency();
  const [currentAge, setCurrentAge] = useState(35);
  const [retirementAge, setRetirementAge] = useState(65);
  const [currentSavings, setCurrentSavings] = useState(25000);
  const [monthly, setMonthly] = useState(400);
  const [employer, setEmployer] = useState(200);
  const [growth, setGrowth] = useState(6.0);
  const [inflation, setInflation] = useState(2.5);

  const result = useMemo(
    () => calculateRetirement(currentAge, retirementAge, currentSavings, monthly, employer, growth, inflation),
    [currentAge, retirementAge, currentSavings, monthly, employer, growth, inflation]
  );

  const fmt = (v: number) => formatCurrency(v, currency);
  const years = retirementAge - currentAge;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
      <div className="sticky-inputs" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <Section title="Personal Details">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <InputField label="Current Age" value={currentAge} onChange={setCurrentAge} min={18} max={80} step={1} suffix="yrs" />
            <InputField label="Retirement Age" value={retirementAge} onChange={v => setRetirementAge(Math.max(currentAge + 1, v))} min={40} max={80} step={1} suffix="yrs" />
          </div>
          <InputField label="Current Pension Savings" value={currentSavings} onChange={setCurrentSavings} min={0} max={2000000} step={1000} prefix={currency.symbol} />
        </Section>
        <Section title="Contributions">
          <InputField label="Your Monthly Contribution" value={monthly} onChange={setMonthly} min={0} max={5000} step={50} prefix={currency.symbol} />
          <InputField label="Employer Monthly Contribution" value={employer} onChange={setEmployer} min={0} max={5000} step={50} prefix={currency.symbol}
            hint={`Total: ${fmt(monthly + employer)}/mo`} />
        </Section>
        <Section title="Assumptions">
          <InputField label="Annual Investment Growth" value={growth} onChange={setGrowth} min={0} max={15} step={0.5} suffix="%" />
          <InputField label="Annual Inflation" value={inflation} onChange={setInflation} min={0} max={10} step={0.5} suffix="%" />
        </Section>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <SaveCalcButton
            toolHref="/retirement"
            toolTitle="Retirement Savings"
            summary={`Projection to age ${retirementAge}`}
            keyResults={[
              { label: 'Final Pot', value: fmt(result.projectedPot) },
              { label: 'Monthly Income', value: fmt(result.monthlyIncomeFrom) },
            ]}
          />
        </div>
        <Section title={`Projection at age ${retirementAge} (${years} years)`}>
          <ResultCard label="Projected Pension Pot" value={fmt(result.projectedPot)} size="large" color="positive"
            sub="in today's money (inflation-adjusted)" />
          <ResultCard label="Estimated Monthly Income" value={fmt(result.monthlyIncomeFrom)} color="positive"
            sub="based on 4% annual safe withdrawal rate" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <ResultCard label="Total Contributions" value={fmt(result.totalContributions)} />
            <ResultCard label="Investment Growth" value={fmt(result.totalGrowth)} color="positive"
              sub={`${formatNumber((result.totalGrowth / result.totalContributions) * 100, 0)}% gain`} />
          </div>
        </Section>

        <Section title="Pot Growth by Age">
          <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '6px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {result.yearlyBreakdown.filter((_, i) => {
              const total = result.yearlyBreakdown.length;
              if (total <= 8) return true;
              const step = Math.ceil(total / 8);
              return i % step === 0 || i === total - 1;
            }).map(({ age, balance, contributions }) => {
              const maxVal = result.projectedPot;
              const contribPct = (contributions / maxVal) * 100;
              const balPct = (balance / maxVal) * 100;
              return (
                <div key={age} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '32px', fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textAlign: 'right', flexShrink: 0 }}>{age}</div>
                  <div style={{ flex: 1, height: '14px', background: 'var(--border)', borderRadius: '2px', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${contribPct}%`, background: 'var(--accent)', opacity: 0.4 }} />
                    <div style={{ position: 'absolute', left: `${contribPct}%`, top: 0, height: '100%', width: `${Math.max(0, balPct - contribPct)}%`, background: 'var(--positive)', opacity: 0.8 }} />
                  </div>
                  <div style={{ width: '80px', fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', textAlign: 'right', flexShrink: 0 }}>{fmt(balance)}</div>
                </div>
              );
            })}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.4rem', paddingTop: '0.4rem', borderTop: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                <div style={{ width: '10px', height: '10px', background: 'var(--accent)', opacity: 0.4, borderRadius: '1px' }} /> Contributions
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                <div style={{ width: '10px', height: '10px', background: 'var(--positive)', opacity: 0.8, borderRadius: '1px' }} /> Growth
              </div>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
