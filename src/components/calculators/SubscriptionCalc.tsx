'use client';

import SaveCalcButton from '@/components/ui/SaveCalcButton';
import ToolPreview from '@/components/ui/ToolPreview';

import { useState, useMemo } from 'react';
import { useCurrency } from '@/lib/CurrencyContext';
import { calculateSubscriptionDrain, Subscription } from '@/lib/lifestyle-calculations';
import { formatCurrency } from '@/lib/formatting';
import { ResultCard, Section } from '@/components/ui';

const DEFAULT_SUBS: Subscription[] = [
  { name: 'Netflix', monthly: 17.99, enabled: true },
  { name: 'Spotify', monthly: 11.99, enabled: true },
  { name: 'Gym', monthly: 40, enabled: true },
  { name: 'Amazon Prime', monthly: 8.99, enabled: true },
  { name: 'Disney+', monthly: 4.99, enabled: false },
  { name: 'YouTube Premium', monthly: 11.99, enabled: false },
  { name: 'Apple iCloud', monthly: 2.99, enabled: true },
  { name: 'Microsoft 365', monthly: 7.99, enabled: false },
  { name: 'LinkedIn Premium', monthly: 39.99, enabled: false },
  { name: 'News subscription', monthly: 12, enabled: false },
  { name: 'Meal kit service', monthly: 60, enabled: false },
  { name: 'Dating app', monthly: 24.99, enabled: false },
];

export default function SubscriptionCalc() {
  const { currency } = useCurrency();
  const [subs, setSubs] = useState<Subscription[]>(DEFAULT_SUBS);
  const [newName, setNewName] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [hourlyWage, setHourlyWage] = useState(20);
  const [investReturn, setInvestReturn] = useState(7);

  const result = useMemo(() => calculateSubscriptionDrain(subs, hourlyWage, investReturn), [subs, hourlyWage, investReturn]);
  const fmt = (v: number) => formatCurrency(v, currency);

  const toggle = (i: number) => setSubs(s => s.map((sub, idx) => idx === i ? { ...sub, enabled: !sub.enabled } : sub));
  const addSub = () => {
    if (newName && parseFloat(newAmount) > 0) {
      setSubs(s => [...s, { name: newName, monthly: parseFloat(newAmount), enabled: true }]);
      setNewName(''); setNewAmount('');
    }
  };
  const removeSub = (i: number) => setSubs(s => s.filter((_, idx) => idx !== i));

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
      <ToolPreview id="loan" />
      <div className="sticky-inputs" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <Section title="Your Subscriptions — Toggle Active">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', maxHeight: '400px', overflowY: 'auto' }}>
            {subs.map((sub, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '0.5rem', alignItems: 'center', padding: '0.5rem 0.75rem', background: sub.enabled ? 'var(--bg-elevated)' : 'var(--bg)', border: `1px solid ${sub.enabled ? 'var(--border-light)' : 'var(--border)'}`, borderRadius: '4px' }}>
                <button onClick={() => toggle(i)} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '2px', background: sub.enabled ? 'var(--accent)' : 'transparent', border: `1px solid ${sub.enabled ? 'var(--accent)' : 'var(--border)'}`, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {sub.enabled && <span style={{ color: 'white', fontSize: '0.55rem', fontWeight: 700 }}>✓</span>}
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: sub.enabled ? 'var(--text-primary)' : 'var(--text-muted)' }}>{sub.name}</span>
                </button>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: sub.enabled ? 'var(--negative)' : 'var(--text-muted)' }}>{fmt(sub.monthly)}</span>
                <button onClick={() => removeSub(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '0.7rem', padding: '0 0.2rem' }}>✕</button>
              </div>
            ))}
          </div>

          {/* Add new */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px auto', gap: '0.5rem', marginTop: '0.5rem' }}>
            <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Add subscription..." style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '4px', padding: '0.4rem 0.6rem', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', outline: 'none' }} />
            <input type="number" value={newAmount} onChange={e => setNewAmount(e.target.value)} placeholder="£/mo" style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '4px', padding: '0.4rem 0.6rem', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', outline: 'none' }} />
            <button onClick={addSub} style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent)', borderRadius: '4px', color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', cursor: 'pointer', padding: '0.4rem 0.6rem' }}>Add</button>
          </div>
        </Section>

        <Section title="Context">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-secondary)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Your Hourly Wage</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="range" min={5} max={150} step={1} value={hourlyWage} onChange={e => setHourlyWage(parseFloat(e.target.value))} style={{ flex: 1 }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-primary)', minWidth: '60px', textAlign: 'right' }}>{fmt(hourlyWage)}/hr</span>
              </div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-secondary)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Investment Return (if saved instead)</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="range" min={1} max={15} step={0.5} value={investReturn} onChange={e => setInvestReturn(parseFloat(e.target.value))} style={{ flex: 1 }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-primary)', minWidth: '40px', textAlign: 'right' }}>{investReturn}%</span>
              </div>
            </div>
          </div>
        </Section>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Section title="The Real Cost">
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.75rem' }}>
        <SaveCalcButton
          toolHref="/subscriptions"
          toolTitle="Subscription Drain"
          summary={`Subscription cost analysis`}
          keyResults={[
              { label: 'Annual Cost', value: fmt(result.annualCost ?? result.totalAnnual ?? 0) },
              { label: '10-Year Cost', value: fmt(result.tenYearCost ?? 0) },
          ]}
        />

          </div>

          <ResultCard label="Monthly Subscription Spend" value={fmt(result.totalMonthly)} size="large" color="negative" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <ResultCard label="Annual Cost" value={fmt(result.totalAnnual)} color="negative" />
            <ResultCard label="10-Year Cost" value={fmt(result.total10Year)} color="negative" />
          </div>
          <ResultCard label="If Invested Instead (10yr at {investReturn}%)" value={fmt(result.withInvestment10Year)} color="warning"
            sub={`${fmt(result.withInvestment10Year - result.total10Year)} opportunity cost`} />
          {hourlyWage > 0 && (
            <ResultCard label="Hours of Work per Month" value={`${result.hourlyEquivalent.toFixed(1)} hrs`}
              sub={`to pay for all active subscriptions`} />
          )}
        </Section>

        <Section title="Per Subscription Impact">
          <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden' }}>
            {subs.filter(s => s.enabled).sort((a, b) => b.monthly - a.monthly).map((sub, i, arr) => {
              const tenYearCost = sub.monthly * 12 * 10;
              return (
                <div key={sub.name} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '1rem', padding: '0.7rem 1rem', borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none', alignItems: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{sub.name}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', textAlign: 'right' }}>{fmt(sub.monthly)}/mo</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--negative)', textAlign: 'right', minWidth: '70px' }}>{fmt(tenYearCost)} /10yr</div>
                </div>
              );
            })}
          </div>
        </Section>
      </div>
    </div>
  );
}
