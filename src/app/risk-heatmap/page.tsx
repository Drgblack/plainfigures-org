import type { Metadata } from 'next';
import CalcPageWrapper from '@/components/layout/CalcPageWrapper';
import RiskHeatMapCalc from '@/components/calculators/RiskHeatMapCalc';
export const metadata: Metadata = {
  title: 'Risk Score & Heat Map Generator — Plain Figures',
  description: 'Score and plot risks by likelihood and impact on a 5x5 heat map. Compare pre- and post-mitigation positions. Editable risk register.',
};
export default function Page() {
  return (
    <CalcPageWrapper
      code="P05 / RISK HEAT MAP"
      title="Risk Score & Heat Map Generator"
      description="Score risks by likelihood and impact, plot them on a 5x5 heat map, and compare pre- vs post-mitigation positions. Editable risk register with Critical / High / Medium / Low classification."
      professional
    >
      <RiskHeatMapCalc />
    </CalcPageWrapper>
  );
}
