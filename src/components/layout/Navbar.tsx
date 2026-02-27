'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCurrency, CURRENCIES } from '@/lib/CurrencyContext';
import { useState } from 'react';

const PERSONAL_LINKS = [
  { href: '/mortgage', label: 'Mortgage' },
  { href: '/savings', label: 'Savings' },
  { href: '/rent-vs-buy', label: 'Rent vs Buy' },
  { href: '/compound', label: 'Compound' },
  { href: '/loan', label: 'Loan' },
  { href: '/retirement', label: 'Retirement' },
  { href: '/offset', label: 'Offset' },
  { href: '/overpayment', label: 'Overpayment' },
  { href: '/save-goal', label: 'Save for Goal' },
];

const PRO_LINKS = [
  { href: '/bi', label: 'BI Calculator' },
  { href: '/hlv', label: 'Life Insurance' },
  { href: '/cyber', label: 'Cyber Risk' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { currency, setCurrency } = useCurrency();
  const [showMenu, setShowMenu] = useState(false);

  const isPro = PRO_LINKS.some(l => pathname === l.href);

  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 100, height: '60px', background: 'rgba(10,14,20,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', padding: '0 2rem', gap: '1.5rem' }}>
      <Link href="/" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-primary)', textDecoration: 'none', letterSpacing: '0.12em', textTransform: 'uppercase', flexShrink: 0 }}>
        Plain Figures
      </Link>

      <div style={{ width: '1px', height: '20px', background: 'var(--border)', flexShrink: 0 }} />

      {/* Scrollable nav links */}
      <div style={{ display: 'flex', gap: '0.2rem', flex: 1, overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {PERSONAL_LINKS.map(({ href, label }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href} style={{ padding: '0.3rem 0.65rem', borderRadius: '4px', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', textDecoration: 'none', letterSpacing: '0.03em', color: active ? 'var(--text-primary)' : 'var(--text-muted)', background: active ? 'var(--bg-elevated)' : 'transparent', border: active ? '1px solid var(--border-light)' : '1px solid transparent', whiteSpace: 'nowrap', transition: 'all 0.15s ease' }}>
              {label}
            </Link>
          );
        })}

        <div style={{ width: '1px', height: '20px', background: 'var(--border)', flexShrink: 0, margin: '0 0.25rem', alignSelf: 'center' }} />

        {PRO_LINKS.map(({ href, label }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href} style={{ padding: '0.3rem 0.65rem', borderRadius: '4px', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', textDecoration: 'none', letterSpacing: '0.03em', color: active ? '#d4a843' : 'var(--text-muted)', background: active ? 'rgba(212,168,67,0.1)' : 'transparent', border: active ? '1px solid rgba(212,168,67,0.3)' : '1px solid transparent', whiteSpace: 'nowrap', transition: 'all 0.15s ease' }}>
              {label}
            </Link>
          );
        })}
      </div>

      {/* Currency selector */}
      <select value={currency.code} onChange={e => { const found = CURRENCIES.find(c => c.code === e.target.value); if (found) setCurrency(found); }} style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-light)', color: 'var(--text-primary)', padding: '0.3rem 0.6rem', borderRadius: '4px', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', cursor: 'pointer', outline: 'none', letterSpacing: '0.05em', flexShrink: 0 }}>
        {CURRENCIES.map(c => (
          <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
        ))}
      </select>
    </nav>
  );
}
