'use client';

/**
 * LangSwitcher — lightweight i18n for Plain Figures
 *
 * Strategy: Google Translate iframe is too invasive for a trust-first site.
 * Instead we use a URL-query parameter (?lang=de) + a client-side string map
 * for the 10 most visible UI strings. This keeps the page fast, avoids
 * third-party cookies, and lets users switch language without a reload.
 *
 * To use: import LangSwitcher from '@/components/ui/LangSwitcher'
 *         and drop <LangSwitcher /> in the footer or navbar overflow.
 */

import { useState, useEffect, useRef } from 'react';

export type Lang = 'en' | 'de' | 'fr' | 'es' | 'zh';

export interface LangOption {
  code: Lang;
  label: string;
  flag: string;
  name: string;
}

export const LANGUAGES: LangOption[] = [
  { code: 'en', label: 'EN', flag: '🇬🇧', name: 'English' },
  { code: 'de', label: 'DE', flag: '🇩🇪', name: 'Deutsch' },
  { code: 'fr', label: 'FR', flag: '🇫🇷', name: 'Français' },
  { code: 'es', label: 'ES', flag: '🇪🇸', name: 'Español' },
  { code: 'zh', label: 'ZH', flag: '🇨🇳', name: '中文' },
];

const LANG_KEY = 'pf_lang_v1';

// ── Core UI strings ── add keys here as the site grows ──────────────────────
const UI_STRINGS: Record<string, Record<Lang, string>> = {
  'Check the maths.': {
    en: 'Check the maths.',
    de: 'Die Zahlen prüfen.',
    fr: 'Vérifiez les calculs.',
    es: 'Comprueba los números.',
    zh: '核实数据。',
  },
  'Without the noise.': {
    en: 'Without the noise.',
    de: 'Ohne das Rauschen.',
    fr: 'Sans le bruit.',
    es: 'Sin el ruido.',
    zh: '简单纯粹。',
  },
  'Search calculators and tools…': {
    en: 'Search calculators and tools…',
    de: 'Rechner suchen…',
    fr: 'Rechercher des outils…',
    es: 'Buscar calculadoras…',
    zh: '搜索计算工具…',
  },
  'Learning Centre': {
    en: 'Learning Centre',
    de: 'Lernbereich',
    fr: 'Centre d\'apprentissage',
    es: 'Centro de aprendizaje',
    zh: '学习中心',
  },
  'Personal Finance & Lifestyle': {
    en: 'Personal Finance & Lifestyle',
    de: 'Privatfinanzen & Lebensstil',
    fr: 'Finances personnelles & style de vie',
    es: 'Finanzas personales y estilo de vida',
    zh: '个人理财与生活',
  },
  'Professional Tools': {
    en: 'Professional Tools',
    de: 'Professionelle Werkzeuge',
    fr: 'Outils professionnels',
    es: 'Herramientas profesionales',
    zh: '专业工具',
  },
  'Recently Used': {
    en: 'Recently Used',
    de: 'Zuletzt verwendet',
    fr: 'Récemment utilisés',
    es: 'Usados recientemente',
    zh: '最近使用',
  },
  'No advice. No noise. Just the maths.': {
    en: 'No advice. No noise. Just the maths.',
    de: 'Keine Beratung. Kein Lärm. Nur Zahlen.',
    fr: 'Pas de conseil. Juste les chiffres.',
    es: 'Sin consejos. Solo los números.',
    zh: '无建议。无噪音。只有数字。',
  },
};

// Expose translation function globally so other components can use it
if (typeof window !== 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).__pfTranslate = (key: string, lang: Lang): string => {
    return UI_STRINGS[key]?.[lang] ?? key;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).__pfLang = 'en';
}

export function getCurrentLang(): Lang {
  if (typeof window === 'undefined') return 'en';
  try {
    const stored = localStorage.getItem(LANG_KEY) as Lang | null;
    if (stored && LANGUAGES.find(l => l.code === stored)) return stored;
  } catch {}
  // Also check URL param
  const params = new URLSearchParams(window.location.search);
  const param = params.get('lang') as Lang | null;
  if (param && LANGUAGES.find(l => l.code === param)) return param;
  return 'en';
}

export function t(key: string): string {
  if (typeof window === 'undefined') return key;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lang = (window as any).__pfLang as Lang || 'en';
  return UI_STRINGS[key]?.[lang] ?? key;
}

export default function LangSwitcher({ compact = false }: { compact?: boolean }) {
  const [lang, setLang] = useState<Lang>('en');
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const current = getCurrentLang();
    setLang(current);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).__pfLang = current;
  }, []);

  // Close on click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const switchLang = (code: Lang) => {
    setLang(code);
    setOpen(false);
    try { localStorage.setItem(LANG_KEY, code); } catch {}
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).__pfLang = code;

    // Trigger a custom event so other components can re-render
    window.dispatchEvent(new CustomEvent('pf-lang-change', { detail: { lang: code } }));

    // Update URL param without reload (for crawlers)
    if (code !== 'en') {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', code);
      window.history.replaceState({}, '', url.toString());
    } else {
      const url = new URL(window.location.href);
      url.searchParams.delete('lang');
      window.history.replaceState({}, '', url.toString());
    }
  };

  const current = LANGUAGES.find(l => l.code === lang) ?? LANGUAGES[0];

  return (
    <div ref={wrapRef} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={`Language: ${current.name}. Click to change.`}
        aria-expanded={open}
        aria-haspopup="listbox"
        title={`Language: ${current.name}`}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.3rem',
          padding: compact ? '0.22rem 0.5rem' : '0.28rem 0.6rem',
          background: open ? 'var(--bg-surface)' : 'var(--bg-elevated)',
          border: `1px solid ${open ? 'var(--accent)' : 'var(--border-light)'}`,
          borderRadius: '4px',
          cursor: 'pointer',
          fontFamily: 'var(--font-mono)',
          color: 'var(--text-secondary)',
          transition: 'all 0.15s ease',
          outline: 'none',
          lineHeight: 1,
        }}
      >
        <span style={{ fontSize: '0.9rem' }} aria-hidden="true">{current.flag}</span>
        {!compact && (
          <span style={{ fontSize: '0.68rem', letterSpacing: '0.04em' }}>{current.label}</span>
        )}
        <span style={{ fontSize: '0.52rem', color: 'var(--text-muted)' }} aria-hidden="true">▾</span>
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Select language"
          className="currency-dropdown"
          style={{
            position: 'absolute',
            bottom: compact ? 'calc(100% + 6px)' : undefined,
            top: compact ? undefined : 'calc(100% + 6px)',
            right: 0,
            minWidth: '170px',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-light)',
            borderRadius: '6px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
            zIndex: 300,
            overflow: 'hidden',
          }}
        >
          <div style={{ padding: '0.4rem 0.75rem 0.25rem', fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', borderBottom: '1px solid var(--border)' }}>
            Language
          </div>
          {LANGUAGES.map(l => (
            <button
              key={l.code}
              role="option"
              aria-selected={l.code === lang}
              onClick={() => switchLang(l.code)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
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
              <span style={{ fontSize: '1rem', lineHeight: 1 }}>{l.flag}</span>
              <span style={{ flex: 1, fontSize: '0.78rem', color: 'var(--text-primary)' }}>{l.name}</span>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{l.label}</span>
              {l.code === lang && (
                <span style={{ fontSize: '0.65rem', color: 'var(--accent)', marginLeft: '0.25rem' }} aria-hidden="true">✓</span>
              )}
            </button>
          ))}
          <div style={{ padding: '0.35rem 0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            UI strings only · Core calculations unchanged
          </div>
        </div>
      )}
    </div>
  );
}
