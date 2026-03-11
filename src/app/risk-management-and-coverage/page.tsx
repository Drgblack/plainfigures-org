import type { Metadata } from 'next';
import ClusterHubPage from '@/components/layout/ClusterHubPage';
import { buildHubMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildHubMetadata(
  'Risk Management and Coverage Hub - Plain Figures',
  'Browse Plain Figures risk, cyber, coverage, capital, and exposure pages in one professional hub built for brokers, risk managers, and adjacent operators.',
  '/risk-management-and-coverage',
);

export default function RiskManagementAndCoverageHubPage() {
  return <ClusterHubPage slug="risk-management-and-coverage" />;
}
