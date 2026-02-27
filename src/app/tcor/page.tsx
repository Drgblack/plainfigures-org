import type { Metadata } from 'next';
import CalcPageWrapper from '@/components/layout/CalcPageWrapper';
import TCORCalc from '@/components/calculators/TCORCalc';
export const metadata: Metadata = {
  title: 'Total Cost of Risk (TCOR) Calculator — Plain Figures',
  description: 'Calculate your Total Cost of Risk across premiums, retained losses, administration, and risk control costs. Compare scenarios including high loss year and improved risk management.',
};
export default function Page() {
  return (
    <CalcPageWrapper
      code="P04 / TCOR"
      title="Total Cost of Risk (TCOR) Calculator"
      description="Aggregate your true cost of risk across premiums, retained losses, administration, and risk control expenditure. Compare four scenarios including a high loss year and improved risk management."
      professional
    >
      <TCORCalc />
    </CalcPageWrapper>
  );
}
