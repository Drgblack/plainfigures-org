import type { Metadata } from 'next';
import GuideLayout from '@/components/learn/GuideLayout';

export const metadata: Metadata = {
  title: 'Inheritance Tax: Thresholds, Nil-Rate Band, and Taper Relief Explained',
  description: 'Understand how UK inheritance tax is calculated. Covers the nil-rate band, residence nil-rate band, taper relief on gifts, and 2025/26 IHT rates.',
};

export default function Guide() {
  return (
    <GuideLayout
      number="G38"
      title="Inheritance Tax: Nil-Rate Band, Taper Relief, and How It's Calculated"
      readTime="7 min"
      keywords={['inheritance tax calculator UK 2025', 'inheritance tax nil rate band 2025', 'IHT taper relief explained', 'how to reduce inheritance tax UK', 'residence nil rate band 2025']}
    >
      <p>
        Inheritance tax (IHT) is charged at 40% on the value of a deceased person's estate above their
        available nil-rate band. Despite affecting fewer than 4% of estates, IHT generates significant
        concern because of house price growth and frozen thresholds. Understanding the calculation
        reveals both the liability and the legitimate planning available.
      </p>

      <h2>The Nil-Rate Band</h2>
      <table>
        <thead><tr><th>Allowance</th><th>Amount</th><th>Conditions</th></tr></thead>
        <tbody>
          <tr><td>Standard nil-rate band (NRB)</td><td>£325,000</td><td>Everyone; frozen until April 2030</td></tr>
          <tr><td>Residence nil-rate band (RNRB)</td><td>£175,000</td><td>Passing main home to direct descendants</td></tr>
          <tr><td>Spouse/civil partner transferable NRB</td><td>Up to £325,000</td><td>If deceased spouse's NRB unused</td></tr>
          <tr><td>Spouse/civil partner transferable RNRB</td><td>Up to £175,000</td><td>If unused on first death</td></tr>
          <tr><td><strong>Maximum combined (married couple)</strong></td><td><strong>£1,000,000</strong></td><td>Both NRBs + both RNRBs</td></tr>
        </tbody>
      </table>

      <h2>The Basic Calculation</h2>
      <pre className="formula-block">{
`IHT = (Net Estate − Available Nil-Rate Bands) × 40%

Net Estate = Assets − Liabilities (mortgages, debts, funeral costs)

Example: Single person, no property passing to children
Estate: £700,000 − Mortgage: £80,000 = Net estate: £620,000
NRB: £325,000
Taxable: £620,000 − £325,000 = £295,000
IHT: £295,000 × 40% = £118,000`
      }</pre>

      <h2>Taper Relief on Gifts</h2>
      <p>
        Gifts made within 7 years of death are included in the estate (potentially exempt transfers).
        Taper relief reduces the IHT on those gifts if made more than 3 years before death.
      </p>
      <table>
        <thead><tr><th>Years Before Death</th><th>IHT Rate on Gift</th></tr></thead>
        <tbody>
          <tr><td>0–3 years</td><td>40%</td></tr>
          <tr><td>3–4 years</td><td>32%</td></tr>
          <tr><td>4–5 years</td><td>24%</td></tr>
          <tr><td>5–6 years</td><td>16%</td></tr>
          <tr><td>6–7 years</td><td>8%</td></tr>
          <tr><td>7+ years</td><td>0% (fully exempt)</td></tr>
        </tbody>
      </table>

      <h2>What-If Scenarios</h2>

      <h3>Scenario 1: Married couple, family home</h3>
      <p>
        Combined estate £950,000 (including £400,000 home). Second death, home passes to adult children.
        Available allowances: £325,000 + £325,000 (transferred) + £175,000 + £175,000 (transferred RNRB) = £1,000,000.
        Taxable estate: £0. IHT: £0.
      </p>

      <h3>Scenario 2: Single person, estate £800,000, no property to children</h3>
      <p>
        Available: NRB £325,000 only (no RNRB — no qualifying property).
        Taxable: £475,000. IHT: <strong>£190,000</strong>.
      </p>

      <h3>Scenario 3: Impact of a £100,000 gift made 4.5 years before death</h3>
      <p>
        Gift £100,000, made 4.5 years before death. Taper relief: 24% rate (not 40%).
        IHT on gift: £24,000 (if NRB already used by rest of estate) — saving £16,000 vs dying
        before 3-year mark.
      </p>

      <h2>Frequently Asked Questions</h2>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "What is the inheritance tax threshold in the UK for 2025?",
            "acceptedAnswer": { "@type": "Answer", "text": "The standard nil-rate band is £325,000 (frozen until April 2030). With the residence nil-rate band (£175,000), a single person passing their home to direct descendants can leave up to £500,000 tax-free. A married couple can pass up to £1,000,000 combined." }},
          { "@type": "Question", "name": "How does taper relief reduce inheritance tax on gifts?",
            "acceptedAnswer": { "@type": "Answer", "text": "Gifts made 3–7 years before death receive taper relief: gifts made 3–4 years before attract 32% IHT instead of 40%. Gifts 5–6 years before attract 16%, and gifts 7+ years before are fully exempt." }},
          { "@type": "Question", "name": "Do you pay inheritance tax on money left to a spouse?",
            "acceptedAnswer": { "@type": "Answer", "text": "No. Assets passed between married couples and civil partners are fully exempt from inheritance tax, regardless of value. The unused nil-rate band also transfers to the surviving spouse." }}
        ]
      })}} />

      <p className="tool-link">→ <a href="/savings">Model estate growth over time with the Savings Calculator</a></p>
      <p className="disclaimer">Indicative only. IHT is complex and individual circumstances vary significantly. Consult a solicitor or regulated financial adviser for estate planning.</p>
    </GuideLayout>
  );
}
