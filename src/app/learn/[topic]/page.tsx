import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import GuideLayout from '@/components/layout/GuideLayout';
import { PROGRAMMATIC_LEARN_TOPICS, getProgrammaticLearnTopic } from '@/lib/programmatic-learn-extensions';
import styles from './page.module.css';

export const revalidate = 86400;
export const dynamicParams = false;

type PageProps = {
  params: Promise<{
    topic: string;
  }>;
};

export function generateStaticParams() {
  return PROGRAMMATIC_LEARN_TOPICS.map((topic) => ({ topic: topic.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { topic } = await params;
  const extension = getProgrammaticLearnTopic(topic);

  if (!extension) {
    return {};
  }

  const canonical = `https://plainfigures.org/learn/${extension.slug}`;

  return {
    title: `${extension.title} | Plain Figures`,
    description: extension.description,
    alternates: { canonical },
    openGraph: {
      title: `${extension.title} | Plain Figures`,
      description: extension.description,
      url: canonical,
      type: 'article',
    },
  };
}

export default async function ProgrammaticLearnTopicPage({ params }: PageProps) {
  const { topic } = await params;
  const extension = getProgrammaticLearnTopic(topic);

  if (!extension) {
    notFound();
  }

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: extension.title,
      description: extension.description,
      author: {
        '@type': 'Organization',
        name: 'Plain Figures',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Plain Figures',
        url: 'https://plainfigures.org',
      },
      mainEntityOfPage: `https://plainfigures.org/learn/${extension.slug}`,
      keywords: extension.keywords.join(', '),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: extension.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <GuideLayout
        title={extension.title}
        description={extension.description}
        readTime={extension.readTime}
        relatedCalc={{ href: extension.calculatorHref, label: extension.calculatorLabel }}
        relatedGuides={extension.relatedGuides}
      >
        <div className={styles.page}>
          <div className={styles.notice}>
            <p className={styles.noticeText}>
              This extension page exists to support specific long-tail queries with formula-first explanations. It is intentionally narrow, deliberately opinion-free, and designed to lead into the relevant calculator rather than replace it.
            </p>
            <p className={styles.noticeText}>
              Plain Figures does not recommend products, wrappers, or financial actions here. The goal is to make the arithmetic and the assumptions visible.
            </p>
          </div>

          <section className={styles.section}>
            <h2>Core Formula</h2>
            <div className={styles.card}>
              <div className={styles.eyebrow}>{extension.formulaLabel}</div>
              <div className={styles.formula}>{extension.formulaExpression}</div>
              <ul className={styles.list}>
                {extension.variables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </section>

          {extension.sections.map((section) => (
            <section key={section.heading} className={styles.section}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}

          <section className={styles.section}>
            <h2>FAQ</h2>
            <div className={styles.faqList}>
              {extension.faq.map((item) => (
                <details key={item.question} className={styles.card}>
                  <summary className={styles.summary}>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <h2>Disclaimer</h2>
            <div className={styles.disclaimer}>{extension.disclaimer}</div>
          </section>
        </div>
      </GuideLayout>
    </>
  );
}
