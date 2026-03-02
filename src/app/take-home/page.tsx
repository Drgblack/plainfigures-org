import type { Metadata } from 'next';
import CalcPageWrapper from '@/components/layout/CalcPageWrapper';
import TakeHomeCalc from '@/components/calculators/TakeHomeCalc';

import { calcPageJsonLd, CALC_FAQS } from '@/lib/structuredData';

// JSON-LD structured data for search engines
const jsonLdData = calcPageJsonLd({
  name: 'Salary Take-Home Calculator',
  description: 'Calculate your net salary after income tax and social contributions.',
  url: '/take-home',
  faqs: CALC_FAQS['/take-home'] || [],
});
export const metadata: Metadata = {
  title: 'Salary Take-Home Calculator — UK, Germany, USA, France, Netherlands, Australia — Plain Figures',
  description: 'Calculate your net take-home pay after tax and national insurance in the UK, Germany, USA, France, Netherlands, and Australia.',
};
export default function Page() {
  return (
    <>
      {jsonLdData.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <CalcPageWrapper code="10 / TAKE-HOME PAY" title="Salary Take-Home Calculator" learnHref="/learn/salary-take-home" learnLabel="How take-home is calculated"
      description="Calculate your net salary after income tax and social contributions. Covers UK, Germany, USA, France, Netherlands, and Australia — switch country instantly."
      toolHref="/take-home"
      rateContext="UK 2025/26 tax bands applied. Check again when budgets or rates change.">
      <TakeHomeCalc />
    </CalcPageWrapper>
    </>
  );
}
