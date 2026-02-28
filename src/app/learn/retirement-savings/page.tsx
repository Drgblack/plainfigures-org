import type { Metadata } from 'next';
import GuideLayout from '@/components/layout/GuideLayout';

export const metadata: Metadata = {
  title: 'Retirement Savings: Employer Contributions, Inflation & Projections — Plain Figures',
  description: 'How pension pot projections work — future value formula, real vs nominal returns, employer contributions, the 4% withdrawal rule, and how starting age affects outcomes.',
};

export default function RetirementGuide() {
  return (
    <GuideLayout
      title="How Retirement Savings Projections Work"
      description="Future value of regular contributions, real vs nominal returns, the 4% withdrawal rule, why employer contributions are high-value, and how starting 10 years earlier changes everything."
      readTime="6 min"
      relatedCalc={{ href: '/retirement', label: 'Retirement Calculator' }}
      relatedGuides={[
        { href: '/learn/compound-interest', label: 'Understanding Compound Interest' },
        { href: '/learn/salary-take-home', label: 'How Salary Take-Home Is Calculated' },
        { href: '/learn/lifestyle-inflation', label: 'Lifestyle Inflation: Real Cost Over Time' },
      ]}
    >
      <div className="guide-content">
        <h2>The Future Value Formula for Regular Contributions</h2>
        <p>
          A pension pot projection uses the <strong>future value of an annuity</strong> formula — the accumulated value of regular equal payments made over time, each earning compound interest.
        </p>

        <div className="formula-block">
          <div className="formula-label">Future Value of Regular Contributions</div>
          FV = PMT × [(1 + r)^n − 1] / r<br /><br />
          Where:<br />
          FV = future value of contributions<br />
          PMT = regular payment per period<br />
          r = interest rate per period (annual rate ÷ 12 for monthly contributions)<br />
          n = total number of payment periods<br /><br />
          With an existing pot:<br />
          FV_total = FV + PV × (1 + r)^n<br />
          Where PV = current pension pot value
        </div>

        <div className="example-block">
          <div className="example-label">Example — age 35, retire at 65, £25,000 existing pot</div>
          <div className="example-row"><span>Monthly contribution (employee)</span><span>£400</span></div>
          <div className="example-row"><span>Employer contribution</span><span>£200</span></div>
          <div className="example-row"><span>Total monthly</span><span>£600</span></div>
          <div className="example-row"><span>Real annual growth (6% nominal − 2.5% inflation)</span><span>3.5%</span></div>
          <div className="example-row"><span>Projected pot at 65 (today's money)</span><span>~£398,000</span></div>
          <div className="example-row"><span>4% annual withdrawal</span><span>~£15,920/year (~£1,327/month)</span></div>
        </div>

        <h2>Real Returns vs Nominal Returns</h2>
        <p>
          Investment returns are quoted in <strong>nominal</strong> terms — not adjusted for inflation. A pension growing at 6% per year while inflation runs at 2.5% is only growing at approximately 3.5% in real purchasing power terms. Projections using nominal rates produce larger pot numbers that are misleading — what matters is what the money can buy when withdrawn.
        </p>

        <div className="key-point">
          Equities have historically returned 6–8% nominal (UK/US long-run). With 2–3% inflation, real returns of 4–6% are a reasonable central assumption for a diversified pension fund — but projections are highly sensitive to this rate. Use the calculator to test different assumptions.
        </div>

        <h2>What-If: Return Rate Sensitivity</h2>
        <p>
          Same example (age 35, retire at 65, £600/month total contributions, £25,000 existing pot) at different real return assumptions:
        </p>
        <table>
          <thead>
            <tr><th>Real return assumption</th><th>Projected pot (today's money)</th><th>4% annual income</th></tr>
          </thead>
          <tbody>
            <tr><td>2% real (cautious)</td><td>~£263,000</td><td>~£10,500/yr</td></tr>
            <tr><td>3.5% real (moderate)</td><td>~£398,000</td><td>~£15,920/yr</td></tr>
            <tr><td>5% real (optimistic)</td><td>~£593,000</td><td>~£23,720/yr</td></tr>
          </tbody>
        </table>
        <p>
          The difference between a 2% and 5% real return over 30 years is a projected pot more than twice as large. This is why pension projections should always be viewed as a range, not a single number.
        </p>

        <h2>Why Employer Contributions Are High-Value</h2>
        <p>
          Employer pension contributions are additional salary that goes directly into your pension — money you receive without it passing through your take-home pay (and therefore without income tax or employee NI being deducted from it). They are also typically exempt from employer NI.
        </p>
        <p>
          A £200/month employer contribution is worth substantially more than £200 of gross salary after tax and NI. For a basic-rate taxpayer, £200/month of employer pension is equivalent in net value to approximately £255/month of gross salary. For a higher-rate taxpayer, the advantage is even larger.
        </p>
        <p>
          UK auto-enrolment minimums require a total contribution of at least 8% of qualifying earnings (3% employer, 5% employee including tax relief). Many schemes offer higher employer matching — for example, 1:1 matching on voluntary contributions up to a cap. Not taking full advantage of employer matching is effectively declining part of your compensation.
        </p>

        <h2>What-If: The Cost of Starting Late</h2>
        <p>
          Starting contributions 10 years later has a disproportionate impact because the lost years are the ones where compounding would have been working longest:
        </p>
        <table>
          <thead>
            <tr><th>Start age</th><th>Monthly contribution</th><th>Total contributed</th><th>Pot at 65 (3.5% real)</th></tr>
          </thead>
          <tbody>
            <tr><td>25</td><td>£300/month</td><td>£144,000</td><td>~£418,000</td></tr>
            <tr><td>35</td><td>£300/month</td><td>£108,000</td><td>~£218,000</td></tr>
            <tr><td>45</td><td>£300/month</td><td>£72,000</td><td>~£97,000</td></tr>
          </tbody>
        </table>
        <p>
          Starting at 25 vs 35 with the same monthly contribution produces roughly double the pot — despite only contributing 33% more in total. The extra decade of compounding accounts for the difference.
        </p>

        <h2>The 4% Withdrawal Rule</h2>
        <p>
          The 4% rule (the "safe withdrawal rate") originated from research examining how US retirees could draw down portfolios without exhaustion over 30 years. The finding: withdrawing 4% of the initial portfolio value annually, adjusted for inflation each year, had a high historical probability of lasting the full period with equity-heavy portfolios.
        </p>
        <p>
          Applied practically: a £400,000 pot at the 4% rate produces £16,000/year (£1,333/month) in today's money. This is used as a benchmark — not a guarantee.
        </p>

        <h3>What happens to my pension if I change jobs?</h3>
        <p>
          Defined contribution pensions are portable — you can leave the pot with the former employer's scheme (most accept this), transfer to a new employer's scheme, or consolidate into a personal pension (SIPP). Defined benefit (final salary) pensions are more complex to transfer and require regulated financial advice for transfers above £30,000. Lost pension tracking in the UK can be done via the government's Pension Tracing Service.
        </p>

        <div className="warning-point">
          The 4% rule was derived from US historical data. With lower expected future returns, 40+ year retirements, UK-specific assets, or conservative portfolios, a rate of 3–3.5% is often recommended. It is a planning heuristic, not a guaranteed outcome. State pension entitlement should be added to any private pot income estimate.
        </div>

        <h2>State Pension</h2>
        <p>
          The UK full new state pension is £11,502/year (2024/25) for those with 35+ qualifying NI years. This is not included in private pension calculators but should be added to private pot projections for a complete retirement income picture. The state pension age is currently 66 and rising to 67 between 2026–2028.
        </p>

        <h2>Frequently Asked Questions</h2>

        <h3>Should I use nominal or real returns in a pension calculator?</h3>
        <p>
          Use real returns (nominal minus expected inflation) to get a projection in today's money — the more useful figure for planning. If using nominal returns, remember the resulting pot figure overstates purchasing power by the cumulative inflation over the projection period.
        </p>

        <h3>What counts as qualifying earnings for auto-enrolment?</h3>
        <p>
          Qualifying earnings are pay between the lower and upper thresholds set by the government (£6,240–£50,270 in 2024/25). Contributions are calculated as a percentage of earnings in this band, not total salary. Some employers use total salary for contribution calculations — check your scheme rules.
        </p>

        <h3>How does pension tax relief affect contributions?</h3>
        <p>
          Under relief at source (common for personal pensions), you contribute from net pay and the pension provider reclaims basic-rate tax relief (currently 20%) from HMRC. A £400/month net contribution becomes £500 in the pension. Higher-rate taxpayers can claim additional relief through self-assessment. Under net pay arrangements (common in workplace schemes), contributions are deducted before tax, so relief is automatic.
        </p>
      </div>
    </GuideLayout>
  );
}
