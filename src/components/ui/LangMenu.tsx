'use client';

import { useState, useRef, useEffect } from 'react';

// Supported translation targets — we use the browser's built-in translate
// attribute + a manual trigger approach (no Google Translate widget noise)
const LANGUAGES = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'de', label: 'German', native: 'Deutsch' },
  { code: 'fr', label: 'French', native: 'Français' },
  { code: 'es', label: 'Spanish', native: 'Español' },
  { code: 'zh-CN', label: 'Mandarin', native: '中文' },
  { code: 'nl', label: 'Dutch', native: 'Nederlands' },
  { code: 'sv', label: 'Swedish', native: 'Svenska' },
  { code: 'da', label: 'Danish', native: 'Dansk' },
  { code: 'ja', label: 'Japanese', native: '日本語' },
] as const;

type LangCode = (typeof LANGUAGES)[number]['code'];

const LANG_KEY = 'pf_lang_v1';

// Trigger Google Translate programmatically (non-widget approach)
function triggerGoogleTranslate(langCode: string) {
  if (langCode === 'en') {
    // Reset: clear stored lang and reload the page (most reliable GT reset)
    try { localStorage.removeItem(LANG_KEY); } catch {}
    // Remove Google Translate cookie and reload
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + window.location.hostname + ';';
    window.location.reload();
    return;
  }

  // Dynamically load Google Translate if not already loaded
  if (!document.getElementById('google-translate-script')) {
    const script = document.createElement('script');
    script.id = 'google-translate-script';
    script.src = 'https://translate.google.com/translate_a/element.js?cb=initGT';
    document.head.appendChild(script);

    (window as any).initGT = function () {
      new (window as any).google.translate.TranslateElement(
        { pageLanguage: 'en', autoDisplay: false },
        'gt-container'
      );
      setTimeout(() => applyLang(langCode), 800);
    };
  } else {
    applyLang(langCode);
  }

  try { localStorage.setItem(LANG_KEY, langCode); } catch {}
}

function applyLang(langCode: string) {
  const select = document.querySelector<HTMLSelectElement>('.goog-te-combo');
  if (select) {
    select.value = langCode;
    select.dispatchEvent(new Event('change'));
  }
}

export default function LangMenu() {
  const [lang, setLang] = useState<LangCode>('en');
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LANG_KEY) as LangCode | null;
      if (saved && LANGUAGES.find(l => l.code === saved)) setLang(saved);
    } catch {}
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const select = (code: LangCode) => {
    setLang(code);
    setOpen(false);
    triggerGoogleTranslate(code);
  };

  const current = LANGUAGES.find(l => l.code === lang)!;

  return (
    <div ref={wrapRef} style={{ position: 'relative' }}>
      {/* Hidden Google Translate mount point */}
      <div id="gt-container" style={{ display: 'none' }} aria-hidden="true" />

      <button
        onClick={() => setOpen(o => !o)}
        aria-label={`Language: ${current.label}. Click to change.`}
        aria-expanded={open}
        aria-haspopup="listbox"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem',
          padding: '0.22rem 0.55rem',
          background: lang !== 'en' ? 'var(--accent-dim)' : 'transparent',
          border: `1px solid ${lang !== 'en' ? 'var(--accent)' : 'var(--border)'}`,
          borderRadius: '3px',
          cursor: 'pointer',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.68rem',
          color: lang !== 'en' ? 'var(--accent)' : 'var(--text-muted)',
          letterSpacing: '0.04em',
          outline: 'none',
          transition: 'all 0.15s ease',
        }}
        title="Translate this page"
      >
        <span aria-hidden="true" style={{ fontSize: '0.85rem' }}>⊕</span>
        <span>{current.code === 'en' ? 'Translate' : current.native}</span>
        {lang !== 'en' && <span aria-hidden="true" style={{ fontSize: '0.6rem' }}>✓</span>}
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Select language"
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            right: 0,
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-light)',
            borderRadius: '6px',
            boxShadow: '0 -8px 24px rgba(0,0,0,0.35)',
            zIndex: 200,
            overflow: 'hidden',
            minWidth: '160px',
          }}
        >
          <div style={{ padding: '0.4rem 0.75rem 0.25rem', fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', borderBottom: '1px solid var(--border)' }}>
            Machine translation
          </div>
          {LANGUAGES.map(l => (
            <button
              key={l.code}
              role="option"
              aria-selected={l.code === lang}
              onClick={() => select(l.code as LangCode)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.75rem',
                width: '100%',
                padding: '0.5rem 0.75rem',
                background: l.code === lang ? 'var(--accent-dim)' : 'transparent',
                border: 'none',
                borderBottom: '1px solid var(--border)',
                cursor: 'pointer',
                textAlign: 'left',
                fontFamily: 'var(--font-mono)',
                transition: 'background 0.1s ease',
              }}
              onMouseEnter={e => { if (l.code !== lang) e.currentTarget.style.background = 'var(--bg-surface)'; }}
              onMouseLeave={e => { if (l.code !== lang) e.currentTarget.style.background = 'transparent'; }}
            >
              <span style={{ fontSize: '0.75rem', color: 'var(--text-primary)' }}>{l.native}</span>
              <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>{l.label}</span>
              {l.code === lang && <span style={{ fontSize: '0.62rem', color: 'var(--accent)' }}>✓</span>}
            </button>
          ))}
          <div style={{ padding: '0.4rem 0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--text-muted)', lineHeight: 1.5, borderTop: '1px solid var(--border)' }}>
            Powered by Google Translate. Numbers are not translated.
          </div>
        </div>
      )}
    </div>
  );
}
