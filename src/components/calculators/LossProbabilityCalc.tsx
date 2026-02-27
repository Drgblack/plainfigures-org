'use client';

import { useState, useMemo } from 'react';
import { useCurrency } from '@/lib/CurrencyContext';
import { calculateLossModel, LossEvent } from '@/lib/insurance-calculations';
import { formatCurrency, formatNumber } from '@/lib/formatting';
import { ResultCard, Section } from '@/components/ui';

const DEFAULT_EVENTS: LossEvent[] = [
  { id: '1', name: 'Cyber Incident', annualFrequency: 0.4, minLoss: 50000, mostLikelyLoss: 250000, maxLoss: 2000000, mitigationPct: 40 },
  { id: '2', name: 'Fire / Property Damage', annualFrequency: 0.15, minLoss: 100000, mostLikelyLoss: 500000, maxLoss: 5000000, mitigationPct: 30 },
  { id: '3', name: 'Liability Claim', annualFrequency: 0.6, minLoss: 25000, mostLikelyLoss: 150000, maxLoss: 1000000, mitigationPct: 20 },
  { id: '4', name: 'Business Interruption', annualFrequency: 0.25, minLoss: 80000, mostLikelyLoss: 350000, maxLoss: 2500000, mitigationPct: 25 },
  { id: '5', name: 'Supply Chain Failure', annualFrequency: 0.3, minLoss: 30000, mostLikelyLoss: 180000, maxLoss: 800000, mitigationPct: 35 },
];

const EVENT_COLORS = ['#3b82c4', '#e05252', '#d4a843', '#2ec88a', '#9b72e0', '#e07a2e', '#38b2ac'];

function TriangleViz({ min, mode, max, width = 200 }: { min: number; mode: number; max: number; width?: number }) {
  if (max <= min) return null;
  const h = 40;
  const modeX = ((mode - min) / (max - min)) * width;
  const pathD = `M 0 ${h} L ${modeX} 0 L ${width} ${h} Z`;
  return (
    <svg viewBox={`0 0 ${width} ${h}`} style={{ width: '100%', height: 'auto', maxWidth: `${width}px` }}>
      <path d={pathD} fill="#3b82c4" fillOpacity="0.2" />
      <path d={pathD} fill="none" stroke="#3b82c4" strokeWidth="1.2" />
      <line x1={modeX} y1="0" x2={modeX} y2={h} stroke="#3b82c4" strokeWidth="0.8" strokeDasharray="2,2" />
    </svg>
  );
}

function NumberInput({ label, value, onChange, prefix = '', min = 0, max = 100000000, step = 1000 }: {
  label: string; value: number; onChange: (v: number) => void; prefix?: string; min?: number; max?: number; step?: number;
}) {
  return (
    <div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.06em', marginBottom: '0.3rem', textTransform: 'uppercase' }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '3px', overflow: 'hidden' }}>
        {prefix && <span style={{ padding: '0.3rem 0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', borderRight: '1px solid var(--border)' }}>{prefix}</span>}
        <input type="number" value={value} min={min} max={max} step={step}
          onChange={e => onChange(Number(e.target.value))}
          style={{ flex: 1, background: 'transparent', border: 'none', padding: '0.3rem 0.5rem', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', outline: 'none', width: '0' }} />
      </div>
    </div>
  );
}

export default function LossProbabilityCalc() {
  const { currency } = useCurrency();
  const [events, setEvents] = useState<LossEvent[]>(DEFAULT_EVENTS);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [view, setView] = useState<'summary' | 'events' | 'exceedance'>('summary');

  const result = useMemo(() => calculateLossModel(events), [events]);
  const fmt = (v: number) => formatCurrency(v, currency);

  const updateEvent = (id: string, field: keyof LossEvent, value: string | number) => {
    setEvents(es => es.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const addEvent = () => {
    const id = Date.now().toString();
    setEvents(es => [...es, { id, name: 'New Risk Event', annualFrequency: 0.2, minLoss: 10000, mostLikelyLoss: 100000, maxLoss: 500000, mitigationPct: 20 }]);
    setExpandedId(id);
  };

  const removeEvent = (id: string) => setEvents(es => es.filter(e => e.id !== id));

  const maxExpected = Math.max(...result.events.map(e => e.annualizedExpected));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Summary KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
        <ResultCard label="Total Expected Annual Loss" value={fmt(result.totalExpectedLoss)} size="large" color="warning" />
        <ResultCard label="Aggregate PML" value={fmt(result.aggregatePML)} sub="Probable Maximum Loss" color="negative" />
        <ResultCard label="Mitigated Expected Loss" value={fmt(result.totalMitigatedExpected)} color="positive" />
        <ResultCard label="Mitigation Benefit" value={fmt(result.mitigationBenefit)}
          sub={`${formatNumber((result.mitigationBenefit / result.totalExpectedLoss) * 100, 1)}% reduction`}
          color="positive" />
      </div>

      {/* View tabs */}
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {(['summary', 'events', 'exceedance'] as const).map(v => (
          <button key={v} onClick={() => setView(v)} style={{ padding: '0.4rem 0.9rem', background: view === v ? 'rgba(212,168,67,0.1)' : 'var(--bg)', border: `1px solid ${view === v ? '#d4a843' : 'var(--border)'}`, borderRadius: '4px', color: view === v ? '#d4a843' : 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', cursor: 'pointer', transition: 'all 0.15s ease', textTransform: 'capitalize' }}>
            {v === 'summary' ? 'Loss Summary' : v === 'events' ? 'Edit Events' : 'Exceedance'}
          </button>
        ))}
      </div>

      {/* Loss Summary */}
      {view === 'summary' && (
        <Section title="Expected Annual Loss by Event">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {result.events.map((er, i) => {
              const ev = events.find(e => e.id === er.id)!;
              const barPct = maxExpected > 0 ? (er.annualizedExpected / maxExpected) * 100 : 0;
              const mitBarPct = maxExpected > 0 ? (er.mitigatedExpected / maxExpected) * 100 : 0;
              const color = EVENT_COLORS[i % EVENT_COLORS.length];
              return (
                <div key={er.id} style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '4px', padding: '0.85rem 1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: color, opacity: 0.8 }} />
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-primary)' }}>{ev.name}</div>
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                      {ev.annualFrequency}× /yr — {ev.mitigationPct}% mitigated
                    </div>
                  </div>
                  {/* Base bar */}
                  <div style={{ height: '8px', borderRadius: '2px', background: 'var(--border)', overflow: 'hidden', marginBottom: '3px' }}>
                    <div style={{ height: '100%', width: `${barPct}%`, background: color, opacity: 0.65, transition: 'width 0.4s ease' }} />
                  </div>
                  {/* Mitigated bar */}
                  <div style={{ height: '8px', borderRadius: '2px', background: 'var(--border)', overflow: 'hidden', marginBottom: '0.5rem' }}>
                    <div style={{ height: '100%', width: `${mitBarPct}%`, background: '#2ec88a', opacity: 0.5, transition: 'width 0.4s ease' }} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                    {[
                      { l: 'Min', v: fmt(ev.minLoss) },
                      { l: 'Most Likely', v: fmt(ev.mostLikelyLoss) },
                      { l: 'Max', v: fmt(ev.maxLoss) },
                      { l: 'Expected Annual', v: fmt(er.annualizedExpected) },
                    ].map(({ l, v }) => (
                      <div key={l}>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--text-muted)' }}>{l}</div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{v}</div>
                      </div>
                    ))}
                  </div>
                  <TriangleViz min={ev.minLoss} mode={ev.mostLikelyLoss} max={ev.maxLoss} />
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', gap: '1rem', paddingTop: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)' }}>
              <div style={{ width: '16px', height: '6px', background: '#3b82c4', opacity: 0.65, borderRadius: '1px' }} /> Base expected loss
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)' }}>
              <div style={{ width: '16px', height: '6px', background: '#2ec88a', opacity: 0.5, borderRadius: '1px' }} /> After mitigation
            </div>
          </div>
        </Section>
      )}

      {/* Edit Events */}
      {view === 'events' && (
        <Section title="Loss Event Editor">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {events.map((ev, i) => {
              const color = EVENT_COLORS[i % EVENT_COLORS.length];
              const isOpen = expandedId === ev.id;
              return (
                <div key={ev.id} style={{ background: 'var(--bg-elevated)', border: `1px solid ${isOpen ? color + '50' : 'var(--border)'}`, borderLeft: `3px solid ${color}`, borderRadius: '4px', overflow: 'hidden' }}>
                  <div onClick={() => setExpandedId(isOpen ? null : ev.id)} style={{ display: 'grid', gridTemplateColumns: '1fr 100px 100px 28px', gap: '0.5rem', padding: '0.75rem 0.9rem', cursor: 'pointer', alignItems: 'center' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-primary)' }}>{ev.name}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'right' }}>{ev.annualFrequency}×/yr</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-secondary)', textAlign: 'right' }}>ML: {fmt(ev.mostLikelyLoss)}</div>
                    <button onClick={e => { e.stopPropagation(); removeEvent(ev.id); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '0.7rem' }}>✕</button>
                  </div>
                  {isOpen && (
                    <div style={{ padding: '0.75rem 0.9rem', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.06em', marginBottom: '0.3rem', textTransform: 'uppercase' }}>Event Name</div>
                        <input value={ev.name} onChange={e => updateEvent(ev.id, 'name', e.target.value)}
                          style={{ width: '100%', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '3px', padding: '0.3rem 0.6rem', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', outline: 'none', boxSizing: 'border-box' }} />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                        <NumberInput label="Annual Frequency (events/yr)" value={ev.annualFrequency} onChange={v => updateEvent(ev.id, 'annualFrequency', v)} step={0.05} max={10} />
                        <NumberInput label="Mitigation %" value={ev.mitigationPct} onChange={v => updateEvent(ev.id, 'mitigationPct', v)} max={95} step={5} />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                        <NumberInput label={`Min Loss (${currency.symbol})`} value={ev.minLoss} onChange={v => updateEvent(ev.id, 'minLoss', v)} step={5000} />
                        <NumberInput label={`Most Likely (${currency.symbol})`} value={ev.mostLikelyLoss} onChange={v => updateEvent(ev.id, 'mostLikelyLoss', v)} step={10000} />
                        <NumberInput label={`Max Loss (${currency.symbol})`} value={ev.maxLoss} onChange={v => updateEvent(ev.id, 'maxLoss', v)} step={50000} />
                      </div>
                      <TriangleViz min={ev.minLoss} mode={ev.mostLikelyLoss} max={ev.maxLoss} />
                    </div>
                  )}
                </div>
              );
            })}
            <button onClick={addEvent} style={{ padding: '0.65rem', background: 'var(--bg)', border: '1px dashed var(--border)', borderRadius: '4px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', cursor: 'pointer' }}>
              + Add Loss Event
            </button>
          </div>
        </Section>
      )}

      {/* Exceedance probability */}
      {view === 'exceedance' && (
        <Section title="Loss Exceedance Probability">
          <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr repeat(4, 90px)', borderBottom: '1px solid var(--border)' }}>
              <div style={{ padding: '0.6rem 0.9rem', fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)' }}>Event</div>
              {['25% max', '50% max', '75% max', '100% max'].map(h => (
                <div key={h} style={{ padding: '0.6rem 0.6rem', fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)', textAlign: 'center' }}>{h}</div>
              ))}
            </div>
            {result.events.map((er, i) => (
              <div key={er.id} style={{ display: 'grid', gridTemplateColumns: '1fr repeat(4, 90px)', borderBottom: '1px solid var(--border)', alignItems: 'center' }}>
                <div style={{ padding: '0.65rem 0.9rem', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>{er.name}</div>
                {er.exceedanceProbability.map(({ threshold, prob }, j) => {
                  const probPct = Math.min(prob * 100, 100);
                  const color = probPct > 50 ? '#e05252' : probPct > 25 ? '#e07a2e' : probPct > 10 ? '#d4a843' : '#2ec88a';
                  return (
                    <div key={j} style={{ padding: '0.5rem 0.6rem', textAlign: 'center' }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color }}>{formatNumber(probPct, 1)}%</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--text-muted)' }}>{fmt(threshold)}</div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          <div style={{ marginTop: '0.75rem', fontFamily: 'var(--font-sans)', fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Exceedance probability = P(loss exceeds threshold) × frequency. Based on triangular distribution between min/most-likely/max. Higher % = more likely to exceed that threshold in any given year.
          </div>
        </Section>
      )}

      <div style={{ padding: '0.75rem 1rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
        INDICATIVE ONLY — Loss modelling uses triangular distributions as simplifications. Actual loss distributions may be heavy-tailed, correlated, or subject to regime changes not captured here. PML is an approximation. This tool does not replace actuarial loss modelling or catastrophe modelling. Consult a qualified actuary or risk engineer before using outputs for insurance purchasing or capital allocation.
      </div>
    </div>
  );
}
