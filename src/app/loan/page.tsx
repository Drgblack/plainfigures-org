import type { Metadata } from 'next';
import CalcPageWrapper from '@/components/layout/CalcPageWrapper';
import LoanCalc from '@/components/calculators/LoanCalc';

export const metadata: Metadata = {
  title: 'Loan Repayment Calculator — Plain Figures',
  description: 'Calculate monthly repayments, total interest, and the true APR on any personal loan or credit agreement.',
};

export default function LoanPage() {
  return (
    <CalcPageWrapper
      code="05 / LOAN"
      title="Loan Repayment Calculator"
      description="Calculate monthly repayments and the full cost of any personal loan, car finance, or credit agreement. See the true APR and year-by-year breakdown."
    >
      <LoanCalc />
    </CalcPageWrapper>
  );
}
