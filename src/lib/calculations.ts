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
