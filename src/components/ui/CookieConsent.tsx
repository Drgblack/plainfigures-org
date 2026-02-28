'use client';

import { useState, useEffect } from 'react';

const CONSENT_KEY = 'pf_consent_v1';

export interface ConsentState {
  functional: true;
  analytics: boolean;
  marketing: boolean;
  ts: number;
}

function getStored(): ConsentState | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Date.now() - parsed.ts > 365 * 24 * 60 * 60 * 1000) {
      localStorage.removeItem(CONSENT_KEY);
      return null;
    }
    return parsed;
  } catch { return null; }
}

function saveConsent(analytics: boolean, marketing: boolean) {
  const state: ConsentState = { functional: true, analytics, marketing, ts: Date.now() };
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(state));
    (window as any).pfConsent = state;
    window.dispatchEvent(new CustomEvent('pf-consent-change', { detail: state }));
  } catch {}
  return state;
}

export function useConsent(): ConsentState | null {
  const [consent, setConsent] = useState<ConsentState | null>(null);
  useEffect(() => {
    setConsent(getStored());
    const handler = (e: Event) => setConsent((e as CustomEvent).detail);
    window.addEventListener('pf-consent-change', handler);
    return () => window.removeEventListener('pf-consent-change', handler);
  }, []);
  return consent;
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const stored = getStored();
    if (!stored) {
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    } else {
      (window as any).pfConsent = stored;
    }
  }, []);

  if (!visible) return null;

  const acceptAll = () => { saveConsent(true, true); setVisible(false); };
  const rejectAll = () => { saveConsent(false, false); setVisible(false); };
  const saveSelection = () => { saveConsent(analytics, marketing); setVisible(false); };

  const btnBase: React.CSSProperties = {
    fontFamily: 'var(--font-mono, monospace)',
    fontSize: '0.72rem',
    cursor: 'pointer',
    borderRadius: '4px',
    letterSpacing: '0.04em',
    padding: '0.45rem 1rem',
  };

  return (
    <div
      role='dialog'
      aria-modal='true'
      aria-label='Cookie consent'
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'min(600px, calc(100vw - 2rem))',
        zIndex: 10000,
        background: '#111111',
        border: '1px solid #2a2a2a',
        borderRadius: '8px',
        boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
        fontFamily: 'var(--font-mono, monospace)',
        fontSize: '0.78rem',
        color: '#c8c8c8',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div style={{ padding: '1rem 1.25rem 0.75rem', borderBottom: showDetails ? '1px solid #1e1e1e' : 'none' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.6rem' }}>
          <p style={{ color: '#e8e8e8', fontWeight: 500, margin: 0, lineHeight: 1.4 }}>This site uses cookies</p>
          <button onClick={rejectAll} aria-label='Reject and close'
            style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: '0.9rem', padding: 0, lineHeight: 1, flexShrink: 0 }}>
            &#x2715;
          </button>
        </div>
        <p style={{ margin: '0 0 0.75rem', color: '#888', lineHeight: 1.6, fontSize: '0.74rem' }}>
          We use functional cookies to remember your preferences. With your consent, we may also serve
          advertising via Google AdSense. We do not track calculator usage.{' '}
          <a href='/cookies' style={{ color: '#4a90e2', textDecoration: 'none' }}>Cookie policy</a>
        </p>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <button onClick={acceptAll} style={{ ...btnBase, background: '#4a90e2', border: '1px solid #4a90e2', color: '#fff', fontWeight: 500 }}>
            Accept all
          </button>
          <button onClick={rejectAll} style={{ ...btnBase, background: 'none', border: '1px solid #333', color: '#888' }}>
            Reject all
          </button>
          <button onClick={() => setShowDetails(v => !v)}
            style={{ ...btnBase, background: 'none', border: 'none', color: '#555', fontSize: '0.68rem', marginLeft: 'auto', padding: '0.45rem 0.5rem' }}>
            {showDetails ? 'Hide \u25b4' : 'Manage \u25be'}
          </button>
        </div>
      </div>

      {/* Details */}
      {showDetails && (
        <div style={{ padding: '0.75rem 1.25rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <ConsentRow title='Functional' description='Currency, theme, language. Required for the site to work.' checked={true} disabled={true} onChange={() => {}} />
          <ConsentRow title='Analytics' description='Aggregate page views only. No personal identifiers.' checked={analytics} disabled={false} onChange={setAnalytics} />
          <ConsentRow title='Advertising' description='Google AdSense contextual ads below calculator results.' checked={marketing} disabled={false} onChange={setMarketing} />
          <button onClick={saveSelection}
            style={{ ...btnBase, marginTop: '0.25rem', background: 'none', border: '1px solid #4a90e2', color: '#4a90e2', alignSelf: 'flex-start' }}>
            Save selection
          </button>
        </div>
      )}
    </div>
  );
}

function ConsentRow({ title, description, checked, disabled, onChange }: {
  title: string; description: string; checked: boolean; disabled: boolean; onChange: (v: boolean) => void;
}) {
  const id = 'consent-' + title.toLowerCase();
  return (
    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', padding: '0.4rem 0', borderBottom: '1px solid #1a1a1a' }}>
      <input type='checkbox' id={id} checked={checked} disabled={disabled} onChange={e => onChange(e.target.checked)}
        style={{ accentColor: '#4a90e2', width: '14px', height: '14px', marginTop: '0.15rem', cursor: disabled ? 'default' : 'pointer', flexShrink: 0 }}
        aria-label={title + ' cookies'} />
      <label htmlFor={id} style={{ cursor: disabled ? 'default' : 'pointer' }}>
        <span style={{ color: '#d0d0d0', fontWeight: 500, display: 'block', marginBottom: '0.15rem', fontSize: '0.75rem' }}>
          {title}{disabled && <span style={{ color: '#444', fontSize: '0.62rem' }}> (always on)</span>}
        </span>
        <span style={{ color: '#666', fontSize: '0.68rem', lineHeight: 1.5 }}>{description}</span>
      </label>
    </div>
  );
}