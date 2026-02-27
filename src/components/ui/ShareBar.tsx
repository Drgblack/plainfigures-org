'use client';

import { useState } from 'react';
import { copyShareUrl, downloadResultsAsPDF, downloadShareImage, encodeParamsToUrl } from '@/lib/sharing';

interface ShareBarProps {
  title: string;
  params: Record<string, string | number | boolean>;
  results: { label: string; value: string; sub?: string }[];
  inputs: { label: string; value: string }[];
  accentColor?: string;
}

export default function ShareBar({ title, params, results, inputs, accentColor = '#3b82c4' }: ShareBarProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyUrl = async () => {
    const ok = await copyShareUrl(params);
    if (ok) { setCopied(true); setTimeout(() => setCopied(false), 2000); }
  };

  const handlePDF = () => downloadResultsAsPDF(title, results, inputs);
  const handleImage = () => downloadShareImage(title, results, accentColor);

  const btn: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: '0.4rem',
    padding: '0.45rem 0.85rem',
    background: 'var(--bg)',
    border: '1px solid var(--border)',
    borderRadius: '4px',
    color: 'var(--text-secondary)',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.72rem',
    cursor: 'pointer',
    letterSpacing: '0.04em',
    transition: 'all 0.15s ease',
    whiteSpace: 'nowrap',
    textDecoration: 'none',
  };

  const emailHref = typeof window !== 'undefined'
    ? `mailto:?subject=${encodeURIComponent(`${title} — Plain Figures`)}&body=${encodeURIComponent(`My results from Plain Figures:\n\n${results.map(r => `${r.label}: ${r.value}`).join('\n')}\n\nFull calculation: ${encodeParamsToUrl(params)}`)}`
    : '#';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '6px', flexWrap: 'wrap' }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginRight: '0.5rem', flexShrink: 0 }}>Share</span>

      <button onClick={handleCopyUrl} style={{ ...btn, border: `1px solid ${copied ? 'var(--positive)' : 'var(--border)'}`, color: copied ? 'var(--positive)' : 'var(--text-secondary)' }}>
        <span>{copied ? '✓' : '🔗'}</span>
        <span>{copied ? 'Link copied!' : 'Copy link'}</span>
      </button>

      <button onClick={handleImage} style={btn}>
        <span>🖼</span>
        <span>Save image</span>
      </button>

      <button onClick={handlePDF} style={btn}>
        <span>📄</span>
        <span>Download report</span>
      </button>

      <a href={emailHref} style={btn}>
        <span>✉</span>
        <span>Email results</span>
      </a>
    </div>
  );
}
