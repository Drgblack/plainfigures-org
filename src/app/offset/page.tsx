import type { Metadata } from 'next';
import CalcPageWrapper from '@/components/layout/CalcPageWrapper';
import OffsetCalc from '@/components/calculators/OffsetCalc';

export const metadata: Metadata = {
  title: 'Offset Mortgage Calculator — Plain Figures',
  description: 'See how much interest your savings offset against your mortgage, and how much earlier you could pay it off.',
};

export default function OffsetPage() {
  return (
    <CalcPageWrapper
      code="07 / OFFSET MORTGAGE"
      title="Offset Mortgage Calculator"
      description="See how holding savings in an offset account reduces the interest you pay — and how much sooner you could be mortgage-free."
    >
      <OffsetCalc />
    </CalcPageWrapper>
  );
}
