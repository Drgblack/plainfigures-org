'use client';

import { useState, useMemo } from 'react';
import { useCurrency } from '@/lib/CurrencyContext';
import { calculateBI } from '@/lib/insurance-calculations';
import { formatCurrency, formatNumber } from '@/lib/formatting';
import { InputField, ResultCard, Section } from '@/components/ui';

const INDEMNITY_OPTIONS = [12, 18, 24, 36];

export default function BICalc() {
  const { currency } = useCurrency();
  const [revenue, setRevenue] = useState(2000000);
  const [variableCosts, setVariableCosts] = useState(40);
  const [indemnityMonths, setIndemnityMonths] = useState(24);
  const [payroll, setPayroll] = useState(400000);
  const [trendRate, setTrendRate] = useState(5);
  const [icowRate, setIcowRate] = useState(15);

  const result = useMemo(
    () => calculateBI(revenue, variableCosts, indemnityMonths, payroll, trendRate, icowRate),
    [revenue, variableCosts, indemnityMonths, payroll, trendRate, icowRate]
  );

  const fmt = (v: number) => formatCurrency(v, currency);
  const grossProfitRate = ((result.grossProfit / revenue) * 100).toFixed(1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Inputs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <Section title="Business Financials">
            <InputField label="Annual Revenue / Turnover" value={revenue} onChange={setRevenue} min={10000} max={100000000} step={10000} prefix={currency.symbol} />
            <InputField label="Variable Costs" value={variableCosts} onChange={setVariableCosts} min={0} max={95} step={1} suffix="%"
              hint={`Fixed costs: ${100 - variableCosts}%`} />
            <InputField label="Annual Payroll" value={payroll} onChange={setPayroll} min={0} max={50000000} step={10000} prefix={currency.symbol} />
          </Section>
          <Section title="Policy Parameters">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Indemnity Period
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                {INDEMNITY_OPTIONS.map(m => (
                  <button key={m} onClick={() => setIndemnityMonths(m)} style={{
                    padding: '0.5rem',
                    background: indemnityMonths === m ? 'rgba(212, 168, 67, 0.15)' : 'var(--bg)',
                    border: `1px solid ${indemnityMonths === m ? '#d4a843' : 'var(--border)'}`,
                    borderRadius: '4px',
                    color: indemnityMonths === m ? '#d4a843' : 'var(--text-muted)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}>
                    {m}mo
                  </button>
                ))}
              </div>
            </div>
            <InputField label="Business Trend Rate" value={trendRate} onChange={setTrendRate} min={0} max={30} step={0.5} suffix="%"
              hint="Expected annual growth" />
            <InputField label="ICOW Allowance" value={icowRate} onChange={setIcowRate} min={0} max={50} step={1} suffix="%"
              hint="% of BI sum for increased working costs" />
          </Section>
        </div>

        {/* Results */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Section title="Recommended Sum Insured">
            <ResultCard
              label="Total Recommended BI Sum Insured"
              value={fmt(result.recommendedSumInsured)}
              size="large"
              color="warning"
            />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <ResultCard label="Gross Profit" value={fmt(result.grossProfit)}
                sub={`GP Rate: ${grossProfitRate}%`} />
              <ResultCard label="Trend-Adjusted GP" value={fmt(result.adjustedForTrend)}
                sub={`+${trendRate}% uplift applied`} color="warning" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <ResultCard label="BI Sum Insured (base)" value={fmt(result.recommendedSumInsured - result.icow)} />
              <ResultCard label="ICOW Allowance" value={fmt(result.icow)}
                sub="Increased Cost of Working" />
            </div>
          </Section>

          {/* Indemnity period breakdown */}
          <Section title={`Cumulative Loss — ${indemnityMonths}-Month Indemnity Period`}>
            <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '6px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {result.yearlyBreakdown.filter((_, i) => {
                const step = Math.max(1, Math.floor(indemnityMonths / 8));
                return i % step === 0 || i === result.yearlyBreakdown.length - 1;
              }).map(({ month, cumulativeLoss, icow }) => (
                <div key={month} style={{ display: 'grid', gridTemplateColumns: '40px 1fr 90px 80px', gap: '0.5rem', alignItems: 'center' }}>
                  <div style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>M{month}</div>
                  <div style={{ height: '10px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${(cumulativeLoss / result.recommendedSumInsured) * 100}%`, background: '#d4a843', opacity: 0.7 }} />
                  </div>
                  <div style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: '#d4a843', textAlign: 'right' }}>{fmt(cumulativeLoss)}</div>
                  <div style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textAlign: 'right' }}>+{fmt(icow)}</div>
                </div>
              ))}
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.4rem', paddingTop: '0.4rem', borderTop: '1px solid var(--border)' }}>
                <div style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                  <div style={{ width: '8px', height: '8px', background: '#d4a843', opacity: 0.7, borderRadius: '1px' }} /> Gross Profit Loss
                </div>
                <div style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>+ ICOW</div>
              </div>
            </div>
          </Section>
        </div>
      </div>

      {/* Gross profit working */}
      <Section title="Gross Profit Calculation">
        <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '6px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {[
            { label: 'Annual Turnover / Revenue', value: fmt(revenue), op: '' },
            { label: `Less: Variable Costs (${variableCosts}%)`, value: fmt(result.variableCosts), op: '−' },
            { label: 'Insurable Gross Profit', value: fmt(result.grossProfit), op: '=', highlight: true },
            { label: `Trend Uplift (+${trendRate}%)`, value: fmt(result.adjustedForTrend - result.grossProfit), op: '+' },
            { label: 'Trend-Adjusted Gross Profit', value: fmt(result.adjustedForTrend), op: '=', highlight: true },
            { label: `× Indemnity Period (${indemnityMonths}/12)`, value: fmt(result.recommendedSumInsured - result.icow), op: '=' },
            { label: `ICOW Allowance (${icowRate}%)`, value: fmt(result.icow), op: '+' },
            { label: 'RECOMMENDED SUM INSURED', value: fmt(result.recommendedSumInsured), op: '=', final: true },
          ].map(({ label, value, op, highlight, final }) => (
            <div key={label} style={{
              display: 'grid',
              gridTemplateColumns: '20px 1fr auto',
              gap: '1rem',
              alignItems: 'center',
              paddingTop: highlight || final ? '0.5rem' : '0',
              borderTop: highlight || final ? '1px solid var(--border)' : 'none',
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontSize: '0.8rem', textAlign: 'center' }}>{op}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: final ? '0.85rem' : '0.78rem', color: final ? '#d4a843' : highlight ? 'var(--text-primary)' : 'var(--text-secondary)', letterSpacing: '0.02em' }}>{label}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: final ? '1rem' : '0.85rem', color: final ? '#d4a843' : highlight ? 'var(--text-primary)' : 'var(--text-secondary)', fontWeight: final ? 500 : 400 }}>{value}</div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
