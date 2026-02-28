'use client';

/**
 * LangSwitcher ”” Plain Figures lightweight i18n
 *
 * Architecture:
 * - 5 supported languages: English, German, French, Spanish, Mandarin
 * - Locale JSON files loaded from /public/locales/{lang}.json
 * - String lookup via t(key, dict) from @/lib/i18n
 * - Language persisted to localStorage + URL ?lang= param for crawlers
 * - Custom event 'pf-lang-change' broadcast so other components can re-render
 * - detectBrowserLang() auto-selects on first visit (no stored preference)
 *
 * SEO (current ”” UI-only i18n):
 * - hreflang tags in layout.tsx metadata.alternates (all pointing to same URL)
 * - ?lang=de URL parameter readable by crawlers
 *
 * SEO (future ”” full route-based i18n):
 * - Add [locale] dynamic segment: /app/[locale]/page.tsx
 * - hreflang: https://plainfigures.org/de/mortgage etc.
 * - Use next-intl or i18next (see /src/lib/i18n.ts for migration guide)
 *
 * Usage:
 *   import LangSwitcher from '@/components/ui/LangSwitcher';
 *   <LangSwitcher compact /> ”” flag-only button (for navbar)
 *   <LangSwitcher />         ”” flag + label button (for footer)
 *
 *   To translate a string in another component:
 *   import { useLang } from '@/components/ui/LangSwitcher';
 *   const { t } = useLang();
 *   <span>{t('nav.learn')}</span>
 */

import { useState, useEffect, useRef, createContext, useContext, useCallback } from 'react';
import { detectBrowserLang, loadLocale, t as tFn } from '@/lib/i18n';

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

// â”€â”€ Context so any component can call t() without prop-drilling â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
interface LangContextType {
  lang: Lang;
  t: (key: string) => string;
}

const LangContext = createContext<LangContextType>({
  lang: 'en',
  t: (key: string) => key,
});

export function useLang() {
  return useContext(LangContext);
}

// â”€â”€ Provider ”” wraps the app; LangSwitcher is just the UI trigger â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dict, setDict] = useState<Record<string, Record<string, string>>>({});

  useEffect(() => {
    // Only use browser detection if user has never made an explicit choice
    // This prevents auto-switching to German just because the browser is set to DE
    const stored = (() => { try { return localStorage.getItem('pf_lang_v1'); } catch { return null; } })();
    const lang = (stored && ['en','de','fr','es','zh'].includes(stored)) ? stored as Lang : 'en';
    setLang(lang);
    loadLocale(lang).then(setDict);
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const code = (e as CustomEvent<{ lang: Lang }>).detail.lang;
      setLang(code);
      loadLocale(code).then(setDict);
    };
    window.addEventListener('pf-lang-change', handler);
    return () => window.removeEventListener('pf-lang-change', handler);
  }, []);

  const translate = useCallback(
    (key: string) => tFn(key, dict),
    [dict]
  );

  return (
    <LangContext.Provider value={{ lang, t: translate }}>
      {children}
    </LangContext.Provider>
  );
}

// â”€â”€ Utility: get current lang synchronously (for non-React use) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export function getCurrentLang(): Lang {
  if (typeof window === 'undefined') return 'en';
  try {
    const stored = localStorage.getItem(LANG_KEY) as Lang | null;
    if (stored && LANGUAGES.find(l => l.code === stored)) return stored;
  } catch {}
  const params = new URLSearchParams(window.location.search);
  const param = params.get('lang') as Lang | null;
  if (param && LANGUAGES.find(l => l.code === param)) return param;
  return detectBrowserLang();
}

// â”€â”€ LangSwitcher UI component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function LangSwitcher({ compact = false }: { compact?: boolean }) {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const switchLang = (code: Lang) => {
    setOpen(false);
    try { localStorage.setItem(LANG_KEY, code); } catch {}

    // Update URL param (for crawlers + sharable links)
    if (code !== 'en') {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', code);
      window.history.replaceState({}, '', url.toString());
    } else {
      const url = new URL(window.location.href);
      url.searchParams.delete('lang');
      window.history.replaceState({}, '', url.toString());
    }

    // Broadcast to all LangProviders + subscribers
    window.dispatchEvent(new CustomEvent('pf-lang-change', { detail: { lang: code } }));
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
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
        onMouseLeave={e => {
          if (!open) {
            e.currentTarget.style.borderColor = 'var(--border-light)';
            e.currentTarget.style.color = 'var(--text-secondary)';
          }
        }}
      >
        <span style={{ fontSize: compact ? '0.85rem' : '0.9rem', lineHeight: 1 }} aria-hidden="true">{current.flag}</span>
        {!compact && <span style={{ fontSize: '0.68rem', letterSpacing: '0.04em' }}>{current.label}</span>}
        <span style={{ fontSize: '0.52rem', color: 'var(--text-muted)' }} aria-hidden="true">▾</span>
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Select language"
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            
            right: 0,
            minWidth: '170px',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-light)',
            borderRadius: '6px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
            zIndex: 300,
            overflow: 'hidden',
            animation: 'dropdown-in 0.1s ease forwards',
          }}
        >
          <div style={{
            padding: '0.4rem 0.75rem 0.25rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.58rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            borderBottom: '1px solid var(--border)',
          }}>
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
              <span style={{ fontSize: '1rem', lineHeight: 1, flexShrink: 0 }}>{l.flag}</span>
              <span style={{ flex: 1, fontSize: '0.78rem', color: 'var(--text-primary)' }}>{l.name}</span>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{l.label}</span>
              {l.code === lang && (
                <span style={{ fontSize: '0.65rem', color: 'var(--accent)', marginLeft: '0.25rem' }} aria-hidden="true">âœ“</span>
              )}
            </button>
          ))}
          <div style={{
            padding: '0.35rem 0.75rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.58rem',
            color: 'var(--text-muted)',
            lineHeight: 1.5,
          }}>
            UI strings only · Calculations unchanged
          </div>
        </div>
      )}
    </div>
  );
}

