'use client';

import { useState, useMemo } from 'react';
import { useCurrency } from '@/lib/CurrencyContext';
import { calculateLTVCAC } from '@/lib/insurance-calculations';
import { formatCurrency, formatNumber } from '@/lib/formatting';
import { InputField, ResultCard, Section } from '@/components/ui';

const RATING_CONFIG = {
  excellent: { label: 'Excellent', color: '#2ec88a', bg: 'rgba(46,200,138,0.08)', desc: 'LTV:CAC ≥ 4× — strong unit economics. Growth capital is efficiently deployed.' },
  good:      { label: 'Good',      color: '#3b82c4', bg: 'rgba(59,130,196,0.08)', desc: 'LTV:CAC 2.5–4× — solid economics. Monitor churn and acquisition cost trends.' },
  marginal:  { label: 'Marginal',  color: '#d4a843', bg: 'rgba(212,168,67,0.08)', desc: 'LTV:CAC 1–2.5× — marginal. Improving retention or reducing CAC would materially change outcomes.' },
  poor:      { label: 'Poor',      color: '#e05252', bg: 'rgba(224,82,82,0.08)', desc: 'LTV:CAC < 1× — each customer costs more to acquire than they generate. Review pricing or targeting.' },
};

function RetentionCurve({ churnRate, months = 24 }: { churnRate: number; months?: number }) {
  const points = Array.from({ length: months + 1 }, (_, i) => ({
    m: i,
    ret: Math.pow(1 - churnRate / 100, i) * 100,
  }));
  const w = 300, h = 80;
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${(p.m / months) * w} ${h - (p.ret / 100) * h}`).join(' ');

  return (
    <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '6px', padding: '1rem' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Retention Curve ({months}mo)</div>
      <svg viewBox={`0 0 ${w} ${h}`} style={{ width: '100%', height: 'auto' }}>
        <defs>
          <linearGradient id="retGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82c4" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3b82c4" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${pathD} L ${w} ${h} L 0 ${h} Z`} fill="url(#retGrad)" />
        <path d={pathD} fill="none" stroke="#3b82c4" strokeWidth="1.5" />
        {/* Reference lines */}
        {[50, 25].map(pct => (
          <line key={pct} x1="0" y1={h - (pct / 100) * h} x2={w} y2={h - (pct / 100) * h}
            stroke="var(--border)" strokeWidth="0.5" strokeDasharray="3,3" />
        ))}
        {/* Labels */}
        <text x="2" y={h - (50 / 100) * h - 2} fill="var(--text-muted)" fontSize="7" fontFamily="monospace">50%</text>
        <text x="2" y={h - 2} fill="var(--text-muted)" fontSize="7" fontFamily="monospace">0%</text>
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
        <span>Month 0</span>
        <span>Month {months}</span>
      </div>
    </div>
  );
}

export default function LTVCACCalc() {
  const { currency } = useCurrency();
  const [arpu, setArpu] = useState(149);
  const [grossMarginPct, setGrossMarginPct] = useState(72);
  const [churnRatePct, setChurnRatePct] = useState(3.5);
  const [cacPerCustomer, setCacPerCustomer] = useState(850);
  const [monthlyNewCustomers, setMonthlyNewCustomers] = useState(120);
  const [discountRatePct, setDiscountRatePct] = useState(10);

  const base = useMemo(() => calculateLTVCAC({ arpu, grossMarginPct, churnRatePct, cacPerCustomer, salesCycleDays: 30, monthlyNewCustomers, discountRatePct }), [arpu, grossMarginPct, churnRatePct, cacPerCustomer, monthlyNewCustomers, discountRatePct]);

  // Scenarios
  const improved = useMemo(() => calculateLTVCAC({ arpu, grossMarginPct, churnRatePct: churnRatePct * 0.6, cacPerCustomer, salesCycleDays: 30, monthlyNewCustomers, discountRatePct }), [arpu, grossMarginPct, churnRatePct, cacPerCustomer, monthlyNewCustomers, discountRatePct]);
  const priceUp = useMemo(() => calculateLTVCAC({ arpu: arpu * 1.15, grossMarginPct, churnRatePct, cacPerCustomer, salesCycleDays: 30, monthlyNewCustomers, discountRatePct }), [arpu, grossMarginPct, churnRatePct, cacPerCustomer, monthlyNewCustomers, discountRatePct]);
  const highGrowth = useMemo(() => calculateLTVCAC({ arpu, grossMarginPct, churnRatePct: churnRatePct * 0.8, cacPerCustomer: cacPerCustomer * 1.3, salesCycleDays: 30, monthlyNewCustomers: monthlyNewCustomers * 2, discountRatePct }), [arpu, grossMarginPct, churnRatePct, cacPerCustomer, monthlyNewCustomers, discountRatePct]);

  const fmt = (v: number) => formatCurrency(v, currency);
  const cfg = RATING_CONFIG[base.rating];

  const scenarios = [
    { label: 'Base', result: base, color: '#3b82c4' },
    { label: '−40% Churn', result: improved, color: '#2ec88a' },
    { label: '+15% ARPU', result: priceUp, color: '#d4a843' },
    { label: '2× Growth', result: highGrowth, color: '#e07a2e' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
        {/* Inputs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <Section title="Unit Economics">
            <InputField label="Monthly ARPU" value={arpu} onChange={setArpu} min={1} max={100000} step={1} prefix={currency.symbol}
              hint="Average Revenue Per User / account per month" />
            <InputField label="Gross Margin" value={grossMarginPct} onChange={setGrossMarginPct} min={1} max={100} step={0.5} suffix="%"
              hint="Revenue minus direct cost of service" />
            <InputField label="Monthly Churn Rate" value={churnRatePct} onChange={setChurnRatePct} min={0.1} max={30} step={0.1} suffix="%"
              hint="% of customers cancelling each month" />
          </Section>
          <Section title="Acquisition">
            <InputField label="CAC (Customer Acquisition Cost)" value={cacPerCustomer} onChange={setCacPerCustomer} min={1} max={500000} step={10} prefix={currency.symbol}
              hint="All-in cost to acquire one customer" />
            <InputField label="Monthly New Customers" value={monthlyNewCustomers} onChange={setMonthlyNewCustomers} min={1} max={100000} step={1}
              hint="Used for cohort revenue projection" />
          </Section>
          <Section title="Modelling">
            <InputField label="Discount Rate (annual)" value={discountRatePct} onChange={setDiscountRatePct} min={1} max={50} step={0.5} suffix="%"
              hint="WACC or cost of capital for DCF LTV" />
          </Section>
        </div>

        {/* Results */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Section title="LTV : CAC">
            {/* Ratio display */}
            <div style={{ padding: '1.25rem', background: cfg.bg, border: `1px solid ${cfg.color}30`, borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '3rem', fontWeight: 300, color: cfg.color, lineHeight: 1 }}>
                {formatNumber(base.ltvcacRatio, 2)}×
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: cfg.color, letterSpacing: '0.1em', marginTop: '0.5rem' }}>LTV : CAC RATIO</div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.6rem', lineHeight: 1.5 }}>{cfg.desc}</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <ResultCard label="Simple LTV" value={fmt(base.simpleLTV)} sub={`${formatNumber(base.avgLifetimeMonths, 1)} month avg life`} />
              <ResultCard label="DCF LTV" value={fmt(base.dcfLTV)} sub={`At ${discountRatePct}% discount rate`} color="warning" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <ResultCard label="CAC" value={fmt(cacPerCustomer)} />
              <ResultCard label="Payback Period" value={`${formatNumber(base.paybackMonths, 1)} mo`}
                sub="Months to recover CAC"
                color={base.paybackMonths > 24 ? 'negative' : base.paybackMonths > 12 ? 'warning' : 'positive'} />
            </div>
            <ResultCard label="Monthly Cohort Value (DCF)" value={fmt(base.cohortValue12m)}
              sub={`${monthlyNewCustomers} new customers × DCF LTV`} />
          </Section>

          <RetentionCurve churnRate={churnRatePct} months={Math.min(Math.round(base.avgLifetimeMonths * 1.5), 60)} />
        </div>
      </div>

      {/* Scenario comparison */}
      <Section title="Scenario Analysis">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginBottom: '1.25rem' }}>
          {scenarios.map(({ label, result, color }) => (
            <div key={label} style={{ padding: '1rem', background: 'var(--bg-elevated)', border: `1px solid ${color}30`, borderRadius: '6px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color, letterSpacing: '0.08em', marginBottom: '0.5rem' }}>{label}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.6rem', fontWeight: 300, color, lineHeight: 1 }}>{formatNumber(result.ltvcacRatio, 2)}×</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>LTV {fmt(result.simpleLTV)}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Payback {formatNumber(result.paybackMonths, 1)}mo</div>
              <div style={{ marginTop: '0.5rem', padding: '0.15rem 0', background: RATING_CONFIG[result.rating].bg, borderRadius: '3px', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: RATING_CONFIG[result.rating].color }}>{RATING_CONFIG[result.rating].label}</div>
            </div>
          ))}
        </div>

        {/* Metric table */}
        <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr repeat(4, 110px)', borderBottom: '1px solid var(--border)' }}>
            {['', ...scenarios.map(s => s.label)].map((h, i) => (
              <div key={i} style={{ padding: '0.55rem 0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: i === 1 ? '#3b82c4' : 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{h}</div>
            ))}
          </div>
          {[
            { label: 'Avg Lifetime', values: scenarios.map(s => `${formatNumber(s.result.avgLifetimeMonths, 1)} mo`) },
            { label: 'Monthly GP', values: scenarios.map(s => fmt(s.result.monthlyGrossProfit)) },
            { label: 'Simple LTV', values: scenarios.map(s => fmt(s.result.simpleLTV)) },
            { label: 'DCF LTV', values: scenarios.map(s => fmt(s.result.dcfLTV)) },
            { label: 'Payback', values: scenarios.map(s => `${formatNumber(s.result.paybackMonths, 1)} mo`) },
            { label: 'Annual GP', values: scenarios.map(s => fmt(s.result.annualGrossProfit)) },
          ].map(({ label, values }) => (
            <div key={label} style={{ display: 'grid', gridTemplateColumns: '1fr repeat(4, 110px)', borderBottom: '1px solid var(--border)' }}>
              <div style={{ padding: '0.55rem 0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>{label}</div>
              {values.map((v, i) => (
                <div key={i} style={{ padding: '0.55rem 0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: i === 0 ? '#3b82c4' : 'var(--text-secondary)' }}>{v}</div>
              ))}
            </div>
          ))}
        </div>
      </Section>

      <div style={{ padding: '0.75rem 1rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
        INDICATIVE ONLY — LTV and CAC calculations depend on stable churn and margin assumptions. Triangular distribution LTV and DCF projections are modelling tools only. Actual outcomes depend on product mix, market conditions, and customer behaviour. Consult your finance team for board-level unit economics reporting.
      </div>
    </div>
  );
}
