import Link from 'next/link';
import type { SeoLink } from '@/lib/seo/relatedLinks';

type RelatedCalculatorsProps = {
  title?: string;
  intro?: string;
  links: SeoLink[];
};

export default function RelatedCalculators({
  title = 'Related Calculators',
  intro,
  links,
}: RelatedCalculatorsProps) {
  if (links.length === 0) {
    return null;
  }

  return (
    <section style={{ marginTop: '2.5rem' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
        {title}
      </div>
      {intro ? (
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.7, margin: '0 0 1rem' }}>
          {intro}
        </p>
      ) : null}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.65rem' }}>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
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
              {link.label}
            </span>
            {link.description ? (
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                {link.description}
              </span>
            ) : null}
          </Link>
        ))}
      </div>
    </section>
  );
}
