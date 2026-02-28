'use client';

import type { Metadata } from 'next';

export default function CookiesPage() {
  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}>Legal</p>
      <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.75rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Cookie Policy</h1>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '2.5rem' }}>Last updated: February 2026</p>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.85, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Functional cookies</h2>
          <p>Always active. Stores currency preference, dark/light theme, and language in localStorage. No data leaves your device.</p>
        </div>
        <div>
          <h2 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Analytics</h2>
          <p>Optional. Aggregate page views, no personal identifiers. Active only with consent.</p>
        </div>
        <div>
          <h2 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Advertising</h2>
          <p>Optional. Google AdSense contextual ads shown below calculator results only. Active only with explicit consent.</p>
        </div>
        <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '6px', padding: '1.25rem' }}>
          <p style={{ color: 'var(--text-primary)', marginBottom: '0.75rem', fontWeight: 500 }}>Manage your consent</p>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Reset to see the consent banner again and change your preferences.</p>
          <button
            onClick={() => { try { localStorage.removeItem('pf_consent_v1'); window.location.reload(); } catch {} }}
            style={{ padding: '0.4rem 0.9rem', background: 'none', border: '1px solid var(--accent)', borderRadius: '4px', color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', cursor: 'pointer' }}
          >
            Reset consent preferences
          </button>
        </div>
        <div>
          <h2 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>GDPR</h2>
          <p>Plain Figures is operated from Germany. Supervisory authority: German Federal Commissioner for Data Protection (BfDI).</p>
          <p style={{ marginTop: '0.5rem' }}>Contact: <a href='mailto:help@plainfigures.org' style={{ color: 'var(--accent)', textDecoration: 'none' }}>help@plainfigures.org</a></p>
        </div>
      </div>
    </div>
  );
}