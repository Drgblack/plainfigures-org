import type { Metadata } from 'next';
import CalcPageWrapper from '@/components/layout/CalcPageWrapper';
import SCRCalc from '@/components/calculators/SCRCalc';
export const metadata: Metadata = {
  title: 'Solvency Capital Requirement (SCR) Estimator — Plain Figures',
  description: 'Estimate SCR using simplified Solvency II standard formula principles. Market risk, underwriting risk, operational risk, diversification credit. Stress test scenarios.',
};
export default function Page() {
  return (
    <CalcPageWrapper
      code="P06 / SCR"
      title="Solvency Capital Requirement (SCR) Estimator"
      description="Estimate minimum regulatory capital under Solvency II standard formula principles. Stress test across market crash, catastrophe year, and combined scenarios. Solvency ratio gauge with adequacy rating."
      professional
      toolHref="/scr"
      methodologyNote="Solvency II standard formula"
    >
      <SCRCalc />
    </CalcPageWrapper>
  );
}
