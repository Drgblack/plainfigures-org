import type { Metadata } from 'next';
import CalcPageWrapper from '@/components/layout/CalcPageWrapper';
import RetirementCalc from '@/components/calculators/RetirementCalc';

export const metadata: Metadata = {
  title: 'Retirement Savings Calculator — Plain Figures',
  description: 'Project your pension pot at retirement, accounting for inflation, employer contributions, and investment growth.',
};

export default function RetirementPage() {
  return (
    <CalcPageWrapper
      code="06 / RETIREMENT"
      title="Retirement Savings Calculator"
      description="Project your pension pot at retirement age. Includes employer contributions, inflation adjustment, and a safe withdrawal rate estimate for monthly income."
      learnHref="/learn/retirement-savings"
      learnLabel="How retirement projections work"
    >
      <RetirementCalc />
    </CalcPageWrapper>
  );
}
