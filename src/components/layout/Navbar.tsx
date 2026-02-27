'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCurrency, CURRENCIES } from '@/lib/CurrencyContext';

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
  { href: '/bi', label: 'BI', pro: true },
  { href: '/hlv', label: 'Life Insurance', pro: true },
  { href: '/cyber', label: 'Cyber Risk', pro: true },
];

export default function Navbar() {
  const pathname = usePathname();
  const { currency, setCurrency } = useCurrency();
  const isLearn = pathname?.startsWith('/learn');

  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 100, height: '56px', background: 'rgba(10,14,20,0.97)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', padding: '0 1.5rem', gap: '1rem' }}>
      <Link href="/" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 500, color: 'var(--text-primary)', textDecoration: 'none', letterSpacing: '0.12em', textTransform: 'uppercase', flexShrink: 0 }}>
        Plain Figures
      </Link>
      <div style={{ width: '1px', height: '18px', background: 'var(--border)', flexShrink: 0 }} />

      {/* Learn — prominent, green accent */}
      <Link href="/learn" style={{ padding: '0.25rem 0.65rem', borderRadius: '3px', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', textDecoration: 'none', letterSpacing: '0.04em', color: isLearn ? '#2ec88a' : 'var(--text-muted)', background: isLearn ? 'rgba(46,200,138,0.08)' : 'transparent', border: isLearn ? '1px solid rgba(46,200,138,0.25)' : '1px solid var(--border)', whiteSpace: 'nowrap', flexShrink: 0, transition: 'all 0.15s ease' }}>
        Learn
      </Link>

      <div style={{ width: '1px', height: '18px', background: 'var(--border)', flexShrink: 0 }} />

      <div style={{ display: 'flex', gap: '0.15rem', flex: 1, overflowX: 'auto', scrollbarWidth: 'none' }}>
        {CALC_LINKS.map(({ href, label }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href} style={{ padding: '0.25rem 0.55rem', borderRadius: '3px', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', textDecoration: 'none', letterSpacing: '0.02em', color: active ? 'var(--text-primary)' : 'var(--text-muted)', background: active ? 'var(--bg-elevated)' : 'transparent', border: active ? '1px solid var(--border-light)' : '1px solid transparent', whiteSpace: 'nowrap', transition: 'all 0.15s ease' }}>
              {label}
            </Link>
          );
        })}
        <div style={{ width: '1px', height: '18px', background: 'var(--border)', flexShrink: 0, alignSelf: 'center', margin: '0 0.2rem' }} />
        {PRO_LINKS.map(({ href, label }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href} style={{ padding: '0.25rem 0.55rem', borderRadius: '3px', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', textDecoration: 'none', letterSpacing: '0.02em', color: active ? '#d4a843' : 'var(--text-muted)', background: active ? 'rgba(212,168,67,0.1)' : 'transparent', border: active ? '1px solid rgba(212,168,67,0.3)' : '1px solid transparent', whiteSpace: 'nowrap', transition: 'all 0.15s ease' }}>
              {label}
            </Link>
          );
        })}
      </div>

      <select value={currency.code} onChange={e => { const found = CURRENCIES.find(c => c.code === e.target.value); if (found) setCurrency(found); }} style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-light)', color: 'var(--text-primary)', padding: '0.25rem 0.5rem', borderRadius: '3px', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', cursor: 'pointer', outline: 'none', flexShrink: 0 }}>
        {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.flag} {c.code}</option>)}
      </select>
    </nav>
  );
}
