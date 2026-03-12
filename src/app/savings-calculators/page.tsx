import type { Metadata } from 'next';
import ClusterHubPage from '@/components/layout/ClusterHubPage';
import { buildHubMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildHubMetadata(
  'Savings Calculators and Guides - Plain Figures',
  'Browse Plain Figures savings calculators for growth, goals, emergency funds, recurring costs, and related saving guides.',
  '/savings-calculators',
);

export default function SavingsCalculatorsHubPage() {
  return <ClusterHubPage slug="savings-calculators" />;
}
