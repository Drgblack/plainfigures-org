import type { Metadata } from 'next';
import ClusterHubPage from '@/components/layout/ClusterHubPage';
import { buildHubMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildHubMetadata(
  'Advisory Analytics and Automation Hub - Plain Figures',
  'A Plain Figures hub for advisory automation, analytics, client-experience, and commercial-efficiency explainers tied to the professional toolset.',
  '/advisory-analytics-and-automation',
);

export default function AdvisoryAnalyticsAndAutomationHubPage() {
  return <ClusterHubPage slug="advisory-analytics-and-automation" />;
}
