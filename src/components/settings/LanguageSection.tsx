import { Globe } from 'lucide-react';
import useAppStore from '@/stores/useStore';
import type { Language } from '@/lib/i18n/types';
import { useTranslation } from '@/lib/i18n/context';

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
];

export function LanguageSection() {
  const { language: currentLanguage, setLanguage } = useAppStore();
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary-soft rounded-xl">
          <Globe size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="text-[12px] font-black text-text-primary uppercase tracking-widest">
            {t('settings.language.title')}
          </h3>
          <p className="text-xs text-text-secondary font-medium mt-1">
            {t('settings.language.description')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {LANGUAGES.map((lang) => {
          const isSelected = currentLanguage === lang.code;

          return (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`
                relative p-6 rounded-2xl border-2 transition-all text-left
                ${isSelected
                  ? 'border-primary bg-primary-soft/30 shadow-lg'
                  : 'border-border hover:border-primary/40 bg-background hover:shadow-md'
                }
              `}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{lang.flag}</span>
                <div className="font-black text-sm text-text-primary">
                  {lang.label}
                </div>
              </div>

              {isSelected && (
                <div className="absolute top-3 right-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
