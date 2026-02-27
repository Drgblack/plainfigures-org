'use client';

import { useState, useMemo } from 'react';
import { useCurrency } from '@/lib/CurrencyContext';
import { calculateSavings } from '@/lib/calculations';
import { formatCurrency, formatPercent } from '@/lib/formatting';
import { InputField, ResultCard, Section } from '@/components/ui';
import SaveCalcButton from '@/components/ui/SaveCalcButton';

export default function SavingsCalc() {
  const { currency } = useCurrency();
  const [initialDeposit, setInitialDeposit] = useState(10000);
  const [monthly, setMonthly] = useState(500);
  const [rate, setRate] = useState(4.0);
  const [term, setTerm] = useState(10);

  const result = useMemo(
    () => calculateSavings(initialDeposit, monthly, rate, term),
    [initialDeposit, monthly, rate, term]
  );

  const fmt = (v: number) => formatCurrency(v, currency);
  const totalContributions = initialDeposit + monthly * 12 * term;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
      {/* Inputs */}
      <div className="sticky-inputs" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <Section title="Savings Details">
          <InputField
            label="Initial Deposit"
            value={initialDeposit}
            onChange={setInitialDeposit}
            min={0}
            max={500000}
            step={500}
            prefix={currency.symbol}
          />
          <InputField
            label="Monthly Contribution"
            value={monthly}
            onChange={setMonthly}
            min={0}
            max={10000}
            step={50}
            prefix={currency.symbol}
            hint={`${fmt(monthly * 12)} / year`}
          />
          <InputField
            label="Annual Interest Rate"
            value={rate}
            onChange={setRate}
            min={0.1}
            max={20}
            step={0.1}
            suffix="%"
          />
          <InputField
            label="Time Period"
            value={term}
            onChange={setTerm}
            min={1}
            max={40}
            step={1}
            suffix="years"
          />
        </Section>
      </div>

      {/* Results */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <SaveCalcButton
            toolHref="/savings"
            toolTitle="Savings Growth"
            summary={`${fmt(initialDeposit)} initial + ${fmt(monthly)}/mo`}
            keyResults={[
              { label: 'Final Balance', value: fmt(result.finalBalance) },
              { label: 'Interest Earned', value: fmt(result.totalInterest) },
            ]}
          />
        </div>
        <Section title="Results">
          <ResultCard
            label="Final Balance"
            value={fmt(result.finalBalance)}
            size="large"
            color="positive"
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <ResultCard
              label="Total Contributed"
              value={fmt(totalContributions)}
            />
            <ResultCard
              label="Interest Earned"
              value={fmt(result.finalBalance - totalContributions)}
              color="positive"
              sub={`${(((result.finalBalance - totalContributions) / totalContributions) * 100).toFixed(0)}% gain`}
            />
          </div>
        </Section>

        {/* Growth chart — simple bar representation */}
        <Section title="Year-by-Year Growth">
          <div style={{
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.4rem',
          }}>
            {result.yearlyBreakdown.filter((_, i) => {
              // Show max ~8 bars
              const total = result.yearlyBreakdown.length;
              if (total <= 8) return true;
              const step = Math.ceil(total / 8);
              return i % step === 0 || i === total - 1;
            }).map(({ year, balance, contributions }) => {
              const maxVal = result.finalBalance;
              const contribPct = (contributions / maxVal) * 100;
              const balancePct = (balance / maxVal) * 100;
              return (
                <div key={year} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '32px',
                    fontSize: '0.65rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-muted)',
                    textAlign: 'right',
                    flexShrink: 0,
                  }}>
                    Y{year}
                  </div>
                  <div style={{ flex: 1, height: '16px', background: 'var(--border)', borderRadius: '2px', position: 'relative', overflow: 'hidden' }}>
                    <div style={{
                      position: 'absolute',
                      left: 0, top: 0, height: '100%',
                      width: `${contribPct}%`,
                      background: 'var(--accent)',
                      opacity: 0.5,
                    }} />
                    <div style={{
                      position: 'absolute',
                      left: `${contribPct}%`,
                      top: 0, height: '100%',
                      width: `${balancePct - contribPct}%`,
                      background: 'var(--positive)',
                      opacity: 0.8,
                    }} />
                  </div>
                  <div style={{
                    width: '72px',
                    fontSize: '0.65rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-secondary)',
                    flexShrink: 0,
                    textAlign: 'right',
                  }}>
                    {fmt(balance)}
                  </div>
                </div>
              );
            })}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                <div style={{ width: '10px', height: '10px', background: 'var(--accent)', opacity: 0.5, borderRadius: '1px' }} />
                Contributions
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                <div style={{ width: '10px', height: '10px', background: 'var(--positive)', opacity: 0.8, borderRadius: '1px' }} />
                Interest
              </div>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
