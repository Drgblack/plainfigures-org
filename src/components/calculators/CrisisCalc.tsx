'use client';

import SaveCalcButton from '@/components/ui/SaveCalcButton';
import ToolPreview from '@/components/ui/ToolPreview';

import { useState, useMemo } from 'react';
import { useCurrency } from '@/lib/CurrencyContext';
import { calculateCrisisSurvival } from '@/lib/lifestyle-calculations';
import { formatCurrency } from '@/lib/formatting';
import { InputField, ResultCard, Section } from '@/components/ui';

const VERDICT_CONFIG = {
  comfortable: { label: 'You\'re in good shape', color: 'var(--positive)', bg: 'rgba(46,204,138,0.08)', border: 'rgba(46,204,138,0.25)' },
  manageable: { label: 'Manageable but exposed', color: 'var(--warning)', bg: 'rgba(212,168,67,0.08)', border: 'rgba(212,168,67,0.25)' },
  tight: { label: 'Tight — act fast', color: '#e07a2e', bg: 'rgba(224,122,46,0.08)', border: 'rgba(224,122,46,0.25)' },
  critical: { label: 'Critical — immediate action needed', color: 'var(--negative)', bg: 'rgba(224,82,82,0.08)', border: 'rgba(224,82,82,0.25)' },
};

export default function CrisisCalc() {
  const { currency } = useCurrency();
  const [savings, setSavings] = useState(15000);
  const [expenses, setExpenses] = useState(2500);
  const [income, setIncome] = useState(3500);
  const [emergencyIncomePct, setEmergencyIncomePct] = useState(0);
  const [inflationMultiplier, setInflationMultiplier] = useState(1.5);
  const [cutExpensesPct, setCutExpensesPct] = useState(30);

  const result = useMemo(
    () => calculateCrisisSurvival(savings, expenses, income, emergencyIncomePct, inflationMultiplier, cutExpensesPct),
    [savings, expenses, income, emergencyIncomePct, inflationMultiplier, cutExpensesPct]
  );

  const fmt = (v: number) => formatCurrency(v, currency);
  const vc = VERDICT_CONFIG[result.verdict];
  const survive = result.monthsSurvive >= 999 ? '∞' : `${result.monthsSurvive} months`;
  const surviveWithCuts = result.monthsSurviveWithCuts >= 999 ? '∞' : `${result.monthsSurviveWithCuts} months`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <ToolPreview id="crisis" />
      {/* Verdict banner */}
      <div style={{ padding: '1.25rem 1.5rem', background: vc.bg, border: `1px solid ${vc.border}`, borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', color: vc.color, letterSpacing: '0.04em' }}>{vc.label}</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: vc.color, opacity: 0.8 }}>
          {result.monthsSurvive < 999 ? `Runway: ${result.monthsSurvive} months without cuts` : 'Sustainable — expenses covered by income'}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
        {/* Inputs */}
        <div className="sticky-inputs" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <Section title="Your Current Situation">
            <InputField label="Liquid Savings (accessible)" value={savings} onChange={setSavings} min={0} max={500000} step={500} prefix={currency.symbol}
              hint="Cash, easy-access accounts only" />
            <InputField label="Monthly Expenses" value={expenses} onChange={setExpenses} min={500} max={20000} step={100} prefix={currency.symbol} />
            <InputField label="Monthly Income (current)" value={income} onChange={setIncome} min={0} max={30000} step={100} prefix={currency.symbol} />
          </Section>

          <Section title="The Crisis Scenario">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-secondary)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                  Emergency Income Replacement
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <input type="range" min={0} max={100} step={5} value={emergencyIncomePct} onChange={e => setEmergencyIncomePct(parseFloat(e.target.value))} style={{ flex: 1 }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-primary)', minWidth: '50px' }}>{emergencyIncomePct}%</span>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  {emergencyIncomePct === 0 ? 'Total job loss' : `${emergencyIncomePct}% of income remains (benefits, part-time, etc.)`}
                </div>
              </div>

              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-secondary)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                  Cost of Living Shock
                </div>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {[1.0, 1.2, 1.5, 2.0].map(v => (
                    <button key={v} onClick={() => setInflationMultiplier(v)} style={{ padding: '0.4rem 0.75rem', background: inflationMultiplier === v ? 'rgba(224,82,82,0.15)' : 'var(--bg)', border: `1px solid ${inflationMultiplier === v ? 'rgba(224,82,82,0.4)' : 'var(--border)'}`, borderRadius: '4px', color: inflationMultiplier === v ? 'var(--negative)' : 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', cursor: 'pointer', transition: 'all 0.15s ease' }}>
                      {v === 1 ? 'Normal' : `×${v} costs`}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-secondary)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                  Emergency Expense Cuts
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <input type="range" min={0} max={60} step={5} value={cutExpensesPct} onChange={e => setCutExpensesPct(parseFloat(e.target.value))} style={{ flex: 1 }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--positive)', minWidth: '40px' }}>{cutExpensesPct}%</span>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Cancel subscriptions, reduce dining, etc.</div>
              </div>
            </div>
          </Section>
        </div>

        {/* Results */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Section title="Survival Runway">
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.75rem' }}>
        <SaveCalcButton
          toolHref="/crisis"
          toolTitle="Financial Crisis Simulator"
          summary={`${fmt(savings)} savings, ${fmt(expenses)}/mo expenses`}
          keyResults={[
              { label: 'Runway', value: `${result.runwayMonths?.toFixed(1) ?? '?'} months` },
              { label: 'Monthly Burn', value: fmt(result.monthlyBurn ?? result.netExpenses) },
          ]}
        />

            </div>

            <ResultCard label="Without Expense Cuts" value={survive}
              color={result.monthsSurvive >= 999 ? 'positive' : result.monthsSurvive >= 12 ? 'warning' : 'negative'}
              sub={result.monthsSurvive < 999 ? `Monthly burn: ${fmt(result.monthlyBurn)}` : 'Income covers expenses'} size="large" />
            <ResultCard label={`With ${cutExpensesPct}% Expense Cuts`} value={surviveWithCuts}
              color={result.monthsSurviveWithCuts >= 999 ? 'positive' : result.monthsSurviveWithCuts >= 12 ? 'warning' : 'negative'}
              sub={result.monthsSurviveWithCuts < 999 ? `Monthly burn: ${fmt(result.monthlyBurnCrisis)}` : 'Sustainable with cuts'} />
            {result.monthsSurvive < 999 && (
              <ResultCard label="Savings Run Out Around"
                value={result.criticalDate.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
                color="negative" sub="without cuts or income" />
            )}
          </Section>

          <Section title="Burndown Projection">
            <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '6px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {result.yearlyBurndown.slice(0, 12).map(({ month, balance, balanceCrisis }) => {
                const pct = (balance / savings) * 100;
                const pctCrisis = (balanceCrisis / savings) * 100;
                return (
                  <div key={month} style={{ display: 'grid', gridTemplateColumns: '36px 1fr 1fr 72px', gap: '0.5rem', alignItems: 'center' }}>
                    <div style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>M{month}</div>
                    <div style={{ height: '8px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${Math.max(0, pct)}%`, background: pct > 50 ? 'var(--warning)' : 'var(--negative)', opacity: 0.7, transition: 'width 0.3s' }} />
                    </div>
                    <div style={{ height: '8px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${Math.max(0, pctCrisis)}%`, background: 'var(--positive)', opacity: 0.6, transition: 'width 0.3s' }} />
                    </div>
                    <div style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', color: balance <= 0 ? 'var(--negative)' : 'var(--text-muted)', textAlign: 'right' }}>
                      {balance <= 0 ? 'ZERO' : fmt(balance)}
                    </div>
                  </div>
                );
              })}
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.4rem', paddingTop: '0.4rem', borderTop: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.62rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  <div style={{ width: '8px', height: '8px', background: 'var(--negative)', opacity: 0.7, borderRadius: '1px' }} /> No cuts
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.62rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  <div style={{ width: '8px', height: '8px', background: 'var(--positive)', opacity: 0.6, borderRadius: '1px' }} /> With {cutExpensesPct}% cuts
                </div>
              </div>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
