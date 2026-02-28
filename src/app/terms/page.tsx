import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use — Plain Figures',
  description: 'Plain Figures terms of use. Calculators are indicative tools only. No financial advice is provided. Governed by German law.',
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: '2rem' }}>
    <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.75rem', letterSpacing: '0.04em' }}>
      {title}
    </h2>
    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.85, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {children}
    </div>
  </div>
);

export default function TermsPage() {
  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}>
        Legal
      </p>
      <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.75rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
        Terms of Use
      </h1>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '2.5rem' }}>
        Last updated: February 2026. By using Plain Figures, you agree to these terms.
      </p>

      <Section title="1. What Plain Figures is">
        <p>
          Plain Figures provides mathematical calculation tools for informational and educational purposes.
          We are not a financial adviser, broker, insurer, lender, or regulated professional service.
          Nothing on this site constitutes financial, investment, tax, insurance, or legal advice.
        </p>
      </Section>

      <Section title="2. No warranty on calculations">
        <p>
          All calculators produce indicative results based on the inputs you provide and standard
          mathematical formulas. Results are approximations. They do not account for all real-world
          factors, individual circumstances, regulatory changes, tax variations, or lender-specific criteria.
        </p>
        <p>
          Plain Figures is provided "as is" without warranty of any kind — express, implied, or statutory.
          We do not warrant that calculations are error-free, complete, or suitable for any specific purpose.
        </p>
      </Section>

      <Section title="3. Your responsibility">
        <p>
          You use Plain Figures at your own risk. You are solely responsible for any decisions made
          on the basis of results from this site. Before making significant financial decisions, you
          should consult a qualified professional appropriate to your situation.
        </p>
      </Section>

      <Section title="4. Limitation of liability">
        <p>
          To the fullest extent permitted by applicable law, Plain Figures and its operators accept
          no liability for any direct, indirect, incidental, special, or consequential loss or damage
          arising from your use of, or reliance on, this site or its calculators.
        </p>
      </Section>

      <Section title="5. Intellectual property">
        <p>
          All content on Plain Figures — including calculators, guides, code, and design — is the
          property of Plain Figures. You may use the site for personal, non-commercial purposes.
          You may not copy, reproduce, scrape, republish, or redistribute content without express
          written permission.
        </p>
        <p>
          Automated data extraction (scraping, crawling beyond normal indexing) is not permitted.
        </p>
      </Section>

      <Section title="6. Third-party links">
        <p>
          Where the site links to external tools, resources, or services, we are not responsible
          for their content, accuracy, or practices. A link does not constitute endorsement.
        </p>
      </Section>

      <Section title="7. Changes to the site">
        <p>
          We may modify, suspend, or discontinue any part of Plain Figures at any time without notice.
          We may update these terms — continued use after updates constitutes acceptance.
        </p>
      </Section>

      <Section title="8. Governing law and disputes">
        <p>
          These terms are governed by the laws of Germany. Any disputes arising from use of Plain Figures
          shall be subject to the exclusive jurisdiction of the courts of Germany, to the extent
          permitted by applicable consumer protection law in your country of residence.
        </p>
      </Section>

      <Section title="9. Contact">
        <p>
          Questions about these terms:{' '}
          <a href="mailto:help@plainfigures.org" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
            help@plainfigures.org
          </a>
        </p>
      </Section>
    </div>
  );
}
