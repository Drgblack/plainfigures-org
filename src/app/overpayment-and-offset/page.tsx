import type { Metadata } from 'next';
import ClusterHubPage from '@/components/layout/ClusterHubPage';
import { buildHubMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildHubMetadata(
  'Overpayment and Offset Mortgage Hub - Plain Figures',
  'Compare mortgage overpayment, offset, and linked savings paths with the calculators and guides that explain each option.',
  '/overpayment-and-offset',
);

export default function OverpaymentAndOffsetHubPage() {
  return <ClusterHubPage slug="overpayment-and-offset" />;
}
