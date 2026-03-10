import { generateAllSitemapEntries } from '@/lib/calculators/config';

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

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const chunkIndex = Number.parseInt(id, 10);

  if (Number.isNaN(chunkIndex) || chunkIndex < 0) {
    return new Response('Invalid sitemap chunk', { status: 404 });
  }

  const start = chunkIndex * PROGRAMMATIC_CHUNK_SIZE;
  const end = start + PROGRAMMATIC_CHUNK_SIZE;
  const entries = generateAllSitemapEntries().slice(start, end);

  if (entries.length === 0) {
    return new Response('Not found', { status: 404 });
  }

  const lastModified = new Date().toISOString();
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (entry) => `  <url>
    <loc>https://www.plainfigures.org/calculators/${entry.categorySlug}/${entry.slug}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`,
  )
  .join('\n')}
</urlset>`;

  return xml(body);
}
