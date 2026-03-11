import type { ProgrammaticLearnTopic } from '@/lib/programmatic-learn-types';

export const CALCULATOR_PAIRING_TOPICS: ProgrammaticLearnTopic[] = [
  {
    slug: 'savings-growth',
    title: 'Savings Growth: How Regular Contributions Compound Over Time',
    description: 'A formula-first explainer for savings growth projections, covering starting balances, monthly additions, rates, and the split between contributions and earned interest.',
    readTime: '6 min',
    categorySlug: 'savings-growth',
    calculatorHref: '/savings',
    calculatorLabel: 'Savings Growth Calculator',
    keywords: ['savings growth calculator', 'regular savings formula', 'monthly contribution growth', 'compound savings'],
    formulaLabel: 'Future value of a starting balance plus contributions',
    formulaExpression: 'FV = P(1 + r / n)^(nt) + PMT x [((1 + r / n)^(nt) - 1) / (r / n)]',
    variables: ['P = starting balance', 'PMT = recurring contribution', 'r = annual rate', 'n = compounding periods per year', 't = years'],
    relatedGuides: [
      { href: '/learn/compound-interest', label: 'Understanding Compound Interest' },
      { href: '/learn/save-for-goal', label: 'Save for a Goal: Time & Amount Basics' },
      { href: '/learn/retirement-savings', label: 'How Retirement Savings Projections Work' },
    ],
    sections: [
      {
        heading: 'Why this page matters',
        paragraphs: [
          'Savings-growth queries are usually practical rather than theoretical. People want to see how much of the future balance comes from their own deposits and how much comes from compounding.',
          'That makes this a strong support page for Plain Figures because it keeps the arithmetic visible and leads directly into the calculator.',
        ],
      },
      {
        heading: 'What moves the outcome',
        paragraphs: [
          'The main levers are the starting balance, the contribution stream, and the rate assumption. In the early years, contributions often matter more than small differences in rate.',
          'A useful explainer should therefore focus on the interaction of those variables rather than treating compounding as magic.',
        ],
      },
    ],
    faq: [
      { question: 'What matters more: a higher rate or a higher monthly contribution?', answer: 'For many savers building from a low base, the contribution amount matters more at first. The rate matters more once the balance has grown.' },
      { question: 'Is a savings projection a guaranteed result?', answer: 'No. It is a model based on assumptions about rate, contribution consistency, and time.' },
    ],
    disclaimer: 'Illustrative only. Savings-growth examples do not account for tax, fees, changing rates, or provider-specific rules unless stated.',
  },
  {
    slug: 'human-life-value',
    title: 'Human Life Value: How Income Replacement Maths Works',
    description: 'Explains how human life value models convert future earnings, obligations, and discount rates into a present-value insurance benchmark.',
    readTime: '6 min',
    categorySlug: 'human-life-value',
    calculatorHref: '/hlv',
    calculatorLabel: 'Human Life Value Calculator',
    keywords: ['human life value', 'life insurance needs formula', 'income replacement calculation', 'present value protection'],
    formulaLabel: 'Present value of economic value at risk',
    formulaExpression: 'HLV approx. sum[(Income_t - personal consumption_t + obligations_t) / (1 + d)^t]',
    variables: ['Future earnings are projected across the protection period', 'Personal consumption is removed', 'Debts and obligations can be added separately', 'd = discount rate'],
    relatedGuides: [
      { href: '/learn/business-interruption', label: 'Business Interruption Sum Insured: How It Works' },
      { href: '/learn/retirement-savings', label: 'How Retirement Savings Projections Work' },
      { href: '/learn/financial-crisis', label: 'How to Calculate Your Financial Runway' },
    ],
    sections: [
      {
        heading: 'Why HLV is a finance calculation',
        paragraphs: [
          'Human life value is fundamentally a present-value problem. The core question is what stream of economic value disappears if one income is removed.',
          'That fits Plain Figures well because the concept is sensitive, but the arithmetic is still explicit and auditable.',
        ],
      },
      {
        heading: 'Why simple income multiples fall short',
        paragraphs: [
          'Two households on the same salary can have very different protection gaps once debt, childcare, and timing are included. A flat multiple hides those differences.',
          'A formula-first page is useful because it shows which assumptions are moving the result and why.',
        ],
      },
    ],
    faq: [
      { question: 'Is human life value the same as a policy recommendation?', answer: 'No. It is an economic benchmark, not a product recommendation.' },
      { question: 'Why subtract personal consumption?', answer: 'Because not every pound of lost earnings needs to be replaced in the household budget.' },
    ],
    disclaimer: 'Illustrative only. Human life value outputs are not insurance advice, underwriting advice, or a substitute for suitability assessment.',
  },
  {
    slug: 'total-cost-of-risk',
    title: 'Total Cost of Risk: What TCOR Actually Measures',
    description: 'A formula-first guide to total cost of risk, showing how premiums, retained losses, administration, and control spend combine into a single risk-cost view.',
    readTime: '6 min',
    categorySlug: 'total-cost-risk',
    calculatorHref: '/tcor',
    calculatorLabel: 'Total Cost of Risk Calculator',
    keywords: ['total cost of risk', 'tcor formula', 'premium plus retained losses', 'risk financing cost'],
    formulaLabel: 'TCOR identity',
    formulaExpression: 'TCOR = premiums + retained losses + risk control spend + administration',
    variables: ['Premiums capture transferred risk cost', 'Retained losses capture self-funded claim cost', 'Administration includes internal and external friction', 'Risk control spend includes prevention cost'],
    relatedGuides: [
      { href: '/learn/business-interruption', label: 'Business Interruption Sum Insured: How It Works' },
      { href: '/learn/cyber-resilient-agency', label: 'Cyber-Resilient Agency: Protecting Client Data' },
      { href: '/learn/parametric-insurance-weather', label: 'Parametric Insurance: Instant-Payout Weather Triggers' },
    ],
    sections: [
      {
        heading: 'Why premium alone is weak',
        paragraphs: [
          'A lower premium does not automatically mean lower risk cost. Cost can simply move into retained losses or operational friction.',
          'TCOR pages matter because they shift the question from insurance price to total risk cost.',
        ],
      },
      {
        heading: 'Where the page becomes decision-useful',
        paragraphs: [
          'TCOR is strongest when comparing scenarios such as higher deductibles, different structures, or additional controls.',
          'That makes it a high-intent professional page rather than generic insurance commentary.',
        ],
      },
    ],
    faq: [
      { question: 'Does a lower premium always reduce TCOR?', answer: 'No. If retained losses or admin friction rise more than premium falls, TCOR can increase.' },
      { question: 'Why include control spend?', answer: 'Because prevention and mitigation are part of the real cost of managing risk.' },
    ],
    disclaimer: 'Illustrative only. TCOR outputs depend on modelling assumptions and should not be treated as audited financial statements or advice.',
  },
  {
    slug: 'risk-heatmap-explained',
    title: 'Risk Heat Maps: Likelihood, Impact, and Their Limits',
    description: 'Explains how 5x5 risk heat maps are built, what the scoring means, and why the visual should support rather than replace underlying probability thinking.',
    readTime: '5 min',
    categorySlug: 'risk-heatmap',
    calculatorHref: '/risk-heatmap',
    calculatorLabel: 'Risk Heat Map Calculator',
    keywords: ['risk heat map', 'likelihood impact matrix', 'risk scoring explained', '5x5 heatmap'],
    formulaLabel: 'Ordinal scoring framework',
    formulaExpression: 'Score = likelihood band x impact band',
    variables: ['Likelihood bands convert rough frequency into a shared scale', 'Impact bands convert severity into a shared scale', 'Controls and velocity often sit outside the basic score'],
    relatedGuides: [
      { href: '/learn/total-cost-of-risk', label: 'Total Cost of Risk: What TCOR Actually Measures' },
      { href: '/learn/cyber-resilient-agency', label: 'Cyber-Resilient Agency: Protecting Client Data' },
      { href: '/learn/loss-event-probability', label: 'Loss Event Probability: Expected Loss and Scenario Weighting' },
    ],
    sections: [
      {
        heading: 'Why heat maps stay popular',
        paragraphs: [
          'Heat maps compress a complex risk register into something leaders can scan quickly. That is why they remain common even though they are not pure quantitative models.',
          'A good explainer needs to show what the matrix is doing and what it is not doing.',
        ],
      },
      {
        heading: 'Why the score is not magic',
        paragraphs: [
          'A score of 20 is not automatically twice as risky as a score of 10 in a mathematically rigorous sense. The grid is a prioritisation tool, not a full loss model.',
          'That distinction makes the page useful because it helps teams use the visual without over-reading it.',
        ],
      },
    ],
    faq: [
      { question: 'Does a heat map calculate expected loss?', answer: 'Not directly. It ranks risks on a likelihood-impact scale rather than producing a monetary expectation.' },
      { question: 'Why do teams score the same risk differently?', answer: 'Because the bands are partly judgment-based unless the organisation defines them tightly.' },
    ],
    disclaimer: 'Illustrative only. Heat-map scores are organisational judgments and should not be mistaken for actuarial estimates or guaranteed forecasts.',
  },
  {
    slug: 'solvency-capital-requirement',
    title: 'Solvency Capital Requirement: Standard Formula Basics',
    description: 'A plain-language explainer of how standard-formula SCR thinking combines risk modules, diversification, and capital charges into a solvency benchmark.',
    readTime: '6 min',
    categorySlug: 'scr-estimator',
    calculatorHref: '/scr',
    calculatorLabel: 'SCR Estimator',
    keywords: ['solvency capital requirement', 'scr formula', 'solvency ii capital explained', 'standard formula scr'],
    formulaLabel: 'Module aggregation logic',
    formulaExpression: 'SCR approx. sqrt(sum_i sum_j Corr_ij x SCR_i x SCR_j)',
    variables: ['SCR_i = module capital charge', 'Corr_ij = diversification matrix', 'Aggregated capital is lower than a simple sum when risks are imperfectly correlated'],
    relatedGuides: [
      { href: '/learn/total-cost-of-risk', label: 'Total Cost of Risk: What TCOR Actually Measures' },
      { href: '/learn/loss-event-probability', label: 'Loss Event Probability: Expected Loss and Scenario Weighting' },
      { href: '/learn/parametric-insurance-weather', label: 'Parametric Insurance: Instant-Payout Weather Triggers' },
    ],
    sections: [
      {
        heading: 'Why SCR is an aggregation problem',
        paragraphs: [
          'The standard formula does not simply add every capital charge together. It recognises that different risks do not peak together in a fully additive way.',
          'That makes diversification central to the calculation and central to the explainer.',
        ],
      },
      {
        heading: 'Why the page fits Plain Figures',
        paragraphs: [
          'Users searching for SCR basics usually want the mechanics, not broad regulatory commentary.',
          'A formula-first page can meet that intent cleanly without drifting into legal interpretation.',
        ],
      },
    ],
    faq: [
      { question: 'Why is the total SCR not just the sum of all module SCRs?', answer: 'Because diversification is recognised through the correlation matrix.' },
      { question: 'Does this page provide regulatory advice?', answer: 'No. It explains the mechanics at a high level and does not replace legal, actuarial, or supervisory guidance.' },
    ],
    disclaimer: 'Illustrative only. SCR examples here are educational summaries, not solvency advice, regulatory interpretation, or filing guidance.',
  },
  {
    slug: 'coverage-gap-analysis',
    title: 'Coverage Gap Analysis: Comparing Limits to Real Exposure',
    description: 'Shows how coverage-gap analysis compares policy limits, sublimits, and retained losses against the exposure they are meant to absorb.',
    readTime: '6 min',
    categorySlug: 'coverage-gap',
    calculatorHref: '/coverage-gap',
    calculatorLabel: 'Coverage Gap Analysis Calculator',
    keywords: ['coverage gap analysis', 'underinsurance calculation', 'policy limits vs exposure', 'insurance gap analysis'],
    formulaLabel: 'Gap framing',
    formulaExpression: 'Coverage gap = modeled exposure - recoverable insurance response',
    variables: ['Modeled exposure represents the tested severity', 'Recoverable response depends on limits, deductibles, and exclusions', 'A positive gap indicates retained exposure'],
    relatedGuides: [
      { href: '/learn/business-interruption', label: 'Business Interruption Sum Insured: How It Works' },
      { href: '/learn/total-cost-of-risk', label: 'Total Cost of Risk: What TCOR Actually Measures' },
      { href: '/learn/human-life-value', label: 'Human Life Value: How Income Replacement Maths Works' },
    ],
    sections: [
      {
        heading: 'Why insured is not the same as protected',
        paragraphs: [
          'Many organisations know they have insurance but do not know whether the limit actually reaches the loss scenarios that matter.',
          'Coverage-gap analysis exists to compare exposure with recoverable response rather than policy with no policy.',
        ],
      },
      {
        heading: 'Why underinsurance hides',
        paragraphs: [
          'Underinsurance often appears through trend drift, inflation, sublimits, or scenario assumptions that are never updated.',
          'A formula-first page is useful because it shows where the retained exposure still sits.',
        ],
      },
    ],
    faq: [
      { question: 'Can a policy with a high limit still leave a gap?', answer: 'Yes. Deductibles, sublimits, exclusions, and waiting periods can all reduce recoverable value.' },
      { question: 'Is a coverage gap always a problem?', answer: 'Not automatically. Some retained exposure is intentional, but it should be chosen knowingly.' },
    ],
    disclaimer: 'Illustrative only. Coverage-gap outputs are scenario-based and do not interpret policy wording or replace broker, legal, or underwriting review.',
  },
  {
    slug: 'ltv-cac-explained',
    title: 'LTV to CAC: How Customer Economics Are Actually Calculated',
    description: 'Explains customer lifetime value, acquisition cost, gross-margin adjustment, and payback period so users can read LTV:CAC ratios correctly.',
    readTime: '6 min',
    categorySlug: 'ltv-cac',
    calculatorHref: '/ltv-cac',
    calculatorLabel: 'LTV & CAC Calculator',
    keywords: ['ltv cac formula', 'customer lifetime value explained', 'payback period saas', 'ltv cac ratio'],
    formulaLabel: 'Unit-economics framing',
    formulaExpression: 'LTV approx. (ARPU x gross margin) / churn; LTV:CAC = LTV / CAC',
    variables: ['ARPU = average revenue per user', 'Gross margin converts revenue into contribution value', 'Churn controls customer lifespan', 'CAC captures acquisition spend'],
    relatedGuides: [
      { href: '/learn/agentic-advisor', label: 'The Agentic Advisor: AI-Driven Digital Co-Workers' },
      { href: '/learn/automation-audit-2026', label: 'Automation Audit: Tasks to Delegate to AI in 2026' },
      { href: '/learn/digital-client-experience-phygital', label: 'Digital Client Experience: Phygital Engagement Platforms' },
    ],
    sections: [
      {
        heading: 'Why the ratio can mislead',
        paragraphs: [
          'LTV:CAC compresses customer economics into a headline ratio, but the ratio is only as good as the churn, margin, and payback assumptions underneath it.',
          'That is why users search for the formula, not just the benchmark.',
        ],
      },
      {
        heading: 'What usually does the work',
        paragraphs: [
          'In many models, churn and gross margin change the answer more than small shifts in acquisition spend.',
          'A formula-first page is useful because it shows where optimism usually enters the model.',
        ],
      },
    ],
    faq: [
      { question: 'Is a 3:1 LTV:CAC ratio always good?', answer: 'Not automatically. The ratio can still hide slow payback or aggressive assumptions.' },
      { question: 'Why adjust LTV for gross margin?', answer: 'Because revenue is not the same as retained economic value after direct delivery cost.' },
    ],
    disclaimer: 'Illustrative only. LTV:CAC outputs depend on modelling assumptions and are not valuations, forecasts, or investment advice.',
  },
  {
    slug: 'loss-event-probability',
    title: 'Loss Event Probability: Expected Loss and Scenario Weighting',
    description: 'A formula-first guide to loss-event probability, expected annual loss, and why severity assumptions matter as much as likelihood assumptions.',
    readTime: '6 min',
    categorySlug: 'loss-probability',
    calculatorHref: '/loss-probability',
    calculatorLabel: 'Loss Event Probability Modeler',
    keywords: ['loss event probability', 'expected annual loss', 'probability severity model', 'risk scenario weighting'],
    formulaLabel: 'Expected loss identity',
    formulaExpression: 'Expected loss = sum(probability_i x severity_i)',
    variables: ['Probability expresses event frequency', 'Severity expresses the consequence if the event occurs', 'Multiple scenarios can be weighted into one loss picture'],
    relatedGuides: [
      { href: '/learn/total-cost-of-risk', label: 'Total Cost of Risk: What TCOR Actually Measures' },
      { href: '/learn/risk-heatmap-explained', label: 'Risk Heat Maps: Likelihood, Impact, and Their Limits' },
      { href: '/learn/cyber-resilient-agency', label: 'Cyber-Resilient Agency: Protecting Client Data' },
    ],
    sections: [
      {
        heading: 'Why expected loss needs both dimensions',
        paragraphs: [
          'Risk discussions often over-focus on probability or on severity. Expected-loss thinking forces both dimensions into the same frame.',
          'That makes the page useful because it answers a specific search intent while giving the calculator the context it needs.',
        ],
      },
      {
        heading: 'Where model quality breaks',
        paragraphs: [
          'Weak models usually fail because the scenario set is incomplete or the severity range is too narrow, not because the arithmetic is hard.',
          'A good explainer should therefore treat expected loss as a summary statistic rather than the whole truth about risk.',
        ],
      },
    ],
    faq: [
      { question: 'Is expected loss the amount I will lose this year?', answer: 'No. It is an average expectation across scenarios, not a prediction of the exact realised outcome.' },
      { question: 'Can a low-probability event still dominate the model?', answer: 'Yes. If the severity is large enough, it can contribute materially even with a small probability.' },
    ],
    disclaimer: 'Illustrative only. Loss-probability outputs depend on scenario assumptions and should not be treated as actuarial certification or guaranteed forecasts.',
  },
  {
    slug: 'cyber-insurance-limit',
    title: 'Cyber Insurance Limits: How Adequacy Is Estimated',
    description: 'Explains how cyber-limit estimates combine revenue, records, dependency risk, and control strength to frame whether a limit is thin, adequate, or excessive.',
    readTime: '6 min',
    categorySlug: 'cyber-limit',
    calculatorHref: '/cyber-limit',
    calculatorLabel: 'Cyber Insurance Limit Calculator',
    keywords: ['cyber insurance limit', 'cyber limit adequacy', 'how much cyber insurance', 'cyber cover calculation'],
    formulaLabel: 'Limit adequacy framing',
    formulaExpression: 'Suggested limit approx. modeled incident cost - retention, adjusted for dependency and controls',
    variables: ['Revenue can proxy interruption exposure', 'Record count can proxy response cost', 'Sector affects legal and claims intensity', 'Controls can shift the severity range'],
    relatedGuides: [
      { href: '/learn/cyber-resilient-agency', label: 'Cyber-Resilient Agency: Protecting Client Data' },
      { href: '/learn/coverage-gap-analysis', label: 'Coverage Gap Analysis: Comparing Limits to Real Exposure' },
      { href: '/learn/total-cost-of-risk', label: 'Total Cost of Risk: What TCOR Actually Measures' },
    ],
    sections: [
      {
        heading: 'Why cyber limits are hard to benchmark casually',
        paragraphs: [
          'Cyber losses combine incident response, interruption, legal cost, third-party claims, and regulatory friction. That makes casual peer benchmarking weak.',
          'Users search for adequacy because they want to know whether a limit is aligned with the exposure they actually carry.',
        ],
      },
      {
        heading: 'Why company size is not enough',
        paragraphs: [
          'Revenue matters, but it is not enough. Record count, dependency risk, and control quality can all change expected severity materially.',
          'A formula-first page is useful because it shows why similar-sized firms can still justify different cyber limits.',
        ],
      },
    ],
    faq: [
      { question: 'Does higher revenue always mean a higher required cyber limit?', answer: 'Not always, but it often increases interruption exposure and can push the modeled severity range upward.' },
      { question: 'Does this replace broker or underwriting input?', answer: 'No. It provides a formula-based benchmark that should be tested against policy structure and professional advice.' },
    ],
    disclaimer: 'Illustrative only. Cyber-limit outputs are scenario-based and do not interpret policy wording or replace underwriting, brokerage, or legal advice.',
  },
];

export const EXACT_MATCH_EXAMPLE_TOPICS: ProgrammaticLearnTopic[] = [
  {
    slug: '300k-mortgage-5-percent-25-years',
    title: 'GBP300,000 Mortgage at 5% for 25 Years: Payment Example',
    description: 'Worked repayment example for a GBP300,000 mortgage at 5% over 25 years, including monthly payment, total interest, and why the early schedule is interest-heavy.',
    readTime: '5 min',
    categorySlug: 'mortgage-repayment',
    calculatorHref: '/mortgage',
    calculatorLabel: 'Mortgage Repayment Calculator',
    keywords: ['300k mortgage payment', '5 percent mortgage 25 years', '300000 mortgage monthly payment', 'mortgage example 25 years'],
    formulaLabel: 'Standard amortisation example',
    formulaExpression: 'M = P x [r(1 + r)^n] / [(1 + r)^n - 1]',
    variables: ['P = GBP300,000 principal', 'r = 5% / 12 monthly rate', 'n = 25 x 12 monthly payments'],
    relatedGuides: [
      { href: '/learn/mortgage-repayment', label: 'How Mortgage Repayment Calculations Work' },
      { href: '/learn/mortgage-rate-vs-term', label: 'Mortgage Rate vs Term: Which Changes the Cost More?' },
      { href: '/learn/mortgage-overpayment', label: 'Mortgage Overpayment: How Much Does It Save?' },
    ],
    sections: [
      {
        heading: 'Why this exact example works',
        paragraphs: [
          'Searchers typing a loan amount, rate, and term are usually not looking for a general home-buying article. They want a worked number they can compare with a quote or budget.',
          'That makes exact-match example pages useful when they stay transparent about the formula and assumptions.',
        ],
      },
      {
        heading: 'What the page should teach',
        paragraphs: [
          'The monthly repayment is only part of the result. The same example also reveals lifetime interest and why early payments are interest-heavy.',
          'That is the educational advantage of an example page: it answers the query while also explaining the schedule behind it.',
        ],
      },
    ],
    faq: [
      { question: 'Does this include mortgage fees?', answer: 'No. It isolates the core repayment formula unless fees are added separately.' },
      { question: 'Will my lender quote match exactly?', answer: 'Not always. Product fees, ancillary costs, and lender conventions can create differences.' },
    ],
    disclaimer: 'Illustration only. This is a formula example, not a mortgage quote, affordability decision, or lending recommendation.',
  },
  {
    slug: '400k-mortgage-4-5-percent-30-years',
    title: 'GBP400,000 Mortgage at 4.5% for 30 Years: Payment Example',
    description: 'Worked example for a GBP400,000 repayment mortgage at 4.5% over 30 years, designed for users comparing larger loans and longer terms.',
    readTime: '5 min',
    categorySlug: 'mortgage-repayment',
    calculatorHref: '/mortgage',
    calculatorLabel: 'Mortgage Repayment Calculator',
    keywords: ['400k mortgage payment', '4.5 percent mortgage 30 years', '400000 mortgage monthly payment', '30 year mortgage example'],
    formulaLabel: 'Amortisation with a longer term',
    formulaExpression: 'M = P x [r(1 + r)^n] / [(1 + r)^n - 1]',
    variables: ['P = GBP400,000 principal', 'r = 4.5% / 12 monthly rate', 'n = 30 x 12 monthly payments'],
    relatedGuides: [
      { href: '/learn/mortgage-payment-examples', label: 'Mortgage Payment Examples: How Rate, Term, and Principal Change the Number' },
      { href: '/learn/mortgage-rate-vs-term', label: 'Mortgage Rate vs Term: Which Changes the Cost More?' },
      { href: '/learn/mortgage-affordability', label: 'How Mortgage Affordability Is Assessed' },
    ],
    sections: [
      {
        heading: 'Why the 30-year term changes the story',
        paragraphs: [
          'A 30-year term often makes a larger loan feel manageable because it spreads repayment over more months.',
          'The trade-off is that the interest window becomes much longer, which can push lifetime cost materially higher.',
        ],
      },
      {
        heading: 'How to use the page',
        paragraphs: [
          'This example works best as a baseline before testing 25-year or overpayment cases in the calculator.',
          'It is useful precisely because it shows the gap between monthly affordability and total cost.',
        ],
      },
    ],
    faq: [
      { question: 'Why is the monthly payment lower than a shorter-term mortgage?', answer: 'Because principal is spread across more months, even though total interest rises.' },
      { question: 'Can overpayments offset the longer term?', answer: 'Yes. Overpayments can shorten the term and reduce interest if the product allows them.' },
    ],
    disclaimer: 'Illustration only. This page shows the repayment maths for one input set and is not a product recommendation or lending assessment.',
  },
  {
    slug: 'how-much-house-can-i-afford-on-60k',
    title: 'How Much House Can I Afford on a GBP60,000 Salary?',
    description: 'Explains the affordability maths behind a GBP60,000 salary, including income multiples, stress testing, and the role of deposit size in the final home-price range.',
    readTime: '5 min',
    categorySlug: 'mortgage-affordability',
    calculatorHref: '/affordability',
    calculatorLabel: 'Mortgage Affordability Calculator',
    keywords: ['how much house can i afford on 60k', '60000 salary mortgage affordability', 'house price on 60k salary', 'uk affordability example'],
    formulaLabel: 'Income and deposit framing',
    formulaExpression: 'Affordable price approx. maximum borrowing + deposit, subject to stress-tested payment limits',
    variables: ['Income multiple gives a first-pass ceiling', 'Debt commitments and stress testing can lower the result', 'Deposit size affects home price and LTV'],
    relatedGuides: [
      { href: '/learn/mortgage-affordability', label: 'How Mortgage Affordability Is Assessed' },
      { href: '/learn/mortgage-repayment', label: 'How Mortgage Repayment Calculations Work' },
      { href: '/learn/rent-vs-buy', label: 'Rent vs Buy: The Key Numbers to Compare' },
    ],
    sections: [
      {
        heading: 'Why salary-specific affordability pages work',
        paragraphs: [
          'Affordability searches are frequently phrased around salary because that is the most concrete number users have available.',
          'A GBP60,000 example gives a quick baseline before the user refines the picture with deposit, debts, and rate assumptions.',
        ],
      },
      {
        heading: 'Why the answer is still a range',
        paragraphs: [
          'A salary does not produce one universal home price. The result changes with deposit size, committed outgoings, interest rates, and lender policy.',
          'That is why the page should frame the figure as a starting point rather than a promise.',
        ],
      },
    ],
    faq: [
      { question: 'Is this based only on salary multiples?', answer: 'No. A useful affordability estimate also considers deposit, debts, and stress-tested payment assumptions.' },
      { question: 'Will every lender offer the same amount on GBP60,000?', answer: 'No. Policy, underwriting, and stress assumptions differ between lenders.' },
    ],
    disclaimer: 'Illustrative only. Salary-based affordability examples are not lending decisions, pre-approvals, or financial advice.',
  },
  {
    slug: 'how-much-house-can-i-afford-on-60k-with-50k-deposit',
    title: 'How Much House Can I Afford on GBP60,000 with a GBP50,000 Deposit?',
    description: 'A deposit-specific affordability example showing how a GBP50,000 deposit changes LTV, borrowing range, and monthly repayment options for a GBP60,000 salary.',
    readTime: '5 min',
    categorySlug: 'mortgage-affordability',
    calculatorHref: '/affordability',
    calculatorLabel: 'Mortgage Affordability Calculator',
    keywords: ['how much house can i afford on 60k with 50k deposit', '60000 salary 50000 deposit mortgage', 'deposit affordability example'],
    formulaLabel: 'Salary plus deposit view',
    formulaExpression: 'Home price approx. stressed borrowing capacity + deposit',
    variables: ['Salary still drives the borrowing ceiling', 'The deposit changes purchase price and LTV', 'Lower LTV can improve pricing but does not remove affordability checks'],
    relatedGuides: [
      { href: '/learn/mortgage-affordability', label: 'How Mortgage Affordability Is Assessed' },
      { href: '/learn/offset-mortgage', label: 'How Offset Mortgages Actually Work' },
      { href: '/learn/save-for-goal', label: 'Save for a Goal: Time & Amount Basics' },
    ],
    sections: [
      {
        heading: 'Why deposit-specific pages matter',
        paragraphs: [
          'Adding a named deposit amount makes the query more decision-oriented because the user is usually already holding savings and wants to know what those funds unlock.',
          'This is stronger intent than salary alone because it links income to capital available now.',
        ],
      },
      {
        heading: 'What the deposit changes and what it does not',
        paragraphs: [
          'A deposit can improve the home-price range and reduce LTV, but it does not remove the need to pass affordability and stress tests on the debt itself.',
          'That distinction is what the page should make clear.',
        ],
      },
    ],
    faq: [
      { question: 'Does a bigger deposit always increase affordability?', answer: 'It can raise the purchase-price range, but borrowing is still capped by lender affordability rules.' },
      { question: 'Why does LTV matter?', answer: 'Lower LTV often improves product access and pricing because the lender is taking less collateral risk.' },
    ],
    disclaimer: 'Illustrative only. Deposit-based affordability examples are not lending offers or personalised mortgage advice.',
  },
  {
    slug: '40000-salary-after-tax-uk',
    title: 'GBP40,000 Salary After Tax in the UK: Net Pay Example',
    description: 'Worked UK take-home example for a GBP40,000 salary, showing how income tax, National Insurance, pension deductions, and pay frequency shape net pay.',
    readTime: '5 min',
    categorySlug: 'salary-take-home',
    calculatorHref: '/take-home',
    calculatorLabel: 'Salary Take-Home Calculator',
    keywords: ['40000 salary after tax uk', '40k take home pay uk', 'uk net pay 40000', 'salary after tax example'],
    formulaLabel: 'Gross-to-net framing',
    formulaExpression: 'Net pay = gross pay - income tax - National Insurance - pension - other deductions',
    variables: ['Gross salary starts the calculation', 'Income tax and NI are the main deductions', 'Pension choices can alter the final net figure'],
    relatedGuides: [
      { href: '/learn/salary-take-home', label: 'How Salary Take-Home Is Calculated' },
      { href: '/learn/salary-sacrifice', label: 'Salary Sacrifice: Tax and National Insurance Savings Explained' },
      { href: '/learn/freelance-rate', label: 'Freelance Rate: Working Backwards from Desired Salary' },
    ],
    sections: [
      {
        heading: 'Why salary-specific take-home pages are high intent',
        paragraphs: [
          'A user searching for take-home on a named salary usually has a job offer or budgeting decision in hand.',
          'That makes exact-match salary pages useful because they align tightly with the query and then hand off to the calculator for more detail.',
        ],
      },
      {
        heading: 'What the example should reveal',
        paragraphs: [
          'The useful part is not just the monthly net pay. It is seeing how gross salary is split between tax, NI, and optional deductions.',
          'That clarity helps users compare salaries on the number they actually get to spend.',
        ],
      },
    ],
    faq: [
      { question: 'Does this include pension deductions?', answer: 'Only if stated. Pension choices can change net pay materially and should be explicit.' },
      { question: 'Will my payroll figure match exactly?', answer: 'Not always. Pay frequency, student loans, bonuses, and workplace deductions can all change the result.' },
    ],
    disclaimer: 'Illustrative only. UK take-home examples depend on tax year, code, deductions, and payroll treatment and are not payroll advice.',
  },
  {
    slug: '60000-salary-after-tax-scotland',
    title: 'GBP60,000 Salary After Tax in Scotland: Net Pay Example',
    description: 'Worked Scottish take-home example for a GBP60,000 salary, highlighting how Scottish income-tax bands change the net outcome versus the rest of the UK.',
    readTime: '5 min',
    categorySlug: 'salary-take-home',
    calculatorHref: '/take-home',
    calculatorLabel: 'Salary Take-Home Calculator',
    keywords: ['60000 salary after tax scotland', '60k take home scotland', 'scottish tax bands 60000', 'salary after tax scotland'],
    formulaLabel: 'Scottish gross-to-net framing',
    formulaExpression: 'Net pay = gross pay - Scottish income tax - NI - pension - other deductions',
    variables: ['Scottish tax bands differ from the rest-of-UK income-tax structure', 'NI still follows UK-wide rules', 'Pension and sacrifice inputs can change the result'],
    relatedGuides: [
      { href: '/learn/salary-take-home', label: 'How Salary Take-Home Is Calculated' },
      { href: '/learn/salary-sacrifice', label: 'Salary Sacrifice: Tax and National Insurance Savings Explained' },
      { href: '/learn/retirement-savings', label: 'How Retirement Savings Projections Work' },
    ],
    sections: [
      {
        heading: 'Why a Scotland-specific page matters',
        paragraphs: [
          'Salary searchers in Scotland often compare their net-pay expectation with a UK-wide figure and want to know why it differs.',
          'A Scotland-specific example resolves that confusion directly and matches the query more precisely.',
        ],
      },
      {
        heading: 'What actually changes in the calculation',
        paragraphs: [
          'The key change is the income-tax band structure. National Insurance does not switch to a separate Scottish schedule in the same way.',
          'That distinction makes the page more useful than a generic UK explanation.',
        ],
      },
    ],
    faq: [
      { question: 'Is National Insurance different in Scotland?', answer: 'The main distinction for this example comes from Scottish income-tax bands, not from a separate NI system.' },
      { question: 'Why might my payroll figure differ?', answer: 'Tax code, pension treatment, bonuses, salary sacrifice, and student loans can all shift the actual payslip result.' },
    ],
    disclaimer: 'Illustrative only. Scottish take-home examples depend on current thresholds, payroll treatment, and personal deductions and are not payroll advice.',
  },
  {
    slug: '70000-salary-after-tax-germany',
    title: 'EUR70,000 Salary After Tax in Germany: Net Pay Example',
    description: 'Worked German gross-to-net example for a EUR70,000 salary, showing income tax and social insurance effects on net pay.',
    readTime: '5 min',
    categorySlug: 'salary-take-home',
    calculatorHref: '/take-home',
    calculatorLabel: 'Salary Take-Home Calculator',
    keywords: ['70000 salary after tax germany', '70000 euro netto germany', 'germany salary after tax example', 'gross to net germany'],
    formulaLabel: 'German gross-to-net framing',
    formulaExpression: 'Net pay = gross salary - income tax - solidarity surcharge where relevant - social contributions',
    variables: ['Income tax is progressive', 'Social insurance can materially reduce net pay', 'Additional payroll features can create variation'],
    relatedGuides: [
      { href: '/learn/salary-take-home', label: 'How Salary Take-Home Is Calculated' },
      { href: '/learn/tax-loss-harvesting', label: 'Tax-Loss Harvesting Strategies for Volatile Markets' },
      { href: '/learn/private-credit-playbook', label: 'Private Credit Playbook: Diversifying Beyond Equities' },
    ],
    sections: [
      {
        heading: 'Why Germany-specific examples deserve their own page',
        paragraphs: [
          'Gross-to-net search intent is highly country-specific. A German salary example is not interchangeable with a UK or US one because the payroll structure is different.',
          'That is why this page is useful: it answers a narrow query cleanly and drives the user into the calculator if they need tailored assumptions.',
        ],
      },
      {
        heading: 'What makes the German example distinctive',
        paragraphs: [
          'Statutory social contributions are not a minor side item. They can materially change take-home pay alongside income tax.',
          'A formula-first example helps because it shows the deduction architecture rather than leaving the user with a mystery netto number.',
        ],
      },
    ],
    faq: [
      { question: 'Will this match every German payslip?', answer: 'No. Tax class, insurance assumptions, and payroll specifics can change the result.' },
      { question: 'Why are social contributions so important in Germany?', answer: 'Because they form a significant part of the gross-to-net conversion and can materially alter take-home pay.' },
    ],
    disclaimer: 'Illustrative only. German salary examples depend on tax class, payroll treatment, and contribution rules and are not payroll advice.',
  },
  {
    slug: 'pension-5-percent-employee-5-percent-employer-80000-salary',
    title: '5% Employee + 5% Employer Pension on an GBP80,000 Salary',
    description: 'Worked pension-contribution example showing how an 80,000 salary with 5% employee and 5% employer contributions compounds over time and affects take-home pay.',
    readTime: '5 min',
    categorySlug: 'retirement-savings',
    calculatorHref: '/retirement',
    calculatorLabel: 'Retirement Savings Calculator',
    keywords: ['5 employee 5 employer pension 80000 salary', '80000 pension contributions example', 'pension contribution scenario'],
    formulaLabel: 'Contribution projection framing',
    formulaExpression: 'Annual pension input = salary x employee rate + salary x employer rate',
    variables: ['Employee contributions reduce current disposable income', 'Employer contributions increase annual funding', 'Time and return assumptions dominate the long-run pot size'],
    relatedGuides: [
      { href: '/learn/retirement-savings', label: 'How Retirement Savings Projections Work' },
      { href: '/learn/retirement-employer-contributions', label: 'Retirement Savings: Employer Contributions & Inflation Impact' },
      { href: '/learn/salary-sacrifice', label: 'Salary Sacrifice: Tax and National Insurance Savings Explained' },
    ],
    sections: [
      {
        heading: 'Why contribution-scenario pages matter',
        paragraphs: [
          'Pension searchers often understand the percentage on paper but struggle to visualise what the split means in pounds.',
          'A worked salary example closes that gap quickly and pairs naturally with the calculator.',
        ],
      },
      {
        heading: 'What this example should make visible',
        paragraphs: [
          'Employer contributions are part of the funding engine even though people often focus only on their own deduction.',
          'Over long horizons, that extra contribution can materially change the final pension pot.',
        ],
      },
    ],
    faq: [
      { question: 'Do employer contributions really make that much difference?', answer: 'Yes. Over long horizons, the employer share compounds alongside the employee share and can materially increase the final pot.' },
      { question: 'Is salary sacrifice included automatically?', answer: 'Not necessarily. Salary-sacrifice treatment should be modeled explicitly because it changes current tax and NI outcomes.' },
    ],
    disclaimer: 'Illustrative only. Pension examples depend on contribution method, tax treatment, investment return, and future legislative changes.',
  },
  {
    slug: 'build-6-month-emergency-fund-on-2500-expenses',
    title: 'How to Build a 6-Month Emergency Fund on GBP2,500 Monthly Expenses',
    description: 'Worked emergency-fund example showing the target balance for 2,500 monthly expenses and how monthly savings rates change the timeline to full coverage.',
    readTime: '5 min',
    categorySlug: 'financial-crisis',
    calculatorHref: '/crisis',
    calculatorLabel: 'Financial Crisis Simulator',
    keywords: ['6 month emergency fund 2500 expenses', 'emergency fund example', 'how much emergency savings 2500 monthly expenses'],
    formulaLabel: 'Emergency-fund target',
    formulaExpression: 'Target fund = monthly essential expenses x months of coverage',
    variables: ['Monthly essential expenses = GBP2,500', 'Coverage target = 6 months', 'Target fund = GBP15,000 before interest is considered'],
    relatedGuides: [
      { href: '/learn/financial-crisis', label: 'How to Calculate Your Financial Runway' },
      { href: '/learn/emergency-fund-how-much', label: 'Emergency Fund: How Much Is Enough?' },
      { href: '/learn/save-for-goal', label: 'Save for a Goal: Time & Amount Basics' },
    ],
    sections: [
      {
        heading: 'Why expense-specific emergency-fund pages work',
        paragraphs: [
          'Emergency-fund searches are often phrased around monthly expense levels because that is the practical number users can identify fastest.',
          'Once expenses are known, the savings target becomes immediate and concrete.',
        ],
      },
      {
        heading: 'What the example should simplify',
        paragraphs: [
          'A six-month target on GBP2,500 of essential monthly spending creates a GBP15,000 baseline.',
          'The next question is timeline, which is why the page pairs well with savings-goal mechanics.',
        ],
      },
    ],
    faq: [
      { question: 'Is GBP15,000 always enough if my expenses are GBP2,500?', answer: 'Not automatically. It is the arithmetic result for six months, but your target may need to be higher or lower depending on risk factors.' },
      { question: 'Should the expense figure include discretionary spending?', answer: 'Emergency-fund planning usually focuses on essential spending needed to keep the household running.' },
    ],
    disclaimer: 'Illustrative only. Emergency-fund examples are planning references, not personal financial advice or a guarantee of sufficiency.',
  },
  {
    slug: '10000-invested-at-7-percent-for-20-years',
    title: 'GBP10,000 Invested at 7% for 20 Years: Future Value Example',
    description: 'Worked future-value example showing what 10,000 growing at 7% for 20 years becomes, and how additional monthly contributions would change the path.',
    readTime: '5 min',
    categorySlug: 'compound-interest',
    calculatorHref: '/compound',
    calculatorLabel: 'Compound Interest Calculator',
    keywords: ['10000 invested at 7 for 20 years', 'future value 10000 at 7 percent', 'compound interest example 20 years'],
    formulaLabel: 'Single-sum compounding',
    formulaExpression: 'FV = PV x (1 + r)^t',
    variables: ['PV = GBP10,000 starting principal', 'r = 7% annual return assumption', 't = 20 years'],
    relatedGuides: [
      { href: '/learn/compound-interest', label: 'Understanding Compound Interest' },
      { href: '/learn/simple-vs-compound-interest', label: 'Simple vs Compound Interest: Same Rate, Very Different Outcome' },
      { href: '/learn/retirement-savings', label: 'How Retirement Savings Projections Work' },
    ],
    sections: [
      {
        heading: 'Why future-value example pages perform well',
        paragraphs: [
          'Users searching a starting amount, rate, and time horizon are usually trying to validate a mental model quickly.',
          'That makes this style of page highly compatible with Plain Figures because the content only needs to show the arithmetic cleanly.',
        ],
      },
      {
        heading: 'What the example actually teaches',
        paragraphs: [
          'A single-sum compounding example strips the growth process back to its simplest form.',
          'Once that baseline is understood, it becomes easier to interpret larger savings or retirement projections.',
        ],
      },
    ],
    faq: [
      { question: 'Does this example include monthly contributions?', answer: 'No. It isolates the growth of a single initial amount unless contributions are added separately.' },
      { question: 'Is 7% guaranteed?', answer: 'No. It is a hypothetical return assumption used to illustrate the formula.' },
    ],
    disclaimer: 'Illustrative only. Future-value examples use assumed returns and do not represent guaranteed investment performance.',
  },
];
export const ADJACENT_WORKFLOW_TOPICS: ProgrammaticLearnTopic[] = [
  {
    slug: 'net-worth-growth',
    title: 'Net Worth Growth: How Saving, Returns, and Inflation Interact',
    description: 'A formula-first explainer for net-worth projections, showing how starting wealth, monthly savings, market returns, and inflation shape long-run outcomes.',
    readTime: '6 min',
    categorySlug: 'net-worth-growth',
    calculatorHref: '/savings',
    calculatorLabel: 'Savings Growth Calculator',
    keywords: ['net worth growth calculator', 'net worth projection formula', 'wealth growth over time', 'inflation adjusted net worth'],
    formulaLabel: 'Net-worth projection framework',
    formulaExpression: 'Future net worth = current net worth growth + future value of monthly savings, adjusted separately for inflation if needed',
    variables: ['Current net worth provides the starting base', 'Monthly savings add new capital', 'Return assumptions influence compounding', 'Inflation changes what the future figure is worth in real terms'],
    relatedGuides: [
      { href: '/learn/retirement-savings', label: 'How Retirement Savings Projections Work' },
      { href: '/learn/lifestyle-inflation', label: 'Lifestyle Inflation: Real Cost Over Time' },
      { href: '/learn/compound-interest', label: 'Understanding Compound Interest' },
    ],
    sections: [
      {
        heading: 'Why net-worth pages expand the site naturally',
        paragraphs: [
          'Net worth is a broader frame than savings alone. It captures the balance-sheet effect of saving behaviour, asset growth, and debt reduction over time.',
          'That makes it a logical adjacent topic for a calculator-first finance site.',
        ],
      },
      {
        heading: 'Why inflation belongs in the conversation',
        paragraphs: [
          'A future net-worth figure can look impressive in nominal terms while buying much less in real terms.',
          'That distinction makes the page more credible and more useful.',
        ],
      },
    ],
    faq: [
      { question: 'Is net worth the same as cash savings?', answer: 'No. Net worth is assets minus liabilities, so it is broader than cash alone.' },
      { question: 'Why include inflation in a net-worth page?', answer: 'Because a nominal future value can overstate the real-life purchasing power of the balance.' },
    ],
    disclaimer: 'Illustrative only. Net-worth projections depend on assumed returns, savings patterns, and inflation and are not wealth advice.',
  },
  {
    slug: 'debt-payoff-strategy',
    title: 'Debt Payoff Strategy: Timeline, Interest, and Extra Payment Maths',
    description: 'Explains how debt-payoff timelines react to APR, minimum payments, and extra monthly overpayments, with a focus on arithmetic rather than payoff ideology.',
    readTime: '6 min',
    categorySlug: 'debt-payoff-strategy',
    calculatorHref: '/loan',
    calculatorLabel: 'Loan Repayment Calculator',
    keywords: ['debt payoff strategy', 'extra payment calculator', 'debt timeline formula', 'snowball vs avalanche maths'],
    formulaLabel: 'Debt balance update',
    formulaExpression: 'Balance_(t+1) = Balance_t x (1 + r / 12) - payment_t',
    variables: ['APR sets the pace of interest', 'Minimum payment defines the slowest path', 'Extra payments accelerate payoff and reduce total interest'],
    relatedGuides: [
      { href: '/learn/loan-repayment', label: 'Loan Repayment: True APR Explained' },
      { href: '/learn/subscription-drain', label: 'Subscription Drain: The True Long-Term Cost' },
      { href: '/learn/financial-crisis', label: 'How to Calculate Your Financial Runway' },
    ],
    sections: [
      {
        heading: 'Why debt payoff is a maths problem first',
        paragraphs: [
          'Snowball and avalanche are useful labels, but the arithmetic still comes from rate, balance, minimum payment, and extra cash available.',
          'That is why a formula-first explainer is valuable before any strategy preference is layered on top.',
        ],
      },
      {
        heading: 'Why extra payments matter so much',
        paragraphs: [
          'Extra payments do two things at once: they reduce principal sooner and shrink the base on which future interest is charged.',
          'That double effect is why even moderate overpayments can shorten the timeline materially.',
        ],
      },
    ],
    faq: [
      { question: 'Do extra payments always reduce total interest?', answer: 'Yes, if they reduce principal sooner and there are no unusual penalties preventing that benefit.' },
      { question: 'Is avalanche always mathematically cheaper than snowball?', answer: 'When it targets the highest-rate debt first, it usually reduces interest cost more efficiently.' },
    ],
    disclaimer: 'Illustrative only. Debt-payoff projections depend on rates, payment rules, and creditor terms and are not debt advice.',
  },
  {
    slug: 'emergency-fund-timeline',
    title: 'Emergency Fund Timeline: How Long to Build the Buffer',
    description: 'A formula-first explainer for emergency-fund timelines, focused on the saving rate, existing balance, and interest assumptions that determine how fast the target is reached.',
    readTime: '5 min',
    categorySlug: 'emergency-fund-timeline',
    calculatorHref: '/crisis',
    calculatorLabel: 'Financial Crisis Simulator',
    keywords: ['emergency fund timeline', 'how long to build emergency fund', 'emergency savings calculator', 'months coverage goal'],
    formulaLabel: 'Target-versus-progress framing',
    formulaExpression: 'Time to target depends on current savings, monthly saving, target fund size, and any interest credited during the build period',
    variables: ['Target fund comes from monthly expenses x coverage months', 'Current savings reduce the gap', 'Monthly saving rate determines the build speed'],
    relatedGuides: [
      { href: '/learn/emergency-fund-how-much', label: 'Emergency Fund: How Much Is Enough?' },
      { href: '/learn/financial-crisis', label: 'How to Calculate Your Financial Runway' },
      { href: '/learn/save-for-goal', label: 'Save for a Goal: Time & Amount Basics' },
    ],
    sections: [
      {
        heading: 'Why timeline questions follow target questions',
        paragraphs: [
          'Once users know they want three, six, or more months of coverage, the next question is almost always timing.',
          'That makes emergency-fund timeline content a strong bridge between crisis planning and savings-goal maths.',
        ],
      },
      {
        heading: 'What actually moves the timeline',
        paragraphs: [
          'The biggest driver is the monthly amount being set aside. Existing savings matter because they reduce the distance left to travel.',
          'Interest can help, but during the build phase it is often secondary to the contribution stream.',
        ],
      },
    ],
    faq: [
      { question: 'Does interest make a big difference when building an emergency fund?', answer: 'It can help, but the monthly saving rate is often the main driver during the build phase.' },
      { question: 'Is the same timeline right for everyone?', answer: 'No. Income stability, expense level, and current savings all change the path.' },
    ],
    disclaimer: 'Illustrative only. Emergency-fund timelines are planning scenarios, not guarantees of saving behaviour or sufficiency.',
  },
  {
    slug: 'pension-contribution-scenarios',
    title: 'Pension Contribution Scenarios: Comparing Employee and Employer Rates',
    description: 'Explains how different employee and employer contribution combinations change pension funding, future pot size, and current pay impact.',
    readTime: '6 min',
    categorySlug: 'pension-contribution-scenarios',
    calculatorHref: '/retirement',
    calculatorLabel: 'Retirement Savings Calculator',
    keywords: ['pension contribution scenarios', 'employee employer pension rates', 'compare pension contributions', 'pension funding example'],
    formulaLabel: 'Scenario comparison frame',
    formulaExpression: 'Annual pension input = salary x employee rate + salary x employer rate',
    variables: ['Employee rate changes current take-home and long-run funding', 'Employer rate adds to funding', 'Projection horizon and return assumptions shape the gap between scenarios'],
    relatedGuides: [
      { href: '/learn/retirement-savings', label: 'How Retirement Savings Projections Work' },
      { href: '/learn/retirement-employer-contributions', label: 'Retirement Savings: Employer Contributions & Inflation Impact' },
      { href: '/learn/salary-sacrifice', label: 'Salary Sacrifice: Tax and National Insurance Savings Explained' },
    ],
    sections: [
      {
        heading: 'Why scenario pages are useful for pensions',
        paragraphs: [
          'Pension decisions are rarely binary. Users often compare one contribution rate against another or test what happens when matching improves.',
          'Scenario pages fit that behaviour well because they stay numerical and auditable.',
        ],
      },
      {
        heading: 'Why matching deserves special attention',
        paragraphs: [
          'Employer matching can change the economics of a contribution decision materially.',
          'That is one reason scenario pages are more useful than single-point examples.',
        ],
      },
    ],
    faq: [
      { question: 'Why do small percentage changes matter so much?', answer: 'Because the extra annual funding compounds over many years, amplifying what initially looks like a small difference.' },
      { question: 'Should I only look at the final pot?', answer: 'No. Current cash-flow impact matters too, especially when contributions materially change take-home pay.' },
    ],
    disclaimer: 'Illustrative only. Pension scenario comparisons depend on contribution rules, return assumptions, and tax treatment and are not retirement advice.',
  },
  {
    slug: 'how-much-house-can-i-afford',
    title: 'How Much House Can I Afford? The Core Maths Behind the Question',
    description: 'A broader affordability explainer covering salary, debts, deposit, rate, tax, and insurance assumptions that shape home-price limits.',
    readTime: '6 min',
    categorySlug: 'how-much-house-can-i-afford',
    calculatorHref: '/affordability',
    calculatorLabel: 'Mortgage Affordability Calculator',
    keywords: ['how much house can i afford', 'affordability formula', 'home price on salary', 'mortgage affordability calculator'],
    formulaLabel: 'Affordability framing',
    formulaExpression: 'Affordable home approx. borrowing capacity + deposit, subject to debt-to-income and payment-stress constraints',
    variables: ['Income defines debt capacity', 'Existing debt payments reduce headroom', 'Deposit changes purchase price and LTV', 'Taxes and insurance can reduce the repayment budget'],
    relatedGuides: [
      { href: '/learn/mortgage-affordability', label: 'How Mortgage Affordability Is Assessed' },
      { href: '/learn/mortgage-repayment', label: 'How Mortgage Repayment Calculations Work' },
      { href: '/learn/rent-vs-buy', label: 'Rent vs Buy: The Key Numbers to Compare' },
    ],
    sections: [
      {
        heading: 'Why this query stays strong',
        paragraphs: [
          'How much house can I afford is one of the clearest high-intent finance queries because it sits close to a real transaction.',
          'That makes it worth serving with a dedicated formula-first page even when a calculator already exists.',
        ],
      },
      {
        heading: 'Why the answer is multidimensional',
        paragraphs: [
          'This query is often simplified into a salary multiple, but that hides too much. Debt obligations, deposit, rate assumptions, and lender policy all reshape the answer.',
          'A good explainer clarifies the structure first and lets the calculator handle the detailed scenario work second.',
        ],
      },
    ],
    faq: [
      { question: 'Is affordability just a salary multiple?', answer: 'No. Income multiples are only a starting point; debts, deposit, rates, and lender stress tests also matter.' },
      { question: 'Should I use this or the mortgage calculator first?', answer: 'Use affordability first to find a range, then mortgage repayment to understand the monthly cost within that range.' },
    ],
    disclaimer: 'Illustrative only. Affordability content here is educational and not a mortgage pre-approval, recommendation, or financial advice.',
  },
  {
    slug: 'side-hustle-profit-after-tax',
    title: 'Side Hustle Profit After Tax: What Actually Reaches You',
    description: 'Explains the arithmetic behind side-hustle profit after expenses and tax, helping users distinguish revenue from usable income.',
    readTime: '6 min',
    categorySlug: 'side-hustle-profit',
    calculatorHref: '/freelance',
    calculatorLabel: 'Freelance Rate Calculator',
    keywords: ['side hustle profit after tax', 'self employment profit calculator', 'side income after expenses and tax', 'side hustle net income'],
    formulaLabel: 'Net-profit framing',
    formulaExpression: 'Net proceeds = revenue - allowable expenses - self-employment taxes - income taxes',
    variables: ['Revenue is not the same as profit', 'Expenses reduce taxable profit', 'Tax treatment depends on jurisdiction and structure', 'The final usable amount can be much lower than gross receipts'],
    relatedGuides: [
      { href: '/learn/freelance-rate', label: 'Freelance Rate: Working Backwards from Desired Salary' },
      { href: '/learn/salary-take-home', label: 'How Salary Take-Home Is Calculated' },
      { href: '/learn/subscription-drain', label: 'Subscription Drain: The True Long-Term Cost' },
    ],
    sections: [
      {
        heading: 'Why side-hustle pages fit the model',
        paragraphs: [
          'Side-hustle search intent is highly numerical. Users want to know what actually lands in their pocket once platform fees, business costs, and tax are considered.',
          'That makes it a natural adjacent topic for a formula-first finance site.',
        ],
      },
      {
        heading: 'Why revenue numbers mislead',
        paragraphs: [
          'Many side-income examples use top-line revenue because it looks exciting. The usable number is profit after costs and tax.',
          'A formula-first page is valuable because it keeps the bridge from gross receipts to net proceeds explicit.',
        ],
      },
    ],
    faq: [
      { question: 'Is side-hustle revenue the same as profit?', answer: 'No. Profit is what remains after allowable business expenses are deducted from revenue.' },
      { question: 'Why can tax take such a large share?', answer: 'Because side income may sit on top of existing earnings, pushing part of the profit into a higher marginal tax bracket.' },
    ],
    disclaimer: 'Illustrative only. Side-hustle profit examples are not tax advice and should not replace jurisdiction-specific accounting guidance.',
  },
];

export const SEO_BATCH_TOPICS: ProgrammaticLearnTopic[] = [
  ...CALCULATOR_PAIRING_TOPICS,
  ...EXACT_MATCH_EXAMPLE_TOPICS,
  ...ADJACENT_WORKFLOW_TOPICS,
];
