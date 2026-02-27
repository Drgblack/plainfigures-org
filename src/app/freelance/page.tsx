import type { Metadata } from 'next';
import CalcPageWrapper from '@/components/layout/CalcPageWrapper';
import FreelanceCalc from '@/components/calculators/FreelanceCalc';
export const metadata: Metadata = {
  title: 'Freelance Rate Calculator — Minimum Day Rate & Hourly Rate — Plain Figures',
  description: 'Work backwards from your desired salary to find the minimum hourly or day rate you need to charge as a freelancer or contractor.',
};
export default function Page() {
  return (
    <CalcPageWrapper code="14 / FREELANCE RATE" title="Freelance & Contractor Rate Calculator"
      description="Work backwards from your desired take-home salary. Enter your expenses, tax rate, and working pattern — get the minimum hourly and day rate you must charge.">
      <FreelanceCalc />
    </CalcPageWrapper>
  );
}
