export interface Currency {
  code: string;
  symbol: string;
  locale: string;
  name: string;
  flag: string;
}

export const CURRENCIES: Currency[] = [
  { code: 'GBP', symbol: '£',   locale: 'en-GB', name: 'British Pound',    flag: '🇬🇧' },
  { code: 'EUR', symbol: '€',   locale: 'de-DE', name: 'Euro',             flag: '🇪🇺' },
  { code: 'USD', symbol: '$',   locale: 'en-US', name: 'US Dollar',        flag: '🇺🇸' },
  { code: 'CHF', symbol: 'CHF', locale: 'de-CH', name: 'Swiss Franc',      flag: '🇨🇭' },
  { code: 'SEK', symbol: 'kr',  locale: 'sv-SE', name: 'Swedish Krona',    flag: '🇸🇪' },
  { code: 'CAD', symbol: 'CA$', locale: 'en-CA', name: 'Canadian Dollar',  flag: '🇨🇦' },
  { code: 'AUD', symbol: 'A$',  locale: 'en-AU', name: 'Australian Dollar',flag: '🇦🇺' },
  { code: 'DKK', symbol: 'kr',  locale: 'da-DK', name: 'Danish Krone',     flag: '🇩🇰' },
  { code: 'NOK', symbol: 'kr',  locale: 'nb-NO', name: 'Norwegian Krone',  flag: '🇳🇴' },
  { code: 'JPY', symbol: '¥',   locale: 'ja-JP', name: 'Japanese Yen',     flag: '🇯🇵' },
];

export const DEFAULT_CURRENCY = CURRENCIES[0];
