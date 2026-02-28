import type { Metadata } from 'next';
import GuideLayout from '@/components/layout/GuideLayout';

export const metadata: Metadata = {
  title: 'Rent vs Buy: The Key Numbers to Compare — Plain Figures Learning Centre',
  description: 'What a fair financial comparison between renting and buying involves — opportunity cost, equity, the costs people forget, and the break-even point explained.',
};

export default function RentVsBuyGuide() {
  return (
    <GuideLayout
      title="Rent vs Buy: The Key Numbers to Compare"
      description="What a fair financial comparison between renting and buying actually involves — including opportunity cost, hidden costs of ownership, equity build-up, and when buying wins numerically."
      readTime="6 min"
      relatedCalc={{ href: '/rent-vs-buy', label: 'Rent vs Buy Calculator' }}
      relatedGuides={[
        { href: '/learn/mortgage-repayment', label: 'How Mortgage Repayment Calculations Work' },
        { href: '/learn/mortgage-affordability', label: 'How Mortgage Affordability Is Assessed' },
        { href: '/learn/offset-mortgage', label: 'How Offset Mortgages Actually Work' },
      ]}
    >
      <div className="guide-content">
        <h2>Why This Comparison Is Hard to Do Fairly</h2>
        <p>
          Most rent vs buy comparisons are done badly — either by ignoring what a renter could do with their deposit, or by ignoring the true ongoing cost of ownership. A fair comparison treats both options as financial choices and accounts for all cash flows, including investment alternatives.
        </p>

        <h2>The True Cost of Buying</h2>
        <p>
          Monthly mortgage payments are only part of the ownership cost. A complete picture includes:
        </p>
        <ul>
          <li><strong>Mortgage interest</strong> — not the full repayment, just the interest component (principal repayment builds equity)</li>
          <li><strong>Property taxes / council tax</strong> — typically 0.5–1.5% of property value annually depending on country</li>
          <li><strong>Maintenance and repairs</strong> — a common rule of thumb is 1% of property value per year, though this varies significantly</li>
          <li><strong>Buildings insurance</strong></li>
          <li><strong>Transaction costs</strong> — stamp duty / transfer tax, legal fees, surveys (typically 3–5% of purchase price)</li>
          <li><strong>Opportunity cost of deposit</strong> — the return foregone by not investing the down payment elsewhere</li>
        </ul>

        <div className="example-block">
          <div className="example-label">Annual ownership costs — £300,000 property, 10% deposit, 4.5% mortgage</div>
          <div className="example-row"><span>Mortgage interest (yr 1)</span><span>~£12,150</span></div>
          <div className="example-row"><span>Property tax / council tax</span><span>~£2,000</span></div>
          <div className="example-row"><span>Maintenance (1% p.a.)</span><span>£3,000</span></div>
          <div className="example-row"><span>Insurance</span><span>~£500</span></div>
          <div className="example-row"><span>Total annual cost of ownership</span><span>~£17,650</span></div>
        </div>

        <h2>The Opportunity Cost of the Deposit</h2>
        <p>
          A £30,000 deposit invested in a diversified equity index fund at an average 7% annual return would grow to approximately £59,000 after 10 years. This is the opportunity cost of using that money for a down payment. Most rent vs buy analyses ignore this entirely, which artificially favours buying.
        </p>
        <p>
          The fair comparison credits the renter with this investment return on the equivalent of the deposit — and on any monthly saving between rent and ownership cost.
        </p>

        <h2>What Buying Gives You That Renting Doesn't</h2>
        <p>
          The primary financial advantage of buying is <strong>equity accumulation</strong> — each mortgage repayment increases your ownership stake, and any property price appreciation is captured entirely by you (rather than your landlord). Over long periods, in areas with genuine supply constraints, this has historically been significant.
        </p>

        <div className="key-point">
          The break-even point is the number of years at which the total financial position of buying exceeds renting. This is typically 5–10 years in most markets, depending on property appreciation, rent inflation, and how the deposit could otherwise be invested.
        </div>

        <h2>The Break-Even Calculation</h2>
        <p>
          The break-even year is when:
        </p>
        <div className="formula-block">
          <div className="formula-label">Break-even Condition</div>
          Buyer net worth (equity − outstanding costs) &gt; Renter net worth (investments + savings from lower monthly cost)<br /><br />
          Net worth each year:<br />
          Buyer = Property value × appreciation^year − Outstanding mortgage − Cumulative costs<br />
          Renter = Deposit × investment_return^year + Σ(monthly savings × growth)
        </div>

        <h2>What Makes Renting Win Financially</h2>
        <ul>
          <li>High transaction costs (stamp duty, legal) that take years to recoup</li>
          <li>Flat or declining property prices</li>
          <li>High mortgage rates relative to rental yields</li>
          <li>High property maintenance costs</li>
          <li>Strong investment returns available on the deposit capital</li>
          <li>Short time horizons (below the break-even period)</li>
        </ul>

        <h2>What Makes Buying Win Financially</h2>
        <ul>
          <li>Sustained property price appreciation</li>
          <li>Rent inflation that outpaces mortgage payment growth</li>
          <li>Long ownership periods (10+ years)</li>
          <li>Low mortgage rates relative to alternative investment returns</li>
          <li>Tax advantages (mortgage interest deductions, capital gains exemptions on primary residence)</li>
        </ul>

        <div className="warning-point">
          There is no universal answer to whether renting or buying is "better" — it depends on the specific property, local market, time horizon, alternative investment returns, and personal circumstances. The calculator models the numbers; the decision requires context a calculator cannot provide.
        </div>

        <h2>What This Calculator Models</h2>
        <p>
          The Plain Figures Rent vs Buy calculator tracks annual net worth for both paths: the buyer's equity minus cumulative ownership costs, versus the renter's investment portfolio built from the deposit and monthly savings. It identifies the break-even year and shows the gap at any chosen comparison point.
        </p>

        <h2>What-If Scenarios</h2>

        <h3>What if property prices rise 3% per year vs stay flat?</h3>
        <p>
          On a £300,000 property with a £270,000 mortgage (10% deposit), 4.5% rate over 25 years:
        </p>
        <table>
          <thead>
            <tr><th>Scenario</th><th>Buyer net worth at year 10</th><th>Renter net worth at year 10</th><th>Winner</th></tr>
          </thead>
          <tbody>
            <tr><td>Property +3%/yr, deposit invested at 7%</td><td>~£186,000</td><td>~£97,000</td><td>Buyer by £89k</td></tr>
            <tr><td>Property flat, deposit invested at 7%</td><td>~£94,000</td><td>~£97,000</td><td>Renter by £3k</td></tr>
            <tr><td>Property −1%/yr, deposit invested at 7%</td><td>~£48,000</td><td>~£97,000</td><td>Renter by £49k</td></tr>
          </tbody>
        </table>
        <p>
          Property appreciation is the dominant variable. In a flat or declining market, the renter who invests the deposit and monthly savings can match or exceed the buyer's net worth within 10 years. In an appreciating market, buying wins significantly — but the outcome depends on assumptions neither party can control.
        </p>

        <h3>What if transaction costs are high — stamp duty + legal + survey?</h3>
        <p>
          On a £300,000 purchase in the UK, transaction costs are approximately £8,000–£12,000 (SDLT at 2.5–5%, legal fees ~£1,500–£2,000, survey £500–£1,500). These costs must be recouped through equity build-up before buying becomes financially advantageous. At 3% annual appreciation, a £10,000 transaction cost adds approximately 1–1.5 years to the break-even point.
        </p>

        <h2>Frequently Asked Questions</h2>

        <h3>Is renting "dead money"?</h3>
        <p>
          No — and the phrase is misleading. Rent pays for housing — a real service. Mortgage interest also pays for housing; the principal component builds equity, but interest is also "gone." The fair comparison is between the total cost of each option, not between "rent paid to landlord" and "equity built." Transaction costs, maintenance, insurance, and opportunity cost of the deposit are all costs of ownership that have no renting equivalent.
        </p>

        <h3>What is the typical break-even point for buying vs renting?</h3>
        <p>
          In most UK markets, the break-even point — the year at which buying overtakes renting in net worth terms — is typically 6–12 years under moderate assumptions (3% property appreciation, 5–6% investment return on deposit). High transaction costs, slow price growth, or strong investment returns push this out. In high-appreciation urban markets it can be as short as 3–5 years.
        </p>

        <h3>Should I include principal repayment in the cost of buying?</h3>
        <p>
          No — principal repayment is not a cost. It converts cash into equity, which has value. The true ownership cost is mortgage interest (not the full repayment), plus maintenance, tax, insurance, and transaction costs. Including principal repayment as a "cost" inflates the apparent expense of buying relative to renting.
        </p>

        <h3>How does rent inflation affect the comparison?</h3>
        <p>
          Rent typically rises with inflation and local market conditions. A mortgage payment on a fixed-rate product stays constant (in nominal terms) for the fixed period. As rent rises above the mortgage payment over time, the renter's ongoing costs increase while the buyer's stay flat — this is a significant long-run advantage for buying in inflationary environments, and one that simple one-period comparisons miss entirely.
        </p>
      </div>
    </GuideLayout>
  );
}
