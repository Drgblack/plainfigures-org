const RAW_SITEMAP_LASTMOD =
  process.env.NEXT_PUBLIC_SITE_LASTMOD ??
  process.env.SITE_LASTMOD ??
  process.env.VERCEL_DEPLOYMENT_CREATED_AT ??
  new Date().toISOString();

export function getSitemapLastModified(): string {
  const parsed = new Date(RAW_SITEMAP_LASTMOD);

  if (Number.isNaN(parsed.getTime())) {
    return new Date().toISOString();
  }

  return parsed.toISOString();
}
