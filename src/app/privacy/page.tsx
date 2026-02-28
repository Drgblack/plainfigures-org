import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — Plain Figures',
  description: 'Plain Figures privacy policy. We collect no personal data from calculator use. GDPR compliant. No tracking, no data sales, no third-party sharing.',
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

export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}>
        Legal
      </p>
      <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.75rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
        Privacy Policy
      </h1>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '2.5rem' }}>
        Last updated: February 2026
      </p>

      <Section title="Summary">
        <p>
          Plain Figures does not collect, store, or process personal data from calculator use.
          No account is required. No form submissions occur. No data leaves your device when
          you use our tools.
        </p>
      </Section>

      <Section title="What we collect">
        <p>
          <strong style={{ color: 'var(--text-primary)' }}>Calculator use:</strong> None.
          All calculations run in your browser. No inputs, results, or usage data are transmitted to our servers.
        </p>
        <p>
          <strong style={{ color: 'var(--text-primary)' }}>Browser storage:</strong> We use
          localStorage to remember your currency preference, theme (dark/light), and any scenarios
          you explicitly save. This data never leaves your device and can be cleared at any time
          via your browser settings.
        </p>
        <p>
          <strong style={{ color: 'var(--text-primary)' }}>Analytics:</strong> We may use
          privacy-respecting analytics (aggregate page view counts, no personal identifiers,
          no cross-site tracking). If used, this collects only: page URL, referrer, country-level
          location, device type. No cookies are set for analytics purposes without consent.
        </p>
        <p>
          <strong style={{ color: 'var(--text-primary)' }}>Contact:</strong> If you email us at
          help@plainfigures.org, we receive your email address and message content. We use this
          solely to respond to your enquiry and do not add it to any mailing list.
        </p>
      </Section>

      <Section title="Cookies">
        <p>
          We use functional cookies only — strictly necessary for the site to operate (e.g.,
          theme persistence). We do not use advertising, tracking, or third-party analytics cookies.
          No consent banner is shown because no non-essential cookies are set by default.
        </p>
      </Section>

      <Section title="Third parties">
        <p>
          We do not sell, rent, or share your data with any third party for marketing or commercial purposes.
          Our site is hosted on Vercel (infrastructure provider). Vercel's privacy policy applies to
          server-level access logs, which we do not control or actively process.
        </p>
        <p>
          The site may in future display contextual advertising (Google AdSense). If implemented,
          this will be disclosed here and governed by Google's privacy and cookie policies.
          Calculator pages will remain ad-free.
        </p>
      </Section>

      <Section title="Your rights (GDPR)">
        <p>
          As we hold minimal personal data, most GDPR rights are exercised automatically — there is
          nothing to access or delete from calculator use. If you have contacted us by email and wish
          us to delete your correspondence, contact help@plainfigures.org and we will do so within 30 days.
        </p>
        <p>
          You have the right to: access data we hold about you; request correction; request deletion;
          object to processing; lodge a complaint with your national data protection authority.
          Our supervisory authority is the German Federal Commissioner for Data Protection (BfDI).
        </p>
      </Section>

      <Section title="Data retention">
        <p>
          Email correspondence is retained for up to 12 months and then deleted.
          No other personal data is retained.
        </p>
      </Section>

      <Section title="Changes to this policy">
        <p>
          We will update this page if our data practices change. Continued use of the site
          after changes constitutes acceptance of the updated policy.
        </p>
      </Section>

      <Section title="Contact">
        <p>
          Data controller: Plain Figures, Germany.
          Contact: <a href="mailto:help@plainfigures.org" style={{ color: 'var(--accent)', textDecoration: 'none' }}>help@plainfigures.org</a>
        </p>
      </Section>
    </div>
  );
}
