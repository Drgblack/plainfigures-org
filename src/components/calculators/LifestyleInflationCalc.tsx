'use client';

import { useState, useMemo } from 'react';
import { useCurrency } from '@/lib/CurrencyContext';
import { calculateLifestyleInflation } from '@/lib/lifestyle-calculations';
import { formatCurrency } from '@/lib/formatting';
import { ResultCard, Section } from '@/components/ui';

const DEFAULT_CATEGORIES = [
  { name: 'Housing / Rent', entry: 600, current: 1200 },
  { name: 'Food & Groceries', entry: 200, current: 400 },
  { name: 'Eating Out', entry: 50, current: 300 },
  { name: 'Transport', entry: 80, current: 350 },
  { name: 'Clothing', entry: 50, current: 200 },
  { name: 'Holidays', entry: 100, current: 400 },
  { name: 'Entertainment', entry: 30, current: 150 },
  { name: 'Subscriptions', entry: 15, current: 80 },
  { name: 'Personal care', entry: 30, current: 120 },
  { name: 'Gym / Sport', entry: 0, current: 60 },
];

export default function LifestyleInflationCalc() {
  const { currency } = useCurrency();
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [investReturn, setInvestReturn] = useState(7);

  const result = useMemo(() => calculateLifestyleInflation(categories, investReturn), [categories, investReturn]);
  const fmt = (v: number) => formatCurrency(v, currency);

  const updateCategory = (i: number, field: 'entry' | 'current', value: number) => {
    setCategories(c => c.map((cat, idx) => idx === i ? { ...cat, [field]: value } : cat));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Results at top */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
        <ResultCard label="Entry-Level Monthly" value={fmt(result.entryLevelMonthlySpend)} />
        <ResultCard label="Current Monthly" value={fmt(result.currentMonthlySpend)} color="warning" />
        <ResultCard label="Lifestyle Inflation" value={fmt(result.lifestyleInflation)}
          sub={`${result.lifestyleInflationPct.toFixed(0)}% more than entry-level`} color="negative" />
        <ResultCard label="10-Year Opportunity Cost" value={fmt(result.opportunityCost10Year)}
          sub={`if invested at ${investReturn}%`} color="negative" />
      </div>

      {/* Investment return slider */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '6px' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>Investment return assumption:</span>
        <input type="range" min={2} max={15} step={0.5} value={investReturn} onChange={e => setInvestReturn(parseFloat(e.target.value))} style={{ flex: 1 }} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-primary)', minWidth: '40px' }}>{investReturn}%</span>
      </div>

      {/* Category table */}
      <Section title="Spending by Category — Edit Your Numbers">
        <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px 120px 100px', gap: '0.5rem', padding: '0.6rem 1rem', borderBottom: '1px solid var(--border)' }}>
            {['Category', 'Entry-Level /mo', 'Current /mo', 'Difference'].map(h => (
              <div key={h} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</div>
            ))}
          </div>
          {result.categories.map(({ name, diff }, i) => (
            <div key={name} style={{ display: 'grid', gridTemplateColumns: '1fr 120px 120px 100px', gap: '0.5rem', padding: '0.5rem 1rem', borderBottom: i < result.categories.length - 1 ? '1px solid var(--border)' : 'none', alignItems: 'center' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{name}</div>
              <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '3px', overflow: 'hidden' }}>
                <input type="number" value={categories[i].entry} onChange={e => updateCategory(i, 'entry', parseFloat(e.target.value) || 0)} style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', padding: '0.3rem 0.5rem' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg)', border: `1px solid ${diff > 0 ? 'rgba(224,82,82,0.3)' : 'var(--border)'}`, borderRadius: '3px', overflow: 'hidden' }}>
                <input type="number" value={categories[i].current} onChange={e => updateCategory(i, 'current', parseFloat(e.target.value) || 0)} style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', color: diff > 0 ? 'var(--negative)' : 'var(--positive)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', padding: '0.3rem 0.5rem' }} />
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: diff > 0 ? 'var(--negative)' : diff < 0 ? 'var(--positive)' : 'var(--text-muted)', textAlign: 'right' }}>
                {diff > 0 ? '+' : ''}{fmt(diff)}
              </div>
            </div>
          ))}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px 120px 100px', gap: '0.5rem', padding: '0.75rem 1rem', background: 'var(--bg)', alignItems: 'center' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-primary)', fontWeight: 500 }}>TOTAL</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-primary)' }}>{fmt(result.entryLevelMonthlySpend)}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--negative)' }}>{fmt(result.currentMonthlySpend)}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--negative)', textAlign: 'right', fontWeight: 500 }}>+{fmt(result.lifestyleInflation)}</div>
          </div>
        </div>
      </Section>
    </div>
  );
}
