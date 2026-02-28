import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/saved'],
      },
      {
        // Allow AI crawlers explicitly — important for GEO
        userAgent: 'GPTBot',
        allow: '/',
        disallow: ['/api/', '/_next/', '/saved'],
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: ['/api/', '/_next/', '/saved'],
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: ['/api/', '/_next/', '/saved'],
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/',
        disallow: ['/api/', '/_next/', '/saved'],
      },
      {
        userAgent: 'CCBot',
        allow: '/',
        disallow: ['/api/', '/_next/', '/saved'],
      },
    ],
    sitemap: 'https://plainfigures.org/sitemap.xml',
    host: 'https://plainfigures.org',
  };
}
