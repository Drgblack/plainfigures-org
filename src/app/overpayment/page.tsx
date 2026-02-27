import type { Metadata } from 'next';
import CalcPageWrapper from '@/components/layout/CalcPageWrapper';
import OverpaymentCalc from '@/components/calculators/OverpaymentCalc';

export const metadata: Metadata = {
  title: 'Mortgage Overpayment Calculator — Plain Figures',
  description: 'Calculate how much interest and time you save by making extra monthly mortgage payments.',
};

export default function OverpaymentPage() {
  return (
    <CalcPageWrapper
      code="08 / OVERPAYMENT"
      title="Mortgage Overpayment Calculator"
      description="See the exact impact of paying a little extra each month — how much interest you save, and how many years come off your mortgage term."
      toolHref="/overpayment"
    >
      <OverpaymentCalc />
    </CalcPageWrapper>
  );
}
