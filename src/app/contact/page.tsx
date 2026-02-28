import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact — Plain Figures',
  description: 'Contact Plain Figures for site issues, technical questions, or feedback. We do not provide financial advice.',
};

export default function ContactPage() {
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}>
        Contact
      </p>
      <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.75rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '2rem' }}>
        Get in touch.
      </h1>

      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.85, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

        <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '6px', padding: '1.25rem 1.5rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginBottom: '0.5rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Important
          </p>
          <p>
            Plain Figures does not provide financial, investment, insurance, or professional advice.
            We cannot comment on your personal financial situation, validate your decisions,
            or recommend products or advisers. All calculators are indicative tools only —
            use them at your own discretion.
          </p>
        </div>

        <p>
          For site issues, calculation errors, technical questions, accessibility concerns,
          or general feedback, we welcome your message.
        </p>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginBottom: '0.5rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Email
          </p>
          <a
            href="mailto:help@plainfigures.org"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '1rem',
              color: 'var(--accent)',
              textDecoration: 'none',
              letterSpacing: '0.02em',
            }}
          >
            help@plainfigures.org
          </a>
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginBottom: '0.5rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Response time
          </p>
          <p>We aim to respond within 3–5 business days. We are a small team.</p>
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginBottom: '0.5rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Location
          </p>
          <p>Plain Figures is operated from Germany.</p>
        </div>

      </div>
    </div>
  );
}
