'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCurrency, CURRENCIES } from '@/lib/CurrencyContext';

const NAV_LINKS = [
  { href: '/mortgage', label: 'Mortgage' },
  { href: '/savings', label: 'Savings' },
  { href: '/rent-vs-buy', label: 'Rent vs Buy' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { currency, setCurrency } = useCurrency();

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      height: '60px',
      background: 'rgba(10, 14, 20, 0.92)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 2rem',
      gap: '2rem',
    }}>
      {/* Logo */}
      <Link href="/" style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.85rem',
        fontWeight: 500,
        color: 'var(--text-primary)',
        textDecoration: 'none',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        flexShrink: 0,
      }}>
        Plain Figures
      </Link>

      {/* Divider */}
      <div style={{ width: '1px', height: '20px', background: 'var(--border)', flexShrink: 0 }} />

      {/* Nav links */}
      <div style={{ display: 'flex', gap: '0.25rem', flex: 1 }}>
        {NAV_LINKS.map(({ href, label }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href} style={{
              padding: '0.35rem 0.75rem',
              borderRadius: '4px',
              fontSize: '0.825rem',
              fontFamily: 'var(--font-mono)',
              textDecoration: 'none',
              letterSpacing: '0.04em',
              color: active ? 'var(--text-primary)' : 'var(--text-muted)',
              background: active ? 'var(--bg-elevated)' : 'transparent',
              border: active ? '1px solid var(--border-light)' : '1px solid transparent',
              transition: 'all 0.15s ease',
            }}>
              {label}
            </Link>
          );
        })}
      </div>

      {/* Currency selector */}
      <select
        value={currency.code}
        onChange={e => {
          const found = CURRENCIES.find(c => c.code === e.target.value);
          if (found) setCurrency(found);
        }}
        style={{
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-light)',
          color: 'var(--text-primary)',
          padding: '0.3rem 0.6rem',
          borderRadius: '4px',
          fontSize: '0.8rem',
          fontFamily: 'var(--font-mono)',
          cursor: 'pointer',
          outline: 'none',
          letterSpacing: '0.05em',
        }}
      >
        {CURRENCIES.map(c => (
          <option key={c.code} value={c.code}>
            {c.flag} {c.code}
          </option>
        ))}
      </select>
    </nav>
  );
}
