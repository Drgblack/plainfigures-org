/**
 * buildHowToSchema — Plain Figures
 *
 * Generates HowTo JSON-LD for guide pages.
 * Google uses this for "how to" rich results and featured snippets.
 * LLMs use structured steps when answering procedural questions.
 *
 * Usage in a guide page:
 *   const howTo = buildHowToSchema({
 *     name: 'How to Calculate Mortgage Repayments',
 *     description: 'Step-by-step guide to calculating your monthly mortgage payment.',
 *     totalTime: 'PT5M',
 *     steps: [
 *       { name: 'Gather your figures', text: 'You need: loan amount, annual interest rate, term in years.' },
 *       { name: 'Apply the formula', text: 'Monthly payment = P[r(1+r)^n]/[(1+r)^n-1]' },
 *       { name: 'Check with the calculator', text: 'Use our Mortgage Repayment Calculator to verify.' },
 *     ],
 *     tool: { name: 'Mortgage Repayment Calculator', url: 'https://plainfigures.org/mortgage' },
 *   });
 */

export interface HowToStep {
  name: string;
  text: string;
  url?: string;
}

export interface HowToSchemaInput {
  name: string;
  description: string;
  totalTime?: string;   // ISO 8601 duration, e.g. 'PT5M' = 5 minutes
  steps: HowToStep[];
  tool?: { name: string; url: string };
  estimatedCost?: { currency: string; value: string };
}

export function buildHowToSchema(input: HowToSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: input.name,
    description: input.description,
    ...(input.totalTime && { totalTime: input.totalTime }),
    ...(input.estimatedCost && {
      estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: input.estimatedCost.currency,
        value: input.estimatedCost.value,
      },
    }),
    tool: input.tool ? [{
      '@type': 'HowToTool',
      name: input.tool.name,
      url: input.tool.url,
    }] : [],
    step: input.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
      ...(s.url && { url: s.url }),
    })),
    provider: {
      '@type': 'Organization',
      name: 'Plain Figures',
      url: 'https://plainfigures.org',
    },
  };
}
