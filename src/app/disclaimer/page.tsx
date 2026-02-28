import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Disclaimer — Plain Figures',
  description: 'Plain Figures disclaimer. All calculations are indicative only. We do not provide financial, investment, insurance, or professional advice.',
};

export default function DisclaimerPage() {
  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', padding: '4rem 2rem 6rem' }}>

      {/* Breadcrumb */}
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: '2.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>PLAIN FIGURES</Link>
        <span>/</span>
        <span style={{ color: 'var(--accent)' }}>DISCLAIMER</span>
      </div>

      {/* Header */}
      <div style={{ marginBottom: '3rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '1rem' }}>
          Disclaimer
        </div>
        <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 400, color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: '0.75rem' }}>
          Indicative only.
        </h1>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.75, fontWeight: 300 }}>
          The disclaimer that appears on every calculator page, in full.
        </p>
      </div>

      <div className="guide-content">

        {/* The global disclaimer block — styled as it appears on calculator pages */}
        <div style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border)',
          borderRadius: '6px',
          padding: '1.5rem 1.75rem',
          marginBottom: '2.5rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.78rem',
          color: 'var(--text-muted)',
          lineHeight: 1.8,
          letterSpacing: '0.01em',
        }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '0.85rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.6rem' }}>
            Disclaimer — applies to all calculators and guides
          </div>
          Plain Figures provides mathematical tools only. All calculations are indicative and for informational purposes. Figures depend on the inputs provided and the assumptions built into each tool — they may not reflect your actual situation, current rates, or applicable regulations.
          <br /><br />
          We do not provide financial, investment, tax, insurance, legal, or any other professional advice. Results should not be used as the sole basis for any financial decision.
          <br /><br />
          Always consult a qualified financial adviser, mortgage broker, accountant, insurance professional, or other relevant expert before making any significant decision. Plain Figures accepts no liability for any loss, cost, or consequence arising from use of or reliance on these tools.
        </div>

        <h2>What this means in practice</h2>
        <p>
          Every calculator on Plain Figures uses a mathematical formula — amortisation, compound interest, tax band thresholds, actuarial estimates, and so on. The formula is applied to the inputs you provide. The result is what the formula produces for those inputs.
        </p>
        <p>
          The result is not a quote. It is not a guarantee. It is not personalised to your full financial situation, credit history, health, employment status, country of tax residence, or any other factor that a professional adviser would consider. It is a mathematical output — useful for understanding how a number works, not for making a commitment.
        </p>

        <h2>Where professional advice matters</h2>
        <p>
          The threshold for consulting a professional is lower than most people assume. Some examples where a calculator result is a starting point, not a conclusion:
        </p>
        <ul>
          <li><strong>Mortgages:</strong> A repayment calculator shows the maths of a rate and term. A broker or adviser knows which products you are eligible for, what fees apply, and how your situation affects affordability assessments.</li>
          <li><strong>Salary take-home:</strong> Tax band figures are updated annually and vary by country, residency status, pension contribution method, and other deductions. A payroll professional or accountant applies your actual code.</li>
          <li><strong>Insurance:</strong> Business interruption sums, life insurance needs, and cyber risk exposure are indicative frameworks. Actual policy terms, exclusions, and pricing require a qualified broker.</li>
          <li><strong>Retirement:</strong> Savings projections assume a constant return. Real investment returns vary, may be negative, and are affected by charges, tax wrappers, and sequencing risk that this site does not model.</li>
        </ul>

        <h2>Accuracy and updates</h2>
        <p>
          We review formulas and rate inputs when relevant changes are published — for example, UK tax band updates each April. However, we cannot guarantee that every figure is current at the moment you use it. Verify critical inputs (rates, thresholds, rules) independently before relying on any output.
        </p>

        <div style={{ marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.7, fontWeight: 300 }}>
            Questions about these limits? Read our <Link href="/terms" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Terms of Use</Link> or contact us at <a href="mailto:help@plainfigures.org" style={{ color: 'var(--accent)', textDecoration: 'none' }}>help@plainfigures.org</a>.
          </p>
        </div>

      </div>
    </div>
  );
}
