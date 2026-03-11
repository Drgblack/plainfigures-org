import type { Metadata } from 'next';
import ClusterHubPage from '@/components/layout/ClusterHubPage';
import { buildHubMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildHubMetadata(
  'Income, Tax, and Borrowing Hub - Plain Figures',
  'Browse Plain Figures salary, tax, freelance, loan, and affordability pages in one cluster hub designed around high-intent income-to-borrowing journeys.',
  '/income-tax-and-borrowing',
);

export default function IncomeTaxAndBorrowingHubPage() {
  return <ClusterHubPage slug="income-tax-and-borrowing" />;
}
