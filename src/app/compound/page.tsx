import type { Metadata } from 'next';
import CalcPageWrapper from '@/components/layout/CalcPageWrapper';
import CompoundCalc from '@/components/calculators/CompoundCalc';

import { calcPageJsonLd, CALC_FAQS } from '@/lib/structuredData';

// JSON-LD structured data for search engines
const jsonLdData = calcPageJsonLd({
  name: 'Compound Interest Calculator',
  description: 'See how compounding frequency affects your effective annual rate.',
  url: '/compound',
  faqs: CALC_FAQS['/compound'] || [],
});

export const metadata: Metadata = {
  title: 'Compound Interest Calculator — Plain Figures',
  description: 'See exactly how compound interest works at different frequencies — monthly, quarterly, annually, daily.',
};

export default function CompoundPage() {
  return (
    <>
      {jsonLdData.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <CalcPageWrapper
      code="04 / COMPOUND INTEREST"
      title="Compound Interest Calculator"
      description="See how interest compounds over time. Choose your compounding frequency and compare the effective annual rate against the nominal rate."
      toolHref="/compound"
      learnHref="/learn/compound-interest"
      learnLabel="How compound interest works"
    >
      <CompoundCalc />
    </CalcPageWrapper>
    </>
  );
}
