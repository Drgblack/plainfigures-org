import type { Metadata } from 'next';
import CalcPageWrapper from '@/components/layout/CalcPageWrapper';
import RentVsBuyCalc from '@/components/calculators/RentVsBuyCalc';

import { calcPageJsonLd, CALC_FAQS } from '@/lib/structuredData';

// JSON-LD structured data for search engines
const jsonLdData = calcPageJsonLd({
  name: 'Rent vs Buy Calculator',
  description: 'Compare the true financial outcome of renting versus buying over time.',
  url: '/rent-vs-buy',
  faqs: CALC_FAQS['/rent-vs-buy'] || [],
});

export const metadata: Metadata = {
  title: 'Rent vs Buy Calculator — Plain Figures',
  description: 'Compare the long-term financial outcome of renting vs buying a property, including break-even analysis.',
};

export default function RentVsBuyPage() {
  return (
    <>
      {jsonLdData.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <CalcPageWrapper
      code="03 / RENT VS BUY"
      title="Rent vs Buy Calculator"
      description="Compare the true financial outcome of renting versus buying over time, accounting for equity, investment returns, and opportunity cost."
      toolHref="/rent-vs-buy"
      learnHref="/learn/rent-vs-buy"
      learnLabel="Rent vs Buy: the key numbers"
    >
      <RentVsBuyCalc />
    </CalcPageWrapper>
    </>
  );
}
