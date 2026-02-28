'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useRef, useId } from 'react';
import { useCurrency, CURRENCIES } from '@/lib/CurrencyContext';
import { recordVisit, getTheme, setTheme } from '@/lib/localStorage';
import LangSwitcher, { useLang } from '@/components/ui/LangSwitcher';
import { ALL_TOOLS } from '@/lib/siteData';

// ── Autocomplete search data: all tools + all learning guides ─────────────────
const SEARCH_ITEMS = [
  ...ALL_TOOLS.map(t => ({
    label: t.title,
    sub: t.tags.slice(0, 2).join(' · '),
    href: t.href,
    professional: t.professional,
  })),
  { label: 'How Mortgage Repayment Calculations Work', sub: 'Guide · 5 min', href: '/learn/mortgage-repayment', professional: false },
  { label: 'Understanding Compound Interest', sub: 'Guide · 4 min', href: '/learn/compound-interest', professional: false },
  { label: 'Rent vs Buy: The Key Numbers to Compare', sub: 'Guide · 6 min', href: '/learn/rent-vs-buy', professional: false },
  { label: 'How Salary Take-Home Is Calculated', sub: 'Guide · 7 min', href: '/learn/salary-take-home', professional: false },
  { label: 'How Mortgage Affordability Is Assessed', sub: 'Guide · 6 min', href: '/learn/mortgage-affordability', professional: false },
  { label: 'How Offset Mortgages Actually Work', sub: 'Guide · 4 min', href: '/learn/offset-mortgage', professional: false },
  { label: 'How Retirement Savings Projections Work', sub: 'Guide · 5 min', href: '/learn/retirement-savings', professional: false },
  { label: 'How to Calculate Your Financial Runway', sub: 'Guide · 4 min', href: '/learn/financial-crisis', professional: false },
  { label: 'TDEE & Calorie Needs: How the Calculation Works', sub: 'Guide · 5 min', href: '/learn/tdee', professional: false },
  { label: 'Loan Repayment: True APR Explained', sub: 'Guide · 5 min', href: '/learn/loan-repayment', professional: false },
  { label: 'Mortgage Overpayment: Savings Impact', sub: 'Guide · 4 min', href: '/learn/mortgage-overpayment', professional: false },
  { label: 'Save for a Goal: Time & Amount Basics', sub: 'Guide · 4 min', href: '/learn/save-for-goal', professional: false },
  { label: 'Subscription Drain: True Long-Term Cost', sub: 'Guide · 4 min', href: '/learn/subscription-drain', professional: false },
  { label: 'Freelance Rate: Working Backwards from Desired Salary', sub: 'Guide · 5 min', href: '/learn/freelance-rate', professional: false },
  { label: 'Lifestyle Inflation: Real Cost Over Time', sub: 'Guide · 5 min', href: '/learn/lifestyle-inflation', professional: false },
  { label: 'Business Interruption Sum Insured: How It Works', sub: 'Guide · 5 min', href: '/learn/business-interruption', professional: true },
];

const CALC_LINKS = [
  { href: '/mortgage', label: 'Mortgage' },
  { href: '/savings', label: 'Savings' },
  { href: '/rent-vs-buy', label: 'Rent vs Buy' },
  { href: '/compound', label: 'Compound' },
  { href: '/loan', label: 'Loan' },
  { href: '/retirement', label: 'Retirement' },
  { href: '/offset', label: 'Offset' },
  { href: '/overpayment', label: 'Overpayment' },
  { href: '/save-goal', label: 'Save Goal' },
  { href: '/take-home', label: 'Take-Home' },
  { href: '/affordability', label: 'Affordability' },
  { href: '/tdee', label: 'TDEE' },
  { href: '/subscriptions', label: 'Subscriptions' },
  { href: '/freelance', label: 'Freelance Rate' },
  { href: '/lifestyle-inflation', label: 'Lifestyle' },
  { href: '/crisis', label: 'Crisis Sim' },
];

const PRO_LINKS = [
  { href: '/bi', label: 'BI' },
  { href: '/hlv', label: 'Life Insurance' },
  { href: '/cyber', label: 'Cyber Risk' },
  { href: '/tcor', label: 'TCOR' },
  { href: '/risk-heatmap', label: 'Risk Heat Map' },
  { href: '/scr', label: 'SCR' },
  { href: '/coverage-gap', label: 'Coverage Gap' },
  { href: '/ltv-cac', label: 'LTV·CAC' },
  { href: '/loss-probability', label: 'Loss Model' },
  { href: '/cyber-limit', label: 'Cyber Limit' },
];

// ── Shared button style helper ────────────────────────────────────────────────
const navBtnStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.35rem',
  padding: '0.28rem 0.6rem',
  background: 'var(--bg-elevated)',
  border: '1px solid var(--border-light)',
  borderRadius: '4px',
  cursor: 'pointer',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.72rem',
  color: 'var(--text-secondary)',
  letterSpacing: '0.04em',
  lineHeight: 1,
  transition: 'all 0.15s ease',
  flexShrink: 0,
  outline: 'none',
  whiteSpace: 'nowrap',
};

function navBtnHover(el: HTMLElement) {
  el.style.borderColor = 'var(--accent)';
  el.style.color = 'var(--text-primary)';
}
function navBtnUnhover(el: HTMLElement, active = false) {
  el.style.borderColor = active ? 'var(--accent)' : 'var(--border-light)';
  el.style.color = active ? 'var(--text-primary)' : 'var(--text-secondary)';
}

// ── Search Autocomplete ───────────────────────────────────────────────────────
function NavSearch() {
  const { t } = useLang();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  const suggestions = query.trim().length > 0
    ? SEARCH_ITEMS.filter(item =>
        item.label.toLowerCase().includes(query.toLowerCase()) ||
        item.sub.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 7)
    : [];

  // Global ⌘K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Click outside to close
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
        setActiveIdx(-1);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!open) setOpen(true);
      setActiveIdx(i => Math.min(i + 1, suggestions.length - 1));
    }
    if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIdx(i => Math.max(i - 1, -1)); }
    if (e.key === 'Escape') { setOpen(false); setActiveIdx(-1); inputRef.current?.blur(); }
    if (e.key === 'Enter' && activeIdx >= 0 && suggestions[activeIdx]) {
      window.location.href = suggestions[activeIdx].href;
      setOpen(false);
      setQuery('');
    }
  };

  const searchLabel = t('nav.search_label') || 'Search calculators and guides';
  const placeholder = t('nav.search_placeholder') || 'Search…';

  return (
    <div ref={wrapRef} style={{ position: 'relative', flexShrink: 0 }}>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <span
          style={{ position: 'absolute', left: '0.55rem', color: 'var(--text-muted)', fontSize: '0.78rem', pointerEvents: 'none', lineHeight: 1 }}
          aria-hidden="true"
        >⌕</span>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(true); setActiveIdx(-1); }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          aria-label={searchLabel}
          aria-expanded={open && suggestions.length > 0}
          aria-haspopup="listbox"
          aria-autocomplete="list"
          aria-controls={listboxId}
          aria-activedescendant={activeIdx >= 0 ? `search-opt-${activeIdx}` : undefined}
          role="combobox"
          className="nav-search-input"
          style={{
            width: '120px',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border)',
            borderRadius: '4px',
            padding: '0.28rem 2rem 0.28rem 1.6rem',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            outline: 'none',
            cursor: 'text',
          }}
          onFocus={e => { setOpen(true); e.currentTarget.style.width = '200px'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
          onBlur={e => { if (!query) e.currentTarget.style.width = '120px'; e.currentTarget.style.borderColor = 'var(--border)'; }}
        />
        {query ? (
          <button
            onClick={() => { setQuery(''); setOpen(false); inputRef.current?.focus(); }}
            aria-label="Clear search"
            style={{ position: 'absolute', right: '0.4rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '0.7rem', padding: '0.1rem', lineHeight: 1 }}
          >✕</button>
        ) : (
          <span
            style={{ position: 'absolute', right: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--text-muted)', padding: '0.1rem 0.3rem', border: '1px solid var(--border)', borderRadius: '2px', pointerEvents: 'none', lineHeight: 1.4 }}
            aria-hidden="true"
          >⌘K</span>
        )}
      </div>

      {/* Autocomplete dropdown */}
      {open && suggestions.length > 0 && (
        <div
          ref={listRef}
          id={listboxId}
          role="listbox"
          aria-label="Search suggestions"
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            right: 0,
            minWidth: '280px',
            maxWidth: '360px',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-light)',
            borderRadius: '6px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
            zIndex: 200,
            overflow: 'hidden',
            animation: 'dropdown-in 0.1s ease forwards',
          }}
        >
          {suggestions.map((item, idx) => (
            <a
              key={item.href}
              id={`search-opt-${idx}`}
              href={item.href}
              role="option"
              aria-selected={idx === activeIdx}
              onClick={() => { setOpen(false); setQuery(''); }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '0.6rem 0.9rem',
                textDecoration: 'none',
                borderBottom: idx < suggestions.length - 1 ? '1px solid var(--border)' : 'none',
                background: idx === activeIdx ? 'var(--bg-surface)' : 'transparent',
                transition: 'background 0.1s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-surface)')}
              onMouseLeave={e => (e.currentTarget.style.background = idx === activeIdx ? 'var(--bg-surface)' : 'transparent')}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: item.professional ? '#d4a843' : 'var(--text-primary)', lineHeight: 1.3 }}>
                {item.label}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                {item.sub}
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Currency Picker ───────────────────────────────────────────────────────────
function CurrencyPicker() {
  const { currency, setCurrency, resolving } = useCurrency();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={wrapRef} style={{ position: 'relative', flexShrink: 0 }}>
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={`Currency: ${currency.name}. Click to change.`}
        aria-expanded={open}
        aria-haspopup="listbox"
        title={`${currency.flag} ${currency.name} (${currency.symbol})`}
        style={{
          ...navBtnStyle,
          opacity: resolving ? 0.6 : 1,
          borderColor: open ? 'var(--accent)' : 'var(--border-light)',
          background: open ? 'var(--bg-surface)' : 'var(--bg-elevated)',
          color: open ? 'var(--text-primary)' : 'var(--text-secondary)',
        }}
        onMouseEnter={e => navBtnHover(e.currentTarget)}
        onMouseLeave={e => navBtnUnhover(e.currentTarget, open)}
      >
        <span style={{ fontSize: '1rem', lineHeight: 1 }} aria-hidden="true">{currency.flag}</span>
        <span style={{ fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.04em' }}>{currency.code}</span>
        <span style={{ fontSize: '0.55rem', color: 'var(--text-muted)' }} aria-hidden="true">▾</span>
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Select currency"
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            right: 0,
            minWidth: '215px',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-light)',
            borderRadius: '6px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
            zIndex: 200,
            overflow: 'hidden',
            animation: 'dropdown-in 0.1s ease forwards',
          }}
        >
          {/* Header */}
          <div style={{ padding: '0.45rem 0.75rem 0.3rem', fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Currency</span>
            {resolving && <span style={{ fontSize: '0.52rem', color: 'var(--accent)', letterSpacing: '0.04em', textTransform: 'none' }}>auto-detected</span>}
          </div>

          {CURRENCIES.map(c => (
            <button
              key={c.code}
              role="option"
              aria-selected={c.code === currency.code}
              onClick={() => { setCurrency(c); setOpen(false); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                width: '100%',
                padding: '0.55rem 0.75rem',
                background: c.code === currency.code ? 'var(--accent-dim)' : 'transparent',
                border: 'none',
                borderBottom: '1px solid var(--border)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'background 0.1s ease',
                fontFamily: 'var(--font-mono)',
              }}
              onMouseEnter={e => { if (c.code !== currency.code) e.currentTarget.style.background = 'var(--bg-surface)'; }}
              onMouseLeave={e => { if (c.code !== currency.code) e.currentTarget.style.background = 'transparent'; }}
            >
              <span style={{ fontSize: '1.1rem', lineHeight: 1, flexShrink: 0 }}>{c.flag}</span>
              <span style={{ flex: 1, fontSize: '0.78rem', color: 'var(--text-primary)' }}>{c.name}</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.04em' }}>{c.code}</span>
              {c.code === currency.code && (
                <span style={{ fontSize: '0.65rem', color: 'var(--accent)', marginLeft: '0.3rem', flexShrink: 0 }} aria-hidden="true">✓</span>
              )}
            </button>
          ))}

          <div style={{ padding: '0.4rem 0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)', lineHeight: 1.5, borderTop: '1px solid var(--border)' }}>
            Saved in browser. Changes all calculators.
          </div>
        </div>
      )}
    </div>
  );
}

// ── Theme Toggle ──────────────────────────────────────────────────────────────
function ThemeToggle() {
  const { t } = useLang();
  const [theme, setThemeState] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const saved = getTheme();
    setThemeState(saved);
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    setThemeState(next);
    document.documentElement.setAttribute('data-theme', next);
  };

  const toLabel = theme === 'dark'
    ? (t('nav.theme_light') || 'Light')
    : (t('nav.theme_dark') || 'Dark');
  const ariaLabel = theme === 'dark'
    ? (t('nav.theme_to_light') || 'Switch to light mode')
    : (t('nav.theme_to_dark') || 'Switch to dark mode');

  return (
    <button
      onClick={toggle}
      aria-label={ariaLabel}
      title={ariaLabel}
      style={navBtnStyle}
      onMouseEnter={e => navBtnHover(e.currentTarget)}
      onMouseLeave={e => navBtnUnhover(e.currentTarget)}
    >
      <span style={{ fontSize: '0.88rem' }} aria-hidden="true">
        {theme === 'dark' ? '☀' : '☾'}
      </span>
      <span style={{ fontSize: '0.68rem' }}>{toLabel}</span>
    </button>
  );
}

// ── Mobile Menu ───────────────────────────────────────────────────────────────
function MobileMenu({ pathname }: { pathname: string }) {
  const isLearn = pathname?.startsWith('/learn');

  return (
    <div style={{
      position: 'absolute',
      top: '56px',
      left: 0,
      right: 0,
      background: 'var(--bg-surface)',
      borderBottom: '1px solid var(--border)',
      boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
      zIndex: 99,
      padding: '0.75rem 1rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0',
      animation: 'menu-slide 0.15s ease forwards',
    }}>
      {/* Learn link */}
      <Link
        href="/learn"
        aria-current={isLearn ? 'page' : undefined}
        style={{
          padding: '0.65rem 0.75rem',
          borderRadius: '4px',
          fontSize: '0.82rem',
          fontFamily: 'var(--font-mono)',
          textDecoration: 'none',
          letterSpacing: '0.04em',
          color: isLearn ? '#2ec88a' : 'var(--nav-link, var(--text-secondary))',
          borderBottom: '1px solid var(--border)',
          display: 'block',
        }}
      >
        Learn ↗
      </Link>

      {/* Personal tools */}
      <div style={{ padding: '0.5rem 0.75rem 0.25rem', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '0.35rem' }}>
        Personal Finance
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.25rem', marginBottom: '0.5rem' }}>
        {CALC_LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            aria-current={pathname === href ? 'page' : undefined}
            style={{
              padding: '0.45rem 0.6rem',
              borderRadius: '3px',
              fontSize: '0.72rem',
              fontFamily: 'var(--font-mono)',
              textDecoration: 'none',
              color: pathname === href ? 'var(--text-primary)' : 'var(--nav-link, var(--text-secondary))',
              background: pathname === href ? 'var(--bg-elevated)' : 'transparent',
              border: pathname === href ? '1px solid var(--border-light)' : '1px solid transparent',
              textAlign: 'center',
            }}
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Pro tools */}
      <div style={{ padding: '0.5rem 0.75rem 0.25rem', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', borderTop: '1px solid var(--border)' }}>
        Professional
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.25rem', marginBottom: '0.5rem' }}>
        {PRO_LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            aria-current={pathname === href ? 'page' : undefined}
            style={{
              padding: '0.45rem 0.6rem',
              borderRadius: '3px',
              fontSize: '0.72rem',
              fontFamily: 'var(--font-mono)',
              textDecoration: 'none',
              color: pathname === href ? '#d4a843' : 'var(--nav-link, var(--text-secondary))',
              background: pathname === href ? 'rgba(212,168,67,0.1)' : 'transparent',
              border: pathname === href ? '1px solid rgba(212,168,67,0.3)' : '1px solid transparent',
              textAlign: 'center',
            }}
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Controls row */}
      <div style={{ display: 'flex', gap: '0.5rem', padding: '0.5rem 0 0.25rem', borderTop: '1px solid var(--border)', flexWrap: 'wrap' }}>
        <CurrencyPicker />
        <LangSwitcher />
        <ThemeToggle />
        <Link
          href="/saved"
          aria-label="Saved calculations"
          style={{ ...navBtnStyle, textDecoration: 'none' }}
          onMouseEnter={e => navBtnHover(e.currentTarget)}
          onMouseLeave={e => navBtnUnhover(e.currentTarget)}
        >
          ⊞ <span style={{ fontSize: '0.68rem' }}>Saved</span>
        </Link>
      </div>
    </div>
  );
}

// ── Main Navbar ───────────────────────────────────────────────────────────────
export default function Navbar() {
  const pathname = usePathname();
  const isLearn = pathname?.startsWith('/learn');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (pathname && pathname !== '/' && !pathname.startsWith('/learn')) {
      recordVisit(pathname);
    }
    // Apply persisted theme
    const t = getTheme();
    document.documentElement.setAttribute('data-theme', t);
  }, [pathname]);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  // Close mobile menu on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      <nav
        role="navigation"
        aria-label="Main navigation"
        style={{
          position: 'sticky', top: 0, zIndex: 100, height: '56px',
          background: 'var(--nav-bg-solid, rgba(10,14,20,0.97))',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', padding: '0 1.25rem', gap: '0.75rem',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label="Plain Figures — Home"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', flexShrink: 0 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/favicon-32.png" alt="" width="20" height="20" style={{ borderRadius: '3px', flexShrink: 0 }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-primary)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Plain Figures
          </span>
        </Link>

        <div style={{ width: '1px', height: '16px', background: 'var(--border)', flexShrink: 0 }} aria-hidden="true" />

        {/* Learn link */}
        <Link
          href="/learn"
          aria-current={isLearn ? 'page' : undefined}
          style={{
            padding: '0.22rem 0.6rem',
            borderRadius: '3px',
            fontSize: '0.7rem',
            fontFamily: 'var(--font-mono)',
            textDecoration: 'none',
            letterSpacing: '0.04em',
            color: isLearn ? '#2ec88a' : 'var(--nav-link, var(--text-secondary))',
            background: isLearn ? 'rgba(46,200,138,0.08)' : 'transparent',
            border: isLearn ? '1px solid rgba(46,200,138,0.25)' : '1px solid var(--border)',
            whiteSpace: 'nowrap',
            flexShrink: 0,
            transition: 'all 0.15s ease',
          }}
        >
          Learn
        </Link>

        <div style={{ width: '1px', height: '16px', background: 'var(--border)', flexShrink: 0 }} aria-hidden="true" />

        {/* Scrollable tool links — hidden on mobile via CSS */}
        <div
          className="nav-tool-links"
          role="list"
          aria-label="Calculator tools"
          style={{ display: 'flex', gap: '0.12rem', flex: 1, overflowX: 'auto', scrollbarWidth: 'none' }}
        >
          {CALC_LINKS.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href} href={href}
                role="listitem"
                aria-current={active ? 'page' : undefined}
                style={{
                  padding: '0.22rem 0.5rem',
                  borderRadius: '3px',
                  fontSize: '0.7rem',
                  fontFamily: 'var(--font-mono)',
                  textDecoration: 'none',
                  letterSpacing: '0.02em',
                  color: active ? 'var(--text-primary)' : 'var(--nav-link, var(--text-secondary))',
                  background: active ? 'var(--bg-elevated)' : 'transparent',
                  border: active ? '1px solid var(--border-light)' : '1px solid transparent',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={e => {
                  if (!active) {
                    e.currentTarget.style.color = 'var(--text-primary)';
                    e.currentTarget.style.background = 'var(--accent-glow)';
                  }
                }}
                onMouseLeave={e => {
                  if (!active) {
                    e.currentTarget.style.color = 'var(--nav-link)';
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                {label}
              </Link>
            );
          })}

          <div style={{ width: '1px', height: '16px', background: 'var(--border)', flexShrink: 0, alignSelf: 'center', margin: '0 0.2rem' }} aria-hidden="true" />

          {PRO_LINKS.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href} href={href}
                role="listitem"
                aria-current={active ? 'page' : undefined}
                style={{
                  padding: '0.22rem 0.5rem',
                  borderRadius: '3px',
                  fontSize: '0.7rem',
                  fontFamily: 'var(--font-mono)',
                  textDecoration: 'none',
                  letterSpacing: '0.02em',
                  color: active ? '#d4a843' : 'var(--nav-link, var(--text-secondary))',
                  background: active ? 'rgba(212,168,67,0.1)' : 'transparent',
                  border: active ? '1px solid rgba(212,168,67,0.3)' : '1px solid transparent',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={e => {
                  if (!active) {
                    e.currentTarget.style.color = '#d4a843';
                    e.currentTarget.style.background = 'rgba(212,168,67,0.07)';
                  }
                }}
                onMouseLeave={e => {
                  if (!active) {
                    e.currentTarget.style.color = 'var(--nav-link)';
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Desktop-only controls */}
        <div className="nav-controls-desktop" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
          <NavSearch />
          <CurrencyPicker />
          <Link
            href="/saved"
            title="Saved calculations"
            aria-label="Saved calculations"
            style={{ ...navBtnStyle, textDecoration: 'none' }}
            onMouseEnter={e => navBtnHover(e.currentTarget)}
            onMouseLeave={e => navBtnUnhover(e.currentTarget)}
          >
            ⊞
          </Link>
          <LangSwitcher compact />
          <ThemeToggle />
        </div>

        {/* Hamburger — mobile only */}
        <button
          className="nav-hamburger"
          onClick={() => setMobileOpen(o => !o)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          style={{
            display: 'none', // overridden in CSS at ≤640px
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '4px',
            padding: '0.4rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          <span style={{ display: 'block', width: '18px', height: '1.5px', background: mobileOpen ? 'var(--text-muted)' : 'var(--text-secondary)', transition: 'all 0.15s', transform: mobileOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none' }} />
          <span style={{ display: 'block', width: '18px', height: '1.5px', background: mobileOpen ? 'transparent' : 'var(--text-secondary)', transition: 'all 0.15s' }} />
          <span style={{ display: 'block', width: '18px', height: '1.5px', background: mobileOpen ? 'var(--text-muted)' : 'var(--text-secondary)', transition: 'all 0.15s', transform: mobileOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none' }} />
        </button>
      </nav>

      {/* Mobile dropdown menu */}
      {mobileOpen && (
        <div id="mobile-menu">
          <MobileMenu pathname={pathname ?? '/'} />
        </div>
      )}
    </>
  );
}
