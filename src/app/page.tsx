'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ALL_TOOLS, PERSONAL_TOOLS, PROFESSIONAL_TOOLS, ToolMeta, ToolPreviewResult } from '@/lib/siteData';
import { getRecentHrefs, getSavedCalcs, deleteSavedCalc, SavedCalc } from '@/lib/localStorage';
import SeasonalBanner from '@/components/ui/SeasonalBanner';
import { useLang } from '@/components/ui/LangSwitcher';

const FEATURED_GUIDES = [
  { href: '/learn/mortgage-repayment', title: 'How Mortgage Repayment Works', readTime: '5 min' },
  { href: '/learn/compound-interest', title: 'Understanding Compound Interest', readTime: '4 min' },
  { href: '/learn/salary-take-home', title: 'Salary Take-Home: How It's Calculated', readTime: '7 min' },
  { href: '/learn/rent-vs-buy', title: 'Rent vs Buy: The Key Numbers', readTime: '6 min' },
  { href: '/learn/loan-repayment', title: 'Loan Repayment & True APR', readTime: '5 min' },
  { href: '/learn/tdee', title: 'TDEE & Calorie Needs Explained', readTime: '5 min' },
];

function Sparkline({ path, color = 'var(--accent)' }: { path?: string; color?: string }) {
  if (!path) return null;
  return (
    <svg viewBox="0 0 60 20" width="60" height="20" style={{ flexShrink: 0, opacity: 0.5 }} aria-hidden="true">
      <path d={path} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CalcRowPreview({ results, professional }: { results: ToolPreviewResult[]; professional?: boolean }) {
  return (
    <div style={{
      position: 'absolute',
      right: '3rem',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'var(--bg-elevated)',
      border: `1px solid ${professional ? 'rgba(212,168,67,0.35)' : 'var(--border-light)'}`,
      borderRadius: '6px',
      padding: '0.75rem 1rem',
      minWidth: '180px',
      boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
      zIndex: 10,
      pointerEvents: 'none',
    }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
        Sample output
      </div>
      {results.map((r, i) => (
        <div key={i} style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          gap: '0.75rem',
          padding: '0.3rem 0',
          borderTop: i > 0 ? '1px solid var(--border)' : 'none',
        }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', flexShrink: 0 }}>
            {r.label}
          </span>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: professional ? '#d4a843' : 'var(--accent)', fontWeight: 500 }}>
              {r.value}
            </span>
            {r.sub && (
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
                {r.sub}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function CalcRow({ tool, professional }: { tool: ToolMeta; professional?: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={tool.href}
      className="calc-link"
      style={{ borderLeft: professional ? '2px solid rgba(212,168,67,0.4)' : 'none', position: 'relative' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: professional ? '#d4a843' : 'var(--text-muted)', letterSpacing: '0.06em', flexShrink: 0 }}>{tool.code}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: 500, marginBottom: '0.3rem', letterSpacing: '-0.01em' }}>{tool.title}</div>
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, fontWeight: 300, marginBottom: '0.6rem' }}>{tool.description}</div>
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {tool.tags.map(tag => (
            <span key={tag} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)', border: `1px solid ${professional ? 'rgba(212,168,67,0.2)' : 'var(--border)'}`, borderRadius: '3px', padding: '0.12rem 0.45rem', letterSpacing: '0.04em' }}>{tag}</span>
          ))}
          {tool.learnHref && (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: '#2ec88a', border: '1px solid rgba(46,200,138,0.25)', borderRadius: '3px', padding: '0.12rem 0.45rem', letterSpacing: '0.04em' }}>guide ↗</span>
          )}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {tool.sparkline && <Sparkline path={tool.sparkline} color={professional ? '#d4a843' : 'var(--accent)'} />}
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: 'var(--text-muted)', flexShrink: 0 }}>→</div>
      </div>
      {/* Hover preview panel */}
      {hovered && tool.preview && tool.preview.length > 0 && (
        <CalcRowPreview results={tool.preview} professional={professional} />
      )}
    </Link>
  );
}

function CalcList({ tools, professional }: { tools: ToolMeta[]; professional?: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)', borderRadius: '8px', overflow: 'hidden', border: `1px solid ${professional ? 'rgba(212,168,67,0.2)' : 'var(--border)'}` }}>
      {tools.map(tool => <CalcRow key={tool.href} tool={tool} professional={professional} />)}
    </div>
  );
}

function SearchResults({ query }: { query: string }) {
  const q = query.toLowerCase().trim();
  const results = ALL_TOOLS.filter(t =>
    t.title.toLowerCase().includes(q) ||
    t.description.toLowerCase().includes(q) ||
    t.tags.some(tag => tag.toLowerCase().includes(q))
  );
  if (!q) return null;
  return (
    <div style={{ marginBottom: '2.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
        </div>
        <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
      </div>
      {results.length === 0 ? (
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)', padding: '1.5rem', textAlign: 'center', background: 'var(--bg-surface)', borderRadius: '6px', border: '1px solid var(--border)' }}>
          No tools match &ldquo;{query}&rdquo;
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border)' }}>
          {results.map(tool => <CalcRow key={tool.href} tool={tool} professional={tool.professional} />)}
        </div>
      )}
    </div>
  );
}

function RecentlyUsed() {
  const { t } = useLang();
  const [recentTools, setRecentTools] = useState<ToolMeta[]>([]);
  useEffect(() => {
    const hrefs = getRecentHrefs();
    const tools = hrefs.map(h => ALL_TOOLS.find(t => t.href === h)).filter(Boolean) as ToolMeta[];
    setRecentTools(tools);
  }, []);
  if (!recentTools.length) return null;
  return (
    <div style={{ marginBottom: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.85rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{t('home.recently_used')}</div>
        <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.5rem' }}>
        {recentTools.map(tool => (
          <Link key={tool.href} href={tool.href} style={{ textDecoration: 'none' }}>
            <div style={{ padding: '0.75rem 0.9rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '6px', transition: 'all 0.15s ease', display: 'flex', alignItems: 'center', gap: '0.6rem' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-elevated)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--bg-surface)')}
            >
              {tool.sparkline && <Sparkline path={tool.sparkline} color={tool.professional ? '#d4a843' : 'var(--accent)'} />}
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: tool.professional ? '#d4a843' : 'var(--text-muted)', letterSpacing: '0.06em' }}>{tool.code}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-primary)', marginTop: '0.15rem' }}>{tool.title}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function SavedCalcsPanel() {
  const { t } = useLang();
  const [saves, setSaves] = useState<SavedCalc[]>([]);
  const [expanded, setExpanded] = useState(false);
  useEffect(() => { setSaves(getSavedCalcs()); }, []);
  const handleDelete = (id: string) => { deleteSavedCalc(id); setSaves(getSavedCalcs()); };
  if (!saves.length) return null;
  const shown = expanded ? saves : saves.slice(0, 3);
  return (
    <div style={{ marginBottom: '2.5rem', padding: '1.25rem 1.5rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '8px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{t('home.saved_calcs')} ({saves.length})</div>
        {saves.length > 3 && (
          <button onClick={() => setExpanded(e => !e)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.68rem', cursor: 'pointer', letterSpacing: '0.06em' }}>
            {expanded ? 'Show less' : `Show all ${saves.length}`}
          </button>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {shown.map(save => (
          <div key={save.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '5px' }}>
            <Link href={save.toolHref} style={{ textDecoration: 'none', flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem', flexWrap: 'wrap' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-primary)' }}>{save.label}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)' }}>· {save.toolTitle}</div>
              </div>
              <div style={{ display: 'flex', gap: '1.25rem', marginTop: '0.35rem', flexWrap: 'wrap' }}>
                {save.keyResults.slice(0, 3).map(r => (
                  <div key={r.label} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>{r.label}: </span>
                    <span style={{ color: 'var(--text-secondary)' }}>{r.value}</span>
                  </div>
                ))}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                Saved {new Date(save.savedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
              </div>
            </Link>
            <button onClick={() => handleDelete(save.id)} aria-label="Delete" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '0.75rem', flexShrink: 0, padding: '0.25rem', lineHeight: 1 }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--negative)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            >✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  const { t } = useLang();
  const [query, setQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchRef.current?.focus();
        searchRef.current?.select();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const isSearching = query.trim().length > 0;

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 2rem' }}>
      {/* Hero */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>Financial Calculator Hub</div>
        <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 300, color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1.5rem' }}>
          {t('home.tagline_1')}<br /><span style={{ color: 'var(--text-muted)' }}>{t('home.tagline_2')}</span>
        </h1>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '520px', fontWeight: 300, marginBottom: '2rem' }}>
          26 calculators and 16 formula-first guides for personal decisions and professional use. {t('home.disclaimer')} Just numbers you can trust.
        </p>

        {/* Search */}
        <div style={{ position: 'relative', maxWidth: '520px' }}>
          <div style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '1rem', pointerEvents: 'none', lineHeight: 1 }}>⌕</div>
          <input
            ref={searchRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search calculators and tools…"
            aria-label="Search calculators"
            style={{ width: '100%', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '6px', padding: '0.75rem 3.5rem 0.75rem 2.4rem', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', outline: 'none', transition: 'border-color 0.15s ease', boxSizing: 'border-box' }}
            onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
            onBlur={e => (e.target.style.borderColor = 'var(--border)')}
          />
          <div style={{ position: 'absolute', right: '0.85rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
            {query ? (
              <button onClick={() => setQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '0.8rem', padding: 0, pointerEvents: 'all', lineHeight: 1 }} aria-label="Clear">✕</button>
            ) : (
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)', padding: '0.15rem 0.35rem', border: '1px solid var(--border)', borderRadius: '3px' }}>⌘K</span>
            )}
          </div>
        </div>
      </div>

      {/* Seasonal banner */}
      <SeasonalBanner />

      {/* Search results */}
      {isSearching && <SearchResults query={query} />}

      {/* Full directory */}
      {!isSearching && (
        <>
          <RecentlyUsed />
          <SavedCalcsPanel />

          {/* Featured guides */}
          <div style={{ marginBottom: '3rem', padding: '1.25rem 1.5rem', background: 'rgba(46,200,138,0.04)', border: '1px solid rgba(46,200,138,0.15)', borderRadius: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#2ec88a', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Learning Centre</div>
              <Link href="/learn" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#2ec88a', textDecoration: 'none', letterSpacing: '0.06em' }}>{t('home.all_guides')}</Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.5rem' }}>
              {FEATURED_GUIDES.map(({ href, title, readTime }) => (
                <Link key={href} href={href} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.55rem 0.8rem', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '4px', textDecoration: 'none', gap: '0.5rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.73rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{title}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', flexShrink: 0 }}>{readTime}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Personal tools */}
          <div style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>{t('home.personal_section')}</div>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)' }}>{PERSONAL_TOOLS.length} calculators</div>
            </div>
            <CalcList tools={PERSONAL_TOOLS} />
          </div>

          {/* Professional tools */}
          <div style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#d4a843', letterSpacing: '0.14em', textTransform: 'uppercase' }}>{t('home.pro_section')}</div>
              <div style={{ flex: 1, height: '1px', background: 'rgba(212,168,67,0.2)' }} />
              <div style={{ padding: '0.15rem 0.5rem', background: 'rgba(212,168,67,0.1)', border: '1px solid rgba(212,168,67,0.25)', borderRadius: '3px', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#d4a843', letterSpacing: '0.1em' }}>FOR BROKERS & RISK MANAGERS</div>
            </div>
            <CalcList tools={PROFESSIONAL_TOOLS} professional />
          </div>

          <div style={{ padding: '1.25rem 1.5rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.6, letterSpacing: '0.02em' }}>
            Plain Figures does not provide financial, medical, or insurance advice. All calculations are indicative only. Always consult a qualified adviser before making decisions.
          </div>
        </>
      )}
    </div>
  );
}
