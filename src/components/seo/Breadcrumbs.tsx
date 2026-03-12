import Link from 'next/link';
import type { BreadcrumbItem } from '@/lib/seo/relatedLinks';
import { SITE_ORIGIN } from '@/lib/siteConfig';

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

function toAbsoluteUrl(href: string): string {
  if (href.startsWith('http://') || href.startsWith('https://')) {
    return href;
  }

  return `${SITE_ORIGIN}${href}`;
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href ? toAbsoluteUrl(item.href) : undefined,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <nav
        aria-label="Breadcrumb"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          flexWrap: 'wrap',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.68rem',
          color: 'var(--text-muted)',
          letterSpacing: '0.08em',
          marginBottom: '2rem',
        }}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <span key={`${item.label}-${index}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              {item.href && !isLast ? (
                <Link href={item.href} style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
                  {item.label}
                </Link>
              ) : (
                <span style={{ color: isLast ? 'var(--accent)' : 'var(--text-muted)' }}>{item.label}</span>
              )}
              {!isLast ? <span>/</span> : null}
            </span>
          );
        })}
      </nav>
    </>
  );
}
