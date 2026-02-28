import type { Metadata } from 'next';
import CalcPageWrapper from '@/components/layout/CalcPageWrapper';
import OffsetCalc from '@/components/calculators/OffsetCalc';

import { calcPageJsonLd, CALC_FAQS } from '@/lib/structuredData';

// JSON-LD structured data for search engines
const jsonLdData = calcPageJsonLd({
  name: 'Offset Mortgage Calculator',
  description: 'See how savings reduce mortgage interest and shorten your term.',
  url: '/offset',
  faqs: CALC_FAQS['/offset'] || [],
});

export const metadata: Metadata = {
  title: 'Offset Mortgage Calculator — Plain Figures',
  description: 'See how much interest your savings offset against your mortgage, and how much earlier you could pay it off.',
};

export default function OffsetPage() {
  return (
    <>
      {jsonLdData.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <CalcPageWrapper
      code="07 / OFFSET MORTGAGE"
      title="Offset Mortgage Calculator"
      description="See how holding savings in an offset account reduces the interest you pay — and how much sooner you could be mortgage-free."
      toolHref="/offset"
      learnHref="/learn/offset-mortgage"
      learnLabel="How offset mortgages work"
    >
      <OffsetCalc />
    </CalcPageWrapper>
    </>
  );
}
