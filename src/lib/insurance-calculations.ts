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
