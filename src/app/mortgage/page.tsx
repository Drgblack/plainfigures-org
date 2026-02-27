import type { Metadata } from 'next';
import CalcPageWrapper from '@/components/layout/CalcPageWrapper';
import MortgageCalc from '@/components/calculators/MortgageCalc';

export const metadata: Metadata = {
  title: 'Mortgage Repayment Calculator — Plain Figures',
  description: 'Calculate your monthly mortgage payment, total interest, and full repayment cost over any term.',
};

export default function MortgagePage() {
  return (
    <CalcPageWrapper
      code="01 / MORTGAGE"
      title="Mortgage Repayment Calculator"
      description="Enter your loan amount, interest rate, and term to see your monthly payment and the full cost of your mortgage."
      learnHref="/learn/mortgage-repayment"
      learnLabel="How mortgage calculations work"
    >
      <MortgageCalc />
    </CalcPageWrapper>
  );
}
