'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { isDismissed, dismiss } from '@/lib/localStorage';

interface BannerConfig {
  key: string;
  text: string;
  links: { label: string; href: string }[];
}

function getCurrentBanner(): BannerConfig | null {
  const month = new Date().getMonth() + 1; // 1-12
  if (month === 1) return {
    key: 'jan-2026',
    text: 'New year, new numbers. ISA allowance resets in April — good time to review your savings and pension contributions.',
    links: [{ label: 'Savings', href: '/savings' }, { label: 'Retirement', href: '/retirement' }, { label: 'Save Goal', href: '/save-goal' }],
  };
  if (month === 3) return {
    key: 'mar-tax-2026',
    text: 'UK tax year ends 5 April. Last chance to use your ISA allowance (£20,000) and pension annual allowance.',
    links: [{ label: 'Take-Home', href: '/take-home' }, { label: 'Retirement', href: '/retirement' }],
  };
  if (month === 4) return {
    key: 'apr-tax-2026',
    text: 'New UK tax year. 2025/26 tax bands now apply — check if your take-home has changed.',
    links: [{ label: 'Salary Take-Home', href: '/take-home' }, { label: 'Mortgage Affordability', href: '/affordability' }],
  };
  if (month === 9) return {
    key: 'sep-2026',
    text: 'Autumn is a common time for remortgaging. Run your numbers before your deal ends.',
    links: [{ label: 'Mortgage', href: '/mortgage' }, { label: 'Overpayment', href: '/overpayment' }, { label: 'Offset', href: '/offset' }],
  };
  return null;
}

export default function SeasonalBanner() {
  const [visible, setVisible] = useState(false);
  const [banner, setBanner] = useState<BannerConfig | null>(null);

  useEffect(() => {
    const b = getCurrentBanner();
    if (b && !isDismissed(b.key)) {
      setBanner(b);
      setVisible(true);
    }
  }, []);

  if (!visible || !banner) return null;

  const handleDismiss = () => {
    dismiss(banner.key);
    setVisible(false);
  };

  return (
    <div style={{
      background: 'var(--bg-elevated)',
      border: '1px solid var(--border)',
      borderLeft: '3px solid var(--accent)',
      borderRadius: '4px',
      padding: '0.85rem 1.25rem',
      marginBottom: '1.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      flexWrap: 'wrap',
    }}>
      <div style={{ flex: 1, minWidth: '200px' }}>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.62rem',
          color: 'var(--accent)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: '0.25rem',
        }}>
          Timely
        </div>
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          {banner.text}
        </div>
      </div>
      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
        {banner.links.map(l => (
          <Link key={l.href} href={l.href} style={{ textDecoration: 'none' }}>
            <div style={{
              padding: '0.3rem 0.7rem',
              background: 'var(--accent-dim)',
              border: '1px solid var(--accent)',
              borderRadius: '4px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              color: 'var(--accent)',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}>
              {l.label} →
            </div>
          </Link>
        ))}
        <button onClick={handleDismiss} style={{
          background: 'none',
          border: 'none',
          color: 'var(--text-muted)',
          cursor: 'pointer',
          fontSize: '0.8rem',
          padding: '0.25rem',
          lineHeight: 1,
        }} aria-label="Dismiss">✕</button>
      </div>
    </div>
  );
}
