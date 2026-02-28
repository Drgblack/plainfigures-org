import type { Metadata } from 'next';
import GuideLayout from '@/components/learn/GuideLayout';

export const metadata: Metadata = {
  title: 'Compound Interest: Frequency, Effective Annual Rate, and Real Returns',
  description: 'A complete guide to compound interest: how compounding frequency affects your return, the difference between nominal and effective annual rate (EAR), and real-world investment examples.',
};

export default function Guide() {
  return (
    <GuideLayout
      number="G02"
      title="Understanding Compound Interest: Frequency, EAR, and Real Returns"
      readTime="6 min"
      keywords={['compound interest calculator', 'effective annual rate explained', 'how compounding frequency affects returns', 'nominal vs effective interest rate', 'compound interest formula explained']}
    >
      <p>
        Compound interest is the process by which interest earns interest on itself. The more
        frequently compounding occurs, the higher your effective return — even if the stated rate
        is identical. A 5% annual rate compounded monthly is worth more than 5% compounded annually.
        This guide explains the formula, the frequency effect, and the difference between what your
        account says it pays and what you actually earn.
      </p>

      <h2>The Compound Interest Formula</h2>
      <pre className="formula-block">{
`A = P × (1 + r/n)^(n×t)

Where:
A = Final amount
P = Principal (initial deposit)
r = Annual interest rate (decimal)
n = Compounding periods per year
t = Time in years`
      }</pre>

      <h2>How Compounding Frequency Affects Returns</h2>
      <p>£10,000 at 5% annual rate over 10 years, different compounding periods:</p>
      <table>
        <thead><tr><th>Frequency</th><th>n</th><th>Final Amount</th><th>Extra vs Annual</th></tr></thead>
        <tbody>
          <tr><td>Annual</td><td>1</td><td>£16,289</td><td>—</td></tr>
          <tr><td>Quarterly</td><td>4</td><td>£16,436</td><td>+£147</td></tr>
          <tr><td>Monthly</td><td>12</td><td>£16,470</td><td>+£181</td></tr>
          <tr><td>Daily</td><td>365</td><td>£16,487</td><td>+£198</td></tr>
          <tr><td>Continuous</td><td>∞</td><td>£16,487</td><td>+£198</td></tr>
        </tbody>
      </table>
      <p>
        The difference between annual and daily compounding is modest (about 1.2% extra).
        The real impact of frequency becomes visible over longer periods and at higher rates.
      </p>

      <h2>Nominal vs Effective Annual Rate (EAR)</h2>
      <pre className="formula-block">{
`EAR = (1 + r/n)^n − 1

Example: 6% nominal rate, monthly compounding
EAR = (1 + 0.06/12)^12 − 1 = 6.168%

This is what you actually earn, not the stated 6%.`
      }</pre>
      <table>
        <thead><tr><th>Nominal Rate</th><th>Annual</th><th>Quarterly</th><th>Monthly</th><th>Daily</th></tr></thead>
        <tbody>
          <tr><td>3%</td><td>3.000%</td><td>3.034%</td><td>3.042%</td><td>3.045%</td></tr>
          <tr><td>5%</td><td>5.000%</td><td>5.095%</td><td>5.116%</td><td>5.127%</td></tr>
          <tr><td>8%</td><td>8.000%</td><td>8.243%</td><td>8.300%</td><td>8.328%</td></tr>
          <tr><td>12%</td><td>12.000%</td><td>12.551%</td><td>12.683%</td><td>12.747%</td></tr>
        </tbody>
      </table>

      <h2>What-If Scenarios</h2>

      <h3>Scenario 1: Early vs late start — the decade of compounding</h3>
      <p>Both invest £300/month at 7% annual return until age 67:</p>
      <table>
        <thead><tr><th>Start Age</th><th>Total Contributions</th><th>Final Amount</th></tr></thead>
        <tbody>
          <tr><td>22</td><td>£162,000</td><td>£875,000</td></tr>
          <tr><td>32</td><td>£126,000</td><td>£454,000</td></tr>
          <tr><td>42</td><td>£90,000</td><td>£220,000</td></tr>
        </tbody>
      </table>
      <p>Starting 10 years earlier nearly doubles the outcome despite only £36,000 more in contributions.</p>

      <h3>Scenario 2: The Rule of 72</h3>
      <p>A quick mental shortcut: divide 72 by the annual return to find doubling time.</p>
      <table>
        <thead><tr><th>Annual Return</th><th>Years to Double</th></tr></thead>
        <tbody>
          <tr><td>3%</td><td>24 years</td></tr>
          <tr><td>6%</td><td>12 years</td></tr>
          <tr><td>9%</td><td>8 years</td></tr>
          <tr><td>12%</td><td>6 years</td></tr>
        </tbody>
      </table>

      <h3>Scenario 3: Compound interest working against you — credit card debt</h3>
      <p>
        £5,000 credit card balance at 24.9% APR, minimum payments only (~£100/month):
        Takes approximately 8 years to repay. Total interest paid: ~£4,600 — nearly as much as the original debt.
        Same balance paid at £300/month: repaid in under 2 years, total interest ~£1,100.
      </p>

      <h2>Frequently Asked Questions</h2>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "What is the compound interest formula?",
            "acceptedAnswer": { "@type": "Answer", "text": "A = P × (1 + r/n)^(n×t), where A is the final amount, P is the principal, r is the annual rate as a decimal, n is the number of compounding periods per year, and t is the number of years." }},
          { "@type": "Question", "name": "What is the difference between nominal and effective annual rate?",
            "acceptedAnswer": { "@type": "Answer", "text": "The nominal rate is the stated rate on an account. The effective annual rate (EAR) accounts for compounding frequency and represents what you actually earn. A 6% nominal rate compounded monthly produces a 6.168% EAR." }},
          { "@type": "Question", "name": "Does compounding frequency make a big difference?",
            "acceptedAnswer": { "@type": "Answer", "text": "For moderate rates over short periods, the difference is small. Daily vs annual compounding on 5% over 10 years adds about 1.2% to the total. The effect magnifies with higher rates and longer periods." }},
          { "@type": "Question", "name": "What is the Rule of 72?",
            "acceptedAnswer": { "@type": "Answer", "text": "The Rule of 72 is a shortcut for estimating how long it takes to double your money: divide 72 by the annual interest rate. At 6% annual return, money doubles in approximately 12 years." }}
        ]
      })}} />

      <p className="tool-link">→ <a href="/compound">Try the Compound Interest Calculator</a></p>
      <p className="disclaimer">Indicative only. Investment returns are variable and not guaranteed. Past performance is not a guide to future results.</p>
    </GuideLayout>
  );
}
