import type { Metadata } from 'next';
import CalcPageWrapper from '@/components/layout/CalcPageWrapper';
import SaveGoalCalc from '@/components/calculators/SaveGoalCalc';

export const metadata: Metadata = {
  title: 'Save for a Goal Calculator — Plain Figures',
  description: 'Find out how long it will take to reach any savings target, or what monthly contribution you need to get there on time.',
};

export default function SaveGoalPage() {
  return (
    <CalcPageWrapper
      code="09 / SAVE FOR A GOAL"
      title="Save for a Goal"
      description="Set a target amount and see how long it will take to get there — or what you need to save monthly to hit a deadline."
      toolHref="/save-goal"
    >
      <SaveGoalCalc />
    </CalcPageWrapper>
  );
}
