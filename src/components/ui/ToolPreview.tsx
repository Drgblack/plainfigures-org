'use client';

/**
 * ToolPreview — Plain Figures
 *
 * Shows a static example scenario before the user has entered any inputs.
 * Disappears once the user starts interacting with the calculator.
 *
 * Purpose: reduce blank-state anxiety, show what the tool does at a glance,
 * give immediate value without interaction.
 *
 * Usage:
 *   import ToolPreview from '@/components/ui/ToolPreview';
 *   <ToolPreview id="mortgage" />
 *
 * Each preview is a static, illustrative example — clearly labelled as such.
 * No real calculations run here; values are pre-computed illustrative figures.
 */

import { useState, useEffect } from 'react';
import { useCurrency } from '@/lib/CurrencyContext';

interface PreviewScenario {
  label: string;         // e.g. "Sample: £300,000 mortgage"
  inputs: { key: string; value: string }[];
  outputs: { key: string; value: string; highlight?: boolean }[];
  note?: string;
}

// Static illustrative scenarios for each calculator
// Values are pre-computed and clearly labelled as examples
const PREVIEWS: Record<string, PreviewScenario> = {
  mortgage: {
    label: 'Example scenario',
    inputs: [
      { key: 'Loan amount', value: '£300,000' },
      { key: 'Interest rate', value: '4.5%' },
      { key: 'Term', value: '25 years' },
    ],
    outputs: [
      { key: 'Monthly payment', value: '£1,667', highlight: true },
      { key: 'Total interest', value: '£200,100' },
      { key: 'Total repaid', value: '£500,100' },
    ],
    note: 'Capital and interest repayment',
  },
  savings: {
    label: 'Example scenario',
    inputs: [
      { key: 'Initial deposit', value: '£5,000' },
      { key: 'Monthly contribution', value: '£200' },
      { key: 'Annual interest', value: '4.5%' },
      { key: 'Term', value: '10 years' },
    ],
    outputs: [
      { key: 'Final balance', value: '£35,990', highlight: true },
      { key: 'Total contributed', value: '£29,000' },
      { key: 'Interest earned', value: '£6,990' },
    ],
  },
  compound: {
    label: 'Example scenario',
    inputs: [
      { key: 'Principal', value: '£10,000' },
      { key: 'Annual rate', value: '6%' },
      { key: 'Compounding', value: 'Monthly' },
      { key: 'Term', value: '20 years' },
    ],
    outputs: [
      { key: 'Final amount', value: '£33,102', highlight: true },
      { key: 'Total interest', value: '£23,102' },
      { key: 'Effective annual rate', value: '6.168%' },
    ],
  },
  retirement: {
    label: 'Example scenario',
    inputs: [
      { key: 'Current age', value: '35' },
      { key: 'Monthly contribution', value: '£400' },
      { key: 'Employer contribution', value: '£200' },
      { key: 'Annual growth', value: '6%' },
    ],
    outputs: [
      { key: 'Pot at 67', value: '£454,000', highlight: true },
      { key: 'Your contributions', value: '£153,600' },
      { key: 'Growth', value: '£300,400' },
    ],
    note: 'Nominal value — real value lower after inflation',
  },
  'rent-vs-buy': {
    label: 'Example scenario',
    inputs: [
      { key: 'Property price', value: '£350,000' },
      { key: 'Monthly rent (equiv.)', value: '£1,400' },
      { key: 'Mortgage rate', value: '4.5%' },
      { key: 'Term', value: '25 years' },
    ],
    outputs: [
      { key: 'Monthly mortgage', value: '£1,944', highlight: true },
      { key: 'Break-even', value: '~8 years' },
      { key: 'Net equity at 10y', value: '£87,000' },
    ],
    note: 'Assuming 3% annual property growth',
  },
  loan: {
    label: 'Example scenario',
    inputs: [
      { key: 'Loan amount', value: '£15,000' },
      { key: 'APR', value: '7.9%' },
      { key: 'Term', value: '5 years' },
    ],
    outputs: [
      { key: 'Monthly payment', value: '£303', highlight: true },
      { key: 'Total interest', value: '£3,180' },
      { key: 'Total repaid', value: '£18,180' },
    ],
  },
  offset: {
    label: 'Example scenario',
    inputs: [
      { key: 'Mortgage balance', value: '£250,000' },
      { key: 'Offset savings', value: '£30,000' },
      { key: 'Mortgage rate', value: '4.5%' },
    ],
    outputs: [
      { key: 'Monthly interest saving', value: '£113', highlight: true },
      { key: 'Annual saving', value: '£1,350' },
      { key: 'Term reduction', value: '~2.1 years' },
    ],
  },
  overpayment: {
    label: 'Example scenario',
    inputs: [
      { key: 'Remaining balance', value: '£220,000' },
      { key: 'Monthly overpayment', value: '£200' },
      { key: 'Rate', value: '4.5%' },
      { key: 'Remaining term', value: '22 years' },
    ],
    outputs: [
      { key: 'Interest saved', value: '£18,400', highlight: true },
      { key: 'Term reduced by', value: '3 years 4 months' },
      { key: 'New payoff date', value: '~18.7 years' },
    ],
  },
  affordability: {
    label: 'Example scenario',
    inputs: [
      { key: 'Annual income', value: '£55,000' },
      { key: 'Deposit', value: '£40,000' },
      { key: 'Monthly outgoings', value: '£800' },
    ],
    outputs: [
      { key: 'Max borrowing (4.5×)', value: '£247,500', highlight: true },
      { key: 'Max property price', value: '£287,500' },
      { key: 'Stress test rate', value: '7.5%' },
    ],
    note: 'Illustrative — lender criteria vary',
  },
  'take-home': {
    label: 'Example scenario',
    inputs: [
      { key: 'Gross salary', value: '£45,000' },
      { key: 'Tax year', value: '2025/26' },
      { key: 'Country', value: 'England' },
    ],
    outputs: [
      { key: 'Monthly take-home', value: '£2,902', highlight: true },
      { key: 'Income tax', value: '£6,486/yr' },
      { key: 'National Insurance', value: '£3,027/yr' },
    ],
  },
  crisis: {
    label: 'Example scenario',
    inputs: [
      { key: 'Liquid savings', value: '£12,000' },
      { key: 'Monthly essentials', value: '£1,950' },
      { key: 'Passive income', value: '£400' },
    ],
    outputs: [
      { key: 'Runway', value: '7.7 months', highlight: true },
      { key: 'Net monthly burn', value: '£1,550' },
      { key: 'Risk level', value: 'Moderate' },
    ],
  },
};

interface ToolPreviewProps {
  id: string;       // matches key in PREVIEWS
  dismissed?: boolean;
}

export default function ToolPreview({ id }: ToolPreviewProps) {
  const [visible, setVisible] = useState(true);
  const scenario = PREVIEWS[id];

  // Hide once user has interacted with the page (input focus/change)
  useEffect(() => {
    const hide = () => setVisible(false);
    // Listen for any input/select changes on the page
    document.addEventListener('input', hide, { once: true });
    document.addEventListener('change', hide, { once: true });
    return () => {
      document.removeEventListener('input', hide);
      document.removeEventListener('change', hide);
    };
  }, []);

  if (!visible || !scenario) return null;

  return (
    <aside
      aria-label={`Example output for ${id} calculator`}
      style={{
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border)',
        borderLeft: '3px solid var(--accent)',
        borderRadius: '6px',
        padding: '1rem 1.25rem',
        marginBottom: '1.5rem',
        opacity: 0.9,
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.62rem',
          color: 'var(--accent)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>
          {scenario.label}
        </span>
        <button
          onClick={() => setVisible(false)}
          aria-label="Dismiss example"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-muted)',
            fontSize: '0.7rem',
            padding: '0.1rem 0.3rem',
            fontFamily: 'var(--font-mono)',
            lineHeight: 1,
          }}
        >
          ✕
        </button>
      </div>

      {/* Two-column layout: inputs | outputs */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem 1.5rem' }}>

        {/* Inputs */}
        <div>
          {scenario.inputs.map(({ key, value }) => (
            <div key={key} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.2rem 0', borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>{key}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>{value}</span>
            </div>
          ))}
        </div>

        {/* Outputs */}
        <div>
          {scenario.outputs.map(({ key, value, highlight }) => (
            <div key={key} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.2rem 0', borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>{key}</span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: highlight ? '0.82rem' : '0.72rem',
                color: highlight ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontWeight: highlight ? 600 : 400,
              }}>
                {value}
              </span>
            </div>
          ))}
        </div>

      </div>

      {/* Footer note */}
      {scenario.note && (
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)', marginTop: '0.6rem', lineHeight: 1.5 }}>
          {scenario.note} · Enter your own figures above to calculate
        </p>
      )}
      {!scenario.note && (
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)', marginTop: '0.6rem' }}>
          Enter your own figures above to calculate
        </p>
      )}
    </aside>
  );
}
