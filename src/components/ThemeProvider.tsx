import { useEffect } from 'react';
import useAppStore from '@/stores/useStore';
import { getTheme, applyTheme } from '@/lib/themes';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useAppStore((state) => state.theme);

  useEffect(() => {
    const themeConfig = getTheme(theme);
    applyTheme(themeConfig);
  }, [theme]);

  return <>{children}</>;
}
