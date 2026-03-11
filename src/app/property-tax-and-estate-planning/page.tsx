import type { Metadata } from 'next';
import ClusterHubPage from '@/components/layout/ClusterHubPage';
import { buildHubMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildHubMetadata(
  'Property, Tax, and Estate Planning Hub - Plain Figures',
  'Browse property yield, capital gains, inheritance tax, and first-time buyer planning guides in one Plain Figures supporting hub.',
  '/property-tax-and-estate-planning',
);

export default function PropertyTaxAndEstatePlanningHubPage() {
  return <ClusterHubPage slug="property-tax-and-estate-planning" />;
}
