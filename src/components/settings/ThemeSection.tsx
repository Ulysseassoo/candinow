import { Palette } from 'lucide-react';
import useAppStore from '@/stores/useStore';
import { themes } from '@/lib/themes';

export function ThemeSection() {
  const { theme: currentTheme, setTheme } = useAppStore();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary-soft rounded-xl">
          <Palette size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="text-[12px] font-black text-text-primary uppercase tracking-widest">
            Thème de l'interface
          </h3>
          <p className="text-xs text-text-secondary font-medium mt-1">
            Personnalisez l'apparence de l'application
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {(['rose', 'corporate', 'classic']).map((themeName) => {
          const theme = themeName === 'rose' ? themes.rose : themeName === 'corporate' ? themes.corporate : themes.classic;
          const isSelected = currentTheme === themeName;

          return (
            <button
              key={themeName}
              onClick={() => {
                if (themeName === 'rose' || themeName === 'corporate' || themeName === 'classic') {
                  setTheme(themeName);
                }
              }}
              className={`
                relative p-6 rounded-2xl border-2 transition-all text-left
                ${isSelected
                  ? 'border-primary bg-primary-soft/30 shadow-lg'
                  : 'border-border hover:border-primary/40 bg-background hover:shadow-md'
                }
              `}
            >
              <div className="flex gap-2 mb-4">
                <div
                  className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                  style={{ backgroundColor: theme.colors.primary }}
                />
                <div
                  className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                  style={{ backgroundColor: theme.colors.accent }}
                />
                <div
                  className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                  style={{ backgroundColor: theme.colors.success }}
                />
              </div>

              <div>
                <div className="font-black text-sm text-text-primary mb-1">
                  {theme.label}
                </div>
                <div className="text-xs text-text-secondary font-medium">
                  {theme.description}
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
