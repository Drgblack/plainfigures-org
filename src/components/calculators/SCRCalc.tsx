'use client';

import { useState, useMemo } from 'react';
import { useCurrency } from '@/lib/CurrencyContext';
import { calculateSCR, SCRScenario } from '@/lib/insurance-calculations';
import { formatCurrency, formatNumber } from '@/lib/formatting';
import { InputField, ResultCard, Section } from '@/components/ui';

const ADEQUACY_CONFIG = {
  strong:   { label: 'Strong', color: '#2ec88a', bg: 'rgba(46,200,138,0.08)', border: 'rgba(46,200,138,0.25)', desc: 'Well-capitalised. Significant buffer above regulatory minimum.' },
  adequate: { label: 'Adequate', color: '#d4a843', bg: 'rgba(212,168,67,0.08)', border: 'rgba(212,168,67,0.25)', desc: 'Above minimum. Monitor closely if SCR is approaching 130%.' },
  marginal: { label: 'Marginal', color: '#e07a2e', bg: 'rgba(224,122,46,0.08)', border: 'rgba(224,122,46,0.25)', desc: 'Near minimum. Regulatory intervention risk if position deteriorates.' },
  deficit:  { label: 'Deficit', color: '#e05252', bg: 'rgba(224,82,82,0.08)', border: 'rgba(224,82,82,0.25)', desc: 'Below SCR. Regulatory action likely. Immediate capital action required.' },
};

const SCENARIO_COLORS = ['#3b82c4', '#e05252', '#e07a2e', '#d4a843'];

function SolvencyGauge({ ratio, size = 120 }: { ratio: number; size?: number }) {
  const clamped = Math.min(ratio, 300);
  const pct = clamped / 300;
  const angle = -135 + pct * 270;
  const r = size * 0.38;
  const cx = size / 2;
  const cy = size / 2;
  const startAngle = -135 * (Math.PI / 180);
  const endAngle = 135 * (Math.PI / 180);

  const arcX1 = cx + r * Math.cos(startAngle);
  const arcY1 = cy + r * Math.sin(startAngle);
  const arcX2 = cx + r * Math.cos(endAngle);
  const arcY2 = cy + r * Math.sin(endAngle);

  const needleAngle = (-135 + pct * 270) * (Math.PI / 180);
  const nx = cx + r * 0.75 * Math.cos(needleAngle);
  const ny = cy + r * 0.75 * Math.sin(needleAngle);

  const color = ratio < 100 ? '#e05252' : ratio < 130 ? '#e07a2e' : ratio < 200 ? '#d4a843' : '#2ec88a';

  return (
    <svg width={size} height={size * 0.7} viewBox={`0 0 ${size} ${size * 0.7}`}>
      {/* Background arc track */}
      <path d={`M ${arcX1} ${arcY1} A ${r} ${r} 0 1 1 ${arcX2} ${arcY2}`} fill="none" stroke="var(--border)" strokeWidth="8" strokeLinecap="round" />
      {/* Zone markers */}
      {[100, 130, 200].map(threshold => {
        const ta = (-135 + (threshold / 300) * 270) * (Math.PI / 180);
        const tx = cx + (r + 4) * Math.cos(ta);
        const ty = cy + (r + 4) * Math.sin(ta);
        return <circle key={threshold} cx={tx} cy={ty} r="2" fill="var(--border)" />;
      })}
      {/* Filled arc to current */}
      <path d={`M ${arcX1} ${arcY1} A ${r} ${r} 0 ${pct > 0.5 ? 1 : 0} 1 ${cx + r * Math.cos(needleAngle)} ${cy + r * Math.sin(needleAngle)}`} fill="none" stroke={color} strokeWidth="8" strokeLinecap="round" opacity="0.7" />
      {/* Needle */}
      <line x1={cx} y1={cy} x2={nx} y2={ny} stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="4" fill={color} />
      {/* Value */}
      <text x={cx} y={cy + 22} textAnchor="middle" fill={color} fontFamily="var(--font-mono)" fontSize={size * 0.12} fontWeight="300">
        {ratio >= 999 ? '999+' : `${ratio.toFixed(0)}%`}
      </text>
      <text x={cx} y={cy + 34} textAnchor="middle" fill="var(--text-muted)" fontFamily="var(--font-mono)" fontSize={size * 0.075}>
        solvency ratio
      </text>
    </svg>
  );
}

function ScenarioCard({ s, color, isActive, onClick }: { s: SCRScenario; color: string; isActive: boolean; onClick: () => void }) {
  const cfg = ADEQUACY_CONFIG[s.adequacy];
  const fmt = (v: number) => `£${(v / 1000000).toFixed(1)}M`;
  return (
    <button onClick={onClick} style={{ textAlign: 'left', padding: '1rem', background: isActive ? `${color}10` : 'var(--bg)', border: `1px solid ${isActive ? color + '60' : 'var(--border)'}`, borderRadius: '6px', cursor: 'pointer', transition: 'all 0.2s ease', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: isActive ? color : 'var(--text-muted)', letterSpacing: '0.04em' }}>{s.label}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', color: cfg.color, fontWeight: 300 }}>{s.solvencyRatio >= 999 ? '999%+' : `${s.solvencyRatio.toFixed(0)}%`}</div>
      <div style={{ display: 'inline-flex', padding: '0.15rem 0.45rem', background: cfg.bg, border: `1px solid ${cfg.border}`, borderRadius: '3px', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: cfg.color, letterSpacing: '0.08em' }}>{cfg.label}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: s.surplusOrDeficit >= 0 ? '#2ec88a' : '#e05252' }}>
        {s.surplusOrDeficit >= 0 ? 'Surplus' : 'Deficit'}: {fmt(Math.abs(s.surplusOrDeficit))}
      </div>
    </button>
  );
}

export default function SCRCalc() {
  const { currency } = useCurrency();
  const [totalAssets, setTotalAssets] = useState(50000000);
  const [technicalProvisions, setTechnicalProvisions] = useState(28000000);
  const [otherLiabilities, setOtherLiabilities] = useState(5000000);
  const [marketRiskFactor, setMarketRiskFactor] = useState(18);
  const [underwritingRiskFactor, setUnderwritingRiskFactor] = useState(22);
  const [annualPremiums, setAnnualPremiums] = useState(12000000);
  const [operationalRiskFactor, setOperationalRiskFactor] = useState(15);
  const [diversificationCredit, setDiversificationCredit] = useState(20);
  const [activeScenario, setActiveScenario] = useState(0);

  const result = useMemo(() => calculateSCR({
    totalAssets, technicalProvisions, otherLiabilities, marketRiskFactor,
    underwritingRiskFactor, annualPremiums, operationalRiskFactor, diversificationCredit,
  }), [totalAssets, technicalProvisions, otherLiabilities, marketRiskFactor, underwritingRiskFactor, annualPremiums, operationalRiskFactor, diversificationCredit]);

  const fmt = (v: number) => formatCurrency(v, currency);
  const current = result.scenarios[activeScenario];
  const cfg = ADEQUACY_CONFIG[current.adequacy];

  const navPct = totalAssets > 0 ? (current.navBase / totalAssets) * 100 : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
        {/* Inputs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <Section title="Balance Sheet">
            <InputField label="Total Assets" value={totalAssets} onChange={setTotalAssets} min={1000000} max={1000000000} step={500000} prefix={currency.symbol} />
            <InputField label="Technical Provisions (Claims Liabilities)" value={technicalProvisions} onChange={setTechnicalProvisions} min={0} max={500000000} step={500000} prefix={currency.symbol} />
            <InputField label="Other Liabilities" value={otherLiabilities} onChange={setOtherLiabilities} min={0} max={100000000} step={100000} prefix={currency.symbol} />
          </Section>

          <Section title="Risk Factors">
            <InputField label="Market Risk Factor" value={marketRiskFactor} onChange={setMarketRiskFactor} min={5} max={50} step={0.5} suffix="%"
              hint="% of assets at risk from market movements" />
            <InputField label="Underwriting Risk Factor" value={underwritingRiskFactor} onChange={setUnderwritingRiskFactor} min={5} max={60} step={0.5} suffix="%"
              hint="% of premiums at risk from claims volatility" />
            <InputField label="Annual Gross Written Premiums" value={annualPremiums} onChange={setAnnualPremiums} min={100000} max={500000000} step={500000} prefix={currency.symbol} />
            <InputField label="Operational Risk Loading" value={operationalRiskFactor} onChange={setOperationalRiskFactor} min={5} max={30} step={0.5} suffix="%"
              hint="% of combined risk for operational risk" />
            <InputField label="Diversification Credit" value={diversificationCredit} onChange={setDiversificationCredit} min={0} max={40} step={1} suffix="%"
              hint="Reduction for diversification between risk modules" />
          </Section>
        </div>

        {/* Results */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Solvency gauge */}
          <Section title="Solvency Ratio">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0.5rem 0' }}>
              <SolvencyGauge ratio={result.base.solvencyRatio} size={200} />
              <div style={{ marginTop: '0.5rem', padding: '0.5rem 1.25rem', background: ADEQUACY_CONFIG[result.base.adequacy].bg, border: `1px solid ${ADEQUACY_CONFIG[result.base.adequacy].border}`, borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: ADEQUACY_CONFIG[result.base.adequacy].color, textAlign: 'center' }}>
                {ADEQUACY_CONFIG[result.base.adequacy].desc}
              </div>
            </div>
          </Section>

          <Section title="SCR Components">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <ResultCard label="Net Asset Value (NAV)" value={fmt(result.base.navBase)} sub={`${navPct.toFixed(1)}% of assets`} />
              <ResultCard label="Adjusted SCR" value={fmt(result.base.adjustedSCR)} color="warning" sub="Required capital" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
              <ResultCard label="Market Risk" value={fmt(result.base.marketRisk)} />
              <ResultCard label="Underwriting Risk" value={fmt(result.base.underwritingRisk)} />
              <ResultCard label="Operational Risk" value={fmt(result.base.operationalRisk)} />
            </div>
            <ResultCard
              label={result.base.surplusOrDeficit >= 0 ? "Capital Surplus" : "Capital Deficit"}
              value={fmt(Math.abs(result.base.surplusOrDeficit))}
              color={result.base.surplusOrDeficit >= 0 ? 'positive' : 'negative'}
              sub={result.base.surplusOrDeficit >= 0 ? 'Above SCR' : 'Below SCR — action required'}
            />
          </Section>
        </div>
      </div>

      {/* Scenario comparison */}
      <Section title="Stress Test Scenarios">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {result.scenarios.map((s, i) => (
            <ScenarioCard key={i} s={s} color={SCENARIO_COLORS[i]} isActive={activeScenario === i} onClick={() => setActiveScenario(i)} />
          ))}
        </div>

        {/* Selected scenario waterfall */}
        <div style={{ padding: '1.25rem', background: `${SCENARIO_COLORS[activeScenario]}08`, border: `1px solid ${SCENARIO_COLORS[activeScenario]}30`, borderRadius: '6px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: SCENARIO_COLORS[activeScenario], letterSpacing: '0.1em', marginBottom: '1rem' }}>
            {current.label.toUpperCase()} — CAPITAL WATERFALL
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[
              { label: 'Total Assets', value: totalAssets, op: '' },
              { label: 'Technical Provisions', value: -current.navBase + totalAssets - (otherLiabilities), op: '−' },
              { label: 'Other Liabilities', value: -(otherLiabilities), op: '−' },
              { label: 'Net Asset Value (NAV)', value: current.navBase, highlight: true, op: '=' },
              { label: 'Market Risk SCR', value: -current.marketRisk, op: '' },
              { label: 'Underwriting Risk SCR', value: -current.underwritingRisk, op: '' },
              { label: 'Operational Risk SCR', value: -current.operationalRisk, op: '' },
              { label: 'Basic SCR (quadrature)', value: -current.basicSCR, op: '→' },
              { label: `Diversification Credit (${diversificationCredit}%)`, value: current.basicSCR - current.adjustedSCR, op: '+' },
              { label: 'Adjusted SCR', value: -current.adjustedSCR, highlight: true, op: '=' },
              { label: current.surplusOrDeficit >= 0 ? 'Surplus' : 'Deficit', value: current.surplusOrDeficit, final: true, op: '=' },
            ].map(({ label, value, op, highlight, final }) => (
              <div key={label} style={{ display: 'grid', gridTemplateColumns: '20px 1fr auto', gap: '1rem', alignItems: 'center', paddingTop: highlight || final ? '0.4rem' : 0, borderTop: highlight || final ? '1px solid var(--border)' : 'none' }}>
                <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontSize: '0.75rem', textAlign: 'center' }}>{op}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: final ? '0.82rem' : '0.73rem', color: final ? SCENARIO_COLORS[activeScenario] : highlight ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{label}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: final ? '0.95rem' : '0.8rem', color: final ? (value >= 0 ? '#2ec88a' : '#e05252') : highlight ? 'var(--text-primary)' : 'var(--text-secondary)', fontWeight: final ? 500 : 400 }}>
                  {value < 0 ? `(${fmt(Math.abs(value))})` : fmt(Math.abs(value))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Solvency II reference */}
      <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '6px', padding: '1.25rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: '0.75rem', textTransform: 'uppercase' }}>Solvency II Reference Thresholds</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
          {[
            { range: '< 100%', label: 'Deficit', color: '#e05252', desc: 'Regulatory intervention' },
            { range: '100–129%', label: 'Marginal', color: '#e07a2e', desc: 'Near MCR / SCR floor' },
            { range: '130–199%', label: 'Adequate', color: '#d4a843', desc: 'Meets SCR' },
            { range: '≥ 200%', label: 'Strong', color: '#2ec88a', desc: 'Well-capitalised' },
          ].map(({ range, label, color, desc }) => (
            <div key={label} style={{ padding: '0.75rem', background: `${color}08`, border: `1px solid ${color}25`, borderRadius: '4px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color, fontWeight: 500 }}>{range}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color, marginTop: '0.2rem' }}>{label}</div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '0.3rem', lineHeight: 1.4 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '0.75rem 1rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
        INDICATIVE ONLY — This tool provides an approximation based on simplified Solvency II standard formula principles. It is not a substitute for an actuarial SCR calculation, internal model, or regulatory submission. Risk factors, correlation matrices, and diversification credits require actuarial judgement. Consult your appointed actuary and compliance team before using results for regulatory purposes.
      </div>
    </div>
  );
}
