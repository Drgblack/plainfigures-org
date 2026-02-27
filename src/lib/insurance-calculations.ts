// ── Business Interruption ─────────────────────────────────────────────────────

export interface BIResult {
  grossProfit: number;
  recommendedSumInsured: number;
  indemnityPeriodMonths: number;
  adjustedForTrend: number;
  icow: number;
  annualRevenue: number;
  variableCosts: number;
  yearlyBreakdown: { month: number; cumulativeLoss: number; icow: number }[];
}

export function calculateBI(
  annualRevenue: number,
  variableCosts: number,
  indemnityMonths: number,
  annualPayroll: number,
  trendRate: number,
  icowRate: number
): BIResult {
  const variableCostAmount = annualRevenue * (variableCosts / 100);
  const grossProfit = annualRevenue - variableCostAmount;
  const trendMultiplier = 1 + trendRate / 100;
  const adjustedGrossProfit = grossProfit * trendMultiplier;
  const biSumInsured = adjustedGrossProfit * (indemnityMonths / 12);
  const icow = biSumInsured * (icowRate / 100);
  const recommendedSumInsured = biSumInsured + icow;

  const monthlyGP = adjustedGrossProfit / 12;
  const monthlyICOW = icow / indemnityMonths;
  const yearlyBreakdown = [];
  for (let m = 1; m <= indemnityMonths; m++) {
    yearlyBreakdown.push({ month: m, cumulativeLoss: monthlyGP * m, icow: monthlyICOW * m });
  }

  return {
    grossProfit, recommendedSumInsured, indemnityPeriodMonths: indemnityMonths,
    adjustedForTrend: adjustedGrossProfit, icow, annualRevenue,
    variableCosts: variableCostAmount, yearlyBreakdown,
  };
}

// ── Human Life Value ──────────────────────────────────────────────────────────

export interface HLVResult {
  humanLifeValue: number;
  incomeReplacement: number;
  debtCoverage: number;
  futureFunding: number;
  existingCoverage: number;
  coverageGap: number;
  yearsToRetirement: number;
  breakdown: { label: string; value: number; description: string }[];
}

export function calculateHLV(
  currentAge: number,
  retirementAge: number,
  annualIncome: number,
  incomeReplacementPct: number,
  annualExpenseInflation: number,
  outstandingMortgage: number,
  otherDebts: number,
  futureFundingNeeds: number,
  existingCoverage: number,
  discountRate: number
): HLVResult {
  const yearsToRetirement = retirementAge - currentAge;
  const replacementIncome = annualIncome * (incomeReplacementPct / 100);
  const realRate = ((1 + discountRate / 100) / (1 + annualExpenseInflation / 100) - 1);
  let pvIncome = 0;
  for (let y = 1; y <= yearsToRetirement; y++) {
    pvIncome += replacementIncome / Math.pow(1 + realRate, y);
  }
  const debtCoverage = outstandingMortgage + otherDebts;
  const totalHLV = pvIncome + debtCoverage + futureFundingNeeds;
  const coverageGap = Math.max(0, totalHLV - existingCoverage);

  const breakdown = [
    { label: 'Income Replacement (PV)', value: pvIncome, description: `${yearsToRetirement} years of ${incomeReplacementPct}% income, inflation-adjusted` },
    { label: 'Mortgage & Debt Clearance', value: debtCoverage, description: 'Outstanding mortgage and other debts' },
    { label: 'Future Funding Needs', value: futureFundingNeeds, description: 'Education, dependant care, other commitments' },
    { label: 'Less: Existing Cover', value: -existingCoverage, description: 'Current life insurance policies' },
  ];

  return { humanLifeValue: totalHLV, incomeReplacement: pvIncome, debtCoverage, futureFunding: futureFundingNeeds, existingCoverage, coverageGap, yearsToRetirement, breakdown };
}

// ── Cyber Risk ────────────────────────────────────────────────────────────────

export interface CyberResult {
  estimatedBreachCost: number;
  riskScore: number;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  breakdown: { category: string; cost: number; description: string }[];
  recommendedCoverLimit: number;
  annualPremiumEstimate: { low: number; high: number };
}

export function calculateCyberRisk(
  annualRevenue: number,
  employeeCount: number,
  customerRecords: number,
  industryRisk: number,
  hasMFA: boolean,
  hasBackups: boolean,
  hasIncidentResponse: boolean,
  hasSecurityTraining: boolean,
  hasEncryption: boolean
): CyberResult {
  const costPerRecord = 165;
  const recordBreachCost = Math.min(customerRecords * costPerRecord, annualRevenue * 0.4);
  const dailyRevenue = annualRevenue / 365;
  const avgDowntimeDays = industryRisk * 4;
  const biCost = dailyRevenue * avgDowntimeDays;
  const ransomwareDemand = Math.min(annualRevenue * 0.03 * industryRisk, 2000000);
  const legalAndNotification = Math.min(customerRecords * 8, 500000);
  const regulatoryFine = annualRevenue * 0.02 * industryRisk;
  const reputationLoss = annualRevenue * 0.05 * industryRisk;
  const rawTotal = recordBreachCost + biCost + ransomwareDemand + legalAndNotification + regulatoryFine + reputationLoss;

  let riskScore = 50 * industryRisk / 5;
  riskScore += Math.log10(customerRecords + 1) * 5;
  riskScore += Math.log10(employeeCount + 1) * 3;
  if (!hasMFA) riskScore += 15;
  if (!hasBackups) riskScore += 15;
  if (!hasIncidentResponse) riskScore += 10;
  if (!hasSecurityTraining) riskScore += 8;
  if (!hasEncryption) riskScore += 12;
  riskScore = Math.min(100, Math.round(riskScore));

  let controlsDiscount = 1.0;
  if (hasMFA) controlsDiscount -= 0.15;
  if (hasBackups) controlsDiscount -= 0.15;
  if (hasIncidentResponse) controlsDiscount -= 0.1;
  if (hasSecurityTraining) controlsDiscount -= 0.08;
  if (hasEncryption) controlsDiscount -= 0.12;

  const estimatedBreachCost = rawTotal * controlsDiscount;
  const riskLevel: CyberResult['riskLevel'] =
    riskScore >= 75 ? 'Critical' : riskScore >= 50 ? 'High' : riskScore >= 25 ? 'Medium' : 'Low';
  const recommendedCoverLimit = Math.ceil(estimatedBreachCost / 500000) * 500000;
  const premiumRate = 0.01 + (riskScore / 100) * 0.025;

  const breakdown = [
    { category: 'Data Breach (per record)', cost: recordBreachCost, description: `${customerRecords.toLocaleString()} records @ ~$165/record` },
    { category: 'Business Interruption', cost: biCost, description: `~${avgDowntimeDays} days downtime at daily revenue rate` },
    { category: 'Ransomware Demand', cost: ransomwareDemand, description: 'Estimated ransom demand based on revenue & industry' },
    { category: 'Legal & Notification', cost: legalAndNotification, description: 'Regulatory notification, legal fees, credit monitoring' },
    { category: 'Regulatory Fines', cost: regulatoryFine, description: 'GDPR, CCPA, sector-specific penalties' },
    { category: 'Reputation & Revenue Loss', cost: reputationLoss, description: 'Customer churn and brand damage' },
  ];

  return {
    estimatedBreachCost, riskScore, riskLevel, breakdown,
    recommendedCoverLimit,
    annualPremiumEstimate: { low: recommendedCoverLimit * premiumRate * 0.7, high: recommendedCoverLimit * premiumRate * 1.3 },
  };
}

// ── TCOR — Total Cost of Risk ─────────────────────────────────────────────────
export interface TCORInputs {
  premiums: number;
  retainedLosses: number;
  adminCosts: number;
  riskControlCosts: number;
  revenue: number;
}

export interface TCORScenario {
  label: string;
  tcor: number;
  premiums: number;
  retainedLosses: number;
  adminCosts: number;
  riskControlCosts: number;
  tcorRate: number; // per $1000 revenue
}

export interface TCORResult {
  base: TCORScenario;
  scenarios: TCORScenario[];
}

export function calculateTCOR(inputs: TCORInputs): TCORResult {
  const makeScenario = (label: string, p: number, r: number, a: number, rc: number): TCORScenario => {
    const tcor = p + r + a + rc;
    return { label, tcor, premiums: p, retainedLosses: r, adminCosts: a, riskControlCosts: rc, tcorRate: inputs.revenue > 0 ? (tcor / inputs.revenue) * 1000 : 0 };
  };

  const base = makeScenario('Base Case', inputs.premiums, inputs.retainedLosses, inputs.adminCosts, inputs.riskControlCosts);

  // Scenario: Higher retained losses (claims year)
  const badYear = makeScenario('High Loss Year', inputs.premiums * 1.08, inputs.retainedLosses * 2.2, inputs.adminCosts * 1.15, inputs.riskControlCosts);

  // Scenario: Improved risk management (higher control costs, lower losses)
  const improved = makeScenario('Improved Risk Mgmt', inputs.premiums * 0.92, inputs.retainedLosses * 0.6, inputs.adminCosts, inputs.riskControlCosts * 1.4);

  // Scenario: Self-insurance (lower premiums, higher retained)
  const selfInsure = makeScenario('Higher Self-Insurance', inputs.premiums * 0.65, inputs.retainedLosses * 1.8, inputs.adminCosts * 1.2, inputs.riskControlCosts * 1.1);

  return { base, scenarios: [base, badYear, improved, selfInsure] };
}

// ── Risk Score / Heat Map ─────────────────────────────────────────────────────
export interface Risk {
  id: string;
  name: string;
  likelihood: number;   // 1–5
  impact: number;       // 1–5
  mitigatedLikelihood?: number;
  mitigatedImpact?: number;
}

export interface RiskScore {
  id: string;
  name: string;
  score: number;
  mitigatedScore: number;
  level: 'low' | 'medium' | 'high' | 'critical';
  mitigatedLevel: 'low' | 'medium' | 'high' | 'critical';
  reduction: number; // %
}

function scoreToLevel(score: number): 'low' | 'medium' | 'high' | 'critical' {
  if (score <= 4) return 'low';
  if (score <= 9) return 'medium';
  if (score <= 16) return 'high';
  return 'critical';
}

export function calculateRiskScores(risks: Risk[]): RiskScore[] {
  return risks.map(r => {
    const score = r.likelihood * r.impact;
    const ml = r.mitigatedLikelihood ?? r.likelihood;
    const mi = r.mitigatedImpact ?? r.impact;
    const mitigatedScore = ml * mi;
    const reduction = score > 0 ? ((score - mitigatedScore) / score) * 100 : 0;
    return {
      id: r.id,
      name: r.name,
      score,
      mitigatedScore,
      level: scoreToLevel(score),
      mitigatedLevel: scoreToLevel(mitigatedScore),
      reduction,
    };
  });
}

export const HEAT_MAP_COLOR: Record<string, string> = {
  low: '#2ec88a',
  medium: '#d4a843',
  high: '#e07a2e',
  critical: '#e05252',
};

// ── SCR — Solvency Capital Requirement Estimator ──────────────────────────────
export interface SCRInputs {
  totalAssets: number;
  technicalProvisions: number;   // liabilities
  otherLiabilities: number;
  marketRiskFactor: number;      // % of assets
  underwritingRiskFactor: number;// % of premiums
  annualPremiums: number;
  operationalRiskFactor: number; // %
  diversificationCredit: number; // %
}

export interface SCRScenario {
  label: string;
  navBase: number;         // Net Asset Value (NAV) = assets - liabilities
  marketRisk: number;
  underwritingRisk: number;
  operationalRisk: number;
  basicSCR: number;
  adjustedSCR: number;    // after diversification
  surplusOrDeficit: number; // NAV - SCR
  solvencyRatio: number;   // NAV / SCR as %
  adequacy: 'strong' | 'adequate' | 'marginal' | 'deficit';
}

function makeSCRScenario(label: string, assets: number, tp: number, otherLiab: number, mrf: number, urf: number, premiums: number, orf: number, div: number): SCRScenario {
  const totalLiab = tp + otherLiab;
  const navBase = assets - totalLiab;
  const marketRisk = assets * (mrf / 100);
  const underwritingRisk = premiums * (urf / 100);
  const operationalRisk = (marketRisk + underwritingRisk) * (orf / 100);
  const basicSCR = Math.sqrt(marketRisk ** 2 + underwritingRisk ** 2 + operationalRisk ** 2);
  const adjustedSCR = basicSCR * (1 - div / 100);
  const surplusOrDeficit = navBase - adjustedSCR;
  const solvencyRatio = adjustedSCR > 0 ? (navBase / adjustedSCR) * 100 : 0;
  const adequacy: SCRScenario['adequacy'] =
    solvencyRatio >= 200 ? 'strong' :
    solvencyRatio >= 130 ? 'adequate' :
    solvencyRatio >= 100 ? 'marginal' : 'deficit';
  return { label, navBase, marketRisk, underwritingRisk, operationalRisk, basicSCR, adjustedSCR, surplusOrDeficit, solvencyRatio, adequacy };
}

export function calculateSCR(inputs: SCRInputs): { base: SCRScenario; scenarios: SCRScenario[] } {
  const { totalAssets: a, technicalProvisions: tp, otherLiabilities: ol, marketRiskFactor: mrf, underwritingRiskFactor: urf, annualPremiums: p, operationalRiskFactor: orf, diversificationCredit: div } = inputs;

  const base = makeSCRScenario('Base Case', a, tp, ol, mrf, urf, p, orf, div);
  const marketStress = makeSCRScenario('Market Stress (−25% assets)', a * 0.75, tp, ol, mrf * 1.3, urf, p, orf, div);
  const catastrophe = makeSCRScenario('Catastrophe Year (+50% claims)', a, tp * 1.15, ol, mrf, urf * 1.5, p * 1.5, orf * 1.2, div * 0.8);
  const combined = makeSCRScenario('Combined Stress', a * 0.85, tp * 1.1, ol, mrf * 1.2, urf * 1.3, p * 1.2, orf * 1.1, div * 0.9);

  return { base, scenarios: [base, marketStress, catastrophe, combined] };
}

// ── Coverage Gap Analysis ──────────────────────────────────────────────────────
export interface CoverageGapInputs {
  propertyValue: number;
  contentValue: number;
  liabilityExposure: number;
  biExposure: number;          // business interruption
  cyberExposure: number;
  propertyLimit: number;
  contentLimit: number;
  liabilityLimit: number;
  biLimit: number;
  cyberLimit: number;
  coinsuranceRate: number;     // % (80/90/100)
}

export interface CoverageItem {
  name: string;
  exposure: number;
  limit: number;
  gap: number;
  gapPct: number;
  coinsurancePenalty: number;
  status: 'adequate' | 'partial' | 'significant' | 'critical';
}

export interface CoverageGapResult {
  items: CoverageItem[];
  totalExposure: number;
  totalLimit: number;
  totalGap: number;
  overallGapPct: number;
  totalCoinsurancePenalty: number;
}

function gapStatus(pct: number): CoverageItem['status'] {
  if (pct <= 0) return 'adequate';
  if (pct < 20) return 'partial';
  if (pct < 50) return 'significant';
  return 'critical';
}

export function calculateCoverageGap(inputs: CoverageGapInputs, exposureMultiplier = 1): CoverageGapResult {
  const lines = [
    { name: 'Property', exposure: inputs.propertyValue * exposureMultiplier, limit: inputs.propertyLimit },
    { name: 'Contents', exposure: inputs.contentValue * exposureMultiplier, limit: inputs.contentLimit },
    { name: 'Liability', exposure: inputs.liabilityExposure * exposureMultiplier, limit: inputs.liabilityLimit },
    { name: 'Business Interruption', exposure: inputs.biExposure * exposureMultiplier, limit: inputs.biLimit },
    { name: 'Cyber', exposure: inputs.cyberExposure * exposureMultiplier, limit: inputs.cyberLimit },
  ];

  const items: CoverageItem[] = lines.map(({ name, exposure, limit }) => {
    const gap = Math.max(0, exposure - limit);
    const gapPct = exposure > 0 ? (gap / exposure) * 100 : 0;
    // Coinsurance penalty: if insured < coinsuranceRate% of value, proportional reduction applies
    const requiredInsured = exposure * (inputs.coinsuranceRate / 100);
    const coinsurancePenalty = limit < requiredInsured && exposure > 0
      ? gap * ((requiredInsured - limit) / requiredInsured)
      : 0;
    return { name, exposure, limit, gap, gapPct, coinsurancePenalty, status: gapStatus(gapPct) };
  });

  const totalExposure = items.reduce((s, i) => s + i.exposure, 0);
  const totalLimit = items.reduce((s, i) => s + i.limit, 0);
  const totalGap = items.reduce((s, i) => s + i.gap, 0);
  const overallGapPct = totalExposure > 0 ? (totalGap / totalExposure) * 100 : 0;
  const totalCoinsurancePenalty = items.reduce((s, i) => s + i.coinsurancePenalty, 0);

  return { items, totalExposure, totalLimit, totalGap, overallGapPct, totalCoinsurancePenalty };
}

// ── LTV / CAC Calculator ───────────────────────────────────────────────────────
export interface LTVCACInputs {
  arpu: number;             // Average Revenue Per User / month
  grossMarginPct: number;   // %
  churnRatePct: number;     // monthly %
  cacPerCustomer: number;   // Customer Acquisition Cost
  salesCycleDays: number;
  monthlyNewCustomers: number;
  discountRatePct: number;  // annual, for DCF LTV
}

export interface LTVCACResult {
  avgLifetimeMonths: number;
  simpleLTV: number;         // ARPU × margin × lifetime
  dcfLTV: number;            // discounted cash flow LTV
  ltvcacRatio: number;
  paybackMonths: number;
  monthlyGrossProfit: number;
  annualGrossProfit: number;
  cohortValue12m: number;   // value of monthly new customers at 12m
  rating: 'excellent' | 'good' | 'marginal' | 'poor';
}

export function calculateLTVCAC(inputs: LTVCACInputs): LTVCACResult {
  const churn = inputs.churnRatePct / 100;
  const margin = inputs.grossMarginPct / 100;
  const monthlyDiscount = inputs.discountRatePct / 100 / 12;

  const avgLifetimeMonths = churn > 0 ? 1 / churn : 120;
  const monthlyGrossProfit = inputs.arpu * margin;
  const simpleLTV = monthlyGrossProfit * avgLifetimeMonths;

  // DCF LTV: PV of monthly GP stream
  let dcfLTV = 0;
  const cap = Math.min(Math.round(avgLifetimeMonths * 2), 240);
  for (let m = 1; m <= cap; m++) {
    const survivalProb = Math.pow(1 - churn, m);
    const pv = (monthlyGrossProfit * survivalProb) / Math.pow(1 + monthlyDiscount, m);
    dcfLTV += pv;
  }

  const ltvcacRatio = inputs.cacPerCustomer > 0 ? simpleLTV / inputs.cacPerCustomer : 0;
  const paybackMonths = monthlyGrossProfit > 0 ? inputs.cacPerCustomer / monthlyGrossProfit : 0;
  const annualGrossProfit = monthlyGrossProfit * 12;
  const cohortValue12m = inputs.monthlyNewCustomers * dcfLTV;

  const rating: LTVCACResult['rating'] =
    ltvcacRatio >= 4 ? 'excellent' :
    ltvcacRatio >= 2.5 ? 'good' :
    ltvcacRatio >= 1 ? 'marginal' : 'poor';

  return { avgLifetimeMonths, simpleLTV, dcfLTV, ltvcacRatio, paybackMonths, monthlyGrossProfit, annualGrossProfit, cohortValue12m, rating };
}

// ── Loss Probability Modeler ───────────────────────────────────────────────────
export interface LossEvent {
  id: string;
  name: string;
  annualFrequency: number;    // expected events per year
  minLoss: number;
  mostLikelyLoss: number;
  maxLoss: number;
  mitigationPct: number;      // % reduction from controls
}

export interface LossEventResult {
  id: string;
  name: string;
  expectedLoss: number;         // freq × triangular mean
  worstCase: number;
  annualizedExpected: number;
  mitigatedExpected: number;
  mitigatedWorstCase: number;
  exceedanceProbability: { threshold: number; prob: number }[];
}

export interface LossModelResult {
  events: LossEventResult[];
  totalExpectedLoss: number;
  totalWorstCase: number;
  totalMitigatedExpected: number;
  aggregatePML: number;           // Probable Maximum Loss (95th pct approximation)
  mitigationBenefit: number;
}

function triangularMean(min: number, mode: number, max: number): number {
  return (min + mode + max) / 3;
}

function triangularP(x: number, min: number, mode: number, max: number): number {
  if (x <= min) return 0;
  if (x >= max) return 1;
  const range = max - min;
  if (range === 0) return 0.5;
  if (x <= mode) return Math.pow(x - min, 2) / (range * (mode - min + 0.001));
  return 1 - Math.pow(max - x, 2) / (range * (max - mode + 0.001));
}

export function calculateLossModel(events: LossEvent[]): LossModelResult {
  const results: LossEventResult[] = events.map(e => {
    const mean = triangularMean(e.minLoss, e.mostLikelyLoss, e.maxLoss);
    const expectedLoss = mean;
    const worstCase = e.maxLoss;
    const annualizedExpected = expectedLoss * e.annualFrequency;
    const mitigationFactor = 1 - e.mitigationPct / 100;
    const mitigatedExpected = annualizedExpected * mitigationFactor;
    const mitigatedWorstCase = worstCase * mitigationFactor;

    // Exceedance probability at 25%, 50%, 75%, 100% of max
    const thresholds = [0.25, 0.5, 0.75, 1.0].map(pct => e.maxLoss * pct);
    const exceedanceProbability = thresholds.map(t => ({
      threshold: t,
      prob: (1 - triangularP(t, e.minLoss, e.mostLikelyLoss, e.maxLoss)) * e.annualFrequency,
    }));

    return { id: e.id, name: e.name, expectedLoss, worstCase, annualizedExpected, mitigatedExpected, mitigatedWorstCase, exceedanceProbability };
  });

  const totalExpectedLoss = results.reduce((s, r) => s + r.annualizedExpected, 0);
  const totalWorstCase = results.reduce((s, r) => s + r.worstCase, 0);
  const totalMitigatedExpected = results.reduce((s, r) => s + r.mitigatedExpected, 0);
  // PML approximation: sqrt of sum of squares of worst cases (partial correlation)
  const aggregatePML = Math.sqrt(results.reduce((s, r) => s + r.worstCase ** 2, 0));
  const mitigationBenefit = totalExpectedLoss - totalMitigatedExpected;

  return { events: results, totalExpectedLoss, totalWorstCase, totalMitigatedExpected, aggregatePML, mitigationBenefit };
}

// ── Cyber Insurance Limit Recommender ────────────────────────────────────────
export interface CyberLimitInputs {
  annualRevenue: number;
  recordCount: number;          // PII/sensitive records
  industryRiskMultiplier: number; // 1.0–2.5 by sector
  cloudDependency: number;      // 1–5
  mfaAdoption: number;          // 1–5 (5 = fully deployed)
  patchingScore: number;        // 1–5 (5 = excellent)
  incidentResponsePlan: boolean;
  thirdPartyVendors: number;    // count
  priorBreaches: number;        // in last 3 years
}

export interface CyberLimitResult {
  baseExposure: number;
  adjustedExposure: number;
  recommendedLimit: number;
  breakdownItems: { label: string; value: number; weight: number }[];
  riskScore: number;            // 0–100
  riskBand: 'low' | 'moderate' | 'elevated' | 'high' | 'critical';
  scenarioLimits: { label: string; limit: number; rationale: string }[];
  perRecordCost: number;
  notificationCost: number;
  businessInterruptionExposure: number;
  regulatoryFineExposure: number;
}

export function calculateCyberLimit(inputs: CyberLimitInputs): CyberLimitResult {
  const PER_RECORD_BREACH_COST = 165; // USD industry average

  // Risk score (higher = worse)
  let riskScore = 50;
  riskScore += (5 - inputs.mfaAdoption) * 6;
  riskScore += (5 - inputs.patchingScore) * 5;
  riskScore += inputs.cloudDependency * 3;
  riskScore += Math.min(inputs.thirdPartyVendors * 1.5, 20);
  riskScore += inputs.priorBreaches * 8;
  if (!inputs.incidentResponsePlan) riskScore += 10;
  riskScore = Math.min(100, Math.max(10, riskScore));

  const riskBand: CyberLimitResult['riskBand'] =
    riskScore < 30 ? 'low' :
    riskScore < 50 ? 'moderate' :
    riskScore < 65 ? 'elevated' :
    riskScore < 80 ? 'high' : 'critical';

  // Exposure components
  const notificationCost = inputs.recordCount * PER_RECORD_BREACH_COST;
  const businessInterruptionExposure = inputs.annualRevenue * 0.02 * inputs.cloudDependency; // 2% revenue × cloud factor
  const regulatoryFineExposure = Math.min(inputs.annualRevenue * 0.04, 20000000); // GDPR 4% cap
  const reputationalDamage = inputs.annualRevenue * 0.01 * (riskScore / 50);
  const crisisManagement = notificationCost * 0.15;

  const baseExposure = notificationCost + businessInterruptionExposure + regulatoryFineExposure + reputationalDamage + crisisManagement;
  const adjustedExposure = baseExposure * inputs.industryRiskMultiplier * (riskScore / 50);
  const recommendedLimit = Math.max(adjustedExposure * 0.8, 100000); // 80% of adjusted exposure, min £100k

  const breakdownItems = [
    { label: 'Notification & Credit Monitoring', value: notificationCost, weight: notificationCost / baseExposure },
    { label: 'Business Interruption', value: businessInterruptionExposure, weight: businessInterruptionExposure / baseExposure },
    { label: 'Regulatory Fines (GDPR)', value: regulatoryFineExposure, weight: regulatoryFineExposure / baseExposure },
    { label: 'Reputational Damage', value: reputationalDamage, weight: reputationalDamage / baseExposure },
    { label: 'Crisis Management', value: crisisManagement, weight: crisisManagement / baseExposure },
  ];

  const scenarioLimits = [
    { label: 'Base Scenario', limit: recommendedLimit, rationale: 'Standard exposure at current controls and threat level' },
    { label: 'Elevated Threat (+30%)', limit: recommendedLimit * 1.3, rationale: 'Nation-state or organised crime targeting your sector' },
    { label: 'Regulatory Scrutiny (+20%)', limit: recommendedLimit * 1.2, rationale: 'Active regulatory investigation or enforcement action' },
    { label: 'Supply Chain Event (×1.5)', limit: recommendedLimit * 1.5, rationale: 'Critical vendor compromised — cascading breach scenario' },
  ];

  return {
    baseExposure, adjustedExposure, recommendedLimit, breakdownItems,
    riskScore, riskBand, scenarioLimits,
    perRecordCost: PER_RECORD_BREACH_COST, notificationCost,
    businessInterruptionExposure, regulatoryFineExposure,
  };
}
