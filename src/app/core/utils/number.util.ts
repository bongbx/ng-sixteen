import { getCurrentLang } from ".";

/*
 * Convert a number to number-like string with commas as thousands separators.
 * Input: 123456789.1234
 * Output: 123,456,789.1234
 */
export const formatNumberWithCommas = (value: number) =>
  value?.toLocaleString(getCurrentLang());

/*
 * Convert a number-like string with commas as thousands separators to a number.
 * Input: 123,456,789.1234
 * Output: 123456789.1234
 */
export const parseNumberWithCommas = (value: string) => value.replace(',', '');

/*
 * Convert a number to currency format.
 * Input: 123456789.1234
 * Output: $123,456,789.1234
 */
export const formatCurrency = (value: number, currencySymbol: string) =>
  `${currencySymbol} ${formatNumberWithCommas(value) || 0}`;

/*
 * Convert a currency-like string to a number.
 * Input: $ 123,456,789.1234
 * Output: 123456789.1234
 */
export const parseCurrency = (value: string, currencySymbol: string) =>
  parseNumberWithCommas(value.replace(`${currencySymbol} `, ''));
