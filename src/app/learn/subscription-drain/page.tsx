import type { Metadata } from 'next';
import GuideLayout from '@/components/layout/GuideLayout';

export const metadata: Metadata = {
  title: 'Subscription Drain: The True Long-Term Cost — Plain Figures Learning Centre',
  description: 'How to calculate the real multi-year cost of recurring subscriptions — including annual price increases and the opportunity cost of investing the same amount instead.',
};

export default function SubscriptionDrainGuide() {
  return (
    <GuideLayout
      title="Subscription Drain: The True Long-Term Cost"
      description="How recurring monthly subscriptions accumulate into significant long-term sums — and what the same money would produce if redirected elsewhere."
      readTime="4 min"
      relatedCalc={{ href: '/subscriptions', label: 'Subscription Cost Calculator' }}
      relatedGuides={[
        { href: '/learn/lifestyle-inflation', label: 'Lifestyle Inflation: Real Cost Over Time' },
        { href: '/learn/compound-interest', label: 'Understanding Compound Interest' },
        { href: '/learn/save-for-goal', label: 'Save for a Goal: Time & Amount Basics' },
      ]}
    >
      <div className="guide-content">
        <h2>Why Monthly Pricing Obscures the Real Cost</h2>
        <p>
          Subscription services are priced and marketed on a per-month basis. The monthly figure is typically small enough to clear a mental threshold easily. The multi-year total is rarely presented — and the opportunity cost of that spending almost never is. This guide provides the calculation framework to make those totals visible.
        </p>

        <h2>Basic Multi-Year Cost Calculation</h2>

        <div className="formula-block">
          <div className="formula-label">Total Cost — Fixed Monthly Price</div>
          Total = M × 12 × t<br /><br />
          Where:<br />
          M = monthly cost<br />
          t = years
        </div>

        <div className="example-block">
          <div className="example-label">Common UK subscriptions — 5 and 10-year totals at 2026 prices</div>
          <div className="example-row"><span>Streaming video (~£10.99/mo)</span><span>5yr: £659 · 10yr: £1,319</span></div>
          <div className="example-row"><span>Music streaming (~£10.99/mo)</span><span>5yr: £659 · 10yr: £1,319</span></div>
          <div className="example-row"><span>Cloud storage (~£2.99/mo)</span><span>5yr: £179 · 10yr: £359</span></div>
          <div className="example-row"><span>News / media (~£14.99/mo)</span><span>5yr: £899 · 10yr: £1,799</span></div>
          <div className="example-row"><span>Gym or fitness app (~£45/mo)</span><span>5yr: £2,700 · 10yr: £5,400</span></div>
          <div className="example-row"><span>Total (all five)</span><span>5yr: £5,096 · 10yr: £10,196</span></div>
        </div>

        <h2>With Annual Price Increases</h2>
        <p>
          Most subscription services increase prices annually. If the monthly price rises by a percentage <strong>i</strong> each year, the total cost over <strong>t</strong> years is:
        </p>

        <div className="formula-block">
          <div className="formula-label">Total Cost — With Annual Price Increases</div>
          Total = M × 12 × Σ(1+i)^y   for y = 0 to t−1<br /><br />
          Simplified for constant growth rate i:<br />
          Total = M × 12 × [(1+i)^t − 1] / i<br /><br />
          Example: £10.99/month, 5% annual increase, 10 years:<br />
          Total ≈ £1,659   (vs £1,319 at fixed price)
        </div>

        <table>
          <thead>
            <tr><th>Annual price increase</th><th>£10.99/mo over 5 years</th><th>£10.99/mo over 10 years</th></tr>
          </thead>
          <tbody>
            <tr><td>0% (fixed)</td><td>£659</td><td>£1,319</td></tr>
            <tr><td>3% per year</td><td>£704</td><td>£1,497</td></tr>
            <tr><td>5% per year</td><td>£731</td><td>£1,659</td></tr>
            <tr><td>8% per year</td><td>£772</td><td>£1,900</td></tr>
          </tbody>
        </table>

        <h2>Opportunity Cost — Investing Instead</h2>
        <p>
          Opportunity cost is the return foregone by spending rather than saving or investing. This is not a recommendation to cancel subscriptions — it is a calculation of what the same money would produce if redirected.
        </p>

        <div className="formula-block">
          <div className="formula-label">Future Value of Monthly Amount if Invested</div>
          FV = M × [(1+r)^n − 1] / r<br /><br />
          Where:<br />
          M = monthly amount<br />
          r = monthly investment return (annual rate ÷ 12)<br />
          n = months
        </div>

        <div className="example-block">
          <div className="example-label">£84.96/month (combined subscriptions above) invested at 6% per year — 10 years</div>
          <div className="example-row"><span>Monthly amount</span><span>£84.96</span></div>
          <div className="example-row"><span>Annual return assumption</span><span>6%</span></div>
          <div className="example-row"><span>Future value after 10 years</span><span>~£13,900</span></div>
          <div className="example-row"><span>Total subscriptions paid</span><span>£10,196</span></div>
          <div className="example-row"><span>Opportunity cost (difference)</span><span>~£3,700</span></div>
        </div>

        <div className="key-point">
          The future value figure is not a guaranteed return — it uses a fixed assumed investment return for illustration. Actual investment returns vary and may be higher or lower. Tax on investment gains is not modelled.
        </div>

        <h2>Annual vs Monthly Billing</h2>
        <p>
          Most services offer a discount for annual billing — typically 15–20% versus the equivalent monthly price. The calculation is straightforward: if a monthly subscription costs £10.99 and the annual equivalent is £8.99/month (£107.88/year vs £131.88/year), the annual billing saves £24/year. The trade-off is reduced flexibility — you pay for a full year upfront.
        </p>

        <h2>The Accumulation Effect</h2>
        <p>
          Individual subscriptions often feel negligible. The financial significance emerges when all active subscriptions are totalled. A useful exercise is listing every active subscription — including those billed annually, quarterly, or per-use — and calculating the monthly and annual equivalent of each. The total frequently surprises.
        </p>

        <div className="warning-point">
          Free trials that convert to paid subscriptions automatically are the most common source of forgotten subscriptions. Payment data from bank statements is more reliable than memory for identifying all active subscriptions.
        </div>

        <h2>What-If: Cancel Half Your Subscriptions</h2>
        <p>
          Using the five-subscription example above (£84.96/month total): cancelling the two least-used (music streaming + news, ~£26/month) and redirecting that £26/month to a savings account at 4.5% AER produces approximately £3,230 after 10 years — vs £3,116 paid if kept. The opportunity gap is modest at this scale, but the pattern compounds across multiple cancellations over time.
        </p>

        <h2>Frequently Asked Questions</h2>

        <h3>What is the fastest way to find all my active subscriptions?</h3>
        <p>
          Bank and credit card statements are more reliable than memory. Search for recurring transactions — particularly those with 28–31 day intervals. Annual billing cycles (often ending in -99) are easy to miss. Some banking apps categorise recurring payments automatically. A dedicated review every 6 months typically surfaces 1–3 forgotten subscriptions.
        </p>

        <h3>Do annual subscriptions work out cheaper than monthly?</h3>
        <p>
          Typically yes — most services offer 15–20% discount for annual billing. The trade-off is reduced flexibility (you've committed for 12 months) and the upfront cash outlay. For services you use consistently, annual billing is usually the lower-cost option. For services you use variably, monthly billing preserves the option to cancel without loss.
        </p>

        <h3>How do price increases affect long-term subscription costs?</h3>
        <p>
          Most major subscription services have increased prices by 3–8% annually in recent years. A subscription costing £10/month today at 5% annual increases costs £16.29/month in 10 years and a total of £1,509 over that period — vs £1,200 at fixed pricing, a 26% difference. Long-term projections should always include a price increase assumption.
        </p>

        <h3>What is the opportunity cost of subscriptions vs investing?</h3>
        <p>
          The future value formula (FV = M × [(1+r)^n − 1] / r) quantifies this: £85/month invested at 6% for 10 years produces approximately £13,900. This is the hypothetical future value foregone — not a guaranteed return on investing, as investment returns are variable. It provides a framework for comparing the long-term financial weight of recurring costs.
        </p>
      </div>
    </GuideLayout>
  );
}
