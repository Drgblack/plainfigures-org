import { getStaticSitemapUrls } from '@/lib/sitemap-data';

export const revalidate = 86400;
export const dynamic = 'force-dynamic';

function xml(content: string): Response {
  return new Response(content, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=86400',
    },
  });
}

export async function GET() {
  const lastModified = new Date().toISOString();
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${getStaticSitemapUrls()
  .map(
    (url) => `  <url>
    <loc>${url}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${url === 'https://www.plainfigures.org' ? '1.0' : '0.7'}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>`;

  return xml(body);
}
