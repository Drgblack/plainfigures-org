import { SEO_BATCH_TOPICS } from '@/lib/programmatic-learn-batches';
import type { ProgrammaticLearnTopic } from '@/lib/programmatic-learn-types';

const BASE_PROGRAMMATIC_LEARN_TOPICS: ProgrammaticLearnTopic[] = [
  {
    slug: 'mortgage-payment-examples',
    title: 'Mortgage Payment Examples: How Rate, Term, and Principal Change the Number',
    description: 'Worked mortgage examples for common loan sizes, rates, and terms. Formula-first explanations only, with direct links back to the repayment calculator.',
    readTime: '7 min',
    categorySlug: 'mortgage-repayment',
    calculatorHref: '/mortgage',
    calculatorLabel: 'Mortgage Repayment Calculator',
    keywords: ['mortgage payment examples', 'mortgage repayment formula', '300000 mortgage payment', 'rate vs term mortgage'],
    formulaLabel: 'Standard amortisation identity',
    formulaExpression: 'M = P × [r(1 + r)^n] / [(1 + r)^n − 1]',
    variables: [
      'M = level monthly repayment',
      'P = original mortgage principal',
      'r = monthly interest rate',
      'n = total number of monthly payments',
    ],
    relatedGuides: [
      { href: '/learn/mortgage-repayment', label: 'How Mortgage Repayment Calculations Work' },
      { href: '/learn/mortgage-overpayment', label: 'Mortgage Overpayment: How Much Does It Save?' },
      { href: '/learn/mortgage-affordability', label: 'How Mortgage Affordability Is Assessed' },
    ],
    sections: [
      {
        heading: 'Why example-driven mortgage pages work',
        paragraphs: [
          'Mortgage queries are often phrased as worked examples rather than abstract formulas. Someone searching for a payment on $300,000 at 4.5% over 25 years usually wants a number they can pressure-test immediately, not a broad article about home buying. That is why example pages can be useful when they keep the arithmetic transparent.',
          'Plain Figures approaches those searches by keeping the mechanics visible. The useful part is not just the monthly repayment. It is seeing how the rate, the term, and the principal each alter the cost profile so the user can stress-test the result rather than treat it as advice.',
        ],
      },
      {
        heading: 'What the formula is really doing',
        paragraphs: [
          'The amortisation formula converts a fixed balance into a fixed monthly repayment that clears the loan over a known term. Because the payment is level, the interest portion is largest in the early years when the balance is highest, and the principal portion grows later as the balance falls.',
          'This matters because many mortgage searches focus only on affordability per month. The full cost of financing is shaped by lifetime interest, and that can change sharply when a user stretches the term to bring the payment down. Formula-first pages make that trade-off visible instead of hiding it behind a product comparison.',
        ],
      },
      {
        heading: 'How to use example pages without misreading them',
        paragraphs: [
          'Worked examples are strongest when the inputs are treated as a snapshot. If the rate resets after a fixed period, fees are added, or taxes and insurance sit outside the repayment, the exact real-world number will differ. The example still remains useful because it gives a neutral baseline.',
          'That is the role of a long-tail explainer on Plain Figures. It is not there to recommend a lender or to claim the example is your answer. It is there to show what the mortgage maths says before product features and personal advice enter the picture.',
        ],
      },
    ],
    faq: [
      { question: 'Do mortgage examples include taxes and insurance?', answer: 'No. The worked examples isolate principal-and-interest repayment only so the core formula remains visible.' },
      { question: 'Why does the payment change so much when the term changes?', answer: 'Because a longer term spreads principal over more months while also allowing interest to accrue for longer, which lowers the monthly figure but increases lifetime interest.' },
      { question: 'Can the same example formula be used after a refinance?', answer: 'Yes. You would simply recalculate with the remaining balance, the new rate, and the new term.' },
    ],
    disclaimer: 'Illustration only. Mortgage examples here are formula references, not lending advice, affordability advice, or product recommendations.',
  },
  {
    slug: 'mortgage-rate-vs-term',
    title: 'Mortgage Rate vs Term: Which Changes the Cost More?',
    description: 'A formula-first guide to the two biggest mortgage levers: interest rate and loan term. Shows why the payment and the lifetime cost can move in different directions.',
    readTime: '6 min',
    categorySlug: 'mortgage-repayment',
    calculatorHref: '/mortgage',
    calculatorLabel: 'Mortgage Repayment Calculator',
    keywords: ['mortgage rate vs term', 'mortgage total interest', 'shorter term mortgage maths', 'mortgage payment sensitivity'],
    formulaLabel: 'Payment sensitivity framing',
    formulaExpression: 'Monthly payment reacts immediately to both r and n, while lifetime interest accumulates across the full schedule',
    variables: [
      'Higher r raises the interest share of every payment',
      'Higher n lowers the monthly payment but lengthens the interest window',
      'Lower n raises the monthly payment but compresses total interest',
    ],
    relatedGuides: [
      { href: '/learn/mortgage-repayment', label: 'How Mortgage Repayment Calculations Work' },
      { href: '/learn/offset-mortgage', label: 'How Offset Mortgages Actually Work' },
      { href: '/learn/mortgage-overpayment', label: 'Mortgage Overpayment: How Much Does It Save?' },
    ],
    sections: [
      {
        heading: 'The two levers most borrowers search for',
        paragraphs: [
          'Most mortgage calculations come down to a question about rate, term, or both. Users often know that each lever matters, but they do not always see how differently they affect the result. Rate changes the cost of carrying the balance. Term changes how long that cost keeps running.',
          'That distinction is why rate-vs-term explainers can perform well as search extensions. They answer a narrow comparison query while reinforcing the core idea that a lower monthly repayment is not the same thing as a cheaper mortgage.',
        ],
      },
      {
        heading: 'Why term changes can look friendly and still be expensive',
        paragraphs: [
          'Extending a mortgage from 25 years to 30 years can reduce the monthly payment enough to feel manageable. The hidden effect is that the loan spends more time outstanding, so the interest meter keeps running. In many cases that adds a large absolute financing cost even while the headline monthly number falls.',
          'A rate increase works differently. It normally pushes both the monthly payment and the lifetime interest higher at the same time. That makes it easier to notice. Term extensions are more subtle because they can improve short-term cash flow while worsening total cost.',
        ],
      },
      {
        heading: 'How this becomes useful on Plain Figures',
        paragraphs: [
          'The value of a formula-first page here is not opinionated guidance about whether to shorten or extend a term. The value is exposing the mechanism clearly enough that the user can test scenarios inside the calculator and understand why the outputs move.',
          'That is especially important for search traffic tied to high-CPC mortgage terms. Those users often arrive with a very specific question. If the page shows the formula, the trade-off, and the assumptions, it earns its place. If it becomes generic advice, it does not.',
        ],
      },
    ],
    faq: [
      { question: 'Is a shorter mortgage term always better?', answer: 'Not automatically. It usually reduces lifetime interest, but it also raises the required monthly repayment and therefore changes cash-flow pressure.' },
      { question: 'What usually matters more: a 1-point rate move or adding 5 years?', answer: 'It depends on the starting balance and term, but both can materially change total cost. The calculator is useful because it lets you test the interaction directly.' },
      { question: 'Does this replace affordability underwriting?', answer: 'No. It shows the repayment maths only, not lender affordability policy or product-specific rules.' },
    ],
    disclaimer: 'Not financial advice. This comparison isolates the formula so users can see the trade-off between monthly payment and lifetime interest.',
  },
  {
    slug: 'compound-interest-by-frequency',
    title: 'Compound Interest by Frequency: Annual, Quarterly, Monthly, and Daily',
    description: 'How compounding frequency changes the final balance, why EAR differs from the headline rate, and when the difference is material enough to care about.',
    readTime: '6 min',
    categorySlug: 'compound-interest',
    calculatorHref: '/compound',
    calculatorLabel: 'Compound Interest Calculator',
    keywords: ['compound interest frequency', 'monthly vs daily compounding', 'effective annual rate', 'compound frequency calculator'],
    formulaLabel: 'Compound growth formula',
    formulaExpression: 'A = P × (1 + r / n)^(n × t)',
    variables: [
      'A = ending balance',
      'P = starting principal',
      'r = annual nominal rate',
      'n = compounding events each year',
      't = time horizon in years',
    ],
    relatedGuides: [
      { href: '/learn/compound-interest', label: 'Understanding Compound Interest' },
      { href: '/learn/retirement-savings', label: 'How Retirement Savings Projections Work' },
      { href: '/learn/save-for-goal', label: 'Save for a Goal: Time & Amount Basics' },
    ],
    sections: [
      {
        heading: 'Why frequency queries show strong intent',
        paragraphs: [
          'When users search for monthly versus annual compounding, they are usually comparing an account illustration, a loan advertisement, or an investment projection. They want to know whether the credited frequency changes the real outcome enough to matter.',
          'The formula is straightforward, but the interpretation is where weak pages usually fail. The right answer is not “daily is better” in the abstract. The right answer is to show how much the ending balance moves, how EAR translates the effect into an annual number, and when the difference is small enough to stop obsessing over.',
        ],
      },
      {
        heading: 'The difference is real, but it is usually not the main driver',
        paragraphs: [
          'Compounding more often means interest is applied to interest slightly sooner. That raises the effective annual rate above the nominal rate. The uplift is real, but for moderate rates it is often smaller than the change caused by adding more time or lifting the rate itself.',
          'That is why frequency pages work best as comparison references. They help users validate the mechanics without turning a minor difference into a dramatic claim. Plain Figures keeps the emphasis on the size of the effect, not on hype around the label.',
        ],
      },
      {
        heading: 'Where frequency still matters',
        paragraphs: [
          'Frequency matters more when the rate is high, the time horizon is long, or the user is comparing products with similar nominal rates. In those cases, a cleaner effective-rate comparison stops users from treating identical-looking headline numbers as equivalent.',
          'It also matters on the debt side. APR, effective rates, and compounding conventions can make borrowing costs look simpler than they are. Formula-first explainers are useful because they show the growth engine directly rather than assuming the reader trusts a marketing term.',
        ],
      },
    ],
    faq: [
      { question: 'Is daily compounding always best?', answer: 'For the same nominal rate and no other differences, more frequent compounding produces a slightly higher effective rate.' },
      { question: 'Why is the gap often smaller than expected?', answer: 'Because frequency affects the timing of growth, but the nominal rate and the time horizon still dominate the outcome.' },
      { question: 'Should I compare products by AER or APY instead?', answer: 'Yes when available. Those measures standardise compounding into a yearly figure and are often easier to compare than raw frequency labels.' },
    ],
    disclaimer: 'Illustrative only. Compounding examples do not predict actual savings or investment outcomes and do not account for tax, fees, or behavioural changes.',
  },
  {
    slug: 'simple-vs-compound-interest',
    title: 'Simple vs Compound Interest: Same Rate, Very Different Outcome',
    description: 'A practical guide to the difference between linear and compounding growth, including where each model appears in real savings, loans, and projections.',
    readTime: '6 min',
    categorySlug: 'compound-interest',
    calculatorHref: '/compound',
    calculatorLabel: 'Compound Interest Calculator',
    keywords: ['simple vs compound interest', 'compound growth explained', 'interest on interest', 'simple interest examples'],
    formulaLabel: 'Linear versus exponential growth',
    formulaExpression: 'Simple: A = P × (1 + r × t) | Compound: A = P × (1 + r / n)^(n × t)',
    variables: [
      'Simple interest adds interest only on principal',
      'Compound interest adds interest on principal and prior interest',
      'Time magnifies the difference between the two models',
    ],
    relatedGuides: [
      { href: '/learn/compound-interest', label: 'Understanding Compound Interest' },
      { href: '/learn/loan-repayment', label: 'Loan Repayment: True APR Explained' },
      { href: '/learn/subscription-drain', label: 'Subscription Drain: The True Long-Term Cost' },
    ],
    sections: [
      {
        heading: 'The hidden jump from linear to exponential',
        paragraphs: [
          'Simple interest looks intuitive because it scales in a straight line. If the balance earns 5% a year, the user expects another 5% of the original principal next year. Compound interest breaks that pattern because interest begins earning interest on itself.',
          'This shift from linear to exponential growth is why the same headline rate can lead to very different outcomes over long periods. Searchers comparing simple and compound interest often sense that difference but want the formula laid out cleanly.',
        ],
      },
      {
        heading: 'Where each model shows up in practice',
        paragraphs: [
          'Simple-interest thinking still appears in rough borrowing examples, short-term estimates, and rules of thumb. Compound mechanics dominate real savings, investment projections, and many debt calculations once periodic accrual is involved.',
          'A useful explainer does not just define the two models. It shows why compounding becomes more important as time stretches and why apparently small rate differences can become secondary compared with the sheer effect of time plus reinvestment.',
        ],
      },
      {
        heading: 'Why this matters for SEO and for users',
        paragraphs: [
          'Long-tail searches on simple versus compound interest tend to sit near educational intent but still connect directly to high-value calculators. Users who understand the difference are more likely to use the compound calculator correctly and less likely to misread a projection as a guarantee.',
          'That is why Plain Figures treats this as a formula extension rather than a generic beginner article. The goal is to convert a comparison query into a better mental model for the calculator the user will open next.',
        ],
      },
    ],
    faq: [
      { question: 'Which model is more realistic for savings?', answer: 'Compound interest is usually the right model when earnings are credited back to the balance and then earn returns themselves.' },
      { question: 'Why do the results look similar at first?', answer: 'Because compounding needs time to create a visible gap. Early on, the added interest-on-interest is still small.' },
      { question: 'Can loans compound too?', answer: 'Yes. Borrowing costs often reflect periodic accrual, fees, and effective rates, which is why debt can become expensive quickly when balances are carried.' },
    ],
    disclaimer: 'Not advice or a product comparison. These examples show the arithmetic difference between two models only.',
  },
  {
    slug: 'loan-apr-vs-interest-rate',
    title: 'Loan APR vs Interest Rate: Why the Sticker Rate Can Mislead',
    description: 'Explains the difference between the stated loan rate and the effective annual cost once repayment structure and fees are included.',
    readTime: '6 min',
    categorySlug: 'loan-repayment',
    calculatorHref: '/loan',
    calculatorLabel: 'Loan Repayment Calculator',
    keywords: ['apr vs interest rate', 'loan repayment formula', 'loan true cost', 'loan fee impact'],
    formulaLabel: 'Repayment plus annualised cost',
    formulaExpression: 'Payment uses the amortisation formula; APR annualises the periodic borrowing cost after the full loan structure is considered',
    variables: [
      'Headline rate is not always the full borrowing cost',
      'APR incorporates timing and often fee effects',
      'The repayment schedule shapes total interest even when APR is fixed',
    ],
    relatedGuides: [
      { href: '/learn/loan-repayment', label: 'Loan Repayment: True APR Explained' },
      { href: '/learn/student-loan-repayment', label: 'Student Loan Repayment: Plan 1, Plan 2, and Plan 5 Compared' },
      { href: '/learn/compound-interest', label: 'Understanding Compound Interest' },
    ],
    sections: [
      {
        heading: 'Why borrowers search this comparison',
        paragraphs: [
          'APR-versus-rate queries appear when users notice that two loans with similar advertised pricing do not produce the same repayment or total cost. The confusion usually comes from mixing the simple headline rate with the more complete annualised borrowing measure.',
          'A useful explainer has to separate the two jobs clearly. The interest rate feeds the repayment formula. APR tries to summarise the broader annual cost once timing and, in many contexts, fees are taken into account.',
        ],
      },
      {
        heading: 'Why the repayment schedule still matters',
        paragraphs: [
          'Even when the rate looks modest, the term can stretch total interest materially. A borrower focused only on the monthly figure can miss how much extra cost is embedded in a longer schedule. That makes loan pages similar to mortgage pages: the monthly number is important, but it is not the whole story.',
          'This is why example pages tied to actual amounts and terms are powerful. They move the discussion away from abstract finance vocabulary and back to the consequence of the assumptions in front of the user.',
        ],
      },
      {
        heading: 'How to use this guide alongside the calculator',
        paragraphs: [
          'The calculator lets users test the amount, rate, and term directly. This guide provides the framing for why the output may diverge from a lender headline or an advertisement that emphasises one metric over another.',
          'Plain Figures keeps the comparison mechanical on purpose. It does not recommend lenders or borrowing strategies. It shows how the maths can make one offer look cheaper until the full annualised cost is exposed.',
        ],
      },
    ],
    faq: [
      { question: 'Is APR always higher than the stated rate?', answer: 'Often yes, but the exact relationship depends on structure, compounding convention, and whether fees are included in the calculation.' },
      { question: 'Why can two loans with similar rates have different monthly payments?', answer: 'Because the amount, term, and fee structure can differ, changing both the repayment profile and the total cost.' },
      { question: 'Does this guide cover every lender rule?', answer: 'No. It covers the formula logic only, not underwriting, penalties, or product-specific terms.' },
    ],
    disclaimer: 'Illustration only. Loan examples and APR framing here are not borrowing recommendations or consumer-credit advice.',
  },
  {
    slug: 'retirement-pot-targets',
    title: 'Retirement Pot Targets: Working Backwards from Monthly Income',
    description: 'A formula-first guide to converting a target monthly retirement income into an approximate portfolio size, contribution path, and time requirement.',
    readTime: '7 min',
    categorySlug: 'retirement-savings',
    calculatorHref: '/retirement',
    calculatorLabel: 'Retirement Savings Calculator',
    keywords: ['retirement pot target', 'retirement income to pot size', 'retirement savings calculator', 'monthly retirement income formula'],
    formulaLabel: 'Income-to-pot framing',
    formulaExpression: 'Target pot ≈ annual retirement income / withdrawal rate, then future value maths translates that target into a contribution path',
    variables: [
      'Desired monthly income defines the annual need',
      'Withdrawal rate turns income into a target pot',
      'Contribution size, employer help, and real return determine the path',
    ],
    relatedGuides: [
      { href: '/learn/retirement-savings', label: 'How Retirement Savings Projections Work' },
      { href: '/learn/retirement-employer-contributions', label: 'Retirement Savings: Employer Contributions & Inflation Impact' },
      { href: '/learn/pension-drawdown', label: 'Pension Drawdown: Sustainable Withdrawal Rates Explained' },
    ],
    sections: [
      {
        heading: 'Why backward planning is more useful than vague targets',
        paragraphs: [
          'Retirement queries often start with a pot number, but the more useful question is usually income. Users care about what the portfolio might support each month, not just the abstract size of the pot. Working backward from income makes the target more concrete.',
          'That approach also reveals how sensitive the answer is to withdrawal assumptions, inflation, and contribution rate. A formula-first page is useful because it keeps those assumptions visible rather than presenting a single magic retirement number.',
        ],
      },
      {
        heading: 'From monthly income to target pot',
        paragraphs: [
          'The first step is converting desired monthly spending into an annual figure. From there, a withdrawal-rate assumption creates a rough target pot. That target is not a promise. It is a planning anchor that helps users understand the scale of capital the income stream implies.',
          'The second step is future-value maths. Current savings, monthly contributions, employer contributions, and expected real returns determine whether the target looks close, distant, or unrealistic under the present assumptions.',
        ],
      },
      {
        heading: 'Why retirement pages need heavy disclaimers',
        paragraphs: [
          'Retirement projections are among the easiest pages to overstate. Returns vary, inflation changes the purchasing power of the same nominal sum, and withdrawal safety is path-dependent. That is exactly why Plain Figures leans hard into disclaimers here.',
          'The point of the page is not to tell the user they are “on track.” The point is to show what the formula requires so they can see the gap between the current path and the target income they have in mind.',
        ],
      },
    ],
    faq: [
      { question: 'Is the 4% rule guaranteed?', answer: 'No. It is a rule of thumb used for planning, not a guarantee that any portfolio will sustain that withdrawal rate.' },
      { question: 'Why do inflation and employer contributions matter so much?', answer: 'Inflation changes what the final pot actually buys, while employer contributions can materially lift the total contribution base over decades.' },
      { question: 'Can I use nominal returns instead of real returns?', answer: 'You can, but real returns are usually more useful when the goal is future spending power rather than a headline balance.' },
    ],
    disclaimer: 'Projection only. Retirement income targets and future-value examples are not personalised retirement advice or pension guidance.',
  },
  {
    slug: 'salary-bonus-take-home',
    title: 'Salary Bonus Take-Home: Why a Bonus Never Lands as the Headline Number',
    description: 'A guide to the mechanics behind bonus taxation and why gross bonus figures translate into lower net cash across different tax systems.',
    readTime: '6 min',
    categorySlug: 'salary-take-home',
    calculatorHref: '/take-home',
    calculatorLabel: 'Salary Take-Home Calculator',
    keywords: ['bonus take home pay', 'salary bonus tax', 'gross bonus to net', 'take home calculator bonus'],
    formulaLabel: 'Gross-to-net framing',
    formulaExpression: 'Net pay = gross pay − income taxes − payroll taxes − other deductions',
    variables: [
      'Gross bonus increases taxable income',
      'Marginal tax bands shape the net outcome',
      'Payroll timing and deductions can change the visible payslip result',
    ],
    relatedGuides: [
      { href: '/learn/salary-take-home', label: 'How Salary Take-Home Is Calculated' },
      { href: '/learn/salary-sacrifice', label: 'Salary Sacrifice: Tax and National Insurance Savings Explained' },
      { href: '/learn/capital-gains-tax', label: 'Capital Gains Tax: How the Calculation Works (2025/26)' },
    ],
    sections: [
      {
        heading: 'Why bonus searches are often high frustration queries',
        paragraphs: [
          'Users searching bonus take-home usually have a concrete amount in mind and a recent payslip, offer letter, or compensation package in front of them. The frustration comes from seeing a large gross number and a much smaller net result.',
          'A useful page has to avoid turning that into generic commentary about taxes. The correct approach is to explain the gross-to-net pathway clearly enough that the user can see where the gap comes from and then test it in the calculator.',
        ],
      },
      {
        heading: 'Why bonuses can feel overtaxed even when they are not',
        paragraphs: [
          'Bonuses often fall into higher marginal bands or interact with payroll withholding rules in ways that make the deduction look unusually aggressive. In some cases the timing of the payment makes the immediate withholding look worse than the final annualised tax burden.',
          'That does not mean the gross figure is “wrong.” It means the gross number is not the spendable number. Formula-first salary pages exist to make that distinction obvious before the user treats the headline figure as cash in hand.',
        ],
      },
      {
        heading: 'How this supports the wider salary cluster',
        paragraphs: [
          'Bonus explainers strengthen the main take-home calculator because they answer one of the most common follow-up questions after gross-to-net salary searches. They also create a cleaner bridge into salary-sacrifice and tax-related guides without forcing a generic long-form article to cover every edge case.',
          'For programmatic SEO, this is exactly the right kind of extension: specific enough to attract intent, close enough to the calculator to improve conversion into an interactive session, and cautious enough to avoid drifting into personal tax advice.',
        ],
      },
    ],
    faq: [
      { question: 'Why is my bonus taxed at a higher-looking rate?', answer: 'Bonuses often interact with marginal bands and payroll withholding methods, making the deduction look heavier than a simple flat percentage.' },
      { question: 'Can a bonus push me into a different tax band?', answer: 'Yes. Extra income can spill into higher marginal bands depending on the tax system and your year-to-date income.' },
      { question: 'Does this guide replace payroll advice?', answer: 'No. It explains the gross-to-net mechanics only and does not replace payroll, tax, or employment advice.' },
    ],
    disclaimer: 'Illustrative tax content only. Bonus take-home examples do not account for every local rule, filing status, benefit, or payroll adjustment.',
  },
  {
    slug: 'offset-vs-overpayment',
    title: 'Offset vs Overpayment: Two Ways to Cut Mortgage Interest',
    description: 'Compares the maths of offset savings and regular overpayments, focusing on interest saved, flexibility, and term reduction rather than product marketing.',
    readTime: '6 min',
    categorySlug: 'offset-mortgage',
    calculatorHref: '/offset',
    calculatorLabel: 'Offset Mortgage Calculator',
    keywords: ['offset vs overpayment', 'mortgage interest saving', 'offset mortgage maths', 'overpayment vs savings'],
    formulaLabel: 'Interest reduction framing',
    formulaExpression: 'Both approaches reduce effective interest, but one acts through a lower charged balance while the other acts through faster principal reduction',
    variables: [
      'Offset lowers the balance on which interest is charged',
      'Overpayment lowers the actual mortgage principal faster',
      'Flexibility and liquidity sit outside the pure formula comparison',
    ],
    relatedGuides: [
      { href: '/learn/offset-mortgage', label: 'How Offset Mortgages Actually Work' },
      { href: '/learn/mortgage-overpayment', label: 'Mortgage Overpayment: How Much Does It Save?' },
      { href: '/learn/mortgage-repayment', label: 'How Mortgage Repayment Calculations Work' },
    ],
    sections: [
      {
        heading: 'Why this comparison matters',
        paragraphs: [
          'Offset and overpayment are often presented as if they solve the same problem in the same way. They do not. Both can reduce interest, but the mechanism is different, which means the flexibility and trade-offs are different too.',
          'That makes this a good learn extension topic. Searchers here usually know the core mortgage formula already. What they need is a cleaner explanation of how two common strategies alter the interest profile without sliding into product advice.',
        ],
      },
      {
        heading: 'The formula difference in plain terms',
        paragraphs: [
          'An offset arrangement reduces the balance against which interest is charged while keeping the savings accessible. A regular overpayment directly reduces the mortgage principal, which normally locks the cash into the loan but accelerates payoff more permanently.',
          'From a pure maths perspective, both can save interest. The better fit depends on liquidity preferences, lender rules, and behavioural factors, which is exactly why Plain Figures avoids telling the user which route is “best.”',
        ],
      },
      {
        heading: 'Where the calculator fits',
        paragraphs: [
          'The calculator is useful because it lets users model the offset side directly and understand the scale of the savings. The guide provides the conceptual bridge to overpayment logic so users can frame the outputs correctly.',
          'That combination is stronger than either element on its own. The guide answers the comparison intent; the calculator converts the explanation into numbers without introducing sales language or recommendations.',
        ],
      },
    ],
    faq: [
      { question: 'Does offset always beat overpayment?', answer: 'No. The pure interest result can be similar, but flexibility, lender rules, and access to cash can change which structure is more useful.' },
      { question: 'Why do people like offset mortgages?', answer: 'Because they can reduce charged interest while preserving access to savings, which matters for users who value liquidity.' },
      { question: 'Can I compare both using the same monthly budget?', answer: 'Yes. That is often the most sensible way to test the trade-off between keeping cash accessible and locking it into principal reduction.' },
    ],
    disclaimer: 'Illustrative comparison only. This page does not recommend mortgage products or repayment strategies and does not replace lender-specific advice.',
  },
  {
    slug: 'savings-goal-deadline',
    title: 'Savings Goal Deadline Maths: What Monthly Number Actually Hits the Target?',
    description: 'Shows how target amount, current savings, return assumption, and deadline interact when users search for the monthly saving needed to hit a goal.',
    readTime: '6 min',
    categorySlug: 'save-for-goal',
    calculatorHref: '/save-goal',
    calculatorLabel: 'Save for a Goal Calculator',
    keywords: ['monthly savings needed for goal', 'savings target deadline', 'how much save per month', 'goal calculator formula'],
    formulaLabel: 'Future value of recurring contributions',
    formulaExpression: 'Target balance comes from current savings compounded forward plus the future value of monthly contributions',
    variables: [
      'Target amount defines the required finish line',
      'Current savings reduce the monthly burden',
      'Expected return and time horizon change the required contribution',
    ],
    relatedGuides: [
      { href: '/learn/save-for-goal', label: 'Save for a Goal: Time & Amount Basics' },
      { href: '/learn/compound-interest', label: 'Understanding Compound Interest' },
      { href: '/learn/subscription-drain', label: 'Subscription Drain: The True Long-Term Cost' },
    ],
    sections: [
      {
        heading: 'Why target-by-deadline searches convert well',
        paragraphs: [
          'Goal-based savings queries are practical by nature. Users often have a house deposit, emergency buffer, tax payment, or other named goal in mind and want to know the monthly number that would make the timeline realistic.',
          'That means the search intent is not abstract education. It is a very specific question with four moving parts: target, starting amount, expected return, and deadline. Formula-first pages can answer that cleanly without pretending to know the user’s priorities.',
        ],
      },
      {
        heading: 'The deadline is usually the hardest variable',
        paragraphs: [
          'Most users can change the monthly contribution only within a narrow range. The deadline often becomes the real constraint. Shortening the time horizon raises the required contribution sharply because there are fewer compounding periods for the existing savings and new deposits to do their work.',
          'That is why this category benefits from long-tail extensions. A generic savings page can explain the formula, but a deadline-specific page is closer to the exact question the user typed.',
        ],
      },
      {
        heading: 'How to read the result responsibly',
        paragraphs: [
          'The required monthly figure is not a recommendation. It is the arithmetic consequence of the assumptions. If the output looks unrealistic, that is useful information. It suggests the user needs more time, a different target, a larger starting amount, or a different return assumption.',
          'Plain Figures keeps that interpretation neutral on purpose. The page exists to show the constraint clearly, not to dress the constraint up as motivational advice.',
        ],
      },
    ],
    faq: [
      { question: 'What if the required monthly number is too high?', answer: 'Then at least one assumption has to move, usually the target date, the target amount, or the starting balance.' },
      { question: 'Does a higher return assumption always help?', answer: 'Mechanically yes, but higher assumed returns also add uncertainty, which is why illustrative pages should not oversell them.' },
      { question: 'Can I use this for a deposit or tax bill?', answer: 'Yes. The formula is general. The important part is matching the target amount and deadline to the real obligation.' },
    ],
    disclaimer: 'Illustration only. Savings-goal deadlines do not account for taxes, changing cash rates, or unpredictable contribution behaviour.',
  },
  {
    slug: 'subscription-opportunity-cost',
    title: 'Subscription Opportunity Cost: What a Small Monthly Spend Turns Into Over Time',
    description: 'A formula-first extension for recurring-cost searches, showing how modest subscriptions scale into larger multi-year totals and foregone investment value.',
    readTime: '5 min',
    categorySlug: 'subscription-drain',
    calculatorHref: '/subscriptions',
    calculatorLabel: 'Subscription Drain Calculator',
    keywords: ['subscription opportunity cost', 'monthly subscription over 10 years', 'recurring cost calculator', 'small monthly spend invested instead'],
    formulaLabel: 'Recurring spend plus foregone growth',
    formulaExpression: 'Total cost = monthly spend × months | Opportunity cost adds the future value of those missed investments',
    variables: [
      'Monthly spend sets the cash outflow baseline',
      'Time magnifies the cumulative spend',
      'Investment return assumptions translate forgone spend into foregone asset value',
    ],
    relatedGuides: [
      { href: '/learn/subscription-drain', label: 'Subscription Drain: The True Long-Term Cost' },
      { href: '/learn/lifestyle-inflation', label: 'Lifestyle Inflation: Real Cost Over Time' },
      { href: '/learn/save-for-goal', label: 'Save for a Goal: Time & Amount Basics' },
    ],
    sections: [
      {
        heading: 'Why this topic keeps earning clicks',
        paragraphs: [
          'Recurring-cost searches perform well because they sit at the intersection of behavioural finance and simple arithmetic. Users know the individual monthly amount looks harmless. What they want is a concrete illustration of what that pattern becomes over five, ten, or twenty years.',
          'The useful version of that content is not shame-based budgeting copy. It is a clean distinction between direct cumulative spend and the optional opportunity-cost view if the same cash had been invested instead.',
        ],
      },
      {
        heading: 'Why opportunity cost needs careful framing',
        paragraphs: [
          'Opportunity cost is powerful because it reframes a small recurring spend as a future balance that never existed. It is also easy to abuse. If a page assumes unrealistic returns or ignores uncertainty, it can overstate the case dramatically.',
          'That is why Plain Figures keeps the return assumption explicit and the disclaimers heavy. The point is to show the mechanical relationship, not to imply that every cancelled subscription automatically becomes a perfect investment programme.',
        ],
      },
      {
        heading: 'How this supports the wider savings cluster',
        paragraphs: [
          'This topic naturally feeds into save-for-goal and compound-interest pages. It helps users understand that recurring costs are not just a budgeting line item; they are also a cash-flow choice that changes how much capital can be built elsewhere.',
          'From an SEO perspective, that makes it a useful support cluster around higher-value finance themes without diluting the site’s formula-first identity.',
        ],
      },
    ],
    faq: [
      { question: 'Is opportunity cost the same as actual loss?', answer: 'No. It is a comparison model showing what the same cash might have become under a stated return assumption.' },
      { question: 'Why include a 10-year view?', answer: 'Because recurring costs often feel small month to month, and a longer horizon makes the cumulative effect easier to see.' },
      { question: 'Does this mean every subscription is bad?', answer: 'No. The model shows the cost and the foregone alternative, not whether the subscription is worth it to you.' },
    ],
    disclaimer: 'Illustrative only. Opportunity-cost figures depend on hypothetical returns and do not represent guaranteed investment outcomes.',
  },
  {
    slug: 'freelance-day-rate-from-salary',
    title: 'Freelance Day Rate from Salary: Translating Employed Income into Contract Pricing',
    description: 'A formula-first guide to converting salaried compensation into a freelance or contractor day rate once utilisation, taxes, and overheads are made explicit.',
    readTime: '6 min',
    categorySlug: 'freelance-rate',
    calculatorHref: '/freelance',
    calculatorLabel: 'Freelance Rate Calculator',
    keywords: ['freelance day rate from salary', 'contractor rate calculator', 'salary to freelance pricing', 'day rate formula'],
    formulaLabel: 'Salary-to-rate framing',
    formulaExpression: 'Required revenue = target take-home + overhead + tax burden, then divide by realistic billable time',
    variables: [
      'Target take-home is only the starting point',
      'Overhead and non-billable time materially raise the required rate',
      'Utilisation is often the most underestimated input',
    ],
    relatedGuides: [
      { href: '/learn/freelance-rate', label: 'Freelance Rate: Working Backwards from Desired Salary' },
      { href: '/learn/salary-take-home', label: 'How Salary Take-Home Is Calculated' },
      { href: '/learn/lifestyle-inflation', label: 'Lifestyle Inflation: Real Cost Over Time' },
    ],
    sections: [
      {
        heading: 'Why salary-to-rate searches are usually underpriced',
        paragraphs: [
          'Users moving from employment to freelance work often anchor on a salary they understand and then underestimate how much revenue is needed to recreate it. The missing pieces are usually overhead, unpaid admin time, gaps between projects, and tax structure.',
          'That makes this a strong extension topic for the calculator. It answers a highly practical search query while reinforcing the one assumption that matters most: not every working hour is a billable hour.',
        ],
      },
      {
        heading: 'The utilisation trap',
        paragraphs: [
          'The most common pricing error is dividing a target salary by all available workdays rather than by realistic billable time. The result feels competitive because it is too low. Once non-billable sales, admin, proposals, and downtime are added back in, the necessary rate usually moves materially higher.',
          'Formula-first content is useful here because it shows the arithmetic behind that jump. It helps the user see why the rate is not arbitrary and why lifestyle assumptions alone are not enough.',
        ],
      },
      {
        heading: 'How this fits the wider finance cluster',
        paragraphs: [
          'Freelance pricing is not pure personal finance, but it sits adjacent to take-home pay, tax, and recurring-cost management. That makes it a useful commercial support topic without breaking the site’s broader identity.',
          'For search, it also bridges two common user states: employed readers benchmarking a potential move, and existing freelancers checking whether their current rate still funds their target income once the true economics are exposed.',
        ],
      },
    ],
    faq: [
      { question: 'Why is the required day rate so much higher than my salary equivalent?', answer: 'Because freelance pricing has to fund taxes, overheads, and unpaid time that a salary benchmark often hides.' },
      { question: 'Does this assume every week is fully booked?', answer: 'No. The logic becomes more useful when billable weeks are reduced to realistic levels.' },
      { question: 'Is this a market rate recommendation?', answer: 'No. It is a bottom-up economic requirement based on the assumptions you enter.' },
    ],
    disclaimer: 'Illustration only. Freelance day-rate maths does not replace market pricing judgment, tax advice, or contract-specific commercial review.',
  },
];

export const PROGRAMMATIC_LEARN_TOPICS: ProgrammaticLearnTopic[] = [
  ...BASE_PROGRAMMATIC_LEARN_TOPICS,
  ...SEO_BATCH_TOPICS,
];

export function getProgrammaticLearnTopic(slug: string): ProgrammaticLearnTopic | null {
  return PROGRAMMATIC_LEARN_TOPICS.find((topic) => topic.slug === slug) ?? null;
}
