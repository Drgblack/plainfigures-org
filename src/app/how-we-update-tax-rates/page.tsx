import type { Metadata } from 'next';
import InfoPageLayout from '@/components/layout/InfoPageLayout';
import { TRUST_PAGES, renderTrustLinks } from '@/lib/trust-pages';

const page = TRUST_PAGES['how-we-update-tax-rates'];

export const metadata: Metadata = {
  title: 'How We Update Tax Rates',
  description: page.description,
};

export default function TaxRateUpdatePage() {
  return (
    <InfoPageLayout eyebrow={page.eyebrow} title={page.title} description={page.description}>
      {page.sections.map((section) => (
        <section key={section.heading}>
          <h2>{section.heading}</h2>
          {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {section.bullets && (
            <ul>
              {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
            </ul>
          )}
        </section>
      ))}
      {renderTrustLinks(page.relatedLinks)}
    </InfoPageLayout>
  );
}
