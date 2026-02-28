import type { Metadata } from 'next';
import GuideLayout from '@/components/learn/GuideLayout';

export const metadata: Metadata = {
  title: 'Capital Gains Tax: How the Calculation Works (2025/26)',
  description: 'Understand how UK capital gains tax is calculated on shares, property, and other assets. Covers CGT rates, annual exempt amount, and reporting requirements for 2025/26.',
};

export default function Guide() {
  return (
    <GuideLayout
      number="G33"
      title="Capital Gains Tax: How the Calculation Works (2025/26)"
      readTime="7 min"
      keywords={['capital gains tax calculator UK 2025', 'how is capital gains tax calculated', 'CGT rates 2025 2026', 'capital gains tax on property UK', 'annual CGT allowance 2025']}
    >
      <p>
        Capital Gains Tax (CGT) applies when you dispose of an asset for more than you paid for it.
        "Dispose" includes selling, gifting, or transferring. The tax applies to the gain, not the
        total proceeds — and the rate depends on the type of asset and your income tax band.
      </p>

      <h2>The Core Calculation</h2>
      <pre className="formula-block">{
`Taxable Gain = Sale Proceeds − (Acquisition Cost + Allowable Costs)

Allowable Costs include:
- Purchase price + stamp duty paid at purchase
- Legal and agent fees at purchase and sale
- Improvement costs (not maintenance)
- Capital Losses from other disposals in same year`
      }</pre>

      <h2>CGT Rates 2025/26</h2>
      <table>
        <thead><tr><th>Asset Type</th><th>Basic Rate Taxpayer</th><th>Higher/Additional Rate Taxpayer</th></tr></thead>
        <tbody>
          <tr><td>Shares, funds, investments</td><td>18%</td><td>24%</td></tr>
          <tr><td>Residential property</td><td>18%</td><td>24%</td></tr>
          <tr><td>Business assets (BADR)</td><td>10%</td><td>14% (rising to 18% from April 2026)</td></tr>
          <tr><td>Other assets</td><td>18%</td><td>24%</td></tr>
        </tbody>
      </table>
      <p>Note: CGT rates were changed in October 2024 Budget. Residential property rates aligned with other assets from April 2025.</p>

      <h2>Annual Exempt Amount</h2>
      <p>
        Each individual has an annual CGT exemption: <strong>£3,000 for 2025/26</strong>.
        Gains below this threshold are tax-free. This cannot be carried forward if unused.
        Married couples and civil partners each have their own exemption (£6,000 combined).
      </p>

      <h2>What-If Scenarios</h2>

      <h3>Scenario 1: Share sale, basic rate taxpayer</h3>
      <p>Bought shares for £12,000 in 2019, sold for £28,000 in 2025</p>
      <table>
        <thead><tr><th>Item</th><th>Amount</th></tr></thead>
        <tbody>
          <tr><td>Gain</td><td>£16,000</td></tr>
          <tr><td>Annual exemption</td><td>−£3,000</td></tr>
          <tr><td>Taxable gain</td><td>£13,000</td></tr>
          <tr><td>CGT at 18%</td><td><strong>£2,340</strong></td></tr>
        </tbody>
      </table>

      <h3>Scenario 2: Second property sale, higher rate taxpayer</h3>
      <p>Bought BTL property for £180,000 (2015) + £5,000 costs, sold for £310,000 + £8,000 selling costs</p>
      <table>
        <thead><tr><th>Item</th><th>Amount</th></tr></thead>
        <tbody>
          <tr><td>Net proceeds</td><td>£302,000</td></tr>
          <tr><td>Acquisition + costs</td><td>−£185,000</td></tr>
          <tr><td>Gross gain</td><td>£117,000</td></tr>
          <tr><td>Annual exemption</td><td>−£3,000</td></tr>
          <tr><td>Taxable gain</td><td>£114,000</td></tr>
          <tr><td>CGT at 24%</td><td><strong>£27,360</strong></td></tr>
        </tbody>
      </table>

      <h3>Scenario 3: Bed-and-ISA tax planning</h3>
      <p>
        Selling investments and immediately repurchasing within a Stocks & Shares ISA "crystallises" a gain
        within your annual exemption, sheltering future growth from CGT permanently. On £3,000 of gains
        per year, this saves up to £720/year for a higher rate taxpayer.
      </p>

      <h2>Reporting Requirements</h2>
      <p>
        From April 2020, UK residents must report and pay CGT on residential property within
        60 days of completion. Other assets are reported via Self Assessment by 31 January.
        You must report even if no tax is due, if total proceeds exceed 4× the annual exemption (£12,000).
      </p>

      <h2>Frequently Asked Questions</h2>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "What is the capital gains tax allowance for 2025/26?",
            "acceptedAnswer": { "@type": "Answer", "text": "The annual CGT exempt amount for 2025/26 is £3,000 per individual. Gains below this threshold are tax-free." }},
          { "@type": "Question", "name": "What are the capital gains tax rates in the UK for 2025?",
            "acceptedAnswer": { "@type": "Answer", "text": "From April 2025, CGT rates are 18% for basic rate taxpayers and 24% for higher or additional rate taxpayers, applying to shares, property, and most other assets. Business assets qualifying for Business Asset Disposal Relief are taxed at 10% (rising to 14% from April 2026)." }},
          { "@type": "Question", "name": "Do I pay CGT on my main home?",
            "acceptedAnswer": { "@type": "Answer", "text": "No. Your main residence is exempt from CGT under Private Residence Relief, provided you have lived there throughout ownership. Partial relief applies if you let it or used it for business." }},
          { "@type": "Question", "name": "How quickly must I pay CGT on a property sale?",
            "acceptedAnswer": { "@type": "Answer", "text": "UK residents must report and pay CGT on residential property sales within 60 days of completion. This is done through HMRC's online CGT service, separate from Self Assessment." }}
        ]
      })}} />

      <p className="tool-link">→ <a href="/savings">Model long-term investment growth with the Savings Calculator</a></p>
      <p className="disclaimer">Indicative only. Tax rules change. This guide reflects 2025/26 rates. Consult a qualified tax adviser for personal CGT calculations and planning.</p>
    </GuideLayout>
  );
}
