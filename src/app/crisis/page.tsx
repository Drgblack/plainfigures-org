import type { Metadata } from 'next';
import CalcPageWrapper from '@/components/layout/CalcPageWrapper';
import CrisisCalc from '@/components/calculators/CrisisCalc';
export const metadata: Metadata = {
  title: 'Financial Crisis Survival Simulator — How Long Would Your Savings Last? — Plain Figures',
  description: 'Simulate job loss, cost-of-living shocks, and emergency scenarios. Find out exactly how long your savings would last.',
};
export default function Page() {
  return (
    <CalcPageWrapper code="16 / CRISIS SIMULATOR" title="Financial Crisis Survival Simulator" learnHref="/learn/financial-crisis" learnLabel="How to calculate your runway"
      description="Simulate job loss, inflation shock, or a financial emergency. See exactly how long your savings would last — and how much longer with emergency expense cuts."
      toolHref="/crisis">
      <CrisisCalc />
    </CalcPageWrapper>
  );
}
