export type ThemeName = 'rose' | 'corporate' | 'classic';

export interface Theme {
  name: ThemeName;
  label: string;
  description: string;
  colors: {
    primary: string;
    primaryDark: string;
    primarySoft: string;
    accent: string;
    accentSoft: string;
    success: string;
    successSoft: string;
    warning: string;
    warningSoft: string;
    danger: string;
    dangerSoft: string;
    textPrimary: string;
    textSecondary: string;
    border: string;
    background: string;
    foreground: string;
  };
}

export const themes: Record<ThemeName, Theme> = {
  rose: {
    name: 'rose',
    label: 'Rose',
    description: 'Doux et moderne',
    colors: {
      primary: '#FFB7C5',
      primaryDark: '#E89BA8',
      primarySoft: '#FFF0F3',
      accent: '#C9ADA7',
      accentSoft: '#F4EBE8',
      success: '#6A994E',
      successSoft: '#E8F5E0',
      warning: '#F2CC8F',
      warningSoft: '#FEF7E8',
      danger: '#E07A5F',
      dangerSoft: '#FCE8E3',
      textPrimary: '#2D3142',
      textSecondary: '#6B7280',
      border: '#E5E7EB',
      background: '#FFFFFF',
      foreground: '#2D3142',
    },
  },
  corporate: {
    name: 'corporate',
    label: 'Corporate',
    description: 'Dark mode professionnel',
    colors: {
      primary: '#0A66C2',
      primaryDark: '#084D94',
      primarySoft: '#1E3A5F',
      accent: '#64748B',
      accentSoft: '#334155',
      success: '#10B981',
      successSoft: '#064E3B',
      warning: '#F59E0B',
      warningSoft: '#78350F',
      danger: '#EF4444',
      dangerSoft: '#7F1D1D',
      textPrimary: '#F1F5F9',
      textSecondary: '#94A3B8',
      border: '#334155',
      background: '#0F172A',
      foreground: '#F1F5F9',
    },
  },
  classic: {
    name: 'classic',
    label: 'Classique',
    description: 'Dark mode sobre',
    colors: {
      primary: '#6366F1',
      primaryDark: '#4F46E5',
      primarySoft: '#312E81',
      accent: '#8B5CF6',
      accentSoft: '#5B21B6',
      success: '#10B981',
      successSoft: '#064E3B',
      warning: '#F59E0B',
      warningSoft: '#78350F',
      danger: '#EF4444',
      dangerSoft: '#7F1D1D',
      textPrimary: '#F1F5F9',
      textSecondary: '#94A3B8',
      border: '#334155',
      background: '#1E1B4B',
      foreground: '#F1F5F9',
    },
  },
};

export const defaultTheme: ThemeName = 'rose';

export function applyTheme(theme: Theme) {
  const root = document.documentElement;

  Object.entries(theme.colors).forEach(([key, value]) => {
    const cssVarName = key.replace(/([A-Z])/g, '-$1').toLowerCase();

    const tailwindVarName = `--color-${cssVarName}`;
    const shadcnVarName = `--${cssVarName}`;

    root.style.setProperty(tailwindVarName, value);
    root.style.setProperty(shadcnVarName, value);
  });

  root.style.setProperty('--card', theme.colors.background);
  root.style.setProperty('--card-foreground', theme.colors.foreground);
  root.style.setProperty('--popover', theme.colors.background);
  root.style.setProperty('--popover-foreground', theme.colors.foreground);
  root.style.setProperty('--primary-foreground', theme.colors.background === '#FFFFFF' ? theme.colors.textPrimary : '#FFFFFF');
  root.style.setProperty('--secondary', theme.colors.primarySoft);
  root.style.setProperty('--secondary-foreground', theme.colors.textPrimary);
  root.style.setProperty('--muted', theme.colors.primarySoft);
  root.style.setProperty('--muted-foreground', theme.colors.textSecondary);
  root.style.setProperty('--accent-foreground', theme.colors.background === '#FFFFFF' ? theme.colors.textPrimary : '#FFFFFF');
  root.style.setProperty('--destructive', theme.colors.danger);
  root.style.setProperty('--input', theme.colors.border);
  root.style.setProperty('--ring', theme.colors.primary);

  document.body.style.display = 'none';
  document.body.offsetHeight;
  document.body.style.display = '';
}

export function getTheme(name: ThemeName | string): Theme {
  if (name === 'professional') {
    return themes.corporate;
  }
  if (name === 'minimal') {
    return themes.classic;
  }

  if (name in themes) {
    return themes[name as ThemeName];
  }

  return themes[defaultTheme];
}
