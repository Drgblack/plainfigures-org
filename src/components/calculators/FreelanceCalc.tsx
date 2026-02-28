'use client';

import SaveCalcButton from '@/components/ui/SaveCalcButton';
import ToolPreview from '@/components/ui/ToolPreview';

import { useState, useMemo } from 'react';
import { useCurrency } from '@/lib/CurrencyContext';
import { calculateFreelanceRate } from '@/lib/lifestyle-calculations';
import { formatCurrency, formatNumber } from '@/lib/formatting';
import { InputField, ResultCard, Section } from '@/components/ui';

export default function FreelanceCalc() {
  const { currency } = useCurrency();
  const [desiredSalary, setDesiredSalary] = useState(60000);
  const [expenses, setExpenses] = useState(5000);
  const [taxRate, setTaxRate] = useState(30);
  const [billableWeeks, setBillableWeeks] = useState(44);
  const [hoursPerWeek, setHoursPerWeek] = useState(6);
  const [unpaidHours, setUnpaidHours] = useState(2);

  const result = useMemo(
    () => calculateFreelanceRate(desiredSalary, expenses, taxRate, billableWeeks, hoursPerWeek, unpaidHours),
    [desiredSalary, expenses, taxRate, billableWeeks, hoursPerWeek, unpaidHours]
  );

  const fmt = (v: number) => formatCurrency(v, currency);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
      <ToolPreview id="loan" />
      <div className="sticky-inputs" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <Section title="What You Need to Earn">
          <InputField label="Desired Annual Take-Home" value={desiredSalary} onChange={setDesiredSalary} min={10000} max={500000} step={1000} prefix={currency.symbol} />
          <InputField label="Annual Business Expenses" value={expenses} onChange={setExpenses} min={0} max={100000} step={500} prefix={currency.symbol}
            hint="Software, equipment, insurance, etc." />
          <InputField label="Tax Rate (estimated)" value={taxRate} onChange={setTaxRate} min={15} max={60} step={1} suffix="%"
            hint="Income tax + national insurance/self-employment tax" />
        </Section>
        <Section title="How You Work">
          <InputField label="Billable Weeks per Year" value={billableWeeks} onChange={setBillableWeeks} min={20} max={52} step={1} suffix="weeks"
            hint={`${52 - billableWeeks} weeks off/sick/admin`} />
          <InputField label="Billable Hours per Day" value={hoursPerWeek} onChange={setHoursPerWeek} min={1} max={12} step={0.5} suffix="hrs/day"
            hint="Hours you actually charge clients" />
          <InputField label="Unpaid Hours per Day" value={unpaidHours} onChange={setUnpaidHours} min={0} max={8} step={0.5} suffix="hrs/day"
            hint="Admin, sales, networking, etc." />
        </Section>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Section title="Your Required Rate">
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.75rem' }}>
        <SaveCalcButton
          toolHref="/freelance"
          toolTitle="Freelance Rate"
          summary={`Freelance rate calculation`}
          keyResults={[
              { label: 'Day Rate', value: fmt(result.dayRate) },
              { label: 'Hourly Rate', value: fmt(result.hourlyRate) },
          ]}
        />

          </div>

          <ResultCard label="Minimum Hourly Rate" value={fmt(result.hourlyRate)} size="large" color="warning"
            sub="to hit your take-home target" />
          <ResultCard label="Minimum Day Rate" value={fmt(result.dayRate)} color="warning"
            sub={`based on ${hoursPerWeek <= 8 ? hoursPerWeek : 8} billable hours/day`} />
          <ResultCard label="Monthly Gross Required" value={fmt(result.monthlyRequired)} />
        </Section>

        <Section title="The Maths">
          <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden' }}>
            {result.breakdownItems.map(({ label, amount }, i) => {
              const isTotal = label.includes('Total');
              return (
                <div key={label} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', padding: '0.75rem 1rem', borderBottom: i < result.breakdownItems.length - 1 ? '1px solid var(--border)' : 'none', background: isTotal ? 'var(--bg)' : 'transparent', alignItems: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: isTotal ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{label}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: isTotal ? '0.9rem' : '0.8rem', color: isTotal ? '#d4a843' : 'var(--text-primary)', fontWeight: isTotal ? 500 : 400 }}>{fmt(amount)}</div>
                </div>
              );
            })}
          </div>
        </Section>

        <Section title="Reality Check">
          <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '6px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {[
              { label: 'Effective hourly (all hours incl. unpaid)', value: fmt(result.effectiveDailyAfterTax / 8) },
              { label: 'Billable hours per year', value: `${formatNumber(billableWeeks * hoursPerWeek * 5, 0)} hrs` },
              { label: 'Total hours worked per year (est.)', value: `${formatNumber(billableWeeks * (hoursPerWeek + unpaidHours) * 5, 0)} hrs` },
              { label: 'Weeks holiday / non-billable', value: `${52 - billableWeeks} weeks` },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', alignItems: 'center' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>{label}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-primary)' }}>{value}</div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}
