import type { Metadata } from 'next';
import CalcPageWrapper from '@/components/layout/CalcPageWrapper';
import LTVCACCalc from '@/components/calculators/LTVCACCalc';

export const metadata: Metadata = {
  title: 'LTV & CAC Calculator — Plain Figures',
  description: 'Calculate Customer Lifetime Value, CAC ratio, and payback period. DCF-based LTV with scenario modelling for churn reduction, price increases, and growth investment.',
};

export default function Page() {
  return (
    <CalcPageWrapper
      code="P08 / LTV-CAC"
      title="LTV & CAC Calculator"
      description="Calculate Customer Lifetime Value, CAC ratio, and payback period. Model scenarios including churn reduction, ARPU growth, and high-growth acquisition to stress-test unit economics."
      professional
    >
      <LTVCACCalc />
    </CalcPageWrapper>
  );
}
