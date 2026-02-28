import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Plain Figures',
  description: 'Plain Figures provides neutral, accurate financial calculators for personal and professional decisions. No advice. No opinions. No products. Just the maths.',
};

export default function AboutPage() {
  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}>
        About
      </p>
      <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: '2rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '2rem', lineHeight: 1.2 }}>
        Plain Figures.
      </h1>

      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.85, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <p>
          Plain Figures is a financial calculator hub built for people who want to check the maths
          before they commit to a decision. Not the opinion. Not the product recommendation. The maths.
        </p>
        <p>
          We build accurate, formula-first tools for mortgage repayments, savings growth, compound
          interest, salary take-home, retirement projections, rent vs buy comparisons, and more.
          Each calculator is accompanied by a plain-language guide explaining the underlying calculation —
          so you understand the result, not just the number.
        </p>
        <p>
          Our audience is ordinary adults making real financial decisions: first-time buyers running
          affordability scenarios, families modelling retirement, freelancers checking their day rate,
          professionals stress-testing a business case. We don't assume financial literacy.
          We don't assume you have an adviser.
        </p>
        <p>
          We do not provide financial, investment, insurance, or professional advice.
          We do not sell products. We do not take referral fees. We do not have an agenda beyond accuracy.
          All results are indicative — they are a starting point for your thinking, not a substitute
          for professional guidance where that is appropriate.
        </p>
        <p>
          Plain Figures is operated from Germany and complies with applicable EU/GDPR data protection standards.
          We collect no personal data from calculator use.
        </p>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', marginTop: '0.5rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            Built for clarity, not commerce.
          </p>
        </div>
      </div>
    </div>
  );
}
