import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy — Plain Figures',
  description: 'Plain Figures privacy policy. No personal data is stored from calculator use. Minimal data collection, no tracking on tools, GDPR compliant.',
};

const LAST_UPDATED = 'February 2026';

export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', padding: '4rem 2rem 6rem' }}>

      {/* Breadcrumb */}
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: '2.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>PLAIN FIGURES</Link>
        <span>/</span>
        <span style={{ color: 'var(--accent)' }}>PRIVACY</span>
      </div>

      {/* Header */}
      <div style={{ marginBottom: '3rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '1rem' }}>
          Privacy Policy
        </div>
        <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 400, color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: '0.75rem' }}>
          Your data. Your browser.
        </h1>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7, fontWeight: 300 }}>
          No personal data is stored from calculator use. What you enter into our tools stays in your browser.
        </p>
        <div style={{ marginTop: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
          Last updated: {LAST_UPDATED}
        </div>
      </div>

      {/* Body */}
      <div className="guide-content">

        <h2>Who we are</h2>
        <p>
          Plain Figures (<strong>plainfigures.org</strong>) is a financial calculator and learning resource. For data protection purposes, the data controller is the operator of plainfigures.org, based in Germany. Contact: <a href="mailto:help@plainfigures.org" style={{ color: 'var(--accent)', textDecoration: 'none' }}>help@plainfigures.org</a>.
        </p>

        <h2>What data we collect — and what we do not</h2>
        <p>
          <strong>Calculator tools:</strong> No personal data is collected, transmitted, or stored when you use any calculator on this site. Numbers you enter are processed entirely within your browser. Nothing is sent to our servers. We cannot see what figures you input.
        </p>
        <p>
          <strong>Analytics:</strong> We may use privacy-respecting, aggregate analytics (such as page view counts and country-level traffic) to understand which tools are used most. If analytics are active, they do not track individuals, do not use persistent identifiers, and do not record calculator inputs. No analytics data is sold or shared with third parties.
        </p>
        <p>
          <strong>Contact email:</strong> If you email us at help@plainfigures.org, we receive your email address and the content of your message. We use this only to respond to your enquiry and do not add it to any marketing list or share it with third parties.
        </p>

        <h2>Cookies</h2>
        <p>
          We use a small number of functional cookies to maintain site preferences — for example, your chosen display theme (dark or light mode) and currency selection. These cookies:
        </p>
        <ul>
          <li>Are stored locally in your browser</li>
          <li>Do not contain personal information</li>
          <li>Are not shared with any third party</li>
          <li>Can be cleared at any time via your browser settings</li>
        </ul>
        <p>
          We do not use advertising cookies, tracking cookies, or any cookies for behavioural profiling.
        </p>

        <h2>Third-party services</h2>
        <p>
          The core calculator tools on this site use no third-party tracking, analytics SDKs, or advertising scripts. If advertising is introduced in future (for example, Google AdSense), this policy will be updated in advance and a cookie consent mechanism will be added where required by applicable law.
        </p>
        <p>
          The site is hosted on a third-party infrastructure provider. Standard server logs (IP address, request path, timestamp) may be retained for security purposes for a short period. These are not used to identify individuals for marketing purposes.
        </p>

        <h2>Your rights under GDPR</h2>
        <p>
          As a user in the European Union or European Economic Area, you have rights under the General Data Protection Regulation (GDPR), including the right to:
        </p>
        <ul>
          <li>Access any personal data we hold about you</li>
          <li>Request correction of inaccurate data</li>
          <li>Request deletion of your personal data</li>
          <li>Object to or restrict processing</li>
          <li>Lodge a complaint with your national supervisory authority</li>
        </ul>
        <p>
          Because we collect almost no personal data from calculator use, most of these rights will apply only in the context of email correspondence. To exercise any right, contact us at <a href="mailto:help@plainfigures.org" style={{ color: 'var(--accent)', textDecoration: 'none' }}>help@plainfigures.org</a>.
        </p>

        <h2>Data retention</h2>
        <p>
          We retain email correspondence for as long as necessary to resolve the enquiry, and for a reasonable period thereafter for record-keeping. There is no personal data to retain from calculator use. Browser-stored preferences (theme, currency) remain until you clear your browser storage.
        </p>

        <h2>Children</h2>
        <p>
          This site is not directed at children under 16. We do not knowingly collect personal data from children.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          If we make material changes to this policy — for example, if we introduce advertising or a new data-processing activity — we will update this page and revise the "last updated" date above. Continued use of the site after changes are posted constitutes acceptance of the updated policy.
        </p>

        <h2>Contact</h2>
        <p>
          For any privacy question or data request: <a href="mailto:help@plainfigures.org" style={{ color: 'var(--accent)', textDecoration: 'none' }}>help@plainfigures.org</a>
        </p>

      </div>
    </div>
  );
}
