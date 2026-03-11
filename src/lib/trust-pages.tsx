import Link from 'next/link';

export interface TrustPageDefinition {
  title: string;
  description: string;
  eyebrow: string;
  sections: Array<{
    heading: string;
    paragraphs: string[];
    bullets?: string[];
  }>;
  relatedLinks?: Array<{ href: string; label: string }>;
}

export const TRUST_PAGES: Record<string, TrustPageDefinition> = {
  methodology: {
    title: 'Plain Figures Methodology',
    description: 'How Plain Figures chooses formulas, structures assumptions, and distinguishes worked examples from real-world decisions.',
    eyebrow: 'Methodology',
    sections: [
      {
        heading: 'How we build pages',
        paragraphs: [
          'Plain Figures is designed around formula-first content. Each calculator page and supporting guide starts with the calculation itself and only then explains how to interpret the output.',
          'That means the site prefers explicit assumptions over broad advice. When a page uses a worked example, the example is there to make the arithmetic inspectable, not to stand in for a personal recommendation.',
        ],
      },
      {
        heading: 'What we include and what we do not',
        paragraphs: [
          'We include formulas, definitions, scenario assumptions, and practical caveats that affect interpretation. We do not recommend products, wrappers, portfolios, or personal actions on the basis of a generic page.',
          'This boundary matters because finance pages can look more precise than they are. A clean methodology makes it clearer where the maths ends and where user judgment, adviser input, or policy wording begins.',
        ],
        bullets: [
          'Formula-led explanations',
          'Assumption visibility',
          'Scenario comparison rather than prediction',
          'No product recommendations inside the calculators',
        ],
      },
      {
        heading: 'How to use the site correctly',
        paragraphs: [
          'The strongest use of Plain Figures is comparison. Run a baseline case, then rerun a conservative case and a more aggressive case. If the answer is stable across those scenarios, your inputs are probably directionally robust.',
          'If the result changes sharply, the page has still done its job: it has shown which assumption is carrying the answer.',
        ],
      },
    ],
    relatedLinks: [
      { href: '/formula-library', label: 'Formula Library' },
      { href: '/data-sources', label: 'Data Sources' },
      { href: '/editorial-policy', label: 'Editorial Policy' },
    ],
  },
  'formula-library': {
    title: 'Formula Library',
    description: 'A compact index of the core formulas that appear across calculators and learning pages on Plain Figures.',
    eyebrow: 'Formula Library',
    sections: [
      {
        heading: 'Why this page exists',
        paragraphs: [
          'Formula-first sites become easier to trust when the core identities are collected in one place. This page is a plain-language reference layer for readers who want the underlying structure without opening multiple guides.',
          'It also helps clarify that many calculators differ less in their arithmetic than in their assumptions, constraints, and interpretation rules.',
        ],
      },
      {
        heading: 'Core formulas covered on Plain Figures',
        paragraphs: [
          'The main recurring formulas include amortisation for loans and mortgages, future value for compounding and savings goals, present value for protection and valuation framing, gross-to-net deduction structures, and expected-loss aggregation for risk models.',
          'Where a calculator uses a simplified model, we say so. Where a page uses a benchmark convention rather than a legal or regulatory definition, we say that too.',
        ],
        bullets: [
          'Amortisation: level-payment loans and mortgages',
          'Future value: savings, investing, and retirement projections',
          'Present value: protection and replacement-value framing',
          'Expected loss: probability x severity scenario work',
        ],
      },
    ],
    relatedLinks: [
      { href: '/methodology', label: 'Methodology' },
      { href: '/learn', label: 'Learning Centre' },
    ],
  },
  'data-sources': {
    title: 'Data Sources',
    description: 'What Plain Figures uses for rates, tax thresholds, benchmark labels, and worked examples, and how to think about the limits of that source layer.',
    eyebrow: 'Data Sources',
    sections: [
      {
        heading: 'What our source layer is for',
        paragraphs: [
          'Plain Figures uses source material to anchor formulas, tax bands, benchmark rates, and terminology. The purpose of the source layer is not to outsource judgment. It is to make the assumptions traceable.',
          'Some pages depend mainly on stable mathematics. Others depend on thresholds, annual tax treatment, or changing market context. Those pages need more active review.',
        ],
      },
      {
        heading: 'How we treat source volatility',
        paragraphs: [
          'When a page depends on a changeable input such as tax thresholds or current-rate framing, we aim to state the time context clearly. Users should still verify live policy, lender, market, or payroll details before acting.',
          'This matters most on salary, tax, and high-stakes borrowing pages where even small updates can change the practical output.',
        ],
        bullets: [
          'Formula sources for the mathematical core',
          'Threshold and tax-year sources for salary and tax pages',
          'Benchmark-rate context for selected worked examples',
          'Explicit date context when a number is time-sensitive',
        ],
      },
    ],
    relatedLinks: [
      { href: '/how-we-update-tax-rates', label: 'How We Update Tax Rates' },
      { href: '/methodology', label: 'Methodology' },
    ],
  },
  'how-we-update-tax-rates': {
    title: 'How We Update Tax Rates',
    description: 'How Plain Figures handles tax-year changes, payroll assumptions, and rate refreshes on pages that depend on current thresholds.',
    eyebrow: 'Tax Updates',
    sections: [
      {
        heading: 'Why tax pages need a stricter update process',
        paragraphs: [
          'Tax pages can become misleading faster than formula pages because thresholds, bands, and payroll assumptions can change on a published schedule or after budget announcements.',
          'For that reason, tax-sensitive pages should always be read alongside the tax year and jurisdiction they are using.',
        ],
      },
      {
        heading: 'What we aim to refresh',
        paragraphs: [
          'When a page depends on current thresholds, we update the page metadata, labels, and any example framing that would otherwise suggest an outdated year or deduction structure.',
          'Users should still verify current payroll specifics, tax code treatment, and jurisdiction-specific variations before relying on any worked example.',
        ],
        bullets: [
          'Tax-year labels and page metadata',
          'Thresholds and contribution assumptions where applicable',
          'Worked examples that would otherwise imply outdated treatment',
        ],
      },
    ],
    relatedLinks: [
      { href: '/data-sources', label: 'Data Sources' },
      { href: '/editorial-policy', label: 'Editorial Policy' },
    ],
  },
  'editorial-policy': {
    title: 'Editorial Policy',
    description: 'The publishing standard Plain Figures uses for calculator pages, learning content, example pages, and trust/support documents.',
    eyebrow: 'Editorial Policy',
    sections: [
      {
        heading: 'What we optimise for',
        paragraphs: [
          'Plain Figures optimises for clarity, auditability, and narrow alignment between the query and the page. We would rather publish a smaller number of explicit pages than a larger number of vague finance articles.',
          'That means pages are expected to state assumptions, avoid product promotion inside the calculation layer, and remain clear about whether they are using examples or changeable thresholds.',
        ],
      },
      {
        heading: 'What we avoid',
        paragraphs: [
          'We avoid making pages sound more personalised than they are. We also avoid treating a worked example as if it were a universal answer, especially on borrowing, tax, and protection topics.',
          'That discipline matters because the most useful finance content is often the content that is clearest about its own limits.',
        ],
        bullets: [
          'No disguised product recommendations',
          'No pretending a benchmark is a guarantee',
          'No broad advice where the page only supports arithmetic',
          'No unexplained assumption shifts between title, copy, and calculator',
        ],
      },
    ],
    relatedLinks: [
      { href: '/methodology', label: 'Methodology' },
      { href: '/authors-and-review', label: 'Authors and Review' },
    ],
  },
  'authors-and-review': {
    title: 'Authors and Review',
    description: 'How Plain Figures attributes responsibility for pages and how review is framed across formula content, trust pages, and updated threshold-sensitive material.',
    eyebrow: 'Authors and Review',
    sections: [
      {
        heading: 'How attribution works',
        paragraphs: [
          'Plain Figures uses organisational authorship for the site-level calculation and editorial standard. Where a page is especially sensitive to changing thresholds or narrow interpretation, it should be reviewed against the current source layer before major updates are published.',
          'This is not intended to make every page sound more formal than it is. It is intended to make responsibility visible.',
        ],
      },
      {
        heading: 'What review means on this site',
        paragraphs: [
          'Review on Plain Figures is primarily about assumption quality, metadata accuracy, and whether the page still says exactly what the maths supports. It is not about inflating page count with low-signal copy.',
          'Readers should still treat the content as general information and verify current thresholds, live rates, and personal circumstances before acting.',
        ],
      },
    ],
    relatedLinks: [
      { href: '/editorial-policy', label: 'Editorial Policy' },
      { href: '/methodology', label: 'Methodology' },
    ],
  },
};

export function renderTrustLinks(links?: Array<{ href: string; label: string }>) {
  if (!links?.length) return null;

  return (
    <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.85rem' }}>
        Related
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
        {links.map((link) => (
          <Link key={link.href} href={link.href} style={{ textDecoration: 'none' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 0.7rem', border: '1px solid var(--border)', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
              {link.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
