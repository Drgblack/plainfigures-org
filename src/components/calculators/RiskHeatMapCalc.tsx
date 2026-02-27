'use client';

import { useState, useMemo } from 'react';
import { calculateRiskScores, Risk, HEAT_MAP_COLOR } from '@/lib/insurance-calculations';
import { Section } from '@/components/ui';

const DEFAULT_RISKS: Risk[] = [
  { id: '1', name: 'Cyber Attack / Data Breach', likelihood: 4, impact: 5, mitigatedLikelihood: 2, mitigatedImpact: 4 },
  { id: '2', name: 'Key Person Dependency', likelihood: 3, impact: 4, mitigatedLikelihood: 2, mitigatedImpact: 3 },
  { id: '3', name: 'Supply Chain Disruption', likelihood: 3, impact: 4, mitigatedLikelihood: 2, mitigatedImpact: 3 },
  { id: '4', name: 'Regulatory / Compliance Breach', likelihood: 2, impact: 5, mitigatedLikelihood: 1, mitigatedImpact: 4 },
  { id: '5', name: 'Property Damage / Fire', likelihood: 2, impact: 4, mitigatedLikelihood: 1, mitigatedImpact: 3 },
  { id: '6', name: 'Business Interruption', likelihood: 3, impact: 5, mitigatedLikelihood: 2, mitigatedImpact: 4 },
  { id: '7', name: 'Reputational Damage', likelihood: 2, impact: 4, mitigatedLikelihood: 2, mitigatedImpact: 3 },
  { id: '8', name: 'Employee Liability Claims', likelihood: 2, impact: 3, mitigatedLikelihood: 1, mitigatedImpact: 2 },
];

const LEVEL_LABELS = { low: 'LOW', medium: 'MEDIUM', high: 'HIGH', critical: 'CRITICAL' };
const LIKELIHOOD_LABELS = ['', 'Rare', 'Unlikely', 'Possible', 'Likely', 'Almost Certain'];
const IMPACT_LABELS = ['', 'Negligible', 'Minor', 'Moderate', 'Major', 'Catastrophic'];

type ViewMode = 'heatmap' | 'scores' | 'mitigated';

export default function RiskHeatMapCalc() {
  const [risks, setRisks] = useState<Risk[]>(DEFAULT_RISKS);
  const [view, setView] = useState<ViewMode>('heatmap');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showMitigated, setShowMitigated] = useState(false);

  const scores = useMemo(() => calculateRiskScores(risks), [risks]);

  const updateRisk = (id: string, field: keyof Risk, value: string | number) => {
    setRisks(rs => rs.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const addRisk = () => {
    const id = Date.now().toString();
    setRisks(rs => [...rs, { id, name: 'New Risk', likelihood: 2, impact: 2, mitigatedLikelihood: 1, mitigatedImpact: 2 }]);
    setEditingId(id);
  };

  const removeRisk = (id: string) => setRisks(rs => rs.filter(r => r.id !== id));

  // Build 5×5 heat map grid
  const heatMapCells: { likelihood: number; impact: number; risks: typeof scores }[][] = Array.from({ length: 5 }, (_, li) =>
    Array.from({ length: 5 }, (_, ii) => ({
      likelihood: li + 1, impact: ii + 1,
      risks: scores.filter(s => {
        const r = risks.find(r => r.id === s.id)!;
        return showMitigated
          ? (r.mitigatedLikelihood ?? r.likelihood) === (li + 1) && (r.mitigatedImpact ?? r.impact) === (ii + 1)
          : r.likelihood === (li + 1) && r.impact === (ii + 1);
      }),
    }))
  );

  function cellLevel(l: number, i: number): 'low' | 'medium' | 'high' | 'critical' {
    const s = l * i;
    if (s <= 4) return 'low';
    if (s <= 9) return 'medium';
    if (s <= 16) return 'high';
    return 'critical';
  }

  const ratingBg = {
    low: 'rgba(46,200,138,0.15)',
    medium: 'rgba(212,168,67,0.15)',
    high: 'rgba(224,122,46,0.15)',
    critical: 'rgba(224,82,82,0.15)',
  };

  const sortedScores = [...scores].sort((a, b) => (showMitigated ? b.mitigatedScore - a.mitigatedScore : b.score - a.score));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* View toggle */}
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
        {(['heatmap', 'scores', 'mitigated'] as ViewMode[]).map(v => (
          <button key={v} onClick={() => setView(v)} style={{ padding: '0.4rem 0.9rem', background: view === v ? 'rgba(212,168,67,0.12)' : 'var(--bg)', border: `1px solid ${view === v ? '#d4a843' : 'var(--border)'}`, borderRadius: '4px', color: view === v ? '#d4a843' : 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', cursor: 'pointer', transition: 'all 0.15s ease', textTransform: 'capitalize' }}>
            {v === 'heatmap' ? 'Heat Map' : v === 'scores' ? 'Risk Register' : 'Before vs After'}
          </button>
        ))}
        <div style={{ flex: 1 }} />
        {view === 'heatmap' && (
          <button onClick={() => setShowMitigated(m => !m)} style={{ padding: '0.4rem 0.9rem', background: showMitigated ? 'rgba(46,200,138,0.1)' : 'var(--bg)', border: `1px solid ${showMitigated ? '#2ec88a' : 'var(--border)'}`, borderRadius: '4px', color: showMitigated ? '#2ec88a' : 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', cursor: 'pointer', transition: 'all 0.15s ease' }}>
            {showMitigated ? 'Showing: Post-Mitigation' : 'Showing: Current / Base'}
          </button>
        )}
      </div>

      {/* Heat Map View */}
      {view === 'heatmap' && (
        <Section title={showMitigated ? 'Post-Mitigation Risk Heat Map' : 'Current Risk Heat Map'}>
          <div style={{ overflowX: 'auto' }}>
            <div style={{ minWidth: '480px' }}>
              {/* Y axis label */}
              <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.3rem', paddingLeft: '80px' }}>
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} style={{ flex: 1, textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--text-muted)' }}>{IMPACT_LABELS[i]}</div>
                ))}
              </div>
              {/* Grid rows (likelihood 5→1, top to bottom) */}
              {[5, 4, 3, 2, 1].map(li => (
                <div key={li} style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.4rem', alignItems: 'stretch' }}>
                  <div style={{ width: '76px', fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '0.5rem', flexShrink: 0, textAlign: 'right' }}>
                    {LIKELIHOOD_LABELS[li]}
                  </div>
                  {[1, 2, 3, 4, 5].map(ii => {
                    const level = cellLevel(li, ii);
                    const cellRisks = heatMapCells[li - 1][ii - 1].risks;
                    return (
                      <div key={ii} style={{ flex: 1, minHeight: '52px', background: ratingBg[level], border: `1px solid ${HEAT_MAP_COLOR[level]}40`, borderRadius: '3px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.2rem', padding: '0.3rem', position: 'relative' }}>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: HEAT_MAP_COLOR[level], opacity: 0.5, position: 'absolute', top: '3px', right: '4px' }}>{li * ii}</div>
                        {cellRisks.map(s => (
                          <div key={s.id} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: HEAT_MAP_COLOR[level], background: `${HEAT_MAP_COLOR[level]}20`, borderRadius: '2px', padding: '0.1rem 0.3rem', textAlign: 'center', lineHeight: 1.2, maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={s.name}>
                            {s.name.split(' ').slice(0, 2).join(' ')}
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              ))}
              {/* X axis label */}
              <div style={{ paddingLeft: '80px', fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '0.3rem' }}>← IMPACT →</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)', textAlign: 'left', marginTop: '0.5rem', paddingLeft: '4px', writingMode: 'horizontal-tb' }}>
                ↑ LIKELIHOOD
              </div>

              {/* Legend */}
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                {(['low', 'medium', 'high', 'critical'] as const).map(l => (
                  <div key={l} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: HEAT_MAP_COLOR[l] }}>
                    <div style={{ width: '10px', height: '10px', background: HEAT_MAP_COLOR[l], opacity: 0.5, borderRadius: '2px' }} />
                    {LEVEL_LABELS[l]}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>
      )}

      {/* Risk Register View */}
      {view === 'scores' && (
        <Section title="Risk Register — Click to Edit">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {sortedScores.map(score => {
              const risk = risks.find(r => r.id === score.id)!;
              const isEditing = editingId === score.id;
              const level = showMitigated ? score.mitigatedLevel : score.level;
              const displayScore = showMitigated ? score.mitigatedScore : score.score;
              return (
                <div key={score.id} style={{ background: 'var(--bg-elevated)', border: `1px solid ${HEAT_MAP_COLOR[level]}30`, borderLeft: `3px solid ${HEAT_MAP_COLOR[level]}`, borderRadius: '4px', overflow: 'hidden' }}>
                  <div onClick={() => setEditingId(isEditing ? null : score.id)} style={{ display: 'grid', gridTemplateColumns: '1fr 60px 80px 32px', gap: '0.75rem', padding: '0.7rem 0.9rem', cursor: 'pointer', alignItems: 'center' }}>
                    {isEditing
                      ? <input value={risk.name} onChange={e => updateRisk(risk.id, 'name', e.target.value)} onClick={e => e.stopPropagation()} style={{ background: 'var(--bg)', border: '1px solid var(--border-light)', borderRadius: '3px', padding: '0.2rem 0.4rem', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', outline: 'none' }} />
                      : <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-primary)' }}>{risk.name}</div>
                    }
                    <div style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: HEAT_MAP_COLOR[level], fontWeight: 500 }}>{displayScore}</div>
                    <div style={{ textAlign: 'center', padding: '0.15rem 0.4rem', background: `${HEAT_MAP_COLOR[level]}15`, border: `1px solid ${HEAT_MAP_COLOR[level]}30`, borderRadius: '3px', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: HEAT_MAP_COLOR[level], letterSpacing: '0.06em' }}>{LEVEL_LABELS[level]}</div>
                    <button onClick={e => { e.stopPropagation(); removeRisk(risk.id); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '0.7rem' }}>✕</button>
                  </div>

                  {isEditing && (
                    <div style={{ padding: '0.75rem 0.9rem', borderTop: '1px solid var(--border)', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '1rem' }}>
                      {[
                        { label: 'Likelihood (1–5)', value: risk.likelihood, field: 'likelihood' as keyof Risk },
                        { label: 'Impact (1–5)', value: risk.impact, field: 'impact' as keyof Risk },
                        { label: 'Mit. Likelihood', value: risk.mitigatedLikelihood ?? risk.likelihood, field: 'mitigatedLikelihood' as keyof Risk },
                        { label: 'Mit. Impact', value: risk.mitigatedImpact ?? risk.impact, field: 'mitigatedImpact' as keyof Risk },
                      ].map(({ label, value, field }) => (
                        <div key={field}>
                          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>{label}</div>
                          <div style={{ display: 'flex', gap: '0.3rem' }}>
                            {[1, 2, 3, 4, 5].map(n => (
                              <button key={n} onClick={() => updateRisk(risk.id, field, n)} style={{ flex: 1, padding: '0.3rem 0', background: value === n ? `${HEAT_MAP_COLOR[cellLevel(n, n)]}25` : 'var(--bg)', border: `1px solid ${value === n ? HEAT_MAP_COLOR[cellLevel(n, n)] : 'var(--border)'}`, borderRadius: '3px', color: value === n ? HEAT_MAP_COLOR[cellLevel(n, n)] : 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', cursor: 'pointer' }}>{n}</button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            <button onClick={addRisk} style={{ padding: '0.6rem', background: 'var(--bg)', border: '1px dashed var(--border)', borderRadius: '4px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', cursor: 'pointer', transition: 'all 0.15s ease' }}>
              + Add Risk
            </button>
          </div>
        </Section>
      )}

      {/* Before vs After */}
      {view === 'mitigated' && (
        <Section title="Pre vs Post-Mitigation Comparison">
          <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 70px 70px 70px 80px', gap: '0.5rem', padding: '0.6rem 1rem', borderBottom: '1px solid var(--border)' }}>
              {['Risk', 'Before', 'After', 'Reduction', 'Level change'].map(h => (
                <div key={h} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</div>
              ))}
            </div>
            {[...scores].sort((a, b) => b.reduction - a.reduction).map(s => (
              <div key={s.id} style={{ display: 'grid', gridTemplateColumns: '1fr 70px 70px 70px 80px', gap: '0.5rem', padding: '0.65rem 1rem', borderBottom: '1px solid var(--border)', alignItems: 'center' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.73rem', color: 'var(--text-secondary)' }}>{s.name}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: HEAT_MAP_COLOR[s.level], textAlign: 'center' }}>{s.score}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: HEAT_MAP_COLOR[s.mitigatedLevel], textAlign: 'center' }}>{s.mitigatedScore}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: s.reduction > 0 ? '#2ec88a' : 'var(--text-muted)', textAlign: 'center' }}>
                  {s.reduction > 0 ? `−${s.reduction.toFixed(0)}%` : '0%'}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: HEAT_MAP_COLOR[s.level] }}>{LEVEL_LABELS[s.level]}</span>
                  {s.level !== s.mitigatedLevel && <>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.6rem' }}>→</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: HEAT_MAP_COLOR[s.mitigatedLevel] }}>{LEVEL_LABELS[s.mitigatedLevel]}</span>
                  </>}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Summary counts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
        {(['critical', 'high', 'medium', 'low'] as const).map(level => {
          const count = scores.filter(s => (showMitigated ? s.mitigatedLevel : s.level) === level).length;
          return (
            <div key={level} style={{ padding: '0.9rem 1rem', background: `${HEAT_MAP_COLOR[level]}10`, border: `1px solid ${HEAT_MAP_COLOR[level]}30`, borderRadius: '6px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '2rem', fontWeight: 300, color: HEAT_MAP_COLOR[level], lineHeight: 1 }}>{count}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: HEAT_MAP_COLOR[level], letterSpacing: '0.1em', marginTop: '0.4rem' }}>{LEVEL_LABELS[level]}</div>
            </div>
          );
        })}
      </div>

      <div style={{ padding: '0.75rem 1rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
        INDICATIVE ONLY — Risk scores are a modelling tool, not an actuarial assessment. Likelihood and impact ratings are subjective. Results do not constitute professional risk advice. Consult a qualified risk manager or insurer for formal risk assessments.
      </div>
    </div>
  );
}
