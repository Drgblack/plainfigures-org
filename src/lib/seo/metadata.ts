import type { Metadata } from 'next';

const SITE_URL = 'https://plainfigures.org';
const SITE_NAME = 'Plain Figures';
const DEFAULT_OG_IMAGE = '/lockup-dark@2x.png';

type StaticMetadataOptions = {
  title: string;
  description: string;
  path: string;
  openGraphTitle?: string;
  type?: 'website' | 'article';
  keywords?: string[];
  noindex?: boolean;
};

function toAbsoluteUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  return `${SITE_URL}${path}`;
}

export function buildStaticMetadata({
  title,
  description,
  path,
  openGraphTitle,
  type = 'article',
  keywords,
  noindex = false,
}: StaticMetadataOptions): Metadata {
  const canonical = toAbsoluteUrl(path);
  const socialTitle = openGraphTitle ?? title;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
    },
    robots: noindex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : undefined,
    openGraph: {
      title: socialTitle,
      description,
      url: canonical,
      type,
      siteName: SITE_NAME,
      locale: 'en_GB',
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 528,
          height: 80,
          alt: `${SITE_NAME} logo`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export function buildGuideMetadata(title: string, description: string, slug: string): Metadata {
  return buildStaticMetadata({
    title,
    description,
    path: `/learn/${slug}`,
    openGraphTitle: `${title} — Plain Figures Learning Centre`,
  });
}

export function buildTrustMetadata(title: string, description: string, slug: string): Metadata {
  return buildStaticMetadata({
    title,
    description,
    path: `/${slug}`,
  });
}

export function buildHubMetadata(title: string, description: string, path: string): Metadata {
  return buildStaticMetadata({
    title,
    description,
    path,
    type: 'website',
  });
}
