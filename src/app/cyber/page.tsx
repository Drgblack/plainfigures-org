import type { Metadata } from 'next';
import CalcPageWrapper from '@/components/layout/CalcPageWrapper';
import CyberCalc from '@/components/calculators/CyberCalc';

export const metadata: Metadata = {
  title: 'Cyber Risk Exposure Calculator — Plain Figures',
  description: 'Estimate cyber breach costs, risk score, and recommended cover limit for SMBs. For brokers, risk managers, and business owners.',
};

export default function CyberPage() {
  return (
    <CalcPageWrapper
      code="P03 / CYBER RISK"
      title="Cyber Risk Exposure Calculator"
      description="Estimate your business's financial exposure to a cyber incident — including ransomware, data breach, regulatory fines, and business interruption. Toggle your security controls to see their impact."
      professional
    >
      <CyberCalc />
    </CalcPageWrapper>
  );
}
