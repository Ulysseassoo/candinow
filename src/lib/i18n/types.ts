export type Language = 'fr' | 'en';

export interface Translation {
  [key: string]: string | Translation;
}

export interface Translations {
  fr: Translation;
  en: Translation;
}
