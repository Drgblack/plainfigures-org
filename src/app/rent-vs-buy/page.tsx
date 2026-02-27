import type { Metadata } from 'next';
import CalcPageWrapper from '@/components/layout/CalcPageWrapper';
import RentVsBuyCalc from '@/components/calculators/RentVsBuyCalc';

export const metadata: Metadata = {
  title: 'Rent vs Buy Calculator — Plain Figures',
  description: 'Compare the long-term financial outcome of renting vs buying a property, including break-even analysis.',
};

export default function RentVsBuyPage() {
  return (
    <CalcPageWrapper
      code="03 / RENT VS BUY"
      title="Rent vs Buy Calculator"
      description="Compare the true financial outcome of renting versus buying over time, accounting for equity, investment returns, and opportunity cost."
    >
      <RentVsBuyCalc />
    </CalcPageWrapper>
  );
}
