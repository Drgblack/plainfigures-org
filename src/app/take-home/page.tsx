import type { Metadata } from 'next';
import CalcPageWrapper from '@/components/layout/CalcPageWrapper';
import TakeHomeCalc from '@/components/calculators/TakeHomeCalc';
export const metadata: Metadata = {
  title: 'Salary Take-Home Calculator — UK, Germany, USA, France, Netherlands, Australia — Plain Figures',
  description: 'Calculate your net take-home pay after tax and national insurance in the UK, Germany, USA, France, Netherlands, and Australia.',
};
export default function Page() {
  return (
    <CalcPageWrapper code="10 / TAKE-HOME PAY" title="Salary Take-Home Calculator" learnHref="/learn/salary-take-home" learnLabel="How take-home is calculated"
      description="Calculate your net salary after income tax and social contributions. Covers UK, Germany, USA, France, Netherlands, and Australia — switch country instantly."
      toolHref="/take-home"
      rateContext="UK 2025/26 tax bands applied. Check again when budgets or rates change.">
      <TakeHomeCalc />
    </CalcPageWrapper>
  );
}
