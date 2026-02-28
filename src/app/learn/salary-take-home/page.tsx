import type { Metadata } from 'next';
import GuideLayout from '@/components/layout/GuideLayout';

export const metadata: Metadata = {
  title: 'How Salary Take-Home Is Calculated — UK, Germany, USA, France, Netherlands, Australia — Plain Figures',
  description: 'Gross to net salary explained — income tax brackets, national insurance, social contributions, and effective tax rates in 6 countries.',
};

export default function TakeHomeGuide() {
  return (
    <GuideLayout
      title="How Salary Take-Home Is Calculated"
      description="Gross to net: how income tax, national insurance, and social contributions work in the UK, Germany, USA, France, Netherlands, and Australia — with the key rates and thresholds."
      readTime="7 min"
      relatedCalc={{ href: '/take-home', label: 'Salary Take-Home Calculator' }}
      relatedGuides={[
        { href: '/learn/mortgage-affordability', label: 'How Mortgage Affordability Is Assessed' },
        { href: '/learn/retirement-savings', label: 'How Retirement Savings Projections Work' },
      ]}
    >
      <div className="guide-content">
        <h2>Gross vs Net — The Basic Distinction</h2>
        <p>
          <strong>Gross salary</strong> is what you're contracted to earn before any deductions. <strong>Net salary</strong> (take-home pay) is what reaches your bank account after income tax, social insurance contributions, and any other statutory deductions. The gap between the two — the <strong>effective tax rate</strong> — is typically 20–45% depending on income level and country.
        </p>

        <h2>How Income Tax Brackets Work</h2>
        <p>
          In most countries, income tax uses a <strong>progressive marginal rate</strong> system — each additional pound/dollar/euro is taxed at the rate applicable to that slice of income, not the rate applied to the whole. A common misconception is that earning more can result in taking home less — this is mathematically impossible with a marginal system.
        </p>

        <div className="key-point">
          If you earn £50,000 and move to £55,000, only the £5,000 above the threshold is taxed at the higher rate. All income below the threshold is taxed at the lower rate, unchanged.
        </div>

        <h2>United Kingdom (2024/25)</h2>
        <table>
          <thead><tr><th>Band</th><th>Income</th><th>Rate</th></tr></thead>
          <tbody>
            <tr><td>Personal Allowance</td><td>Up to £12,570</td><td>0%</td></tr>
            <tr><td>Basic Rate</td><td>£12,571–£50,270</td><td>20%</td></tr>
            <tr><td>Higher Rate</td><td>£50,271–£125,140</td><td>40%</td></tr>
            <tr><td>Additional Rate</td><td>Over £125,140</td><td>45%</td></tr>
          </tbody>
        </table>
        <p>
          In addition to income tax, employees pay <strong>National Insurance (NI)</strong> — 8% on earnings between £12,570 and £50,270, and 2% above that. NI funds the NHS and state pension entitlements. It is a separate charge from income tax. The personal allowance tapers away for incomes above £100,000 at a rate of £1 per £2 earned, creating an effective 60% marginal rate between £100,000 and £125,140.
        </p>

        <h2>Germany (2024)</h2>
        <p>
          Germany uses a <strong>formula-based progressive tax</strong> rather than discrete bands. The rate rises continuously from 0% at the basic allowance (€11,604 in 2024) to 42% at higher incomes, and 45% above €277,826. A <strong>solidarity surcharge</strong> (Solidaritätszuschlag) of 5.5% of income tax applies above certain thresholds.
        </p>
        <p>
          Social contributions (employee share): pension insurance ~9.3%, health insurance ~7.3%, unemployment ~1.3%, care insurance ~1.8% — applied to income up to the contribution ceiling. The combined employee burden of social contributions is approximately 20% of gross below the ceiling.
        </p>

        <h2>United States (Federal, 2024)</h2>
        <table>
          <thead><tr><th>Rate</th><th>Single filer income</th></tr></thead>
          <tbody>
            <tr><td>10%</td><td>Up to $11,600</td></tr>
            <tr><td>12%</td><td>$11,601–$47,150</td></tr>
            <tr><td>22%</td><td>$47,151–$100,525</td></tr>
            <tr><td>24%</td><td>$100,526–$191,950</td></tr>
            <tr><td>32%</td><td>$191,951–$243,725</td></tr>
            <tr><td>35%</td><td>$243,726–$609,350</td></tr>
            <tr><td>37%</td><td>Over $609,350</td></tr>
          </tbody>
        </table>
        <p>
          FICA contributions: Social Security at 6.2% (on income up to $168,600) and Medicare at 1.45% (all income, plus 0.9% above $200,000). State income tax varies from 0% (Texas, Florida) to over 13% (California). The calculator uses an average state rate of 5% as an approximation.
        </p>

        <h2>France, Netherlands, Australia</h2>
        <p>
          <strong>France</strong> uses a five-band income tax system (0%, 11%, 30%, 41%, 45%) plus significant social contributions (cotisations sociales) including health insurance, retirement, and unemployment — the employee share alone can reach 20–25% of gross. France's gross salary is often lower than UK/German equivalents when compared net.
        </p>
        <p>
          <strong>Netherlands</strong> uses a two-rate Box 1 system (37% below €75,518; 49.5% above) which includes both income tax and national insurance. General and labour tax credits reduce the effective rate for most earners significantly.
        </p>
        <p>
          <strong>Australia</strong> has four bands (0%, 19%, 32.5%, 37%, 45%) plus a 2% Medicare Levy. The Low Income Tax Offset (LITO) reduces tax for earners under ~£66,000. Superannuation — the employer pension contribution of 11% — is on top of gross salary and not deducted from take-home pay.
        </p>

        <div className="warning-point">
          Tax rules change annually. The rates above are indicative for 2024/25 and are simplified — they don't account for pension contributions, student loan repayments, childcare benefits, or country-specific deductions. Always check current rates with the relevant tax authority.
        </div>

        <h2>Effective vs Marginal Rate</h2>

        <div className="formula-block">
          <div className="formula-label">Effective Rate Formula</div>
          Effective Rate = Total Tax Paid ÷ Gross Income<br /><br />
          Example — UK, £60,000 gross salary (2025/26):<br />
          Tax on £0–£12,570:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;£0 (Personal Allowance)<br />
          Tax on £12,571–£50,270: £7,540 (20% basic rate)<br />
          Tax on £50,271–£60,000: £3,892 (40% higher rate)<br />
          Total income tax:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;£11,432<br />
          NI on £12,571–£50,270:&nbsp;&nbsp;&nbsp;£3,016 (8%)<br />
          NI on £50,271–£60,000:&nbsp;&nbsp;&nbsp;£195 (2%)<br />
          Total deductions:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;£14,643<br />
          Effective rate:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;£14,643 ÷ £60,000 = 24.4%<br />
          Marginal rate:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;42% (40% tax + 2% NI)
        </div>

        <p>
          The <strong>marginal rate</strong> is the rate applied to the next £/$/€ earned. The <strong>effective rate</strong> is total tax paid divided by gross income. At £60,000 in the UK, the marginal rate is 40% (higher rate band) but the effective rate is around 29% — because most income was taxed at 0% or 20%.
        </p>
        <p>
          The effective rate is more useful for understanding actual take-home. The marginal rate matters when evaluating whether additional earnings (overtime, bonuses, second income) are worthwhile.
        </p>

        <h2>What-If: The £100,000 Trap (UK Personal Allowance Taper)</h2>
        <p>
          One of the least-understood features of UK income tax is the Personal Allowance taper. Above £100,000, the £12,570 Personal Allowance is reduced by £1 for every £2 of income, creating an effective 60% marginal tax rate on income between £100,000 and £125,140.
        </p>
        <table>
          <thead>
            <tr><th>Gross income</th><th>Effective marginal rate</th><th>Net take-home (approx)</th></tr>
          </thead>
          <tbody>
            <tr><td>£99,000</td><td>40% + 2% NI = 42%</td><td>~£66,800</td></tr>
            <tr><td>£100,000</td><td>60% effective (taper begins)</td><td>~£67,400</td></tr>
            <tr><td>£110,000</td><td>60% effective</td><td>~£70,600</td></tr>
            <tr><td>£125,140</td><td>60% effective (taper ends)</td><td>~£75,400</td></tr>
            <tr><td>£126,000</td><td>45% + 2% NI = 47%</td><td>~£75,900</td></tr>
          </tbody>
        </table>
        <p>
          An extra £25,000 of gross income between £100,000 and £125,140 produces only approximately £8,000 in additional take-home. Pension contributions that bring adjusted net income below £100,000 restore the full Personal Allowance, making them particularly high-value at this income level.
        </p>

        <h2>What-If: Pension Contributions and Take-Home</h2>
        <p>
          Salary sacrifice pension contributions reduce gross income subject to both income tax and National Insurance. For a basic-rate taxpayer contributing £200/month gross, the actual take-home reduction is only approximately £134 (after 20% tax + 8% NI relief on the contribution). For a higher-rate taxpayer, the effective cost of a £200/month pension contribution is approximately £116/month in reduced take-home.
        </p>

        <h2>Frequently Asked Questions</h2>

        <h3>How do I calculate my take-home pay manually?</h3>
        <p>
          For UK PAYE (2025/26): (1) Subtract Personal Allowance (£12,570) from gross. (2) Apply 20% to income up to £50,270, 40% between £50,270 and £125,140, 45% above. (3) Apply NI: 8% between £12,570 and £50,270, 2% above. (4) Sum income tax + NI and subtract from gross. Use the calculator for precise figures — manual calculation is error-prone with partial-year adjustments and taper effects.
        </p>

        <h3>Why does my tax code affect take-home pay?</h3>
        <p>
          HMRC uses tax codes to tell employers how much tax-free income to apply. The standard code 1257L means £12,570 Personal Allowance. Emergency codes (W1/M1) apply tax without accounting for the full year's allowance. Codes with deductions (e.g., K codes) apply additional tax. If your code doesn't match your situation — for example, if you have untaxed income from another source — your monthly take-home may be higher or lower than the standard calculation.
        </p>

        <h3>Is National Insurance separate from income tax?</h3>
        <p>
          Yes — NI is a separate statutory deduction from income tax, calculated on different thresholds with different rates. They appear on the same payslip but are charged independently. NI funds the NHS, state pension, and certain benefits. Income tax funds general government expenditure. The combined deduction is what most people experience as their total tax burden, but they are legally distinct charges.
        </p>

        <h3>How does salary sacrifice work with take-home pay?</h3>
        <p>
          Salary sacrifice reduces contractual gross salary in exchange for an employer-provided benefit (typically pension contributions, childcare vouchers, or cycle-to-work). Because NI is calculated on the post-sacrifice gross, salary sacrifice saves NI as well as income tax — meaning the net cost to the employee is lower than a direct personal contribution would be. The employer also saves employer NI on the sacrificed amount.
        </p>
      </div>
    </GuideLayout>
  );
}
