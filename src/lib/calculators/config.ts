export interface CalculatorConfig {
  id: string;
  categorySlug: string;
  name: string;
  params: ParamDefinition[];
  maxVariants: number;
  seoTemplate: {
    title: string;
    description: string;
    h1: string;
  };
  formula: string;
}

export type ParamDefinition = {
  key: string;
  values: (number | string)[];
  step?: number;
  prefix?: string;
  label: string;
};

type ParamValue = number | string;
type ParamMap = Record<string, ParamValue>;

export const calculators: CalculatorConfig[] = [
  {
    id: 'mortgage-repayment',
    categorySlug: 'mortgage-repayment',
    name: 'Mortgage Repayment',
    params: [
      { key: 'principal', label: 'Loan amount', prefix: '$', step: 25000, values: [300000, 275000, 250000, 350000, 200000, 425000, 180000, 500000, 150000, 625000, 750000, 1000000] },
      { key: 'rate', label: 'Interest rate', prefix: '%', step: 0.25, values: [4.5, 4.75, 5, 4.25, 5.25, 4, 5.5, 5.75, 6, 3.75, 6.25, 6.5, 7] },
      { key: 'termYears', label: 'Term', step: 5, values: [25, 30, 35, 20, 40, 15] },
    ],
    maxVariants: 335,
    seoTemplate: {
      title: 'Mortgage Repayment Calculator - {{principal}} at {{rate}} over {{termYears}} years | Plain Figures',
      description: 'Monthly payment, total interest, and worked mortgage maths for {{principal}} at {{rate}} over {{termYears}} years.',
      h1: 'Mortgage Repayment Calculator - {{principal}} at {{rate}} over {{termYears}} years',
    },
    formula: 'M = P × [r(1 + r)^n] / [(1 + r)^n − 1]',
  },
  {
    id: 'savings-growth',
    categorySlug: 'savings-growth',
    name: 'Savings Growth',
    params: [
      { key: 'initialDeposit', label: 'Initial deposit', prefix: '$', step: 5000, values: [10000, 25000, 5000, 50000, 100000] },
      { key: 'monthlyContribution', label: 'Monthly contribution', prefix: '$', step: 100, values: [500, 250, 1000, 750, 1500, 2000] },
      { key: 'annualRate', label: 'Annual rate', prefix: '%', step: 0.5, values: [4.5, 5, 4, 6, 7] },
      { key: 'termYears', label: 'Term', step: 5, values: [10, 15, 20, 30] },
    ],
    maxVariants: 230,
    seoTemplate: {
      title: 'Savings Growth Calculator - {{initialDeposit}} plus {{monthlyContribution}} a month | Plain Figures',
      description: 'Formula-first savings growth projections for {{initialDeposit}}, {{monthlyContribution}} monthly, {{annualRate}} return, and {{termYears}} years.',
      h1: 'Savings Growth Calculator - {{initialDeposit}} plus {{monthlyContribution}} a month',
    },
    formula: 'FV = P(1 + r/n)^(nt) + PMT × [((1 + r/n)^(nt) − 1) / (r/n)]',
  },
  {
    id: 'rent-vs-buy',
    categorySlug: 'rent-vs-buy',
    name: 'Rent vs Buy',
    params: [
      { key: 'homePrice', label: 'Home price', prefix: '$', step: 50000, values: [350000, 450000, 300000, 500000, 650000] },
      { key: 'downPaymentPct', label: 'Deposit', prefix: '%', step: 5, values: [20, 10, 25, 15] },
      { key: 'mortgageRate', label: 'Mortgage rate', prefix: '%', step: 0.5, values: [4.5, 5, 4, 5.5, 6] },
      { key: 'monthlyRent', label: 'Monthly rent', prefix: '$', step: 250, values: [2000, 1800, 2500, 3000, 1500] },
    ],
    maxVariants: 210,
    seoTemplate: {
      title: 'Rent vs Buy Calculator - {{homePrice}} home with {{downPaymentPct}} down | Plain Figures',
      description: 'Compare rent and buy maths for a {{homePrice}} home, {{downPaymentPct}} deposit, {{mortgageRate}} mortgage, and {{monthlyRent}} rent.',
      h1: 'Rent vs Buy Calculator - {{homePrice}} home with {{downPaymentPct}} down',
    },
    formula: 'Net position = equity or investments − cumulative housing costs',
  },
  {
    id: 'compound-interest',
    categorySlug: 'compound-interest',
    name: 'Compound Interest',
    params: [
      { key: 'principal', label: 'Principal', prefix: '$', step: 5000, values: [10000, 15000, 25000, 50000, 75000, 100000, 5000, 150000, 250000] },
      { key: 'rate', label: 'Rate', prefix: '%', step: 0.25, values: [5, 5.25, 4.75, 5.5, 4.5, 6, 6.25, 6.5, 4.25, 7, 7.25, 8] },
      { key: 'years', label: 'Years', step: 1, values: [10, 12, 15, 18, 20, 25, 30, 35, 5] },
      { key: 'frequency', label: 'Compounding frequency', values: ['monthly', 'quarterly', 'annual', 'daily'] },
    ],
    maxVariants: 495,
    seoTemplate: {
      title: 'Compound Interest Calculator - {{principal}} at {{rate}} for {{years}} years | Plain Figures',
      description: 'Compound growth for {{principal}} at {{rate}} over {{years}} years with {{frequency}} compounding.',
      h1: 'Compound Interest Calculator - {{principal}} at {{rate}} for {{years}} years',
    },
    formula: 'A = P × (1 + r / n)^(n × t)',
  },
  {
    id: 'loan-repayment',
    categorySlug: 'loan-repayment',
    name: 'Loan Repayment',
    params: [
      { key: 'amount', label: 'Loan amount', prefix: '$', step: 5000, values: [10000, 15000, 20000, 25000, 5000, 30000, 50000, 75000, 100000] },
      { key: 'rate', label: 'APR', prefix: '%', step: 0.25, values: [6.9, 5.9, 7.4, 7.9, 8.9, 4.9, 9.9, 12.9, 14.9, 18.9, 24.9] },
      { key: 'termMonths', label: 'Term', step: 6, values: [36, 48, 60, 24, 72, 84, 96, 18] },
    ],
    maxVariants: 270,
    seoTemplate: {
      title: 'Loan Repayment Calculator - {{amount}} at {{rate}} over {{termMonths}} months | Plain Figures',
      description: 'Monthly payment, total interest, and loan cost maths for {{amount}} at {{rate}} over {{termMonths}} months.',
      h1: 'Loan Repayment Calculator - {{amount}} at {{rate}} over {{termMonths}} months',
    },
    formula: 'M = P × [r(1 + r)^n] / [(1 + r)^n − 1]',
  },
  {
    id: 'retirement-savings',
    categorySlug: 'retirement-savings',
    name: 'Retirement Savings',
    params: [
      { key: 'monthlyContribution', label: 'Monthly contribution', prefix: '$', step: 250, values: [500, 750, 1000, 1250, 1500, 250, 2000, 2500, 3000, 4000, 5000] },
      { key: 'growthRate', label: 'Growth rate', prefix: '%', step: 0.25, values: [7, 7.25, 7.5, 8, 6.75, 8.25, 6.5, 6, 5.5, 8.5, 9, 10] },
      { key: 'years', label: 'Years to retirement', step: 1, values: [20, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 40, 45, 15] },
    ],
    maxVariants: 295,
    seoTemplate: {
      title: 'Retirement Savings Calculator - {{monthlyContribution}} a month for {{years}} years | Plain Figures',
      description: 'Projected retirement pot for {{monthlyContribution}} monthly, {{growthRate}} growth, and {{years}} years of saving.',
      h1: 'Retirement Savings Calculator - {{monthlyContribution}} a month for {{years}} years',
    },
    formula: 'FV = current savings compounded forward + future value of recurring monthly contributions',
  },
  {
    id: 'offset-mortgage',
    categorySlug: 'offset-mortgage',
    name: 'Offset Mortgage',
    params: [
      { key: 'balance', label: 'Mortgage balance', prefix: '$', step: 50000, values: [250000, 350000, 500000, 150000, 750000] },
      { key: 'savings', label: 'Offset savings', prefix: '$', step: 10000, values: [25000, 50000, 100000, 10000, 150000] },
      { key: 'rate', label: 'Rate', prefix: '%', step: 0.5, values: [4.5, 5, 4, 3.5] },
      { key: 'termYears', label: 'Term', step: 5, values: [20, 25, 30, 15] },
    ],
    maxVariants: 250,
    seoTemplate: {
      title: 'Offset Mortgage Calculator - {{balance}} balance with {{savings}} savings | Plain Figures',
      description: 'Offset mortgage maths for {{balance}} balance, {{savings}} savings, {{rate}} rate, and {{termYears}} years remaining.',
      h1: 'Offset Mortgage Calculator - {{balance}} balance with {{savings}} savings',
    },
    formula: 'Charged interest uses max(0, mortgage balance − linked savings)',
  },
  {
    id: 'mortgage-overpayment',
    categorySlug: 'mortgage-overpayment',
    name: 'Mortgage Overpayment',
    params: [
      { key: 'balance', label: 'Mortgage balance', prefix: '$', step: 50000, values: [300000, 250000, 400000, 500000, 200000] },
      { key: 'rate', label: 'Rate', prefix: '%', step: 0.5, values: [4.5, 5, 4, 6] },
      { key: 'termYears', label: 'Term', step: 5, values: [25, 30, 20, 15] },
      { key: 'monthlyOverpayment', label: 'Monthly overpayment', prefix: '$', step: 100, values: [100, 200, 300, 500] },
    ],
    maxVariants: 230,
    seoTemplate: {
      title: 'Mortgage Overpayment Calculator - {{monthlyOverpayment}} extra each month | Plain Figures',
      description: 'See term reduction and interest saved by overpaying {{monthlyOverpayment}} a month on {{balance}} at {{rate}}.',
      h1: 'Mortgage Overpayment Calculator - {{monthlyOverpayment}} extra each month',
    },
    formula: 'New payoff term is found by applying payment + overpayment until balance reaches zero',
  },
  {
    id: 'save-for-goal',
    categorySlug: 'save-for-goal',
    name: 'Save for a Goal',
    params: [
      { key: 'targetAmount', label: 'Target amount', prefix: '$', step: 10000, values: [25000, 50000, 100000, 200000, 10000] },
      { key: 'monthlyContribution', label: 'Monthly contribution', prefix: '$', step: 250, values: [500, 750, 1000, 250, 1500] },
      { key: 'annualRate', label: 'Annual rate', prefix: '%', step: 0.5, values: [5, 4, 6, 3] },
      { key: 'years', label: 'Deadline', step: 1, values: [3, 5, 7, 2] },
    ],
    maxVariants: 230,
    seoTemplate: {
      title: 'Save for a Goal Calculator - {{targetAmount}} by {{years}} years | Plain Figures',
      description: 'Monthly saving required to reach {{targetAmount}} in {{years}} years at {{annualRate}} with {{monthlyContribution}} contributions.',
      h1: 'Save for a Goal Calculator - {{targetAmount}} by {{years}} years',
    },
    formula: 'Target balance = current savings compounded + future value of monthly deposits',
  },
  {
    id: 'salary-take-home',
    categorySlug: 'salary-take-home',
    name: 'Salary Take-Home',
    params: [
      { key: 'country', label: 'Country', values: ['uk', 'us', 'de', 'au', 'fr', 'nl', 'ca', 'ie'] },
      { key: 'gross', label: 'Gross salary', prefix: '$', step: 10000, values: [50000, 60000, 75000, 85000, 100000, 120000, 150000, 200000, 30000, 250000, 400000] },
      { key: 'payPeriod', label: 'Pay period', values: ['annual', 'monthly', 'weekly', 'bonus'] },
    ],
    maxVariants: 255,
    seoTemplate: {
      title: 'Salary Take-Home Calculator - {{gross}} {{country}} gross pay | Plain Figures',
      description: 'Gross-to-net pay estimate for {{gross}} in {{country}} on a {{payPeriod}} basis.',
      h1: 'Salary Take-Home Calculator - {{gross}} {{country}} gross pay',
    },
    formula: 'Net pay = gross pay − income tax − payroll deductions − employee contributions',
  },
  {
    id: 'mortgage-affordability',
    categorySlug: 'mortgage-affordability',
    name: 'Mortgage Affordability',
    params: [
      { key: 'income', label: 'Income', prefix: '$', step: 10000, values: [60000, 80000, 100000, 120000, 150000, 200000] },
      { key: 'depositPct', label: 'Deposit', prefix: '%', step: 5, values: [10, 20, 15, 25, 30] },
      { key: 'rate', label: 'Stress rate', prefix: '%', step: 0.5, values: [5.5, 6.5, 7.5, 8.5, 4.5] },
      { key: 'incomeMultiple', label: 'Income multiple', step: 0.5, values: [4, 4.5, 5] },
    ],
    maxVariants: 170,
    seoTemplate: {
      title: 'Mortgage Affordability Calculator - {{income}} income and {{depositPct}} deposit | Plain Figures',
      description: 'Estimate borrowing power from {{income}}, {{depositPct}} deposit, {{rate}} stress rate, and {{incomeMultiple}} income multiple.',
      h1: 'Mortgage Affordability Calculator - {{income}} income and {{depositPct}} deposit',
    },
    formula: 'Borrowing power ≈ gross income × income multiple, subject to deposit and stress-rate constraints',
  },
  {
    id: 'tdee-calorie',
    categorySlug: 'tdee-calorie',
    name: 'TDEE & Calorie Calculator',
    params: [
      { key: 'weightKg', label: 'Weight', step: 5, values: [65, 75, 85, 95, 55] },
      { key: 'heightCm', label: 'Height', step: 5, values: [170, 175, 180, 165, 190] },
      { key: 'age', label: 'Age', step: 5, values: [30, 40, 25, 50] },
      { key: 'sex', label: 'Sex', values: ['male', 'female'] },
      { key: 'activity', label: 'Activity', values: ['moderate', 'active', 'light', 'sedentary', 'very-active'] },
    ],
    maxVariants: 170,
    seoTemplate: {
      title: 'TDEE Calculator - {{weightKg}}kg, {{heightCm}}cm, age {{age}} | Plain Figures',
      description: 'Estimate TDEE for {{weightKg}}kg, {{heightCm}}cm, age {{age}}, {{sex}}, and {{activity}} activity.',
      h1: 'TDEE Calculator - {{weightKg}}kg, {{heightCm}}cm, age {{age}}',
    },
    formula: 'Mifflin-St Jeor BMR × activity multiplier',
  },
  {
    id: 'subscription-drain',
    categorySlug: 'subscription-drain',
    name: 'Subscription Drain',
    params: [
      { key: 'monthlySpend', label: 'Monthly spend', prefix: '$', step: 25, values: [50, 100, 150, 200, 25, 300, 500, 750, 1000] },
      { key: 'annualIncrease', label: 'Annual price increase', prefix: '%', step: 1, values: [0, 3, 5, 7, 10] },
      { key: 'investmentReturn', label: 'Opportunity return', prefix: '%', step: 1, values: [5, 7, 0, 3, 9] },
    ],
    maxVariants: 170,
    seoTemplate: {
      title: 'Subscription Drain Calculator - {{monthlySpend}} a month with {{annualIncrease}} increases | Plain Figures',
      description: 'Recurring-cost and opportunity-cost maths for {{monthlySpend}} monthly spend, {{annualIncrease}} price growth, and {{investmentReturn}} returns.',
      h1: 'Subscription Drain Calculator - {{monthlySpend}} a month',
    },
    formula: 'Total cost sums recurring cash outflow; opportunity cost compounds missed investments forward',
  },
  {
    id: 'freelance-rate',
    categorySlug: 'freelance-rate',
    name: 'Freelance Rate Calculator',
    params: [
      { key: 'desiredTakeHome', label: 'Take-home target', prefix: '$', step: 20000, values: [60000, 80000, 100000, 40000, 150000] },
      { key: 'annualExpenses', label: 'Annual expenses', prefix: '$', step: 5000, values: [10000, 15000, 25000, 5000] },
      { key: 'taxRate', label: 'Tax rate', prefix: '%', step: 5, values: [30, 35, 40, 25] },
      { key: 'billableWeeks', label: 'Billable weeks', step: 2, values: [44, 46, 42, 40] },
    ],
    maxVariants: 170,
    seoTemplate: {
      title: 'Freelance Rate Calculator - {{desiredTakeHome}} target income | Plain Figures',
      description: 'Translate a {{desiredTakeHome}} take-home target into a freelance day rate using {{annualExpenses}}, {{taxRate}}, and {{billableWeeks}}.',
      h1: 'Freelance Rate Calculator - {{desiredTakeHome}} target income',
    },
    formula: 'Required rate = (target take-home + overhead + tax burden) / billable time',
  },
  {
    id: 'lifestyle-inflation',
    categorySlug: 'lifestyle-inflation',
    name: 'Lifestyle Inflation Tracker',
    params: [
      { key: 'startingSpend', label: 'Starting spend', prefix: '$', step: 500, values: [2500, 3000, 3500, 2000, 4500, 5500] },
      { key: 'annualIncomeGrowth', label: 'Income growth', prefix: '%', step: 1, values: [3, 5, 7, 2, 10] },
      { key: 'spendGrowth', label: 'Spending growth', prefix: '%', step: 1, values: [2, 4, 6, 8, 10] },
      { key: 'years', label: 'Years', step: 5, values: [10, 15, 20, 25] },
    ],
    maxVariants: 160,
    seoTemplate: {
      title: 'Lifestyle Inflation Tracker - {{startingSpend}} monthly spend | Plain Figures',
      description: 'Model lifestyle creep for {{startingSpend}} starting spend, {{annualIncomeGrowth}} income growth, and {{spendGrowth}} spend growth.',
      h1: 'Lifestyle Inflation Tracker - {{startingSpend}} monthly spend',
    },
    formula: 'Wealth gap = future value of disciplined savings path − future value of lifestyle-inflated path',
  },
  {
    id: 'financial-crisis',
    categorySlug: 'financial-crisis',
    name: 'Financial Crisis Simulator',
    params: [
      { key: 'savings', label: 'Emergency savings', prefix: '$', step: 5000, values: [10000, 20000, 30000, 40000, 5000, 60000] },
      { key: 'monthlyBurn', label: 'Monthly burn', prefix: '$', step: 500, values: [2500, 3000, 4000, 5000, 2000] },
      { key: 'incomeDropPct', label: 'Income drop', prefix: '%', step: 10, values: [100, 75, 50, 25, 0] },
      { key: 'spendingCutPct', label: 'Spending cut', prefix: '%', step: 10, values: [0, 10, 20, 30] },
    ],
    maxVariants: 160,
    seoTemplate: {
      title: 'Financial Crisis Simulator - {{savings}} savings and {{monthlyBurn}} burn | Plain Figures',
      description: 'Emergency runway maths for {{savings}} savings, {{monthlyBurn}} monthly burn, and {{incomeDropPct}} income shock.',
      h1: 'Financial Crisis Simulator - {{savings}} savings and {{monthlyBurn}} burn',
    },
    formula: 'Runway months = savings ÷ adjusted monthly burn',
  },
  {
    id: 'business-interruption',
    categorySlug: 'business-interruption',
    name: 'Business Interruption Sum Insured',
    params: [
      { key: 'grossProfit', label: 'Gross profit', prefix: '$', step: 250000, values: [1000000, 2000000, 5000000, 7500000, 10000000] },
      { key: 'growthUpliftPct', label: 'Trend uplift', prefix: '%', step: 5, values: [10, 15, 20, 5] },
      { key: 'indemnityMonths', label: 'Indemnity period', step: 6, values: [12, 18, 24, 36] },
      { key: 'icowMonths', label: 'ICOW months', step: 3, values: [3, 6, 9] },
    ],
    maxVariants: 150,
    seoTemplate: {
      title: 'Business Interruption Sum Insured Calculator - {{grossProfit}} gross profit | Plain Figures',
      description: 'BI sum insured modelling for {{grossProfit}} gross profit, {{growthUpliftPct}} uplift, and {{indemnityMonths}} month indemnity.',
      h1: 'Business Interruption Sum Insured Calculator - {{grossProfit}} gross profit',
    },
    formula: 'BI sum insured = adjusted gross profit across the chosen indemnity period + ICOW allowance',
  },
  {
    id: 'human-life-value',
    categorySlug: 'human-life-value',
    name: 'Human Life Value / Life Insurance',
    params: [
      { key: 'annualIncome', label: 'Annual income', prefix: '$', step: 25000, values: [75000, 100000, 150000, 50000, 200000] },
      { key: 'yearsProtected', label: 'Protection years', step: 5, values: [10, 15, 20, 25, 30] },
      { key: 'discountRate', label: 'Discount rate', prefix: '%', step: 1, values: [4, 5, 3, 6] },
      { key: 'dependants', label: 'Dependants', step: 1, values: [1, 2, 3] },
    ],
    maxVariants: 150,
    seoTemplate: {
      title: 'Human Life Value Calculator - {{annualIncome}} income over {{yearsProtected}} years | Plain Figures',
      description: 'Present-value life cover estimate for {{annualIncome}} income, {{yearsProtected}} protection years, and {{dependants}} dependants.',
      h1: 'Human Life Value Calculator - {{annualIncome}} income over {{yearsProtected}} years',
    },
    formula: 'HLV = present value of future earnings and obligations less existing assets',
  },
  {
    id: 'cyber-risk-exposure',
    categorySlug: 'cyber-risk-exposure',
    name: 'Cyber Risk Exposure',
    params: [
      { key: 'annualRevenue', label: 'Revenue', prefix: '$', step: 5000000, values: [5000000, 10000000, 25000000, 1000000] },
      { key: 'employeeCount', label: 'Employees', step: 25, values: [25, 50, 100, 10] },
      { key: 'customerRecords', label: 'Records', step: 10000, values: [10000, 50000, 100000, 1000] },
      { key: 'industryRisk', label: 'Industry risk', values: ['medium', 'elevated', 'high', 'low'] },
    ],
    maxVariants: 140,
    seoTemplate: {
      title: 'Cyber Risk Exposure Calculator - {{annualRevenue}} revenue and {{customerRecords}} records | Plain Figures',
      description: 'Cyber exposure model for {{annualRevenue}} revenue, {{employeeCount}} employees, {{customerRecords}} records, and {{industryRisk}} industry risk.',
      h1: 'Cyber Risk Exposure Calculator - {{annualRevenue}} revenue and {{customerRecords}} records',
    },
    formula: 'Exposure = breach, interruption, regulatory, and reputation cost components adjusted by risk tier',
  },
  {
    id: 'total-cost-risk',
    categorySlug: 'total-cost-risk',
    name: 'Total Cost of Risk',
    params: [
      { key: 'premiums', label: 'Premiums', prefix: '$', step: 100000, values: [250000, 450000, 750000, 100000] },
      { key: 'retainedLosses', label: 'Retained losses', prefix: '$', step: 100000, values: [120000, 250000, 400000, 50000] },
      { key: 'adminCosts', label: 'Admin costs', prefix: '$', step: 25000, values: [65000, 100000, 25000] },
      { key: 'riskControlCosts', label: 'Control costs', prefix: '$', step: 25000, values: [45000, 80000, 15000] },
      { key: 'revenue', label: 'Revenue', prefix: '$', step: 5000000, values: [10000000, 25000000, 50000000, 5000000] },
    ],
    maxVariants: 140,
    seoTemplate: {
      title: 'Total Cost of Risk Calculator - {{premiums}} premiums and {{retainedLosses}} losses | Plain Figures',
      description: 'TCOR modelling for {{premiums}} premiums, {{retainedLosses}} losses, {{adminCosts}} admin, and {{riskControlCosts}} control spend.',
      h1: 'Total Cost of Risk Calculator - {{premiums}} premiums and {{retainedLosses}} losses',
    },
    formula: 'TCOR = premiums + retained losses + admin costs + risk-control costs',
  },
  {
    id: 'risk-heatmap',
    categorySlug: 'risk-heatmap',
    name: 'Risk Score & Heat Map',
    params: [
      { key: 'likelihood', label: 'Likelihood', step: 1, values: [3, 4, 2, 5, 1] },
      { key: 'impact', label: 'Impact', step: 1, values: [4, 5, 3, 2, 1] },
      { key: 'riskCount', label: 'Risks scored', step: 5, values: [10, 20, 30, 50] },
      { key: 'velocity', label: 'Risk velocity', values: ['medium', 'high', 'low', 'critical'] },
    ],
    maxVariants: 115,
    seoTemplate: {
      title: 'Risk Heat Map Calculator - likelihood {{likelihood}} and impact {{impact}} | Plain Figures',
      description: 'Score risks by {{likelihood}} likelihood, {{impact}} impact, {{riskCount}} items, and {{velocity}} velocity.',
      h1: 'Risk Heat Map Calculator - likelihood {{likelihood}} and impact {{impact}}',
    },
    formula: 'Risk score = likelihood × impact',
  },
  {
    id: 'scr-estimator',
    categorySlug: 'scr-estimator',
    name: 'SCR Estimator (Solvency II)',
    params: [
      { key: 'premiumRisk', label: 'Premium risk', prefix: '$', step: 1000000, values: [5000000, 10000000, 15000000, 2500000, 20000000] },
      { key: 'reserveRisk', label: 'Reserve risk', prefix: '$', step: 1000000, values: [4000000, 8000000, 12000000, 2000000, 16000000] },
      { key: 'marketShockPct', label: 'Market shock', prefix: '%', step: 5, values: [15, 20, 10, 25] },
      { key: 'diversificationCredit', label: 'Diversification credit', prefix: '%', step: 5, values: [20, 15, 25, 10] },
    ],
    maxVariants: 115,
    seoTemplate: {
      title: 'SCR Estimator - premium risk {{premiumRisk}} and reserve risk {{reserveRisk}} | Plain Figures',
      description: 'Indicative Solvency II SCR modelling for premium risk {{premiumRisk}}, reserve risk {{reserveRisk}}, and {{marketShockPct}} market shock.',
      h1: 'SCR Estimator - premium risk {{premiumRisk}} and reserve risk {{reserveRisk}}',
    },
    formula: 'Aggregated capital ≈ √(module risk terms with diversification offsets)',
  },
  {
    id: 'coverage-gap',
    categorySlug: 'coverage-gap',
    name: 'Coverage Gap Analysis',
    params: [
      { key: 'assetValue', label: 'Asset value', prefix: '$', step: 500000, values: [2000000, 5000000, 10000000, 1500000, 20000000] },
      { key: 'insuredLimit', label: 'Insured limit', prefix: '$', step: 500000, values: [1000000, 2500000, 5000000, 7500000, 10000000] },
      { key: 'lossPct', label: 'Loss severity', prefix: '%', step: 10, values: [25, 50, 75, 100] },
      { key: 'horizon', label: 'Scenario horizon', values: ['current', 'renewal', 'stress', 'growth'] },
    ],
    maxVariants: 115,
    seoTemplate: {
      title: 'Coverage Gap Analysis - {{assetValue}} assets and {{insuredLimit}} limit | Plain Figures',
      description: 'Coverage-gap modelling for {{assetValue}} assets, {{insuredLimit}} limit, and {{lossPct}} loss severity.',
      h1: 'Coverage Gap Analysis - {{assetValue}} assets and {{insuredLimit}} limit',
    },
    formula: 'Coverage gap = modeled loss − insured limit',
  },
  {
    id: 'ltv-cac',
    categorySlug: 'ltv-cac',
    name: 'LTV/CAC',
    params: [
      { key: 'arpu', label: 'Monthly ARPU', prefix: '$', step: 50, values: [99, 149, 249, 49] },
      { key: 'grossMarginPct', label: 'Gross margin', prefix: '%', step: 5, values: [80, 70, 85, 60] },
      { key: 'churnRatePct', label: 'Monthly churn', prefix: '%', step: 0.5, values: [2.5, 3.5, 1.5, 5] },
      { key: 'cacPerCustomer', label: 'CAC', prefix: '$', step: 250, values: [500, 850, 1250, 250] },
    ],
    maxVariants: 170,
    seoTemplate: {
      title: 'LTV/CAC Calculator - {{arpu}} ARPU, {{grossMarginPct}} margin, {{churnRatePct}} churn | Plain Figures',
      description: 'Unit-economics model for {{arpu}} ARPU, {{grossMarginPct}} margin, {{churnRatePct}} churn, and {{cacPerCustomer}} CAC.',
      h1: 'LTV/CAC Calculator - {{arpu}} ARPU, {{grossMarginPct}} margin, {{churnRatePct}} churn',
    },
    formula: 'LTV:CAC = customer lifetime value ÷ customer acquisition cost',
  },
  {
    id: 'loss-probability',
    categorySlug: 'loss-probability',
    name: 'Loss Event Probability Modeler',
    params: [
      { key: 'exposureCount', label: 'Exposure count', step: 100, values: [1000, 2500, 5000, 7500, 10000] },
      { key: 'baseProbabilityPct', label: 'Base probability', prefix: '%', step: 0.5, values: [1, 2, 3, 5, 7.5] },
      { key: 'severity', label: 'Severity band', values: ['low', 'medium', 'high', 'critical'] },
      { key: 'controlStrength', label: 'Control strength', values: ['strong', 'moderate', 'weak', 'minimal'] },
    ],
    maxVariants: 115,
    seoTemplate: {
      title: 'Loss Probability Modeler - {{exposureCount}} exposures at {{baseProbabilityPct}} | Plain Figures',
      description: 'Loss-event modelling for {{exposureCount}} exposures, {{baseProbabilityPct}} base probability, and {{severity}} severity.',
      h1: 'Loss Probability Modeler - {{exposureCount}} exposures at {{baseProbabilityPct}}',
    },
    formula: 'Expected loss frequency = exposure count × event probability',
  },
  {
    id: 'cyber-limit',
    categorySlug: 'cyber-limit',
    name: 'Cyber Insurance Limit Recommender',
    params: [
      { key: 'revenue', label: 'Revenue', prefix: '$', step: 5000000, values: [5000000, 10000000, 25000000, 50000000, 100000000] },
      { key: 'records', label: 'Records', step: 10000, values: [10000, 50000, 100000, 250000, 500000] },
      { key: 'retention', label: 'Retention', prefix: '$', step: 50000, values: [25000, 50000, 100000, 250000] },
      { key: 'sector', label: 'Sector', values: ['saas', 'healthcare', 'retail', 'professional-services'] },
    ],
    maxVariants: 115,
    seoTemplate: {
      title: 'Cyber Insurance Limit Calculator - {{revenue}} revenue and {{records}} records | Plain Figures',
      description: 'Indicative cyber-limit range for {{revenue}} revenue, {{records}} records, {{retention}} retention, and {{sector}} sector risk.',
      h1: 'Cyber Insurance Limit Calculator - {{revenue}} revenue and {{records}} records',
    },
    formula: 'Suggested limit is anchored to modeled severity after applying the chosen retention',
  },
  {
    id: 'uk-tax-take-home',
    categorySlug: 'uk-tax-take-home',
    name: 'UK Tax Take-Home Calculator',
    params: [
      { key: 'gross', label: 'Gross salary', prefix: '£', step: 10000, values: [30000, 45000, 60000, 80000, 100000, 125140, 150000, 200000] },
      { key: 'pensionRate', label: 'Pension rate', prefix: '%', step: 2.5, values: [0, 5, 8, 10, 15, 20, 25, 30] },
      { key: 'studentLoanPlan', label: 'Student loan plan', values: ['none', 'plan-1', 'plan-2', 'plan-5'] },
      { key: 'bonusMode', label: 'Bonus treatment', values: ['salary-only', 'include-bonus'] },
    ],
    maxVariants: 400,
    seoTemplate: {
      title: 'UK Tax Take-Home Calculator - £{{gross}} salary after tax | Plain Figures',
      description: 'UK take-home pay for £{{gross}} salary, {{pensionRate}} pension, {{studentLoanPlan}} student loan, and {{bonusMode}} treatment.',
      h1: 'UK Tax Take-Home Calculator - £{{gross}} salary after tax',
    },
    formula: 'Net pay = gross − income tax − National Insurance − pension − student loan deductions',
  },
  {
    id: 'pension-contribution-scenarios',
    categorySlug: 'pension-contribution-scenarios',
    name: 'Pension Contribution Scenarios',
    params: [
      { key: 'salary', label: 'Salary', prefix: '£', step: 10000, values: [40000, 60000, 80000, 100000, 125140, 150000, 200000] },
      { key: 'employeePct', label: 'Employee contribution', prefix: '%', step: 2.5, values: [5, 8, 10, 12, 15] },
      { key: 'employerPct', label: 'Employer contribution', prefix: '%', step: 2.5, values: [3, 5, 8, 10] },
      { key: 'years', label: 'Projection horizon', step: 5, values: [10, 15, 20, 25] },
    ],
    maxVariants: 400,
    seoTemplate: {
      title: 'Pension Contribution Scenarios - {{salary}} salary with {{employeePct}} + {{employerPct}} | Plain Figures',
      description: 'Compare pension contribution scenarios for {{salary}} salary, {{employeePct}} employee, {{employerPct}} employer, and {{years}} years.',
      h1: 'Pension Contribution Scenarios - {{salary}} salary with {{employeePct}} + {{employerPct}}',
    },
    formula: 'Projected pot = current savings compounded + future value of employee and employer contributions',
  },
];

const slugBuilders: Partial<Record<string, (params: ParamMap) => string>> = {
  'mortgage-repayment': ({ principal, rate, termYears }) => `mortgage-payment-${principal}-${rate}-${termYears}-years`,
  'compound-interest': ({ principal, rate, years, frequency }) => `compound-interest-${principal}-${rate}-${years}-compounded-${frequency}`,
  'loan-repayment': ({ amount, rate, termMonths }) => `loan-repayment-${amount}-${rate}-${termMonths}-months`,
  'retirement-savings': ({ monthlyContribution, growthRate, years }) => `retirement-savings-${monthlyContribution}-month-${growthRate}-${years}-years`,
  'salary-take-home': ({ country, gross, payPeriod }) => `salary-take-home-${country}-${gross}-${payPeriod}`,
  'offset-mortgage': ({ balance, savings, rate, termYears }) => `offset-mortgage-${balance}-balance-${savings}-savings-${rate}-${termYears}-years`,
  'save-for-goal': ({ targetAmount, monthlyContribution, annualRate, years }) => `save-for-goal-${targetAmount}-target-${monthlyContribution}-month-${annualRate}-${years}-years`,
  'tdee-calorie': ({ weightKg, heightCm, age, sex, activity }) => `tdee-calorie-${weightKg}kg-${heightCm}cm-${age}-${sex}-${activity}`,
  'subscription-drain': ({ monthlySpend, annualIncrease, investmentReturn }) => `subscription-drain-${monthlySpend}-monthly-${annualIncrease}-increase-${investmentReturn}-return`,
  'freelance-rate': ({ desiredTakeHome, annualExpenses, taxRate, billableWeeks }) => `freelance-rate-${desiredTakeHome}-target-${annualExpenses}-expenses-${taxRate}-tax-${billableWeeks}-weeks`,
  'ltv-cac': ({ arpu, grossMarginPct, churnRatePct, cacPerCustomer }) => `ltv-cac-${arpu}-arpu-${grossMarginPct}-margin-${churnRatePct}-churn-${cacPerCustomer}-cac`,
  'cyber-risk-exposure': ({ annualRevenue, employeeCount, customerRecords, industryRisk }) => `cyber-risk-exposure-${annualRevenue}-revenue-${employeeCount}-employees-${customerRecords}-records-${industryRisk}-risk`,
  'total-cost-risk': ({ premiums, retainedLosses, adminCosts, riskControlCosts, revenue }) => `total-cost-risk-${premiums}-premiums-${retainedLosses}-losses-${adminCosts}-admin-${riskControlCosts}-control-${revenue}-revenue`,
  'uk-tax-take-home': ({ gross, pensionRate, studentLoanPlan, bonusMode }) => `uk-tax-take-home-${gross}-salary-${pensionRate}-pension-${studentLoanPlan}-${bonusMode}`,
  'pension-contribution-scenarios': ({ salary, employeePct, employerPct, years }) => `pension-contribution-scenarios-${salary}-salary-${employeePct}-employee-${employerPct}-employer-${years}-years`,
};

function normalizeSlugPart(value: ParamValue): string {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/%/g, 'pct')
    .replace(/[^a-z0-9.]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function buildGenericSlug(config: CalculatorConfig, params: ParamMap): string {
  const parts = config.params.flatMap((param) => [param.key, normalizeSlugPart(params[param.key])]);
  return [config.id, ...parts].join('-');
}

function buildSlug(config: CalculatorConfig, params: ParamMap): string {
  const builder = slugBuilders[config.id];
  return builder ? builder(params) : buildGenericSlug(config, params);
}

function compareValues(config: CalculatorConfig, params: ParamMap): string {
  return config.params.map((param) => `${param.key}:${params[param.key]}`).join('|');
}

function enumerateVariants(config: CalculatorConfig): { params: ParamMap; score: number }[] {
  const results: { params: ParamMap; score: number }[] = [];

  const visit = (index: number, current: ParamMap, score: number) => {
    if (index === config.params.length) {
      results.push({ params: current, score });
      return;
    }

    const param = config.params[index];
    const weight = config.params.length - index;
    param.values.forEach((value, valueIndex) => {
      const popularity = param.values.length - valueIndex;
      visit(index + 1, { ...current, [param.key]: value }, score + popularity * weight);
    });
  };

  visit(0, {}, 0);

  return results.sort((left, right) => {
    if (right.score !== left.score) {
      return right.score - left.score;
    }
    return compareValues(config, left.params).localeCompare(compareValues(config, right.params));
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function generateAllSlugs(): { categorySlug: string; slug: string; params: Record<string, any> }[] {
  return calculators.flatMap((config) => {
    const variants = enumerateVariants(config);
    const seen = new Set<string>();

    return variants
      .map(({ params }) => {
        const slug = buildSlug(config, params);
        if (seen.has(slug)) {
          return null;
        }
        seen.add(slug);
        return {
          categorySlug: config.categorySlug,
          slug,
          params,
        };
      })
      .filter((variant): variant is { categorySlug: string; slug: string; params: ParamMap } => Boolean(variant))
      .slice(0, config.maxVariants);
  });
}
