'use client';

import Link from 'next/link';
import { ToolMeta } from '@/lib/siteData';

interface RelatedToolsProps {
  tools: ToolMeta[];
  currentHref: string;
}

export default function RelatedTools({ tools, currentHref }: RelatedToolsProps) {
  const filtered = tools.filter(t => t.href !== currentHref).slice(0, 3);
  if (!filtered.length) return null;

  return (
    <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.65rem',
        color: 'var(--text-muted)',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        marginBottom: '0.85rem',
      }}>
        Related Tools
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.6rem' }}>
        {filtered.map(tool => (
          <Link key={tool.href} href={tool.href} style={{ textDecoration: 'none' }}>
            <div style={{
              padding: '0.85rem 1rem',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              transition: 'all 0.15s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-elevated)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--bg-surface)')}
            >
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.62rem',
                color: 'var(--text-muted)',
                marginBottom: '0.3rem',
                letterSpacing: '0.06em',
              }}>
                {tool.professional ? 'PROFESSIONAL' : 'CALCULATOR'} {tool.code}
              </div>
              <div style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                color: 'var(--text-primary)',
                fontWeight: 400,
              }}>
                {tool.title}
              </div>
              <div style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                marginTop: '0.25rem',
                lineHeight: 1.4,
              }}>
                {tool.description.split('.')[0]}.
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
