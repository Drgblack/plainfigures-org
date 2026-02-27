// localStorage utilities — all reads are safe (SSR guard)

const RECENT_KEY = 'pf_recent_v1';
const SAVES_KEY = 'pf_saves_v1';
const THEME_KEY = 'pf_theme_v1';
const DISMISSED_KEY = 'pf_dismissed_v1';

function isBrowser() { return typeof window !== 'undefined'; }

// ── Recently used ─────────────────────────────────────────────────────────────
export function recordVisit(href: string) {
  if (!isBrowser()) return;
  try {
    const existing: string[] = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
    const updated = [href, ...existing.filter(h => h !== href)].slice(0, 4);
    localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
  } catch {}
}

export function getRecentHrefs(): string[] {
  if (!isBrowser()) return [];
  try { return JSON.parse(localStorage.getItem(RECENT_KEY) || '[]'); } catch { return []; }
}

// ── Saved calculations ────────────────────────────────────────────────────────
export interface SavedCalc {
  id: string;
  label: string;
  toolHref: string;
  toolTitle: string;
  summary: string;          // e.g. "£250,000 at 4.5% over 25 years"
  keyResults: { label: string; value: string }[];
  savedAt: number;          // timestamp
}

export function getSavedCalcs(): SavedCalc[] {
  if (!isBrowser()) return [];
  try { return JSON.parse(localStorage.getItem(SAVES_KEY) || '[]'); } catch { return []; }
}

export function saveCalc(calc: Omit<SavedCalc, 'id' | 'savedAt'>) {
  if (!isBrowser()) return;
  try {
    const existing = getSavedCalcs();
    const newCalc: SavedCalc = { ...calc, id: Date.now().toString(), savedAt: Date.now() };
    const updated = [newCalc, ...existing].slice(0, 20); // max 20 saved
    localStorage.setItem(SAVES_KEY, JSON.stringify(updated));
    return newCalc;
  } catch {}
}

export function deleteSavedCalc(id: string) {
  if (!isBrowser()) return;
  try {
    const updated = getSavedCalcs().filter(c => c.id !== id);
    localStorage.setItem(SAVES_KEY, JSON.stringify(updated));
  } catch {}
}

// ── Theme ─────────────────────────────────────────────────────────────────────
export type Theme = 'dark' | 'light';

export function getTheme(): Theme {
  if (!isBrowser()) return 'dark';
  try { return (localStorage.getItem(THEME_KEY) as Theme) || 'dark'; } catch { return 'dark'; }
}

export function setTheme(theme: Theme) {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(THEME_KEY, theme);
    document.documentElement.setAttribute('data-theme', theme);
  } catch {}
}

// ── Banner dismissals ─────────────────────────────────────────────────────────
export function isDismissed(key: string): boolean {
  if (!isBrowser()) return false;
  try {
    const dismissed: string[] = JSON.parse(localStorage.getItem(DISMISSED_KEY) || '[]');
    return dismissed.includes(key);
  } catch { return false; }
}

export function dismiss(key: string) {
  if (!isBrowser()) return;
  try {
    const existing: string[] = JSON.parse(localStorage.getItem(DISMISSED_KEY) || '[]');
    localStorage.setItem(DISMISSED_KEY, JSON.stringify([...new Set([...existing, key])]));
  } catch {}
}
