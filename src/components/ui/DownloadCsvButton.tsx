'use client';

import { useState } from 'react';
import { useLang } from '@/components/ui/LangSwitcher';

interface DownloadCsvButtonProps {
  onDownload: () => void;
  debugTag?: string;
}

export default function DownloadCsvButton({ onDownload, debugTag }: DownloadCsvButtonProps) {
  const { lang } = useLang();
  const [downloaded, setDownloaded] = useState(false);
  const isGerman = lang === 'de';
  const idleLabel = isGerman ? 'CSV herunterladen' : 'Download CSV';
  const doneLabel = isGerman ? 'CSV heruntergeladen' : 'CSV Downloaded';
  const prefix = debugTag ? `${debugTag} · ` : '';

  const handleClick = () => {
    onDownload();
    setDownloaded(true);
    window.setTimeout(() => setDownloaded(false), 1800);
  };

  return (
    <button
      onClick={handleClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.35rem',
        padding: '0.45rem 0.8rem',
        background: '#fff5f5',
        border: '2px solid #ff2d2d',
        borderRadius: '4px',
        color: '#a00000',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.74rem',
        fontWeight: 700,
        cursor: 'pointer',
        transition: 'all 0.15s ease',
      }}
      title="Download calculation as CSV"
      type="button"
    >
      {downloaded
        ? `✓ FORCE-VISIBLE-DEBUG - ${prefix}${doneLabel}`
        : `FORCE-VISIBLE-DEBUG - CLICK ME - ${prefix}${idleLabel}`}
    </button>
  );
}
