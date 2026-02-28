/**
 * AnswerBlock — Plain Figures
 *
 * Renders a structured definition/answer box optimised for:
 * - Google featured snippets (definition, paragraph, table formats)
 * - LLM citations (ChatGPT, Perplexity, Gemini parse structured prose)
 * - E-E-A-T signals (clear authorship context, disclaimers)
 *
 * Usage in guides:
 *   <AnswerBlock
 *     term="Compound Interest"
 *     definition="Compound interest is interest calculated on both the initial principal
 *                 and the accumulated interest from previous periods."
 *     formula="A = P(1 + r/n)^(nt)"
 *     formulaNote="Where P = principal, r = annual rate, n = compounds per year, t = years"
 *   />
 */

interface AnswerBlockProps {
  term: string;
  definition: string;
  formula?: string;
  formulaNote?: string;
  keyFact?: string;       // one-sentence "quick answer" for featured snippet
}

export default function AnswerBlock({ term, definition, formula, formulaNote, keyFact }: AnswerBlockProps) {
  return (
    <div
      itemScope
      itemType="https://schema.org/DefinedTerm"
      style={{
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border)',
        borderLeft: '3px solid var(--accent)',
        borderRadius: '4px',
        padding: '1.25rem 1.5rem',
        margin: '1.5rem 0',
      }}
    >
      {/* Term — h2-level for snippet targeting */}
      <p
        itemProp="name"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.62rem',
          color: 'var(--accent)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginBottom: '0.5rem',
        }}
      >
        {term}
      </p>

      {/* Key fact — optimised for featured snippet paragraph format */}
      {keyFact && (
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.92rem',
            color: 'var(--text-primary)',
            fontWeight: 500,
            marginBottom: '0.6rem',
            lineHeight: 1.5,
          }}
        >
          {keyFact}
        </p>
      )}

      {/* Full definition */}
      <p
        itemProp="description"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.82rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.75,
          marginBottom: formula ? '0.75rem' : 0,
        }}
      >
        {definition}
      </p>

      {/* Formula block */}
      {formula && (
        <div style={{ marginTop: '0.5rem' }}>
          <code
            style={{
              display: 'block',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              color: 'var(--text-primary)',
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: '3px',
              padding: '0.5rem 0.75rem',
              marginBottom: formulaNote ? '0.35rem' : 0,
            }}
          >
            {formula}
          </code>
          {formulaNote && (
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              {formulaNote}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
