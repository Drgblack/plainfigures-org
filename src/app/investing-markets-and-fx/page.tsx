import type { Metadata } from 'next';
import ClusterHubPage from '@/components/layout/ClusterHubPage';
import { buildHubMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildHubMetadata(
  'Investing, Markets, and FX Hub - Plain Figures',
  'Browse Plain Figures guides on investing style, FX costs, market context, and tax-aware market decisions in one supporting hub.',
  '/investing-markets-and-fx',
);

export default function InvestingMarketsAndFxHubPage() {
  return <ClusterHubPage slug="investing-markets-and-fx" />;
}
