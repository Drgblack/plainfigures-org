'use client';

import { useState } from 'react';
import { useLang } from '@/components/ui/LangSwitcher';

interface DownloadCsvButtonProps {
  onDownload: () => void;
}

export default function DownloadCsvButton({ onDownload }: DownloadCsvButtonProps) {
  const { lang } = useLang();
  const [downloaded, setDownloaded] = useState(false);
  const isGerman = lang === 'de';
  const idleLabel = isGerman ? 'CSV herunterladen' : 'Download CSV';
  const doneLabel = isGerman ? 'CSV heruntergeladen' : 'CSV Downloaded';

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
        padding: '0.3rem 0.65rem',
        background: 'none',
        border: '1px solid var(--border)',
        borderRadius: '4px',
        color: downloaded ? 'var(--positive)' : 'var(--text-muted)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.7rem',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
      }}
      title="Download calculation as CSV"
      type="button"
    >
      {downloaded ? `✓ ${doneLabel}` : `↓ ${idleLabel}`}
    </button>
  );
}
