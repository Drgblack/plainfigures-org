// ── Tax / Salary Take-Home Calculations ───────────────────────────────────────
// Tax rates current as of 2024/25. These are approximations for illustrative purposes.

export interface TaxResult {
  grossAnnual: number;
  netAnnual: number;
  netMonthly: number;
  effectiveTaxRate: number;
  breakdown: { label: string; amount: number; rate?: number }[];
  currency: string;
  country: string;
}

// ── UK ────────────────────────────────────────────────────────────────────────
function calcUK(gross: number): TaxResult {
  const personalAllowance = 12570;
  const basicRateLimit = 50270;
  const higherRateLimit = 125140;

  // Income Tax
  let incomeTax = 0;
  const taxable = Math.max(0, gross - personalAllowance);
  if (gross > higherRateLimit) {
    // Personal allowance tapered away above 100k
    const tapered = Math.max(0, personalAllowance - Math.max(0, gross - 100000) / 2);
    const adjustedTaxable = gross - tapered;
    incomeTax = Math.min(adjustedTaxable - 0, basicRateLimit - 0) * 0.20;
    incomeTax += Math.min(Math.max(0, adjustedTaxable - basicRateLimit), higherRateLimit - basicRateLimit) * 0.40;
    incomeTax += Math.max(0, adjustedTaxable - higherRateLimit) * 0.45;
  } else {
    incomeTax = Math.min(taxable, basicRateLimit - personalAllowance) * 0.20;
    incomeTax += Math.max(0, taxable - (basicRateLimit - personalAllowance)) * 0.40;
  }

  // National Insurance (Employee) 2024/25
  let ni = 0;
  const niLower = 12570;
  const niUpper = 50270;
  if (gross > niLower) {
    ni += Math.min(gross - niLower, niUpper - niLower) * 0.08;
    ni += Math.max(0, gross - niUpper) * 0.02;
  }

  const totalDeductions = incomeTax + ni;
  const net = gross - totalDeductions;

  return {
    grossAnnual: gross, netAnnual: net, netMonthly: net / 12,
    effectiveTaxRate: (totalDeductions / gross) * 100,
    currency: 'GBP', country: 'United Kingdom',
    breakdown: [
      { label: 'Gross Salary', amount: gross },
      { label: 'Income Tax', amount: -incomeTax, rate: (incomeTax / gross) * 100 },
      { label: 'National Insurance', amount: -ni, rate: (ni / gross) * 100 },
      { label: 'Net Take-Home', amount: net },
    ],
  };
}

// ── Germany ───────────────────────────────────────────────────────────────────
function calcDE(gross: number, taxClass: number = 1): TaxResult {
  // Approximate German progressive tax 2024
  let incomeTax = 0;
  const z1 = 11604, z2 = 17005, z3 = 66760, z4 = 277825;

  if (gross <= z1) {
    incomeTax = 0;
  } else if (gross <= z2) {
    const y = (gross - z1) / 10000;
    incomeTax = (979.18 * y + 1400) * y;
  } else if (gross <= z3) {
    const y = (gross - z2) / 10000;
    incomeTax = (192.59 * y + 2397) * y + 966.53;
  } else if (gross <= z4) {
    incomeTax = 0.42 * gross - 9972.98;
  } else {
    incomeTax = 0.45 * gross - 18307.73;
  }

  // Solidarity surcharge (only above threshold)
  const soli = incomeTax > 18130 ? incomeTax * 0.055 : 0;

  // Social contributions (employee share)
  const pensionBase = Math.min(gross, 90600);
  const pension = pensionBase * 0.093;
  const unemploymentBase = Math.min(gross, 90600);
  const unemployment = unemploymentBase * 0.013;
  const healthBase = Math.min(gross, 62100);
  const health = healthBase * 0.073;
  const careBase = Math.min(gross, 62100);
  const care = careBase * 0.018;

  const totalDeductions = incomeTax + soli + pension + unemployment + health + care;
  const net = gross - totalDeductions;

  return {
    grossAnnual: gross, netAnnual: net, netMonthly: net / 12,
    effectiveTaxRate: (totalDeductions / gross) * 100,
    currency: 'EUR', country: 'Germany',
    breakdown: [
      { label: 'Gross Salary', amount: gross },
      { label: 'Income Tax (Lohnsteuer)', amount: -incomeTax, rate: (incomeTax / gross) * 100 },
      { label: 'Solidarity Surcharge', amount: -soli, rate: (soli / gross) * 100 },
      { label: 'Pension Insurance', amount: -pension, rate: 9.3 },
      { label: 'Health Insurance', amount: -health, rate: 7.3 },
      { label: 'Unemployment Insurance', amount: -unemployment, rate: 1.3 },
      { label: 'Care Insurance', amount: -care, rate: 1.8 },
      { label: 'Net Take-Home', amount: net },
    ],
  };
}

// ── USA ───────────────────────────────────────────────────────────────────────
function calcUS(gross: number, filingStatus: 'single' | 'married' = 'single'): TaxResult {
  // 2024 Federal brackets (single)
  const brackets = filingStatus === 'single'
    ? [[11600, 0.10], [47150, 0.12], [100525, 0.22], [191950, 0.24], [243725, 0.32], [609350, 0.35], [Infinity, 0.37]]
    : [[23200, 0.10], [94300, 0.12], [201050, 0.22], [383900, 0.24], [487450, 0.32], [731200, 0.35], [Infinity, 0.37]];

  const standardDeduction = filingStatus === 'single' ? 14600 : 29200;
  const taxableIncome = Math.max(0, gross - standardDeduction);

  let federalTax = 0;
  let prev = 0;
  for (const [limit, rate] of brackets) {
    const taxable = Math.min(taxableIncome - prev, (limit as number) - prev);
    if (taxable <= 0) break;
    federalTax += taxable * (rate as number);
    prev = limit as number;
  }

  // FICA: Social Security (6.2% up to $168,600) + Medicare (1.45%, +0.9% above $200k)
  const ssCap = 168600;
  const socialSecurity = Math.min(gross, ssCap) * 0.062;
  const medicare = gross * 0.0145 + Math.max(0, gross - 200000) * 0.009;

  // Approximate state tax: ~5% effective for illustrative purposes
  const stateTax = gross * 0.05;

  const totalDeductions = federalTax + socialSecurity + medicare + stateTax;
  const net = gross - totalDeductions;

  return {
    grossAnnual: gross, netAnnual: net, netMonthly: net / 12,
    effectiveTaxRate: (totalDeductions / gross) * 100,
    currency: 'USD', country: 'United States',
    breakdown: [
      { label: 'Gross Salary', amount: gross },
      { label: 'Federal Income Tax', amount: -federalTax, rate: (federalTax / gross) * 100 },
      { label: 'State Income Tax (avg)', amount: -stateTax, rate: 5 },
      { label: 'Social Security', amount: -socialSecurity, rate: 6.2 },
      { label: 'Medicare', amount: -medicare, rate: 1.45 },
      { label: 'Net Take-Home', amount: net },
    ],
  };
}

// ── France ────────────────────────────────────────────────────────────────────
function calcFR(gross: number): TaxResult {
  // French social contributions (employee) 2024
  const healthInsurance = gross * 0.0075;
  const retirement1 = Math.min(gross, 46368) * 0.069;
  const retirement2 = gross * 0.086;
  const unemployment = Math.min(gross, 185472) * 0.024;
  const csg = gross * 0.98 * 0.092;
  const crds = gross * 0.98 * 0.005;
  const socialTotal = healthInsurance + retirement1 + retirement2 + unemployment + csg + crds;

  // Income tax (impôt sur le revenu) — family quotient simplified
  const taxableIncome = gross - socialTotal * 0.68; // deduction allowance
  let incomeTax = 0;
  if (taxableIncome > 177106) incomeTax = taxableIncome * 0.45 - 46234;
  else if (taxableIncome > 82342) incomeTax = taxableIncome * 0.41 - 22856;
  else if (taxableIncome > 28797) incomeTax = taxableIncome * 0.30 - 5586;
  else if (taxableIncome > 11294) incomeTax = taxableIncome * 0.11 - 1242;
  incomeTax = Math.max(0, incomeTax);

  const totalDeductions = socialTotal + incomeTax;
  const net = gross - totalDeductions;

  return {
    grossAnnual: gross, netAnnual: net, netMonthly: net / 12,
    effectiveTaxRate: (totalDeductions / gross) * 100,
    currency: 'EUR', country: 'France',
    breakdown: [
      { label: 'Gross Salary', amount: gross },
      { label: 'Income Tax (IR)', amount: -incomeTax, rate: (incomeTax / gross) * 100 },
      { label: 'Health Insurance', amount: -healthInsurance, rate: 0.75 },
      { label: 'Retirement Contributions', amount: -(retirement1 + retirement2), rate: ((retirement1 + retirement2) / gross) * 100 },
      { label: 'Unemployment Insurance', amount: -unemployment, rate: 2.4 },
      { label: 'CSG / CRDS', amount: -(csg + crds), rate: 9.7 },
      { label: 'Net Take-Home', amount: net },
    ],
  };
}

// ── Netherlands ───────────────────────────────────────────────────────────────
function calcNL(gross: number): TaxResult {
  // Box 1 income tax + social contributions combined (loonheffing) 2024
  let tax = 0;
  if (gross <= 75518) {
    tax = gross * 0.3697;
  } else {
    tax = 75518 * 0.3697 + (gross - 75518) * 0.495;
  }

  // General tax credit (arbeidskorting simplified)
  const generalCredit = Math.min(3362, Math.max(0, 3362 - (gross - 22660) * 0.06095));
  const labourCredit = gross < 39957 ? Math.min(5052, gross * 0.08231) : Math.max(0, 5052 - (gross - 39957) * 0.06510);

  tax = Math.max(0, tax - generalCredit - labourCredit);

  // Employee insurance contributions (WW, WIA) — simplified
  const employeeInsurance = Math.min(gross, 70648) * 0.0565;

  const totalDeductions = tax + employeeInsurance;
  const net = gross - totalDeductions;

  return {
    grossAnnual: gross, netAnnual: net, netMonthly: net / 12,
    effectiveTaxRate: (totalDeductions / gross) * 100,
    currency: 'EUR', country: 'Netherlands',
    breakdown: [
      { label: 'Gross Salary', amount: gross },
      { label: 'Income Tax + NI (Loonheffing)', amount: -tax, rate: (tax / gross) * 100 },
      { label: 'General Tax Credit', amount: generalCredit, rate: undefined },
      { label: 'Labour Tax Credit', amount: labourCredit, rate: undefined },
      { label: 'Employee Insurance (WW/WIA)', amount: -employeeInsurance, rate: 5.65 },
      { label: 'Net Take-Home', amount: net },
    ],
  };
}

// ── Australia ─────────────────────────────────────────────────────────────────
function calcAU(gross: number): TaxResult {
  // 2024/25 income tax brackets
  let incomeTax = 0;
  if (gross <= 18200) {
    incomeTax = 0;
  } else if (gross <= 45000) {
    incomeTax = (gross - 18200) * 0.19;
  } else if (gross <= 135000) {
    incomeTax = 5092 + (gross - 45000) * 0.325;
  } else if (gross <= 190000) {
    incomeTax = 34342 + (gross - 135000) * 0.37;
  } else {
    incomeTax = 54742 + (gross - 190000) * 0.45;
  }

  // Medicare Levy (2%)
  const medicare = gross * 0.02;

  // Low Income Tax Offset (LITO)
  let lito = 0;
  if (gross <= 37500) lito = 700;
  else if (gross <= 45000) lito = 700 - (gross - 37500) * 0.05;
  else if (gross <= 66667) lito = 325 - (gross - 45000) * 0.015;

  const totalTax = Math.max(0, incomeTax - lito) + medicare;
  const net = gross - totalTax;

  // Superannuation (employer contribution, 11% — shown separately as it's not a deduction)
  const super_ = gross * 0.11;

  return {
    grossAnnual: gross, netAnnual: net, netMonthly: net / 12,
    effectiveTaxRate: (totalTax / gross) * 100,
    currency: 'AUD', country: 'Australia',
    breakdown: [
      { label: 'Gross Salary', amount: gross },
      { label: 'Income Tax', amount: -incomeTax, rate: (incomeTax / gross) * 100 },
      { label: 'Low Income Tax Offset', amount: lito > 0 ? lito : 0, rate: undefined },
      { label: 'Medicare Levy', amount: -medicare, rate: 2 },
      { label: 'Net Take-Home', amount: net },
      { label: 'Super (employer, not deducted)', amount: super_, rate: 11 },
    ],
  };
}

// ── Main export ───────────────────────────────────────────────────────────────
export type CountryCode = 'UK' | 'DE' | 'US' | 'FR' | 'NL' | 'AU';

export function calculateTakeHome(gross: number, country: CountryCode): TaxResult {
  switch (country) {
    case 'UK': return calcUK(gross);
    case 'DE': return calcDE(gross);
    case 'US': return calcUS(gross);
    case 'FR': return calcFR(gross);
    case 'NL': return calcNL(gross);
    case 'AU': return calcAU(gross);
  }
}

export const COUNTRY_CONFIG: Record<CountryCode, { name: string; flag: string; currency: string; symbol: string; defaultGross: number }> = {
  UK: { name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP', symbol: '£', defaultGross: 45000 },
  DE: { name: 'Germany', flag: '🇩🇪', currency: 'EUR', symbol: '€', defaultGross: 55000 },
  US: { name: 'United States', flag: '🇺🇸', currency: 'USD', symbol: '$', defaultGross: 80000 },
  FR: { name: 'France', flag: '🇫🇷', currency: 'EUR', symbol: '€', defaultGross: 45000 },
  NL: { name: 'Netherlands', flag: '🇳🇱', currency: 'EUR', symbol: '€', defaultGross: 55000 },
  AU: { name: 'Australia', flag: '🇦🇺', currency: 'AUD', symbol: 'A$', defaultGross: 90000 },
};
