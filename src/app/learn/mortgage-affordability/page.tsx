import type { Metadata } from 'next';
import GuideLayout from '@/components/learn/GuideLayout';

export const metadata: Metadata = {
  title: 'How Mortgage Affordability Is Assessed: LTI, Stress Tests & Deposit Rules',
  description: 'Understand exactly how lenders calculate mortgage affordability in 2025/26. Covers income multiples, stress testing, deposit requirements, and the factors that affect how much you can borrow.',
};

export default function Guide() {
  return (
    <GuideLayout
      number="G05"
      title="How Mortgage Affordability Is Assessed (2025/26)"
      readTime="7 min"
      keywords={['mortgage affordability calculator UK 2025', 'how much can I borrow mortgage', 'mortgage income multiple 2025', 'mortgage stress test UK explained', 'mortgage deposit requirements 2025']}
    >
      <p>
        Mortgage affordability determines how much a lender will let you borrow. It is not simply
        a multiple of your salary — lenders run detailed income verification, credit stress tests,
        and affordability calculations that factor in your outgoings, dependants, and interest rate
        sensitivity. Knowing the methodology helps you predict approval and manage expectations.
      </p>

      <h2>The Two Key Tests</h2>

      <h3>1. Loan-to-Income (LTI) Multiple</h3>
      <p>
        Most lenders cap borrowing at 4–4.5× single income or 3.5–4× joint income.
        The Bank of England requires that no more than 15% of a lender's new mortgages exceed 4.5× income.
      </p>
      <table>
        <thead><tr><th>Income</th><th>4× Multiple</th><th>4.5× Multiple</th></tr></thead>
        <tbody>
          <tr><td>£35,000 (single)</td><td>£140,000</td><td>£157,500</td></tr>
          <tr><td>£50,000 (single)</td><td>£200,000</td><td>£225,000</td></tr>
          <tr><td>£60,000 + £30,000 (joint)</td><td>£360,000</td><td>£405,000</td></tr>
          <tr><td>£80,000 + £50,000 (joint)</td><td>£520,000</td><td>£585,000</td></tr>
        </tbody>
      </table>

      <h3>2. Affordability / Stress Test</h3>
      <p>
        Lenders test that you could still afford repayments if rates rose by typically 2–3%.
        The FCA removed prescriptive stress test requirements in 2022, but lenders continue to apply
        their own — most still test at SVR + 1–2%.
      </p>
      <pre className="formula-block">{
`Stress Test Rate = Your offered rate + Lender stress buffer (typically 2–3%)

Example: 5% mortgage rate → tested at 7–8%
Monthly payment at 5% on £250,000 (25y): £1,461
Monthly payment at 8% on £250,000 (25y): £1,929

Lender checks your income/outgoings can absorb £1,929/month.`
      }</pre>

      <h2>What Counts as Income</h2>
      <table>
        <thead><tr><th>Income Type</th><th>Typically Accepted?</th><th>At What %?</th></tr></thead>
        <tbody>
          <tr><td>Employed basic salary</td><td>Yes</td><td>100%</td></tr>
          <tr><td>Regular bonuses (evidenced)</td><td>Usually</td><td>50–100%</td></tr>
          <tr><td>Overtime (regular)</td><td>Usually</td><td>50–75%</td></tr>
          <tr><td>Self-employed profits</td><td>Yes (2–3yr average)</td><td>100% of average</td></tr>
          <tr><td>Rental income</td><td>Yes</td><td>70–100%</td></tr>
          <tr><td>Benefits (DLA, PIP etc.)</td><td>Some lenders</td><td>100% if accepted</td></tr>
          <tr><td>Investment income</td><td>Some lenders</td><td>100% if evidenced</td></tr>
        </tbody>
      </table>

      <h2>What Affects the Maximum Loan</h2>
      <ul>
        <li><strong>Credit score</strong> — impacts rate offered, not directly the multiple, but a poor score may mean lower LTI access</li>
        <li><strong>Deposit size</strong> — higher LTV (lower deposit) means higher rate, reducing max loan via affordability test</li>
        <li><strong>Committed outgoings</strong> — car finance, credit cards, child maintenance, childcare all reduce affordability</li>
        <li><strong>Term length</strong> — longer term reduces monthly payment, increasing the amount you pass affordability at</li>
        <li><strong>Number of dependants</strong> — increases assumed living costs, reducing headroom</li>
      </ul>

      <h2>What-If Scenarios</h2>

      <h3>Scenario 1: Impact of car finance on borrowing capacity</h3>
      <p>
        £350/month car finance reduces monthly disposable income by £350.
        At typical affordability ratios, this can reduce maximum mortgage by £50,000–£80,000.
        Clearing car finance before applying can materially increase borrowing capacity.
      </p>

      <h3>Scenario 2: Extending the term from 25 to 35 years</h3>
      <p>
        Extending the term lowers monthly payments, which can help pass the affordability test.
        £250,000 mortgage at 5%: 25y = £1,461/month; 35y = £1,264/month. But total interest paid rises by ~£60,000.
      </p>

      <h3>Scenario 3: Raising the deposit from 5% to 20%</h3>
      <p>
        On a £300,000 property: 5% deposit (£15,000) → likely 5.5–6% rate.
        20% deposit (£60,000) → likely 4.5–5% rate. Lower rate means lower stress test threshold
        and improved affordability — allowing a larger loan at the same income.
      </p>

      <h2>Frequently Asked Questions</h2>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "How many times my salary can I borrow for a mortgage in 2025?",
            "acceptedAnswer": { "@type": "Answer", "text": "Most UK lenders will lend up to 4–4.5 times your annual income. Some specialist lenders will go to 5–6× for certain professions (doctors, lawyers). The Bank of England limits lenders from giving more than 15% of new mortgages above 4.5× income." }},
          { "@type": "Question", "name": "What is a mortgage stress test?",
            "acceptedAnswer": { "@type": "Answer", "text": "A mortgage stress test checks whether you could afford repayments if interest rates rose by 2–3%. Even if the FCA removed prescriptive rules in 2022, lenders continue to apply their own stress buffers, typically testing at their standard variable rate plus 1–2%." }},
          { "@type": "Question", "name": "Does a higher deposit increase how much I can borrow?",
            "acceptedAnswer": { "@type": "Answer", "text": "A higher deposit lowers your LTV, which typically means a lower interest rate. A lower rate reduces your monthly payment and the stress test threshold, meaning you pass affordability at a higher loan amount for the same income." }},
          { "@type": "Question", "name": "Does child maintenance affect mortgage affordability?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes. Regular committed outgoings including child maintenance, car finance, and childcare costs are deducted from your disposable income before the lender calculates how much you can afford. They reduce the maximum mortgage available." }}
        ]
      })}} />

      <p className="tool-link">→ <a href="/affordability">Calculate your maximum borrowing with the Mortgage Affordability Calculator</a></p>
      <p className="disclaimer">Indicative only. Each lender has different criteria. These figures reflect typical UK high street lender practice in 2025. Always obtain a Decision in Principle before making an offer.</p>
    </GuideLayout>
  );
}
