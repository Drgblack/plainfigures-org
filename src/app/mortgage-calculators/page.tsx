import type { Metadata } from 'next';
import ClusterHubPage from '@/components/layout/ClusterHubPage';
import { buildHubMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildHubMetadata(
  'Mortgage Calculators and Guides - Plain Figures',
  'Browse Plain Figures mortgage calculators and guides for repayment, affordability, rent vs buy, and related borrowing decisions.',
  '/mortgage-calculators',
);

export default function MortgageCalculatorsHubPage() {
  return <ClusterHubPage slug="mortgage-calculators" />;
}
