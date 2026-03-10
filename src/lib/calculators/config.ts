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
  isValidVariant?: (params: Record<string, ParamValue>) => boolean;
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

function numberRange(start: number, end: number, step: number): number[] {
  const values: number[] = [];

  for (let value = start; value <= end; value += step) {
    values.push(Number(value.toFixed(10)));
  }

  return values;
}

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
    maxVariants: 180,
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
    maxVariants: 160,
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
    maxVariants: 200,
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
    maxVariants: 180,
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
    maxVariants: 100,
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
    maxVariants: 100,
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
    maxVariants: 90,
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
    maxVariants: 90,
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
    maxVariants: 60,
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
    maxVariants: 60,
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
    maxVariants: 70,
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
    maxVariants: 70,
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
    maxVariants: 45,
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
    maxVariants: 45,
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
    maxVariants: 45,
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
    maxVariants: 100,
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
    maxVariants: 45,
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
    maxVariants: 45,
    seoTemplate: {
      title: 'Cyber Insurance Limit Calculator - {{revenue}} revenue and {{records}} records | Plain Figures',
      description: 'Indicative cyber-limit range for {{revenue}} revenue, {{records}} records, {{retention}} retention, and {{sector}} sector risk.',
      h1: 'Cyber Insurance Limit Calculator - {{revenue}} revenue and {{records}} records',
    },
    formula: 'Suggested limit is anchored to modeled severity after applying the chosen retention',
  },
  {
    id: 'uk-tax-take-home',
    categorySlug: 'tax',
    name: 'UK Tax & NI Take-Home Calculator 2026/27',
    params: [
      { key: 'salary', label: 'Annual Gross Salary (£)', prefix: '£', step: 2500, values: numberRange(10000, 250000, 2500) },
      { key: 'taxYear', label: 'Tax Year', values: ['2026/27'] },
      { key: 'pensionPercent', label: 'Pension Contribution %', prefix: '%', step: 1, values: numberRange(0, 20, 1) },
      { key: 'studentLoanPlan', label: 'Student Loan Plan', values: ['None', 'Plan 1', 'Plan 2', 'Plan 4', 'Plan 5', 'Postgraduate'] },
      { key: 'region', label: 'Tax Region', values: ['England', 'Scotland'] },
      { key: 'otherDeductions', label: 'Other monthly deductions (£)', prefix: '£', step: 100, values: [0, 100, 200, 500, 1000] },
    ],
    maxVariants: 1200,
    seoTemplate: {
      title: '{{salary}} Salary After Tax & NI - UK {{taxYear}} Take-Home Pay Calculator | Plain Figures',
      description: 'Formula-first UK take-home pay for {{salary}} in {{taxYear}}, with {{pensionPercent}} pension, {{studentLoanPlan}}, {{region}} rates, and {{otherDeductions}} monthly deductions.',
      h1: '{{salary}} Salary After Tax & NI - UK {{taxYear}} Take-Home Pay Calculator',
    },
    formula: '\\text{Net pay} = \\text{gross} - \\text{income tax} - \\text{NI} - \\text{student loan} - \\text{other deductions}',
  },
  {
    id: 'net-worth-growth',
    categorySlug: 'wealth',
    name: 'Net Worth & Wealth Growth Calculator',
    params: [
      { key: 'currentNetWorth', label: 'Current net worth', prefix: '$', step: 50000, values: [-50000, 0, 50000, 150000, 300000] },
      { key: 'monthlySavings', label: 'Monthly savings', prefix: '$', step: 250, values: [250, 750, 1500, 3000, 5000] },
      { key: 'expectedReturnRate', label: 'Expected return rate', prefix: '%', step: 1, values: [4, 5, 6, 7, 8, 10] },
      { key: 'inflationRate', label: 'Inflation rate', prefix: '%', step: 1, values: [1, 2, 3, 5] },
      { key: 'timeHorizonYears', label: 'Time horizon years', step: 5, values: [5, 10, 20, 30, 40] },
    ],
    maxVariants: 1800,
    seoTemplate: {
      title: 'Project Your Net Worth in {{timeHorizonYears}} Years - {{monthlySavings}} a month at {{expectedReturnRate}} return | Plain Figures',
      description: 'Net-worth projection using {{currentNetWorth}} starting wealth, {{monthlySavings}} monthly saving, {{expectedReturnRate}} returns, {{inflationRate}} inflation, and {{timeHorizonYears}} years.',
      h1: 'Project Your Net Worth in {{timeHorizonYears}} Years',
    },
    formula: 'FV = NW_0(1+r)^t + PMT \\times \\frac{(1+r)^t - 1}{r}',
  },
  {
    id: 'auto-loan',
    categorySlug: 'loans',
    name: 'Car Loan & PCP Calculator 2026',
    params: [
      { key: 'carPrice', label: 'Car price', prefix: '£', step: 4000, values: [8000, 15000, 22000, 30000, 45000, 60000] },
      { key: 'depositPercent', label: 'Deposit percent', prefix: '%', step: 10, values: [0, 10, 20, 30, 40] },
      { key: 'interestRate', label: 'Interest rate', prefix: '%', step: 1, values: [1.9, 3.9, 5.9, 7.9, 9.9, 12.9] },
      { key: 'termYears', label: 'Term years', step: 1, values: [2, 3, 4, 5, 7] },
      { key: 'balloonPercent', label: 'Balloon percent', prefix: '%', step: 10, values: [0, 20, 35] },
      { key: 'includePCP', label: 'Include PCP', values: ['yes', 'no'] },
    ],
    maxVariants: 1400,
    seoTemplate: {
      title: '{{carPrice}} Car Loan Calculator - Monthly Payments & Total Cost | Plain Figures',
      description: 'Car finance maths for {{carPrice}}, {{depositPercent}} deposit, {{interestRate}} APR, {{termYears}} years, {{balloonPercent}} balloon, and PCP {{includePCP}}.',
      h1: '{{carPrice}} Car Loan Calculator - Monthly Payments & Total Cost',
    },
    formula: 'M = \\frac{(P-D-B)r}{1-(1+r)^{-n}}',
    isValidVariant: (params) => {
      const includePCP = params.includePCP === 'yes';
      const balloonPercent = Number(params.balloonPercent);
      const depositPercent = Number(params.depositPercent);
      const termYears = Number(params.termYears);

      if (!includePCP) {
        return balloonPercent === 0;
      }

      return balloonPercent > 0 && termYears >= 3 && depositPercent + balloonPercent <= 70;
    },
  },
  {
    id: 'investment-growth',
    categorySlug: 'investing',
    name: 'Investment & Compound Growth Calculator',
    params: [
      { key: 'initialAmount', label: 'Initial amount', prefix: '£', step: 5000, values: [1000, 10000, 25000, 50000] },
      { key: 'monthlyContribution', label: 'Monthly contribution', prefix: '£', step: 250, values: [0, 250, 500, 1000, 2500] },
      { key: 'annualReturn', label: 'Annual return', prefix: '%', step: 1, values: [3, 5, 7, 9, 12, 15] },
      { key: 'years', label: 'Years', step: 5, values: [1, 5, 10, 20, 40] },
      { key: 'compoundingFrequency', label: 'Compounding frequency', values: ['monthly', 'quarterly', 'annual'] },
    ],
    maxVariants: 2000,
    seoTemplate: {
      title: '{{initialAmount}} + {{monthlyContribution}} a month at {{annualReturn}} - Future Value in {{years}} Years | Plain Figures',
      description: 'Future value of {{initialAmount}} plus {{monthlyContribution}} monthly at {{annualReturn}} for {{years}} years with {{compoundingFrequency}} compounding.',
      h1: '{{initialAmount}} + {{monthlyContribution}} a Month at {{annualReturn}}',
    },
    formula: 'FV = P(1+\\frac{r}{n})^{nt} + PMT \\times \\frac{(1+\\frac{r}{n})^{nt}-1}{r/n}',
  },
  {
    id: 'roth-vs-traditional',
    categorySlug: 'retirement',
    name: 'Roth vs Traditional IRA / 401(k) Calculator 2026',
    params: [
      { key: 'account', label: 'Account type', values: ['ira', '401k'] },
      { key: 'currentAge', label: 'Current age', step: 10, values: [25, 35, 45, 55, 60] },
      { key: 'retirementAge', label: 'Retirement age', step: 5, values: [60, 65, 67, 70, 75] },
      { key: 'currentTaxBracket', label: 'Current tax bracket', prefix: '%', step: 10, values: [10, 12, 22, 24] },
      { key: 'expectedRetirementBracket', label: 'Retirement tax bracket', prefix: '%', step: 10, values: [10, 12, 22] },
      { key: 'annualContribution', label: 'Annual contribution', prefix: '$', step: 5000, values: [3000, 7500, 24500, 32500] },
      { key: 'growthRate', label: 'Growth rate', prefix: '%', step: 1, values: [4, 6, 8] },
      { key: 'yearsUntilRetirement', label: 'Years until retirement', step: 5, values: [5, 10, 15, 20, 30] },
    ],
    maxVariants: 1500,
    seoTemplate: {
      title: 'Roth vs Traditional {{account}} in 2026 - Should You Convert? Calculator | Plain Figures',
      description: 'Compare Roth and Traditional {{account}} maths using age {{currentAge}}, retirement at {{retirementAge}}, {{annualContribution}} annual contributions, and {{growthRate}} growth.',
      h1: 'Roth vs Traditional {{account}} in 2026',
    },
    formula: 'FV_{after\\ tax} = C \\times \\frac{(1+r)^t - 1}{r} \\times (1-\\tau)',
    isValidVariant: (params) => {
      const account = String(params.account);
      const currentAge = Number(params.currentAge);
      const retirementAge = Number(params.retirementAge);
      const yearsUntilRetirement = Number(params.yearsUntilRetirement);
      const annualContribution = Number(params.annualContribution);

      if (retirementAge <= currentAge || retirementAge - currentAge !== yearsUntilRetirement) {
        return false;
      }

      if (account === 'ira') {
        const iraCap = currentAge >= 50 ? 8600 : 7500;
        return annualContribution <= iraCap;
      }

      if (account === '401k') {
        const catchUpCap = currentAge >= 60 && currentAge <= 63 ? 35750 : currentAge >= 50 ? 32500 : 24500;
        return annualContribution <= catchUpCap;
      }

      return false;
    },
  },
  {
    id: 'side-hustle-profit',
    categorySlug: 'business',
    name: 'Side Hustle Profit & Self-Employment Tax Calculator 2026',
    params: [
      { key: 'monthlyIncome', label: 'Monthly Side Hustle Income (£/$)', step: 250, values: numberRange(500, 10000, 250) },
      { key: 'businessExpenses', label: 'Monthly Business Expenses', step: 100, values: [0, 100, 250, 500, 1000, 2000, 5000] },
      { key: 'country', label: 'Country (Tax Rules)', values: ['UK', 'US', 'Canada', 'Australia'] },
      { key: 'deductions', label: 'Key Deductions', values: ['None', 'Home Office', 'Mileage', 'Equipment'] },
      { key: 'taxBracket', label: 'Marginal Tax Rate % (estimate)', prefix: '%', step: 5, values: numberRange(10, 45, 5) },
    ],
    maxVariants: 1600,
    seoTemplate: {
      title: '{{monthlyIncome}} a Month Side Hustle Profit After Tax - 2026 Calculator | Plain Figures',
      description: 'Estimate side-hustle profit after expenses, self-employment tax, and income tax using {{monthlyIncome}} monthly income, {{businessExpenses}} monthly expenses, {{country}} rules, {{deductions}}, and a {{taxBracket}} marginal rate.',
      h1: '{{monthlyIncome}} a Month Side Hustle Profit After Tax',
    },
    formula: '\\text{Net} = \\text{gross} - \\text{expenses} - \\text{SE tax} - \\text{income tax}',
  },
  {
    id: 'emergency-fund',
    categorySlug: 'savings',
    name: 'Emergency Fund Savings Goal Calculator 2026',
    params: [
      { key: 'monthlyExpenses', label: 'Monthly expenses', prefix: '£', step: 250, values: [1000, 1500, 2000, 2500, 3000, 4000, 5000, 6500, 8000, 10000] },
      { key: 'monthsOfCoverage', label: 'Months of coverage', step: 1, values: numberRange(3, 12, 1) },
      { key: 'currentSavings', label: 'Current savings', prefix: '£', step: 1000, values: [0, 1000, 3000, 5000, 10000, 15000, 20000, 30000, 40000, 50000] },
      { key: 'monthlySaveAmount', label: 'Monthly save amount', prefix: '£', step: 100, values: [100, 250, 500, 750, 1000, 1250, 1500, 2000] },
      { key: 'interestRate', label: 'Interest rate', prefix: '%', step: 0.25, values: [0, 0.5, 1, 2, 3, 4, 5] },
    ],
    maxVariants: 1800,
    seoTemplate: {
      title: 'Build {{monthsOfCoverage}} Months Emergency Fund - Save {{monthlySaveAmount}} a Month at {{interestRate}} | Plain Figures',
      description: 'Work out how fast you can build a {{monthsOfCoverage}}-month emergency fund using {{monthlyExpenses}} monthly expenses, {{currentSavings}} current savings, {{monthlySaveAmount}} monthly saving, and {{interestRate}} interest.',
      h1: 'Build {{monthsOfCoverage}} Months Emergency Fund',
    },
    formula: '\\text{Target fund} = \\text{monthly expenses} \\times \\text{months of coverage}',
  },
  {
    id: 'crypto-allocation',
    categorySlug: 'crypto-allocation',
    name: 'Crypto Portfolio Allocation & Risk Calculator 2026',
    params: [
      { key: 'totalPortfolio', label: 'Total portfolio', prefix: '£', step: 5000, values: [5000, 10000, 25000, 50000, 100000, 250000, 500000] },
      { key: 'cryptoPercent', label: 'Crypto allocation', prefix: '%', step: 5, values: numberRange(0, 50, 5) },
      { key: 'bitcoinPercentOfCrypto', label: 'Bitcoin share of crypto', prefix: '%', step: 10, values: numberRange(30, 80, 10) },
      { key: 'expectedCryptoReturn', label: 'Expected crypto return', prefix: '%', step: 5, values: numberRange(5, 40, 5) },
      { key: 'volatilityFactor', label: 'Volatility factor', values: ['low', 'medium', 'high'] },
      { key: 'rebalanceFrequency', label: 'Rebalance frequency', values: ['monthly', 'quarterly', 'yearly'] },
    ],
    maxVariants: 1400,
    seoTemplate: {
      title: '{{totalPortfolio}} Portfolio with {{cryptoPercent}} Crypto - Risk & Growth 2026 | Plain Figures',
      description: 'Model crypto allocation risk and expected growth for a {{totalPortfolio}} portfolio with {{cryptoPercent}} in crypto, {{bitcoinPercentOfCrypto}} in bitcoin, {{expectedCryptoReturn}} expected crypto return, {{volatilityFactor}} volatility, and {{rebalanceFrequency}} rebalancing.',
      h1: '{{totalPortfolio}} Portfolio with {{cryptoPercent}} Crypto',
    },
    formula: '\\text{Expected value} = P[(1-c)(1+r_b) + c(1+r_c)]',
  },
  {
    id: 'divorce-finance',
    categorySlug: 'life-events',
    name: 'Divorce Financial Impact & Asset Split Calculator',
    params: [
      { key: 'combinedAssets', label: 'Combined assets', prefix: '£', step: 50000, values: [50000, 100000, 250000, 500000, 1000000, 1500000, 2000000] },
      { key: 'debtTotal', label: 'Debt total', prefix: '£', step: 50000, values: [0, 25000, 50000, 100000, 250000, 500000] },
      { key: 'incomeRatio', label: 'Income ratio for one spouse', prefix: '%', step: 5, values: numberRange(30, 70, 5) },
      { key: 'children', label: 'Children', step: 1, values: numberRange(0, 5, 1) },
      { key: 'alimonyMonths', label: 'Alimony months', step: 12, values: [0, 12, 24, 36, 60, 84, 120] },
      { key: 'pensionSplitPercent', label: 'Pension split percent', prefix: '%', step: 10, values: [0, 10, 20, 30, 40, 50] },
    ],
    maxVariants: 1500,
    seoTemplate: {
      title: 'Divorce Asset Split Calculator - Your Share of {{combinedAssets}} | Plain Figures',
      description: 'Illustrate divorce asset-split outcomes for {{combinedAssets}} assets, {{debtTotal}} debt, {{incomeRatio}} income ratio, {{children}} children, {{alimonyMonths}} alimony months, and a {{pensionSplitPercent}} pension split.',
      h1: 'Divorce Asset Split Calculator - Your Share of {{combinedAssets}}',
    },
    formula: '\\text{Net marital estate} = \\text{assets} - \\text{debts}',
  },
  {
    id: 'cost-of-living',
    categorySlug: 'planning',
    name: 'Cost of Living Comparison & Relocation Calculator 2026',
    params: [
      { key: 'currentCity', label: 'Current city', values: ['London', 'New York', 'Berlin', 'Sydney', 'Toronto', 'Paris', 'Singapore', 'Amsterdam', 'Dubai', 'Dublin', 'Los Angeles', 'Chicago', 'Melbourne', 'Vancouver', 'Manchester', 'Madrid', 'Hong Kong', 'Tokyo', 'San Francisco', 'Brisbane'] },
      { key: 'targetCity', label: 'Target city', values: ['London', 'New York', 'Berlin', 'Sydney', 'Toronto', 'Paris', 'Singapore', 'Amsterdam', 'Dubai', 'Dublin', 'Los Angeles', 'Chicago', 'Melbourne', 'Vancouver', 'Manchester', 'Madrid', 'Hong Kong', 'Tokyo', 'San Francisco', 'Brisbane', 'Lisbon', 'Austin', 'Seattle', 'Munich', 'Auckland', 'Perth', 'Montreal', 'Boston', 'Copenhagen', 'Zurich'] },
      { key: 'salary', label: 'Salary', prefix: '£', step: 10000, values: [30000, 40000, 50000, 65000, 80000, 100000, 150000, 200000] },
      { key: 'familySize', label: 'Family size', step: 1, values: numberRange(1, 6, 1) },
      { key: 'housingType', label: 'Housing type', values: ['Rent 1-bed', 'Rent 3-bed', 'Buy'] },
    ],
    maxVariants: 2000,
    seoTemplate: {
      title: 'Cost of Living: {{currentCity}} vs {{targetCity}} - Salary Needed in 2026 | Plain Figures',
      description: 'Compare cost of living between {{currentCity}} and {{targetCity}} using {{salary}} income, family size {{familySize}}, and {{housingType}} housing assumptions.',
      h1: 'Cost of Living: {{currentCity}} vs {{targetCity}}',
    },
    formula: '\\text{Required salary} = \\text{base salary} \\times \\frac{\\text{target cost index}}{\\text{current cost index}}',
    isValidVariant: (params) => String(params.currentCity) !== String(params.targetCity),
  },
  {
    id: 'student-loan-refinance',
    categorySlug: 'student-loans',
    name: 'Student Loan Refinance & Forgiveness Calculator 2026',
    params: [
      { key: 'loanBalance', label: 'Current Student Loan Balance ($)', prefix: '$', step: 10000, values: [10000, 25000, 40000, 60000, 85000, 110000, 150000, 200000] },
      { key: 'currentRate', label: 'Current Interest Rate %', prefix: '%', step: 0.5, values: [3, 3.5, 4.25, 5, 5.75, 6.5, 7.25, 8] },
      { key: 'annualIncome', label: 'Annual Income ($)', prefix: '$', step: 10000, values: [30000, 45000, 60000, 75000, 90000, 110000, 130000, 150000] },
      { key: 'forgivenessProgram', label: 'Potential Forgiveness Program', values: ['None', 'SAVE Plan', 'PSLF', 'IDR Forgiveness'] },
      { key: 'refiTermYears', label: 'Refinance Term (Years)', step: 5, values: [5, 7, 10, 15, 20] },
      { key: 'country', label: 'Country (Rules)', values: ['US'] },
    ],
    maxVariants: 1800,
    seoTemplate: {
      title: '{{loanBalance}} Student Loan - Refinance Savings & Forgiveness 2026 | Plain Figures',
      description: 'Compare refinance savings and forgiveness timing for {{loanBalance}} at {{currentRate}}, {{annualIncome}} income, {{forgivenessProgram}}, and a {{refiTermYears}}-year refi term.',
      h1: '{{loanBalance}} Student Loan - Refinance Savings & Forgiveness 2026',
    },
    formula: 'M = P\\frac{r(1+r)^n}{(1+r)^n-1}',
  },
  {
    id: 'home-renovation-roi',
    categorySlug: 'real-estate',
    name: 'Home Renovation ROI & Payback Period Calculator',
    params: [
      { key: 'currentHomeValue', label: 'Current home value', prefix: '$', step: 50000, values: [150000, 250000, 350000, 450000, 600000, 800000] },
      { key: 'renovationCost', label: 'Renovation cost', prefix: '$', step: 5000, values: [5000, 15000, 30000, 50000, 80000, 120000, 150000] },
      { key: 'valueIncreasePercent', label: 'Value increase percent', prefix: '%', step: 5, values: numberRange(5, 50, 5) },
      { key: 'holdingYears', label: 'Holding years', step: 1, values: [1, 2, 3, 5, 7, 10, 15] },
      { key: 'financingRate', label: 'Financing rate', prefix: '%', step: 0.5, values: [0, 2, 3.5, 5, 6, 7] },
    ],
    maxVariants: 1600,
    seoTemplate: {
      title: '{{renovationCost}} Renovation on {{currentHomeValue}} Home - ROI & Payback Years | Plain Figures',
      description: 'Estimate renovation ROI for a {{currentHomeValue}} home using {{renovationCost}} spend, {{valueIncreasePercent}} uplift, {{holdingYears}} holding years, and {{financingRate}} financing.',
      h1: '{{renovationCost}} Renovation on {{currentHomeValue}} Home',
    },
    formula: 'ROI = \\frac{\\Delta V - C}{C}',
  },
  {
    id: 'ev-vs-petrol-cost',
    categorySlug: 'vehicles',
    name: 'EV vs Petrol Car Total Cost Calculator 2026',
    params: [
      { key: 'vehiclePrice', label: 'Vehicle price', prefix: '£', step: 10000, values: [20000, 30000, 40000, 50000, 65000, 80000] },
      { key: 'annualMiles', label: 'Annual miles', step: 5000, values: [5000, 8000, 12000, 15000, 20000, 25000] },
      { key: 'electricityCostPerKwh', label: 'Electricity cost per kWh', prefix: '£', step: 0.05, values: [0.1, 0.15, 0.2, 0.25, 0.3, 0.4] },
      { key: 'petrolPricePerLitre', label: 'Petrol price per litre', prefix: '£', step: 0.1, values: [1.2, 1.4, 1.6, 1.8, 2.1, 2.5] },
      { key: 'evEfficiencyKwhPer100km', label: 'EV efficiency kWh/100km', step: 2, values: [15, 17, 20, 22, 25] },
      { key: 'petrolEfficiencyLPer100km', label: 'Petrol efficiency L/100km', step: 1, values: [5, 6, 7, 9, 12] },
      { key: 'yearsOwned', label: 'Years owned', step: 1, values: [3, 5, 7, 10] },
      { key: 'maintenanceDiff', label: 'Annual petrol maintenance premium', prefix: '£', step: 250, values: [0, 250, 500, 1000, 2000] },
    ],
    maxVariants: 2000,
    seoTemplate: {
      title: 'EV vs Petrol Car: {{annualMiles}} a Year - {{yearsOwned}}-Year Total Cost 2026 | Plain Figures',
      description: 'Compare EV and petrol running costs using {{vehiclePrice}} price, {{annualMiles}} miles, {{electricityCostPerKwh}} electricity, {{petrolPricePerLitre}} petrol, and {{yearsOwned}} years of ownership.',
      h1: 'EV vs Petrol Car: {{annualMiles}} a Year',
    },
    formula: 'TCO = \\text{purchase} + \\text{energy} + \\text{maintenance}',
  },
  {
    id: 'fire-number',
    categorySlug: 'fire-retirement',
    name: 'FIRE Number & Financial Independence Calculator',
    params: [
      { key: 'annualExpenses', label: 'Annual expenses', prefix: '$', step: 10000, values: [20000, 30000, 40000, 50000, 70000, 90000, 120000] },
      { key: 'safeWithdrawalRate', label: 'Safe withdrawal rate', prefix: '%', step: 0.25, values: [3, 3.25, 3.5, 4, 4.5] },
      { key: 'currentSavings', label: 'Current savings', prefix: '$', step: 50000, values: [0, 25000, 50000, 100000, 250000, 500000] },
      { key: 'monthlyContributions', label: 'Monthly contributions', prefix: '$', step: 500, values: [500, 1000, 1500, 2500, 3500, 5000] },
      { key: 'investmentReturn', label: 'Investment return', prefix: '%', step: 0.5, values: [4, 5, 6, 7, 8, 10] },
      { key: 'inflationRate', label: 'Inflation rate', prefix: '%', step: 0.5, values: [1.5, 2, 2.5, 3, 3.5, 4] },
    ],
    maxVariants: 1800,
    seoTemplate: {
      title: 'Your FIRE Number: Retire with {{annualExpenses}} Annual Expenses | Plain Figures',
      description: 'Estimate your FIRE target and timeline using {{annualExpenses}} annual expenses, {{safeWithdrawalRate}} withdrawal rate, {{currentSavings}} current savings, {{monthlyContributions}} monthly contributions, and {{investmentReturn}} growth.',
      h1: 'Your FIRE Number',
    },
    formula: 'FIRE = \\frac{E}{SWR}',
  },
  {
    id: 'inheritance-tax',
    categorySlug: 'estate',
    name: 'Inheritance Tax & Estate Value Calculator 2026',
    params: [
      { key: 'estateValue', label: 'Estate value', prefix: '£', step: 100000, values: [100000, 250000, 500000, 750000, 1000000, 2000000, 3500000, 5000000] },
      { key: 'beneficiaryRelationship', label: 'Beneficiary relationship', values: ['Spouse', 'Child', 'Sibling', 'Other'] },
      { key: 'country', label: 'Country', values: ['UK', 'US', 'Canada', 'Australia', 'Germany'] },
      { key: 'giftingInLast7Years', label: 'Gifting in last 7 years', prefix: '£', step: 50000, values: [0, 50000, 100000, 250000, 500000, 1000000] },
      { key: 'nilRateBandUsage', label: 'Nil-rate band usage', prefix: '%', step: 10, values: numberRange(0, 100, 10) },
    ],
    maxVariants: 1400,
    seoTemplate: {
      title: '{{estateValue}} Estate - Inheritance Tax Estimate 2026 ({{country}}) | Plain Figures',
      description: 'Illustrative inheritance-tax maths for a {{estateValue}} estate in {{country}}, with {{beneficiaryRelationship}} beneficiaries, {{giftingInLast7Years}} gifting, and {{nilRateBandUsage}} nil-rate band usage.',
      h1: '{{estateValue}} Estate - Inheritance Tax Estimate 2026',
    },
    formula: '\\text{Taxable estate} = \\text{estate} - \\text{reliefs} + \\text{chargeable gifts}',
  },
  {
    id: 'solar-payback',
    categorySlug: 'energy',
    name: 'Solar Panel Payback & ROI Calculator 2026',
    params: [
      { key: 'systemCost', label: 'Solar System Cost after Incentives ($/£)', prefix: '$', step: 2500, values: [5000, 8000, 12000, 16000, 20000, 25000, 30000] },
      { key: 'annualProductionKwh', label: 'Estimated Annual kWh Production', step: 1000, values: [3000, 5000, 7000, 9000, 12000, 15000] },
      { key: 'electricityRate', label: 'Electricity Rate per kWh', prefix: '$', step: 0.05, values: [0.1, 0.15, 0.2, 0.25, 0.3, 0.4, 0.5] },
      { key: 'energyInflation', label: 'Annual Energy Price Increase %', prefix: '%', step: 1, values: numberRange(2, 8, 1) },
      { key: 'incentivePercent', label: 'Government Incentive / Tax Credit %', prefix: '%', step: 10, values: [0, 10, 20, 30] },
      { key: 'location', label: 'Location (Sunlight Factor)', values: ['UK Average', 'US South', 'US North', 'Australia', 'Germany'] },
    ],
    maxVariants: 1600,
    seoTemplate: {
      title: '{{systemCost}} Solar Panels - Payback Period & ROI 2026 ({{location}}) | Plain Figures',
      description: 'Estimate solar payback and 25-year ROI using {{systemCost}} installed cost, {{annualProductionKwh}} annual production, {{electricityRate}} electricity rates, {{energyInflation}} energy inflation, {{incentivePercent}} incentives, and {{location}} sunlight assumptions.',
      h1: '{{systemCost}} Solar Panels - Payback Period & ROI 2026',
    },
    formula: 't_{payback} = \\frac{C}{S_1}',
  },
  {
    id: 'wedding-budget',
    categorySlug: 'wedding-planning',
    name: 'Wedding Budget Calculator 2026 - Full Breakdown',
    params: [
      { key: 'totalBudget', label: 'Total budget', prefix: '$', step: 5000, values: [5000, 10000, 15000, 25000, 40000, 60000, 80000, 100000] },
      { key: 'guestCount', label: 'Guest count', step: 25, values: [50, 75, 100, 150, 200, 250, 300] },
      { key: 'venuePercent', label: 'Venue percent', prefix: '%', step: 5, values: numberRange(20, 50, 5) },
      { key: 'cateringPercent', label: 'Catering percent', prefix: '%', step: 5, values: [15, 20, 25, 30, 35] },
      { key: 'weddingType', label: 'Wedding type', values: ['Traditional', 'Destination', 'Micro', 'Multi-Event'] },
      { key: 'locationMultiplier', label: 'Location multiplier', step: 0.1, values: [1, 1.2, 1.5] },
    ],
    maxVariants: 1800,
    seoTemplate: {
      title: '{{totalBudget}} Wedding Budget for {{guestCount}} Guests - 2026 Planner | Plain Figures',
      description: 'Plan a {{totalBudget}} wedding for {{guestCount}} guests using {{venuePercent}} venue allocation, {{cateringPercent}} catering, {{weddingType}} style, and a {{locationMultiplier}} location multiplier.',
      h1: '{{totalBudget}} Wedding Budget for {{guestCount}} Guests',
    },
    formula: '\\text{Category cost} = B \\times w_i',
  },
  {
    id: 'credit-score-timeline',
    categorySlug: 'credit',
    name: 'Credit Score Improvement Calculator - Timeline from Current Score',
    params: [
      { key: 'currentScore', label: 'Current score', step: 50, values: [300, 400, 500, 580, 620, 680, 720] },
      { key: 'targetScore', label: 'Target score', step: 30, values: [620, 680, 720, 760, 800, 850] },
      { key: 'monthlyOnTimePayments', label: 'Monthly on-time payments', values: ['yes', 'no'] },
      { key: 'payDownDebtPercent', label: 'Pay down debt percent', prefix: '%', step: 10, values: numberRange(0, 100, 10) },
      { key: 'newCreditInquiries', label: 'New credit inquiries', step: 1, values: numberRange(0, 5, 1) },
      { key: 'ageOfAccountsYears', label: 'Age of accounts years', step: 3, values: [1, 3, 5, 8, 12, 20] },
      { key: 'location', label: 'Location', values: ['US', 'UK', 'Canada'] },
    ],
    maxVariants: 1500,
    seoTemplate: {
      title: 'Improve Credit Score from {{currentScore}} to {{targetScore}} - Timeline 2026 | Plain Figures',
      description: 'Estimate a credit-score improvement timeline from {{currentScore}} to {{targetScore}} using {{monthlyOnTimePayments}} on-time payments, {{payDownDebtPercent}} debt reduction, {{newCreditInquiries}} new inquiries, {{ageOfAccountsYears}} years of history, and {{location}} scoring assumptions.',
      h1: 'Improve Credit Score from {{currentScore}} to {{targetScore}}',
    },
    formula: '\\Delta S \\approx p - i + h',
    isValidVariant: (params) => Number(params.targetScore) > Number(params.currentScore),
  },
  {
    id: 'freelance-quarterly-tax',
    categorySlug: 'freelance-tax',
    name: 'Freelance Quarterly Tax & Profit Calculator 2026',
    params: [
      { key: 'quarterlyIncome', label: 'Quarterly income', prefix: '$', step: 2500, values: [1000, 5000, 10000, 15000, 25000, 35000, 50000] },
      { key: 'expensesPercent', label: 'Expenses percent', prefix: '%', step: 5, values: numberRange(20, 60, 5) },
      { key: 'country', label: 'Country', values: ['US', 'UK', 'Canada', 'Australia'] },
      { key: 'selfEmploymentTaxRate', label: 'Self-employment tax rate', prefix: '%', step: 5, values: [8, 10, 12, 15] },
      { key: 'deductions', label: 'Deductions', values: ['Home Office', 'Mileage', 'Software', 'None'] },
    ],
    maxVariants: 1400,
    seoTemplate: {
      title: 'Q1-Q4 Freelance Tax Estimate - {{quarterlyIncome}} Quarterly Income 2026 | Plain Figures',
      description: 'Estimate freelance quarterly tax and retained profit using {{quarterlyIncome}} quarterly income, {{expensesPercent}} expenses, {{country}} rules, {{selfEmploymentTaxRate}} self-employment tax, and {{deductions}} deductions.',
      h1: 'Q1-Q4 Freelance Tax Estimate - {{quarterlyIncome}} Quarterly Income',
    },
    formula: '\\text{Quarterly tax} = (I - E) \\times \\tau',
  },
  {
    id: 'wealth-transfer',
    categorySlug: 'wealth-transfer-estate',
    name: 'Multi-Generational Wealth Transfer Calculator 2026',
    params: [
      { key: 'totalWealth', label: 'Total wealth', prefix: '$', step: 100000, values: [100000, 250000, 500000, 1000000, 2000000, 3500000, 5000000] },
      { key: 'annualGifting', label: 'Annual gifting', prefix: '$', step: 3000, values: [0, 3000, 18000, 36000, 72000] },
      { key: 'beneficiaries', label: 'Beneficiaries', step: 1, values: numberRange(1, 5, 1) },
      { key: 'taxJurisdiction', label: 'Tax jurisdiction', values: ['US Gift Tax', 'UK IHT', 'Canada', 'Australia'] },
      { key: 'growthRate', label: 'Growth rate', prefix: '%', step: 1, values: numberRange(3, 8, 1) },
      { key: 'yearsToTransfer', label: 'Years to transfer', step: 5, values: [5, 10, 15, 20, 25, 30] },
    ],
    maxVariants: 1600,
    seoTemplate: {
      title: '{{totalWealth}} Wealth Transfer to {{beneficiaries}} Heirs - Tax-Efficient 2026 | Plain Figures',
      description: 'Illustrate multi-generational wealth transfer using {{totalWealth}} wealth, {{annualGifting}} annual gifting, {{beneficiaries}} beneficiaries, {{taxJurisdiction}} rules, {{growthRate}} growth, and {{yearsToTransfer}} years.',
      h1: '{{totalWealth}} Wealth Transfer to {{beneficiaries}} Heirs',
    },
    formula: 'W_t = (W_0 - G)(1+r)^t',
  },
  {
    id: 'heloc-drawdown',
    categorySlug: 'heloc-loans',
    name: 'HELOC Drawdown & Repayment Calculator 2026',
    params: [
      { key: 'homeValue', label: 'Current Home Value ($/£)', prefix: '$', step: 100000, values: [200000, 300000, 450000, 600000, 800000, 1000000] },
      { key: 'equityPercent', label: 'Available Equity %', prefix: '%', step: 10, values: [20, 30, 40, 50, 65, 80] },
      { key: 'drawAmount', label: 'Amount to Draw ($/£)', prefix: '$', step: 10000, values: [10000, 25000, 50000, 75000, 100000, 150000, 200000] },
      { key: 'interestRate', label: 'Current HELOC Rate %', prefix: '%', step: 0.5, values: [5.5, 6.25, 7, 7.75, 8.5, 9.5, 10.5] },
      { key: 'repayYears', label: 'Repayment Period (Years)', step: 5, values: [5, 10, 15, 20] },
      { key: 'drawStrategy', label: 'Draw Schedule', values: ['Lump Sum', 'Over 2 Years', 'Over 5 Years'] },
    ],
    maxVariants: 1800,
    seoTemplate: {
      title: 'Draw {{drawAmount}} from HELOC on {{homeValue}} Home - Monthly Payments 2026 | Plain Figures',
      description: 'Estimate HELOC drawdown costs for {{drawAmount}} on a {{homeValue}} home with {{equityPercent}} available equity, {{interestRate}} rates, {{repayYears}} repayment, and {{drawStrategy}} draw timing.',
      h1: 'Draw {{drawAmount}} from HELOC on {{homeValue}} Home',
    },
    formula: 'M = P\\frac{r(1+r)^n}{(1+r)^n-1}',
    isValidVariant: (params) => Number(params.drawAmount) <= Number(params.homeValue) * (Number(params.equityPercent) / 100),
  },
  {
    id: 'pet-insurance-vs-vet',
    categorySlug: 'pet-insurance',
    name: 'Pet Insurance vs Out-of-Pocket Vet Bills Calculator 2026',
    params: [
      { key: 'petType', label: 'Pet type', values: ['Dog', 'Cat', 'Other'] },
      { key: 'petAgeYears', label: 'Pet age years', step: 2, values: [1, 3, 5, 8, 10, 12, 15] },
      { key: 'annualVetCostEstimate', label: 'Annual vet cost estimate', prefix: '$', step: 500, values: [500, 1000, 2000, 3500, 5000, 6500, 8000] },
      { key: 'insurancePremiumMonthly', label: 'Insurance premium monthly', prefix: '$', step: 20, values: [20, 40, 60, 80, 100, 120, 150] },
      { key: 'deductible', label: 'Deductible', prefix: '$', step: 250, values: [0, 250, 500, 750, 1000] },
      { key: 'reimbursementPercent', label: 'Reimbursement percent', prefix: '%', step: 10, values: [70, 80, 90] },
      { key: 'years', label: 'Years', step: 2, values: [3, 5, 7, 10] },
    ],
    maxVariants: 1600,
    seoTemplate: {
      title: 'Pet Insurance vs Vet Bills: {{annualVetCostEstimate}} a Year Expected Costs - 2026 | Plain Figures',
      description: 'Compare pet insurance against self-funding vet bills using {{petType}}, age {{petAgeYears}}, {{annualVetCostEstimate}} annual vet costs, {{insurancePremiumMonthly}} monthly premium, {{deductible}} deductible, and {{reimbursementPercent}} reimbursement.',
      h1: 'Pet Insurance vs Vet Bills: {{annualVetCostEstimate}} a Year Expected Costs',
    },
    formula: 'C_{insured} = P + D + (1-r)V',
  },
  {
    id: 'travel-rewards-optimizer',
    categorySlug: 'travel-rewards',
    name: 'Travel Rewards Points / Miles Value & Redemption Optimizer 2026',
    params: [
      { key: 'pointsBalance', label: 'Points balance', step: 25000, values: [10000, 25000, 50000, 100000, 250000, 500000, 1000000] },
      { key: 'annualSpend', label: 'Annual spend', prefix: '$', step: 10000, values: [10000, 20000, 35000, 50000, 75000, 100000] },
      { key: 'cardBonusPoints', label: 'Card bonus points', step: 25000, values: [0, 10000, 25000, 50000, 75000, 100000, 150000] },
      { key: 'redemptionType', label: 'Redemption type', values: ['Flights', 'Hotels', 'Cash Back', 'Gift Cards'] },
      { key: 'airlineOrHotelAlliance', label: 'Airline or hotel alliance', values: ['Star Alliance', 'Oneworld', 'SkyTeam', 'General'] },
      { key: 'centsPerPointValue', label: 'Cents per point value', step: 0.2, values: [0.8, 1, 1.2, 1.5, 1.8, 2.2, 2.5] },
    ],
    maxVariants: 1700,
    seoTemplate: {
      title: 'Optimize {{pointsBalance}} Points / Miles - Best Redemption Value 2026 | Plain Figures',
      description: 'Estimate travel rewards value for {{pointsBalance}} points, {{annualSpend}} annual spend, {{cardBonusPoints}} bonus points, {{redemptionType}} redemptions, {{airlineOrHotelAlliance}}, and {{centsPerPointValue}} cents-per-point value.',
      h1: 'Optimize {{pointsBalance}} Points / Miles',
    },
    formula: 'V = \\frac{p \\times cpp}{100}',
  },
  {
    id: 'ai-side-hustle-profit',
    categorySlug: 'ai-business',
    name: 'AI Side-Hustle Profit Projector 2026',
    params: [
      { key: 'monthlyRevenuePotential', label: 'Monthly revenue potential', prefix: '$', step: 500, values: [500, 1000, 2000, 3500, 5000, 7500, 10000] },
      { key: 'monthlyCosts', label: 'Monthly costs', prefix: '$', step: 100, values: [100, 300, 500, 800, 1200, 1600, 2000] },
      { key: 'timeHoursPerWeek', label: 'Time hours per week', step: 5, values: [5, 10, 15, 20, 25, 30] },
      { key: 'aiToolCostMonthly', label: 'AI tool cost monthly', prefix: '$', step: 20, values: [0, 20, 40, 80, 120, 160, 200] },
      { key: 'scalingMonths', label: 'Scaling months', step: 3, values: [3, 6, 9, 12, 18, 24] },
      { key: 'taxRatePercent', label: 'Tax rate percent', prefix: '%', step: 5, values: [15, 20, 25, 30, 35, 40] },
      { key: 'sideHustleType', label: 'Side hustle type', values: ['Content Creation', 'Freelance Services', 'AI Automation Tool', 'Print-on-Demand'] },
    ],
    maxVariants: 1800,
    seoTemplate: {
      title: 'AI Side Hustle: {{monthlyRevenuePotential}} a Month Potential - Profit After Costs & Tax 2026 | Plain Figures',
      description: 'Project AI side-hustle profit using {{monthlyRevenuePotential}} monthly revenue, {{monthlyCosts}} operating costs, {{aiToolCostMonthly}} AI tool spend, {{timeHoursPerWeek}} hours a week, {{scalingMonths}} scaling months, and {{taxRatePercent}} tax.',
      h1: 'AI Side Hustle: {{monthlyRevenuePotential}} a Month Potential',
    },
    formula: '\\Pi = R - C - T',
  },
  {
    id: 'debt-payoff-strategy',
    categorySlug: 'debt-payoff',
    name: 'Debt Snowball vs Avalanche Payoff Calculator 2026',
    params: [
      { key: 'debtsCount', label: 'Number of debts', step: 1, values: [2, 3, 4, 5, 6] },
      { key: 'totalDebt', label: 'Total debt amount ($/£)', prefix: '$', step: 5000, values: [5000, 10000, 15000, 25000, 35000, 50000] },
      { key: 'averageRate', label: 'Average interest rate %', prefix: '%', step: 5, values: [5, 8, 12, 16, 20, 25] },
      { key: 'extraPaymentMonthly', label: 'Extra monthly payment', prefix: '$', step: 100, values: [0, 50, 100, 200, 400, 700, 1000] },
      { key: 'strategy', label: 'Payoff strategy', values: ['Snowball (smallest first)', 'Avalanche (highest rate first)'] },
    ],
    maxVariants: 1600,
    seoTemplate: {
      title: 'Pay Off {{totalDebt}} Debt Faster - Snowball vs Avalanche 2026 | Plain Figures',
      description: 'Compare debt payoff timelines for {{totalDebt}} across {{debtsCount}} debts, {{averageRate}} average interest, {{extraPaymentMonthly}} extra monthly payments, and the {{strategy}} approach.',
      h1: 'Pay Off {{totalDebt}} Debt Faster',
    },
    formula: 'B_{t+1} = B_t(1+r) - P',
  },
  {
    id: 'subscription-savings',
    categorySlug: 'subscription-budget',
    name: 'Unused Subscriptions Savings Calculator 2026',
    params: [
      { key: 'monthlySubscriptionsCount', label: 'Monthly subscriptions count', step: 1, values: numberRange(3, 20, 1) },
      { key: 'averageMonthlyCostPerSub', label: 'Average monthly cost per subscription', prefix: '$', step: 5, values: [5, 8, 12, 16, 20, 24, 30] },
      { key: 'unusedPercent', label: 'Unused percent', prefix: '%', step: 10, values: numberRange(10, 80, 10) },
      { key: 'cancelNow', label: 'Cancel now', values: ['yes', 'no'] },
      { key: 'annualReviewFrequency', label: 'Annual review frequency', step: 1, values: [1, 2, 3, 4] },
    ],
    maxVariants: 1400,
    seoTemplate: {
      title: 'Cancel Unused Subscriptions - Save Money in 2026 | Plain Figures',
      description: 'Estimate annual subscription savings using {{monthlySubscriptionsCount}} subscriptions, {{averageMonthlyCostPerSub}} average cost, {{unusedPercent}} unused services, cancel-now {{cancelNow}}, and {{annualReviewFrequency}} reviews per year.',
      h1: 'Cancel Unused Subscriptions - Save Money in 2026',
    },
    formula: 'S = n \\times c \\times u',
  },
  {
    id: 'home-insurance-addons',
    categorySlug: 'home-insurance-addons',
    name: 'Home Insurance Add-Ons (Flood/Earthquake) Calculator 2026',
    params: [
      { key: 'homeValue', label: 'Home value', prefix: '$', step: 100000, values: [150000, 250000, 400000, 550000, 700000, 800000] },
      { key: 'locationRiskLevel', label: 'Flood/Earthquake risk level', values: ['Low', 'Medium', 'High'] },
      { key: 'basePremiumAnnual', label: 'Base premium annual', prefix: '$', step: 400, values: [800, 1200, 1600, 2200, 2600, 3000] },
      { key: 'addonPercentIncrease', label: 'Add-on percent increase', prefix: '%', step: 5, values: numberRange(5, 40, 5) },
      { key: 'coverageAmount', label: 'Coverage amount', prefix: '$', step: 100000, values: [50000, 100000, 200000, 300000, 400000, 500000] },
    ],
    maxVariants: 1500,
    seoTemplate: {
      title: 'Add Flood/Earthquake Coverage to {{homeValue}} Home Insurance - Cost 2026 | Plain Figures',
      description: 'Model home-insurance add-on costs for a {{homeValue}} home using {{locationRiskLevel}} risk, {{basePremiumAnnual}} base premium, {{addonPercentIncrease}} premium uplift, and {{coverageAmount}} extra cover.',
      h1: 'Add Flood/Earthquake Coverage to {{homeValue}} Home Insurance',
    },
    formula: 'P_{new} = P_{base}(1+a)',
    isValidVariant: (params) => Number(params.coverageAmount) <= Number(params.homeValue),
  },
  {
    id: 'balance-transfer-savings',
    categorySlug: 'balance-transfer-credit',
    name: 'Credit Card Balance Transfer Savings Calculator 2026',
    params: [
      { key: 'currentBalance', label: 'Current balance', prefix: '$', step: 2500, values: [1000, 3000, 5000, 8000, 12000, 20000, 30000] },
      { key: 'currentAPR', label: 'Current APR', prefix: '%', step: 3, values: [15, 18, 21, 24, 27, 30] },
      { key: 'transferFeePercent', label: 'Transfer fee percent', prefix: '%', step: 0.5, values: [0, 1, 2, 3, 4, 5] },
      { key: 'promoAPR', label: 'Promo APR', prefix: '%', step: 1, values: [0, 0.99, 1.99, 3.99, 6.99, 9.99] },
      { key: 'promoMonths', label: 'Promo months', step: 3, values: [6, 9, 12, 15, 18, 21] },
    ],
    maxVariants: 1600,
    seoTemplate: {
      title: 'Transfer {{currentBalance}} Balance - Save on Interest with 0% Promo 2026 | Plain Figures',
      description: 'Estimate balance-transfer savings for {{currentBalance}} at {{currentAPR}} APR using a {{promoAPR}} promo APR, {{promoMonths}} promo months, and {{transferFeePercent}} transfer fees.',
      h1: 'Transfer {{currentBalance}} Balance - Save on Interest',
    },
    formula: 'S = I_{current} - I_{promo} - F',
    isValidVariant: (params) => Number(params.promoAPR) < Number(params.currentAPR),
  },
  {
    id: 'ebike-vs-car-commute',
    categorySlug: 'transport-commute',
    name: 'eBike vs Car Commuting Cost Calculator 2026',
    params: [
      { key: 'commuteDistanceMilesDaily', label: 'Commute distance miles daily', step: 5, values: numberRange(5, 50, 5) },
      { key: 'daysPerWeek', label: 'Days per week', step: 1, values: numberRange(3, 7, 1) },
      { key: 'ebikeCost', label: 'eBike cost', prefix: '$', step: 400, values: [800, 1200, 1800, 2400, 3200, 4000] },
      { key: 'carFuelCostPerMile', label: 'Car fuel cost per mile', prefix: '$', step: 0.05, values: [0.1, 0.15, 0.2, 0.25, 0.3] },
      { key: 'maintenanceDiffAnnual', label: 'Maintenance difference annual', prefix: '$', step: 100, values: [100, 250, 400, 600, 800] },
      { key: 'years', label: 'Years', step: 1, values: [1, 2, 3, 4, 5] },
    ],
    maxVariants: 1400,
    seoTemplate: {
      title: 'eBike vs Car Commute: {{commuteDistanceMilesDaily}} Miles/Day - 3-Year Cost Savings 2026 | Plain Figures',
      description: 'Compare commuting costs using {{commuteDistanceMilesDaily}} daily miles, {{daysPerWeek}} days a week, {{ebikeCost}} eBike cost, {{carFuelCostPerMile}} car fuel cost, {{maintenanceDiffAnnual}} maintenance difference, and {{years}} years.',
      h1: 'eBike vs Car Commute: {{commuteDistanceMilesDaily}} Miles a Day',
    },
    formula: 'C = d \\times m \\times t',
  },
  {
    id: 'debt-consolidation-vs-transfer',
    categorySlug: 'debt',
    name: 'Debt Consolidation Loan vs Balance Transfer Calculator 2026',
    params: [
      { key: 'totalDebt', label: 'Total Debt to Consolidate ($/£)', prefix: '$', step: 5000, values: [5000, 10000, 15000, 20000, 30000, 40000, 50000] },
      { key: 'averageCurrentRate', label: 'Average Current Credit Card Rate %', prefix: '%', step: 2, values: [12, 15, 18, 21, 24, 28] },
      { key: 'consolidationLoanRate', label: 'Consolidation Loan Rate %', prefix: '%', step: 2, values: [6, 8, 10, 12, 15, 18] },
      { key: 'loanTermYears', label: 'Loan Term (Years)', step: 2, values: [3, 5, 7, 10] },
      { key: 'transferPromoMonths', label: 'Balance Transfer Promo Period (Months)', step: 6, values: [6, 12, 18, 21] },
      { key: 'transferFeePercent', label: 'Balance Transfer Fee %', prefix: '%', step: 1, values: [0, 1, 2, 3, 4, 5] },
    ],
    maxVariants: 1700,
    seoTemplate: {
      title: 'Consolidate {{totalDebt}} Debt - Loan vs 0% Transfer Savings 2026 | Plain Figures',
      description: 'Compare debt-consolidation loan and balance-transfer costs for {{totalDebt}} using {{averageCurrentRate}} current rates, {{consolidationLoanRate}} loan pricing, {{loanTermYears}} years, {{transferPromoMonths}} promo months, and {{transferFeePercent}} transfer fees.',
      h1: 'Consolidate {{totalDebt}} Debt - Loan vs 0% Transfer Savings',
    },
    formula: 'S = (I_c + F_c) - (I_t + F_t)',
  },
  {
    id: 'rent-vs-buy-home',
    categorySlug: 'rent-buy-real-estate',
    name: 'Rent vs Buy Home Calculator 2026',
    params: [
      { key: 'monthlyRent', label: 'Monthly rent', prefix: '$', step: 400, values: [800, 1200, 1600, 2200, 2800, 3400, 4000] },
      { key: 'homePrice', label: 'Home price', prefix: '$', step: 100000, values: [200000, 300000, 400000, 500000, 650000, 800000] },
      { key: 'downPaymentPercent', label: 'Down payment percent', prefix: '%', step: 5, values: [5, 10, 15, 20, 25, 30] },
      { key: 'mortgageRate', label: 'Mortgage rate', prefix: '%', step: 1, values: [4, 4.5, 5, 5.5, 6.5, 8] },
      { key: 'propertyTaxRate', label: 'Property tax rate', prefix: '%', step: 0.5, values: [0.5, 0.8, 1, 1.2, 1.5, 2] },
      { key: 'homeAppreciation', label: 'Home appreciation', prefix: '%', step: 1, values: [2, 3, 4, 5, 6] },
      { key: 'rentIncrease', label: 'Rent increase', prefix: '%', step: 1, values: [2, 3, 4, 5] },
      { key: 'yearsLiving', label: 'Years living', step: 3, values: [3, 5, 7, 10, 12, 15] },
    ],
    maxVariants: 1800,
    seoTemplate: {
      title: 'Rent {{monthlyRent}}/mo vs Buy {{homePrice}} Home - 2026 Comparison | Plain Figures',
      description: 'Compare renting and buying for {{monthlyRent}} monthly rent versus a {{homePrice}} home using {{downPaymentPercent}} down, {{mortgageRate}} mortgage rates, {{propertyTaxRate}} property tax, {{homeAppreciation}} appreciation, and {{yearsLiving}} years.',
      h1: 'Rent {{monthlyRent}}/mo vs Buy {{homePrice}} Home',
    },
    formula: '\\Delta NW = NW_{buy} - NW_{rent}',
  },
  {
    id: 'life-insurance-needs',
    categorySlug: 'life-insurance',
    name: 'Life Insurance Needs Calculator - Term vs Whole Life 2026',
    params: [
      { key: 'annualIncome', label: 'Annual income', prefix: '$', step: 25000, values: [30000, 50000, 75000, 100000, 150000, 200000] },
      { key: 'dependents', label: 'Dependents', step: 1, values: numberRange(0, 6, 1) },
      { key: 'mortgageBalance', label: 'Mortgage balance', prefix: '$', step: 100000, values: [0, 100000, 200000, 300000, 400000, 500000] },
      { key: 'otherDebts', label: 'Other debts', prefix: '$', step: 25000, values: [0, 10000, 25000, 50000, 75000, 100000] },
      { key: 'funeralCosts', label: 'Funeral costs', prefix: '$', step: 5000, values: [5000, 10000, 15000, 20000] },
      { key: 'termYears', label: 'Term years', step: 10, values: [10, 20, 30] },
      { key: 'wholeLifePremiumFactor', label: 'Whole life premium factor', step: 0.5, values: [1.5, 2, 2.5, 3, 4] },
    ],
    maxVariants: 1500,
    seoTemplate: {
      title: 'How Much Life Insurance Do You Need? Term vs Whole 2026 | Plain Figures',
      description: 'Estimate life-insurance needs using {{annualIncome}} income, {{dependents}} dependents, {{mortgageBalance}} mortgage debt, {{otherDebts}} other debts, {{funeralCosts}} funeral costs, {{termYears}} term, and a {{wholeLifePremiumFactor}} whole-life premium factor.',
      h1: 'How Much Life Insurance Do You Need?',
    },
    formula: 'N = yI + M + D + F',
  },
  {
    id: 'home-equity-loan-vs-heloc',
    categorySlug: 'home-equity-compare',
    name: 'Home Equity Loan vs HELOC Comparison Calculator 2026',
    params: [
      { key: 'homeValue', label: 'Home value', prefix: '$', step: 100000, values: [250000, 350000, 500000, 650000, 800000, 1000000] },
      { key: 'equityPercent', label: 'Equity percent', prefix: '%', step: 10, values: [20, 30, 40, 50, 65, 80] },
      { key: 'amountNeeded', label: 'Amount needed', prefix: '$', step: 10000, values: [10000, 25000, 50000, 75000, 100000, 150000, 200000] },
      { key: 'fixedLoanRate', label: 'Fixed loan rate', prefix: '%', step: 1, values: [5, 5.5, 6, 6.5, 7.5, 9] },
      { key: 'helocVariableRate', label: 'HELOC variable rate', prefix: '%', step: 1, values: [6, 7, 8, 9, 10, 11] },
      { key: 'drawPeriodYears', label: 'Draw period years', step: 1, values: [5, 7, 10] },
      { key: 'repayPeriodYears', label: 'Repay period years', step: 5, values: [10, 15, 20] },
    ],
    maxVariants: 1600,
    seoTemplate: {
      title: 'Home Equity Loan vs HELOC: {{amountNeeded}} Borrowed - Costs 2026 | Plain Figures',
      description: 'Compare home-equity loan and HELOC costs for {{amountNeeded}} on a {{homeValue}} home with {{equityPercent}} equity, {{fixedLoanRate}} fixed rates, {{helocVariableRate}} HELOC rates, and {{repayPeriodYears}} repayment.',
      h1: 'Home Equity Loan vs HELOC: {{amountNeeded}} Borrowed',
    },
    formula: 'C = I + F',
    isValidVariant: (params) => Number(params.amountNeeded) <= Number(params.homeValue) * (Number(params.equityPercent) / 100),
  },
  {
    id: 'car-insurance-comparison',
    categorySlug: 'car-insurance',
    name: 'Car Insurance Comparison & Savings Calculator 2026',
    params: [
      { key: 'driverAge', label: 'Driver age', step: 10, values: [18, 25, 35, 45, 55, 70] },
      { key: 'vehicleValue', label: 'Vehicle value', prefix: '$', step: 10000, values: [10000, 18000, 25000, 35000, 45000, 60000] },
      { key: 'annualMiles', label: 'Annual miles', step: 5000, values: [5000, 8000, 12000, 16000, 20000] },
      { key: 'coverageLevel', label: 'Coverage level', values: ['Minimum', 'Full', 'Comprehensive'] },
      { key: 'claimsLast5Years', label: 'Claims last 5 years', step: 1, values: [0, 1, 2, 3] },
      { key: 'creditScoreImpact', label: 'Credit score impact', values: ['poor', 'fair', 'good', 'excellent'] },
      { key: 'locationRisk', label: 'Location risk', values: ['low', 'medium', 'high'] },
    ],
    maxVariants: 1400,
    seoTemplate: {
      title: 'Save on Car Insurance - Quote Comparison for {{driverAge}}-Year-Old Driver 2026 | Plain Figures',
      description: 'Compare car-insurance cost assumptions for a {{driverAge}}-year-old driver with {{vehicleValue}} vehicle value, {{annualMiles}} annual miles, {{coverageLevel}} cover, {{claimsLast5Years}} claims, {{creditScoreImpact}} credit, and {{locationRisk}} location risk.',
      h1: 'Save on Car Insurance - Quote Comparison',
    },
    formula: 'P = f(a,v,m,c,r)',
  },
  {
    id: 'rent-vs-buy-apartment',
    categorySlug: 'rent-buy-apartment',
    name: 'Rent vs Buy Apartment/Condo Calculator 2026',
    params: [
      { key: 'monthlyRent', label: 'Current Monthly Rent ($/£)', prefix: '$', step: 400, values: [800, 1200, 1600, 2200, 2800, 3400, 4000] },
      { key: 'purchasePrice', label: 'Apartment/Condo Purchase Price', prefix: '$', step: 50000, values: [150000, 220000, 300000, 400000, 500000, 600000] },
      { key: 'downPaymentPercent', label: 'Down Payment %', prefix: '%', step: 5, values: [5, 10, 15, 20, 25, 30] },
      { key: 'mortgageRate', label: 'Mortgage Rate %', prefix: '%', step: 1, values: [4, 4.5, 5, 5.5, 6.5, 8] },
      { key: 'hoaMonthly', label: 'Monthly HOA/Condo Fees', prefix: '$', step: 100, values: [0, 100, 200, 300, 450, 600] },
      { key: 'yearsStaying', label: 'Years You Plan to Stay', step: 2, values: [3, 5, 7, 10, 12, 15] },
      { key: 'appreciationRate', label: 'Annual Home Appreciation %', prefix: '%', step: 1, values: [1, 2, 3, 4, 5, 6] },
    ],
    maxVariants: 1800,
    seoTemplate: {
      title: 'Rent {{monthlyRent}}/mo vs Buy {{purchasePrice}} Apartment - 2026 Break-Even Analysis | Plain Figures',
      description: 'Compare renting and buying an apartment for {{monthlyRent}} monthly rent versus {{purchasePrice}} purchase price using {{downPaymentPercent}} down, {{mortgageRate}} mortgage rates, {{hoaMonthly}} HOA fees, {{yearsStaying}} years staying, and {{appreciationRate}} appreciation.',
      h1: 'Rent {{monthlyRent}}/mo vs Buy {{purchasePrice}} Apartment',
    },
    formula: '\\Delta C = C_{rent} - C_{buy}',
  },
  {
    id: 'term-vs-whole-life',
    categorySlug: 'term-whole-life-insurance',
    name: 'Term Life vs Whole Life Insurance Calculator 2026',
    params: [
      { key: 'age', label: 'Age', step: 10, values: [25, 35, 45, 55, 65] },
      { key: 'coverageAmount', label: 'Coverage amount', prefix: '$', step: 100000, values: [100000, 250000, 500000, 750000, 1000000] },
      { key: 'termYears', label: 'Term years', step: 5, values: [10, 15, 20, 30] },
      { key: 'healthRating', label: 'Health rating', values: ['Excellent', 'Good', 'Fair', 'Poor'] },
      { key: 'smoker', label: 'Smoker', values: ['yes', 'no'] },
      { key: 'wholeLifeCashValueGrowth', label: 'Whole life cash value growth', prefix: '%', step: 0.5, values: [3, 3.5, 4, 4.5, 5, 5.5, 6] },
    ],
    maxVariants: 1500,
    seoTemplate: {
      title: 'Term vs Whole Life Insurance: {{coverageAmount}} Coverage at Age {{age}} - 2026 | Plain Figures',
      description: 'Compare term and whole-life cost assumptions using age {{age}}, {{coverageAmount}} cover, {{termYears}} term, {{healthRating}} health, smoker {{smoker}}, and {{wholeLifeCashValueGrowth}} cash-value growth.',
      h1: 'Term vs Whole Life Insurance: {{coverageAmount}} Coverage at Age {{age}}',
    },
    formula: 'C_{whole} = P_t \\times f',
  },
  {
    id: 'auto-loan-refinance',
    categorySlug: 'auto-loan-refinance',
    name: 'Auto Loan Refinance Savings Calculator 2026',
    params: [
      { key: 'remainingBalance', label: 'Remaining balance', prefix: '$', step: 5000, values: [5000, 10000, 15000, 20000, 30000, 40000] },
      { key: 'currentRate', label: 'Current rate', prefix: '%', step: 1, values: [4, 5, 6, 7, 9, 12] },
      { key: 'remainingMonths', label: 'Remaining months', step: 12, values: [12, 24, 36, 48, 60, 72] },
      { key: 'newRate', label: 'New rate', prefix: '%', step: 1, values: [3, 4, 5, 6, 7, 8, 9] },
      { key: 'newTermMonths', label: 'New term months', step: 12, values: [36, 48, 60, 72, 84] },
      { key: 'refinanceFee', label: 'Refinance fee', prefix: '$', step: 200, values: [0, 100, 300, 500, 700, 1000] },
    ],
    maxVariants: 1600,
    seoTemplate: {
      title: 'Refinance {{remainingBalance}} Auto Loan - Monthly Savings at {{newRate}} 2026 | Plain Figures',
      description: 'Estimate auto-loan refinance savings using {{remainingBalance}} remaining balance, {{currentRate}} current rate, {{remainingMonths}} months left, {{newRate}} new rate, {{newTermMonths}} new term, and {{refinanceFee}} fees.',
      h1: 'Refinance {{remainingBalance}} Auto Loan',
    },
    formula: 'S = (M_c - M_n) - F',
    isValidVariant: (params) => Number(params.newRate) < Number(params.currentRate),
  },
  {
    id: 'home-warranty-vs-repair',
    categorySlug: 'home-warranty-insurance',
    name: 'Home Warranty vs Repair Cost Calculator 2026',
    params: [
      { key: 'homeAgeYears', label: 'Home age years', step: 5, values: [5, 10, 15, 20, 30, 40] },
      { key: 'annualWarrantyCost', label: 'Annual warranty cost', prefix: '$', step: 200, values: [400, 600, 800, 1000, 1200] },
      { key: 'expectedRepairsAnnual', label: 'Expected repairs annual', prefix: '$', step: 500, values: [500, 1000, 2000, 3000, 4000, 5000] },
      { key: 'coverageLevel', label: 'Coverage level', values: ['Basic', 'Mid', 'Premium'] },
      { key: 'repairInflation', label: 'Repair inflation', prefix: '%', step: 1, values: [3, 4, 5, 6, 7] },
      { key: 'years', label: 'Years', step: 1, values: [3, 5, 7, 10] },
    ],
    maxVariants: 1400,
    seoTemplate: {
      title: 'Home Warranty Worth It? {{annualWarrantyCost}}/yr vs Repairs - 2026 Estimate | Plain Figures',
      description: 'Compare home-warranty costs against self-funding repairs using {{homeAgeYears}}-year-old home assumptions, {{annualWarrantyCost}} annual warranty cost, {{expectedRepairsAnnual}} annual repairs, {{coverageLevel}} cover, {{repairInflation}} inflation, and {{years}} years.',
      h1: 'Home Warranty Worth It? {{annualWarrantyCost}}/yr vs Repairs',
    },
    formula: 'C = W - R',
  },
  {
    id: 'credit-card-rewards-comparison',
    categorySlug: 'credit-card-rewards',
    name: 'Credit Card Rewards vs Cash Back vs 0% APR Calculator 2026',
    params: [
      { key: 'annualSpend', label: 'Annual spend', prefix: '$', step: 10000, values: [10000, 20000, 30000, 40000, 60000, 80000] },
      { key: 'rewardsType', label: 'Rewards type', values: ['Cash Back %', 'Points/Miles Value', '0% APR Months'] },
      { key: 'rewardsRate', label: 'Rewards rate', prefix: '%', step: 1, values: [1, 1.5, 2, 3, 4, 5] },
      { key: 'annualFee', label: 'Annual fee', prefix: '$', step: 100, values: [0, 95, 150, 250, 395, 550] },
      { key: 'promoMonths', label: 'Promo months', step: 3, values: [0, 6, 9, 12, 15, 18, 21] },
      { key: 'categoryBonusSpend', label: 'Category bonus spend', prefix: '$', step: 5000, values: [0, 1000, 5000, 10000, 15000, 20000] },
    ],
    maxVariants: 1500,
    seoTemplate: {
      title: 'Best Card: Rewards vs Cash Back vs 0% APR on {{annualSpend}}/yr Spend 2026 | Plain Figures',
      description: 'Compare card-value models for {{annualSpend}} annual spend using {{rewardsType}}, {{rewardsRate}} rewards, {{annualFee}} annual fees, {{promoMonths}} promo months, and {{categoryBonusSpend}} bonus-category spend.',
      h1: 'Best Card: Rewards vs Cash Back vs 0% APR',
    },
    formula: 'V = R - F + A',
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
    maxVariants: 250,
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
  'uk-tax-take-home': ({ salary, taxYear, pensionPercent, studentLoanPlan, region, otherDeductions }) =>
    `uk-tax-take-home-${salary}-salary-${taxYear}-${pensionPercent}-pension-${normalizeSlugPart(studentLoanPlan)}-${normalizeSlugPart(region)}-${otherDeductions}-deductions`,
  'net-worth-growth': ({ currentNetWorth, monthlySavings, expectedReturnRate, inflationRate, timeHorizonYears }) =>
    `net-worth-growth-${currentNetWorth}-net-worth-${monthlySavings}-monthly-${expectedReturnRate}-return-${inflationRate}-inflation-${timeHorizonYears}-years`,
  'auto-loan': ({ carPrice, depositPercent, interestRate, termYears, balloonPercent, includePCP }) =>
    `auto-loan-${carPrice}-price-${depositPercent}-deposit-${interestRate}-apr-${termYears}-years-${balloonPercent}-balloon-${normalizeSlugPart(includePCP)}`,
  'investment-growth': ({ initialAmount, monthlyContribution, annualReturn, years, compoundingFrequency }) =>
    `investment-growth-${initialAmount}-initial-${monthlyContribution}-monthly-${annualReturn}-return-${years}-years-${normalizeSlugPart(compoundingFrequency)}`,
  'roth-vs-traditional': ({ account, currentAge, retirementAge, currentTaxBracket, expectedRetirementBracket, annualContribution, growthRate, yearsUntilRetirement }) =>
    `roth-vs-traditional-${normalizeSlugPart(account)}-${currentAge}-age-${retirementAge}-retire-${currentTaxBracket}-current-${expectedRetirementBracket}-retirement-${annualContribution}-contribution-${growthRate}-growth-${yearsUntilRetirement}-years`,
  'side-hustle-profit': ({ monthlyIncome, businessExpenses, country, deductions, taxBracket }) =>
    `side-hustle-profit-${monthlyIncome}-income-${businessExpenses}-expenses-${normalizeSlugPart(country)}-${normalizeSlugPart(deductions)}-${taxBracket}-tax`,
  'emergency-fund': ({ monthlyExpenses, monthsOfCoverage, currentSavings, monthlySaveAmount, interestRate }) =>
    `emergency-fund-${monthlyExpenses}-expenses-${monthsOfCoverage}-months-${currentSavings}-saved-${monthlySaveAmount}-monthly-${interestRate}-rate`,
  'crypto-allocation': ({ totalPortfolio, cryptoPercent, bitcoinPercentOfCrypto, expectedCryptoReturn, volatilityFactor, rebalanceFrequency }) =>
    `crypto-allocation-${totalPortfolio}-portfolio-${cryptoPercent}-crypto-${bitcoinPercentOfCrypto}-bitcoin-${expectedCryptoReturn}-return-${normalizeSlugPart(volatilityFactor)}-${normalizeSlugPart(rebalanceFrequency)}`,
  'divorce-finance': ({ combinedAssets, debtTotal, incomeRatio, children, alimonyMonths, pensionSplitPercent }) =>
    `divorce-finance-${combinedAssets}-assets-${debtTotal}-debt-${incomeRatio}-income-${children}-children-${alimonyMonths}-alimony-${pensionSplitPercent}-pension`,
  'cost-of-living': ({ currentCity, targetCity, salary, familySize, housingType }) =>
    `cost-of-living-${normalizeSlugPart(currentCity)}-to-${normalizeSlugPart(targetCity)}-${salary}-salary-${familySize}-family-${normalizeSlugPart(housingType)}`,
  'student-loan-refinance': ({ loanBalance, currentRate, annualIncome, forgivenessProgram, refiTermYears, country }) =>
    `student-loan-refinance-${loanBalance}-balance-${currentRate}-rate-${annualIncome}-income-${normalizeSlugPart(forgivenessProgram)}-${refiTermYears}-years-${normalizeSlugPart(country)}`,
  'home-renovation-roi': ({ currentHomeValue, renovationCost, valueIncreasePercent, holdingYears, financingRate }) =>
    `home-renovation-roi-${currentHomeValue}-home-${renovationCost}-cost-${valueIncreasePercent}-uplift-${holdingYears}-years-${financingRate}-finance`,
  'ev-vs-petrol-cost': ({ annualMiles, vehiclePrice, yearsOwned, electricityCostPerKwh, petrolPricePerLitre, maintenanceDiff }) =>
    `ev-vs-petrol-cost-${annualMiles}-miles-${vehiclePrice}-price-${yearsOwned}-years-${electricityCostPerKwh}-electric-${petrolPricePerLitre}-petrol-${maintenanceDiff}-maintenance`,
  'fire-number': ({ annualExpenses, safeWithdrawalRate, currentSavings, monthlyContributions, investmentReturn, inflationRate }) =>
    `fire-number-${annualExpenses}-expenses-${safeWithdrawalRate}-swr-${currentSavings}-saved-${monthlyContributions}-monthly-${investmentReturn}-return-${inflationRate}-inflation`,
  'inheritance-tax': ({ estateValue, beneficiaryRelationship, country, giftingInLast7Years, nilRateBandUsage }) =>
    `inheritance-tax-${estateValue}-estate-${normalizeSlugPart(beneficiaryRelationship)}-${normalizeSlugPart(country)}-${giftingInLast7Years}-gifts-${nilRateBandUsage}-nrb`,
  'solar-payback': ({ systemCost, annualProductionKwh, electricityRate, energyInflation, incentivePercent, location }) =>
    `solar-payback-${systemCost}-cost-${annualProductionKwh}-production-${electricityRate}-rate-${energyInflation}-inflation-${incentivePercent}-incentive-${normalizeSlugPart(location)}`,
  'wedding-budget': ({ totalBudget, guestCount, venuePercent, cateringPercent, weddingType, locationMultiplier }) =>
    `wedding-budget-${totalBudget}-budget-${guestCount}-guests-${venuePercent}-venue-${cateringPercent}-catering-${normalizeSlugPart(weddingType)}-${locationMultiplier}-location`,
  'credit-score-timeline': ({ currentScore, targetScore, monthlyOnTimePayments, payDownDebtPercent, newCreditInquiries, ageOfAccountsYears, location }) =>
    `credit-score-timeline-${currentScore}-to-${targetScore}-${normalizeSlugPart(monthlyOnTimePayments)}-${payDownDebtPercent}-paydown-${newCreditInquiries}-inquiries-${ageOfAccountsYears}-history-${normalizeSlugPart(location)}`,
  'freelance-quarterly-tax': ({ quarterlyIncome, expensesPercent, country, selfEmploymentTaxRate, deductions }) =>
    `freelance-quarterly-tax-${quarterlyIncome}-income-${expensesPercent}-expenses-${normalizeSlugPart(country)}-${selfEmploymentTaxRate}-se-tax-${normalizeSlugPart(deductions)}`,
  'wealth-transfer': ({ totalWealth, annualGifting, beneficiaries, taxJurisdiction, growthRate, yearsToTransfer }) =>
    `wealth-transfer-${totalWealth}-wealth-${annualGifting}-gifting-${beneficiaries}-beneficiaries-${normalizeSlugPart(taxJurisdiction)}-${growthRate}-growth-${yearsToTransfer}-years`,
  'heloc-drawdown': ({ homeValue, equityPercent, drawAmount, interestRate, repayYears, drawStrategy }) =>
    `heloc-drawdown-${homeValue}-home-${equityPercent}-equity-${drawAmount}-draw-${interestRate}-rate-${repayYears}-years-${normalizeSlugPart(drawStrategy)}`,
  'pet-insurance-vs-vet': ({ petType, petAgeYears, annualVetCostEstimate, insurancePremiumMonthly, deductible, reimbursementPercent, years }) =>
    `pet-insurance-vs-vet-${normalizeSlugPart(petType)}-${petAgeYears}-age-${annualVetCostEstimate}-vet-${insurancePremiumMonthly}-premium-${deductible}-deductible-${reimbursementPercent}-reimbursement-${years}-years`,
  'travel-rewards-optimizer': ({ pointsBalance, annualSpend, cardBonusPoints, redemptionType, airlineOrHotelAlliance, centsPerPointValue }) =>
    `travel-rewards-optimizer-${pointsBalance}-points-${annualSpend}-spend-${cardBonusPoints}-bonus-${normalizeSlugPart(redemptionType)}-${normalizeSlugPart(airlineOrHotelAlliance)}-${centsPerPointValue}-cpp`,
  'ai-side-hustle-profit': ({ monthlyRevenuePotential, monthlyCosts, timeHoursPerWeek, aiToolCostMonthly, scalingMonths, taxRatePercent, sideHustleType }) =>
    `ai-side-hustle-profit-${monthlyRevenuePotential}-revenue-${monthlyCosts}-costs-${timeHoursPerWeek}-hours-${aiToolCostMonthly}-ai-tools-${scalingMonths}-months-${taxRatePercent}-tax-${normalizeSlugPart(sideHustleType)}`,
  'debt-payoff-strategy': ({ debtsCount, totalDebt, averageRate, extraPaymentMonthly, strategy }) =>
    `debt-payoff-strategy-${debtsCount}-debts-${totalDebt}-total-${averageRate}-rate-${extraPaymentMonthly}-extra-${normalizeSlugPart(strategy)}`,
  'subscription-savings': ({ monthlySubscriptionsCount, averageMonthlyCostPerSub, unusedPercent, cancelNow, annualReviewFrequency }) =>
    `subscription-savings-${monthlySubscriptionsCount}-subs-${averageMonthlyCostPerSub}-cost-${unusedPercent}-unused-${normalizeSlugPart(cancelNow)}-${annualReviewFrequency}-reviews`,
  'home-insurance-addons': ({ homeValue, locationRiskLevel, basePremiumAnnual, addonPercentIncrease, coverageAmount }) =>
    `home-insurance-addons-${homeValue}-home-${normalizeSlugPart(locationRiskLevel)}-${basePremiumAnnual}-premium-${addonPercentIncrease}-addon-${coverageAmount}-coverage`,
  'balance-transfer-savings': ({ currentBalance, currentAPR, transferFeePercent, promoAPR, promoMonths }) =>
    `balance-transfer-savings-${currentBalance}-balance-${currentAPR}-apr-${transferFeePercent}-fee-${promoAPR}-promo-${promoMonths}-months`,
  'ebike-vs-car-commute': ({ commuteDistanceMilesDaily, daysPerWeek, ebikeCost, carFuelCostPerMile, maintenanceDiffAnnual, years }) =>
    `ebike-vs-car-commute-${commuteDistanceMilesDaily}-miles-${daysPerWeek}-days-${ebikeCost}-ebike-${carFuelCostPerMile}-fuel-${maintenanceDiffAnnual}-maintenance-${years}-years`,
  'debt-consolidation-vs-transfer': ({ totalDebt, averageCurrentRate, consolidationLoanRate, loanTermYears, transferPromoMonths, transferFeePercent }) =>
    `debt-consolidation-vs-transfer-${totalDebt}-debt-${averageCurrentRate}-current-${consolidationLoanRate}-loan-${loanTermYears}-years-${transferPromoMonths}-promo-${transferFeePercent}-fee`,
  'rent-vs-buy-home': ({ monthlyRent, homePrice, downPaymentPercent, mortgageRate, propertyTaxRate, homeAppreciation, rentIncrease, yearsLiving }) =>
    `rent-vs-buy-home-${monthlyRent}-rent-${homePrice}-price-${downPaymentPercent}-down-${mortgageRate}-mortgage-${propertyTaxRate}-tax-${homeAppreciation}-appreciation-${rentIncrease}-rent-growth-${yearsLiving}-years`,
  'life-insurance-needs': ({ annualIncome, dependents, mortgageBalance, otherDebts, funeralCosts, termYears, wholeLifePremiumFactor }) =>
    `life-insurance-needs-${annualIncome}-income-${dependents}-dependents-${mortgageBalance}-mortgage-${otherDebts}-debts-${funeralCosts}-funeral-${termYears}-term-${wholeLifePremiumFactor}-whole`,
  'home-equity-loan-vs-heloc': ({ homeValue, equityPercent, amountNeeded, fixedLoanRate, helocVariableRate, drawPeriodYears, repayPeriodYears }) =>
    `home-equity-loan-vs-heloc-${homeValue}-home-${equityPercent}-equity-${amountNeeded}-amount-${fixedLoanRate}-fixed-${helocVariableRate}-heloc-${drawPeriodYears}-draw-${repayPeriodYears}-repay`,
  'car-insurance-comparison': ({ driverAge, vehicleValue, annualMiles, coverageLevel, claimsLast5Years, creditScoreImpact, locationRisk }) =>
    `car-insurance-comparison-${driverAge}-age-${vehicleValue}-value-${annualMiles}-miles-${normalizeSlugPart(coverageLevel)}-${claimsLast5Years}-claims-${normalizeSlugPart(creditScoreImpact)}-${normalizeSlugPart(locationRisk)}`,
  'rent-vs-buy-apartment': ({ monthlyRent, purchasePrice, downPaymentPercent, mortgageRate, hoaMonthly, yearsStaying, appreciationRate }) =>
    `rent-vs-buy-apartment-${monthlyRent}-rent-${purchasePrice}-price-${downPaymentPercent}-down-${mortgageRate}-mortgage-${hoaMonthly}-hoa-${yearsStaying}-years-${appreciationRate}-appreciation`,
  'term-vs-whole-life': ({ age, coverageAmount, termYears, healthRating, smoker, wholeLifeCashValueGrowth }) =>
    `term-vs-whole-life-${age}-age-${coverageAmount}-coverage-${termYears}-term-${normalizeSlugPart(healthRating)}-${normalizeSlugPart(smoker)}-${wholeLifeCashValueGrowth}-growth`,
  'auto-loan-refinance': ({ remainingBalance, currentRate, remainingMonths, newRate, newTermMonths, refinanceFee }) =>
    `auto-loan-refinance-${remainingBalance}-balance-${currentRate}-current-${remainingMonths}-remaining-${newRate}-new-${newTermMonths}-term-${refinanceFee}-fee`,
  'home-warranty-vs-repair': ({ homeAgeYears, annualWarrantyCost, expectedRepairsAnnual, coverageLevel, repairInflation, years }) =>
    `home-warranty-vs-repair-${homeAgeYears}-age-${annualWarrantyCost}-warranty-${expectedRepairsAnnual}-repairs-${normalizeSlugPart(coverageLevel)}-${repairInflation}-inflation-${years}-years`,
  'credit-card-rewards-comparison': ({ annualSpend, rewardsType, rewardsRate, annualFee, promoMonths, categoryBonusSpend }) =>
    `credit-card-rewards-comparison-${annualSpend}-spend-${normalizeSlugPart(rewardsType)}-${rewardsRate}-rate-${annualFee}-fee-${promoMonths}-promo-${categoryBonusSpend}-bonus`,
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
      if (!config.isValidVariant || config.isValidVariant(current)) {
        results.push({ params: current, score });
      }
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
