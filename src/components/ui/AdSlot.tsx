type AdSlotName = 'below-results' | 'footer-leaderboard';

interface AdSlotProps {
  slot: AdSlotName;
}

const SLOT_STYLES: Record<AdSlotName, { minHeight: string; maxWidth: string }> = {
  'below-results': { minHeight: '120px', maxWidth: '760px' },
  'footer-leaderboard': { minHeight: '90px', maxWidth: '980px' },
};

export default function AdSlot({ slot }: AdSlotProps) {
  if (process.env.NEXT_PUBLIC_ADS_ENABLED !== 'true') {
    return null;
  }

  const style = SLOT_STYLES[slot];

  return (
    <div
      data-ad-slot={slot}
      aria-label="Advertisement"
      style={{
        width: '100%',
        maxWidth: style.maxWidth,
        minHeight: style.minHeight,
        margin: '1rem auto',
        border: '1px dashed var(--border)',
        borderRadius: '6px',
        background: 'var(--bg-surface)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-muted)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.68rem',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
      }}
    >
      Ad Slot: {slot.replace('-', ' ')}
    </div>
  );
}
