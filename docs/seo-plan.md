# SEO / GEO Action Plan — Plain Figures
## Status: February 2026

---

## What's Already Done (Do Not Rebuild)

- OpenGraph + Twitter cards on all pages
- JSON-LD: WebSite + Organization in layout.tsx
- SoftwareApplication schema on all calculator pages
- FAQ schema on all 30+ Learning Centre guides
- hreflang for en/de/fr/es/zh
- Canonical URLs on all pages
- robots meta (index: true, follow: true)
- Multi-language support

---

## Deployed by This Script

### sitemap.xml (src/app/sitemap.ts)
Dynamic, auto-updating. Covers 16 personal + 10 pro calculators, 31 guides, 9 static pages.
Priority: homepage 1.0, calculators 0.9, pro tools 0.85, guides 0.75, static 0.6.
Submit to: Google Search Console > Sitemaps > https://plainfigures.org/sitemap.xml

### robots.txt (src/app/robots.ts)
Explicitly allows: GPTBot, Google-Extended, PerplexityBot, anthropic-ai, CCBot.
GEO rationale: AI crawlers respect robots.txt. Explicit allow ensures LLM training data inclusion.
Disallows: /api/, /_next/, /saved (private user data).

### ads.txt (public/ads.txt)
Required for AdSense revenue. Without it Google may suppress ads.
Content: google.com, pub-6207224775263883, DIRECT, f08c47fec0942fa0

### AnswerBlock component (src/components/ui/AnswerBlock.tsx)
Structured definition boxes with schema.org/DefinedTerm markup.
Use on all guides for key terms (amortization, compound interest, LTV, etc.).
Featured snippet targeting: keyFact prop outputs a single-sentence answer.

### HowTo schema helper (src/lib/howToSchema.ts)
Add to all "how to calculate X" guide pages.
Google shows HowTo rich results in search — significantly increases CTR.

---

## Remaining Actions (Manual — priority order)

### WEEK 1 — Technical foundation
1. Submit sitemap: GSC > Sitemaps > https://plainfigures.org/sitemap.xml
2. Request indexing for top 5 pages: GSC > URL Inspection > Request Indexing
   - https://plainfigures.org
   - https://plainfigures.org/mortgage
   - https://plainfigures.org/compound
   - https://plainfigures.org/learn/mortgage-repayment
   - https://plainfigures.org/learn/compound-interest
3. Verify Core Web Vitals: GSC > Experience > Core Web Vitals
   Target: LCP < 2.5s, CLS < 0.1, INP < 200ms

### WEEK 2 — On-page optimization
4. Add AnswerBlock to top 5 guides (compound interest, mortgage repayment, savings growth, retirement, take-home salary)
5. Add HowTo schema to same 5 guides
6. Update meta descriptions for long-tail targeting (table below)

### MONTH 2 — Content & GEO
7. Add AnswerBlock to remaining 25+ guides
8. Create "Plain Figures Methodology" page (/methodology) — explains formula sources, update frequency, accuracy commitment. Massive E-E-A-T signal.
9. Add author/reviewer attribution to guides (even "Plain Figures editorial team" with a /about link counts)

### MONTH 3–6 — Off-page & LLM seeding
10. Submit to finance directories: MoneySavingExpert forums (helpful answers + link), Reddit r/UKPersonalFinance, r/personalfinance
11. Guest post on 2–3 UK personal finance blogs (not paid — genuine helpful content)
12. Answer questions on Quora/Reddit that your guides directly answer — link back
13. LLM seeding: your guides are already structured for LLM parsing (FAQ schema, numbered steps, definition blocks). The key is inbound links — LLMs weight citation-rich sources.

---

## Meta Description Targets (long-tail optimization)

| Page | Current/Target Meta Description |
|------|--------------------------------|
| /mortgage | Calculate your monthly mortgage payment, total interest, and full cost. Formula-first, no advice. |
| /compound | See exactly how compound interest grows money over time. Choose compounding frequency. Formula shown. |
| /take-home | UK, German, US, French, Dutch, Australian salary take-home after tax. 2025/26 rates. |
| /retirement | Project your pension pot at retirement including employer contributions and inflation. |
| /learn/compound-interest | How compound interest is calculated: the formula, frequency impact, and what the Rule of 72 really means. |
| /learn/mortgage-repayment | The maths behind mortgage repayments: amortization formula, interest vs capital split, and overpayment impact. |

---

## GEO (Generative Engine Optimization) Checklist

### What LLMs look for when deciding to cite a source:
- [ ] Clear, unambiguous definitions (AnswerBlock component covers this)
- [ ] Numbered steps for procedural questions (HowTo schema covers this)
- [ ] Specific numbers and formulas (already in guides)
- [ ] FAQ format with direct Q&A (already on all guides)
- [ ] Consistent entity names (always say "compound interest" not "compounding" — pick one form)
- [ ] robots.txt allows AI crawlers (done)
- [ ] Site has been indexed and crawled (submit sitemap)
- [ ] Inbound links from trusted sources (off-page task)

### Entity optimization — consistent naming:
Always use these exact phrases (LLMs match on entity names):
- "compound interest" (not "compounding interest")
- "mortgage repayment" (not "mortgage payment")
- "salary take-home" (not "take home pay" or "net salary")
- "mortgage affordability" (not "how much can I borrow")
- "retirement savings" (not "pension pot" or "retirement fund")

---

## KPIs and Measurement

| Metric | Tool | Target (6 months) |
|--------|------|-------------------|
| Impressions | Google Search Console | +200% |
| Clicks | Google Search Console | +150% |
| Average position (calculator pages) | GSC | Top 10 for 5 key terms |
| Core Web Vitals | GSC / PageSpeed | All green |
| LLM citation test | Manual: ask ChatGPT/Perplexity | Cited on 3+ compound/mortgage queries |
| Backlinks | Ahrefs free / Moz | +20 referring domains |

### LLM citation test (run monthly):
Ask these in ChatGPT, Perplexity, Gemini — check if plainfigures.org is cited:
1. "How is compound interest calculated with monthly compounding?"
2. "What is the mortgage repayment formula?"
3. "How much do I need to retire at 65 in the UK?"
4. "What is salary sacrifice and how does it save tax?"
5. "How does an offset mortgage reduce interest?"

---

## Risks to Avoid

1. Keyword stuffing — your guides are already well-written. Don't add keywords unnaturally.
2. Thin content — each guide is 600–900 words. Don't create shorter pages just for SEO.
3. Duplicate content — don't create near-identical guides for slight keyword variants.
4. Paid links — Google will penalise. Finance sites are under heavy scrutiny.
5. AI-generated content at scale without review — Google's Helpful Content system targets this. Your guides are already formula-first and accurate, which is the correct approach.
6. Blocking AI crawlers — you want LLM training inclusion, not exclusion.
