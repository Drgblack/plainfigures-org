'use client';

import { useState, useRef, useEffect } from 'react';
import { useCountUp } from '@/lib/useCountUp';

// ── InputField ────────────────────────────────────────────────────────────────

interface InputFieldProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  hint?: string;
}

export function InputField({
  label, value, onChange, min = 0, max, step = 1, prefix, suffix, hint
}: InputFieldProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <label style={{
          fontSize: '0.75rem',
          fontFamily: 'var(--font-mono)',
          color: 'var(--text-secondary)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}>
          {label}
        </label>
        {hint && (
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            {hint}
          </span>
        )}
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        background: 'var(--bg)',
        border: `1px solid ${focused ? 'var(--accent)' : 'var(--border)'}`,
        borderRadius: '4px',
        transition: 'border-color 0.15s ease',
        overflow: 'hidden',
      }}>
        {prefix && (
          <span style={{
            padding: '0 0.6rem',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            borderRight: '1px solid var(--border)',
            background: 'var(--bg-surface)',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            lineHeight: '38px',
          }}>
            {prefix}
          </span>
        )}
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={e => onChange(parseFloat(e.target.value) || 0)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.9rem',
            padding: '0.5rem 0.75rem',
            width: '100%',
          }}
        />
        {suffix && (
          <span style={{
            padding: '0 0.6rem',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            borderLeft: '1px solid var(--border)',
            background: 'var(--bg-surface)',
            lineHeight: '38px',
          }}>
            {suffix}
          </span>
        )}
      </div>

      {max && (
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={Math.min(value, max)}
          onChange={e => onChange(parseFloat(e.target.value))}
          style={{ marginTop: '0.2rem' }}
        />
      )}
    </div>
  );
}

// ── ResultCard ────────────────────────────────────────────────────────────────

interface ResultCardProps {
  label: string;
  value: string;
  size?: 'large' | 'normal';
  color?: 'default' | 'positive' | 'negative' | 'warning';
  sub?: string;
}

export function ResultCard({ label, value, size = 'normal', color = 'default', sub }: ResultCardProps) {
  const colorMap = {
    default: 'var(--text-primary)',
    positive: 'var(--positive)',
    negative: 'var(--negative)',
    warning: 'var(--warning)',
  };

  return (
    <div
      role="status"
      aria-label={`${label}: ${value}`}
      style={{
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border)',
        borderRadius: '6px',
        padding: size === 'large' ? '1.25rem 1.5rem' : '0.9rem 1.1rem',
        transition: 'border-color 0.2s ease',
      }}
    >
      <div style={{
        fontSize: '0.7rem',
        fontFamily: 'var(--font-mono)',
        color: 'var(--text-muted)',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        marginBottom: '0.4rem',
      }}>
        {label}
      </div>
      <div
        className="count-up"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: size === 'large' ? '1.8rem' : '1.2rem',
          fontWeight: 500,
          color: colorMap[color],
          letterSpacing: '-0.02em',
        }}
      >
        {value}
      </div>
      {sub && (
        <div style={{
          fontSize: '0.72rem',
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-mono)',
          marginTop: '0.3rem',
        }}>
          {sub}
        </div>
      )}
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{
        fontSize: '0.68rem',
        fontFamily: 'var(--font-mono)',
        color: 'var(--text-muted)',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        paddingBottom: '0.5rem',
        borderBottom: '1px solid var(--border)',
      }}>
        {title}
      </div>
      {children}
    </div>
  );
}

// ── Divider ───────────────────────────────────────────────────────────────────

export function Divider() {
  return <div style={{ height: '1px', background: 'var(--border)', margin: '0.5rem 0' }} />;
}
