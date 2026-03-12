import Link from 'next/link';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import { getCalculatorDirectorySections } from '@/lib/seo/calculatorDirectory';

export default function CalculatorDirectoryPage() {
  const sections = getCalculatorDirectorySections();

  return (
    <div style={{ maxWidth: '980px', margin: '0 auto', padding: '3rem 2rem' }}>
      <Breadcrumbs
        items={[
          { href: '/', label: 'Home' },
          { label: 'Calculators' },
        ]}
      />

      <header style={{ marginBottom: '2.25rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', color: 'var(--accent)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
          Calculator Directory
        </div>
        <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 400, color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1.12, margin: '0 0 1rem' }}>
          Financial Calculators Organised by Decision Path
        </h1>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.75, fontWeight: 300, maxWidth: '760px', margin: '0 0 0.9rem' }}>
          Plain Figures works best when the main money pages are grouped by job rather than left as a flat list. These category hubs help users and crawlers move from the core calculator to the most relevant supporting tools and guides without hitting thin navigational dead ends.
        </p>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7, fontWeight: 300, maxWidth: '760px', margin: 0 }}>
          Start with the category that matches the decision: mortgage cost, savings progress, long-term investing, retirement planning, or income and borrowing.
        </p>
      </header>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.85rem', marginBottom: '2.5rem' }}>
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.55rem',
              padding: '1rem 1.1rem',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              textDecoration: 'none',
            }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--text-primary)', lineHeight: 1.45 }}>
              {section.title}
            </span>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {section.description}
            </span>
          </Link>
        ))}
      </section>

      {sections.map((section) => (
        <section key={section.href} style={{ marginTop: '2.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.8rem' }}>
            <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', fontWeight: 400, color: 'var(--text-primary)', margin: 0 }}>
              <Link href={section.href} style={{ color: 'inherit', textDecoration: 'none' }}>
                {section.title}
              </Link>
            </h2>
            <Link href={section.href} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--accent)', textDecoration: 'none', letterSpacing: '0.08em' }}>
              Open hub
            </Link>
          </div>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.7, margin: '0 0 1rem' }}>
            {section.description}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', alignItems: 'start' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.65rem' }}>
              {section.calculators.map((calculator) => (
                <Link
                  key={calculator.href}
                  href={calculator.href}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.4rem',
                    padding: '0.9rem 1rem',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border)',
                    borderRadius: '6px',
                    textDecoration: 'none',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.76rem', color: 'var(--text-primary)', lineHeight: 1.45 }}>
                    {calculator.label}
                  </span>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                    {calculator.description}
                  </span>
                </Link>
              ))}
            </div>

            <div style={{ padding: '0.9rem 1rem', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '6px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.64rem', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.65rem' }}>
                Related Guides
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                {section.guideLinks.map((guide) => (
                  <Link key={guide.href} href={guide.href} style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.55, textDecoration: 'none' }}>
                    {guide.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
