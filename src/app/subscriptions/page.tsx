import type { Metadata } from 'next';
import CalcPageWrapper from '@/components/layout/CalcPageWrapper';
import SubscriptionCalc from '@/components/calculators/SubscriptionCalc';
export const metadata: Metadata = {
  title: 'Subscription Cost Calculator — True 10-Year Cost — Plain Figures',
  description: 'See the true 10-year cost of your subscriptions and the investment opportunity cost. Add your own subscriptions.',
};
export default function Page() {
  return (
    <CalcPageWrapper code="13 / SUBSCRIPTIONS" title="Subscription Drain Calculator"
      description="Toggle your active subscriptions and see the true 10-year cost — and what that money would be worth if invested instead.">
      <SubscriptionCalc />
    </CalcPageWrapper>
  );
}
