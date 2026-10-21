import React, { createContext, useContext, useMemo } from 'react';
import { SupportedLocale } from '../contracts/types';
import tr from './locales/tr.json';
import en from './locales/en.json';
import de from './locales/de.json';
import ru from './locales/ru.json';

export type TranslationDictionary = typeof tr;

export const DICTIONARIES: Record<SupportedLocale, TranslationDictionary> = {
  tr,
  en,
  de,
  ru,
};

export interface LocaleMeta {
  code: SupportedLocale;
  label: string;
  flag: string;
}

export const LOCALE_LIST: LocaleMeta[] = [
  { code: 'tr', label: tr.meta.label, flag: tr.meta.flag },
  { code: 'en', label: en.meta.label, flag: en.meta.flag },
  { code: 'de', label: de.meta.label, flag: de.meta.flag },
  { code: 'ru', label: ru.meta.label, flag: ru.meta.flag },
];

export interface I18nContextValue {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
  dict: TranslationDictionary;
  t: (path: string, fallback?: string) => string;
}

const I18nContext = createContext<I18nContextValue>({
  locale: 'tr',
  setLocale: () => {},
  dict: tr,
  t: (path: string, fallback?: string) => fallback || path,
});

export const I18nProvider: React.FC<{
  locale: SupportedLocale;
  onLocaleChange: (locale: SupportedLocale) => void;
  children: React.ReactNode;
}> = ({ locale, onLocaleChange, children }) => {
  const dict = useMemo(() => DICTIONARIES[locale] || DICTIONARIES.tr, [locale]);

  const t = useMemo(() => {
    return (path: string, fallback?: string): string => {
      const segments = path.split('.');
      let current: any = dict;
      for (const seg of segments) {
        if (current && typeof current === 'object' && seg in current) {
          current = current[seg];
        } else {
          // Fallback to default Turkish dictionary if key is missing
          let fb: any = DICTIONARIES.tr;
          for (const fbSeg of segments) {
            fb = fb?.[fbSeg];
          }
          return typeof fb === 'string' ? fb : fallback || path;
        }
      }
      return typeof current === 'string' ? current : fallback || path;
    };
  }, [dict]);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale: onLocaleChange,
      dict,
      t,
    }),
    [locale, onLocaleChange, dict, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = (): I18nContextValue => useContext(I18nContext);
