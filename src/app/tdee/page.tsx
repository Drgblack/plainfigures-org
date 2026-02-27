import type { Metadata } from 'next';
import CalcPageWrapper from '@/components/layout/CalcPageWrapper';
import TDEECalc from '@/components/calculators/TDEECalc';
export const metadata: Metadata = {
  title: 'TDEE Calculator — Total Daily Energy Expenditure & BMI — Plain Figures',
  description: 'Calculate your Total Daily Energy Expenditure (TDEE), BMR, BMI, and macro targets. Based on the Mifflin-St Jeor equation.',
};
export default function Page() {
  return (
    <CalcPageWrapper code="12 / TDEE" title="TDEE & Calorie Calculator"
      description="Calculate your Total Daily Energy Expenditure using the Mifflin-St Jeor equation. Includes BMI, BMR, weight loss/gain targets, and macro estimates."
      toolHref="/tdee">
      <TDEECalc />
    </CalcPageWrapper>
  );
}
