import EN from '@angular/common/locales/en';
import ID from '@angular/common/locales/id';
import TH from '@angular/common/locales/th';
import VI from '@angular/common/locales/vi';
import { enUS, id, th, vi } from 'date-fns/locale';
import {
  en_US,
  id_ID,
  NzI18nInterface,
  th_TH,
  vi_VN,
} from 'ng-zorro-antd/i18n';
import { AppLanguage } from '../common/i18n.const';

export const getNzLocale = (language: string): NzI18nInterface => {
  switch (language) {
    case 'en-US':
      return {
        ...en_US,
        Text: {
          ...en_US.Text,
          expand: 'More',
        },
        DatePicker: {
          ...en_US.DatePicker,
          lang: {
            ...en_US.DatePicker.lang,
            nextMonth: en_US.DatePicker.lang.nextMonth.replace(/\(.*\)/g, ''),
            previousMonth: en_US.DatePicker.lang.previousMonth.replace(
              /\(.*\)/g,
              ''
            ),
            nextYear: en_US.DatePicker.lang.nextYear.replace(/\(.*\)/g, ''),
            previousYear: en_US.DatePicker.lang.previousYear.replace(
              /\(.*\)/g,
              ''
            ),
            ok: 'OK',
          },
        },
      };
    case 'th-TH':
      return {
        ...th_TH,
        Text: {
          ...th_TH.Text,
          expand: 'มากกว่า',
        },
        DatePicker: {
          ...th_TH.DatePicker,
          lang: {
            ...th_TH.DatePicker.lang,
            nextMonth: th_TH.DatePicker.lang.nextMonth.replace(/\(.*\)/g, ''),
            previousMonth: th_TH.DatePicker.lang.previousMonth.replace(
              /\(.*\)/g,
              ''
            ),
            nextYear: th_TH.DatePicker.lang.nextYear.replace(/\(.*\)/g, ''),
            previousYear: th_TH.DatePicker.lang.previousYear.replace(
              /\(.*\)/g,
              ''
            ),
          },
        },
      };
    case 'id-ID':
      return {
        ...id_ID,
        Text: {
          ...en_US.Text, // not support id,
          expand: 'lagi',
        },
        DatePicker: {
          ...id_ID.DatePicker,
          lang: {
            ...id_ID.DatePicker.lang,
            nextMonth: id_ID.DatePicker.lang.nextMonth.replace(/\(.*\)/g, ''),
            previousMonth: id_ID.DatePicker.lang.previousMonth.replace(
              /\(.*\)/g,
              ''
            ),
            nextYear: id_ID.DatePicker.lang.nextYear.replace(/\(.*\)/g, ''),
            previousYear: id_ID.DatePicker.lang.previousYear.replace(
              /\(.*\)/g,
              ''
            ),
          },
        },
      };
    default:
      return {
        ...vi_VN,
        Text: {
          ...en_US.Text, // not support vn,
          expand: 'Thêm',
        },
        DatePicker: {
          ...vi_VN.DatePicker,
          lang: {
            ...vi_VN.DatePicker.lang,
            nextMonth: vi_VN.DatePicker.lang.nextMonth.replace(/\(.*\)/g, ''),
            previousMonth: vi_VN.DatePicker.lang.previousMonth.replace(
              /\(.*\)/g,
              ''
            ),
            nextYear: vi_VN.DatePicker.lang.nextYear.replace(/\(.*\)/g, ''),
            previousYear: vi_VN.DatePicker.lang.previousYear.replace(
              /\(.*\)/g,
              ''
            ),
          },
        },
      };
  }
};

export const getNzDateLocale = (language: string) => {
  switch (language) {
    case 'en-US':
      return enUS;
    case 'th-TH':
      return th;
    case 'id-ID':
      return id;
    default:
      return vi;
  }
};

export const getCurrentLang = () =>
  localStorage.getItem('lang') || AppLanguage.vi;

export const getCurrentAppTitle = (language: string) => {
  switch (language) {
    case 'en-US':
      return 'Transportation Management System';
    case 'th-TH':
      return 'ระบบการจัดการขนส่ง';
    case 'id-ID':
      return 'Sistem Manajemen Transportasi';
    default:
      return 'Hệ thống quản lý vận tải';
  }
};

export const getLangsByCountryCode = (
  country_code: string | undefined | null
) => {
  switch (country_code) {
    case 'th':
      return ['th-TH', 'en-US'];
    case 'id':
      return ['id-ID', 'en-US'];
    case 'ph':
      return ['en-US'];
    default:
      return ['vi-VN', 'en-US'];
  }
};

export const getFormatDateTimeByCountryCode = (
  country_code: string | undefined | null
) => {
  switch (country_code) {
    case 'th':
      return 'd-MMM-yy - HH:mm';
    case 'id':
      return 'd-MMM-yy - HH:mm';
    case 'ph':
      return 'd-MMM-yy - hh:mm a';
    case 'vn':
      return 'dd/MM/yyyy - HH:mm';
    default:
      return 'dd/MM/yyyy - HH:mm';
  }
};

export const getFormatDateByCountryCode = (
  country_code: string | undefined | null
) => {
  switch (country_code) {
    case 'th':
      return 'd-MMM-yy';
    case 'id':
      return 'd-MMM-yy';
    case 'ph':
      return 'd-MMM-yy';
    case 'vn':
      return 'dd/MM/yyyy';
    default:
      return 'dd/MM/yyyy';
  }
};

export const getFormatDateWithoutDayByCountryCode = (
  country_code: string | undefined | null
) => {
  switch (country_code) {
    case 'th':
    case 'id':
    case 'ph':
      return 'MMM-yy';
    default:
      return 'MM/yyyy';
  }
};

export const getFormatYearByCountryCode = (
  country_code: string | undefined | null
) => {
  switch (country_code) {
    case 'th':
    case 'id':
    case 'ph':
      return 'yy';
    default:
      return 'yyyy';
  }
};

export const getFormatLongDateByCountryCode = (
  country_code: string | undefined | null
) => {
  switch (country_code) {
    case 'th':
      return 'MMMM d, y';
    case 'id':
      return 'MMMM d, y';
    case 'ph':
      return 'MMMM d, y';
    case 'vn':
      return 'dd/MMMM/yyyy';
    default:
      return 'MMMM d, y';
  }
};

export const getFormatTimeByCountryCode = (
  country_code: string | undefined | null
) => {
  switch (country_code) {
    case 'th':
      return 'HH:mm';
    case 'id':
      return 'HH:mm';
    case 'ph':
      return 'hh:mm a';
    case 'vn':
      return 'HH:mm';
    default:
      return 'HH:mm';
  }
};

export const getLocaleData = (language: string | undefined | null) => {
  switch (language) {
    case 'en-US':
      return EN;
    case 'th-TH':
      return TH;
    case 'id-ID':
      return ID;
    default:
      return VI;
  }
};

export const getCurrencyCode = (language: string | undefined | null) => {
  switch (language) {
    case 'en-US':
      return 'USD';
    case 'th_TH':
      return 'THB';
    case 'id_ID':
      return 'IDR';
    default:
      return 'VND';
  }
};

export const getCurrencyCodeByCountryCode = (
  country_code: string | undefined | null
) => {
  switch (country_code) {
    case 'th':
      return 'THB';
    case 'id':
      return 'IDR';
    case 'ph':
      return 'PHP';
    default:
      return 'VND';
  }
};

export const getCurrencySymbolByCountryCode = (
  country_code: string | undefined | null
) => {
  switch (country_code) {
    case 'th':
      return '฿';
    case 'id':
      return 'Rp';
    case 'ph':
      return '₱';
    default:
      return '₫';
  }
};

export const getLanguageCodeByCountry = (
  country_code: string | undefined | null
) => {
  switch (country_code) {
    case 'th':
      return 'th-TH';
    case 'id':
      return 'id-ID';
    case 'ph':
      return 'en-US';
    default:
      return 'vi-VN';
  }
};
