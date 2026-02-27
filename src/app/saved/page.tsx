'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getSavedCalcs, deleteSavedCalc, SavedCalc } from '@/lib/localStorage';

export default function SavedPage() {
  const [saves, setSaves] = useState<SavedCalc[]>([]);

  useEffect(() => { setSaves(getSavedCalcs()); }, []);

  const handleDelete = (id: string) => {
    deleteSavedCalc(id);
    setSaves(getSavedCalcs());
  };

  const handlePrint = () => window.print();

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 2rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: '1.5rem' }}>
          <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>HOME</Link>
          <span>/</span>
          <span>SAVED CALCULATIONS</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.8rem', fontWeight: 400, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
              Saved Calculations
            </h1>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
              Stored in your browser only — nothing is sent to any server.
            </p>
          </div>
          {saves.length > 0 && (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={handlePrint}
                className="no-print"
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 0.85rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', cursor: 'pointer', transition: 'all 0.15s ease' }}
              >
                ⎙ Print / PDF
              </button>
            </div>
          )}
        </div>
      </div>

      {saves.length === 0 ? (
        <div style={{ padding: '3rem', textAlign: 'center', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '8px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
            No saved calculations yet.
          </div>
          <Link href="/" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--accent)', textDecoration: 'none' }}>
            ← Back to calculators
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {saves.map(save => (
            <div key={save.id} className="print-section" style={{ padding: '1.25rem 1.5rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '6px', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: 500 }}>{save.label}</div>
                  <Link href={save.toolHref} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--accent)', textDecoration: 'none' }}>
                    {save.toolTitle} →
                  </Link>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.5rem', marginBottom: '0.6rem' }}>
                  {save.keyResults.map(r => (
                    <div key={r.label} style={{ padding: '0.5rem 0.75rem', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '4px' }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.2rem' }}>{r.label}</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-primary)' }}>{r.value}</div>
                    </div>
                  ))}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)' }}>
                  Saved {new Date(save.savedAt).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
              </div>
              <button
                onClick={() => handleDelete(save.id)}
                className="no-print"
                aria-label="Delete saved calculation"
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '0.78rem', padding: '0.25rem', lineHeight: 1, flexShrink: 0, transition: 'color 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--negative)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
              >✕</button>
            </div>
          ))}
        </div>
      )}

      {saves.length > 0 && (
        <div style={{ marginTop: '2rem', fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
          All calculations are indicative only. Plain Figures does not provide financial advice.
        </div>
      )}
    </div>
  );
}
