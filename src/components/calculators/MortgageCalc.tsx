'use client';

import { useState, useMemo } from 'react';
import { useCurrency } from '@/lib/CurrencyContext';
import { calculateMortgage } from '@/lib/calculations';
import { formatCurrency, formatPercent } from '@/lib/formatting';
import { InputField, ResultCard, Section } from '@/components/ui';
import SaveCalcButton from '@/components/ui/SaveCalcButton';

export default function MortgageCalc() {
  const { currency } = useCurrency();
  const [principal, setPrincipal] = useState(300000);
  const [rate, setRate] = useState(4.5);
  const [term, setTerm] = useState(25);

  const result = useMemo(
    () => calculateMortgage(principal, rate, term),
    [principal, rate, term]
  );

  const fmt = (v: number) => formatCurrency(v, currency);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
      {/* Inputs */}
      <div className="sticky-inputs" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <Section title="Loan Details">
          <InputField
            label="Property Value / Loan Amount"
            value={principal}
            onChange={setPrincipal}
            min={10000}
            max={2000000}
            step={1000}
            prefix={currency.symbol}
            hint={fmt(principal)}
          />
          <InputField
            label="Annual Interest Rate"
            value={rate}
            onChange={setRate}
            min={0.1}
            max={15}
            step={0.05}
            suffix="%"
            hint={formatPercent(rate)}
          />
          <InputField
            label="Mortgage Term"
            value={term}
            onChange={setTerm}
            min={5}
            max={35}
            step={1}
            suffix="years"
            hint={`${term * 12} months`}
          />
        </Section>
      </div>

      {/* Results */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <a
            href={`mailto:?subject=Mortgage calculation — Plain Figures&body=Mortgage Repayment%0A%0APrincipal: ${fmt(principal)}%0ARate: ${rate}%%0ATerm: ${term} years%0A%0AMonthly payment: ${fmt(result.monthlyPayment)}%0ATotal interest: ${fmt(result.totalInterest)}%0ATotal cost: ${fmt(result.totalPayment)}%0A%0ACalculated at plainfigures.org/mortgage`}
            style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.3rem 0.65rem', background: 'none', border: '1px solid var(--border)', borderRadius: '4px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', textDecoration: 'none', transition: 'all 0.15s ease' }}
          >
            ✉ Email
          </a>
          <SaveCalcButton
            toolHref="/mortgage"
            toolTitle="Mortgage Repayment"
            summary={`${fmt(principal)} at ${rate}% over ${term} years`}
            keyResults={[
              { label: 'Monthly', value: fmt(result.monthlyPayment) },
              { label: 'Total Interest', value: fmt(result.totalInterest) },
              { label: 'Total Cost', value: fmt(result.totalPayment) },
            ]}
          />
        </div>
        <Section title="Results">
          <ResultCard
            label="Monthly Payment"
            value={fmt(result.monthlyPayment)}
            size="large"
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <ResultCard
              label="Total Repaid"
              value={fmt(result.totalPayment)}
              color="warning"
            />
            <ResultCard
              label="Total Interest"
              value={fmt(result.totalInterest)}
              color="negative"
              sub={`${((result.totalInterest / principal) * 100).toFixed(0)}% of loan`}
            />
          </div>
          <ResultCard
            label="Loan Amount"
            value={fmt(principal)}
            sub={`at ${formatPercent(rate)} over ${term} years`}
          />
        </Section>

        {/* Quick breakdown */}
        <Section title="Payment Breakdown">
          <div style={{
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            overflow: 'hidden',
          }}>
            {/* Progress bar */}
            <div style={{ height: '6px', background: 'var(--border)', position: 'relative' }}>
              <div style={{
                position: 'absolute',
                left: 0,
                top: 0,
                height: '100%',
                width: `${(principal / result.totalPayment) * 100}%`,
                background: 'var(--accent)',
              }} />
            </div>
            <div style={{ padding: '0.9rem 1.1rem', display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Principal</div>
                <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
                  {((principal / result.totalPayment) * 100).toFixed(0)}%
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Interest</div>
                <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--negative)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
                  {((result.totalInterest / result.totalPayment) * 100).toFixed(0)}%
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
