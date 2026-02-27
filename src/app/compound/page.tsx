import type { Metadata } from 'next';
import CalcPageWrapper from '@/components/layout/CalcPageWrapper';
import CompoundCalc from '@/components/calculators/CompoundCalc';

export const metadata: Metadata = {
  title: 'Compound Interest Calculator — Plain Figures',
  description: 'See exactly how compound interest works at different frequencies — monthly, quarterly, annually, daily.',
};

export default function CompoundPage() {
  return (
    <CalcPageWrapper
      code="04 / COMPOUND INTEREST"
      title="Compound Interest Calculator"
      description="See how interest compounds over time. Choose your compounding frequency and compare the effective annual rate against the nominal rate."
    >
      <CompoundCalc />
    </CalcPageWrapper>
  );
}
