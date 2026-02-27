import type { Metadata } from 'next';
import CalcPageWrapper from '@/components/layout/CalcPageWrapper';
import CyberLimitCalc from '@/components/calculators/CyberLimitCalc';

export const metadata: Metadata = {
  title: 'Cyber Insurance Limit Recommender — Plain Figures',
  description: 'Estimate cyber insurance limit from revenue, data records, industry sector, and security controls. Risk score, exposure breakdown, GDPR fine modelling, and threat scenarios.',
};

export default function Page() {
  return (
    <CalcPageWrapper
      code="P10 / CYBER LIMIT"
      title="Cyber Insurance Limit Recommender"
      description="Estimate cyber insurance limit adequacy from revenue, record count, industry, and security controls. Risk gauge, exposure breakdown, and four threat-level scenarios."
      professional
      toolHref="/cyber-limit"
    >
      <CyberLimitCalc />
    </CalcPageWrapper>
  );
}
