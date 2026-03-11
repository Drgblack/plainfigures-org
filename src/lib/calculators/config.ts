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

export const HIGH_VALUE_COUNTRIES = [
  'US', 'UK', 'CA', 'AU',
  'NZ', 'IE', 'SG', 'ZA', 'IN', 'BR',
  'DE', 'NL', 'NO',
];

export const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
  'DC',
];

export const UK_NATIONS = ['England', 'Scotland', 'Wales', 'Northern Ireland'];

export const CANADA_PROVINCES = ['ON', 'QC', 'BC', 'AB', 'MB', 'SK', 'NS', 'NB', 'NL', 'PE', 'YT', 'NT', 'NU'];

export const AUSTRALIA_STATES = ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'];

export const SG_BUYER_STATUSES = ['Citizen', 'PR', 'Foreigner'];

export const SG_HDB_FLAT_TYPES = ['2-room', '3-room', '4-room', '5-room', 'Executive'];

const NON_ENGLISH_LANGUAGE_HINTS: Record<string, string> = {
  DE: 'de',
  NL: 'nl',
  NO: 'no',
};

const COUNTRY_NAME_MAP: Record<string, string> = {
  US: 'United States',
  UK: 'United Kingdom',
  CA: 'Canada',
  AU: 'Australia',
  NZ: 'New Zealand',
  IE: 'Ireland',
  SG: 'Singapore',
  ZA: 'South Africa',
  IN: 'India',
  BR: 'Brazil',
  DE: 'Germany',
  NL: 'Netherlands',
  NO: 'Norway',
};

export const US_STATE_MARKET_CONTEXT = {
  incomeTaxFree: ['AK', 'FL', 'NV', 'SD', 'TN', 'TX', 'WA', 'WY'],
  highPropertyTax: ['CT', 'IL', 'NH', 'NJ', 'NY', 'TX', 'VT', 'WI'],
  highInsuranceRisk: ['CA', 'FL', 'LA', 'OK', 'TX'],
  lowCostHousing: ['AL', 'AR', 'IA', 'IN', 'KS', 'KY', 'MS', 'MO', 'OK', 'WV'],
  highCostHousing: ['CA', 'CO', 'DC', 'HI', 'MA', 'NJ', 'NY', 'WA'],
} as const;

export const UK_REGION_DATA: Record<string, {
  incomeTaxBands?: { rate: number; min: number; max?: number }[] | null;
  sdltBands?: { rate: number; min: number; max?: number }[] | null;
  hasSeparateTax?: boolean;
}> = {
  England: {
    incomeTaxBands: [
      { rate: 20, min: 12570, max: 50270 },
      { rate: 40, min: 50270, max: 125140 },
      { rate: 45, min: 125140 },
    ],
    sdltBands: [
      { rate: 0, min: 0, max: 250000 },
      { rate: 5, min: 250000, max: 925000 },
      { rate: 10, min: 925000, max: 1500000 },
      { rate: 12, min: 1500000 },
    ],
    hasSeparateTax: false,
  },
  Scotland: {
    incomeTaxBands: [
      { rate: 19, min: 12570, max: 14876 },
      { rate: 20, min: 14876, max: 26561 },
      { rate: 21, min: 26561, max: 43662 },
      { rate: 42, min: 43662, max: 75000 },
      { rate: 47, min: 75000 },
    ],
    sdltBands: null,
    hasSeparateTax: true,
  },
  Wales: {
    incomeTaxBands: [
      { rate: 20, min: 12570, max: 50270 },
      { rate: 40, min: 50270, max: 125140 },
      { rate: 45, min: 125140 },
    ],
    sdltBands: [
      { rate: 0, min: 0, max: 225000 },
      { rate: 6, min: 225000, max: 400000 },
      { rate: 7.5, min: 400000, max: 750000 },
      { rate: 10, min: 750000, max: 1500000 },
      { rate: 12, min: 1500000 },
    ],
    hasSeparateTax: false,
  },
  'Northern Ireland': {
    incomeTaxBands: [
      { rate: 20, min: 12570, max: 50270 },
      { rate: 40, min: 50270, max: 125140 },
      { rate: 45, min: 125140 },
    ],
    sdltBands: [
      { rate: 0, min: 0, max: 250000 },
      { rate: 5, min: 250000, max: 925000 },
      { rate: 10, min: 925000, max: 1500000 },
      { rate: 12, min: 1500000 },
    ],
    hasSeparateTax: false,
  },
} as const;

export const CANADA_PROVINCE_DATA: Record<string, {
  provincialTaxRates?: { rate: number; min: number; max?: number }[];
  salesTaxCombined?: number;
  avgPropertyTaxRate?: number;
}> = {
  ON: {
    provincialTaxRates: [
      { rate: 5.05, min: 0, max: 51446 },
      { rate: 9.15, min: 51446, max: 102894 },
      { rate: 11.16, min: 102894, max: 150000 },
      { rate: 12.16, min: 150000, max: 220000 },
      { rate: 13.16, min: 220000 },
    ],
    salesTaxCombined: 13,
    avgPropertyTaxRate: 0.68,
  },
  QC: {
    provincialTaxRates: [
      { rate: 14, min: 0, max: 53255 },
      { rate: 19, min: 53255, max: 106495 },
      { rate: 24, min: 106495, max: 129590 },
      { rate: 25.75, min: 129590 },
    ],
    salesTaxCombined: 14.975,
    avgPropertyTaxRate: 0.92,
  },
  BC: {
    provincialTaxRates: [
      { rate: 5.06, min: 0, max: 49279 },
      { rate: 7.7, min: 49279, max: 98560 },
      { rate: 10.5, min: 98560, max: 113158 },
      { rate: 12.29, min: 113158, max: 137407 },
      { rate: 14.7, min: 137407, max: 186306 },
      { rate: 16.8, min: 186306, max: 259829 },
      { rate: 20.5, min: 259829 },
    ],
    salesTaxCombined: 12,
    avgPropertyTaxRate: 0.55,
  },
  AB: {
    provincialTaxRates: [
      { rate: 10, min: 0, max: 148269 },
      { rate: 12, min: 148269, max: 177922 },
      { rate: 13, min: 177922, max: 237230 },
      { rate: 14, min: 237230, max: 355845 },
      { rate: 15, min: 355845 },
    ],
    salesTaxCombined: 5,
    avgPropertyTaxRate: 0.62,
  },
  MB: {
    provincialTaxRates: [
      { rate: 10.8, min: 0, max: 47000 },
      { rate: 12.75, min: 47000, max: 100000 },
      { rate: 17.4, min: 100000 },
    ],
    salesTaxCombined: 12,
    avgPropertyTaxRate: 1.24,
  },
  SK: {
    provincialTaxRates: [
      { rate: 10.5, min: 0, max: 53463 },
      { rate: 12.5, min: 53463, max: 152750 },
      { rate: 14.5, min: 152750 },
    ],
    salesTaxCombined: 11,
    avgPropertyTaxRate: 1.07,
  },
  NS: {
    provincialTaxRates: [
      { rate: 8.79, min: 0, max: 29590 },
      { rate: 14.95, min: 29590, max: 59180 },
      { rate: 16.67, min: 59180, max: 93000 },
      { rate: 17.5, min: 93000, max: 150000 },
      { rate: 21, min: 150000 },
    ],
    salesTaxCombined: 15,
    avgPropertyTaxRate: 1.11,
  },
  NB: {
    provincialTaxRates: [
      { rate: 9.4, min: 0, max: 49958 },
      { rate: 14, min: 49958, max: 99916 },
      { rate: 16, min: 99916, max: 185064 },
      { rate: 19.5, min: 185064 },
    ],
    salesTaxCombined: 15,
    avgPropertyTaxRate: 1.43,
  },
  NL: {
    provincialTaxRates: [
      { rate: 8.7, min: 0, max: 43198 },
      { rate: 14.5, min: 43198, max: 86395 },
      { rate: 15.8, min: 86395, max: 154244 },
      { rate: 17.8, min: 154244, max: 215943 },
      { rate: 19.8, min: 215943 },
    ],
    salesTaxCombined: 15,
    avgPropertyTaxRate: 0.76,
  },
  PE: {
    provincialTaxRates: [
      { rate: 9.65, min: 0, max: 32656 },
      { rate: 13.63, min: 32656, max: 64313 },
      { rate: 16.65, min: 64313 },
    ],
    salesTaxCombined: 15,
    avgPropertyTaxRate: 1.37,
  },
  YT: {
    provincialTaxRates: [
      { rate: 6.4, min: 0, max: 55867 },
      { rate: 9, min: 55867, max: 111733 },
      { rate: 10.9, min: 111733, max: 173205 },
      { rate: 12.8, min: 173205, max: 500000 },
      { rate: 15, min: 500000 },
    ],
    salesTaxCombined: 5,
    avgPropertyTaxRate: 0.58,
  },
  NT: {
    provincialTaxRates: [
      { rate: 5.9, min: 0, max: 50597 },
      { rate: 8.6, min: 50597, max: 101198 },
      { rate: 12.2, min: 101198, max: 164525 },
      { rate: 14.05, min: 164525 },
    ],
    salesTaxCombined: 5,
    avgPropertyTaxRate: 0.77,
  },
  NU: {
    provincialTaxRates: [
      { rate: 4, min: 0, max: 54707 },
      { rate: 7, min: 54707, max: 109413 },
      { rate: 9, min: 109413, max: 177881 },
      { rate: 11.5, min: 177881 },
    ],
    salesTaxCombined: 5,
    avgPropertyTaxRate: 0.64,
  },
} as const;

export const AU_STATE_DATA: Record<string, {
  stampDutyBands?: { rate: number; min: number; max?: number }[];
  landTaxThreshold?: number;
  payrollTaxRate?: number;
}> = {
  NSW: {
    stampDutyBands: [
      { rate: 1.25, min: 0, max: 17000 },
      { rate: 1.5, min: 17000, max: 36000 },
      { rate: 1.75, min: 36000, max: 97000 },
      { rate: 3.5, min: 97000, max: 364000 },
      { rate: 4.5, min: 364000, max: 1212000 },
      { rate: 5.5, min: 1212000 },
    ],
    landTaxThreshold: 1000000,
    payrollTaxRate: 4.85,
  },
  VIC: {
    stampDutyBands: [
      { rate: 1.4, min: 0, max: 25000 },
      { rate: 2.4, min: 25000, max: 130000 },
      { rate: 6, min: 130000, max: 960000 },
      { rate: 5.5, min: 960000, max: 2000000 },
      { rate: 6.5, min: 2000000 },
    ],
    landTaxThreshold: 300000,
    payrollTaxRate: 4.85,
  },
  QLD: {
    stampDutyBands: [
      { rate: 1.5, min: 0, max: 5000 },
      { rate: 3.5, min: 5000, max: 75000 },
      { rate: 4.5, min: 75000, max: 540000 },
      { rate: 5.75, min: 540000, max: 1000000 },
      { rate: 7, min: 1000000 },
    ],
    landTaxThreshold: 600000,
    payrollTaxRate: 4.75,
  },
  WA: {
    stampDutyBands: [
      { rate: 1.9, min: 0, max: 120000 },
      { rate: 2.85, min: 120000, max: 150000 },
      { rate: 3.8, min: 150000, max: 360000 },
      { rate: 4.75, min: 360000, max: 725000 },
      { rate: 5.15, min: 725000 },
    ],
    landTaxThreshold: 420000,
    payrollTaxRate: 5.5,
  },
  SA: {
    stampDutyBands: [
      { rate: 1, min: 0, max: 12000 },
      { rate: 2, min: 12000, max: 30000 },
      { rate: 3, min: 30000, max: 50000 },
      { rate: 3.5, min: 50000, max: 100000 },
      { rate: 4, min: 100000, max: 200000 },
      { rate: 4.25, min: 200000, max: 250000 },
      { rate: 4.75, min: 250000, max: 500000 },
      { rate: 5.5, min: 500000 },
    ],
    landTaxThreshold: 732000,
    payrollTaxRate: 4.95,
  },
  TAS: {
    stampDutyBands: [
      { rate: 1.75, min: 0, max: 3000 },
      { rate: 2.25, min: 3000, max: 25000 },
      { rate: 3.5, min: 25000, max: 75000 },
      { rate: 4, min: 75000, max: 200000 },
      { rate: 4.25, min: 200000, max: 375000 },
      { rate: 4.75, min: 375000, max: 725000 },
      { rate: 5, min: 725000 },
    ],
    landTaxThreshold: 125000,
    payrollTaxRate: 4,
  },
  ACT: {
    stampDutyBands: [
      { rate: 0.4, min: 0, max: 200000 },
      { rate: 2.2, min: 200000, max: 300000 },
      { rate: 3.4, min: 300000, max: 500000 },
      { rate: 4.32, min: 500000, max: 750000 },
      { rate: 5.9, min: 750000, max: 1455000 },
      { rate: 7, min: 1455000 },
    ],
    landTaxThreshold: 0,
    payrollTaxRate: 6.85,
  },
  NT: {
    stampDutyBands: [
      { rate: 1.95, min: 0, max: 525000 },
      { rate: 4.95, min: 525000, max: 3000000 },
      { rate: 5.45, min: 3000000 },
    ],
    landTaxThreshold: 500000,
    payrollTaxRate: 5.5,
  },
} as const;

export const SG_NUANCE_DATA: Record<string, {
  cpfContributionRateEmployee?: number;
  cpfContributionRateEmployer?: number;
  absdRate?: number;
  hdbFlatTypes?: string[];
}> = {
  Citizen: {
    cpfContributionRateEmployee: 20,
    cpfContributionRateEmployer: 17,
    absdRate: 0,
    hdbFlatTypes: ['2-room', '3-room', '4-room', '5-room', 'Executive'],
  },
  PR: {
    cpfContributionRateEmployee: 20,
    cpfContributionRateEmployer: 17,
    absdRate: 5,
    hdbFlatTypes: ['2-room', '3-room', '4-room', '5-room'],
  },
  Foreigner: {
    cpfContributionRateEmployee: 0,
    cpfContributionRateEmployer: 0,
    absdRate: 60,
    hdbFlatTypes: [],
  },
} as const;

export const US_STATE_DATA: Record<string, {
  incomeTaxBrackets?: { rate: number; min: number; max?: number }[];
  avgPropertyTaxRate?: number;
  stateSalesTax?: number;
  carInsuranceIndex?: number;
  costOfLivingMultiplier?: number;
}> = {
  AL: { incomeTaxBrackets: [{ rate: 2, min: 0, max: 500 }, { rate: 4, min: 500, max: 3000 }, { rate: 5, min: 3000 }], avgPropertyTaxRate: 0.41, stateSalesTax: 4, carInsuranceIndex: 0.96, costOfLivingMultiplier: 0.89 },
  AZ: { incomeTaxBrackets: [{ rate: 2.5, min: 0 }], avgPropertyTaxRate: 0.51, stateSalesTax: 5.6, carInsuranceIndex: 1.08, costOfLivingMultiplier: 1.02 },
  CA: { incomeTaxBrackets: [{ rate: 1, min: 0, max: 10756 }, { rate: 2, min: 10756, max: 25499 }, { rate: 4, min: 25499, max: 40245 }, { rate: 6, min: 40245, max: 55866 }, { rate: 8, min: 55866, max: 70606 }, { rate: 9.3, min: 70606, max: 360659 }, { rate: 10.3, min: 360659, max: 432787 }, { rate: 11.3, min: 432787, max: 721314 }, { rate: 12.3, min: 721314 }], avgPropertyTaxRate: 0.76, stateSalesTax: 7.25, carInsuranceIndex: 1.45, costOfLivingMultiplier: 1.38 },
  CO: { incomeTaxBrackets: [{ rate: 4.4, min: 0 }], avgPropertyTaxRate: 0.49, stateSalesTax: 2.9, carInsuranceIndex: 1.01, costOfLivingMultiplier: 1.12 },
  FL: { incomeTaxBrackets: [], avgPropertyTaxRate: 0.71, stateSalesTax: 6, carInsuranceIndex: 1.38, costOfLivingMultiplier: 1.01 },
  GA: { incomeTaxBrackets: [{ rate: 5.39, min: 0 }], avgPropertyTaxRate: 0.81, stateSalesTax: 4, carInsuranceIndex: 1.05, costOfLivingMultiplier: 0.95 },
  IL: { incomeTaxBrackets: [{ rate: 4.95, min: 0 }], avgPropertyTaxRate: 1.95, stateSalesTax: 6.25, carInsuranceIndex: 1.07, costOfLivingMultiplier: 0.96 },
  IN: { incomeTaxBrackets: [{ rate: 3.05, min: 0 }], avgPropertyTaxRate: 0.83, stateSalesTax: 7, carInsuranceIndex: 0.94, costOfLivingMultiplier: 0.89 },
  LA: { incomeTaxBrackets: [{ rate: 1.85, min: 0, max: 12500 }, { rate: 3.5, min: 12500, max: 50000 }, { rate: 4.25, min: 50000 }], avgPropertyTaxRate: 0.55, stateSalesTax: 5, carInsuranceIndex: 1.42, costOfLivingMultiplier: 0.92 },
  MA: { incomeTaxBrackets: [{ rate: 5, min: 0 }, { rate: 9, min: 1000000 }], avgPropertyTaxRate: 1.04, stateSalesTax: 6.25, carInsuranceIndex: 1.11, costOfLivingMultiplier: 1.31 },
  MD: { incomeTaxBrackets: [{ rate: 2, min: 0, max: 1000 }, { rate: 3, min: 1000, max: 2000 }, { rate: 4, min: 2000, max: 3000 }, { rate: 4.75, min: 3000, max: 100000 }, { rate: 5, min: 100000, max: 125000 }, { rate: 5.25, min: 125000, max: 150000 }, { rate: 5.5, min: 150000, max: 250000 }, { rate: 5.75, min: 250000 }], avgPropertyTaxRate: 1.02, stateSalesTax: 6, carInsuranceIndex: 1.09, costOfLivingMultiplier: 1.11 },
  MI: { incomeTaxBrackets: [{ rate: 4.25, min: 0 }], avgPropertyTaxRate: 1.32, stateSalesTax: 6, carInsuranceIndex: 1.64, costOfLivingMultiplier: 0.91 },
  MN: { incomeTaxBrackets: [{ rate: 5.35, min: 0, max: 31690 }, { rate: 6.8, min: 31690, max: 104090 }, { rate: 7.85, min: 104090, max: 193240 }, { rate: 9.85, min: 193240 }], avgPropertyTaxRate: 1.12, stateSalesTax: 6.875, carInsuranceIndex: 1.03, costOfLivingMultiplier: 1.01 },
  MO: { incomeTaxBrackets: [{ rate: 4.8, min: 0 }], avgPropertyTaxRate: 0.88, stateSalesTax: 4.225, carInsuranceIndex: 0.98, costOfLivingMultiplier: 0.88 },
  NC: { incomeTaxBrackets: [{ rate: 4.25, min: 0 }], avgPropertyTaxRate: 0.73, stateSalesTax: 4.75, carInsuranceIndex: 1.02, costOfLivingMultiplier: 0.95 },
  NJ: { incomeTaxBrackets: [{ rate: 1.4, min: 0, max: 20000 }, { rate: 1.75, min: 20000, max: 35000 }, { rate: 3.5, min: 35000, max: 40000 }, { rate: 5.525, min: 40000, max: 75000 }, { rate: 6.37, min: 75000, max: 500000 }, { rate: 8.97, min: 500000, max: 1000000 }, { rate: 10.75, min: 1000000 }], avgPropertyTaxRate: 2.08, stateSalesTax: 6.625, carInsuranceIndex: 1.24, costOfLivingMultiplier: 1.22 },
  NY: { incomeTaxBrackets: [{ rate: 4, min: 0, max: 8500 }, { rate: 4.5, min: 8500, max: 11700 }, { rate: 5.25, min: 11700, max: 13900 }, { rate: 5.5, min: 13900, max: 21400 }, { rate: 6, min: 21400, max: 80650 }, { rate: 6.85, min: 80650, max: 215400 }, { rate: 9.65, min: 215400, max: 1077550 }, { rate: 10.3, min: 1077550, max: 5000000 }, { rate: 10.9, min: 5000000 }], avgPropertyTaxRate: 1.54, stateSalesTax: 4, carInsuranceIndex: 1.33, costOfLivingMultiplier: 1.32 },
  OH: { incomeTaxBrackets: [{ rate: 0, min: 0, max: 26050 }, { rate: 2.75, min: 26050, max: 100000 }, { rate: 3.5, min: 100000 }], avgPropertyTaxRate: 1.41, stateSalesTax: 5.75, carInsuranceIndex: 0.92, costOfLivingMultiplier: 0.9 },
  PA: { incomeTaxBrackets: [{ rate: 3.07, min: 0 }], avgPropertyTaxRate: 1.35, stateSalesTax: 6, carInsuranceIndex: 1.0, costOfLivingMultiplier: 0.97 },
  SC: { incomeTaxBrackets: [{ rate: 0, min: 0, max: 3460 }, { rate: 3, min: 3460, max: 17330 }, { rate: 6.2, min: 17330 }], avgPropertyTaxRate: 0.53, stateSalesTax: 6, carInsuranceIndex: 1.18, costOfLivingMultiplier: 0.91 },
  TN: { incomeTaxBrackets: [], avgPropertyTaxRate: 0.64, stateSalesTax: 7, carInsuranceIndex: 0.99, costOfLivingMultiplier: 0.91 },
  TX: { incomeTaxBrackets: [], avgPropertyTaxRate: 1.68, stateSalesTax: 6.25, carInsuranceIndex: 1.12, costOfLivingMultiplier: 0.93 },
  VA: { incomeTaxBrackets: [{ rate: 2, min: 0, max: 3000 }, { rate: 3, min: 3000, max: 5000 }, { rate: 5, min: 5000, max: 17000 }, { rate: 5.75, min: 17000 }], avgPropertyTaxRate: 0.8, stateSalesTax: 5.3, carInsuranceIndex: 0.91, costOfLivingMultiplier: 1.05 },
  WA: { incomeTaxBrackets: [], avgPropertyTaxRate: 0.84, stateSalesTax: 6.5, carInsuranceIndex: 1.02, costOfLivingMultiplier: 1.16 },
  WI: { incomeTaxBrackets: [{ rate: 3.5, min: 0, max: 14820 }, { rate: 4.4, min: 14820, max: 29640 }, { rate: 5.3, min: 29640, max: 325600 }, { rate: 7.65, min: 325600 }], avgPropertyTaxRate: 1.68, stateSalesTax: 5, carInsuranceIndex: 0.9, costOfLivingMultiplier: 0.94 },
} as const;

const US_STATE_SENSITIVE_CALCULATOR_IDS = new Set([
  'salary-take-home',
  'cost-of-living',
  'mortgage-repayment',
  'how-much-house-can-i-afford',
  'car-insurance-comparison',
  'home-insurance-addons',
  'rent-vs-buy-home',
  'net-worth-growth',
  'investment-future-value',
  'balance-transfer-savings',
  'emergency-fund-goal',
]);

function getGeoVariantCap(config: CalculatorConfig): number {
  return US_STATE_SENSITIVE_CALCULATOR_IDS.has(config.id) ? 3000 : 2500;
}

const CANADA_PROVINCE_SENSITIVE_CALCULATOR_IDS = new Set([
  'ca-mortgage-affordability-stress-test',
  'ca-income-tax-take-home',
  'cost-of-living',
  'rent-vs-buy-home',
  'car-insurance-comparison',
]);

const AUSTRALIA_STATE_SENSITIVE_CALCULATOR_IDS = new Set([
  'au-superannuation-retirement-projection',
  'au-mortgage-offset-savings',
  'au-income-tax-take-home',
  'au-negative-gearing-return',
]);

const AUSTRALIA_STATE_ENHANCED_CALCULATOR_IDS = new Set([
  'au-superannuation-retirement-projection',
  'au-mortgage-offset-savings',
  'au-income-tax-take-home',
  'au-first-home-buyer-affordability',
  'au-negative-gearing-return',
]);

const SINGAPORE_BUYER_STATUS_VARIANT_IDS = new Set([
  'sg-cpf-retirement-projection',
  'sg-hdb-loan-affordability',
  'sg-income-tax-take-home',
  'sg-srs-vs-cpf-top-up',
]);

const SINGAPORE_NUANCE_ENHANCED_CALCULATOR_IDS = new Set([
  'sg-cpf-retirement-projection',
  'sg-hdb-loan-affordability',
  'sg-income-tax-take-home',
  'sg-srs-vs-cpf-top-up',
  'sg-buyer-stamp-duty-absd',
]);

function estimateStateIncomeTaxRate(state: string, annualIncome: number): number {
  const brackets = US_STATE_DATA[state]?.incomeTaxBrackets ?? [];
  if (brackets.length === 0 || annualIncome <= 0) {
    return 0;
  }

  let tax = 0;

  for (const bracket of brackets) {
    const upperBound = bracket.max ?? annualIncome;
    if (annualIncome <= bracket.min) {
      continue;
    }

    const taxableAmount = Math.min(annualIncome, upperBound) - bracket.min;
    if (taxableAmount > 0) {
      tax += taxableAmount * (bracket.rate / 100);
    }

    if (annualIncome <= upperBound) {
      break;
    }
  }

  return Number(((tax / annualIncome) * 100).toFixed(2));
}

export function getStateEnhancedParams(
  config: CalculatorConfig,
  geo: { country?: string; state?: string },
  baseParams: ParamMap
): ParamMap {
  if (geo.country !== 'US' || !geo.state || !US_STATE_SENSITIVE_CALCULATOR_IDS.has(config.id)) {
    return {};
  }

  const stateData = US_STATE_DATA[geo.state];
  if (!stateData) {
    return { state: geo.state };
  }

  const incomeSource =
    typeof baseParams.gross === 'number' ? baseParams.gross :
      typeof baseParams.annualIncome === 'number' ? baseParams.annualIncome :
        typeof baseParams.salary === 'number' ? baseParams.salary :
          typeof baseParams.initialInvestment === 'number' ? baseParams.initialInvestment * 0.04 :
            typeof baseParams.currentNetWorth === 'number' ? baseParams.currentNetWorth * 0.03 :
              0;

  const stateIncomeTaxRate = estimateStateIncomeTaxRate(geo.state, Number(incomeSource));

  return {
    state: geo.state,
    stateIncomeTaxRate,
    avgPropertyTaxRate: stateData.avgPropertyTaxRate ?? 0,
    stateSalesTax: stateData.stateSalesTax ?? 0,
    carInsuranceIndex: stateData.carInsuranceIndex ?? 1,
    costOfLivingMultiplier: stateData.costOfLivingMultiplier ?? 1,
  };
}

function estimateProgressiveRate(
  bands: { rate: number; min: number; max?: number }[] | null | undefined,
  taxableAmount: number
): number {
  if (!bands || taxableAmount <= 0) {
    return 0;
  }

  let tax = 0;

  for (const band of bands) {
    const upperBound = band.max ?? taxableAmount;
    if (taxableAmount <= band.min) {
      continue;
    }

    const taxedSlice = Math.min(taxableAmount, upperBound) - band.min;
    if (taxedSlice > 0) {
      tax += taxedSlice * (band.rate / 100);
    }

    if (taxableAmount <= upperBound) {
      break;
    }
  }

  return Number(((tax / taxableAmount) * 100).toFixed(2));
}

function estimatePropertyTransactionRate(
  bands: { rate: number; min: number; max?: number }[] | null | undefined,
  propertyPrice: number
): number {
  if (!bands || propertyPrice <= 0) {
    return 0;
  }

  let duty = 0;

  for (const band of bands) {
    const upperBound = band.max ?? propertyPrice;
    if (propertyPrice <= band.min) {
      continue;
    }

    const taxedSlice = Math.min(propertyPrice, upperBound) - band.min;
    if (taxedSlice > 0) {
      duty += taxedSlice * (band.rate / 100);
    }

    if (propertyPrice <= upperBound) {
      break;
    }
  }

  return Number(((duty / propertyPrice) * 100).toFixed(2));
}

export function getUkNationEnhancedParams(
  config: CalculatorConfig,
  geo: { country?: string; region?: string },
  baseParams: ParamMap
): ParamMap {
  if ((geo.country !== 'UK' && geo.country !== 'GB') || !geo.region) {
    return {};
  }

  const regionData = UK_REGION_DATA[geo.region];
  if (!regionData) {
    return { region: geo.region };
  }

  const incomeSource =
    typeof baseParams.grossSalary === 'number' ? baseParams.grossSalary :
      typeof baseParams.annualIncome === 'number' ? baseParams.annualIncome :
        typeof baseParams.salary === 'number' ? baseParams.salary :
          typeof baseParams.gross === 'number' ? baseParams.gross :
            0;

  const propertyPrice =
    typeof baseParams.propertyPrice === 'number' ? baseParams.propertyPrice :
      typeof baseParams.propertyValueEstimate === 'number' ? baseParams.propertyValueEstimate :
        0;

  const estimatedUkIncomeTaxRate = estimateProgressiveRate(regionData.incomeTaxBands, Number(incomeSource));
  const estimatedUkPropertyTransferRate = estimatePropertyTransactionRate(regionData.sdltBands, Number(propertyPrice));

  return {
    region: geo.region,
    regionName: geo.region,
    estimatedUkIncomeTaxRate,
    estimatedUkPropertyTransferRate,
    hasSeparateUkTax: regionData.hasSeparateTax ? 'yes' : 'no',
    propertyTransferSystem: geo.region === 'Wales' ? 'LTT' : geo.region === 'Scotland' ? 'LBTT' : 'SDLT',
  };
}

export function getCanadaProvinceEnhancedParams(
  config: CalculatorConfig,
  geo: { country?: string; province?: string },
  baseParams: ParamMap
): ParamMap {
  if (geo.country !== 'CA' || !geo.province || !CANADA_PROVINCE_SENSITIVE_CALCULATOR_IDS.has(config.id)) {
    return {};
  }

  const provinceData = CANADA_PROVINCE_DATA[geo.province];
  if (!provinceData) {
    return { province: geo.province };
  }

  const incomeSource =
    typeof baseParams.grossSalary === 'number' ? baseParams.grossSalary :
      typeof baseParams.annualIncome === 'number' ? baseParams.annualIncome :
        typeof baseParams.salary === 'number' ? baseParams.salary :
          typeof baseParams.gross === 'number' ? baseParams.gross :
            0;

  const estimatedProvincialTaxRate = estimateProgressiveRate(
    provinceData.provincialTaxRates,
    Number(incomeSource)
  );

  return {
    province: geo.province,
    provinceName: geo.province,
    estimatedProvincialTaxRate,
    salesTaxCombined: provinceData.salesTaxCombined ?? 0,
    avgPropertyTaxRate: provinceData.avgPropertyTaxRate ?? 0,
  };
}

export function getAustraliaStateEnhancedParams(
  config: CalculatorConfig,
  geo: { country?: string; state?: string },
  baseParams: ParamMap
): ParamMap {
  const resolvedState =
    geo.country === 'AU' && geo.state ? geo.state :
      (AUSTRALIA_STATE_ENHANCED_CALCULATOR_IDS.has(config.id) && typeof baseParams.state === 'string' ? baseParams.state : undefined);

  if (!resolvedState || !AUSTRALIA_STATE_ENHANCED_CALCULATOR_IDS.has(config.id)) {
    return {};
  }

  const stateData = AU_STATE_DATA[resolvedState];
  if (!stateData) {
    return { state: resolvedState };
  }

  const propertyValue =
    typeof baseParams.propertyPrice === 'number' ? baseParams.propertyPrice :
      typeof baseParams.propertyPurchasePrice === 'number' ? baseParams.propertyPurchasePrice :
        typeof baseParams.mortgageBalance === 'number' ? baseParams.mortgageBalance :
          0;

  const estimatedAuStampDutyRate = estimatePropertyTransactionRate(
    stateData.stampDutyBands,
    Number(propertyValue)
  );

  return {
    state: resolvedState,
    stateName: resolvedState,
    estimatedAuStampDutyRate,
    landTaxThreshold: stateData.landTaxThreshold ?? 0,
    payrollTaxRate: stateData.payrollTaxRate ?? 0,
  };
}

export function getSingaporeNuanceEnhancedParams(
  config: CalculatorConfig,
  geo: { country?: string; buyerStatus?: string; flatType?: string },
  baseParams: ParamMap
): ParamMap {
  const resolvedBuyerStatus =
    geo.country === 'SG' && geo.buyerStatus ? geo.buyerStatus :
      (SINGAPORE_NUANCE_ENHANCED_CALCULATOR_IDS.has(config.id) && typeof baseParams.buyerStatus === 'string' ? baseParams.buyerStatus : undefined);
  const resolvedFlatType =
    geo.country === 'SG' && geo.flatType ? geo.flatType :
      (config.id === 'sg-hdb-loan-affordability' && typeof baseParams.flatType === 'string' ? baseParams.flatType : undefined);

  if (!resolvedBuyerStatus || !SINGAPORE_NUANCE_ENHANCED_CALCULATOR_IDS.has(config.id)) {
    return {};
  }

  const nuanceData = SG_NUANCE_DATA[resolvedBuyerStatus];
  if (!nuanceData) {
    return { buyerStatus: resolvedBuyerStatus, ...(resolvedFlatType ? { flatType: resolvedFlatType } : {}) };
  }

  return {
    buyerStatus: resolvedBuyerStatus,
    buyerStatusName: resolvedBuyerStatus,
    ...(resolvedFlatType ? { flatType: resolvedFlatType, flatTypeName: resolvedFlatType } : {}),
    cpfContributionRateEmployee: nuanceData.cpfContributionRateEmployee ?? 0,
    cpfContributionRateEmployer: nuanceData.cpfContributionRateEmployer ?? 0,
    absdRate: nuanceData.absdRate ?? 0,
  };
}

export function getGeoVariants(config: CalculatorConfig): { country?: string; state?: string; region?: string; province?: string; buyerStatus?: string; flatType?: string; languageHint?: string }[] {
  const geoRelevantIds = [
    'uk-tax-take-home',
    'salary-take-home',
    'mortgage-repayment',
    'offset-mortgage',
    'student-loan-refinance',
    'auto-loan',
    'heloc-drawdown',
    'home-equity-loan-vs-heloc',
    'car-insurance-comparison',
    'home-insurance-addons',
    'pet-insurance-vs-vet',
    'cost-of-living',
    'rent-vs-buy-home',
    'rent-vs-buy-apartment',
    'fire-number',
    'retirement-savings',
    'reverse-mortgage-calculator',
    'passive-income-projector',
    'credit-utilization-optimizer',
    'emergency-fund-goal',
    'zero-based-budget-planner',
    'reverse-mortgage-line-of-credit',
    'passive-income-scaling',
    'credit-rebuild-timeline',
    'emergency-fund-with-interest',
    'zero-based-budget-debt-snowball',
    'reverse-mortgage-payout',
    'passive-income-reinvestment',
    'credit-score-rebuild-path',
    'tiered-emergency-fund',
    'zero-based-budget-sinking-funds',
    'ca-mortgage-affordability-stress-test',
    'ca-rrsp-vs-tfsa-optimizer',
    'ca-income-tax-take-home',
    'ca-cpp-oas-estimator',
    'ca-cmhc-home-affordability',
    'au-superannuation-retirement-projection',
    'au-mortgage-offset-savings',
    'au-income-tax-take-home',
    'au-first-home-buyer-affordability',
    'au-negative-gearing-return',
    'uk-mortgage-affordability-stress-test',
    'uk-pension-tax-relief-optimizer',
    'uk-income-tax-ni-take-home',
    'uk-isa-vs-pension-comparison',
    'uk-stamp-duty-first-time-buyer',
    'sg-cpf-retirement-projection',
    'sg-hdb-loan-affordability',
    'sg-income-tax-take-home',
    'sg-srs-vs-cpf-top-up',
    'sg-buyer-stamp-duty-absd',
    'in-home-loan-eligibility-emi',
    'in-ppf-epf-retirement-projection',
    'in-income-tax-take-home',
    'in-nps-vs-epf-comparison',
    'in-stamp-duty-registration',
    'br-salario-liquido-clt-pj',
    'br-irpf-2026',
    'br-fgts-modalidades-saldo',
    'br-inss-aposentadoria-beneficio',
    'br-financiamento-imobiliario-sac-price',
    'ie-income-tax-take-home',
    'nz-income-tax-take-home',
    'za-income-tax-take-home',
    'ie-mortgage-affordability-stress-test',
    'nz-mortgage-affordability-stress-test',
    'za-home-loan-affordability',
    'nz-kiwisaver-retirement-projection',
    'ie-pension-tax-relief-optimizer',
    'how-much-house-can-i-afford',
    'investment-future-value',
    'net-worth-growth',
  ];
  const canadaPriorityIds = new Set([
    'ca-mortgage-affordability-stress-test',
    'ca-rrsp-vs-tfsa-optimizer',
    'ca-income-tax-take-home',
    'ca-cpp-oas-estimator',
    'ca-cmhc-home-affordability',
  ]);
  const australiaPriorityIds = new Set([
    'au-superannuation-retirement-projection',
    'au-mortgage-offset-savings',
    'au-income-tax-take-home',
    'au-first-home-buyer-affordability',
    'au-negative-gearing-return',
  ]);
  const ukPriorityIds = new Set([
    'uk-mortgage-affordability-stress-test',
    'uk-pension-tax-relief-optimizer',
    'uk-income-tax-ni-take-home',
    'uk-isa-vs-pension-comparison',
    'uk-stamp-duty-first-time-buyer',
  ]);
  const singaporePriorityIds = new Set([
    'sg-cpf-retirement-projection',
    'sg-hdb-loan-affordability',
    'sg-income-tax-take-home',
    'sg-srs-vs-cpf-top-up',
    'sg-buyer-stamp-duty-absd',
  ]);
  const indiaPriorityIds = new Set([
    'in-home-loan-eligibility-emi',
    'in-ppf-epf-retirement-projection',
    'in-income-tax-take-home',
    'in-nps-vs-epf-comparison',
    'in-stamp-duty-registration',
  ]);
  const brazilPriorityIds = new Set([
    'br-salario-liquido-clt-pj',
    'br-irpf-2026',
    'br-fgts-modalidades-saldo',
    'br-inss-aposentadoria-beneficio',
    'br-financiamento-imobiliario-sac-price',
  ]);
  const irelandPriorityIds = new Set([
    'ie-income-tax-take-home',
    'ie-mortgage-affordability-stress-test',
    'ie-pension-tax-relief-optimizer',
  ]);
  const newZealandPriorityIds = new Set([
    'nz-income-tax-take-home',
    'nz-mortgage-affordability-stress-test',
    'nz-kiwisaver-retirement-projection',
  ]);
  const southAfricaPriorityIds = new Set([
    'za-income-tax-take-home',
    'za-home-loan-affordability',
  ]);

  if (!geoRelevantIds.includes(config.id)) {
    return [{ country: undefined, state: undefined, region: undefined, province: undefined, buyerStatus: undefined, flatType: undefined, languageHint: undefined }];
  }

  const variants: { country?: string; state?: string; region?: string; province?: string; buyerStatus?: string; flatType?: string; languageHint?: string }[] = [];
  const otherCountries = HIGH_VALUE_COUNTRIES.filter((country) => country !== 'US');
  const prioritizeUsStates = US_STATE_SENSITIVE_CALCULATOR_IDS.has(config.id);
  const prioritizeAuStates = AUSTRALIA_STATE_SENSITIVE_CALCULATOR_IDS.has(config.id);
  const prioritizedCountries = canadaPriorityIds.has(config.id)
    ? ['CA', ...otherCountries.filter((country) => country !== 'CA')]
    : australiaPriorityIds.has(config.id)
      ? ['AU', ...otherCountries.filter((country) => country !== 'AU')]
      : ukPriorityIds.has(config.id)
        ? ['UK', ...otherCountries.filter((country) => country !== 'UK')]
        : singaporePriorityIds.has(config.id)
          ? ['SG', ...otherCountries.filter((country) => country !== 'SG')]
          : indiaPriorityIds.has(config.id)
            ? ['IN', ...otherCountries.filter((country) => country !== 'IN')]
            : brazilPriorityIds.has(config.id)
              ? ['BR', ...otherCountries.filter((country) => country !== 'BR')]
              : irelandPriorityIds.has(config.id)
                ? ['IE', ...otherCountries.filter((country) => country !== 'IE')]
                : newZealandPriorityIds.has(config.id)
                  ? ['NZ', ...otherCountries.filter((country) => country !== 'NZ')]
                  : southAfricaPriorityIds.has(config.id)
                    ? ['ZA', ...otherCountries.filter((country) => country !== 'ZA')]
              : otherCountries;

  // Expanded 2026 geo-layering: priority US states + high-CPC English markets (AU/CA/UK/NZ/IE/SG) + future non-English (DE/NL/NO)
  US_STATES.forEach((state) => variants.push({ country: 'US', state }));
  if (CANADA_PROVINCE_SENSITIVE_CALCULATOR_IDS.has(config.id)) {
    CANADA_PROVINCES.forEach((province) => variants.push({ country: 'CA', province }));
  }
  if (AUSTRALIA_STATE_SENSITIVE_CALCULATOR_IDS.has(config.id)) {
    AUSTRALIA_STATES.forEach((state) => variants.push({ country: 'AU', state }));
  }
  if (ukPriorityIds.has(config.id)) {
    UK_NATIONS.forEach((region) => variants.push({ country: 'UK', region }));
  }
  if (SINGAPORE_BUYER_STATUS_VARIANT_IDS.has(config.id)) {
    SG_BUYER_STATUSES.forEach((buyerStatus) => {
      if (config.id === 'sg-hdb-loan-affordability') {
        const allowedFlatTypes = SG_NUANCE_DATA[buyerStatus]?.hdbFlatTypes ?? [];
        allowedFlatTypes.forEach((flatType) => variants.push({ country: 'SG', buyerStatus, flatType }));
        return;
      }

      variants.push({ country: 'SG', buyerStatus });
    });
  }
  prioritizedCountries
    .forEach((country) =>
      variants.push({
        country,
        languageHint: NON_ENGLISH_LANGUAGE_HINTS[country],
      }),
    );

  return variants.slice(0, prioritizeUsStates ? getGeoVariantCap(config) : prioritizeAuStates ? 2500 : 2500);
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
    maxVariants: 2400,
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
    maxVariants: 420,
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
    maxVariants: 380,
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
    maxVariants: 1400,
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
    maxVariants: 3400,
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
    maxVariants: 4800,
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
    maxVariants: 2000,
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
    maxVariants: 5600,
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
    maxVariants: 2400,
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
    maxVariants: 2400,
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
    maxVariants: 2400,
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
    maxVariants: 4200,
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
    maxVariants: 2400,
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
    maxVariants: 2200,
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
    maxVariants: 3600,
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
    maxVariants: 4800,
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
    maxVariants: 2600,
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
    maxVariants: 2000,
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
    maxVariants: 7000,
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
    maxVariants: 4400,
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
    maxVariants: 7600,
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
    maxVariants: 2500,
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
  {
    id: 'how-much-house-can-i-afford',
    categorySlug: 'real-estate',
    name: 'How Much House Can I Afford Calculator 2026',
    params: [
      { key: 'annualIncome', label: 'Annual Household Income ($/£)', prefix: '$', step: 5000, values: numberRange(40000, 250000, 5000) },
      { key: 'monthlyDebtPayments', label: 'Monthly Debt Payments (excl. mortgage)', prefix: '$', step: 100, values: numberRange(0, 3000, 100) },
      { key: 'downPayment', label: 'Down Payment Amount', prefix: '$', step: 5000, values: numberRange(0, 100000, 5000) },
      { key: 'interestRate', label: 'Current Mortgage Rate %', prefix: '%', step: 0.25, values: numberRange(4, 8, 0.25) },
      { key: 'loanTermYears', label: 'Loan Term (Years)', step: 5, values: [15, 20, 30] },
      { key: 'propertyTaxRate', label: 'Annual Property Tax Rate %', prefix: '%', step: 0.25, values: numberRange(0.5, 2.5, 0.25) },
      { key: 'homeInsuranceAnnual', label: 'Annual Home Insurance Estimate', prefix: '$', step: 200, values: numberRange(800, 3000, 200) },
    ],
    maxVariants: 5400,
    seoTemplate: {
      title: 'How Much House Can I Afford on {{annualIncome}} Salary? – 2026 Calculator | Plain Figures',
      description: 'Estimate how much house you can afford in 2026 using {{annualIncome}} income, {{monthlyDebtPayments}} monthly debts, {{downPayment}} down payment, {{interestRate}} mortgage rates, {{propertyTaxRate}} property tax, and {{homeInsuranceAnnual}} insurance.',
      h1: 'How Much House Can I Afford on {{annualIncome}} Salary?',
    },
    formula: 'Affordable\\ home \\approx \\frac{(income \\times DTI\\ allowance) - debts - taxes - insurance}{monthly\\ mortgage\\ factor}',
  },
  {
    id: 'social-security-estimator',
    categorySlug: 'retirement',
    name: 'Social Security Benefits Calculator 2026',
    params: [
      { key: 'birthYear', label: 'Birth Year', step: 1, values: numberRange(1955, 2005, 1) },
      { key: 'currentEarnings', label: 'Current Earnings', prefix: '$', step: 5000, values: numberRange(20000, 168600, 5000) },
      { key: 'expectedFutureEarningsGrowth', label: 'Expected Future Earnings Growth %', prefix: '%', step: 0.5, values: numberRange(0, 5, 0.5) },
      { key: 'claimingAge', label: 'Claiming Age', step: 1, values: numberRange(62, 70, 1) },
      { key: 'spousalBenefits', label: 'Spousal Benefits', values: ['single', 'yes', 'no'] },
    ],
    maxVariants: 1800,
    seoTemplate: {
      title: 'Estimate Your 2026 Social Security Benefits – Born {{birthYear}}, Claim at {{claimingAge}} | Plain Figures',
      description: 'Estimate Social Security benefits for someone born in {{birthYear}} with {{currentEarnings}} earnings, {{expectedFutureEarningsGrowth}} growth, claiming at {{claimingAge}}, and {{spousalBenefits}} spousal assumptions.',
      h1: 'Estimate Your 2026 Social Security Benefits – Born {{birthYear}}, Claim at {{claimingAge}}',
    },
    formula: 'Estimated\\ benefit \\approx AIME \\times PIA\\ bend\\ factors \\times claiming\\ age\\ adjustment + spousal\\ adjustment',
  },
  {
    id: 'save-to-millionaire',
    categorySlug: 'savings',
    name: 'Save to Become a Millionaire Calculator 2026',
    params: [
      { key: 'currentSavings', label: 'Current Savings', prefix: '$', step: 5000, values: numberRange(0, 500000, 5000) },
      { key: 'monthlyContribution', label: 'Monthly Contribution', prefix: '$', step: 100, values: numberRange(100, 5000, 100) },
      { key: 'annualReturn', label: 'Annual Return %', prefix: '%', step: 0.5, values: numberRange(4, 12, 0.5) },
      { key: 'currentAge', label: 'Current Age', step: 1, values: numberRange(18, 60, 1) },
      { key: 'targetAge', label: 'Target Age', step: 1, values: numberRange(23, 100, 1) },
      { key: 'inflationRate', label: 'Inflation Rate %', prefix: '%', step: 0.5, values: numberRange(2, 4, 0.5) },
    ],
    maxVariants: 3200,
    seoTemplate: {
      title: 'How to Save $1 Million – Monthly Savings Needed at {{annualReturn}}% Return 2026 | Plain Figures',
      description: 'Model the path to $1 million with {{currentSavings}} saved, {{monthlyContribution}} monthly contributions, {{annualReturn}} returns, age {{currentAge}} to {{targetAge}}, and {{inflationRate}} inflation.',
      h1: 'How to Save $1 Million – Monthly Savings Needed at {{annualReturn}}% Return',
    },
    formula: '1{,}000{,}000 \\approx current\\ savings \\times (1+r)^t + PMT \\times \\frac{(1+r)^t - 1}{r}',
    isValidVariant: (params) => {
      const currentAge = Number(params.currentAge);
      const targetAge = Number(params.targetAge);
      const difference = targetAge - currentAge;

      return difference >= 5 && difference <= 40;
    },
  },
  {
    id: 'debt-payoff-timeline',
    categorySlug: 'debt',
    name: 'Debt Payoff Timeline Calculator with Extra Payments 2026',
    params: [
      { key: 'totalDebt', label: 'Total Debt', prefix: '$', step: 1000, values: numberRange(5000, 100000, 1000) },
      { key: 'averageInterestRate', label: 'Average Interest Rate', prefix: '%', step: 1, values: numberRange(5, 25, 1) },
      { key: 'minimumMonthlyPayment', label: 'Minimum Monthly Payment', prefix: '$', step: 50, values: numberRange(200, 2000, 50) },
      { key: 'extraMonthlyPayment', label: 'Extra Monthly Payment', prefix: '$', step: 50, values: numberRange(0, 1000, 50) },
      { key: 'debtType', label: 'Debt Type', values: ['Credit Card', 'Personal Loan', 'Student Loan', 'Mixed'] },
    ],
    maxVariants: 1800,
    seoTemplate: {
      title: 'Pay Off {{totalDebt}} Debt Faster – Timeline with Extra {{extraMonthlyPayment}}/mo 2026 | Plain Figures',
      description: 'Estimate a payoff timeline for {{totalDebt}} of {{debtType}} debt at {{averageInterestRate}} APR, {{minimumMonthlyPayment}} minimum payments, and {{extraMonthlyPayment}} extra per month.',
      h1: 'Pay Off {{totalDebt}} Debt Faster – Timeline with Extra {{extraMonthlyPayment}}/mo',
    },
    formula: 'Balance_{t+1} = Balance_t \\times (1 + r/12) - (minimum\\ payment + extra\\ payment)',
  },
  {
    id: 'investment-future-value',
    categorySlug: 'investing',
    name: 'Investment Future Value & Growth Calculator 2026',
    params: [
      { key: 'initialInvestment', label: 'Initial Investment', prefix: '$', step: 1000, values: numberRange(1000, 100000, 1000) },
      { key: 'monthlyContribution', label: 'Monthly Contribution', prefix: '$', step: 100, values: numberRange(0, 2000, 100) },
      { key: 'annualReturn', label: 'Annual Return %', prefix: '%', step: 0.5, values: numberRange(3, 12, 0.5) },
      { key: 'years', label: 'Years', step: 1, values: numberRange(5, 40, 1) },
      { key: 'compounding', label: 'Compounding', values: ['monthly', 'quarterly', 'annual'] },
    ],
    maxVariants: 3600,
    seoTemplate: {
      title: '{{initialInvestment}} + {{monthlyContribution}}/mo at {{annualReturn}}% – Future Value in {{years}} Years | Plain Figures',
      description: 'Calculate future value for {{initialInvestment}} invested with {{monthlyContribution}} monthly contributions, {{annualReturn}} returns, {{years}} years, and {{compounding}} compounding.',
      h1: '{{initialInvestment}} + {{monthlyContribution}}/mo at {{annualReturn}}% – Future Value in {{years}} Years',
    },
    formula: 'FV = PV(1 + r/n)^{nt} + PMT \\times \\frac{(1 + r/n)^{nt} - 1}{r/n}',
  },
  {
    id: 'reverse-mortgage-calculator',
    categorySlug: 'retirement',
    name: 'Reverse Mortgage / Home Equity Conversion Calculator 2026',
    params: [
      { key: 'homeValue', label: 'Current Home Value ($/£)', prefix: '$', step: 50000, values: [200000, 300000, 425000, 550000, 700000, 850000, 1000000] },
      { key: 'borrowerAge', label: 'Youngest Borrower Age', step: 5, values: [62, 65, 68, 72, 76, 80, 85, 90, 95] },
      { key: 'interestRate', label: 'Expected Interest Rate %', prefix: '%', step: 0.5, values: [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9] },
      { key: 'payoutType', label: 'Payout Option', values: ['Tenure (monthly payments)', 'Lump Sum', 'Line of Credit', 'Modified Tenure'] },
      { key: 'closingCosts', label: 'Estimated Closing Costs', prefix: '$', step: 2000, values: [2000, 4000, 6000, 8000, 10000, 12500, 15000] },
      { key: 'expectedTenureYears', label: 'Expected Years in Home', step: 5, values: [5, 8, 10, 12, 15, 20, 25] },
    ],
    maxVariants: 2100,
    seoTemplate: {
      title: 'Reverse Mortgage on {{homeValue}} Home - Age {{borrowerAge}} Payout Estimate 2026 | Plain Figures',
      description: 'Estimate reverse-mortgage proceeds on a {{homeValue}} home at age {{borrowerAge}} using {{interestRate}} rates, {{payoutType}} payouts, {{closingCosts}} closing costs, and {{expectedTenureYears}} expected years in the home.',
      h1: 'Reverse Mortgage on {{homeValue}} Home - Age {{borrowerAge}} Payout Estimate',
    },
    formula: 'PL \\approx H \\times f(a,r) - C',
  },
  {
    id: 'passive-income-projector',
    categorySlug: 'investing',
    name: 'Passive Income Stream Projector 2026',
    params: [
      { key: 'currentMonthlyPassive', label: 'Current monthly passive income', prefix: '$', step: 500, values: [0, 250, 500, 1000, 2000, 3500, 5000] },
      { key: 'monthlyInvestment', label: 'Monthly investment', prefix: '$', step: 250, values: [100, 250, 500, 750, 1000, 1500, 2000, 3000] },
      { key: 'annualReturn', label: 'Annual return', prefix: '%', step: 1, values: [4, 5, 6, 7, 8, 9, 10] },
      { key: 'dividendYield', label: 'Dividend yield', prefix: '%', step: 0.5, values: [2, 2.5, 3, 4, 5, 6] },
      { key: 'yearsToGoal', label: 'Years to goal', step: 5, values: [5, 8, 10, 15, 20, 25, 30] },
      { key: 'targetMonthlyPassive', label: 'Target monthly passive income', prefix: '$', step: 500, values: [500, 1000, 2000, 3000, 5000, 7500, 10000] },
    ],
    maxVariants: 3600,
    seoTemplate: {
      title: 'Build {{targetMonthlyPassive}}/mo Passive Income - Monthly Investment Needed 2026 | Plain Figures',
      description: 'Project the path to {{targetMonthlyPassive}} monthly passive income using {{currentMonthlyPassive}} current passive income, {{monthlyInvestment}} monthly investing, {{annualReturn}} returns, {{dividendYield}} yield, and {{yearsToGoal}} years.',
      h1: 'Build {{targetMonthlyPassive}}/mo Passive Income',
    },
    formula: 'I_p \\approx (PV + FV_{contrib}) \\times y / 12',
    isValidVariant: (params) => Number(params.targetMonthlyPassive) >= Number(params.currentMonthlyPassive),
  },
  {
    id: 'credit-utilization-optimizer',
    categorySlug: 'credit',
    name: 'Credit Utilization Optimizer & Score Impact Calculator 2026',
    params: [
      { key: 'totalCreditLimit', label: 'Total credit limit', prefix: '$', step: 10000, values: [5000, 10000, 15000, 25000, 40000, 60000, 80000, 100000] },
      { key: 'currentBalance', label: 'Current balance', prefix: '$', step: 2500, values: [0, 1000, 2500, 5000, 7500, 10000, 15000, 20000, 30000] },
      { key: 'targetUtilization', label: 'Target utilization', prefix: '%', step: 5, values: [0, 5, 10, 15, 20, 25, 30] },
      { key: 'newBalanceAfterPaydown', label: 'New balance after paydown', prefix: '$', step: 2500, values: [0, 500, 1000, 2000, 3000, 5000, 7500, 10000, 15000, 20000] },
      { key: 'numberOfCards', label: 'Number of cards', step: 2, values: [1, 2, 3, 5, 8, 12, 15] },
      { key: 'scoreChangeEstimate', label: 'Estimated score change', step: 10, values: [0, 10, 20, 30, 40, 50, 75, 100] },
    ],
    maxVariants: 3600,
    seoTemplate: {
      title: 'Optimize Credit Utilization from {{currentBalance}} Balance to {{targetUtilization}}% - Score Impact 2026 | Plain Figures',
      description: 'Estimate credit-utilization improvements using {{totalCreditLimit}} total limits, {{currentBalance}} current balances, {{newBalanceAfterPaydown}} balance after paydown, {{targetUtilization}} target utilization, {{numberOfCards}} cards, and {{scoreChangeEstimate}} estimated score change.',
      h1: 'Optimize Credit Utilization - Score Impact Calculator',
    },
    formula: 'U = B / L',
    isValidVariant: (params) => {
      const totalCreditLimit = Number(params.totalCreditLimit);
      const currentBalance = Number(params.currentBalance);
      const newBalanceAfterPaydown = Number(params.newBalanceAfterPaydown);
      const targetUtilization = Number(params.targetUtilization);
      const currentUtilization = totalCreditLimit === 0 ? 0 : (currentBalance / totalCreditLimit) * 100;
      const newUtilization = totalCreditLimit === 0 ? 0 : (newBalanceAfterPaydown / totalCreditLimit) * 100;

      return (
        currentBalance <= totalCreditLimit &&
        newBalanceAfterPaydown <= currentBalance &&
        targetUtilization <= currentUtilization &&
        newUtilization <= targetUtilization
      );
    },
  },
  {
    id: 'emergency-fund-goal',
    categorySlug: 'savings',
    name: 'Emergency Fund Goal & Timeline Calculator 2026',
    params: [
      { key: 'monthlyExpenses', label: 'Monthly expenses', prefix: '$', step: 500, values: [1500, 2000, 2500, 3000, 4000, 5000, 6500, 8000, 10000] },
      { key: 'monthsCoverageGoal', label: 'Months coverage goal', step: 1, values: numberRange(3, 12, 1) },
      { key: 'currentSavings', label: 'Current savings', prefix: '$', step: 5000, values: [0, 1000, 3000, 5000, 10000, 15000, 20000, 30000, 40000, 50000] },
      { key: 'monthlySaveAmount', label: 'Monthly save amount', prefix: '$', step: 250, values: [100, 250, 500, 750, 1000, 1250, 1500, 2000] },
      { key: 'interestRate', label: 'Interest rate', prefix: '%', step: 0.5, values: [3, 3.5, 4, 4.5, 5, 5.5] },
    ],
    maxVariants: 3200,
    seoTemplate: {
      title: 'Build {{monthsCoverageGoal}} Months Emergency Fund ({{monthlyExpenses}}/mo Expenses) - Timeline 2026 | Plain Figures',
      description: 'Estimate the time to build a {{monthsCoverageGoal}}-month emergency fund using {{monthlyExpenses}} monthly expenses, {{currentSavings}} current savings, {{monthlySaveAmount}} monthly saving, and {{interestRate}} interest.',
      h1: 'Build {{monthsCoverageGoal}} Months Emergency Fund - Timeline 2026',
    },
    formula: 'Goal = E \\times m',
  },
  {
    id: 'zero-based-budget-planner',
    categorySlug: 'budget',
    name: 'Zero-Based Budget Planner & Category Allocator 2026',
    params: [
      { key: 'monthlyTakeHome', label: 'Monthly take-home', prefix: '$', step: 1000, values: [2000, 3000, 4000, 5000, 6500, 8000, 10000, 12000] },
      { key: 'fixedExpenses', label: 'Fixed expenses', prefix: '$', step: 500, values: [800, 1200, 1600, 2000, 2500, 3000, 3500, 4000] },
      { key: 'variableExpenses', label: 'Variable expenses', prefix: '$', step: 500, values: [500, 800, 1000, 1500, 2000, 2500, 3000] },
      { key: 'debtPayments', label: 'Debt payments', prefix: '$', step: 250, values: [0, 100, 250, 500, 750, 1000, 1250, 1500] },
      { key: 'savingsGoal', label: 'Savings goal', prefix: '$', step: 250, values: [200, 400, 600, 800, 1000, 1500, 2000] },
      { key: 'funMoney', label: 'Fun money', prefix: '$', step: 250, values: [100, 200, 300, 500, 750, 1000] },
    ],
    maxVariants: 2000,
    seoTemplate: {
      title: 'Zero-Based Budget on {{monthlyTakeHome}}/mo Take-Home - Allocate Every Dollar 2026 | Plain Figures',
      description: 'Build a zero-based budget using {{monthlyTakeHome}} take-home pay, {{fixedExpenses}} fixed costs, {{variableExpenses}} variable spending, {{debtPayments}} debt payments, {{savingsGoal}} savings, and {{funMoney}} fun money.',
      h1: 'Zero-Based Budget on {{monthlyTakeHome}}/mo Take-Home',
    },
    formula: 'T = F + V + D + S + U',
    isValidVariant: (params) => {
      const totalAllocated =
        Number(params.fixedExpenses) +
        Number(params.variableExpenses) +
        Number(params.debtPayments) +
        Number(params.savingsGoal) +
        Number(params.funMoney);

      return totalAllocated <= Number(params.monthlyTakeHome);
    },
  },
  {
    id: 'reverse-mortgage-line-of-credit',
    categorySlug: 'retirement',
    name: 'Reverse Mortgage Line of Credit Growth Calculator 2026',
    params: [
      { key: 'homeValue', label: 'Current Home Value ($/£)', prefix: '$', step: 50000, values: [250000, 350000, 500000, 650000, 800000, 1000000, 1200000] },
      { key: 'borrowerAge', label: 'Youngest Borrower Age', step: 5, values: [62, 65, 68, 72, 76, 80, 85, 90, 95] },
      { key: 'interestRate', label: 'Expected Interest Rate %', prefix: '%', step: 0.5, values: [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5] },
      { key: 'initialLineAmount', label: 'Initial Line of Credit Amount', prefix: '$', step: 50000, values: [50000, 100000, 150000, 200000, 300000, 400000, 500000] },
      { key: 'unusedGrowthRate', label: 'Annual Unused Line Growth %', prefix: '%', step: 1, values: [3, 3.5, 4, 4.5, 5, 6, 7] },
      { key: 'expectedTenureYears', label: 'Expected Years in Home', step: 5, values: [5, 8, 10, 12, 15, 20, 25] },
    ],
    maxVariants: 2100,
    seoTemplate: {
      title: 'Reverse Mortgage Line of Credit Growth on {{homeValue}} Home - Age {{borrowerAge}} 2026 | Plain Figures',
      description: 'Project reverse-mortgage line-of-credit growth for a {{homeValue}} home at age {{borrowerAge}} using {{interestRate}} rates, {{initialLineAmount}} initial line size, {{unusedGrowthRate}} unused-line growth, and {{expectedTenureYears}} years in the home.',
      h1: 'Reverse Mortgage Line of Credit Growth on {{homeValue}} Home - Age {{borrowerAge}}',
    },
    formula: 'LOC_t \\approx L_0(1+g)^t - B_t(1+r)^t',
  },
  {
    id: 'passive-income-scaling',
    categorySlug: 'investing',
    name: 'Passive Income Scaling & Multiple Streams Calculator 2026',
    params: [
      { key: 'currentPassiveMonthly', label: 'Current passive monthly income', prefix: '$', step: 500, values: [0, 100, 250, 500, 1000, 2000, 3000] },
      { key: 'monthlyInvestmentPerStream', label: 'Monthly investment per stream', prefix: '$', step: 250, values: [50, 100, 250, 500, 750, 1000, 1500] },
      { key: 'numberOfStreams', label: 'Number of streams', step: 1, values: numberRange(1, 8, 1) },
      { key: 'averageStreamReturn', label: 'Average stream return', prefix: '%', step: 1, values: [4, 5, 6, 7, 8, 10, 12] },
      { key: 'yearsToScale', label: 'Years to scale', step: 3, values: [3, 5, 8, 10, 12, 15, 20] },
      { key: 'targetPassiveMonthly', label: 'Target passive monthly income', prefix: '$', step: 1000, values: [1000, 2000, 3000, 5000, 8000, 12000, 16000, 20000] },
    ],
    maxVariants: 2000,
    seoTemplate: {
      title: 'Scale to {{targetPassiveMonthly}}/mo Passive Income with {{numberOfStreams}} Streams - 2026 Plan | Plain Figures',
      description: 'Project passive-income scaling using {{currentPassiveMonthly}} current income, {{monthlyInvestmentPerStream}} invested per stream, {{numberOfStreams}} streams, {{averageStreamReturn}} returns, and {{yearsToScale}} years to reach {{targetPassiveMonthly}} monthly.',
      h1: 'Scale to {{targetPassiveMonthly}}/mo Passive Income with {{numberOfStreams}} Streams',
    },
    formula: 'I_t \\approx n \\times \\left(PMT\\frac{(1+r)^t-1}{r}\\right) \\times y / 12',
    isValidVariant: (params) => Number(params.targetPassiveMonthly) >= Number(params.currentPassiveMonthly),
  },
  {
    id: 'credit-rebuild-timeline',
    categorySlug: 'credit',
    name: 'Credit Rebuild Timeline & Score Improvement Calculator 2026',
    params: [
      { key: 'currentScore', label: 'Current score', step: 50, values: [300, 350, 400, 450, 500, 550, 600, 650] },
      { key: 'targetScore', label: 'Target score', step: 20, values: [500, 550, 600, 650, 700, 750, 800] },
      { key: 'monthsToGoal', label: 'Months to goal', step: 3, values: [3, 6, 9, 12, 18, 24, 30, 36] },
      { key: 'paydownPercentMonthly', label: 'Paydown percent monthly', prefix: '%', step: 10, values: [10, 20, 30, 40, 50, 75, 100] },
      { key: 'newAccountsOpened', label: 'New accounts opened', step: 1, values: [0, 1, 2, 3] },
      { key: 'derogatoryMarksAgeMonths', label: 'Derogatory marks age months', step: 12, values: [0, 12, 24, 36, 48, 60, 72, 84] },
    ],
    maxVariants: 1800,
    seoTemplate: {
      title: 'Rebuild Credit from {{currentScore}} to {{targetScore}} - Timeline & Steps 2026 | Plain Figures',
      description: 'Estimate a credit rebuild path from {{currentScore}} to {{targetScore}} using {{monthsToGoal}} months, {{paydownPercentMonthly}} monthly paydown, {{newAccountsOpened}} new accounts, and derogatory marks aged {{derogatoryMarksAgeMonths}} months.',
      h1: 'Rebuild Credit from {{currentScore}} to {{targetScore}}',
    },
    formula: '\\Delta S \\approx p \\times t - a - d',
    isValidVariant: (params) => Number(params.targetScore) > Number(params.currentScore),
  },
  {
    id: 'emergency-fund-with-interest',
    categorySlug: 'savings',
    name: 'Emergency Fund with Interest & Investment Calculator 2026',
    params: [
      { key: 'monthlyExpenses', label: 'Monthly expenses', prefix: '$', step: 500, values: [1500, 2000, 2500, 3000, 4000, 5000, 7000, 9000, 12000] },
      { key: 'monthsGoal', label: 'Months goal', step: 1, values: numberRange(3, 12, 1) },
      { key: 'currentSavings', label: 'Current savings', prefix: '$', step: 5000, values: [0, 1000, 3000, 5000, 10000, 15000, 25000, 40000, 60000] },
      { key: 'monthlySave', label: 'Monthly save amount', prefix: '$', step: 500, values: [100, 250, 500, 750, 1000, 1500, 2000, 3000] },
      { key: 'savingsRate', label: 'Savings rate', prefix: '%', step: 0.5, values: [3.5, 4, 4.5, 5, 5.5] },
      { key: 'investmentRateIfHigherRisk', label: 'Higher-risk investment rate', prefix: '%', step: 1, values: [5, 6, 7, 8, 9] },
    ],
    maxVariants: 1900,
    seoTemplate: {
      title: 'Emergency Fund Goal: {{monthsGoal}} Months of {{monthlyExpenses}}/mo - With Interest 2026 | Plain Figures',
      description: 'Compare emergency-fund growth using {{monthlyExpenses}} monthly expenses, a {{monthsGoal}}-month goal, {{currentSavings}} current savings, {{monthlySave}} monthly saving, {{savingsRate}} savings interest, and {{investmentRateIfHigherRisk}} higher-risk growth.',
      h1: 'Emergency Fund Goal: {{monthsGoal}} Months of {{monthlyExpenses}}/mo - With Interest',
    },
    formula: 'FV = S_0(1+r)^t + PMT\\frac{(1+r)^t-1}{r}',
  },
  {
    id: 'zero-based-budget-debt-snowball',
    categorySlug: 'budget',
    name: 'Zero-Based Budget with Debt Snowball Calculator 2026',
    params: [
      { key: 'monthlyTakeHome', label: 'Monthly take-home', prefix: '$', step: 1000, values: [2000, 3000, 4500, 6000, 8000, 10000, 12500, 15000] },
      { key: 'fixedExpenses', label: 'Fixed expenses', prefix: '$', step: 500, values: [800, 1200, 1800, 2500, 3200, 4000, 5000] },
      { key: 'variableExpenses', label: 'Variable expenses', prefix: '$', step: 500, values: [500, 800, 1200, 1800, 2400, 3000, 4000] },
      { key: 'debtBalances', label: 'Total debt balances', prefix: '$', step: 5000, values: [1000, 5000, 10000, 20000, 30000, 40000, 50000] },
      { key: 'minimumDebtPayments', label: 'Minimum debt payments', prefix: '$', step: 250, values: [50, 100, 250, 500, 750, 1000] },
      { key: 'extraToDebt', label: 'Extra to debt', prefix: '$', step: 250, values: [100, 250, 500, 750, 1000, 1500, 2000] },
    ],
    maxVariants: 2000,
    seoTemplate: {
      title: 'Zero-Based Budget + Debt Snowball on {{monthlyTakeHome}}/mo - Pay Off Debts 2026 | Plain Figures',
      description: 'Allocate a zero-based budget with debt snowball using {{monthlyTakeHome}} take-home pay, {{fixedExpenses}} fixed costs, {{variableExpenses}} variable spending, {{debtBalances}} debt balances, {{minimumDebtPayments}} minimum debt payments, and {{extraToDebt}} extra debt payoff.',
      h1: 'Zero-Based Budget + Debt Snowball on {{monthlyTakeHome}}/mo',
    },
    formula: 'T = F + V + D_{min} + D_{extra}',
    isValidVariant: (params) => {
      const totalAllocated =
        Number(params.fixedExpenses) +
        Number(params.variableExpenses) +
        Number(params.minimumDebtPayments) +
        Number(params.extraToDebt);

      return totalAllocated <= Number(params.monthlyTakeHome);
    },
  },
  {
    id: 'reverse-mortgage-payout',
    categorySlug: 'retirement',
    name: 'Reverse Mortgage Payout & Monthly Income Estimator 2026',
    params: [
      { key: 'homeValue', label: 'Current Home Value ($/£)', prefix: '$', step: 50000, values: [200000, 300000, 425000, 550000, 700000, 850000, 1000000, 1200000] },
      { key: 'borrowerAge', label: 'Youngest Borrower Age', step: 5, values: [62, 65, 68, 72, 76, 80, 85, 90, 95] },
      { key: 'interestRate', label: 'Expected Interest Rate %', prefix: '%', step: 0.5, values: [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5] },
      { key: 'payoutOption', label: 'Payout Option', values: ['Tenure Monthly', 'Lump Sum', 'Line of Credit', 'Modified Tenure'] },
      { key: 'closingCostsPercent', label: 'Closing Costs % of Value', prefix: '%', step: 0.5, values: [1, 1.5, 2, 2.5, 3, 4, 5] },
      { key: 'homeAppreciation', label: 'Annual Home Appreciation %', prefix: '%', step: 1, values: [1, 2, 3, 4, 5, 6] },
    ],
    maxVariants: 2100,
    seoTemplate: {
      title: 'Reverse Mortgage Monthly Payout on {{homeValue}} Home - Age {{borrowerAge}} 2026 | Plain Figures',
      description: 'Estimate reverse-mortgage payout value on a {{homeValue}} home at age {{borrowerAge}} using {{interestRate}} rates, {{payoutOption}} payouts, {{closingCostsPercent}} closing costs, and {{homeAppreciation}} home appreciation assumptions.',
      h1: 'Reverse Mortgage Monthly Payout on {{homeValue}} Home - Age {{borrowerAge}}',
    },
    formula: 'PL \\approx H \\times f(a,r) - H \\times c',
  },
  {
    id: 'passive-income-reinvestment',
    categorySlug: 'investing',
    name: 'Passive Income with Reinvestment & Compounding Calculator 2026',
    params: [
      { key: 'initialPassiveMonthly', label: 'Initial passive monthly income', prefix: '$', step: 250, values: [0, 100, 250, 500, 750, 1000, 1500, 2000] },
      { key: 'monthlyReinvestment', label: 'Monthly reinvestment', prefix: '$', step: 100, values: [50, 100, 250, 500, 750, 1000] },
      { key: 'annualYield', label: 'Annual yield', prefix: '%', step: 0.5, values: [3, 3.5, 4, 5, 6, 7, 8] },
      { key: 'compoundingFrequency', label: 'Compounding frequency', values: ['monthly', 'quarterly', 'annual'] },
      { key: 'years', label: 'Years', step: 5, values: [5, 8, 10, 12, 15, 20, 25] },
      { key: 'targetPassiveMonthly', label: 'Target passive monthly income', prefix: '$', step: 1000, values: [1000, 2000, 3000, 5000, 8000, 12000, 15000] },
    ],
    maxVariants: 2000,
    seoTemplate: {
      title: 'Grow {{initialPassiveMonthly}}/mo Passive Income with Reinvestment - {{years}} Year Projection 2026 | Plain Figures',
      description: 'Project passive-income growth using {{initialPassiveMonthly}} monthly income, {{monthlyReinvestment}} reinvested each month, {{annualYield}} yield, {{compoundingFrequency}} compounding, and a {{years}} year horizon toward {{targetPassiveMonthly}} monthly.',
      h1: 'Grow {{initialPassiveMonthly}}/mo Passive Income with Reinvestment',
    },
    formula: 'I_t \\approx (I_0 + PMT\\frac{(1+r/n)^{nt}-1}{r/n}) \\times y / 12',
    isValidVariant: (params) => Number(params.targetPassiveMonthly) >= Number(params.initialPassiveMonthly),
  },
  {
    id: 'credit-score-rebuild-path',
    categorySlug: 'credit',
    name: 'Credit Score Rebuild Path & Timeline Calculator 2026',
    params: [
      { key: 'startingScore', label: 'Starting score', step: 50, values: [400, 450, 500, 550, 600, 650, 700] },
      { key: 'targetScore', label: 'Target score', step: 25, values: [500, 550, 600, 650, 700, 750, 800] },
      { key: 'monthlyPaydownPercent', label: 'Monthly paydown percent', prefix: '%', step: 10, values: [10, 20, 30, 40, 50, 75, 100] },
      { key: 'derogatoryRemovalMonths', label: 'Derogatory removal months', step: 12, values: [0, 12, 24, 36, 48, 60, 72, 84] },
      { key: 'newPositiveAccounts', label: 'New positive accounts', step: 1, values: [0, 1, 2, 3, 4, 5] },
      { key: 'utilizationDropTarget', label: 'Utilization drop target', prefix: '%', step: 5, values: [0, 5, 10, 15, 20, 25, 30] },
    ],
    maxVariants: 1800,
    seoTemplate: {
      title: 'Rebuild Credit from {{startingScore}} to {{targetScore}} - Path & Timeline 2026 | Plain Figures',
      description: 'Estimate a credit rebuild path from {{startingScore}} to {{targetScore}} using {{monthlyPaydownPercent}} monthly paydown, {{derogatoryRemovalMonths}} months to derogatory removal, {{newPositiveAccounts}} new positive accounts, and a {{utilizationDropTarget}} utilization target.',
      h1: 'Rebuild Credit from {{startingScore}} to {{targetScore}}',
    },
    formula: '\\Delta S \\approx p + u + a + d',
    isValidVariant: (params) => Number(params.targetScore) > Number(params.startingScore),
  },
  {
    id: 'tiered-emergency-fund',
    categorySlug: 'savings',
    name: 'Tiered Emergency Fund Goal Calculator 2026',
    params: [
      { key: 'monthlyExpenses', label: 'Monthly expenses', prefix: '$', step: 500, values: [1500, 2000, 2500, 3000, 4000, 5000, 7000, 9000, 12000] },
      { key: 'tierLevel', label: 'Goal tier', values: ['Basic (3 mo)', 'Enhanced (6 mo)', 'Premium (9-12 mo)'] },
      { key: 'currentSavings', label: 'Current savings', prefix: '$', step: 5000, values: [0, 1000, 3000, 5000, 10000, 20000, 40000, 60000, 80000] },
      { key: 'monthlySave', label: 'Monthly save amount', prefix: '$', step: 500, values: [100, 250, 500, 750, 1000, 1500, 2000, 3000, 4000] },
      { key: 'highYieldRate', label: 'High-yield savings rate', prefix: '%', step: 0.5, values: [4, 4.25, 4.5, 5, 5.25, 5.5] },
    ],
    maxVariants: 1900,
    seoTemplate: {
      title: '{{tierLevel}} Emergency Fund Goal for {{monthlyExpenses}}/mo Expenses - Timeline 2026 | Plain Figures',
      description: 'Estimate an emergency-fund timeline using {{monthlyExpenses}} monthly expenses, the {{tierLevel}} target, {{currentSavings}} current savings, {{monthlySave}} monthly saving, and {{highYieldRate}} high-yield interest.',
      h1: '{{tierLevel}} Emergency Fund Goal for {{monthlyExpenses}}/mo Expenses',
    },
    formula: 'Goal = E \\times m_{tier}',
  },
  {
    id: 'zero-based-budget-sinking-funds',
    categorySlug: 'budget',
    name: 'Zero-Based Budget with Sinking Funds Calculator 2026',
    params: [
      { key: 'monthlyTakeHome', label: 'Monthly take-home', prefix: '$', step: 1000, values: [2000, 3000, 4500, 6000, 8000, 10000, 13000, 16000] },
      { key: 'fixedExpenses', label: 'Fixed expenses', prefix: '$', step: 500, values: [800, 1200, 1800, 2500, 3200, 4000, 5000, 6000] },
      { key: 'variableExpenses', label: 'Variable expenses', prefix: '$', step: 500, values: [500, 800, 1200, 1800, 2500, 3200, 4000, 5000] },
      { key: 'sinkingFundGoals', label: 'Sinking fund goals', prefix: '$', step: 1000, values: [500, 1000, 2500, 5000, 7500, 10000] },
      { key: 'debtMinimums', label: 'Debt minimums', prefix: '$', step: 500, values: [0, 100, 250, 500, 1000, 1500, 2000] },
      { key: 'extraToDebtOrSavings', label: 'Extra to debt or savings', prefix: '$', step: 500, values: [100, 250, 500, 1000, 1500, 2000, 3000] },
    ],
    maxVariants: 2000,
    seoTemplate: {
      title: 'Zero-Based Budget + Sinking Funds on {{monthlyTakeHome}}/mo - Cover Irregular Expenses 2026 | Plain Figures',
      description: 'Build a zero-based budget using {{monthlyTakeHome}} income, {{fixedExpenses}} fixed costs, {{variableExpenses}} variable spending, {{sinkingFundGoals}} sinking-fund goals, {{debtMinimums}} debt minimums, and {{extraToDebtOrSavings}} extra cash allocation.',
      h1: 'Zero-Based Budget + Sinking Funds on {{monthlyTakeHome}}/mo',
    },
    formula: 'T = F + V + SF + D + X',
    isValidVariant: (params) => {
      const totalAllocated =
        Number(params.fixedExpenses) +
        Number(params.variableExpenses) +
        Number(params.debtMinimums) +
        Number(params.extraToDebtOrSavings);

      return totalAllocated <= Number(params.monthlyTakeHome);
    },
  },
  {
    id: 'ca-mortgage-affordability-stress-test',
    categorySlug: 'mortgages',
    name: 'Canadian Mortgage Affordability & Stress Test Calculator 2026',
    params: [
      { key: 'annualIncome', label: 'Annual Household Income (CAD)', prefix: '$', step: 10000, values: [40000, 60000, 80000, 100000, 125000, 150000, 200000, 250000] },
      { key: 'monthlyDebtPayments', label: 'Monthly Debt Payments (excl. mortgage)', prefix: '$', step: 500, values: [0, 250, 500, 1000, 1500, 2000, 2500, 3000] },
      { key: 'downPayment', label: 'Down Payment Amount (CAD)', prefix: '$', step: 25000, values: [0, 5000, 10000, 20000, 35000, 50000, 100000, 150000, 200000] },
      { key: 'qualifyingRate', label: 'Stress Test / Qualifying Rate %', prefix: '%', step: 0.5, values: [5.25, 5.5, 6, 6.5, 7, 7.5, 8] },
      { key: 'amortizationYears', label: 'Amortization Period (Years)', step: 5, values: [15, 20, 25, 30] },
      { key: 'propertyTaxesAnnual', label: 'Annual Property Taxes (CAD)', prefix: '$', step: 1000, values: [2000, 3000, 4000, 5000, 6500, 8000, 10000] },
      { key: 'heatingCostsMonthly', label: 'Monthly Heating Costs (CAD)', prefix: '$', step: 50, values: [50, 75, 100, 150, 200, 250, 300] },
    ],
    maxVariants: 4200,
    seoTemplate: {
      title: 'How Much Mortgage Can I Afford in Canada? Stress Test on {{annualIncome}} Income - 2026 | Plain Figures',
      description: 'Estimate Canadian mortgage affordability using {{annualIncome}} household income, {{monthlyDebtPayments}} debts, {{downPayment}} down payment, {{qualifyingRate}} stress-test rate, {{amortizationYears}}-year amortization, {{propertyTaxesAnnual}} taxes, and {{heatingCostsMonthly}} heating costs.',
      h1: 'How Much Mortgage Can I Afford in Canada? Stress Test on {{annualIncome}} Income',
    },
    formula: 'M_{max} \\approx \\frac{(I-D) \\times ratio}{factor(r,n)}',
  },
  {
    id: 'ca-rrsp-vs-tfsa-optimizer',
    categorySlug: 'retirement',
    name: 'RRSP vs TFSA Contribution Optimizer Calculator 2026',
    params: [
      { key: 'currentTaxBracket', label: 'Current Marginal Tax Rate %', prefix: '%', step: 5, values: [15, 20, 25, 30, 35, 40, 45, 50, 53] },
      { key: 'expectedRetirementBracket', label: 'Expected Retirement Marginal Tax Rate %', prefix: '%', step: 5, values: [15, 20, 25, 30, 35, 40, 45, 50, 53] },
      { key: 'annualContribution', label: 'Annual Contribution Amount (CAD)', prefix: '$', step: 2500, values: [1000, 2500, 5000, 7500, 10000, 15000, 20000, 25000, 30000] },
      { key: 'yearsToRetirement', label: 'Years Until Retirement', step: 5, values: [5, 10, 15, 20, 25, 30, 35] },
      { key: 'investmentReturn', label: 'Expected Annual Return %', prefix: '%', step: 1, values: [4, 5, 6, 7, 8, 9] },
    ],
    maxVariants: 2000,
    seoTemplate: {
      title: 'RRSP vs TFSA: Which is Better for {{annualContribution}}/yr Contribution in 2026? | Plain Figures',
      description: 'Compare RRSP and TFSA outcomes using a {{annualContribution}} annual contribution, {{currentTaxBracket}} current tax rate, {{expectedRetirementBracket}} retirement tax rate, {{yearsToRetirement}} years to retirement, and {{investmentReturn}} annual return.',
      h1: 'RRSP vs TFSA: Which is Better for {{annualContribution}}/yr Contribution?',
    },
    formula: 'FV \\approx C\\frac{(1+r)^t-1}{r}',
  },
  {
    id: 'ca-income-tax-take-home',
    categorySlug: 'tax',
    name: 'Canadian Income Tax & Take-Home Pay Calculator 2026',
    params: [
      { key: 'grossSalary', label: 'Annual Gross Salary (CAD)', prefix: '$', step: 10000, values: [30000, 40000, 50000, 65000, 80000, 100000, 125000, 150000, 200000, 250000] },
      { key: 'province', label: 'Province/Territory', values: ['ON', 'QC', 'BC', 'AB', 'MB', 'SK', 'NS', 'NB', 'NL', 'PE', 'YT', 'NT', 'NU'] },
      { key: 'rrspContribution', label: 'RRSP Contribution (CAD)', prefix: '$', step: 2500, values: [0, 1000, 2500, 5000, 10000, 15000, 20000, 25000, 30000] },
      { key: 'otherDeductions', label: 'Other Deductions (union, childcare, etc.)', prefix: '$', step: 500, values: [0, 500, 1000, 2000, 3000, 4000, 5000] },
      { key: 'payFrequency', label: 'Pay Frequency', values: ['Annual', 'Monthly', 'Bi-weekly', 'Weekly'] },
    ],
    maxVariants: 4400,
    seoTemplate: {
      title: '{{grossSalary}} Salary After Tax in {{province}} Canada - 2026 Take-Home Pay | Plain Figures',
      description: 'Estimate Canadian take-home pay for {{grossSalary}} in {{province}} using {{rrspContribution}} RRSP contributions, {{otherDeductions}} other deductions, and {{payFrequency}} pay frequency.',
      h1: '{{grossSalary}} Salary After Tax in {{province}} Canada',
    },
    formula: '\\text{Net pay} = \\text{gross} - \\text{federal tax} - \\text{provincial tax} - \\text{CPP} - \\text{EI} - \\text{deductions}',
  },
  {
    id: 'ca-cpp-oas-estimator',
    categorySlug: 'retirement',
    name: 'CPP & OAS Retirement Income Estimator 2026',
    params: [
      { key: 'birthYear', label: 'Birth Year', step: 10, values: [1950, 1955, 1960, 1965, 1970, 1980, 1990, 2000, 2005] },
      { key: 'averageEarnings', label: 'Average Annual Pensionable Earnings (CAD)', prefix: '$', step: 10000, values: [20000, 30000, 40000, 50000, 60000, 70000, 80000] },
      { key: 'yearsContributed', label: 'Years Contributed to CPP', step: 5, values: [10, 15, 20, 25, 30, 35, 40, 47] },
      { key: 'claimingAgeCPP', label: 'CPP Claiming Age', step: 5, values: [60, 65, 70] },
      { key: 'oasClaimingAge', label: 'OAS Claiming Age', step: 5, values: [65, 70] },
    ],
    maxVariants: 1800,
    seoTemplate: {
      title: 'Estimate CPP & OAS Income - Born {{birthYear}}, Claim at {{claimingAgeCPP}} - 2026 Canada | Plain Figures',
      description: 'Estimate CPP and OAS income in Canada using birth year {{birthYear}}, {{averageEarnings}} average pensionable earnings, {{yearsContributed}} years of CPP contributions, CPP claimed at {{claimingAgeCPP}}, and OAS at {{oasClaimingAge}}.',
      h1: 'Estimate CPP & OAS Income - Born {{birthYear}}, Claim at {{claimingAgeCPP}}',
    },
    formula: 'Benefit \\approx APE \\times years \\times age\\ adjustment',
    isValidVariant: (params) => Number(params.oasClaimingAge) >= 65,
  },
  {
    id: 'ca-cmhc-home-affordability',
    categorySlug: 'mortgages',
    name: 'CMHC-Insured Home Affordability Calculator 2026',
    params: [
      { key: 'annualIncome', label: 'Annual Household Income (CAD)', prefix: '$', step: 10000, values: [40000, 60000, 80000, 100000, 125000, 150000, 175000, 200000] },
      { key: 'downPayment', label: 'Down Payment (CAD)', prefix: '$', step: 10000, values: [0, 2500, 5000, 10000, 20000, 35000, 50000, 75000, 100000] },
      { key: 'mortgageRate', label: 'Mortgage Rate %', prefix: '%', step: 0.5, values: [4, 4.5, 5, 5.5, 6, 6.5, 7] },
      { key: 'amortizationYears', label: 'Amortization Period (Years)', step: 5, values: [25, 30] },
      { key: 'propertyTaxesAnnual', label: 'Annual Property Taxes (CAD)', prefix: '$', step: 1000, values: [2000, 3000, 4000, 5000, 6500, 8000] },
      { key: 'heatingCostsMonthly', label: 'Monthly Heating Costs (CAD)', prefix: '$', step: 50, values: [50, 75, 100, 150, 200, 250, 300] },
    ],
    maxVariants: 2000,
    seoTemplate: {
      title: 'CMHC-Insured Home Affordability on {{annualIncome}} Income - 2026 Canada | Plain Figures',
      description: 'Estimate CMHC-insured home affordability using {{annualIncome}} income, {{downPayment}} down payment, {{mortgageRate}} mortgage rate, {{amortizationYears}}-year amortization, {{propertyTaxesAnnual}} taxes, and {{heatingCostsMonthly}} heating costs.',
      h1: 'CMHC-Insured Home Affordability on {{annualIncome}} Income',
    },
    formula: 'P_{max} \\approx M_{qualifying} + DP',
  },
  {
    id: 'au-superannuation-retirement-projection',
    categorySlug: 'retirement',
    name: 'Superannuation Retirement Balance Projector 2026',
    params: [
      { key: 'currentSuperBalance', label: 'Current Super Balance (AUD)', prefix: '$', step: 25000, values: [0, 10000, 25000, 50000, 100000, 200000, 350000, 500000] },
      { key: 'annualContribution', label: 'Annual Concessional Contribution (AUD)', prefix: '$', step: 2500, values: [5000, 7500, 10000, 12500, 15000, 20000, 25000, 30000] },
      { key: 'age', label: 'Current Age', step: 5, values: [25, 30, 35, 40, 45, 50, 55, 60, 65] },
      { key: 'expectedReturn', label: 'Expected Annual Return %', prefix: '%', step: 0.5, values: [4, 4.5, 5, 6, 7, 8, 9] },
      { key: 'retirementAge', label: 'Planned Retirement Age', step: 2, values: [60, 62, 65, 67, 70] },
      { key: 'insuranceFeesAnnual', label: 'Annual Insurance/Fees in Super (AUD)', prefix: '$', step: 250, values: [200, 400, 600, 800, 1000, 1250, 1500] },
    ],
    maxVariants: 4200,
    seoTemplate: {
      title: 'Project Super Balance at Retirement - Age {{age}}, {{currentSuperBalance}} Current - 2026 Australia | Plain Figures',
      description: 'Project Australian superannuation at retirement using {{currentSuperBalance}} current balance, {{annualContribution}} annual contributions, age {{age}}, {{expectedReturn}} returns, retirement at {{retirementAge}}, and {{insuranceFeesAnnual}} annual super fees.',
      h1: 'Project Super Balance at Retirement - Age {{age}}, {{currentSuperBalance}} Current',
    },
    formula: 'FV = B(1+r)^t + C\\frac{(1+r)^t-1}{r} - F\\frac{(1+r)^t-1}{r}',
    isValidVariant: (params) => Number(params.retirementAge) > Number(params.age),
  },
  {
    id: 'au-mortgage-offset-savings',
    categorySlug: 'mortgages',
    name: 'Mortgage Offset Account Savings Calculator 2026',
    params: [
      { key: 'mortgageBalance', label: 'Current Mortgage Balance (AUD)', prefix: '$', step: 50000, values: [200000, 300000, 400000, 500000, 600000, 700000, 800000] },
      { key: 'interestRate', label: 'Mortgage Interest Rate %', prefix: '%', step: 0.5, values: [4.5, 5, 5.5, 6, 6.5, 7, 7.5] },
      { key: 'offsetBalance', label: 'Offset Account Balance (AUD)', prefix: '$', step: 25000, values: [10000, 25000, 50000, 75000, 100000, 150000, 200000] },
      { key: 'monthlyOffsetDeposit', label: 'Monthly Deposit to Offset (AUD)', prefix: '$', step: 500, values: [500, 750, 1000, 1500, 2000, 2500, 3000] },
      { key: 'remainingTermYears', label: 'Remaining Mortgage Term (Years)', step: 5, values: [10, 15, 20, 25, 30] },
    ],
    maxVariants: 4000,
    seoTemplate: {
      title: 'Mortgage Offset Savings on {{mortgageBalance}} Loan - {{offsetBalance}} Balance 2026 Australia | Plain Figures',
      description: 'Estimate Australian offset-account savings using {{mortgageBalance}} mortgage balance, {{interestRate}} interest, {{offsetBalance}} in the offset account, {{monthlyOffsetDeposit}} monthly offset deposits, and {{remainingTermYears}} years remaining.',
      h1: 'Mortgage Offset Savings on {{mortgageBalance}} Loan - {{offsetBalance}} Balance',
    },
    formula: 'I_{saved} \\approx (B-O)r - Br',
    isValidVariant: (params) => Number(params.offsetBalance) < Number(params.mortgageBalance),
  },
  {
    id: 'au-income-tax-take-home',
    categorySlug: 'tax',
    name: 'Australian Income Tax & Take-Home Pay Calculator 2026',
    params: [
      { key: 'grossSalary', label: 'Annual Gross Salary (AUD)', prefix: '$', step: 10000, values: [40000, 50000, 65000, 80000, 100000, 125000, 150000, 200000, 250000] },
      { key: 'taxResident', label: 'Tax Residency Status', values: ['Resident', 'Non-Resident'] },
      { key: 'superContribution', label: 'Concessional Super Contribution (AUD)', prefix: '$', step: 2500, values: [0, 2500, 5000, 10000, 15000, 20000, 25000, 27500] },
      { key: 'otherDeductions', label: 'Other Tax Deductions (work-related, etc.)', prefix: '$', step: 1000, values: [0, 500, 1000, 2500, 5000, 7500, 10000] },
      { key: 'payFrequency', label: 'Pay Frequency', values: ['Annual', 'Monthly', 'Fortnightly', 'Weekly'] },
    ],
    maxVariants: 4400,
    seoTemplate: {
      title: '{{grossSalary}} Salary After Tax Australia - 2026 Take-Home Pay | Plain Figures',
      description: 'Estimate Australian take-home pay for {{grossSalary}} using {{taxResident}} tax residency, {{superContribution}} concessional super contributions, {{otherDeductions}} deductions, and {{payFrequency}} pay frequency.',
      h1: '{{grossSalary}} Salary After Tax Australia',
    },
    formula: '\\text{Net pay} = \\text{gross} - \\text{income tax} - \\text{Medicare levy} - \\text{deductions}',
  },
  {
    id: 'au-first-home-buyer-affordability',
    categorySlug: 'mortgages',
    name: 'First-Home Buyer Affordability & Grant Calculator 2026',
    params: [
      { key: 'annualIncome', label: 'Annual Household Income (AUD)', prefix: '$', step: 10000, values: [50000, 65000, 80000, 100000, 125000, 150000, 175000, 200000] },
      { key: 'downPayment', label: 'Deposit / Savings (AUD)', prefix: '$', step: 10000, values: [10000, 20000, 30000, 50000, 75000, 100000, 125000, 150000] },
      { key: 'state', label: 'State/Territory', values: ['NSW', 'VIC', 'QLD', 'SA', 'WA', 'TAS', 'ACT', 'NT'] },
      { key: 'propertyPrice', label: 'Target Property Price (AUD)', prefix: '$', step: 100000, values: [300000, 400000, 500000, 650000, 800000, 900000, 1000000] },
      { key: 'stampDutyExemption', label: 'Eligible for Stamp Duty Concession?', values: ['Yes', 'No'] },
    ],
    maxVariants: 3800,
    seoTemplate: {
      title: 'First-Home Buyer Affordability in {{state}} - {{annualIncome}} Income + Grants 2026 | Plain Figures',
      description: 'Estimate first-home buyer affordability in {{state}} using {{annualIncome}} household income, {{downPayment}} deposit, {{propertyPrice}} target property price, and {{stampDutyExemption}} stamp-duty concession eligibility.',
      h1: 'First-Home Buyer Affordability in {{state}}',
    },
    formula: 'P_{max} \\approx borrowing\\ capacity + deposit + grants',
    isValidVariant: (params) => Number(params.propertyPrice) > Number(params.downPayment),
  },
  {
    id: 'au-negative-gearing-return',
    categorySlug: 'investing',
    name: 'Negative Gearing Investment Property Return Calculator 2026',
    params: [
      { key: 'propertyPurchasePrice', label: 'Property Purchase Price (AUD)', prefix: '$', step: 100000, values: [300000, 400000, 500000, 650000, 800000, 1000000, 1200000] },
      { key: 'depositPercent', label: 'Deposit %', prefix: '%', step: 5, values: [10, 15, 20, 25, 30, 35, 40] },
      { key: 'rentalIncomeAnnual', label: 'Annual Rental Income (AUD)', prefix: '$', step: 5000, values: [15000, 20000, 25000, 30000, 40000, 50000, 60000] },
      { key: 'interestRate', label: 'Loan Interest Rate %', prefix: '%', step: 0.5, values: [4.5, 5, 5.5, 6, 6.5, 7, 7.5] },
      { key: 'annualExpenses', label: 'Annual Property Expenses (maintenance, rates, etc.)', prefix: '$', step: 2500, values: [5000, 7500, 10000, 12500, 15000, 17500, 20000] },
      { key: 'marginalTaxRate', label: 'Marginal Tax Rate %', prefix: '%', step: 5, values: [19, 24, 29, 34, 39, 45] },
    ],
    maxVariants: 4200,
    seoTemplate: {
      title: 'Negative Gearing Return on {{propertyPurchasePrice}} Investment Property - 2026 Australia | Plain Figures',
      description: 'Estimate negative-gearing outcomes using {{propertyPurchasePrice}} purchase price, {{depositPercent}} deposit, {{rentalIncomeAnnual}} rental income, {{interestRate}} loan rate, {{annualExpenses}} annual expenses, and {{marginalTaxRate}} marginal tax rate.',
      h1: 'Negative Gearing Return on {{propertyPurchasePrice}} Investment Property',
    },
    formula: 'R = rent - expenses - interest + loss \\times tax\\ rate',
  },
  {
    id: 'uk-mortgage-affordability-stress-test',
    categorySlug: 'mortgages',
    name: 'UK Mortgage Affordability & Stress Test Calculator 2026',
    params: [
      { key: 'annualIncome', label: 'Annual Household Income (£)', prefix: '£', step: 10000, values: [25000, 40000, 50000, 65000, 80000, 100000, 125000, 150000, 200000] },
      { key: 'monthlyOutgoings', label: 'Monthly Outgoings / Debts (£)', prefix: '£', step: 500, values: [500, 800, 1200, 1600, 2200, 2800, 3400, 4000] },
      { key: 'depositAmount', label: 'Deposit Amount (£)', prefix: '£', step: 10000, values: [10000, 20000, 30000, 50000, 75000, 100000, 125000, 150000] },
      { key: 'stressTestRate', label: 'Stress Test Rate % (usually +3%)', prefix: '%', step: 0.5, values: [5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9] },
      { key: 'termYears', label: 'Mortgage Term (Years)', step: 5, values: [15, 20, 25, 30, 35, 40] },
      { key: 'propertyValueEstimate', label: 'Estimated Property Value (£)', prefix: '£', step: 100000, values: [100000, 200000, 300000, 450000, 600000, 800000] },
    ],
    maxVariants: 4200,
    seoTemplate: {
      title: 'How Much Mortgage Can I Afford in the UK? Stress Test on {{annualIncome}} Income - 2026 | Plain Figures',
      description: 'Estimate UK mortgage affordability using {{annualIncome}} household income, {{monthlyOutgoings}} monthly outgoings, {{depositAmount}} deposit, {{stressTestRate}} stress-test rate, {{termYears}}-year term, and {{propertyValueEstimate}} estimated property value.',
      h1: 'How Much Mortgage Can I Afford in the UK? Stress Test on {{annualIncome}} Income',
    },
    formula: 'B_{max} \\approx (I - O) \\times multiple',
  },
  {
    id: 'uk-pension-tax-relief-optimizer',
    categorySlug: 'retirement',
    name: 'UK Pension Contribution & Tax Relief Optimizer 2026',
    params: [
      { key: 'grossSalary', label: 'Gross Annual Salary (£)', prefix: '£', step: 10000, values: [20000, 30000, 40000, 50000, 65000, 80000, 100000, 125000, 150000] },
      { key: 'currentTaxBand', label: 'Current Tax Band', values: ['Basic (20%)', 'Higher (40%)', 'Additional (45%)'] },
      { key: 'annualContribution', label: 'Annual Pension Contribution (£)', prefix: '£', step: 2500, values: [1000, 2500, 5000, 10000, 15000, 20000, 30000, 45000, 60000] },
      { key: 'yearsToRetirement', label: 'Years Until Retirement', step: 5, values: [5, 10, 15, 20, 25, 30, 35] },
      { key: 'expectedReturn', label: 'Expected Annual Return %', prefix: '%', step: 0.5, values: [3, 4, 5, 6, 7, 8] },
    ],
    maxVariants: 3600,
    seoTemplate: {
      title: 'Optimise Pension Contributions & Tax Relief on {{grossSalary}} Salary - 2026 UK | Plain Figures',
      description: 'Model UK pension tax relief using {{grossSalary}} salary, {{currentTaxBand}} tax band, {{annualContribution}} annual pension contribution, {{yearsToRetirement}} years to retirement, and {{expectedReturn}} expected return.',
      h1: 'Optimise Pension Contributions & Tax Relief on {{grossSalary}} Salary',
    },
    formula: 'FV \\approx C\\frac{(1+r)^t-1}{r} + relief',
  },
  {
    id: 'uk-income-tax-ni-take-home',
    categorySlug: 'tax',
    name: 'UK Income Tax & NI Take-Home Calculator 2026/27',
    params: [
      { key: 'grossSalary', label: 'Annual Gross Salary (£)', prefix: '£', step: 10000, values: [20000, 30000, 40000, 50000, 65000, 80000, 100000, 125000, 150000, 200000] },
      { key: 'taxYear', label: 'Tax Year', values: ['2026/27'] },
      { key: 'pensionContribution', label: 'Annual Pension Contribution (£)', prefix: '£', step: 2500, values: [0, 1000, 2500, 5000, 10000, 15000, 20000, 30000, 40000] },
      { key: 'studentLoanPlan', label: 'Student Loan Plan', values: ['None', 'Plan 1', 'Plan 2', 'Plan 4', 'Plan 5', 'Postgraduate'] },
      { key: 'payFrequency', label: 'Pay Frequency', values: ['Annual', 'Monthly', 'Weekly'] },
    ],
    maxVariants: 4400,
    seoTemplate: {
      title: '{{grossSalary}} Salary After Tax & NI - UK 2026/27 Take-Home Pay Calculator | Plain Figures',
      description: 'Estimate UK take-home pay for {{grossSalary}} in tax year {{taxYear}} using {{pensionContribution}} pension contributions, {{studentLoanPlan}} student loan plan, and {{payFrequency}} pay frequency.',
      h1: '{{grossSalary}} Salary After Tax & NI - UK 2026/27 Take-Home Pay Calculator',
    },
    formula: '\\text{Net pay} = \\text{gross} - \\text{income tax} - \\text{NI} - \\text{pension} - \\text{loan}',
  },
  {
    id: 'uk-isa-vs-pension-comparison',
    categorySlug: 'investing',
    name: 'ISA vs Pension Contribution Comparison Calculator 2026',
    params: [
      { key: 'annualAmount', label: 'Annual Investment Amount (£)', prefix: '£', step: 2500, values: [1000, 2500, 5000, 7500, 10000, 15000, 20000, 30000, 40000] },
      { key: 'currentTaxRate', label: 'Current Marginal Tax Rate %', prefix: '%', step: 5, values: [20, 25, 30, 35, 40, 45] },
      { key: 'retirementTaxRate', label: 'Expected Retirement Tax Rate %', prefix: '%', step: 5, values: [0, 5, 10, 15, 20, 25, 30, 40, 45] },
      { key: 'yearsInvested', label: 'Years Until Withdrawal', step: 5, values: [5, 10, 15, 20, 25, 30] },
      { key: 'investmentReturn', label: 'Expected Annual Return %', prefix: '%', step: 1, values: [3, 4, 5, 6, 7, 8, 9] },
    ],
    maxVariants: 3600,
    seoTemplate: {
      title: 'ISA vs Pension: Which is Better for {{annualAmount}}/yr in 2026 UK? | Plain Figures',
      description: 'Compare ISA and pension outcomes using {{annualAmount}} annual investing, {{currentTaxRate}} current tax rate, {{retirementTaxRate}} retirement tax rate, {{yearsInvested}} years invested, and {{investmentReturn}} annual return.',
      h1: 'ISA vs Pension: Which is Better for {{annualAmount}}/yr?',
    },
    formula: 'FV \\approx C\\frac{(1+r)^t-1}{r}',
  },
  {
    id: 'uk-stamp-duty-first-time-buyer',
    categorySlug: 'real-estate',
    name: 'UK Stamp Duty & First-Time Buyer Relief Calculator 2026',
    params: [
      { key: 'propertyPrice', label: 'Property Purchase Price (£)', prefix: '£', step: 100000, values: [100000, 200000, 300000, 450000, 600000, 800000, 1000000, 1500000] },
      { key: 'firstTimeBuyer', label: 'First-Time Buyer?', values: ['Yes', 'No'] },
      { key: 'additionalProperty', label: 'Additional Property / Second Home?', values: ['Yes', 'No'] },
      { key: 'nonUkResident', label: 'Non-UK Resident Buyer?', values: ['Yes', 'No'] },
      { key: 'companyPurchase', label: 'Purchased by Company?', values: ['Yes', 'No'] },
    ],
    maxVariants: 3600,
    seoTemplate: {
      title: 'Stamp Duty on {{propertyPrice}} Property - First-Time Buyer Relief 2026 UK | Plain Figures',
      description: 'Estimate UK stamp duty using {{propertyPrice}} purchase price, {{firstTimeBuyer}} first-time buyer status, {{additionalProperty}} additional-property status, {{nonUkResident}} non-UK residency, and {{companyPurchase}} company purchase status.',
      h1: 'Stamp Duty on {{propertyPrice}} Property - First-Time Buyer Relief',
    },
    formula: 'SDLT = \\sum band\\ amount \\times rate',
  },
  {
    id: 'sg-cpf-retirement-projection',
    categorySlug: 'retirement',
    name: 'CPF Retirement & Withdrawal Projection Calculator 2026',
    params: [
      { key: 'currentCPFBalance', label: 'Current CPF Balance (SGD)', prefix: '$', step: 25000, values: [0, 10000, 25000, 50000, 100000, 200000, 350000, 500000] },
      { key: 'monthlySalary', label: 'Monthly Salary (SGD)', prefix: '$', step: 2500, values: [3000, 5000, 7000, 9000, 12000, 15000, 20000] },
      { key: 'age', label: 'Current Age', step: 5, values: [25, 30, 35, 40, 45, 50, 55, 60, 65] },
      { key: 'buyerStatus', label: 'Buyer status', values: ['Citizen'] },
      { key: 'expectedReturnOA', label: 'Expected OA Return %', prefix: '%', step: 0.5, values: [2.5, 3, 3.5, 4, 4.5, 5] },
      { key: 'retirementAge', label: 'Planned Withdrawal Age', step: 2, values: [55, 57, 60, 62, 65] },
    ],
    maxVariants: 4200,
    seoTemplate: {
      title: '{{buyerStatus}} CPF Projection at Retirement - Age {{age}}, {{currentCPFBalance}} Current - 2026 Singapore | Plain Figures',
      description: 'Project CPF balances in Singapore using {{buyerStatus}} status, {{currentCPFBalance}} current CPF savings, {{monthlySalary}} monthly salary, age {{age}}, {{expectedReturnOA}} expected OA return, and withdrawal at age {{retirementAge}}.',
      h1: '{{buyerStatus}} CPF Projection at Retirement - Age {{age}}, {{currentCPFBalance}} Current',
    },
    formula: 'FV = B(1+r)^t + C\\frac{(1+r)^t-1}{r}',
    isValidVariant: (params) => Number(params.retirementAge) > Number(params.age),
  },
  {
    id: 'sg-hdb-loan-affordability',
    categorySlug: 'mortgages',
    name: 'HDB Loan Affordability & MSR/TDSR Calculator 2026',
    params: [
      { key: 'monthlyIncome', label: 'Monthly Household Income (SGD)', prefix: '$', step: 2500, values: [3000, 5000, 7000, 9000, 12000, 15000, 20000] },
      { key: 'existingCommitments', label: 'Existing Monthly Commitments (SGD)', prefix: '$', step: 500, values: [0, 250, 500, 1000, 1500, 2000, 2500, 3000] },
      { key: 'buyerStatus', label: 'Buyer status', values: ['Citizen'] },
      { key: 'flatType', label: 'HDB flat type', values: ['4-room'] },
      { key: 'downPayment', label: 'Down Payment / Cash (SGD)', prefix: '$', step: 25000, values: [10000, 25000, 50000, 75000, 100000, 150000, 200000] },
      { key: 'loanTenureYears', label: 'Loan Tenure (Years)', step: 5, values: [20, 25, 30] },
      { key: 'interestRate', label: 'HDB / Bank Loan Rate %', prefix: '%', step: 0.5, values: [2, 2.5, 3, 3.5, 4, 4.5] },
    ],
    maxVariants: 4200,
    seoTemplate: {
      title: '{{flatType}} HDB {{buyerStatus}} Loan Affordability on {{monthlyIncome}}/mo Income - MSR/TDSR 2026 Singapore | Plain Figures',
      description: 'Estimate Singapore HDB affordability using {{flatType}} HDB assumptions, {{buyerStatus}} status, {{monthlyIncome}} monthly household income, {{existingCommitments}} existing commitments, {{downPayment}} down payment, {{loanTenureYears}}-year tenure, and {{interestRate}} loan rate.',
      h1: '{{flatType}} HDB {{buyerStatus}} Loan Affordability on {{monthlyIncome}}/mo Income',
    },
    formula: 'L_{max} \\approx \\frac{(I-C)\\times ratio}{factor(r,n)}',
  },
  {
    id: 'sg-income-tax-take-home',
    categorySlug: 'tax',
    name: 'Singapore Income Tax & Take-Home Pay Calculator 2026',
    params: [
      { key: 'grossSalaryAnnual', label: 'Annual Gross Salary (SGD)', prefix: '$', step: 10000, values: [40000, 50000, 65000, 80000, 100000, 125000, 150000, 200000, 250000, 300000] },
      { key: 'residentStatus', label: 'Tax Residency', values: ['Resident', 'Non-Resident'] },
      { key: 'buyerStatus', label: 'Buyer status', values: ['Citizen'] },
      { key: 'cpfContribution', label: 'CPF Relief / Deduction (SGD)', prefix: '$', step: 2500, values: [0, 1000, 2500, 5000, 10000, 15000, 20000] },
      { key: 'otherReliefs', label: 'Other Tax Reliefs (parent, course fees, etc.)', prefix: '$', step: 2500, values: [0, 500, 1000, 2500, 5000, 7500, 10000] },
      { key: 'payFrequency', label: 'Pay Frequency', values: ['Annual', 'Monthly'] },
    ],
    maxVariants: 4400,
    seoTemplate: {
      title: '{{buyerStatus}} {{grossSalaryAnnual}} Salary After Tax Singapore - 2026 Take-Home Pay | Plain Figures',
      description: 'Estimate Singapore take-home pay for {{grossSalaryAnnual}} using {{buyerStatus}} status, {{residentStatus}} tax residency, {{cpfContribution}} CPF relief, {{otherReliefs}} other reliefs, and {{payFrequency}} pay frequency.',
      h1: '{{buyerStatus}} {{grossSalaryAnnual}} Salary After Tax Singapore',
    },
    formula: '\\text{Net pay} = \\text{gross} - \\text{income tax} - \\text{CPF relief adjustments}',
  },
  {
    id: 'sg-srs-vs-cpf-top-up',
    categorySlug: 'retirement',
    name: 'SRS vs CPF Top-Up & Tax Relief Optimizer 2026',
    params: [
      { key: 'taxableIncome', label: 'Taxable Income (SGD)', prefix: '$', step: 10000, values: [40000, 50000, 65000, 80000, 100000, 125000, 150000, 175000, 200000] },
      { key: 'currentTaxBracket', label: 'Current Tax Rate %', prefix: '%', step: 4, values: [0, 4, 8, 12, 16, 20, 24] },
      { key: 'buyerStatus', label: 'Buyer status', values: ['Citizen'] },
      { key: 'annualTopUp', label: 'Annual Top-Up Amount (SGD)', prefix: '$', step: 2500, values: [1000, 2500, 5000, 7500, 10000, 12500, 15500] },
      { key: 'yearsToRetirement', label: 'Years Until Withdrawal', step: 5, values: [5, 10, 15, 20, 25, 30] },
      { key: 'investmentReturn', label: 'Expected Annual Return %', prefix: '%', step: 0.5, values: [3, 4, 5, 6, 7, 8] },
    ],
    maxVariants: 4000,
    seoTemplate: {
      title: '{{buyerStatus}} SRS vs CPF Top-Up Tax Relief on {{taxableIncome}} Income - 2026 Singapore | Plain Figures',
      description: 'Compare SRS and CPF top-up outcomes using {{buyerStatus}} status, {{taxableIncome}} taxable income, {{currentTaxBracket}} current tax rate, {{annualTopUp}} annual top-up amount, {{yearsToRetirement}} years to retirement, and {{investmentReturn}} expected return.',
      h1: '{{buyerStatus}} SRS vs CPF Top-Up Tax Relief on {{taxableIncome}} Income',
    },
    formula: 'FV \\approx C\\frac{(1+r)^t-1}{r} + tax\\ relief',
  },
  {
    id: 'sg-buyer-stamp-duty-absd',
    categorySlug: 'real-estate',
    name: 'Buyer Stamp Duty & ABSD Calculator 2026',
    params: [
      { key: 'propertyPrice', label: 'Property Purchase Price (SGD)', prefix: '$', step: 250000, values: [500000, 750000, 1000000, 1500000, 2000000, 2500000, 3000000] },
      { key: 'buyerStatus', label: 'Buyer Citizenship/PR Status', values: ['Singapore Citizen', 'PR', 'Foreigner'] },
      { key: 'numberOfProperties', label: 'Number of Properties Owned (incl. this one)', step: 1, values: [0, 1, 2, 3, 4] },
      { key: 'firstProperty', label: 'First Residential Property?', values: ['Yes', 'No'] },
    ],
    maxVariants: 3600,
    seoTemplate: {
      title: 'Buyer Stamp Duty & ABSD on {{propertyPrice}} Property - 2026 Singapore | Plain Figures',
      description: 'Estimate Singapore buyer stamp duty and ABSD using {{propertyPrice}} purchase price, {{buyerStatus}} buyer status, {{numberOfProperties}} properties owned, and {{firstProperty}} first-property status.',
      h1: 'Buyer Stamp Duty & ABSD on {{propertyPrice}} Property',
    },
    formula: 'BSD + ABSD = \\sum band\\ amount \\times rate + surcharge',
  },
  {
    id: 'in-home-loan-eligibility-emi',
    categorySlug: 'mortgages',
    name: 'Home Loan Eligibility & EMI Calculator India 2026',
    params: [
      { key: 'grossMonthlyIncome', label: 'Gross Monthly Income (₹)', prefix: '₹', step: 25000, values: [25000, 40000, 60000, 80000, 100000, 150000, 200000, 250000, 300000] },
      { key: 'monthlyObligations', label: 'Existing Monthly Obligations (₹)', prefix: '₹', step: 10000, values: [0, 5000, 10000, 20000, 40000, 60000, 80000, 100000] },
      { key: 'age', label: 'Current Age', step: 5, values: [21, 25, 30, 35, 40, 45, 50, 55, 60] },
      { key: 'loanTenureYears', label: 'Loan Tenure (Years)', step: 5, values: [10, 15, 20, 25, 30] },
      { key: 'interestRate', label: 'Home Loan Interest Rate %', prefix: '%', step: 0.5, values: [7.5, 8, 8.5, 9, 9.5, 10, 10.5] },
      { key: 'cityTier', label: 'City Tier (for LTV)', values: ['Metro', 'Tier-1', 'Tier-2', 'Tier-3'] },
    ],
    maxVariants: 2200,
    seoTemplate: {
      title: 'Home Loan Eligibility on {{grossMonthlyIncome}}/mo Income - EMI & LTV 2026 India | Plain Figures',
      description: 'Estimate Indian home-loan eligibility using {{grossMonthlyIncome}} monthly income, {{monthlyObligations}} monthly obligations, age {{age}}, {{loanTenureYears}}-year tenure, {{interestRate}} interest, and {{cityTier}} city tier.',
      h1: 'Home Loan Eligibility on {{grossMonthlyIncome}}/mo Income',
    },
    formula: 'L_{max} \\approx (I-O) \\times FOIR \\times factor(n,r)',
  },
  {
    id: 'in-ppf-epf-retirement-projection',
    categorySlug: 'retirement',
    name: 'PPF & EPF Retirement Corpus Projection Calculator 2026',
    params: [
      { key: 'currentAge', label: 'Current Age', step: 5, values: [25, 30, 35, 40, 45, 50, 55, 58] },
      { key: 'monthlyContributionPPF', label: 'Monthly PPF Contribution (₹)', prefix: '₹', step: 2500, values: [500, 1000, 2500, 5000, 7500, 10000, 12500, 15000] },
      { key: 'monthlyEPFBasic', label: 'Monthly EPF Basic Salary (₹)', prefix: '₹', step: 2500, values: [5000, 7500, 10000, 12500, 15000] },
      { key: 'retirementAge', label: 'Retirement Age', step: 1, values: [58, 59, 60] },
      { key: 'expectedPPFReturn', label: 'PPF Interest Rate % (fixed)', prefix: '%', values: [7.1] },
    ],
    maxVariants: 2000,
    seoTemplate: {
      title: 'PPF + EPF Corpus at Retirement - Age {{currentAge}} - 2026 India | Plain Figures',
      description: 'Project Indian retirement corpus using age {{currentAge}}, {{monthlyContributionPPF}} monthly PPF contributions, {{monthlyEPFBasic}} monthly EPF basic salary, retirement at {{retirementAge}}, and {{expectedPPFReturn}} PPF returns.',
      h1: 'PPF + EPF Corpus at Retirement - Age {{currentAge}}',
    },
    formula: 'FV = PPF_{fv} + EPF_{fv}',
    isValidVariant: (params) => Number(params.retirementAge) > Number(params.currentAge),
  },
  {
    id: 'in-income-tax-take-home',
    categorySlug: 'tax',
    name: 'Income Tax Take-Home Pay Calculator India 2026 (New Regime)',
    params: [
      { key: 'annualGrossSalary', label: 'Annual Gross Salary (₹)', prefix: '₹', step: 250000, values: [300000, 500000, 750000, 1000000, 1500000, 2000000, 2500000, 3000000] },
      { key: 'standardDeduction', label: 'Standard Deduction Claimed (₹)', prefix: '₹', values: [50000, 75000] },
      { key: 'otherIncome', label: 'Other Taxable Income (₹)', prefix: '₹', step: 100000, values: [0, 50000, 100000, 200000, 300000, 400000, 500000] },
      { key: 'payFrequency', label: 'Pay Frequency', values: ['Annual', 'Monthly'] },
      { key: 'regime', label: 'Tax Regime', values: ['New', 'Old'] },
    ],
    maxVariants: 2200,
    seoTemplate: {
      title: '{{annualGrossSalary}} Salary After Tax India - New Regime 2026 Take-Home Pay | Plain Figures',
      description: 'Estimate Indian take-home pay using {{annualGrossSalary}} salary, {{standardDeduction}} standard deduction, {{otherIncome}} other income, {{payFrequency}} pay frequency, and the {{regime}} tax regime.',
      h1: '{{annualGrossSalary}} Salary After Tax India',
    },
    formula: '\\text{Net pay} = \\text{gross} + \\text{other income} - \\text{tax} - \\text{deductions}',
  },
  {
    id: 'in-nps-vs-epf-comparison',
    categorySlug: 'retirement',
    name: 'NPS vs EPF Contribution & Tax Benefit Comparison 2026',
    params: [
      { key: 'monthlyContribution', label: 'Monthly Contribution (₹)', prefix: '₹', step: 5000, values: [5000, 10000, 15000, 20000, 30000, 40000, 50000] },
      { key: 'currentAge', label: 'Current Age', step: 5, values: [25, 30, 35, 40, 45, 50, 55, 58] },
      { key: 'expectedReturnNPS', label: 'Expected NPS Return %', prefix: '%', step: 1, values: [8, 9, 10, 11, 12] },
      { key: 'expectedReturnEPF', label: 'EPF Interest Rate %', prefix: '%', values: [8.25] },
      { key: 'yearsToRetirement', label: 'Years Until Retirement', step: 5, values: [5, 10, 15, 20, 25, 30, 35] },
    ],
    maxVariants: 2000,
    seoTemplate: {
      title: 'NPS vs EPF: Which is Better for {{monthlyContribution}}/mo - 2026 India | Plain Figures',
      description: 'Compare NPS and EPF using {{monthlyContribution}} monthly contributions, age {{currentAge}}, {{expectedReturnNPS}} expected NPS return, {{expectedReturnEPF}} EPF interest, and {{yearsToRetirement}} years to retirement.',
      h1: 'NPS vs EPF: Which is Better for {{monthlyContribution}}/mo',
    },
    formula: 'FV = C\\frac{(1+r)^t-1}{r}',
  },
  {
    id: 'in-stamp-duty-registration',
    categorySlug: 'real-estate',
    name: 'Stamp Duty & Registration Fees Calculator by State 2026',
    params: [
      { key: 'propertyValue', label: 'Property Value (₹)', prefix: '₹', step: 2000000, values: [2000000, 3000000, 5000000, 7500000, 10000000, 15000000, 20000000] },
      { key: 'state', label: 'State', values: ['Maharashtra', 'Karnataka', 'Delhi', 'Tamil Nadu', 'Gujarat', 'Uttar Pradesh', 'West Bengal', 'Telangana', 'Haryana', 'Punjab'] },
      { key: 'propertyType', label: 'Property Type', values: ['Ready', 'Under Construction', 'Resale'] },
      { key: 'buyerGender', label: 'Buyer Gender (for concessions)', values: ['Male', 'Female', 'Joint'] },
    ],
    maxVariants: 2000,
    seoTemplate: {
      title: 'Stamp Duty & Registration on {{propertyValue}} Property in {{state}} - 2026 India | Plain Figures',
      description: 'Estimate Indian stamp duty and registration fees using {{propertyValue}} property value, {{state}} state rules, {{propertyType}} property type, and {{buyerGender}} buyer concessions.',
      h1: 'Stamp Duty & Registration on {{propertyValue}} Property in {{state}}',
    },
    formula: 'Total = stamp\\ duty + registration\\ fee - concessions',
  },
  {
    id: 'br-salario-liquido-clt-pj',
    categorySlug: 'tax',
    name: 'Calculadora Salário Líquido CLT & PJ Brasil 2026',
    params: [
      { key: 'salarioBrutoMensal', label: 'Salário Bruto Mensal (R$)', prefix: 'R$', step: 2000, values: [1412, 2000, 3000, 5000, 8000, 12000, 20000, 30000, 40000, 50000] },
      { key: 'tipoContratacao', label: 'Tipo de Contratação', values: ['CLT', 'PJ (Simples Nacional)', 'PJ (Lucro Presumido)'] },
      { key: 'dependentes', label: 'Número de Dependentes', step: 1, values: [0, 1, 2, 3, 4, 5] },
      { key: 'descontosPlanoSaude', label: 'Desconto Plano de Saúde (R$)', prefix: 'R$', step: 300, values: [0, 100, 300, 500, 800, 1200, 1500] },
      { key: 'outrosDescontos', label: 'Outros Descontos (R$)', prefix: 'R$', step: 500, values: [0, 100, 300, 500, 1000, 1500, 2000] },
    ],
    maxVariants: 2200,
    seoTemplate: {
      title: 'Salário Líquido R${{salarioBrutoMensal}} CLT ou PJ - Calculadora Brasil 2026 | Plain Figures',
      description: 'Calcule o salário líquido no Brasil com {{salarioBrutoMensal}} mensais, contratação {{tipoContratacao}}, {{dependentes}} dependentes, {{descontosPlanoSaude}} de plano de saúde e {{outrosDescontos}} em outros descontos.',
      h1: 'Salário Líquido R${{salarioBrutoMensal}} CLT ou PJ',
    },
    formula: 'L = B - INSS - IRRF - D',
  },
  {
    id: 'br-irpf-2026',
    categorySlug: 'tax',
    name: 'Calculadora IRPF 2026 Brasil',
    params: [
      { key: 'rendaBrutaAnual', label: 'Renda Bruta Anual (R$)', prefix: 'R$', step: 30000, values: [30000, 50000, 80000, 120000, 180000, 250000, 350000, 450000, 600000] },
      { key: 'deducoesLegais', label: 'Deduções Legais (Dependentes, Saúde, Educação) (R$)', prefix: 'R$', step: 10000, values: [0, 2000, 5000, 10000, 20000, 40000, 60000] },
      { key: 'tipoDeclaracao', label: 'Tipo de Declaração', values: ['Simplificada', 'Completa'] },
      { key: 'fontePrincipal', label: 'Fonte Principal de Renda', values: ['CLT', 'Autônomo', 'Aposentadoria', 'Investimentos'] },
    ],
    maxVariants: 2000,
    seoTemplate: {
      title: 'IRPF 2026: Imposto a Pagar ou Restituir - Renda R${{rendaBrutaAnual}} Brasil | Plain Figures',
      description: 'Simule IRPF 2026 com {{rendaBrutaAnual}} de renda bruta anual, {{deducoesLegais}} em deduções, declaração {{tipoDeclaracao}} e renda principal de {{fontePrincipal}}.',
      h1: 'IRPF 2026: Imposto a Pagar ou Restituir',
    },
    formula: 'IRPF = base\\ tributável \\times alíquota - parcela\\ a\\ deduzir',
  },
  {
    id: 'br-fgts-modalidades-saldo',
    categorySlug: 'savings',
    name: 'Calculadora FGTS Modalidades & Saldo Projetado 2026',
    params: [
      { key: 'saldoAtual', label: 'Saldo Atual FGTS (R$)', prefix: 'R$', step: 25000, values: [0, 5000, 10000, 25000, 50000, 100000, 200000, 300000] },
      { key: 'depositoMensal', label: 'Depósito Mensal FGTS (R$)', prefix: 'R$', step: 1000, values: [0, 200, 500, 1000, 2000, 4000, 6000, 8000] },
      { key: 'anosProjetados', label: 'Anos Projetados', step: 2, values: [1, 3, 5, 8, 10, 15, 20] },
      { key: 'modalidadePretendida', label: 'Modalidade de Saque', values: ['Saque Aniversário', 'Rescisão sem Justa Causa', 'Casa Própria', 'Doença Grave'] },
    ],
    maxVariants: 1800,
    seoTemplate: {
      title: 'FGTS Saldo Projetado em {{anosProjetados}} Anos - Modalidade {{modalidadePretendida}} 2026 Brasil | Plain Figures',
      description: 'Projete o saldo do FGTS com {{saldoAtual}} de saldo atual, {{depositoMensal}} de depósito mensal, horizonte de {{anosProjetados}} anos e modalidade {{modalidadePretendida}}.',
      h1: 'FGTS Saldo Projetado em {{anosProjetados}} Anos',
    },
    formula: 'FV = S(1+r)^t + D\\frac{(1+r)^t-1}{r}',
  },
  {
    id: 'br-inss-aposentadoria-beneficio',
    categorySlug: 'retirement',
    name: 'Calculadora INSS Aposentadoria & Benefício 2026',
    params: [
      { key: 'idadeAtual', label: 'Idade Atual', step: 5, values: [30, 35, 40, 45, 50, 55, 60, 65] },
      { key: 'tempoContribuicaoMeses', label: 'Tempo de Contribuição (Meses)', step: 60, values: [60, 120, 180, 240, 300, 360, 420, 480] },
      { key: 'salarioMedioContribuicao', label: 'Salário Médio de Contribuição (R$)', prefix: 'R$', step: 1000, values: [1412, 2000, 3000, 4000, 5000, 6000, 7000, 7780] },
      { key: 'tipoBeneficio', label: 'Tipo de Aposentadoria', values: ['Aposentadoria por Idade', 'Por Tempo de Contribuição', 'Por Pontos'] },
    ],
    maxVariants: 2000,
    seoTemplate: {
      title: 'Benefício INSS Estimado - Idade {{idadeAtual}}, {{tempoContribuicaoMeses}} Meses Contribuídos - 2026 Brasil | Plain Figures',
      description: 'Estime o benefício do INSS com idade {{idadeAtual}}, {{tempoContribuicaoMeses}} meses de contribuição, salário médio de {{salarioMedioContribuicao}} e benefício {{tipoBeneficio}}.',
      h1: 'Benefício INSS Estimado',
    },
    formula: 'B \\approx salário\\ médio \\times fator',
  },
  {
    id: 'br-financiamento-imobiliario-sac-price',
    categorySlug: 'mortgages',
    name: 'Calculadora Financiamento Imobiliário SAC vs Tabela Price 2026',
    params: [
      { key: 'valorImovel', label: 'Valor do Imóvel (R$)', prefix: 'R$', step: 300000, values: [200000, 300000, 500000, 800000, 1200000, 1800000, 2500000] },
      { key: 'entrada', label: 'Entrada (R$)', prefix: 'R$', step: 50000, values: [20000, 50000, 100000, 200000, 300000, 400000, 500000] },
      { key: 'prazoAnos', label: 'Prazo (Anos)', step: 5, values: [10, 15, 20, 25, 30, 35] },
      { key: 'taxaJurosAnual', label: 'Taxa de Juros Anual %', prefix: '%', step: 0.5, values: [7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11.5] },
      { key: 'sistemaAmortizacao', label: 'Sistema de Amortização', values: ['SAC', 'Price'] },
    ],
    maxVariants: 2200,
    seoTemplate: {
      title: 'Financiamento Imobiliário R${{valorImovel}} - SAC vs Price 2026 Brasil | Plain Figures',
      description: 'Compare financiamento imobiliário de {{valorImovel}} com entrada de {{entrada}}, prazo de {{prazoAnos}} anos, juros de {{taxaJurosAnual}} e sistema {{sistemaAmortizacao}}.',
      h1: 'Financiamento Imobiliário R${{valorImovel}} - SAC vs Price',
    },
    formula: 'PMT = P\\frac{r(1+r)^n}{(1+r)^n-1}',
    isValidVariant: (params) => Number(params.entrada) < Number(params.valorImovel),
  },
  {
    id: 'ie-income-tax-take-home',
    categorySlug: 'tax',
    name: 'Ireland Income Tax & Take-Home Pay Calculator 2026',
    params: [
      { key: 'grossSalary', label: 'Annual Gross Salary (EUR)', prefix: 'EUR ', step: 10000, values: [30000, 40000, 50000, 65000, 80000, 100000, 125000, 150000, 200000, 250000] },
      { key: 'taxStatus', label: 'Tax Status', values: ['Single', 'Married one income', 'Married two incomes', 'Single parent'] },
      { key: 'pensionContribution', label: 'Pension Contribution (EUR)', prefix: 'EUR ', step: 2500, values: [0, 1000, 2500, 5000, 7500, 10000, 15000, 20000, 25000] },
      { key: 'taxCredits', label: 'Extra Annual Tax Credits (EUR)', prefix: 'EUR ', step: 500, values: [0, 500, 1000, 1500, 2500, 4000, 6000] },
      { key: 'payFrequency', label: 'Pay Frequency', values: ['Annual', 'Monthly', 'Fortnightly', 'Weekly'] },
    ],
    maxVariants: 4400,
    seoTemplate: {
      title: 'EUR {{grossSalary}} Salary After Tax in Ireland - 2026 Take-Home Pay | Plain Figures',
      description: 'Estimate Irish take-home pay for EUR {{grossSalary}} using {{taxStatus}} tax status, EUR {{pensionContribution}} pension contributions, EUR {{taxCredits}} extra credits, and {{payFrequency}} pay frequency.',
      h1: 'EUR {{grossSalary}} Salary After Tax in Ireland',
    },
    formula: '\\text{Net pay} = \\text{gross} - \\text{income tax} - \\text{USC} - \\text{PRSI} - \\text{deductions} + \\text{credits}',
  },
  {
    id: 'nz-income-tax-take-home',
    categorySlug: 'tax',
    name: 'New Zealand Income Tax & Take-Home Pay Calculator 2026',
    params: [
      { key: 'grossSalary', label: 'Annual Gross Salary (NZD)', prefix: 'NZ$ ', step: 10000, values: [30000, 40000, 50000, 65000, 80000, 100000, 125000, 150000, 180000, 220000] },
      { key: 'kiwiSaverRate', label: 'KiwiSaver Employee Contribution %', prefix: '%', step: 1, values: [0, 3, 4, 6, 8, 10] },
      { key: 'studentLoan', label: 'Student Loan Repayments', values: ['No student loan', 'Has student loan'] },
      { key: 'otherDeductions', label: 'Other Annual Deductions (NZD)', prefix: 'NZ$ ', step: 1000, values: [0, 500, 1000, 2500, 5000, 7500, 10000] },
      { key: 'payFrequency', label: 'Pay Frequency', values: ['Annual', 'Monthly', 'Fortnightly', 'Weekly'] },
    ],
    maxVariants: 4400,
    seoTemplate: {
      title: 'NZ$ {{grossSalary}} Salary After Tax in New Zealand - 2026 Take-Home Pay | Plain Figures',
      description: 'Estimate New Zealand take-home pay for NZ$ {{grossSalary}} using a {{kiwiSaverRate}} KiwiSaver rate, {{studentLoan}} status, NZ$ {{otherDeductions}} other deductions, and {{payFrequency}} pay frequency.',
      h1: 'NZ$ {{grossSalary}} Salary After Tax in New Zealand',
    },
    formula: '\\text{Net pay} = \\text{gross} - \\text{PAYE} - \\text{ACC} - \\text{KiwiSaver} - \\text{deductions}',
  },
  {
    id: 'za-income-tax-take-home',
    categorySlug: 'tax',
    name: 'South Africa Income Tax & Take-Home Pay Calculator 2026',
    params: [
      { key: 'grossSalary', label: 'Annual Gross Salary (ZAR)', prefix: 'R ', step: 50000, values: [180000, 240000, 300000, 420000, 600000, 800000, 1000000, 1250000, 1500000] },
      { key: 'ageBand', label: 'Age Band', values: ['Under 65', '65 to 74', '75 and over'] },
      { key: 'retirementContribution', label: 'Retirement Contribution (ZAR)', prefix: 'R ', step: 10000, values: [0, 12000, 24000, 36000, 60000, 90000, 120000] },
      { key: 'medicalAidCreditsMonthly', label: 'Monthly Medical Aid Credits (ZAR)', prefix: 'R ', step: 500, values: [0, 364, 728, 1092, 1456, 1820] },
      { key: 'payFrequency', label: 'Pay Frequency', values: ['Annual', 'Monthly', 'Fortnightly', 'Weekly'] },
    ],
    maxVariants: 4400,
    seoTemplate: {
      title: 'R{{grossSalary}} Salary After Tax in South Africa - 2026 Take-Home Pay | Plain Figures',
      description: 'Estimate South African take-home pay for R{{grossSalary}} using {{ageBand}} tax tables, R{{retirementContribution}} retirement contributions, R{{medicalAidCreditsMonthly}} monthly medical-aid credits, and {{payFrequency}} pay frequency.',
      h1: 'R{{grossSalary}} Salary After Tax in South Africa',
    },
    formula: '\\text{Net pay} = \\text{gross} - \\text{PAYE} - \\text{UIF} - \\text{retirement deductions} + \\text{medical credits}',
  },
  {
    id: 'ie-mortgage-affordability-stress-test',
    categorySlug: 'mortgages',
    name: 'Ireland Mortgage Affordability & Stress Test Calculator 2026',
    params: [
      { key: 'annualIncome', label: 'Annual Household Income (EUR)', prefix: 'EUR ', step: 10000, values: [40000, 60000, 80000, 100000, 125000, 150000, 175000, 200000, 250000] },
      { key: 'monthlyOutgoings', label: 'Monthly Outgoings / Debts (EUR)', prefix: 'EUR ', step: 500, values: [250, 500, 800, 1200, 1600, 2200, 3000, 4000] },
      { key: 'depositAmount', label: 'Deposit Amount (EUR)', prefix: 'EUR ', step: 25000, values: [10000, 20000, 30000, 50000, 75000, 100000, 150000, 200000] },
      { key: 'stressTestRate', label: 'Stress Test Rate %', prefix: '%', step: 0.5, values: [4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8] },
      { key: 'termYears', label: 'Mortgage Term (Years)', step: 5, values: [20, 25, 30, 35] },
      { key: 'propertyValueEstimate', label: 'Estimated Property Value (EUR)', prefix: 'EUR ', step: 100000, values: [200000, 300000, 400000, 500000, 650000, 800000, 1000000] },
    ],
    maxVariants: 4200,
    seoTemplate: {
      title: 'How Much Mortgage Can I Afford in Ireland? Stress Test on EUR {{annualIncome}} Income - 2026 | Plain Figures',
      description: 'Estimate Irish mortgage affordability using EUR {{annualIncome}} household income, EUR {{monthlyOutgoings}} monthly outgoings, EUR {{depositAmount}} deposit, {{stressTestRate}} stress-test rate, {{termYears}}-year term, and EUR {{propertyValueEstimate}} target property value.',
      h1: 'How Much Mortgage Can I Afford in Ireland? Stress Test on EUR {{annualIncome}} Income',
    },
    formula: 'B_{max} \\approx (I - O) \\times multiple',
  },
  {
    id: 'nz-mortgage-affordability-stress-test',
    categorySlug: 'mortgages',
    name: 'New Zealand Mortgage Affordability & Stress Test Calculator 2026',
    params: [
      { key: 'annualIncome', label: 'Annual Household Income (NZD)', prefix: 'NZ$ ', step: 10000, values: [50000, 70000, 90000, 110000, 130000, 160000, 200000, 240000] },
      { key: 'monthlyOutgoings', label: 'Monthly Outgoings / Debts (NZD)', prefix: 'NZ$ ', step: 500, values: [500, 800, 1200, 1600, 2200, 3000, 3800, 4500] },
      { key: 'depositAmount', label: 'Deposit Amount (NZD)', prefix: 'NZ$ ', step: 25000, values: [20000, 40000, 60000, 80000, 120000, 160000, 200000, 250000] },
      { key: 'stressTestRate', label: 'Stress Test Rate %', prefix: '%', step: 0.5, values: [5, 5.5, 6, 6.5, 7, 7.5, 8] },
      { key: 'termYears', label: 'Mortgage Term (Years)', step: 5, values: [20, 25, 30, 35] },
      { key: 'propertyValueEstimate', label: 'Estimated Property Value (NZD)', prefix: 'NZ$ ', step: 100000, values: [300000, 400000, 500000, 650000, 800000, 1000000, 1250000] },
    ],
    maxVariants: 4200,
    seoTemplate: {
      title: 'How Much Mortgage Can I Afford in New Zealand? Stress Test on NZ$ {{annualIncome}} Income - 2026 | Plain Figures',
      description: 'Estimate New Zealand mortgage affordability using NZ$ {{annualIncome}} household income, NZ$ {{monthlyOutgoings}} monthly outgoings, NZ$ {{depositAmount}} deposit, {{stressTestRate}} stress-test rate, {{termYears}}-year term, and NZ$ {{propertyValueEstimate}} target property value.',
      h1: 'How Much Mortgage Can I Afford in New Zealand? Stress Test on NZ$ {{annualIncome}} Income',
    },
    formula: 'B_{max} \\approx (I - O) \\times serviceability\\ multiple',
  },
  {
    id: 'za-home-loan-affordability',
    categorySlug: 'mortgages',
    name: 'South Africa Home Loan Affordability Calculator 2026',
    params: [
      { key: 'annualIncome', label: 'Annual Household Income (ZAR)', prefix: 'R ', step: 50000, values: [180000, 240000, 360000, 480000, 600000, 800000, 1000000, 1500000] },
      { key: 'monthlyDebtPayments', label: 'Monthly Debt Payments (ZAR)', prefix: 'R ', step: 1000, values: [0, 1000, 2500, 5000, 8000, 12000, 18000] },
      { key: 'depositAmount', label: 'Deposit Amount (ZAR)', prefix: 'R ', step: 50000, values: [0, 25000, 50000, 100000, 150000, 250000, 400000] },
      { key: 'interestRate', label: 'Home Loan Interest Rate %', prefix: '%', step: 0.5, values: [10, 10.5, 11, 11.5, 12, 12.5, 13] },
      { key: 'termYears', label: 'Loan Term (Years)', step: 5, values: [15, 20, 25, 30] },
      { key: 'propertyTaxesAnnual', label: 'Annual Rates and Levies (ZAR)', prefix: 'R ', step: 5000, values: [6000, 12000, 18000, 24000, 36000, 48000] },
    ],
    maxVariants: 4200,
    seoTemplate: {
      title: 'How Much Home Loan Can I Afford in South Africa? R{{annualIncome}} Income - 2026 | Plain Figures',
      description: 'Estimate South African home-loan affordability using R{{annualIncome}} household income, R{{monthlyDebtPayments}} monthly debts, R{{depositAmount}} deposit, {{interestRate}} interest, {{termYears}}-year term, and R{{propertyTaxesAnnual}} annual rates and levies.',
      h1: 'How Much Home Loan Can I Afford in South Africa? R{{annualIncome}} Income',
    },
    formula: 'B_{max} \\approx \\frac{(I-D) \\times ratio}{factor(r,n)}',
  },
  {
    id: 'nz-kiwisaver-retirement-projection',
    categorySlug: 'retirement',
    name: 'KiwiSaver Retirement Projection Calculator 2026',
    params: [
      { key: 'currentBalance', label: 'Current KiwiSaver Balance (NZD)', prefix: 'NZ$ ', step: 25000, values: [0, 10000, 25000, 50000, 100000, 150000, 250000, 400000] },
      { key: 'annualSalary', label: 'Annual Salary (NZD)', prefix: 'NZ$ ', step: 10000, values: [40000, 60000, 80000, 100000, 125000, 150000, 180000] },
      { key: 'employeeContributionRate', label: 'Employee Contribution %', prefix: '%', step: 1, values: [3, 4, 6, 8, 10] },
      { key: 'annualReturn', label: 'Expected Annual Return %', prefix: '%', step: 0.5, values: [4, 5, 6, 7, 8, 9] },
      { key: 'currentAge', label: 'Current Age', step: 5, values: [25, 30, 35, 40, 45, 50, 55, 60] },
      { key: 'retirementAge', label: 'Planned Retirement Age', step: 2, values: [60, 62, 65, 67, 70] },
    ],
    maxVariants: 4000,
    seoTemplate: {
      title: 'Project KiwiSaver Balance at Retirement - Age {{currentAge}}, NZ$ {{currentBalance}} Current - 2026 | Plain Figures',
      description: 'Project KiwiSaver at retirement using NZ$ {{currentBalance}} current balance, NZ$ {{annualSalary}} salary, {{employeeContributionRate}} employee contributions, {{annualReturn}} returns, age {{currentAge}}, and retirement at {{retirementAge}}.',
      h1: 'Project KiwiSaver Balance at Retirement - Age {{currentAge}}, NZ$ {{currentBalance}} Current',
    },
    formula: 'FV = B(1+r)^t + C\\frac{(1+r)^t-1}{r}',
    isValidVariant: (params) => Number(params.retirementAge) > Number(params.currentAge),
  },
  {
    id: 'ie-pension-tax-relief-optimizer',
    categorySlug: 'retirement',
    name: 'Ireland Pension Tax Relief Optimizer Calculator 2026',
    params: [
      { key: 'grossSalary', label: 'Annual Gross Salary (EUR)', prefix: 'EUR ', step: 10000, values: [30000, 40000, 50000, 65000, 80000, 100000, 125000, 150000, 200000] },
      { key: 'marginalTaxRate', label: 'Marginal Tax Rate %', prefix: '%', step: 5, values: [20, 30, 40] },
      { key: 'annualContribution', label: 'Annual Pension Contribution (EUR)', prefix: 'EUR ', step: 2500, values: [1000, 2500, 5000, 7500, 10000, 15000, 20000, 25000, 30000] },
      { key: 'yearsToRetirement', label: 'Years to Retirement', step: 5, values: [5, 10, 15, 20, 25, 30, 35] },
      { key: 'expectedReturn', label: 'Expected Annual Return %', prefix: '%', step: 1, values: [4, 5, 6, 7, 8, 9] },
    ],
    maxVariants: 4000,
    seoTemplate: {
      title: 'Ireland Pension Tax Relief on EUR {{annualContribution}}/yr Contribution - 2026 | Plain Figures',
      description: 'Estimate Irish pension tax relief using EUR {{annualContribution}} annual contributions, EUR {{grossSalary}} salary, a {{marginalTaxRate}} marginal rate, {{yearsToRetirement}} years to retirement, and {{expectedReturn}} annual return.',
      h1: 'Ireland Pension Tax Relief on EUR {{annualContribution}}/yr Contribution',
    },
    formula: 'FV \\approx C\\frac{(1+r)^t-1}{r};\\ tax\\ relief = C \\times rate',
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
  'how-much-house-can-i-afford': ({ annualIncome, monthlyDebtPayments, downPayment, interestRate, loanTermYears, propertyTaxRate, homeInsuranceAnnual }) =>
    `how-much-house-can-i-afford-${annualIncome}-income-${monthlyDebtPayments}-debt-${downPayment}-down-${interestRate}-rate-${loanTermYears}-years-${propertyTaxRate}-tax-${homeInsuranceAnnual}-insurance`,
  'social-security-estimator': ({ birthYear, currentEarnings, expectedFutureEarningsGrowth, claimingAge, spousalBenefits }) =>
    `social-security-estimator-${birthYear}-birth-${currentEarnings}-earnings-${expectedFutureEarningsGrowth}-growth-claim-at-${claimingAge}-${normalizeSlugPart(spousalBenefits)}`,
  'save-to-millionaire': ({ currentSavings, monthlyContribution, annualReturn, currentAge, targetAge, inflationRate }) =>
    `save-to-millionaire-${currentSavings}-saved-${monthlyContribution}-month-${annualReturn}-return-${currentAge}-to-${targetAge}-${inflationRate}-inflation`,
  'debt-payoff-timeline': ({ totalDebt, averageInterestRate, minimumMonthlyPayment, extraMonthlyPayment, debtType }) =>
    `debt-payoff-${totalDebt}-debt-${averageInterestRate}-rate-${minimumMonthlyPayment}-minimum-${extraMonthlyPayment}-extra-${normalizeSlugPart(debtType)}`,
  'investment-future-value': ({ initialInvestment, monthlyContribution, annualReturn, years, compounding }) =>
    `future-value-${initialInvestment}-initial-${monthlyContribution}-month-${annualReturn}-return-${years}-years-${normalizeSlugPart(compounding)}`,
  'reverse-mortgage-calculator': ({ homeValue, borrowerAge, interestRate, payoutType, closingCosts, expectedTenureYears }) =>
    `reverse-mortgage-${homeValue}-home-${borrowerAge}-age-${interestRate}-rate-${normalizeSlugPart(payoutType)}-${closingCosts}-costs-${expectedTenureYears}-years`,
  'passive-income-projector': ({ currentMonthlyPassive, monthlyInvestment, annualReturn, dividendYield, yearsToGoal, targetMonthlyPassive }) =>
    `passive-income-${currentMonthlyPassive}-current-${monthlyInvestment}-invest-${annualReturn}-return-${dividendYield}-yield-${yearsToGoal}-years-${targetMonthlyPassive}-target`,
  'credit-utilization-optimizer': ({ totalCreditLimit, currentBalance, targetUtilization, newBalanceAfterPaydown, numberOfCards, scoreChangeEstimate }) =>
    `credit-utilization-${totalCreditLimit}-limit-${currentBalance}-current-${targetUtilization}-target-${newBalanceAfterPaydown}-new-${numberOfCards}-cards-${scoreChangeEstimate}-score`,
  'emergency-fund-goal': ({ monthlyExpenses, monthsCoverageGoal, currentSavings, monthlySaveAmount, interestRate }) =>
    `emergency-fund-goal-${monthlyExpenses}-expenses-${monthsCoverageGoal}-months-${currentSavings}-saved-${monthlySaveAmount}-monthly-${interestRate}-rate`,
  'zero-based-budget-planner': ({ monthlyTakeHome, fixedExpenses, variableExpenses, debtPayments, savingsGoal, funMoney }) =>
    `zero-based-budget-${monthlyTakeHome}-take-home-${fixedExpenses}-fixed-${variableExpenses}-variable-${debtPayments}-debt-${savingsGoal}-savings-${funMoney}-fun`,
  'reverse-mortgage-line-of-credit': ({ homeValue, borrowerAge, interestRate, initialLineAmount, unusedGrowthRate, expectedTenureYears }) =>
    `reverse-mortgage-loc-${homeValue}-home-${borrowerAge}-age-${interestRate}-rate-${initialLineAmount}-line-${unusedGrowthRate}-growth-${expectedTenureYears}-years`,
  'passive-income-scaling': ({ currentPassiveMonthly, monthlyInvestmentPerStream, numberOfStreams, averageStreamReturn, yearsToScale, targetPassiveMonthly }) =>
    `passive-income-scaling-${currentPassiveMonthly}-current-${monthlyInvestmentPerStream}-per-stream-${numberOfStreams}-streams-${averageStreamReturn}-return-${yearsToScale}-years-${targetPassiveMonthly}-target`,
  'credit-rebuild-timeline': ({ currentScore, targetScore, monthsToGoal, paydownPercentMonthly, newAccountsOpened, derogatoryMarksAgeMonths }) =>
    `credit-rebuild-${currentScore}-to-${targetScore}-${monthsToGoal}-months-${paydownPercentMonthly}-paydown-${newAccountsOpened}-accounts-${derogatoryMarksAgeMonths}-derogatory`,
  'emergency-fund-with-interest': ({ monthlyExpenses, monthsGoal, currentSavings, monthlySave, savingsRate, investmentRateIfHigherRisk }) =>
    `emergency-fund-interest-${monthlyExpenses}-expenses-${monthsGoal}-months-${currentSavings}-saved-${monthlySave}-monthly-${savingsRate}-savings-${investmentRateIfHigherRisk}-investment`,
  'zero-based-budget-debt-snowball': ({ monthlyTakeHome, fixedExpenses, variableExpenses, debtBalances, minimumDebtPayments, extraToDebt }) =>
    `zero-based-budget-snowball-${monthlyTakeHome}-take-home-${fixedExpenses}-fixed-${variableExpenses}-variable-${debtBalances}-balances-${minimumDebtPayments}-minimum-${extraToDebt}-extra`,
  'reverse-mortgage-payout': ({ homeValue, borrowerAge, interestRate, payoutOption, closingCostsPercent, homeAppreciation }) =>
    `reverse-mortgage-payout-${homeValue}-home-${borrowerAge}-age-${interestRate}-rate-${normalizeSlugPart(payoutOption)}-${closingCostsPercent}-costs-${homeAppreciation}-appreciation`,
  'passive-income-reinvestment': ({ initialPassiveMonthly, monthlyReinvestment, annualYield, compoundingFrequency, years, targetPassiveMonthly }) =>
    `passive-income-reinvestment-${initialPassiveMonthly}-initial-${monthlyReinvestment}-reinvest-${annualYield}-yield-${normalizeSlugPart(compoundingFrequency)}-${years}-years-${targetPassiveMonthly}-target`,
  'credit-score-rebuild-path': ({ startingScore, targetScore, monthlyPaydownPercent, derogatoryRemovalMonths, newPositiveAccounts, utilizationDropTarget }) =>
    `credit-score-rebuild-${startingScore}-to-${targetScore}-${monthlyPaydownPercent}-paydown-${derogatoryRemovalMonths}-derogatory-${newPositiveAccounts}-accounts-${utilizationDropTarget}-utilization`,
  'tiered-emergency-fund': ({ monthlyExpenses, tierLevel, currentSavings, monthlySave, highYieldRate }) =>
    `tiered-emergency-fund-${monthlyExpenses}-expenses-${normalizeSlugPart(tierLevel)}-${currentSavings}-saved-${monthlySave}-monthly-${highYieldRate}-rate`,
  'zero-based-budget-sinking-funds': ({ monthlyTakeHome, fixedExpenses, variableExpenses, sinkingFundGoals, debtMinimums, extraToDebtOrSavings }) =>
    `zero-based-budget-sinking-funds-${monthlyTakeHome}-take-home-${fixedExpenses}-fixed-${variableExpenses}-variable-${sinkingFundGoals}-sinking-${debtMinimums}-debt-${extraToDebtOrSavings}-extra`,
  'ca-mortgage-affordability-stress-test': ({ annualIncome, monthlyDebtPayments, downPayment, qualifyingRate, amortizationYears, propertyTaxesAnnual, heatingCostsMonthly }) =>
    `ca-mortgage-affordability-${annualIncome}-income-${monthlyDebtPayments}-debts-${downPayment}-down-${qualifyingRate}-qualifying-${amortizationYears}-years-${propertyTaxesAnnual}-tax-${heatingCostsMonthly}-heat`,
  'ca-rrsp-vs-tfsa-optimizer': ({ currentTaxBracket, expectedRetirementBracket, annualContribution, yearsToRetirement, investmentReturn }) =>
    `ca-rrsp-vs-tfsa-${currentTaxBracket}-current-${expectedRetirementBracket}-retirement-${annualContribution}-contribution-${yearsToRetirement}-years-${investmentReturn}-return`,
  'ca-income-tax-take-home': ({ grossSalary, province, rrspContribution, otherDeductions, payFrequency }) =>
    `ca-take-home-${grossSalary}-salary-${normalizeSlugPart(province)}-${rrspContribution}-rrsp-${otherDeductions}-deductions-${normalizeSlugPart(payFrequency)}`,
  'ca-cpp-oas-estimator': ({ birthYear, averageEarnings, yearsContributed, claimingAgeCPP, oasClaimingAge }) =>
    `ca-cpp-oas-${birthYear}-birth-${averageEarnings}-earnings-${yearsContributed}-years-${claimingAgeCPP}-cpp-${oasClaimingAge}-oas`,
  'ca-cmhc-home-affordability': ({ annualIncome, downPayment, mortgageRate, amortizationYears, propertyTaxesAnnual, heatingCostsMonthly }) =>
    `ca-cmhc-affordability-${annualIncome}-income-${downPayment}-down-${mortgageRate}-rate-${amortizationYears}-years-${propertyTaxesAnnual}-tax-${heatingCostsMonthly}-heat`,
  'au-superannuation-retirement-projection': ({ currentSuperBalance, annualContribution, age, expectedReturn, retirementAge, insuranceFeesAnnual }) =>
    `au-super-projection-${currentSuperBalance}-balance-${annualContribution}-contribution-${age}-age-${expectedReturn}-return-${retirementAge}-retire-${insuranceFeesAnnual}-fees`,
  'au-mortgage-offset-savings': ({ mortgageBalance, interestRate, offsetBalance, monthlyOffsetDeposit, remainingTermYears }) =>
    `au-offset-savings-${mortgageBalance}-mortgage-${interestRate}-rate-${offsetBalance}-offset-${monthlyOffsetDeposit}-deposit-${remainingTermYears}-years`,
  'au-income-tax-take-home': ({ grossSalary, taxResident, superContribution, otherDeductions, payFrequency }) =>
    `au-take-home-${grossSalary}-salary-${normalizeSlugPart(taxResident)}-${superContribution}-super-${otherDeductions}-deductions-${normalizeSlugPart(payFrequency)}`,
  'au-first-home-buyer-affordability': ({ annualIncome, downPayment, state, propertyPrice, stampDutyExemption }) =>
    `au-first-home-${annualIncome}-income-${downPayment}-deposit-${normalizeSlugPart(state)}-${propertyPrice}-price-${normalizeSlugPart(stampDutyExemption)}`,
  'au-negative-gearing-return': ({ propertyPurchasePrice, depositPercent, rentalIncomeAnnual, interestRate, annualExpenses, marginalTaxRate }) =>
    `au-negative-gearing-${propertyPurchasePrice}-price-${depositPercent}-deposit-${rentalIncomeAnnual}-rent-${interestRate}-rate-${annualExpenses}-expenses-${marginalTaxRate}-tax`,
  'uk-mortgage-affordability-stress-test': ({ annualIncome, monthlyOutgoings, depositAmount, stressTestRate, termYears, propertyValueEstimate }) =>
    `uk-mortgage-affordability-${annualIncome}-income-${monthlyOutgoings}-outgoings-${depositAmount}-deposit-${stressTestRate}-stress-${termYears}-years-${propertyValueEstimate}-property`,
  'uk-pension-tax-relief-optimizer': ({ grossSalary, currentTaxBand, annualContribution, yearsToRetirement, expectedReturn }) =>
    `uk-pension-tax-relief-${grossSalary}-salary-${normalizeSlugPart(currentTaxBand)}-${annualContribution}-contribution-${yearsToRetirement}-years-${expectedReturn}-return`,
  'uk-income-tax-ni-take-home': ({ grossSalary, taxYear, pensionContribution, studentLoanPlan, payFrequency }) =>
    `uk-income-tax-ni-${grossSalary}-salary-${normalizeSlugPart(taxYear)}-${pensionContribution}-pension-${normalizeSlugPart(studentLoanPlan)}-${normalizeSlugPart(payFrequency)}`,
  'uk-isa-vs-pension-comparison': ({ annualAmount, currentTaxRate, retirementTaxRate, yearsInvested, investmentReturn }) =>
    `uk-isa-vs-pension-${annualAmount}-amount-${currentTaxRate}-current-${retirementTaxRate}-retirement-${yearsInvested}-years-${investmentReturn}-return`,
  'uk-stamp-duty-first-time-buyer': ({ propertyPrice, firstTimeBuyer, additionalProperty, nonUkResident, companyPurchase }) =>
    `uk-stamp-duty-${propertyPrice}-price-${normalizeSlugPart(firstTimeBuyer)}-${normalizeSlugPart(additionalProperty)}-${normalizeSlugPart(nonUkResident)}-${normalizeSlugPart(companyPurchase)}`,
  'sg-cpf-retirement-projection': ({ currentCPFBalance, monthlySalary, age, expectedReturnOA, retirementAge }) =>
    `sg-cpf-projection-${currentCPFBalance}-balance-${monthlySalary}-salary-${age}-age-${expectedReturnOA}-return-${retirementAge}-retirement`,
  'sg-hdb-loan-affordability': ({ monthlyIncome, existingCommitments, downPayment, loanTenureYears, interestRate }) =>
    `sg-hdb-affordability-${monthlyIncome}-income-${existingCommitments}-commitments-${downPayment}-down-${loanTenureYears}-years-${interestRate}-rate`,
  'sg-income-tax-take-home': ({ grossSalaryAnnual, residentStatus, cpfContribution, otherReliefs, payFrequency }) =>
    `sg-take-home-${grossSalaryAnnual}-salary-${normalizeSlugPart(residentStatus)}-${cpfContribution}-cpf-${otherReliefs}-reliefs-${normalizeSlugPart(payFrequency)}`,
  'sg-srs-vs-cpf-top-up': ({ taxableIncome, currentTaxBracket, annualTopUp, yearsToRetirement, investmentReturn }) =>
    `sg-srs-vs-cpf-${taxableIncome}-income-${currentTaxBracket}-tax-${annualTopUp}-topup-${yearsToRetirement}-years-${investmentReturn}-return`,
  'sg-buyer-stamp-duty-absd': ({ propertyPrice, buyerStatus, numberOfProperties, firstProperty }) =>
    `sg-bsd-absd-${propertyPrice}-price-${normalizeSlugPart(buyerStatus)}-${numberOfProperties}-properties-${normalizeSlugPart(firstProperty)}`,
  'in-home-loan-eligibility-emi': ({ grossMonthlyIncome, monthlyObligations, age, loanTenureYears, interestRate, cityTier }) =>
    `in-home-loan-${grossMonthlyIncome}-income-${monthlyObligations}-obligations-${age}-age-${loanTenureYears}-years-${interestRate}-rate-${normalizeSlugPart(cityTier)}`,
  'in-ppf-epf-retirement-projection': ({ currentAge, monthlyContributionPPF, monthlyEPFBasic, retirementAge, expectedPPFReturn }) =>
    `in-ppf-epf-${currentAge}-age-${monthlyContributionPPF}-ppf-${monthlyEPFBasic}-epf-${retirementAge}-retire-${expectedPPFReturn}-return`,
  'in-income-tax-take-home': ({ annualGrossSalary, standardDeduction, otherIncome, payFrequency, regime }) =>
    `in-take-home-${annualGrossSalary}-salary-${standardDeduction}-deduction-${otherIncome}-other-${normalizeSlugPart(payFrequency)}-${normalizeSlugPart(regime)}`,
  'in-nps-vs-epf-comparison': ({ monthlyContribution, currentAge, expectedReturnNPS, expectedReturnEPF, yearsToRetirement }) =>
    `in-nps-vs-epf-${monthlyContribution}-contribution-${currentAge}-age-${expectedReturnNPS}-nps-${expectedReturnEPF}-epf-${yearsToRetirement}-years`,
  'in-stamp-duty-registration': ({ propertyValue, state, propertyType, buyerGender }) =>
    `in-stamp-duty-${propertyValue}-value-${normalizeSlugPart(state)}-${normalizeSlugPart(propertyType)}-${normalizeSlugPart(buyerGender)}`,
  'br-salario-liquido-clt-pj': ({ salarioBrutoMensal, tipoContratacao, dependentes, descontosPlanoSaude, outrosDescontos }) =>
    `br-salario-liquido-${salarioBrutoMensal}-bruto-${normalizeSlugPart(tipoContratacao)}-${dependentes}-dependentes-${descontosPlanoSaude}-saude-${outrosDescontos}-descontos`,
  'br-irpf-2026': ({ rendaBrutaAnual, deducoesLegais, tipoDeclaracao, fontePrincipal }) =>
    `br-irpf-2026-${rendaBrutaAnual}-renda-${deducoesLegais}-deducoes-${normalizeSlugPart(tipoDeclaracao)}-${normalizeSlugPart(fontePrincipal)}`,
  'br-fgts-modalidades-saldo': ({ saldoAtual, depositoMensal, anosProjetados, modalidadePretendida }) =>
    `br-fgts-${saldoAtual}-saldo-${depositoMensal}-deposito-${anosProjetados}-anos-${normalizeSlugPart(modalidadePretendida)}`,
  'br-inss-aposentadoria-beneficio': ({ idadeAtual, tempoContribuicaoMeses, salarioMedioContribuicao, tipoBeneficio }) =>
    `br-inss-${idadeAtual}-idade-${tempoContribuicaoMeses}-meses-${salarioMedioContribuicao}-salario-${normalizeSlugPart(tipoBeneficio)}`,
  'br-financiamento-imobiliario-sac-price': ({ valorImovel, entrada, prazoAnos, taxaJurosAnual, sistemaAmortizacao }) =>
    `br-financiamento-${valorImovel}-imovel-${entrada}-entrada-${prazoAnos}-anos-${taxaJurosAnual}-juros-${normalizeSlugPart(sistemaAmortizacao)}`,
  'ie-income-tax-take-home': ({ grossSalary, taxStatus, pensionContribution, taxCredits, payFrequency }) =>
    `ie-take-home-${grossSalary}-salary-${normalizeSlugPart(taxStatus)}-${pensionContribution}-pension-${taxCredits}-credits-${normalizeSlugPart(payFrequency)}`,
  'nz-income-tax-take-home': ({ grossSalary, kiwiSaverRate, studentLoan, otherDeductions, payFrequency }) =>
    `nz-take-home-${grossSalary}-salary-${kiwiSaverRate}-kiwisaver-${normalizeSlugPart(studentLoan)}-${otherDeductions}-deductions-${normalizeSlugPart(payFrequency)}`,
  'za-income-tax-take-home': ({ grossSalary, ageBand, retirementContribution, medicalAidCreditsMonthly, payFrequency }) =>
    `za-take-home-${grossSalary}-salary-${normalizeSlugPart(ageBand)}-${retirementContribution}-retirement-${medicalAidCreditsMonthly}-medical-${normalizeSlugPart(payFrequency)}`,
  'ie-mortgage-affordability-stress-test': ({ annualIncome, monthlyOutgoings, depositAmount, stressTestRate, termYears, propertyValueEstimate }) =>
    `ie-mortgage-affordability-${annualIncome}-income-${monthlyOutgoings}-outgoings-${depositAmount}-deposit-${stressTestRate}-stress-${termYears}-years-${propertyValueEstimate}-property`,
  'nz-mortgage-affordability-stress-test': ({ annualIncome, monthlyOutgoings, depositAmount, stressTestRate, termYears, propertyValueEstimate }) =>
    `nz-mortgage-affordability-${annualIncome}-income-${monthlyOutgoings}-outgoings-${depositAmount}-deposit-${stressTestRate}-stress-${termYears}-years-${propertyValueEstimate}-property`,
  'za-home-loan-affordability': ({ annualIncome, monthlyDebtPayments, depositAmount, interestRate, termYears, propertyTaxesAnnual }) =>
    `za-home-loan-${annualIncome}-income-${monthlyDebtPayments}-debts-${depositAmount}-deposit-${interestRate}-rate-${termYears}-years-${propertyTaxesAnnual}-rates`,
  'nz-kiwisaver-retirement-projection': ({ currentBalance, annualSalary, employeeContributionRate, annualReturn, currentAge, retirementAge }) =>
    `nz-kiwisaver-${currentBalance}-balance-${annualSalary}-salary-${employeeContributionRate}-employee-${annualReturn}-return-${currentAge}-age-${retirementAge}-retire`,
  'ie-pension-tax-relief-optimizer': ({ grossSalary, marginalTaxRate, annualContribution, yearsToRetirement, expectedReturn }) =>
    `ie-pension-tax-relief-${grossSalary}-salary-${marginalTaxRate}-rate-${annualContribution}-contribution-${yearsToRetirement}-years-${expectedReturn}-return`,
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

type GeneratedSlug = {
  categorySlug: string;
  slug: string;
  params: ParamMap;
};

type GeneratedSlugPath = {
  categorySlug: string;
  slug: string;
};

const sitemapEntryCountCache = new Map<string, number>();

function buildGeneratedEntries<T extends { categorySlug: string; slug: string }>(
  config: CalculatorConfig,
  project: (baseEntry: { categorySlug: string; slug: string; params: ParamMap }) => T
): T[] {
  const variants = enumerateVariants(config);
  const seen = new Set<string>();
  const baseEntries = variants
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
    .filter((variant): variant is GeneratedSlug => Boolean(variant))
    .slice(0, config.maxVariants);

  const geoVariants = getGeoVariants(config).filter((variant) => variant.country || variant.state || variant.region || variant.province || variant.buyerStatus || variant.flatType);
  const allEntries = [...baseEntries];

  if (geoVariants.length > 0) {
    // Expanded 2026 geo-layering: priority US states + high-CPC English markets (AU/CA/UK/NZ/IE/SG) + future non-English (DE/NL/NO)
    const geoCap = Math.min(
      getGeoVariantCap(config),
      Math.max(
        US_STATE_SENSITIVE_CALCULATOR_IDS.has(config.id) ? 2200 : 1600,
        Math.round(config.maxVariants * (US_STATE_SENSITIVE_CALCULATOR_IDS.has(config.id) ? 0.95 : 0.85))
      )
    );
    const maxGeoCombinations = baseEntries.length * geoVariants.length;
    const geoTarget = Math.min(geoCap, maxGeoCombinations);

    for (let index = 0; index < geoTarget; index += 1) {
      const baseEntry = baseEntries[index % baseEntries.length];
      const geo = geoVariants[Math.floor(index / baseEntries.length) % geoVariants.length];
      const suffix = geo.state
        ? geo.state.toLowerCase()
        : geo.region
          ? normalizeSlugPart(geo.region)
          : geo.province
            ? normalizeSlugPart(geo.province)
            : geo.flatType && geo.buyerStatus
              ? `${normalizeSlugPart(geo.flatType)}-${normalizeSlugPart(geo.buyerStatus)}`
              : geo.flatType
                ? normalizeSlugPart(geo.flatType)
                : geo.buyerStatus
                  ? normalizeSlugPart(geo.buyerStatus)
                  : geo.country?.toLowerCase();
      const countryName = geo.country ? COUNTRY_NAME_MAP[geo.country] ?? geo.country : undefined;
      const stateName = geo.state;
      const regionName = geo.region;
      const provinceName = geo.province;
      const buyerStatusName = geo.buyerStatus;
      const flatTypeName = geo.flatType;
      const stateEnhancedParams = getStateEnhancedParams(config, geo, baseEntry.params);
      const australiaStateEnhancedParams = getAustraliaStateEnhancedParams(config, geo, baseEntry.params);
      const ukNationEnhancedParams = getUkNationEnhancedParams(config, geo, baseEntry.params);
      const canadaProvinceEnhancedParams = getCanadaProvinceEnhancedParams(config, geo, baseEntry.params);
      const singaporeNuanceEnhancedParams = getSingaporeNuanceEnhancedParams(config, geo, baseEntry.params);
      const geoParams: ParamMap = {
        ...(geo.country ? { country: geo.country } : {}),
        ...(geo.state ? { state: geo.state } : {}),
        ...(geo.region ? { region: geo.region } : {}),
        ...(geo.province ? { province: geo.province } : {}),
        ...(geo.buyerStatus ? { buyerStatus: geo.buyerStatus } : {}),
        ...(geo.flatType ? { flatType: geo.flatType } : {}),
        ...(geo.languageHint ? { languageHint: geo.languageHint } : {}),
        ...(countryName ? { countryName } : {}),
        ...(stateName ? { stateName } : {}),
        ...(regionName ? { regionName } : {}),
        ...(provinceName ? { provinceName } : {}),
        ...(buyerStatusName ? { buyerStatusName } : {}),
        ...(flatTypeName ? { flatTypeName } : {}),
        ...stateEnhancedParams,
        ...australiaStateEnhancedParams,
        ...ukNationEnhancedParams,
        ...canadaProvinceEnhancedParams,
        ...singaporeNuanceEnhancedParams,
      };

      if (!suffix) {
        continue;
      }

      const slug = `${baseEntry.slug}-${suffix}`;
      if (seen.has(slug)) {
        continue;
      }

      seen.add(slug);
      allEntries.push({
        categorySlug: baseEntry.categorySlug,
        slug,
        params: {
          ...baseEntry.params,
          ...geoParams,
        },
      });
    }
  }

  return allEntries.map(project);
}

function getBaseVariantCount(config: CalculatorConfig): number {
  if (!config.isValidVariant) {
    const rawCount = config.params.reduce((total, param) => total * param.values.length, 1);
    return Math.min(rawCount, config.maxVariants);
  }

  let validCount = 0;

  const visit = (index: number, current: ParamMap) => {
    if (validCount >= config.maxVariants) {
      return;
    }

    if (index === config.params.length) {
      if (config.isValidVariant?.(current)) {
        validCount += 1;
      }
      return;
    }

    const param = config.params[index];

    for (const value of param.values) {
      if (validCount >= config.maxVariants) {
        break;
      }

      current[param.key] = value;
      visit(index + 1, current);
    }

    delete current[param.key];
  };

  visit(0, {});

  return validCount;
}

function getGeneratedEntryCount(config: CalculatorConfig): number {
  const cached = sitemapEntryCountCache.get(config.id);

  if (cached !== undefined) {
    return cached;
  }

  const baseCount = getBaseVariantCount(config);
  const geoVariants = getGeoVariants(config).filter(
    (variant) => variant.country || variant.state || variant.region || variant.province || variant.buyerStatus || variant.flatType,
  );
  const geoCap = Math.min(
    getGeoVariantCap(config),
    Math.max(
      US_STATE_SENSITIVE_CALCULATOR_IDS.has(config.id) ? 2200 : 1600,
      Math.round(config.maxVariants * (US_STATE_SENSITIVE_CALCULATOR_IDS.has(config.id) ? 0.95 : 0.85)),
    ),
  );
  const geoCount = geoVariants.length > 0 ? Math.min(geoCap, baseCount * geoVariants.length) : 0;
  const count = baseCount + geoCount;

  sitemapEntryCountCache.set(config.id, count);

  return count;
}

export function generateStaticProgrammaticPaths(limit: number): GeneratedSlugPath[] {
  const entries: GeneratedSlugPath[] = [];

  for (const config of calculators) {
    const configEntries = buildGeneratedEntries(config, ({ categorySlug, slug }) => ({
      categorySlug,
      slug,
    }));

    for (const entry of configEntries) {
      entries.push(entry);
      if (entries.length >= limit) {
        return entries;
      }
    }
  }

  return entries;
}

export function generateAllSitemapEntries(): GeneratedSlugPath[] {
  return calculators.flatMap((config) =>
    buildGeneratedEntries(config, ({ categorySlug, slug }) => ({
      categorySlug,
      slug,
    }))
  );
}

export function getSitemapEntryCount(): number {
  return calculators.reduce((total, config) => total + getGeneratedEntryCount(config), 0);
}

export function generateSitemapChunkEntries(chunkIndex: number, chunkSize: number): GeneratedSlugPath[] {
  if (chunkIndex < 0 || chunkSize <= 0) {
    return [];
  }

  let offset = chunkIndex * chunkSize;
  let remaining = chunkSize;
  const entries: GeneratedSlugPath[] = [];

  for (const config of calculators) {
    const configCount = getGeneratedEntryCount(config);

    if (offset >= configCount) {
      offset -= configCount;
      continue;
    }

    const configEntries = buildGeneratedEntries(config, ({ categorySlug, slug }) => ({
      categorySlug,
      slug,
    }));

    const slice = configEntries.slice(offset, offset + remaining);
    entries.push(...slice);
    remaining -= slice.length;
    offset = 0;

    if (remaining <= 0) {
      break;
    }
  }

  return entries;
}

export function findGeneratedSlug(categorySlug: string, slug: string): GeneratedSlug | null {
  const config = calculators.find((entry) => entry.categorySlug === categorySlug);

  if (!config) {
    return null;
  }

  return buildGeneratedEntries(config, (entry) => entry).find((entry) => entry.slug === slug) ?? null;
}

export function getRepresentativeGeneratedSlug(categorySlug: string): GeneratedSlug | null {
  const config = calculators.find((entry) => entry.categorySlug === categorySlug);

  if (!config) {
    return null;
  }

  return buildGeneratedEntries(config, (entry) => entry)[0] ?? null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function generateAllSlugs(): { categorySlug: string; slug: string; params: Record<string, any> }[] {
  return calculators.flatMap((config) => buildGeneratedEntries(config, (entry) => entry));
}
