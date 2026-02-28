import type { Metadata } from 'next';
import CalcPageWrapper from '@/components/layout/CalcPageWrapper';
import AffordabilityCalc from '@/components/calculators/AffordabilityCalc';

import { calcPageJsonLd, CALC_FAQS } from '@/lib/structuredData';

// JSON-LD structured data for search engines
const jsonLdData = calcPageJsonLd({
  name: 'Mortgage Affordability Calculator',
  description: 'Calculate the maximum mortgage you can borrow based on your income and circumstances.',
  url: '/affordability',
  faqs: CALC_FAQS['/affordability'] || [],
});
export const metadata: Metadata = {
  title: 'Mortgage Affordability Calculator — What Can I Borrow? — Plain Figures',
  description: 'Find out the maximum mortgage you can borrow based on your income, commitments, deposit, and stress test rates.',
};
export default function Page() {
  return (
    <>
      {jsonLdData.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <CalcPageWrapper code="11 / AFFORDABILITY" title="Mortgage Affordability Calculator" learnHref="/learn/mortgage-affordability" learnLabel="How affordability is assessed"
      description="Find out what you can actually borrow — based on income multiples, monthly commitments, and a stress test at +3%. Includes LTV breakdown."
      toolHref="/affordability">
      <AffordabilityCalc />
    </CalcPageWrapper>
    </>
  );
}
