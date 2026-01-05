import { createContext, useContext, useMemo, type ReactNode } from 'react';
import type { Language } from './types';
import { translations } from './translations';
import { interpolate } from './interpolate';

interface I18nContextType {
  language: Language;
  t: (key: string, params?: Record<string, any>, fallback?: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used within I18nProvider');
  }
  return context;
}

interface I18nProviderProps {
  language: Language;
  children: ReactNode;
}

export function I18nProvider({ language, children }: I18nProviderProps) {
  const value = useMemo(() => {
    const t = (key: string, params?: Record<string, any>, fallback?: string): string => {
      const keys = key.split('.');
      let value: any = translations[language];

      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          return fallback || key;
        }
      }

      const text = typeof value === 'string' ? value : fallback || key;
      return params ? interpolate(text, params) : text;
    };

    return { language, t };
  }, [language]);

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}
