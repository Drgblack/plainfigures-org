import type { Metadata } from 'next';
import CalcPageWrapper from '@/components/layout/CalcPageWrapper';
import LoanCalc from '@/components/calculators/LoanCalc';

import { calcPageJsonLd, CALC_FAQS } from '@/lib/structuredData';

// JSON-LD structured data for search engines
const jsonLdData = calcPageJsonLd({
  name: 'Loan Repayment Calculator',
  description: 'Calculate monthly repayments and the true APR on any loan or credit agreement.',
  url: '/loan',
  faqs: CALC_FAQS['/loan'] || [],
});

export const metadata: Metadata = {
  title: 'Loan Repayment Calculator — Plain Figures',
  description: 'Calculate monthly repayments, total interest, and the true APR on any personal loan or credit agreement.',
};

export default function LoanPage() {
  return (
    <>
      {jsonLdData.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <CalcPageWrapper
      code="05 / LOAN"
      title="Loan Repayment Calculator"
      description="Calculate monthly repayments and the full cost of any personal loan, car finance, or credit agreement. See the true APR and year-by-year breakdown."
      toolHref="/loan"
    >
      <LoanCalc />
    </CalcPageWrapper>
    </>
  );
}
