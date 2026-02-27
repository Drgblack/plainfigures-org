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
        <p>
          The <strong>marginal rate</strong> is the rate applied to the next £/$/€ earned. The <strong>effective rate</strong> is total tax paid divided by gross income. At £60,000 in the UK, the marginal rate is 40% (higher rate band) but the effective rate is around 29% — because most income was taxed at 0% or 20%.
        </p>
        <p>
          The effective rate is more useful for understanding actual take-home. The marginal rate matters when evaluating whether additional earnings (overtime, bonuses, second income) are worthwhile.
        </p>
      </div>
    </GuideLayout>
  );
}
