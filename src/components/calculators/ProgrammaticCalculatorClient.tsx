'use client';

import { useMemo, useState } from 'react';
import { InputField, ResultCard, Section } from '@/components/ui';
import { ProgrammaticCalculatorConfig } from '@/lib/finance-calculator-templates';
import { calculateCompound, calculateLoan, calculateMortgage, calculateOffset, calculateRetirement, calculateSaveGoal } from '@/lib/calculations';
import { formatCurrency, formatNumber, formatPercent } from '@/lib/formatting';
import { calculateCyberRisk, calculateLTVCAC, calculateTCOR } from '@/lib/insurance-calculations';
import { calculateFreelanceRate, calculateSubscriptionDrain, calculateTDEE } from '@/lib/lifestyle-calculations';
import { calculateTakeHome, COUNTRY_CONFIG, CountryCode } from '@/lib/tax-calculations';
import styles from './ProgrammaticCalculatorClient.module.css';

const optionGridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(96px, 1fr))', gap: '0.5rem' } as const;
const wideOptionGridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(72px, 1fr))', gap: '0.5rem' } as const;
const compactOptionGridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(84px, 1fr))', gap: '0.5rem' } as const;
const COMPOUND_FREQUENCY_MAP: Record<string, number> = { annual: 1, quarterly: 4, monthly: 12, daily: 365 };
const TDEE_ACTIVITY_MAP: Record<string, number> = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, 'very-active': 1.9 };
const CYBER_RISK_MAP: Record<string, number> = { low: 1, medium: 2, elevated: 3, high: 4, critical: 5 };

function money(value: number, currency = 'usd') {
  return formatCurrency(value, currency as never, {
    minimumFractionDigits: value < 10 ? 2 : 0,
    maximumFractionDigits: value < 10 ? 2 : 0,
  });
}

function optionButton(active: boolean) {
  return {
    padding: '0.55rem 0.7rem',
    background: active ? 'var(--accent-dim)' : 'var(--bg)',
    border: `1px solid ${active ? 'var(--accent)' : 'var(--border)'}`,
    borderRadius: '4px',
    color: active ? 'var(--text-primary)' : 'var(--text-muted)',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.72rem',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  } as const;
}

function MortgageWidget({ config }: { config: ProgrammaticCalculatorConfig }) {
  const [principal, setPrincipal] = useState(Number(config.initialValues.principal));
  const [rate, setRate] = useState(Number(config.initialValues.rate));
  const [termYears, setTermYears] = useState(Number(config.initialValues.termYears));
  const currency = config.displayCurrency ?? 'usd';
  const result = useMemo(() => calculateMortgage(principal, rate, termYears), [principal, rate, termYears]);

  return (
    <div className={styles.grid}>
      <div className={styles.stack}>
        <Section title="Inputs">
          <InputField label="Loan amount" value={principal} onChange={setPrincipal} min={10000} max={3000000} step={1000} prefix="$" hint={money(principal, currency)} />
          <InputField label="Interest rate" value={rate} onChange={setRate} min={0.1} max={15} step={0.1} suffix="%" hint={formatPercent(rate)} />
          <InputField label="Term" value={termYears} onChange={setTermYears} min={5} max={40} step={1} suffix="years" />
        </Section>
      </div>
      <div className={styles.stack}>
        <Section title="Results">
          <ResultCard label="Monthly payment" value={money(result.monthlyPayment, currency)} size="large" color="warning" />
          <ResultCard label="Total interest" value={money(result.totalInterest, currency)} color="negative" />
          <ResultCard label="Total repaid" value={money(result.totalPayment, currency)} />
        </Section>
      </div>
    </div>
  );
}

function CompoundWidget({ config }: { config: ProgrammaticCalculatorConfig }) {
  const [principal, setPrincipal] = useState(Number(config.initialValues.principal));
  const [rate, setRate] = useState(Number(config.initialValues.rate));
  const [years, setYears] = useState(Number(config.initialValues.years));
  const [frequency, setFrequency] = useState(String(config.initialValues.frequency));
  const currency = config.displayCurrency ?? 'usd';
  const result = useMemo(() => calculateCompound(principal, rate, years, COMPOUND_FREQUENCY_MAP[frequency] ?? 12), [principal, rate, years, frequency]);

  return (
    <div className={styles.grid}>
      <div className={styles.stack}>
        <Section title="Inputs">
          <InputField label="Principal" value={principal} onChange={setPrincipal} min={100} max={1000000} step={500} prefix="$" hint={money(principal, currency)} />
          <InputField label="Rate" value={rate} onChange={setRate} min={0.1} max={20} step={0.1} suffix="%" />
          <InputField label="Years" value={years} onChange={setYears} min={1} max={50} step={1} suffix="years" />
          <div style={optionGridStyle}>
            {['annual', 'quarterly', 'monthly', 'daily'].map((value) => (
              <button key={value} type="button" onClick={() => setFrequency(value)} style={optionButton(frequency === value)}>{value}</button>
            ))}
          </div>
        </Section>
      </div>
      <div className={styles.stack}>
        <Section title="Results">
          <ResultCard label="Final amount" value={money(result.finalAmount, currency)} size="large" color="positive" />
          <ResultCard label="Interest earned" value={money(result.totalInterest, currency)} color="positive" />
          <ResultCard label="Effective annual rate" value={formatPercent(result.effectiveRate)} />
        </Section>
      </div>
    </div>
  );
}

function LoanWidget({ config }: { config: ProgrammaticCalculatorConfig }) {
  const [amount, setAmount] = useState(Number(config.initialValues.amount));
  const [rate, setRate] = useState(Number(config.initialValues.rate));
  const [termMonths, setTermMonths] = useState(Number(config.initialValues.termMonths));
  const currency = config.displayCurrency ?? 'usd';
  const result = useMemo(() => calculateLoan(amount, rate, termMonths), [amount, rate, termMonths]);

  return (
    <div className={styles.grid}>
      <div className={styles.stack}>
        <Section title="Inputs">
          <InputField label="Loan amount" value={amount} onChange={setAmount} min={1000} max={500000} step={500} prefix="$" hint={money(amount, currency)} />
          <InputField label="Rate" value={rate} onChange={setRate} min={0.1} max={40} step={0.1} suffix="%" />
          <InputField label="Term" value={termMonths} onChange={setTermMonths} min={6} max={120} step={6} suffix="months" />
        </Section>
      </div>
      <div className={styles.stack}>
        <Section title="Results">
          <ResultCard label="Monthly payment" value={money(result.monthlyPayment, currency)} size="large" color="warning" />
          <ResultCard label="Total interest" value={money(result.totalInterest, currency)} color="negative" />
          <ResultCard label="Effective APR" value={formatPercent(result.apr)} />
        </Section>
      </div>
    </div>
  );
}

function RetirementWidget({ config }: { config: ProgrammaticCalculatorConfig }) {
  const [currentAge, setCurrentAge] = useState(Number(config.initialValues.currentAge));
  const [retirementAge, setRetirementAge] = useState(Number(config.initialValues.retirementAge));
  const [currentSavings, setCurrentSavings] = useState(Number(config.initialValues.currentSavings));
  const [monthlyContribution, setMonthlyContribution] = useState(Number(config.initialValues.monthlyContribution));
  const [employerContribution, setEmployerContribution] = useState(Number(config.initialValues.employerContribution));
  const [growthRate, setGrowthRate] = useState(Number(config.initialValues.growthRate));
  const [inflationRate, setInflationRate] = useState(Number(config.initialValues.inflationRate));
  const currency = config.displayCurrency ?? 'usd';
  const result = useMemo(
    () => calculateRetirement(currentAge, retirementAge, currentSavings, monthlyContribution, employerContribution, growthRate, inflationRate),
    [currentAge, retirementAge, currentSavings, monthlyContribution, employerContribution, growthRate, inflationRate]
  );

  return (
    <div className={styles.grid}>
      <div className={styles.stack}>
        <Section title="Inputs">
          <InputField label="Current age" value={currentAge} onChange={setCurrentAge} min={18} max={70} step={1} suffix="years" />
          <InputField label="Retirement age" value={retirementAge} onChange={setRetirementAge} min={40} max={80} step={1} suffix="years" />
          <InputField label="Current savings" value={currentSavings} onChange={setCurrentSavings} min={0} max={3000000} step={1000} prefix="$" hint={money(currentSavings, currency)} />
          <InputField label="Monthly contribution" value={monthlyContribution} onChange={setMonthlyContribution} min={0} max={10000} step={50} prefix="$" />
          <InputField label="Employer contribution" value={employerContribution} onChange={setEmployerContribution} min={0} max={10000} step={50} prefix="$" />
          <InputField label="Growth rate" value={growthRate} onChange={setGrowthRate} min={0} max={15} step={0.5} suffix="%" />
          <InputField label="Inflation rate" value={inflationRate} onChange={setInflationRate} min={0} max={8} step={0.5} suffix="%" />
        </Section>
      </div>
      <div className={styles.stack}>
        <Section title="Results">
          <ResultCard label="Projected pot" value={money(result.projectedPot, currency)} size="large" color="positive" />
          <ResultCard label="Income at 4%" value={money(result.monthlyIncomeFrom, currency)} color="warning" />
          <ResultCard label="Total growth" value={money(result.totalGrowth, currency)} color="positive" />
        </Section>
      </div>
    </div>
  );
}

function SalaryWidget({ config }: { config: ProgrammaticCalculatorConfig }) {
  const [country, setCountry] = useState(String(config.initialValues.country) as CountryCode);
  const [gross, setGross] = useState(Number(config.initialValues.gross));
  const currency = config.displayCurrency ?? 'usd';
  const result = useMemo(() => calculateTakeHome(gross, country), [gross, country]);
  const countryKeys: CountryCode[] = ['UK', 'DE', 'US', 'FR', 'NL', 'AU'];

  return (
    <div className={styles.grid}>
      <div className={styles.stack}>
        <Section title="Inputs">
          <div style={wideOptionGridStyle}>
            {countryKeys.map((value) => (
              <button key={value} type="button" onClick={() => setCountry(value)} style={optionButton(country === value)}>{value}</button>
            ))}
          </div>
          <InputField label="Gross salary" value={gross} onChange={setGross} min={10000} max={500000} step={1000} prefix={COUNTRY_CONFIG[country].symbol} />
        </Section>
      </div>
      <div className={styles.stack}>
        <Section title="Results">
          <ResultCard label="Net annual" value={money(result.netAnnual, currency)} size="large" color="positive" />
          <ResultCard label="Net monthly" value={money(result.netMonthly, currency)} color="positive" />
          <ResultCard label="Effective tax rate" value={formatPercent(result.effectiveTaxRate)} />
        </Section>
      </div>
    </div>
  );
}

function OffsetWidget({ config }: { config: ProgrammaticCalculatorConfig }) {
  const [balance, setBalance] = useState(Number(config.initialValues.balance));
  const [savings, setSavings] = useState(Number(config.initialValues.savings));
  const [rate, setRate] = useState(Number(config.initialValues.rate));
  const [termYears, setTermYears] = useState(Number(config.initialValues.termYears));
  const currency = config.displayCurrency ?? 'usd';
  const result = useMemo(() => calculateOffset(balance, savings, rate, termYears), [balance, savings, rate, termYears]);

  return (
    <div className={styles.grid}>
      <div className={styles.stack}>
        <Section title="Inputs">
          <InputField label="Mortgage balance" value={balance} onChange={setBalance} min={10000} max={3000000} step={1000} prefix="$" />
          <InputField label="Offset savings" value={savings} onChange={setSavings} min={0} max={1000000} step={1000} prefix="$" />
          <InputField label="Rate" value={rate} onChange={setRate} min={0.1} max={15} step={0.1} suffix="%" />
          <InputField label="Term" value={termYears} onChange={setTermYears} min={5} max={35} step={1} suffix="years" />
        </Section>
      </div>
      <div className={styles.stack}>
        <Section title="Results">
          <ResultCard label="Effective balance" value={money(result.effectiveBalance, currency)} size="large" />
          <ResultCard label="Interest saved" value={money(result.interestSavedTotal, currency)} color="positive" />
          <ResultCard label="Term reduction" value={`${formatNumber(result.termReductionMonths / 12, 1)} years`} color="positive" />
        </Section>
      </div>
    </div>
  );
}

function GoalWidget({ config }: { config: ProgrammaticCalculatorConfig }) {
  const [targetAmount, setTargetAmount] = useState(Number(config.initialValues.targetAmount));
  const [currentSavings, setCurrentSavings] = useState(Number(config.initialValues.currentSavings));
  const [monthlyContribution, setMonthlyContribution] = useState(Number(config.initialValues.monthlyContribution));
  const [annualRate, setAnnualRate] = useState(Number(config.initialValues.annualRate));
  const [targetMonths, setTargetMonths] = useState(Number(config.initialValues.targetMonths));
  const currency = config.displayCurrency ?? 'usd';
  const result = useMemo(() => calculateSaveGoal(targetAmount, currentSavings, monthlyContribution, annualRate, targetMonths), [targetAmount, currentSavings, monthlyContribution, annualRate, targetMonths]);

  return (
    <div className={styles.grid}>
      <div className={styles.stack}>
        <Section title="Inputs">
          <InputField label="Target amount" value={targetAmount} onChange={setTargetAmount} min={1000} max={5000000} step={1000} prefix="$" />
          <InputField label="Current savings" value={currentSavings} onChange={setCurrentSavings} min={0} max={2000000} step={500} prefix="$" />
          <InputField label="Monthly contribution" value={monthlyContribution} onChange={setMonthlyContribution} min={0} max={10000} step={50} prefix="$" />
          <InputField label="Annual rate" value={annualRate} onChange={setAnnualRate} min={0} max={15} step={0.1} suffix="%" />
          <InputField label="Deadline" value={targetMonths} onChange={setTargetMonths} min={1} max={600} step={1} suffix="months" />
        </Section>
      </div>
      <div className={styles.stack}>
        <Section title="Results">
          <ResultCard label="Projected balance" value={money(result.projectedBalance, currency)} size="large" color={result.projectedBalance >= targetAmount ? 'positive' : 'warning'} />
          <ResultCard label="Required monthly" value={money(result.requiredMonthly, currency)} color="warning" />
          <ResultCard label="Time to goal" value={`${result.monthsNeeded} months`} />
        </Section>
      </div>
    </div>
  );
}

function TdeeWidget({ config }: { config: ProgrammaticCalculatorConfig }) {
  const [weightKg, setWeightKg] = useState(Number(config.initialValues.weightKg));
  const [heightCm, setHeightCm] = useState(Number(config.initialValues.heightCm));
  const [age, setAge] = useState(Number(config.initialValues.age));
  const [sex, setSex] = useState(String(config.initialValues.sex) as 'male' | 'female');
  const [activity, setActivity] = useState(String(config.initialValues.activity));
  const result = useMemo(() => calculateTDEE(weightKg, heightCm, age, sex, TDEE_ACTIVITY_MAP[activity] ?? 1.55), [weightKg, heightCm, age, sex, activity]);

  return (
    <div className={styles.grid}>
      <div className={styles.stack}>
        <Section title="Inputs">
          <div style={compactOptionGridStyle}>
            {(['male', 'female'] as const).map((value) => (
              <button key={value} type="button" onClick={() => setSex(value)} style={optionButton(sex === value)}>{value}</button>
            ))}
          </div>
          <InputField label="Weight" value={weightKg} onChange={setWeightKg} min={30} max={250} step={1} suffix="kg" />
          <InputField label="Height" value={heightCm} onChange={setHeightCm} min={120} max={220} step={1} suffix="cm" />
          <InputField label="Age" value={age} onChange={setAge} min={16} max={90} step={1} suffix="years" />
          <div style={optionGridStyle}>
            {['sedentary', 'light', 'moderate', 'active', 'very-active'].map((value) => (
              <button key={value} type="button" onClick={() => setActivity(value)} style={optionButton(activity === value)}>{value}</button>
            ))}
          </div>
        </Section>
      </div>
      <div className={styles.stack}>
        <Section title="Results">
          <ResultCard label="TDEE" value={`${result.tdee.toLocaleString('en-US')} kcal`} size="large" />
          <ResultCard label="Weight-loss target" value={`${result.weightLoss.toLocaleString('en-US')} kcal`} color="positive" />
          <ResultCard label="BMI" value={`${formatNumber(result.bmi, 1)} (${result.bmiCategory})`} />
        </Section>
      </div>
    </div>
  );
}

function SubscriptionWidget({ config }: { config: ProgrammaticCalculatorConfig }) {
  const [monthlySpend, setMonthlySpend] = useState(Number(config.initialValues.monthlySpend));
  const [investmentReturn, setInvestmentReturn] = useState(Number(config.initialValues.investmentReturn));
  const [hourlyWage, setHourlyWage] = useState(Number(config.initialValues.hourlyWage));
  const currency = config.displayCurrency ?? 'usd';
  const result = useMemo(() => calculateSubscriptionDrain([{ name: 'Subscriptions', monthly: monthlySpend, enabled: true }], hourlyWage, investmentReturn), [monthlySpend, investmentReturn, hourlyWage]);

  return (
    <div className={styles.grid}>
      <div className={styles.stack}>
        <Section title="Inputs">
          <InputField label="Monthly spend" value={monthlySpend} onChange={setMonthlySpend} min={0} max={5000} step={5} prefix="$" />
          <InputField label="Investment return" value={investmentReturn} onChange={setInvestmentReturn} min={0} max={15} step={0.5} suffix="%" />
          <InputField label="Hourly wage" value={hourlyWage} onChange={setHourlyWage} min={0} max={500} step={1} prefix="$" />
        </Section>
      </div>
      <div className={styles.stack}>
        <Section title="Results">
          <ResultCard label="Annual cost" value={money(result.totalAnnual, currency)} size="large" color="negative" />
          <ResultCard label="10-year cost" value={money(result.total10Year, currency)} color="negative" />
          <ResultCard label="Invest-instead value" value={money(result.withInvestment10Year, currency)} color="warning" />
        </Section>
      </div>
    </div>
  );
}

function FreelanceWidget({ config }: { config: ProgrammaticCalculatorConfig }) {
  const [desiredTakeHome, setDesiredTakeHome] = useState(Number(config.initialValues.desiredTakeHome));
  const [annualExpenses, setAnnualExpenses] = useState(Number(config.initialValues.annualExpenses));
  const [taxRate, setTaxRate] = useState(Number(config.initialValues.taxRate));
  const [billableWeeks, setBillableWeeks] = useState(Number(config.initialValues.billableWeeks));
  const [hoursPerDay, setHoursPerDay] = useState(Number(config.initialValues.hoursPerDay));
  const [unpaidHoursPerDay, setUnpaidHoursPerDay] = useState(Number(config.initialValues.unpaidHoursPerDay));
  const currency = config.displayCurrency ?? 'usd';
  const result = useMemo(() => calculateFreelanceRate(desiredTakeHome, annualExpenses, taxRate, billableWeeks, hoursPerDay, unpaidHoursPerDay), [desiredTakeHome, annualExpenses, taxRate, billableWeeks, hoursPerDay, unpaidHoursPerDay]);

  return (
    <div className={styles.grid}>
      <div className={styles.stack}>
        <Section title="Inputs">
          <InputField label="Take-home target" value={desiredTakeHome} onChange={setDesiredTakeHome} min={10000} max={500000} step={1000} prefix="$" />
          <InputField label="Annual expenses" value={annualExpenses} onChange={setAnnualExpenses} min={0} max={100000} step={500} prefix="$" />
          <InputField label="Tax rate" value={taxRate} onChange={setTaxRate} min={10} max={60} step={1} suffix="%" />
          <InputField label="Billable weeks" value={billableWeeks} onChange={setBillableWeeks} min={20} max={52} step={1} suffix="weeks" />
          <InputField label="Billable hours/day" value={hoursPerDay} onChange={setHoursPerDay} min={1} max={12} step={0.5} suffix="hrs" />
          <InputField label="Unpaid hours/day" value={unpaidHoursPerDay} onChange={setUnpaidHoursPerDay} min={0} max={8} step={0.5} suffix="hrs" />
        </Section>
      </div>
      <div className={styles.stack}>
        <Section title="Results">
          <ResultCard label="Day rate" value={money(result.dayRate, currency)} size="large" color="warning" />
          <ResultCard label="Hourly rate" value={money(result.hourlyRate, currency)} color="warning" />
          <ResultCard label="Monthly gross required" value={money(result.monthlyRequired, currency)} />
        </Section>
      </div>
    </div>
  );
}

function LtvcacWidget({ config }: { config: ProgrammaticCalculatorConfig }) {
  const [arpu, setArpu] = useState(Number(config.initialValues.arpu));
  const [grossMarginPct, setGrossMarginPct] = useState(Number(config.initialValues.grossMarginPct));
  const [churnRatePct, setChurnRatePct] = useState(Number(config.initialValues.churnRatePct));
  const [cacPerCustomer, setCacPerCustomer] = useState(Number(config.initialValues.cacPerCustomer));
  const [monthlyNewCustomers, setMonthlyNewCustomers] = useState(Number(config.initialValues.monthlyNewCustomers));
  const [discountRatePct, setDiscountRatePct] = useState(Number(config.initialValues.discountRatePct));
  const currency = config.displayCurrency ?? 'usd';
  const result = useMemo(() => calculateLTVCAC({ arpu, grossMarginPct, churnRatePct, cacPerCustomer, salesCycleDays: 30, monthlyNewCustomers, discountRatePct }), [arpu, grossMarginPct, churnRatePct, cacPerCustomer, monthlyNewCustomers, discountRatePct]);

  return (
    <div className={styles.grid}>
      <div className={styles.stack}>
        <Section title="Inputs">
          <InputField label="Monthly ARPU" value={arpu} onChange={setArpu} min={1} max={10000} step={1} prefix="$" />
          <InputField label="Gross margin" value={grossMarginPct} onChange={setGrossMarginPct} min={1} max={100} step={0.5} suffix="%" />
          <InputField label="Monthly churn" value={churnRatePct} onChange={setChurnRatePct} min={0.1} max={25} step={0.1} suffix="%" />
          <InputField label="CAC" value={cacPerCustomer} onChange={setCacPerCustomer} min={1} max={100000} step={10} prefix="$" />
          <InputField label="New customers/month" value={monthlyNewCustomers} onChange={setMonthlyNewCustomers} min={1} max={10000} step={1} />
          <InputField label="Discount rate" value={discountRatePct} onChange={setDiscountRatePct} min={0} max={30} step={0.5} suffix="%" />
        </Section>
      </div>
      <div className={styles.stack}>
        <Section title="Results">
          <ResultCard label="LTV:CAC ratio" value={`${formatNumber(result.ltvcacRatio, 2)}x`} size="large" color={result.ltvcacRatio >= 3 ? 'positive' : result.ltvcacRatio >= 1.5 ? 'warning' : 'negative'} />
          <ResultCard label="Simple LTV" value={money(result.simpleLTV, currency)} />
          <ResultCard label="Payback" value={`${formatNumber(result.paybackMonths, 1)} months`} />
        </Section>
      </div>
    </div>
  );
}

function CyberWidget({ config }: { config: ProgrammaticCalculatorConfig }) {
  const [annualRevenue, setAnnualRevenue] = useState(Number(config.initialValues.annualRevenue));
  const [employeeCount, setEmployeeCount] = useState(Number(config.initialValues.employeeCount));
  const [customerRecords, setCustomerRecords] = useState(Number(config.initialValues.customerRecords));
  const [industryRisk, setIndustryRisk] = useState(String(config.initialValues.industryRisk));
  const currency = config.displayCurrency ?? 'usd';
  const result = useMemo(() => calculateCyberRisk(annualRevenue, employeeCount, customerRecords, CYBER_RISK_MAP[industryRisk] ?? 3, false, false, false, false, false), [annualRevenue, employeeCount, customerRecords, industryRisk]);

  return (
    <div className={styles.grid}>
      <div className={styles.stack}>
        <Section title="Inputs">
          <InputField label="Annual revenue" value={annualRevenue} onChange={setAnnualRevenue} min={100000} max={1000000000} step={100000} prefix="$" />
          <InputField label="Employees" value={employeeCount} onChange={setEmployeeCount} min={1} max={100000} step={1} />
          <InputField label="Data records" value={customerRecords} onChange={setCustomerRecords} min={0} max={10000000} step={1000} />
          <div style={optionGridStyle}>
            {['low', 'medium', 'elevated', 'high', 'critical'].map((value) => (
              <button key={value} type="button" onClick={() => setIndustryRisk(value)} style={optionButton(industryRisk === value)}>{value}</button>
            ))}
          </div>
        </Section>
      </div>
      <div className={styles.stack}>
        <Section title="Results">
          <ResultCard label="Estimated breach cost" value={money(result.estimatedBreachCost, currency)} size="large" color="negative" />
          <ResultCard label="Risk score" value={`${result.riskScore}/100`} color={result.riskScore > 70 ? 'negative' : 'warning'} />
          <ResultCard label="Suggested cover limit" value={money(result.recommendedCoverLimit, currency)} color="warning" />
        </Section>
      </div>
    </div>
  );
}

function TcorWidget({ config }: { config: ProgrammaticCalculatorConfig }) {
  const [premiums, setPremiums] = useState(Number(config.initialValues.premiums));
  const [retainedLosses, setRetainedLosses] = useState(Number(config.initialValues.retainedLosses));
  const [adminCosts, setAdminCosts] = useState(Number(config.initialValues.adminCosts));
  const [riskControlCosts, setRiskControlCosts] = useState(Number(config.initialValues.riskControlCosts));
  const [revenue, setRevenue] = useState(Number(config.initialValues.revenue));
  const currency = config.displayCurrency ?? 'usd';
  const result = useMemo(() => calculateTCOR({ premiums, retainedLosses, adminCosts, riskControlCosts, revenue }), [premiums, retainedLosses, adminCosts, riskControlCosts, revenue]);

  return (
    <div className={styles.grid}>
      <div className={styles.stack}>
        <Section title="Inputs">
          <InputField label="Premiums" value={premiums} onChange={setPremiums} min={0} max={10000000} step={5000} prefix="$" />
          <InputField label="Retained losses" value={retainedLosses} onChange={setRetainedLosses} min={0} max={10000000} step={5000} prefix="$" />
          <InputField label="Admin costs" value={adminCosts} onChange={setAdminCosts} min={0} max={5000000} step={1000} prefix="$" />
          <InputField label="Risk-control costs" value={riskControlCosts} onChange={setRiskControlCosts} min={0} max={5000000} step={1000} prefix="$" />
          <InputField label="Revenue" value={revenue} onChange={setRevenue} min={100000} max={1000000000} step={100000} prefix="$" />
        </Section>
      </div>
      <div className={styles.stack}>
        <Section title="Results">
          <ResultCard label="Base TCOR" value={money(result.base.tcor, currency)} size="large" color="warning" />
          <ResultCard label="TCOR rate" value={`${formatNumber(result.base.tcorRate, 2)} per $1k`} />
          <ResultCard label="Improved-risk scenario" value={money(result.scenarios[2].tcor, currency)} color="positive" />
        </Section>
      </div>
    </div>
  );
}

export default function ProgrammaticCalculatorClient({ config }: { config: ProgrammaticCalculatorConfig }) {
  switch (config.kind) {
    case 'mortgage':
      return <MortgageWidget config={config} />;
    case 'compound':
      return <CompoundWidget config={config} />;
    case 'loan':
      return <LoanWidget config={config} />;
    case 'retirement':
      return <RetirementWidget config={config} />;
    case 'salary':
      return <SalaryWidget config={config} />;
    case 'offset':
      return <OffsetWidget config={config} />;
    case 'goal':
      return <GoalWidget config={config} />;
    case 'tdee':
      return <TdeeWidget config={config} />;
    case 'subscription':
      return <SubscriptionWidget config={config} />;
    case 'freelance':
      return <FreelanceWidget config={config} />;
    case 'ltvcac':
      return <LtvcacWidget config={config} />;
    case 'cyber':
      return <CyberWidget config={config} />;
    case 'tcor':
      return <TcorWidget config={config} />;
    default:
      return null;
  }
}
