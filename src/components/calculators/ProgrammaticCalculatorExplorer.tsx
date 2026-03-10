'use client';

import { useMemo, useState } from 'react';
import {
  calculateCompound,
  calculateLoan,
  calculateMortgage,
  calculateOffset,
  calculateOverpayment,
  calculateRentVsBuy,
  calculateRetirement,
  calculateSaveGoal,
  calculateSavings,
} from '@/lib/calculations';
import {
  calculateAffordability,
  calculateCrisisSurvival,
  calculateFreelanceRate,
  calculateSubscriptionDrain,
  calculateTDEE,
} from '@/lib/lifestyle-calculations';
import {
  calculateCyberLimit,
  calculateCyberRisk,
  calculateHLV,
  calculateLTVCAC,
  calculateTCOR,
} from '@/lib/insurance-calculations';
import { calculateTakeHome, CountryCode } from '@/lib/tax-calculations';
import { CalculatorConfig, ParamDefinition } from '@/lib/calculators/config';
import styles from './ProgrammaticCalculatorExplorer.module.css';

type ParamState = Record<string, number | string>;

type ResultMetric = {
  label: string;
  value: string;
  numeric: number;
  sub?: string;
  tone?: 'positive' | 'warning' | 'negative';
};

type CalculatorResult = {
  summary: string;
  metrics: ResultMetric[];
};

const COMPOUND_FREQUENCY_MAP: Record<string, number> = {
  annual: 1,
  quarterly: 4,
  monthly: 12,
  daily: 365,
};

const TDEE_ACTIVITY_MAP: Record<string, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  'very-active': 1.9,
};

const CYBER_RISK_MAP: Record<string, number> = {
  low: 1,
  medium: 2,
  elevated: 3,
  high: 4,
  critical: 5,
};

const COUNTRY_CODE_MAP: Record<string, CountryCode> = {
  uk: 'UK',
  de: 'DE',
  us: 'US',
  fr: 'FR',
  nl: 'NL',
  au: 'AU',
  ca: 'CA',
  ie: 'IE',
};

const SECTOR_RISK_MAP: Record<string, number> = {
  saas: 1.1,
  healthcare: 1.8,
  retail: 1.35,
  'professional-services': 1.2,
};

function toNumber(value: number | string): number {
  return typeof value === 'number' ? value : Number(value);
}

function isNumberParam(param: ParamDefinition): boolean {
  return typeof param.values[0] === 'number';
}

function currencyCodeFromParams(config: CalculatorConfig, params: ParamState): string {
  if (config.id === 'salary-take-home') {
    return { uk: 'GBP', de: 'EUR', us: 'USD', fr: 'EUR', nl: 'EUR', au: 'AUD', ca: 'CAD', ie: 'EUR' }[String(params.country)] ?? 'GBP';
  }

  if (config.id === 'uk-tax-take-home' || config.id === 'pension-contribution-scenarios') {
    return 'GBP';
  }

  if (config.params.some((param) => param.prefix === '$')) {
    return 'USD';
  }

  if (config.params.some((param) => param.prefix === '£')) {
    return 'GBP';
  }

  return 'USD';
}

function formatNumber(value: number, decimals = 0): string {
  return new Intl.NumberFormat('en-GB', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

function formatMoney(value: number, currency: string): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency,
    maximumFractionDigits: Math.abs(value) >= 100 ? 0 : 2,
  }).format(value);
}

function formatPercent(value: number, decimals = 2): string {
  return `${formatNumber(value, decimals)}%`;
}

function formatParamValue(value: number | string, param: ParamDefinition): string {
  if (typeof value === 'number') {
    if (param.prefix === '%' || param.prefix === 'pct') {
      return formatPercent(value, Number.isInteger(value) ? 0 : 2);
    }

    if (param.prefix === '$' || param.prefix === '£') {
      return `${param.prefix}${formatNumber(value)}`;
    }

    return formatNumber(value, Number.isInteger(value) ? 0 : 2);
  }

  return String(value)
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function ukTakeHome(gross: number, pensionRate: number, studentLoanPlan: string, bonusMode: string) {
  const bonus = bonusMode === 'include-bonus' ? gross * 0.1 : 0;
  const grossWithBonus = gross + bonus;
  const pension = grossWithBonus * (pensionRate / 100);
  const taxableSalary = Math.max(0, grossWithBonus - pension);
  const baseline = calculateTakeHome(taxableSalary, 'UK');
  const loanThreshold = {
    none: Infinity,
    'plan-1': 26065,
    'plan-2': 28470,
    'plan-5': 25000,
  }[studentLoanPlan] ?? Infinity;
  const studentLoan = Number.isFinite(loanThreshold)
    ? Math.max(0, taxableSalary - loanThreshold) * 0.09
    : 0;
  const netAnnual = baseline.netAnnual - studentLoan;
  const totalDeductions = grossWithBonus - netAnnual;

  return {
    grossWithBonus,
    pension,
    studentLoan,
    netAnnual,
    netMonthly: netAnnual / 12,
    deductionRate: grossWithBonus > 0 ? (totalDeductions / grossWithBonus) * 100 : 0,
  };
}

function pensionProjection(salary: number, employeePct: number, employerPct: number, years: number) {
  const annualContribution = salary * ((employeePct + employerPct) / 100);
  let pot = 0;
  for (let year = 0; year < years; year += 1) {
    pot = pot * 1.05 + annualContribution;
  }

  return {
    annualContribution,
    totalContributions: annualContribution * years,
    projectedPot: pot,
    growth: pot - annualContribution * years,
  };
}

function calculateExplorerResult(config: CalculatorConfig, params: ParamState): CalculatorResult {
  const currency = currencyCodeFromParams(config, params);

  switch (config.id) {
    case 'mortgage-repayment': {
      const result = calculateMortgage(toNumber(params.principal), toNumber(params.rate), toNumber(params.termYears));
      return {
        summary: `At these assumptions the monthly payment is the practical anchor, while total interest shows how much of the term cost comes from time and rate rather than the original balance.`,
        metrics: [
          { label: 'Monthly payment', value: formatMoney(result.monthlyPayment, currency), numeric: result.monthlyPayment, tone: 'warning' },
          { label: 'Total interest', value: formatMoney(result.totalInterest, currency), numeric: result.totalInterest, tone: 'negative' },
          { label: 'Total repaid', value: formatMoney(result.totalPayment, currency), numeric: result.totalPayment },
        ],
      };
    }
    case 'savings-growth': {
      const result = calculateSavings(
        toNumber(params.initialDeposit),
        toNumber(params.monthlyContribution),
        toNumber(params.annualRate),
        toNumber(params.termYears)
      );
      return {
        summary: `The projected balance blends the capital you put in with the compounding you earn, so the split between contributions and interest is usually the cleanest reality check.`,
        metrics: [
          { label: 'Projected balance', value: formatMoney(result.finalBalance, currency), numeric: result.finalBalance, tone: 'positive' },
          { label: 'Contributions', value: formatMoney(result.totalContributions, currency), numeric: result.totalContributions },
          { label: 'Interest earned', value: formatMoney(result.totalInterest, currency), numeric: result.totalInterest, tone: 'positive' },
        ],
      };
    }
    case 'rent-vs-buy': {
      const homePrice = toNumber(params.homePrice);
      const downPayment = homePrice * (toNumber(params.downPaymentPct) / 100);
      const result = calculateRentVsBuy(homePrice, downPayment, toNumber(params.mortgageRate), 30, toNumber(params.monthlyRent), 3, 3, 5, 10, 1.2, 1, 4);
      return {
        summary: `This comparison uses a fixed ten-year window. The useful signal is not just which side wins, but how much of the outcome comes from equity build versus cumulative housing cost.`,
        metrics: [
          { label: 'Net worth edge', value: formatMoney(result.netWorthDifference, currency), numeric: Math.abs(result.netWorthDifference), tone: result.netWorthDifference >= 0 ? 'positive' : 'negative', sub: result.netWorthDifference >= 0 ? 'Buying ahead' : 'Renting ahead' },
          { label: 'Buy equity', value: formatMoney(result.buyEquity, currency), numeric: result.buyEquity },
          { label: 'Break-even year', value: result.breakEvenYear ? String(result.breakEvenYear) : 'No cross-over', numeric: result.breakEvenYear ?? 0 },
        ],
      };
    }
    case 'compound-interest': {
      const result = calculateCompound(
        toNumber(params.principal),
        toNumber(params.rate),
        toNumber(params.years),
        COMPOUND_FREQUENCY_MAP[String(params.frequency)] ?? 12
      );
      return {
        summary: `Compounding does most of its visible work later in the timeline, which is why the gap between principal and final amount usually matters more than the year-one gain.`,
        metrics: [
          { label: 'Final amount', value: formatMoney(result.finalAmount, currency), numeric: result.finalAmount, tone: 'positive' },
          { label: 'Interest earned', value: formatMoney(result.totalInterest, currency), numeric: result.totalInterest, tone: 'positive' },
          { label: 'Effective rate', value: formatPercent(result.effectiveRate), numeric: result.effectiveRate },
        ],
      };
    }
    case 'loan-repayment': {
      const result = calculateLoan(toNumber(params.amount), toNumber(params.rate), toNumber(params.termMonths));
      return {
        summary: `The monthly payment tells you affordability in cash-flow terms, but the full loan cost only becomes clear once total interest is set beside the borrowed amount.`,
        metrics: [
          { label: 'Monthly payment', value: formatMoney(result.monthlyPayment, currency), numeric: result.monthlyPayment, tone: 'warning' },
          { label: 'Total interest', value: formatMoney(result.totalInterest, currency), numeric: result.totalInterest, tone: 'negative' },
          { label: 'Effective APR', value: formatPercent(result.apr), numeric: result.apr },
        ],
      };
    }
    case 'retirement-savings': {
      const years = toNumber(params.years);
      const result = calculateRetirement(35, 35 + years, 0, toNumber(params.monthlyContribution), 0, toNumber(params.growthRate), 2);
      return {
        summary: `This scenario assumes constant monthly saving and a constant nominal growth rate, so the projected pot is best read as a benchmark rather than a forecast.`,
        metrics: [
          { label: 'Projected pot', value: formatMoney(result.projectedPot, currency), numeric: result.projectedPot, tone: 'positive' },
          { label: 'Total contributions', value: formatMoney(result.totalContributions, currency), numeric: result.totalContributions },
          { label: 'Growth', value: formatMoney(result.totalGrowth, currency), numeric: result.totalGrowth, tone: 'positive' },
        ],
      };
    }
    case 'offset-mortgage': {
      const result = calculateOffset(
        toNumber(params.balance),
        toNumber(params.savings),
        toNumber(params.rate),
        toNumber(params.termYears)
      );
      return {
        summary: `Offset savings reduce the balance charged interest, so the useful comparison is between the effective balance and the total interest avoided across the term.`,
        metrics: [
          { label: 'Effective balance', value: formatMoney(result.effectiveBalance, currency), numeric: result.effectiveBalance },
          { label: 'Interest saved', value: formatMoney(result.interestSavedTotal, currency), numeric: result.interestSavedTotal, tone: 'positive' },
          { label: 'Term reduction', value: `${formatNumber(result.termReductionMonths / 12, 1)} years`, numeric: result.termReductionMonths / 12, tone: 'positive' },
        ],
      };
    }
    case 'mortgage-overpayment': {
      const result = calculateOverpayment(
        toNumber(params.balance),
        toNumber(params.rate),
        toNumber(params.termYears),
        toNumber(params.monthlyOverpayment)
      );
      return {
        summary: `Overpayments usually do two jobs at once: they cut interest and they compress the term. Looking at both is important because some scenarios save surprisingly little time even when the extra monthly payment feels meaningful.`,
        metrics: [
          { label: 'Interest saved', value: formatMoney(result.interestSaved, currency), numeric: result.interestSaved, tone: 'positive' },
          { label: 'Months saved', value: formatNumber(result.monthsSaved), numeric: result.monthsSaved, tone: 'positive' },
          { label: 'New term', value: `${formatNumber(result.newTermMonths / 12, 1)} years`, numeric: result.newTermMonths / 12 },
        ],
      };
    }
    case 'save-for-goal': {
      const result = calculateSaveGoal(
        toNumber(params.targetAmount),
        0,
        toNumber(params.monthlyContribution),
        toNumber(params.annualRate),
        toNumber(params.years) * 12
      );
      return {
        summary: `This is a target-versus-pace calculation. The most useful comparison is between the projected balance on the current contribution and the monthly amount that would actually close the gap on schedule.`,
        metrics: [
          { label: 'Projected balance', value: formatMoney(result.projectedBalance, currency), numeric: result.projectedBalance, tone: result.shortfall > 0 ? 'warning' : 'positive' },
          { label: 'Required monthly', value: formatMoney(result.requiredMonthly, currency), numeric: result.requiredMonthly, tone: 'warning' },
          { label: 'Shortfall', value: formatMoney(result.shortfall, currency), numeric: result.shortfall, tone: result.shortfall > 0 ? 'negative' : 'positive' },
        ],
      };
    }
    case 'salary-take-home': {
      const result = calculateTakeHome(toNumber(params.gross), COUNTRY_CODE_MAP[String(params.country)] ?? 'UK');
      return {
        summary: `This is a broad gross-to-net estimate. It is useful for comparing regimes and pay periods, but it still abstracts from pension choices, benefits, state taxes, and local payroll detail.`,
        metrics: [
          { label: 'Net annual', value: formatMoney(result.netAnnual, result.currency), numeric: result.netAnnual, tone: 'positive' },
          { label: 'Net monthly', value: formatMoney(result.netMonthly, result.currency), numeric: result.netMonthly, tone: 'positive' },
          { label: 'Effective tax rate', value: formatPercent(result.effectiveTaxRate), numeric: result.effectiveTaxRate, tone: 'warning' },
        ],
      };
    }
    case 'mortgage-affordability': {
      const income = toNumber(params.income);
      const depositPct = toNumber(params.depositPct);
      const incomeMultiple = toNumber(params.incomeMultiple);
      const maxLoan = income * incomeMultiple;
      const maxPropertyPrice = maxLoan / (1 - depositPct / 100);
      const depositAmount = maxPropertyPrice - maxLoan;
      const affordability = calculateAffordability(income, 0, depositAmount, toNumber(params.rate), 30, incomeMultiple);
      return {
        summary: `Affordability here is anchored to a lending multiple, then translated into a property value using the chosen deposit share. That keeps the result transparent instead of hiding the underwriting assumption.`,
        metrics: [
          { label: 'Indicative loan', value: formatMoney(maxLoan, currency), numeric: maxLoan },
          { label: 'Indicative property', value: formatMoney(maxPropertyPrice, currency), numeric: maxPropertyPrice, tone: 'positive' },
          { label: 'Stress payment', value: formatMoney(affordability.stressTestPayment, currency), numeric: affordability.stressTestPayment, tone: 'warning' },
        ],
      };
    }
    case 'tdee-calorie': {
      const result = calculateTDEE(
        toNumber(params.weightKg),
        toNumber(params.heightCm),
        toNumber(params.age),
        String(params.sex) === 'female' ? 'female' : 'male',
        TDEE_ACTIVITY_MAP[String(params.activity)] ?? 1.55
      );
      return {
        summary: `The calorie outputs are benchmarks, not prescriptions. The useful comparison is between maintenance, a modest deficit, and the body-weight context shown by BMI and macro allocation.`,
        metrics: [
          { label: 'TDEE', value: `${formatNumber(result.tdee)} kcal`, numeric: result.tdee },
          { label: 'Weight-loss target', value: `${formatNumber(result.weightLoss)} kcal`, numeric: result.weightLoss, tone: 'warning' },
          { label: 'BMI', value: formatNumber(result.bmi, 1), numeric: result.bmi, sub: result.bmiCategory },
        ],
      };
    }
    case 'subscription-drain': {
      const monthlySpend = toNumber(params.monthlySpend);
      const annualIncrease = toNumber(params.annualIncrease) / 100;
      const investmentReturn = toNumber(params.investmentReturn);
      const baseline = calculateSubscriptionDrain([{ name: 'Subscriptions', monthly: monthlySpend, enabled: true }], 30, investmentReturn);
      let tenYearCost = 0;
      for (let year = 1; year <= 10; year += 1) {
        tenYearCost += monthlySpend * 12 * Math.pow(1 + annualIncrease, year - 1);
      }
      return {
        summary: `The raw subscription bill is only half the story. Price increases change the cash cost over time, while the foregone return shows what those same outflows might have become elsewhere.`,
        metrics: [
          { label: 'Annual cost', value: formatMoney(monthlySpend * 12, currency), numeric: monthlySpend * 12, tone: 'negative' },
          { label: '10-year cash cost', value: formatMoney(tenYearCost, currency), numeric: tenYearCost, tone: 'negative' },
          { label: 'Invest-instead value', value: formatMoney(baseline.withInvestment10Year, currency), numeric: baseline.withInvestment10Year, tone: 'warning' },
        ],
      };
    }
    case 'freelance-rate': {
      const result = calculateFreelanceRate(
        toNumber(params.desiredTakeHome),
        toNumber(params.annualExpenses),
        toNumber(params.taxRate),
        toNumber(params.billableWeeks),
        40,
        10
      );
      return {
        summary: `Freelance pricing gets clearer when the target is decomposed into take-home, overhead, tax provision, and the number of weeks that are actually sellable.`,
        metrics: [
          { label: 'Day rate', value: formatMoney(result.dayRate, currency), numeric: result.dayRate, tone: 'warning' },
          { label: 'Hourly rate', value: formatMoney(result.hourlyRate, currency), numeric: result.hourlyRate, tone: 'warning' },
          { label: 'Monthly gross', value: formatMoney(result.monthlyRequired, currency), numeric: result.monthlyRequired },
        ],
      };
    }
    case 'lifestyle-inflation': {
      const startingSpend = toNumber(params.startingSpend);
      const spendGrowth = toNumber(params.spendGrowth) / 100;
      const incomeGrowth = toNumber(params.annualIncomeGrowth) / 100;
      const years = toNumber(params.years);
      const endingSpend = startingSpend * Math.pow(1 + spendGrowth, years);
      const disciplinedSpend = startingSpend * Math.pow(1 + Math.max(0, incomeGrowth - 0.02), years);
      const annualLeakage = Math.max(0, endingSpend - disciplinedSpend) * 12;
      return {
        summary: `Lifestyle inflation is usually a rate-of-change problem rather than a one-off spending problem. The gap between current and disciplined spend is where the long-run drag appears.`,
        metrics: [
          { label: 'Future monthly spend', value: formatMoney(endingSpend, currency), numeric: endingSpend, tone: 'warning' },
          { label: 'Disciplined path', value: formatMoney(disciplinedSpend, currency), numeric: disciplinedSpend },
          { label: 'Annual leakage', value: formatMoney(annualLeakage, currency), numeric: annualLeakage, tone: 'negative' },
        ],
      };
    }
    case 'financial-crisis': {
      const monthlyBurn = toNumber(params.monthlyBurn);
      const incomeDropPct = toNumber(params.incomeDropPct);
      const baselineIncome = monthlyBurn;
      const crisisIncome = baselineIncome * (1 - incomeDropPct / 100);
      const result = calculateCrisisSurvival(toNumber(params.savings), monthlyBurn, crisisIncome, 100, 1, toNumber(params.spendingCutPct));
      return {
        summary: `Runway is a burn-rate calculation first and an emotions calculation second. What matters most is how many months the cash buffer buys before and after emergency cuts.`,
        metrics: [
          { label: 'Runway', value: `${formatNumber(result.runwayMonths)} months`, numeric: result.runwayMonths, tone: result.runwayMonths >= 12 ? 'positive' : 'warning' },
          { label: 'Runway with cuts', value: `${formatNumber(result.monthsSurviveWithCuts)} months`, numeric: result.monthsSurviveWithCuts, tone: 'positive' },
          { label: 'Monthly burn', value: formatMoney(result.monthlyBurn, currency), numeric: result.monthlyBurn, tone: 'negative' },
        ],
      };
    }
    case 'business-interruption': {
      const adjustedGrossProfit = toNumber(params.grossProfit) * (1 + toNumber(params.growthUpliftPct) / 100);
      const indemnityValue = adjustedGrossProfit * (toNumber(params.indemnityMonths) / 12);
      const icowValue = adjustedGrossProfit * (toNumber(params.icowMonths) / 12);
      return {
        summary: `Business interruption cover is usually under-read as a single number. Separating adjusted gross profit, the indemnity window, and additional cost of working keeps the build-up visible.`,
        metrics: [
          { label: 'Adjusted gross profit', value: formatMoney(adjustedGrossProfit, currency), numeric: adjustedGrossProfit },
          { label: 'Indemnity value', value: formatMoney(indemnityValue, currency), numeric: indemnityValue, tone: 'warning' },
          { label: 'Indicative total cover', value: formatMoney(indemnityValue + icowValue, currency), numeric: indemnityValue + icowValue, tone: 'positive' },
        ],
      };
    }
    case 'human-life-value': {
      const annualIncome = toNumber(params.annualIncome);
      const yearsProtected = toNumber(params.yearsProtected);
      const result = calculateHLV(35, 35 + yearsProtected, annualIncome, 70, 2.5, annualIncome, annualIncome * 0.25, toNumber(params.dependants) * 50000, 0, toNumber(params.discountRate));
      return {
        summary: `Life cover modelling becomes easier to audit when income replacement, debt clearance, and dependant funding are surfaced separately instead of being blended into one recommendation.`,
        metrics: [
          { label: 'Human life value', value: formatMoney(result.humanLifeValue, currency), numeric: result.humanLifeValue, tone: 'warning' },
          { label: 'Coverage gap', value: formatMoney(result.coverageGap, currency), numeric: result.coverageGap, tone: 'negative' },
          { label: 'Income replacement', value: formatMoney(result.incomeReplacement, currency), numeric: result.incomeReplacement },
        ],
      };
    }
    case 'cyber-risk-exposure': {
      const result = calculateCyberRisk(
        toNumber(params.annualRevenue),
        toNumber(params.employeeCount),
        toNumber(params.customerRecords),
        CYBER_RISK_MAP[String(params.industryRisk)] ?? 3,
        false,
        false,
        false,
        false,
        false
      );
      return {
        summary: `Cyber exposure combines data, interruption, regulation, and reputation. The recommended cover number is only useful when read against the underlying breach-cost estimate and risk score.`,
        metrics: [
          { label: 'Breach cost', value: formatMoney(result.estimatedBreachCost, currency), numeric: result.estimatedBreachCost, tone: 'negative' },
          { label: 'Risk score', value: `${formatNumber(result.riskScore)}/100`, numeric: result.riskScore, tone: 'warning' },
          { label: 'Suggested cover', value: formatMoney(result.recommendedCoverLimit, currency), numeric: result.recommendedCoverLimit, tone: 'positive' },
        ],
      };
    }
    case 'total-cost-risk': {
      const result = calculateTCOR({
        premiums: toNumber(params.premiums),
        retainedLosses: toNumber(params.retainedLosses),
        adminCosts: toNumber(params.adminCosts),
        riskControlCosts: toNumber(params.riskControlCosts),
        revenue: toNumber(params.revenue),
      });
      return {
        summary: `TCOR is most useful when the components stay visible. Premium spend can fall while retained losses rise, so the total only makes sense when the mix is broken out.`,
        metrics: [
          { label: 'Base TCOR', value: formatMoney(result.base.tcor, currency), numeric: result.base.tcor, tone: 'warning' },
          { label: 'TCOR rate', value: `${formatNumber(result.base.tcorRate, 2)} per 1k`, numeric: result.base.tcorRate },
          { label: 'Improved scenario', value: formatMoney(result.scenarios[2].tcor, currency), numeric: result.scenarios[2].tcor, tone: 'positive' },
        ],
      };
    }
    case 'risk-heatmap': {
      const likelihood = toNumber(params.likelihood);
      const impact = toNumber(params.impact);
      const riskScore = likelihood * impact;
      const portfolioScore = riskScore * toNumber(params.riskCount);
      const velocityFactor = { low: 0.8, medium: 1, high: 1.2, critical: 1.4 }[String(params.velocity)] ?? 1;
      return {
        summary: `A heat-map score is only a starting point. Velocity changes how quickly the organisation has to respond, which is why the same likelihood-impact product can create very different operating pressure.`,
        metrics: [
          { label: 'Risk score', value: formatNumber(riskScore), numeric: riskScore, tone: riskScore >= 15 ? 'negative' : riskScore >= 8 ? 'warning' : 'positive' },
          { label: 'Portfolio score', value: formatNumber(portfolioScore), numeric: portfolioScore },
          { label: 'Velocity-adjusted', value: formatNumber(riskScore * velocityFactor, 1), numeric: riskScore * velocityFactor, tone: 'warning' },
        ],
      };
    }
    case 'scr-estimator': {
      const premiumRisk = toNumber(params.premiumRisk);
      const reserveRisk = toNumber(params.reserveRisk);
      const marketShockValue = (premiumRisk + reserveRisk) * (toNumber(params.marketShockPct) / 100);
      const basicSCR = Math.sqrt(premiumRisk ** 2 + reserveRisk ** 2 + marketShockValue ** 2);
      const adjustedSCR = basicSCR * (1 - toNumber(params.diversificationCredit) / 100);
      const capitalBase = (premiumRisk + reserveRisk) * 1.8;
      const solvencyRatio = adjustedSCR > 0 ? (capitalBase / adjustedSCR) * 100 : 0;
      return {
        summary: `This is an indicative aggregation rather than a regulatory filing model. The comparison to watch is how diversification credit changes required capital after the premium, reserve, and market terms are combined.`,
        metrics: [
          { label: 'Basic SCR', value: formatMoney(basicSCR, currency), numeric: basicSCR, tone: 'warning' },
          { label: 'Adjusted SCR', value: formatMoney(adjustedSCR, currency), numeric: adjustedSCR, tone: 'positive' },
          { label: 'Solvency ratio', value: formatPercent(solvencyRatio), numeric: solvencyRatio, tone: solvencyRatio >= 130 ? 'positive' : 'negative' },
        ],
      };
    }
    case 'coverage-gap': {
      const multiplier = { current: 1, renewal: 1.05, stress: 1.25, growth: 1.15 }[String(params.horizon)] ?? 1;
      const modeledLoss = toNumber(params.assetValue) * (toNumber(params.lossPct) / 100) * multiplier;
      const gap = Math.max(0, modeledLoss - toNumber(params.insuredLimit));
      const coveragePct = modeledLoss > 0 ? (toNumber(params.insuredLimit) / modeledLoss) * 100 : 0;
      return {
        summary: `Coverage adequacy should be tested against a modeled loss, not just total asset value. Changing the horizon multiplier is a quick way to see how a renewal or stress case exposes the gap.`,
        metrics: [
          { label: 'Modeled loss', value: formatMoney(modeledLoss, currency), numeric: modeledLoss, tone: 'warning' },
          { label: 'Gap', value: formatMoney(gap, currency), numeric: gap, tone: gap > 0 ? 'negative' : 'positive' },
          { label: 'Coverage level', value: formatPercent(coveragePct), numeric: coveragePct, tone: coveragePct >= 100 ? 'positive' : 'warning' },
        ],
      };
    }
    case 'ltv-cac': {
      const result = calculateLTVCAC({
        arpu: toNumber(params.arpu),
        grossMarginPct: toNumber(params.grossMarginPct),
        churnRatePct: toNumber(params.churnRatePct),
        cacPerCustomer: toNumber(params.cacPerCustomer),
        salesCycleDays: 30,
        monthlyNewCustomers: 50,
        discountRatePct: 10,
      });
      return {
        summary: `The ratio matters, but payback and gross-profit quality matter too. A high LTV:CAC number with weak payback can still be fragile if the business has cash constraints.`,
        metrics: [
          { label: 'LTV:CAC', value: `${formatNumber(result.ltvcacRatio, 2)}x`, numeric: result.ltvcacRatio, tone: result.ltvcacRatio >= 3 ? 'positive' : result.ltvcacRatio >= 1.5 ? 'warning' : 'negative' },
          { label: 'Simple LTV', value: formatMoney(result.simpleLTV, currency), numeric: result.simpleLTV },
          { label: 'Payback', value: `${formatNumber(result.paybackMonths, 1)} months`, numeric: result.paybackMonths, tone: 'warning' },
        ],
      };
    }
    case 'loss-probability': {
      const expectedEvents = toNumber(params.exposureCount) * (toNumber(params.baseProbabilityPct) / 100);
      const severityFactor = { low: 1, medium: 2.25, high: 4.5, critical: 8 }[String(params.severity)] ?? 2.25;
      const controlFactor = { strong: 0.65, moderate: 0.8, weak: 1, minimal: 1.2 }[String(params.controlStrength)] ?? 1;
      const expectedLossIndex = expectedEvents * severityFactor * controlFactor;
      return {
        summary: `Probability models are most useful for ranking, not certainty. The exposure count sets the scale, while severity and control strength determine how expensive the same event frequency becomes.`,
        metrics: [
          { label: 'Expected events', value: formatNumber(expectedEvents, 1), numeric: expectedEvents },
          { label: 'Loss index', value: formatNumber(expectedLossIndex, 1), numeric: expectedLossIndex, tone: 'warning' },
          { label: 'Control-adjusted rate', value: formatPercent(toNumber(params.baseProbabilityPct) * controlFactor, 2), numeric: toNumber(params.baseProbabilityPct) * controlFactor, tone: 'negative' },
        ],
      };
    }
    case 'cyber-limit': {
      const result = calculateCyberLimit({
        annualRevenue: toNumber(params.revenue),
        recordCount: toNumber(params.records),
        industryRiskMultiplier: SECTOR_RISK_MAP[String(params.sector)] ?? 1.2,
        cloudDependency: 4,
        mfaAdoption: 3,
        patchingScore: 3,
        incidentResponsePlan: true,
        thirdPartyVendors: 15,
        priorBreaches: 0,
      });
      const netLimit = Math.max(0, result.recommendedLimit - toNumber(params.retention));
      return {
        summary: `Retention changes the risk the organisation keeps, but the limit discussion still starts with the modeled severity of a plausible event. Reading those together is what prevents false confidence from a single headline number.`,
        metrics: [
          { label: 'Recommended limit', value: formatMoney(result.recommendedLimit, currency), numeric: result.recommendedLimit, tone: 'warning' },
          { label: 'Net of retention', value: formatMoney(netLimit, currency), numeric: netLimit },
          { label: 'Risk score', value: `${formatNumber(result.riskScore)}/100`, numeric: result.riskScore, tone: 'negative' },
        ],
      };
    }
    case 'uk-tax-take-home': {
      const result = ukTakeHome(
        toNumber(params.gross),
        toNumber(params.pensionRate),
        String(params.studentLoanPlan),
        String(params.bonusMode)
      );
      return {
        summary: `This version adjusts the UK take-home estimate for employee pension deduction, student loan plan, and an optional bonus assumption. It is still illustrative, but it is closer to how salary packaging changes real cash pay.`,
        metrics: [
          { label: 'Net annual', value: formatMoney(result.netAnnual, 'GBP'), numeric: result.netAnnual, tone: 'positive' },
          { label: 'Net monthly', value: formatMoney(result.netMonthly, 'GBP'), numeric: result.netMonthly, tone: 'positive' },
          { label: 'Pension withheld', value: formatMoney(result.pension, 'GBP'), numeric: result.pension, tone: 'warning' },
        ],
      };
    }
    case 'pension-contribution-scenarios': {
      const result = pensionProjection(
        toNumber(params.salary),
        toNumber(params.employeePct),
        toNumber(params.employerPct),
        toNumber(params.years)
      );
      return {
        summary: `Pension scenarios are easiest to compare when employee and employer funding are kept separate and then rolled forward under one simple growth assumption.`,
        metrics: [
          { label: 'Annual contribution', value: formatMoney(result.annualContribution, 'GBP'), numeric: result.annualContribution },
          { label: 'Projected pot', value: formatMoney(result.projectedPot, 'GBP'), numeric: result.projectedPot, tone: 'positive' },
          { label: 'Investment growth', value: formatMoney(result.growth, 'GBP'), numeric: result.growth, tone: 'positive' },
        ],
      };
    }
    default: {
      const firstParam = config.params[0];
      const secondParam = config.params[1];
      return {
        summary: `This calculator exposes the current assumptions directly. Use the form to change one variable at a time and compare how the output headline shifts under the same formula structure.`,
        metrics: [
          { label: firstParam.label, value: formatParamValue(params[firstParam.key], firstParam), numeric: typeof params[firstParam.key] === 'number' ? Number(params[firstParam.key]) : 1 },
          { label: secondParam.label, value: formatParamValue(params[secondParam.key], secondParam), numeric: typeof params[secondParam.key] === 'number' ? Number(params[secondParam.key]) : 1 },
          { label: 'Inputs used', value: formatNumber(config.params.length), numeric: config.params.length },
        ],
      };
    }
  }
}

type ExplorerProps = {
  config: CalculatorConfig;
  initialParams: ParamState;
};

export default function ProgrammaticCalculatorExplorer({ config, initialParams }: ExplorerProps) {
  const [values, setValues] = useState<ParamState>(initialParams);

  const result = useMemo(() => calculateExplorerResult(config, values), [config, values]);
  const maxMetric = Math.max(...result.metrics.map((metric) => Math.abs(metric.numeric)), 1);

  return (
    <div className={styles.panel}>
      <div className={styles.stack}>
        <section className={styles.card}>
          <h2 className={styles.title}>Try Different Values</h2>
          <form className={styles.form}>
            {config.params.map((param) => (
              <label key={param.key} className={styles.field}>
                <span className={styles.label}>{param.label}</span>
                <select
                  className={styles.select}
                  value={String(values[param.key])}
                  onChange={(event) =>
                    setValues((current) => ({
                      ...current,
                      [param.key]: isNumberParam(param) ? Number(event.target.value) : event.target.value,
                    }))
                  }
                >
                  {param.values.map((option) => (
                    <option key={`${param.key}-${option}`} value={String(option)}>
                      {formatParamValue(option, param)}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </form>
          <p className={styles.helper}>
            Results update locally in your browser for quick scenario checks. The indexed page copy and metadata remain tied to the slug you landed on.
          </p>
        </section>
      </div>

      <div className={styles.stack}>
        <section className={styles.card}>
          <h2 className={styles.title}>Results Snapshot</h2>
          <div className={styles.metrics}>
            {result.metrics.map((metric) => (
              <article key={metric.label} className={styles.metric}>
                <div className={styles.metricLabel}>{metric.label}</div>
                <div
                  className={[
                    styles.metricValue,
                    metric.tone === 'positive' ? styles.metricTonePositive : '',
                    metric.tone === 'warning' ? styles.metricToneWarning : '',
                    metric.tone === 'negative' ? styles.metricToneNegative : '',
                  ].join(' ')}
                >
                  {metric.value}
                </div>
                {metric.sub ? <div className={styles.metricSub}>{metric.sub}</div> : null}
              </article>
            ))}
          </div>
        </section>

        <section className={styles.card}>
          <h2 className={styles.title}>Results Chart</h2>
          <div className={styles.chart}>
            {result.metrics.map((metric) => (
              <div key={metric.label} className={styles.chartRow}>
                <div className={styles.chartLabel}>{metric.label}</div>
                <div className={styles.chartTrack}>
                  <div
                    className={styles.chartBar}
                    style={{ width: `${Math.max(8, (Math.abs(metric.numeric) / maxMetric) * 100)}%` }}
                  />
                </div>
                <div className={styles.chartValue}>{metric.value}</div>
              </div>
            ))}
          </div>
          <p className={styles.chartCaption}>{result.summary}</p>
        </section>

        <section className={styles.card}>
          <h2 className={styles.title}>Formula-First Note</h2>
          <p className={styles.insight}>
            Plain Figures keeps this calculator local and assumption-led. Use one changed input at a time if you want to see which variable is actually driving the result rather than reacting to a single headline output.
          </p>
        </section>
      </div>
    </div>
  );
}
