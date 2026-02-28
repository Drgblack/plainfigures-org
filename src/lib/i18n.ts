/**
 * i18n — Plain Figures lightweight translation system
 *
 * Architecture:
 * - JSON locale files in /public/locales/{lang}.json
 * - Loaded lazily on demand (no bundle impact for default EN)
 * - LangSwitcher dispatches 'pf-lang-change' custom events
 * - Components subscribe via useLang() hook or t() function
 * - URL parameter ?lang=de for crawlers + shareable translated URLs
 * - localStorage key 'pf_lang_v1' for persistence between sessions
 *
 * SEO:
 * - hreflang tags declared in layout.tsx metadata.alternates
 * - Each page should pass its own canonical + alternates if content differs
 * - Currently all languages point to the same URL (acceptable for UI-only i18n)
 *
 * Future path to full i18n (if needed):
 *   1. Install next-intl: npm install next-intl
 *   2. Move locales to /messages/{lang}.json (same structure)
 *   3. Replace this file with next-intl's getTranslations()
 *   4. Add [locale] dynamic segment to app/ routes
 *   5. Update layout.tsx with NextIntlClientProvider
 *   The JSON structure here is already compatible with next-intl's format.
 *
 * Alternatively with i18next:
 *   npm install i18next react-i18next i18next-http-backend i18next-browser-languagedetector
 *   The flat key structure (nav.learn, home.tagline_1) maps directly to i18next.
 */

import { Lang } from '@/components/ui/LangSwitcher';

type LocaleDict = Record<string, Record<string, string>>;

// Cache loaded locales to avoid refetching
const localeCache: Partial<Record<Lang, LocaleDict>> = {};

/**
 * Load a locale dictionary from /public/locales/{lang}.json
 * English is bundled inline (no fetch) to avoid flash on first load.
 */
export async function loadLocale(lang: Lang): Promise<LocaleDict> {
  if (localeCache[lang]) return localeCache[lang]!;

  if (lang === 'en') {
    // English is the fallback — always available without a network request
    const en = await import('../../public/locales/en.json');
    localeCache['en'] = en.default as unknown as LocaleDict;
    return localeCache['en']!;
  }

  try {
    const response = await fetch(`/locales/${lang}.json`);
    if (!response.ok) throw new Error(`Failed to load locale: ${lang}`);
    const data = await response.json() as LocaleDict;
    localeCache[lang] = data;
    return data;
  } catch {
    // Fallback to English if load fails
    return loadLocale('en');
  }
}

/**
 * Synchronous translation with dot-notation key lookup.
 * Falls back to the key itself if the string is not found.
 *
 * Usage:
 *   import { t } from '@/lib/i18n';
 *   const label = t('nav.learn', locale);
 */
export function t(key: string, dict: LocaleDict): string {
  const [namespace, ...rest] = key.split('.');
  const path = rest.join('.');
  return (dict[namespace]?.[path] as string | undefined) ?? key;
}

/**
 * Map browser navigator.language to our supported Lang codes.
 * Used by CurrencyContext and LangSwitcher for auto-detection.
 *
 * Priority:
 * 1. localStorage (user explicit choice)
 * 2. URL ?lang= param
 * 3. navigator.language / navigator.languages
 * 4. Default 'en'
 */
export function detectBrowserLang(): Lang {
  if (typeof window === 'undefined') return 'en';

  // 1. Explicit user choice
  try {
    const stored = localStorage.getItem('pf_lang_v1') as Lang | null;
    if (stored && ['en', 'de', 'fr', 'es', 'zh'].includes(stored)) return stored;
  } catch {}

  // 2. URL param
  const urlParam = new URLSearchParams(window.location.search).get('lang') as Lang | null;
  if (urlParam && ['en', 'de', 'fr', 'es', 'zh'].includes(urlParam)) return urlParam;

  // 3. Browser locale
  const browserLangs = navigator.languages ?? [navigator.language];
  for (const bl of browserLangs) {
    const primary = bl.split('-')[0].toLowerCase();
    if (['de', 'fr', 'es', 'zh'].includes(primary)) return primary as Lang;
  }

  return 'en';
}

/**
 * Map browser navigator.language to our supported Currency codes.
 * Called by CurrencyContext on first visit (no localStorage key present).
 *
 * The mapping is intentionally conservative — we only auto-select
 * when the locale → currency pairing is unambiguous.
 */
export function detectBrowserCurrency(): string | null {
  if (typeof window === 'undefined') return null;
  const lang = (navigator.languages?.[0] ?? navigator.language ?? '').toLowerCase();

  const map: Record<string, string> = {
    'en-us': 'USD', 'en-ca': 'CAD', 'en-au': 'AUD',
    'de': 'EUR', 'de-de': 'EUR', 'de-at': 'EUR',
    'fr': 'EUR', 'fr-fr': 'EUR', 'fr-be': 'EUR',
    'es': 'EUR', 'es-es': 'EUR',
    'it': 'EUR', 'nl': 'EUR', 'pt-pt': 'EUR',
    'de-ch': 'CHF', 'fr-ch': 'CHF', 'it-ch': 'CHF',
    'sv': 'SEK', 'sv-se': 'SEK',
    'da': 'DKK', 'da-dk': 'DKK',
    'nb': 'NOK', 'nb-no': 'NOK', 'nn-no': 'NOK',
    'ja': 'JPY', 'ja-jp': 'JPY',
  };

  // Try exact match first, then language prefix
  return map[lang] ?? map[lang.split('-')[0]] ?? null;
}

/**
 * i18n structure documentation for future next-intl migration:
 *
 * Current key schema (flat namespaced):
 *   nav.learn, home.tagline_1, calc.save, footer.about, a11y.skip_to_content
 *
 * next-intl compatible — messages/{lang}.json uses same structure.
 * To migrate:
 *   1. Rename /public/locales/ → /messages/
 *   2. npm install next-intl
 *   3. Add next.config.js plugin + middleware for locale routing
 *   4. Replace useLang() + t() with useTranslations('nav') etc.
 *
 * i18next compatible — keys map directly to:
 *   i18n.t('nav:learn'), i18n.t('home:tagline_1')
 *   (use ':' namespace separator instead of '.')
 */
