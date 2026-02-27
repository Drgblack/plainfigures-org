import type { Metadata } from 'next';
import CalcPageWrapper from '@/components/layout/CalcPageWrapper';
import AffordabilityCalc from '@/components/calculators/AffordabilityCalc';
export const metadata: Metadata = {
  title: 'Mortgage Affordability Calculator — What Can I Borrow? — Plain Figures',
  description: 'Find out the maximum mortgage you can borrow based on your income, commitments, deposit, and stress test rates.',
};
export default function Page() {
  return (
    <CalcPageWrapper code="11 / AFFORDABILITY" title="Mortgage Affordability Calculator" learnHref="/learn/mortgage-affordability" learnLabel="How affordability is assessed"
      description="Find out what you can actually borrow — based on income multiples, monthly commitments, and a stress test at +3%. Includes LTV breakdown."
      toolHref="/affordability">
      <AffordabilityCalc />
    </CalcPageWrapper>
  );
}
