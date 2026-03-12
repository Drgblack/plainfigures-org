import { SITE_ORIGIN } from '@/lib/siteConfig';

export type UtilityNoindexRoute = {
  href: string;
  reason: string;
};

export const UTILITY_NOINDEX_ROUTES: UtilityNoindexRoute[] = [
  { href: '/contact', reason: 'Utility contact page; useful to users but low-value as a search landing page.' },
  { href: '/cookies', reason: 'Cookie-preferences utility page; accessible for compliance but not a high-value index target.' },
  { href: '/saved', reason: 'Personal browser-storage page; not suitable for search indexing.' },
  { href: '/programmatic-report', reason: 'Internal reporting surface for rollout and monitoring.' },
  { href: '/programmatic-report.json', reason: 'Machine-readable reporting endpoint.' },
  { href: '/crawl-audit', reason: 'Internal crawl-health report for site maintenance, not search acquisition.' },
  { href: '/seo-opportunities', reason: 'Internal prioritisation report for the next SEO work queue.' },
  { href: '/search-console-report', reason: 'Internal Search Console reporting surface for CTR, ranking, and indexation review.' },
  { href: '/search-console-report.json', reason: 'Machine-readable Search Console reporting snapshot.' },
];

export const NON_INDEXABLE_PATHS = new Set(UTILITY_NOINDEX_ROUTES.map((route) => route.href));

export function toCanonicalAbsoluteUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  return path === '/' ? SITE_ORIGIN : `${SITE_ORIGIN}${path}`;
}

export function isCanonicalOriginUrl(url: string): boolean {
  try {
    return new URL(url).origin === SITE_ORIGIN;
  } catch {
    return false;
  }
}

export function isIndexablePath(path: string): boolean {
  return !NON_INDEXABLE_PATHS.has(path);
}

export function getIndexableSitemapUrls(paths: string[]): string[] {
  return Array.from(
    new Set(
      paths
        .filter(isIndexablePath)
        .map(toCanonicalAbsoluteUrl)
        .filter(isCanonicalOriginUrl),
    ),
  );
}
