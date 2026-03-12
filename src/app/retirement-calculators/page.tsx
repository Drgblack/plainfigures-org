import type { Metadata } from 'next';
import ClusterHubPage from '@/components/layout/ClusterHubPage';
import { buildHubMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildHubMetadata(
  'Retirement Calculators and Guides - Plain Figures',
  'Browse Plain Figures retirement calculators for pension growth, contribution planning, drawdown context, and retirement guides.',
  '/retirement-calculators',
);

export default function RetirementCalculatorsHubPage() {
  return <ClusterHubPage slug="retirement-calculators" />;
}
