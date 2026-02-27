'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCurrency, CURRENCIES } from '@/lib/CurrencyContext';

const ALL_LINKS = [
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
  null, // separator
  { href: '/bi', label: 'BI', pro: true },
  { href: '/hlv', label: 'Life Insurance', pro: true },
  { href: '/cyber', label: 'Cyber Risk', pro: true },
];

export default function Navbar() {
  const pathname = usePathname();
  const { currency, setCurrency } = useCurrency();

  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 100, height: '56px', background: 'rgba(10,14,20,0.97)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', padding: '0 1.5rem', gap: '1rem' }}>
      <Link href="/" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 500, color: 'var(--text-primary)', textDecoration: 'none', letterSpacing: '0.12em', textTransform: 'uppercase', flexShrink: 0 }}>
        Plain Figures
      </Link>
      <div style={{ width: '1px', height: '18px', background: 'var(--border)', flexShrink: 0 }} />
      <div style={{ display: 'flex', gap: '0.15rem', flex: 1, overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' as any }}>
        {ALL_LINKS.map((link, i) => {
          if (!link) return <div key={i} style={{ width: '1px', height: '18px', background: 'var(--border)', flexShrink: 0, alignSelf: 'center', margin: '0 0.2rem' }} />;
          const active = pathname === link.href;
          return (
            <Link key={link.href} href={link.href} style={{ padding: '0.25rem 0.55rem', borderRadius: '3px', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', textDecoration: 'none', letterSpacing: '0.02em', color: active ? (link.pro ? '#d4a843' : 'var(--text-primary)') : 'var(--text-muted)', background: active ? (link.pro ? 'rgba(212,168,67,0.1)' : 'var(--bg-elevated)') : 'transparent', border: active ? `1px solid ${link.pro ? 'rgba(212,168,67,0.3)' : 'var(--border-light)'}` : '1px solid transparent', whiteSpace: 'nowrap', transition: 'all 0.15s ease' }}>
              {link.label}
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
