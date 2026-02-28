import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer — Plain Figures',
  description: 'Plain Figures disclaimer. All calculations are indicative only. No financial advice is provided.',
};

export default function DisclaimerPage() {
  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}>
        Legal
      </p>
      <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.75rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '2rem' }}>
        Disclaimer
      </h1>

      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.85, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

        <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-light)', borderLeft: '3px solid var(--accent)', borderRadius: '4px', padding: '1.25rem 1.5rem' }}>
          <p style={{ color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
            Plain Figures provides mathematical tools only. All calculations are indicative and
            for informational purposes.
          </p>
          <p>
            We do not provide financial, investment, tax, insurance, legal, or any other professional advice.
            Results are based on the inputs provided and standard formulas. They do not account for all
            real-world factors, individual circumstances, or changes in law and regulation.
          </p>
        </div>

        <p>
          Always consult a qualified and regulated professional — financial adviser, mortgage broker,
          accountant, solicitor, or other specialist — before making decisions based on calculations
          from this site.
        </p>

        <p>
          Plain Figures accepts no liability for decisions made on the basis of results produced
          by our tools. Use of this site constitutes acceptance of our{' '}
          <a href="/terms" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Terms of Use</a>.
        </p>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', marginTop: '0.5rem' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            This disclaimer applies to all pages and tools on plainfigures.org.
            For calculator-specific caveats, see the note on each tool page.
          </p>
        </div>

      </div>
    </div>
  );
}
