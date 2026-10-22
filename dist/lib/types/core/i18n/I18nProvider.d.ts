import React from 'react';
import { SupportedLocale } from '../contracts/types';
import tr from './locales/tr.json';
export type TranslationDictionary = typeof tr;
export declare const DICTIONARIES: Record<SupportedLocale, TranslationDictionary>;
export interface LocaleMeta {
    code: SupportedLocale;
    label: string;
    flag: string;
}
export declare const LOCALE_LIST: LocaleMeta[];
export interface I18nContextValue {
    locale: SupportedLocale;
    setLocale: (locale: SupportedLocale) => void;
    dict: TranslationDictionary;
    t: (path: string, fallback?: string) => string;
}
export declare const I18nProvider: React.FC<{
    locale: SupportedLocale;
    onLocaleChange: (locale: SupportedLocale) => void;
    children: React.ReactNode;
}>;
export declare const useI18n: () => I18nContextValue;
//# sourceMappingURL=I18nProvider.d.ts.map