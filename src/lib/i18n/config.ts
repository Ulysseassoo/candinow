import type { Language } from './types';

export const DEFAULT_LANGUAGE: Language = 'fr';
export const SUPPORTED_LANGUAGES: Language[] = ['fr', 'en'];

export function detectBrowserLanguage(): Language {
  if (typeof navigator === 'undefined') return DEFAULT_LANGUAGE;

  const browserLang = navigator.language.split('-')[0].toLowerCase();
  return SUPPORTED_LANGUAGES.includes(browserLang as Language)
    ? (browserLang as Language)
    : DEFAULT_LANGUAGE;
}
