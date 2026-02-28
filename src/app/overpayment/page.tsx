import type { Metadata } from 'next';
import CalcPageWrapper from '@/components/layout/CalcPageWrapper';
import OverpaymentCalc from '@/components/calculators/OverpaymentCalc';

import { calcPageJsonLd, CALC_FAQS } from '@/lib/structuredData';

// JSON-LD structured data for search engines
const jsonLdData = calcPageJsonLd({
  name: 'Mortgage Overpayment Calculator',
  description: 'Calculate interest saved and years removed by paying extra each month.',
  url: '/overpayment',
  faqs: CALC_FAQS['/overpayment'] || [],
});

export const metadata: Metadata = {
  title: 'Mortgage Overpayment Calculator — Plain Figures',
  description: 'Calculate how much interest and time you save by making extra monthly mortgage payments.',
};

export default function OverpaymentPage() {
  return (
    <>
      {jsonLdData.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <CalcPageWrapper
      code="08 / OVERPAYMENT"
      title="Mortgage Overpayment Calculator"
      description="See the exact impact of paying a little extra each month — how much interest you save, and how many years come off your mortgage term."
      toolHref="/overpayment"
    >
      <OverpaymentCalc />
    </CalcPageWrapper>
    </>
  );
}
