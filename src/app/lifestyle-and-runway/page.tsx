import type { Metadata } from 'next';
import ClusterHubPage from '@/components/layout/ClusterHubPage';
import { buildHubMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildHubMetadata(
  'Lifestyle and Runway Hub - Plain Figures',
  'Browse recurring-cost, lifestyle inflation, runway, and resilience pages in one Plain Figures support hub.',
  '/lifestyle-and-runway',
);

export default function LifestyleAndRunwayHubPage() {
  return <ClusterHubPage slug="lifestyle-and-runway" />;
}
