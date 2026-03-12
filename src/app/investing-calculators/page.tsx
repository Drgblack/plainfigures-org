import type { Metadata } from 'next';
import ClusterHubPage from '@/components/layout/ClusterHubPage';
import { buildHubMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildHubMetadata(
  'Investing and Compound Interest Calculators - Plain Figures',
  'Browse Plain Figures investing calculators for compound growth, long-term returns, retirement planning, and related investing guides.',
  '/investing-calculators',
);

export default function InvestingCalculatorsHubPage() {
  return <ClusterHubPage slug="investing-calculators" />;
}
