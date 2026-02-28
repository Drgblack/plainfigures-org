import type { Metadata } from 'next';
import CalcPageWrapper from '@/components/layout/CalcPageWrapper';
import RetirementCalc from '@/components/calculators/RetirementCalc';

import { calcPageJsonLd, CALC_FAQS } from '@/lib/structuredData';

// JSON-LD structured data for search engines
const jsonLdData = calcPageJsonLd({
  name: 'Retirement Savings Calculator',
  description: 'Project your pension pot at retirement, including employer contributions and inflation.',
  url: '/retirement',
  faqs: CALC_FAQS['/retirement'] || [],
});

export const metadata: Metadata = {
  title: 'Retirement Savings Calculator — Plain Figures',
  description: 'Project your pension pot at retirement, accounting for inflation, employer contributions, and investment growth.',
};

export default function RetirementPage() {
  return (
    <>
      {jsonLdData.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <CalcPageWrapper
      code="06 / RETIREMENT"
      title="Retirement Savings Calculator"
      description="Project your pension pot at retirement age. Includes employer contributions, inflation adjustment, and a safe withdrawal rate estimate for monthly income."
      toolHref="/retirement"
      rateContext="Annual allowance 2025/26: £60,000 gross. State pension full entitlement: £11,502/year."
      learnHref="/learn/retirement-savings"
      learnLabel="How retirement projections work"
    >
      <RetirementCalc />
    </CalcPageWrapper>
    </>
  );
}
