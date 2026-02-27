import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Plain Figures — Financial Calculators & Learning Centre',
  description: 'Accurate financial and insurance calculators plus formula-first guides. Mortgage, compound interest, salary, retirement, and more. No advice. No noise. Just the maths.',
};

const PERSONAL_CALCULATORS = [
  { href: '/mortgage', code: '01', title: 'Mortgage Repayment', description: 'Monthly payment, total interest, and full cost over any term.', tags: ['Repayments', 'Interest', 'Amortisation'], learnHref: '/learn/mortgage-repayment' },
  { href: '/savings', code: '02', title: 'Savings Growth', description: 'How compound interest grows your savings with regular contributions.', tags: ['Compound Interest', 'Growth', 'Projections'] },
  { href: '/rent-vs-buy', code: '03', title: 'Rent vs Buy', description: 'Long-term financial outcome of renting against buying.', tags: ['Net Worth', 'Break-even', 'Opportunity Cost'], learnHref: '/learn/rent-vs-buy' },
  { href: '/compound', code: '04', title: 'Compound Interest', description: 'How compounding frequency affects your effective annual rate.', tags: ['EAR', 'Daily / Monthly / Annual'], learnHref: '/learn/compound-interest' },
  { href: '/loan', code: '05', title: 'Loan Repayment', description: 'Monthly repayments and true APR on any loan or credit agreement.', tags: ['APR', 'Personal Loan', 'Car Finance'] },
  { href: '/retirement', code: '06', title: 'Retirement Savings', description: 'Project your pension pot, including employer contributions and inflation.', tags: ['Pension', 'Inflation-adjusted', '4% Rule'], learnHref: '/learn/retirement-savings' },
  { href: '/offset', code: '07', title: 'Offset Mortgage', description: 'How savings reduce mortgage interest and shorten your term.', tags: ['Offset', 'Interest Saving', 'Term Reduction'], learnHref: '/learn/offset-mortgage' },
  { href: '/overpayment', code: '08', title: 'Mortgage Overpayment', description: 'Interest saved and years removed by paying extra each month.', tags: ['Overpayment', 'Interest Saved', 'Early Payoff'] },
  { href: '/save-goal', code: '09', title: 'Save for a Goal', description: 'How long to reach a target, or what monthly saving hits a deadline.', tags: ['Target', 'Deadline', 'Monthly Required'] },
  { href: '/take-home', code: '10', title: 'Salary Take-Home', description: 'Net pay after tax — UK, Germany, USA, France, Netherlands, Australia.', tags: ['Tax', 'Net Salary', '6 Countries'], learnHref: '/learn/salary-take-home' },
  { href: '/affordability', code: '11', title: 'Mortgage Affordability', description: 'The maximum you can borrow based on income, deposit, and stress test.', tags: ['Borrowing Power', 'LTV', 'Stress Test'], learnHref: '/learn/mortgage-affordability' },
  { href: '/tdee', code: '12', title: 'TDEE & Calorie Calculator', description: 'Total daily energy expenditure, BMR, BMI, and macro targets.', tags: ['Calories', 'BMI', 'Fitness'] },
  { href: '/subscriptions', code: '13', title: 'Subscription Drain', description: 'True 10-year cost of subscriptions and investment opportunity cost.', tags: ['Subscriptions', '10-Year Cost', 'Opportunity Cost'] },
  { href: '/freelance', code: '14', title: 'Freelance Rate Calculator', description: 'Work backwards from desired salary to minimum hourly and day rate.', tags: ['Day Rate', 'Freelance', 'Contractor'] },
  { href: '/lifestyle-inflation', code: '15', title: 'Lifestyle Inflation Tracker', description: 'Compare current vs entry-level spending and the 10-year opportunity cost.', tags: ['Lifestyle Creep', 'Spending', 'Opportunity Cost'] },
  { href: '/crisis', code: '16', title: 'Financial Crisis Simulator', description: 'How long your savings last if you lose your job or costs double.', tags: ['Emergency Fund', 'Job Loss', 'Survival Runway'], learnHref: '/learn/financial-crisis' },
];

const PROFESSIONAL_CALCULATORS = [
  { href: '/bi', code: 'P01', title: 'Business Interruption Sum Insured', description: 'Calculate BI sum insured using gross profit, trend uplift, indemnity period, and ICOW.', tags: ['Gross Profit', 'ICOW', 'Indemnity Period'] },
  { href: '/hlv', code: 'P02', title: 'Human Life Value / Life Insurance Needs', description: 'Present value of future earnings, debts, and obligations to find the true insurance gap.', tags: ['HLV', 'Coverage Gap', 'Protection'] },
  { href: '/cyber', code: 'P03', title: 'Cyber Risk Exposure', description: 'Estimate breach costs, risk score, and recommended cover limit based on security controls.', tags: ['Ransomware', 'Data Breach', 'Risk Score'] },
  { href: '/tcor', code: 'P04', title: 'Total Cost of Risk (TCOR)', description: 'Aggregate premiums, retained losses, admin, and risk control costs. Four scenario comparison including high loss year and improved risk management.', tags: ['TCOR Rate', 'Retained Losses', 'Scenarios'] },
  { href: '/risk-heatmap', code: 'P05', title: 'Risk Score & Heat Map', description: 'Score risks by likelihood and impact. 5×5 heat map, editable register, pre vs post-mitigation comparison.', tags: ['Heat Map', 'Risk Register', 'Mitigation'] },
  { href: '/scr', code: 'P06', title: 'SCR Estimator (Solvency II)', description: 'Estimate Solvency Capital Requirement using standard formula principles. Solvency ratio gauge with stress test scenarios.', tags: ['SCR', 'Solvency II', 'Capital'] },
  { href: '/coverage-gap', code: 'P07', title: 'Coverage Gap Analysis', description: 'Map policy limits against exposures across property, liability, BI, and cyber lines. Identify uninsured gaps and growth scenarios.', tags: ['Under-Insurance', 'Limits', 'Coinsurance'] },
  { href: '/ltv-cac', code: 'P08', title: 'LTV & CAC Calculator', description: 'Customer Lifetime Value, CAC ratio, and payback period. DCF-based LTV with scenario modelling for churn, ARPU, and growth.', tags: ['LTV:CAC', 'Payback', 'Churn'] },
  { href: '/loss-probability', code: 'P09', title: 'Loss Event Probability Modeler', description: 'Expected annual loss from risk events using triangular distributions. Exceedance probabilities, PML, and mitigation impact.', tags: ['PML', 'Triangular', 'Exceedance'] },
  { href: '/cyber-limit', code: 'P10', title: 'Cyber Insurance Limit Recommender', description: 'Estimate cyber limit adequacy from revenue, records, industry, and security controls. Risk score gauge, exposure breakdown, threat scenarios.', tags: ['Cyber', 'Limit Adequacy', 'GDPR'] },
];

const FEATURED_GUIDES = [
  { href: '/learn/mortgage-repayment', title: 'How Mortgage Repayment Calculations Work', readTime: '5 min' },
  { href: '/learn/compound-interest', title: 'Understanding Compound Interest', readTime: '4 min' },
  { href: '/learn/salary-take-home', title: 'How Salary Take-Home Is Calculated', readTime: '7 min' },
  { href: '/learn/rent-vs-buy', title: 'Rent vs Buy: The Key Numbers to Compare', readTime: '6 min' },
];

function CalcList({ items, professional }: { items: typeof PERSONAL_CALCULATORS; professional?: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)', borderRadius: '8px', overflow: 'hidden', border: `1px solid ${professional ? 'rgba(212,168,67,0.2)' : 'var(--border)'}` }}>
      {items.map(({ href, code, title, description, tags, learnHref }: any) => (
        <Link key={href} href={href} className="calc-link" style={{ borderLeft: professional ? '2px solid rgba(212,168,67,0.4)' : 'none' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: professional ? '#d4a843' : 'var(--text-muted)', letterSpacing: '0.06em', flexShrink: 0 }}>{code}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: 500, marginBottom: '0.3rem', letterSpacing: '-0.01em' }}>{title}</div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, fontWeight: 300, marginBottom: '0.6rem' }}>{description}</div>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
              {tags.map((tag: string) => (
                <span key={tag} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)', border: `1px solid ${professional ? 'rgba(212,168,67,0.2)' : 'var(--border)'}`, borderRadius: '3px', padding: '0.12rem 0.45rem', letterSpacing: '0.04em' }}>{tag}</span>
              ))}
              {learnHref && (
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: '#2ec88a', border: '1px solid rgba(46,200,138,0.25)', borderRadius: '3px', padding: '0.12rem 0.45rem', letterSpacing: '0.04em' }}>
                  guide ↗
                </span>
              )}
            </div>
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: 'var(--text-muted)', flexShrink: 0 }}>→</div>
        </Link>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 2rem' }}>
      {/* Hero */}
      <div style={{ marginBottom: '4rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>Financial Calculator Hub</div>
        <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 300, color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1.5rem' }}>
          Check the maths.<br /><span style={{ color: 'var(--text-muted)' }}>Without the noise.</span>
        </h1>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '520px', fontWeight: 300 }}>
          26 calculators and 8 formula-first guides for personal decisions and professional use. No advice, no opinions, no products. Just numbers you can trust.
        </p>
      </div>

      {/* Featured guides strip */}
      <div style={{ marginBottom: '3rem', padding: '1.25rem 1.5rem', background: 'rgba(46,200,138,0.04)', border: '1px solid rgba(46,200,138,0.15)', borderRadius: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#2ec88a', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Learning Centre</div>
          <Link href="/learn" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#2ec88a', textDecoration: 'none', letterSpacing: '0.06em' }}>
            All 8 guides →
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
          {FEATURED_GUIDES.map(({ href, title, readTime }) => (
            <Link key={href} href={href} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.55rem 0.8rem', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '4px', textDecoration: 'none', transition: 'border-color 0.15s ease', gap: '0.5rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.73rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{title}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', flexShrink: 0 }}>{readTime}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Personal calculators */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Personal Finance & Lifestyle</div>
          <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)' }}>{PERSONAL_CALCULATORS.length} calculators</div>
        </div>
        <CalcList items={PERSONAL_CALCULATORS} />
      </div>

      {/* Professional tools */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#d4a843', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Professional Tools</div>
          <div style={{ flex: 1, height: '1px', background: 'rgba(212,168,67,0.2)' }} />
          <div style={{ padding: '0.15rem 0.5rem', background: 'rgba(212,168,67,0.1)', border: '1px solid rgba(212,168,67,0.25)', borderRadius: '3px', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#d4a843', letterSpacing: '0.1em' }}>FOR BROKERS & RISK MANAGERS</div>
        </div>
        <CalcList items={PROFESSIONAL_CALCULATORS} professional />
      </div>

      {/* Disclaimer */}
      <div style={{ padding: '1.25rem 1.5rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.6, letterSpacing: '0.02em' }}>
        Plain Figures does not provide financial, medical, or insurance advice. All calculations are indicative only. Always consult a qualified adviser before making decisions.
      </div>
    </div>
  );
}
