'use client';

import SaveCalcButton from '@/components/ui/SaveCalcButton';
import ToolPreview from '@/components/ui/ToolPreview';

import { useState, useMemo } from 'react';
import { useCurrency } from '@/lib/CurrencyContext';
import { calculateSaveGoal } from '@/lib/calculations';
import { formatCurrency, formatNumber } from '@/lib/formatting';
import { InputField, ResultCard, Section } from '@/components/ui';

export default function SaveGoalCalc() {
  const { currency } = useCurrency();
  const [target, setTarget] = useState(50000);
  const [currentSavings, setCurrentSavings] = useState(5000);
  const [monthly, setMonthly] = useState(500);
  const [rate, setRate] = useState(4.0);
  const [targetMonths, setTargetMonths] = useState(60);

  const result = useMemo(
    () => calculateSaveGoal(target, currentSavings, monthly, rate, targetMonths),
    [target, currentSavings, monthly, rate, targetMonths]
  );

  const fmt = (v: number) => formatCurrency(v, currency);
  const naturalYears = Math.floor(result.yearsNeeded);
  const naturalMonths = Math.round((result.yearsNeeded - naturalYears) * 12);
  const onTrack = result.projectedBalance >= target;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
      <ToolPreview id="savings" />
      <div className="sticky-inputs" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <Section title="Your Goal">
          <InputField label="Target Amount" value={target} onChange={setTarget} min={1000} max={5000000} step={1000} prefix={currency.symbol} />
          <InputField label="Current Savings" value={currentSavings} onChange={setCurrentSavings} min={0} max={target} step={500} prefix={currency.symbol} />
          <InputField label="Monthly Contribution" value={monthly} onChange={setMonthly} min={0} max={10000} step={50} prefix={currency.symbol} />
          <InputField label="Annual Interest Rate" value={rate} onChange={setRate} min={0} max={20} step={0.1} suffix="%" />
        </Section>
        <Section title="Target Deadline (optional)">
          <InputField label="Reach goal within" value={targetMonths} onChange={setTargetMonths} min={1} max={600} step={1} suffix="months"
            hint={`${formatNumber(targetMonths / 12, 1)} years`} />
        </Section>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Section title="Results">
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.75rem' }}>
        <SaveCalcButton
          toolHref="/save-goal"
          toolTitle="Save for a Goal"
          summary={`Savings goal calculation`}
          keyResults={[
              { label: 'Monthly Required', value: fmt(result.requiredMonthly) },
              { label: 'Time to Goal', value: `${result.monthsNeeded} months` },
          ]}
        />

          </div>

          <ResultCard
            label="Time to Reach Goal (at current rate)"
            value={result.monthsNeeded >= 1200 ? 'Over 100 years' : `${naturalYears > 0 ? `${naturalYears}y ` : ''}${naturalMonths > 0 ? `${naturalMonths}m` : ''}`}
            size="large"
            color={result.monthsNeeded >= 1200 ? 'negative' : 'positive'}
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <ResultCard
              label={`Projected in ${formatNumber(targetMonths / 12, 1)} years`}
              value={fmt(result.projectedBalance)}
              color={onTrack ? 'positive' : 'warning'}
            />
            <ResultCard
              label={onTrack ? 'Surplus' : 'Shortfall'}
              value={fmt(Math.abs(result.shortfall || (result.projectedBalance - target)))}
              color={onTrack ? 'positive' : 'negative'}
            />
          </div>

          <ResultCard
            label={`Monthly needed to hit ${fmt(target)} in ${formatNumber(targetMonths / 12, 1)} years`}
            value={fmt(result.requiredMonthly)}
            sub={result.requiredMonthly > monthly
              ? `${fmt(result.requiredMonthly - monthly)} more than current`
              : `${fmt(monthly - result.requiredMonthly)} less than current`}
            color={result.requiredMonthly <= monthly ? 'positive' : 'warning'}
          />
        </Section>

        {/* Visual progress toward goal */}
        <Section title="Progress Snapshot">
          <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '6px', padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>TODAY</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>GOAL: {fmt(target)}</span>
            </div>
            <div style={{ height: '8px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden', marginBottom: '0.5rem' }}>
              <div style={{
                height: '100%',
                width: `${Math.min(100, (currentSavings / target) * 100)}%`,
                background: 'var(--accent)',
                borderRadius: '4px',
              }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent)' }}>{fmt(currentSavings)} saved</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>{formatNumber((currentSavings / target) * 100, 0)}%</span>
            </div>
            <div style={{ height: '8px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden', marginTop: '1rem', marginBottom: '0.5rem' }}>
              <div style={{
                height: '100%',
                width: `${Math.min(100, (result.projectedBalance / target) * 100)}%`,
                background: onTrack ? 'var(--positive)' : 'var(--warning)',
                borderRadius: '4px',
              }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: onTrack ? 'var(--positive)' : 'var(--warning)' }}>
                {fmt(result.projectedBalance)} projected
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                {formatNumber(Math.min(100, (result.projectedBalance / target) * 100), 0)}%
              </span>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
