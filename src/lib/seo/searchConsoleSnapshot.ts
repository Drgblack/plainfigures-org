export type SearchConsolePageRow = {
  page: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

export type SearchConsoleQueryRow = {
  query: string;
  page?: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

export type SearchConsoleSnapshot = {
  property: string;
  source: 'manual-export' | 'api' | 'other';
  exportedAt: string | null;
  dateRange:
    | {
        start: string;
        end: string;
      }
    | null;
  notes: string[];
  pageRows: SearchConsolePageRow[];
  queryRows: SearchConsoleQueryRow[];
};

export const SEARCH_CONSOLE_SNAPSHOT: SearchConsoleSnapshot = {
  property: 'https://www.plainfigures.org/',
  source: 'manual-export',
  exportedAt: null,
  dateRange: null,
  notes: [
    'Paste page-level and query-level Search Console exports into this file when you want the internal reports to use live performance data.',
    'The report accepts ctr values as either ratios (0.034) or percentages (3.4).',
    'Rows can be partial. Page rows drive route-group reporting; query rows add CTR and ranking opportunity sections.',
  ],
  pageRows: [],
  queryRows: [],
};
