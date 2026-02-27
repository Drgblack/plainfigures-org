'use client';

import { useState, useMemo } from 'react';
import { useCurrency } from '@/lib/CurrencyContext';
import { calculateAffordability } from '@/lib/lifestyle-calculations';
import { formatCurrency, formatNumber } from '@/lib/formatting';
import { InputField, ResultCard, Section } from '@/components/ui';

export default function AffordabilityCalc() {
  const { currency } = useCurrency();
  const [income, setIncome] = useState(55000);
  const [partnerIncome, setPartnerIncome] = useState(0);
  const [commitments, setCommitments] = useState(300);
  const [deposit, setDeposit] = useState(40000);
  const [rate, setRate] = useState(4.5);
  const [term, setTerm] = useState(25);
  const [multiple, setMultiple] = useState(4.5);

  const totalIncome = income + partnerIncome;
  const result = useMemo(
    () => calculateAffordability(totalIncome, commitments, deposit, rate, term, multiple),
    [totalIncome, commitments, deposit, rate, term, multiple]
  );

  const fmt = (v: number) => formatCurrency(v, currency);
  const depositPct = result.maxPropertyPrice > 0 ? (deposit / result.maxPropertyPrice) * 100 : 0;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
      <div className="sticky-inputs" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <Section title="Your Income">
          <InputField label="Your Annual Gross Income" value={income} onChange={setIncome} min={10000} max={500000} step={1000} prefix={currency.symbol} />
          <InputField label="Partner's Annual Income (optional)" value={partnerIncome} onChange={setPartnerIncome} min={0} max={500000} step={1000} prefix={currency.symbol}
            hint={partnerIncome > 0 ? `Combined: ${fmt(totalIncome)}` : 'Leave at 0 if solo'} />
          <InputField label="Monthly Debt Commitments" value={commitments} onChange={setCommitments} min={0} max={5000} step={50} prefix={currency.symbol}
            hint="Loans, credit cards, car finance" />
        </Section>
        <Section title="Mortgage Details">
          <InputField label="Deposit / Down Payment" value={deposit} onChange={setDeposit} min={5000} max={500000} step={5000} prefix={currency.symbol} />
          <InputField label="Interest Rate" value={rate} onChange={setRate} min={1} max={15} step={0.1} suffix="%" />
          <InputField label="Mortgage Term" value={term} onChange={setTerm} min={5} max={35} step={1} suffix="years" />
          <InputField label="Income Multiple (lender)" value={multiple} onChange={setMultiple} min={3} max={6} step={0.5} suffix="x"
            hint="Typical: 4–4.5x, max 5.5x" />
        </Section>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Section title="What You Can Borrow">
          <ResultCard label="Maximum Property Price" value={fmt(result.maxPropertyPrice)} size="large" color="positive" />
          <ResultCard label="Maximum Mortgage" value={fmt(result.maxLoan)} sub={`${formatNumber(result.loanToIncome, 1)}x annual income`} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <ResultCard label="Monthly Payment" value={fmt(result.monthlyPayment)} />
            <ResultCard label="Stress Test (+3%)" value={fmt(result.stressTestPayment)} color="warning"
              sub="can you afford if rates rise?" />
          </div>
        </Section>

        {/* LTV visual */}
        <Section title="Loan to Value">
          <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '6px', padding: '1.25rem' }}>
            <div style={{ height: '20px', borderRadius: '3px', overflow: 'hidden', display: 'flex', marginBottom: '0.75rem' }}>
              <div style={{ width: `${depositPct}%`, background: 'var(--positive)', opacity: 0.8 }} />
              <div style={{ flex: 1, background: 'var(--accent)', opacity: 0.5 }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--positive)' }}>
                Deposit {depositPct.toFixed(1)}% — {fmt(deposit)}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent)' }}>
                LTV {(100 - depositPct).toFixed(1)}%
              </div>
            </div>
          </div>
        </Section>

        <Section title="Affordability Check">
          {[
            { label: 'Monthly payment vs income', value: result.monthlyPayment / (totalIncome / 12), threshold: 0.35, format: (v: number) => `${(v * 100).toFixed(0)}% of monthly income` },
            { label: 'Stress test vs income', value: result.stressTestPayment / (totalIncome / 12), threshold: 0.40, format: (v: number) => `${(v * 100).toFixed(0)}% of monthly income` },
            { label: 'Deposit vs purchase price', value: depositPct / 100, threshold: 0.10, invert: true, format: (v: number) => `${(v * 100).toFixed(1)}% deposit` },
          ].map(({ label, value, threshold, invert, format }) => {
            const ok = invert ? value >= threshold : value <= threshold;
            return (
              <div key={label} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', padding: '0.6rem 0', borderBottom: '1px solid var(--border)', alignItems: 'center' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>{label}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: ok ? 'var(--positive)' : 'var(--warning)', textAlign: 'right' }}>
                  {ok ? '✓' : '⚠'} {format(value)}
                </div>
              </div>
            );
          })}
        </Section>
      </div>
    </div>
  );
}
