import type { Metadata } from 'next';
import CalcPageWrapper from '@/components/layout/CalcPageWrapper';
import LifestyleInflationCalc from '@/components/calculators/LifestyleInflationCalc';
export const metadata: Metadata = {
  title: 'Lifestyle Inflation Tracker — Plain Figures',
  description: 'Compare your current monthly spending to your entry-level budget and see the 10-year opportunity cost of lifestyle inflation.',
};
export default function Page() {
  return (
    <CalcPageWrapper code="15 / LIFESTYLE INFLATION" title="Lifestyle Inflation Tracker"
      description="Compare what you spend now to what you spent when you started out. See the real 10-year cost of lifestyle creep — and the opportunity cost if that money had been invested."
      toolHref="/lifestyle-inflation">
      <LifestyleInflationCalc />
    </CalcPageWrapper>
  );
}
