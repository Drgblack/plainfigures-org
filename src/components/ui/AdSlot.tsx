'use client';

/**
 * AdSlot — Plain Figures
 * Publisher: ca-pub-6207224775263883
 *
 * Renders nothing until NEXT_PUBLIC_ADS_ENABLED=true.
 * Slot IDs are set per-unit in Vercel environment variables.
 *
 * Placement rules:
 *   below-results    → after result cards on calculator pages only
 *   guide-mid        → between H2 sections on long guides only
 *   footer-leaderboard → above footer, global
 *
 * Ad-free zones (never place AdSlot here):
 *   /learn, /learn/*, /saved, /about, /privacy, /terms, /disclaimer, /contact
 */

'use client';

import { useEffect } from 'react';

interface AdSlotProps {
  slot: 'below-results' | 'guide-mid' | 'footer-leaderboard';
}

const ADS_ENABLED = process.env.NEXT_PUBLIC_ADS_ENABLED === 'true';
const PUBLISHER_ID = process.env.NEXT_PUBLIC_ADSENSE_PID ?? 'ca-pub-6207224775263883';

const SLOT_IDS: Record<AdSlotProps['slot'], string> = {
  'below-results':       process.env.NEXT_PUBLIC_AD_SLOT_BELOW_RESULTS ?? '',
  'guide-mid':           process.env.NEXT_PUBLIC_AD_SLOT_GUIDE_MID ?? '',
  'footer-leaderboard':  process.env.NEXT_PUBLIC_AD_SLOT_FOOTER ?? '',
};

const SLOT_STYLES: Record<AdSlotProps['slot'], { minHeight: string; maxWidth: string }> = {
  'below-results':      { minHeight: '250px', maxWidth: '336px' },
  'guide-mid':          { minHeight: '250px', maxWidth: '336px' },
  'footer-leaderboard': { minHeight: '90px',  maxWidth: '728px' },
};

export default function AdSlot({ slot }: AdSlotProps) {
  const slotId = SLOT_IDS[slot];
  const style = SLOT_STYLES[slot];

  useEffect(() => {
    if (!ADS_ENABLED || !slotId) return;
    try {
      // Push ad after mount — required by AdSense
      (window as any).adsbygoogle = (window as any).adsbygoogle || [];
      (window as any).adsbygoogle.push({});
    } catch (_) {}
  }, [slotId]);

  // Render nothing if ads disabled or slot ID not yet configured
  if (!ADS_ENABLED || !slotId) return null;

  return (
    <div
      aria-label="Advertisement"
      role="complementary"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '2rem auto',
        maxWidth: style.maxWidth,
        width: '100%',
      }}
    >
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.55rem',
        color: 'var(--text-muted)',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        marginBottom: '0.3rem',
        opacity: 0.6,
      }}>
        Advertisement
      </span>
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          width: '100%',
          minHeight: style.minHeight,
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border)',
          borderRadius: '4px',
        }}
        data-ad-client={PUBLISHER_ID}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
