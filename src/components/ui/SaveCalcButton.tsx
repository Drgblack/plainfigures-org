'use client';

import { useState } from 'react';
import { saveCalc, SavedCalc } from '@/lib/localStorage';

interface SaveCalcButtonProps {
  toolHref: string;
  toolTitle: string;
  summary: string;
  keyResults: { label: string; value: string }[];
}

export default function SaveCalcButton({ toolHref, toolTitle, summary, keyResults }: SaveCalcButtonProps) {
  const [state, setState] = useState<'idle' | 'labelling' | 'saved'>('idle');
  const [label, setLabel] = useState('');

  const handleSave = () => {
    if (!label.trim()) return;
    saveCalc({ label: label.trim(), toolHref, toolTitle, summary, keyResults });
    setState('saved');
    setTimeout(() => setState('idle'), 2200);
  };

  if (state === 'saved') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--positive)' }}>
        ✓ Saved
      </div>
    );
  }

  if (state === 'labelling') {
    return (
      <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
        <input
          autoFocus
          placeholder="Label this calculation…"
          value={label}
          onChange={e => setLabel(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleSave(); if (e.key === 'Escape') setState('idle'); }}
          style={{
            background: 'var(--bg)',
            border: '1px solid var(--accent)',
            borderRadius: '4px',
            padding: '0.3rem 0.6rem',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            outline: 'none',
            width: '180px',
          }}
        />
        <button onClick={handleSave} style={{
          padding: '0.3rem 0.65rem',
          background: 'var(--accent-dim)',
          border: '1px solid var(--accent)',
          borderRadius: '4px',
          color: 'var(--accent)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          cursor: 'pointer',
        }}>Save</button>
        <button onClick={() => setState('idle')} style={{
          padding: '0.3rem 0.5rem',
          background: 'none',
          border: '1px solid var(--border)',
          borderRadius: '4px',
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          cursor: 'pointer',
        }}>✕</button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setState('labelling')}
      title="Save this calculation to your browser"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.35rem',
        padding: '0.3rem 0.65rem',
        background: 'none',
        border: '1px solid var(--border)',
        borderRadius: '4px',
        color: 'var(--text-muted)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.7rem',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
      }}
    >
      ⊕ Save
    </button>
  );
}
