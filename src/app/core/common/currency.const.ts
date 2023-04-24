import { CurrencyType } from '../enums';

export const CURRENCIES = [
  { code: CurrencyType.vnd, name: 'VND', symbol: '₫' },
  { code: CurrencyType.bath, name: 'THB', symbol: '฿' },
  { code: CurrencyType.Rupiah, name: 'IDR', symbol: 'Rp' },
  { code: CurrencyType.Piso, name: 'PHP', symbol: '₱' },
  { code: CurrencyType.usd, name: 'USD', symbol: '$' },
  { code: CurrencyType.eur, name: 'EUR', symbol: '€' },
];

export const DEFAULT_CURRENCY = 'USD';

export const findCurrencyByCode = (code: string) =>
  CURRENCIES.find(c => c.code === code);
