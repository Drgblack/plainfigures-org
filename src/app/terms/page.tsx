import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Use — Plain Figures',
  description: 'Plain Figures terms of use. Calculators are indicative only. No financial advice provided. Governing law: Germany.',
};

const LAST_UPDATED = 'February 2026';

export default function TermsPage() {
  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', padding: '4rem 2rem 6rem' }}>

      {/* Breadcrumb */}
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: '2.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>PLAIN FIGURES</Link>
        <span>/</span>
        <span style={{ color: 'var(--accent)' }}>TERMS</span>
      </div>

      {/* Header */}
      <div style={{ marginBottom: '3rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '1rem' }}>
          Terms of Use
        </div>
        <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 400, color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: '0.75rem' }}>
          Terms of Use
        </h1>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7, fontWeight: 300 }}>
          By using plainfigures.org, you agree to these terms. They are written in plain English.
        </p>
        <div style={{ marginTop: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
          Last updated: {LAST_UPDATED}
        </div>
      </div>

      <div className="guide-content">

        <h2>1. What Plain Figures is</h2>
        <p>
          Plain Figures (<strong>plainfigures.org</strong>) provides online mathematical calculators and explanatory guides for informational purposes. It is a tool, not a service. It does not employ advisers, brokers, analysts, or any professional who could give you personal guidance.
        </p>

        <h2>2. Calculators are indicative only</h2>
        <p>
          Every calculator on this site produces <strong>illustrative figures based on the inputs you provide</strong>. Results are not guarantees, projections, valuations, or recommendations. They depend on assumptions — about interest rates, tax rules, future conditions, and your specific situation — that may be incomplete, out of date, or simply wrong for your circumstances.
        </p>
        <p>
          Do not make any significant financial, legal, tax, insurance, or investment decision based solely on output from this site. Always verify results independently and consult a qualified professional before acting.
        </p>

        <h2>3. No financial advice</h2>
        <p>
          Plain Figures does not provide financial advice, investment advice, tax advice, legal advice, insurance advice, or any other regulated or professional advisory service. Nothing on this site constitutes a recommendation to buy, sell, borrow, invest, insure, or take any other action. Use of the site does not create any advisory or fiduciary relationship between you and Plain Figures.
        </p>

        <h2>4. No warranty</h2>
        <p>
          The site is provided "as is" and "as available" without any warranty of any kind, express or implied. We make no representations about the accuracy, completeness, reliability, or fitness for purpose of any calculation. Formulas are reviewed periodically, but tax bands, rates, and other inputs change — we cannot guarantee that every figure is current at the moment you use it.
        </p>

        <h2>5. Limitation of liability</h2>
        <p>
          To the maximum extent permitted by applicable law, Plain Figures and its operator accept no liability for any loss, damage, or cost — direct or indirect — arising from your use of or reliance on any calculator, guide, or other content on this site. This includes but is not limited to financial loss, lost income, or costs of professional advice obtained to correct a decision made on the basis of figures from this site.
        </p>

        <h2>6. Intellectual property</h2>
        <p>
          Content on this site — including calculator logic, text, and guides — is the property of Plain Figures and protected by copyright. You may use the calculators for personal, non-commercial purposes. You may not reproduce, copy, scrape, republish, redistribute, or use the content commercially without prior written permission. Automated scraping of the site is not permitted.
        </p>

        <h2>7. External links</h2>
        <p>
          Where the site links to external websites, those sites are beyond our control. We are not responsible for their content, accuracy, or privacy practices.
        </p>

        <h2>8. Changes to the site</h2>
        <p>
          We may update, modify, or remove calculators, guides, or other content at any time without notice. We may also update these terms — the "last updated" date above will reflect the most recent revision. Continued use of the site after a revision constitutes acceptance of the updated terms.
        </p>

        <h2>9. Governing law and disputes</h2>
        <p>
          These terms are governed by the laws of the <strong>Federal Republic of Germany</strong>. Any disputes arising from use of this site shall be subject to the exclusive jurisdiction of the courts of Germany, to the extent permitted by applicable law. If you are a consumer in the EU, you may also be entitled to remedies under the law of your country of residence.
        </p>

        <h2>10. Contact</h2>
        <p>
          For questions about these terms: <a href="mailto:help@plainfigures.org" style={{ color: 'var(--accent)', textDecoration: 'none' }}>help@plainfigures.org</a>
        </p>

      </div>
    </div>
  );
}
