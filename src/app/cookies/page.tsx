import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy — Plain Figures',
  description: 'Plain Figures cookie policy. We use functional cookies only. No advertising or tracking cookies without consent.',
};

export default function CookiesPage() {
  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}>
        Legal
      </p>
      <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.75rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
        Cookie Policy
      </h1>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '2.5rem' }}>
        Last updated: February 2026
      </p>

      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.85, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <p>
          Plain Figures uses cookies only where necessary for the site to function.
          We do not use advertising or tracking cookies without your explicit consent.
        </p>

        <div>
          <h2 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Functional cookies</h2>
          <p>Used to remember your currency preference, theme (dark/light), and language selection. These are set locally in your browser and never leave your device for tracking purposes.</p>
        </div>

        <div>
          <h2 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Advertising cookies</h2>
          <p>Plain Figures may display advertisements via Google AdSense. If enabled, Google may set cookies to serve relevant ads. This only occurs with your consent, managed below.</p>
        </div>

        <div>
          <h2 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Manage your consent</h2>
          <p>You can review and change your cookie preferences at any time using the declaration below.</p>
        </div>

        {/* Cookiebot Declaration — renders the consent management widget */}
        <div style={{ marginTop: '1rem' }}>
          <script
            id="CookieDeclaration"
            src="https://consent.cookiebot.com/649cb5c1-62ac-4296-b4e4-446cca128ece/cd.js"
            type="text/javascript"
            async
          />
        </div>
      </div>
    </div>
  );
}
