// Central registry — tool metadata used by search, related tools, recently used, sparklines, etc.

export interface ToolMeta {
  href: string;
  code: string;
  title: string;
  description: string;
  tags: string[];
  professional?: boolean;
  learnHref?: string;
  relatedHrefs?: string[];
  // Static sparkline path (viewBox 0 0 60 20)
  sparkline?: string;
  // Contextual fact shown below results based on output range
  rateContext?: string;
}

export const ALL_TOOLS: ToolMeta[] = [
  {
    href: '/mortgage', code: '01', title: 'Mortgage Repayment',
    description: 'Monthly payment, total interest, and full cost over any term.',
    tags: ['Repayments', 'Interest', 'Amortisation'],
    learnHref: '/learn/mortgage-repayment',
    relatedHrefs: ['/overpayment', '/affordability', '/offset'],
    sparkline: 'M0,20 C10,18 20,14 30,10 C40,6 50,4 60,3',
    rateContext: 'Bank of England base rate: 5.25% (Feb 2026). Revisit when your fixed deal ends.',
  },
  {
    href: '/savings', code: '02', title: 'Savings Growth',
    description: 'How compound interest grows your savings with regular contributions.',
    tags: ['Compound Interest', 'Growth', 'Projections'],
    relatedHrefs: ['/compound', '/retirement', '/save-goal'],
    sparkline: 'M0,18 C10,17 20,14 30,10 C40,6 50,3 60,1',
    rateContext: 'Best easy-access savings rates are currently around 5% (Feb 2026). Worth comparing.',
  },
  {
    href: '/rent-vs-buy', code: '03', title: 'Rent vs Buy',
    description: 'Long-term financial outcome of renting against buying.',
    tags: ['Net Worth', 'Break-even', 'Opportunity Cost'],
    learnHref: '/learn/rent-vs-buy',
    relatedHrefs: ['/mortgage', '/affordability', '/savings'],
    sparkline: 'M0,16 L15,15 L30,10 L45,8 L60,5 M0,18 L15,18 L30,16 L45,14 L60,12',
  },
  {
    href: '/compound', code: '04', title: 'Compound Interest',
    description: 'How compounding frequency affects your effective annual rate.',
    tags: ['EAR', 'Daily / Monthly / Annual'],
    learnHref: '/learn/compound-interest',
    relatedHrefs: ['/savings', '/retirement'],
    sparkline: 'M0,19 C15,17 25,13 35,8 C45,3 52,1 60,0',
  },
  {
    href: '/loan', code: '05', title: 'Loan Repayment',
    description: 'Monthly repayments and true APR on any loan or credit agreement.',
    tags: ['APR', 'Personal Loan', 'Car Finance'],
    relatedHrefs: ['/mortgage', '/subscriptions'],
    sparkline: 'M0,2 C10,4 20,8 30,12 C40,16 50,18 60,19',
  },
  {
    href: '/retirement', code: '06', title: 'Retirement Savings',
    description: 'Project your pension pot, including employer contributions and inflation.',
    tags: ['Pension', 'Inflation-adjusted', '4% Rule'],
    learnHref: '/learn/retirement-savings',
    relatedHrefs: ['/savings', '/compound', '/take-home'],
    sparkline: 'M0,20 C5,19 15,17 25,13 C35,8 45,4 60,1',
  },
  {
    href: '/offset', code: '07', title: 'Offset Mortgage',
    description: 'How savings reduce mortgage interest and shorten your term.',
    tags: ['Offset', 'Interest Saving', 'Term Reduction'],
    learnHref: '/learn/offset-mortgage',
    relatedHrefs: ['/mortgage', '/overpayment', '/savings'],
    sparkline: 'M0,4 C10,5 20,8 30,11 C40,14 50,17 60,19',
  },
  {
    href: '/overpayment', code: '08', title: 'Mortgage Overpayment',
    description: 'Interest saved and years removed by paying extra each month.',
    tags: ['Overpayment', 'Interest Saved', 'Early Payoff'],
    relatedHrefs: ['/mortgage', '/offset'],
    sparkline: 'M0,2 C10,4 20,8 30,13 C40,16 50,18 60,19',
  },
  {
    href: '/save-goal', code: '09', title: 'Save for a Goal',
    description: 'How long to reach a target, or what monthly saving hits a deadline.',
    tags: ['Target', 'Deadline', 'Monthly Required'],
    relatedHrefs: ['/savings', '/subscriptions'],
    sparkline: 'M0,20 L20,14 L40,8 L60,2',
  },
  {
    href: '/take-home', code: '10', title: 'Salary Take-Home',
    description: 'Net pay after tax — UK, Germany, USA, France, Netherlands, Australia.',
    tags: ['Tax', 'Net Salary', '6 Countries'],
    learnHref: '/learn/salary-take-home',
    relatedHrefs: ['/freelance', '/lifestyle-inflation', '/retirement'],
    sparkline: 'M0,20 L15,14 L30,12 L45,10 L60,8',
  },
  {
    href: '/affordability', code: '11', title: 'Mortgage Affordability',
    description: 'The maximum you can borrow based on income, deposit, and stress test.',
    tags: ['Borrowing Power', 'LTV', 'Stress Test'],
    learnHref: '/learn/mortgage-affordability',
    relatedHrefs: ['/mortgage', '/rent-vs-buy'],
    sparkline: 'M0,20 L20,14 L40,8 L60,4',
  },
  {
    href: '/tdee', code: '12', title: 'TDEE & Calorie Calculator',
    description: 'Total daily energy expenditure, BMR, BMI, and macro targets.',
    tags: ['Calories', 'BMI', 'Fitness'],
    relatedHrefs: ['/subscriptions'],
    sparkline: 'M0,10 L10,9 L20,10 L30,8 L40,9 L50,11 L60,10',
  },
  {
    href: '/subscriptions', code: '13', title: 'Subscription Drain',
    description: 'True 10-year cost of subscriptions and investment opportunity cost.',
    tags: ['Subscriptions', '10-Year Cost', 'Opportunity Cost'],
    relatedHrefs: ['/lifestyle-inflation', '/save-goal'],
    sparkline: 'M0,18 C10,16 20,13 30,9 C40,5 50,3 60,2',
  },
  {
    href: '/freelance', code: '14', title: 'Freelance Rate Calculator',
    description: 'Work backwards from desired salary to minimum hourly and day rate.',
    tags: ['Day Rate', 'Freelance', 'Contractor'],
    relatedHrefs: ['/take-home', '/lifestyle-inflation'],
    sparkline: 'M0,20 L30,10 L60,2',
  },
  {
    href: '/lifestyle-inflation', code: '15', title: 'Lifestyle Inflation Tracker',
    description: 'Compare current vs entry-level spending and the 10-year opportunity cost.',
    tags: ['Lifestyle Creep', 'Spending', 'Opportunity Cost'],
    relatedHrefs: ['/subscriptions', '/take-home'],
    sparkline: 'M0,15 C15,13 25,10 35,7 C45,4 55,2 60,1',
  },
  {
    href: '/crisis', code: '16', title: 'Financial Crisis Simulator',
    description: 'How long your savings last if you lose your job or costs double.',
    tags: ['Emergency Fund', 'Job Loss', 'Survival Runway'],
    learnHref: '/learn/financial-crisis',
    relatedHrefs: ['/savings', '/subscriptions'],
    sparkline: 'M0,2 C10,3 20,6 30,11 C40,15 50,18 60,20',
  },
  {
    href: '/bi', code: 'P01', title: 'Business Interruption Sum Insured',
    description: 'Calculate BI sum insured using gross profit, trend uplift, indemnity period, and ICOW.',
    tags: ['Gross Profit', 'ICOW', 'Indemnity Period'],
    professional: true,
    relatedHrefs: ['/tcor', '/coverage-gap'],
  },
  {
    href: '/hlv', code: 'P02', title: 'Human Life Value / Life Insurance',
    description: 'Present value of future earnings, debts, and obligations to find the true insurance gap.',
    tags: ['HLV', 'Coverage Gap', 'Protection'],
    professional: true,
    relatedHrefs: ['/cyber', '/coverage-gap'],
  },
  {
    href: '/cyber', code: 'P03', title: 'Cyber Risk Exposure',
    description: 'Estimate breach costs, risk score, and recommended cover limit based on security controls.',
    tags: ['Ransomware', 'Data Breach', 'Risk Score'],
    professional: true,
    relatedHrefs: ['/cyber-limit', '/risk-heatmap', '/coverage-gap'],
  },
  {
    href: '/tcor', code: 'P04', title: 'Total Cost of Risk (TCOR)',
    description: 'Aggregate premiums, retained losses, admin, and risk control costs. Four scenario comparison.',
    tags: ['TCOR Rate', 'Retained Losses', 'Scenarios'],
    professional: true,
    relatedHrefs: ['/coverage-gap', '/risk-heatmap', '/loss-probability'],
  },
  {
    href: '/risk-heatmap', code: 'P05', title: 'Risk Score & Heat Map',
    description: 'Score risks by likelihood and impact. 5×5 heat map, editable register.',
    tags: ['Heat Map', 'Risk Register', 'Mitigation'],
    professional: true,
    relatedHrefs: ['/tcor', '/loss-probability', '/scr'],
  },
  {
    href: '/scr', code: 'P06', title: 'SCR Estimator (Solvency II)',
    description: 'Estimate Solvency Capital Requirement using standard formula principles.',
    tags: ['SCR', 'Solvency II', 'Capital'],
    professional: true,
    relatedHrefs: ['/risk-heatmap', '/tcor'],
  },
  {
    href: '/coverage-gap', code: 'P07', title: 'Coverage Gap Analysis',
    description: 'Map policy limits against exposures across property, liability, BI, and cyber lines.',
    tags: ['Under-Insurance', 'Limits', 'Coinsurance'],
    professional: true,
    relatedHrefs: ['/bi', '/cyber-limit', '/tcor'],
  },
  {
    href: '/ltv-cac', code: 'P08', title: 'LTV & CAC Calculator',
    description: 'Customer Lifetime Value, CAC ratio, and payback period. DCF-based LTV with scenario modelling.',
    tags: ['LTV:CAC', 'Payback', 'Churn'],
    professional: true,
    relatedHrefs: ['/freelance'],
  },
  {
    href: '/loss-probability', code: 'P09', title: 'Loss Event Probability Modeler',
    description: 'Expected annual loss from risk events using triangular distributions.',
    tags: ['PML', 'Triangular', 'Exceedance'],
    professional: true,
    relatedHrefs: ['/risk-heatmap', '/tcor', '/coverage-gap'],
  },
  {
    href: '/cyber-limit', code: 'P10', title: 'Cyber Insurance Limit Recommender',
    description: 'Estimate cyber limit adequacy from revenue, records, industry, and security controls.',
    tags: ['Cyber', 'Limit Adequacy', 'GDPR'],
    professional: true,
    relatedHrefs: ['/cyber', '/coverage-gap', '/risk-heatmap'],
  },
];

export const PERSONAL_TOOLS = ALL_TOOLS.filter(t => !t.professional);
export const PROFESSIONAL_TOOLS = ALL_TOOLS.filter(t => t.professional);

export function getToolByHref(href: string): ToolMeta | undefined {
  return ALL_TOOLS.find(t => t.href === href);
}

export function getRelatedTools(href: string): ToolMeta[] {
  const tool = getToolByHref(href);
  if (!tool?.relatedHrefs) return [];
  return tool.relatedHrefs.map(h => ALL_TOOLS.find(t => t.href === h)).filter(Boolean) as ToolMeta[];
}
