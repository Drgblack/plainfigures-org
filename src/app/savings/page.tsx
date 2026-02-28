import type { Metadata } from 'next';
import CalcPageWrapper from '@/components/layout/CalcPageWrapper';
import SavingsCalc from '@/components/calculators/SavingsCalc';

import { calcPageJsonLd, CALC_FAQS } from '@/lib/structuredData';

// JSON-LD structured data for search engines
const jsonLdData = calcPageJsonLd({
  name: 'Savings Growth Calculator',
  description: 'See how compound interest grows your savings over time with regular contributions.',
  url: '/savings',
  faqs: CALC_FAQS['/savings'] || [],
});

export const metadata: Metadata = {
  title: 'Savings Growth Calculator — Plain Figures',
  description: 'See how compound interest grows your savings over time with regular contributions.',
};

export default function SavingsPage() {
  return (
    <>
      {jsonLdData.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <CalcPageWrapper
      code="02 / SAVINGS"
      title="Savings Growth Calculator"
      description="See how compound interest works over time. Add an initial deposit, set a monthly contribution, and watch your balance grow."
      toolHref="/savings"
      rateContext="Best easy-access savings rates: ~5% (Feb 2026). Review when rates change."
    >
      <SavingsCalc />
    </CalcPageWrapper>
    </>
  );
}
