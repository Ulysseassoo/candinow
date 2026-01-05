import { motion } from 'framer-motion';
import { Flower2 } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/context';

interface AppHeaderProps {
  currentView: 'list' | 'dashboard' | 'settings' | 'feedback' | 'actions';
  onLogoClick: () => void;
}

export const AppHeader = ({ currentView, onLogoClick }: AppHeaderProps) => {
  const { t } = useTranslation();

  const getTitle = () => {
    switch (currentView) {
      case 'list': return t('nav.list');
      case 'dashboard': return t('nav.dashboard');
      case 'settings': return t('nav.settings');
      case 'feedback': return t('nav.feedback');
      case 'actions': return t('nav.actions');
      default: return t('nav.list');
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 lg:mb-10 flex items-center justify-between px-4 mt-4 lg:mt-0"
    >
      <div>
        <h1 className="text-3xl lg:text-4xl font-black text-text-primary tracking-tighter">
          {getTitle()}
        </h1>
        <div className="flex items-center gap-3 text-text-secondary font-bold text-sm mt-2">
          <span className="opacity-50 hover:cursor-pointer" onClick={onLogoClick}>{t('nav.appName')}</span>
          <div className="w-1 h-1 bg-text-secondary/30 rounded-full"></div>
          <span className="text-primary-dark capitalize">{currentView}</span>
        </div>
      </div>

      <button
        onClick={onLogoClick}
        className="lg:hidden w-10 h-10 bg-primary rounded-2xl flex items-center justify-center text-white shadow-md"
      >
        <Flower2 size={24} />
      </button>
    </motion.header>
  );
};

