import type { Metadata } from 'next';
import CalcPageWrapper from '@/components/layout/CalcPageWrapper';
import LossProbabilityCalc from '@/components/calculators/LossProbabilityCalc';

export const metadata: Metadata = {
  title: 'Loss Event Probability Modeler — Plain Figures',
  description: 'Model expected annual loss using triangular distributions. Exceedance probabilities, aggregate PML, mitigation impact, and editable risk event register.',
};

export default function Page() {
  return (
    <CalcPageWrapper
      code="P09 / LOSS MODEL"
      title="Loss Event Probability Modeler"
      description="Model expected annual loss from 1–10 risk events using triangular distributions. View exceedance probabilities, aggregate PML, and the impact of mitigation controls."
      professional
      toolHref="/loss-probability"
    >
      <LossProbabilityCalc />
    </CalcPageWrapper>
  );
}
