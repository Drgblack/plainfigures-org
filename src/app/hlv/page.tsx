import type { Metadata } from 'next';
import CalcPageWrapper from '@/components/layout/CalcPageWrapper';
import HLVCalc from '@/components/calculators/HLVCalc';

export const metadata: Metadata = {
  title: 'Human Life Value / Life Insurance Needs Calculator — Plain Figures',
  description: 'Calculate the Human Life Value and identify life insurance coverage gaps. Used by protection brokers and financial planners.',
};

export default function HLVPage() {
  return (
    <CalcPageWrapper
      code="P02 / HUMAN LIFE VALUE"
      title="Life Insurance Needs Calculator"
      description="Calculate Human Life Value — the present value of future earnings, debts, and obligations — to identify your true life insurance requirement and coverage gap."
      professional
    >
      <HLVCalc />
    </CalcPageWrapper>
  );
}
