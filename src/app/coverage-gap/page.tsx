import type { Metadata } from 'next';
import CalcPageWrapper from '@/components/layout/CalcPageWrapper';
import CoverageGapCalc from '@/components/calculators/CoverageGapCalc';

export const metadata: Metadata = {
  title: 'Coverage Gap Analysis Tool — Plain Figures',
  description: 'Compare policy limits against exposures across all lines. Identify uninsured gaps, coinsurance penalty exposure, and the impact of growth on coverage adequacy.',
};

export default function Page() {
  return (
    <CalcPageWrapper
      code="P07 / COVERAGE GAP"
      title="Coverage Gap Analysis"
      description="Map your policy limits against exposure values across property, liability, BI, and cyber lines. Identify uninsured gaps and model the impact of business growth on coverage adequacy."
      professional
      toolHref="/coverage-gap"
    >
      <CoverageGapCalc />
    </CalcPageWrapper>
  );
}
