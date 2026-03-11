import Link from 'next/link';
import type { Metadata } from 'next';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import RelatedGuides from '@/components/seo/RelatedGuides';
import { PROGRAMMATIC_LEARN_TOPICS } from '@/lib/programmatic-learn-extensions';
import { buildHubMetadata } from '@/lib/seo/metadata';
import { buildGuideBreadcrumbs, getLearnHubClusters } from '@/lib/seo/relatedLinks';

export const metadata: Metadata = buildHubMetadata(
  'Learning Centre - How Financial Calculations Work - Plain Figures',
  'Formula-first guides that support Plain Figures calculators across mortgages, savings, salary, retirement, tax, and risk. No advice. Just the maths.',
  '/learn',
);

type GuideItem = {
  href: string;
  code: string;
  title: string;
  description: string;
  readTime: string;
  calcHref: string;
  calcLabel: string;
  tags: string[];
};

const CORE_GUIDES: GuideItem[] = [
  { href: '/learn/mortgage-repayment', code: 'G01', title: 'How Mortgage Repayment Calculations Work', description: 'Amortisation, monthly payments, total interest, and what changes when you overpay.', readTime: '5 min', calcHref: '/mortgage', calcLabel: 'Mortgage Repayment Calculator', tags: ['Mortgage', 'Amortisation', 'Interest'] },
  { href: '/learn/compound-interest', code: 'G02', title: 'Understanding Compound Interest', description: 'Compounding frequency, effective annual rate, and why time matters more than people expect.', readTime: '6 min', calcHref: '/compound', calcLabel: 'Compound Interest Calculator', tags: ['Compound', 'EAR', 'Frequency'] },
  { href: '/learn/rent-vs-buy', code: 'G03', title: 'Rent vs Buy: The Key Numbers to Compare', description: 'Opportunity cost, equity, and the break-even logic behind renting versus buying.', readTime: '6 min', calcHref: '/rent-vs-buy', calcLabel: 'Rent vs Buy Calculator', tags: ['Housing', 'Equity', 'Break-even'] },
  { href: '/learn/salary-take-home', code: 'G04', title: 'How Salary Take-Home Is Calculated', description: 'Gross-to-net salary maths across tax and social contribution systems.', readTime: '7 min', calcHref: '/take-home', calcLabel: 'Salary Take-Home Calculator', tags: ['Tax', 'Salary', 'Net Pay'] },
  { href: '/learn/mortgage-affordability', code: 'G05', title: 'How Mortgage Affordability Is Assessed', description: 'Income multiples, stress tests, outgoings, and realistic borrowing ceilings.', readTime: '7 min', calcHref: '/affordability', calcLabel: 'Mortgage Affordability Calculator', tags: ['Borrowing', 'Stress Test', 'LTV'] },
  { href: '/learn/offset-mortgage', code: 'G06', title: 'How Offset Mortgages Actually Work', description: 'See how linked savings reduce charged interest and change the repayment path.', readTime: '4 min', calcHref: '/offset', calcLabel: 'Offset Mortgage Calculator', tags: ['Offset', 'Interest Saving', 'Liquidity'] },
  { href: '/learn/retirement-savings', code: 'G07', title: 'How Retirement Savings Projections Work', description: 'Future value, inflation, employer contributions, and safe withdrawal framing.', readTime: '5 min', calcHref: '/retirement', calcLabel: 'Retirement Savings Calculator', tags: ['Retirement', 'Inflation', 'Future Value'] },
  { href: '/learn/financial-crisis', code: 'G08', title: 'How to Calculate Your Financial Runway', description: 'Emergency-fund sufficiency, burn rate, and survival months under income stress.', readTime: '4 min', calcHref: '/crisis', calcLabel: 'Financial Crisis Simulator', tags: ['Emergency Fund', 'Runway', 'Burn Rate'] },
  { href: '/learn/mortgage-overpayment', code: 'G09', title: 'Mortgage Overpayment: How Much Does It Save?', description: 'Why extra payments in earlier years change total interest most.', readTime: '5 min', calcHref: '/overpayment', calcLabel: 'Mortgage Overpayment Calculator', tags: ['Overpayment', 'Term Reduction', 'Interest Saved'] },
  { href: '/learn/save-for-goal', code: 'G10', title: 'Save for a Goal: Time and Amount Basics', description: 'Target balance, deadline, current savings, and monthly requirement in one formula path.', readTime: '4 min', calcHref: '/save-goal', calcLabel: 'Save for a Goal Calculator', tags: ['Savings Goal', 'Timeline', 'Monthly Saving'] },
  { href: '/learn/subscription-drain', code: 'G11', title: 'Subscription Drain: The True Long-Term Cost', description: 'Recurring spending, cumulative cost, and investment opportunity cost.', readTime: '4 min', calcHref: '/subscriptions', calcLabel: 'Subscription Drain Calculator', tags: ['Subscriptions', 'Opportunity Cost', 'Recurring Spend'] },
  { href: '/learn/freelance-rate', code: 'G12', title: 'Freelance Rate: Working Backwards from Desired Salary', description: 'Translate target income into a sustainable freelance day rate.', readTime: '5 min', calcHref: '/freelance', calcLabel: 'Freelance Rate Calculator', tags: ['Freelance', 'Day Rate', 'Utilisation'] },
  { href: '/learn/lifestyle-inflation', code: 'G13', title: 'Lifestyle Inflation: Real Cost Over Time', description: 'How small spending upgrades compound into a much larger long-run wealth gap.', readTime: '5 min', calcHref: '/lifestyle-inflation', calcLabel: 'Lifestyle Inflation Calculator', tags: ['Lifestyle Creep', 'Savings Rate', 'Compounding'] },
  { href: '/learn/business-interruption', code: 'G14', title: 'Business Interruption Sum Insured: How It Works', description: 'Gross profit basis, indemnity period, and under-insurance mechanics.', readTime: '5 min', calcHref: '/bi', calcLabel: 'Business Interruption Calculator', tags: ['Business Interruption', 'Gross Profit', 'Coverage'] },
  { href: '/learn/tdee', code: 'G15', title: 'TDEE and Calorie Needs: How the Calculation Works', description: 'BMR, activity multipliers, and calorie target framing.', readTime: '5 min', calcHref: '/tdee', calcLabel: 'TDEE Calculator', tags: ['TDEE', 'Calories', 'BMR'] },
  { href: '/learn/loan-repayment', code: 'G16', title: 'Loan Repayment: True APR Explained', description: 'Repayment schedules, APR, and the full cost of borrowing.', readTime: '5 min', calcHref: '/loan', calcLabel: 'Loan Repayment Calculator', tags: ['Loan', 'APR', 'Borrowing Cost'] },
];

const STRATEGY_GUIDES: GuideItem[] = [
  { href: '/learn/agentic-advisor', code: 'G17', title: 'The Agentic Advisor: AI-Driven Digital Co-Workers', description: 'Workflow delegation maths, audit trails, and automation economics for advisory firms.', readTime: '6 min', calcHref: '/ltv-cac', calcLabel: 'LTV and CAC Calculator', tags: ['AI', 'Automation', 'Advisory'] },
  { href: '/learn/predictive-analytics-portfolio', code: 'G18', title: 'Beyond Chatbots: Predictive Analytics for Portfolio Reviews', description: 'Churn scoring, model evaluation, and where predictive systems mislead.', readTime: '6 min', calcHref: '/loss-probability', calcLabel: 'Loss Probability Modeler', tags: ['Analytics', 'Portfolio', 'Models'] },
  { href: '/learn/automation-audit-2026', code: 'G19', title: 'Automation Audit: Tasks to Delegate to AI in 2026', description: 'Scoring matrix and payback logic for advisory automation.', readTime: '5 min', calcHref: '/ltv-cac', calcLabel: 'LTV and CAC Calculator', tags: ['AI', 'ROI', 'Operations'] },
  { href: '/learn/multigenerational-asset-retention', code: 'G20', title: 'Multi-Generational Bridge: Retaining Assets Across Generations', description: 'AUM retention maths across wealth-transfer horizons.', readTime: '6 min', calcHref: '/compound', calcLabel: 'Compound Interest Calculator', tags: ['Inheritance', 'Retention', 'Wealth'] },
  { href: '/learn/inheritance-pivot-heirs', code: 'G21', title: 'Inheritance Pivot: Onboarding Heirs as Clients', description: 'Heir LTV and conversion modelling for advisory firms.', readTime: '6 min', calcHref: '/compound', calcLabel: 'Compound Interest Calculator', tags: ['Heirs', 'Onboarding', 'LTV'] },
  { href: '/learn/tax-loss-harvesting', code: 'G22', title: 'Tax-Loss Harvesting Strategies for Volatile Markets', description: 'After-tax alpha and replacement-security logic under volatile conditions.', readTime: '5 min', calcHref: '/take-home', calcLabel: 'Salary Take-Home Calculator', tags: ['Tax', 'Portfolio', 'Markets'] },
  { href: '/learn/private-credit-playbook', code: 'G23', title: 'Private Credit Playbook: Diversifying Beyond Equities', description: 'Yield construction, liquidity stress, and default scenario framing.', readTime: '6 min', calcHref: '/compound', calcLabel: 'Compound Interest Calculator', tags: ['Private Credit', 'Yield', 'Allocation'] },
  { href: '/learn/parametric-insurance-weather', code: 'G24', title: 'Parametric Insurance: Instant-Payout Weather Triggers', description: 'Trigger design, basis risk, and premium logic for parametric cover.', readTime: '5 min', calcHref: '/tcor', calcLabel: 'Total Cost of Risk Calculator', tags: ['Insurance', 'Climate', 'Parametric'] },
  { href: '/learn/cyber-resilient-agency', code: 'G25', title: 'Cyber-Resilient Agency: Protecting Client Data', description: 'Breach cost, ALE, and control investment prioritisation.', readTime: '6 min', calcHref: '/cyber', calcLabel: 'Cyber Risk Calculator', tags: ['Cyber', 'Risk', 'Controls'] },
  { href: '/learn/regtech-compliance-automation', code: 'G26', title: 'RegTech Essentials: Automating Compliance', description: 'Compliance-cost baselines and automation-efficiency ratios.', readTime: '6 min', calcHref: '/ltv-cac', calcLabel: 'LTV and CAC Calculator', tags: ['Compliance', 'RegTech', 'Efficiency'] },
  { href: '/learn/market-forecasts-rate-cuts', code: 'G27', title: 'Market Forecasts: Impact of Rate Cuts and Geopolitics', description: 'Duration, scenario analysis, and probability-weighted return framing.', readTime: '6 min', calcHref: '/compound', calcLabel: 'Compound Interest Calculator', tags: ['Markets', 'Rates', 'Scenario Analysis'] },
  { href: '/learn/digital-client-experience-phygital', code: 'G28', title: 'Digital Client Experience: Phygital Engagement Platforms', description: 'NPS value, digital touchpoint savings, and adoption-risk framing.', readTime: '5 min', calcHref: '/ltv-cac', calcLabel: 'LTV and CAC Calculator', tags: ['Client Experience', 'NPS', 'Digital'] },
];

const MONEY_GUIDES: GuideItem[] = [
  { href: '/learn/financial-crisis-simulator', code: 'G29', title: 'Financial Crisis Simulator: How Long Will Savings Last?', description: 'Tie savings and burn rate to a practical survival timeline.', readTime: '6 min', calcHref: '/crisis', calcLabel: 'Financial Crisis Simulator', tags: ['Savings', 'Runway', 'Stress Test'] },
  { href: '/learn/retirement-employer-contributions', code: 'G30', title: 'Retirement Savings: Employer Contributions and Inflation Impact', description: 'Show how employer funding and inflation change the real retirement picture.', readTime: '7 min', calcHref: '/retirement', calcLabel: 'Retirement Savings Calculator', tags: ['Pension', 'Employer Match', 'Inflation'] },
  { href: '/learn/emergency-fund-how-much', code: 'G31', title: 'Emergency Fund: How Much Is Enough?', description: 'Move past the generic three-to-six-month rule and set a more defensible buffer.', readTime: '5 min', calcHref: '/crisis', calcLabel: 'Financial Crisis Simulator', tags: ['Emergency Fund', 'Planning', 'Expenses'] },
  { href: '/learn/buy-to-let-yield', code: 'G32', title: 'Buy-to-Let Yield: Gross, Net, and Cash-on-Cash Return', description: 'Compare property return measures that often get mixed up in search.', readTime: '6 min', calcHref: '/savings', calcLabel: 'Savings Growth Calculator', tags: ['Property', 'Yield', 'Cash Flow'] },
  { href: '/learn/capital-gains-tax', code: 'G33', title: 'Capital Gains Tax: How the Calculation Works (2025/26)', description: 'CGT rates, exempt amount, and reporting logic for disposals.', readTime: '7 min', calcHref: '/take-home', calcLabel: 'Salary Take-Home Calculator', tags: ['Capital Gains Tax', 'Tax', 'Investing'] },
  { href: '/learn/pension-drawdown', code: 'G34', title: 'Pension Drawdown: Sustainable Withdrawal Rates Explained', description: 'Withdrawal rates, sequence risk, and retirement income durability.', readTime: '6 min', calcHref: '/retirement', calcLabel: 'Retirement Savings Calculator', tags: ['Pension', 'Drawdown', 'Withdrawal Rate'] },
  { href: '/learn/salary-sacrifice', code: 'G35', title: 'Salary Sacrifice: Tax and National Insurance Savings Explained', description: 'Gross-pay reductions, pension benefits, and employer NI savings.', readTime: '5 min', calcHref: '/take-home', calcLabel: 'Salary Take-Home Calculator', tags: ['Salary Sacrifice', 'Tax', 'NI'] },
  { href: '/learn/student-loan-repayment', code: 'G36', title: 'Student Loan Repayment: Plan 1, Plan 2, and Plan 5 Compared', description: 'Graduate-repayment logic across the main UK plan types.', readTime: '6 min', calcHref: '/loan', calcLabel: 'Loan Repayment Calculator', tags: ['Student Loan', 'Repayment', 'Salary'] },
  { href: '/learn/lisa-help-to-buy', code: 'G37', title: 'LISA vs Help to Buy ISA: When the Government Bonus Actually Helps', description: 'Bonus, penalty, property-cap, and timing trade-offs for first-time buyers.', readTime: '5 min', calcHref: '/save-goal', calcLabel: 'Save for a Goal Calculator', tags: ['LISA', 'First-Time Buyer', 'Savings'] },
  { href: '/learn/inheritance-tax', code: 'G38', title: 'Inheritance Tax: Nil-Rate Band, Taper Relief, and How It Is Calculated', description: 'Thresholds, exemptions, and the gifting timeline that shapes estate tax.', readTime: '7 min', calcHref: '/compound', calcLabel: 'Compound Interest Calculator', tags: ['Inheritance Tax', 'Estate Planning', 'Thresholds'] },
  { href: '/learn/currency-exchange-fees', code: 'G39', title: 'Currency Exchange: The Real Cost of FX Fees and Spread', description: 'Spread, markup, and transfer-cost logic behind cross-border payments.', readTime: '5 min', calcHref: '/compound', calcLabel: 'Compound Interest Calculator', tags: ['FX', 'Currency', 'Fees'] },
  { href: '/learn/dividend-vs-growth', code: 'G40', title: 'Dividend Yield vs Growth Investing: Total Return Comparison', description: 'Cashflow, tax treatment, and total-return comparisons between styles.', readTime: '6 min', calcHref: '/compound', calcLabel: 'Compound Interest Calculator', tags: ['Investing', 'Dividends', 'Growth'] },
];

const LEARN_HUB_CLUSTERS = getLearnHubClusters();

function GuideDirectory({
  title,
  intro,
  guides,
}: {
  title: string;
  intro: string;
  guides: GuideItem[];
}) {
  return (
    <section style={{ marginBottom: '3rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
          {title}
        </div>
        <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)' }}>{guides.length} guides</div>
      </div>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: '0 0 1rem' }}>
        {intro}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border)' }}>
        {guides.map((guide) => (
          <Link key={guide.href} href={guide.href} className="calc-link">
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.06em', flexShrink: 0 }}>{guide.code}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: 500, marginBottom: '0.3rem', letterSpacing: '-0.01em' }}>{guide.title}</div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, fontWeight: 300, marginBottom: '0.6rem' }}>{guide.description}</div>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)', letterSpacing: '0.04em' }}>{guide.readTime}</span>
                <span style={{ color: 'var(--border)', fontSize: '0.7rem' }}>·</span>
                {guide.tags.map((tag) => (
                  <span key={tag} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)', border: '1px solid var(--border)', borderRadius: '3px', padding: '0.12rem 0.45rem', letterSpacing: '0.04em' }}>{tag}</span>
                ))}
              </div>
              <div style={{ marginTop: '0.6rem', fontFamily: 'var(--font-mono)', fontSize: '0.64rem', color: '#2ec88a', letterSpacing: '0.04em' }}>
                Use the calculator: <span style={{ color: 'var(--text-secondary)' }}>{guide.calcLabel}</span> <span style={{ color: 'var(--text-muted)' }}>· {guide.calcHref}</span>
              </div>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: 'var(--text-muted)', flexShrink: 0 }}>→</div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function LearnIndexPage() {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 2rem' }}>
      <Breadcrumbs items={buildGuideBreadcrumbs('Learning Centre')} />

      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(1.8rem, 4vw, 2.75rem)', fontWeight: 300, color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1.25rem' }}>
          How the maths works.
        </h1>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '620px', fontWeight: 300, marginBottom: '1rem' }}>
          Formula-first guides that support the main calculators. Read the method, move into the calculator, and keep the important pages in the same topical cluster one or two clicks apart.
        </p>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.04em' }}>
          Priority clusters: mortgages, savings, compound interest, repayment, overpayment, offset, salary, retirement, and risk.
        </div>
      </div>

      <div style={{ marginBottom: '3rem', display: 'grid', gap: '1rem' }}>
        {LEARN_HUB_CLUSTERS.map((cluster) => (
          <section key={cluster.key} style={{ padding: '1.1rem 1.2rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '8px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.55rem' }}>
              {cluster.title}
            </div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: '0 0 1rem' }}>
              {cluster.intro}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.65rem', marginBottom: '0.9rem' }}>
              {cluster.calculators.slice(0, 4).map((calculator) => (
                <Link key={calculator.href} href={calculator.href} style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', padding: '0.75rem 0.9rem', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '6px', textDecoration: 'none' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-primary)' }}>{calculator.label}</span>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.76rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{calculator.description}</span>
                </Link>
                ))}
              </div>
            <RelatedGuides
              title="Sub-Hubs"
              intro="Use these short organiser pages when you want the strongest pages in this cluster grouped by job rather than listed in a flat directory."
              links={cluster.hubs}
            />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.65rem' }}>
              {cluster.guides.slice(0, 4).map((guide) => (
                <Link key={guide.href} href={guide.href} style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', padding: '0.75rem 0.9rem', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '6px', textDecoration: 'none' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-primary)' }}>{guide.label}</span>
                  {guide.description ? (
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.76rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{guide.description}</span>
                  ) : null}
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      <GuideDirectory
        title="Core Guides"
        intro="These are the evergreen explainer pages most closely tied to the main calculator hubs and the highest-intent finance topics."
        guides={CORE_GUIDES}
      />

      <GuideDirectory
        title="Advanced and Professional Guides"
        intro="These pages support the professional tool clusters and adjacent strategic searches without breaking the formula-first site style."
        guides={STRATEGY_GUIDES}
      />

      <GuideDirectory
        title="Current-Year Money Questions"
        intro="These guides answer narrower tax, salary, retirement, and property questions that often sit one step before calculator use."
        guides={MONEY_GUIDES}
      />

      <div style={{ marginBottom: '3rem', padding: '1.25rem 1.5rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '8px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
          Trust and Standards
        </div>
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
          Supporting documents that explain formula choices, source freshness, editorial boundaries, and review standards.
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.6rem' }}>
          {[
            { href: '/methodology', label: 'Methodology' },
            { href: '/formula-library', label: 'Formula Library' },
            { href: '/data-sources', label: 'Data Sources' },
            { href: '/how-we-update-tax-rates', label: 'How We Update Tax Rates' },
            { href: '/editorial-policy', label: 'Editorial Policy' },
            { href: '/authors-and-review', label: 'Authors and Review' },
          ].map((item) => (
            <Link key={item.href} href={item.href} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', padding: '0.8rem 0.95rem', textDecoration: 'none', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '6px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.76rem', color: 'var(--text-primary)' }}>{item.label}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>→</span>
            </Link>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '3rem', padding: '1.25rem 1.5rem', background: 'rgba(46,200,138,0.04)', border: '1px solid rgba(46,200,138,0.15)', borderRadius: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#2ec88a', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.45rem' }}>Search-Specific Explainers</div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '620px' }}>
              Narrow pages built for specific calculator-intent queries. These extensions reinforce the formula-first position and link directly into the relevant tools.
            </div>
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)' }}>{PROGRAMMATIC_LEARN_TOPICS.length} extensions</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0.6rem' }}>
          {PROGRAMMATIC_LEARN_TOPICS.map((topic) => (
            <Link key={topic.slug} href={`/learn/${topic.slug}`} style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', padding: '0.85rem 0.95rem', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '6px', textDecoration: 'none' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.76rem', color: 'var(--text-primary)', lineHeight: 1.45 }}>{topic.title}</span>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.76rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>{topic.description}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.64rem', color: '#2ec88a' }}>{topic.calculatorLabel}</span>
            </Link>
          ))}
        </div>
      </div>

      <div style={{ padding: '1.25rem 1.5rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
        These guides explain how calculations work. They are not financial advice, tax advice, insurance advice, or investment recommendations.
      </div>
    </div>
  );
}
