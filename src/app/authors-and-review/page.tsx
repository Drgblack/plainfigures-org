import type { Metadata } from 'next';
import InfoPageLayout from '@/components/layout/InfoPageLayout';
import { buildTrustMetadata } from '@/lib/seo/metadata';
import { TRUST_PAGES, renderTrustLinks } from '@/lib/trust-pages';

const page = TRUST_PAGES['authors-and-review'];

export const metadata: Metadata = buildTrustMetadata(page.title, page.description, 'authors-and-review');

export default function AuthorsAndReviewPage() {
  return (
    <InfoPageLayout eyebrow={page.eyebrow} title={page.title} description={page.description}>
      {page.sections.map((section) => (
        <section key={section.heading}>
          <h2>{section.heading}</h2>
          {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </section>
      ))}
      {renderTrustLinks(page.relatedLinks)}
    </InfoPageLayout>
  );
}
