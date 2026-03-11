import type { Metadata } from 'next';
import ClusterHubPage from '@/components/layout/ClusterHubPage';
import { buildHubMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildHubMetadata(
  'Savings and Compound Interest Hub - Plain Figures',
  'Explore savings growth, compound interest, savings goals, retirement projections, and emergency-fund guides in one Plain Figures hub.',
  '/savings-and-compound-interest',
);

export default function SavingsAndCompoundInterestHubPage() {
  return <ClusterHubPage slug="savings-and-compound-interest" />;
}
