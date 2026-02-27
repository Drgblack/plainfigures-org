// ── Mortgage Affordability ────────────────────────────────────────────────────
export interface AffordabilityResult {
  maxLoan: number;
  maxPropertyPrice: number;
  monthlyPayment: number;
  stressTestPayment: number;
  loanToIncome: number;
}

export function calculateAffordability(
  annualIncome: number,
  monthlyCommitments: number,
  deposit: number,
  interestRate: number,
  termYears: number,
  incomeMultiple: number = 4.5
): AffordabilityResult {
  const maxByIncome = annualIncome * incomeMultiple;
  const monthlyIncome = annualIncome / 12;
  const maxAffordablePayment = (monthlyIncome - monthlyCommitments) * 0.4;
  const r = interestRate / 100 / 12;
  const n = termYears * 12;
  const maxByPayment = r > 0
    ? maxAffordablePayment * (Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n))
    : maxAffordablePayment * n;
  const maxLoan = Math.min(maxByIncome, maxByPayment);
  const monthlyPayment = r > 0
    ? maxLoan * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1)
    : maxLoan / n;
  const stressRate = (interestRate + 3) / 100 / 12;
  const stressPayment = stressRate > 0
    ? maxLoan * stressRate * Math.pow(1 + stressRate, n) / (Math.pow(1 + stressRate, n) - 1)
    : maxLoan / n;
  return {
    maxLoan, maxPropertyPrice: maxLoan + deposit,
    monthlyPayment, stressTestPayment: stressPayment,
    loanToIncome: maxLoan / annualIncome,
  };
}

// ── TDEE Calculator ───────────────────────────────────────────────────────────
export interface TDEEResult {
  bmr: number;
  tdee: number;
  weightLoss: number;
  weightGain: number;
  macros: { protein: number; carbs: number; fat: number };
  bmi: number;
  bmiCategory: string;
}

export function calculateTDEE(
  weightKg: number, heightCm: number, age: number,
  sex: 'male' | 'female', activityLevel: number
): TDEEResult {
  // Mifflin-St Jeor equation
  const bmr = sex === 'male'
    ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
    : 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  const tdee = bmr * activityLevel;
  const bmi = weightKg / Math.pow(heightCm / 100, 2);
  const bmiCategory = bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Healthy Weight' : bmi < 30 ? 'Overweight' : 'Obese';
  return {
    bmr: Math.round(bmr), tdee: Math.round(tdee),
    weightLoss: Math.round(tdee - 500), weightGain: Math.round(tdee + 300),
    macros: { protein: Math.round(weightKg * 2), carbs: Math.round((tdee * 0.45) / 4), fat: Math.round((tdee * 0.30) / 9) },
    bmi: Math.round(bmi * 10) / 10, bmiCategory,
  };
}

// ── Subscription Drain ────────────────────────────────────────────────────────
export interface Subscription { name: string; monthly: number; enabled: boolean }
export interface SubscriptionResult {
  totalMonthly: number;
  totalAnnual: number;
  total5Year: number;
  total10Year: number;
  withInvestment10Year: number;
  hourlyEquivalent: number;
}

export function calculateSubscriptionDrain(
  subscriptions: Subscription[],
  hourlyWage: number,
  investmentReturn: number
): SubscriptionResult {
  const totalMonthly = subscriptions.filter(s => s.enabled).reduce((sum, s) => sum + s.monthly, 0);
  const totalAnnual = totalMonthly * 12;
  const r = investmentReturn / 100 / 12;
  const n10 = 120;
  const withInvestment10Year = r > 0
    ? totalMonthly * (Math.pow(1 + r, n10) - 1) / r
    : totalMonthly * n10;
  return {
    totalMonthly, totalAnnual,
    total5Year: totalAnnual * 5, total10Year: totalAnnual * 10,
    withInvestment10Year,
    hourlyEquivalent: hourlyWage > 0 ? totalMonthly / hourlyWage : 0,
  };
}

// ── Freelance Rate Calculator ─────────────────────────────────────────────────
export interface FreelanceResult {
  hourlyRate: number;
  dayRate: number;
  monthlyRequired: number;
  effectiveDailyAfterTax: number;
  breakdownItems: { label: string; amount: number }[];
}

export function calculateFreelanceRate(
  desiredAnnualSalary: number,
  annualExpenses: number,
  taxRate: number,
  billableWeeksPerYear: number,
  hoursPerWeek: number,
  unpaidHoursPerWeek: number
): FreelanceResult {
  const totalRequired = desiredAnnualSalary + annualExpenses;
  const grossRequired = totalRequired / (1 - taxRate / 100);
  const billableHours = billableWeeksPerYear * hoursPerWeek;
  const hourlyRate = grossRequired / billableHours;
  const dayRate = hourlyRate * (hoursPerWeek <= 8 ? hoursPerWeek : 8);
  const totalHoursWorked = billableWeeksPerYear * (hoursPerWeek + unpaidHoursPerWeek) + (52 - billableWeeksPerYear) * unpaidHoursPerWeek;
  const effectiveHourly = desiredAnnualSalary / totalHoursWorked;
  return {
    hourlyRate, dayRate,
    monthlyRequired: grossRequired / 12,
    effectiveDailyAfterTax: effectiveHourly * 8,
    breakdownItems: [
      { label: 'Desired take-home salary', amount: desiredAnnualSalary },
      { label: 'Annual business expenses', amount: annualExpenses },
      { label: 'Tax provision', amount: grossRequired - totalRequired },
      { label: 'Total gross required', amount: grossRequired },
    ],
  };
}

// ── Lifestyle Inflation Tracker ───────────────────────────────────────────────
export interface LifestyleResult {
  currentMonthlySpend: number;
  entryLevelMonthlySpend: number;
  lifestyleInflation: number;
  lifestyleInflationPct: number;
  opportunityCost10Year: number;
  categories: { name: string; entry: number; current: number; diff: number }[];
}

export function calculateLifestyleInflation(
  categories: { name: string; entry: number; current: number }[],
  investmentReturn: number
): LifestyleResult {
  const currentMonthly = categories.reduce((s, c) => s + c.current, 0);
  const entryMonthly = categories.reduce((s, c) => s + c.entry, 0);
  const monthlyDiff = currentMonthly - entryMonthly;
  const r = investmentReturn / 100 / 12;
  const n = 120;
  const opportunityCost = r > 0
    ? monthlyDiff * (Math.pow(1 + r, n) - 1) / r
    : monthlyDiff * n;
  return {
    currentMonthlySpend: currentMonthly,
    entryLevelMonthlySpend: entryMonthly,
    lifestyleInflation: monthlyDiff,
    lifestyleInflationPct: entryMonthly > 0 ? (monthlyDiff / entryMonthly) * 100 : 0,
    opportunityCost10Year: opportunityCost,
    categories: categories.map(c => ({ ...c, diff: c.current - c.entry })),
  };
}

// ── Financial Crisis Simulator ────────────────────────────────────────────────
export interface CrisisResult {
  monthsSurvive: number;
  monthsSurviveWithCuts: number;
  runwayMonths: number;
  monthlyBurn: number;
  monthlyBurnCrisis: number;
  criticalDate: Date;
  yearlyBurndown: { month: number; balance: number; balanceCrisis: number }[];
  verdict: 'comfortable' | 'manageable' | 'tight' | 'critical';
}

export function calculateCrisisSurvival(
  liquidSavings: number,
  monthlyExpenses: number,
  monthlyIncome: number,
  emergencyIncomePct: number,
  inflationMultiplier: number,
  cutExpensesPct: number
): CrisisResult {
  const monthlyBurn = Math.max(0, monthlyExpenses * inflationMultiplier - monthlyIncome * (emergencyIncomePct / 100));
  const monthlyBurnCrisis = Math.max(0, monthlyExpenses * inflationMultiplier * (1 - cutExpensesPct / 100) - monthlyIncome * (emergencyIncomePct / 100));

  let balance = liquidSavings;
  let balanceCrisis = liquidSavings;
  let monthsSurvive = 0;
  let monthsSurviveWithCuts = 0;
  const yearlyBurndown = [];

  for (let m = 1; m <= 120; m++) {
    if (balance > 0) { balance -= monthlyBurn; monthsSurvive = m; }
    if (balanceCrisis > 0) { balanceCrisis -= monthlyBurnCrisis; monthsSurviveWithCuts = m; }
    if (m % 3 === 0 || m === 1) {
      yearlyBurndown.push({ month: m, balance: Math.max(0, balance), balanceCrisis: Math.max(0, balanceCrisis) });
    }
  }

  const criticalDate = new Date();
  criticalDate.setMonth(criticalDate.getMonth() + monthsSurvive);

  const verdict: CrisisResult['verdict'] =
    monthsSurvive >= 24 ? 'comfortable' :
    monthsSurvive >= 12 ? 'manageable' :
    monthsSurvive >= 6 ? 'tight' : 'critical';

  return {
    monthsSurvive: monthlyBurn <= 0 ? 999 : monthsSurvive,
    monthsSurviveWithCuts: monthlyBurnCrisis <= 0 ? 999 : monthsSurviveWithCuts,
    runwayMonths: monthsSurvive,
    monthlyBurn, monthlyBurnCrisis, criticalDate,
    yearlyBurndown, verdict,
  };
}
