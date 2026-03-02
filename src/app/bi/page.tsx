import type { Metadata } from 'next';
import CalcPageWrapper from '@/components/layout/CalcPageWrapper';
import BICalc from '@/components/calculators/BICalc';

export const metadata: Metadata = {
  title: 'Business Interruption Sum Insured Calculator — Plain Figures',
  description: 'Calculate the correct Business Interruption sum insured using gross profit, trend uplift, and ICOW — for brokers and commercial clients.',
};

export default function BIPage() {
  return (
    <CalcPageWrapper
      code="P01 / BUSINESS INTERRUPTION"
      title="Business Interruption Sum Insured Calculator"
      description="Calculate the correct BI sum insured using gross profit, indemnity period, trend uplift, and increased cost of working (ICOW). Designed for commercial brokers and risk managers."
      professional
      toolHref="/bi"
      methodologyNote="Gross Profit basis"
    >
      <BICalc />
    </CalcPageWrapper>
  );
}
