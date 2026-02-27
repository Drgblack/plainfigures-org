import Link from 'next/link';
import { ReactNode } from 'react';

interface CalcPageWrapperProps {
  code: string;
  title: string;
  description: string;
  children: ReactNode;
}

export default function CalcPageWrapper({ code, title, description, children }: CalcPageWrapperProps) {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 2rem' }}>
      {/* Breadcrumb */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.72rem',
        color: 'var(--text-muted)',
        letterSpacing: '0.08em',
        marginBottom: '2rem',
      }}>
        <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
          PLAIN FIGURES
        </Link>
        <span>/</span>
        <span style={{ color: 'var(--text-secondary)' }}>{code}</span>
      </div>

      {/* Page header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
          fontWeight: 400,
          color: 'var(--text-primary)',
          letterSpacing: '-0.02em',
          marginBottom: '0.6rem',
        }}>
          {title}
        </h1>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.9rem',
          color: 'var(--text-secondary)',
          fontWeight: 300,
          lineHeight: 1.6,
          maxWidth: '560px',
        }}>
          {description}
        </p>
      </div>

      {/* Calculator */}
      <div style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        borderRadius: '8px',
        padding: '2rem',
      }}>
        {children}
      </div>
    </div>
  );
}
