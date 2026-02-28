import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About — Plain Figures',
  description: 'Plain Figures provides neutral, accurate financial calculators for ordinary adults, families, and professionals. No advice. No noise. Just the maths.',
};

export default function AboutPage() {
  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', padding: '4rem 2rem 6rem' }}>

      {/* Breadcrumb */}
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: '2.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>PLAIN FIGURES</Link>
        <span>/</span>
        <span style={{ color: 'var(--accent)' }}>ABOUT</span>
      </div>

      {/* Header */}
      <div style={{ marginBottom: '3rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '1rem' }}>
          About
        </div>
        <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 400, color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '1rem' }}>
          Plain figures.<br />Without the noise.
        </h1>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.75, fontWeight: 300 }}>
          Accurate numbers for real decisions — nothing more, nothing less.
        </p>
      </div>

      {/* Body */}
      <div className="guide-content">
        <h2>What this is</h2>
        <p>
          Plain Figures is a collection of financial and mathematical calculators built for ordinary adults, families, cautious planners, and working professionals who want to check the numbers before making a decision. Mortgage repayments. Savings growth. Salary take-home. Retirement projections. Rent versus buy. And more.
        </p>
        <p>
          Every tool on this site does one thing: it performs the calculation correctly and shows the result clearly. Nothing is sold. No products are recommended. No opinions are offered. The numbers are yours to interpret.
        </p>

        <h2>Why it exists</h2>
        <p>
          Most financial content online is built around commercial outcomes — affiliate links, product placements, lead generation, or the implicit pressure to act. Plain Figures was built on the opposite premise: that a person who understands the maths is better placed to make their own decision, without nudges in any direction.
        </p>
        <p>
          The site takes its name from that philosophy. Plain figures. The actual numbers, presented without spin, without noise, without an agenda.
        </p>

        <h2>What it is not</h2>
        <p>
          Plain Figures does not provide financial advice, tax guidance, legal opinion, or professional consultation of any kind. Every calculator on the site produces indicative figures only. Results depend on assumptions that may not match your actual situation. Always verify with a qualified adviser before making any significant financial decision.
        </p>

        <h2>Accuracy and privacy</h2>
        <p>
          Formulas are reviewed against published standards and updated when tax bands, rates, or regulatory thresholds change. No personal data is collected or stored from calculator use. There is no login. There is no account. Numbers you enter stay in your browser.
        </p>

        <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border)', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--text-muted)', letterSpacing: '0.04em' }}>
          Built for clarity, not commerce.
        </div>
      </div>

    </div>
  );
}
