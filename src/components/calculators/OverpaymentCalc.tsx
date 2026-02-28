'use client';

import SaveCalcButton from '@/components/ui/SaveCalcButton';
import ToolPreview from '@/components/ui/ToolPreview';

import { useState, useMemo } from 'react';
import { useCurrency } from '@/lib/CurrencyContext';
import { calculateOverpayment } from '@/lib/calculations';
import { formatCurrency } from '@/lib/formatting';
import { InputField, ResultCard, Section } from '@/components/ui';

export default function OverpaymentCalc() {
  const { currency } = useCurrency();
  const [balance, setBalance] = useState(250000);
  const [rate, setRate] = useState(4.5);
  const [term, setTerm] = useState(25);
  const [overpayment, setOverpayment] = useState(200);

  const result = useMemo(() => calculateOverpayment(balance, rate, term, overpayment), [balance, rate, term, overpayment]);
  const fmt = (v: number) => formatCurrency(v, currency);

  const yearsSaved = Math.floor(result.monthsSaved / 12);
  const monthsSavedRemainder = result.monthsSaved % 12;
  const newTermYears = Math.floor(result.newTermMonths / 12);
  const newTermMonthsRemainder = result.newTermMonths % 12;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
      <ToolPreview id="overpayment" />
      <div className="sticky-inputs" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <Section title="Mortgage Details">
          <InputField label="Outstanding Balance" value={balance} onChange={setBalance} min={10000} max={2000000} step={5000} prefix={currency.symbol} />
          <InputField label="Annual Interest Rate" value={rate} onChange={setRate} min={0.5} max={15} step={0.05} suffix="%" />
          <InputField label="Remaining Term" value={term} onChange={setTerm} min={1} max={35} step={1} suffix="years" />
        </Section>
        <Section title="Overpayment">
          <InputField label="Extra Monthly Payment" value={overpayment} onChange={setOverpayment} min={0} max={5000} step={50} prefix={currency.symbol}
            hint={`${fmt(overpayment * 12)} / year`} />
          <div style={{
            padding: '0.75rem 1rem',
            background: 'var(--accent-dim)',
            border: '1px solid rgba(59,130,196,0.2)',
            borderRadius: '4px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.5,
          }}>
            Check your mortgage terms — many lenders allow up to 10% annual overpayment without early repayment charges.
          </div>
        </Section>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Section title="Impact of Overpaying">
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.75rem' }}>
        <SaveCalcButton
          toolHref="/overpayment"
          toolTitle="Mortgage Overpayment"
          summary={`${fmt(balance)} at ${rate}%, overpaying ${fmt(overpayment)}/mo`}
          keyResults={[
              { label: 'Interest Saved', value: fmt(result.interestSaved) },
              { label: 'Time Saved', value: `${yearsSaved}y ${monthsSavedRemainder}m` },
          ]}
        />

          </div>

          <ResultCard label="Interest Saved" value={fmt(result.interestSaved)} size="large" color="positive" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <ResultCard
              label="Time Saved"
              value={result.monthsSaved > 0
                ? `${yearsSaved > 0 ? `${yearsSaved}y ` : ''}${monthsSavedRemainder > 0 ? `${monthsSavedRemainder}m` : ''}`
                : 'No saving'}
              color="positive"
            />
            <ResultCard
              label="New Term"
              value={`${newTermYears}y ${newTermMonthsRemainder > 0 ? `${newTermMonthsRemainder}m` : ''}`}
              sub={`vs original ${term} years`}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <ResultCard label="Standard Total Interest" value={fmt(result.standardTotalInterest)} color="negative" />
            <ResultCard label="With Overpayment" value={fmt(result.overpaymentTotalInterest)} color="warning" />
          </div>
        </Section>

        <Section title="Balance Comparison">
          <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '6px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '40px 1fr 1fr 80px', gap: '0.5rem', paddingBottom: '0.4rem', borderBottom: '1px solid var(--border)', marginBottom: '0.25rem' }}>
              {['Yr', 'Standard', 'Overpaying', 'Saved'].map(h => (
                <div key={h} style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</div>
              ))}
            </div>
            {result.yearlyComparison.filter((_, i) => {
              const total = result.yearlyComparison.length;
              if (total <= 8) return true;
              const step = Math.ceil(total / 8);
              return i % step === 0 || i === total - 1;
            }).map(({ year, stdBalance, ovBalance }) => {
              const maxVal = balance;
              const stdPct = (stdBalance / maxVal) * 100;
              const ovPct = (ovBalance / maxVal) * 100;
              return (
                <div key={year} style={{ display: 'grid', gridTemplateColumns: '40px 1fr 1fr 80px', gap: '0.5rem', alignItems: 'center' }}>
                  <div style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>Y{year}</div>
                  <div style={{ height: '10px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${stdPct}%`, background: 'var(--negative)', opacity: 0.5 }} />
                  </div>
                  <div style={{ height: '10px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${ovPct}%`, background: 'var(--positive)', opacity: 0.6 }} />
                  </div>
                  <div style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--positive)', textAlign: 'right' }}>{fmt(stdBalance - ovBalance)}</div>
                </div>
              );
            })}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.4rem', paddingTop: '0.4rem', borderTop: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                <div style={{ width: '10px', height: '10px', background: 'var(--negative)', opacity: 0.5, borderRadius: '1px' }} /> Standard balance
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                <div style={{ width: '10px', height: '10px', background: 'var(--positive)', opacity: 0.6, borderRadius: '1px' }} /> With overpayment
              </div>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
