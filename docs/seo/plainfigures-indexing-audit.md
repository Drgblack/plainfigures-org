# Plain Figures Indexing Audit

Last updated: March 12, 2026

## Current indexing posture

Plain Figures is technically discoverable, but Google Search Console signals point to crawl prioritisation rather than sitemap parsing as the main constraint. The site now treats sitemap inclusion as an editorial signal rather than a dump of every generated URL.

The main redirect-pattern risk identified in the audit was historical origin drift between `https://plainfigures.org` and `https://www.plainfigures.org`. Canonicals, metadata, JSON-LD, robots, and sitemap output should all use the `www` origin only. Legacy redirect aliases in [`next.config.ts`](/c:/Users/User/Projects/plainfigures-org/next.config.ts) remain for external links, but must never appear in sitemap output, internal links, or canonical targets.

## Route inventory

| Route pattern | Intended status | Intended index state | Canonical target | Sitemap inclusion | Internal linking depth / source | Notes / risk |
|---|---:|---|---|---|---|---|
| `/` | 200 | Index | Self | Yes, static sitemap | Depth 0 | Primary entry point. Links to category hubs, guides, and calculators. |
| `/calculators` | 200 | Index | Self | Yes, static sitemap | Depth 1 from home | Main calculator directory. Should stay strong and curated, not a thin list. |
| `/mortgage-calculators`, `/savings-calculators`, `/investing-calculators`, `/retirement-calculators` | 200 | Index | Self | Yes, static sitemap | Depth 1 from home and `/calculators` | Primary category hubs for high-priority calculator clusters. |
| Supporting cluster hubs such as `/overpayment-and-offset`, `/savings-and-compound-interest`, `/income-tax-and-borrowing`, `/risk-management-and-coverage` | 200 | Index | Self | Yes, static sitemap | Depth 1-2 from home, `/calculators`, calculators, and `/learn` | Useful organisers. Should stay descriptive and non-duplicative. |
| Core calculator pages such as `/mortgage`, `/savings`, `/compound`, `/retirement`, `/loan`, `/take-home`, `/affordability`, `/offset`, `/overpayment` | 200 | Index | Self | Yes, static sitemap | Depth 1 from home and category hubs | Main money pages. Breadcrumbs should include parent category hub where appropriate. |
| Professional calculator pages such as `/bi`, `/cyber`, `/tcor`, `/coverage-gap`, `/scr` | 200 | Index | Self | Yes, static sitemap | Depth 1-2 from home, hubs, and learn clusters | Indexable, but should stay within stronger hub paths to avoid orphan risk. |
| Static guides `/learn/<slug>` | 200 | Index | Self | Yes, static sitemap | Depth 1-2 from `/learn`, hubs, and calculators | Guide pages support calculators. Avoid adding weak standalone articles without a cluster home. |
| Programmatic guide extensions `/learn/<topic>` from `PROGRAMMATIC_LEARN_TOPICS` | 200 | Index | Self | Yes, static sitemap | Depth 2 via `/learn` and tool-support links | Keep only if unique and tied to a calculator or cluster. |
| Programmatic calculator pages `/calculators/[category]/[expression]` | 200 | Index if surfaced | Self | Yes, but only curated high-value subset | Depth 2-3 via calculators, hubs, and examples | Most generated pages remain accessible but are intentionally omitted from sitemap until proven stronger. |
| `/about`, `/methodology`, `/formula-library`, `/data-sources`, `/how-we-update-tax-rates`, `/editorial-policy`, `/authors-and-review` | 200 | Index | Self | Yes, static sitemap | Depth 1-2 from nav, learn hub, and footer | Trust/support pages. Useful for quality signals and should stay crawlable. |
| `/privacy`, `/terms`, `/disclaimer` | 200 | Index | Self | Yes, static sitemap | Footer depth | Public legal pages. Low priority but acceptable in sitemap because canonical and stable. |
| `/contact`, `/cookies`, `/saved` | 200 | Noindex | Self | No | Direct/internal utility links only | Useful to users, low-value as search landers. |
| `/programmatic-report`, `/programmatic-report.json`, `/crawl-audit`, `/seo-opportunities`, `/search-console-report`, `/search-console-report.json` | 200 | Noindex | Self | No | Internal maintenance only | Reporting and internal QA surfaces. |
| `/robots.txt` | 200 | Not a page target | N/A | N/A | Direct | Must reference `/sitemap.xml`, but must not be submitted as a sitemap itself. |
| `/sitemap.xml`, `/sitemaps/static`, `/sitemaps/programmatic/[id]` | 200 | N/A | N/A | N/A | Direct | Machine endpoints only. Must emit canonical, indexable, 200-status URLs. |
| Legacy redirects in `next.config.ts` such as `/professional-tools/pmg/*` and translated slug aliases | 301/308 or 302 | Excluded | Final destination | No | No internal links should point here | Must stay out of sitemap and canonicals. |

## Canonical and origin decisions

- Canonical origin: `https://www.plainfigures.org`
- Self-referencing canonicals are the default for indexable pages.
- No canonical should point to:
  - `https://plainfigures.org/*`
  - redirect aliases
  - noindex routes
  - non-200 routes

## Sitemap policy

The static sitemap should include only:

- public pages
- canonical pages
- 200 pages
- indexable pages
- pages with clear user value

The programmatic sitemap should include only a curated subset of generated pages:

- strongest mortgage pages
- strongest savings and compounding pages
- strongest salary/tax pages
- strongest retirement pages
- strongest geo-specific pages already aligned with existing clusters

The rest of the generated long tail can stay live without being promoted in sitemap files until indexation quality improves.

## Internal linking policy

- Home links to `/calculators` and the strongest category hubs.
- Category hubs link to their core calculators and supporting guides with normal HTML links.
- Important calculator pages show:
  - breadcrumbs
  - parent hub links
  - related calculators
  - related guides
- Guides should link back into the relevant calculators and hubs.

## Main risks still worth monitoring

1. Search Console may still show historical non-`www` or alias URLs for a while after canonical cleanup.
2. Some programmatic pages may remain discoverable outside the sitemap through internal links or old crawl history.
3. Query-parameter language aliases (`?lang=de`) still exist as temporary redirects and should not be treated as canonical content.
4. Large programmatic families will still need performance and quality review if indexation starts to expand again.

## Suggested Search Console follow-up

1. Remove `/robots.txt` from the Sitemaps report if it was submitted manually.
2. Resubmit `/sitemap.xml` after deployment.
3. Inspect `/calculators`, `/mortgage-calculators`, `/savings-calculators`, `/investing-calculators`, and `/retirement-calculators` as priority hubs.
4. Inspect a handful of curated programmatic URLs from the new sitemap subset.
5. Monitor the ratio of indexed pages to submitted sitemap pages before expanding sitemap scope again.
