import type { Metadata } from 'next';
import GuideLayout from '@/components/layout/GuideLayout';

export const metadata: Metadata = {
  title: 'How Retirement Savings Projections Work — Plain Figures Learning Centre',
  description: 'Future value of regular contributions, inflation-adjusted returns, the 4% withdrawal rule, and how employer contributions affect your pension pot.',
};

export default function RetirementGuide() {
  return (
    <GuideLayout
      title="How Retirement Savings Projections Work"
      description="Future value of regular contributions, real vs nominal returns, the 4% withdrawal rule, and why employer contributions matter more than most people realise."
      readTime="5 min"
      relatedCalc={{ href: '/retirement', label: 'Retirement Calculator' }}
      relatedGuides={[
        { href: '/learn/compound-interest', label: 'Understanding Compound Interest' },
        { href: '/learn/salary-take-home', label: 'How Salary Take-Home Is Calculated' },
        { href: '/learn/financial-crisis', label: 'How to Calculate Your Financial Runway' },
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
          r = interest rate per period<br />
          n = number of periods<br /><br />
          Plus initial savings: FV_total = FV + PV × (1 + r)^n<br />
          Where PV = existing pension pot
        </div>

        <div className="example-block">
          <div className="example-label">Example — age 35, retirement at 65, £25,000 existing pot</div>
          <div className="example-row"><span>Monthly contribution (your share)</span><span>£400</span></div>
          <div className="example-row"><span>Employer contribution</span><span>£200</span></div>
          <div className="example-row"><span>Total monthly</span><span>£600</span></div>
          <div className="example-row"><span>Real annual growth rate</span><span>3.5% (6% nominal − 2.5% inflation)</span></div>
          <div className="example-row"><span>Projected pot at 65 (today's money)</span><span>~£398,000</span></div>
        </div>

        <h2>Real Returns vs Nominal Returns</h2>
        <p>
          Investment returns are quoted in <strong>nominal</strong> terms — not adjusted for inflation. A pension growing at 6% per year while inflation runs at 2.5% is only growing at approximately 3.5% in real purchasing power terms. Projections using nominal rates produce larger pot numbers that are misleading — what matters is what the money can buy.
        </p>
        <p>
          The Plain Figures calculator uses <strong>real returns</strong> (nominal minus inflation), so the projected pot is expressed in today's money. This is the more useful figure for planning purposes.
        </p>

        <div className="key-point">
          Equities have historically returned 6–8% nominal (UK/US markets, long run). With 2–3% inflation, real returns of 4–6% are a reasonable central assumption for a diversified pension fund — but projections are highly sensitive to the assumed rate.
        </div>

        <h2>Why Employer Contributions Are High-Value</h2>
        <p>
          Employer pension contributions are effectively additional salary — money you receive specifically into your pension that never appears in your take-home pay. They are also typically exempt from National Insurance on both sides. A £200/month employer contribution is worth substantially more than £200 of gross salary after tax and NI.
        </p>
        <p>
          Auto-enrolment minimums in the UK require a total contribution of at least 8% of qualifying earnings (3% employer, 5% employee). However, many schemes allow voluntary additional contributions up to the annual allowance (£60,000 gross per year in 2024/25), with employer matching in some cases.
        </p>

        <h2>The 4% Withdrawal Rule</h2>
        <p>
          The 4% rule (sometimes called the "safe withdrawal rate") originated from the Trinity Study (1998) examining how US retirees could draw down portfolios without exhaustion over a 30-year period. The finding: withdrawing 4% of the initial portfolio value annually (adjusted for inflation each year) had a high historical probability of lasting 30 years.
        </p>
        <p>
          Applied to a £400,000 pot: 4% = £16,000/year = £1,333/month in today's money. This is used as a benchmark income estimate — not a guarantee.
        </p>

        <div className="warning-point">
          The 4% rule was derived from US historical data with equity-heavy portfolios. With lower expected returns, longer retirement periods (40+ years), UK-specific assets, or conservative portfolio allocations, a lower withdrawal rate (3–3.5%) may be more appropriate. It is a planning heuristic, not a guaranteed outcome.
        </div>

        <h2>The Power of Starting Early</h2>
        <p>
          Because pension growth is compounded, contributions made early have dramatically more time to grow. £100/month contributed from age 25 for 10 years (total: £12,000) at 5% real growth produces approximately the same pot at 65 as £100/month from age 35 for 30 years (total: £36,000). Starting 10 years earlier, with one-third of the contributions, produces equivalent results.
        </p>
        <p>
          This is the compounding effect at scale — and why pension calculators consistently show that small early contributions matter more than larger later ones.
        </p>

        <h2>State Pension</h2>
        <p>
          The UK state pension (£11,502/year in 2024/25 for full entitlement) and equivalent state benefits in other countries are not included in most private pension calculators. When planning retirement income needs, the state pension should be added to any private pot projections to get total expected income.
        </p>
      </div>
    </GuideLayout>
  );
}
