import type { Metadata } from 'next';
import CalculatorDirectoryPage from '@/components/layout/CalculatorDirectoryPage';
import { buildHubMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildHubMetadata(
  'Financial Calculators by Category - Plain Figures',
  'Browse Plain Figures calculator hubs for mortgages, savings, investing, retirement, income, and related money guides.',
  '/calculators',
);

export default function CalculatorsPage() {
  return <CalculatorDirectoryPage />;
}
