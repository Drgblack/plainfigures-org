import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { buildStaticMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildStaticMetadata({
  title: 'Cookie Policy — Plain Figures',
  description: 'Cookie policy and consent controls for Plain Figures. Functional preferences and optional analytics or advertising consent.',
  path: '/cookies',
  noindex: true,
});

export default function CookiesLayout({ children }: { children: ReactNode }) {
  return children;
}
