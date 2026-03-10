import { calculators, CalculatorConfig, generateAllSlugs } from './config';

type DynamicFaq = { q: string; a: string };

function hashSeed(value: string): number {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hash;
}

function signatureFor(params: Record<string, unknown>, config: CalculatorConfig): string {
  return `${config.id}:${config.params.map((param) => `${param.key}:${String(params[param.key])}`).join('|')}`;
}

function pickVariant(seed: string, values: readonly string[]): string {
  return values[hashSeed(seed) % values.length];
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-GB', {
    maximumFractionDigits: Number.isInteger(value) ? 0 : 2,
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
  }).format(value);
}

function currencyPrefixFor(config: CalculatorConfig): string {
  return config.params.find((param) => param.prefix === '£')?.prefix
    ?? config.params.find((param) => param.prefix === '$')?.prefix
    ?? '';
}

function formatValue(value: number | string, prefix?: string): string {
  if (typeof value === 'number') {
    if (prefix === '%' || prefix === 'pct') {
      return `${formatNumber(value)}%`;
    }

    if (prefix) {
      return `${prefix}${formatNumber(value)}`;
    }

    return formatNumber(value);
  }

  return String(value)
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function renderTemplate(template: string, params: Record<string, unknown>, config: CalculatorConfig): string {
  return config.params.reduce((output, param) => {
    const rawValue = params[param.key];
    const formattedValue = formatValue(
      typeof rawValue === 'number' || typeof rawValue === 'string' ? rawValue : String(rawValue),
      param.prefix
    );
    return output.replaceAll(`{{${param.key}}}`, formattedValue);
  }, template);
}

function exactNumbersSentence(params: Record<string, unknown>, config: CalculatorConfig): string {
  const firstThree = config.params
    .slice(0, 4)
    .map((param) => `${param.label.toLowerCase()} of ${formatValue(params[param.key] as number | string, param.prefix)}`);

  return `This page is built around an exact input set: ${firstThree.join(', ')}.`;
}

function buildScenarioInsight(config: CalculatorConfig, params: Record<string, unknown>, seed: string): string {
  const numericParam = config.params.find((param) => typeof params[param.key] === 'number' && param.values.length > 1);

  if (!numericParam) {
    const textParam = config.params.find((param) => typeof params[param.key] === 'string' && param.values.length > 1);
    if (!textParam) {
      return 'There are no secondary assumptions to rotate here, so the useful move is to rerun the calculator with a different input mix and compare the output rather than over-reading one static result.';
    }

    const currentIndex = textParam.values.findIndex((value) => value === params[textParam.key]);
    const nextValue = textParam.values[(currentIndex + 1) % textParam.values.length];
    return `One quick sensitivity check is to switch ${textParam.label.toLowerCase()} from ${formatValue(params[textParam.key] as string)} to ${formatValue(nextValue as string)}. That comparison is useful because this category usually changes more from structural assumptions than from copy or commentary, which is exactly why Plain Figures keeps the explanation formula-first.`;
  }

  const values = numericParam.values.filter((value): value is number => typeof value === 'number');
  const currentValue = params[numericParam.key] as number;
  const currentIndex = values.findIndex((value) => value === currentValue);
  const adjacentValue = values[Math.min(values.length - 1, currentIndex + 1)] ?? currentValue;
  const alternateValue = values[Math.max(0, currentIndex - 1)] ?? currentValue;
  const comparisonValue = adjacentValue === currentValue ? alternateValue : adjacentValue;
  const direction = comparisonValue > currentValue ? 'higher' : comparisonValue < currentValue ? 'lower' : 'similar';

  return pickVariant(seed, [
    `A fast scenario check is to rerun the maths with ${numericParam.label.toLowerCase()} moved from ${formatValue(currentValue, numericParam.prefix)} to ${formatValue(comparisonValue, numericParam.prefix)}. That creates a ${direction} input case and helps show whether the output is mostly driven by this assumption or by the other values in the page.`,
    `Because ${numericParam.label.toLowerCase()} is one of the core variables, changing it from ${formatValue(currentValue, numericParam.prefix)} to ${formatValue(comparisonValue, numericParam.prefix)} is usually the cleanest way to test sensitivity. If the answer barely moves, the current page is robust. If it shifts sharply, that variable is doing most of the work.`,
  ]);
}

function buildIntro(params: Record<string, unknown>, config: CalculatorConfig): string {
  const seed = signatureFor(params, config);
  const titleLead = renderTemplate(config.seoTemplate.h1, params, config);
  const exactNumbers = exactNumbersSentence(params, config);

  const paragraphOne = [
    `${titleLead} is not a broad finance article. It is a formula-first reference for one exact calculation. ${exactNumbers} That matters because most long-tail searches on Plain Figures are not asking for opinions. They are asking what the arithmetic says when a specific balance, rate, term, contribution, or risk assumption is plugged into the formula.`,
    `This is why the page stays intentionally narrow. A user who searches this combination usually wants the result, the mechanics behind it, and the assumptions that make the result true. They do not need a product pitch, a motivational checklist, or a generic explanation that could sit on any other site.`,
  ].join(' ');

  const paragraphTwo = [
    `The formula used here is ${config.formula}. That expression is the core of the page, but the practical value comes from how the variables interact. ${pickVariant(seed, [
      'One input controls scale, another controls speed, and another controls duration. The result is only as useful as the clarity of those assumptions.',
      'Some inputs make the answer look affordable or achievable in the short run while changing the lifetime cost in a less obvious way. That is why the page keeps the structure visible.',
      'Most misreadings happen when a user focuses on the headline output and misses the input that is quietly dominating the result. The page is written to reduce that risk.',
    ])}`,
    `Plain Figures keeps this copy heavy on numbers and light on interpretation for that reason. The goal is to make the model legible enough that you can change the inputs in the calculator and immediately understand why the output moves.`,
  ].join(' ');

  const paragraphThree = [
    `${pickVariant(seed, [
      'This page should be read as an illustration, not as advice.',
      'The page is useful precisely because it stops before turning the result into personalised advice.',
      'The strongest use of the page is comparison, not decision outsourcing.',
    ])} Real-world outcomes still depend on fees, taxes, market conditions, underwriting rules, behaviour, or health factors that sit outside the simplified model.`,
    `That disclaimer is not filler. It is what keeps a worked example honest. The arithmetic can still be exact for the inputs shown even when the real-world decision requires more context than a formula can capture.`,
  ].join(' ');

  return [paragraphOne, paragraphTwo, paragraphThree].join('\n\n');
}

function buildInterpretation(params: Record<string, unknown>, config: CalculatorConfig): string {
  const seed = `${signatureFor(params, config)}:interpretation`;
  const primaryParam = config.params[0];
  const secondaryParam = config.params[1];
  const currencyPrefix = currencyPrefixFor(config);
  const exactFigure = formatValue(params[primaryParam.key] as number | string, primaryParam.prefix);
  const secondFigure = secondaryParam ? formatValue(params[secondaryParam.key] as number | string, secondaryParam.prefix) : '';

  const paragraphOne = [
    `The useful interpretation starts with the scale of the current assumptions. ${primaryParam.label} is set to ${exactFigure}${secondaryParam ? ` and ${secondaryParam.label.toLowerCase()} is set to ${secondFigure}` : ''}. That combination tells you what this page is really about: not the category in the abstract, but the consequence of this exact input mix.`,
    `${pickVariant(seed, [
      'In practice, that means the page is most helpful when you compare it against one nearby scenario rather than reading it as a static answer.',
      'For most users, the next action is to change one assumption at a time and watch which variable moves the output hardest.',
      'The reason to embed the calculator is to turn this from a single answer into a controlled comparison exercise.',
    ])}`,
  ].join(' ');

  const paragraphTwo = [
    buildScenarioInsight(config, params, `${seed}:scenario-a`),
    buildScenarioInsight(config, params, `${seed}:scenario-b`),
    `Those checks matter because long-tail calculator pages tend to attract people who are already close to a decision. A page earns trust when it helps the user see the sensitivity of the model instead of pretending the first output is precise enough to act on without context.`,
  ].join(' ');

  const paragraphThree = [
    `A second interpretation layer is cost, timing, or risk transfer. Even when the output looks straightforward, there is usually a trade-off hiding underneath it. ${pickVariant(seed, [
      'A lower monthly number can mean a higher lifetime cost. A stronger growth assumption can mean a weaker certainty level. A higher risk allowance can mean more volatility in the tail.',
      'An attractive headline result can be supported by a fragile assumption. Extending time, raising return expectations, or tightening utilisation can all make a model look cleaner than the real world usually is.',
      'The page is most useful when it reveals which assumption is carrying the optimistic part of the answer. That is where the risk of overconfidence usually sits.',
    ])}`,
    `That is also why the site repeats the “no advice” position so often. Formula-first content only works at scale if the pages stay honest about what is modelled and what is not.`,
  ].join(' ');

  const paragraphFour = [
    `If you want a quick working rule, treat this page as a neutral benchmark. Start with the exact numbers shown here, then rerun the calculator with a more conservative case and a more aggressive case. If the result still looks reasonable across that range, the current setup is probably directionally robust. If the answer breaks quickly, the page has done its job by showing where the fragility sits.`,
    currencyPrefix ? `That benchmarking habit is especially useful on finance pages because even a small change in ${currencyPrefix}-denominated cash flow or contribution size can compound materially over time.` : `That benchmarking habit is especially useful on any model where the same formula can produce very different practical consequences from a small input change.`,
  ].join(' ');

  return [paragraphOne, paragraphTwo, paragraphThree, paragraphFour].join('\n\n');
}

function buildFaqs(params: Record<string, unknown>, config: CalculatorConfig): DynamicFaq[] {
  const labelledValues = config.params.map((param) => ({
    label: param.label,
    value: formatValue(params[param.key] as number | string, param.prefix),
  }));

  const first = labelledValues[0];
  const second = labelledValues[1];
  const third = labelledValues[2];

  return [
    {
      q: `What does this ${config.name.toLowerCase()} page actually calculate?`,
      a: `It calculates one specific version of the ${config.name.toLowerCase()} problem using ${first.label.toLowerCase()} at ${first.value}${second ? ` and ${second.label.toLowerCase()} at ${second.value}` : ''}. The page is designed to explain the formula and the sensitivity of the result, not to provide personalised advice.`,
    },
    {
      q: 'Why does the page mention the exact numbers in the headline and intro?',
      a: `Because the search intent is usually exact-match. Someone landing on this page is often checking a single worked example rather than reading a broad guide. Repeating the numbers keeps the page aligned with the query and makes the calculation auditable.`,
    },
    {
      q: `Which input is most likely to change the answer on this page?`,
      a: `${first.label} usually matters because it sets the scale of the calculation${second ? `, while ${second.label.toLowerCase()} often changes the pace or cost shape` : ''}. The safest way to see this is to rerun the calculator with one input changed at a time.`,
    },
    {
      q: 'Is this page enough to make a real-world decision?',
      a: 'No. It is enough to understand the arithmetic and to create a benchmark. Real decisions still depend on fees, taxes, legal structure, underwriting rules, market conditions, or behavioural constraints that a formula-first page does not model.',
    },
    {
      q: 'Why is the content so disclaimer-heavy?',
      a: 'Because worked examples can look more certain than they are. Plain Figures keeps the disclaimers explicit so users know where the formula ends and judgment begins.',
    },
    {
      q: `Can I use different values from the ${first.value}${second ? ` / ${second.value}` : ''} shown here?`,
      a: `Yes. The embedded calculator is there for that purpose. This page uses the exact input set for SEO and explanation, but the calculator lets you test nearby scenarios immediately.`,
    },
    {
      q: `What happens if ${second ? second.label.toLowerCase() : first.label.toLowerCase()} changes?`,
      a: `The answer will move according to the same formula, but the size of that move depends on the rest of the input set${third ? `, including ${third.label.toLowerCase()} at ${third.value}` : ''}. Scenario testing matters more than reading one output in isolation.`,
    },
    {
      q: 'Why does Plain Figures avoid “best option” recommendations on these pages?',
      a: 'Because the site is built to explain formulas, not to recommend products, portfolios, or actions. That keeps the pages cleaner, more reusable, and more trustworthy for users who want the maths without sales language.',
    },
    {
      q: `How should I use this page alongside the ${config.name.toLowerCase()} calculator?`,
      a: 'Read the page once to understand the formula and the assumptions, then rerun the calculator with a conservative case and an aggressive case. That comparison usually tells you more than any single output can.',
    },
  ];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createUniquePageContent(params: Record<string, any>, config: CalculatorConfig, slug?: string): { intro: string; interpretation: string; faqs: { q: string; a: string }[]; schema: any } {
  const intro = buildIntro(params, config);
  const interpretation = buildInterpretation(params, config);
  const faqs = buildFaqs(params, config);
  const title = renderTemplate(config.seoTemplate.title, params, config);
  const description = renderTemplate(config.seoTemplate.description, params, config);
  const url = slug ? `https://plainfigures.org/calculators/${config.categorySlug}/${slug}` : undefined;

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: title,
      description,
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      url,
      provider: {
        '@type': 'Organization',
        name: 'Plain Figures',
        url: 'https://plainfigures.org',
      },
      keywords: config.params.map((param) => `${param.label}:${formatValue(params[param.key], param.prefix)}`).join(', '),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    },
  ];

  return { intro, interpretation, faqs, schema };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function generateUniquePageContent(params: Record<string, any>, config: CalculatorConfig): { intro: string; interpretation: string; faqs: { q: string; a: string }[]; schema: any } {
  return createUniquePageContent(params, config);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getAllProgrammaticPages(): { url: string; title: string; description: string; contentProps: any }[] {
  return generateAllSlugs().map((page) => {
    const config = calculators.find((entry) => entry.categorySlug === page.categorySlug);

    if (!config) {
      throw new Error(`Missing calculator config for category "${page.categorySlug}"`);
    }

    const title = renderTemplate(config.seoTemplate.title, page.params, config);
    const description = renderTemplate(config.seoTemplate.description, page.params, config);

    return {
      url: `/calculators/${page.categorySlug}/${page.slug}`,
      title,
      description,
      contentProps: {
        config,
        params: page.params,
        slug: page.slug,
        ...createUniquePageContent(page.params, config, page.slug),
      },
    };
  });
}
