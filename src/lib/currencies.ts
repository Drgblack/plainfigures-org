export interface Currency {
  code: string;
  symbol: string;
  locale: string;
  name: string;
  flag: string;
}

export const CURRENCIES: Currency[] = [
  { code: 'GBP', symbol: '£', locale: 'en-GB', name: 'British Pound', flag: '🇬🇧' },
  { code: 'EUR', symbol: '€', locale: 'de-DE', name: 'Euro', flag: '🇪🇺' },
  { code: 'USD', symbol: '$', locale: 'en-US', name: 'US Dollar', flag: '🇺🇸' },
  { code: 'CHF', symbol: 'CHF', locale: 'de-CH', name: 'Swiss Franc', flag: '🇨🇭' },
  { code: 'SEK', symbol: 'kr', locale: 'sv-SE', name: 'Swedish Krona', flag: '🇸🇪' },
];

export const DEFAULT_CURRENCY = CURRENCIES[0];
