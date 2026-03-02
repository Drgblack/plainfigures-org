'use client';

type CsvCell = string | number | boolean | null | undefined;

interface CsvMetadataRow {
  key: string;
  value: CsvCell;
}

interface ExportToCsvOptions {
  fileName: string;
  rows: Array<Record<string, CsvCell>>;
  metadata?: CsvMetadataRow[];
}

function escapeCsvCell(value: CsvCell): string {
  if (value === null || value === undefined) {
    return '';
  }

  const text = String(value);
  const escaped = text.replace(/"/g, '""');
  const needsQuotes = /[",\r\n]/.test(escaped);
  return needsQuotes ? `"${escaped}"` : escaped;
}

function buildCsv(rows: Array<Record<string, CsvCell>>, metadata: CsvMetadataRow[] = []): string {
  const lines: string[] = [];

  if (metadata.length) {
    lines.push('Field,Value');
    for (const entry of metadata) {
      lines.push(`${escapeCsvCell(entry.key)},${escapeCsvCell(entry.value)}`);
    }
    lines.push('');
  }

  if (!rows.length) {
    return lines.join('\r\n');
  }

  const headers = Object.keys(rows[0]);
  lines.push(headers.map(escapeCsvCell).join(','));

  for (const row of rows) {
    lines.push(headers.map((header) => escapeCsvCell(row[header])).join(','));
  }

  return lines.join('\r\n');
}

export function exportToCsv({ fileName, rows, metadata = [] }: ExportToCsvOptions): void {
  if (typeof window === 'undefined') {
    return;
  }

  const csv = buildCsv(rows, metadata);
  const csvWithBom = `\uFEFF${csv}`;
  const blob = new Blob([csvWithBom], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `${fileName}.csv`;
  anchor.style.display = 'none';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);

  URL.revokeObjectURL(url);
}

export type { CsvCell, CsvMetadataRow, ExportToCsvOptions };
