'use client';

import { useState, useMemo } from 'react';
import { useCurrency } from '@/lib/CurrencyContext';
import { calculateLoan } from '@/lib/calculations';
import { formatCurrency, formatPercent, formatNumber } from '@/lib/formatting';
import { InputField, ResultCard, Section } from '@/components/ui';

export default function LoanCalc() {
  const { currency } = useCurrency();
  const [amount, setAmount] = useState(15000);
  const [rate, setRate] = useState(6.9);
  const [termMonths, setTermMonths] = useState(60);

  const result = useMemo(() => calculateLoan(amount, rate, termMonths), [amount, rate, termMonths]);
  const fmt = (v: number) => formatCurrency(v, currency);

  // Build yearly summary from schedule
  const yearlySummary = useMemo(() => {
    const years: { year: number; interest: number; principal: number; balance: number }[] = [];
    for (let y = 0; y < Math.ceil(termMonths / 12); y++) {
      const slice = result.schedule.slice(y * 12, y * 12 + 12);
      if (!slice.length) break;
      years.push({
        year: y + 1,
        interest: slice.reduce((s, r) => s + r.interest, 0),
        principal: slice.reduce((s, r) => s + r.principal, 0),
        balance: slice[slice.length - 1].balance,
      });
    }
    return years;
  }, [result.schedule, termMonths]);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <Section title="Loan Details">
          <InputField label="Loan Amount" value={amount} onChange={setAmount} min={500} max={500000} step={500} prefix={currency.symbol} />
          <InputField label="Annual Interest Rate" value={rate} onChange={setRate} min={0.1} max={50} step={0.1} suffix="%" hint="APR" />
          <InputField label="Loan Term" value={termMonths} onChange={setTermMonths} min={6} max={120} step={6} suffix="months"
            hint={`${formatNumber(termMonths / 12, 1)} years`} />
        </Section>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Section title="Results">
          <ResultCard label="Monthly Payment" value={fmt(result.monthlyPayment)} size="large" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <ResultCard label="Total Repaid" value={fmt(result.totalPayment)} color="warning" />
            <ResultCard label="Total Interest" value={fmt(result.totalInterest)} color="negative"
              sub={`${formatNumber((result.totalInterest / amount) * 100, 0)}% of loan`} />
          </div>
          <ResultCard label="Effective APR" value={formatPercent(result.apr)} sub="true annual cost including compounding" />
        </Section>

        <Section title="Yearly Breakdown">
          <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '40px 1fr 80px 80px', gap: '0.5rem', padding: '0.6rem 1rem', borderBottom: '1px solid var(--border)' }}>
              {['Yr', 'Interest vs Principal', 'Interest', 'Balance'].map(h => (
                <div key={h} style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</div>
              ))}
            </div>
            <div style={{ padding: '0.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {yearlySummary.map(({ year, interest, principal, balance }) => {
                const total = interest + principal;
                const intPct = (interest / total) * 100;
                return (
                  <div key={year} style={{ display: 'grid', gridTemplateColumns: '40px 1fr 80px 80px', gap: '0.5rem', alignItems: 'center' }}>
                    <div style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>Y{year}</div>
                    <div style={{ height: '10px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden', display: 'flex' }}>
                      <div style={{ width: `${intPct}%`, background: 'var(--negative)', opacity: 0.7 }} />
                      <div style={{ flex: 1, background: 'var(--accent)', opacity: 0.5 }} />
                    </div>
                    <div style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--negative)', textAlign: 'right' }}>{fmt(interest)}</div>
                    <div style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', textAlign: 'right' }}>{fmt(balance)}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
