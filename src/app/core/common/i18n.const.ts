import { enumToSelectOptions } from '../utils/enum.util';

export enum AppLanguage {
  vi = 'vi-VN',
  en = 'en-US',
  th = 'th-TH',
  id = 'id-ID',
}

export const DEFAULT_LANGUAGE = AppLanguage.en;

export const LANGUAGES = enumToSelectOptions(AppLanguage).map(
  ({ text }) => text,
);
