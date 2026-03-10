import { getSitemapEntryCount } from '@/lib/calculators/config';

export const revalidate = 86400;
export const dynamic = 'force-dynamic';

const PROGRAMMATIC_CHUNK_SIZE = 40000;

function xml(content: string): Response {
  return new Response(content, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=86400',
    },
  });
}

export async function GET() {
  const baseUrl = 'https://www.plainfigures.org';
  const lastModified = new Date().toISOString();
  const programmaticCount = getSitemapEntryCount();
  const chunkCount = Math.ceil(programmaticCount / PROGRAMMATIC_CHUNK_SIZE);

  const sitemaps = [
    `${baseUrl}/sitemaps/static`,
    ...Array.from({ length: chunkCount }, (_, index) => `${baseUrl}/sitemaps/programmatic/${index}`),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps
  .map(
    (url) => `  <sitemap>
    <loc>${url}</loc>
    <lastmod>${lastModified}</lastmod>
  </sitemap>`,
  )
  .join('\n')}
</sitemapindex>`;

  return xml(body);
}
