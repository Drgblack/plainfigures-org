'use client';

import { useEffect, useState } from 'react';
import { getTheme, setTheme, Theme } from '@/lib/localStorage';

export default function ThemeToggle() {
  const [theme, setThemeState] = useState<Theme>('dark');

  useEffect(() => {
    const t = getTheme();
    setThemeState(t);
    document.documentElement.setAttribute('data-theme', t);
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    setThemeState(next);
  };

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`${theme === 'dark' ? 'Light' : 'Dark'} mode`}
      style={{
        background: 'none',
        border: '1px solid var(--border)',
        borderRadius: '4px',
        padding: '0.3rem 0.55rem',
        cursor: 'pointer',
        color: 'var(--text-muted)',
        fontSize: '0.8rem',
        lineHeight: 1,
        transition: 'all 0.15s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '0.3rem',
      }}
    >
      {theme === 'dark' ? '☀' : '☾'}
    </button>
  );
}
