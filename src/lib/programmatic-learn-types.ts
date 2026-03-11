export interface ProgrammaticLearnSection {
  heading: string;
  paragraphs: string[];
}

export interface ProgrammaticLearnFaq {
  question: string;
  answer: string;
}

export interface ProgrammaticLearnTopic {
  slug: string;
  title: string;
  description: string;
  readTime: string;
  categorySlug: string;
  calculatorHref: string;
  calculatorLabel: string;
  keywords: string[];
  formulaLabel: string;
  formulaExpression: string;
  variables: string[];
  relatedGuides: { href: string; label: string }[];
  sections: ProgrammaticLearnSection[];
  faq: ProgrammaticLearnFaq[];
  disclaimer: string;
}
