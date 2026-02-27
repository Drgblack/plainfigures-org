import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Plain Figures — Financial Calculators',
  description: 'Clear, accurate financial calculators. No advice. No noise. Just the maths.',
};

const CALCULATORS = [
  {
    href: '/mortgage',
    code: '01',
    title: 'Mortgage Repayment',
    description: 'Calculate your monthly payment, total interest, and the full cost of a mortgage over any term.',
    tags: ['Repayments', 'Interest', 'Amortisation'],
  },
  {
    href: '/savings',
    code: '02',
    title: 'Savings Growth',
    description: 'See how compound interest grows your savings over time with regular contributions.',
    tags: ['Compound Interest', 'Growth', 'Projections'],
  },
  {
    href: '/rent-vs-buy',
    code: '03',
    title: 'Rent vs Buy',
    description: 'Compare the long-term financial outcome of renting against buying a property.',
    tags: ['Net Worth', 'Break-even', 'Opportunity Cost'],
  },
];

export default function HomePage() {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 2rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '4rem' }}>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
          color: 'var(--text-muted)',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          marginBottom: '1.25rem',
        }}>
          Financial Calculator Hub
        </div>
        <h1 style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(2rem, 5vw, 3.25rem)',
          fontWeight: 300,
          color: 'var(--text-primary)',
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
          marginBottom: '1.5rem',
        }}>
          Check the maths.<br />
          <span style={{ color: 'var(--text-muted)' }}>Without the noise.</span>
        </h1>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '1rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.7,
          maxWidth: '520px',
          fontWeight: 300,
        }}>
          Plain Figures provides accurate financial calculators for everyday high-stakes decisions.
          No advice, no opinions, no products. Just numbers you can trust.
        </p>
      </div>

      {/* Calculator grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border)' }}>
        {CALCULATORS.map(({ href, code, title, description, tags }) => (
          <Link key={href} href={href} className="calc-link"
          >
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.08em',
            }}>
              {code}
            </div>
            <div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1rem',
                color: 'var(--text-primary)',
                fontWeight: 500,
                marginBottom: '0.4rem',
                letterSpacing: '-0.01em',
              }}>
                {title}
              </div>
              <div style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.5,
                fontWeight: 300,
                marginBottom: '0.75rem',
              }}>
                {description}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {tags.map(tag => (
                  <span key={tag} style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: 'var(--text-muted)',
                    border: '1px solid var(--border)',
                    borderRadius: '3px',
                    padding: '0.15rem 0.5rem',
                    letterSpacing: '0.05em',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '1.2rem',
              color: 'var(--text-muted)',
            }}>
              →
            </div>
          </Link>
        ))}
      </div>

      {/* Footer note */}
      <div style={{
        marginTop: '3rem',
        padding: '1.25rem 1.5rem',
        background: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        borderRadius: '6px',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.72rem',
        color: 'var(--text-muted)',
        lineHeight: 1.6,
        letterSpacing: '0.02em',
      }}>
        Plain Figures does not provide financial advice. All calculations are indicative only.
        Always consult a qualified financial adviser before making major financial decisions.
      </div>
    </div>
  );
}
