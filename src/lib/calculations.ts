// ── Mortgage ──────────────────────────────────────────────────────────────────

export interface MortgageResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  schedule: { month: number; principal: number; interest: number; balance: number }[];
}

export function calculateMortgage(
  principal: number,
  annualRate: number,
  termYears: number
): MortgageResult {
  const r = annualRate / 100 / 12;
  const n = termYears * 12;

  if (r === 0) {
    const monthly = principal / n;
    return {
      monthlyPayment: monthly,
      totalPayment: monthly * n,
      totalInterest: 0,
      schedule: [],
    };
  }

  const monthlyPayment = (principal * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
  const totalPayment = monthlyPayment * n;
  const totalInterest = totalPayment - principal;

  let balance = principal;
  const schedule = [];
  for (let month = 1; month <= Math.min(n, 360); month++) {
    const interest = balance * r;
    const principalPaid = monthlyPayment - interest;
    balance = Math.max(0, balance - principalPaid);
    schedule.push({ month, principal: principalPaid, interest, balance });
  }

  return { monthlyPayment, totalPayment, totalInterest, schedule };
}

// ── Savings ───────────────────────────────────────────────────────────────────

export interface SavingsResult {
  finalBalance: number;
  totalContributions: number;
  totalInterest: number;
  yearlyBreakdown: { year: number; balance: number; contributions: number; interest: number }[];
}

export function calculateSavings(
  initialDeposit: number,
  monthlyContribution: number,
  annualRate: number,
  termYears: number,
  compoundingFrequency: number = 12
): SavingsResult {
  const r = annualRate / 100 / compoundingFrequency;
  const n = compoundingFrequency * termYears;
  const periodsPerYear = compoundingFrequency;

  let balance = initialDeposit;
  const yearlyBreakdown = [];
  let totalContributions = initialDeposit;
  const monthlyToperiod = monthlyContribution * (12 / compoundingFrequency);

  for (let period = 1; period <= n; period++) {
    balance = balance * (1 + r) + monthlyToperiod;
    totalContributions += monthlyToperiod;

    if (period % periodsPerYear === 0) {
      const year = period / periodsPerYear;
      const contributions = initialDeposit + monthlyContribution * 12 * year;
      yearlyBreakdown.push({
        year,
        balance,
        contributions,
        interest: balance - contributions,
      });
    }
  }

  return {
    finalBalance: balance,
    totalContributions,
    totalInterest: balance - totalContributions,
  yearlyBreakdown,
  };
}

// ── Compound Interest ─────────────────────────────────────────────────────────

export interface CompoundResult {
  finalAmount: number;
  totalInterest: number;
  effectiveRate: number;
  yearlyBreakdown: { year: number; balance: number; interest: number }[];
}

export function calculateCompound(
  principal: number,
  annualRate: number,
  years: number,
  compoundingFrequency: number // 1=annual, 4=quarterly, 12=monthly, 365=daily
): CompoundResult {
  const r = annualRate / 100 / compoundingFrequency;
  const yearlyBreakdown = [];
  let balance = principal;

  for (let year = 1; year <= years; year++) {
    const startBalance = balance;
    for (let p = 0; p < compoundingFrequency; p++) {
      balance = balance * (1 + r);
    }
    yearlyBreakdown.push({ year, balance, interest: balance - startBalance });
  }

  const effectiveRate = (Math.pow(1 + annualRate / 100 / compoundingFrequency, compoundingFrequency) - 1) * 100;

  return {
    finalAmount: balance,
    totalInterest: balance - principal,
    effectiveRate,
    yearlyBreakdown,
  };
}

// ── Loan Repayment ────────────────────────────────────────────────────────────

export interface LoanResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  apr: number;
  schedule: { month: number; principal: number; interest: number; balance: number }[];
}

export function calculateLoan(
  amount: number,
  annualRate: number,
  termMonths: number
): LoanResult {
  const r = annualRate / 100 / 12;
  const n = termMonths;

  if (r === 0) {
    const monthly = amount / n;
    return { monthlyPayment: monthly, totalPayment: monthly * n, totalInterest: 0, apr: 0, schedule: [] };
  }

  const monthlyPayment = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalPayment = monthlyPayment * n;
  const totalInterest = totalPayment - amount;
  const apr = (Math.pow(1 + r, 12) - 1) * 100;

  let balance = amount;
  const schedule = [];
  for (let month = 1; month <= n; month++) {
    const interest = balance * r;
    const principalPaid = monthlyPayment - interest;
    balance = Math.max(0, balance - principalPaid);
    schedule.push({ month, principal: principalPaid, interest, balance });
  }

  return { monthlyPayment, totalPayment, totalInterest, apr, schedule };
}

// ── Retirement / Pension ──────────────────────────────────────────────────────

export interface RetirementResult {
  projectedPot: number;
  totalContributions: number;
  totalGrowth: number;
  monthlyIncomeFrom: number; // using 4% safe withdrawal
  yearlyBreakdown: { year: number; age: number; balance: number; contributions: number }[];
}

export function calculateRetirement(
  currentAge: number,
  retirementAge: number,
  currentSavings: number,
  monthlyContribution: number,
  employerContribution: number, // monthly
  annualGrowthRate: number,
  annualInflation: number
): RetirementResult {
  const years = retirementAge - currentAge;
  const monthlyTotal = monthlyContribution + employerContribution;
  const realRate = ((1 + annualGrowthRate / 100) / (1 + annualInflation / 100) - 1) * 100;
  const r = realRate / 100 / 12;
  const yearlyBreakdown = [];

  let balance = currentSavings;
  let totalContributions = currentSavings;

  for (let year = 1; year <= years; year++) {
    for (let m = 0; m < 12; m++) {
      balance = balance * (1 + r) + monthlyTotal;
    }
    totalContributions += monthlyTotal * 12;
    yearlyBreakdown.push({
      year,
      age: currentAge + year,
      balance,
      contributions: totalContributions,
    });
  }

  return {
    projectedPot: balance,
    totalContributions,
    totalGrowth: balance - totalContributions,
    monthlyIncomeFrom: (balance * 0.04) / 12,
    yearlyBreakdown,
  };
}

// ── Offset Mortgage ───────────────────────────────────────────────────────────

export interface OffsetResult {
  standardMonthlyPayment: number;
  effectiveBalance: number;
  interestSavedTotal: number;
  termReductionMonths: number;
  yearlyComparison: { year: number; standardInterest: number; offsetInterest: number; saving: number }[];
}

export function calculateOffset(
  mortgageBalance: number,
  offsetSavings: number,
  annualRate: number,
  termYears: number
): OffsetResult {
  const r = annualRate / 100 / 12;
  const n = termYears * 12;
  const effectiveBalance = Math.max(0, mortgageBalance - offsetSavings);

  // Standard mortgage payment on full balance
  const standardPayment = r === 0 ? mortgageBalance / n
    : (mortgageBalance * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

  // Total interest standard
  const standardTotalInterest = standardPayment * n - mortgageBalance;

  // Offset: same payment but on reduced effective balance
  // Calculate how many months to pay off with offset savings reducing balance
  let balance = mortgageBalance;
  let offsetMonths = 0;
  let offsetTotalInterest = 0;

  for (let m = 0; m < n; m++) {
    const effectiveBal = Math.max(0, balance - offsetSavings);
    const interest = effectiveBal * r;
    const principal = standardPayment - interest;
    offsetTotalInterest += interest;
    balance -= principal;
    if (balance <= 0) { offsetMonths = m + 1; break; }
    if (m === n - 1) offsetMonths = n;
  }

  const interestSaved = standardTotalInterest - offsetTotalInterest;
  const termReduction = n - offsetMonths;

  // Yearly comparison
  const yearlyComparison = [];
  let stdBal = mortgageBalance;
  let offBal = mortgageBalance;
  let cumStdInt = 0;
  let cumOffInt = 0;

  for (let year = 1; year <= termYears; year++) {
    let yearStdInt = 0;
    let yearOffInt = 0;
    for (let m = 0; m < 12; m++) {
      const stdInterest = stdBal * r;
      yearStdInt += stdInterest;
      cumStdInt += stdInterest;
      stdBal = Math.max(0, stdBal - (standardPayment - stdInterest));

      const effBal = Math.max(0, offBal - offsetSavings);
      const offInterest = effBal * r;
      yearOffInt += offInterest;
      cumOffInt += offInterest;
      offBal = Math.max(0, offBal - (standardPayment - offInterest));
    }
    yearlyComparison.push({ year, standardInterest: cumStdInt, offsetInterest: cumOffInt, saving: cumStdInt - cumOffInt });
  }

  return {
    standardMonthlyPayment: standardPayment,
    effectiveBalance,
    interestSavedTotal: interestSaved,
    termReductionMonths: termReduction,
    yearlyComparison,
  };
}

// ── Overpayment Impact ────────────────────────────────────────────────────────

export interface OverpaymentResult {
  standardTotalInterest: number;
  overpaymentTotalInterest: number;
  interestSaved: number;
  monthsSaved: number;
  newTermMonths: number;
  yearlyComparison: { year: number; stdBalance: number; ovBalance: number }[];
}

export function calculateOverpayment(
  mortgageBalance: number,
  annualRate: number,
  termYears: number,
  monthlyOverpayment: number
): OverpaymentResult {
  const r = annualRate / 100 / 12;
  const n = termYears * 12;

  const stdPayment = r === 0 ? mortgageBalance / n
    : (mortgageBalance * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

  const stdTotalInterest = stdPayment * n - mortgageBalance;

  // Overpayment schedule
  let balance = mortgageBalance;
  let ovMonths = 0;
  let ovTotalInterest = 0;
  const yearlyComparison = [];
  let stdBal = mortgageBalance;
  let ovBal = mortgageBalance;

  for (let m = 0; m < n; m++) {
    const interest = balance * r;
    ovTotalInterest += interest;
    balance = Math.max(0, balance - (stdPayment - interest + monthlyOverpayment));
    if (balance <= 0) { ovMonths = m + 1; break; }
    if (m === n - 1) ovMonths = n;

    // Track for yearly comparison
    if ((m + 1) % 12 === 0) {
      const year = (m + 1) / 12;
      // std balance
      for (let s = 0; s < 12; s++) {
        const si = stdBal * r;
        stdBal = Math.max(0, stdBal - (stdPayment - si));
      }
      yearlyComparison.push({ year, stdBalance: stdBal, ovBalance: balance });
    }
  }

  return {
    standardTotalInterest: stdTotalInterest,
    overpaymentTotalInterest: ovTotalInterest,
    interestSaved: stdTotalInterest - ovTotalInterest,
    monthsSaved: n - ovMonths,
    newTermMonths: ovMonths,
    yearlyComparison,
  };
}

// ── Save for Goal ─────────────────────────────────────────────────────────────

export interface SaveGoalResult {
  monthsNeeded: number;
  yearsNeeded: number;
  requiredMonthly: number; // to hit goal in given timeframe
  projectedBalance: number; // with current monthly over given months
  shortfall: number;
}

export function calculateSaveGoal(
  targetAmount: number,
  currentSavings: number,
  monthlyContribution: number,
  annualRate: number,
  targetMonths?: number
): SaveGoalResult {
  const r = annualRate / 100 / 12;

  // How long to reach target with current monthly?
  let balance = currentSavings;
  let months = 0;
  while (balance < targetAmount && months < 1200) {
    balance = balance * (1 + r) + monthlyContribution;
    months++;
  }

  // If target months given, what monthly is required?
  let requiredMonthly = 0;
  if (targetMonths) {
    const fv = targetAmount - currentSavings * Math.pow(1 + r, targetMonths);
    requiredMonthly = r === 0 ? fv / targetMonths
      : fv * r / (Math.pow(1 + r, targetMonths) - 1);
  }

  // Projected balance if targetMonths given
  let projected = currentSavings;
  if (targetMonths) {
    for (let m = 0; m < targetMonths; m++) {
      projected = projected * (1 + r) + monthlyContribution;
    }
  }

  return {
    monthsNeeded: months,
    yearsNeeded: months / 12,
    requiredMonthly: Math.max(0, requiredMonthly),
    projectedBalance: projected,
    shortfall: Math.max(0, targetAmount - projected),
  };
}

// ── Rent vs Buy ───────────────────────────────────────────────────────────────

export interface RentVsBuyResult {
  buyTotalCost: number;
  rentTotalCost: number;
  breakEvenYear: number | null;
  netWorthDifference: number; // positive = buying better
  buyEquity: number;
  yearlyComparison: {
    year: number;
    buyCumulativeCost: number;
    rentCumulativeCost: number;
    buyEquity: number;
    buyNetPosition: number;
    rentNetPosition: number;
  }[];
}

export function calculateRentVsBuy(
  homePrice: number,
  downPayment: number,
  mortgageRate: number,
  mortgageTerm: number,
  monthlyRent: number,
  annualRentIncrease: number,
  annualHomeAppreciation: number,
  annualInvestmentReturn: number,
  comparisonYears: number,
  annualPropertyTax: number,
  annualMaintenance: number,
  buyingCosts: number // % of home price
): RentVsBuyResult {
  const loanAmount = homePrice - downPayment;
  const mortgage = calculateMortgage(loanAmount, mortgageRate, mortgageTerm);
  const monthlyMortgage = mortgage.monthlyPayment;
  const monthlyPropertyTax = (homePrice * annualPropertyTax / 100) / 12;
  const monthlyMaintenance = (homePrice * annualMaintenance / 100) / 12;
  const upfrontBuyingCosts = homePrice * buyingCosts / 100;

  let buyCumulative = downPayment + upfrontBuyingCosts;
  let rentCumulative = 0;
  let currentRent = monthlyRent;
  let homeValue = homePrice;
  let loanBalance = loanAmount;
  // If renting, the down payment is invested instead
  let rentInvestmentBalance = downPayment + upfrontBuyingCosts;

  const yearlyComparison = [];
  let breakEvenYear: number | null = null;

  for (let year = 1; year <= comparisonYears; year++) {
    // Buying costs for the year
    const yearBuyCost = (monthlyMortgage + monthlyPropertyTax + monthlyMaintenance) * 12;
    buyCumulative += yearBuyCost;

    // Renting costs for the year
    const yearRentCost = currentRent * 12;
    rentCumulative += yearRentCost;
    currentRent *= (1 + annualRentIncrease / 100);

    // Home appreciation
    homeValue *= (1 + annualHomeAppreciation / 100);

    // Loan balance after year (approximate)
    const r = mortgageRate / 100 / 12;
    const n = mortgageTerm * 12;
    const monthsElapsed = year * 12;
    if (monthsElapsed <= n && r > 0) {
      loanBalance = loanAmount * (Math.pow(1 + r, n) - Math.pow(1 + r, monthsElapsed)) / (Math.pow(1 + r, n) - 1);
    } else {
      loanBalance = 0;
    }

    const buyEquity = homeValue - loanBalance;
    const buyNetPosition = buyEquity - buyCumulative;

    // Renter invests the difference
    const rentSavingThisYear = Math.max(0, yearBuyCost - yearRentCost);
    rentInvestmentBalance = rentInvestmentBalance * (1 + annualInvestmentReturn / 100) + rentSavingThisYear;
    const rentNetPosition = rentInvestmentBalance - rentCumulative;

    yearlyComparison.push({
      year,
      buyCumulativeCost: buyCumulative,
      rentCumulativeCost: rentCumulative,
      buyEquity,
      buyNetPosition,
      rentNetPosition,
    });

    if (breakEvenYear === null && buyNetPosition > rentNetPosition) {
      breakEvenYear = year;
    }
  }

  const finalYear = yearlyComparison[yearlyComparison.length - 1];

  return {
    buyTotalCost: buyCumulative,
    rentTotalCost: rentCumulative,
    breakEvenYear,
    netWorthDifference: finalYear.buyNetPosition - finalYear.rentNetPosition,
    buyEquity: finalYear.buyEquity,
    yearlyComparison,
  };
}
