'use client';

import { useState, useMemo } from 'react';
import { useCurrency } from '@/lib/CurrencyContext';
import { calculateHLV } from '@/lib/insurance-calculations';
import { formatCurrency, formatNumber } from '@/lib/formatting';
import { InputField, ResultCard, Section } from '@/components/ui';

export default function HLVCalc() {
  const { currency } = useCurrency();
  const [currentAge, setCurrentAge] = useState(38);
  const [retirementAge, setRetirementAge] = useState(67);
  const [annualIncome, setAnnualIncome] = useState(65000);
  const [incomeReplacement, setIncomeReplacement] = useState(75);
  const [inflation, setInflation] = useState(2.5);
  const [mortgage, setMortgage] = useState(220000);
  const [otherDebts, setOtherDebts] = useState(15000);
  const [futureFunding, setFutureFunding] = useState(50000);
  const [existingCoverage, setExistingCoverage] = useState(100000);
  const [discountRate, setDiscountRate] = useState(4.0);

  const result = useMemo(
    () => calculateHLV(currentAge, retirementAge, annualIncome, incomeReplacement, inflation, mortgage, otherDebts, futureFunding, existingCoverage, discountRate),
    [currentAge, retirementAge, annualIncome, incomeReplacement, inflation, mortgage, otherDebts, futureFunding, existingCoverage, discountRate]
  );

  const fmt = (v: number) => formatCurrency(v, currency);
  const underinsured = result.coverageGap > 0;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
      <div className="sticky-inputs" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <Section title="Personal Details">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <InputField label="Current Age" value={currentAge} onChange={setCurrentAge} min={18} max={70} step={1} suffix="yrs" />
            <InputField label="Retirement Age" value={retirementAge} onChange={v => setRetirementAge(Math.max(currentAge + 1, v))} min={50} max={80} step={1} suffix="yrs" />
          </div>
          <InputField label="Annual Income (gross)" value={annualIncome} onChange={setAnnualIncome} min={10000} max={1000000} step={1000} prefix={currency.symbol} />
          <InputField label="Income to Replace" value={incomeReplacement} onChange={setIncomeReplacement} min={50} max={100} step={5} suffix="%"
            hint={`${fmt(annualIncome * incomeReplacement / 100)} p.a.`} />
        </Section>
        <Section title="Debts & Obligations">
          <InputField label="Outstanding Mortgage" value={mortgage} onChange={setMortgage} min={0} max={2000000} step={5000} prefix={currency.symbol} />
          <InputField label="Other Debts" value={otherDebts} onChange={setOtherDebts} min={0} max={500000} step={1000} prefix={currency.symbol} />
          <InputField label="Future Funding Needs" value={futureFunding} onChange={setFutureFunding} min={0} max={1000000} step={5000} prefix={currency.symbol}
            hint="Education, care costs, etc." />
        </Section>
        <Section title="Existing Cover & Assumptions">
          <InputField label="Existing Life Cover" value={existingCoverage} onChange={setExistingCoverage} min={0} max={5000000} step={10000} prefix={currency.symbol} />
          <InputField label="Discount Rate" value={discountRate} onChange={setDiscountRate} min={0.5} max={10} step={0.5} suffix="%" hint="Risk-free rate" />
          <InputField label="Annual Inflation" value={inflation} onChange={setInflation} min={0} max={10} step={0.5} suffix="%" />
        </Section>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Section title={`Human Life Value — ${result.yearsToRetirement} working years remaining`}>
          <ResultCard label="Total Human Life Value" value={fmt(result.humanLifeValue)} size="large" color="warning" />
          <ResultCard
            label={underinsured ? 'Coverage Gap — Additional Cover Needed' : 'Coverage Surplus'}
            value={fmt(result.coverageGap)}
            size="large"
            color={underinsured ? 'negative' : 'positive'}
            sub={underinsured ? 'you are currently underinsured by this amount' : 'existing cover exceeds calculated need'}
          />
        </Section>

        <Section title="Breakdown">
          <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden' }}>
            {result.breakdown.map(({ label, value, description }, i) => (
              <div key={label} style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: '1rem',
                padding: '0.9rem 1.1rem',
                borderBottom: i < result.breakdown.length - 1 ? '1px solid var(--border)' : 'none',
                alignItems: 'center',
              }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>{label}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)' }}>{description}</div>
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9rem',
                  color: value < 0 ? 'var(--positive)' : '#d4a843',
                  fontWeight: 500,
                  textAlign: 'right',
                }}>
                  {value < 0 ? `(${fmt(Math.abs(value))})` : fmt(value)}
                </div>
              </div>
            ))}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', padding: '0.9rem 1.1rem', background: 'var(--bg)', alignItems: 'center' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: underinsured ? 'var(--negative)' : 'var(--positive)', letterSpacing: '0.04em' }}>
                {underinsured ? 'COVERAGE SHORTFALL' : 'COVERAGE SURPLUS'}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', color: underinsured ? 'var(--negative)' : 'var(--positive)', fontWeight: 500 }}>
                {fmt(result.coverageGap)}
              </div>
            </div>
          </div>
        </Section>

        <div style={{
          padding: '0.9rem 1.1rem',
          background: 'rgba(212,168,67,0.08)',
          border: '1px solid rgba(212,168,67,0.25)',
          borderRadius: '6px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.68rem',
          color: 'var(--text-muted)',
          lineHeight: 1.6,
        }}>
          HLV is a planning benchmark, not a binding recommendation. Actual needs depend on individual circumstances, tax position, and existing benefits. Consult a qualified protection adviser.
        </div>
      </div>
    </div>
  );
}
