import type { Metadata } from 'next';
import CalcPageWrapper from '@/components/layout/CalcPageWrapper';
import MortgageCalc from '@/components/calculators/MortgageCalc';

export const metadata: Metadata = {
  title: 'Mortgage Repayment Calculator',
  description: 'Calculate your monthly mortgage payment, total interest, and full repayment cost over any term. Formula-first, no advice.',
  openGraph: {
    title: 'Mortgage Repayment Calculator — Plain Figures',
    description: 'Calculate monthly payment, total interest, and full cost over any term.',
    url: 'https://plainfigures.org/mortgage',
    type: 'website',
  },
  alternates: { canonical: 'https://plainfigures.org/mortgage' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Mortgage Repayment Calculator',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://plainfigures.org/mortgage',
  description: 'Calculate your monthly mortgage payment, total interest, and amortisation schedule over any term.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
  provider: { '@type': 'Organization', name: 'Plain Figures', url: 'https://plainfigures.org' },
};

export default function MortgagePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CalcPageWrapper
      code="01 / MORTGAGE"
      title="Mortgage Repayment Calculator"
      description="Enter your loan amount, interest rate, and term to see your monthly payment and the full cost of your mortgage."
      toolHref="/mortgage"
      rateContext="Bank of England base rate: 5.25% (Feb 2026). Results change when your deal ends or rates move."
      learnHref="/learn/mortgage-repayment"
      learnLabel="How mortgage calculations work"
    >
      <MortgageCalc />
    </CalcPageWrapper>
    </>
  );
}
